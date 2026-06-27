import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { ShieldCheck, Users, HardDrive, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch pending instructors
  const { data: pendingUsers } = await supabase
    .from("user")
    .select("user_id, full_name, email, created_at, role:role_id(role_name)")
    .eq("account_status", "pending")
    .order("created_at", { ascending: false });

  // Dummy action for approval (in real app, use separate action file)
  async function approveUser(formData: FormData) {
    "use server";
    const userId = formData.get("userId");
    const supabase = await createClient();
    await supabase.from("user").update({ account_status: "active" }).eq("user_id", userId);
    revalidatePath("/admin");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Admin Dashboard</h1>
        <p className="text-text-muted">System overview and user management.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="System Status" value="Healthy" icon={ShieldCheck} className="border-success/50 bg-success-bg/30" />
        <MetricCard title="Total Users" value={234} icon={Users} />
        <MetricCard title="Storage Used" value="45 GB" icon={HardDrive} />
      </div>

      <section>
        <h2 className="text-lg font-bold text-text mb-4">Pending Approvals</h2>
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          {(!pendingUsers || pendingUsers.length === 0) ? (
            <EmptyState
              title="No Pending Approvals"
              description="All user accounts are currently active."
              icon={<CheckCircle2 className="w-8 h-8 text-success" />}
              className="border-0 border-b-0 rounded-none bg-transparent shadow-none"
            />
          ) : (
            <div className="divide-y divide-border">
              {pendingUsers.map((pUser: any) => (
                <div key={pUser.user_id} className="p-4 flex items-center justify-between hover:bg-bg-page/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-text mb-1">{pUser.full_name}</h3>
                    <div className="flex gap-3 text-sm text-text-muted">
                      <span>{pUser.email}</span>
                      <span className="capitalize px-2 py-0.5 rounded-full bg-neutral-bg text-xs font-semibold text-neutral">
                        {/* @ts-ignore */}
                        {pUser.role?.role_name || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <form action={approveUser}>
                    <input type="hidden" name="userId" value={pUser.user_id} />
                    <button type="submit" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors">
                      Approve
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
