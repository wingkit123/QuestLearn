-- ============================================================
-- QuestLearn Part III Evidence Queries (PostgreSQL / Supabase)
-- Purpose: Screenshot-ready SQL queries for Part III evidence
-- Run after:
--   1. ../part-ii/Database-Schema.sql
--   2. ./Supabase-Seed-Data.sql
-- ============================================================

-- DB-01 / DB-02: Schema and table count evidence
SELECT
    schemaname,
    COUNT(*) AS table_count
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
      'role', 'user', 'student_profile', 'instructor_profile', 'advisor_profile',
      'course', 'module', 'lesson', 'content_item', 'enrollment',
      'quiz', 'assignment', 'assignment_submission', 'question_bank', 'question',
      'quiz_question', 'quiz_attempt', 'attempt_answer', 'progress_record',
      'activity_log', 'advisor_student_assignment', 'advisor_alert',
      'advisor_follow_up', 'announcement', 'notification', 'moderation_action',
      'audit_log'
  )
GROUP BY schemaname;

-- DB-02: QuestLearn table list evidence
SELECT
    tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
      'role', 'user', 'student_profile', 'instructor_profile', 'advisor_profile',
      'course', 'module', 'lesson', 'content_item', 'enrollment',
      'quiz', 'assignment', 'assignment_submission', 'question_bank', 'question',
      'quiz_question', 'quiz_attempt', 'attempt_answer', 'progress_record',
      'activity_log', 'advisor_student_assignment', 'advisor_alert',
      'advisor_follow_up', 'announcement', 'notification', 'moderation_action',
      'audit_log'
  )
ORDER BY tablename;

-- DB-03: Role and profile seed evidence
SELECT
    r.role_name,
    u.full_name,
    u.email,
    u.account_status,
    COALESCE(sp.student_no, ip.staff_no, ap.staff_no, 'admin-account') AS profile_identifier,
    COALESCE(sp.department, ap.department, 'platform') AS department
FROM "user" u
JOIN role r ON u.role_id = r.role_id
LEFT JOIN student_profile sp ON u.user_id = sp.user_id
LEFT JOIN instructor_profile ip ON u.user_id = ip.user_id
LEFT JOIN advisor_profile ap ON u.user_id = ap.user_id
WHERE u.email LIKE '%.questlearn@example.com'
ORDER BY r.role_name, u.full_name;

-- DB-04: Course, module, lesson, and content evidence
SELECT
    c.course_code,
    c.course_title,
    m.sequence_no AS module_no,
    m.module_title,
    l.sequence_no AS lesson_no,
    l.lesson_title,
    ci.sequence_no AS content_no,
    ci.content_type,
    ci.title AS content_title,
    ci.publish_status
FROM course c
JOIN module m ON c.course_id = m.course_id
JOIN lesson l ON m.module_id = l.module_id
LEFT JOIN content_item ci ON l.lesson_id = ci.lesson_id
WHERE c.course_code = 'QL-SEF101'
ORDER BY m.sequence_no, l.sequence_no, ci.sequence_no;

-- DB-04: Enrollment and assignment evidence
SELECT
    u.full_name AS student_name,
    c.course_code,
    c.course_title,
    e.status AS enrollment_status,
    a.assignment_title,
    a.deadline,
    asub.status AS submission_status,
    asub.score
FROM enrollment e
JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
JOIN course c ON e.course_id = c.course_id
LEFT JOIN assignment a ON c.course_id = a.course_id
LEFT JOIN assignment_submission asub
    ON a.assignment_id = asub.assignment_id
   AND sp.student_profile_id = asub.student_profile_id
WHERE sp.student_no = 'QL-STU-001'
ORDER BY a.deadline;

-- DB-05: Quiz attempt, answers, and feedback evidence
SELECT
    u.full_name AS student_name,
    qz.quiz_title,
    qa.score,
    qa.max_score,
    ROUND((qa.score / NULLIF(qa.max_score, 0)) * 100, 1) AS percentage_score,
    qa.feedback_summary,
    q.question_type,
    q.prompt,
    aa.student_answer,
    aa.is_correct,
    aa.points_earned,
    q.explanation
FROM quiz_attempt qa
JOIN student_profile sp ON qa.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
JOIN quiz qz ON qa.quiz_id = qz.quiz_id
JOIN attempt_answer aa ON qa.attempt_id = aa.attempt_id
JOIN question q ON aa.question_id = q.question_id
WHERE sp.student_no = 'QL-STU-001'
  AND qz.quiz_title = 'Use Case and Architecture Check'
ORDER BY aa.attempt_answer_id;

-- DB-05 / Activity tracking: Student progress and engagement evidence
SELECT
    u.full_name AS student_name,
    c.course_code,
    m.module_title,
    l.lesson_title,
    pr.completion_status,
    pr.percentage,
    COUNT(al.activity_log_id) AS activity_events,
    COALESCE(SUM(al.duration_seconds), 0) AS total_duration_seconds
FROM progress_record pr
JOIN student_profile sp ON pr.student_profile_id = sp.student_profile_id
JOIN "user" u ON sp.user_id = u.user_id
JOIN lesson l ON pr.lesson_id = l.lesson_id
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
LEFT JOIN activity_log al
    ON al.user_id = u.user_id
   AND al.target_id = l.lesson_id
   AND al.target_type = 'lesson'
WHERE sp.student_no = 'QL-STU-001'
GROUP BY u.full_name, c.course_code, m.module_title, l.lesson_title, pr.completion_status, pr.percentage, m.sequence_no, l.sequence_no
ORDER BY m.sequence_no, l.sequence_no;

-- DB-06: Advisor assignment, alert, and follow-up evidence
SELECT
    advisor_user.full_name AS advisor_name,
    student_user.full_name AS student_name,
    asa.status AS assignment_status,
    aa.alert_type,
    aa.severity,
    aa.status AS alert_status,
    aa.message AS alert_message,
    afu.follow_up_type,
    afu.message AS follow_up_message,
    afu.next_action
FROM advisor_student_assignment asa
JOIN advisor_profile ap ON asa.advisor_profile_id = ap.advisor_profile_id
JOIN "user" advisor_user ON ap.user_id = advisor_user.user_id
JOIN student_profile sp ON asa.student_profile_id = sp.student_profile_id
JOIN "user" student_user ON sp.user_id = student_user.user_id
LEFT JOIN advisor_alert aa
    ON aa.advisor_profile_id = ap.advisor_profile_id
   AND aa.student_profile_id = sp.student_profile_id
LEFT JOIN advisor_follow_up afu
    ON afu.advisor_alert_id = aa.advisor_alert_id
WHERE ap.staff_no = 'QL-ADV-001'
  AND sp.student_no = 'QL-STU-001'
ORDER BY aa.created_at DESC, afu.follow_up_at DESC;

-- DB-07: Announcement and notification evidence
SELECT
    recipient.full_name AS recipient_name,
    recipient.email,
    a.title AS announcement_title,
    a.scope,
    n.message AS notification_message,
    n.is_read,
    n.sent_at
FROM notification n
JOIN "user" recipient ON n.user_id = recipient.user_id
LEFT JOIN announcement a ON n.announcement_id = a.announcement_id
WHERE recipient.email IN ('student.questlearn@example.com', 'advisor.questlearn@example.com')
ORDER BY n.sent_at DESC;

-- DB-07: Admin moderation and audit evidence
SELECT
    admin_user.full_name AS admin_name,
    ma.target_type,
    ma.target_id,
    ma.action_type,
    ma.reason,
    al.action_type AS audit_action,
    al.summary AS audit_summary,
    al.metadata
FROM moderation_action ma
JOIN "user" admin_user ON ma.admin_user_id = admin_user.user_id
LEFT JOIN audit_log al
    ON al.target_type = ma.target_type
   AND al.target_id = ma.target_id
WHERE admin_user.email = 'admin.questlearn@example.com'
ORDER BY ma.action_at DESC;

-- Acceptance evidence: one-row dashboard summary for final report
SELECT
    (SELECT COUNT(*) FROM "user" WHERE email LIKE '%.questlearn@example.com') AS demo_users,
    (SELECT COUNT(*) FROM course WHERE course_code = 'QL-SEF101') AS demo_courses,
    (SELECT COUNT(*) FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101') AS demo_lessons,
    (SELECT COUNT(*) FROM quiz_attempt qa JOIN student_profile sp ON qa.student_profile_id = sp.student_profile_id WHERE sp.student_no = 'QL-STU-001') AS demo_quiz_attempts,
    (SELECT COUNT(*) FROM advisor_alert aa JOIN student_profile sp ON aa.student_profile_id = sp.student_profile_id WHERE sp.student_no = 'QL-STU-001') AS demo_advisor_alerts,
    (SELECT COUNT(*) FROM notification n JOIN "user" u ON n.user_id = u.user_id WHERE u.email LIKE '%.questlearn@example.com') AS demo_notifications,
    (SELECT COUNT(*) FROM activity_log al JOIN "user" u ON al.user_id = u.user_id WHERE u.email = 'student.questlearn@example.com') AS demo_activity_events;

-- ============================================================
-- END OF EVIDENCE QUERIES
-- ============================================================
