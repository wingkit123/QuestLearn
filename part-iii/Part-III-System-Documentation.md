# System Documentation for QuestLearn System

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: 5**

| Name | Student # | |
| --- | --- | --- |
| See Wing Kit | 261UC240PJ | |
| Aziel Tan Zheng Chuan | 261UC240LY | |
| Vincent Lock Chun Kit | 261UC2406W | |
| Soo Kian Rong | 261UC26145 | |

| | |
| --- | --- |
| **Date:** | 04/05/2026 |

---

# Contents

- [Revisions](#revisions)
- [1 Project Management](#1-project-management)
  - [1.1 Team Members](#11-team-members)
  - [1.2 Problem Statement](#12-problem-statement)
  - [1.3 Project Plan](#13-project-plan)
  - [1.4 Part III Work Allocation and Code SOP](#14-part-iii-work-allocation-and-code-sop)
  - [1.5 Part III Execution Plan](#15-part-iii-execution-plan)
- [2 Individual Contribution](#2-individual-contribution)
  - [2.1 Description](#21-description)
  - [2.2 Tasks](#22-tasks)
  - [2.3 Modules Developed](#23-modules-developed)
- [3 System Overview](#3-system-overview)
  - [3.1 Description](#31-description)
  - [3.2 Actors](#32-actors)
  - [3.3 Assumptions and Dependencies](#33-assumptions-and-dependencies)
  - [3.4 Use Case Diagram](#34-use-case-diagram)
- [4 Requirements](#4-requirements)
  - [4.1 Class Diagrams / ERD](#41-class-diagrams--erd)
  - [4.2 State Diagrams](#42-state-diagrams)
- [5 Design](#5-design)
  - [5.1 Data Dictionary](#51-data-dictionary)
  - [5.2 Software Architecture](#52-software-architecture)
  - [5.3 Main Screens](#53-main-screens)
  - [5.4 Subsystem 1 Screens](#54-subsystem-1-screens)
  - [5.5 Subsystem 2 Screens](#55-subsystem-2-screens)
  - [5.6 Subsystem 3 Screens](#56-subsystem-3-screens)
  - [5.7 Subsystem 4 Screens](#57-subsystem-4-screens)
  - [5.8 Main Components](#58-main-components)
  - [5.9 Deployment Diagram](#59-deployment-diagram)
- [6 Implementation Details](#6-implementation-details)
  - [6.1 Development Environment](#61-development-environment)
  - [6.2 Software Integration](#62-software-integration)
  - [6.3 Database](#63-database)
- [7 Testing](#7-testing)
  - [7.1 Testing Strategy](#71-testing-strategy)
  - [7.2 Test Data](#72-test-data)
  - [7.3 Acceptance Testing](#73-acceptance-testing)
- [8 Sample Screens](#8-sample-screens)
  - [8.1 Main Screen](#81-main-screen)
- [9 Reflection and Learning Outcomes](#9-reflection-and-learning-outcomes)
- [10 User Guide](#10-user-guide)
- [11 Conclusion](#11-conclusion)
- [References](#references)

---

# Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| --- | --- | --- | --- |
# System Documentation for QuestLearn System

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: 5**

| Name | Student # | |
| --- | --- | --- |
| See Wing Kit | 261UC240PJ | |
| Aziel Tan Zheng Chuan | 261UC240LY | |
| Vincent Lock Chun Kit | 261UC2406W | |
| Soo Kian Rong | 261UC26145 | |

| | |
| --- | --- |
| **Date:** | 04/05/2026 |

---

# Contents

- [Revisions](#revisions)
- [1 Project Management](#1-project-management)
  - [1.1 Team Members](#11-team-members)
  - [1.2 Problem Statement](#12-problem-statement)
  - [1.3 Project Plan](#13-project-plan)
  - [1.4 Part III Work Allocation and Code SOP](#14-part-iii-work-allocation-and-code-sop)
  - [1.5 Part III Execution Plan](#15-part-iii-execution-plan)
- [2 Individual Contribution](#2-individual-contribution)
  - [2.1 Description](#21-description)
  - [2.2 Tasks](#22-tasks)
  - [2.3 Modules Developed](#23-modules-developed)
- [3 System Overview](#3-system-overview)
  - [3.1 Description](#31-description)
  - [3.2 Actors](#32-actors)
  - [3.3 Assumptions and Dependencies](#33-assumptions-and-dependencies)
  - [3.4 Use Case Diagram](#34-use-case-diagram)
- [4 Requirements](#4-requirements)
  - [4.1 Class Diagrams / ERD](#41-class-diagrams--erd)
  - [4.2 State Diagrams](#42-state-diagrams)
- [5 Design](#5-design)
  - [5.1 Data Dictionary](#51-data-dictionary)
  - [5.2 Software Architecture](#52-software-architecture)
  - [5.3 Main Screens](#53-main-screens)
  - [5.4 Subsystem 1 Screens](#54-subsystem-1-screens)
  - [5.5 Subsystem 2 Screens](#55-subsystem-2-screens)
  - [5.6 Subsystem 3 Screens](#56-subsystem-3-screens)
  - [5.7 Subsystem 4 Screens](#57-subsystem-4-screens)
  - [5.8 Main Components](#58-main-components)
  - [5.9 Deployment Diagram](#59-deployment-diagram)
- [6 Implementation Details](#6-implementation-details)
  - [6.1 Development Environment](#61-development-environment)
  - [6.2 Software Integration](#62-software-integration)
  - [6.3 Database](#63-database)
- [7 Testing](#7-testing)
  - [7.1 Testing Strategy](#71-testing-strategy)
  - [7.2 Test Data](#72-test-data)
  - [7.3 Acceptance Testing](#73-acceptance-testing)
- [8 Sample Screens](#8-sample-screens)
  - [8.1 Main Screen](#81-main-screen)
- [9 Reflection and Learning Outcomes](#9-reflection-and-learning-outcomes)
- [10 User Guide](#10-user-guide)
- [11 Conclusion](#11-conclusion)
- [References](#references)

---

# Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| --- | --- | --- | --- |
| 1.0 | All members | SRS — Part I (Project Planning / Requirements Analysis) | 01/05/2026 |
| 2.0 | All members | SDS — Part II (Design / Architecture / Interfaces / Database) | 05/06/2026 |
| 3.0 | All members | System Documentation — Part III (Development / Testing / Monitoring) | To be confirmed after final prototype evidence is attached |

---

# 1 Project Management

## 1.1 Team Members

| Name | Actor / Process Ownership |
| --- | --- |
| See Wing Kit | **Student Subsystem** (H5P content, progress, locking algorithm, auto-grading, recommendations) & Backend integration |
| Aziel Tan Zheng Chuan | **Instructor Subsystem** (course management, modules/lessons builder, custom Lumi iframe quiz creator, grading) |
| Vincent Lock Chun Kit | **Academic Advisor Subsystem** (advisees list, advisor follow-ups, follow-up history, linked instructor alerts) |
| Soo Kian Rong | **Admin Subsystem** (user registry CRUD - approve, suspend, kick; course enrollments manager panel, announcements) |

## 1.2 Problem Statement

Current university learning systems are often effective for storing notes, slides, videos, quizzes, and announcements, but they are less effective at actively guiding students through the learning process. Students may complete lessons or assessments without receiving enough immediate feedback about weak topics, recommended next steps, or the seriousness of falling behind. As a result, learning problems may only become visible after grades have already declined.

Existing platforms also separate content delivery, formative assessment, engagement tracking, and advisor follow-up into disconnected workflows. Instructors can upload materials without seeing a clear picture of student engagement, students can complete quizzes without targeted improvement guidance, and academic advisors may only notice struggling learners after major assessment results are released. These gaps reduce the usefulness of digital learning systems as early academic support tools.

QuestLearn addresses this problem by combining short lesson-based learning, interactive lesson content, automated quiz feedback, activity-based analytics, notifications, and advisor monitoring in one coherent prototype. Part III focuses on translating the Part I requirements and Part II design into an implemented Next.js and Supabase prototype, supported by testing evidence, screenshots, database verification, and acceptance checks.

## 1.3 Project Plan

The project is organised into three major phases that align with the course deliverables.

| Phase | Planned Output | Actual / Part III Status | Evidence to Attach |
| --- | --- | --- | --- |
| Part I: Requirements Analysis | Problem statement, objectives, scope, actors, use cases, ERD draft, activity diagrams | Completed as the SRS baseline for QuestLearn | Final Part I report, use case diagram, activity diagrams |
| Part II: System Design | Data design, architecture, interface design, state diagrams, sequence diagrams, deployment design | Completed as the SDS baseline for implementation | Part II design report, database schema, architecture and deployment diagrams |
| Part III: Development and Testing | Prototype implementation, database setup, test execution, screenshots, user guide, final system documentation | In progress; this document records the required implementation and evidence structure | IDE/terminal screenshots, Supabase table/query screenshots, test outputs, browser screenshots, deployment preview |

Final packaging should include a Gantt chart or schedule screenshot showing planned and actual progress for all three phases. If the team does not maintain a formal Gantt tool, the weekly split in Section 1.5 can be converted into the final schedule table and supported with commit history or task checklist evidence. The detailed implementation plan is maintained in [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md), the traceability matrix is maintained in [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md), the evidence tracker is maintained in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md), and the final packaging checklist is maintained in [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md).

## 1.4 Part III Work Allocation and Code SOP

Part III should be split by subsystem ownership, but with a single code lead and a single review gate so implementation stays aligned with Part II design.

| Area | Primary Owner | Secondary Support | Output |
| --- | --- | --- | --- |
| Architecture, auth, integration | See Wing Kit | Aziel Tan Zheng Chuan | Shared code structure, protected routes, Supabase auth flow, final merge review |
| Database, course, assessment | Aziel Tan Zheng Chuan | See Wing Kit | Schema, seed data, server actions, course and assessment workflows |
| UI, dashboard, analytics screens | Vincent Lock Chun Kit | See Wing Kit | Student/instructor views, responsive screens, dashboard widgets |
| Testing, notifications, advisor/admin | Soo Kian Rong | See Wing Kit | Test cases, notification flow, advisor/admin features, acceptance evidence |

Code ownership rules:

1. One person owns one module end-to-end. No parallel editing on the same file unless the owner requests help.
2. Aziel focuses on implementation tasks only within the agreed module list. Any new idea, refactor, or schema change must be approved by the code lead first.
3. See Wing Kit acts as the code lead and final reviewer for auth, integration, and cross-module impact.
4. Vincent and Soo can contribute code where assigned, but should avoid changing backend contracts unless the change is already agreed.
5. All work must stay traceable to a specific Part III deliverable: feature, screen, test, seed data, or documentation evidence.

Suggested coding SOP for Aziel:

1. Start with the task brief only. Restate the exact files, tables, or actions to be touched before coding.
2. Keep changes inside the agreed scope. Do not rename unrelated files, reformat large areas, or “improve” adjacent code.
3. Make the smallest working change first, then verify it before extending the feature.
4. If a requirement is unclear, stop and ask before implementing a guess.
5. Before handing off, write a short checklist: what changed, what was tested, and what remains open.

Suggested review gate:

1. Any schema change must be checked against Part II ERD and existing seed data.
2. Any server action must be checked against role access and RLS assumptions.
3. Any UI change must be checked against mobile layout and the final design in Part II.
4. Any feature marked done must have at least one proof artifact: screenshot, test output, SQL result, or deployment preview.

Practical guardrails to prevent drift:

1. Use a short task checklist in chat before each coding block.
2. Work in small increments and request review after each increment.
3. Do not combine backend, UI, and testing fixes in the same pass unless the task explicitly requires it.
4. If Aziel starts drifting into unrelated changes, redirect him back to the module owner table above and the review gate.

## 1.5 Part III Execution Plan

The Part III work should follow a fixed sequence so the team does not build UI or tests on top of unstable data contracts.

| Phase | Main Owner | Focus | Output | Exit Check |
| --- | --- | --- | --- | --- |
| Phase 1: Foundation | See Wing Kit + Aziel Tan Zheng Chuan | Project setup, auth, schema, seed data, shared contracts | Next.js project scaffold, Supabase integration, database tables, initial demo data | Login works, schema applies cleanly, seed data loads without errors |
| Phase 2: Core Features | Aziel Tan Zheng Chuan + Vincent Lock Chun Kit | Course, assessment, dashboard, and content flows | Working course management, lesson/quiz screens, role-based navigation | Student and instructor flows work end-to-end in local testing |
| Phase 3: Support Features | Soo Kian Rong + See Wing Kit | Notifications, advisor/admin functions, RLS checks, hardening | Notification flow, advisor/admin features, access control validation | Restricted actions fail correctly and allowed actions succeed |
| Phase 4: Testing and Evidence | Soo Kian Rong + all members | Unit, integration, functional, security, acceptance evidence | Test results, screenshots, SQL outputs, final documentation evidence | All required Part III artifacts are captured and linked |

Suggested weekly split:

1. Week 1: See Wing Kit locks the folder structure and auth flow; Aziel builds the schema and seed scripts.
2. Week 2: Aziel finishes course and assessment actions; Vincent starts the main dashboard and content screens.
3. Week 3: Soo adds notifications and advisor/admin flows; See Wing Kit checks integration and role access.
4. Week 4: Everyone freezes feature changes and focuses on testing, screenshots, and documentation evidence.

Handoff rule:

1. No one starts the next phase until the current phase has a review pass from the code lead.
2. Any blocker must be reported in the same chat thread with the exact file, table, or screen involved.
3. If a change touches another person's module, the owner of that module must approve the final form before merge.

---

# 2 Individual Contribution

## 2.1 Description

Part III contribution is divided across four members so each member has a clear implementation and evidence responsibility. See Wing Kit owns Backend and Supabase. Aziel Tan Zheng Chuan owns Frontend and Role Interfaces. Vincent Lock Chun Kit owns Learning Content and Analytics. Soo Kian Rong owns Documentation, Testing, and Final Assembly.

Each member should add their final personal contribution paragraph after implementation evidence is captured. The final paragraph should mention the files, screens, database tables, tests, or screenshots contributed by that member.

## 2.2 Tasks

| Team Member | Tasks |
| --- | --- |
| See Wing Kit | Backend and Supabase setup, schema execution, seed data, Supabase Auth/RLS planning, evidence queries, database screenshots, role-based data access |
| Aziel Tan Zheng Chuan | Frontend role interfaces for Student, Instructor, Academic Advisor, and Admin; role routing, responsive layout, screenshot capture |
| Vincent Lock Chun Kit | H5P/Lumi sample content workflow, quiz attempt flow, progress records, feedback/recommendations, advisor alert logic |
| Soo Kian Rong | README and Part I-III documentation alignment, testing evidence, traceability matrix, evidence index, final report, submission checklist |

## 2.3 Modules Developed

| Team Member | Modules Developed | Assumptions |
| --- | --- | --- |
| See Wing Kit | Supabase Auth setup, role/profile helpers, schema/seed/RLS evidence, deployment configuration | Supabase manages identity and data access; role access is based on trusted profile tables and RLS |
| Aziel Tan Zheng Chuan | Student Dashboard, Instructor Dashboard, Academic Advisor Dashboard, Admin Panel, protected navigation, responsive UI | The interface must show different functions and permission boundaries for Student, Instructor, Academic Advisor, and Admin |
| Vincent Lock Chun Kit | CourseViewer, H5P/Lumi content references, QuizInterface, GradingService, ProgressService, AdvisorAlert rules | Recommendations and alerts remain rule-based for the MVP |
| Soo Kian Rong | Documentation package, evidence index, traceability matrix, test suites, final assembly checklist | Completion claims require screenshots, SQL output, test output, or explicit Not Implemented status |

---

# 3 System Overview

## 3.1 Description

QuestLearn is a Smart Interactive Learning System for higher education that combines short lesson-based learning, interactive lesson content, formative assessment, progress analytics, and advisor-oriented early alert support. Students use the system to access ordered lesson content, complete quizzes and assignments, receive automated feedback, review weak topics, and monitor their learning progress. Instructors create courses, modules, lessons, quizzes, assignments, and feedback rules while reviewing class performance and engagement analytics. Academic advisors monitor assigned students and follow up with learners who show low progress, weak quiz performance, or overdue work. Admins manage users, roles, content moderation, announcements, and platform oversight.

The Part III prototype follows the final project direction: a Next.js App Router web application connected to Supabase Auth, Supabase PostgreSQL, Supabase Storage, and Row Level Security policies. The current repository contains role-isolated routes for Student, Instructor, Academic Advisor, and Admin under `src/app`, supported by shared Supabase clients, auth helpers, layout components, seed SQL, RLS drafts, and evidence queries. The implementation is divided into four work areas matching the four-member team plan: Backend and Supabase; Frontend and Role Interfaces; Learning Content and Analytics; and Documentation, Testing, and Final Assembly.

| Actors | Major Processes |
| --- | --- |
| Student | Register, login, manage profile, start lesson, attempt quiz, submit assignment, view progress, receive feedback and notifications |
| Instructor | Register, login, manage profile, create course/module/lesson, create quiz/assignment, configure feedback, view analytics |
| Academic Advisor | Login, view department students, review progress, review overdue work, send follow-up |
| Admin | Login, manage users, approve instructors, reset passwords, moderate content, manage announcements |

## 3.2 Actors

- **Student** — Engages with learning content, completes assessments, receives feedback, and tracks personal progress.
- **Instructor** — Creates and manages courses, modules, lessons, quizzes, assignments, and class analytics.
- **Academic Advisor** — Monitors assigned or department students, reviews progress risks, and records follow-up actions.
- **Admin** — Manages platform users and roles, approves instructor accounts, moderates content, publishes announcements, and reviews platform activity.

## 3.3 Assumptions and Dependencies

The following assumptions and dependencies guide the Part III prototype:

1. QuestLearn is implemented as a web application accessible through modern browsers such as Chrome, Edge, Firefox, and Safari.
2. The prototype uses Next.js App Router for pages, layouts, route handlers, and server actions.
3. Supabase Auth manages account registration, login, session handling, and authenticated identity.
4. Supabase PostgreSQL stores the 27-table QuestLearn schema defined in Part II.
5. Supabase Storage stores lesson assets and assignment submissions, protected by storage policies.
6. Row Level Security must be enabled before browser-accessible tables are exposed through Supabase client queries.
7. Video and interactive lesson content are referenced through external embed URLs, including YouTube and H5P/Lumi resources.
8. Email delivery is optional for the prototype; in-app notification records are the minimum required communication evidence.
9. The repository is deployment-ready for a managed web host. The root README currently documents Vercel as the deployment target, while earlier Part II planning referenced Netlify; the final submission should use one confirmed preview URL and attach its screenshot.
10. A full guided path engine, advanced gamification, predictive personalization, and built-in H5P authoring are outside the MVP unless separately implemented and verified with evidence.
11. Real screenshots, command outputs, and database query results must be captured during implementation before the final submission.

## 3.4 Use Case Diagram

The approved use case diagram from Part I and Part II is reused for Part III to avoid conflicting actor or requirement versions. The final report should insert the exported use case diagram image here.

**Figure 3.1: QuestLearn Use Case Diagram**

Source reference: [../part-i/Use-Case-Diagram-Spec.md](../part-i/Use-Case-Diagram-Spec.md)

---

# 4 Requirements

## 4.1 Class Diagrams / ERD

The final ERD should be inserted here using the latest schema from [../part-ii/Database-Schema.sql](../part-ii/Database-Schema.sql). Unless implementation changes the schema, the Part II ERD remains the approved design baseline.

**Figure 4.1: QuestLearn Entity-Relationship Diagram**

The schema contains 27 entities organised into four groups:

| Entity Group | Tables |
| --- | --- |
| Identity and Access | `role`, `user`, `student_profile`, `instructor_profile`, `advisor_profile` |
| Learning Structure | `course`, `module`, `lesson`, `content_item`, `enrollment` |
| Assessment and Performance | `quiz`, `assignment`, `assignment_submission`, `question_bank`, `question`, `quiz_question`, `quiz_attempt`, `attempt_answer`, `progress_record` |
| Support and Analytics | `activity_log`, `advisor_student_assignment`, `advisor_alert`, `advisor_follow_up`, `announcement`, `notification`, `moderation_action`, `audit_log` |

Final evidence to attach: exported ERD image, SQL execution screenshot or log, and at least one screenshot showing key tables created in Supabase.

## 4.2 State Diagrams

The Part II state diagrams remain valid for Part III unless implementation changes lifecycle rules. The final report should insert the exported state diagrams for the following entities:

| Diagram | Entity / Process | States Covered |
| --- | --- | --- |
| ST-01 | User Account | Pending, Active, Suspended, Deactivated |
| ST-02 | Course | Draft, Published, Active, Completed, Archived |
| ST-03 | Quiz | Draft, Published, Active, Closed, Archived |
| ST-04 | Assignment Submission | Not Started, In Progress, Submitted, Under Review, Graded, Returned |
| ST-05 | Enrollment | Enrolled, Active, Completed, Withdrawn |
| ST-06 | Notification | Unread, Read |

Source reference: [../part-ii/State-Diagrams.md](../part-ii/State-Diagrams.md)

---

# 5 Design

## 5.1 Data Dictionary

The implementation data dictionary follows Part II Section 3.2. Any schema change made during Part III must be reflected both in [../part-ii/Database-Schema.sql](../part-ii/Database-Schema.sql) and in the final table below.

| Entity | Key Attributes | Type | Purpose |
| --- | --- | --- | --- |
| `role` | `role_id`, `role_name` | Lookup | Stores the four system roles |
| `user` | `user_id`, `auth_user_id`, `role_id`, `email`, `account_status` | Core | Application profile linked to Supabase Auth |
| `student_profile` | `student_profile_id`, `user_id`, `academic_level`, `programme`, `department` | Profile | Student academic information |
| `instructor_profile` | `instructor_profile_id`, `user_id`, `specialization`, `subjects_taught`, `office_hours` | Profile | Instructor teaching information |
| `advisor_profile` | `advisor_profile_id`, `user_id`, `department`, `office_hours` | Profile | Advisor details |
| `course`, `module`, `lesson`, `content_item`, `enrollment` | Course hierarchy and enrollment fields | Learning | Course structure, content, and student access |
| `quiz`, `assignment`, `question_bank`, `question`, `quiz_question` | Assessment setup fields | Assessment | Quiz, assignment, and question bank configuration |
| `quiz_attempt`, `attempt_answer`, `assignment_submission`, `progress_record` | Attempt, answer, submission, and progress fields | Performance | Scores, feedback, submissions, and lesson progress |
| `activity_log` | `activity_log_id`, `user_id`, `activity_type`, `target_type`, `duration_seconds`, `metadata` | Analytics | Records user engagement events |
| `advisor_alert`, `advisor_follow_up`, `advisor_student_assignment` | Advisor alert and assignment fields | Support | Advisor monitoring and intervention workflow |
| `announcement`, `notification` | Announcement and message fields | Communication | Platform messages and user notifications |
| `moderation_action`, `audit_log` | Actor, target, action, reason, summary | Audit | Admin moderation and sensitive action history |

The full attribute-level dictionary is maintained in [../part-ii/Database-Design.md](../part-ii/Database-Design.md).

## 5.2 Software Architecture

QuestLearn uses a four-layer cloud-backed architecture based on Next.js and Supabase, with the final deployment host to be confirmed by the team's preview evidence.

| Layer | Implementation Responsibility |
| --- | --- |
| Presentation Layer | Next.js pages, layouts, and React components for role-based dashboards and workflows |
| Application Layer | Next.js Route Handlers and Server Actions for validation, business rules, and controlled database operations |
| Data and Security Layer | Supabase Auth, Supabase PostgreSQL, Row Level Security, and Supabase Storage |
| External Integration Layer | H5P/Lumi embeds, YouTube embeds, notification triggers, GitHub, and deployment preview |

| Subsystem | Team Members |
| --- | --- |
| Backend and Supabase | See Wing Kit |
| Frontend and Role Interfaces | Aziel Tan Zheng Chuan |
| Learning Content and Analytics | Vincent Lock Chun Kit |
| Documentation, Testing, and Final Assembly | Soo Kian Rong |

**Figure 5.1: QuestLearn Four-Layer Architecture Diagram**

Final evidence to attach: exported architecture diagram and one screenshot or code reference showing the implemented folder/module structure.

## 5.3 Main Screens

The Part III interface should implement or demonstrate the 14 screens defined in Part II. During final packaging, insert actual browser screenshots where available; if a screen is not implemented, attach the Part II wireframe and clearly mark it as design evidence only.

| # | Screen | Primary Actor | Evidence Required |
| --- | --- | --- | --- |
| 1 | Login / Registration | All | Browser screenshot and auth test result |
| 2 | Student Dashboard | Student | Screenshot with progress and notifications |
| 3 | Course Page | Student | Screenshot showing modules and lessons |
| 4 | Lesson Viewer | Student | Screenshot showing video/reading/H5P content |
| 5 | Quiz Interface | Student | Screenshot showing questions and navigation |
| 6 | Quiz Results and Feedback | Student | Screenshot showing score, weak topics, and next steps |
| 7 | Grades and Progress | Student | Screenshot showing history and chart |
| 8 | Instructor Dashboard | Instructor | Screenshot showing course analytics |
| 9 | Course Management | Instructor | Screenshot showing modules/quizzes/assignments |
| 10 | Assessment Creation | Instructor | Screenshot showing quiz or assignment form |
| 11 | Advisor Dashboard | Academic Advisor | Screenshot showing student risk/progress table |
| 12 | Admin Panel | Admin | Screenshot showing user/content/announcement management |
| 13 | Notification Inbox | All | Screenshot showing read/unread notifications |
| 14 | Profile Settings | All | Screenshot showing role-specific profile fields |

## 5.4 Subsystem 1 Screens (Student Subsystem)

Screens to attach: Student Dashboard, Course Detail Page, Lesson Viewer, Quiz Interface, Quiz Results. These screens prove progress percentages, weak-topic warnings, module locks, and H5P/Lumi interactive iframe playbacks.

## 5.5 Subsystem 2 Screens (Instructor Subsystem)

Screens to attach: Course Page, Lesson Content Editor, Instructor Course Management, and Assessment Creation. These screens prove course publishing, curriculum modular structure, Lumi/Video embeds, and assignment reviews.

## 5.6 Subsystem 3 Screens (Academic Advisor Subsystem)

Screens to attach: Advisor Dashboard, Student Progress registry, Log follow-up modal, and Follow-Up History panel. These screens prove early alert logs, active student monitoring, advisor-to-instructor notification links, and logged intervention logs.

## 5.7 Subsystem 4 Screens (Admin Subsystem)

Screens to attach: Admin Registry CRUD (Add/Suspend/Kick), Course Enrollments Panel, Announcements tab, and platform analytics. These screens prove registration management, admin enrollment overrides, platform oversight, and audit logs. audit visibility.

## 5.8 Main Components

| Component | Subsystem | Technology | Description |
| --- | --- | --- | --- |
| Auth Routes / Actions | Authentication and User Management | Next.js + Supabase Auth | Handles registration, login, logout, and profile loading |
| Role Access Helpers | Authentication and User Management | Next.js + Supabase RLS | Checks user role, profile, and protected-route permissions |
| Course Actions | Course and Content Management | Next.js + Supabase PostgreSQL | Manages courses, modules, lessons, and content items |
| Assessment Actions | Course and Content Management | Next.js + Supabase PostgreSQL | Manages quizzes, assignments, question banks, and publication |
| Grading Service | Grading, Progress, and Analytics | Next.js server logic | Auto-grades objective questions and prepares feedback |
| Progress Service | Grading, Progress, and Analytics | Next.js + Supabase PostgreSQL | Tracks lesson completion and dashboard progress |
| Analytics Service | Grading, Progress, and Analytics | Supabase PostgreSQL | Aggregates activity logs and performance metrics |
| Notification Service | Notifications, Advisor Support, and Admin | Supabase PostgreSQL | Creates and reads deadline, content, score, and announcement notifications |
| Advisor Actions | Notifications, Advisor Support, and Admin | Next.js + Supabase PostgreSQL | Loads advisor students, alerts, progress summaries, and follow-ups |
| Admin Audit Actions | Notifications, Advisor Support, and Admin | Next.js + Supabase PostgreSQL | Records moderation, announcements, user actions, and audit logs |

## 5.9 Deployment Diagram

The deployment diagram from Part II should be inserted here. The expected deployment topology is:

| Node / Service | Responsibility |
| --- | --- |
| User Device / Browser | Accesses the QuestLearn web application over HTTPS |
| Web Hosting Platform | Hosts the Next.js app, pages, route handlers, middleware, and server actions |
| Supabase Auth | Manages user identity, registration, login, and sessions |
| Supabase PostgreSQL | Stores QuestLearn relational data and enforces RLS policies |
| Supabase Storage | Stores lesson assets and assignment submissions |
| GitHub | Stores source code and can trigger the deployment workflow |

**Figure 5.2: QuestLearn Deployment Diagram**

Source reference: [../part-ii/diagrams/Deployment-Diagram.png](../part-ii/diagrams/Deployment-Diagram.png)

---

# 6 Implementation Details

## 6.1 Development Environment

The prototype development environment is based on the stack selected in Part II and [Prototype-Setup-Notes.md](./Prototype-Setup-Notes.md). The final submission should replace version ranges with actual versions from each team member's machine and attach screenshots of VS Code, terminal commands, the local running application, Supabase project, and deployment preview.

Current implementation status: the repository root contains a Next.js App Router prototype with Supabase integration. Role-specific route groups are implemented under `src/app/(student)`, `src/app/(instructor)`, `src/app/(advisor)`, and `src/app/(admin)`. The app includes authentication pages, protected layouts, role dashboards, course and lesson pages, quiz attempt and result pages, instructor course building and grading pages, advisor student/follow-up pages, and admin user/course/announcement pages.

| Tool | Version | Purpose |
| --- | --- | --- |
| VS Code | 1.x | Code editor |
| Node.js | 18+ required; 22.x LTS recommended | Next.js development runtime |
| Bun / npm | Bun 1.x recommended, npm supported | Package management and script execution |
| Next.js | 16.2.9 in `package.json` | Full-stack web application framework |
| React | 19.2.4 in `package.json` | UI library |
| TypeScript | 5.x in `package.json` | Typed implementation |
| Tailwind CSS | 4.x in `package.json` | Styling |
| Supabase | Managed cloud project | Auth, PostgreSQL database, Storage, and RLS |
| Git + GitHub | — | Version control |
| Vercel / Netlify | Final host to be confirmed by preview evidence | Preview and production deployment |
| Postman / Supabase SQL Editor | — | API and database testing |

Required environment evidence:

| Evidence | Minimum Proof |
| --- | --- |
| IDE setup | Screenshot of project opened in VS Code |
| Runtime setup | Terminal screenshot showing dependency install and development server |
| Local app | Browser screenshot of the running QuestLearn app |
| Supabase setup | Screenshot showing project tables/Auth/Storage |
| Deployment | Preview or production URL screenshot |

Captured local evidence from the earlier executable UI/prototype pass:

| Evidence | File |
| --- | --- |
| Local server status | `docs/evidence/part-iii/local-dev-server.txt` |
| Desktop browser viewport | `docs/evidence/part-iii/screen-prototype-dashboard-desktop.png` |
| Mobile browser viewport | `docs/evidence/part-iii/screen-prototype-dashboard-mobile.png` |
| Desktop full-page screen | `docs/evidence/part-iii/screen-prototype-dashboard-desktop-full.png` |
| Mobile full-page screen | `docs/evidence/part-iii/screen-prototype-dashboard-mobile-full.png` |
| Instructor role screen | `docs/evidence/part-iii/screen-instructor-analytics.png` |
| Advisor role screen | `docs/evidence/part-iii/screen-advisor-dashboard.png` |
| Admin role screen | `docs/evidence/part-iii/screen-admin-content-announcements.png` |
| Unit/component test output | `docs/evidence/part-iii/tests-vitest-output.txt` |
| Production build output | `docs/evidence/part-iii/build-output.txt` |
Latest implementation commands to run before final submission:

```text
bun install
bun run lint
bun run build
bun run dev
```

The older evidence files may still be used as historical UI evidence only if the final report labels them as earlier prototype screenshots. Final completion claims should be based on fresh screenshots and command outputs from the current Next.js implementation at `http://localhost:3000`.

## 6.2 Software Integration

The four subsystems are integrated through shared authentication, shared database schema, and role-based routing. Supabase Auth establishes the authenticated session. The application loads the matching QuestLearn profile from the `user` and role-specific profile tables. Role helpers then decide which dashboard, actions, and data queries are available to the current user. Server Actions and Route Handlers coordinate writes that touch multiple tables, while RLS policies protect browser-accessible reads and writes.

| File / Module | Description |
| --- | --- |
| `src/app/(auth)/` | Login, registration, pending approval, and auth callback entry points |
| `src/app/(student)/` | Student dashboard, courses, lesson viewer, quiz attempt, quiz results, grades, notifications, and profile pages |
| `src/app/(instructor)/` | Instructor dashboard, course list, course builder, new course page, grading workflow, analytics, and profile pages |
| `src/app/(advisor)/` | Academic Advisor dashboard, assigned-student monitoring, follow-up workflow, and profile pages |
| `src/app/(admin)/` | Admin dashboard, user management, course enrollment oversight, announcements, and analytics pages |
| `src/components/` | Shared layout and UI components used across role dashboards |
| `src/lib/supabase/` | Browser, server, and middleware Supabase clients |
| `src/lib/auth/` | Role/profile lookup helpers and protected-route checks |
| `src/types/database.ts` | TypeScript types for roles, profiles, courses, attempts, alerts, and related records |
| `part-ii/Database-Schema.sql` | Approved Part II relational schema baseline |
| `part-iii/Supabase-Seed-Data.sql` | Demo dataset for Student, Instructor, Academic Advisor, and Admin evidence |
| `part-iii/Supabase-Auth-Seed.sql` | Demo auth account setup for the four actors |
| `part-iii/Supabase-RLS-Policy-Draft.sql` | Draft Row Level Security policies |
| `part-iii/Supabase-Evidence-Queries.sql` | SQL queries prepared for Part III evidence screenshots |

Integration flow:

1. User registers or logs in through Supabase Auth.
2. The app loads the matching QuestLearn `user` record and role profile.
3. Middleware or protected layout redirects the user to the correct dashboard.
4. Role-specific pages call server actions or Supabase queries for their subsystem.
5. Course, assessment, progress, advisor, admin, and notification records are written to PostgreSQL.
6. Activity and audit records are captured for analytics and traceability.
7. The UI displays updated dashboards, feedback, notifications, and reports.

Final evidence to attach: code screenshot of the auth/profile helper, server action screenshot for at least one major workflow, Supabase query result, and browser screenshot showing the workflow result.

Current verification commands:

```text
bun run lint
bun run build
```

Browser workflow screenshots should be captured from the current app after starting `bun run dev` and opening `http://localhost:3000`. TEST-03 remains pending until a full browser workflow test covers actual navigation through the implemented Student, Instructor, Academic Advisor, and Admin routes.

Current local verification status as of 29/06/2026:

| Command | Status | Notes |
| --- | --- | --- |
| `bun run lint` | Passed | Verified all files lint successfully with zero syntax errors. |

Insert actual screenshots of the running application for each key screen. Screenshots should include a short caption, actor role, test account used, and evidence date. If a screen is not implemented, mark it as "Design reference only" and attach the Part II wireframe instead of presenting it as completed software.

### 8.1.1 Subsystem 1 Screens

Required screenshots: Login/Registration Page, Profile Settings, Admin User Management.

Evidence checklist:
- [ ] User can register or log in
- [ ] User reaches the correct role dashboard
- [ ] Profile fields load from the role-specific profile table
- [ ] Admin can view and manage user status

### 8.1.2 Subsystem 2 Screens

Required screenshots: Course Page, Lesson Viewer, Instructor Course Management, Assessment Creation.

Evidence checklist:
- [ ] Course modules and lessons are displayed in order
- [ ] Published lesson content is visible to students
- [ ] Instructor can create or edit course structure
- [ ] Quiz or assignment configuration is visible

### 8.1.3 Subsystem 3 Screens

Required screenshots: Student Dashboard, Quiz Interface, Quiz Results, Grades Page, Instructor Analytics.

Evidence checklist:
- [ ] Student dashboard displays enrolled course progress
- [ ] Quiz interface accepts answers
- [ ] Quiz results show score, feedback, and weak topics
- [ ] Grades page shows assessment history
- [ ] Instructor analytics show class progress or performance

### 8.1.4 Subsystem 4 Screens

Required screenshots: Advisor Dashboard, Admin Panel (Content/Announcements), Notification Inbox.

Evidence checklist:
- [ ] Advisor can view assigned students or department students
- [ ] Advisor can review alerts or progress indicators
- [ ] Admin can manage content or announcements
- [ ] Notification inbox displays read/unread messages

---

# 9 Reflection and Learning Outcomes

| Team Member | Reflection and Learning Outcomes |
| --- | --- |
| See Wing Kit | Learned how to translate requirements and design artifacts into a structured full-stack prototype plan using authentication, role-based access, and integration review. Final reflection should add specific implementation evidence after coding is complete. |
| Aziel Tan Zheng Chuan | Learned how database schema design connects to course, assessment, seed data, and query workflows. Final reflection should add specific tables, SQL scripts, and backend actions contributed. |
| Vincent Lock Chun Kit | Learned how interface design, dashboards, quiz feedback, and progress analytics must align with actor workflows and responsive design requirements. Final reflection should add specific screens or components completed. |
| Soo Kian Rong | Learned how testing, security checks, notifications, advisor support, admin functions, and acceptance evidence prove whether the prototype meets the requirements. Final reflection should add specific test cases and evidence captured. |

---

# 10 User Guide

This guide is organised by actor role and should be tested against the final deployed or local prototype before submission. Update labels or menu names if the implemented UI uses different wording.

### Student Guide
1. Register an account by selecting the "Student" role
2. Log in with your email and password
3. Browse available courses and click "Enroll"
4. Navigate to a course, select a module, and start a lesson
5. Watch the embedded video or read the content
6. Attempt the quiz at the end of the lesson
7. Review your score, feedback, and recommended next steps
8. Check your overall progress on the Student Dashboard

### Instructor Guide
1. Register an account by selecting the "Instructor" role (admin approval required)
2. Log in after account approval
3. Create a new course with course code, title, and department
4. Add modules and lessons to the course
5. Upload video URLs and reading content for each lesson
6. Create quizzes by selecting questions from the question bank
7. Publish lessons and assessments to make them available to students
8. Review class performance on the Instructor Dashboard

### Academic Advisor Guide
1. Log in with your advisor account
2. View students in your department on the Advisor Dashboard
3. Review student progress summaries and quiz performance
4. Identify students with overdue assignments or low progress
5. Send follow-up messages to students needing attention

### Admin Guide
1. Log in with your admin account
2. Manage users: approve instructor accounts, suspend or deactivate accounts, reset passwords
3. Moderate learning content uploaded by instructors
4. Create and manage platform announcements
5. Monitor platform-wide analytics

---

# 11 Conclusion

QuestLearn Part III documents the transition from the Part I requirements and Part II system design into a working Next.js and Supabase prototype. The system remains organised around four actor roles: Student, Instructor, Academic Advisor, and Admin; and four implementation areas: Backend and Supabase; Frontend and Role Interfaces; Learning Content and Analytics; and Documentation, Testing, and Final Assembly.

The strongest design outcomes are the consistent mapping between use cases, database entities, screens, components, and acceptance criteria. The selected stack supports a realistic prototype because Supabase provides authentication, PostgreSQL storage, file storage, and Row Level Security, while the frontend can be deployed through a managed Next.js hosting platform and connected to the same backend evidence.

Quality assurance for the final submission should be proven through unit tests, integration checks, browser workflow tests, security/RLS validation, screenshots, SQL query outputs, and acceptance testing sign-off. The current document identifies the required evidence without fabricating runtime results that still need to be captured.

Future recommendations include improving the advisor risk scoring rules, expanding analytics dashboards, adding richer notification delivery, refining mobile layouts, and strengthening automated testing coverage before production use.

---

# References

1. QuestLearn Part I SRS, Version 1.0
2. QuestLearn Part II SDS, Version 2.0
3. PostgreSQL 16 Documentation. https://www.postgresql.org/docs/16/
4. Next.js Documentation. https://nextjs.org/docs
5. Supabase Documentation. https://supabase.com/docs
6. Supabase Auth Documentation. https://supabase.com/docs/guides/auth
7. Supabase Row Level Security Documentation. https://supabase.com/docs/guides/database/postgres/row-level-security
8. Supabase Storage Documentation. https://supabase.com/docs/guides/storage
9. Playwright E2E Testing. https://playwright.dev/
10. OWASP Top 10. https://owasp.org/www-project-top-ten/
