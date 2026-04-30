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
4.1 ERD
4.2 Entities

The following section describes each entity in QuestLearn one by one. For every entity, the key attributes are identified first, followed by the main relationship(s) it has with other entities in the ERD.

### Role

- Attributes: `role_id` (PK), `role_name`
- Description: stores the system roles used for access control, such as Student, Instructor, Academic Advisor, and Admin.
- Relationships: one role can be assigned to many users; each user belongs to one role.

### User

- Attributes: `user_id` (PK), `role_id` (FK), `full_name`, `email`, `password_hash`, `account_status`, `email_verified_at`
- Description: stores the shared login and identity details for all platform users.
- Relationships: each user belongs to one role, and a user may have one related profile record such as StudentProfile, InstructorProfile, or AdvisorProfile.

### StudentProfile

- Attributes: `student_profile_id` (PK), `user_id` (FK), `student_no`, `academic_level`, `programme`, `department`, `learning_preference`
- Description: stores student-specific profile information that is not part of the shared user account.
- Relationships: each student profile belongs to one user; one student profile can have many enrollments, submissions, quiz attempts, progress records, recommendations, alerts, badges, and streak records.

### InstructorProfile

- Attributes: `instructor_profile_id` (PK), `user_id` (FK), `staff_no`, `specialization`, `subjects_taught`, `office_hours`
- Description: stores instructor-specific information for course creation and teaching support.
- Relationships: each instructor profile belongs to one user; one instructor can create many courses, lessons, quizzes, assignments, and announcements.

### AdvisorProfile

- Attributes: `advisor_profile_id` (PK), `user_id` (FK), `staff_no`, `department`, `office_hours`
- Description: stores academic advisor information used for student monitoring and intervention.
- Relationships: each advisor profile belongs to one user; one advisor can have many advisor-student assignments and many advisor alerts.

### AdvisorStudentAssignment

- Attributes: `assignment_id` (PK), `advisor_profile_id` (FK), `student_profile_id` (FK), `assigned_at`, `status`
- Description: records which advisor is responsible for which student.
- Relationships: each record links one advisor to one student; an advisor can monitor many students, and a student can be reassigned over time.

### Course

- Attributes: `course_id` (PK), `instructor_profile_id` (FK), `course_code`, `course_title`, `description`, `department`, `status`
- Description: stores the main course information created by instructors.
- Relationships: one course is created by one instructor and can contain many modules, enrollments, assignments, quizzes, question banks, and announcements.

### Module

- Attributes: `module_id` (PK), `course_id` (FK), `module_title`, `sequence_no`, `description`, `publish_status`
- Description: groups lessons into an ordered learning sequence inside a course.
- Relationships: one course can have many modules, and each module can have many lessons.

### Lesson

- Attributes: `lesson_id` (PK), `module_id` (FK), `lesson_title`, `lesson_type`, `content_summary`, `publish_status`
- Description: represents a learning unit inside a module.
- Relationships: one module can have many lessons; one lesson can have many content items, quizzes, assignments, and progress records.

### ContentItem

- Attributes: `content_item_id` (PK), `lesson_id` (FK), `content_type`, `content_title`, `file_url`, `embed_url`, `display_order`
- Description: stores the learning assets attached to a lesson, such as video, reading material, or embedded H5P content.
- Relationships: each content item belongs to one lesson; one lesson can contain many content items.

### Enrollment

- Attributes: `enrollment_id` (PK), `student_profile_id` (FK), `course_id` (FK), `enrolled_at`, `status`
- Description: acts as the bridge table that records which students are enrolled in which courses.
- Relationships: one student can enroll in many courses, and one course can have many enrolled students.

### Quiz

- Attributes: `quiz_id` (PK), `lesson_id` (FK), `quiz_title`, `total_marks`, `publish_status`, `time_limit`
- Description: stores an assessment attached to a lesson.
- Relationships: one lesson can have many quizzes, and one quiz can have many quiz attempts.

### Assignment

- Attributes: `assignment_id` (PK), `course_id` (FK), `lesson_id` (FK, optional), `assignment_title`, `deadline`, `total_marks`, `publish_status`
- Description: stores a course-level or lesson-level assignment.
- Relationships: one course can have many assignments; each assignment can produce many submissions.

### AssignmentSubmission

- Attributes: `submission_id` (PK), `assignment_id` (FK), `student_profile_id` (FK), `submitted_at`, `submission_url`, `score`, `feedback`
- Description: stores the work submitted by a student for an assignment.
- Relationships: each submission belongs to one assignment and one student; one assignment can have many submissions.

### QuestionBank

- Attributes: `question_bank_id` (PK), `course_id` (FK), `bank_name`, `description`, `is_active`
- Description: groups reusable questions for quizzes.
- Relationships: one course can have many question banks, and one question bank can contain many questions.

### Question

- Attributes: `question_id` (PK), `question_bank_id` (FK), `question_type`, `prompt`, `correct_answer`, `explanation`
- Description: stores a single question item that can be reused in quizzes.
- Relationships: each question belongs to one question bank; a bank can contain many questions.

### QuizAttempt

- Attributes: `attempt_id` (PK), `quiz_id` (FK), `student_profile_id` (FK), `score`, `submitted_at`, `feedback_summary`
- Description: stores one student's attempt for one quiz.
- Relationships: one quiz can have many attempts, and each attempt can contain many attempt answers.

### AttemptAnswer

- Attributes: `attempt_answer_id` (PK), `attempt_id` (FK), `question_id` (FK), `student_answer`, `is_correct`
- Description: stores each answer submitted as part of a quiz attempt.
- Relationships: each answer belongs to one quiz attempt and one question.

### ProgressRecord

- Attributes: `progress_record_id` (PK), `student_profile_id` (FK), `lesson_id` (FK), `completion_status`, `percentage`, `updated_at`
- Description: tracks a student's learning progress at lesson or module level.
- Relationships: one student can have many progress records, and one lesson can be tracked by many students.

### ActivityLog

- Attributes: `activity_log_id` (PK), `user_id` (FK), `activity_type`, `activity_time`, `target_type`, `target_id`
- Description: records user actions and engagement events for analytics.
- Relationships: each activity log belongs to one user; a user can generate many activity records.

### Recommendation

- Attributes: `recommendation_id` (PK), `student_profile_id` (FK), `topic`, `message`, `generated_at`, `status`
- Description: stores rule-based learning suggestions for students based on weak-topic detection and progress data.
- Relationships: one student can have many recommendations.

### AdvisorAlert

- Attributes: `advisor_alert_id` (PK), `advisor_profile_id` (FK), `student_profile_id` (FK), `risk_level`, `trigger_reason`, `created_at`, `status`
- Description: stores an early-warning alert when a student may need academic intervention.
- Relationships: each alert is associated with one advisor and one student; an advisor can receive many alerts.

### Announcement

- Attributes: `announcement_id` (PK), `user_id` (FK), `title`, `message`, `scope`, `published_at`
- Description: stores platform-wide or course-related announcements created by instructors or admins.
- Relationships: each announcement is created by one user; announcements may be targeted to one course, one role, or the whole system depending on scope.

### NotificationTemplate

- Attributes: `template_id` (PK), `created_by_user_id` (FK), `subject_template`, `body_template`, `template_type`, `is_active`
- Description: stores reusable notification message templates managed by admins.
- Relationships: one admin can manage many notification templates; a template can be used to generate many notifications.

### Notification

- Attributes: `notification_id` (PK), `user_id` (FK), `template_id` (FK, optional), `announcement_id` (FK, optional), `message`, `is_read`, `sent_at`
- Description: stores a notification delivered to a user.
- Relationships: each notification belongs to one user and may be linked to a template or announcement.

### Badge

- Attributes: `badge_id` (PK), `badge_name`, `description`, `award_rule`, `icon_url`
- Description: defines a gamification badge that can be earned by students.
- Relationships: one badge can be awarded many times through StudentBadge.

### StudentBadge

- Attributes: `student_badge_id` (PK), `student_profile_id` (FK), `badge_id` (FK), `awarded_at`, `awarded_reason`
- Description: records which student has earned which badge.
- Relationships: each record links one student to one badge; one student can earn many badges, and one badge can be awarded to many students.

### StreakRecord

- Attributes: `streak_record_id` (PK), `student_profile_id` (FK), `current_streak`, `longest_streak`, `last_activity_date`
- Description: tracks a student's learning streaks for lightweight motivation support.
- Relationships: each student has one streak record.

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
| Aziel Tan Zheng Chuan | ERD logic support, technical structure, data relationship validation |
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

## ERD

Insert the final exported ERD here.

Core entity groups:

- Identity and access: `Role`, `User`, `StudentProfile`, `InstructorProfile`, `AdvisorProfile`, `AdvisorStudentAssignment`
- Learning structure: `Course`, `Module`, `Lesson`, `ContentItem`, `Enrollment`
- Assessment and performance: `Quiz`, `Assignment`, `AssignmentSubmission`, `QuestionBank`, `Question`, `QuizAttempt`, `AttemptAnswer`, `ProgressRecord`
- Support and analytics: `ActivityLog`, `Recommendation`, `AdvisorAlert`, `Announcement`, `NotificationTemplate`, `Notification`
- Motivation support: `Badge`, `StudentBadge`, `StreakRecord`

`[Figure: Entity Relationship Diagram for QuestLearn]`

## Classes / Entities

The following section describes the core classes and entities one by one, using the same attribute-and-relationship style as the ERD entity description.

### User

- Attributes:
	- `user_id` (PK): Unique identifier for the user.
	- `role_id` (FK): Determines the user's access permissions and role.
	- `full_name`: The user's full name for display and records.
	- `email`: Contact and login email address (unique).
	- `password_hash`: Secure hashed password used for authentication.
	- `account_status`: Account state (e.g., active, suspended, closed).
	- `email_verified_at`: Timestamp when the user's email was verified.
- Description: stores shared identity and login information for all users.
- Relationships: each user belongs to one role and may have one related profile record.

### Role

- Attributes:
	- `role_id` (PK): Unique identifier for the role.
	- `role_name`: Human-readable role label (e.g., student, instructor, admin).
- Description: defines the access control roles used in the system.
- Relationships: one role can be assigned to many users.

### StudentProfile

- Attributes:
	- `student_profile_id` (PK): Unique identifier for the student profile.
	- `user_id` (FK): Associates the profile with a user account.
	- `student_no`: Institution-assigned student number.
	- `academic_level`: Current study level (e.g., Year 1, Level 2).
	- `programme`: Enrolled programme or course of study.
	- `department`: Academic department the student belongs to.
	- `learning_preference`: Student's preferred learning mode (e.g., visual, auditory).
- Description: stores student-specific academic and preference information.
- Relationships: each student profile belongs to one user and can be linked to enrollments, submissions, attempts, progress records, recommendations, alerts, badges, and streak records.

### InstructorProfile

- Attributes:
	- `instructor_profile_id` (PK): Unique identifier for the instructor profile.
	- `user_id` (FK): Associates the profile with a user account.
	- `staff_no`: Institution-assigned staff number.
	- `specialization`: Instructor's area of expertise.
	- `subjects_taught`: List or summary of subjects the instructor teaches.
	- `office_hours`: Published contact/availability times.
- Description: stores instructor-specific teaching and contact information.
- Relationships: each instructor profile belongs to one user and can create courses, lessons, quizzes, assignments, and announcements.

### AdvisorProfile

- Attributes:
	- `advisor_profile_id` (PK): Unique identifier for the advisor profile.
	- `user_id` (FK): Associates the profile with a user account.
	- `staff_no`: Advisor's staff number.
	- `department`: Department the advisor is assigned to.
	- `office_hours`: Advisor's contact/availability times.
- Description: stores academic advisor details used for monitoring and follow-up.
- Relationships: each advisor profile belongs to one user and can be linked to student assignments and alerts.

### AdvisorStudentAssignment

- Attributes:
	- `assignment_id` (PK): Unique identifier for the advisor-student assignment.
	- `advisor_profile_id` (FK): Identifies the assigned academic advisor.
	- `student_profile_id` (FK): Identifies the student being monitored.
	- `assigned_at`: Timestamp when the advisor was assigned to the student.
	- `status`: Assignment state (e.g., active, completed, revoked).
- Description: maps academic advisors to the students they monitor.
- Relationships: each record links one advisor to one student.

### Course

- Attributes:
	- `course_id` (PK): Unique course identifier.
	- `instructor_profile_id` (FK): Identifies the instructor who created the course.
	- `course_code`: Short unique code used to identify the course.
	- `course_title`: Full title of the course.
	- `description`: Text summary of the course content.
	- `department`: Academic department offering the course.
	- `status`: Publish/state (e.g., draft, published, archived).
- Description: represents a course created and managed by an instructor.
- Relationships: one course can contain many modules, enrollments, assignments, quizzes, question banks, and announcements.

### Module

- Attributes:
	- `module_id` (PK): Unique identifier for the module.
	- `course_id` (FK): Identifies the parent course.
	- `module_title`: Title of the module.
	- `sequence_no`: Ordering number within the course.
	- `description`: Short summary of module contents.
	- `publish_status`: Visibility state (e.g., unpublished, published).
- Description: divides a course into smaller learning units.
- Relationships: one course can have many modules, and one module can have many lessons.

### Lesson

- Attributes:
	- `lesson_id` (PK): Unique lesson identifier.
	- `module_id` (FK): Identifies the parent module.
	- `lesson_title`: Title of the lesson.
	- `lesson_type`: Type of lesson (e.g., video, reading, interactive).
	- `content_summary`: Short description of lesson content.
	- `publish_status`: Visibility state for the lesson.
- Description: represents an individual lesson within a module.
- Relationships: one lesson can contain many content items, quizzes, assignments, and progress records.

### ContentItem

- Attributes:
	- `content_item_id` (PK): Unique identifier for the content item.
	- `lesson_id` (FK): Identifies the parent lesson.
	- `content_type`: Type of content (video, file, embed, interactive).
	- `content_title`: Title or caption for the content.
	- `file_url`: Link to uploaded resource file.
	- `embed_url`: External embed link (e.g., YouTube, H5P).
	- `display_order`: Integer controlling ordering within the lesson.
- Description: stores lesson assets such as videos, reading files, and H5P interactive content.
- Relationships: each content item belongs to one lesson.

### Enrollment

- Attributes:
	- `enrollment_id` (PK): Unique enrollment record identifier.
	- `student_profile_id` (FK): Identifies the enrolled student.
	- `course_id` (FK): Identifies the course.
	- `enrolled_at`: Timestamp when enrollment occurred.
	- `status`: Enrollment state (active, withdrawn, completed).
- Description: maps students to courses.
- Relationships: one student can enroll in many courses, and one course can have many enrolled students.

### Quiz

- Attributes:
	- `quiz_id` (PK): Unique quiz identifier.
	- `lesson_id` (FK): Identifies the lesson this quiz belongs to.
	- `quiz_title`: Title of the quiz.
	- `total_marks`: Maximum achievable marks.
	- `publish_status`: Visibility state for the quiz.
	- `time_limit`: Time allowed for completion (if any).
- Description: represents a lesson-based assessment.
- Relationships: one lesson can have many quizzes, and one quiz can have many quiz attempts.

### Assignment

- Attributes:
	- `assignment_id` (PK): Unique assignment identifier.
	- `course_id` (FK): Identifies the parent course.
	- `lesson_id` (FK, optional): Identifies the related lesson when applicable.
	- `assignment_title`: Title of the assignment.
	- `deadline`: Submission deadline timestamp.
	- `total_marks`: Maximum marks for the assignment.
	- `publish_status`: Visibility state for students.
- Description: represents a course or lesson assignment.
- Relationships: one assignment can produce many submissions.

### AssignmentSubmission

- Attributes:
	- `submission_id` (PK): Unique submission record identifier.
	- `assignment_id` (FK): Identifies the assignment being submitted.
	- `student_profile_id` (FK): Identifies the submitting student.
	- `submitted_at`: Timestamp of submission.
	- `submission_url`: Link to the submitted file or resource.
	- `score`: Numeric grade awarded.
	- `feedback`: Instructor feedback text.
- Description: stores student assignment submissions and result details.
- Relationships: each submission belongs to one assignment and one student.

### QuestionBank

- Attributes:
	- `question_bank_id` (PK): Unique identifier for the question bank.
	- `course_id` (FK): Identifies the course the bank belongs to.
	- `bank_name`: Name of the question bank.
	- `description`: Short description of the bank's purpose.
	- `is_active`: Boolean indicating availability for use.
- Description: groups reusable questions for quiz creation.
- Relationships: one course can have many question banks, and one question bank can contain many questions.

### Question

- Attributes:
	- `question_id` (PK): Unique question identifier.
	- `question_bank_id` (FK): Identifies the question bank.
	- `question_type`: Format/type of the question (MCQ, short answer).
	- `prompt`: The question text presented to students.
	- `correct_answer`: Canonical correct answer or marking rule.
	- `explanation`: Optional explanation or rationale for the answer.
- Description: stores question content and answer data.
- Relationships: each question belongs to one question bank.

### QuizAttempt

- Attributes:
	- `attempt_id` (PK): Unique identifier for the quiz attempt.
	- `quiz_id` (FK): Identifies the quiz being attempted.
	- `student_profile_id` (FK): Identifies the student who attempted the quiz.
	- `score`: Total score achieved on the attempt.
	- `submitted_at`: Timestamp when the attempt was submitted.
	- `feedback_summary`: Summary feedback for the attempt.
- Description: stores a student's submitted quiz attempt.
- Relationships: one quiz can have many attempts, and one attempt can have many attempt answers.

### AttemptAnswer

- Attributes:
	- `attempt_answer_id` (PK): Unique identifier for this answer record.
	- `attempt_id` (FK): Identifies the parent quiz attempt.
	- `question_id` (FK): Identifies the question being answered.
	- `student_answer`: The student's submitted response.
	- `is_correct`: Boolean indicating correctness.
- Description: stores each submitted answer within a quiz attempt.
- Relationships: each answer belongs to one attempt and one question.

### ProgressRecord

- Attributes:
	- `progress_record_id` (PK): Unique progress record identifier.
	- `student_profile_id` (FK): Identifies the student tracking progress.
	- `lesson_id` (FK): Identifies the lesson being tracked.
	- `completion_status`: Status (not started, in progress, completed).
	- `percentage`: Completion percentage (0-100).
	- `updated_at`: Timestamp of last update.
- Description: tracks lesson or module completion progress.
- Relationships: one student can have many progress records, and one lesson can be tracked by many students.

### ActivityLog

- Attributes:
	- `activity_log_id` (PK): Unique activity record identifier.
	- `user_id` (FK): Identifies the user who performed the action.
	- `activity_type`: Type of action (login, view, submit, etc.).
	- `activity_time`: Timestamp of the activity.
	- `target_type`: The kind of object targeted (lesson, course, quiz).
	- `target_id`: Identifier of the targeted object.
- Description: tracks user actions and engagement events.
- Relationships: each activity log belongs to one user.

### Recommendation

- Attributes:
	- `recommendation_id` (PK): Unique identifier for the recommendation.
	- `student_profile_id` (FK): Identifies the student receiving the recommendation.
	- `topic`: Topic or skill area the recommendation targets.
	- `message`: Human-readable recommendation text.
	- `generated_at`: Timestamp when the recommendation was created.
	- `status`: State (pending, acted-upon, dismissed).
- Description: stores rule-based next-step recommendations.
- Relationships: one student can have many recommendations.

### AdvisorAlert

- Attributes:
	- `advisor_alert_id` (PK): Unique alert identifier.
	- `advisor_profile_id` (FK): Identifies the advisor responsible for follow-up.
	- `student_profile_id` (FK): Identifies the student flagged by the alert.
	- `risk_level`: Severity indicator (low, medium, high).
	- `trigger_reason`: Reason or metric that triggered the alert.
	- `created_at`: Timestamp when the alert was generated.
	- `status`: Alert state (open, acknowledged, resolved).
- Description: stores early warning alerts for students who may need intervention.
- Relationships: each alert is linked to one advisor and one student.

### Announcement

- Attributes:
	- `announcement_id` (PK): Unique announcement identifier.
	- `user_id` (FK): Identifies the author/creator.
	- `title`: Short headline for the announcement.
	- `message`: Full announcement content.
	- `scope`: Audience scope (platform, course-level, cohort).
	- `published_at`: Timestamp when published.
- Description: stores platform-level or course-level announcements.
- Relationships: each announcement is created by one user.

### NotificationTemplate

- Attributes:
	- `template_id` (PK): Unique template identifier.
	- `created_by_user_id` (FK): Identifies the template creator.
	- `subject_template`: Template for the notification subject.
	- `body_template`: Template for the notification body.
	- `template_type`: Type/category of template (email, in-app).
	- `is_active`: Boolean indicating whether the template is active.
- Description: stores reusable notification templates.
- Relationships: one admin can manage many templates.

### Notification

- Attributes:
	- `notification_id` (PK): Unique notification identifier.
	- `user_id` (FK): Identifies the notification recipient.
	- `template_id` (FK, optional): Template used to generate the notification if applicable.
	- `announcement_id` (FK, optional): Announcement associated with the notification if applicable.
	- `message`: Delivered message text.
	- `is_read`: Boolean indicating if the user has read it.
	- `sent_at`: Timestamp when the notification was sent.
- Description: stores reminders, alerts, and announcement delivery records.
- Relationships: each notification belongs to one user.

### Badge

- Attributes:
	- `badge_id` (PK): Unique badge identifier.
	- `badge_name`: Display name of the badge.
	- `description`: Short description of the badge and criteria.
	- `award_rule`: Rule or condition used to award the badge.
	- `icon_url`: URL to the badge icon image.
- Description: defines gamification rewards available in the platform.
- Relationships: one badge can be awarded many times through StudentBadge.

### StudentBadge

- Attributes:
	- `student_badge_id` (PK): Unique award record identifier.
	- `student_profile_id` (FK): Identifies the student who earned the badge.
	- `badge_id` (FK): Identifies the awarded badge.
	- `awarded_at`: Timestamp when awarded.
	- `awarded_reason`: Optional note explaining why the badge was awarded.
- Description: stores badge awards earned by students.
- Relationships: each record links one student to one badge.

### StreakRecord

- Attributes:
	- `streak_record_id` (PK): Unique streak record identifier.
	- `student_profile_id` (FK): Identifies the student (one streak record per student).
	- `current_streak`: Current consecutive days/sessions count.
	- `longest_streak`: Best historical consecutive count.
	- `last_activity_date`: Date of the last recorded activity.
- Description: tracks lightweight motivation indicators such as current and longest learning streaks.
- Relationships: each student has one streak record.

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
