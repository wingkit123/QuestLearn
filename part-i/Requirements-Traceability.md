# QuestLearn Requirements Traceability

This file is the coverage audit sheet for the merged SRS.

Main file being checked:

- [Part I SRS-template-2610_QuestLearn.md](./Part%20I%20SRS-template-2610_QuestLearn.md)

## Status Key

- `Covered`
- `Partial`
- `Missing`

## Terminology Rule

Use the same actor and process names in:

- [Part I SRS-template-2610_QuestLearn.md](./Part%20I%20SRS-template-2610_QuestLearn.md)
- [Part-I-System-Overview.md](./Part-I-System-Overview.md)
- [Use-Cases.md](./Use-Cases.md)
- [ERD-UML.md](./ERD-UML.md)

Reference terms:

- `Student`
- `Instructor`
- `Academic Advisor`
- `Admin`
- `email verification`
- `assignment management`
- `activity tracking`
- `announcement`
- `advisor-student assignment`

## TT7L Requirement Mapping Table

| TT7L Area | Requirement | SRS Section | Use Case Reference | Entity / Process Support | Status |
| --- | --- | --- | --- | --- | --- |
| User Management | Account registration and login | `2.1 Description` | `UC-01` | `User`, `Role` | Covered |
| User Management | Email verification for account activation | `2.1 Description`, `3.1 Student` | `UC-01`, process flow 5.1 | `User.email_verified_at` | Covered |
| User Management | Role-based access control | `2.1 Description` | actor tables and role-based use cases | `Role`, `User` | Covered |
| User Management | Store academic level, programme or department, learning preferences | `2.1 Description`, `4.2 Classes / Entities` | student profile management context | `StudentProfile` | Covered |
| User Management | Instructor profile: specialization, subjects taught, office hours | `2.1 Description`, `4.2 Classes / Entities` | instructor profile management context | `InstructorProfile` | Covered |
| User Management | User activity tracking: quizzes taken, videos watched, pages visited | `2.1 Description`, `3.1 Student` | `UC-02`, `UC-03`, process flow 5.2 | `ActivityLog` | Covered |
| Course & Content | Instructors create courses with modules, lessons, assessments | `2.1 Description`, `3.2 Instructor` | `UC-05`, `UC-07` | `Course`, `Module`, `Lesson`, `Quiz`, `Assignment` | Covered |
| Course & Content | Embedded videos | `2.1 Description` | `UC-02`, `UC-06` | `ContentItem` | Covered |
| Course & Content | Interactive quizzes | `2.1 Description` | `UC-03`, `UC-07` | `Quiz`, `QuestionBank`, `Question` | Covered |
| Course & Content | Automated feedback for each quiz attempt | `2.1 Description`, `3.1 Student`, `3.2 Instructor` | `UC-03`, `UC-07` | `QuizAttempt`, `Recommendation` | Covered |
| Course & Content | Tips for improvement based on mistakes | `2.1 Description` | `UC-03` | `Question.explanation`, `Recommendation` | Covered |
| Assessment & Progress | Quiz and assignment management | `2.1 Description` | `UC-03`, `UC-04`, `UC-07` | `Quiz`, `Assignment`, `AssignmentSubmission` | Covered |
| Assessment & Progress | Multiple question types | `2.1 Description` | `UC-03`, `UC-07` | `Question.question_type` | Covered |
| Assessment & Progress | Randomized question bank generation | `2.1 Description` | `UC-03`, `UC-07` | `QuestionBank`, `Quiz.randomized_flag` | Covered |
| Assessment & Progress | Auto-grading | `2.1 Description` | `UC-03` | `QuizAttempt`, `AttemptAnswer` | Covered |
| Assessment & Progress | Progress tracking and completion status | `2.1 Description`, `3.1 Student` | `UC-02`, `UC-03` | `ProgressRecord` | Covered |
| Assessment & Progress | Detailed performance analytics | `2.1 Description` | instructor and advisor analytics context | `QuizAttempt`, `AssignmentSubmission`, `ProgressRecord`, `ActivityLog` | Covered |
| Assessment & Progress | Personalized progress and recommended next steps | `2.1 Description`, `3.1 Student` | `UC-03` | `ProgressRecord`, `Recommendation` | Covered |
| Assessment & Progress | Past grades and assessment history | `2.1 Description` | student learning history context | `QuizAttempt`, `AssignmentSubmission` | Covered |
| Reporting & Notifications | Course engagement charts | `2.1 Description` | instructor analytics context | `ActivityLog`, `ProgressRecord` | Covered |
| Reporting & Notifications | Student performance distribution summary | `2.1 Description` | instructor analytics context | `QuizAttempt`, `AssignmentSubmission` | Covered |
| Reporting & Notifications | Assignment deadline notifications | `2.1 Description`, `3.4 Admin` | `UC-04`, `UC-09` | `Announcement`, `NotificationTemplate`, `Notification` | Covered |
| Reporting & Notifications | New course content uploaded notifications | `2.1 Description`, `3.2 Instructor` | `UC-06`, `UC-09` | `Announcement`, `NotificationTemplate`, `Notification` | Covered |
| Reporting & Notifications | Quiz score announcements | `2.1 Description`, `3.4 Admin` | `UC-03`, `UC-09` | `Notification`, `NotificationTemplate` | Covered |
| Advisor Support | Assigned student monitoring and follow-up | `2.1 Description`, `3.3 Academic Advisor` | `UC-08` | `AdvisorStudentAssignment`, `AdvisorAlert` | Covered |
| Admin Support | User management, moderation, announcements | `2.1 Description`, `3.4 Admin` | `UC-09` | `User`, `Announcement`, `NotificationTemplate`, `Notification` | Covered |

## Final Audit Checklist

- [ ] every TT7L requirement above still maps to the merged SRS
- [ ] no actor names are inconsistent
- [ ] no required entity is missing from the ERD
- [ ] no required use case is missing from the report
- [ ] all exported diagrams match the wording in the SRS
