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
| 2.0 | All members | SDS — Part II (Design / Architecture / Interfaces / Database) | [fill in] |
| 3.0 | All members | System Documentation — Part III (Development / Testing / Monitoring) | [fill in] |

---

# 1 Project Management

## 1.1 Team Members

| Name | Actor / Process Ownership |
| --- | --- |
| See Wing Kit | Project Leader — Authentication, User Management, Architecture, System Integration |
| Aziel Tan Zheng Chuan | Programming Leader — Course Management, Assessment, Database |
| Vincent Lock Chun Kit | Documentation Manager — Frontend, UI/UX, Grading, Progress Analytics |
| Soo Kian Rong | Quality Manager — Testing, Notifications, Advisor Support, Admin Functions |

## 1.2 Problem Statement

> TO DO: Copy the problem statement from Part I Section 1.2, refined with any Part II/III adjustments.

## 1.3 Project Plan

> TO DO: Insert the final Gantt chart showing actual vs. planned timeline for all three project phases.

---

# 2 Individual Contribution

## 2.1 Description

> TO DO: Each team member writes a short paragraph describing their personal responsibilities and contributions.

## 2.2 Tasks

| Team Member | Tasks |
| --- | --- |
| See Wing Kit | System architecture design, backend AuthService and UserService implementation, JWT and role-based access control middleware, CI/CD pipeline setup, final integration and code review |
| Aziel Tan Zheng Chuan | Database schema design and implementation, backend CourseService and AssessmentService, question bank and quiz creation APIs, database seeding with demo data |
| Vincent Lock Chun Kit | Frontend React application, dashboard components, quiz interface, progress visualisation, responsive design, activity diagram and wireframe preparation |
| Soo Kian Rong | Testing strategy and execution, notification system, advisor dashboard backend, admin panel, security testing (OWASP), acceptance testing |

## 2.3 Modules Developed

| Team Member | Modules Developed | Assumptions |
| --- | --- | --- |
| See Wing Kit | AuthenticationService, UserService, AuthMiddleware, Database connection config | JWT tokens expire in 1 hour; bcrypt uses 10 salt rounds |
| Aziel Tan Zheng Chuan | CourseService, AssessmentService, Database-Schema.sql, Seeder scripts | PostgreSQL 16 is available; Sequelize ORM handles migrations |
| Vincent Lock Chun Kit | StudentDashboard, InstructorDashboard, QuizInterface, CourseViewer, GradingService, ProgressService | React 18 with Material UI 5; YouTube IFrame API for video embedding |
| Soo Kian Rong | NotificationService, AdvisorService, AdminPanel, test suites | Jest for unit tests; Playwright for E2E tests; SMTP via Mailtrap for prototype |

---

# 3 System Overview

## 3.1 Description

> TO DO: Copy and refine system overview from Part I / Part II.

| Actors | Major Processes |
| --- | --- |
| Student | Register, login, manage profile, start lesson, attempt quiz, submit assignment, view progress, receive feedback and notifications |
| Instructor | Register, login, manage profile, create course/module/lesson, create quiz/assignment, configure feedback, view analytics |
| Academic Advisor | Login, view department students, review progress, review overdue work, send follow-up |
| Admin | Login, manage users, approve instructors, reset passwords, moderate content, manage announcements |

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

| Subsystem | Team Members |
| --- | --- |
| Authentication and User Management | See Wing Kit |
| Course and Content Management | Aziel Tan Zheng Chuan |
| Grading, Progress, and Analytics | Vincent Lock Chun Kit |
| Notifications, Advisor Support, and Admin | Soo Kian Rong |

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

| Tool | Version | Purpose |
| --- | --- | --- |
| VS Code | 1.x | Code editor |
| Node.js | 20.x LTS | Backend runtime |
| npm | 10.x | Package management |
| Docker Desktop | 4.x | Containerised services |
| PostgreSQL | 16.x | Database |
| Git + GitHub | — | Version control |
| Postman | — | API testing |

## 6.2 Software Integration

> TO DO: Describe the integration strategy used to combine all four subsystems. Include screenshots showing API communication and data flow between services.

| File / Module | Description |
| --- | --- |
| `src/backend/server.js` | Main Express.js entry point, mounts all route modules |
| `src/backend/middleware/auth.js` | JWT verification and role-checking middleware used by all subsystems |
| `src/backend/config/database.js` | Sequelize connection pool configuration shared by all services |
| `src/frontend/src/services/api.js` | Axios HTTP client used by all frontend components |

## 6.3 Database

> TO DO: Show the actual database with screenshots of pgAdmin or similar tool. Include sample data in tables and demonstrate key queries running with results.

---

# 7 Testing

## 7.1 Testing Strategy

> TO DO: Describe the multi-level testing strategy (unit, integration, functional, security, performance). Reference Testing-Strategy.md for full details.

## 7.2 Test Data

> TO DO: Describe the test data used for testing. Include seed data scripts and sample data sets.

## 7.3 Acceptance Testing

> TO DO: Complete acceptance testing table for each team member's subsystem.

| Criteria | Fulfilled (Y/N) | Remarks |
| --- | --- | --- |
| User registration and login works correctly | | |
| Role-based access control enforced | | |
| Course creation and content publishing works | | |
| Quiz auto-grading calculates correct score | | |
| Weak-topic detection generates feedback | | |
| Assignment submission and grading works | | |
| Student dashboard shows accurate progress | | |
| Instructor dashboard shows class analytics | | |
| Advisor dashboard shows department students | | |
| Admin can manage users and announcements | | |
| Notifications delivered for deadlines, content, scores | | |
| Activity tracking records user engagement | | |

Date tested: _______________

% Complete: _______________

Tested by: _______________

Verified by: _______________

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

| Team Member | Reflection and Learning Outcomes |
| --- | --- |
| See Wing Kit | > TO DO |
| Aziel Tan Zheng Chuan | > TO DO |
| Vincent Lock Chun Kit | > TO DO |
| Soo Kian Rong | > TO DO |

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
4. React.js Documentation. https://react.dev/
5. Express.js Documentation. https://expressjs.com/
6. Jest Testing Framework. https://jestjs.io/
7. Playwright E2E Testing. https://playwright.dev/
8. OWASP Top 10. https://owasp.org/www-project-top-ten/
9. Docker Documentation. https://docs.docker.com/
10. Material UI Documentation. https://mui.com/
