import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle, BookOpen, ChevronLeft } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

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
  // We can just fetch all progress for the student and filter in memory since it's small
  const { data: progressRecords } = await supabase
    .from("progress_record")
    .select("*")
    .eq("student_profile_id", profile.student_profile_id);

  const progressMap = new Map(
    (progressRecords || []).map((pr) => [pr.lesson_id, pr])
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

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <Link
        href="/student/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

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
                    const isMixed = les.lesson_type === "mixed";
                    const isVideo = les.lesson_type === "video";

                    return (
                      <Link
                        key={les.lesson_id}
                        href={`/student/courses/${courseId}/lessons/${les.lesson_id}`}
                        className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              isCompleted
                                ? "text-success"
                                : "text-border group-hover:text-primary/50"
                            }`}
                          >
                            {isCompleted ? (
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
