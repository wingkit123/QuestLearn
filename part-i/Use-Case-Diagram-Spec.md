# QuestLearn UML Use Case Diagram Specification

This file gives a draw-ready structure for the final UML use case diagram so the team can redraw it cleanly without deciding the logic again.

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

- `View Department Students`
- `Review Student Progress Summary`
- `Review Overdue Assignments`
- `Send Advisory Follow-Up`

### Admin-facing

- `Manage Users`
- `Assign Roles`
- `Approve Instructor Accounts`
- `Moderate Learning Content`
- `Manage Announcements`
- `View Platform Analytics`

## Suggested Include Relationships

Use `<<include>>` where the sub-process is always required:

- `Attempt Quiz` -> `Configure Automated Feedback` should not be used because that is instructor-side setup, not student execution
- `Send Course Announcement` -> `Receive Notifications`
- `Manage Announcements` -> `Receive Notifications`

## Suggested Extend Relationships

Use `<<extend>>` only where optional behavior is triggered:

- `View Recommended Next Steps` extends `Attempt Quiz`
- `Send Advisory Follow-Up` extends `Review Student Progress Summary`
- `Receive Notifications` may extend multiple core events in narrative explanation, but do not overload the diagram with too many extend lines if readability suffers

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
- `View Recommended Next Steps`
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
- `View Department Students`
- `Review Student Progress Summary`
- `Review Overdue Assignments`
- `Send Advisory Follow-Up`

### Admin

- `Log In`
- `Manage Users`
- `Assign Roles`
- `Approve Instructor Accounts`
- `Moderate Learning Content`
- `Manage Announcements`
- `View Platform Analytics`

## Drawing Rules

- Do not use flowchart notation for the final diagram.
- Draw actors outside the system boundary.
- Use oval use cases inside the boundary.
- Keep labels short and consistent with the terminology sheet.
- Avoid merging `Register` and `Log In` into one oval unless the lecturer specifically accepts high-level abstraction.
- If the diagram becomes crowded, use one main use case diagram and one supporting diagram for admin/instructor detail.
