import { getCurrentUser } from "@/lib/auth/helpers";
import { MessageSquarePlus, Clock, User, CheckCircle2 } from "lucide-react";

export default async function AdvisorFollowupsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const followups = [
    { id: 1, name: "Alice Johnson", date: "June 25, 2026", note: "Sent email requesting a 1-to-1 session to discuss testing strategies.", status: "Pending Response" },
    { id: 2, name: "Bob Smith", date: "June 24, 2026", note: "Conducted guidance meeting. Set study plan for Requirements module.", status: "Resolved" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Advisory Follow-ups</h1>
          <p className="text-text-muted">Log interventions and follow-up activities with advisees.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors">
          <MessageSquarePlus className="w-4 h-4" /> New Follow-up
        </button>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {followups.map((f) => (
          <div key={f.id} className="p-6 hover:bg-bg-page/40 transition-colors flex justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-text font-bold">
                <User className="w-4 h-4 text-text-muted" /> {f.name}
                <span className="text-xs text-text-muted font-normal">• {f.date}</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">{f.note}</p>
            </div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold leading-none ${
              f.status === "Resolved" ? "bg-success-bg/40 text-success" : "bg-warning-bg/40 text-warning"
            }`}>
              {f.status === "Resolved" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              {f.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
