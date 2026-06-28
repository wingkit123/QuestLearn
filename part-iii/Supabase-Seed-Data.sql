-- ============================================================
-- QuestLearn Part III Seed Data (PostgreSQL / Supabase)
-- Purpose: Minimum demo dataset for Part III prototype evidence
-- Baseline schema: ../part-ii/Database-Schema.sql
-- ============================================================

-- IMPORTANT:
-- The auth_user_id UUID values below are stable demo placeholders.
-- In a real Supabase Auth project, create the Auth users first and replace
-- these UUIDs with the matching auth.users.id values before relying on Auth
-- session/profile joins.

BEGIN;

INSERT INTO role (role_name)
VALUES
    ('Student'),
    ('Instructor'),
    ('Academic Advisor'),
    ('Admin')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO "user" (auth_user_id, role_id, full_name, email, account_status)
VALUES
    ('00000000-0000-0000-0000-000000000101', (SELECT role_id FROM role WHERE role_name = 'Student'), 'Demo Student', 'student@example.com', 'active'),
    ('00000000-0000-0000-0000-000000000102', (SELECT role_id FROM role WHERE role_name = 'Instructor'), 'Demo Instructor', 'instructor@example.com', 'active'),
    ('00000000-0000-0000-0000-000000000103', (SELECT role_id FROM role WHERE role_name = 'Academic Advisor'), 'Demo Advisor', 'advisor@example.com', 'active'),
    ('00000000-0000-0000-0000-000000000104', (SELECT role_id FROM role WHERE role_name = 'Admin'), 'Demo Admin', 'admin@example.com', 'active')
ON CONFLICT (email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role_id = EXCLUDED.role_id,
    account_status = EXCLUDED.account_status;

INSERT INTO student_profile (user_id, student_no, academic_level, programme, department, learning_preference)
VALUES (
    (SELECT user_id FROM "user" WHERE email = 'student@example.com'),
    'QL-STU-001',
    'Year 1',
    'Bachelor of Computer Science',
    'Computer Science',
    'visual'
)
ON CONFLICT (student_no) DO UPDATE SET
    academic_level = EXCLUDED.academic_level,
    programme = EXCLUDED.programme,
    department = EXCLUDED.department,
    learning_preference = EXCLUDED.learning_preference;

INSERT INTO instructor_profile (user_id, staff_no, specialization, subjects_taught, office_hours)
VALUES (
    (SELECT user_id FROM "user" WHERE email = 'instructor@example.com'),
    'QL-INS-001',
    'Software Engineering and Web Systems',
    'Software Engineering Fundamentals, Web Application Development',
    'Tuesday 10:00-12:00'
)
ON CONFLICT (staff_no) DO UPDATE SET
    specialization = EXCLUDED.specialization,
    subjects_taught = EXCLUDED.subjects_taught,
    office_hours = EXCLUDED.office_hours;

INSERT INTO advisor_profile (user_id, staff_no, department, office_hours)
VALUES (
    (SELECT user_id FROM "user" WHERE email = 'advisor@example.com'),
    'QL-ADV-001',
    'Computer Science',
    'Thursday 14:00-16:00'
)
ON CONFLICT (staff_no) DO UPDATE SET
    department = EXCLUDED.department,
    office_hours = EXCLUDED.office_hours;

INSERT INTO course (instructor_profile_id, course_code, course_title, description, department, status)
VALUES (
    (SELECT instructor_profile_id FROM instructor_profile WHERE staff_no = 'QL-INS-001'),
    'QL-SEF101',
    'Software Engineering Fundamentals',
    'Demo course for QuestLearn short lessons, quizzes, progress analytics, and advisor support.',
    'Computer Science',
    'active'
)
ON CONFLICT (course_code) DO UPDATE SET
    course_title = EXCLUDED.course_title,
    description = EXCLUDED.description,
    department = EXCLUDED.department,
    status = EXCLUDED.status;

INSERT INTO module (course_id, module_title, sequence_no, description, publish_status)
VALUES
    ((SELECT course_id FROM course WHERE course_code = 'QL-SEF101'), 'Requirements and Use Cases', 1, 'Introduction to requirements analysis and use case modelling.', 'published'),
    ((SELECT course_id FROM course WHERE course_code = 'QL-SEF101'), 'Design and Architecture', 2, 'Introduction to system architecture, interface design, and data design.', 'published')
ON CONFLICT (course_id, sequence_no) DO UPDATE SET
    module_title = EXCLUDED.module_title,
    description = EXCLUDED.description,
    publish_status = EXCLUDED.publish_status;

INSERT INTO lesson (module_id, lesson_title, lesson_type, content_text, video_url, sequence_no, publish_status)
VALUES
    (
        (SELECT module_id FROM module m JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1),
        'Writing Effective Use Cases',
        'mixed',
        'This lesson explains actors, triggers, preconditions, main flows, alternate flows, and postconditions.',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        1,
        'published'
    ),
    (
        (SELECT module_id FROM module m JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1),
        'Activity Diagrams for Workflows',
        'reading',
        'This lesson explains how activity diagrams model decisions, loops, and end-to-end process flow.',
        NULL,
        2,
        'published'
    ),
    (
        (SELECT module_id FROM module m JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 2),
        'Layered Architecture Basics',
        'mixed',
        'This lesson introduces presentation, application, data/security, and integration layers.',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        1,
        'published'
    )
ON CONFLICT (module_id, sequence_no) DO UPDATE SET
    lesson_title = EXCLUDED.lesson_title,
    lesson_type = EXCLUDED.lesson_type,
    content_text = EXCLUDED.content_text,
    video_url = EXCLUDED.video_url,
    publish_status = EXCLUDED.publish_status;

INSERT INTO content_item (lesson_id, content_type, title, body_text, resource_url, storage_path, embed_url, sequence_no, publish_status)
VALUES
    (
        (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1 AND l.sequence_no = 1),
        'reading',
        'Use Case Reading Notes',
        'A use case describes how an actor interacts with the system to achieve a goal.',
        NULL,
        NULL,
        NULL,
        1,
        'published'
    ),
    (
        (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1 AND l.sequence_no = 1),
        'video',
        'Use Case Walkthrough Video',
        NULL,
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        NULL,
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        2,
        'published'
    ),
    (
        (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 2 AND l.sequence_no = 1),
        'h5p_lumi',
        'Quiz 1: Testing Strategies',
        '<iframe src="https://app.lumi.education/api/v1/run/GVsXA0/embed" width="1088" height="720" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
        NULL,
        NULL,
        NULL,
        1,
        'published'
    ),
    (
        (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 2 AND l.sequence_no = 1),
        'h5p_lumi',
        'Quiz 2: Concept: Software Design',
        '<iframe src="https://app.lumi.education/api/v1/run/OPq0RR/embed" width="1088" height="720" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
        NULL,
        NULL,
        NULL,
        2,
        'published'
    ),
    (
        (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 2 AND l.sequence_no = 1),
        'h5p_lumi',
        'Quiz 3: Project Management',
        '<iframe src="https://app.lumi.education/api/v1/run/vYNyk7/embed" width="1088" height="720" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
        NULL,
        NULL,
        NULL,
        3,
        'published'
    )
ON CONFLICT (lesson_id, sequence_no) DO UPDATE SET
    content_type = EXCLUDED.content_type,
    title = EXCLUDED.title,
    body_text = EXCLUDED.body_text,
    resource_url = EXCLUDED.resource_url,
    storage_path = EXCLUDED.storage_path,
    embed_url = EXCLUDED.embed_url,
    publish_status = EXCLUDED.publish_status;

INSERT INTO enrollment (student_profile_id, course_id, status)
VALUES (
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    (SELECT course_id FROM course WHERE course_code = 'QL-SEF101'),
    'active'
)
ON CONFLICT (student_profile_id, course_id) DO UPDATE SET
    status = EXCLUDED.status;

INSERT INTO question_bank (course_id, bank_name, description, is_active)
SELECT
    (SELECT course_id FROM course WHERE course_code = 'QL-SEF101'),
    'SEF Fundamentals Question Bank',
    'Demo questions for use cases, activity diagrams, and architecture.',
    TRUE
WHERE NOT EXISTS (
    SELECT 1
    FROM question_bank qb
    JOIN course c ON qb.course_id = c.course_id
    WHERE c.course_code = 'QL-SEF101'
      AND qb.bank_name = 'SEF Fundamentals Question Bank'
);

INSERT INTO question (question_bank_id, question_type, prompt, correct_answer, explanation, difficulty, points)
SELECT qb.question_bank_id, 'mcq', 'Which artifact describes actor goals and system responses?', 'Use case', 'Use cases describe interactions between actors and the system.', 'easy', 5
FROM question_bank qb
JOIN course c ON qb.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND qb.bank_name = 'SEF Fundamentals Question Bank'
  AND NOT EXISTS (SELECT 1 FROM question q WHERE q.question_bank_id = qb.question_bank_id AND q.prompt = 'Which artifact describes actor goals and system responses?');

INSERT INTO question (question_bank_id, question_type, prompt, correct_answer, explanation, difficulty, points)
SELECT qb.question_bank_id, 'fill_in_blank', 'The layer that handles Supabase Auth, PostgreSQL, RLS, and Storage is the [blank] layer.', 'Data and Security', 'The Data and Security layer owns storage, identity, and access enforcement.', 'medium', 5
FROM question_bank qb
JOIN course c ON qb.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND qb.bank_name = 'SEF Fundamentals Question Bank'
  AND NOT EXISTS (SELECT 1 FROM question q WHERE q.question_bank_id = qb.question_bank_id AND q.prompt = 'The layer that handles Supabase Auth, PostgreSQL, RLS, and Storage is the [blank] layer.');

INSERT INTO question (question_bank_id, question_type, prompt, correct_answer, explanation, difficulty, points)
SELECT qb.question_bank_id, 'short_answer', 'Briefly explain why advisor alerts are useful in QuestLearn.', 'They help advisors identify at-risk students early.', 'Advisor alerts support early intervention by surfacing low progress, overdue work, weak scores, or low engagement.', 'medium', 5
FROM question_bank qb
JOIN course c ON qb.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND qb.bank_name = 'SEF Fundamentals Question Bank'
  AND NOT EXISTS (SELECT 1 FROM question q WHERE q.question_bank_id = qb.question_bank_id AND q.prompt = 'Briefly explain why advisor alerts are useful in QuestLearn.');

INSERT INTO quiz (lesson_id, quiz_title, total_marks, time_limit, randomized, publish_status)
SELECT
    (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1 AND l.sequence_no = 1),
    'Use Case and Architecture Check',
    15,
    15,
    FALSE,
    'published'
WHERE NOT EXISTS (
    SELECT 1
    FROM quiz q
    JOIN lesson l ON q.lesson_id = l.lesson_id
    JOIN module m ON l.module_id = m.module_id
    JOIN course c ON m.course_id = c.course_id
    WHERE c.course_code = 'QL-SEF101'
      AND q.quiz_title = 'Use Case and Architecture Check'
);

INSERT INTO quiz_question (quiz_id, question_id, sequence_no)
SELECT qz.quiz_id, q.question_id, ROW_NUMBER() OVER (ORDER BY q.question_id)
FROM quiz qz
JOIN lesson l ON qz.lesson_id = l.lesson_id
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
JOIN question_bank qb ON qb.course_id = c.course_id
JOIN question q ON q.question_bank_id = qb.question_bank_id
WHERE c.course_code = 'QL-SEF101'
  AND qz.quiz_title = 'Use Case and Architecture Check'
  AND qb.bank_name = 'SEF Fundamentals Question Bank'
ON CONFLICT (quiz_id, question_id) DO UPDATE SET
    sequence_no = EXCLUDED.sequence_no;

INSERT INTO quiz_attempt (quiz_id, student_profile_id, score, max_score, feedback_summary)
SELECT
    qz.quiz_id,
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    10,
    15,
    'Strong understanding of use cases. Review the Data and Security layer and advisor alert purpose.'
FROM quiz qz
JOIN lesson l ON qz.lesson_id = l.lesson_id
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND qz.quiz_title = 'Use Case and Architecture Check'
  AND NOT EXISTS (
      SELECT 1
      FROM quiz_attempt qa
      WHERE qa.quiz_id = qz.quiz_id
        AND qa.student_profile_id = (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001')
  );

INSERT INTO attempt_answer (attempt_id, question_id, student_answer, is_correct, points_earned)
SELECT qa.attempt_id, q.question_id,
       CASE
           WHEN q.question_type = 'mcq' THEN 'Use case'
           WHEN q.question_type = 'fill_in_blank' THEN 'Application'
           ELSE 'Advisor alerts warn staff about students who may need help.'
       END,
       CASE
           WHEN q.question_type = 'mcq' THEN TRUE
           WHEN q.question_type = 'fill_in_blank' THEN FALSE
           ELSE NULL
       END,
       CASE
           WHEN q.question_type = 'mcq' THEN 5
           WHEN q.question_type = 'fill_in_blank' THEN 0
           ELSE 5
       END
FROM quiz_attempt qa
JOIN quiz qz ON qa.quiz_id = qz.quiz_id
JOIN quiz_question qq ON qz.quiz_id = qq.quiz_id
JOIN question q ON qq.question_id = q.question_id
JOIN student_profile sp ON qa.student_profile_id = sp.student_profile_id
WHERE sp.student_no = 'QL-STU-001'
  AND qz.quiz_title = 'Use Case and Architecture Check'
  AND NOT EXISTS (
      SELECT 1
      FROM attempt_answer aa
      WHERE aa.attempt_id = qa.attempt_id
        AND aa.question_id = q.question_id
  );

INSERT INTO assignment (course_id, lesson_id, assignment_title, description, deadline, total_marks, publish_status)
SELECT
    (SELECT course_id FROM course WHERE course_code = 'QL-SEF101'),
    (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 1 AND l.sequence_no = 2),
    'Use Case Reflection',
    'Submit a short reflection explaining one QuestLearn use case and its alternate flow.',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    20,
    'published'
WHERE NOT EXISTS (
    SELECT 1
    FROM assignment a
    JOIN course c ON a.course_id = c.course_id
    WHERE c.course_code = 'QL-SEF101'
      AND a.assignment_title = 'Use Case Reflection'
);

INSERT INTO assignment (course_id, lesson_id, assignment_title, description, deadline, total_marks, publish_status)
SELECT
    (SELECT course_id FROM course WHERE course_code = 'QL-SEF101'),
    (SELECT lesson_id FROM lesson l JOIN module m ON l.module_id = m.module_id JOIN course c ON m.course_id = c.course_id WHERE c.course_code = 'QL-SEF101' AND m.sequence_no = 2 AND l.sequence_no = 1),
    'Architecture Sketch',
    'Create a simple layered architecture sketch for QuestLearn.',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    30,
    'published'
WHERE NOT EXISTS (
    SELECT 1
    FROM assignment a
    JOIN course c ON a.course_id = c.course_id
    WHERE c.course_code = 'QL-SEF101'
      AND a.assignment_title = 'Architecture Sketch'
);

INSERT INTO assignment_submission (assignment_id, student_profile_id, submission_url, status, score, feedback)
SELECT
    a.assignment_id,
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    'https://example.com/submissions/use-case-reflection.pdf',
    'graded',
    17,
    'Good explanation of actor, trigger, and alternate flow.'
FROM assignment a
JOIN course c ON a.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND a.assignment_title = 'Use Case Reflection'
ON CONFLICT (assignment_id, student_profile_id) DO UPDATE SET
    submission_url = EXCLUDED.submission_url,
    status = EXCLUDED.status,
    score = EXCLUDED.score,
    feedback = EXCLUDED.feedback;

INSERT INTO progress_record (student_profile_id, lesson_id, completion_status, percentage)
SELECT
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    l.lesson_id,
    CASE WHEN l.sequence_no = 1 THEN 'completed' ELSE 'in_progress' END,
    CASE WHEN l.sequence_no = 1 THEN 100 ELSE 40 END
FROM lesson l
JOIN module m ON l.module_id = m.module_id
JOIN course c ON m.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
ON CONFLICT (student_profile_id, lesson_id) DO UPDATE SET
    completion_status = EXCLUDED.completion_status,
    percentage = EXCLUDED.percentage,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO activity_log (user_id, activity_type, target_type, target_id, duration_seconds, metadata)
SELECT u.user_id, 'lesson_view', 'lesson', l.lesson_id, 420, '{"source":"part_iii_seed"}'::jsonb
FROM "user" u
JOIN student_profile sp ON u.user_id = sp.user_id
JOIN lesson l ON l.lesson_title = 'Writing Effective Use Cases'
WHERE sp.student_no = 'QL-STU-001'
  AND NOT EXISTS (
      SELECT 1 FROM activity_log al
      WHERE al.user_id = u.user_id
        AND al.activity_type = 'lesson_view'
        AND al.target_type = 'lesson'
        AND al.target_id = l.lesson_id
  );

INSERT INTO activity_log (user_id, activity_type, target_type, target_id, duration_seconds, metadata)
SELECT u.user_id, 'quiz_attempt', 'quiz', qz.quiz_id, 600, '{"source":"part_iii_seed"}'::jsonb
FROM "user" u
JOIN student_profile sp ON u.user_id = sp.user_id
JOIN quiz qz ON qz.quiz_title = 'Use Case and Architecture Check'
WHERE sp.student_no = 'QL-STU-001'
  AND NOT EXISTS (
      SELECT 1 FROM activity_log al
      WHERE al.user_id = u.user_id
        AND al.activity_type = 'quiz_attempt'
        AND al.target_type = 'quiz'
        AND al.target_id = qz.quiz_id
  );

INSERT INTO advisor_student_assignment (advisor_profile_id, student_profile_id, status)
VALUES (
    (SELECT advisor_profile_id FROM advisor_profile WHERE staff_no = 'QL-ADV-001'),
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    'active'
)
ON CONFLICT (advisor_profile_id, student_profile_id) DO UPDATE SET
    status = EXCLUDED.status;

INSERT INTO advisor_alert (student_profile_id, advisor_profile_id, alert_type, severity, source_type, source_id, message, status)
SELECT
    (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001'),
    (SELECT advisor_profile_id FROM advisor_profile WHERE staff_no = 'QL-ADV-001'),
    'overdue_assignment',
    'high',
    'assignment',
    a.assignment_id,
    'Demo Student has one overdue architecture assignment.',
    'open'
FROM assignment a
JOIN course c ON a.course_id = c.course_id
WHERE c.course_code = 'QL-SEF101'
  AND a.assignment_title = 'Architecture Sketch'
  AND NOT EXISTS (
      SELECT 1
      FROM advisor_alert aa
      WHERE aa.student_profile_id = (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001')
        AND aa.source_type = 'assignment'
        AND aa.source_id = a.assignment_id
  );

INSERT INTO advisor_follow_up (advisor_alert_id, advisor_profile_id, student_profile_id, follow_up_type, message, next_action)
SELECT
    aa.advisor_alert_id,
    aa.advisor_profile_id,
    aa.student_profile_id,
    'message',
    'Please review the architecture lesson and submit the overdue sketch by Friday.',
    'Check submission status in 3 days'
FROM advisor_alert aa
JOIN student_profile sp ON aa.student_profile_id = sp.student_profile_id
WHERE sp.student_no = 'QL-STU-001'
  AND aa.alert_type = 'overdue_assignment'
  AND NOT EXISTS (
      SELECT 1
      FROM advisor_follow_up afu
      WHERE afu.advisor_alert_id = aa.advisor_alert_id
        AND afu.message = 'Please review the architecture lesson and submit the overdue sketch by Friday.'
  );

UPDATE advisor_alert
SET status = 'reviewed'
WHERE student_profile_id = (SELECT student_profile_id FROM student_profile WHERE student_no = 'QL-STU-001')
  AND alert_type = 'overdue_assignment';

INSERT INTO announcement (user_id, title, message, scope, target_scope_id, status)
SELECT
    (SELECT user_id FROM "user" WHERE email = 'admin@example.com'),
    'QuestLearn Demo Announcement',
    'New SEF lesson content and quiz practice are available.',
    'platform',
    NULL,
    'active'
WHERE NOT EXISTS (
    SELECT 1
    FROM announcement
    WHERE title = 'QuestLearn Demo Announcement'
      AND user_id = (SELECT user_id FROM "user" WHERE email = 'admin@example.com')
);

INSERT INTO notification (user_id, announcement_id, message, is_read)
SELECT u.user_id, a.announcement_id, 'New SEF lesson content is available.', FALSE
FROM "user" u
JOIN announcement a ON a.title = 'QuestLearn Demo Announcement'
WHERE u.email = 'student@example.com'
  AND NOT EXISTS (
      SELECT 1 FROM notification n
      WHERE n.user_id = u.user_id
        AND n.announcement_id = a.announcement_id
        AND n.message = 'New SEF lesson content is available.'
  );

INSERT INTO notification (user_id, announcement_id, message, is_read)
SELECT u.user_id, a.announcement_id, 'Advisor follow-up has been recorded for a student.', TRUE
FROM "user" u
JOIN announcement a ON a.title = 'QuestLearn Demo Announcement'
WHERE u.email = 'advisor@example.com'
  AND NOT EXISTS (
      SELECT 1 FROM notification n
      WHERE n.user_id = u.user_id
        AND n.announcement_id = a.announcement_id
        AND n.message = 'Advisor follow-up has been recorded for a student.'
  );

INSERT INTO moderation_action (admin_user_id, target_type, target_id, action_type, reason)
SELECT
    (SELECT user_id FROM "user" WHERE email = 'admin@example.com'),
    'content_item',
    ci.content_item_id,
    'approve',
    'Demo content approved for Part III evidence.'
FROM content_item ci
WHERE ci.title = 'Architecture Layer Matching Activity'
  AND NOT EXISTS (
      SELECT 1
      FROM moderation_action ma
      WHERE ma.target_type = 'content_item'
        AND ma.target_id = ci.content_item_id
        AND ma.action_type = 'approve'
  );

INSERT INTO audit_log (actor_user_id, action_type, target_type, target_id, summary, metadata)
SELECT
    (SELECT user_id FROM "user" WHERE email = 'admin@example.com'),
    'content_item.approve',
    'content_item',
    ci.content_item_id,
    'Admin approved demo H5P/Lumi content for Part III evidence.',
    '{"source":"part_iii_seed"}'::jsonb
FROM content_item ci
WHERE ci.title = 'Architecture Layer Matching Activity'
  AND NOT EXISTS (
      SELECT 1
      FROM audit_log al
      WHERE al.action_type = 'content_item.approve'
        AND al.target_type = 'content_item'
        AND al.target_id = ci.content_item_id
  );

COMMIT;

-- Quick verification query:
-- SELECT
--   (SELECT COUNT(*) FROM "user") AS users,
--   (SELECT COUNT(*) FROM course) AS courses,
--   (SELECT COUNT(*) FROM lesson) AS lessons,
--   (SELECT COUNT(*) FROM quiz_attempt) AS quiz_attempts,
--   (SELECT COUNT(*) FROM advisor_alert) AS advisor_alerts,
--   (SELECT COUNT(*) FROM notification) AS notifications;

-- ============================================================
-- END OF SEED DATA
-- ============================================================
