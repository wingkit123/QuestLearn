# QuestLearn Part III Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and package the QuestLearn Part III prototype evidence using the Part I requirements and Part II design as the implementation baseline.

**Architecture:** QuestLearn uses a Netlify-hosted web frontend with Supabase Auth for identity, Supabase PostgreSQL for relational data, Supabase Storage for files, and RLS for access control. The current React + Vite scaffold provides role-specific UI evidence; the final documented backend and deployment direction is Netlify + Supabase.

**Tech Stack:** React/TypeScript UI evidence scaffold, Netlify deployment, Supabase Auth, Supabase PostgreSQL, Supabase Storage, Vitest or Jest, Playwright, SQL screenshots or Supabase Table Editor evidence.

**MVP Scope:** Keep short lesson modules, H5P/Lumi content links, quiz practice, progress tracking, rule-based recommendations, and threshold-based advisor alerts. Do not claim a full guided path engine, advanced gamification, predictive personalization, or built-in H5P authoring unless those workflows are implemented and captured as evidence.

**Four-Member Work Split:**

| Member | Ownership |
| --- | --- |
| See Wing Kit | Backend and Supabase: schema execution, seed data, Supabase Auth, RLS, evidence queries, database screenshots, role-based data access |
| Aziel Tan Zheng Chuan | Frontend and Role Interfaces: Student, Instructor, Advisor, and Admin screens, routing, responsive layout, screenshots |
| Vincent Lock Chun Kit | Learning Content and Analytics: H5P/Lumi sample workflow, quiz attempt flow, progress records, feedback, rule-based recommendations, advisor alert logic |
| Soo Kian Rong | Documentation, Testing, and Final Assembly: README and Part I-III alignment, traceability, evidence index, test output, final report, checklist |

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `Part-III-System-Documentation.md` | Master Part III report and final submission narrative |
| `Prototype-Setup-Notes.md` | Prototype stack, setup gates, seed data, and environment evidence guide |
| `Testing-Strategy.md` | Unit, integration, browser, security, and acceptance test plan |
| `Part-III-Evidence-Index.md` | Source of truth for evidence files and acceptance proof |
| `Part-III-Traceability-Matrix.md` | Maps Part I requirements and Part II design to Part III artifacts and evidence |
| `Part-III-Final-Assembly-Checklist.md` | Final packaging, export, and search-audit checklist |
| `Part-III-Implementation-Task-Plan.md` | Task-by-task execution plan for finishing Part III |
| `Supabase-Seed-Data.sql` | Minimum demo seed dataset for Part III database and workflow evidence |
| `Supabase-Evidence-Queries.sql` | Screenshot-ready SQL query pack for database evidence |
| `Supabase-RLS-Policy-Draft.sql` | Reviewable Supabase RLS and Data API grant baseline |
| `Supabase-RLS-Test-Queries.sql` | Screenshot-ready SQL checks for role-specific RLS evidence |
| `../part-ii/Database-Schema.sql` | Approved database schema baseline |
| `../part-ii/Database-Design.md` | Approved SQL query and database evidence reference |
| `docs/evidence/part-iii/` | Recommended folder for captured screenshots and proof artifacts |

## Task 1: Environment and Project Scaffold Evidence

**Files:**
- Use: `Prototype-Setup-Notes.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Confirm project structure**

Run:

```powershell
Get-ChildItem -Force
Get-ChildItem -Force .\part-iii
```

Expected: repository root and `part-iii` folder are visible.

- [ ] **Step 2: Capture structure evidence**

Save a terminal screenshot as:

```text
docs/evidence/part-iii/project-structure.png
```

- [ ] **Step 3: Capture environment variable evidence**

Open `.env.local` or the deployment environment variable screen with secret values masked. Save as:

```text
docs/evidence/part-iii/environment-variables-masked.png
```

- [ ] **Step 4: Run local development server**

Run the correct command for the actual app location:

```powershell
npm install
npm run dev
```

Expected: local server starts and prints a localhost URL.

- [ ] **Step 5: Capture local runtime evidence**

Save screenshots as:

```text
docs/evidence/part-iii/local-dev-server.png
docs/evidence/part-iii/local-app-browser.png
```

- [ ] **Step 6: Update evidence index**

In `Part-III-Evidence-Index.md`, change `ENV-01` to `ENV-04` from `Pending` to `Captured` and confirm the filenames match the saved screenshots.

## Task 2: Supabase Schema and Seed Dataset Evidence

**Files:**
- Use: `../part-ii/Database-Schema.sql`
- Use: `../part-ii/Database-Design.md`
- Use: `Supabase-Seed-Data.sql`
- Use: `Supabase-Evidence-Queries.sql`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Apply schema**

Apply `../part-ii/Database-Schema.sql` in the Supabase SQL Editor or through the Supabase CLI.

Expected: all QuestLearn tables are created without SQL errors.

- [ ] **Step 2: Capture schema evidence**

Save evidence as:

```text
docs/evidence/part-iii/supabase-schema-execution.png
docs/evidence/part-iii/supabase-schema-table-list.png
```

- [ ] **Step 3: Insert minimum seed data**

Run [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql) after applying the Part II schema. The script creates sample data for all areas listed in `Prototype-Setup-Notes.md` under "Minimum Seed Dataset": roles, four users/profiles, one course, modules, lessons, content items, enrollment, quiz, questions, quiz attempt, assignment records, advisor records, notifications, announcement, moderation action, and audit log.

- [ ] **Step 4: Run evidence queries**

Run the relevant sections of [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) in Supabase SQL Editor.

Expected: each query returns rows for the seeded QuestLearn demo dataset.

- [ ] **Step 5: Capture seed query evidence**

Run or screenshot queries that prove the seed data exists. Save:

```text
docs/evidence/part-iii/sql-users-profiles.png
docs/evidence/part-iii/sql-course-content.png
docs/evidence/part-iii/sql-quiz-feedback.png
docs/evidence/part-iii/sql-advisor-follow-up.png
docs/evidence/part-iii/sql-admin-notification-audit.png
```

- [ ] **Step 6: Update evidence index**

In `Part-III-Evidence-Index.md`, change `DB-01` to `DB-07` from `Pending` to `Captured` after each file exists.

## Task 3: Authentication and Role Routing Workflow

**Files:**
- Use: `Prototype-Setup-Notes.md`
- Use: `Testing-Strategy.md`
- Use: `Supabase-RLS-Policy-Draft.sql`
- Use: `Supabase-RLS-Test-Queries.sql`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Verify login and registration**

Using the local or deployed app, register or log in as a test user.

Expected: user reaches the correct role dashboard.

- [ ] **Step 2: Verify role dashboard routing**

Log in as each role: Student, Instructor, Academic Advisor, and Admin.

Expected: each account opens the correct dashboard and only role-appropriate navigation is visible.

- [ ] **Step 3: Verify protected access**

Review and apply [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql) in a Supabase SQL Editor after confirming it matches the final prototype scope. Then run the role simulation checks in [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql) and open a protected dashboard URL while logged out or logged in as the wrong role.

Expected: access is blocked or redirected.

- [ ] **Step 4: Capture auth screen evidence**

Save:

```text
docs/evidence/part-iii/screen-login-registration.png
docs/evidence/part-iii/screen-profile-settings.png
docs/evidence/part-iii/tests-security-rls.png
```

- [ ] **Step 5: Update evidence and acceptance status**

Update `SCR-01`, `SCR-02`, and `TEST-04` in `Part-III-Evidence-Index.md`. Update the matching acceptance rows for registration/login and role-based access.

## Task 4: Course, Lesson, and Assessment Workflow

**Files:**
- Use: `../part-ii/Interface-Design.md`
- Use: `../part-ii/Database-Design.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Verify student course access**

Log in as Student, open a course, open a module, and start a lesson.

Expected: course, module, lesson, and content information appear in the correct order.

- [ ] **Step 2: Verify instructor course management**

Log in as Instructor and open course management.

Expected: instructor can view or edit course, module, lesson, quiz, and assignment structures according to the implemented prototype scope.

- [ ] **Step 3: Verify assessment creation or display**

Open the assessment creation or assessment management screen.

Expected: quiz or assignment configuration is visible and linked to course content.

- [ ] **Step 4: Capture screen evidence**

Save:

```text
docs/evidence/part-iii/screen-course-page.png
docs/evidence/part-iii/screen-lesson-viewer.png
docs/evidence/part-iii/screen-instructor-course-management.png
docs/evidence/part-iii/screen-assessment-creation.png
```

- [ ] **Step 5: Update evidence and acceptance status**

Update `SCR-04` to `SCR-07` in `Part-III-Evidence-Index.md`. Update the acceptance rows for course creation/content publishing and assignment submission/grading according to the actual implemented scope.

## Task 5: Quiz, Feedback, Progress, and Analytics Workflow

**Files:**
- Use: `Testing-Strategy.md`
- Use: `../part-ii/Database-Design.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Verify quiz attempt**

Log in as Student, open a published quiz, submit answers with at least one correct and one incorrect answer.

Expected: quiz result shows score, answer feedback, weak topics, and next steps if implemented.

- [ ] **Step 2: Verify database records**

Check Supabase rows for `quiz_attempt`, `attempt_answer`, `progress_record`, and related feedback fields.

Expected: score and answer details match the browser result.

- [ ] **Step 3: Verify student progress and instructor analytics**

Open Student Dashboard, Grades and Progress, and Instructor Analytics.

Expected: displayed values match the seeded or submitted data.

- [ ] **Step 4: Capture evidence**

Save:

```text
docs/evidence/part-iii/screen-student-dashboard.png
docs/evidence/part-iii/screen-quiz-interface.png
docs/evidence/part-iii/screen-quiz-results-feedback.png
docs/evidence/part-iii/screen-grades-progress.png
docs/evidence/part-iii/screen-instructor-analytics.png
docs/evidence/part-iii/sql-quiz-feedback.png
```

- [ ] **Step 5: Update evidence and acceptance status**

Update `SCR-08` to `SCR-12` and `DB-05` in `Part-III-Evidence-Index.md`. Update acceptance rows for auto-grading, weak-topic feedback, student progress, instructor analytics, and activity tracking.

## Task 6: Advisor, Admin, Notification, and Audit Workflow

**Files:**
- Use: `../part-i/Use-Cases.md`
- Use: `../part-ii/Database-Design.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Verify advisor dashboard**

Log in as Academic Advisor and open the advisor dashboard.

Expected: assigned or department students are visible with progress indicators or alert information.

- [ ] **Step 2: Verify advisor follow-up**

Record a follow-up message for a student or alert.

Expected: `advisor_follow_up` row is created and the alert status changes if that behaviour is implemented.

- [ ] **Step 3: Verify admin and notifications**

Log in as Admin, manage a user, content item, or announcement. Open Notification Inbox as a relevant user.

Expected: admin action creates an audit/moderation record, and notification records are visible in the inbox.

- [ ] **Step 4: Capture evidence**

Save:

```text
docs/evidence/part-iii/screen-advisor-dashboard.png
docs/evidence/part-iii/screen-admin-users.png
docs/evidence/part-iii/screen-admin-content-announcements.png
docs/evidence/part-iii/screen-notification-inbox.png
docs/evidence/part-iii/sql-advisor-follow-up.png
docs/evidence/part-iii/sql-admin-notification-audit.png
```

- [ ] **Step 5: Update evidence and acceptance status**

Update `SCR-03`, `SCR-13`, `SCR-14`, `SCR-15`, `DB-06`, and `DB-07` in `Part-III-Evidence-Index.md`. Update acceptance rows for advisor dashboard, admin actions, notifications, and activity tracking.

## Task 7: Automated and Manual Test Evidence

**Files:**
- Use: `Testing-Strategy.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-System-Documentation.md`

- [ ] **Step 1: Run unit tests**

Run the test command used by the actual prototype:

```powershell
npm test
```

Expected: unit tests for auth helpers, course helpers, grading, and notifications pass, or failing tests are recorded honestly.

- [ ] **Step 2: Capture unit test output**

Save:

```text
docs/evidence/part-iii/tests-unit-output.png
```

- [ ] **Step 3: Run integration or browser workflow tests**

Run the relevant command if Playwright or integration tests are configured:

```powershell
npx playwright test
```

Expected: browser workflow tests pass, or missing/unimplemented test coverage is recorded honestly.

- [ ] **Step 4: Capture integration and browser output**

Save:

```text
docs/evidence/part-iii/tests-integration-output.png
docs/evidence/part-iii/tests-browser-workflows.png
```

- [ ] **Step 5: Update evidence index**

Update `TEST-01`, `TEST-02`, and `TEST-03` in `Part-III-Evidence-Index.md` based on actual test evidence.

## Task 8: Final Report Assembly and Export

**Files:**
- Update: `Part-III-System-Documentation.md`
- Update: `Part-III-Evidence-Index.md`
- Update: `Part-III-Traceability-Matrix.md`
- Use: `Part-III-Final-Assembly-Checklist.md`

- [ ] **Step 1: Update acceptance table**

Use `Part-III-Evidence-Index.md` Section 5 to update the acceptance table in `Part-III-System-Documentation.md`.

Expected: each row uses `Y`, `Partial`, `N`, or `Not Implemented` with a specific evidence reference.

- [ ] **Step 2: Update traceability statuses**

Use `Part-III-Traceability-Matrix.md` to change each `Pending Evidence` status after the matching evidence IDs are captured.

Expected: every requirement row is either `Inserted` or explicitly `Not Implemented`.

- [ ] **Step 3: Update contribution and reflection sections**

Replace generic final-reflection notes with actual work performed by each member.

Expected: each member's paragraph names concrete files, screens, SQL evidence, tests, or screenshots.

- [ ] **Step 4: Run final placeholder and evidence scan**

Run:

```powershell
$taskMarkerA = 'TO' + ' DO'
$taskMarkerB = 'TO' + 'DO'
$fillMarker = 'fill' + ' in'
$underscoreMarker = '_' + '_+'
$patterns = @($taskMarkerA, $taskMarkerB, $fillMarker, '\[fill' + ' in\]', $underscoreMarker)
foreach ($pattern in $patterns) { rg -n $pattern .\part-iii }
rg -n "Pending final test execution" .\part-iii
```

Expected: no unresolved placeholder markers remain; any remaining `Pending` entries are explained as not implemented or still awaiting evidence.

- [ ] **Step 5: Review final assembly checklist**

Open `Part-III-Final-Assembly-Checklist.md` and complete every applicable checklist row.

Expected: evidence gates and export checks are resolved before PDF submission.

- [ ] **Step 6: Export final report**

Export `Part-III-System-Documentation.md` to the lecturer-required format.

Expected: exported report opens correctly, screenshots are readable, tables fit, and no local-only notes or secrets are included.

## Self-Review

Spec coverage:

- Setup and environment evidence is covered by Task 1.
- Database schema and seed evidence is covered by Task 2.
- Authentication and role access is covered by Task 3.
- Course, lesson, and assessment workflow evidence is covered by Task 4.
- Quiz, feedback, progress, and analytics evidence is covered by Task 5.
- Advisor, admin, notification, and audit evidence is covered by Task 6.
- Testing evidence is covered by Task 7.
- Final report assembly and export is covered by Task 8.

Placeholder scan:

- This plan avoids unresolved placeholder markers and uses explicit evidence filenames.
- Remaining `Pending` statuses live in the evidence tracker until real artifacts are captured.

Execution handoff:

Plan complete and saved to `SEF Project/part-iii/Part-III-Implementation-Task-Plan.md`. Two execution options:

1. Subagent-Driven (recommended) - dispatch a fresh subagent per task, review between tasks, fast iteration.
2. Inline Execution - execute tasks in this session using executing-plans, batch execution with checkpoints.
