import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import { BrainCircuit, FileText, CheckCircle2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricCard } from "@/components/ui/MetricCard";

export default async function GradesPage() {
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

  // Fetch quiz attempts
  const { data: quizAttempts } = await supabase
    .from("quiz_attempt")
    .select(`
      *,
      quiz:quiz_id(
        quiz_title, 
        lesson:lesson_id(
          module:module_id(
            course:course_id(course_code)
          )
        )
      )
    `)
    .eq("student_profile_id", profile.student_profile_id)
    .order("submitted_at", { ascending: false });

  // Fetch assignment submissions
  const { data: assignmentSubmissions } = await supabase
    .from("assignment_submission")
    .select(`
      *,
      assignment:assignment_id(
        assignment_title, 
        course:course_id(course_code)
      )
    `)
    .eq("student_profile_id", profile.student_profile_id)
    .order("submitted_at", { ascending: false });

  // Combine and sort
  const allGrades = [
    ...(quizAttempts || []).map((a: any) => ({
      id: `q_${a.attempt_id}`,
      type: "quiz",
      title: a.quiz?.quiz_title,
      // @ts-ignore
      courseCode: a.quiz?.lesson?.module?.course?.course_code || "Unknown",
      score: a.score,
      maxScore: a.max_score,
      status: "graded", // Quizzes are auto-graded
      date: new Date(a.submitted_at),
      link: `/student/quizzes/${a.quiz_id}/results`,
    })),
    ...(assignmentSubmissions || []).map((a: any) => ({
      id: `a_${a.submission_id}`,
      type: "assignment",
      title: a.assignment?.assignment_title,
      courseCode: a.assignment?.course?.course_code || "Unknown",
      score: a.score,
      maxScore: 100, // Assuming 100 max for assignments, ideally from DB
      status: a.status, // 'submitted', 'graded', 'returned'
      date: new Date(a.submitted_at),
      link: "#", // Add link to assignment view if needed later
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Calculate Average Grade (Graded items only)
  let totalScore = 0;
  let totalMax = 0;
  allGrades.forEach((g) => {
    if (g.status === "graded" && g.score !== null) {
      totalScore += g.score;
      totalMax += g.maxScore;
    }
  });
  const avgGrade = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const totalCompleted = allGrades.filter(g => g.status === "graded").length;

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-2">Grades & History</h1>
        <p className="text-text-muted">
          Review your quiz results and assignment submissions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <MetricCard
          title="Average Grade"
          value={`${avgGrade}%`}
          icon={GraduationCap}
          description="Across all graded assessments"
        />
        <MetricCard
          title="Completed Assessments"
          value={totalCompleted}
          icon={CheckCircle2}
          description="Quizzes and assignments graded"
        />
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-text">Assessment History</h2>
        </div>
        
        {allGrades.length === 0 ? (
          <div className="p-6">
             <EmptyState
              title="No Grades Yet"
              description="You haven't completed any quizzes or assignments."
              icon={<GraduationCap className="w-8 h-8 text-primary" />}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-page/50 text-text-muted">
                <tr>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Assessment</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Score</th>
                  <th className="px-6 py-4 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allGrades.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-page/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-text bg-bg-page border border-border px-2 py-1 rounded-md text-xs">
                        {item.courseCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.type === "quiz" ? (
                        <Link href={item.link} className="font-medium text-text hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                      ) : (
                        <span className="font-medium text-text">{item.title}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        {item.type === "quiz" ? (
                          <><BrainCircuit className="w-4 h-4" /> Quiz</>
                        ) : (
                          <><FileText className="w-4 h-4" /> Assignment</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status as any} />
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {item.status === "graded" && item.score !== null ? (
                        <span className={item.score / item.maxScore >= 0.5 ? "text-success" : "text-danger"}>
                          {item.score} <span className="text-text-muted font-normal">/ {item.maxScore}</span>
                        </span>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">
                      {item.date.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
