import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdvisorStudentsClient } from "./AdvisorStudentsClient";

export default async function AdvisorStudentsPage() {
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

  // Fetch assigned students
  const { data: students } = await supabase
    .from("advisor_student_assignment")
    .select(`
      *,
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

  // Fetch all instructors
  const { data: instructors } = await supabase
    .from("instructor_profile")
    .select(`
      instructor_profile_id,
      staff_no,
      user:user_id (
        full_name,
        email
      )
    `);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">My Advisees</h1>
        <p className="text-text-muted">Overview of all students assigned to your department.</p>
      </header>

      <AdvisorStudentsClient 
        students={students || []} 
        advisorProfileId={advisorProfile.advisor_profile_id} 
        instructors={instructors || []}
      />
    </div>
  );
}
