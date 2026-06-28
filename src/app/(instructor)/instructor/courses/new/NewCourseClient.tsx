"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle, Send, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  instructorProfileId: number;
}

export function NewCourseClient({ instructorProfileId }: Props) {
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseTitle.trim()) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("course")
        .insert({
          instructor_profile_id: instructorProfileId,
          course_code: courseCode.trim().toUpperCase(),
          course_title: courseTitle.trim(),
          description: description.trim(),
          status: "active",
        });

      if (error) throw error;

      showToast("Course created successfully!");
      setTimeout(() => {
        router.push("/instructor/courses");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error("NewCourseClient handleSubmit error:", {
        message: err?.message,
        code: err?.code,
        details: err?.details,
        hint: err?.hint,
        err: err,
      });
      const errorMsg = err?.message || (typeof err === "string" ? err : JSON.stringify(err));
      showToast(`Failed to create course: ${errorMsg}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in duration-500 pb-20 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-xl shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom duration-300">
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-danger" />
          )}
          <span className="text-sm font-semibold text-text">{toast.message}</span>
        </div>
      )}

      <Link
        href="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="bg-surface rounded-xl border border-border p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text">Create New Course</h1>
            <p className="text-xs text-text-muted mt-0.5">Define your curriculum and course metadata.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Course Code
            </label>
            <input
              type="text"
              required
              placeholder="E.g., QL-SEF101"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Course Title
            </label>
            <input
              type="text"
              required
              placeholder="E.g., Software Engineering Fundamentals"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Provide a summary of the course modules and target audience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/instructor/courses"
              className="px-4 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-bg-page text-text"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg disabled:opacity-75"
            >
              <Send className="w-3.5 h-3.5" /> {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
