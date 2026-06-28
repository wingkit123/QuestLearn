import { getCurrentUser } from "@/lib/auth/helpers";
import { Users, Award, TrendingUp, BookOpen, Clock, BarChart2, PieChart } from "lucide-react";
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Students" value="234" icon={Users} />
        <MetricCard title="Average Quiz Score" value="74%" icon={Award} />
        <MetricCard title="Average Completion Rate" value="88%" icon={TrendingUp} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Performance Distribution */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" /> Student Performance Distribution
            </h2>
            <span className="text-xs text-text-muted">Quiz 1: Testing Strategies</span>
          </div>

          {/* CSS Chart Mockup */}
          <div className="space-y-4">
            <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { label: "<50% (Fail)", value: 40, color: "bg-danger", count: 12 },
                { label: "50-70% (Pass)", value: 65, color: "bg-warning", count: 48 },
                { label: "70-85% (Credit)", value: 90, color: "bg-primary", count: 114 },
                { label: "85-100% (High)", value: 50, color: "bg-success", count: 60 },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  {/* Tooltip */}
                  <span className="opacity-0 group-hover:opacity-100 bg-bg-dark text-white text-[10px] font-bold py-1 px-2 rounded absolute -translate-y-12 transition-opacity shadow pointer-events-none">
                    {bar.count} Students
                  </span>
                  {/* Bar */}
                  <div
                    style={{ height: `${bar.value}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 opacity-80 group-hover:opacity-100 ${bar.color}`}
                  />
                  {/* Label */}
                  <span className="text-[10px] sm:text-xs text-text-muted font-medium text-center truncate w-full">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Course Engagement */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-lg font-bold text-text flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" /> Course Engagement
            </h2>
            <span className="text-xs text-text-muted">Weekly Active Rate</span>
          </div>

          <div className="space-y-4">
            {/* Horizontal progress indicators looking like a breakdown report */}
            <div className="space-y-4">
              {[
                { title: "Requirements Analysis", value: 94, color: "bg-primary" },
                { title: "Software Design", value: 81, color: "bg-success" },
                { title: "Testing Strategies", value: 40, color: "bg-danger" },
                { title: "Project Management", value: 62, color: "bg-warning" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-text">{item.title}</span>
                    <span className="text-text-muted">{item.value}% Active</span>
                  </div>
                  <div className="h-2 w-full bg-bg-page rounded-full overflow-hidden border border-border">
                    <div
                      style={{ width: `${item.value}%` }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
