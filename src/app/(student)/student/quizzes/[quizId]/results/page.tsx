import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, BrainCircuit, CheckCircle2, XCircle, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ quizId: string }>;
}

export default async function QuizResultsPage({ params }: PageProps) {
  const { quizId } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl max-w-xl mx-auto mt-10">
        <p className="text-danger font-medium">User session not found. Please log in again.</p>
      </div>
    );
  }

  const supabase = await createClient();

  // Get student profile
  const { data: profile } = await supabase
    .from("student_profile")
    .select("student_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl max-w-xl mx-auto mt-10">
        <p className="text-danger font-medium">Student profile not found. Please contact support.</p>
      </div>
    );
  }

  // Fetch quiz
  const { data: quiz } = await supabase
    .from("quiz")
    .select("*, lesson:lesson_id(module:module_id(course_id))")
    .eq("quiz_id", quizId)
    .single();

  if (!quiz) notFound();

  // Fetch the LATEST attempt for this quiz
  const { data: attempt } = await supabase
    .from("quiz_attempt")
    .select("*")
    .eq("quiz_id", quizId)
    .eq("student_profile_id", profile.student_profile_id)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .single();

  if (!attempt) {
    // No attempt found, maybe redirect to take the quiz
    return (
      <div className="text-center p-8">
        <p>No results found. You haven&apos;t taken this quiz yet.</p>
        <Link href={`/student/quizzes/${quizId}`} className="text-primary hover:underline mt-4 inline-block">
          Take Quiz
        </Link>
      </div>
    );
  }

  // Fetch the detailed answers for this attempt
  const { data: answers } = await supabase
    .from("attempt_answer")
    .select(`
      *,
      question:question_id (
        prompt,
        correct_answer,
        explanation,
        points,
        question_type
      )
    `)
    .eq("attempt_id", attempt.attempt_id);

  const percentage = Math.round(((attempt.score || 0) / (attempt.max_score || 1)) * 100);
  const courseId = quiz.lesson?.module?.course_id;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pb-20">
      <Link
        href={`/student/courses/${courseId}/lessons/${quiz.lesson_id}`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Lesson
      </Link>

      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm mb-8">
        <div className="bg-bg-dark text-white p-8 text-center">
          <BrainCircuit className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
          <p className="text-text-light">{quiz.quiz_title}</p>
        </div>
        
        <div className="p-8 border-b border-border text-center">
          <div className="text-5xl font-extrabold text-text mb-2">
            {percentage}%
          </div>
          <p className="text-text-muted font-medium mb-6">
            You scored {attempt.score} out of {attempt.max_score} points
          </p>
          <div className="inline-block px-6 py-4 rounded-xl bg-bg-page border border-border text-left w-full max-w-md">
            <h3 className="font-semibold text-text mb-1">Feedback</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {attempt.feedback_summary || "Quiz completed."}
            </p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold text-text mb-6">Detailed Review</h2>
          <div className="space-y-6">
            {answers?.map((ans: any, idx: number) => {
              const q = ans.question || { prompt: "Question prompt unavailable", question_type: "", points: ans.points_earned || 0 };
              const isShortAnswer = q.question_type === "short_answer";

              return (
                <div key={ans.attempt_answer_id} className="p-5 rounded-lg border border-border bg-bg-page">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      {isShortAnswer ? (
                        <div className="w-6 h-6 rounded-full bg-warning-bg text-warning flex items-center justify-center">
                          ?
                        </div>
                      ) : ans.is_correct ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <XCircle className="w-6 h-6 text-danger" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text mb-2">
                        {idx + 1}. {q.prompt}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-text-muted w-24 shrink-0">Your answer:</span>
                          <span className={ans.is_correct ? "text-success font-medium" : "text-danger"}>
                            {ans.student_answer || "(No answer)"}
                          </span>
                        </div>
                        
                        {!ans.is_correct && !isShortAnswer && (
                          <div className="flex gap-2">
                            <span className="text-text-muted w-24 shrink-0">Correct answer:</span>
                            <span className="text-text font-medium">{q.correct_answer}</span>
                          </div>
                        )}

                        {isShortAnswer && (
                          <div className="text-xs text-warning mt-2 italic">
                            This question requires manual grading by your instructor.
                          </div>
                        )}

                        {q.explanation && (
                          <div className="mt-4 p-3 rounded bg-surface border border-border text-text-muted text-xs leading-relaxed">
                            <span className="font-semibold text-text">Explanation:</span> {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-sm font-semibold bg-surface px-2 py-1 rounded border border-border">
                        {ans.points_earned} / {q.points} pt{q.points > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/student/quizzes/${quizId}`}
          className="px-6 py-3 rounded-lg border border-border bg-surface text-text font-medium hover:bg-bg-page transition-colors"
        >
          Retake Quiz
        </Link>
        <Link
          href={`/student/courses/${courseId}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
        >
          Continue Course <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
