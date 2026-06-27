import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, User, FileText, Link as LinkIcon } from "lucide-react";
import { GradingForm } from "./GradingForm";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface PageProps {
  params: Promise<{ submissionId: string }>;
}

export default async function GradingPage({ params }: PageProps) {
  const { submissionId } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== "instructor") return null;

  const supabase = await createClient();

  // Fetch submission details with relations
  const { data: submission } = await supabase
    .from("assignment_submission")
    .select(`
      *,
      assignment:assignment_id (
        *,
        course:course_id (
          course_title,
          course_code
        )
      ),
      student_profile:student_profile_id (
        student_no,
        user:user_id ( full_name, email )
      )
    `)
    .eq("submission_id", submissionId)
    .single();

  if (!submission) notFound();

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
      <Link
        href="/instructor"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Submission Info & Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-accent bg-bg-dark px-2.5 py-1 rounded-md tracking-wide mb-3 inline-block">
                  {/* @ts-ignore */}
                  {submission.assignment?.course?.course_code}
                </span>
                <h1 className="text-2xl font-bold text-text mb-2">
                  {/* @ts-ignore */}
                  {submission.assignment?.assignment_title}
                </h1>
                <p className="text-sm text-text-muted flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {/* @ts-ignore */}
                  {submission.student_profile?.user?.full_name} ({submission.student_profile?.student_no})
                </p>
              </div>
              <StatusBadge status={submission.grading_status as any} />
            </div>

            <div className="prose max-w-none p-6 bg-bg-page rounded-xl border border-border">
              <h3 className="flex items-center gap-2 font-bold text-text mb-4 text-lg">
                <FileText className="w-5 h-5 text-primary" /> Submitted Content
              </h3>
              
              {/* If it's a URL, show a link, otherwise show raw text */}
              {submission.submission_text?.startsWith("http") ? (
                <a href={submission.submission_text} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <LinkIcon className="w-5 h-5" />
                  {submission.submission_text}
                </a>
              ) : (
                <div className="whitespace-pre-wrap text-text font-medium leading-relaxed bg-surface p-4 rounded-lg border border-border shadow-inner">
                  {submission.submission_text}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-text-muted text-right">
              Submitted on: {new Date(submission.submitted_at).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Right Col: Grading Panel */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl border border-border p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-text mb-6 border-b border-border pb-4">
              Evaluation
            </h2>
            <GradingForm 
              submissionId={parseInt(submissionId)}
              initialScore={submission.score}
              initialFeedback={submission.feedback}
              maxScore={100} // Mocked max score
              status={submission.grading_status}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
