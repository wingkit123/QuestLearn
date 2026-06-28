import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { BookOpen, Users, FileSignature, CheckCircle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default async function InstructorDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch profile
  const { data: profile } = await supabase
    .from("instructor_profile")
    .select("instructor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!profile) return null;

  // Fetch owned courses with enrollment counts
  const { data: courses } = await supabase
    .from("course")
    .select("*, enrollment(count)")
    .eq("instructor_profile_id", profile.instructor_profile_id)
    .eq("status", "active");

  const activeCourses = courses || [];
  const courseIds = activeCourses.map((c) => c.course_id);

  // Total students
  const totalStudents = activeCourses.reduce(
    (acc, c: any) => acc + (c.enrollment?.[0]?.count || 0),
    0
  );

  // Fetch pending submissions
  let pendingSubmissions = [];
  if (courseIds.length > 0) {
    const { data: assignments } = await supabase
      .from("assignment")
      .select("assignment_id")
      .in("course_id", courseIds);

    const assignmentIds = (assignments || []).map((a) => a.assignment_id);

    if (assignmentIds.length > 0) {
      const { data: subs } = await supabase
        .from("assignment_submission")
        .select(`
          *,
          assignment:assignment_id(
            assignment_title, 
            course:course_id(course_code, course_title)
          ),
          student_profile:student_profile_id(
            user:user_id(full_name)
          )
        `)
        .eq("status", "submitted")
        .in("assignment_id", assignmentIds)
        .order("submitted_at", { ascending: true })
        .limit(5);
        
      pendingSubmissions = subs || [];
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">
          Instructor Dashboard
        </h1>
        <p className="text-text-muted">
          Welcome back, {user.fullName.split(" ")[0]}. Here&apos;s what&apos;s happening in your classes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Active Courses"
          value={activeCourses.length}
          icon={BookOpen}
        />
        <MetricCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
        />
        <MetricCard
          title="To Grade"
          value={pendingSubmissions.length}
          icon={FileSignature}
          className={pendingSubmissions.length > 0 ? "border-warning/50 bg-warning-bg/30" : ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text">Needs Grading</h2>
            <Link href="/instructor/grading" className="text-sm text-primary hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            {pendingSubmissions.length === 0 ? (
              <EmptyState
                title="All caught up!"
                description="There are no pending submissions to grade right now."
                icon={<CheckCircle className="w-8 h-8 text-success" />}
                className="border-0 border-b-0 rounded-none bg-transparent shadow-none"
              />
            ) : (
              <div className="divide-y divide-border">
                {pendingSubmissions.map((sub: any) => (
                  <Link
                    key={sub.submission_id}
                    href={`/instructor/grading/${sub.submission_id}`}
                    className="block p-4 hover:bg-bg-page/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-semibold text-text">
                        {/* @ts-ignore */}
                        {sub.student_profile?.user?.full_name}
                      </div>
                      <span className="text-xs text-text-muted">
                        {new Date(sub.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-text-muted mb-2 line-clamp-1">
                      {/* @ts-ignore */}
                      {sub.assignment?.course?.course_code} — {sub.assignment?.assignment_title}
                    </div>
                    <StatusBadge status="under_review" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text">My Courses</h2>
            <Link href="/instructor/courses" className="text-sm text-primary hover:underline font-medium">
              Manage courses
            </Link>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            {activeCourses.length === 0 ? (
              <EmptyState
                title="No Courses"
                description="You haven't created any courses yet."
                className="border-0 border-b-0 rounded-none bg-transparent shadow-none"
              />
            ) : (
              <div className="divide-y divide-border">
                {activeCourses.map((course: any) => (
                  <Link
                    key={course.course_id}
                    href={`/instructor/courses/${course.course_id}`}
                    className="flex items-center justify-between p-4 hover:bg-bg-page/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-accent bg-bg-dark px-1.5 py-0.5 rounded tracking-wide">
                          {course.course_code}
                        </span>
                        <span className="font-semibold text-text">
                          {course.course_title}
                        </span>
                      </div>
                      <div className="text-sm text-text-muted">
                        {/* @ts-ignore */}
                        {course.enrollment[0]?.count || 0} students enrolled
                      </div>
                    </div>
                    <StatusBadge status={course.status} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
