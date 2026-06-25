# QuestLearn Part III Traceability Matrix

## Purpose

This matrix connects Part I requirements, Part II design artifacts, and Part III implementation/evidence artifacts. It should be used with [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) before final submission.

## Status Key

| Status | Meaning |
| --- | --- |
| Prepared | Part III has a document, SQL script, checklist, or plan ready for the requirement |
| Pending Evidence | Real screenshot, SQL output, test result, or deployment proof still needs to be captured |
| Inserted | Evidence has been inserted into the final Part III report |
| Not Implemented | Requirement is outside the final prototype scope and is explained in the report |

## Requirement Traceability

| TT7L Area | Requirement | Part I / II Reference | Part III Artifact | Evidence ID | Status |
| --- | --- | --- | --- | --- | --- |
| User Management | Account registration and login | `UC-01`, `user`, `role` | [Part-III-System-Documentation.md](./Part-III-System-Documentation.md), [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql) | `SCR-01`, `DB-03`, `TEST-01` | Pending Evidence |
| User Management | Role-based access control | Actor tables, role-based use cases, RLS notes | [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql), [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql), [Testing-Strategy.md](./Testing-Strategy.md) | `TEST-04` | Pending Evidence |
| User Management | Student profile academic details | `StudentProfile` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `DB-03`, `SCR-02` | Pending Evidence |
| User Management | Instructor profile teaching details | `InstructorProfile` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `DB-03`, `SCR-02` | Pending Evidence |
| User Management | User activity tracking | `ActivityLog`, `UC-02`, `UC-03` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `DB-05`, `TEST-02` | Pending Evidence |
| User Management | Admin-mediated password reset / account management | `UC-09`, `User` | [Part-III-System-Documentation.md](./Part-III-System-Documentation.md), [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) | `SCR-03`, `DB-07` | Pending Evidence |
| Course & Content | Instructors create courses with modules, lessons, assessments | `UC-05`, `UC-07`, `Course`, `Module`, `Lesson` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md) | `SCR-04`, `SCR-06`, `SCR-07`, `DB-04` | Pending Evidence |
| Course & Content | Embedded videos | `UC-02`, `UC-06`, `Lesson.video_url` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-05`, `DB-04` | Pending Evidence |
| Course & Content | H5P/Lumi interactive content | `content_item.content_type = h5p_lumi` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-05`, `DB-04` | Pending Evidence |
| Course & Content | Automated feedback for each quiz attempt | `UC-03`, `QuizAttempt`, `AttemptAnswer` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-10`, `DB-05`, `TEST-01` | Pending Evidence |
| Course & Content | Tips for improvement based on mistakes | `Question.explanation`, `UC-03` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) | `SCR-10`, `DB-05` | Pending Evidence |
| Assessment & Progress | Quiz and assignment management | `UC-03`, `UC-04`, `UC-07` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Testing-Strategy.md](./Testing-Strategy.md) | `SCR-07`, `DB-04`, `DB-05`, `TEST-02` | Pending Evidence |
| Assessment & Progress | Multiple question types | `Question.question_type` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql) | `DB-05` | Pending Evidence |
| Assessment & Progress | Randomized question bank generation | `QuestionBank`, `Quiz.randomized` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) | `DB-05` | Pending Evidence |
| Assessment & Progress | Auto-grading | `UC-03`, `QuizAttempt`, `AttemptAnswer` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Testing-Strategy.md](./Testing-Strategy.md) | `SCR-10`, `DB-05`, `TEST-01` | Pending Evidence |
| Assessment & Progress | Progress tracking and completion status | `ProgressRecord`, `UC-02` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-08`, `DB-05`, `TEST-03` | Pending Evidence |
| Assessment & Progress | Detailed performance analytics | `ActivityLog`, `QuizAttempt`, `AssignmentSubmission` | [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) | `SCR-12`, `DB-05`, `TEST-03` | Pending Evidence |
| Assessment & Progress | Personalized progress and recommended next steps | `UC-03`, `ProgressRecord`, `QuizAttempt` | [Part-III-System-Documentation.md](./Part-III-System-Documentation.md), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-08`, `SCR-10`, `DB-05` | Pending Evidence |
| Assessment & Progress | Past grades and assessment history | `QuizAttempt`, `AssignmentSubmission` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-11`, `DB-04`, `DB-05` | Pending Evidence |
| Reporting & Notifications | Course engagement charts | Instructor analytics context | [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) | `SCR-12`, `DB-05` | Pending Evidence |
| Reporting & Notifications | Student performance distribution summary | Instructor analytics context | [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-12`, `DB-05` | Pending Evidence |
| Reporting & Notifications | Assignment deadline notifications | `UC-04`, `Notification`, `Announcement` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-15`, `DB-07` | Pending Evidence |
| Reporting & Notifications | New course content uploaded notifications | `UC-06`, `Notification` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) | `SCR-15`, `DB-07` | Pending Evidence |
| Reporting & Notifications | Quiz score announcements | `UC-03`, `Notification` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql) | `SCR-15`, `DB-07` | Pending Evidence |
| Advisor Support | Student monitoring and follow-up | `UC-08`, `AdvisorProfile`, `AdvisorAlert`, `AdvisorFollowUp` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql) | `SCR-13`, `DB-06`, `TEST-03`, `TEST-04` | Pending Evidence |
| Admin Support | User management, moderation, announcements | `UC-09`, `ModerationAction`, `AuditLog` | [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql), [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql), [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql) | `SCR-03`, `SCR-14`, `DB-07`, `TEST-04` | Pending Evidence |

## Final Traceability Checks

- [ ] Every Part I TT7L requirement maps to at least one Part III artifact.
- [ ] Every acceptance criterion in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) maps to at least one requirement above.
- [ ] Every `Pending Evidence` item is updated after screenshots, SQL outputs, or test results are captured.
- [ ] Any item not implemented in the prototype is explicitly marked `Not Implemented` in the evidence index and final report.
