# Part II — Sequence Diagrams

This document provides sequence diagrams for the five critical user flows in QuestLearn. Each diagram shows the interaction between the actor, frontend components, backend services, and the database. These diagrams are provided in Mermaid syntax for traceability and should be redrawn in draw.io for the final submission.

---

## SD-01: User Registration and Login

This sequence covers UC-01. The user registers a new account and then logs in to receive a JWT token for subsequent requests.

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant Auth as AuthenticationService
    participant DB as Database

    User->>FE: Opens registration page
    User->>FE: Submits name, email, password, role, department
    FE->>Auth: POST /api/v1/auth/register
    Auth->>DB: SELECT * FROM user WHERE email = ?
    DB-->>Auth: No matching record
    Auth->>Auth: Hash password with bcrypt
    Auth->>DB: INSERT INTO user (email, password_hash, role_id, ...)
    DB-->>Auth: User created (user_id)
    Auth->>DB: INSERT INTO student_profile / instructor_profile (user_id, ...)
    DB-->>Auth: Profile created
    Auth-->>FE: 201 Created — Registration successful
    FE-->>User: Show success message, redirect to login

    User->>FE: Enters email and password
    FE->>Auth: POST /api/v1/auth/login
    Auth->>DB: SELECT * FROM user WHERE email = ?
    DB-->>Auth: User record with password_hash
    Auth->>Auth: Compare password with bcrypt
    Auth->>Auth: Generate JWT (user_id, role_name, exp)
    Auth-->>FE: 200 OK — { token, user profile }
    FE->>FE: Store token, redirect to role dashboard
```

**Alternate Flow — Duplicate Email:**
```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant Auth as AuthenticationService
    participant DB as Database

    User->>FE: Submits registration with existing email
    FE->>Auth: POST /api/v1/auth/register
    Auth->>DB: SELECT * FROM user WHERE email = ?
    DB-->>Auth: Existing user found
    Auth-->>FE: 409 Conflict — "Account already exists"
    FE-->>User: Show error, link to login page
```

---

## SD-02: Student Quiz Attempt with Auto-Grading and Feedback

This sequence covers UC-03. A student attempts a quiz, receives auto-graded results, and views weak-topic feedback.

```mermaid
sequenceDiagram
    actor Student
    participant FE as Frontend
    participant Assess as AssessmentService
    participant Grade as GradingService
    participant Progress as ProgressService
    participant DB as Database
    participant Notif as NotificationService

    Student->>FE: Opens quiz page for lesson
    FE->>Assess: GET /api/v1/quizzes/:quizId
    Assess->>DB: SELECT quiz, questions (randomized if configured)
    DB-->>Assess: Quiz data with questions
    Assess-->>FE: Quiz questions, time limit, total marks
    FE-->>Student: Display quiz interface with timer

    Student->>FE: Answers all questions
    Student->>FE: Clicks Submit
    FE->>Grade: POST /api/v1/quizzes/:quizId/attempt { answers[] }
    Grade->>DB: INSERT INTO quiz_attempt (quiz_id, student_profile_id, ...)
    DB-->>Grade: attempt_id

    loop For each answer
        Grade->>Grade: Compare student_answer with correct_answer
        Grade->>DB: INSERT INTO attempt_answer (attempt_id, question_id, is_correct, points_earned)
    end

    Grade->>Grade: Calculate total score
    Grade->>DB: UPDATE quiz_attempt SET score = ?, feedback_summary = ?
    Grade->>Progress: updateLessonProgress(studentId, lessonId)
    Progress->>DB: UPSERT progress_record

    Grade->>Grade: Identify incorrect answers, group by topic
    Grade->>Grade: Generate weak-topic list and recommended next steps
    Grade-->>FE: 200 OK — { score, feedback, weakTopics, recommendations }

    Grade->>Notif: notifyQuizScore(attemptId)
    Notif->>DB: INSERT INTO notification (user_id, message)

    FE-->>Student: Display score, per-question feedback, weak topics, next steps
```

---

## SD-03: Instructor Creates Course Content

This sequence covers UC-05 and UC-06. An instructor creates a course structure and publishes lesson content.

```mermaid
sequenceDiagram
    actor Instructor
    participant FE as Frontend
    participant Course as CourseService
    participant Notif as NotificationService
    participant DB as Database

    Instructor->>FE: Opens "Create Course" page
    Instructor->>FE: Enters course code, title, department, description
    FE->>Course: POST /api/v1/courses
    Course->>DB: INSERT INTO course (instructor_profile_id, course_code, ...)
    DB-->>Course: course_id
    Course-->>FE: 201 Created — Course created

    Instructor->>FE: Adds Module 1 (title, description, sequence)
    FE->>Course: POST /api/v1/courses/:courseId/modules
    Course->>DB: INSERT INTO module (course_id, module_title, sequence_no)
    DB-->>Course: module_id
    Course-->>FE: Module created

    Instructor->>FE: Adds Lesson 1 to Module 1
    FE->>Course: POST /api/v1/modules/:moduleId/lessons
    Course->>DB: INSERT INTO lesson (module_id, lesson_title, content_text, video_url, ...)
    DB-->>Course: lesson_id
    Course-->>FE: Lesson created

    Instructor->>FE: Clicks "Publish Lesson"
    FE->>Course: PUT /api/v1/lessons/:lessonId/publish
    Course->>DB: UPDATE lesson SET publish_status = 'published'
    Course->>Notif: notifyNewContent(courseId, 'lesson')
    Notif->>DB: INSERT INTO notification for each enrolled student
    Course-->>FE: Lesson published
    FE-->>Instructor: Confirmation shown
```

---

## SD-04: Advisor Reviews Student Progress and Follows Up

This sequence covers UC-08. An academic advisor reviews their department students and sends a follow-up message to a struggling student.

```mermaid
sequenceDiagram
    actor Advisor
    participant FE as Frontend
    participant Adv as AdvisorService
    participant Analytics as AnalyticsService
    participant DB as Database

    Advisor->>FE: Opens Advisor Dashboard
    FE->>Adv: GET /api/v1/dashboard/advisor
    Adv->>DB: SELECT students FROM student_profile WHERE department = ?
    DB-->>Adv: Student list

    loop For each student
        Adv->>DB: SELECT progress, quiz scores, overdue assignments
        DB-->>Adv: Student summary data
    end

    Adv-->>FE: { students[], progressSummaries[], overdueList[] }
    FE-->>Advisor: Display department students with progress indicators

    Advisor->>FE: Selects a student with low progress
    FE->>Adv: GET /api/v1/advisor/students/:studentId/summary
    Adv->>DB: SELECT detailed progress, quiz history, activity log
    Adv->>Analytics: getWeakTopics(studentId)
    Analytics->>DB: SELECT incorrect answers grouped by topic
    Analytics-->>Adv: Weak topic list
    Adv-->>FE: { detailedProgress, quizHistory, weakTopics, overdueWork }
    FE-->>Advisor: Display student detail view

    Advisor->>FE: Types follow-up message, clicks Send
    FE->>Adv: POST /api/v1/advisor/follow-up { studentId, message }
    Adv->>DB: INSERT INTO notification (user_id, message)
    Adv-->>FE: Follow-up recorded
    FE-->>Advisor: Confirmation shown
```

---

## SD-05: Admin Moderates Content and Manages Announcements

This sequence covers UC-09. An admin reviews platform content, manages user accounts, and creates an announcement.

```mermaid
sequenceDiagram
    actor Admin
    participant FE as Frontend
    participant User as UserService
    participant Course as CourseService
    participant Notif as NotificationService
    participant DB as Database

    Admin->>FE: Opens Admin Panel
    FE->>User: GET /api/v1/admin/users?status=pending
    User->>DB: SELECT * FROM user WHERE account_status = 'pending'
    DB-->>User: Pending instructor accounts
    User-->>FE: User list
    FE-->>Admin: Display pending accounts

    Admin->>FE: Approves an instructor account
    FE->>User: PUT /api/v1/admin/users/:userId/approve
    User->>DB: UPDATE user SET account_status = 'active'
    User-->>FE: Account approved

    Admin->>FE: Reviews flagged course content
    FE->>Course: GET /api/v1/admin/content?flagged=true
    Course->>DB: SELECT flagged lessons
    Course-->>FE: Content list
    Admin->>FE: Approves content
    FE->>Course: PUT /api/v1/admin/content/:contentId/approve

    Admin->>FE: Creates platform announcement
    FE->>Notif: POST /api/v1/announcements { title, message, scope }
    Notif->>DB: INSERT INTO announcement
    DB-->>Notif: announcement_id
    Notif->>DB: INSERT INTO notification for all active users
    Notif-->>FE: Announcement published
    FE-->>Admin: Confirmation shown
```

---

## Drawing Instructions

For the final Part II submission, these Mermaid diagrams should be redrawn in draw.io using proper UML sequence diagram notation:

1. Use lifeline boxes for each participant
2. Use solid arrows for synchronous calls
3. Use dashed arrows for return messages
4. Use activation bars to show processing time
5. Use `alt` fragments for alternate flows
6. Add diagram titles and figure numbers
7. Export as PNG at 300 DPI for report insertion
