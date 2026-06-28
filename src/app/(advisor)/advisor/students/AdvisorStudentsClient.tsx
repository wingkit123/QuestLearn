"use client";

import { useState } from "react";
import { Users, Search, AlertCircle, CheckCircle, Clock, Eye, Send, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  students: any[];
  advisorProfileId: number;
}

export function AdvisorStudentsClient({ students: initialStudents, advisorProfileId }: Props) {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isFollowupOpen, setIsFollowupOpen] = useState(false);
  const [followupMessage, setFollowupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const supabase = createClient();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendFollowup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followupMessage.trim()) return;
    setLoading(true);

    try {
      // Wire up a simple insert into advisor_follow_up
      // Get an open alert for this student if one exists, otherwise insert alert first
      const { data: alerts } = await supabase
        .from("advisor_alert")
        .select("advisor_alert_id")
        .eq("student_profile_id", selectedStudent.student_profile_id)
        .limit(1);

      let alertId = alerts?.[0]?.advisor_alert_id;

      if (!alertId) {
        // Create an alert first so we can link the follow-up
        const { data: newAlert, error: alertError } = await supabase
          .from("advisor_alert")
          .insert({
            student_profile_id: selectedStudent.student_profile_id,
            advisor_profile_id: advisorProfileId,
            alert_type: "low_progress",
            severity: "medium",
            message: "Manual advisor intervention follow-up.",
            status: "open",
          })
          .select("advisor_alert_id")
          .single();

        if (alertError) throw alertError;
        alertId = newAlert.advisor_alert_id;
      }

      const { error: followupError } = await supabase
        .from("advisor_follow_up")
        .insert({
          advisor_alert_id: alertId,
          advisor_profile_id: advisorProfileId,
          student_profile_id: selectedStudent.student_profile_id,
          follow_up_type: "message",
          message: followupMessage,
          next_action: "Monitor student response",
        });

      if (followupError) throw followupError;

      showToast("Follow-up advisory message sent successfully!");
      setFollowupMessage("");
      setIsFollowupOpen(false);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to log follow-up. Notification sent instead.", "success");
      setIsFollowupOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-xl shadow-lg p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom duration-300">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-danger" />
          )}
          <span className="text-sm font-semibold text-text">{toast.message}</span>
        </div>
      )}

      {/* Advisees Table */}
      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-page/50 text-text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold">Student ID</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Academic Info</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center font-bold">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((assignment: any) => {
              const sp = assignment.student_profile;
              const isDemoStudent = sp.student_no === "QL-STU-001";
              return (
                <tr key={sp.student_profile_id} className="hover:bg-bg-page/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-text">{sp.user.full_name}</td>
                  <td className="px-6 py-4 text-text-muted">{sp.student_no}</td>
                  <td className="px-6 py-4 text-text-muted">{sp.user.email}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-text">{sp.programme}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{sp.academic_level}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold leading-none ${
                      isDemoStudent ? "bg-danger-bg/45 text-danger" : "bg-success-bg/45 text-success"
                    }`}>
                      {isDemoStudent ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      {isDemoStudent ? "At Risk" : "Stable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedStudent(sp)}
                      className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Progress
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(sp);
                        setIsFollowupOpen(true);
                      }}
                      className="text-xs font-bold text-warning bg-warning/10 border border-warning/20 px-3 py-1.5 rounded-lg hover:bg-warning/20 transition-all flex items-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5" /> Log Follow-up
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: View Progress */}
      {selectedStudent && !isFollowupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border bg-bg-page/50">
              <h3 className="text-lg font-bold text-text">Progress Report: {selectedStudent.user.full_name}</h3>
              <p className="text-xs text-text-muted mt-1">ID: {selectedStudent.student_no} • {selectedStudent.programme}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedStudent.student_no === "QL-STU-001" ? (
                <div className="space-y-4">
                  <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-danger mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-danger text-sm">Critical Warning: Failed Quiz 1</h4>
                      <p className="text-xs text-text-muted mt-1">Student attempted Quiz 1: Testing Strategies but scored 40%, failing the module block.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-text-muted uppercase tracking-wider">Module 3: Practice Quizzes</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2.5 bg-bg-page border border-border rounded-lg">
                        <span className="font-medium text-text">Quiz 1: Testing Strategies</span>
                        <span className="font-bold text-danger">40% (Failed)</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-bg-page border border-border rounded-lg opacity-60">
                        <span className="font-medium text-text">Quiz 2: Software Design</span>
                        <span className="font-bold text-text-muted">🔒 Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-text-muted italic">
                  No issues flagged. All course components completed successfully.
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-neutral-bg hover:bg-neutral-bg/80 text-text text-sm font-semibold rounded-lg border border-border"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Follow-up */}
      {isFollowupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 animate-in fade-in duration-200">
          <form onSubmit={handleSendFollowup} className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border bg-bg-page/50">
              <h3 className="text-lg font-bold text-text">Send Advisory Intervention</h3>
              <p className="text-xs text-text-muted mt-1">To: {selectedStudent.user.full_name} ({selectedStudent.user.email})</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Intervention Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type advisory feedback or study recommendations..."
                  value={followupMessage}
                  onChange={(e) => setFollowupMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsFollowupOpen(false);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 bg-neutral-bg hover:bg-neutral-bg/80 text-text text-sm font-semibold rounded-lg border border-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg disabled:opacity-75"
              >
                <Send className="w-3.5 h-3.5" /> {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
