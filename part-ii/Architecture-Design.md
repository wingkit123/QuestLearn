# Part II — Architecture Design

## 1. Architecture Overview

QuestLearn adopts a multi-layer architecture that separates the system into four distinct layers: Presentation, Business Logic, Data Access, and External Integration. This architectural style was selected because it enforces clear separation of concerns, supports independent development and testing of each layer, and aligns with the academic requirement to demonstrate structured system design.

Each layer communicates only with its adjacent layers, which reduces coupling and allows components to be modified without affecting unrelated parts of the system. The following sections describe each layer in detail, identify the services within the business logic layer, and explain how the architecture supports the innovations and functional requirements documented in Part I.

> Figure 3.1: Multi-Layer Architecture Diagram — see exported architecture diagram.

---

## 2. Presentation Layer

The presentation layer handles all user-facing interfaces. It is implemented as a single-page application (SPA) using React.js, which communicates with the backend through REST API calls.

### Components

| Component | Description | Primary Actor |
|-----------|-------------|---------------|
| `LoginPage` | Registration and authentication forms with role selection | All |
| `StudentDashboard` | Progress cards, enrolled courses, recent grades, notifications | Student |
| `InstructorDashboard` | Course management, class performance charts, engagement metrics | Instructor |
| `AdvisorDashboard` | Department students list, progress summaries, follow-up tools | Academic Advisor |
| `AdminPanel` | User management, content moderation, announcements, platform analytics | Admin |
| `CourseViewer` | Module and lesson navigation with video player and reading content | Student |
| `QuizInterface` | Question display, timer, answer submission, navigation between questions | Student |
| `QuizResultsPage` | Score display, per-question feedback, weak topics, recommended next steps | Student |
| `AssessmentBuilder` | Quiz and assignment creation with question bank integration | Instructor |
| `GradesPage` | Assessment history, grade transcript, performance trends | Student |
| `ProfileSettings` | Profile editing for role-specific attributes | All |
| `NotificationInbox` | Notification list with read/unread filtering | All |

### Design Principles

1. **Component Reusability** — Common UI elements (navigation, cards, forms) are built as reusable components to maintain consistency across dashboards.
2. **Responsive Design** — All interfaces adapt to desktop, tablet, and mobile viewports using CSS media queries and Material UI's grid system.
3. **Role-Based Rendering** — The frontend uses the authenticated user's role to conditionally render navigation items and page access.

---

## 3. Business Logic Layer

The business logic layer contains nine services that encapsulate the core application logic. Each service is implemented as a separate module with well-defined responsibilities and interfaces.

### 3.1 AuthenticationService

**Responsibility:** User registration, login, session management, and access control.

**Key Operations:**
- `register(userData)` — Validate input, hash password with bcrypt, create user and profile records, assign role
- `login(email, password)` — Verify credentials, generate JWT token with role claims
- `validateToken(token)` — Decode and verify JWT, extract user identity and role
- `resetPassword(userId, newPassword)` — Admin-initiated password reset

**Dependencies:** UserService, database

### 3.2 UserService

**Responsibility:** Profile management, user status operations, and account administration.

**Key Operations:**
- `getProfile(userId)` — Retrieve user details with role-specific profile
- `updateProfile(userId, profileData)` — Update student/instructor/advisor profile attributes
- `listUsers(filters)` — Admin: list and filter users by role, status, department
- `toggleAccountStatus(userId, status)` — Admin: activate, suspend, or deactivate accounts

**Dependencies:** database

### 3.3 CourseService

**Responsibility:** Course, module, and lesson lifecycle management.

**Key Operations:**
- `createCourse(instructorId, courseData)` — Create course with code, title, department
- `addModule(courseId, moduleData)` — Add module with sequence ordering
- `addLesson(moduleId, lessonData)` — Add lesson with content and video URL
- `publishContent(targetId, targetType)` — Change publish status of lesson, module, or course
- `enrollStudent(studentProfileId, courseId)` — Create enrollment record

**Dependencies:** database, NotificationService

### 3.4 AssessmentService

**Responsibility:** Quiz and assignment creation, question bank management, and assessment configuration.

**Key Operations:**
- `createQuiz(lessonId, quizData)` — Create quiz with settings (time limit, randomization)
- `createAssignment(courseId, assignmentData)` — Create assignment with deadline and marks
- `addQuestionToBank(courseId, questionData)` — Add question with type, answer, explanation
- `configureQuiz(quizId, questionIds)` — Link questions to quiz, set sequence
- `publishAssessment(assessmentId, type)` — Make quiz or assignment available to students

**Dependencies:** CourseService, database

### 3.5 GradingService

**Responsibility:** Quiz auto-grading, score calculation, and feedback generation.

**Key Operations:**
- `submitQuizAttempt(studentId, quizId, answers)` — Store answers, auto-grade MCQ/fill-in-blank
- `calculateScore(attemptId)` — Sum points earned, compute percentage
- `generateFeedback(attemptId)` — Identify incorrect answers, extract explanations, detect weak topics
- `getRecommendedNextSteps(attemptId)` — Suggest lessons/topics based on weak areas

**Dependencies:** AssessmentService, ProgressService, database

### 3.6 ProgressService

**Responsibility:** Lesson completion tracking, module progress calculation, and dashboard data preparation.

**Key Operations:**
- `updateLessonProgress(studentId, lessonId, status, percentage)` — Track lesson completion
- `getModuleProgress(studentId, courseId)` — Calculate module-level completion percentages
- `getStudentDashboardData(studentId)` — Aggregate progress, grades, and recommendations
- `getInstructorAnalytics(courseId)` — Class performance and engagement metrics

**Dependencies:** database

### 3.7 NotificationService

**Responsibility:** Notification creation, delivery, and management.

**Key Operations:**
- `notifyDeadline(assignmentId)` — Send reminders for upcoming assignment deadlines
- `notifyNewContent(courseId, contentType)` — Alert enrolled students of new lessons
- `notifyQuizScore(attemptId)` — Inform student of quiz results
- `broadcastAnnouncement(announcementId)` — Create notifications for all targeted users
- `markAsRead(notificationId)` — Update notification read status

**Dependencies:** database

### 3.8 AnalyticsService

**Responsibility:** Engagement metrics, performance reports, and data aggregation for dashboards.

**Key Operations:**
- `logActivity(userId, activityType, targetType, targetId, duration)` — Record user engagement event
- `getEngagementMetrics(courseId)` — Course-level engagement charts data
- `getPerformanceDistribution(courseId)` — Quiz score distribution for instructor
- `getWeakTopics(studentId, courseId)` — Identify consistently low-scoring topics

**Dependencies:** database

### 3.9 AdvisorService

**Responsibility:** Student monitoring, progress review, and follow-up workflow support.

**Key Operations:**
- `getDepartmentStudents(department)` — List students in advisor's department
- `getStudentProgressSummary(studentProfileId)` — Aggregate progress, scores, overdue work
- `getOverdueAssignments(department)` — Find students with missing submissions
- `recordFollowUp(advisorId, studentId, message)` — Log advisor follow-up action

**Dependencies:** ProgressService, AnalyticsService, database

---

## 4. Data Access Layer

The data access layer manages all interactions between the business logic layer and the PostgreSQL database. It uses the Sequelize ORM (Node.js) to provide a consistent, type-safe interface for data operations.

### Repository Pattern

Each entity group has a dedicated repository module:

| Repository | Entities Managed |
|---|---|
| `UserRepository` | `user`, `role`, `student_profile`, `instructor_profile`, `advisor_profile` |
| `CourseRepository` | `course`, `module`, `lesson`, `enrollment` |
| `AssessmentRepository` | `quiz`, `assignment`, `question_bank`, `question`, `quiz_question` |
| `GradeRepository` | `quiz_attempt`, `attempt_answer`, `assignment_submission` |
| `ProgressRepository` | `progress_record` |
| `AnalyticsRepository` | `activity_log` |
| `CommunicationRepository` | `announcement`, `notification` |

### Connection Management

- **Connection Pooling:** The application uses `pg-pool` with a maximum of 20 connections to handle concurrent API requests without exhausting database resources.
- **Query Caching:** Redis is used to cache frequently read reference data (role definitions, course lists) and invalidate caches on write operations.

---

## 5. External Integration Layer

The external integration layer connects QuestLearn to third-party services that are not part of the core application logic.

| Integration | Purpose | Technology |
|---|---|---|
| Video Embedding | Display lesson videos within the course viewer | YouTube IFrame API |
| Email Delivery | Send registration confirmation and notification emails | SMTP (Nodemailer) |
| File Storage | Store assignment submission files | Local file system (prototype) / AWS S3 (production) |
| Authentication Tokens | Stateless session management | JWT (jsonwebtoken library) |

---

## 6. Architectural Innovations

### 6.1 Weak-Topic Detection Engine

When a student completes a quiz, the `GradingService` identifies incorrect answers and groups them by topic (derived from `question_bank` topics). The resulting weak-topic list is stored with the attempt and displayed as "Recommended Next Steps" on the student dashboard. This integration connects the following components:

```
QuizInterface → GradingService.submitQuizAttempt() → GradingService.generateFeedback()
→ ProgressService.getRecommendedNextSteps() → StudentDashboard
```

### 6.2 Advisor Early Alert System

The `AdvisorService` queries `progress_record` and `activity_log` data to surface students with declining performance or low engagement. The advisor dashboard presents these students with contextual summaries, enabling timely follow-up without requiring the advisor to manually track each student.

```
ActivityLog + ProgressRecord → AnalyticsService.getWeakTopics()
→ AdvisorService.getStudentProgressSummary() → AdvisorDashboard
```

### 6.3 Activity-Based Progress Analytics

The `AnalyticsService` records granular user actions (lesson views, video watch time, quiz attempts) in `activity_log` and aggregates them into engagement metrics visible on all role-specific dashboards. This provides insight beyond simple completion percentages.

```
UserInteraction → AnalyticsService.logActivity() → activity_log
→ AnalyticsService.getEngagementMetrics() → InstructorDashboard / AdvisorDashboard
```

---

## 7. Deployment Architecture

For the prototype phase, QuestLearn is deployed as a containerized application using Docker.

| Component | Container | Port |
|---|---|---|
| React Frontend | `questlearn-frontend` | 3000 |
| Node.js API | `questlearn-api` | 5000 |
| PostgreSQL | `questlearn-db` | 5432 |
| Redis Cache | `questlearn-cache` | 6379 |

> Figure 3.2: Deployment Architecture Diagram — see exported deployment diagram.

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration:
1. **On Push:** Run linting and unit tests
2. **On Pull Request:** Run integration tests and code coverage check
3. **On Merge to Main:** Build Docker images and deploy to staging

---

## 8. Security Considerations

| Concern | Mitigation |
|---|---|
| SQL Injection | Parameterized queries via Sequelize ORM |
| Cross-Site Scripting (XSS) | Input sanitization and React's built-in escaping |
| Authentication Bypass | JWT verification middleware on all protected routes |
| Authorization Bypass | Role-based middleware checking user role before route access |
| Password Exposure | bcrypt hashing with salt rounds ≥ 10 |
| Session Hijacking | Short-lived JWT tokens (1 hour expiry) with refresh token rotation |
