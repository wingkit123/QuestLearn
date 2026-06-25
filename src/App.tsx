import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  ShieldCheck,
  UserCog,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import {
  getDashboardForRole,
  getEvidenceCounts,
  getRoleTabs,
  type DashboardData,
  type RoleId,
  type RoleSection
} from "./data/questlearn";

const roleIds: RoleId[] = ["student", "instructor", "advisor", "admin"];

function getInitialRole(): RoleId {
  const role = new URLSearchParams(window.location.search).get("role");
  return roleIds.includes(role as RoleId) ? (role as RoleId) : "student";
}

const navIconMap: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  "My Courses": BookOpen,
  Courses: BookOpen,
  Lessons: BookOpen,
  Quizzes: FileQuestion,
  Grades: GraduationCap,
  Notifications: Bell,
  "Question Bank": FileQuestion,
  Assessments: ClipboardCheck,
  Analytics: ChartNoAxesColumnIncreasing,
  "My Students": UsersRound,
  "Risk Alerts": ShieldCheck,
  "Follow-ups": Megaphone,
  "Progress Summary": ChartNoAxesColumnIncreasing,
  Users: UsersRound,
  Roles: UserCog,
  Content: BookOpen,
  Announcements: Megaphone,
  Audit: ShieldCheck
};

function StatusBadge({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}

function MetricCard({ label, value, detail }: DashboardData["primaryMetric"]) {
  return (
    <section className="metric-card" aria-label={label}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </section>
  );
}

function RoleSectionPanel({ section }: { section: RoleSection }) {
  return (
    <section className="panel workflow-panel">
      <div className="panel-heading">
        <div>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <ClipboardCheck aria-hidden="true" />
      </div>

      <div className="workflow-list">
        {section.items.map((item) => (
          <article className="workflow-row" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <StatusBadge status={item.status} />
          </article>
        ))}
      </div>
    </section>
  );
}

function AccessPanel({ dashboard }: { dashboard: DashboardData }) {
  return (
    <section className="panel access-panel">
      <div className="panel-heading">
        <div>
          <h2>Role permissions</h2>
          <p>Visible access boundary for the selected actor. UI checks must match Supabase RLS policies.</p>
        </div>
        <ShieldCheck aria-hidden="true" />
      </div>

      <div className="permission-grid">
        <div>
          <h3>Allowed functions</h3>
          <ul className="permission-list">
            {dashboard.allowedActions.map((action) => (
              <li className="allowed" key={action}>
                Allowed: {action.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Blocked functions</h3>
          <ul className="permission-list">
            {dashboard.blockedActions.map((action) => (
              <li className="blocked" key={action}>
                Blocked: {action.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EvidenceStrip() {
  const counts = getEvidenceCounts();

  return (
    <section className="evidence-strip" aria-label="Part III evidence status">
      <div>
        <span>Pending evidence</span>
        <strong>{counts.pending}</strong>
      </div>
      <div>
        <span>Captured</span>
        <strong>{counts.captured}</strong>
      </div>
      <div>
        <span>Inserted</span>
        <strong>{counts.inserted}</strong>
      </div>
      <div>
        <span>Not implemented</span>
        <strong>{counts.notImplemented}</strong>
      </div>
    </section>
  );
}

export default function App() {
  const [activeRole, setActiveRole] = useState<RoleId>(getInitialRole);
  const roleTabs = useMemo(() => getRoleTabs(), []);
  const dashboard = getDashboardForRole(activeRole);

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <span>QL</span>
          <div>
            <strong>QuestLearn</strong>
            <small>Part III prototype</small>
          </div>
        </div>
        <nav>
          {dashboard.navigation.map((label) => {
            const Icon = navIconMap[label] ?? LayoutDashboard;

            return (
              <a href={`#${label.toLowerCase().replace(/\s+/g, "-")}`} key={label}>
                <Icon aria-hidden="true" />
                {label}
              </a>
            );
          })}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>QuestLearn control room</h1>
            <p>Role-specific MVP shell aligned to Part I requirements, Part II interfaces, and Part III evidence.</p>
          </div>
          <button className="notification-button" type="button" aria-label="Open notifications">
            <Bell aria-hidden="true" />
          </button>
        </header>

        <section className="role-tabs" aria-label="Role dashboards">
          {roleTabs.map((role) => (
            <button
              aria-pressed={activeRole === role.id}
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              type="button"
            >
              {role.label}
            </button>
          ))}
        </section>

        <section className="hero-row">
          <div className="hero-copy">
            <span>{dashboard.role.label}</span>
            <h2>{dashboard.headline}</h2>
            <p>{dashboard.role.summary}</p>
          </div>
          <div className="metric-grid">
            <MetricCard {...dashboard.primaryMetric} />
            <MetricCard {...dashboard.secondaryMetric} />
          </div>
        </section>

        <EvidenceStrip />

        <section className="dashboard-grid">
          {dashboard.sections.map((section) => (
            <RoleSectionPanel key={section.title} section={section} />
          ))}
          <AccessPanel dashboard={dashboard} />
        </section>
      </section>
    </main>
  );
}
