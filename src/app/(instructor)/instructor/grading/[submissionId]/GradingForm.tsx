"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitGrade } from "./actions";
import { Loader2, CheckCircle2 } from "lucide-react";

interface GradingFormProps {
  submissionId: number;
  initialScore: number | null;
  initialFeedback: string | null;
  maxScore: number;
  status: string;
}

export function GradingForm({ submissionId, initialScore, initialFeedback, maxScore, status }: GradingFormProps) {
  const router = useRouter();
  const [score, setScore] = useState<string>(initialScore !== null ? String(initialScore) : "");
  const [feedback, setFeedback] = useState<string>(initialFeedback || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isGraded = status === "graded" || status === "returned";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const parsedScore = parseInt(score);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > maxScore) {
      setError(`Score must be a number between 0 and ${maxScore}.`);
      setLoading(false);
      return;
    }

    try {
      await submitGrade(submissionId, parsedScore, feedback);
      router.push("/instructor");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to submit grade.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-danger-bg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Score (out of {maxScore})
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            required
            min={0}
            max={maxScore}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-32 px-3 py-2 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent outline-none"
            placeholder="e.g. 85"
          />
          <span className="text-text-muted">/ {maxScore} pts</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Feedback (Optional)
        </label>
        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent outline-none resize-y"
          placeholder="Great job on..."
        />
      </div>

      <div className="pt-4 flex items-center justify-end gap-4 border-t border-border">
        {isGraded && (
          <span className="text-sm font-medium text-success flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Already graded
          </span>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isGraded ? "Update Grade" : "Submit Grade"}
        </button>
      </div>
    </form>
  );
}
