import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdminUsersClient } from "./AdminUsersClient";

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
    <AdminUsersClient users={users || []} />
  );
}
