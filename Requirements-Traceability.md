# QuestLearn Requirements Traceability

This file is the Team Lead's control sheet and Member D's coverage audit sheet for Part I.

## Status Key

- `Covered`
- `Partial`
- `Missing`

## Terminology Rule

Use the same actor and process names in:

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

| TT7L Area | Requirement | Overview Section | Use Case Reference | Entity / Process Support | Status | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| User Management | Account registration and login | 1.5 User Management, 1.6 Main User Scenarios | UC-01, actor use case lists | `User`, `Role` | Covered | Team Lead / Member C |
| User Management | Email verification for account activation | 1.5 User Management | UC-01, core use case list, process flow 5.1 | `User.email_verified_at` | Covered | Team Lead / Member C |
| User Management | Role-based access control | 1.5 User Management | actor mappings for all four roles | `Role`, `User` | Covered | Team Lead / Member B |
| User Management | Store academic level, programme or department, learning preferences | 1.5 User Management | Student manage profile | `StudentProfile` | Covered | Member C / Member B |
| User Management | Instructor profile: specialization, subjects taught, office hours | 1.5 User Management, 1.6 Instructor Scenario | Instructor manage profile | `InstructorProfile` | Covered | Member C / Member B |
| User Management | User activity tracking: quizzes taken, videos watched, pages visited | 1.5 User Management | UC-02, UC-03, process flow 5.2 | `ActivityLog` | Covered | Member B / Member D |
| Course & Content | Instructors create courses with modules, lessons, assessments | 1.5 Course & Content Management | UC-05, UC-07 | `Course`, `Module`, `Lesson`, `Quiz`, `Assignment` | Covered | Member C / Member B |
| Course & Content | Embedded videos | 1.5 Course & Content Management | UC-02, UC-06 | `ContentItem` | Covered | Member C / Member B |
| Course & Content | Interactive quizzes | 1.5 Course & Content Management | UC-03, UC-07 | `Quiz`, `QuestionBank`, `Question` | Covered | Member C / Member B |
| Course & Content | Automated feedback for each quiz attempt | 1.5 Assessment & Progress Tracking | UC-03, UC-07 | `QuizAttempt`, `Question`, `Recommendation` | Covered | Member C |
| Course & Content | Tips for improvement based on mistakes | 1.5 Assessment & Progress Tracking | UC-03 | `Question.explanation`, `Recommendation` | Covered | Member C |
| Assessment & Progress | Quiz and assignment management | 1.5 Assessment & Progress Tracking | UC-03, UC-04, UC-07 | `Quiz`, `Assignment`, `AssignmentSubmission` | Covered | Member C / Member B |
| Assessment & Progress | Multiple question types | 1.5 Assessment & Progress Tracking | UC-03, UC-07 | `Question.question_type` | Covered | Member C / Member B |
| Assessment & Progress | Randomized question bank generation | 1.5 Assessment & Progress Tracking | UC-03, UC-07 | `QuestionBank`, `Quiz.randomized_flag` | Covered | Member C / Member B |
| Assessment & Progress | Auto-grading | 1.5 Assessment & Progress Tracking | UC-03 | `QuizAttempt`, `AttemptAnswer` | Covered | Member C / Member B |
| Assessment & Progress | Module completion status | 1.5 Assessment & Progress Tracking | UC-02, student use case list | `ProgressRecord` | Covered | Member C / Member B |
| Assessment & Progress | Detailed performance analytics | 1.5 Reporting & Notifications | instructor and advisor analytics use cases | `QuizAttempt`, `AssignmentSubmission`, `ProgressRecord`, `ActivityLog` | Covered | Member C / Member B |
| Assessment & Progress | Personalized progress and recommended next steps | 1.5 Reporting & Notifications | UC-03, student use case list | `ProgressRecord`, `Recommendation` | Covered | Member C |
| Assessment & Progress | Past grades and assessment history | 1.5 Reporting & Notifications | student use case list | `QuizAttempt`, `AssignmentSubmission` | Covered | Member C / Member B |
| Reporting & Notifications | Course engagement charts | 1.5 Reporting & Notifications | instructor use case list, UC-08 support context | `ActivityLog`, `ProgressRecord` | Covered | Member C |
| Reporting & Notifications | Student performance distribution summary | 1.5 Reporting & Notifications | instructor use case list | `QuizAttempt`, `AssignmentSubmission` | Covered | Member C |
| Reporting & Notifications | Assignment deadline notifications | 1.5 Reporting & Notifications | UC-04, UC-09 | `Announcement`, `NotificationTemplate`, `Notification` | Covered | Member C / Member B |
| Reporting & Notifications | New course content uploaded notifications | 1.5 Reporting & Notifications | UC-06, UC-09 | `Announcement`, `NotificationTemplate`, `Notification` | Covered | Member C / Member B |
| Reporting & Notifications | Quiz score announcements | 1.5 Reporting & Notifications | UC-03, UC-09 | `Notification`, `NotificationTemplate` | Covered | Member C / Member B |
| Advisor Support | Assigned student monitoring and follow-up | 1.5 Reporting & Notifications, 1.6 Academic Advisor Scenario | UC-08 | `AdvisorStudentAssignment`, `AdvisorAlert` | Covered | Member C / Member B |
| Admin Support | User management, moderation, announcements | 1.5 Course & Content Management, 1.5 Reporting & Notifications, 1.6 Admin Scenario | UC-09, admin use case list | `User`, `Announcement`, `NotificationTemplate`, `Notification` | Covered | Member C / Member B |

## Remaining Review Focus

These items are now drafted, but still need polishing before submission:

- [ ] Convert process-flow drafts into cleaner submission-ready diagrams.
- [ ] Convert the use case coverage into a proper UML use case diagram with system boundary.
- [ ] Verify the final ERD and class diagram notation in the drawing tool.
- [ ] Add figure captions and numbering in the final report layout.
- [ ] Confirm whether gamification stays in final scope or is trimmed to reduce diagram clutter.

## Audit Checklist for Member D

- [ ] Every TT7L requirement has a status.
- [ ] Every `Covered` item appears in the actual file named in this table.
- [ ] Email verification appears in overview, use cases, and process flow.
- [ ] Assignment management appears in overview, use cases, and ERD.
- [ ] Activity tracking appears in overview, use cases, and ERD.
- [ ] Announcement and notification support appears in use cases and ERD.
- [ ] Each actor has enough meaningful use cases.
- [ ] No inconsistent actor names remain.
