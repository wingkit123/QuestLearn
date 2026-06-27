import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Plus, BookOpen, Users, MoreVertical } from "lucide-react";
import Link from "next/link";

export default async function InstructorCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("instructor_profile")
    .select("instructor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  // Fetch all owned courses
  const { data: courses } = await supabase
    .from("course")
    .select("*, enrollment(count)")
    .eq("instructor_profile_id", profile.instructor_profile_id)
    .order("created_at", { ascending: false });

  const courseList = courses || [];

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Course Management</h1>
          <p className="text-text-muted">
            Create and manage your courses, modules, and lessons.
          </p>
        </div>
        <Link
          href="/instructor/courses/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-light transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Course
        </Link>
      </header>

      {courseList.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="You haven't created any courses yet. Click 'Create Course' to get started."
          icon={<BookOpen className="w-8 h-8 text-primary" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course: any) => (
            <div
              key={course.course_id}
              className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm group hover:border-primary/50 transition-colors flex flex-col"
            >
              <div className="p-5 border-b border-border flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-accent bg-bg-dark px-2 py-1 rounded-md tracking-wide">
                    {course.course_code}
                  </span>
                  <StatusBadge status={course.status} />
                </div>
                <h3 className="font-bold text-lg text-text mb-2 line-clamp-1">
                  {course.course_title}
                </h3>
                <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
                  {course.description || "No description provided."}
                </p>
              </div>
              <div className="p-4 bg-bg-page/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-text-muted font-medium">
                  <Users className="w-4 h-4" />
                  {/* @ts-ignore */}
                  {course.enrollment[0]?.count || 0} Students
                </div>
                <Link
                  href={`/instructor/courses/${course.course_id}`}
                  className="text-sm text-primary font-medium hover:underline px-2 py-1"
                >
                  Edit Course &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
