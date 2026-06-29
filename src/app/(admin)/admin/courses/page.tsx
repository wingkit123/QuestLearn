import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("course")
    .select(`
      *,
      instructor_profile (
        user:user_id ( full_name )
      ),
      enrollment ( count )
    `)
    .order("created_at", { ascending: false });

  const courseList = courses || [];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Global Course Registry</h1>
        <p className="text-text-muted">
          Overview of all courses and student enrollments. Manage course registries as an administrator.
        </p>
      </header>

      {courseList.length === 0 ? (
        <EmptyState
          title="No courses registered"
          description="There are currently no courses created in the platform."
          icon={<BookOpen className="w-8 h-8 text-primary" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course: any) => (
            <div
              key={course.course_id}
              className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm group hover:border-primary/50 transition-all flex flex-col"
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
                <p className="text-xs text-text-muted mb-2">
                  Instructor: {course.instructor_profile?.user?.full_name || "Unknown"}
                </p>
                <p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
                  {course.description || "No description provided."}
                </p>
              </div>
              <div className="p-4 bg-bg-page/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-text-muted font-medium">
                  <Users className="w-4 h-4" />
                  {course.enrollment?.[0]?.count || 0} Students Enrolled
                </div>
                <Link
                  href={`/admin/courses/${course.course_id}`}
                  className="text-sm text-primary font-medium hover:underline px-2 py-1 flex items-center gap-1"
                >
                  Manage Registries <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
