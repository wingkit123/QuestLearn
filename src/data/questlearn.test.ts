import { describe, expect, it } from "vitest";
import {
  getDashboardForRole,
  getEvidenceCounts,
  getPermissionsForRole,
  getRoleTabs,
  questLearnRoles
} from "./questlearn";

describe("questlearn dashboard data", () => {
  it("provides exactly the four Part I/II actor roles", () => {
    expect(questLearnRoles.map((role) => role.label)).toEqual([
      "Student",
      "Instructor",
      "Academic Advisor",
      "Admin"
    ]);
  });

  it("returns student dashboard data with learning progress and quiz feedback", () => {
    const dashboard = getDashboardForRole("student");

    expect(dashboard.primaryMetric.label).toBe("Course progress");
    expect(dashboard.sections.some((section) => section.title === "My learning path")).toBe(true);
    expect(dashboard.sections.some((section) => section.title === "Course authoring")).toBe(false);
    expect(dashboard.allowedActions).toContain("Attempt quiz");
    expect(dashboard.blockedActions).toContain("Approve instructor account");
  });

  it("returns different interface sections and permissions for each role", () => {
    expect(getDashboardForRole("instructor").navigation).toEqual([
      "Dashboard",
      "My Courses",
      "Question Bank",
      "Assessments",
      "Analytics"
    ]);
    expect(getDashboardForRole("advisor").sections.map((section) => section.title)).toContain("Advisor follow-up");
    expect(getDashboardForRole("admin").allowedActions).toContain("Assign roles");
    expect(getDashboardForRole("student").allowedActions).not.toContain("Assign roles");
  });

  it("exposes an explicit permission model for role access checks", () => {
    expect(getPermissionsForRole("student")).toMatchObject({
      canManageUsers: false,
      canCreateCourse: false,
      canAttemptQuiz: true
    });

    expect(getPermissionsForRole("instructor")).toMatchObject({
      canCreateCourse: true,
      canReviewAdvisorAlerts: false,
      canModerateContent: false
    });

    expect(getPermissionsForRole("advisor")).toMatchObject({
      canReviewAdvisorAlerts: true,
      canAttemptQuiz: false,
      canCreateCourse: false
    });

    expect(getPermissionsForRole("admin")).toMatchObject({
      canManageUsers: true,
      canModerateContent: true,
      canAttemptQuiz: false
    });
  });

  it("returns evidence counts grouped by Part III status", () => {
    expect(getEvidenceCounts()).toEqual({
      pending: 28,
      captured: 4,
      inserted: 0,
      notImplemented: 0
    });
  });

  it("exposes visible tabs for every role", () => {
    expect(getRoleTabs()).toEqual([
      { id: "student", label: "Student" },
      { id: "instructor", label: "Instructor" },
      { id: "advisor", label: "Academic Advisor" },
      { id: "admin", label: "Admin" }
    ]);
  });
});
