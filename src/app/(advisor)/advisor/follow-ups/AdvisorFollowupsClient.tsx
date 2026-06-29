"use client";

import { useState } from "react";
import { MessageSquarePlus, Clock, User, CheckCircle2, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  followups: any[];
  advisorProfileId: number;
}

export function AdvisorFollowupsClient({ followups: initialFollowups, advisorProfileId }: Props) {
  const [followups, setFollowups] = useState(initialFollowups);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-xl shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom duration-300">
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-danger" />
          )}
          <span className="text-sm font-semibold text-text">{toast.message}</span>
        </div>
      )}

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Advisory Follow-ups</h1>
          <p className="text-text-muted">Log interventions and follow-up activities with advisees.</p>
        </div>
        <button
          onClick={() => showToast("Intervention log helper opened. You can add a new follow-up from My Advisees.")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" /> New Follow-up
        </button>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {followups.length === 0 ? (
          <div className="p-8 text-center text-text-muted italic">
            No advisory follow-ups logged yet.
          </div>
        ) : (
          followups.map((f) => (
            <div key={f.follow_up_id} className="p-6 hover:bg-bg-page/40 transition-colors flex justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text font-bold">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-text-muted" /> {f.student_profile?.user?.full_name}
                  </span>
                  {f.instructor_profile && (
                    <span className="text-xs font-semibold text-accent bg-bg-dark px-2 py-0.5 rounded border border-border">
                      Instructor: {f.instructor_profile.user?.full_name}
                    </span>
                  )}
                  <span className="text-xs text-text-muted font-normal text-right">
                    • {new Date(f.logged_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{f.message}</p>
                {f.next_action && (
                  <p className="text-xs text-primary font-semibold">Next Action: {f.next_action}</p>
                )}
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold leading-none bg-success-bg/40 text-success">
                <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
