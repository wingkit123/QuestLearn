import { getCurrentUser } from "@/lib/auth/helpers";
import { MetricCard } from "@/components/ui/MetricCard";
import { Users, AlertTriangle, TrendingDown } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

export default async function AdvisorDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Mocked data for Advisor
  const atRiskStudents = [
    { id: 1, name: "Alice Johnson", idNumber: "STU-8821", course: "CS101", progress: 20, lastActive: "3 days ago" },
    { id: 2, name: "Bob Smith", idNumber: "STU-9391", course: "ENG202", progress: 15, lastActive: "1 week ago" },
    { id: 3, name: "Charlie Davis", idNumber: "STU-1123", course: "MAT301", progress: 45, lastActive: "5 days ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Advisor Dashboard</h1>
        <p className="text-text-muted">
          Monitor student progress and intervene early.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Assigned Students" value={142} icon={Users} />
        <MetricCard title="At-Risk Alerts" value={3} icon={AlertTriangle} className="border-danger/50 bg-danger-bg/30" />
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
                <th className="px-6 py-4 font-semibold">Flagged Course</th>
                <th className="px-6 py-4 font-semibold text-right">Progress</th>
                <th className="px-6 py-4 font-semibold text-right">Last Active</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {atRiskStudents.map((s) => (
                <tr key={s.id} className="hover:bg-bg-page/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{s.name}</td>
                  <td className="px-6 py-4 text-text-muted">{s.idNumber}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-text bg-bg-page border border-border px-2 py-1 rounded-md text-xs">
                      {s.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-danger font-bold">{s.progress}%</span>
                  </td>
                  <td className="px-6 py-4 text-right text-text-muted">{s.lastActive}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-sm font-medium text-primary hover:underline">
                      Review Profile
                    </button>
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
