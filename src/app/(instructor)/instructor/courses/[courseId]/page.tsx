import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, Edit2, GripVertical, FileText, PlayCircle, Settings, LayoutTemplate } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseBuilderPage({ params }: PageProps) {
  const { courseId } = await params;
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("instructor_profile")
    .select("instructor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  const { data: course } = await supabase
    .from("course")
    .select(`
      *,
      module (
        *,
        lesson (
          *
        )
      )
    `)
    .eq("course_id", courseId)
    .eq("instructor_profile_id", profile.instructor_profile_id)
    .single();

  if (!course) notFound();

  const modules = (course.module || []).sort((a: any, b: any) => a.sequence_no - b.sequence_no);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <Link
        href="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="bg-surface rounded-xl border border-border p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-accent bg-bg-dark px-2.5 py-1 rounded-md tracking-wide">
              {course.course_code}
            </span>
            <StatusBadge status={course.status} />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">{course.course_title}</h1>
          <p className="text-text-muted max-w-2xl">{course.description || "No description."}</p>
        </div>
        <div className="shrink-0 flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-bg-page transition-colors">
            Edit Details
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors">
            Publish Course
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text">Curriculum Builder</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text font-medium text-sm hover:bg-bg-page transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Module
        </button>
      </div>

      <div className="space-y-6">
        {modules.length === 0 ? (
          <div className="text-center p-12 bg-surface border border-border border-dashed rounded-xl">
            <p className="text-text-muted mb-4">No modules added yet.</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors">
              <Plus className="w-4 h-4" /> Create First Module
            </button>
          </div>
        ) : (
          modules.map((mod: any) => {
            const lessons = (mod.lesson || []).sort((a: any, b: any) => a.sequence_no - b.sequence_no);
            return (
              <div key={mod.module_id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="bg-bg-page/80 border-b border-border p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <button className="text-border hover:text-text-muted cursor-grab">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="font-bold text-text">Module {mod.sequence_no}: {mod.module_title}</h3>
                      {mod.description && <p className="text-xs text-text-muted mt-0.5">{mod.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary/10">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary/10">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  {lessons.length === 0 ? (
                    <div className="p-6 text-center text-sm text-text-muted italic">
                      Empty module. Add lessons or quizzes.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {lessons.map((les: any) => (
                        <div key={les.lesson_id} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-page transition-colors group/lesson">
                          <div className="flex items-center gap-3">
                            <button className="text-border/50 hover:text-text-muted cursor-grab">
                              <GripVertical className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-text-muted font-medium w-4">{les.sequence_no}.</span>
                            <span className="font-medium text-text text-sm">{les.lesson_title}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-bg text-neutral flex items-center gap-1">
                              {les.lesson_type === 'video' ? <PlayCircle className="w-3 h-3"/> :
                               les.lesson_type === 'mixed' ? <LayoutTemplate className="w-3 h-3"/> :
                               <FileText className="w-3 h-3"/>}
                              {les.lesson_type}
                            </span>
                          </div>
                          <Link
                            href={`/instructor/courses/${courseId}/lessons/${les.lesson_id}/edit`}
                            className="p-1.5 text-text-muted hover:text-primary rounded-md hover:bg-primary/10 opacity-0 group-hover/lesson:opacity-100 transition-opacity"
                          >
                            <Settings className="w-4 h-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-bg-page/30 p-3 border-t border-border flex justify-center">
                  <Link href={`/instructor/courses/${courseId}/lessons/new?moduleId=${mod.module_id}`} className="text-xs font-medium text-text-muted hover:text-primary transition-colors flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add content to Module {mod.sequence_no}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
