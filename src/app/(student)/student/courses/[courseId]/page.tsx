import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  ChevronLeft,
  Lock,
  AlertTriangle,
  BookOpenCheck,
  RotateCcw,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

const PASSING_THRESHOLD = 50; // 50% to pass

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseId } = await params;
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

  if (!enrollment) {
    notFound(); // Not enrolled
  }

  // Fetch course with modules and lessons
  const { data: course } = await supabase
    .from("course")
    .select(
      `
      *,
      instructor_profile:instructor_profile_id (
        user:user_id ( full_name )
      ),
      module (
        *,
        lesson (
          *
        )
      )
    `
    )
    .eq("course_id", courseId)
    .single();

  if (!course) notFound();

  // Fetch progress for this student for all lessons in this course
  const { data: progressRecords } = await supabase
    .from("progress_record")
    .select("*")
    .eq("student_profile_id", profile.student_profile_id);

  const progressMap = new Map(
    (progressRecords || []).map((pr: any) => [pr.lesson_id, pr])
  );

  // Sort modules and lessons
  const modules = (course.module || []).sort(
    (a: any, b: any) => a.sequence_no - b.sequence_no
  );

  // Calculate overall course progress
  let totalLessonProgress = 0;
  let totalLessons = 0;

  modules.forEach((mod: any) => {
    (mod.lesson || []).forEach((les: any) => {
      totalLessons++;
      const pr = progressMap.get(les.lesson_id);
      if (pr) totalLessonProgress += pr.percentage;
    });
  });

  const courseProgress =
    totalLessons > 0 ? Math.round(totalLessonProgress / totalLessons) : 0;

  // Detect weak topics and locking status for quiz modules
  // A quiz module is one where lesson titles start with "Quiz"
  interface WeakTopic {
    lessonTitle: string;
    percentage: number;
    moduleTitle: string;
  }

  const weakTopics: WeakTopic[] = [];

  // Build a set of locked lesson IDs
  // Logic: Within a module, if a quiz lesson is failed (< 50%), all subsequent lessons in that module are locked
  const lockedLessonIds = new Set<number>();

  modules.forEach((mod: any) => {
    const lessons = (mod.lesson || []).sort(
      (a: any, b: any) => a.sequence_no - b.sequence_no
    );

    let lockRemaining = false;

    lessons.forEach((les: any) => {
      const isQuizLesson = les.lesson_title?.startsWith("Quiz");
      const pr = progressMap.get(les.lesson_id);

      if (lockRemaining && isQuizLesson) {
        lockedLessonIds.add(les.lesson_id);
        return;
      }

      if (isQuizLesson && pr && pr.percentage < PASSING_THRESHOLD) {
        weakTopics.push({
          lessonTitle: les.lesson_title,
          percentage: pr.percentage,
          moduleTitle: mod.module_title,
        });
        lockRemaining = true;
      }
    });
  });

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <Link
        href="/student/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      {/* Weak-Topic Alert */}
      {weakTopics.length > 0 && (
        <div className="mb-8 space-y-4">
          {weakTopics.map((wt, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-danger/10 via-warning/5 to-danger/10 border-2 border-danger/30 rounded-xl p-6 shadow-sm animate-in slide-in-from-top duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-danger/15 flex items-center justify-center shrink-0 border border-danger/20">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-danger mb-1">
                    ⚠️ Weak Topic Detected: {wt.lessonTitle.replace(/^Quiz \d+:\s*/, "")}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    You scored <span className="font-bold text-danger">{wt.percentage}%</span> on{" "}
                    <span className="font-semibold text-text">{wt.lessonTitle}</span> — below the {PASSING_THRESHOLD}% passing threshold. Complete the recommended actions to unlock the remaining quizzes.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Recommended Action Plan
                    </h4>
                    <div className="flex items-center gap-3 bg-surface/80 p-3 rounded-lg border border-border">
                      <BookOpenCheck className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-text">
                          📖 Review Material: Lecture 11 - Testing Strategies (PDF)
                        </p>
                        <p className="text-xs text-text-muted">
                          Revisit the core concepts before retaking the quiz.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-surface/80 p-3 rounded-lg border border-border">
                      <RotateCcw className="w-5 h-5 text-warning shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-text">
                          🔄 Retake {wt.lessonTitle} to unlock the next topics.
                        </p>
                        <p className="text-xs text-text-muted">
                          Score at least {PASSING_THRESHOLD}% to proceed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Header */}
      <div className="bg-surface rounded-xl border border-border p-8 mb-8 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-accent bg-bg-dark px-2.5 py-1 rounded-md tracking-wide mb-3 inline-block">
              {course.course_code}
            </span>
            <h1 className="text-2xl font-bold text-text mb-2">
              {course.course_title}
            </h1>
            <p className="text-text-muted">{course.description}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
              {course.instructor_profile.user.full_name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-text">
                {course.instructor_profile.user.full_name}
              </div>
              <div className="text-xs text-text-muted">Course Instructor</div>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <ProgressBar value={courseProgress} showLabel />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text mb-4">Course Content</h2>

        {modules.map((mod: any) => {
          const lessons = (mod.lesson || []).sort(
            (a: any, b: any) => a.sequence_no - b.sequence_no
          );

          return (
            <div
              key={mod.module_id}
              className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm"
            >
              <div className="p-5 bg-bg-page/50 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text">
                    Module {mod.sequence_no}: {mod.module_title}
                  </h3>
                  {mod.description && (
                    <p className="text-sm text-text-muted mt-1">
                      {mod.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="divide-y divide-border">
                {lessons.length === 0 ? (
                  <div className="p-4 text-sm text-text-muted italic text-center">
                    No lessons in this module yet.
                  </div>
                ) : (
                  lessons.map((les: any) => {
                    const pr = progressMap.get(les.lesson_id);
                    const isCompleted = pr?.completion_status === "completed";
                    const isFailed = pr && pr.percentage < PASSING_THRESHOLD;
                    const isMixed = les.lesson_type === "mixed";
                    const isVideo = les.lesson_type === "video";
                    const isLocked = lockedLessonIds.has(les.lesson_id);
                    const isQuizLesson = les.lesson_title?.startsWith("Quiz");

                    // Locked lesson
                    if (isLocked) {
                      return (
                        <div
                          key={les.lesson_id}
                          className="flex items-center justify-between p-4 opacity-50 cursor-not-allowed select-none"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-text-muted">
                              <Lock className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-text-muted line-through">
                                {les.sequence_no}. {les.lesson_title}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Locked — pass the previous quiz first</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-text-muted bg-bg-page px-3 py-1 rounded-full border border-border">
                            🔒 Locked
                          </span>
                        </div>
                      );
                    }

                    // Failed quiz lesson (special styling)
                    if (isQuizLesson && isCompleted && isFailed) {
                      return (
                        <Link
                          key={les.lesson_id}
                          href={`/student/courses/${courseId}/lessons/${les.lesson_id}`}
                          className="flex items-center justify-between p-4 bg-danger/5 hover:bg-danger/10 transition-colors group border-l-4 border-danger"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-danger">
                              <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-medium text-danger group-hover:text-danger transition-colors">
                                {les.sequence_no}. {les.lesson_title}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-danger/70 font-semibold flex items-center gap-1">
                                  Score: {pr.percentage}% — Needs Retake
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                            🔄 Retake &rarr;
                          </span>
                        </Link>
                      );
                    }

                    // Normal lesson
                    return (
                      <Link
                        key={les.lesson_id}
                        href={`/student/courses/${courseId}/lessons/${les.lesson_id}`}
                        className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              isCompleted && !isFailed
                                ? "text-success"
                                : "text-border group-hover:text-primary/50"
                            }`}
                          >
                            {isCompleted && !isFailed ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-text group-hover:text-primary transition-colors">
                              {les.sequence_no}. {les.lesson_title}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-text-muted flex items-center gap-1">
                                {isVideo || isMixed ? (
                                  <PlayCircle className="w-3.5 h-3.5" />
                                ) : (
                                  <BookOpen className="w-3.5 h-3.5" />
                                )}
                                <span className="capitalize">
                                  {les.lesson_type}
                                </span>
                              </span>
                              {isCompleted && !isFailed && pr && (
                                <span className="text-xs text-success font-semibold">
                                  ✓ {pr.percentage}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Start lesson &rarr;
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
