# Part II — Database Design

## 1. Schema Overview

The QuestLearn database is organized into four logical entity groups that reflect the domain model established in Part I. The schema uses PostgreSQL and follows Third Normal Form (3NF) to ensure data integrity and minimize redundancy.

### Entity Groups

| Group | Entities | Purpose |
|-------|----------|---------|
| Identity & Access | `role`, `user`, `student_profile`, `instructor_profile`, `advisor_profile` | Authentication, role-based access control, and profile storage |
| Learning Structure | `course`, `module`, `lesson`, `content_item`, `enrollment` | Course hierarchy, lesson content, H5P/Lumi embeds, and student-course relationships |
| Assessment & Performance | `quiz`, `assignment`, `assignment_submission`, `question_bank`, `question`, `quiz_question`, `quiz_attempt`, `attempt_answer`, `progress_record` | Assessments, grading, and progress tracking |
| Support & Analytics | `activity_log`, `advisor_student_assignment`, `advisor_alert`, `advisor_follow_up`, `announcement`, `notification`, `moderation_action`, `audit_log` | User engagement tracking, advisor intervention, communication, moderation, and auditability |

> Figure 2.1: Entity Relationship Diagram for QuestLearn — see exported ERD diagram.

The complete DDL schema is provided in [Database-Schema.sql](./Database-Schema.sql).

---

## 2. Normalization Rationale

The database schema adheres to Third Normal Form (3NF) to prevent data anomalies and support reliable data operations.

**First Normal Form (1NF):** All columns contain atomic values. For example, `instructor_profile.subjects_taught` stores a single text field rather than a nested array structure; if future requirements demand individual subject tracking, a separate `subject` table would be introduced.

**Second Normal Form (2NF):** All non-key attributes depend on the full primary key. For bridge tables such as `enrollment` and `quiz_question`, the combination of foreign keys is enforced with a `UNIQUE` constraint, and a surrogate primary key is used for referential simplicity.

**Third Normal Form (3NF):** No transitive dependencies exist. For example, the student's `department` is stored in `student_profile` rather than being derived from a separate `programme → department` lookup, because the project scope treats department as a direct student attribute. If the domain model expands to include a formal programme-department hierarchy, the schema can be normalized further without breaking existing queries.

### Key Design Decision: Separate Profile Tables

Rather than storing all user attributes in a single table, the schema uses three profile tables (`student_profile`, `instructor_profile`, `advisor_profile`) linked to the base `user` table through a `UNIQUE` foreign key. This approach provides several benefits:

1. **Role-specific attributes** are isolated — student academic data does not clutter instructor records.
2. **Sparse columns are avoided** — a single `user` table would have many NULL columns depending on role.
3. **Query efficiency** — role-specific queries join only the relevant profile table.
4. **Extensibility** — new role-specific fields can be added without affecting other profiles.

---

## 3. Key Constraints and Business Rules

The schema enforces the following business rules through database-level constraints.

### Referential Integrity

All foreign key constraints use appropriate `ON DELETE` actions:

| Relationship | ON DELETE Action | Rationale |
|---|---|---|
| `user` → `student_profile` | CASCADE | Deleting a user removes their profile |
| `course` → `module` → `lesson` | CASCADE | Deleting a course removes all nested content |
| `quiz` → `quiz_attempt` | No CASCADE | Attempts are historical records and should be preserved |
| `assignment` → `lesson` | SET NULL | An assignment may exist independently of a lesson |

### Check Constraints

| Table | Constraint | Business Rule |
|---|---|---|
| `role` | `role_name IN ('Student', ...)` | Only the four defined roles are permitted |
| `user` | `account_status IN ('pending', 'active', ...)` | Users must be in a valid account state |
| `course` | `status IN ('draft', ...)` | Courses follow a defined lifecycle |
| `quiz` | `total_marks > 0` | A quiz must have a positive total mark allocation |
| `progress_record` | `percentage BETWEEN 0 AND 100` | Progress cannot exceed 100% or be negative |
| `question` | `difficulty IN ('easy', ...)` | Questions use a fixed difficulty scale |
| `question` | `points > 0` | Every question must carry at least 1 point |

### Unique Constraints

| Table | Unique On | Business Rule |
|---|---|---|
| `user` | `email` | Each email address can only be registered once |
| `course` | `course_code` | Course codes are institution-unique identifiers |
| `enrollment` | `(student_profile_id, course_id)` | A student cannot enroll in the same course twice |
| `progress_record` | `(student_profile_id, lesson_id)` | One progress record per student per lesson |
| `module` | `(course_id, sequence_no)` | Module ordering within a course is unique |
| `content_item` | `(lesson_id, sequence_no)` | Content ordering within a lesson is unique |
| `advisor_student_assignment` | `(advisor_profile_id, student_profile_id)` | A student-advisor assignment cannot be duplicated |

### Indexes

Performance-critical indexes are created on columns that support frequent lookup and filtering operations:

| Index | Table | Purpose |
|---|---|---|
| `idx_user_email` | `user` | Fast login lookup by email |
| `idx_course_instructor` | `course` | Instructor dashboard queries |
| `idx_enrollment_student` | `enrollment` | Student's enrolled courses |
| `idx_attempt_student` | `quiz_attempt` | Student grade history |
| `idx_activity_user` | `activity_log` | User engagement analytics |
| `idx_activity_time` | `activity_log` | Time-range analytics queries |
| `idx_notification_user` | `notification` | Notification inbox queries |
| `idx_assignment_deadline` | `assignment` | Overdue assignment detection |
| `idx_content_item_lesson` | `content_item` | Lesson viewer content loading |
| `idx_advisor_alert_status` | `advisor_alert` | Open alert queues for advisors |
| `idx_moderation_target` | `moderation_action` | Admin moderation history lookups |
| `idx_audit_target` | `audit_log` | Sensitive action audit review |

---

## 4. Sample SQL Queries

The following queries demonstrate how the schema supports the required system operations. Each query corresponds to a specific functional requirement from Part I.

### 4.1 CRUD Operations

**Create a new student enrollment:**
```sql
INSERT INTO enrollment (student_profile_id, course_id)
VALUES (1, 1);
```

**Update a student's lesson progress:**
```sql
INSERT INTO progress_record (student_profile_id, lesson_id, completion_status, percentage)
VALUES (1, 3, 'in_progress', 40)
ON CONFLICT (student_profile_id, lesson_id)
DO UPDATE SET completion_status = EXCLUDED.completion_status,
              percentage = EXCLUDED.percentage,
              updated_at = CURRENT_TIMESTAMP;
```

**Soft-delete a user by deactivating:**
```sql
UPDATE "user" SET account_status = 'deactivated' WHERE user_id = 5;
```

### 4.2 JOIN Queries

**Get published H5P/Lumi activities for a lesson (UC-06 support):**
```sql
SELECT title, embed_url, sequence_no
FROM content_item
WHERE lesson_id = 1
  AND content_type = 'h5p_lumi'
  AND publish_status = 'published'
ORDER BY sequence_no;
```

**Get all students enrolled in a course with their profiles (UC-05 support):**
```sql
SELECT u.full_name, sp.student_no, sp.programme, e.enrolled_at
FROM enrollment e
JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
WHERE e.course_id = 1 AND e.status = 'active'
ORDER BY u.full_name;
```

**Get a student's complete quiz history with course context (UC-03 support):**
```sql
SELECT c.course_title, l.lesson_title, q.quiz_title,
       qa.score, qa.max_score, qa.submitted_at
FROM quiz_attempt qa
JOIN quiz q ON qa.quiz_id = q.quiz_id
JOIN lesson l ON q.lesson_id = l.lesson_id
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
WHERE qa.student_profile_id = 1
ORDER BY qa.submitted_at DESC;
```

### 4.3 Aggregation Queries

**Average quiz score per course (Instructor analytics):**
```sql
SELECT c.course_title,
       ROUND(AVG(qa.score), 2) AS avg_score,
       COUNT(qa.attempt_id) AS total_attempts
FROM quiz_attempt qa
JOIN quiz q ON qa.quiz_id = q.quiz_id
JOIN lesson l ON q.lesson_id = l.lesson_id
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
GROUP BY c.course_id, c.course_title
ORDER BY avg_score DESC;
```

**Platform-wide statistics for admin dashboard (UC-09 support):**
```sql
SELECT
  (SELECT COUNT(*) FROM "user") AS total_users,
  (SELECT COUNT(*) FROM "user" WHERE account_status = 'active') AS active_users,
  (SELECT COUNT(*) FROM course WHERE status = 'active') AS active_courses,
  (SELECT COUNT(*) FROM quiz_attempt
   WHERE submitted_at >= CURRENT_DATE - INTERVAL '7 days') AS quiz_attempts_this_week;
```

### 4.4 Analytics Queries

**Weak-topic analysis from quiz attempt (UC-03 innovation support):**
```sql
SELECT q.prompt, q.question_type, aa.student_answer,
       aa.is_correct, q.explanation
FROM attempt_answer aa
JOIN question q ON aa.question_id = q.question_id
WHERE aa.attempt_id = 1 AND aa.is_correct = FALSE
ORDER BY aa.attempt_answer_id;
```

**Students with low progress for advisor follow-up (UC-08 support):**
```sql
SELECT aa.advisor_alert_id, u.full_name, sp.student_no,
       aa.alert_type, aa.severity, aa.message, aa.created_at
FROM advisor_alert aa
JOIN student_profile sp ON aa.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
WHERE aa.advisor_profile_id = 1
  AND aa.status = 'open'
ORDER BY aa.severity DESC, aa.created_at ASC;
```

**Overdue assignments for advisor dashboard (UC-08 support):**
```sql
SELECT u.full_name, a.assignment_title, a.deadline, c.course_title
FROM assignment a
JOIN course c ON a.course_id = c.course_id
JOIN enrollment e ON c.course_id = e.course_id AND e.status = 'active'
JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
LEFT JOIN assignment_submission asub
  ON a.assignment_id = asub.assignment_id
  AND sp.student_profile_id = asub.student_profile_id
WHERE a.deadline < CURRENT_TIMESTAMP
  AND asub.submission_id IS NULL
ORDER BY a.deadline ASC;
```

**Record advisor follow-up and link it to an alert (UC-08 support):**
```sql
INSERT INTO advisor_follow_up
    (advisor_alert_id, advisor_profile_id, student_profile_id, follow_up_type, message, next_action)
VALUES
    (1, 1, 1, 'message', 'Please review Module 2 and attend consultation this week.', 'Check progress again in 7 days');

UPDATE advisor_alert
SET status = 'reviewed'
WHERE advisor_alert_id = 1;
```

**Review admin moderation and audit history (UC-09 support):**
```sql
SELECT ma.action_type, ma.target_type, ma.target_id, ma.reason,
       al.summary AS audit_summary, ma.action_at
FROM moderation_action ma
LEFT JOIN audit_log al
  ON al.target_type = ma.target_type
 AND al.target_id = ma.target_id
WHERE ma.target_type = 'content_item'
  AND ma.target_id = 1
ORDER BY ma.action_at DESC;
```

### 4.5 Student Activity Engagement (Activity tracking support)

```sql
SELECT activity_type, COUNT(*) AS event_count,
       ROUND(AVG(duration_seconds), 1) AS avg_duration_sec
FROM activity_log
WHERE user_id = 1
  AND activity_time >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY activity_type
ORDER BY event_count DESC;
```

---

## 5. Performance Considerations

### Indexing Strategy

The schema creates targeted indexes on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses of the most common queries. Composite indexes are avoided at this stage to maintain insert performance; they can be introduced during performance tuning if specific query patterns demand them.

### Query Optimization Notes

1. **Pagination** — Dashboard queries should use `LIMIT` and `OFFSET` or keyset pagination to avoid loading full result sets.
2. **Supabase Query Efficiency** — Frequently accessed reference data such as roles and course lists should be fetched with selective columns and server-side filters through Supabase clients.
3. **Materialized Views** — For analytics dashboards that display aggregated data, materialized views can pre-compute averages and counts, refreshed periodically rather than on every request.
4. **Managed Connection Pooling** — The prototype relies on Supabase's managed PostgreSQL platform and server-side Next.js access patterns rather than maintaining a separate application connection pool.

### Supabase Security Notes

The Part III Supabase project should enable Row Level Security on all public tables before exposing them through the Supabase Data API. Policies should be based on trusted role/profile tables, course ownership, enrollment, advisor assignment, and admin privileges. The `service_role` key must only be used in server-side environments, never in browser code. Storage buckets for lesson assets and assignment submissions should use policies that check course membership, instructor ownership, or admin access.

---

## 6. Requirements Traceability

Every functional requirement from Part I maps to one or more database tables:

| Requirement | Supporting Tables |
|---|---|
| Account registration and login (UC-01) | Supabase Auth identity, `user`, `role` |
| Profile management | `student_profile`, `instructor_profile`, `advisor_profile` |
| Course creation and management (UC-05) | `course`, `module`, `lesson`, `content_item` |
| Quiz management (UC-03, UC-07) | `quiz`, `question_bank`, `question`, `quiz_question` |
| Assignment management (UC-04, UC-07) | `assignment`, `assignment_submission` |
| Auto-grading and feedback | `quiz_attempt`, `attempt_answer` |
| Progress tracking (UC-02) | `progress_record` |
| Activity tracking | `activity_log` |
| Notifications | `notification`, `announcement` |
| H5P/Lumi content publishing (UC-06) | `lesson`, `content_item`, `activity_log` |
| Advisor monitoring (UC-08) | `advisor_student_assignment`, `advisor_alert`, `advisor_follow_up`, `student_profile`, `progress_record`, `activity_log` |
| Admin moderation (UC-09) | `moderation_action`, `audit_log`, `announcement`, `notification`, `user`, `content_item` |
