# Part II - Architecture Design

## 1. Architecture Overview

QuestLearn uses a cloud-backed web architecture based on `Next.js`, `Supabase`, and `Netlify`. This direction matches the project README and keeps the prototype realistic for Part III because authentication, database access, file storage, API routes, and deployment can be built from one integrated stack.

The architecture is organized into four layers:

1. Presentation Layer - Next.js pages and reusable React components.
2. Application Layer - Next.js Route Handlers and Server Actions for controlled server-side operations.
3. Data and Security Layer - Supabase Auth, Supabase PostgreSQL, Row Level Security policies, and Supabase Storage.
4. External Integration Layer - H5P/Lumi interactive content, embedded videos, email/notification triggers, and deployment services.

This structure preserves the separation of concerns required for the Part II design while avoiding the older multi-service stack rejected in [Technology-Stack.md](./Technology-Stack.md).

> Figure 3.1: Multi-Layer Architecture Diagram - see exported architecture diagram.

---

## 2. Presentation Layer

The presentation layer contains the user-facing Next.js application. It is implemented with React components inside the Next.js app structure, using role-based navigation and responsive layouts for students, instructors, academic advisors, and admins.

### Components

| Component | Description | Primary Actor |
| --- | --- | --- |
| `LoginPage` | Registration and authentication forms connected to Supabase Auth | All |
| `StudentDashboard` | Progress cards, enrolled courses, recent grades, notifications | Student |
| `InstructorDashboard` | Course management, class performance charts, engagement metrics | Instructor |
| `AdvisorDashboard` | Assigned students, risk alerts, progress summaries, follow-up tools | Academic Advisor |
| `AdminPanel` | User management, content moderation, announcements, platform analytics | Admin |
| `CourseViewer` | Module and lesson navigation with video, reading, and H5P/Lumi content | Student |
| `QuizInterface` | Question display, timer, answer submission, navigation between questions | Student |
| `QuizResultsPage` | Score display, per-question feedback, weak topics, recommended next steps | Student |
| `AssessmentBuilder` | Quiz and assignment creation with question bank integration | Instructor |
| `GradesPage` | Assessment history, grade transcript, performance trends | Student |
| `ProfileSettings` | Profile editing for role-specific attributes | All |
| `NotificationInbox` | Notification list with read/unread filtering | All |

### Design Principles

1. **Component Reusability** - Common UI elements such as navigation, cards, forms, tables, and status badges are shared across dashboards.
2. **Responsive Design** - Interfaces adapt to desktop, tablet, and mobile screens using CSS modules, Tailwind CSS, or a component library selected during implementation.
3. **Role-Based Rendering** - The UI reads the authenticated user role and profile record to show the correct navigation and actions.
4. **Server-Side Data Loading** - Pages that require protected data can load data through server-side Supabase clients so sensitive queries do not rely only on browser-side checks.

---

## 3. Application Layer

The application layer contains Next.js Route Handlers and Server Actions. These modules coordinate validation, business rules, Supabase database calls, storage operations, and notification creation.

### 3.1 Auth and User Module

**Responsibility:** Registration, login, profile retrieval, role checks, and account administration using Supabase Auth and profile tables.

**Key Operations:**
- `registerUser(formData)` - Create a Supabase Auth user and insert the matching role-specific profile.
- `getCurrentProfile()` - Load the current authenticated user and related profile record.
- `updateProfile(profileData)` - Update allowed profile fields based on role.
- `listUsers(filters)` - Admin-only user listing for user management.
- `toggleAccountStatus(userId, status)` - Admin-only account activation, suspension, or deactivation.

**Dependencies:** Supabase Auth, `user`, `role`, `student_profile`, `instructor_profile`, `advisor_profile`.

### 3.2 Course and Content Module

**Responsibility:** Course, module, lesson, enrollment, and interactive content lifecycle management.

**Key Operations:**
- `createCourse(instructorId, courseData)` - Create a course owned by an instructor.
- `addModule(courseId, moduleData)` - Add a sequenced module to a course.
- `addLesson(moduleId, lessonData)` - Add lesson metadata and ordering.
- `attachContentItem(lessonId, contentData)` - Attach reading, video, file, H5P, or Lumi content.
- `publishContent(targetId, targetType)` - Change publish status of lessons, modules, courses, or content items.
- `enrollStudent(studentProfileId, courseId)` - Create an enrollment record.

**Dependencies:** Supabase PostgreSQL, Supabase Storage, Notification Module.

### 3.3 Assessment Module

**Responsibility:** Quiz and assignment creation, question bank management, and assessment configuration.

**Key Operations:**
- `createQuiz(lessonId, quizData)` - Create quiz settings such as marks and randomization.
- `createAssignment(courseId, assignmentData)` - Create assignment instructions, deadline, and marks.
- `addQuestionToBank(courseId, questionData)` - Add MCQ, fill-in-the-blank, or short-answer questions.
- `configureQuiz(quizId, questionIds)` - Link question bank items to a quiz.
- `publishAssessment(assessmentId, type)` - Make a quiz or assignment available to students.

**Dependencies:** Course and Content Module, Supabase PostgreSQL.

### 3.4 Grading and Progress Module

**Responsibility:** Quiz attempt submission, auto-grading, weak-topic feedback, lesson progress, and student dashboard aggregation.

**Key Operations:**
- `submitQuizAttempt(studentId, quizId, answers)` - Store answers and auto-grade objective questions.
- `calculateScore(attemptId)` - Sum earned points and calculate percentage.
- `generateFeedback(attemptId)` - Identify incorrect answers and weak topics.
- `getRecommendedNextSteps(attemptId)` - Suggest lessons or topics based on weak areas.
- `updateLessonProgress(studentId, lessonId, status, percentage)` - Track lesson completion.

**Dependencies:** Assessment Module, Supabase PostgreSQL.

### 3.5 Analytics Module

**Responsibility:** Activity logging, engagement metrics, performance reports, and dashboard data.

**Key Operations:**
- `logActivity(userId, activityType, targetType, targetId, duration)` - Record learning events.
- `getEngagementMetrics(courseId)` - Prepare course-level engagement chart data.
- `getPerformanceDistribution(courseId)` - Prepare quiz score distribution data.
- `getWeakTopics(studentId, courseId)` - Identify repeated low-performance topics.

**Dependencies:** Supabase PostgreSQL.

### 3.6 Notification Module

**Responsibility:** Notification creation and delivery for deadlines, new content, quiz scores, announcements, and advisor alerts.

**Key Operations:**
- `notifyDeadline(assignmentId)` - Notify students of upcoming assignment deadlines.
- `notifyNewContent(courseId, contentType)` - Notify enrolled students of published content.
- `notifyQuizScore(attemptId)` - Notify a student when quiz results are available.
- `broadcastAnnouncement(announcementId)` - Create targeted notifications.
- `markAsRead(notificationId)` - Update notification read status.

**Dependencies:** Supabase PostgreSQL, optional email service.

### 3.7 Advisor Module

**Responsibility:** Advisor-student assignment, risk alert review, student progress summary, and follow-up recording.

**Key Operations:**
- `getAssignedStudents(advisorProfileId)` - List students assigned to an advisor.
- `getAdvisorAlerts(advisorProfileId)` - List open risk alerts for assigned students.
- `getStudentProgressSummary(studentProfileId)` - Aggregate progress, scores, overdue work, and engagement.
- `recordFollowUp(advisorId, studentId, alertId, message)` - Store advisor follow-up action.
- `closeAlert(alertId, resolutionNote)` - Mark a risk alert as reviewed or resolved.

**Dependencies:** Progress records, activity logs, advisor alerts, advisor follow-up records.

### 3.8 Admin and Audit Module

**Responsibility:** User administration, content moderation, announcements, and audit logging.

**Key Operations:**
- `moderateContent(adminUserId, targetType, targetId, decision)` - Record approval, update, rejection, or removal.
- `createAnnouncement(adminUserId, announcementData)` - Create platform, course, or department announcements.
- `writeAuditLog(actorUserId, actionType, targetType, targetId, summary)` - Record important admin and advisor actions.

**Dependencies:** Supabase PostgreSQL, Notification Module.

---

## 4. Data And Security Layer

The data and security layer uses Supabase PostgreSQL for relational storage, Supabase Auth for authenticated identity, Row Level Security for authorization, and Supabase Storage for files and media.

### Data Groups

| Data Group | Tables Managed |
| --- | --- |
| Identity and Access | `role`, `user`, `student_profile`, `instructor_profile`, `advisor_profile` |
| Learning Structure | `course`, `module`, `lesson`, `content_item`, `enrollment` |
| Assessment and Performance | `quiz`, `assignment`, `assignment_submission`, `question_bank`, `question`, `quiz_question`, `quiz_attempt`, `attempt_answer`, `progress_record` |
| Support and Analytics | `activity_log`, `advisor_student_assignment`, `advisor_alert`, `advisor_follow_up`, `announcement`, `notification`, `moderation_action`, `audit_log` |

### Supabase Access Model

- **Supabase Auth** stores authenticated account identity.
- **Application profile tables** store academic role details and authorization context.
- **Row Level Security** restricts exposed tables by role and ownership.
- **Server-side Supabase clients** are used in Route Handlers or Server Actions for operations requiring controlled privileges.
- **Storage policies** restrict lesson files, assignment submissions, and media assets by course enrollment and role.

---

## 5. External Integration Layer

| Integration | Purpose | Technology |
| --- | --- | --- |
| H5P/Lumi Content | Embed interactive learning activities in lessons | H5P packages or Lumi-hosted embed URLs |
| Video Embedding | Display lesson videos within the course viewer | YouTube or external video embed URLs |
| File Storage | Store assignment submissions and lesson assets | Supabase Storage |
| Authentication | Register, sign in, and manage sessions | Supabase Auth |
| Deployment | Host the Next.js application | Netlify |
| Charts | Display engagement and performance analytics | Recharts or Chart.js |

---

## 6. Architectural Innovations

### 6.1 Weak-Topic Detection Engine

When a student completes a quiz, the Grading and Progress Module identifies incorrect answers and groups them by topic. The result is stored as feedback and displayed as recommended next steps on the student dashboard.

```text
QuizInterface -> submitQuizAttempt() -> generateFeedback()
-> getRecommendedNextSteps() -> StudentDashboard
```

### 6.2 Advisor Early Alert System

The Advisor Module combines progress, quiz attempts, assignment submissions, and activity logs to generate or display risk alerts. Advisors can review a student's details and record follow-up actions.

```text
ActivityLog + ProgressRecord + QuizAttempt
-> AdvisorAlert -> AdvisorDashboard -> AdvisorFollowUp
```

### 6.3 Activity-Based Progress Analytics

Learning actions such as lesson views, video interactions, quiz attempts, and assignment submissions are stored in `activity_log`. The analytics module aggregates this data for student, instructor, advisor, and admin dashboards.

```text
UserInteraction -> logActivity() -> activity_log
-> getEngagementMetrics() -> Dashboards
```

### 6.4 Interactive Content Pipeline

Instructors can attach H5P/Lumi content to lessons through `content_item`. The lesson viewer renders the content as an embedded activity while activity events are tracked for analytics.

```text
Instructor Upload/Link -> content_item -> LessonViewer
-> ActivityLog -> Analytics Dashboard
```

---

## 7. Deployment Architecture

QuestLearn is deployed using Netlify for the Next.js application and Supabase for managed backend services.

| Component | Platform | Responsibility |
| --- | --- | --- |
| Next.js App | Netlify | Pages, server components, route handlers, server actions |
| Supabase Auth | Supabase | Registration, login, sessions, authenticated user identity |
| Supabase PostgreSQL | Supabase | Relational database and SQL queries |
| Supabase Storage | Supabase | Assignment files, lesson assets, uploaded media |
| Supabase RLS Policies | Supabase/PostgreSQL | Row-level authorization for exposed tables |
| GitHub | GitHub | Version control and team collaboration |

> Figure 3.2: Deployment Architecture Diagram - see exported deployment diagram.

### CI/CD Pipeline

The project can use GitHub and Netlify for deployment flow:

1. **On Push:** Run linting and project checks.
2. **On Pull Request:** Preview deployment is generated for review.
3. **On Merge to Main:** Netlify deploys the production build and connects to the configured Supabase project.

---

## 8. Security Considerations

| Concern | Mitigation |
| --- | --- |
| Authentication Bypass | Supabase Auth verifies sessions and authenticated user identity |
| Authorization Bypass | Row Level Security policies restrict rows by role, ownership, enrollment, or advisor assignment |
| Unsafe Role Claims | Role decisions use application role/profile tables or trusted app metadata, not user-editable metadata |
| SQL Injection | Supabase client queries and parameterized SQL avoid string-built queries |
| Storage Exposure | Supabase Storage policies restrict lesson assets and submissions by role and relationship |
| Cross-Site Scripting | React escaping and controlled rendering of embedded content reduce XSS risk |
| Admin Misuse | `audit_log` and `moderation_action` record sensitive admin actions |
| Advisor Privacy | Advisor policies allow access only to assigned students or department-authorized data |
