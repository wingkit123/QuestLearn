"use server";

import { createClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";

interface SubmitArgs {
  quizId: number;
  studentProfileId: number;
  answers: Record<number, string>;
  questions: any[];
}

export async function submitQuizAttempt({
  quizId,
  studentProfileId,
  answers,
  questions,
}: SubmitArgs) {
  const supabase = await createClient();

  // 1. Fetch the correct answers from DB to prevent client tampering
  const questionIds = questions.map((q) => q.question_id);
  const { data: dbQuestions, error: qError } = await supabase
    .from("question")
    .select("question_id, correct_answer, points, question_type")
    .in("question_id", questionIds);

  if (qError || !dbQuestions) {
    throw new Error("Failed to validate questions.");
  }

  // 2. Auto-grade
  let totalScore = 0;
  let maxScore = 0;
  const attemptAnswers = [];

  for (const dbQ of dbQuestions) {
    maxScore += dbQ.points;
    const studentAnswer = answers[dbQ.question_id]?.trim() || "";
    let isCorrect = false;
    let pointsEarned = 0;

    // Simple grading logic: string matching (case insensitive) for MCQ and Fill in Blank
    // Short Answer requires manual grading, so points = 0 initially
    if (dbQ.question_type === "short_answer") {
      isCorrect = false; // requires manual review
      pointsEarned = 0;
    } else {
      if (studentAnswer.toLowerCase() === dbQ.correct_answer.toLowerCase()) {
        isCorrect = true;
        pointsEarned = dbQ.points;
      }
    }

    totalScore += pointsEarned;

    attemptAnswers.push({
      question_id: dbQ.question_id,
      student_answer: studentAnswer,
      is_correct: isCorrect,
      points_earned: pointsEarned,
    });
  }

  // Generate generic feedback
  const percent = totalScore / maxScore;
  let feedback = "Good effort.";
  if (percent >= 0.8) feedback = "Excellent work! You have a strong grasp of the material.";
  else if (percent >= 0.5) feedback = "Good job, but there's room for improvement. Review the topics you missed.";
  else feedback = "You might want to review the lesson material again.";

  // 3. Save the attempt (Unlimited retakes = just insert a new one, or if we want to save latest only, we can upsert. Let's just insert).
  const { data: attempt, error: attemptError } = await supabase
    .from("quiz_attempt")
    .insert({
      quiz_id: quizId,
      student_profile_id: studentProfileId,
      score: totalScore,
      max_score: maxScore,
      feedback_summary: feedback,
    })
    .select("attempt_id")
    .single();

  if (attemptError) throw new Error("Failed to save attempt.");

  // 4. Save the answers
  const answersToInsert = attemptAnswers.map((ans) => ({
    ...ans,
    attempt_id: attempt.attempt_id,
  }));

  const { error: ansError } = await supabase
    .from("attempt_answer")
    .insert(answersToInsert);

  if (ansError) throw new Error("Failed to save answers.");

  // 5. Update progress_record so the visual lock/unlock triggers instantly
  const { data: quizData } = await supabase
    .from("quiz")
    .select("lesson_id")
    .eq("quiz_id", quizId)
    .single();

  if (quizData?.lesson_id) {
    const percentage = Math.round((totalScore / maxScore) * 100);
    await supabase.from("progress_record").upsert({
      student_profile_id: studentProfileId,
      lesson_id: quizData.lesson_id,
      completion_status: "completed",
      percentage: percentage,
      updated_at: new Date().toISOString(),
    }, { onConflict: "student_profile_id, lesson_id" });

    // 6. Trigger Advisor Alert if score is below 50%
    if (percentage < 50) {
      await supabase.from("advisor_alert").insert({
        student_profile_id: studentProfileId,
        alert_type: "low_quiz_score",
        severity: "high",
        message: `Student scored ${percentage}% on Quiz ID ${quizId}.`,
        status: "open",
      });
    }
  }

  revalidatePath("/student", "layout");

  return { success: true, attemptId: attempt.attempt_id };
}
