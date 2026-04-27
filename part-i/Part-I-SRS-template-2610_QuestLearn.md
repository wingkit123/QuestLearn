Software Requirements Specification

for

QuestLearn

Version 1.0

Group No.: `[fill in your group number]`

| Name | Student # | Role |
| --- | --- | --- |
| See Wing Kit | `[fill in]` | Project Leader |
| Aziel Tan Zheng Chuan | `[fill in]` | Programming Leader |
| Vincent Lock Chun Kit | `[fill in]` | Documentation Manager |
| Soo Kian Rong | `[fill in]` | Quality Manager |

|  |  |
| --- | --- |
| Tutorial Code | `TT7L` |
| Date | `27 April 2026` |

Contents

1. Project Introduction
1.1 Team Members
1.2 Problem Statement
1.3 Project Schedule
2. System Overview
2.1 Description
2.2 Actors
2.3 Assumptions and Dependencies
2.4 Use Case Diagram
3. Functional Requirements
3.1 Student
3.2 Instructor
3.3 Academic Advisor
3.4 Admin
4. System Models
4.1 Class Diagrams / ERD
4.2 Classes / Entities
5. Non-Functional Requirements
6. References

Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| --- | --- | --- | --- |
| 1.0 | See Wing Kit, Aziel Tan Zheng Chuan, Vincent Lock Chun Kit, Soo Kian Rong | Initial Part I SRS draft for QuestLearn based on the TT7L Smart Interactive Learning System brief. | 27/04/2026 |

# Project Introduction

QuestLearn is a Smart Interactive Learning System proposed for higher education. The system is designed to improve student engagement and academic support by combining microlearning-based lesson delivery, H5P content authored through Lumi, quiz and assignment management, automated feedback, activity tracking, progress analytics, and early alert support for academic advisors.

The project addresses a common limitation in existing learning platforms: many systems can store notes, videos, and quizzes, but they do not actively guide students through short learning paths, identify weak topics quickly, or help academic staff intervene early when students show signs of academic risk. QuestLearn is intended to provide a more complete and connected workflow for students, instructors, academic advisors, and administrators.

## Team Members

The team structure is organized according to project leadership, technical development, documentation quality, and review control.

| Name | Actor / Processes |
| --- | --- |
| See Wing Kit | Overall scope control, system integration, requirements alignment, final review |
| Aziel Tan Zheng Chuan | ERD and class logic support, technical structure, data relationship validation |
| Vincent Lock Chun Kit | System overview writing, use case formatting, process-flow and Gantt chart preparation |
| Soo Kian Rong | Requirements coverage checking, consistency review, proofreading and quality audit |

## Problem Statement

Current university learning systems are often useful for content storage and basic assessment delivery, but they are less effective at actively supporting students throughout the learning process. Students may access lecture materials and attempt quizzes, yet still receive limited guidance on what to study next, why they performed poorly, or how to improve weak areas through targeted remedial learning.

These platforms also tend to separate course content, progress monitoring, assessment performance, and academic support into disconnected functions. Instructors may upload materials without seeing rich engagement signals, students may complete activities without meaningful personalized feedback, and academic advisors may only detect problems after academic results have already declined. As a result, universities miss opportunities for timely intervention and sustained learner motivation.

QuestLearn is proposed to solve this problem by combining guided microlearning, interactive digital content, assignment management, activity tracking, automated feedback, recommendation support, and advisor early alerts in one integrated platform.

## Project Schedule

The project follows a staged delivery plan covering Part I, Part II, and Part III of the course project.

- Part I submission milestone: `2026-05-01`
- Part II submission milestone: `2026-06-05`
- Part III submission milestone: `2026-06-26`
- Presentation window: `2026-06-29` to `2026-07-03`

Insert the final exported Gantt chart here.

`[Figure: Project Gantt Chart for QuestLearn]`

# System Overview

## Description

QuestLearn is designed as a higher-education learning platform that supports four main roles: `Student`, `Instructor`, `Academic Advisor`, and `Admin`. Its main purpose is to provide a more engaging and supportive learning experience than a traditional content repository by connecting learning delivery, assessment, progress monitoring, and academic intervention into one coherent workflow.

The system includes the following major functions:

### 1. User Management

- account registration and login
- email verification for account activation
- role-based access control
- profile management for students, instructors, academic advisors, and admins
- student profile storage including academic level, programme or department, and learning preferences
- instructor profile storage including specialization, subjects taught, and office hours
- activity tracking for quizzes taken, videos watched, pages visited, and lesson interactions

### 2. Course and Content Management

- course creation and editing
- module and lesson management
- lesson sequencing into guided microlearning paths
- integration of videos, reading materials, and H5P content authored through Lumi
- content publishing workflow for lessons and modules
- learning content moderation and platform oversight by admins

### 3. Assessment and Progress Tracking

- quiz and assignment management
- question bank support and randomized question selection
- support for multiple question types such as multiple choice, fill-in-the-blank, and short answer
- auto-grading for objective question types
- attempt history, score storage, submission tracking, and assessment history
- module completion status, learning progress, and detailed performance analytics
- automated feedback for quiz attempts with tips for improvement based on mistakes
- weak-topic identification and recommended next steps

### 4. Reporting and Notifications

- student dashboard with progress, grades, assessment history, and recommended next steps
- instructor dashboard with class performance and course engagement analytics
- academic advisor dashboard with assigned students, progress summaries, and risk indicators
- admin dashboard for user management, moderation, announcements, and platform-wide oversight
- notifications for assignment deadlines, new course content uploads, quiz score announcements, and advisor support alerts

The system also introduces several innovation points within a realistic prototype scope. These include rule-based remedial recommendations after quiz attempts, advisor early alert workflows for students at risk, lightweight gamification through streaks and badges, and a practical H5P plus Lumi content pipeline for interactive learning material.

## Actors

The following actors interact with QuestLearn.

| Actor | Use Cases |
| --- | --- |
| Student | Register account, verify email, log in, manage profile, view enrolled courses, start lesson, attempt quiz, submit assignment, view progress, view recommended next steps, receive notifications |
| Instructor | Register account, verify email, log in, manage instructor profile, create course, create module, create lesson, upload learning content, create quiz, create assignment, configure automated feedback, publish learning content, view analytics, send course announcements |
| Academic Advisor | Log in, view assigned students, view risk alerts, review student progress summary, review intervention suggestions, send advisory follow-up |
| Admin | Log in, manage users, assign roles, approve instructor accounts, moderate learning content, manage announcements, manage notification templates, view platform analytics |

## Assumptions and Dependencies

The following assumptions and dependencies are used as the basis for the current SRS.

1. The system is intended for university-level teaching and learning rather than general public self-learning.
2. Users will access the platform through a stable web connection on standard desktop or mobile browsers.
3. Email verification services are available and functioning for account activation.
4. H5P interactive content will be authored externally through Lumi and embedded into the platform rather than created through a custom built-in authoring engine.
5. Advisor early alert logic in the prototype will be rule-based and dependent on available activity, quiz, and assignment data rather than advanced predictive AI models.
6. Notifications for deadlines, uploaded content, and quiz score announcements depend on correct event triggering and user account data.
7. The first version of the system will focus on core academic workflows and lightweight gamification only; advanced social, mobile-native, or enterprise integration features are outside initial scope.

## Use Case Diagram

Insert the final exported UML use case diagram here.

Recommended system boundary name:

`QuestLearn Smart Interactive Learning System`

Recommended actors:

- `Student`
- `Instructor`
- `Academic Advisor`
- `Admin`

`[Figure: UML Use Case Diagram for QuestLearn]`

# Functional Requirements

This section describes the major functional requirements of QuestLearn through role-based use case organization.

## Student

### UC-01 Register Account and Verify Email

This use case enables a new student to create an account and activate it through email verification.

| Field | Description |
| --- | --- |
| Use Case Name | Register Account and Verify Email |
| Actors | Student |
| Preconditions | The student does not already have an active account. |
| Normal Flow | 1. The student opens the registration page. 2. The student enters required account information. 3. The system validates the submitted data. 4. The system creates a pending account. 5. The system sends an email verification link or code. 6. The student completes email verification. 7. The system activates the account and allows login. |
| Postconditions | The student account is activated and ready for authenticated use. |
| Alternative Flows and Exceptions | If required fields are invalid, the system rejects the submission and requests correction. If the verification link or code is invalid or expired, the system requests a new verification action. |
| Non-Functional Requirements | Account creation should be simple, secure, and complete within a short response time. Verification events must be recorded reliably. |

### UC-02 Start Lesson

This use case enables a student to access a course lesson and begin guided learning activities.

| Field | Description |
| --- | --- |
| Use Case Name | Start Lesson |
| Actors | Student |
| Preconditions | The student is logged in and enrolled in the selected course. |
| Normal Flow | 1. The student opens a course. 2. The student selects a module. 3. The student selects a lesson. 4. The system displays lesson content, including reading material, embedded video, and H5P activity where available. 5. The system records page visits, video interactions, and lesson access in the activity log. 6. The system updates lesson progress status. |
| Postconditions | Lesson access and progress updates are stored for analytics and progress tracking. |
| Alternative Flows and Exceptions | If the lesson is unpublished or unavailable, the system informs the student that access is not currently available. |
| Non-Functional Requirements | Lesson content should load clearly and consistently. Activity tracking should be accurate and should not noticeably interrupt the user experience. |

### UC-03 Attempt Quiz and Receive Automated Feedback

This use case enables a student to attempt a quiz and receive immediate automated feedback.

| Field | Description |
| --- | --- |
| Use Case Name | Attempt Quiz and Receive Automated Feedback |
| Actors | Student |
| Preconditions | The student is logged in and the selected quiz is available. |
| Normal Flow | 1. The student starts the quiz. 2. The system displays quiz questions, including randomized items if configured. 3. The student submits answers. 4. The system auto-grades objective question types. 5. The system stores the attempt score, answer details, and activity record. 6. The system displays automated feedback, identifies weak topics, and shows recommended next steps. |
| Postconditions | The quiz attempt result is saved for performance analysis, recommendation generation, and dashboard reporting. |
| Alternative Flows and Exceptions | If subjective questions exist, the system stores those answers for later review while objective items are graded automatically. If the submission is incomplete, the system warns the student before final submission. |
| Non-Functional Requirements | Feedback should be generated quickly, quiz records should be reliable, and grading for objective items should be consistent. |

### UC-04 Submit Assignment

This use case enables a student to submit assignment work before a deadline.

| Field | Description |
| --- | --- |
| Use Case Name | Submit Assignment |
| Actors | Student |
| Preconditions | The student is logged in, enrolled in the course, and the assignment is open for submission unless late submission is allowed. |
| Normal Flow | 1. The student opens the assignment details page. 2. The system displays assignment instructions, deadline, and submission rules. 3. The student uploads or submits the required work. 4. The system validates the submission. 5. The system records the submission time and status. 6. The system confirms successful assignment submission. |
| Postconditions | The assignment submission is stored for instructor review and student history. |
| Alternative Flows and Exceptions | If the file format or submission data is invalid, the system rejects the submission and requests correction. If the deadline has passed, the system either blocks the submission or marks it as late according to system rules. |
| Non-Functional Requirements | Submission handling should be dependable, and confirmation feedback should be clear to the student. |

## Instructor

### UC-05 Create Course and Learning Structure

This use case enables an instructor to create a course with modules and lessons.

| Field | Description |
| --- | --- |
| Use Case Name | Create Course and Learning Structure |
| Actors | Instructor |
| Preconditions | The instructor account is active and approved. |
| Normal Flow | 1. The instructor opens the create course page. 2. The instructor enters course details such as title, code, department, and description. 3. The system creates the course record. 4. The instructor adds modules to the course. 5. The instructor adds lessons to each module. 6. The system stores the learning structure for later content publishing and student access. |
| Postconditions | The course structure is available for content, quiz, and assignment setup. |
| Alternative Flows and Exceptions | If required course details are missing, the system requests correction before saving. |
| Non-Functional Requirements | Course setup should be easy to follow and should preserve data correctly across editing sessions. |

### UC-06 Publish Lesson Content and Interactive Material

This use case enables an instructor to upload or embed lesson content and publish it to students.

| Field | Description |
| --- | --- |
| Use Case Name | Publish Lesson Content and Interactive Material |
| Actors | Instructor |
| Preconditions | A course, module, and lesson already exist. |
| Normal Flow | 1. The instructor selects a lesson. 2. The instructor uploads or links reading material, video content, and H5P content authored through Lumi. 3. The instructor saves lesson content. 4. The instructor publishes the lesson. 5. The system makes the lesson available to enrolled students. 6. The system records content publication for notification and analytics purposes. |
| Postconditions | Students can access the published lesson, and the system can notify affected users. |
| Alternative Flows and Exceptions | If uploaded or embedded content is invalid, the system rejects the content and requests correction. |
| Non-Functional Requirements | Content publishing should be reliable, and embedded resources should remain accessible after publication. |

### UC-07 Create Assessment and Configure Feedback

This use case enables an instructor to create a quiz or assignment and define grading settings.

| Field | Description |
| --- | --- |
| Use Case Name | Create Assessment and Configure Feedback |
| Actors | Instructor |
| Preconditions | The instructor has an active course and a valid lesson or assignment target. |
| Normal Flow | 1. The instructor creates a quiz or assignment. 2. The instructor defines rules such as question type, deadline, total marks, and marking configuration. 3. The instructor selects or creates question bank items for quizzes. 4. The instructor configures automated feedback for objective questions. 5. The instructor publishes the assessment. 6. The system stores the assessment and makes it available according to course rules. |
| Postconditions | The assessment is available for student completion and later analytics. |
| Alternative Flows and Exceptions | If assessment settings are incomplete, the system blocks publishing until required fields are completed. |
| Non-Functional Requirements | Assessment data should be stored accurately, and published settings should remain consistent across student attempts. |

## Academic Advisor

### UC-08 View Advisor Alert Dashboard and Follow Up

This use case enables an academic advisor to identify at-risk students and perform follow-up actions.

| Field | Description |
| --- | --- |
| Use Case Name | View Advisor Alert Dashboard and Follow Up |
| Actors | Academic Advisor |
| Preconditions | The academic advisor is logged in and has assigned students. |
| Normal Flow | 1. The advisor opens the dashboard. 2. The system displays assigned students, risk levels, overdue work, and low-engagement indicators. 3. The advisor selects a student. 4. The system displays progress history, quiz performance, overdue assignments, and alert reasons. 5. The advisor reviews recommended intervention suggestions. 6. The advisor sends a follow-up advisory message. 7. The system records the follow-up status. |
| Postconditions | The advisor has current information for intervention, and the follow-up action is recorded. |
| Alternative Flows and Exceptions | If no current alerts exist, the system still allows the advisor to review assigned student summaries. |
| Non-Functional Requirements | Alert information should be timely, easy to interpret, and protected according to appropriate access control rules. |

## Admin

### UC-09 Moderate Content and Manage Announcements

This use case enables an admin to manage oversight, moderation, and announcement activities.

| Field | Description |
| --- | --- |
| Use Case Name | Moderate Content and Manage Announcements |
| Actors | Admin |
| Preconditions | The admin is logged in. |
| Normal Flow | 1. The admin reviews flagged or managed platform content. 2. The admin approves, updates, or removes content where necessary. 3. The admin creates or updates a system or course-related announcement template. 4. The system distributes announcements or stores them for notification delivery. 5. The system records the moderation or announcement action for oversight purposes. |
| Postconditions | Moderation and announcement actions are stored and can affect user notifications or content availability. |
| Alternative Flows and Exceptions | If content does not require moderation changes, the admin closes the review without modification. |
| Non-Functional Requirements | Administrative functions must be restricted to authorized users and should maintain a clear audit trail. |

# System Models

This section summarizes the main data structures that support QuestLearn.

## Class Diagrams / ERD

Insert the final exported ERD here.

Core entity groups:

- Identity and access: `Role`, `User`, `StudentProfile`, `InstructorProfile`, `AdvisorProfile`, `AdvisorStudentAssignment`
- Learning structure: `Course`, `Module`, `Lesson`, `ContentItem`, `Enrollment`
- Assessment and performance: `Quiz`, `Assignment`, `AssignmentSubmission`, `QuestionBank`, `Question`, `QuizAttempt`, `AttemptAnswer`, `ProgressRecord`
- Support and analytics: `ActivityLog`, `Recommendation`, `AdvisorAlert`, `Announcement`, `NotificationTemplate`, `Notification`
- Motivation support: `Badge`, `StudentBadge`, `StreakRecord`

`[Figure: Entity Relationship Diagram for QuestLearn]`

If required by the lecturer, insert the final class diagram after the ERD.

`[Figure: Class Diagram for QuestLearn]`

## Classes / Entities

The following classes and entities form the core data model of the system.

| Class / Entity | Description |
| --- | --- |
| `User` | Stores shared identity and login information for all users, including account status and email verification state. |
| `Role` | Supports role-based access control for Student, Instructor, Academic Advisor, and Admin. |
| `StudentProfile` | Stores student-specific academic and preference information such as academic level, programme, department, and learning preference. |
| `InstructorProfile` | Stores instructor-specific information including specialization, subjects taught, and office hours. |
| `AdvisorProfile` | Stores advisor information used for assigned-student monitoring and follow-up. |
| `AdvisorStudentAssignment` | Maps academic advisors to the students they are responsible for monitoring. |
| `Course` | Represents a course created and managed by an instructor. |
| `Module` | Divides a course into smaller learning units. |
| `Lesson` | Represents an individual lesson within a module. |
| `ContentItem` | Stores lesson assets such as videos, reading files, and H5P interactive content. |
| `Enrollment` | Maps students to courses. |
| `Quiz` | Represents a lesson-based assessment with configurable settings. |
| `Assignment` | Represents a course or lesson assignment with deadlines and marks. |
| `AssignmentSubmission` | Stores student assignment submissions, status, score, and feedback summary. |
| `QuestionBank` | Groups reusable questions for quiz creation and randomized selection. |
| `Question` | Stores question content, answer data, and explanation text for feedback support. |
| `QuizAttempt` | Stores a student's submitted quiz attempt and result summary. |
| `AttemptAnswer` | Stores each submitted answer within a quiz attempt. |
| `ProgressRecord` | Tracks lesson or module completion progress for students. |
| `ActivityLog` | Tracks user actions such as page visits, lesson openings, video viewing, interactive content use, and quiz attempts. |
| `Recommendation` | Stores rule-based next-step recommendations based on weak-topic detection and progress patterns. |
| `AdvisorAlert` | Stores early warning alerts for students who may need intervention. |
| `Announcement` | Stores platform-level or course-level announcements managed by instructors or admins. |
| `NotificationTemplate` | Stores reusable templates for notification delivery. |
| `Notification` | Stores reminders, alerts, and announcement delivery records. |
| `Badge` | Defines gamification rewards available in the platform. |
| `StudentBadge` | Stores badge awards earned by students. |
| `StreakRecord` | Tracks lightweight motivation indicators such as current and longest learning streaks. |

# Non-Functional Requirements

The following non-functional requirements apply to QuestLearn.

1. Usability: The system should provide a clear and simple interface for students, instructors, academic advisors, and admins with role-appropriate navigation.
2. Performance: Core actions such as login, loading course pages, opening lessons, and submitting quizzes should respond within an acceptable time under normal academic use.
3. Reliability: Quiz attempts, assignment submissions, progress records, notifications, and activity logs must be stored consistently without data loss under expected usage.
4. Security: Authentication, role-based access control, and email verification must be enforced to protect user accounts and administrative functions.
5. Maintainability: The system should use a structured modular design so future enhancements such as deeper analytics or expanded gamification can be added without major redesign.
6. Compatibility: The platform should be accessible through common modern web browsers and support embedded media and H5P content integration.
7. Auditability: Administrative moderation, notification actions, and advisor follow-up events should be traceable for review and oversight.

# References

1. [Part-I-System-Overview.md](./Part-I-System-Overview.md)
2. [Use-Cases.md](./Use-Cases.md)
3. [ERD-UML.md](./ERD-UML.md)
4. [Requirements-Traceability.md](./Requirements-Traceability.md)
5. [Gantt-Chart.md](./Gantt-Chart.md)
6. [Use-Case-Diagram-Spec.md](./Use-Case-Diagram-Spec.md)
7. [Terminology-Sheet.md](./Terminology-Sheet.md)
8. [reference/Project-Summary.md](./reference/Project-Summary.md)
9. [reference/Part-I-Gap-Review-and-Workload-Plan.md](./reference/Part-I-Gap-Review-and-Workload-Plan.md)
