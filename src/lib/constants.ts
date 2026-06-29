export type RoleId = "student" | "instructor" | "advisor" | "admin";

export type RoleName = "Student" | "Instructor" | "Academic Advisor" | "Admin";

export const ROLE_MAP: Record<RoleName, RoleId> = {
  Student: "student",
  Instructor: "instructor",
  "Academic Advisor": "advisor",
  Admin: "admin",
};

export const ROLE_LABEL: Record<RoleId, string> = {
  student: "Student",
  instructor: "Instructor",
  advisor: "Academic Advisor",
  admin: "Admin",
};

export const ROLE_DASHBOARD_PATH: Record<RoleId, string> = {
  student: "/student",
  instructor: "/instructor",
  advisor: "/advisor",
  admin: "/admin",
};

export type NavItem = {
  label: string;
  href: string;
  icon: string; // lucide icon name
};

export const ROLE_NAV: Record<RoleId, NavItem[]> = {
  student: [
    { label: "Dashboard", href: "/student", icon: "LayoutDashboard" },
    { label: "My Courses", href: "/student/courses", icon: "BookOpen" },
    { label: "Grades", href: "/student/grades", icon: "GraduationCap" },
    { label: "Notifications", href: "/student/notifications", icon: "Bell" },
    { label: "Profile", href: "/student/profile", icon: "UserCog" },
  ],
  instructor: [
    { label: "Dashboard", href: "/instructor", icon: "LayoutDashboard" },
    { label: "My Courses", href: "/instructor/courses", icon: "BookOpen" },
    { label: "Analytics", href: "/instructor/analytics", icon: "ChartNoAxesColumnIncreasing" },
    { label: "Profile", href: "/instructor/profile", icon: "UserCog" },
  ],
  advisor: [
    { label: "Dashboard", href: "/advisor", icon: "LayoutDashboard" },
    { label: "My Students", href: "/advisor/students", icon: "UsersRound" },
    { label: "Follow-Up History", href: "/advisor/follow-ups", icon: "History" },
    { label: "Profile", href: "/advisor/profile", icon: "UserCog" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { label: "Users", href: "/admin/users", icon: "UsersRound" },
    { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
    { label: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
    { label: "Analytics", href: "/admin/analytics", icon: "ChartNoAxesColumnIncreasing" },
  ],
};

/** Public routes that don't require authentication */
export const PUBLIC_ROUTES = ["/login", "/register", "/pending"];

/** Routes prefixed by role — used for middleware enforcement */
export const PROTECTED_PREFIXES = ["/student", "/instructor", "/advisor", "/admin"];
