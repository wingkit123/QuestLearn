import { getCurrentUser } from "@/lib/auth/helpers";
import { ChartLine, TrendingUp, Users, Award, BookOpen, Clock } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";

export default async function InstructorAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Class Analytics</h1>
        <p className="text-text-muted">Monitor learning performance and progress trends across your courses.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Students" value="234" icon={Users} />
        <MetricCard title="Average Quiz Score" value="74%" icon={Award} />
        <MetricCard title="Average Completion Rate" value="88%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Active Lessons */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Most Engaging Lessons
          </h2>
          <div className="space-y-3">
            {[
              { title: "Writing Effective Use Cases", module: "Requirements", rate: "94%" },
              { title: "Layered Architecture Basics", module: "Design", rate: "91%" },
              { title: "Activity Diagrams for Workflows", module: "Requirements", rate: "86%" },
            ].map((lesson, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-bg-page/50 border border-border rounded-lg">
                <div>
                  <h3 className="font-semibold text-sm text-text">{lesson.title}</h3>
                  <p className="text-xs text-text-muted">{lesson.module}</p>
                </div>
                <span className="text-xs font-bold text-success bg-success-bg/20 px-2 py-1 rounded">
                  {lesson.rate} Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Pending Review Items
          </h2>
          <div className="space-y-3">
            {[
              { title: "Design Architecture Assignment", course: "QL-SEF101", count: 4 },
              { title: "Requirements Gathering Document", course: "QL-SEF101", count: 2 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-bg-page/50 border border-border rounded-lg">
                <div>
                  <h3 className="font-semibold text-sm text-text">{item.title}</h3>
                  <p className="text-xs text-text-muted">{item.course}</p>
                </div>
                <span className="text-xs font-bold text-warning bg-warning-bg/20 px-2 py-1 rounded">
                  {item.count} submissions
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
