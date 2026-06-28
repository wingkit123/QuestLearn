import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdminAnnouncementsClient } from "./AdminAnnouncementsClient";

export default async function AdminAnnouncementsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcement")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminAnnouncementsClient 
      announcements={announcements || []} 
      adminUserId={user.userId} 
    />
  );
}
