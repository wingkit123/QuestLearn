# QuestLearn

### A Smart Interactive Learning System for Personalized Microlearning and Early Academic Support

QuestLearn is a smart interactive learning platform designed for higher education. It combines microlearning-based lesson flows, H5P/Lumi interactive content, automated quiz feedback, progress analytics, and advisor-facing early alerts to create a more engaging and supportive learning experience for students.

Built around four key roles, `Student`, `Instructor`, `Academic Advisor`, and `Admin`, QuestLearn is positioned as more than a basic LMS. It focuses on guided learning, meaningful feedback, and proactive academic support rather than only storing materials and reporting final grades.

## Problem It Solves

Many university learning platforms are effective at hosting notes, slides, and quizzes, but they often do less to keep students engaged, explain weak performance, or help staff intervene before students fall too far behind.

QuestLearn addresses these gaps by:

- breaking content into short guided learning sprints
- embedding interactive activities alongside lesson content
- giving students quick feedback and recommended next steps
- tracking completion, engagement, and quiz performance over time
- helping academic advisors spot at-risk students early

## Core Features

### Student

- Personalized learning dashboard with enrolled courses and progress overview
- Microlearning lesson path with modules, lessons, and completion tracking
- Interactive H5P-based lesson activities authored through Lumi
- Quiz practice with instant feedback for objective question types
- Weak-topic review and rule-based next-step recommendations
- Lightweight motivation features such as streaks, XP, and badges
- Notifications for deadlines, content updates, and quiz results

### Instructor

- Course, module, and lesson creation tools
- Video, reading material, and interactive content integration
- Quiz builder with question bank support and randomized assessments
- Automated feedback setup for objective questions
- Lesson and module publishing workflow
- Student attempt tracking and class performance analytics
- Engagement monitoring across lessons and activities

### Academic Advisor

- Advisee progress overview across assigned students
- Risk alerts for low engagement, overdue modules, and weak quiz performance
- Student learning history and performance trend summaries
- Recommended intervention cues based on tracked learning signals
- Advisory follow-up support through messaging and monitoring

### Admin

- User and role management across all platform actors
- Instructor approval and account moderation
- Course moderation and platform-wide oversight
- Department or programme management
- Notification template and system announcement management
- Platform-wide analytics visibility

## Innovation Highlights

### Microlearning Journey

QuestLearn uses a Duolingo-inspired structure built around short learning sprints, guided progress paths, and visible progress markers. The goal is to make learning feel manageable, motivating, and easy to resume.

### H5P/Lumi Interactive Content

The platform supports interactive lesson content created with H5P and authored through Lumi. This gives instructors a practical way to include richer learning activities without building a custom interactive-content engine inside the system.

### Automated Feedback and Recommendations

After quiz attempts, QuestLearn provides immediate feedback and simple rule-based or analytics-driven next-step suggestions. This keeps the system realistic for an MVP while still supporting personalized learning improvement.

### Advisor Early Alert Workflow

QuestLearn flags students who show signs of academic risk, such as low activity, incomplete modules, or repeated poor quiz results. Advisors can use this view to review progress and follow up early with supportive intervention.

## Suggested MVP Scope

The recommended MVP focuses on the highest-value workflow for each role:

- student registration, login, profile, course access, lesson launch, quiz attempts, and progress tracking
- instructor course setup, module and lesson creation, content upload, quiz management, and analytics viewing
- advisor risk dashboard with student progress summaries and alert review
- admin user management, role assignment, and system announcement control

For the first version, gamification should remain lightweight, recommendations should remain rule-based, and H5P/Lumi should be treated as integrated content rather than a built-in authoring studio.

## Suggested Tech Stack

- Frontend: `Next.js`
- Backend and Database: `Supabase`
- Authentication: `Supabase Auth`
- File and Media Storage: `Supabase Storage`
- Charts and Analytics: `Recharts` or `Chart.js`
- Interactive Content Pipeline: `H5P` authored via `Lumi`
- Deployment: `Vercel` with `Supabase`

## High-Level System Modules

### Course & Content Management

- Course creation and editing
- Module and lesson sequencing
- Video, reading, and H5P/Lumi content integration

### Assessment & Progress Tracking

- Quiz creation and question bank support
- Objective-question auto grading
- Attempt history, scores, and weak-topic tracking
- Lesson and module completion monitoring

### Advisor Early Alerts

- Risk flag generation from engagement and performance signals
- Advisee progress summaries
- Follow-up and intervention support views

### Notifications & Analytics

- Student, instructor, advisor, and admin dashboards
- Activity logging for learning interactions
- Notifications for deadlines, updates, results, and alerts

## Main Entities Overview

These core entities provide a strong starting point for future ERD and database design:

- `User`
- `Role`
- `StudentProfile`
- `InstructorProfile`
- `AdvisorProfile`
- `Course`
- `Module`
- `Lesson`
- `ContentItem`
- `Enrollment`
- `Quiz`
- `QuestionBank`
- `Question`
- `QuizAttempt`
- `AttemptAnswer`
- `ProgressRecord`
- `ActivityLog`
- `Recommendation`
- `AdvisorAlert`
- `Notification`

## Use Case Highlights

The main user flows that shape the system are:

- students register, log in, access courses, start lessons, complete quizzes, and review progress
- instructors create courses, build lessons, attach interactive content, publish learning materials, and review analytics
- academic advisors monitor assigned students, review risk alerts, and follow up on early warning cases
- admins manage users, roles, announcements, and platform-wide governance

These flows align well with future UML work such as use case diagrams, activity diagrams, and role-based access mapping.

## Screenshots

Screenshots and UI previews can be added here once the first interface prototype is ready.

## Getting Started

Project setup instructions will be added once the initial codebase is created.

Planned setup direction:

- clone the repository
- install dependencies
- configure Supabase environment variables
- run the Next.js development server

## Future Enhancements

- richer badge and achievement system
- deeper advisor follow-up workflow tracking
- smarter recommendation rules for remedial learning paths
- expanded analytics dashboards for instructors and admins
- mobile-optimized learning experience refinements
- optional SCORM export or LMS interoperability exploration

## Portfolio Summary

QuestLearn is a higher-education learning platform concept that combines guided microlearning, interactive content, formative feedback, learning analytics, and advisor-focused early alerts. It is designed to demonstrate full-stack product thinking, role-based workflow design, and a practical approach to building a more engaging and supportive academic learning experience.
