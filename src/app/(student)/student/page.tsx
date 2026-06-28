import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { CourseCard } from "@/components/student/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen, GraduationCap, Clock, CheckSquare, Eye } from "lucide-react";
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
    const courseAvg = cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
    totalProgress += courseAvg;
  });
  const avgOverallProgress =
    activeEnrollments.length > 0
      ? Math.round(totalProgress / activeEnrollments.length)
      : 0;

  // Count pending deadlines
  const { count: pendingDeadlines } = await supabase
    .from("assignment")
    .select("assignment_id", { count: "exact", head: true })
    .in(
      "course_id",
      activeEnrollments.map((e) => e.course_id)
    )
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Your Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text">Your Courses</h2>
          </div>

          {activeEnrollments.length === 0 ? (
            <EmptyState
              title="No Active Courses"
              description="You are not currently enrolled in any courses. Check back later or contact your advisor."
              icon={<BookOpen className="w-8 h-8 text-primary" />}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Right: Recent Activity Log */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm h-fit space-y-4">
          <h2 className="text-xl font-bold text-text flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Recent Activity Log
          </h2>
          <div className="space-y-4">
            {[
              { text: "Watched Video: UML Diagrams", time: "10 minutes ago", icon: Eye, color: "text-primary bg-primary/10 border-primary/20" },
              { text: "Attempted Quiz: Testing Strategies", time: "2 hours ago", icon: CheckSquare, color: "text-warning bg-warning/10 border-warning/20" },
              { text: "Visited: Course Syllabus", time: "Yesterday", icon: BookOpen, color: "text-neutral bg-neutral-bg text-neutral border-neutral/20" },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-3 bg-bg-page/40 rounded-lg border border-border">
                  <div className={`p-1.5 rounded-lg border mt-0.5 shrink-0 ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text leading-snug">{activity.text}</p>
                    <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
