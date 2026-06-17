# QuestLearn Part III Testing Strategy

## Purpose

This document defines the initial testing strategy for the QuestLearn Part III prototype. It supports the Week 10 handoff from Part II design into Next.js, Supabase Auth, Supabase PostgreSQL, Supabase Storage, and Vercel implementation.

## 1. Unit Testing

Unit tests verify isolated business logic before integration with Supabase.

| Area | Example Checks | Owner |
| --- | --- | --- |
| Authentication helpers | Role lookup, profile routing, protected-page decisions | See Wing Kit |
| Grading logic | Score calculation, weak-topic grouping, feedback summary generation | Vincent Lock Chun Kit |
| Course helpers | Module ordering, lesson publish checks, content item validation | Aziel Tan Zheng Chuan |
| Notification helpers | Message formatting, read/unread state handling | Soo Kian Rong |

Recommended tools: Vitest or Jest for TypeScript functions.

## 2. Integration Testing

Integration tests verify that application actions communicate correctly with Supabase.

| Flow | Expected Result |
| --- | --- |
| Register and profile creation | Supabase Auth user is created and matching `user` / profile row exists |
| Course and lesson creation | Course hierarchy writes to `course`, `module`, `lesson`, and `content_item` |
| Quiz submission | `quiz_attempt`, `attempt_answer`, `progress_record`, and notification rows are written |
| Advisor follow-up | `advisor_follow_up` is created and linked alert status can be updated |
| Admin moderation | `moderation_action` and `audit_log` rows are written together |

## 3. Functional Testing

Functional testing validates complete actor workflows through the browser.

| Actor | Scenario |
| --- | --- |
| Student | Login, open lesson, view H5P/Lumi content, attempt quiz, review feedback |
| Instructor | Create course, add module, add lesson content item, publish content |
| Advisor | Review assigned students, inspect alert, submit follow-up |
| Admin | Review users/content, moderate item, publish announcement |

Recommended tool: Playwright for browser flows.

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
