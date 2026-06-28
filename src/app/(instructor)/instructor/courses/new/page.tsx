import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { NewCourseClient } from "./NewCourseClient";

export default async function NewCoursePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("instructor_profile")
    .select("instructor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl">
        <p className="text-danger font-medium">Instructor profile not found.</p>
      </div>
    );
  }

  return (
    <NewCourseClient instructorProfileId={profile.instructor_profile_id} />
  );
}
