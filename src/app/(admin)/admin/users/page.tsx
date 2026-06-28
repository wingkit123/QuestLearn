import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { Users, User, Shield } from "lucide-react";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: users } = await supabase
    .from("user")
    .select(`
      user_id,
      full_name,
      email,
      account_status,
      role:role_id (
        role_name
      )
    `)
    .order("full_name", { ascending: true });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">User Registry</h1>
        <p className="text-text-muted">Browse and manage registered platform accounts.</p>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-page/50 text-text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">User Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(users || []).map((u: any) => (
              <tr key={u.user_id} className="hover:bg-bg-page/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-text flex items-center gap-2">
                  <User className="w-4 h-4 text-text-muted" /> {u.full_name}
                </td>
                <td className="px-6 py-4 text-text-muted">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="capitalize px-2 py-0.5 rounded-full bg-neutral-bg text-xs font-semibold text-neutral">
                    {u.role?.role_name || "Student"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    u.account_status === "active" ? "bg-success-bg/40 text-success" : "bg-danger-bg/40 text-danger"
                  }`}>
                    {u.account_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
