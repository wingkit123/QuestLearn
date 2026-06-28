"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { revalidatePath } from "next/cache";

export async function submitGrade(submissionId: number, score: number, feedback: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "instructor") throw new Error("Unauthorized");

  const supabase = await createClient();

  const { error } = await supabase
    .from("assignment_submission")
    .update({
      score,
      feedback,
      status: "graded",
    })
    .eq("submission_id", submissionId);

  if (error) {
    console.error("Error submitting grade:", error);
    throw new Error("Failed to submit grade.");
  }

  revalidatePath("/instructor");
  revalidatePath("/instructor/grading");
  revalidatePath(`/instructor/grading/${submissionId}`);
  
  return { success: true };
}
