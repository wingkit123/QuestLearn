# Part I - System Overview

## Proposed Project Title

# QuestLearn

### A Smart Interactive Learning System for Personalized Microlearning and Early Academic Support

## 1.1 Introduction

Higher education institutions increasingly depend on digital learning platforms to deliver course materials, assessments, and communication. Although many online learning environments provide convenient access to notes, quizzes, and announcements, they often face continuing challenges related to low engagement, limited interactivity, weak personalization, and insufficient early academic intervention. Students may be able to access content, yet still struggle to remain motivated, identify which topics need more attention, or understand how to improve after poor performance.

At the same time, universities benefit when they can identify struggling learners early and provide meaningful support before problems become severe. Academic staff and advisors require more than passive dashboards; they need practical indicators, actionable summaries, and a workflow that supports timely follow-up. For this reason, there is value in a system that not only stores learning materials, but also guides learning, tracks meaningful progress, and supports early intervention.

## 1.2 Problem Statement

Current university learning systems are often effective for content storage and basic assessment delivery, but they are less effective at actively supporting students throughout the learning journey. In many cases, students can view slides, videos, and quizzes without receiving enough guidance on what to study next, why they performed poorly, or which remedial activity would best help them improve. As a result, learners may fall behind gradually without recognizing the seriousness of the problem until assessment results decline significantly.

Existing platforms also do not always connect content delivery, assessment, engagement tracking, and follow-up support into one coherent workflow. Students may complete quizzes without receiving targeted feedback, instructors may upload materials without seeing a clear picture of learning engagement, and advisors may only notice struggling students after weak results become visible. These gaps reduce the usefulness of digital learning systems as academic support tools.

Instructors face practical limitations as well. They may want to provide more interactive and engaging learning materials, but they need tools that are simple to use, reusable, and realistic within a prototype project scope. Academic advisors face a related challenge because they need a way to monitor student risk in a meaningful and timely manner rather than reacting only after final academic outcomes are already poor. Therefore, there is a clear need for a smart interactive learning system that improves student engagement, supports short and guided learning experiences, provides quick formative feedback, and enables advisors to identify at-risk students earlier.

## 1.3 Proposed Solution

QuestLearn is proposed as a Smart Interactive Learning System that combines microlearning principles, interactive content, formative assessment, progress analytics, and advisor-oriented early alert support. Rather than functioning as a basic repository of course materials, the system is designed to guide students through short learning sprints and help them understand their performance while keeping instructors and advisors informed.

The system supports four user roles:

- `Student`
- `Instructor`
- `Academic Advisor`
- `Admin`

QuestLearn uses a Duolingo-inspired microlearning structure, where lessons are organized into manageable modules and progress paths. Interactive learning materials are supported through H5P content authored with Lumi, enabling instructors to integrate engaging activities into lessons without requiring the system to include its own custom content-authoring engine. The platform also includes automated feedback after quizzes, rule-based next-step recommendations, assignment support, advisor risk alerts based on weak engagement or performance patterns, and notifications that connect key academic events to the right users.

## 1.4 Objectives

The objectives of QuestLearn are as follows:

1. To provide an engaging and interactive learning environment for university students through microlearning-based lessons, embedded media, interactive content, quizzes, and assignment support.
2. To enable instructors to create and manage courses, modules, lessons, assignments, and assessments efficiently using reusable digital content and H5P/Lumi interactive activities.
3. To track learning progress, lesson completion, assessment performance, and student activity in a way that supports meaningful student and instructor dashboards.
4. To support academic advisors through early alert mechanisms that identify at-risk students based on low engagement, incomplete modules, and weak assessment performance.
5. To introduce practical innovation through guided recommendations, advisor intervention support, and lightweight motivation features without expanding beyond realistic prototype scope.

## 1.5 Scope of the System

QuestLearn includes the following major modules and capabilities.

### User Management

- account registration and login
- email verification for account activation
- role-based access control
- profile management for students, instructors, academic advisors, and admins
- student profile storage including academic level, programme or department, and learning preferences
- instructor profile storage including specialization, subjects taught, and office hours
- activity tracking for quizzes taken, videos watched, pages visited, and lesson interactions

### Course & Content Management

- course creation and editing
- module and lesson management
- lesson sequencing into guided microlearning paths
- integration of videos, reading materials, and H5P/Lumi interactive content
- content publishing workflow for lessons and modules
- learning content moderation and platform oversight by admins

### Assessment & Progress Tracking

- quiz and assignment management
- question bank support and randomized question selection
- support for multiple question types such as multiple choice, fill-in-the-blank, and short answer
- auto-grading for objective question types
- attempt history, score storage, submission tracking, and assessment history
- module completion status, learning progress, and detailed performance analytics
- automated feedback for quiz attempts with tips for improvement based on mistakes
- weak-topic identification and recommended next steps

### Reporting & Notifications

- student dashboard with progress, grades, assessment history, and recommended next steps
- instructor dashboard with class performance and course engagement analytics
- academic advisor dashboard with assigned students, progress summaries, and risk indicators
- admin dashboard for user management, moderation, announcements, and platform-wide oversight
- notifications for assignment deadlines, new course content uploads, quiz score announcements, and advisor support alerts

## 1.6 Main User Scenarios

QuestLearn is intended to support several integrated academic scenarios.

### Student Scenario

A student registers an account, completes email verification, logs in, and accesses enrolled courses. The student opens modules and lessons, watches embedded videos, reads materials, interacts with H5P content, attempts quizzes, submits assignments, and reviews automated feedback, progress, grades, and recommended next steps.

### Instructor Scenario

An instructor logs in, manages profile information such as specialization and office hours, creates courses, modules, lessons, quizzes, and assignments, uploads learning materials, publishes content, and reviews engagement and performance analytics to monitor learning outcomes.

### Academic Advisor Scenario

An academic advisor logs in, reviews assigned students, monitors low-engagement or poor-performance alerts, checks advisee progress summaries, and follows up on students who may need academic support.

### Admin Scenario

An admin manages users and roles, approves instructor accounts, moderates learning content, manages announcements and notification templates, and monitors platform-wide activity and oversight functions.

## 1.7 Proposed Innovation

QuestLearn introduces several practical innovation points that strengthen the overall concept while remaining realistic for a prototype.

### 1. Adaptive Remedial Recommendation

When a student performs poorly in a topic, the system uses stored quiz results and weak-topic detection to recommend a related lesson, activity, or practice path. For the initial scope, these recommendations are rule-based rather than fully AI-generated.

### 2. Advisor Early Alert Workflow

The system identifies students who show signs of academic risk, such as repeated low scores, overdue assignments, incomplete modules, or low activity levels. Academic advisors can review these alerts, inspect student history, and follow up using a structured support workflow.

### 3. Gamified Learning Journey

QuestLearn uses lightweight gamification elements such as streaks, XP, badges, and visible progress markers to encourage consistency and motivation. These elements are included carefully so they support learning rather than overshadow academic goals.

### 4. H5P + Lumi Content Authoring Pipeline

Interactive learning materials are supported through H5P content authored with Lumi. This provides a practical and reusable way for instructors to create rich activities for a prototype without requiring the development of a fully custom authoring environment.

## 1.8 Conclusion

In summary, QuestLearn is proposed as a higher-education learning platform that emphasizes guided microlearning, interactive content, meaningful feedback, progress visibility, advisor follow-up support, and structured academic oversight. Its combination of student engagement features, instructor tools, advisor alerts, assignment support, and admin governance makes it a more complete and better integrated response to the TT7L project brief.
