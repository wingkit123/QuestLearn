import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { QuizAttemptClient } from "./QuizAttemptClient";

interface PageProps {
  params: Promise<{ quizId: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { quizId } = await params;
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Get student profile
  const { data: profile } = await supabase
    .from("student_profile")
    .select("student_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  // Fetch quiz with its questions
  const { data: quiz } = await supabase
    .from("quiz")
    .select(`
      *,
      lesson:lesson_id (
        lesson_title,
        module:module_id (
          course_id,
          course:course_id ( course_title )
        )
      ),
      quiz_question (
        sequence_no,
        question:question_id (
          question_id,
          question_type,
          prompt,
          points
        )
      )
    `)
    .eq("quiz_id", quizId)
    .single();

  if (!quiz) notFound();

  // Sort questions
  const questions = (quiz.quiz_question || [])
    .sort((a: any, b: any) => a.sequence_no - b.sequence_no)
    .map((qq: any) => qq.question);

  return (
    <QuizAttemptClient 
      quiz={quiz} 
      questions={questions} 
      studentProfileId={profile.student_profile_id} 
    />
  );
}
