import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { CourseCard } from "@/components/student/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen, GraduationCap, Clock } from "lucide-react";
import type { EnrolledCourse } from "@/types/database";

export default async function StudentDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch student profile ID
  const { data: profile } = await supabase
    .from("student_profile")
    .select("student_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) {
    return (
      <div className="p-4 bg-danger-bg text-danger rounded-lg">
        Student profile not found.
      </div>
    );
  }

  // Fetch enrolled courses
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
    .eq("status", "active")
    .returns<EnrolledCourse[]>();

  // Fetch progress records for these courses
  // In a real app, this would be a custom DB function or view. For now we do it in TS.
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

  // Group progress by course
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

  const activeEnrollments = enrollments || [];

  // Calculate overall progress
  let totalProgress = 0;
  activeEnrollments.forEach((e) => {
    const cp = courseProgressMap.get(e.course_id);
    // If a course has no lessons tracked yet, it's 0%
    const courseAvg = cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
    totalProgress += courseAvg;
  });
  const avgOverallProgress =
    activeEnrollments.length > 0
      ? Math.round(totalProgress / activeEnrollments.length)
      : 0;

  // Count pending deadlines (Mocked logic: just find any assignments not submitted)
  const { count: pendingDeadlines } = await supabase
    .from("assignment")
    .select("assignment_id", { count: "exact", head: true })
    .in(
      "course_id",
      activeEnrollments.map((e) => e.course_id)
    )
    // In real app, we'd filter out submitted ones
    .gt("deadline", new Date().toISOString());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">
          Welcome back, {user.fullName.split(" ")[0]}! 👋
        </h1>
        <p className="text-text-muted">
          Here&apos;s an overview of your learning progress today.
        </p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Active Courses"
          value={activeEnrollments.length}
          icon={BookOpen}
        />
        <MetricCard
          title="Overall Progress"
          value={`${avgOverallProgress}%`}
          icon={GraduationCap}
        />
        <MetricCard
          title="Upcoming Deadlines"
          value={pendingDeadlines || 0}
          icon={Clock}
          className={
            (pendingDeadlines || 0) > 0 ? "border-warning/50 bg-warning-bg/30" : ""
          }
        />
      </div>

      {/* Enrolled Courses Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Your Courses</h2>
        </div>

        {activeEnrollments.length === 0 ? (
          <EmptyState
            title="No Active Courses"
            description="You are not currently enrolled in any courses. Check back later or contact your advisor."
            icon={<BookOpen className="w-8 h-8 text-primary" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEnrollments.map((enrollment) => {
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
    </div>
  );
}
