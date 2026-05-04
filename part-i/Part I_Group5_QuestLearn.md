# Software Requirements SpecificationforQuestLearn (Smart Interactive Learning System)

Version &lt;1.0&gt;

Group No.: <_Group 5_\>

|     |     |     |
| --- | --- | --- |
| &lt;See Wing Kit&gt; | &lt;261UC240PJ&gt; |     |
| &lt;Aziel Tan Zheng Chuan&gt; | &lt;261UC240LY&gt; |     |
| &lt;Vincent Lock Chun Kit&gt; | &lt;261UC2406W&gt; |     |
| &lt;Soo Kian Rong&gt; | &lt;261UC26145&gt; |     |

|     |     |
| --- | --- |
|     |     |
|     |     |
|     |     |
| Date: &lt;28 April 2025&gt; |     |

Contents

Table of Contents

[1 Project Introduction 4](#_Toc228730281)

[1.1 Team Members 4](#_Toc228730282)

[1.2 Problem statement 4](#_Toc228730283)

[1.3 Project Schedule 5](#_Toc228730284)

[2 System Overview 6](#_Toc228730285)

[2.1 Description 6](#_Toc228730286)

[2.2 Actors 7](#_Toc228730287)

[2.3 Assumptions and Dependencies 8](#_Toc228730288)

[2.4 Use Case Diagram 9](#_Toc228730289)

[3 Functional Requirements 10](#_Toc228730290)

[3.1 Actor 1-Student 10](#_Toc228730291)

[3.1.1 Use Case 1-Register Account and Login 10](#_Toc228730292)

[3.1.2 Use Case 2-Start Lesson 12](#_Toc228730293)

[3.1.3 Use Case 3-Attempt Quiz and Receive Automated Feedback 14](#_Toc228730294)

[3.1.4 Use Case 4-Submit Assignment 16](#_Toc228730295)

[3.2 Actor 2-Instructor 18](#_Toc228730296)

[3.2.1 Use Case 5-Create Course and Learning Structure 18](#_Toc228730297)

[3.2.2 Use Case 6-Publish Lesson Content and Interactive Material 20](#_Toc228730298)

[3.2.3 Use Case 7-Create Assessment and Configure Feedback 22](#_Toc228730299)

[3.3 Actor 3-Academic Advisor 24](#_Toc228730300)

[3.3.1 Use Case 8-View Advisor Alert Dashboard and Follow Up 24](#_Toc228730301)

[3.4 Actor 4-Admin 26](#_Toc228730302)

[3.4.1 Use Case 9-Moderate Content and Manage Announcements 26](#_Toc228730303)

[4 System Models 28](#_Toc228730304)

[4.1 ERD Diagram 28](#_Toc228730305)

[4.2 Entities 28](#_Toc228730306)

[5 Non-Functional Requirements 34](#_Toc228730307)

[6 References 35](#_Toc228730308)

Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| --- | --- | --- | --- |
| SRS in Part 1(as Ver 1.0)<br><br>SDS in Part 2(as Ver 2.0.X)<br><br>\*System Documentation in Part 3 (as Ver 3.0)<br><br>Draft Type and Number | See Wing Kit, Aziel Tan Zheng Chuan, Vincent Lock Chun Kit, Soo Kian Rong | Initial Part I SRS draft for QuestLearn based on the TT7L Smart Interactive Learning System brief. | 27/04/2026 |
| SDS in Part 2(as Ver 2.0.X) |     |     |     |
| System Documentation in Part 3 (as Ver 3.0) |     |     |     |
|     |     |     |     |

# Project Introduction

QuestLearn is a Smart Interactive Learning System proposed for higher education. The system is designed to improve student engagement and academic support by combining microlearning-based lesson delivery, embedded video and reading content, quiz and assignment management, automated feedback, activity tracking, progress analytics, and academic advisor monitoring support.

The project addresses a common limitation in existing learning platforms: many systems can store notes, videos, and quizzes, but they do not actively guide students through short learning paths, identify weak topics quickly, or help academic staff intervene early when students show signs of academic risk. QuestLearn is intended to provide a more complete and connected workflow for students, instructors, academic advisors, and administrators.

## Team Members

|     |     |
| --- | --- |
| Name | Actor/Processes |
| See Wing Kit | Project Leader: Overall scope control, system integration, requirements alignment, final review |
| Aziel Tan Zheng Chuan | Programming Leader: ERD and class logic support, technical structure, data relationship validation |
| Vincent Lock Chun Kit | Documentation Manager: System overview writing, use case formatting, process-flow and Gantt chart preparation |
| Soo Kian Rong | Quality Manager: Requirements coverage checking, consistency review, proofreading and quality audit |

## Problem statement

Current university learning systems are often useful for content storage and basic assessment delivery, but they are less effective at actively supporting students throughout the learning process. Students may access lecture materials and attempt quizzes, yet still receive limited guidance on what to study next, why they performed poorly, or how to improve weak areas through targeted remedial learning.

These platforms also tend to separate course content, progress monitoring, assessment performance, and academic support into disconnected functions. Instructors may upload materials without seeing rich engagement signals, students may complete activities without meaningful personalized feedback, and academic advisors may only detect problems after academic results have already declined. As a result, universities miss opportunities for timely intervention and sustained learner motivation.

QuestLearn is proposed to solve this problem by combining guided microlearning, embedded video and reading content, assignment management, activity tracking, automated feedback, weak-topic identification, and advisor student monitoring in one integrated platform.

## Project Schedule

> TO DO: Insert exported Gantt chart visual here.

# System Overview

## Description

QuestLearn is designed as a higher-education learning platform that supports four main roles: **Student, Instructor, Academic Advisor,** and **Admin**. Its main purpose is to provide a more engaging and supportive learning experience than a traditional content repository by connecting learning delivery, assessment, progress monitoring, and academic intervention into one coherent workflow.

The system includes the following major functions:

**1\. User Management**

- account registration and login with email and password
- admin-mediated password reset for users who forget their credentials
- role-based access control
- profile management for students, instructors, academic advisors, and admins
- student profile storage including academic level, programme or department, and learning preferences
- instructor profile storage including specialization, subjects taught, and office hours
- activity tracking for quizzes taken, videos watched, pages visited, and lesson interactions

**2\. Course and Content Management**

- course creation and editing
- module and lesson management
- lesson sequencing into guided microlearning paths
- integration of videos, reading materials, and H5P content authored through Lumi
- content publishing workflow for lessons and modules
- learning content moderation and platform oversight by admins

**3\. Assessment and Progress Tracking**

- quiz and assignment management
- question bank support and randomized question selection
- support for multiple question types such as multiple choice, fill-in-the-blank, and short answer
- auto-grading for objective question types
- attempt history, score storage, submission tracking, and assessment history
- module completion status, learning progress, and detailed performance analytics
- automated feedback for quiz attempts with tips for improvement based on mistakes
- weak-topic identification and recommended next steps

**4\. Reporting and Notifications**

- student dashboard with progress, grades, assessment history, and recommended next steps
- instructor dashboard with class performance and course engagement analytics
- academic advisor dashboard with assigned students, progress summaries, and risk indicators
- admin dashboard for user management, moderation, announcements, and platform-wide oversight
- notifications for assignment deadlines, new course content uploads, quiz score announcements, and advisor support alerts

The system also introduces several innovation points within a realistic prototype scope. These include automated quiz feedback with weak-topic identification and recommended next steps, an academic advisor monitoring dashboard with student progress summaries and performance indicators, and in-app notification delivery for key academic events.

## Actors

|     |     |
| --- | --- |
| **Actor** | **Use Cases** |
| Student | Register account, log in, manage profile, view enrolled courses, start lesson, attempt quiz, submit assignment, view progress, view recommended next steps, receive notifications |
| Instructor | Register account, log in, manage instructor profile, create course, create module, create lesson, upload learning content, create quiz, create assignment, configure automated feedback, publish learning content, view analytics, send course announcements |
| Academic Advisor | Log in, view department students, review student progress and performance, send advisory follow-up |
| Admin | Log in, manage users, assign roles, approve instructor accounts, reset user password, moderate learning content, manage announcements, view platform analytics |

## Assumptions and Dependencies

The following assumptions and dependencies are used as the basis for the current SRS.

1.  The system is intended for university-level teaching and learning rather than general public self-learning.
2.  Users will access the platform through a stable web connection on standard desktop or mobile browsers.
3.  User registration uses email and password without external email verification services. Account activation is immediate upon successful registration.
4.  If a user forgets their password, the Admin can reset it to a temporary default value. No self-service password recovery is included in the initial scope.
5.  Video content is embedded within lessons using external URLs such as YouTube. No custom video hosting or interactive authoring engine is included in the initial scope.
6.  Academic advisor monitoring is based on visible quiz, assignment, and progress data rather than automated predictive risk models.
7.  In-app notifications for deadlines, uploaded content, and quiz score announcements depend on correct event triggering and user account data.
8.  The first version of the system will focus on core academic workflows only. Advanced gamification, social features, mobile-native apps, and enterprise integration are outside initial scope.

## Use Case Diagram

> TO DO: Insert exported UML use case diagram image here.

# Functional Requirements

## Actor 1-Student

### Use Case 1-Register Account and Login

This use case enables a new student to create an account and log in to access the platform.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Register Account and Login</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Student, Instructor, Academic Advisor</p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The user does not already have an active account.</p></td></tr><tr><td rowspan="2"><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The user opens the registration page.</li><li>The user enters required account information including name, email, student/staff ID, password, and programme/department.</li><li>The system validates the submitted data.</li><li>The system creates the account and assigns the appropriate role.</li><li>The user is redirected to the login page.</li><li>The user enters credentials and logs in.</li><li>The system opens the user dashboard.</li></ol></td></tr><tr><td><p>Postconditions</p></td><td><p>The user account is created and the user is logged in with access to their dashboard. (Note: Instructors may require admin approval before full course creation features are unlocked).</p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If the email is already registered, the system shows an error and directs the user to log in. If login credentials are invalid, the system allows retry. After 3 failed login attempts, the account is locked for 15 minutes. If a user forgets their password, they contact the Admin who resets it to a temporary default value. The user must change their password upon next login.</p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Account creation should be simple, secure, and complete within a short response time. Login events must be recorded reliably.</p></td></tr></tbody></table></div>

### Use Case 2-Start Lesson

This use case enables a student to access a course lesson and begin guided learning activities.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Start Lesson</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Student</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The student is logged in and enrolled in the selected course.</p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The student opens a course.</li><li>The student selects a module.</li><li>The student selects a lesson.</li><li>The system displays lesson content, including reading material, embedded video, and H5P activity where available.</li><li>The system records page visits, video interactions, and lesson access in the activity log.</li><li>The system updates lesson progress status.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>Lesson access and progress updates are stored for analytics and progress tracking</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If the lesson is unpublished or unavailable, the system informs the student that access is not currently available.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Lesson content should load clearly and consistently. Activity tracking should be accurate and should not noticeably interrupt the user experience.</p></td></tr></tbody></table></div>

### Use Case 3-Attempt Quiz and Receive Automated Feedback

This use case enables a student to attempt a quiz and receive immediate automated feedback.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Attempt Quiz and Receive Automated Feedback</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Student</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The student is logged in and the selected quiz is available.</p><p></p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The student starts the quiz.</li><li>The system displays quiz questions, including randomized items if configured.</li><li>The student submits answers.</li><li>The system auto-grades objective question types.</li><li>The system stores the attempt score, answer details, and activity record.</li><li>The system displays automated feedback, identifies weak topics, and shows recommended next steps.</li></ol></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td colspan="2"><p>The quiz attempt result is saved for performance analysis, recommendation generation, and dashboard reporting.</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If subjective questions exist, the system stores those answers for later review while objective items are graded automatically. If the submission is incomplete, the system warns the student before final submission.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Feedback should be generated quickly, quiz records should be reliable, and grading for objective items should be consistent.</p></td></tr></tbody></table></div>

### Use Case 4-Submit Assignment

This use case enables a student to submit assignment work before a deadline.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Submit Assignment</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Student</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The student is logged in, enrolled in the course, and the assignment is open for submission unless late submission is allowed.</p><p></p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The student opens the assignment details page.</li><li>The system displays assignment instructions, deadline, and submission rules.</li><li>The student uploads or submits the required work.</li><li>The system validates the submission.</li><li>The system records the submission time and status.</li><li>The system confirms successful assignment submission.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>The assignment submission is stored for instructor review and student history.</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If the file format or submission data is invalid, the system rejects the submission and requests correction. If the deadline has passed, the system either blocks the submission or marks it as late according to system rules.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Submission handling should be dependable, and confirmation feedback should be clear to the student.</p></td></tr></tbody></table></div>

## Actor 2-Instructor

### Use Case 5-Create Course and Learning Structure

This use case enables an instructor to create a course with modules and lessons.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Create Course and Learning Structure</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Instructor</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The instructor account is active upon approved and logged in to the account.</p><p></p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The instructor opens the create course page.</li><li>The instructor enters course details such as title, code, department, and description.</li><li>The system creates the course record.</li><li>The instructor adds modules to the course.</li><li>The instructor adds lessons to each module.</li><li>The system stores the learning structure for later content publishing and student access.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>The course structure is available for content, quiz, and assignment setup.</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If required course details are missing, the system requests correction before saving.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Course setup should be easy to follow and should preserve data correctly across editing sessions.</p></td></tr></tbody></table></div>

### Use Case 6-Publish Lesson Content and Interactive Material

This use case enables an instructor to upload or embed lesson content and publish it to students.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Publish Lesson Content and Interactive Material</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Instructor</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The instructor is logged in with a course, module, and lesson already exist.</p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The instructor selects a lesson.</li><li>The instructor uploads or links reading material, video content, and H5P content authored through Lumi.</li><li>The instructor saves lesson content.</li><li>The instructor publishes the lesson.</li><li>The system makes the lesson available to enrolled students.</li><li>The system records content publication for notification and analytics purposes.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>Students can access the published lesson, and the system can notify affected users.</p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If uploaded or embedded content is invalid, the system rejects the content and requests correction.</p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Content publishing should be reliable, and embedded resources should remain accessible after publication.</p></td></tr></tbody></table></div>

### Use Case 7-Create Assessment and Configure Feedback

This use case enables an instructor to create a quiz or assignment and define grading settings.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Create Assessment and Configure Feedback</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Instructor</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The instructor is logged in with an active course and a valid lesson or assignment target.</p><p></p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The instructor creates a quiz or assignment. The instructor defines rules such as question type, deadline, total marks, and marking configuration.</li><li>The instructor selects or creates question bank items for quizzes.</li><li>The instructor configures automated feedback for objective questions.</li><li>The instructor publishes the assessment.</li><li>The system stores the assessment and makes it available according to course rules.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>The assessment is available for student completion and later analytics.</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If assessment settings are incomplete, the system blocks publishing until required fields are completed.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Assessment data should be stored accurately, and published settings should remain consistent across student attempts.</p></td></tr></tbody></table></div>

## Actor 3-Academic Advisor

### Use Case 8-View Advisor Alert Dashboard and Follow Up

This use case enables an academic advisor to identify at-risk students and perform follow-up

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>View Advisor Alert Dashboard and Follow Up</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Academic Advisor</p><p></p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The academic advisor is logged in and has assigned students.</p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The advisor opens the dashboard.</li><li>The system displays assigned students, risk levels, overdue work, and low-engagement indicators.</li><li>The advisor selects a student.</li><li>The system displays progress history, quiz performance, overdue assignments, and alert reasons.</li><li>The advisor reviews recommended intervention suggestions.</li><li>The advisor sends a follow-up advisory message.</li><li>The system records the follow-up status.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>The advisor has current information for intervention, and the follow-up action is recorded.</p><p></p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If no current alerts exist, the system still allows the advisor to review assigned student summaries.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Alert information should be timely, easy to interpret, and protected according to appropriate access control rules.</p></td></tr></tbody></table></div>

## Actor 4-Admin

### Use Case 9-Moderate Content and Manage Announcements

This use case enables an admin to manage oversight, moderation, and announcement activities.

<div class="joplin-table-wrapper"><table><tbody><tr><td colspan="2"><p><strong>Use Case Name</strong></p></td><td><p>Moderate Content and Manage Announcements</p></td></tr><tr><td colspan="2"><p>Actors</p></td><td><p>Admin</p></td></tr><tr><td colspan="2"><p>Preconditions</p></td><td><p>The admin is logged in.</p><p></p></td></tr><tr><td><p>Normal Flow</p></td><td><p>Description</p></td><td><ol><li>The admin reviews flagged or managed platform content.</li><li>The admin approves, updates, or removes content where necessary.</li><li>The admin creates or updates a system or course-related announcement template.</li><li>The system distributes announcements or stores them for notification delivery.</li><li>The system records the moderation or announcement action for oversight purposes.</li></ol><p></p></td></tr><tr><td><p></p></td><td><p>Postconditions</p></td><td><p>Moderation and announcement actions are stored and can affect user notifications or content availability.</p></td></tr><tr><td colspan="2"><p>Alternative flows and exceptions</p></td><td><p>If content does not require moderation changes, the admin closes the review without modification.</p><p></p></td></tr><tr><td colspan="2"><p>Non functional requirements</p></td><td><p>Administrative functions must be restricted to authorized users and should maintain a clear audit trail.</p></td></tr></tbody></table></div>

# System Models

## ERD Diagram

> TO DO: Insert exported ERD image here.

## Entities

| Entity / Attribute | Description |
| --- | --- |
| **Role** | Defines the access levels and permissions assigned to users in the system. |
| role_id (PK) | Unique identifier for each specific role. |
| role_name | The descriptive name of the role (Student, Instructor, Academic Advisor, Admin). |

| Entity / Attribute | Description |
| --- | --- |
| **User** | Stores login and identity information for all platform users. |
| user_id (PK) | Unique identifier for the user. |
| role_id (FK) | Unique identifier for the assigned role. |
| email | Contact and login email address. |
| password_hash | Secure hashed password used for authentication. |

| Entity / Attribute | Description |
| --- | --- |
| **StudentProfile** | Stores academic and learning preference details for student users. |
| student_profile_id (PK) | Unique identifier for the student's profile. |
| user_id (FK) | Links the profile to a specific record in the User table. |
| programme | The specific academic program the student is enrolled in. |
| department | The academic department the student belongs to. |

| Entity / Attribute | Description |
| --- | --- |
| **InstructorProfile** | Stores professional details specifically for users with teaching roles. |
| instructor_profile_id (PK) | Unique identifier for the instructor's profile. |
| user_id (FK) | Links the profile to a specific record in the User table. |
| specialization | The primary area of expertise or academic focus of the instructor. |

| Entity / Attribute | Description |
| --- | --- |
| **AdvisorProfile** | Stores professional details for academic advisors. |
| advisor_profile_id (PK) | Unique identifier for the advisor's profile. |
| user_id (FK) | Links the profile to a specific record in the User table. |
| department | The academic department the advisor belongs to. |

| Entity / Attribute | Description |
| --- | --- |
| **Course** | Represents an academic subject or unit of study offered on the platform. |
| course_id (PK) | Unique identifier for the course. |
| instructor_profile_id (FK) | Identifies which instructor is managing or teaching the course. |
| course_code | The alphanumeric identifier used for course registration. |

| Entity / Attribute | Description |
| --- | --- |
| **Module** | Represents a structural unit, section, or chapter within a course. |
| module_id (PK) | Unique identifier for the module. |
| course_id (FK) | Identifies the course this module belongs to. |
| sequence_no | The logical ordering of the module within the course. |

| Entity / Attribute | Description |
| --- | --- |
| **Lesson** | A specific instructional session or topic contained within a module. |
| lesson_id (PK) | Unique identifier for the lesson. |
| module_id (FK) | Identifies the module this lesson belongs to. |
| lesson_type | The format or style of the lesson (e.g. mixed, video, reading). |

| Entity / Attribute | Description |
| --- | --- |
| **Enrollment** | Maps students to their enrolled courses. |
| enrollment_id (PK) | Unique identifier for the enrollment record. |
| student_profile_id (FK) | Identifies the enrolled student. |
| course_id (FK) | Identifies the course. |

| Entity / Attribute | Description |
| --- | --- |
| **Quiz** | An assessment element tied to a lesson to evaluate student understanding. |
| quiz_id (PK) | Unique identifier for the quiz. |
| lesson_id (FK) | Identifies the lesson this quiz is associated with. |
| total_marks | The maximum score achievable on the quiz. |

| Entity / Attribute | Description |
| --- | --- |
| **Assignment** | A task or project assigned within a course for students to complete. |
| assignment_id (PK) | Unique identifier for the assignment. |
| course_id (FK) | Identifies the course this assignment belongs to. |
| deadline | The final date and time for submission. |

| Entity / Attribute | Description |
| --- | --- |
| **AssignmentSubmission** | Tracks the individual student submissions for course assignments. |
| submission_id (PK) | Unique identifier for the submission. |
| assignment_id (FK) | Identifies the assignment being submitted for. |
| student_profile_id (FK) | Identifies the student making the submission. |

| Entity / Attribute | Description |
| --- | --- |
| **QuestionBank** | Reusable collections of questions for quizzes. |
| question_bank_id (PK) | Unique identifier for the question bank. |
| course_id (FK) | The course this bank belongs to. |

| Entity / Attribute | Description |
| --- | --- |
| **Question** | Individual question items within a question bank. |
| question_id (PK) | Unique identifier for the question. |
| question_bank_id (FK) | Identifies the question bank. |
| question_type | The type of question (e.g., mcq, fill_in_blank). |

| Entity / Attribute | Description |
| --- | --- |
| **QuizQuestion** | Bridge table linking quizzes to specific questions. |
| quiz_question_id (PK) | Unique identifier. |
| quiz_id (FK) | Identifies the quiz. |
| question_id (FK) | Identifies the question. |

| Entity / Attribute | Description |
| --- | --- |
| **QuizAttempt** | Records a student's completion of a quiz and their resulting score. |
| attempt_id (PK) | Unique identifier for the quiz attempt. |
| quiz_id (FK) | Identifies the quiz that was attempted. |
| student_profile_id (FK) | Identifies the student who took the quiz. |

| Entity / Attribute | Description |
| --- | --- |
| **AttemptAnswer** | Individual answers submitted by a student during a quiz attempt. |
| attempt_answer_id (PK) | Unique identifier. |
| attempt_id (FK) | Identifies the attempt. |
| question_id (FK) | Identifies the question. |

| Entity / Attribute | Description |
| --- | --- |
| **ProgressRecord** | Tracks a student's completion status at the lesson level. |
| progress_record_id (PK) | Unique identifier. |
| student_profile_id (FK) | Identifies the student. |
| lesson_id (FK) | Identifies the lesson. |

| Entity / Attribute | Description |
| --- | --- |
| **ActivityLog** | A comprehensive audit trail of user actions within the platform. |
| activity_log_id (PK) | Unique identifier for the log entry. |
| user_id (FK) | Identifies the user performing the action. |
| activity_type | The category of action performed (e.g., login, view, update). |

| Entity / Attribute | Description |
| --- | --- |
| **Announcement** | Broadcast messages sent out to target user groups. |
| announcement_id (PK) | Unique identifier for the announcement. |
| user_id (FK) | Identifies the user who created the announcement. |
| scope | Defines the audience (e.g., site-wide, course-specific). |

| Entity / Attribute | Description |
| --- | --- |
| **Notification** | Direct alerts dispatched to individual users. |
| notification_id (PK) | Unique identifier for the notification. |
| user_id (FK) | Identifies the recipient user. |
| is_read | Boolean flag indicating if the user has viewed the notification. |

# Non-Functional Requirements

1.  Usability: The system should provide a clear and simple interface for students, instructors, academic advisors, and admins with role-appropriate navigation.
2.  Performance: Core actions such as login, loading course pages, opening lessons, and submitting quizzes should respond within an acceptable time under normal academic use.
3.  Reliability: Quiz attempts, assignment submissions, progress records, notifications, and activity logs must be stored consistently without data loss under expected usage.
4.  Security: Authentication, role-based access control, and email verification must be enforced to protect user accounts and administrative functions.
5.  Maintainability: The system should use a structured modular design so future enhancements such as deeper analytics or expanded gamification can be added without major redesign.
6.  Compatibility: The platform should be accessible through common modern web browsers and support embedded media and H5P content integration.
7.  Auditability: Administrative moderation, notification actions, and advisor follow-up events should be traceable for review and oversight.

# References

1.  Akçapınar, G., Altun, A., & Aşkar, P. (2019). Using learning analytics to develop early-warning system for at-risk students. International Journal of Educational Technology in Higher Education, 16, Article 40. https://doi.org/10.1186/s41239-019-0172-z
2.  Buenadicha-Mateos, M., Sánchez-Hernández, M. I., González-López, O. R., & Tato-Jiménez, J. L. (2025). From engagement to achievement: How gamification impacts academic success in higher education. Education Sciences, 15(8), Article 1054. https://doi.org/10.3390/educsci15081054
3.  Dennen, V. P., Arslan, Ö., & Bong, J. (2024). Optional embedded microlearning challenges: Promoting self-directed learning and extension in a higher education course. Educational Technology & Society, 27(1), 166–182. https://doi.org/10.30191/ETS.202401_27(1).SP04
4.  Foster, E., & Siddle, R. (2020). The effectiveness of learning analytics for identifying at-risk students in higher education. Assessment & Evaluation in Higher Education, 45(6), 842–854.
5.  H5P. (n.d.). H5P – Create and share rich HTML5 content and applications. https://h5p.org/
6.  Imran, H. (2019). Evaluation of awarding badges on student’s engagement in gamified e-learning systems. Smart Learning Environments, 6, Article 9. https://doi.org/10.1186/s40561-019-0093-2
7.  Lumi Education. (n.d.). Create H5P and host your content on Lumi. https://lumi.education/en/
8.  Morris, R., Perry, T., & Wardle, L. (2021). Formative assessment and feedback for learning in higher education: A systematic review. Review of Education, 9, e3292. https://doi.org/10.1002/rev3.3292
9.  Narciss, S., & Zumbach, J. (2022). Formative assessment and feedback strategies. In International handbook of psychology learning and teaching (pp. 1359–1386). Springer. https://doi.org/10.1007/978-3-030-28745-0_63
10. Salhab, R., & Aboushi, M. M. (2026). Impact of AI-assisted microlearning on student engagement in an online environment in higher education. Frontiers in Education, 11, Article 1766032. https://doi.org/10.3389/feduc.2026.1766032
11. Solis Trujillo, B. P., Velarde-Camaqui, D., Gonzales Nuñez, C. A., Castillo Silva, E. V., & Gonzalez Said de la Oliva, M. del P. (2025). The current landscape of formative assessment and feedback in graduate studies: A systematic literature review. Frontiers in Education, 10, Article 1509983. https://doi.org/10.3389/feduc.2025.1509983
12. Williams, A. (2024). Delivering effective student feedback in higher education: An evaluation of the challenges and best practice. International Journal of Research in Education and Science, 10(2), 473–501. https://doi.org/10.46328/ijres.3404