# QuestLearn Part III Testing Strategy

## Purpose

This document defines the initial testing strategy for the QuestLearn Part III prototype. It supports the Week 10 handoff from Part II design into Next.js, Supabase Auth, Supabase PostgreSQL, Supabase Storage, and Netlify implementation.

The testing strategy is evidence-driven. A feature should only be marked complete in [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) after the team attaches a screenshot, command output, SQL result, or deployment preview that proves the behaviour. The execution order is defined in [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md), the master tracker for artifacts is [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md), and the final packaging gate is [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md).

## 1. Unit Testing

Unit tests verify isolated business logic before integration with Supabase.

| Area | Example Checks | Owner |
| --- | --- | --- |
| Authentication helpers | Role lookup, profile routing, protected-page decisions | See Wing Kit |
| Grading logic | Score calculation, weak-topic grouping, feedback summary generation | Vincent Lock Chun Kit |
| Course helpers | Module ordering, lesson publish checks, content item validation | Aziel Tan Zheng Chuan |
| Notification helpers | Message formatting, read/unread state handling | Soo Kian Rong |

Recommended tools: Vitest or Jest for TypeScript functions.

### Unit Test Case Checklist

| Test ID | Area | Test Case | Evidence |
| --- | --- | --- | --- |
| UT-01 | Auth helpers | Student, instructor, advisor, and admin profiles resolve to the correct dashboard route | Test output screenshot or terminal log |
| UT-02 | Auth helpers | Unauthenticated profile lookup returns a protected-route result | Test output screenshot or terminal log |
| UT-03 | Course helpers | Modules and content items are sorted by `sequence_no` | Test output screenshot or terminal log |
| UT-04 | Course helpers | Draft or unpublished lessons are hidden from student access helpers | Test output screenshot or terminal log |
| UT-05 | Grading logic | Objective answers calculate the correct score and max score | Test output screenshot or terminal log |
| UT-06 | Grading logic | Incorrect answers produce weak-topic feedback and recommended next steps | Test output screenshot or terminal log |
| UT-07 | Notification helpers | Notification read/unread state changes correctly | Test output screenshot or terminal log |

## 2. Integration Testing

Integration tests verify that application actions communicate correctly with Supabase.

| Flow | Expected Result |
| --- | --- |
| Register and profile creation | Supabase Auth user is created and matching `user` / profile row exists |
| Course and lesson creation | Course hierarchy writes to `course`, `module`, `lesson`, and `content_item` |
| Quiz submission | `quiz_attempt`, `attempt_answer`, `progress_record`, and notification rows are written |
| Advisor follow-up | `advisor_follow_up` is created and linked alert status can be updated |
| Admin moderation | `moderation_action` and `audit_log` rows are written together |

### Integration Test Case Checklist

| Test ID | Flow | Setup | Expected Evidence |
| --- | --- | --- | --- |
| IT-01 | Register and profile creation | New test email and selected role | Auth user plus matching `user` and profile row |
| IT-02 | Course creation | Approved instructor account | Rows in `course`, `module`, `lesson`, and `content_item` |
| IT-03 | Quiz submission | Student enrolled in a course with a published quiz | Rows in `quiz_attempt`, `attempt_answer`, `progress_record`, and `notification` |
| IT-04 | Assignment submission | Student enrolled in a course with active assignment | Row in `assignment_submission` with correct status |
| IT-05 | Advisor follow-up | Open advisor alert assigned to advisor | Row in `advisor_follow_up` and updated `advisor_alert.status` |
| IT-06 | Admin moderation | Admin account and target content item | Row in `moderation_action` and linked `audit_log` |

## 3. Functional Testing

Functional testing validates complete actor workflows through the browser.

| Actor | Scenario |
| --- | --- |
| Student | Login, open lesson, view H5P/Lumi content, attempt quiz, review feedback |
| Instructor | Create course, add module, add lesson content item, publish content |
| Advisor | Review assigned students, inspect alert, submit follow-up |
| Admin | Review users/content, moderate item, publish announcement |

Recommended tool: Playwright for browser flows.

### Browser Workflow Checklist

| Test ID | Actor | Workflow | Evidence |
| --- | --- | --- | --- |
| FT-01 | Student | Log in, open a course, start a lesson, and view lesson content | Browser screenshot sequence |
| FT-02 | Student | Attempt quiz and review score, feedback, weak topics, and next steps | Browser screenshot plus quiz attempt SQL result |
| FT-03 | Instructor | Create or edit course structure and publish content | Browser screenshot plus database row |
| FT-04 | Instructor | Create quiz or assignment and verify it appears in course management | Browser screenshot plus database row |
| FT-05 | Academic Advisor | Open dashboard, review student progress, and record follow-up | Browser screenshot plus follow-up SQL result |
| FT-06 | Admin | Manage user status or publish announcement | Browser screenshot plus audit/moderation row |
| FT-07 | All roles | Open notification inbox and mark a notification as read | Browser screenshot plus notification row |

## 4. Security Testing

Security testing focuses on Supabase-specific access control.

| Area | Checks |
| --- | --- |
| Supabase Auth | Unauthenticated users cannot access protected pages or server actions |
| RLS policies | Students only access their own progress and enrolled courses |
| Advisor access | Advisors only access assigned students and related alerts |
| Admin access | Moderation and audit operations require admin role |
| Storage policies | Lesson files and submissions are only available to permitted users |
| Secret handling | `service_role` key is never exposed in browser-accessible variables |

RLS implementation should start from [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql), then be adjusted after live Supabase testing. Screenshot-ready RLS checks are provided in [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql).

### Security Evidence Checklist

| Test ID | Security Check | Evidence |
| --- | --- | --- |
| ST-01 | Logged-out user cannot open protected dashboards | Browser screenshot or HTTP status output |
| ST-02 | Student cannot access another student's progress or quiz attempts | SQL/RLS test output |
| ST-03 | Instructor can only manage owned courses or permitted course records | SQL/RLS test output |
| ST-04 | Advisor can only view assigned or department-authorized students | SQL/RLS test output |
| ST-05 | Admin-only actions fail for non-admin users | Browser or API test output |
| ST-06 | Public client environment contains only publishable Supabase variables | `.env.local` screenshot with secrets masked |

## 5. Acceptance Testing

Acceptance testing confirms that the prototype satisfies the main Part I and Part II requirements.

| Requirement Area | Acceptance Criteria |
| --- | --- |
| Authentication | Users can register, login, and reach the correct role dashboard |
| Learning content | Students can view lesson content, including H5P/Lumi embed records |
| Assessment | Quiz attempt produces score, answer records, feedback, and progress update |
| Analytics | Dashboard summaries reflect stored progress, activity, and assessment data |
| Advisor support | Open alerts are visible and follow-up records can be created |
| Admin moderation | Admin actions are recorded in moderation and audit tables |

## Evidence To Capture

- Test command output or screenshots for passing automated tests.
- Supabase table screenshots or SQL query results for key rows.
- Browser screenshots for each actor workflow.
- Final acceptance table signed off by the responsible team member.

## Evidence Folder Convention

Store final proof artifacts under `docs/evidence/part-iii/` or another clearly named evidence folder before packaging the report. Record each captured artifact in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md).

Recommended filenames:

| Evidence Type | Filename Pattern |
| --- | --- |
| Test command output | `tests-YYYY-MM-DD-unit-integration.png` |
| Browser workflow screenshot | `screen-actor-workflow-step.png` |
| SQL result screenshot | `sql-area-query-result.png` |
| Supabase setup screenshot | `supabase-schema-table-list.png` |
| Netlify deployment screenshot | `netlify-preview-url.png` |
| Acceptance sign-off | `acceptance-testing-signoff.png` |

## Final Testing Sign-Off Rules

1. Do not mark a criterion as `Y` unless the evidence file or screenshot is attached.
2. Use `Partial` only when the workflow works but a non-critical evidence item is missing.
3. Use `N` when the workflow fails or was not implemented.
4. Keep the acceptance remarks specific: mention the screenshot, SQL result, or test output used as proof.
5. If implementation changes a Part II design assumption, update the Part III report and the related evidence checklist.
