import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdvisorFollowupsClient } from "./AdvisorFollowupsClient";

export default async function AdvisorFollowupsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

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

  // Fetch follow-ups
  const { data: followups } = await supabase
    .from("advisor_follow_up")
    .select(`
      *,
      student_profile:student_profile_id (
        student_profile_id,
        user:user_id (
          full_name,
          email
        )
      )
    `)
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id)
    .order("logged_at", { ascending: false });

  return (
    <AdvisorFollowupsClient 
      followups={followups || []} 
      advisorProfileId={advisorProfile.advisor_profile_id} 
    />
  );
}
