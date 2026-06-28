"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Loader2, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { submitQuizAttempt } from "./actions";

interface QuizAttemptClientProps {
  quiz: any;
  questions: any[];
  studentProfileId: number;
}

export function QuizAttemptClient({ quiz, questions, studentProfileId }: QuizAttemptClientProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to get total points possible
  const totalPossible = questions.reduce((acc, q) => acc + q.points, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      if (!confirm("You have unanswered questions. Submit anyway?")) {
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitQuizAttempt({
        quizId: quiz.quiz_id,
        studentProfileId,
        answers,
        questions, // Pass questions so server action can autograde securely
      });
      
      router.push(`/student/quizzes/${quiz.quiz_id}/results`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit quiz.");
      setLoading(false);
    }
  }

  const courseId = quiz.lesson?.module?.course_id;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pb-20">
      <Link
        href={`/student/courses/${courseId}/lessons/${quiz.lesson_id}`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Lesson
      </Link>

      <div className="bg-surface rounded-xl border border-border p-8 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4 text-accent">
          <BrainCircuit className="w-6 h-6" />
          <span className="font-semibold tracking-wide">
            {quiz.lesson?.course?.course_title}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text mb-2">
          {quiz.quiz_title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-text-muted mt-6">
          <div className="px-3 py-1 rounded-full bg-neutral-bg">
            {questions.length} Questions
          </div>
          <div className="px-3 py-1 rounded-full bg-neutral-bg">
            {totalPossible} Points Total
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-danger-bg text-danger font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((q, index) => (
          <div
            key={q.question_id}
            className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm"
          >
            <div className="bg-bg-page/50 border-b border-border p-5 flex justify-between items-start">
              <h3 className="font-bold text-text">Question {index + 1}</h3>
              <span className="text-xs font-semibold text-text-muted bg-border/50 px-2 py-1 rounded-md">
                {q.points} pt{q.points > 1 ? "s" : ""}
              </span>
            </div>
            <div className="p-6">
              <p className="text-text mb-6 text-lg">{q.prompt}</p>

              {q.question_type === "mcq" ? (
                <div className="space-y-3">
                  {/* For demo, MCQ is rendered as text input since we don't have separate options table in schema. 
                      User types answer. (Alternatively we can parse JSON if we stored it that way, but schema just has prompt/correct_answer). 
                      Let's just use a text input for everything since schema doesn't define options. */}
                  <input
                    type="text"
                    required
                    placeholder="Type your answer..."
                    value={answers[q.question_id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.question_id]: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  />
                  <p className="text-xs text-text-muted">Type the exact answer.</p>
                </div>
              ) : q.question_type === "fill_in_blank" ? (
                <input
                  type="text"
                  required
                  placeholder="Fill in the blank..."
                  value={answers[q.question_id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.question_id]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                />
              ) : (
                <textarea
                  required
                  rows={4}
                  placeholder="Write your answer..."
                  value={answers[q.question_id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.question_id]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none resize-y"
                />
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-light transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5 hidden" />
            )}
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
