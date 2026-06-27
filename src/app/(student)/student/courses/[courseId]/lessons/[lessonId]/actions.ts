"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: number, courseId: number) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("student_profile")
    .select("student_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) throw new Error("Profile not found");

  // Upsert progress_record to 'completed' and 100%
  const { error } = await supabase.from("progress_record").upsert({
    student_profile_id: profile.student_profile_id,
    lesson_id: lessonId,
    completion_status: "completed",
    percentage: 100,
  }, { onConflict: "student_profile_id, lesson_id" });

  if (error) {
    console.error("Error marking lesson complete:", error);
    throw new Error("Failed to mark complete");
  }

  revalidatePath(`/student/courses/${courseId}`);
  revalidatePath(`/student/courses/${courseId}/lessons/${lessonId}`);
}
