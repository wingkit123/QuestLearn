import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CourseBuilderClient } from "./CourseBuilderClient";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseBuilderPage({ params }: PageProps) {
  const { courseId } = await params;
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("instructor_profile")
    .select("instructor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  const { data: course } = await supabase
    .from("course")
    .select(`
      *,
      module (
        *,
        lesson (
          *,
          content_item (
            *
          )
        )
      )
    `)
    .eq("course_id", courseId)
    .eq("instructor_profile_id", profile.instructor_profile_id)
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
    <CourseBuilderClient 
      course={course} 
      courseId={courseId} 
      initialEnrollments={enrollments || []}
      allStudents={allStudents || []}
    />
  );
}
