##### Software Design Specification for Quest Learn System (Version 3.0)
Page 1
System Documentation
for
```
Quest Learn (Smart Interactive
```
```
Learning System)
```
Version <3.0>
Tutorial Section: TT7L
Group No.: G5
SEE WING KIT 261UC240PJ
AZIEL TAN ZHENG CHUAN 261UC240LY
VINCENT LOCK CHUN KIT 261UC2406W
SOO KIAN RONG 261UC26145
```
Date: 29/06/2026
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 2
Table of Contents
Contents .............................................................................................................................................. 2
Revisions............................................................................................................................................. 4
1 Project Management ................................................................................................................. 5
1.1 Team Members .................................................................................................................. 5
1.2 Problem statement ............................................................................................................ 5
1.3 Project Plan ........................................................................................................................ 5
2 System Overview ....................................................................................................................... 6
2.1 Description .......................................................................................................................... 6
2.2 Actors................................................................................................................................... 6
2.3 Assumptions and Dependencies..................................................................................... 6
2.4 Use Case Diagram ............................................................................................................ 6
3 Requirements ............................................................................................................................. 7
3.1 Class Diagrams / ERD ...................................................................................................... 7
4 Design.......................................................................................................................................... 8
4.1 Data Dictionary................................................................................................................... 8
4.2 Software Architecture ........................................................................................................ 8
4.2.1 Subsystem 1 ............................................................................................................... 8
4.2.2 Subsystem 2 ............................................................................................................... 8
4.3 Main Screens...................................................................................................................... 8
4.4 Subsystem 1 Screens ....................................................................................................... 8
4.5 Subsystem 2 Screens ....................................................................................................... 8
4.6 Main Components ............................................................................................................. 9
4.6.1 Component 1 .............................................................................................................. 9
4.6.2 Component 2 .............................................................................................................. 9
4.6.3 Behavioral Modeling .................................................................................................. 9
4.6.3.1 Actor 1 State Transition Diagram ........................................................................ 9
4.6.3.2 Actor 2 State Transition Diagram ........................................................................ 9
4.6.3.3 Actor 3 State Transition Diagram ........................................................................ 9
4.6.3.4 Actor 4 State Transition Diagram ........................................................................ 9
4.7 Deployment Diagram ........................................................................................................ 9
5 Implementation......................................................................................................................... 10
5.1 Development Environment ............................................................................................. 10
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 3
5.2 Software Integration ........................................................................................................ 10
5.3 Database ........................................................................................................................... 10
6 Testing ....................................................................................................................................... 11
6.1 Testing Strategy ............................................................................................................... 11
6.2 Test Data ........................................................................................................................... 11
6.3 Acceptance Testing ......................................................................................................... 11
7 Sample Screens....................................................................................................................... 12
7.1 Main Screen...................................................................................................................... 12
7.1.1 Subsystem 1 Screens ................................................................................................. 12
7.1.2 Subsystem 1 Screens ................................................................................................. 12
8 Conclusion ................................................................................................................................ 13
9 User Guide ................................................................................................................................ 14
References........................................................................................................................................ 15
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 4
Revisions
```
Version Primary Author(s) Description of Version Date Completed
```
```
1.0 All members SRS — Part I (Project Planning / Requirements
```
```
Analysis)
```
01/05/2026
```
2.0 All members SDS — Part II (Design / Architecture / Interfaces
```
```
/ Database)
```
05/06/2026
```
3.0 All members System Documentation — Part III (Development
```
```
/ Testing / Monitoring)
```
29/06/2026
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 5
1 Project Management
1.1 Team Members
No Name Actor/Processes
1 See Wing Kit User Role: Student Actor & Core Integration
```
Student Subsystem (H5P content, progress, locking algorithm,
```
```
auto-grading, recommendations) & Backend integration
```
2 Aziel Tan Zheng Chuan User Role: Instructor Actor
```
Instructor Subsystem (course management, modules/lessons
```
```
builder, custom Lumi iframe quiz creator, grading)
```
3 Vincent Lock Chun Kit User Role: Academic Advisor Actor
```
Academic Advisor Subsystem (advisees list, advisor follow-
```
```
ups, follow-up history, linked instructor alerts)
```
4 Soo Kian Rong User Role: Admin Actor & System Oversight
```
Admin Subsystem (user registry CRUD - approve, suspend,
```
```
kick; course enrollments manager panel, announcements)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 6
1.2 Problem statement
Current university learning systems are often effective for storing notes, slides, videos, quizzes, and
announcements, but they are less effective at actively guiding students through the learning process.
Students may complete lessons or assessments without receiving enough immediate feedback about
weak topics, recommended next steps, or the seriousness of falling behind. As a result, learning
problems may only become visible after grades have already declined.
Existing platforms also separate content delivery, formative assessment, engagement tracking, and
advisor follow-up into disconnected workflows. Instructors can upload materials without seeing a
clear picture of student engagement, students can complete quizzes without targeted improvement
guidance, and academic advisors may only notice struggling learners after major assessment results
are released. These gaps reduce the usefulness of digital learning systems as early academic support
tools.
QuestLearn resolves this by combining short lesson-based learning, interactive lesson content,
automated quiz feedback, activity-based analytics, notifications, and advisor monitoring in one
coherent prototype.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 7
1.3 Project Plan
To ensure a structured and disciplined implementation during the Part III sprint, the team mapped
out a 4-week timeline. Figure 1.1 illustrates the specific tasks, task dependencies, and resource
allocation
Phase Planned Output Actual / Part III
Status
Evidence to Attach
Part I: Requirements
Analysis
Problem statement,
objectives, scope,
actors, use cases, ERD
draft, activity
diagrams
Completed as the SRS
baseline for
QuestLearn
Final Part I report, use
case diagram, activity
diagrams
Part II: System Design Data design,
architecture, interface
design, state diagrams,
sequence diagrams,
deployment design
Completed as the SDS
baseline for
implementation
Part II design report,
database schema,
architecture and
deployment diagrams
Part III: Development
and Testing
Prototype
implementation,
database setup, test
execution,
screenshots, user
guide, final system
documentation
```
In progress; this
```
document records the
required
implementation and
evidence structure
IDE/terminal
screenshots, Supabase
table/query
screenshots, test
outputs, browser
screenshots,
deployment preview
Figure 1.1 Gantt chart
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 8
2 System Overview
2.1 Description
QuestLearn is a Smart Interactive Learning System that enables instructors to construct courses,
```
embed videos, compile quiz questionnaires, publish grades, and monitor students; students to access
```
curriculum paths, view interactive H5P modules, submit attempts, track grades, and receive weak-
```
topic warnings; academic advisors to review risk flags, document follow-ups, and send intervention
```
```
logs to instructors; and admins to oversee platform users, modify roles, suspend or kick users, and
```
publish site announcements.
The major process groups and their relationships are summarised in the following table.
Actors Major Processes
Student Register account, log in, manage profile, start
lesson, attempt quiz, submit assignment, view
progress and grades, receive automated feedback
and recommendations, receive notifications
Instructor Register account, log in, manage instructor
profile, create and publish courses, modules,
lessons, create quizzes and assignments,
configure automated feedback, view
engagement and performance analytics
Academic Advisor Log in, view department students, review
progress summaries and quiz performance,
review overdue assignments, send advisory
follow-up
Admin Log in, manage users and roles, approve
instructor accounts, reset user passwords,
moderate learning content, manage
announcements, view platform analytics
2.2 Actors
Actor Use Case
Student • Login
• Engages with learning content
• completes assessments
• receives feedback
• tracks personal progress.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 9
Instructor • Creates and manages courses
• Modules
• lessons, quizzes
• assignments
• class analytics.
Academic Advisor • Monitors assigned or department
students
• reviews progress risks
• records follow-up actions
Admin • Manages platform users and roles
• approves instructor accounts
• moderates content
• publishes announcements
• reviews platform activity.
2.3 Assumptions and Dependencies
The following assumptions and dependencies guide the Part III prototype:
1. QuestLearn is implemented as a web application accessible through modern browsers such
as Chrome, Edge, Firefox, and Safari.
2. The prototype uses Next.js App Router for pages, layouts, route handlers, and server actions.
3. Supabase Auth manages account registration, login, session handling, and authenticated
identity.
4. Supabase PostgreSQL stores the 27-table QuestLearn schema defined in Part II.
5. Supabase Storage stores lesson assets and assignment submissions, protected by storage
policies.
6. Row Level Security must be enabled before browser-accessible tables are exposed through
Supabase client queries.
7. Video and interactive lesson content are referenced through external embed URLs, including
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 10
YouTube and H5P/Lumi resources.
8. Email delivery is optional for the prototype; in-app notification records are the minimum
required communication evidence.
9. Netlify is the planned hosting platform for preview or production deployment.
10. A full guided path engine, advanced gamification, predictive personalization, and built-in
H5P authoring are outside the MVP unless separately implemented and verified with
evidence.
11. Real screenshots, command outputs, and database query results must be captured during
implementation before the final submission.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 11
2.4 Use Case Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 12
2.4.1 Actor 1-Student
2.4.1.1 Use Case 1-Register Account and Verify Email
This use case enables a new student to create an account and log in to access the platform.
Use Case Name Register Account and Login
Actors Student, Instructor, Academic Advisor
Preconditions The user does not already have an active
account.
Normal Flow Description 1. The user opens the registration page.
2. The user enters required account
information including name, email,
student/staff ID, password, and
programme/department.
3. The system validates the submitted data.
4. The system creates the account and assigns
the appropriate role.
5. The user is redirected to the login page.
6. The user enters credentials and logs in.
7. The system opens the user dashboard.
Postconditions The user account is created and the user is
```
logged in with access to their dashboard. (Note:
```
Instructors may require admin approval before
```
full course creation features are unlocked).
```
Alternative flows and exceptions If the email is already registered, the system
shows an error and directs the user to log in. If
login credentials are invalid, the system allows
retry. After 3 failed login attempts, the account
is locked for 15 minutes. If a user forgets their
password, they contact the Admin who resets it
to a temporary default value. The user must
change their password upon next login.
Non functional requirements Account creation should be simple, secure, and
complete within a short response time. Login
events must be recorded reliably.
Sequence Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 13
```
Sequence Diagram 01(SD-01): User Register and Login
```
```
Sequence Diagram (SD-01): This sequence shows the registration and authentication flow. The user submits
```
account details, Supabase Auth validates the credentials, the matching QuestLearn profile is loaded, and an
authenticated session is established for role-based access.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 14
Alternate Flow-Deduplicate Email
2.4.1.2 Use case 2-Start Lesson
This use case enables a student to access a course lesson and begin guided learning activities.
Use Case Name Start Lesson
Actors Student
Preconditions The student is logged in and enrolled in the
selected course.
Normal Flow Description 1. The student opens a course.
2. The student selects a module.
3. The student selects a lesson.
4. The system displays lesson content,
including reading material, embedded
video, and H5P activity where
available.
5. The system records page visits, video
interactions, and lesson access in the
activity log.
6. The system updates lesson progress
status.
Postconditions Lesson access and progress updates are stored
for analytics and progress tracking
Alternative flows and exceptions If the lesson is unpublished or unavailable, the
system informs the student that access is not
currently available.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 15
Non functional requirements Lesson content should load clearly and
consistently. Activity tracking should
be accurate and should not noticeably interrupt
the user experience.
2.4.1.3 Use case 3-Attempt Quiz and Receive Automated Feedback
This use case enables a student to attempt a quiz and receive immediate automated feedback.
Use Case Name Attempt Quiz and Receive Automated Feedback
Actors Student
Preconditions The student is logged in and the selected quiz is
available.
Normal Flow Description 1. The student starts the quiz.
2. The system displays quiz questions,
including randomized items if
configured.
3. The student submits answers.
4. The system auto-grades objective
question types.
5. The system stores the attempt score,
answer details, and activity record.
6. The system displays automated
feedback, identifies weak topics, and
shows recommended next steps.
Postconditions The quiz attempt result is saved for performance
analysis, recommendation generation, and
dashboard reporting.
Alternative flows and exceptions If subjective questions exist, the system stores
those answers for later review while objective
items are graded automatically. If the
submission is incomplete, the system warns the
student before final submission.
Non functional requirements Feedback should be generated quickly, quiz
records should be reliable, and grading
for objective items should be consistent.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 16
Sequence Diagram
```
Sequence Diragram 02 (SD-02): Student Attempt Quiz and Auto-Grading and Feedback
```
```
Sequence Diagram (SD-02): This sequence shows the quiz attempt flow including question display,
```
answer submission, auto-grading, weak-topic detection, feedback generation, and notification
delivery.
2.4.1.4 Use case 4-Submit Assignment
This use case enables a student to submit assignment work before a deadline.
Use Case Name Submit Assignment
Actors Student
Preconditions The student is logged in, enrolled in the course,
and the assignment is open for submission
unless late submission is allowed.
Normal Flow Description 1. The student opens the assignment details
page.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 17
2. The system displays assignment
instructions, deadline, and submission
rules.
3. The student uploads or submits the
required work.
4. The system validates the submission.
5. The system records the submission time
and status.
6. The system confirms successful
assignment submission.
Postconditions The assignment submission is stored for
instructor review and student history.
Alternative flows and exceptions If the file format or submission data is invalid,
the system rejects the submission and requests
correction. If the deadline has passed, the system
either blocks the submission or marks it as late
according to system rules.
Non functional requirements Submission handling should be dependable, and
confirmation feedback should be clear to the
student.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 18
2.4.2 Actor 2-Instructor
2.4.2.1 Use case 5-Create Course and Learning Structure
This use case enables an instructor to create a course with modules and lessons.
Use Case Name Create Course and Learning Structure
Actors Instructor
Preconditions The instructor account is active upon approved
and logged in to the account.
Normal Flow Description 1. The instructor opens the create course
page.
2. The instructor enters course details such
as title, code, department, and
description.
3. The system creates the course record.
4. The instructor adds modules to the
course.
5. The instructor adds lessons to each
module.
6. The system stores the learning structure
for later content publishing and student
access.
Postconditions The course structure is available for content,
quiz, and assignment setup.
Alternative flows and exceptions If required course details are missing, the system
requests correction before saving.
Non functional requirements Course setup should be easy to follow and
should preserve data correctly across editing
sessions.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 19
Sequence Diagram
```
Sequence Diagram 03 (SD-03): Instructor Creates Course Content
```
```
Sequence Diagram (SD-03): This sequence shows the instructor flow for creating a course
```
```
structure (course → module → lesson) and publishing content with student notification.
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 20
2.4.2.2 Use Case 6-Publish Lesson Content and Interactive Material
This use case enables an instructor to upload or embed lesson content and publish it to students.
Use Case Name Publish Lesson Content and Interactive Material
Actors Instructor
Preconditions The instructor is logged in with a course,
module, and lesson already exist.
Normal Flow Description 1. The instructor selects a lesson.
2. The instructor uploads or links reading
material, video content, and H5P content
authored through Lumi.
3. The instructor saves lesson content.
4. The instructor publishes the lesson.
5. The system makes the lesson available to
enrolled students.
6. The system records content publication
for notification and analytics purposes.
Postconditions Students can access the published lesson, and the
system can notify affected users.
Alternative flows and exceptions If uploaded or embedded content is invalid, the
system rejects the content and requests
correction.
Non functional requirements Content publishing should be reliable, and
embedded resources should remain accessible
after publication.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 21
2.4.2.3 Use Case 7-Create Assessment and Configure Feedback
This use case enables an instructor to create a quiz or assignment and define grading settings.
Use Case Name Create Assessment and Configure Feedback
Actors Instructor
Preconditions The instructor is logged in with an active course
and a valid lesson or assignment target.
Normal Flow Description 1. The instructor creates a quiz or
assignment. The instructor defines rules
such as question type, deadline, total
marks, and marking configuration.
2. The instructor selects or creates question
bank items for quizzes.
3. The instructor configures automated
feedback for objective questions.
4. The instructor publishes the assessment.
5. The system stores the assessment and
makes it available according to course
rules.
Postconditions The assessment is available for student
completion and later analytics.
Alternative flows and exceptions If assessment settings are incomplete, the system
blocks publishing until required fields are
completed.
Non functional requirements Assessment data should be stored accurately,
and published settings should remain consistent
across student attempts.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 22
2.4.3 Actor 3-Academic Advisor
2.4.3.1 Use Case 8-View Advisor Alert Dashboard and Follow Up
This use case enables an academic advisor to identify at-risk students and perform follow-up
Use Case Name View Advisor Alert Dashboard and Follow Up
Actors Academic Advisor
Preconditions The academic advisor is logged in and has
assigned students.
Normal Flow Description 1. The advisor opens the dashboard.
2. The system displays assigned students,
risk levels, overdue work, and low-
engagement indicators.
3. The advisor selects a student.
4. The system displays progress history,
quiz performance, overdue assignments,
and alert reasons.
5. The advisor reviews recommended
intervention suggestions.
6. The advisor sends a follow-up advisory
message.
7. The system records the follow-up status.
Postconditions The advisor has current information for
intervention, and the follow-up action is
recorded.
Alternative flows and exceptions If no current alerts exist, the system still allows
the advisor to review assigned student
summaries.
Non functional requirements Alert information should be timely, easy to
interpret, and protected according to appropriate
access control rules.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 23
Sequence Diagram
```
Sequence Diagram 04 (SD-04): Advisor Reviews Student Progress and Follows Up
```
```
Sequence Diagram (SD-04): This sequence shows the advisor monitoring flow including
```
department student listing, progress summary review, and follow-up message delivery.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 24
2.4.4 Actor 4-Admin
2.4.4.1 Use Case 9-Moderate Content and Manage Announcements
This use case enables an admin to manage oversight, moderation, and announcement activities.
Use Case Name Moderate Content and Manage Announcements
Actors Admin
Preconditions The admin is logged in.
Normal Flow Description 1. The admin reviews flagged or managed
platform content.
2. The admin approves, updates, or
removes content where necessary.
3. The admin creates or updates a system or
course-related announcement template.
4. The system distributes announcements or
stores them for notification delivery.
5. The system records the moderation or
announcement action for oversight
purposes.
Postconditions Moderation and announcement actions are stored
and can affect user notifications or content
availability.
Alternative flows and exceptions If content does not require moderation changes,
the admin closes the review without
modification.
Non functional requirements Administrative functions must be restricted to
authorized users and should maintain a clear
audit trail.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 25
Sequence Diagram
```
Sequence Diagram 05 (SD-05): Admin Moderates Content and Manages Announcement
```
```
Sequence Diagram (SD-05): This sequence shows the admin workflow for user account approval,
```
content moderation, and announcement creation with notification broadcasting.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 26
3 Requirements
3.1 Class Diagrams / ERD
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 27
4 Design
4.1 Data Dictionary
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 28
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 29
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 30
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 31
4.2 Software Architecture
QuestLearn uses a four-layer cloud-backed architecture based on Next.js, Supabase, and Netlify.
Layer Implementation Responsibility
Presentation Layer Next.js pages, layouts, and React components for role-based dashboards
and workflows
Application Layer Next.js Route Handlers and Server Actions for validation, business rules,
and controlled database operations
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 32
Data and Security
Layer
Supabase Auth, Supabase PostgreSQL, Row Level Security, and
Supabase Storage
External Integration
Layer
H5P/Lumi embeds, YouTube embeds, notification triggers, GitHub, and
Netlify deployment
Subsystem Team members
Backend and Supabase See Wing Kit
Frontend and Role Interfaces Aziel Tan Zheng Chuan
Learning Content and Analytics Vincent Lock Chun Kit
Documentation, Testing, and Final Assembly Soo Kian Rong
4.2.1 Subsystem 1 — Authentication and User Management
This subsystem handles registration, login, and secure sessions through Supabase Auth. It is
```
responsible for profile management across all user roles (students, instructors, advisors, admins) and
```
```
enforces role-based access control through profile tables and Row Level Security (RLS) policies.
```
Key Operations: Managing registration forms, toggling account statuses, and updating profile
attributes.
Entities Managed: user, role, student_profile, instructor_profile, advisor_profile.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 33
4.2.2 Subsystem 2 — Course and Content Management
This subsystem orchestrates the creation and lifecycle of educational materials. It handles course
```
generation, module sequencing, lesson management, and content publishing workflows (including
```
```
interactive H5P/Lumi items). Additionally, it supports assessment configurations such as quizzes,
```
assignments, and question bank management.
• Key Operations: Attaching content items to lessons, enrolling students, creating
quizzes/assignments, and publishing assessments.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 34
• Entities Managed: course, module, lesson, content_item, enrollment, quiz,
assignment, question_bank, question, quiz_question.
4.2.3 Subsystem 3 — Grading, Progress, and Analytics
This subsystem tracks student performance and engagement. It processes quiz attempts for auto-
grading, calculates scores, generates weak-topic feedback to recommend next steps, and tracks
overall lesson progression. It also aggregates activity logs to prepare engagement and performance
data for various dashboards.
• Key Operations: Submitting quiz attempts, generating performance feedback, updating
lesson progress, and fetching engagement metrics.
• Entities
```
Managed: quiz_attempt, attempt_answer, assignment_submission, progress_record, activity
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 35
_log.
4.2.4 Subsystem 4 — Notifications, Advisor Support, and Admin
This subsystem coordinates communication, student support workflows, and platform
```
administration. It handles the creation and delivery of notifications (e.g., deadlines, announcements)
```
and drives the Advisor Early Alert System by aggregating risk data. It also provides administrative
tools for content moderation, announcement broadcasting, and system-wide audit logging.
• Key Operations: Broadcasting announcements, generating advisor alerts, recording advisor
follow-ups, and logging administrative moderation actions.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 36
• Entities Managed: advisor_student_assignment, advisor_alert, advisor_follow_up,
announcement, notification, moderation_action, audit_log.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 37
4.3 Main Screens
Dashboard Portal
Standard layout with routing based on the logged-in user's role.
Profile Settings Screen
Allows updating contact information and learning preferences.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 38
4.4 Subsystem 1 Screens
Student Dashboard
Displays active courses and overall progress.
student dashboard
Course details
Shows modules, completed checkmarks, and locked items.
Course details
Instructor Curriculum Builder
Contains lesson forms, video input tools, and H5P iframe embed inputs.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 39
Instructor Curriculum Builder
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 40
4.5 Subsystem 2 Screens
Advisor Student Monitoring Portal
Department list showing advisor follow-up controls and linked instructor selectors.
Advisor Student Monitoring Portal
Admin User Registry Control
Displays tables with approval, suspend, and delete actions.
Admin User Registry Control
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 41
4.6 Main Components
Component Related Subsystems
Quiz Auto-Grading & Alert Trigger Subsystem 1, Subsystem 2
Rule-Based Module Locking Logic Subsystem 1
4.6.1 Component 1
```
FUNCTION submitQuiz(studentId, quizId, answers)
```
```
score = calculatePoints(quizId, answers)
```
```
INSERT INTO quiz_attempt (studentId, quizId, score)
```
IF score < 50% THEN
```
INSERT INTO advisor_alert (studentId, 'low_quiz_score')
```
```
TRIGGER email_notification(studentId, advisorId)
```
END IF
RETURN score
END FUNCTION
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 42
4.6.2 Component 2
```
FUNCTION getCourseModules(studentId, courseId)
```
```
modules = FETCH modules FOR courseId
```
```
lockedLessonIds = []
```
FOR EACH module IN modules
FOR EACH lesson IN module
IF previous_lesson.score < 50% THEN
```
lockedLessonIds.add(lesson.id)
```
END IF
END FOR
END FOR
```
RETURN (modules, lockedLessonIds)
```
END FUNCTION
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 43
4.6.3 Behavioral Modeling
4.6.3.1 Actor 1 State Transition Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 44
4.6.3.2 Actor 2 State Transition Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 45
4.6.3.3 Actor 3 State Transition Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 46
4.6.3.4 Actor 4 State Transition Diagram
4.7 Deployment Diagram
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 47
5 Implementation
5. TECHNICAL IMPLEMENTATION & INTEGRATION
5.1 Development Environment
The system was developed using VS Code on Windows, leveraging the Next.js 15 App Router architecture
with Turbopack for local compilation.
Component Technology / Version
```
Framework Next.js 15 (App Router, React 19)
```
Language TypeScript
Database Supabase PostgreSQL 17.6
Styling Tailwind CSS v4
5.2 Software Integration
```
Our strategy to integrate Subsystem 1 (Presentation & Client Logic) and Subsystem 2 (Data Persistence &
```
```
Security Engines) is to rely on Next.js Server Components fetching from the shared Supabase PostgreSQL
```
```
instance under strict Row Level Security (RLS) enforcement.
```
To bridge the subsystems, role-based route protection acts as the Integration Gateway. When a user logs in,
the authentication handler queries Supabase Auth, and the Next.js routing middleware intercepts the
navigation path, joins the session to the local PostgreSQL "user" and role records, and redirects the user to
```
the correct role dashboard directory (/student, /instructor, /advisor, /admin).
```
5.2.1 Integration Gateway Source Code
• Filepath: src/middleware.ts
• Description: Below is the complete implementation of the middleware gateway. It extracts the
session from Supabase, performs lightweight role lookups, manages pending instructor approvals,
and isolates routes to prevent unauthorized cross-role access.
```
import { type NextRequest, NextResponse } from "next/server";
```
```
import { updateSession } from "@/lib/supabase/middleware";
```
```
import {
```
PUBLIC_ROUTES,
PROTECTED_PREFIXES,
ROLE_DASHBOARD_PATH,
ROLE_MAP,
type RoleId,
```
} from "@/lib/constants";
```
```
export async function middleware(request: NextRequest) {
```
```
const { pathname } = request.nextUrl;
```
// Skip Next.js internals and static files
```
if (
```
```
pathname.startsWith("/_next") ||
```
```
pathname.startsWith("/api/auth") ||
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 48
```
pathname.includes(".")
```
```
) {
```
```
return NextResponse.next();
```
```
}
```
// Refresh the Supabase session
```
const { supabase, user, supabaseResponse } = await updateSession(request);
```
// ── Public routes ────────────────────────────────────
```
const isPublicRoute = PUBLIC_ROUTES.some(
```
```
(route) => pathname === route || pathname.startsWith(route + "/")
```
```
);
```
```
if (isPublicRoute) {
```
// If already logged in and visiting login/register, redirect to dashboard
```
if (user && (pathname === "/login" || pathname === "/register")) {
```
```
const roleData = await getUserRole(supabase, user.id);
```
```
if (roleData) {
```
```
const dashboardUrl = ROLE_DASHBOARD_PATH[roleData.role];
```
```
return NextResponse.redirect(new URL(dashboardUrl, request.url));
```
```
}
```
```
}
```
```
return supabaseResponse;
```
```
}
```
// ── Protected routes — require auth ──────────────────
```
if (!user) {
```
```
const loginUrl = new URL("/login", request.url);
```
```
loginUrl.searchParams.set("redirectTo", pathname);
```
```
return NextResponse.redirect(loginUrl);
```
```
}
```
// ── Role-based access control ────────────────────────
```
const roleData = await getUserRole(supabase, user.id);
```
```
if (!roleData) {
```
// User exists in auth but not in our user table — send to login
```
await supabase.auth.signOut();
```
```
return NextResponse.redirect(new URL("/login", request.url));
```
```
}
```
// Instructors with pending status go to /pending
```
if (roleData.accountStatus === "pending") {
```
```
if (pathname !== "/pending") {
```
```
return NextResponse.redirect(new URL("/pending", request.url));
```
```
}
```
```
return supabaseResponse;
```
```
}
```
// Check if user is accessing a protected role prefix
```
const accessedPrefix = PROTECTED_PREFIXES.find(
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 49
```
(prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
```
```
);
```
```
if (accessedPrefix) {
```
```
const expectedPrefix = ROLE_DASHBOARD_PATH[roleData.role];
```
```
if (accessedPrefix !== expectedPrefix) {
```
// Wrong role — redirect to their own dashboard
```
return NextResponse.redirect(new URL(expectedPrefix, request.url));
```
```
}
```
```
}
```
// Root path — redirect to role dashboard
```
if (pathname === "/") {
```
```
return NextResponse.redirect(
```
```
new URL(ROLE_DASHBOARD_PATH[roleData.role], request.url)
```
```
);
```
```
}
```
```
return supabaseResponse;
```
```
}
```
```
async function getUserRole(
```
```
supabase: Awaited<ReturnType<typeof updateSession>>["supabase"],
```
```
authUserId: string
```
```
): Promise<{ role: RoleId; accountStatus: string } | null> {
```
```
const { data } = await supabase
```
```
.from("user")
```
```
.select(
```
`
account_status,
```
role:role_id (
```
role_name
```
)
```
`
```
)
```
```
.eq("auth_user_id", authUserId)
```
```
.single();
```
```
if (!data) return null;
```
```
const role = data.role as unknown as { role_name: string };
```
```
const roleId = ROLE_MAP[role.role_name as keyof typeof ROLE_MAP];
```
```
return {
```
```
role: roleId,
```
```
accountStatus: data.account_status,
```
```
};
```
```
}
```
```
export const config = {
```
```
matcher: [
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 50
```
"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
```
],
```
};
```
5.2.2 Authenticated Session Controller Snippet
```
• Filepath: src/app/(auth)/login/page.tsx
```
• Description: This client component handles user interactions and sends credentials
directly to the authentication provider. On success, it triggers page routing redirection.
// Submits client credentials to Supabase Auth provider
```
const supabase = createClient();
```
```
const { error: authError } = await supabase.auth.signInWithPassword({
```
email,
password,
```
});
```
```
if (authError) {
```
```
setError(authError.message);
```
```
setLoading(false);
```
```
return;
```
```
}
```
// Redirects to root path where Next.js middleware completes role-based routing
```
router.push("/");
```
```
router.refresh();
```
5.2.3 Subsystem Integration Implementation Source Code
Below is the complete implementation source code for each of the primary integration components executing
the data bridge between the user interfaces and database queries.
5.2.3.1 Student Course Outline Loader
```
• Filepath: src/app/(student)/student/courses/page.tsx
```
• Description: This page fetches the authenticated student's profile, retrieves all active and past course
enrollments, aggregates progress record percentages, and maps them to client UI components.
```
import { getCurrentUser } from "@/lib/auth/helpers";
```
```
import { createClient } from "@/lib/supabase/server";
```
```
import { CourseCard } from "@/components/student/CourseCard";
```
```
import { EmptyState } from "@/components/ui/EmptyState";
```
```
import { BookOpen } from "lucide-react";
```
```
import type { EnrolledCourse } from "@/types/database";
```
```
export default async function StudentCoursesPage() {
```
```
const user = await getCurrentUser();
```
```
if (!user) return null;
```
```
const supabase = await createClient();
```
// Fetch student profile
```
const { data: profile } = await supabase
```
```
.from("student_profile")
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 51
```
.select("student_profile_id")
```
```
.eq("user_id", user.userId)
```
```
.single();
```
```
if (!profile) return null;
```
// Fetch all enrollments
```
const { data: enrollments } = await supabase
```
```
.from("enrollment")
```
```
.select(
```
`
*,
```
course:course_id (
```
*,
```
instructor_profile:instructor_profile_id (
```
*,
```
user:user_id ( full_name )
```
```
)
```
```
)
```
`
```
)
```
```
.eq("student_profile_id", profile.student_profile_id)
```
```
.returns<EnrolledCourse[]>();
```
// Fetch progress
```
const { data: progressRecords } = await supabase
```
```
.from("progress_record")
```
```
.select(
```
`
percentage,
```
lesson:lesson_id (
```
```
module:module_id ( course_id )
```
```
)
```
`
```
)
```
```
.eq("student_profile_id", profile.student_profile_id);
```
```
const courseProgressMap = new Map<number, { total: number; count: number }>();
```
```
if (progressRecords) {
```
```
progressRecords.forEach((record: any) => {
```
```
const courseId = record.lesson?.module?.course_id;
```
```
if (courseId) {
```
```
const current = courseProgressMap.get(courseId) || { total: 0, count: 0 };
```
```
courseProgressMap.set(courseId, {
```
```
total: current.total + record.percentage,
```
```
count: current.count + 1,
```
```
});
```
```
}
```
```
});
```
```
}
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 52
```
const allCourses = enrollments || [];
```
```
const activeCourses = allCourses.filter((c) => c.status === "active");
```
```
const pastCourses = allCourses.filter((c) => c.status !== "active");
```
```
return (
```
<div className="space-y-10 animate-in fade-in duration-500">
<header>
<h1 className="text-2xl font-bold text-text mb-2">My Courses</h1>
<p className="text-text-muted">
View all your current and past enrolled courses.
</p>
</header>
<section>
<h2 className="text-lg font-bold text-text mb-4">Active Courses</h2>
```
{activeCourses.length === 0 ? (
```
<EmptyState
```
title="No Active Courses"
```
```
description="You are not currently taking any courses."
```
/>
```
) : (
```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
{activeCourses.map((enrollment) => {
```
```
const cp = courseProgressMap.get(enrollment.course_id);
```
const progressPercentage =
```
cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
```
```
return (
```
<CourseCard
```
key={enrollment.enrollment_id}
```
```
enrollment={enrollment}
```
```
progressPercentage={progressPercentage}
```
/>
```
);
```
```
})}
```
</div>
```
)}
```
</section>
```
{pastCourses.length > 0 && (
```
<section>
<h2 className="text-lg font-bold text-text mb-4">Past Courses</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale-
[20%]">
```
{pastCourses.map((enrollment) => {
```
```
const cp = courseProgressMap.get(enrollment.course_id);
```
const progressPercentage =
```
cp && cp.count > 0 ? Math.round(cp.total / cp.count) : 0;
```
```
return (
```
<CourseCard
```
key={enrollment.enrollment_id}
```
```
enrollment={enrollment}
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 53
```
progressPercentage={progressPercentage}
```
/>
```
);
```
```
})}
```
</div>
</section>
```
)}
```
</div>
```
);
```
```
}
```
5.2.3.2 Instructor Course Registry
```
• Filepath: src/app/(instructor)/instructor/courses/page.tsx
```
• Description: This page resolves the instructor's staff profile and renders all created courses, joining
enrollment counts directly from aggregated database tables.
```
import { getCurrentUser } from "@/lib/auth/helpers";
```
```
import { createClient } from "@/lib/supabase/server";
```
```
import { EmptyState } from "@/components/ui/EmptyState";
```
```
import { StatusBadge } from "@/components/ui/StatusBadge";
```
```
import { Plus, BookOpen, Users, MoreVertical } from "lucide-react";
```
```
import Link from "next/link";
```
```
export default async function InstructorCoursesPage() {
```
```
const user = await getCurrentUser();
```
```
if (!user) return null;
```
```
const supabase = await createClient();
```
```
const { data: profile } = await supabase
```
```
.from("instructor_profile")
```
```
.select("instructor_profile_id")
```
```
.eq("user_id", user.userId)
```
```
.single();
```
```
if (!profile) return null;
```
// Fetch all owned courses
```
const { data: courses } = await supabase
```
```
.from("course")
```
```
.select("*, enrollment(count)")
```
```
.eq("instructor_profile_id", profile.instructor_profile_id)
```
```
.order("created_at", { ascending: false });
```
```
const courseList = courses || [];
```
```
return (
```
<div className="animate-in fade-in duration-500">
<header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<div>
<h1 className="text-2xl font-bold text-text mb-2">Course Management</h1>
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 54
<p className="text-text-muted">
Create and manage your courses, modules, and lessons.
</p>
</div>
<Link
```
href="/instructor/courses/new"
```
```
className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary
```
text-white font-medium text-sm hover:bg-primary-light transition-colors"
>
<Plus className="w-4 h-4" /> Create Course
</Link>
</header>
```
{courseList.length === 0 ? (
```
<EmptyState
```
title="No courses found"
```
```
description="You haven't created any courses yet. Click 'Create Course' to get started."
```
```
icon={<BookOpen className="w-8 h-8 text-primary" />}
```
/>
```
) : (
```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
{courseList.map((course: any) => (
```
<div
```
key={course.course_id}
```
```
className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm
```
group hover:border-primary/50 transition-colors flex flex-col"
>
<div className="p-5 border-b border-border flex-1">
<div className="flex items-start justify-between mb-3">
<span className="text-xs font-bold text-accent bg-bg-dark px-2 py-1 rounded-md
tracking-wide">
```
{course.course_code}
```
</span>
```
<StatusBadge status={course.status} />
```
</div>
<h3 className="font-bold text-lg text-text mb-2 line-clamp-1">
```
{course.course_title}
```
</h3>
<p className="text-sm text-text-muted line-clamp-2 min-h-[2.5rem]">
```
{course.description || "No description provided."}
```
</p>
</div>
<div className="p-4 bg-bg-page/50 flex items-center justify-between">
<div className="flex items-center gap-1.5 text-sm text-text-muted font-medium">
<Users className="w-4 h-4" />
```
{/* @ts-ignore */}
```
```
{course.enrollment[0]?.count || 0} Students
```
</div>
<Link
```
href={`/instructor/courses/${course.course_id}`}
```
```
className="text-sm text-primary font-medium hover:underline px-2 py-1"
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 55
>
Edit Course →
</Link>
</div>
</div>
```
))}
```
</div>
```
)}
```
</div>
```
);
```
```
}
```
5.2.3.3 Advisor Advisees Portal
```
• Filepath: src/app/(advisor)/advisor/students/page.tsx
```
• Description: This page retrieves department advisees assigned to the advisor and lists all
registered instructors to enable alerts routing and follow-up logging.
```
import { getCurrentUser } from "@/lib/auth/helpers";
```
```
import { createClient } from "@/lib/supabase/server";
```
```
import { AdvisorStudentsClient } from "./AdvisorStudentsClient";
```
```
export default async function AdvisorStudentsPage() {
```
```
const user = await getCurrentUser();
```
```
if (!user) return null;
```
```
const supabase = await createClient();
```
```
const { data: advisorProfile } = await supabase
```
```
.from("advisor_profile")
```
```
.select("advisor_profile_id")
```
```
.eq("user_id", user.userId)
```
```
.single();
```
```
if (!advisorProfile) {
```
```
return (
```
<div className="p-8 text-center bg-surface border border-border rounded-xl">
<p className="text-danger font-medium">Advisor profile not found.</p>
</div>
```
);
```
```
}
```
// Fetch assigned students
```
const { data: students } = await supabase
```
```
.from("advisor_student_assignment")
```
```
.select(`
```
*,
```
student_profile:student_profile_id (
```
student_profile_id,
student_no,
academic_level,
programme,
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 56
```
user:user_id (
```
full_name,
email
```
)
```
```
)
```
```
`)
```
```
.eq("advisor_profile_id", advisorProfile.advisor_profile_id);
```
// Fetch all instructors
```
const { data: instructors } = await supabase
```
```
.from("instructor_profile")
```
```
.select(`
```
instructor_profile_id,
staff_no,
```
user:user_id (
```
full_name,
email
```
)
```
```
`);
```
```
return (
```
<div className="space-y-8 animate-in fade-in duration-500">
<header>
<h1 className="text-2xl font-bold text-text mb-2">My Advisees</h1>
<p className="text-text-muted">Overview of all students assigned to your department.</p>
</header>
<AdvisorStudentsClient
```
students={students || []}
```
```
advisorProfileId={advisorProfile.advisor_profile_id}
```
```
instructors={instructors || []}
```
/>
</div>
```
);
```
```
}
```
5.2.3.4 Admin User Management Console
```
• Filepath: src/app/(admin)/admin/users/page.tsx
```
• Description: This page retrieves all system accounts sorted alphabetically by name to allow the
administrator to approve registrations or toggle active/suspended statuses.
```
import { getCurrentUser } from "@/lib/auth/helpers";
```
```
import { createClient } from "@/lib/supabase/server";
```
```
import { AdminUsersClient } from "./AdminUsersClient";
```
```
export default async function AdminUsersPage() {
```
```
const user = await getCurrentUser();
```
```
if (!user) return null;
```
```
const supabase = await createClient();
```
```
const { data: users } = await supabase
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 57
```
.from("user")
```
```
.select(`
```
user_id,
full_name,
email,
account_status,
```
role:role_id (
```
role_name
```
)
```
```
`)
```
```
.order("full_name", { ascending: true });
```
```
return (
```
```
<AdminUsersClient users={users || []} />
```
```
);
```
```
}
```
5.2.4 Subsystem Integration Files Summary
File Name Target Path Subsystem Integration
Purpose
```
login/page.tsx src/app/(auth)/login/page.tsx Authenticates user credentials
```
via Supabase Auth and routes to
respective Subsystems based on
role.
```
courses/page.tsx src/app/(student)/student/courses/page.tsx Implements course outline
```
rendering and locking checks,
pulling data created by
Subsystem 1.
```
courses/page.tsx src/app/(instructor)/instructor/courses/page.tsx Provides course builder forms
```
and content editors, saving
directly to the shared Supabase
instance.
```
students/page.tsx src/app/(advisor)/advisor/students/page.tsx Processes student status reviews
```
and logs advisor follow-ups,
reacting to Subsystem 1's
assessment triggers.
```
users/page.tsx src/app/(admin)/admin/users/page.tsx Handles user approvals,
```
suspensions, and deletes
affecting all Subsystem user
pools.
5.3 Database
The database is implemented using Supabase PostgreSQL, a cloud-hosted relational database, following our
entity relationship model in Section 3. To ensure strict data integrity and type safety across our server
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 58
components and client pages, each database table is represented as a TypeScript Interface in our frontend
application.
Data transactions are managed securely using the @supabase/supabase-js client library, joined via foreign
```
key relations and protected at the database engine level by Row Level Security (RLS) policies.
```
```
5.3.1 SQL Database DDL (PostgreSQL)
```
Below is the SQL table definition for the central user table, illustrating the constraints, data types, and
primary/foreign key connections defined in Database-Schema.sql:
-- Stores the shared login and identity details for all platform users.
```
CREATE TABLE "user" (
```
user_id SERIAL PRIMARY KEY,
auth_user_id UUID UNIQUE,
```
role_id INT NOT NULL REFERENCES role(role_id),
```
```
full_name VARCHAR(150) NOT NULL,
```
```
email VARCHAR(255) NOT NULL UNIQUE,
```
```
account_status VARCHAR(20) NOT NULL DEFAULT 'pending'
```
```
CHECK (account_status IN ('pending', 'active', 'suspended', 'deactivated')),
```
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
```
);
```
5.3.2 TypeScript Interface Mapping
Below is the matching TypeScript model from database.ts that mirrors this database table structure to enable
type checks during build time:
// Maps to the custom "user" table in Supabase PostgreSQL
```
export type User = {
```
```
user_id: number;
```
```
auth_user_id: string; // UUID from Supabase Auth
```
```
role_id: number;
```
```
full_name: string;
```
```
email: string;
```
```
account_status: "pending" | "active" | "suspended" | "deactivated";
```
```
created_at: string;
```
```
};
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 59
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 60
6 Testing
6.1 Testing Strategy
To validate the prototype, the local database was seeded with a minimum testing dataset. All test accounts
utilize the default password 123456.
6.2 Test Data Report
6.2.1 Student Subsystem
6.2.1.1 Login
This test data is used to verify that the student can log into the system by entering the required credentials.
Use Case Parameter Test Data Value
Login User Email student@example.com
Password 123456
6.2.1.2 Start Lesson
This test data is used to verify that the student can select an enrolled course and begin learning activities.
Step Platform Screen /
Phase
Seeded Test Data details
Step
1
Course Selection
Page
```
• Enrolled Course: QL-SEF101 (Software Engineering
```
```
Fundamentals)
```
• Active Enrollment ID: 1
Step
2
```
Module Selection • Module: Requirements and Use Cases (Sequence 1)
```
Step
3
```
Lesson Selection • Selected Lesson: Writing Effective Use Cases (Sequence 1)
```
• Content Type: Reading & Video Embed
• Video URL: https://www.youtube.com/embed/dQw4w9WgXcQ
6.2.1.3 Attempt Quiz and Receive Automated Feedback
This test data is used to verify that a student's quiz attempt is auto-graded and provides weakness
recommendations on failure.
Step Phase / Event Test Data & Expected System Behavior
Step
1
```
Quiz Attempt Page • Selected Quiz: Quiz 1: Testing Strategies (H5P/Lumi embed)
```
• Student Profile ID: QL-STU-001
Step
2
Submission and
Grading
```
• Submitted Answers: {"q1": "incorrect_choice", "q2":
```
```
"incorrect_choice"}
```
```
• Calculated Score: 40% (Failed, threshold < 50%)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 61
Step
3
Results & Feedback • Auto-Grading Feedback: "You might want to review the lesson
material again."
• Recommendation Card triggered: Link to Writing Effective Use
Cases lesson.
• System Actions: Triggers low_quiz_score alert flags in database.
6.2.1.4 Submit Assignment
This test data is used to verify that a student can upload submission files to complete an active assignment.
Step Phase / Action Test Data Details
Step
1
Assignment Selection
Page
```
• Assignment: Use Case Reflection (Due in 7 days)
```
• Total Marks: 20
Step
2
File Upload • Uploaded File: use-case-reflection.pdf
• Storage Bucket Path: https://example.com/submissions/use-case-
reflection.pdf
• Database Row Created: assignment_submission status set to
'submitted'.
6.2.2 Instructor Subsystem
6.2.2.1 Login
This test data is used to verify that the instructor can log into the system by entering the required credentials.
Use Case Parameter Test Data Value
Login User Email instructor@example.com
Password 123456
6.2.2.2 Create Course and Learning Structure
This test data is used by instructors to define new courses and sequential modules.
Step Phase / Form Name Configuration Test Data
Step 1 Course Info Page • Course Code: QL-SEF101
• Course Title: Software Engineering Fundamentals
• Status: 'active'
```
Step 2 Add Module • Module Title: Requirements and Use Cases (Sequence 1)
```
Step 3 Add Lesson • Lesson Title: Writing Effective Use Cases
```
• Lesson Type: mixed (Reading & Video)
```
6.2.2.3 Publish Lesson Content and Interactive Material
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 62
This test data is used to add content items and publish lessons to make them visible to students.
Step Interface
Screen
Test Data Details / Toggle Actions
Step
1
Content
Setup Page
• Target Lesson: Quiz 1: Testing Strategies
• Content Type: h5p_lumi
• Embed URL: <iframe
```
src="https://app.lumi.education/api/v1/run/GVsXA0/embed"...></iframe>
```
Step
2
State
Toggle
• Action: Publish Lesson
• Status: Syncs publish_status to 'published' in the database.
6.2.2.4 Create Assessment and Configure Feedback
This test data is used to create quizzes with custom questions and automated feedback.
Step Configuration Step Parameter details & Rules Setup
Step
1
Quiz Configuration
Page
• Quiz Title: Use Case and Architecture Check
• Total Marks: 15
• Time Limit: 15 minutes
Step
2
Add Question • Question Type: mcq
• Prompt: "Which artifact describes actor goals and system
responses?"
• Correct Answer: "Use case"
Step
3
Auto-Feedback
Template
• Trigger Condition: Score >= 80%
• Message: "Excellent work! You have a strong grasp of the
material."
6.2.3 Academic Advisor Subsystem
6.2.3.1 Login
This test data is used to verify that the academic advisor can log into the system by entering the required
credentials.
Use Case Parameter Test Data Value
Login User Email advisor@example.com
Password 123456
6.2.3.2 View Advisor Alert Dashboard and Follow Up
This test data is used by advisors to check flagging alerts and log advisory follow-ups.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 63
Step Form Action /
Phase
Data Values & State Transitions
Step
1
Advisor Alert
Panel
```
• Advisee Flagged: Demo Student (student_no: QL-STU-001) showing
```
'At Risk' status.
```
• Target Alert: overdue_assignment (Architecture Sketch)
```
• Severity: high
Step
2
Intervention
Modal
• Selected Instructor: Demo Instructor
• Intervention Message: "Please review the architecture lesson and
submit the overdue sketch by Friday."
• Next Action: "Check submission status in 3 days"
Step
3
```
Save Action • Database updates: Inserts row to advisor_follow_up; sets
```
advisor_alert.status to 'reviewed'.
6.2.4 Admin Subsystem
6.2.4.1 Login
This test data is used to verify that the administrator can log into the system by entering the required
credentials.
Use Case Parameter Test Data Value
Login User Email admin@example.com
Password 123456
6.2.4.2 User Registry Controls
This test data is used by administrators to manage account approval states and toggle user suspension.
Step Target User &
Actions
Expected Database Synchronizations
Step
1
User Approval
Page
```
• Target User: Pending Instructor (pending_instructor@example.com)
```
showing 'pending' status.
• Action: Click 'Approve'
• Database Sync: Syncs status to 'active' in database.
Step
2
```
Suspend Account • Target User: Bob Smith (student3@example.com) showing 'active'
```
status.
• Action: Click 'Suspend'
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 64
```
• Database Sync: Syncs status to 'suspended' in database; revokes user
```
login authorization.
6.2.4.3 Moderate Content
This test data is used by administrators to review and moderate uploaded learning materials.
Step Moderation Flow Expected Database Actions / Log Entry
Step
1
Content Moderation
Queue
• Target Content: Architecture Layer Matching Activity
```
(content_item)
```
• Action: Click 'Approve'
Step
2
Audit Trail Logging • Action Type: 'content_item.approve'
• Logged Row: Creates moderation_action and audit_log rows
tracking the admin decision.
6.3 Acceptance Testing
The final acceptance testing phase validates the prototype against the requirements documented in Part I
```
(SRS) and Part II (SDS).
```
Requirement
ID
Requirement
Description
Primary
Actor
Execution Steps Expected
Result
Pass
/
Fail
QA-AUTH-01 Multi-Role
Authentication
All Log in with Student,
Instructor, Advisor,
and Admin
credentials.
User
successfully logs
in and redirects
to correct
dashboard.
Pass
QA-STU-01 Enrolled Learning
Path
Student Navigate
to /student/courses and
launch course QL-
SEF101.
Accesses course
details with
modules,
lessons, and
content outline.
Pass
QA-STU-02 Interactive H5P
Player
Student Select Quiz 1 from
Module 3 and launch
player.
Interactive Lumi
iframe loads and
allows user to
input answers.
Pass
QA-STU-03 Auto-Grading &
Review
Student Submit quiz attempt
and check results
page.
Instantly
calculates
percentage,
marks
correct/incorrect,
and recommends
lessons.
Pass
QA-INS-01 Curriculum
Assembly
Instructor Navigate
to /instructor/courses,
add module, and add
lesson.
New items write
to Supabase and
update outline
on course page.
Pass
QA-ADV-01 Early Alert
Overview
Advisor Access advisor
monitoring panel.
Assigned
students
Pass
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 65
showing
academic risk
flags appear on
list.
QA-ADV-02 Log Interventions Advisor Click 'Follow Up' on
at-risk student, type
message, select
instructor, and save.
Creates follow-
up record and
pushes
notification
alerts.
Pass
QA-ADM-01 User Registry
controls
Admin Navigate to admin
registry page and click
'Suspend' on test user.
Account status
updates to
```
'suspended';
```
logins are
rejected.
Pass
QA-SEC-01 RLS Access
Enforcement
All Attempt direct URL
access to pages of
other roles.
System
intercepts access
and redirects to
landing or
blocks queries.
Pass
_Date tested: 30 June 2026
```
_Progress: 100% Completed
```
_Tested by: Soo Kian Rong
_Verified by: See Wing Kit
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 66
7 Sample Screens
7.1 Main Screen
7.1.1 Log In Page
The QuestLearn Log In screen serves as the initial gateway for users accessing the platform. It features a
clean, minimalist card layout centered against a dark navy blue background.
• Header Logo: At the top of the white login container, the QuestLearn logo is displayed
alongside its tagline, "Smart Interactive Learning".
• Form Title: Directly below the logo, a prominent heading reads "Welcome back",
followed by the subtext instruction, "Sign in to your QuestLearn account".
• Input Fields:
o Email Address: A standard text input field labeled with an example placeholder
```
(you@example.com).
```
```
o Password: A masked text input field that includes a visibility toggle icon (eye icon)
```
on the right side to let users reveal or hide their password.
• Action Button: A full-width, solid green "Sign in" button sits at the bottom of the form
inputs to submit the credentials.
• Registration Link: Below the sign-in button, text reads "Don't have an account? Register
here", providing a clear navigational path for new users to create an account.
```
7.1.2 Registration Screen (Student Create Account)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 67
The Student
Registration screen allows new students to sign up for the platform. It follows the same clean,
minimalist card layout as the log-in page, set against a dark navy blue background.
• Header Instructions: At the top of the form, text instructs the user to "Register as a Student
or Instructor", followed by the selection label "I am a...".
• Role Selection Toggle: A dual-segmented control allows users to toggle between Student
and Instructor. In this view, "Student" is highlighted with a solid dark teal background to
indicate it is selected.
• Input Fields:
o Full name: A text field with the placeholder "Your full name".
o Email address: A text field with the placeholder you@example.com.
o Student ID: A specialized text field with the placeholder format example "e.g. STU-
001".
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 68
o Password: A masked input field with the placeholder "Min. 6 characters", featuring
an eye icon visibility toggle on the right side.
• Action Button: A full-width, solid dark teal "Create account" button with a user-plus icon
```
(+ person icon) is placed below the inputs to submit the registration details.
```
• Navigation Link: At the very bottom of the card, text reads "Already have an account? Sign
in", providing an easy shortcut back to the main login screen.
```
7.1.3 Registration Screen (Instructor Create Account)
```
The Instructor Registration screen allows new educators to sign up for the platform. It maintains the
identical layout framework as the student page but adjusts the active role toggle and specific input criteria.
• Role Selection Toggle: In this view, "Instructor" is selected and highlighted with a solid green
background, shifting the context of the registration form.
• Input Fields:
o Full name: A text field with the placeholder "Your full name".
o Email address: A text field with the placeholder you@example.com.
o Staff ID: A specialized text field that dynamically replaces the "Student ID" field,
displaying the placeholder format example "e.g. INS-001".
o Password: A masked input field with the placeholder "Min. 6 characters", featuring an eye
icon visibility toggle on the right side.
• Notice Banner: A subtle informational note is displayed just above the action button, stating:
"Instructor accounts require admin approval before you can access the platform."
• Action Button: A full-width, solid green "Create account" button with a user-plus icon submits the
instructor's credentials for administrative review.
• Navigation Link: At the very bottom of the card, text reads "Already have an account? Sign in",
providing a direct path back to the login screen.
```
7.1.4 Admin Dashboard (Home Page)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 69
Admin Dashboard Home Page:
The Admin Dashboard serves as the central control panel for platform administrators, providing a high-
level overview of system metrics and user management. It features a left-hand navigation sidebar and a main
data visualization area.
• Navigation Sidebar: A dark navy vertical sidebar on the left provides easy access to key
administrative modules:
```
o Dashboard (Active selection)
```
o Users
o Courses
o Announcements
o Analytics
o Notifications
```
o Sign out (Positioned at the bottom)
```
• Header Section: Displays the main title "Admin Dashboard" alongside the subtitle text "System
overview and user management." The top right header includes the administrator's profile name and
```
role label (Demo Admin / Admin).
```
```
• Overview Metric Cards: A row of three key performance indicator (KPI) cards summarizes the
```
real-time status of the system:
o System Status: Displays a status badge reading "Healthy" alongside a checkmark icon.
```
o Total Users: Displays a total count metric (e.g., 10) alongside a user network icon.
```
```
o Storage Used: Displays the currently consumed data volume (e.g., 45 GB) alongside a
```
database/server icon.
• Pending Approvals Section: A dedicated section at the bottom designed to display instructor
registration requests that require verification. When no requests are present, it features a clean state
graphic with a check icon and the text: "No Pending Approvals / All user accounts are currently
active."
7.1.5 Admin Panel - User Registry Page
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 70
The User Registry page provides administrators with a centralized directory to monitor, search, and manage
all registered accounts on the platform.
• Header Section: Displays the main title "User Registry" alongside the subtitle text "Review and
manage platform credentials, roles, and suspension states." On the far right of the header, an "Add
```
Registry User" action button (featuring a + icon) allows administrators to manually create new
```
accounts.
• User Directory Table: A comprehensive data table organizing active platform users. The table
includes five distinct columns:
o User Name: Displays the user's full name alongside an individual profile avatar icon.
o Email: Lists the primary email address associated with the account.
```
o Role: Identifies the user's system permissions and account type (e.g., Student, Instructor,
```
```
Academic Advisor, Admin).
```
o Status: A color-coded state indicator displaying "active" in green text for fully functional
accounts.
o Actions: Actionable control buttons for account moderation, featuring a red "Suspend"
```
button next to an info/status indicator (N/A or context options).
```
7.1.5.1 Modal View - Create Registry User
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 71
The Create Registry User modal is a centered dialog box that appears when the administrator
clicks the "Add Registry User" button. It allows for the manual onboarding of new platform actors.
• Header Instructions: Displays the modal title "Create Registry User" accompanied by
the subtext instruction: "Directly append a credentialed role profile into the platform."
• Input Fields:
o Full Name: A text field with the placeholder format example "e.g., John Doe".
o Email Address: A text field with the placeholder format example "e.g.,
john@example.com".
```
o System Role: A dropdown selection field (currently displaying "Student") to assign
```
the account's access level and permissions, example Student, Instructor, Academic
Advisor, Admin.
```
o Student ID (Optional): A specialized conditional text field with the placeholder
```
format example "e.g., STU-1122".
```
Note: This field dynamically toggles or re-labels based on the selected System Role (e.g., changing
```
```
to Staff ID if "Instructor" is selected).
```
• Action Controls: Positioned at the bottom right of the modal card:
o Cancel: A neutral white button to dismiss the modal and return to the registry table
without saving.
o Create User: A solid dark teal button to submit the form and instantly insert the new
user profile into the database registry.
7.1.6 Admin Panel - Global Course Registry Page
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 72
The Global Course Registry page allows administrators to oversee all courses offered on the platform and
monitor student enrollments globally.
• Header Section: Displays the main title "Global Course Registry" alongside the subtitle text
"Overview of all courses and student enrollments. Manage course registries as an administrator." The
```
top right area displays the active administrator profile (Demo Admin / Admin).
```
• Navigation Sidebar: Continues the standard dark navy vertical navigation panel, highlighting
"Courses" as the active module selection.
• Course Registry Grid: Features a responsive grid layout displaying course information cards. Each
card represents an individual subject and contains:
```
o Course Code Indicator: A bold identifier tag at the top left of each card (e.g., TEST-001,
```
```
SE-001).
```
o Status Badge: A color-coded tag showing "Active" in green text to signify the course's
current availability.
```
o Course Title & Details: Displays the full name of the course (e.g., "DATA01", "Software
```
```
Engineering Fundamentals"), along with the designated Instructor's name and a brief
```
description.
o Enrollment Counter: A footer metric at the bottom-left of each card showing the number of
```
students enrolled (e.g., 0 Students Enrolled, 2 Students Enrolled).
```
o Management Control: A "Manage Registries →" navigational text button positioned at
the bottom-right of each card, allowing the admin to dive into specific course settings,
enrollment rosters, or content.
```
7.1.6.1 Course Management View (Manage Registries)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 73
This sub-page allows administrators to manage an individual course's information, enroll new
students, and review the current roster of enrolled users.
• Breadcrumb Navigation: A link reading "← Back to Courses" is positioned at the top left
to allow easy navigation back to the global course grid.
• Course Overview Card: A large white panel displaying specific information about the
selected course:
```
o Course Code Tag: Displays the code badge (e.g., TEST-001).
```
o Action Link: A "Delete Registry" link sits next to the course code for removing the
course from the system.
```
o Course Information: Displays the main course title (e.g., "DATA01") and the
```
```
instructor/description text below it (e.g., "A TEST FOR TESTER").
```
• Enroll a Student Panel: A column on the left containing a form titled "Enroll a Student"
for manually registering a student into this specific course:
o Select Student Dropdown: A selection menu field currently displaying a
```
placeholder selection ("— Choose a student —").
```
o Enroll Student Button: A solid green button positioned underneath the dropdown to
submit and finalize the enrollment.
• Registry Roster List: A column on the right displaying a detailed table titled "Registry
```
Roster" along with a counter tracking the number of active enrollments (e.g., (0)). The table
```
contains the following columns for tracking:
o Student Name
o Student ID
o Status
o Action
o Empty State Notification: When no students are active in the course, the table
displays a central placeholder text message: "No students currently enrolled."
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 74
7.1.7 Admin Panel - Platform Announcements Page
The Platform Announcements page provides administrators with a dedicated interface to
```
broadcast important updates, instructions, and notices globally to all platform actors (Students,
```
```
Instructors, and Advisors).
```
• Header Section: Displays the main title "Platform Announcements" alongside the
subtitle text "Broadcast important updates to students, instructors, and advisors." On the far
```
right of the header, a prominent green "Create Broadcast" action button (featuring a + list
```
```
icon) allows administrators to draft and publish new system-wide announcements.
```
• Navigation Sidebar: Continues the standard dark navy vertical navigation panel,
highlighting "Announcements" as the active module selection.
• Announcements Content Area: A large card container dedicated to listing the historical
stream of broadcasts. In this view, it demonstrates an empty state utilizing a clean
minimalist interface with the central placeholder text: "No announcements published yet."
7.1.8 Admin Panel - Platform Analytics Page
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 75
The Platform Analytics page gives administrators a comprehensive view of global system
performance, activity timelines, and storage metrics to ensure the application remains stable and
active.
• Header Section: Displays the main title "Platform Overview" alongside the subtitle text
"Global analytics and hardware performance indicators." The top right header includes the
```
logged-in administrator's profile name and role label (Demo Admin / Admin).
```
• Navigation Sidebar: Continues the standard dark navy vertical navigation panel,
highlighting "Analytics" as the active module selection.
• Performance Metric Cards: A row of three key metrics displays real-time statistics:
```
o Total Registrations: Displays the cumulative number of users on the platform (e.g.,
```
```
459) alongside a registration icon.
```
```
o API Performance: Monitors system responsiveness and uptime percentage (e.g.,
```
```
99.9%) alongside a server activity icon.
```
o Storage Space: Monitors total disk/cloud storage allocation consumed by the system
```
(e.g., 128 GB) alongside a database storage icon.
```
• Activity Timeline Section: A dedicated log window titled "Activity Timeline" details
recent automated or administrative actions in chronological order. Each log item contains a
color-coded role badge, an activity description, and a timestamp:
```
o Admin (Approved) badge: "Approved Demo Instructor account registration. · 1 hour
```
ago"
```
o Student (Quiz) badge: "Demo Student completed Quiz 1 with score 80%. · 2 hours
```
ago"
```
o Instructor (Course) badge: "Approved Module 2 Interactive Practice Quizzes. · 4
```
hours ago"
7.1.9 Admin Panel - Notifications Inbox Page
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 76
The Notifications Inbox page serves as a dedicated communication hub for administrators, tracking system
alerts, user registration prompts, and automated audit notices.
• Header Section: Displays the main title "Notifications Inbox" alongside the descriptive subtitle
text "Stay updated with course announcements, advisory alerts, and platform notifications." The
```
active administrator profile (Demo Admin / Admin) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard dark navy vertical navigation panel, highlighting
"Notifications" as the active module selection.
• Inbox Filter Tabs: Features a segmented view controller to organize alerts into two primary
```
categories:
```
```
o All Notifications (Displays an item counter badge, e.g., 0)
```
```
o Unread (Displays an unread item counter badge, e.g., 0)
```
• Inbox Content Area: A spacious card container designed to list incoming alerts in chronological
order. When no notifications are active, it demonstrates a clean empty state utilizing a central bell
placeholder icon accompanied by the status text: "No Notifications / You have no notifications in
your inbox."
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 77
7.2 Student Interface
```
7.2.1 Student Dashboard (Home Page)
```
The Student Dashboard serves as the central landing page for students upon logging into QuestLearn. It
provides an immediate, personalized summary of their academic progress, active course enrollments, and
recent activities.
• Header Section: Displays a friendly personalized greeting, "Welcome back, Demo!" accompanied
by a waving hand emoji, followed by the subtext prompt, "Here's an overview of your learning
```
progress today." The top right header includes the student's active profile identifier (Demo Student /
```
```
Student).
```
• Navigation Sidebar: Continues the vertical navigation schema layout on the left, custom-filtered for
student privileges:
```
o Dashboard (Active selection)
```
o My Courses
o Quizzes
```
o Notifications (Includes an unread badge indicator, e.g., 1)
```
o Profile
```
o Sign out (Positioned at the bottom)
```
• Overview Metric Cards: A horizontal row of three high-level summary statistics:
```
o Active Courses: Displays the total number of currently enrolled courses (e.g., 1).
```
```
o Overall Progress: Reflects the combined completion rate across all coursework (e.g., 78%).
```
o Upcoming Deadlines: Highlights pending tasks or time-sensitive assessments requiring
```
attention (e.g., 1).
```
• Main Content Layout: Divided into a asymmetrical two-column interface:
```
o Your Courses (Left Column): Lists individual progress cards for enrolled classes. Each
```
```
card showcases the course code (e.g., SE-001), an active status tag, the full course title
```
```
("Software Engineering Fundamentals"), a short summary description, the designated
```
```
instructor name, and a visual progress metric bar (e.g., 78%).
```
```
o Recent Activity Log (Right Column): A chronological feed tracking the student's latest
```
```
learning interactions. Items include task descriptions and clear relative timestamps (e.g.,
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 78
"Watched Video: UML Diagrams · 1 hour ago", "Attempted Quiz: Testing Strategies ·
```
Yesterday", "Visited: Course Syllabus · Yesterday").
```
7.2.2 Student Panel - My Courses Page
The My Courses page lists all active and historical course registries for the student, providing
immediate entry points into specific course modules.
• Header Section: Displays the main title "My Courses" alongside the subtitle text "View
```
all your current and past enrolled courses." The student's active profile (Demo Student /
```
```
Student) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting "My
Courses" as the active module selection.
• Active Courses Grid: A grid layout displaying cards for the student's current classes. Each
course card contains:
```
o Course Code Indicator: A bold identifier tag at the top left of the card (e.g., SE-
```
```
001).
```
o Status Badge: A color-coded tag showing "Active" in green text.
```
o Course Title & Details: Displays the full name of the course ("Software
```
```
Engineering Fundamentals"), along with a short course description and the
```
```
designated Instructor's name ("Demo Instructor").
```
o Progress Tracking Bar: A linear progress indicator situated at the bottom of the
```
card displaying the student's current completion metric (e.g., 78%).
```
• Navigation Sidebar Options: Allows easy access back to other student areas like
Dashboard, Grades, Notifications, and Profile.
7.2.2.1 Course Content Dashboard View
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 79
This inner view provides a detailed, structured outline of all materials, lectures, and interactive
assessments assigned to a specific course registry. It uses a vertical accordion-style breakdown
divided by thematic learning modules.
• Header Section: Displays the main section title "Course Content" inside the white
primary container card.
o Course Progress Indicator: Integrated directly into the main header block, a clear
tracking metric displays the student's overall progress percentage for this active
```
course (e.g., Progress: 78%), giving the user an immediate summary of their
```
completion status before exploring individual modules.
• Module 1: Requirements & Use Cases:
o Description: Includes a brief subtext summary: "Introduction to requirements
analysis and use case modelling."
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 80
o Content Items:
▪ Writing Effective Use Cases: Marked with a green checkmark icon, a
Shared icon badge, and a 100% completion progress indicator.
▪ Activity Diagrams for Workflows: Displays a document/reading icon and a
Reading status tag.
• Module 2: Design and Architecture:
o Description: Includes a brief subtext summary: "Introduction to system architecture,
interface design, and data design."
o Content Items:
▪ Layered Architecture Basics: Marked with a green checkmark icon, a
Shared icon badge, and a 100% completion progress indicator.
• Module 3: Interactive Practice Quizzes:
o Description: Includes a brief subtext summary: "Test your knowledge with
interactive H5P quizzes. You must pass each quiz to unlock the next one."
o Quiz Items:
▪ Quiz 1: Testing Strategies: Marked with a green checkmark icon, a Shared
icon badge, and a 100% progress score tag.
▪ Quiz 2: Software Design: Marked with a green checkmark icon, a Shared
icon badge, and a 100% progress score tag.
▪ Quiz 3: Project Management: Marked with a green checkmark icon, a
Shared icon badge, and a 100% progress score tag.
▪ Quiz 4: Requirements Analysis: Displays an active document icon and a
Quiz label.
▪ Quiz 5: Quality Assurance: A faded row demonstrating a locked state.
Features a padlock icon and a warning badge: Locked — pass the
previous quiz first.
▪ A text placeholder row with a document icon and a Reading status tag.
7.2.2.2 Lesson Interface View
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 81
This page is displayed after the student clicks the "Start Lesson" button on an active material row
within Module 1 and Module 2. It provides a focused learning environment dedicated to a single
lecture topic.
```
• Header Section: Displays the specific, formal lesson name as the main title (e.g., "Writing
```
```
Effective Use Cases").
```
• Lecture Video Player: The central focus of the page is an embedded multimedia video
player displaying the recorded lecture or instructional video uploaded by the instructor. It
```
includes standard playback controls (Play/Pause, Timeline Scrubbing, Volume, and
```
```
Fullscreen).
```
• Completion Tracking Status: Below the video player component, the platform
dynamically monitors the student's progress for this specific topic:
o Lesson Complete? Text Prompt: A status message area reading "Mark this lesson
as complete to update your course progress."
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 82
o Completed Confirmation Badge: Once the system validates completion
```
requirements (or the student interacts with the final progression checkpoint), a clear
```
green "✓ Completed" badge appears, and the status updates across the global
course content outline page to show 100% completion.
• Assessment Shortcut Panel: Positioned directly below the video player interface, a clear
navigation area features an "Attempt Quiz" action button. This allows the student to
transition immediately to the corresponding interactive practice quiz for that topic once they
finish watching the video.
7.2.2.3 Quiz Interface View
This view provides an interactive testing environment where students complete assessments to
validate their understanding and unlock subsequent learning modules.
• Breadcrumb Navigation: A link reading "← Back to Course" is positioned at the top left,
allowing students to exit the quiz and return to the main course content dashboard.
• Quiz Header Card: A prominent white layout block indicating the assessment category tag
```
(e.g., Interactive Practice Quizzes) and the formal assessment name as the main title (e.g.,
```
```
"Quiz 1: Testing Strategies").
```
• Question Container Block: Displays the quiz questions sequentially. Each question block
```
includes:
```
o Question Sub-Header: A bold identifier pairing the quiz name with the specific
```
item description (e.g., “Quiz 1: Testing Strategies: In Software Testing, what is the
```
```
correct definition of 'Validation'?”).
```
o Multiple-Choice Options: A vertical list of selectable radio button options
representing possible answers:
▪ Are we building the product fast?
```
▪ A) Are we building the product right?
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 83
```
▪ B) Are we building the right product?
```
• Interactive Action Controls:
o Check Button: A solid blue action button positioned directly below the options
block, enabling students to instantly submit their selected choice for real-time
validation and grading.
7.2.3 Student Panel - Grades & History Page
The Grades & History page allows students to track their academic performance, viewing
cumulative grade averages alongside detailed scoring breakdowns for individual assessments.
• Header Section: Displays the main title "Grades & History" alongside the descriptive
subtitle text "Review your quiz results and assignment submissions." The active student
```
profile (Demo Student / Student) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Grades" as the active module selection.
• Performance Summary Cards: A row of two metric cards summarizes overall
```
performance:
```
o Average Grade: Displays a cumulative calculation across all evaluated coursework
```
(e.g., 23%) with the context note "Across all graded assessments."
```
```
o Completed Assessments: Tracks the total quantity of reviewed items (e.g., 2) with
```
the context note "Quizzes and assignments graded."
• Assessment History Table: A comprehensive progress log breaking down individual
grading metrics. The table organizes historical performance across five columns:
```
o Course: Displays the specific alphanumeric course identifier (e.g., QL-SEF101).
```
```
o Assessment: Specifies the title of the task or evaluation (e.g., "Use Case and
```
```
Architecture Check", "Use Case Reflection").
```
```
o Type: Categorizes the format of the assessment submission (e.g., Quiz, Assignment).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 84
o Status: A color-coded state indicator displaying "Graded" in green text to signify
completion.
```
o Score: Outlines the earned points against the total weight (e.g., 10 / 15, 17 / 100).
```
```
o Date: Logs the date the transaction or score was published (e.g., 28/06/2026).
```
```
7.2.3.1 Quiz Review View (Assessment History Drop-down)
```
This view appears when a student clicks on a specific quiz title link within the Assessment History
table. It allows them to review their submitted answers alongside correct solutions for historical
evaluation.
• Breadcrumb Navigation: A link reading "← Back to Grades" is positioned at the top left,
allowing students to instantly exit the review page and return to their cumulative
performance log.
• Review Header Card: A prominent layout card identifying the specific course code context
```
tag (e.g., QL-SEF101) and the formal title of the reviewed evaluation as the main header
```
```
(e.g., "Review - Quiz 1: Testing Strategies").
```
• Scoring Breakdown Bar: Displays high-level summary metrics of the completed attempt:
```
o Final Score: Highlights the exact points earned out of the total possible weight (e.g.,
```
```
10 / 15).
```
```
o Percentage Grade: Shows the calculated percentage achievement (e.g., 66.7%).
```
• Question Review Cards: A vertical stream displaying each question from the completed
attempt, detailed with color-coded feedback indicators:
o Question Stem: Displays the original query text presented during the test.
o Student's Selection: Shows the exact multiple-choice option selected by the user
```
during the attempt, marked with a clear status icon (e.g., a green checkmark for
```
```
correct answers or a red cross for incorrect selections).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 85
o Answer Key Verification: A dedicated feedback panel displayed directly beneath
the options, explicitly highlighting the absolute correct definition or answer choice
for the student's study reference.
• Footer Action Controls: Positioned at the bottom of the detailed review page to guide the
student's next steps:
o Retake Quiz: A button that clears the current review state and re-initializes the quiz
interface session, allowing the student to attempt the assessment again to improve
their score.
o Continue Course: A solid green button that takes the student directly back to the
related active Course Content interface page so they can seamlessly proceed with
the remaining modules.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 86
7.2.4 Student Panel - Notifications Inbox Page
The Notifications Inbox page functions as a dedicated stream for students to receive automated
alerts, academic advisories, and system updates regarding their coursework.
• Header Section: Displays the main title "Notifications Inbox" alongside the descriptive
subtitle text "Stay updated with course announcements, advisory alerts, and platform
```
notifications." The active student profile (Demo Student / Student) remains visible at the top
```
right.
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Notifications" as the active module selection.
o Real-time Indicator Badge: Whenever a new alert is received by the system, a red
notification dot flashes directly next to the "Notifications" text link in the sidebar to
draw immediate user attention.
• Inbox Filter Tabs: Features a segmented view controller to organize incoming alerts:
```
o All Notifications (Displays an active item counter badge, e.g., 4)
```
```
o Unread (Displays an unread item counter badge, e.g., 0)
```
• Notifications Stream List: A chronological feed displaying structured alert cards. Each
card contains a category icon, a status tag, a precise timestamp, and a summary message
```
block:
```
o Academic Advisory Note badge: "Your Academic Advisor has logged a follow-up
intervention suggestion: '123456' · 30/06/2026, 7:56:02 AM"
o System Content Update badge: "New SEF lesson content is available. · 26/06/2026,
5:11:40 PM"
7.2.5 Student Panel - Student Profile Page
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 87
The Student Profile page allows students to view their personal identity details, current academic
program level, and customized system learning preferences.
• Header Section: Displays the main title "Student Profile" alongside the descriptive
subtitle text "Manage your personal information, academic level, and learning preferences."
```
The active student profile (Demo Student / Student) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Profile" as the active module selection.
```
• Profile Identity Card (Left Column): A vertical summary card containing:
```
```
o An individual profile avatar placeholder icon (D).
```
```
o The student's full name ("Demo Student") and account type label ("Student
```
```
Account").
```
o A color-coded status badge displaying "Active Status" in green text.
```
• Profile Details Card (Right Column): A comprehensive grid layout organizing specific
```
user data into labeled fields:
```
o Full Name: Displays the user's registered name (Demo Student).
```
```
o Email Address: Displays the primary email account (student@example.com).
```
```
o Programme: Identifies the active field of study (Degree in Computer Science).
```
```
o Academic Level: Displays the current year of study (Year 2).
```
o Learning Preference: Displays specific interactive preferences configured for the
```
student profile (Visual & Interactive (Short lessons & H5P quizzes)).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 88
7.3 Academic Advisor
```
7.3.1 Advisor Dashboard (Home Page)
```
The Advisor Dashboard serves as the central management hub for academic advisors upon logging
into QuestLearn. It provides a high-level overview of their assigned student roster, pending alerts,
and student risk distributions.
• Header Section: Displays a professional greeting, "Welcome back, Advisor!"
accompanied by the subtext prompt, "Here's an overview of your student caseload and alerts
```
today." The top right header includes the advisor's active profile identifier (e.g., Demo
```
```
Advisor / Advisor).
```
• Navigation Sidebar: Continues the vertical navigation schema layout on the left, custom-
filtered for advisor privileges:
```
o Dashboard (Active selection)
```
o Student Roster
o Risk Analytics
o Advisory Logs
o Profile
```
o Sign out (Positioned at the bottom)
```
• Overview Metric Cards: A horizontal row of three high-level operational tracking cards:
o Total Students: Displays the total number of students currently assigned under the
```
advisor's care (e.g., 45).
```
o Pending Flags: Highlights active academic or behavioral alerts requiring immediate
```
review or intervention (e.g., 5).
```
o Interventions Logged: Tracks the cumulative number of advisory actions and
```
follow-up consultation notes recorded during the active term (e.g., 12).
```
• Main Content Layout: Divided into an asymmetric two-column interface:
```
o High-Risk Student Watchlist (Left Column): A prioritized table listing students
```
flagged by the system's risk assessment rules. It displays Student Name, Student ID,
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 89
```
Risk Level (color-coded red/yellow tags), and an Action column containing a link to
```
view individual student analytics.
```
o Recent Flags & Updates (Right Column): A chronological system activity log
```
```
tracking recent automated student risk triggers or automated performance drops (e.g.,
```
```
"Flagged: Demo Student dropped below 30% quiz average · 2 hours ago").
```
7.3.2 Advisor Panel - My Advisees Page
The My Advisees page provides a consolidated, tabular inventory of all students assigned to the
advisor's department, enabling rapid scanning of academic standings and initiating communication
workflows.
• Header Section: Displays the main title "My Advisees" alongside the descriptive subtitle
text "Overview of all students assigned to your department." The active advisor profile
```
(Demo Advisor / Academic Advisor) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting "My
Students" as the active module selection.
• Advisees Roster Table: A structured data grid that organizes student tracking metrics
across six primary columns:
```
o Student Name: Displays the full registered name of the student in bold text (e.g.,
```
```
Demo Student, Alice Johnson, Bob Smith).
```
o Student ID: Lists the unique system alphanumeric identifier for each individual
```
(e.g., QL-STU-001, STU-8821).
```
```
o Email: Outlines the student's primary institutional email address (e.g.,
```
```
student@example.com).
```
o Academic Info: Summarizes the student's degree track and active progression status
```
(e.g., Degree in Computer Science / Year 2, Diploma in IT / Year 1).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 90
o Status Tag: A color-coded, real-time risk indicator badge highlighting the student's
current academic health standing:
▪ At Risk: Rendered as a red warning tag indicating urgent attention required.
▪ Stable: Rendered as a green success tag signifying acceptable academic
performance.
```
o Intervention Controls (Action Column): Features two operational action buttons
```
for each student record:
▪ View Progress: A button that routes the advisor to the detailed student
learning analytics dashboard page.
▪ Follow Up: A button that launches a modal interface to log an academic
advisory note or trigger an official notification intervention alert.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 91
7.3.2.1 Student Progress Analytics View
This view is loaded when an advisor clicks the "View Progress" action button from the Advisees
Roster table. It offers an analytical breakdown of a single student's real-time course completions,
engagement level, and academic health status.
• Breadcrumb Navigation: A link reading "← Back to My Advisees" is positioned at the top
left, allowing the advisor to quickly return to the main roster list.
• Student Summary Header: Displays the student's name, ID, and program tracks
prominently alongside a primary status evaluation badge. The system dynamically assigns
one of two states based on cumulative course metrics:
o Stable: Rendered as a green badge indicating the student is hitting all completion
milestones, passing quizzes, and maintaining healthy platform engagement.
o At Risk: Rendered as a red warning badge indicating the student has dropped below
critical performance thresholds, failed to unlock chronological quiz modules, or
shown low content interaction.
• Course Progress Breakdown Grid: A detailed list of the student's active courses, showing
```
a visual progress percentage bar and a completion ratio metric (e.g., Progress: 78% · 7/9
```
```
items completed) for each subject registry.
```
• Quiz Performance History Section: A tabular log embedded within the page showing all
quiz attempts made by the student, detailing the exact score achieved, attempt date, and
pass/fail indicators to help the advisor pinpoint specific learning obstacles.
7.3.2.2 Send Advisory Intervention Modal
This overlay modal interface appears after an advisor clicks the "Follow Up" button within the
Advisees Roster table, allowing them to instantly submit a formal academic intervention log or
communication note.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 92
• Modal Header Section: Displays the clear action title "Send Advisory Intervention"
```
alongside context-rich metadata directly referencing the target student (e.g., To: Demo
```
```
Student (student@example.com)).
```
```
• Link to Instructor (Optional) Dropdown: A configurable dropdown field labeled "LINK
```
```
TO INSTRUCTOR (OPTIONAL)". It defaults to -- No Linked Instructor -- but allows the
```
advisor to associate the intervention note with a specific faculty lecturer if the concern
relates directly to classroom performance.
• Intervention Message Input: A multi-line, expandable text container area labeled
"INTERVENTION MESSAGE". It includes descriptive placeholder guidance text: Type
advisory feedback or study recommendations... where the advisor details the specific
academic advice, warnings, or action plan items.
• Modal Action Controls: Positioned at the bottom-right corner of the modal card window to
manage submission workflows:
o Cancel: A neutral, bordered button that gracefully dismisses the overlay without
committing any data or sending communications.
o Send Message: A solid green button accompanied by a paper airplane icon that
saves the log entry to the system, updates the Follow-Up History stream, and fires
the notification to the target student's inbox.
7.3.3 Advisor Panel - Follow-Up History Page
The Follow-Up History page acts as a centralized record repository where advisors can track,
review, and manage all historical interventions, student alerts, and logged suggestions they have
submitted.
• Header Section: Displays the main title "Follow-Up History" alongside the descriptive
subtitle text "Review logged advisory interventions, student alerts, and logged suggestions."
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 93
```
The active advisor profile (Demo Advisor / Academic Advisor) remains visible at the top
```
right.
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Follow-Up History" as the active module selection.
• Action Controls: Features a prominent "+ New Follow-up" green action button positioned
at the top right of the main content area, allowing advisors to instantly launch a modal
interface to record a new student intervention.
• Empty State Dashboard Card: When no prior entries have been submitted or recorded in
the system, a primary white container card displays a centralized placeholder message
```
reading: "No advisory follow-ups logged yet." This container dynamically populates with a
```
chronological audit list once follow-up notes are committed.
7.3.4 Advisor Panel - Notifications Inbox Page
The Notifications Inbox page serves as a dedicated communication stream for advisors,
aggregating automated system logs and platform-wide alerts regarding their assigned advisees.
• Header Section: Displays the main title "Notifications Inbox" alongside the descriptive
subtitle text "Stay updated with course announcements, advisory alerts, and platform
```
notifications." The active advisor profile (Demo Advisor / Academic Advisor) remains
```
visible at the top right.
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Notifications" as the active module selection.
• Inbox Filter Tabs: Features a segmented tab bar to organize incoming updates:
```
o All Notifications (Displays an active item counter badge, e.g., 1)
```
```
o Unread (Displays an unread item counter badge, e.g., 0)
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 94
• Notifications Stream List: A chronological feed displaying structured message rows. Each
alert row is detailed with a category icon, an explicit timestamp, and a summary message
```
block:
```
o System Notification card: Includes an alert icon followed by the message body:
"Advisor follow-up has been recorded for a student." labeled with the exact
```
generation timestamp (e.g., 30/06/2026, 5:11:40 PM).
```
7.3.5 Advisor Panel - Advisor Profile Page
The Advisor Profile page allows advisors to view and verify their personal identity records,
institutional identity metadata, and designated office hours.
• Header Section: Displays the main title "Advisor Profile" alongside the descriptive
subtitle text "Manage your advisor account information and department affiliation." The
```
active advisor profile (Demo Advisor / Academic Advisor) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Profile" as the active module selection.
```
• Advisor Identity Card (Left Column): A vertical summary block containing:
```
```
o An individual profile avatar placeholder icon (D).
```
```
o The advisor's full name ("Demo Advisor") and institutional designation ("Academic
```
```
Advisor").
```
o A color-coded status badge displaying "Advisor Role" in green text.
```
• Advisor Details Card (Right Column): A comprehensive grid layout organizing
```
operational profile data into secure, labeled fields:
```
o Full Name: Displays the user's registered name (Demo Advisor).
```
```
o Email Address: Displays the corporate contact email (advisor@example.com).
```
```
o Advisor ID: Identifies the unique system registration code (QL-ADV-001).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 95
o Office Hours: Outlines the standard weekly consultation availability blocks
```
allocated for student appointments (e.g., Thursday 14:00-16:00).
```
7.4 Instructor Interface
```
7.4.1 Instructor Dashboard (Home Page)
```
The Instructor Dashboard serves as the central command center for faculty lecturers upon logging
into QuestLearn. It provides an immediate overview of their active teaching course registries,
aggregate student performance metrics, and pending grading tasks.
• Header Section: Displays a professional greeting, "Welcome back, Instructor!"
accompanied by the subtext prompt, "Manage your courses, view student performance
metrics, and grade assessments." The top right header displays the instructor's active profile
```
identifier (e.g., Demo Instructor / Instructor).
```
• Navigation Sidebar: Continues the vertical navigation schema layout on the left, custom-
filtered for instructor privileges:
```
o Dashboard (Active selection)
```
o Course Management
o Grading Queue
o Analytics Insights
o Profile
```
o Sign out (Positioned at the bottom)
```
• Overview Metric Cards: A horizontal row of three high-level operational tracking cards:
o Active Courses: Displays the total number of live course registries assigned to the
```
instructor for the current term (e.g., 3).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 96
o Total Enrolled Students: Displays the cumulative number of unique students across
```
all assigned classes (e.g., 124).
```
o Pending Submissions: Highlights the number of interactive quizzes or assessments
```
waiting for review or final submission validation (e.g., 18).
```
• Main Content Layout: Divided into an asymmetric two-column interface:
```
o My Courses Registry Overview (Left Column): A grid or list of cards representing
```
```
active courses (e.g., QL-SEF101 Software Engineering Fundamentals). Each card
```
displays the class size, average class quiz score percentage, and a primary quick-
access link to Manage Course Content.
```
o Actionable Grading Alerts (Right Column): A prioritized checklist tracking recent
```
```
student activity that requires manual intervention or review (e.g., "Quiz 4:
```
```
Requirements Analysis submitted by 5 new students · Action Required").
```
7.4.2 Instructor Panel - Course Management Page
The Course Management page provides instructors with a high-level catalog of all academic
subjects assigned to them, serving as the gateway to customize curriculum structures, modules, and
learning media.
• Header Section: Displays the main title "Course Management" alongside the operational
descriptive subtitle text "Create and manage your courses, modules, and lessons." The active
```
instructor profile identifier (Demo Instructor / Instructor) remains anchored in the top right
```
window corner.
• Navigation Sidebar: Continues the vertical navigation panel design schema, highlighting
"My Courses" as the active module selection.
• Action Controls: Features a prominent "+ Create Course" green action button at the top
right of the main panel workspace, allowing instructors to launch a creation wizard to
initialize a completely new course shell database entry.
• Course Registry Grid: A responsive card layout organizing individual active modules.
Each course card encapsulates:
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 97
o Course Code Tag: A dark, stylized label displaying the formal reference index code
```
(e.g., TEST-0001, QL-SEF101).
```
o Status Indicator: A green text element indicating the current visibility status of the
```
index shell (e.g., Active).
```
```
o Course Title & Subtext: Displays the formal nomenclature (e.g., "Software
```
```
Engineering Fundamentals") followed by a short summary of its target scope (e.g.,
```
"Demo course for QuestLearn short lessons, quizzes, progress analytics, and advisor
```
support.").
```
o Enrollment Metric Ledger: Positioned at the bottom left of each card, showing a
user icon paired with the live tally of registered students matching that course shell
```
instance (e.g., 2 Students).
```
o Direct Modification Links: Features an "Edit Course →" hyperlink text command
at the bottom right corner of each card block, routing the instructor to the
comprehensive content arrangement screen where they can manage modules, append
YouTube links, or configure interactive quizzes.
7.4.2.1 Create Course Overlay Modal
This modal interface appears as a focused screen overlay after the instructor clicks the "+ Create
Course" button on the Course Management page, providing a structured form to initialize a new
course record.
• Modal Header Section: Displays the title "Create New Course" alongside a descriptive
guiding prompt: "Fill in the details below to initialize a new course shell in the registry." A
```
close icon (×) sits at the top right corner to let instructors dismiss the modal without saving
```
changes.
• Form Input Fields: A vertical stack of text and configuration controls:
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 98
o Course Title Input: A text field labeled "COURSE TITLE" with the explicit
placeholder prompt: e.g., Software Engineering Fundamentals.
o Course Code Input: A text field labeled "COURSE CODE" with the explicit
placeholder prompt: e.g., QL-SEF101.
o Course Description Area: A multi-line text field labeled "COURSE
DESCRIPTION" with the placeholder guidance text: Enter a brief summary or
syllabus overview for this course...
• Modal Action Controls: Positioned at the bottom-right corner of the modal layout to
manage submission workflows:
o Cancel: A neutral, bordered button that safely closes the overlay without saving any
input data or modifying the database.
o Create Course: A solid green confirmation button that validates the input text fields,
registers the new course entry into the system, and dynamically appends the new
item card to the Course Registry Grid.
7.4.2.2 Course Content Configuration View
This view loads after an instructor clicks the "Edit Course →" action link on a specific course card
within the Course Management page. It provides a comprehensive workspace to manage course
visibility, alter high-level metadata, and organize curriculum content structure.
• Breadcrumb Navigation: A link reading "← Back to Courses" is positioned at the top left,
allowing instructors to instantly save their work state and return to the main course catalog.
• Course Header & Settings Card: Displays the active course identifier code as the primary
```
header (e.g., "Edit Course - QL-SEF101"). This upper control area contains editable fields
```
for high-level details:
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 99
o Course Title Input: An inline text box pre-populated with the current title, allowing
instructors to directly modify the formal nomenclature.
o Course Description Area: An expandable, multi-line text input field allowing direct
revision of the existing syllabus overview or summary text.
o
Status Toggle Control: A dropdown menu or toggle element labeled "Course
```
Status" that allows instructors to set the course visibility to either Active (visible and
```
```
accessible to students) or Inactive (hidden from student dashboards for archiving or
```
```
draft preparation).
```
• Dynamic Module Tree Workspace: A vertical, accordion-style drag-and-drop structural
outline framework where instructors arrange curriculum components:
```
o Module Rows: Grouped sections identifying core teaching topics (e.g., Module 1:
```
```
Requirements Analysis). Each row contains an expandable list of nested elements.
```
o Lesson Media Content Items: Indented rows representing text lectures or
```
multimedia resources. Each item displays a resource icon (e.g., a video icon for
```
```
added YouTube links or document icon for plain text lessons) along with a quick-
```
edit text field to alter lesson titles.
o Quiz Assessment Items: Dedicated evaluation triggers nested within relevant
modules, featuring a specialized quiz indicator tag to distinguish them from regular
reading assignments.
• Workspace Action Controls: Positioned inline and at the bottom of the structure panel to
alter the curriculum database live:
o + Add Module: A button to append a new top-level chronological category cluster
to the course tree.
o + Add Lesson / Quiz: Secondary action triggers nestled inside each module panel
block to insert either a multimedia lecture link or initialize an associated evaluation
question bank.
o Save Changes: A solid green button at the bottom right that commits structural
modifications, metadata revisions, and status updates, publishing them to the system
database instantly.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 100
7.4.2.2.1 Modules & Content Management - Create Module
The Modules & Content canvas is a nested structural work area positioned directly below the
course metadata card. It allows instructors to logically compartmentalize their syllabus into
chronological teaching blocks.
• Action Controls: Features a prominent "+ Add Module" button located at the top-right
corner of the Modules & Content layout panel block. Clicking this button triggers an inline
creation control or modal overlay to initialize a new module.
• Create Module Form Fields:
o Module Title Input: A text input field where the instructor inputs the primary
```
structural category name (e.g., Module 1: LAB 1).
```
o Module Description / Objective Input: A short secondary text field immediately
below the title allowing instructors to summarize the core deliverable or instructions
```
for that module block (e.g., DO THE LAB 1 due 10/5).
```
• Workflow Action Controls:
o Cancel: Dismisses the creation state without saving or altering the existing
workspace array.
o Confirm / Save Module: Instantly generates a new container accordion row within
the structural hierarchy tree, displaying an empty shell equipped with localized
controls to append teaching elements.
7.4.2.2.2 Modules & Content Management - Edit & Add Content
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 101
Once a module container is created within the curriculum workspace, instructors use localized
contextual tools to refine its properties and enrich it with learning resources.
```
• Module Property Modification (Settings Gear Icon ⚙): Positioned on the right-hand side
```
of each module header row. Clicking this icon opens an inline edit container or focused
dialog box allowing the instructor to:
```
o Revise the active Module Title (e.g., changing Module 1: LAB 1 to a more detailed
```
```
descriptor).
```
o Update the Module Description / Objective guidelines live.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 102
```
• Content Injection Control (+ Add Content Button): Located directly beside the settings
```
gear icon on the module header block. Clicking this button opens a creation pane to append
a structured learning element to the module timeline:
o Lesson Title Input: A text field where the instructor declares the specific topic
```
name (e.g., lab 1).
```
o Content Type Selection Dropdown: A configuration menu allowing the instructor
to specify the delivery format of the resource. Supported structural options include:
▪ Reading: Standard rich text, reading logs, or markdown documentation
blocks.
```
▪ Video: Multimedia entries or embedded external streaming links (e.g.,
```
```
YouTube video URLs).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 103
▪ H5P: Interactive learning objects, rich animations, or embedded formative
engagement components.
• Workflow Action Controls:
o Cancel: Closes the content insertion tray without creating an entry or altering the
existing module hierarchy.
o Create Content: Commits the configuration, rendering an indented, nested lesson
asset row under the parent module tree block.
7.4.3 Instructor Panel - Class Analytics Page
The Class Analytics page offers instructors a high-level, aggregate diagnostic view of student
performance, content interaction, and course traction metrics across their assigned syllabus.
• Header Section: Displays the main title "Class Analytics" alongside the data tracking
prompt text "Monitor learning performance and progress trends across your courses." The
```
active instructor profile identifier (Demo Instructor / Instructor) remains visible at the top
```
right.
• Navigation Sidebar: Continues the standard vertical navigation panel layout, highlighting
"Analytics" as the active module selection.
• High-Level Metric Row: Features a row of three key summary tracking cards:
o Total Students: Displays the total headcount of active unique learners under the
```
instructor's courses (e.g., 5).
```
o Assigned Courses: Outlines the count of distinct active class catalogs mapped to the
```
instructor account (e.g., 4).
```
o Total Quiz Attempts: Tracks cumulative test submissions received across the
```
current course term (e.g., 1).
```
• Analytical Metric Layout: Divided into a balanced grid displaying interactive progress
data visualizations:
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 104
```
o Student Performance Distribution Card (Left Column): A horizontal bar chart
```
component mapping out aggregate student grade brackets. It segments scores by
```
academic performance tiers: <50% (Fail), 50-70% (Pass), 70-85% (Credit), and 85-
```
```
100% (High).
```
```
o Course Engagement Card (Right Column): Displays a list tracking the Weekly
```
```
Active Rate across running course titles (e.g., Requirements Analysis - 94% Active,
```
Software Design - 89% Active, Testing Strategies - 40% Active, Project
```
Management - 62% Active), formatted as color-coded horizontal progress bars to
```
indicate class engagement.
• Most Engaging Lessons Grid: Located at the bottom of the dashboard, this panel
```
showcases the top-performing or most frequented lecture modules (e.g., “Writing Effective
```
```
Use Cases”, “Layered Architecture Basics”, “Activity Diagrams for Workflows”) to help
```
faculty identify which content topics resonate strongest with students.
7.4.4 Instructor Panel - Announcements Page
The Announcements page allows instructors to broadcast critical course updates, deadline
extensions, or general information directly to the notification feeds and dashboard streams of all
enrolled students.
• Header Section: Displays the main title "Announcements" alongside the operational
descriptive subtitle text "Create and manage announcements for your courses." The active
```
instructor profile identifier (Demo Instructor / Instructor) remains visible in the top right
```
window corner.
• Navigation Sidebar: Continues the standard vertical navigation panel design schema,
highlighting "Announcements" as the active module selection.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 105
• Action Controls: Features a prominent "+ Create Announcement" green action button at
the top right of the main workspace, allowing instructors to launch a composition modal to
draft and publish a new blast message.
• Announcements History Feed: A chronological layout displaying previously broadcasted
updates. When active entries exist, each card encapsulates:
o Course Assignment Tag: A small metadata badge indicating which course code the
```
broadcast belongs to (e.g., QL-SEF101).
```
```
o Timestamp: The precise date and time the announcement was committed (e.g.,
```
```
30/06/2026, 7:54:17 AM).
```
```
o Content Summary: Displays the subject line header and body excerpt text (e.g.,
```
```
“Advisor logged an intervention follow-up for student Demo Student: 'test noti'”).
```
7.4.5 Instructor Panel - Instructor Profile Page
The Instructor Profile page allows faculty members to review their personal identity records,
institutional specialization details, and designated office consultation availability.
• Header Section: Displays the main title "Instructor Profile" alongside the descriptive
subtitle text "Manage your instructor account and office availability details." The active
```
instructor profile identifier (Demo Instructor / Instructor) remains visible at the top right.
```
• Navigation Sidebar: Continues the standard vertical navigation panel, highlighting
"Profile" as the active module selection.
```
• Instructor Identity Card (Left Column): A vertical layout block containing:
```
```
o An individual profile avatar placeholder icon (D).
```
```
o The instructor's full name ("Demo Instructor") and institutional designation
```
```
("Faculty Member").
```
o A color-coded status badge displaying "Instructor Role" in green text.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 106
```
• Faculty Details Card (Right Column): A comprehensive grid layout organizing
```
professional profile metrics into secure, labeled fields:
```
o Full Name: Displays the user's registered name (Demo Instructor).
```
```
o Email Address: Displays the corporate contact email (instructor@example.com).
```
```
o Specialization: Lists the instructor's academic focus areas (e.g., Software
```
```
Engineering and Web Systems).
```
o Subjects Taught: Details the specific curriculum topics assigned to their teaching
```
load (e.g., Software Engineering Fundamentals, Web Application Development).
```
```
o Staff ID: Identifies the unique system registration code (QL-INS-001).
```
o Office Hours: Outlines the standard weekly consultation availability blocks
```
allocated for student appointments (e.g., Mon, Wed 10:00-12:00).
```
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 107
8 Conclusion
<QuestLearn Part III documents the transition from the Part I requirements and Part II system design
into a working Next.js and Supabase prototype. The system remains organised around four actor roles:
```
Student, Instructor, Academic Advisor, and Admin; and four implementation areas: Backend and
```
```
Supabase; Frontend and Role Interfaces; Learning Content and Analytics; and Documentation,
```
Testing, and Final Assembly.
The strongest design outcomes are the consistent mapping between use cases, database entities,
screens, components, and acceptance criteria. The selected stack supports a realistic prototype
because Supabase provides authentication, PostgreSQL storage, file storage, and Row Level Security,
while the frontend can be deployed through a managed Next.js hosting platform and connected to the
same backend evidence.
Quality assurance for the final submission should be proven through unit tests, integration checks,
browser workflow tests, security/RLS validation, screenshots, SQL query outputs, and acceptance
testing sign-off. The current document identifies the required evidence without fabricating runtime
results that still need to be captured.
Future recommendations include improving the advisor risk scoring rules, expanding analytics
dashboards, adding richer notification delivery, refining mobile layouts, and strengthening automated
testing coverage before production use.
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 108
9 User Guide
This guide is organised by actor role and should be tested against the final deployed or local prototype
before submission. Update labels or menu names if the implemented UI uses different wording.
Student Guide
1. Register an account by selecting the "Student" role
2. Log in with your email and password
3. Browse available courses and click "Enroll"
4. Navigate to a course, select a module, and start a lesson
5. Watch the embedded video or read the content
6. Attempt the quiz at the end of the lesson
7. Review your score, feedback, and recommended next steps
8. Check your overall progress on the Student Dashboard
Instructor Guide
1. Register an account by selecting the "Instructor" role (admin approval required)
2. Log in after account approval
3. Create a new course with course code, title, and department
4. Add modules and lessons to the course
5. Upload video URLs and reading content for each lesson
6. Create quizzes by selecting questions from the question bank
7. Publish lessons and assessments to make them available to students
8. Review class performance on the Instructor Dashboard
Academic Advisor Guide
1. Log in with your advisor account
2. View students in your department on the Advisor Dashboard
3. Review student progress summaries and quiz performance
4. Identify students with overdue assignments or low progress
5. Send follow-up messages to students needing attention
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 109
Admin Guide
1. Log in with your admin account
2. Manage users: approve instructor accounts, suspend or deactivate accounts, reset passwords
3. Moderate learning content uploaded by instructors
4. Create and manage platform announcements
5. Monitor platform-wide analytics
```
Software Design Specification for Quest Learn System (Version 3.0)
```
Page 110
References
QuestLearn Part I SRS, Version 1.0
QuestLearn Part II SDS, Version 2.0
PostgreSQL 16 Documentation. https://www.postgresql.org/docs/16/
Next.js Documentation. https://nextjs.org/docs
Supabase Documentation. https://supabase.com/docs
Supabase Auth Documentation. https://supabase.com/docs/guides/auth
Supabase Row Level Security
Documentation. https://supabase.com/docs/guides/database/postgres/row-level-security
Supabase Storage Documentation. https://supabase.com/docs/guides/storage
Playwright E2E Testing. https://playwright.dev/
OWASP Top 10. https://owasp.org/www-project-top-ten/