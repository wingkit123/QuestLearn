# System Documentation for QuestLearn System

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: 5**

| Name                  | Student #  |     |
| --------------------- | ---------- | --- |
| See Wing Kit          | 261UC240PJ |     |
| Aziel Tan Zheng Chuan | 261UC240LY |     |
| Vincent Lock Chun Kit | 261UC2406W |     |
| Soo Kian Rong         | 261UC26145 |     |

|           |            |
| --------- | ---------- |
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

| Version | Primary Author(s) | Description of Version                                               | Date Completed |
| ------- | ----------------- | -------------------------------------------------------------------- | -------------- |
| 1.0     | All members       | SRS — Part I (Project Planning / Requirements Analysis)              | 01/05/2026     |
| 2.0     | All members       | SDS — Part II (Design / Architecture / Interfaces / Database)        | [fill in]      |
| 3.0     | All members       | System Documentation — Part III (Development / Testing / Monitoring) | [fill in]      |

---

# 1 Project Management

## 1.1 Team Members

| Name                  | Actor / Process Ownership                                                          |
| --------------------- | ---------------------------------------------------------------------------------- |
| See Wing Kit          | Project Leader — Authentication, User Management, Architecture, System Integration |
| Aziel Tan Zheng Chuan | Programming Leader — Course Management, Assessment, Database                       |
| Vincent Lock Chun Kit | Documentation Manager — Frontend, UI/UX, Grading, Progress Analytics               |
| Soo Kian Rong         | Quality Manager — Testing, Notifications, Advisor Support, Admin Functions         |

## 1.2 Problem Statement

> TO DO: Copy the problem statement from Part I Section 1.2, refined with any Part II/III adjustments.

## 1.3 Project Plan

> TO DO: Insert the final Gantt chart showing actual vs. planned timeline for all three project phases.

## 1.4 Part III Work Allocation and Code SOP

Part III should be split by subsystem ownership, but with a single code lead and a single review gate so implementation stays aligned with Part II design.

| Area                                  | Primary Owner         | Secondary Support     | Output                                                                          |
| ------------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------------- |
| Architecture, auth, integration       | See Wing Kit          | Aziel Tan Zheng Chuan | Shared code structure, protected routes, Supabase auth flow, final merge review |
| Database, course, assessment          | Aziel Tan Zheng Chuan | See Wing Kit          | Schema, seed data, server actions, course and assessment workflows              |
| UI, dashboard, analytics screens      | Vincent Lock Chun Kit | See Wing Kit          | Student/instructor views, responsive screens, dashboard widgets                 |
| Testing, notifications, advisor/admin | Soo Kian Rong         | See Wing Kit          | Test cases, notification flow, advisor/admin features, acceptance evidence      |

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

| Phase                         | Main Owner                                    | Focus                                                         | Output                                                                             | Exit Check                                                          |
| ----------------------------- | --------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Phase 1: Foundation           | See Wing Kit + Aziel Tan Zheng Chuan          | Project setup, auth, schema, seed data, shared contracts      | Next.js project scaffold, Supabase integration, database tables, initial demo data | Login works, schema applies cleanly, seed data loads without errors |
| Phase 2: Core Features        | Aziel Tan Zheng Chuan + Vincent Lock Chun Kit | Course, assessment, dashboard, and content flows              | Working course management, lesson/quiz screens, role-based navigation              | Student and instructor flows work end-to-end in local testing       |
| Phase 3: Support Features     | Soo Kian Rong + See Wing Kit                  | Notifications, advisor/admin functions, RLS checks, hardening | Notification flow, advisor/admin features, access control validation               | Restricted actions fail correctly and allowed actions succeed       |
| Phase 4: Testing and Evidence | Soo Kian Rong + all members                   | Unit, integration, functional, security, acceptance evidence  | Test results, screenshots, SQL outputs, final documentation evidence               | All required Part III artifacts are captured and linked             |

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

> TO DO: Each team member writes a short paragraph describing their personal responsibilities and contributions.

## 2.2 Tasks

| Team Member           | Tasks                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| See Wing Kit          | System architecture design, Supabase Auth integration, role/profile access helpers, Vercel deployment setup, final integration and code review                |
| Aziel Tan Zheng Chuan | Supabase PostgreSQL schema implementation, course and assessment server actions, question bank workflows, database seeding with demo data                     |
| Vincent Lock Chun Kit | Next.js interface implementation, dashboard components, quiz interface, progress visualisation, responsive design, activity diagram and wireframe preparation |
| Soo Kian Rong         | Testing strategy and execution, notification system, advisor dashboard backend, admin panel, security testing (OWASP), acceptance testing                     |

## 2.3 Modules Developed

| Team Member           | Modules Developed                                                                                   | Assumptions                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| See Wing Kit          | Supabase Auth setup, role/profile helpers, protected layout, Vercel configuration                   | Supabase Auth manages sessions; role access is based on trusted profile tables and RLS         |
| Aziel Tan Zheng Chuan | Course actions, assessment actions, Database-Schema.sql, seed scripts                               | Supabase PostgreSQL hosts the schema; migrations are applied through SQL files or Supabase CLI |
| Vincent Lock Chun Kit | StudentDashboard, InstructorDashboard, QuizInterface, CourseViewer, GradingService, ProgressService | Next.js App Router and React components support the main user workflows                        |
| Soo Kian Rong         | Notification actions, Advisor actions, Admin panel, test suites                                     | Vitest or Jest covers unit tests; Playwright covers key browser flows                          |

---

# 3 System Overview

## 3.1 Description

> TO DO: Copy and refine system overview from Part I / Part II.

| Actors           | Major Processes                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Student          | Register, login, manage profile, start lesson, attempt quiz, submit assignment, view progress, receive feedback and notifications |
| Instructor       | Register, login, manage profile, create course/module/lesson, create quiz/assignment, configure feedback, view analytics          |
| Academic Advisor | Login, view department students, review progress, review overdue work, send follow-up                                             |
| Admin            | Login, manage users, approve instructors, reset passwords, moderate content, manage announcements                                 |

## 3.2 Actors

> TO DO: Copy actor definitions from Part II.

## 3.3 Assumptions and Dependencies

> TO DO: Copy and update from Part II with any implementation-phase changes.

## 3.4 Use Case Diagram

> TO DO: Insert the use case diagram (same as Part I and Part II).

---

# 4 Requirements

## 4.1 Class Diagrams / ERD

> TO DO: Insert the final ERD (updated if schema changed during implementation).

## 4.2 State Diagrams

> TO DO: Insert the state diagrams from Part II (updated if states changed during implementation).

---

# 5 Design

## 5.1 Data Dictionary

> TO DO: Copy the data dictionary from Part II Section 3.2 (updated if schema changed).

## 5.2 Software Architecture

> TO DO: Insert architecture diagram and subsystem descriptions from Part II Section 5.

| Subsystem                                 | Team Members          |
| ----------------------------------------- | --------------------- |
| Authentication and User Management        | See Wing Kit          |
| Course and Content Management             | Aziel Tan Zheng Chuan |
| Grading, Progress, and Analytics          | Vincent Lock Chun Kit |
| Notifications, Advisor Support, and Admin | Soo Kian Rong         |

## 5.3 Main Screens

> TO DO: Insert updated wireframes or actual screenshots showing how the final interface compares to the Part II design.

## 5.4 Subsystem 1 Screens

> TO DO: Insert screens for Authentication and User Management.

## 5.5 Subsystem 2 Screens

> TO DO: Insert screens for Course and Content Management.

## 5.6 Subsystem 3 Screens

> TO DO: Insert screens for Grading, Progress, and Analytics.

## 5.7 Subsystem 4 Screens

> TO DO: Insert screens for Notifications, Advisor Support, and Admin.

## 5.8 Main Components

> TO DO: Copy component table from Part II Section 7.1.

## 5.9 Deployment Diagram

> TO DO: Insert deployment diagram from Part II Section 8.

---

# 6 Implementation Details

## 6.1 Development Environment

> TO DO: Describe the actual development environment used, with screenshots of IDE, terminal, and running application.

| Tool                          | Version               | Purpose                                     |
| ----------------------------- | --------------------- | ------------------------------------------- |
| VS Code                       | 1.x                   | Code editor                                 |
| Node.js                       | 22.x LTS              | Next.js development runtime                 |
| npm                           | 10.x                  | Package management                          |
| Next.js                       | 15.x                  | Full-stack web application framework        |
| Supabase                      | Managed cloud project | Auth, PostgreSQL database, Storage, and RLS |
| Git + GitHub                  | —                     | Version control                             |
| Vercel                        | —                     | Preview and production deployment           |
| Postman / Supabase SQL Editor | —                     | API and database testing                    |

## 6.2 Software Integration

> TO DO: Describe the integration strategy used to combine all four subsystems. Include screenshots showing API communication and data flow between services.

| File / Module   | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `app/`          | Next.js App Router pages, layouts, route handlers, and server actions |
| `lib/supabase/` | Browser and server Supabase clients                                   |
| `lib/auth/`     | Role/profile lookup helpers and protected-route checks                |
| `supabase/`     | SQL schema, seed data, and future migration files                     |

## 6.3 Database

> TO DO: Show the actual database with screenshots of pgAdmin or similar tool. Include sample data in tables and demonstrate key queries running with results.

---

# 7 Testing

## 7.1 Testing Strategy

The prototype testing strategy covers unit, integration, functional, security, and acceptance testing. The initial draft is maintained in [Testing-Strategy.md](./Testing-Strategy.md) and will be expanded as implementation evidence is produced.

## 7.2 Test Data

> TO DO: Describe the test data used for testing. Include seed data scripts and sample data sets.

## 7.3 Acceptance Testing

> TO DO: Complete acceptance testing table for each team member's subsystem.

| Criteria                                               | Fulfilled (Y/N) | Remarks |
| ------------------------------------------------------ | --------------- | ------- |
| User registration and login works correctly            |                 |         |
| Role-based access control enforced                     |                 |         |
| Course creation and content publishing works           |                 |         |
| Quiz auto-grading calculates correct score             |                 |         |
| Weak-topic detection generates feedback                |                 |         |
| Assignment submission and grading works                |                 |         |
| Student dashboard shows accurate progress              |                 |         |
| Instructor dashboard shows class analytics             |                 |         |
| Advisor dashboard shows department students            |                 |         |
| Admin can manage users and announcements               |                 |         |
| Notifications delivered for deadlines, content, scores |                 |         |
| Activity tracking records user engagement              |                 |         |

Date tested: ******\_\_\_******

% Complete: ******\_\_\_******

Tested by: ******\_\_\_******

Verified by: ******\_\_\_******

---

# 8 Sample Screens

## 8.1 Main Screen

> TO DO: Insert actual screenshots of the running application for each key screen.

### 8.1.1 Subsystem 1 Screens

> TO DO: Screenshots of Login/Registration Page, Profile Settings, Admin User Management.

### 8.1.2 Subsystem 2 Screens

> TO DO: Screenshots of Course Page, Lesson Viewer, Instructor Course Management, Assessment Creation.

### 8.1.3 Subsystem 3 Screens

> TO DO: Screenshots of Student Dashboard, Quiz Interface, Quiz Results, Grades Page, Instructor Analytics.

### 8.1.4 Subsystem 4 Screens

> TO DO: Screenshots of Advisor Dashboard, Admin Panel (Content/Announcements), Notification Inbox.

---

# 9 Reflection and Learning Outcomes

| Team Member           | Reflection and Learning Outcomes |
| --------------------- | -------------------------------- |
| See Wing Kit          | > TO DO                          |
| Aziel Tan Zheng Chuan | > TO DO                          |
| Vincent Lock Chun Kit | > TO DO                          |
| Soo Kian Rong         | > TO DO                          |

---

# 10 User Guide

> TO DO: Step-by-step instructions for using the system, organised by actor role.

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

> TO DO: Summarise software completion status, quality assurance outcomes, group collaboration effectiveness, problems encountered, and future recommendations.

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
