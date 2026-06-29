import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AdminEnrollmentClient } from "./AdminEnrollmentClient";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function AdminEnrollmentPage({ params }: PageProps) {
  const { courseId } = await params;
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: course } = await supabase
    .from("course")
    .select("*")
    .eq("course_id", courseId)
    .single();

  if (!course) notFound();

  // Fetch current enrollments
  const { data: enrollments } = await supabase
    .from("enrollment")
    .select(`
      enrollment_id,
      status,
      student_profile:student_profile_id (
        student_profile_id,
        student_no,
        user:user_id (
          full_name,
          email
        )
      )
    `)
    .eq("course_id", courseId);

  // Fetch all student profiles
  const { data: allStudents } = await supabase
    .from("student_profile")
    .select(`
      student_profile_id,
      student_no,
      user:user_id (
        full_name,
        email
      )
    `);

  return (
    <AdminEnrollmentClient 
      course={course} 
      courseId={courseId} 
      initialEnrollments={enrollments || []}
      allStudents={allStudents || []}
    />
  );
}
