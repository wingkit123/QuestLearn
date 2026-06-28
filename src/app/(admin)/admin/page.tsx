import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "./AdminDashboardClient";

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

  // Get total user count
  const { count: userCount } = await supabase
    .from("user")
    .select("user_id", { count: "exact", head: true });

  return (
    <AdminDashboardClient 
      pendingUsers={pendingUsers || []} 
      userCount={userCount || 0} 
    />
  );
}
