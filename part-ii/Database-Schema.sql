-- ============================================================
-- QuestLearn Database Schema (PostgreSQL)
-- Version 1.0 — Part II Design Deliverable
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. IDENTITY AND ACCESS
-- ────────────────────────────────────────────────────────────

-- Stores the system roles used for access control.
CREATE TABLE role (
    role_id       SERIAL PRIMARY KEY,
    role_name     VARCHAR(50) NOT NULL UNIQUE
        CHECK (role_name IN ('Student', 'Instructor', 'Academic Advisor', 'Admin'))
);

-- Stores the shared login and identity details for all platform users.
CREATE TABLE "user" (
    user_id        SERIAL PRIMARY KEY,
    auth_user_id   UUID UNIQUE,
    role_id        INT NOT NULL REFERENCES role(role_id),
    full_name      VARCHAR(150) NOT NULL,
    email          VARCHAR(255) NOT NULL UNIQUE,
    account_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (account_status IN ('pending', 'active', 'suspended', 'deactivated')),
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_user_role  ON "user"(role_id);

-- Stores student-specific profile information.
CREATE TABLE student_profile (
    student_profile_id  SERIAL PRIMARY KEY,
    user_id             INT NOT NULL UNIQUE REFERENCES "user"(user_id) ON DELETE CASCADE,
    student_no          VARCHAR(30) NOT NULL UNIQUE,
    academic_level      VARCHAR(50),
    programme           VARCHAR(100),
    department          VARCHAR(100),
    learning_preference VARCHAR(50)
        CHECK (learning_preference IN ('visual', 'auditory', 'reading', 'kinesthetic', NULL))
);

-- Stores instructor-specific teaching and contact information.
CREATE TABLE instructor_profile (
    instructor_profile_id  SERIAL PRIMARY KEY,
    user_id                INT NOT NULL UNIQUE REFERENCES "user"(user_id) ON DELETE CASCADE,
    staff_no               VARCHAR(30) NOT NULL UNIQUE,
    specialization         VARCHAR(200),
    subjects_taught        TEXT,
    office_hours           VARCHAR(200)
);

-- Stores academic advisor details for student monitoring and follow-up.
CREATE TABLE advisor_profile (
    advisor_profile_id  SERIAL PRIMARY KEY,
    user_id             INT NOT NULL UNIQUE REFERENCES "user"(user_id) ON DELETE CASCADE,
    staff_no            VARCHAR(30) NOT NULL UNIQUE,
    department          VARCHAR(100),
    office_hours        VARCHAR(200)
);

-- ────────────────────────────────────────────────────────────
-- 2. LEARNING STRUCTURE
-- ────────────────────────────────────────────────────────────

-- Represents a course created and managed by an instructor.
CREATE TABLE course (
    course_id              SERIAL PRIMARY KEY,
    instructor_profile_id  INT NOT NULL REFERENCES instructor_profile(instructor_profile_id),
    course_code            VARCHAR(20) NOT NULL UNIQUE,
    course_title           VARCHAR(200) NOT NULL,
    description            TEXT,
    department             VARCHAR(100),
    status                 VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'active', 'completed', 'archived')),
    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_instructor ON course(instructor_profile_id);
CREATE INDEX idx_course_status     ON course(status);

-- Divides a course into smaller learning units.
CREATE TABLE module (
    module_id      SERIAL PRIMARY KEY,
    course_id      INT NOT NULL REFERENCES course(course_id) ON DELETE CASCADE,
    module_title   VARCHAR(200) NOT NULL,
    sequence_no    INT NOT NULL,
    description    TEXT,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'unpublished'
        CHECK (publish_status IN ('unpublished', 'published')),
    UNIQUE (course_id, sequence_no)
);

-- Represents an individual lesson within a module.
CREATE TABLE lesson (
    lesson_id      SERIAL PRIMARY KEY,
    module_id      INT NOT NULL REFERENCES module(module_id) ON DELETE CASCADE,
    lesson_title   VARCHAR(200) NOT NULL,
    lesson_type    VARCHAR(20) NOT NULL DEFAULT 'mixed'
        CHECK (lesson_type IN ('video', 'reading', 'mixed')),
    content_text   TEXT,
    video_url      VARCHAR(500),
    sequence_no    INT NOT NULL,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'unpublished'
        CHECK (publish_status IN ('unpublished', 'published')),
    UNIQUE (module_id, sequence_no)
);

-- Stores lesson content blocks, including reading, video, file, and H5P/Lumi embed items.
CREATE TABLE content_item (
    content_item_id  SERIAL PRIMARY KEY,
    lesson_id        INT NOT NULL REFERENCES lesson(lesson_id) ON DELETE CASCADE,
    content_type     VARCHAR(20) NOT NULL
        CHECK (content_type IN ('reading', 'video', 'file', 'h5p_lumi')),
    title            VARCHAR(200) NOT NULL,
    body_text        TEXT,
    resource_url     VARCHAR(500),
    storage_path     VARCHAR(500),
    embed_url        VARCHAR(500),
    sequence_no      INT NOT NULL,
    publish_status   VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (publish_status IN ('draft', 'published', 'archived')),
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (lesson_id, sequence_no)
);

CREATE INDEX idx_content_item_lesson ON content_item(lesson_id);
CREATE INDEX idx_content_item_type   ON content_item(content_type);

-- Maps students to courses (many-to-many bridge table).
CREATE TABLE enrollment (
    enrollment_id       SERIAL PRIMARY KEY,
    student_profile_id  INT NOT NULL REFERENCES student_profile(student_profile_id),
    course_id           INT NOT NULL REFERENCES course(course_id),
    enrolled_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status              VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'withdrawn', 'completed')),
    UNIQUE (student_profile_id, course_id)
);

CREATE INDEX idx_enrollment_student ON enrollment(student_profile_id);
CREATE INDEX idx_enrollment_course  ON enrollment(course_id);

-- ────────────────────────────────────────────────────────────
-- 3. ASSESSMENT AND PERFORMANCE
-- ────────────────────────────────────────────────────────────

-- Represents a quiz attached to a lesson.
CREATE TABLE quiz (
    quiz_id        SERIAL PRIMARY KEY,
    lesson_id      INT NOT NULL REFERENCES lesson(lesson_id) ON DELETE CASCADE,
    quiz_title     VARCHAR(200) NOT NULL,
    total_marks    INT NOT NULL CHECK (total_marks > 0),
    time_limit     INT,                          -- in minutes, NULL = no limit
    randomized     BOOLEAN NOT NULL DEFAULT FALSE,
    publish_status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (publish_status IN ('draft', 'published', 'closed', 'archived'))
);

-- Represents a course-level or lesson-level assignment.
CREATE TABLE assignment (
    assignment_id   SERIAL PRIMARY KEY,
    course_id       INT NOT NULL REFERENCES course(course_id) ON DELETE CASCADE,
    lesson_id       INT REFERENCES lesson(lesson_id) ON DELETE SET NULL,
    assignment_title VARCHAR(200) NOT NULL,
    description     TEXT,
    deadline        TIMESTAMP NOT NULL,
    total_marks     INT NOT NULL CHECK (total_marks > 0),
    publish_status  VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (publish_status IN ('draft', 'published', 'closed')),
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assignment_course  ON assignment(course_id);
CREATE INDEX idx_assignment_deadline ON assignment(deadline);

-- Stores student assignment submissions and evaluation details.
CREATE TABLE assignment_submission (
    submission_id       SERIAL PRIMARY KEY,
    assignment_id       INT NOT NULL REFERENCES assignment(assignment_id) ON DELETE CASCADE,
    student_profile_id  INT NOT NULL REFERENCES student_profile(student_profile_id),
    submitted_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submission_url      VARCHAR(500),
    status              VARCHAR(20) NOT NULL DEFAULT 'submitted'
        CHECK (status IN ('submitted', 'under_review', 'graded', 'returned')),
    score               NUMERIC(5,2) CHECK (score >= 0),
    feedback            TEXT,
    UNIQUE (assignment_id, student_profile_id)
);

-- Groups reusable questions for quiz creation.
CREATE TABLE question_bank (
    question_bank_id  SERIAL PRIMARY KEY,
    course_id         INT NOT NULL REFERENCES course(course_id) ON DELETE CASCADE,
    bank_name         VARCHAR(200) NOT NULL,
    description       TEXT,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE
);

-- Stores individual question items.
CREATE TABLE question (
    question_id       SERIAL PRIMARY KEY,
    question_bank_id  INT NOT NULL REFERENCES question_bank(question_bank_id) ON DELETE CASCADE,
    question_type     VARCHAR(20) NOT NULL
        CHECK (question_type IN ('mcq', 'fill_in_blank', 'short_answer')),
    prompt            TEXT NOT NULL,
    correct_answer    TEXT NOT NULL,
    explanation       TEXT,
    difficulty        VARCHAR(10) DEFAULT 'medium'
        CHECK (difficulty IN ('easy', 'medium', 'hard')),
    points            INT NOT NULL DEFAULT 1 CHECK (points > 0)
);

-- Bridge table linking quizzes to questions (supports randomized selection).
CREATE TABLE quiz_question (
    quiz_question_id  SERIAL PRIMARY KEY,
    quiz_id           INT NOT NULL REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    question_id       INT NOT NULL REFERENCES question(question_id),
    sequence_no       INT,
    UNIQUE (quiz_id, question_id)
);

-- Stores a student's submitted quiz attempt.
CREATE TABLE quiz_attempt (
    attempt_id          SERIAL PRIMARY KEY,
    quiz_id             INT NOT NULL REFERENCES quiz(quiz_id),
    student_profile_id  INT NOT NULL REFERENCES student_profile(student_profile_id),
    score               NUMERIC(5,2) CHECK (score >= 0),
    max_score           INT,
    submitted_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    feedback_summary    TEXT
);

CREATE INDEX idx_attempt_student ON quiz_attempt(student_profile_id);
CREATE INDEX idx_attempt_quiz    ON quiz_attempt(quiz_id);

-- Stores each answer submitted as part of a quiz attempt.
CREATE TABLE attempt_answer (
    attempt_answer_id  SERIAL PRIMARY KEY,
    attempt_id         INT NOT NULL REFERENCES quiz_attempt(attempt_id) ON DELETE CASCADE,
    question_id        INT NOT NULL REFERENCES question(question_id),
    student_answer     TEXT,
    is_correct         BOOLEAN,
    points_earned      NUMERIC(5,2) DEFAULT 0
);

-- Tracks a student's learning progress at lesson level.
CREATE TABLE progress_record (
    progress_record_id  SERIAL PRIMARY KEY,
    student_profile_id  INT NOT NULL REFERENCES student_profile(student_profile_id),
    lesson_id           INT NOT NULL REFERENCES lesson(lesson_id),
    completion_status   VARCHAR(20) NOT NULL DEFAULT 'not_started'
        CHECK (completion_status IN ('not_started', 'in_progress', 'completed')),
    percentage          INT NOT NULL DEFAULT 0 CHECK (percentage BETWEEN 0 AND 100),
    updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_profile_id, lesson_id)
);

-- ────────────────────────────────────────────────────────────
-- 4. SUPPORT AND ANALYTICS
-- ────────────────────────────────────────────────────────────

-- Records user actions and engagement events for analytics.
CREATE TABLE activity_log (
    activity_log_id  SERIAL PRIMARY KEY,
    user_id          INT NOT NULL REFERENCES "user"(user_id),
    activity_type    VARCHAR(50) NOT NULL,
    target_type      VARCHAR(50),
    target_id        INT,
    duration_seconds INT,
    metadata         JSONB,
    activity_time    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_user      ON activity_log(user_id);
CREATE INDEX idx_activity_time      ON activity_log(activity_time);
CREATE INDEX idx_activity_type      ON activity_log(activity_type);

-- Maps advisors to students for monitoring and early intervention.
CREATE TABLE advisor_student_assignment (
    advisor_student_assignment_id SERIAL PRIMARY KEY,
    advisor_profile_id            INT NOT NULL REFERENCES advisor_profile(advisor_profile_id) ON DELETE CASCADE,
    student_profile_id            INT NOT NULL REFERENCES student_profile(student_profile_id) ON DELETE CASCADE,
    assigned_at                   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status                        VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),
    UNIQUE (advisor_profile_id, student_profile_id)
);

CREATE INDEX idx_advisor_assignment_advisor ON advisor_student_assignment(advisor_profile_id);
CREATE INDEX idx_advisor_assignment_student ON advisor_student_assignment(student_profile_id);

-- Stores advisor-facing risk alerts generated from progress, assessment, and activity signals.
CREATE TABLE advisor_alert (
    advisor_alert_id   SERIAL PRIMARY KEY,
    student_profile_id INT NOT NULL REFERENCES student_profile(student_profile_id) ON DELETE CASCADE,
    advisor_profile_id INT REFERENCES advisor_profile(advisor_profile_id) ON DELETE SET NULL,
    alert_type         VARCHAR(30) NOT NULL
        CHECK (alert_type IN ('low_progress', 'overdue_assignment', 'low_quiz_score', 'low_engagement')),
    severity           VARCHAR(10) NOT NULL DEFAULT 'medium'
        CHECK (severity IN ('low', 'medium', 'high')),
    source_type        VARCHAR(50),
    source_id          INT,
    message            TEXT NOT NULL,
    status             VARCHAR(20) NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'reviewed', 'resolved', 'dismissed')),
    created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at        TIMESTAMP
);

CREATE INDEX idx_advisor_alert_student ON advisor_alert(student_profile_id);
CREATE INDEX idx_advisor_alert_advisor ON advisor_alert(advisor_profile_id);
CREATE INDEX idx_advisor_alert_status  ON advisor_alert(status);

-- Stores advisor follow-up actions and notes linked to students and optional alerts.
CREATE TABLE advisor_follow_up (
    advisor_follow_up_id SERIAL PRIMARY KEY,
    advisor_alert_id     INT REFERENCES advisor_alert(advisor_alert_id) ON DELETE SET NULL,
    advisor_profile_id   INT NOT NULL REFERENCES advisor_profile(advisor_profile_id),
    student_profile_id   INT NOT NULL REFERENCES student_profile(student_profile_id),
    follow_up_type       VARCHAR(30) NOT NULL DEFAULT 'message'
        CHECK (follow_up_type IN ('message', 'meeting', 'email', 'call', 'note')),
    message              TEXT NOT NULL,
    next_action          TEXT,
    follow_up_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_advisor_follow_up_student ON advisor_follow_up(student_profile_id);
CREATE INDEX idx_advisor_follow_up_alert   ON advisor_follow_up(advisor_alert_id);

-- Stores platform or course announcements.
CREATE TABLE announcement (
    announcement_id    SERIAL PRIMARY KEY,
    user_id            INT NOT NULL REFERENCES "user"(user_id),
    title              VARCHAR(200) NOT NULL,
    message            TEXT NOT NULL,
    scope              VARCHAR(20) NOT NULL DEFAULT 'platform'
        CHECK (scope IN ('platform', 'course', 'department')),
    target_scope_id    INT,
    published_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status             VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('draft', 'active', 'archived'))
);

-- Stores in-app notifications delivered to users.
CREATE TABLE notification (
    notification_id  SERIAL PRIMARY KEY,
    user_id          INT NOT NULL REFERENCES "user"(user_id),
    announcement_id  INT REFERENCES announcement(announcement_id) ON DELETE SET NULL,
    message          TEXT NOT NULL,
    is_read          BOOLEAN NOT NULL DEFAULT FALSE,
    sent_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notification_user   ON notification(user_id);
CREATE INDEX idx_notification_read   ON notification(is_read);

-- Records admin moderation decisions for content, accounts, and announcements.
CREATE TABLE moderation_action (
    moderation_action_id SERIAL PRIMARY KEY,
    admin_user_id        INT NOT NULL REFERENCES "user"(user_id),
    target_type          VARCHAR(30) NOT NULL
        CHECK (target_type IN ('user', 'course', 'lesson', 'content_item', 'announcement')),
    target_id            INT NOT NULL,
    action_type          VARCHAR(30) NOT NULL
        CHECK (action_type IN ('approve', 'reject', 'flag', 'hide', 'restore', 'suspend')),
    reason               TEXT,
    action_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_moderation_target ON moderation_action(target_type, target_id);
CREATE INDEX idx_moderation_admin  ON moderation_action(admin_user_id);

-- Captures sensitive system actions for traceability and accountability.
CREATE TABLE audit_log (
    audit_log_id   SERIAL PRIMARY KEY,
    actor_user_id  INT REFERENCES "user"(user_id) ON DELETE SET NULL,
    action_type    VARCHAR(80) NOT NULL,
    target_type    VARCHAR(50),
    target_id      INT,
    summary        TEXT NOT NULL,
    metadata       JSONB,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_actor  ON audit_log(actor_user_id);
CREATE INDEX idx_audit_target ON audit_log(target_type, target_id);
CREATE INDEX idx_audit_time   ON audit_log(created_at);

-- Supabase RLS design note:
-- In the Part III Supabase project, enable RLS on all public tables and add
-- role, ownership, enrollment, advisor-assignment, and admin policies before
-- exposing tables through the Supabase Data API.

-- ============================================================
-- SAMPLE QUERIES
-- ============================================================

-- Q1: Get all students enrolled in a specific course with their profiles
-- SELECT u.full_name, sp.student_no, sp.programme, e.enrolled_at
-- FROM enrollment e
-- JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
-- JOIN "user" u ON sp.user_id = u.user_id
-- WHERE e.course_id = 1 AND e.status = 'active'
-- ORDER BY u.full_name;

-- Q2: Get a student's quiz scores with course and lesson context
-- SELECT c.course_title, l.lesson_title, q.quiz_title, qa.score, qa.max_score, qa.submitted_at
-- FROM quiz_attempt qa
-- JOIN quiz q ON qa.quiz_id = q.quiz_id
-- JOIN lesson l ON q.lesson_id = l.lesson_id
-- JOIN module m ON l.module_id = m.module_id
-- JOIN course c ON m.course_id = c.course_id
-- WHERE qa.student_profile_id = 1
-- ORDER BY qa.submitted_at DESC;

-- Q3: Calculate average quiz score per course
-- SELECT c.course_title, ROUND(AVG(qa.score), 2) AS avg_score, COUNT(qa.attempt_id) AS total_attempts
-- FROM quiz_attempt qa
-- JOIN quiz q ON qa.quiz_id = q.quiz_id
-- JOIN lesson l ON q.lesson_id = l.lesson_id
-- JOIN module m ON l.module_id = m.module_id
-- JOIN course c ON m.course_id = c.course_id
-- GROUP BY c.course_id, c.course_title
-- ORDER BY avg_score DESC;

-- Q4: Find students with low progress in advisor's department
-- SELECT u.full_name, sp.student_no, sp.programme,
--        ROUND(AVG(pr.percentage), 1) AS avg_completion
-- FROM student_profile sp
-- JOIN "user" u ON sp.user_id = u.user_id
-- JOIN progress_record pr ON sp.student_profile_id = pr.student_profile_id
-- WHERE sp.department = 'Computer Science'
-- GROUP BY sp.student_profile_id, u.full_name, sp.student_no, sp.programme
-- HAVING AVG(pr.percentage) < 50
-- ORDER BY avg_completion ASC;

-- Q5: Get quiz attempt with per-question breakdown (weak-topic analysis)
-- SELECT q.prompt, q.question_type, aa.student_answer, aa.is_correct, q.explanation
-- FROM attempt_answer aa
-- JOIN question q ON aa.question_id = q.question_id
-- WHERE aa.attempt_id = 1
-- ORDER BY aa.attempt_answer_id;

-- Q6: Count unread notifications per user
-- SELECT u.full_name, COUNT(n.notification_id) AS unread_count
-- FROM notification n
-- JOIN "user" u ON n.user_id = u.user_id
-- WHERE n.is_read = FALSE
-- GROUP BY u.user_id, u.full_name
-- ORDER BY unread_count DESC;

-- Q7: Instructor's class performance overview
-- SELECT u.full_name AS student_name,
--        COUNT(DISTINCT qa.attempt_id) AS quizzes_taken,
--        ROUND(AVG(qa.score), 2) AS avg_quiz_score,
--        COUNT(DISTINCT asub.submission_id) AS assignments_submitted
-- FROM enrollment e
-- JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
-- JOIN "user" u ON sp.user_id = u.user_id
-- LEFT JOIN quiz_attempt qa ON sp.student_profile_id = qa.student_profile_id
-- LEFT JOIN assignment_submission asub ON sp.student_profile_id = asub.student_profile_id
-- WHERE e.course_id = 1
-- GROUP BY sp.student_profile_id, u.full_name
-- ORDER BY avg_quiz_score DESC;

-- Q8: Get courses where average quiz score is below 60%
-- SELECT c.course_title, ROUND(AVG(qa.score / qa.max_score * 100), 1) AS avg_pct
-- FROM quiz_attempt qa
-- JOIN quiz q ON qa.quiz_id = q.quiz_id
-- JOIN lesson l ON q.lesson_id = l.lesson_id
-- JOIN module m ON l.module_id = m.module_id
-- JOIN course c ON m.course_id = c.course_id
-- WHERE qa.max_score > 0
-- GROUP BY c.course_id, c.course_title
-- HAVING AVG(qa.score / qa.max_score * 100) < 60;

-- Q9: Student activity summary (engagement analytics)
-- SELECT activity_type, COUNT(*) AS event_count,
--        ROUND(AVG(duration_seconds), 1) AS avg_duration_sec
-- FROM activity_log
-- WHERE user_id = 1
--   AND activity_time >= CURRENT_DATE - INTERVAL '30 days'
-- GROUP BY activity_type
-- ORDER BY event_count DESC;

-- Q10: Overdue assignments for advisor follow-up
-- SELECT u.full_name, a.assignment_title, a.deadline,
--        c.course_title, sp.department
-- FROM assignment a
-- JOIN course c ON a.course_id = c.course_id
-- JOIN enrollment e ON c.course_id = e.course_id AND e.status = 'active'
-- JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
-- JOIN "user" u ON sp.user_id = u.user_id
-- LEFT JOIN assignment_submission asub
--   ON a.assignment_id = asub.assignment_id
--   AND sp.student_profile_id = asub.student_profile_id
-- WHERE a.deadline < CURRENT_TIMESTAMP
--   AND asub.submission_id IS NULL
-- ORDER BY a.deadline ASC;

-- Q11: Module completion progress per student for a course
-- SELECT m.module_title, m.sequence_no,
--        COUNT(pr.progress_record_id) AS lessons_tracked,
--        SUM(CASE WHEN pr.completion_status = 'completed' THEN 1 ELSE 0 END) AS lessons_completed,
--        ROUND(AVG(pr.percentage), 1) AS avg_progress
-- FROM module m
-- JOIN lesson l ON m.module_id = l.module_id
-- LEFT JOIN progress_record pr ON l.lesson_id = pr.lesson_id AND pr.student_profile_id = 1
-- WHERE m.course_id = 1
-- GROUP BY m.module_id, m.module_title, m.sequence_no
-- ORDER BY m.sequence_no;

-- Q12: Platform-wide analytics for admin dashboard
-- SELECT
--   (SELECT COUNT(*) FROM "user") AS total_users,
--   (SELECT COUNT(*) FROM "user" WHERE account_status = 'active') AS active_users,
--   (SELECT COUNT(*) FROM course WHERE status = 'active') AS active_courses,
--   (SELECT COUNT(*) FROM quiz_attempt WHERE submitted_at >= CURRENT_DATE - INTERVAL '7 days') AS quiz_attempts_this_week,
--   (SELECT COUNT(*) FROM activity_log WHERE activity_time >= CURRENT_DATE - INTERVAL '7 days') AS activities_this_week;

-- Q13: H5P/Lumi content items for a lesson viewer
-- SELECT title, embed_url, sequence_no
-- FROM content_item
-- WHERE lesson_id = 1
--   AND content_type = 'h5p_lumi'
--   AND publish_status = 'published'
-- ORDER BY sequence_no;

-- Q14: Open advisor alerts with latest follow-up count
-- SELECT aa.advisor_alert_id, u.full_name, aa.alert_type, aa.severity, aa.status,
--        COUNT(afu.advisor_follow_up_id) AS follow_up_count
-- FROM advisor_alert aa
-- JOIN student_profile sp ON aa.student_profile_id = sp.student_profile_id
-- JOIN "user" u ON sp.user_id = u.user_id
-- LEFT JOIN advisor_follow_up afu ON aa.advisor_alert_id = afu.advisor_alert_id
-- WHERE aa.status = 'open'
-- GROUP BY aa.advisor_alert_id, u.full_name, aa.alert_type, aa.severity, aa.status
-- ORDER BY aa.severity DESC, aa.created_at ASC;

-- Q15: Admin moderation and audit history for a target record
-- SELECT ma.action_type, ma.target_type, ma.target_id, ma.reason, ma.action_at,
--        al.summary AS audit_summary
-- FROM moderation_action ma
-- LEFT JOIN audit_log al
--   ON al.target_type = ma.target_type
--   AND al.target_id = ma.target_id
-- WHERE ma.target_type = 'content_item'
--   AND ma.target_id = 1
-- ORDER BY ma.action_at DESC;

-- ============================================================
-- END OF SCHEMA
-- ============================================================
