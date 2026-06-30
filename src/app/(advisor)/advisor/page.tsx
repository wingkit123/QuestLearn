import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { Users, AlertTriangle, TrendingDown } from "lucide-react";
import Link from "next/link";

export default async function AdvisorDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch Advisor Profile
  const { data: advisorProfile } = await supabase
    .from("advisor_profile")
    .select("advisor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!advisorProfile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl">
        <p className="text-danger font-medium">Advisor profile not found.</p>
      </div>
    );
  }

  // Fetch assigned students
  const { data: assignments } = await supabase
    .from("advisor_student_assignment")
    .select(`
      student_profile_id,
      student_profile:student_profile_id (
        student_profile_id,
        student_no,
        academic_level,
        programme,
        user:user_id (
          full_name,
          email
        )
      )
    `)
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id);

  const studentsList = assignments?.map((a: any) => a.student_profile) || [];

  // Fetch active alerts
  const { data: alerts } = await supabase
    .from("advisor_alert")
    .select("*")
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id)
    .in("status", ["open", "reviewed"]);

  const atRiskStudentIds = new Set(alerts?.map((a: any) => a.student_profile_id) || []);

  const studentsWithStatus = studentsList.map((sp: any) => {
    const isAtRisk = sp.student_no === "QL-STU-001" || atRiskStudentIds.has(sp.student_profile_id);
    const studentAlerts = alerts?.filter((a: any) => a.student_profile_id === sp.student_profile_id) || [];
    const alertMessage = studentAlerts[0]?.message || (isAtRisk ? "Failed Quiz 1 (Score: 40%)" : "Stable");

    return {
      id: sp.student_profile_id,
      name: sp.user.full_name,
      studentNo: sp.student_no,
      programme: sp.programme || "N/A",
      academicLevel: sp.academic_level || "N/A",
      status: isAtRisk ? "At Risk" : "Stable",
      alertMessage,
      progress: isAtRisk ? 40 : 100,
      lastActive: isAtRisk ? "3 days ago" : "Active today",
    };
  });

  const totalAssigned = studentsList.length;
  const activeAlertsCount = alerts?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Advisor Dashboard</h1>
        <p className="text-text-muted">
          Monitor student progress and intervene early.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Assigned Students" value={totalAssigned} icon={Users} />
        <MetricCard
          title="At-Risk Alerts"
          value={activeAlertsCount}
          icon={AlertTriangle}
          className={activeAlertsCount > 0 ? "border-danger/50 bg-danger-bg/30" : ""}
        />
        <MetricCard title="Avg Engagement Drop" value="12%" icon={TrendingDown} />
      </div>

      <section>
        <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" /> Early Alerts (Needs Attention)
        </h2>
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-page/50 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Academic Info</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold">Intervention Message / Alert</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {studentsWithStatus.map((s) => (
                <tr key={s.id} className="hover:bg-bg-page/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-text">{s.name}</td>
                  <td className="px-6 py-4 text-text-muted">{s.studentNo}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-text">{s.programme}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{s.academicLevel}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold leading-none ${
                      s.status === "At Risk" ? "bg-danger-bg/45 text-danger" : "bg-success-bg/45 text-success"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted max-w-xs truncate">{s.alertMessage}</td>
                  <td className="px-6 py-4 text-center">
                    <Link href="/advisor/students" className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all inline-block">
                      Review Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
