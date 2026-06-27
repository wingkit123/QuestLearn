"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { markLessonComplete } from "./actions";

interface Props {
  lessonId: number;
  courseId: number;
  initialCompleted: boolean;
}

export function MarkCompleteButton({ lessonId, courseId, initialCompleted }: Props) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  async function handleMarkComplete() {
    if (isCompleted) return;
    setLoading(true);
    try {
      await markLessonComplete(lessonId, courseId);
      setIsCompleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (isCompleted) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-bg text-success font-medium cursor-default border border-success/20"
      >
        <CheckCircle2 className="w-5 h-5" />
        Completed
      </button>
    );
  }

  return (
    <button
      onClick={handleMarkComplete}
      disabled={loading}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <CheckCircle2 className="w-5 h-5" />
      )}
      {loading ? "Saving..." : "Mark as Complete"}
    </button>
  );
}
