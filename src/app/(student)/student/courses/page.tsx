import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/student/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen } from "lucide-react";
import type { EnrolledCourse } from "@/types/database";

export default async function StudentCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch student profile
  const { data: profile } = await supabase
    .from("student_profile")
    .select("student_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  // Fetch all enrollments
  const { data: enrollments } = await supabase
    .from("enrollment")
    .select(
      `
      *,
      course:course_id (
        *,
        instructor_profile:instructor_profile_id (
          *,
          user:user_id ( full_name )
        )
      )
    `
    )
    .eq("student_profile_id", profile.student_profile_id)
    .returns<EnrolledCourse[]>();

  // Fetch progress
  const { data: progressRecords } = await supabase
    .from("progress_record")
    .select(
      `
      percentage,
      lesson:lesson_id (
        module:module_id ( course_id )
      )
    `
    )
    .eq("student_profile_id", profile.student_profile_id);

  const courseProgressMap = new Map<number, { total: number; count: number }>();
  if (progressRecords) {
    progressRecords.forEach((record: any) => {
      const courseId = record.lesson?.module?.course_id;
      if (courseId) {
        const current = courseProgressMap.get(courseId) || { total: 0, count: 0 };
        courseProgressMap.set(courseId, {
          total: current.total + record.percentage,
          count: current.count + 1,
        });
      }
    });
  }

  const allCourses = enrollments || [];
  const activeCourses = allCourses.filter((c) => c.status === "active");
  const pastCourses = allCourses.filter((c) => c.status !== "active");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">My Courses</h1>
        <p className="text-text-muted">
          View all your current and past enrolled courses.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-bold text-text mb-4">Active Courses</h2>
        {activeCourses.length === 0 ? (
          <EmptyState
            title="No Active Courses"
            description="You are not currently taking any courses."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((enrollment) => {
              const cp = courseProgressMap.get(enrollment.course_id);
              const progressPercentage =
                cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
              return (
                <CourseCard
                  key={enrollment.enrollment_id}
                  enrollment={enrollment}
                  progressPercentage={progressPercentage}
                />
              );
            })}
          </div>
        )}
      </section>

      {pastCourses.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-text mb-4">Past Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale-[20%]">
            {pastCourses.map((enrollment) => {
              const cp = courseProgressMap.get(enrollment.course_id);
              const progressPercentage =
                cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
              return (
                <CourseCard
                  key={enrollment.enrollment_id}
                  enrollment={enrollment}
                  progressPercentage={progressPercentage}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
