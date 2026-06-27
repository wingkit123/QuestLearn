import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, PlayCircle, FileText, LayoutTemplate, BrainCircuit } from "lucide-react";
import { MarkCompleteButton } from "./MarkCompleteButton";

interface PageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonViewerPage({ params }: PageProps) {
  const { courseId, lessonId } = await params;
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

  // Check enrollment
  const { data: enrollment } = await supabase
    .from("enrollment")
    .select("*")
    .eq("student_profile_id", profile.student_profile_id)
    .eq("course_id", courseId)
    .single();

  if (!enrollment) notFound();

  // Fetch lesson details
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*, module:module_id(module_title)")
    .eq("lesson_id", lessonId)
    .single();

  if (!lesson) notFound();

  // Fetch content items
  const { data: contentItems } = await supabase
    .from("content_item")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("sequence_no", { ascending: true });

  // Fetch associated quiz
  const { data: quiz } = await supabase
    .from("quiz")
    .select("quiz_id, quiz_title")
    .eq("lesson_id", lessonId)
    .eq("publish_status", "published")
    .maybeSingle();

  // Fetch current progress
  const { data: progress } = await supabase
    .from("progress_record")
    .select("*")
    .eq("student_profile_id", profile.student_profile_id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const isCompleted = progress?.completion_status === "completed";

  // Mark in_progress if not started
  if (!progress) {
    await supabase.from("progress_record").insert({
      student_profile_id: profile.student_profile_id,
      lesson_id: parseInt(lessonId),
      completion_status: "in_progress",
      percentage: 20, // Start with some progress just for viewing
    });
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
      <Link
        href={`/student/courses/${courseId}`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Course
      </Link>

      <header className="mb-8">
        <div className="text-sm font-semibold text-accent mb-2">
          {/* @ts-ignore - module is joined */}
          {lesson.module?.module_title}
        </div>
        <h1 className="text-3xl font-bold text-text mb-4">
          {lesson.lesson_title}
        </h1>
      </header>

      <div className="space-y-12">
        {contentItems?.map((item) => (
          <div key={item.content_item_id} className="scroll-mt-24">
            {/* Reading Content */}
            {item.content_type === "reading" && (
              <div className="prose prose-slate max-w-none text-text leading-relaxed">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-text">
                  <FileText className="w-5 h-5 text-primary" /> {item.title}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.body_text || "No content provided.",
                  }}
                  className="bg-surface p-6 rounded-xl border border-border"
                />
              </div>
            )}

            {/* Video Content */}
            {item.content_type === "video" && item.embed_url && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-text">
                  <PlayCircle className="w-5 h-5 text-primary" /> {item.title}
                </h3>
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border shadow-md bg-black">
                  <iframe
                    src={item.embed_url}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}

            {/* H5P/Lumi Content */}
            {item.content_type === "h5p_lumi" && (item.embed_url || item.body_text) && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-text">
                  <LayoutTemplate className="w-5 h-5 text-primary" /> {item.title}
                </h3>
                {item.body_text ? (
                  <div 
                    className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-white [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: item.body_text }}
                  />
                ) : (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-white">
                    <iframe
                      src={item.embed_url}
                      title={item.title}
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion & Next Steps */}
      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-text mb-2">Lesson Complete?</h3>
            <p className="text-sm text-text-muted">
              Mark this lesson as complete to update your course progress.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <MarkCompleteButton
              lessonId={parseInt(lessonId)}
              courseId={parseInt(courseId)}
              initialCompleted={isCompleted}
            />

            {quiz && (
              <Link
                href={`/student/quizzes/${quiz.quiz_id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bg-dark text-white font-medium hover:bg-bg-dark/90 transition-colors shadow-sm"
              >
                <BrainCircuit className="w-5 h-5 text-accent" />
                Take Quiz
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
