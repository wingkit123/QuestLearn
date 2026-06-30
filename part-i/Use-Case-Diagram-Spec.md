# QuestLearn UML Use Case Diagram Specification

This file gives a draw-ready structure for the final UML use case diagram, updated to match the final Next.js/Supabase implementation constraints and correct UML modeling rules.

## System Boundary

System name inside boundary:

`QuestLearn Smart Interactive Learning System`

## Actors Outside the Boundary

- `Student`
- `Instructor`
- `Academic Advisor`
- `Admin`

## Use Cases Inside the Boundary

### Student-facing

- `Register Account`
- `Log In`
- `Manage Profile`
- `View Enrolled Courses`
- `Start Lesson`
- `Attempt Quiz`
- `Submit Assignment`
- `View Progress`
- `View Recommended Next Steps`
- `Receive Notifications`

### Instructor-facing

- `Register Account`
- `Log In`
- `Manage Instructor Profile`
- `Create Course`
- `Create Module`
- `Create Lesson`
- `Upload Learning Content`
- `Create Quiz`
- `Create Assignment`
- `Configure Automated Feedback`
- `Publish Learning Content`
- `View Course Engagement Analytics`
- `View Student Performance Analytics`
- `Send Course Announcement`

### Academic Advisor-facing

- `Log In`
- `View Assigned Advisees`
- `Review Student Progress Summary`
- `Review Overdue Assignments`
- `Send Advisory Follow-Up`

### Admin-facing

- `Log In`
- `Manage Users`
- `Assign Roles`
- `Approve Instructor/Advisor Accounts`
- `Reset User Password`
- `Moderate Learning Content`
- `Manage Announcements`
- `View Platform Analytics`

## Correct UML Relationship Rules

To prevent UML syntax errors in the final diagram:

### 1. `<<include>>` Relationships (Mandatory Sub-steps)
Use `<<include>>` only between use cases owned by the **same actor** where one behavior directly runs the other:
- `Send Course Announcement` (Instructor) -> `Manage Announcements` (System/Admin) is NOT a direct include. Keep them separate.
- `Manage Announcements` (Admin) and `Send Course Announcement` (Instructor) do NOT directly include `Receive Notifications`. Since notifications are triggered automatically in the background by system-level actions (e.g. database triggers), they should not be linked with dependency arrows across student/instructor actor boundaries. Both should remain standalone use cases associated with their respective actors.

### 2. `<<extend>>` Relationships (Optional Sub-steps)
Use `<<extend>>` only where optional behavior is triggered under conditions:
- `View Recommended Next Steps` `<<extend>>` `Attempt Quiz` (Trigger condition: student scores < 50% on a quiz). Arrow points from `View Recommended Next Steps` to `Attempt Quiz`.
- `Send Advisory Follow-Up` `<<extend>>` `Review Student Progress Summary` (Trigger condition: student flags an advisor alert). Arrow points from `Send Advisory Follow-Up` to `Review Student Progress Summary`.

## Actor Associations

### Student
- `Register Account`
- `Log In`
- `Manage Profile`
- `View Enrolled Courses`
- `Start Lesson`
- `Attempt Quiz`
- `Submit Assignment`
- `View Progress`
- `Receive Notifications`

### Instructor
- `Register Account`
- `Log In`
- `Manage Instructor Profile`
- `Create Course`
- `Create Module`
- `Create Lesson`
- `Upload Learning Content`
- `Create Quiz`
- `Create Assignment`
- `Configure Automated Feedback`
- `Publish Learning Content`
- `View Course Engagement Analytics`
- `View Student Performance Analytics`
- `Send Course Announcement`

### Academic Advisor
- `Log In`
- `View Assigned Advisees`
- `Review Student Progress Summary`
- `Review Overdue Assignments`
- `Send Advisory Follow-Up`

### Admin
- `Log In`
- `Manage Users`
- `Assign Roles`
- `Approve Instructor/Advisor Accounts`
- `Reset User Password`
- `Moderate Learning Content`
- `Manage Announcements`
- `View Platform Analytics`
