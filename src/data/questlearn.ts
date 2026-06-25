export type RoleId = "student" | "instructor" | "advisor" | "admin";

export type QuestLearnRole = {
  id: RoleId;
  label: string;
  summary: string;
};

export type WorkStatus = "Ready" | "Review" | "Attention" | "Draft" | "Blocked";

export type RoleSectionItem = {
  title: string;
  detail: string;
  status: WorkStatus;
};

export type RoleSection = {
  title: string;
  description: string;
  items: RoleSectionItem[];
};

export type PermissionModel = {
  canAttemptQuiz: boolean;
  canSubmitAssignment: boolean;
  canCreateCourse: boolean;
  canPublishContent: boolean;
  canReviewAdvisorAlerts: boolean;
  canSendAdvisorFollowUp: boolean;
  canManageUsers: boolean;
  canAssignRoles: boolean;
  canModerateContent: boolean;
  canCreateAnnouncements: boolean;
};

export type DashboardData = {
  role: QuestLearnRole;
  headline: string;
  navigation: string[];
  primaryMetric: {
    label: string;
    value: string;
    detail: string;
  };
  secondaryMetric: {
    label: string;
    value: string;
    detail: string;
  };
  sections: RoleSection[];
  allowedActions: string[];
  blockedActions: string[];
  permissions: PermissionModel;
};

export const questLearnRoles: QuestLearnRole[] = [
  {
    id: "student",
    label: "Student",
    summary: "Access enrolled courses, complete lessons and assessments, and review personal feedback."
  },
  {
    id: "instructor",
    label: "Instructor",
    summary: "Create courses, publish learning content, configure assessments, and review class analytics."
  },
  {
    id: "advisor",
    label: "Academic Advisor",
    summary: "Monitor assigned students, review early alerts, and record academic follow-up actions."
  },
  {
    id: "admin",
    label: "Admin",
    summary: "Manage users, roles, instructor approvals, content moderation, announcements, and audit evidence."
  }
];

const permissions: Record<RoleId, PermissionModel> = {
  student: {
    canAttemptQuiz: true,
    canSubmitAssignment: true,
    canCreateCourse: false,
    canPublishContent: false,
    canReviewAdvisorAlerts: false,
    canSendAdvisorFollowUp: false,
    canManageUsers: false,
    canAssignRoles: false,
    canModerateContent: false,
    canCreateAnnouncements: false
  },
  instructor: {
    canAttemptQuiz: false,
    canSubmitAssignment: false,
    canCreateCourse: true,
    canPublishContent: true,
    canReviewAdvisorAlerts: false,
    canSendAdvisorFollowUp: false,
    canManageUsers: false,
    canAssignRoles: false,
    canModerateContent: false,
    canCreateAnnouncements: true
  },
  advisor: {
    canAttemptQuiz: false,
    canSubmitAssignment: false,
    canCreateCourse: false,
    canPublishContent: false,
    canReviewAdvisorAlerts: true,
    canSendAdvisorFollowUp: true,
    canManageUsers: false,
    canAssignRoles: false,
    canModerateContent: false,
    canCreateAnnouncements: false
  },
  admin: {
    canAttemptQuiz: false,
    canSubmitAssignment: false,
    canCreateCourse: false,
    canPublishContent: false,
    canReviewAdvisorAlerts: false,
    canSendAdvisorFollowUp: false,
    canManageUsers: true,
    canAssignRoles: true,
    canModerateContent: true,
    canCreateAnnouncements: true
  }
};

const dashboards: Record<RoleId, DashboardData> = {
  student: {
    role: questLearnRoles[0],
    headline: "Personal learning workspace",
    navigation: ["Dashboard", "My Courses", "Lessons", "Quizzes", "Grades", "Notifications"],
    primaryMetric: {
      label: "Course progress",
      value: "64%",
      detail: "2 of 3 lessons started in SEF Design Basics"
    },
    secondaryMetric: {
      label: "Latest quiz",
      value: "10 / 15",
      detail: "Review architecture and security weak topics"
    },
    sections: [
      {
        title: "My learning path",
        description: "Student-only course, module, lesson, and completion workflow from UC-02.",
        items: [
          {
            title: "Start next lesson",
            detail: "Open Architecture Layers with video, reading, and H5P activity.",
            status: "Ready"
          },
          {
            title: "Review weak topics",
            detail: "Automated quiz feedback highlights Architecture layers and RLS responsibility.",
            status: "Attention"
          },
          {
            title: "Check assignment status",
            detail: "Draft assignment is due soon and appears in the student's notification inbox.",
            status: "Review"
          }
        ]
      },
      {
        title: "Quiz and progress feedback",
        description: "Student-only assessment history, automated feedback, progress, and recommended next steps.",
        items: [
          {
            title: "Attempt quiz",
            detail: "Answer MCQ, fill-in-the-blank, and short-answer questions where available.",
            status: "Ready"
          },
          {
            title: "View grades",
            detail: "Read quiz history, assignment status, and overall course completion.",
            status: "Ready"
          }
        ]
      }
    ],
    allowedActions: ["Start lesson", "Attempt quiz", "Submit assignment", "View grades"],
    blockedActions: ["Create course", "Approve instructor account", "Assign roles", "Moderate content"],
    permissions: permissions.student
  },
  instructor: {
    role: questLearnRoles[1],
    headline: "Course and assessment workspace",
    navigation: ["Dashboard", "My Courses", "Question Bank", "Assessments", "Analytics"],
    primaryMetric: {
      label: "Published content",
      value: "3",
      detail: "Lessons visible to enrolled students"
    },
    secondaryMetric: {
      label: "Class average",
      value: "72%",
      detail: "Use Case and Architecture Check"
    },
    sections: [
      {
        title: "Course authoring",
        description: "Instructor-only course, module, lesson, video, reading, and H5P/Lumi publishing workflow.",
        items: [
          {
            title: "Create course",
            detail: "Create SEF Design Basics with modules, lessons, and ordered content items.",
            status: "Ready"
          },
          {
            title: "Publish lesson content",
            detail: "Make the Database Constraints lesson visible to enrolled students.",
            status: "Draft"
          },
          {
            title: "Send course announcement",
            detail: "Notify enrolled students when new lesson content is uploaded.",
            status: "Ready"
          }
        ]
      },
      {
        title: "Assessment and analytics",
        description: "Instructor-only question bank, assessment configuration, submissions, and class reports.",
        items: [
          {
            title: "Configure automated feedback",
            detail: "Attach feedback explanations to objective quiz questions.",
            status: "Review"
          },
          {
            title: "Review assignment submissions",
            detail: "Open submitted work and update grading status.",
            status: "Attention"
          },
          {
            title: "View class performance analytics",
            detail: "Read score distribution and course engagement charts.",
            status: "Ready"
          }
        ]
      }
    ],
    allowedActions: ["Create course", "Publish lesson", "Create quiz", "Review submissions", "View analytics"],
    blockedActions: ["Attempt quiz", "Submit assignment", "Assign roles", "Review advisor alerts"],
    permissions: permissions.instructor
  },
  advisor: {
    role: questLearnRoles[2],
    headline: "Early academic support dashboard",
    navigation: ["Dashboard", "My Students", "Risk Alerts", "Follow-ups", "Progress Summary"],
    primaryMetric: {
      label: "Risk queue",
      value: "1",
      detail: "Student requires follow-up"
    },
    secondaryMetric: {
      label: "Advisees monitored",
      value: "4",
      detail: "Across Software Engineering"
    },
    sections: [
      {
        title: "Advisor student monitoring",
        description: "Advisor-only assigned-student and department progress review from UC-08.",
        items: [
          {
            title: "View department students",
            detail: "Filter advisees by programme, progress, latest quiz score, and overdue work.",
            status: "Ready"
          },
          {
            title: "Review progress summary",
            detail: "Open course progress, quiz history, overdue assignments, and activity timeline.",
            status: "Attention"
          }
        ]
      },
      {
        title: "Advisor follow-up",
        description: "Advisor-only early alert review and follow-up recording workflow.",
        items: [
          {
            title: "Send advisory follow-up",
            detail: "Record a support message and next action for a student with low assignment progress.",
            status: "Ready"
          },
          {
            title: "Monitor follow-up status",
            detail: "Keep open alerts separate from reviewed and resolved alerts.",
            status: "Review"
          }
        ]
      }
    ],
    allowedActions: ["View department students", "Review advisor alerts", "Send advisory follow-up"],
    blockedActions: ["Create course", "Attempt quiz", "Approve instructor account", "Assign roles"],
    permissions: permissions.advisor
  },
  admin: {
    role: questLearnRoles[3],
    headline: "Governance and platform control",
    navigation: ["Dashboard", "Users", "Roles", "Content", "Announcements", "Audit"],
    primaryMetric: {
      label: "Open moderation",
      value: "1",
      detail: "Content item awaiting review"
    },
    secondaryMetric: {
      label: "Announcements",
      value: "2",
      detail: "One platform-wide update active"
    },
    sections: [
      {
        title: "User and role management",
        description: "Admin-only user lifecycle, role assignment, instructor approval, and password reset workflow.",
        items: [
          {
            title: "Approve instructor account",
            detail: "Review pending instructor registrations before course publishing is allowed.",
            status: "Review"
          },
          {
            title: "Assign roles",
            detail: "Update role mapping through trusted admin actions, not self-editable metadata.",
            status: "Ready"
          },
          {
            title: "Reset user password",
            detail: "Issue a temporary reset and record the sensitive action in the audit log.",
            status: "Ready"
          }
        ]
      },
      {
        title: "Moderation and announcements",
        description: "Admin-only content governance, announcement broadcast, and audit evidence workflow.",
        items: [
          {
            title: "Moderate content",
            detail: "Approve, update, or remove flagged lesson content and record the decision.",
            status: "Attention"
          },
          {
            title: "Create announcement",
            detail: "Broadcast a platform or course announcement to targeted users.",
            status: "Ready"
          },
          {
            title: "Review audit log",
            detail: "Confirm moderation, user, and announcement actions are traceable.",
            status: "Ready"
          }
        ]
      }
    ],
    allowedActions: ["Manage users", "Assign roles", "Approve instructor account", "Moderate content", "Create announcement"],
    blockedActions: ["Attempt quiz", "Submit assignment", "Create course", "Send advisory follow-up"],
    permissions: permissions.admin
  }
};

export function getDashboardForRole(roleId: RoleId): DashboardData {
  return dashboards[roleId];
}

export function getPermissionsForRole(roleId: RoleId): PermissionModel {
  return permissions[roleId];
}

export function getRoleTabs() {
  return questLearnRoles.map(({ id, label }) => ({ id, label }));
}

export function getEvidenceCounts() {
  return {
    pending: 28,
    captured: 4,
    inserted: 0,
    notImplemented: 0
  };
}
