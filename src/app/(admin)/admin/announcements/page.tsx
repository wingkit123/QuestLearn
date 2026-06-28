import { getCurrentUser } from "@/lib/auth/helpers";
import { Megaphone, MessageSquarePlus, Clock, Trash } from "lucide-react";

export default async function AdminAnnouncementsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const announcements = [
    { title: "QuestLearn Demo Announcement", message: "New SEF lesson content and quiz practice are available.", scope: "platform" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Platform Announcements</h1>
          <p className="text-text-muted">Broadcast important updates to students, instructors, and advisors.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors">
          <MessageSquarePlus className="w-4 h-4" /> Create Broadcast
        </button>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {announcements.map((a, idx) => (
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
            <button className="text-sm font-semibold text-danger hover:text-danger-light p-2 transition-colors">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
