import { getCurrentUser } from "@/lib/auth/helpers";
import { ChartLine, TrendingUp, Users, HardDrive, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";

export default async function AdminAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Platform Overview</h1>
        <p className="text-text-muted">Global analytics and hardware performance indicators.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Registrations" value="459" icon={Users} />
        <MetricCard title="API Performance" value="99.9%" icon={ShieldCheck} className="border-success/50 bg-success-bg/30" />
        <MetricCard title="Storage Space" value="128 GB" icon={HardDrive} />
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-text">Activity Timeline</h2>
        <div className="space-y-4">
          {[
            { action: "AdminApproved", details: "Approved Demo Instructor account registration.", time: "1 hour ago" },
            { action: "QuizAttempt", details: "Demo Student failed Quiz 1 with score 40%.", time: "2 hours ago" },
            { action: "ContentModerated", details: "Approved Module 3 Interactive Practice Quizzes.", time: "4 hours ago" },
          ].map((log, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 bg-bg-page/40 rounded-lg border border-border">
              <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                {log.action}
              </span>
              <div className="flex-1">
                <p className="text-sm text-text font-medium">{log.details}</p>
                <p className="text-xs text-text-muted">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
