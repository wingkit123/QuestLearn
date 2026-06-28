import { getCurrentUser } from "@/lib/auth/helpers";
import { Bell, Info, Award, Calendar, AlertTriangle } from "lucide-react";

export default async function StudentNotificationsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const notifications = [
    {
      id: 1,
      title: "New Course Material Available",
      message: "Module 3: Interactive Practice Quizzes has been published for Software Engineering Fundamentals.",
      time: "2 hours ago",
      type: "info",
      icon: Info,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      id: 2,
      title: "Quiz 1 Failed",
      message: "You scored 40% on Quiz 1: Testing Strategies. Please review the material and retake the quiz.",
      time: "1 day ago",
      type: "warning",
      icon: AlertTriangle,
      color: "text-warning bg-warning/10 border-warning/20",
    },
    {
      id: 3,
      title: "Platform Update",
      message: "System maintenance completed successfully. All services are fully operational.",
      time: "3 days ago",
      type: "info",
      icon: Info,
      color: "text-primary bg-primary/10 border-primary/20",
    },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Notifications</h1>
        <p className="text-text-muted">Stay updated with course announcements and platform alerts.</p>
      </header>

      <div className="bg-surface border border-border rounded-xl shadow-sm divide-y divide-border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-text-muted italic">
            You have no notifications at this time.
          </div>
        ) : (
          notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-6 flex items-start gap-4 hover:bg-bg-page/40 transition-colors">
                <div className={`p-2.5 rounded-lg border ${n.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-text">{n.title}</h3>
                    <span className="text-xs text-text-muted">{n.time}</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{n.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
