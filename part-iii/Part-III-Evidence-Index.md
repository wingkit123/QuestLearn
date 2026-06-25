# QuestLearn Part III Evidence Index

## Purpose

This index tracks the proof artifacts needed before Part III can be treated as submission-ready. A feature, test, or acceptance item should only be marked complete in [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) when the matching evidence has been captured and referenced. Use [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md) for execution order, [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md) for requirement mapping, and [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md) for the final packaging review.

Recommended evidence folder:

```text
docs/evidence/part-iii/
```

Folder instructions are stored in [../docs/evidence/part-iii/README.md](../docs/evidence/part-iii/README.md).

If the team stores screenshots elsewhere, update the `Evidence Path / Filename` column instead of leaving the location unclear.

## Status Key

| Status | Meaning |
| --- | --- |
| Pending | Evidence has not been captured yet |
| Captured | Evidence file exists but has not been inserted into the final report |
| Inserted | Evidence has been inserted into or clearly referenced by the final report |
| Not Implemented | Feature or workflow is outside the final prototype scope |

## 1. Setup and Environment Evidence

| ID | Evidence Item | Owner | Evidence Path / Filename | Status | Report Section |
| --- | --- | --- | --- | --- | --- |
| ENV-01 | Project folder structure screenshot or terminal tree | See Wing Kit | `docs/evidence/part-iii/project-structure.png` | Pending | 6.2 |
| ENV-02 | Masked environment variable screenshot | See Wing Kit | `docs/evidence/part-iii/environment-variables-masked.png` | Pending | 6.1 |
| ENV-03 | Local development server running | See Wing Kit | `docs/evidence/part-iii/local-dev-server.txt` | Captured | 6.1 |
| ENV-04 | Running local app in browser | See Wing Kit | `docs/evidence/part-iii/screen-prototype-dashboard-desktop.png`, `docs/evidence/part-iii/screen-prototype-dashboard-mobile.png` | Captured | 6.1 / 8 |
| ENV-05 | Netlify deployment preview | See Wing Kit | `docs/evidence/part-iii/netlify-preview-url.png` | Pending | 5.9 / 6.1 |

## 2. Database and Seed Evidence

| ID | Evidence Item | Owner | Evidence Path / Filename | Status | Report Section |
| --- | --- | --- | --- | --- | --- |
| DB-01 | Supabase schema execution success | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/supabase-schema-execution.png` | Pending | 6.3 |
| DB-02 | Supabase table list showing QuestLearn tables from [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/supabase-schema-table-list.png` | Pending | 4.1 / 6.3 |
| DB-03 | Role and user/profile seed rows from [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql) | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/sql-users-profiles.png` | Pending | 6.3 / 7.2 |
| DB-04 | Course, module, lesson, and content seed rows | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/sql-course-content.png` | Pending | 6.3 / 7.2 |
| DB-05 | Quiz, question, attempt, and feedback rows | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/sql-quiz-feedback.png` | Pending | 6.3 / 7.2 |
| DB-06 | Advisor alert and follow-up rows | Soo Kian Rong | `docs/evidence/part-iii/sql-advisor-follow-up.png` | Pending | 6.3 / 7.2 |
| DB-07 | Announcement, notification, moderation, and audit rows | Soo Kian Rong | `docs/evidence/part-iii/sql-admin-notification-audit.png` | Pending | 6.3 / 7.2 |

## 3. Screen Evidence

| ID | Screen / Workflow | Owner | Evidence Path / Filename | Status | Report Section |
| --- | --- | --- | --- | --- | --- |
| SCR-01 | Login / Registration | See Wing Kit | `docs/evidence/part-iii/screen-login-registration.png` | Pending | 5.3 / 8.1.1 |
| SCR-02 | Profile Settings | See Wing Kit | `docs/evidence/part-iii/screen-profile-settings.png` | Pending | 5.3 / 8.1.1 |
| SCR-03 | Admin User Management | See Wing Kit / Soo Kian Rong | `docs/evidence/part-iii/screen-admin-users.png` | Pending | 5.3 / 8.1.1 |
| SCR-04 | Course Page | Aziel Tan Zheng Chuan / Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-course-page.png` | Pending | 5.3 / 8.1.2 |
| SCR-05 | Lesson Viewer | Aziel Tan Zheng Chuan / Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-lesson-viewer.png` | Pending | 5.3 / 8.1.2 |
| SCR-06 | Instructor Course Management | Aziel Tan Zheng Chuan / Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-instructor-course-management.png` | Pending | 5.3 / 8.1.2 |
| SCR-07 | Assessment Creation | Aziel Tan Zheng Chuan | `docs/evidence/part-iii/screen-assessment-creation.png` | Pending | 5.3 / 8.1.2 |
| SCR-08 | Student Dashboard | Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-prototype-dashboard-desktop-full.png`, `docs/evidence/part-iii/screen-prototype-dashboard-mobile-full.png` | Captured | 5.3 / 8.1.3 |
| SCR-09 | Quiz Interface | Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-quiz-interface.png` | Pending | 5.3 / 8.1.3 |
| SCR-10 | Quiz Results and Feedback | Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-quiz-results-feedback.png` | Pending | 5.3 / 8.1.3 |
| SCR-11 | Grades and Progress | Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-grades-progress.png` | Pending | 5.3 / 8.1.3 |
| SCR-12 | Instructor Analytics / Course Workspace | Vincent Lock Chun Kit | `docs/evidence/part-iii/screen-instructor-analytics.png` | Pending | 5.3 / 8.1.3 |
| SCR-13 | Advisor Dashboard / Follow-up Workspace | Soo Kian Rong | `docs/evidence/part-iii/screen-advisor-dashboard.png` | Pending | 5.3 / 8.1.4 |
| SCR-14 | Admin Users / Content / Announcements Workspace | Soo Kian Rong | `docs/evidence/part-iii/screen-admin-content-announcements.png` | Pending | 5.3 / 8.1.4 |
| SCR-15 | Notification Inbox | Soo Kian Rong | `docs/evidence/part-iii/screen-notification-inbox.png` | Pending | 5.3 / 8.1.4 |

## 4. Test Evidence

| ID | Test Area | Owner | Evidence Path / Filename | Status | Report Section |
| --- | --- | --- | --- | --- | --- |
| TEST-01 | Unit test command output, including role-specific interface and permission checks | Soo Kian Rong | `docs/evidence/part-iii/tests-vitest-output.txt` | Captured | 7.1 |
| TEST-02 | Integration test command output | Soo Kian Rong | `docs/evidence/part-iii/tests-integration-output.png` | Pending | 7.1 |
| TEST-03 | Browser workflow test output or screenshots | Soo Kian Rong | `docs/evidence/part-iii/tests-browser-workflows.png` | Pending | 7.1 / 8 |
| TEST-04 | RLS and role-access validation from [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql) and [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql) | See Wing Kit / Soo Kian Rong | `docs/evidence/part-iii/tests-security-rls.png` | Pending | 7.1 |
| TEST-05 | Acceptance testing sign-off | Soo Kian Rong | `docs/evidence/part-iii/acceptance-testing-signoff.png` | Pending | 7.3 |

## 5. Acceptance Criteria Tracker

| Criteria | Evidence IDs Required | Current Status | Remarks |
| --- | --- | --- | --- |
| User registration and login works correctly | SCR-01, DB-03, TEST-01 | Pending | Attach auth screenshot and test output |
| Role-based access control enforced | SCR-01, TEST-04 | Pending | Include blocked unauthorized access proof |
| Course creation and content publishing works | SCR-04, SCR-05, SCR-06, DB-04, TEST-02 | Pending | Include course/content rows |
| Quiz auto-grading calculates correct score | SCR-09, SCR-10, DB-05, TEST-01 | Pending | Include score and answer rows |
| Weak-topic detection generates feedback | SCR-10, DB-05, TEST-01 | Pending | Include feedback summary evidence |
| Assignment submission and grading works | DB-04, TEST-02 | Pending | Add screen evidence if implemented |
| Student dashboard shows accurate progress | SCR-08, DB-05, TEST-03 | Pending | Match dashboard values to SQL output |
| Instructor dashboard shows class analytics | SCR-12, DB-04, DB-05, TEST-03 | Pending | Include aggregation query proof |
| Advisor dashboard shows department students | SCR-13, DB-06, TEST-03 | Pending | Include advisor assignment or department proof |
| Admin can manage users and announcements | SCR-03, SCR-14, DB-07, TEST-03 | Pending | Include audit row |
| Notifications delivered for deadlines, content, scores | SCR-15, DB-07, TEST-02 | Pending | Include notification rows |
| Activity tracking records user engagement | DB-05, TEST-02 | Pending | Include activity log rows |

## 6. Final Evidence Review

Before final submission:

1. Replace every `Pending` status with `Captured`, `Inserted`, or `Not Implemented`.
2. Confirm every evidence path points to a real file.
3. Insert the strongest screenshots into the final report or appendix.
4. Keep secret values masked in environment, Supabase, and deployment screenshots.
5. Update the acceptance table in the main report using this index as the source of truth.
