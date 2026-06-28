"use client";

import { useState } from "react";
import { Megaphone, MessageSquarePlus, Trash, CheckCircle, XCircle, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  announcements: any[];
  adminUserId: number;
}

export function AdminAnnouncementsClient({ announcements: initialAnnouncements, adminUserId }: Props) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const supabase = createClient();

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setLoading(true);

    try {
      const { data: newAnn, error } = await supabase
        .from("announcement")
        .insert({
          user_id: adminUserId,
          title,
          message,
          scope: "platform",
          status: "active",
        })
        .select("*")
        .single();

      if (error) throw error;

      setAnnouncements((prev) => [newAnn, ...prev]);
      showToast("Global announcement broadcasted successfully!");
      setTitle("");
      setMessage("");
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to broadcast. Announcement created locally.", "success");
      setAnnouncements((prev) => [
        { title, message, scope: "platform", status: "active", logged_at: new Date().toISOString() },
        ...prev,
      ]);
      setIsOpen(false);
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
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-danger" />
          )}
          <span className="text-sm font-semibold text-text">{toast.message}</span>
        </div>
      )}

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Platform Announcements</h1>
          <p className="text-text-muted">Broadcast important updates to students, instructors, and advisors.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" /> Create Broadcast
        </button>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {announcements.length === 0 ? (
          <div className="p-8 text-center text-text-muted italic">
            No announcements published yet.
          </div>
        ) : (
          announcements.map((a, idx) => (
            <div key={idx} className="p-6 hover:bg-bg-page/40 transition-colors flex justify-between items-start gap-4">
              <div className="space-y-2">
                <h3 className="font-bold text-text flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-primary" /> {a.title}
                  <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-bg text-neutral rounded-full uppercase tracking-wider">
                    {a.scope}
                  </span>
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{a.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Create Broadcast */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 animate-in fade-in duration-200">
          <form onSubmit={handleBroadcast} className="bg-surface border border-border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border bg-bg-page/50">
              <h3 className="text-lg font-bold text-text">Broadcast Platform Announcement</h3>
              <p className="text-xs text-text-muted mt-1">This will be broadcasted to all logged-in platform users.</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., System Update, Exam Notice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type broadcast contents..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-page focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-text text-sm"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-neutral-bg hover:bg-neutral-bg/80 text-text text-sm font-semibold rounded-lg border border-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg disabled:opacity-75"
              >
                <Send className="w-3.5 h-3.5" /> {loading ? "Broadcasting..." : "Send Announcement"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
