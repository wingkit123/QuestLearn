-- ============================================================
-- QuestLearn Part III Supabase RLS Policy Draft
-- Purpose: Reviewable access-control baseline for Part III prototype
-- Baseline schema: ../part-ii/Database-Schema.sql
-- Seed data: ./Supabase-Seed-Data.sql
-- ============================================================

-- Notes:
-- 1. Review this file before applying it to a live Supabase project.
-- 2. Policies use auth.uid() matched to public."user".auth_user_id.
-- 3. Do not authorize from user_metadata or raw_user_meta_data.
-- 4. Newer Supabase projects may require explicit GRANT statements before
--    tables are reachable through the Data API. RLS still controls rows.
-- 5. This draft grants table access to authenticated users only. It does not
--    grant table access to anon users.

BEGIN;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

ALTER TABLE role ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE course ENABLE ROW LEVEL SECURITY;
ALTER TABLE module ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submission ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE question ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_question ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempt ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempt_answer ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_student_assignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_alert ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_follow_up ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_action ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Clean re-runs for prototype setup.
DROP POLICY IF EXISTS "roles are readable by authenticated users" ON role;
DROP POLICY IF EXISTS "users can read own user row" ON "user";
DROP POLICY IF EXISTS "users can update own user row" ON "user";
DROP POLICY IF EXISTS "student profiles visible to owner staff or admin" ON student_profile;
DROP POLICY IF EXISTS "students can update own profile" ON student_profile;
DROP POLICY IF EXISTS "instructor profiles visible to authenticated users" ON instructor_profile;
DROP POLICY IF EXISTS "instructors can update own profile" ON instructor_profile;
DROP POLICY IF EXISTS "advisor profiles visible to authenticated users" ON advisor_profile;
DROP POLICY IF EXISTS "advisors can update own profile" ON advisor_profile;
DROP POLICY IF EXISTS "courses visible to enrolled students owner instructor or admin" ON course;
DROP POLICY IF EXISTS "instructors can create courses" ON course;
DROP POLICY IF EXISTS "instructors can update own courses or admins can update courses" ON course;
DROP POLICY IF EXISTS "course modules visible through course access" ON module;
DROP POLICY IF EXISTS "instructors can manage modules for own courses" ON module;
DROP POLICY IF EXISTS "lessons visible through course access" ON lesson;
DROP POLICY IF EXISTS "instructors can manage lessons for own courses" ON lesson;
DROP POLICY IF EXISTS "content visible through lesson access" ON content_item;
DROP POLICY IF EXISTS "instructors can manage content for own courses" ON content_item;
DROP POLICY IF EXISTS "enrollments visible to student instructor advisor or admin" ON enrollment;
DROP POLICY IF EXISTS "students can create own enrollment" ON enrollment;
DROP POLICY IF EXISTS "quizzes visible through lesson access" ON quiz;
DROP POLICY IF EXISTS "instructors can manage quizzes for own courses" ON quiz;
DROP POLICY IF EXISTS "assignments visible through course access" ON assignment;
DROP POLICY IF EXISTS "instructors can manage assignments for own courses" ON assignment;
DROP POLICY IF EXISTS "submissions visible to student instructor advisor or admin" ON assignment_submission;
DROP POLICY IF EXISTS "students can create own submissions" ON assignment_submission;
DROP POLICY IF EXISTS "students can update own submissions before grading" ON assignment_submission;
DROP POLICY IF EXISTS "question banks visible to course instructors or admins" ON question_bank;
DROP POLICY IF EXISTS "instructors can manage own question banks" ON question_bank;
DROP POLICY IF EXISTS "questions visible to course instructors or admins" ON question;
DROP POLICY IF EXISTS "instructors can manage own questions" ON question;
DROP POLICY IF EXISTS "quiz questions visible through quiz access" ON quiz_question;
DROP POLICY IF EXISTS "instructors can manage quiz questions for own courses" ON quiz_question;
DROP POLICY IF EXISTS "quiz attempts visible to student instructor advisor or admin" ON quiz_attempt;
DROP POLICY IF EXISTS "students can create own quiz attempts" ON quiz_attempt;
DROP POLICY IF EXISTS "attempt answers visible through attempt access" ON attempt_answer;
DROP POLICY IF EXISTS "students can create answers for own attempts" ON attempt_answer;
DROP POLICY IF EXISTS "progress visible to student instructor advisor or admin" ON progress_record;
DROP POLICY IF EXISTS "students can upsert own progress records" ON progress_record;
DROP POLICY IF EXISTS "activity visible to owner instructor advisor or admin" ON activity_log;
DROP POLICY IF EXISTS "users can create own activity logs" ON activity_log;
DROP POLICY IF EXISTS "advisor assignments visible to advisor student or admin" ON advisor_student_assignment;
DROP POLICY IF EXISTS "advisor alerts visible to advisor student or admin" ON advisor_alert;
DROP POLICY IF EXISTS "advisors can update own alerts" ON advisor_alert;
DROP POLICY IF EXISTS "advisor follow ups visible to advisor student or admin" ON advisor_follow_up;
DROP POLICY IF EXISTS "advisors can create own follow ups" ON advisor_follow_up;
DROP POLICY IF EXISTS "active announcements visible to authenticated users" ON announcement;
DROP POLICY IF EXISTS "admins can manage announcements" ON announcement;
DROP POLICY IF EXISTS "notifications visible to recipient or admin" ON notification;
DROP POLICY IF EXISTS "recipients can update read status" ON notification;
DROP POLICY IF EXISTS "moderation visible to admins" ON moderation_action;
DROP POLICY IF EXISTS "admins can create moderation actions" ON moderation_action;
DROP POLICY IF EXISTS "audit logs visible to admins" ON audit_log;
DROP POLICY IF EXISTS "admins can create audit logs" ON audit_log;

CREATE POLICY "roles are readable by authenticated users"
ON role FOR SELECT TO authenticated
USING (TRUE);

CREATE POLICY "users can read own user row"
ON "user" FOR SELECT TO authenticated
USING (auth_user_id = auth.uid());

CREATE POLICY "users can update own user row"
ON "user" FOR UPDATE TO authenticated
USING (auth_user_id = auth.uid())
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "student profiles visible to owner staff or admin"
ON student_profile FOR SELECT TO authenticated
USING (
    EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = student_profile.user_id AND u.auth_user_id = auth.uid())
    OR EXISTS (
        SELECT 1
        FROM advisor_student_assignment asa
        JOIN advisor_profile ap ON asa.advisor_profile_id = ap.advisor_profile_id
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE asa.student_profile_id = student_profile.student_profile_id
          AND asa.status = 'active'
          AND advisor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM enrollment e
        JOIN course c ON e.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE e.student_profile_id = student_profile.student_profile_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "students can update own profile"
ON student_profile FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = student_profile.user_id AND u.auth_user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = student_profile.user_id AND u.auth_user_id = auth.uid()));

CREATE POLICY "instructor profiles visible to authenticated users"
ON instructor_profile FOR SELECT TO authenticated
USING (TRUE);

CREATE POLICY "instructors can update own profile"
ON instructor_profile FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = instructor_profile.user_id AND u.auth_user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = instructor_profile.user_id AND u.auth_user_id = auth.uid()));

CREATE POLICY "advisor profiles visible to authenticated users"
ON advisor_profile FOR SELECT TO authenticated
USING (TRUE);

CREATE POLICY "advisors can update own profile"
ON advisor_profile FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = advisor_profile.user_id AND u.auth_user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = advisor_profile.user_id AND u.auth_user_id = auth.uid()));

CREATE POLICY "courses visible to enrolled students owner instructor or admin"
ON course FOR SELECT TO authenticated
USING (
    status IN ('published', 'active', 'completed')
    OR EXISTS (
        SELECT 1
        FROM instructor_profile ip
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE ip.instructor_profile_id = course.instructor_profile_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM enrollment e
        JOIN student_profile sp ON e.student_profile_id = sp.student_profile_id
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE e.course_id = course.course_id
          AND e.status = 'active'
          AND student_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "instructors can create courses"
ON course FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM instructor_profile ip
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE ip.instructor_profile_id = course.instructor_profile_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "instructors can update own courses or admins can update courses"
ON course FOR UPDATE TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM instructor_profile ip
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE ip.instructor_profile_id = course.instructor_profile_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM instructor_profile ip
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE ip.instructor_profile_id = course.instructor_profile_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "course modules visible through course access"
ON module FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM course c
        WHERE c.course_id = module.course_id
          AND c.status IN ('published', 'active', 'completed')
    )
);

CREATE POLICY "instructors can manage modules for own courses"
ON module FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = module.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = module.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "lessons visible through course access"
ON lesson FOR SELECT TO authenticated
USING (
    publish_status = 'published'
    AND EXISTS (
        SELECT 1
        FROM module m
        JOIN course c ON m.course_id = c.course_id
        WHERE m.module_id = lesson.module_id
          AND c.status IN ('published', 'active', 'completed')
    )
);

CREATE POLICY "instructors can manage lessons for own courses"
ON lesson FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM module m
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE m.module_id = lesson.module_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM module m
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE m.module_id = lesson.module_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "content visible through lesson access"
ON content_item FOR SELECT TO authenticated
USING (
    publish_status = 'published'
    AND EXISTS (
        SELECT 1
        FROM lesson l
        WHERE l.lesson_id = content_item.lesson_id
          AND l.publish_status = 'published'
    )
);

CREATE POLICY "instructors can manage content for own courses"
ON content_item FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM lesson l
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE l.lesson_id = content_item.lesson_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM lesson l
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE l.lesson_id = content_item.lesson_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "enrollments visible to student instructor advisor or admin"
ON enrollment FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = enrollment.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = enrollment.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM advisor_student_assignment asa
        JOIN advisor_profile ap ON asa.advisor_profile_id = ap.advisor_profile_id
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE asa.student_profile_id = enrollment.student_profile_id
          AND asa.status = 'active'
          AND advisor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can create own enrollment"
ON enrollment FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = enrollment.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "quizzes visible through lesson access"
ON quiz FOR SELECT TO authenticated
USING (publish_status IN ('published', 'closed'));

CREATE POLICY "instructors can manage quizzes for own courses"
ON quiz FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM lesson l
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE l.lesson_id = quiz.lesson_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM lesson l
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE l.lesson_id = quiz.lesson_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "assignments visible through course access"
ON assignment FOR SELECT TO authenticated
USING (publish_status IN ('published', 'closed'));

CREATE POLICY "instructors can manage assignments for own courses"
ON assignment FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = assignment.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = assignment.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "submissions visible to student instructor advisor or admin"
ON assignment_submission FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = assignment_submission.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM assignment a
        JOIN course c ON a.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE a.assignment_id = assignment_submission.assignment_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can create own submissions"
ON assignment_submission FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = assignment_submission.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can update own submissions before grading"
ON assignment_submission FOR UPDATE TO authenticated
USING (
    status IN ('submitted', 'under_review')
    AND EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = assignment_submission.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = assignment_submission.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "question banks visible to course instructors or admins"
ON question_bank FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = question_bank.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "instructors can manage own question banks"
ON question_bank FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = question_bank.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM course c
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE c.course_id = question_bank.course_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "questions visible to course instructors or admins"
ON question FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM question_bank qb
        JOIN course c ON qb.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qb.question_bank_id = question.question_bank_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "instructors can manage own questions"
ON question FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM question_bank qb
        JOIN course c ON qb.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qb.question_bank_id = question.question_bank_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM question_bank qb
        JOIN course c ON qb.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qb.question_bank_id = question.question_bank_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "quiz questions visible through quiz access"
ON quiz_question FOR SELECT TO authenticated
USING (TRUE);

CREATE POLICY "instructors can manage quiz questions for own courses"
ON quiz_question FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM quiz qz
        JOIN lesson l ON qz.lesson_id = l.lesson_id
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qz.quiz_id = quiz_question.quiz_id
          AND instructor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM quiz qz
        JOIN lesson l ON qz.lesson_id = l.lesson_id
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qz.quiz_id = quiz_question.quiz_id
          AND instructor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "quiz attempts visible to student instructor advisor or admin"
ON quiz_attempt FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = quiz_attempt.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM quiz qz
        JOIN lesson l ON qz.lesson_id = l.lesson_id
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE qz.quiz_id = quiz_attempt.quiz_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM advisor_student_assignment asa
        JOIN advisor_profile ap ON asa.advisor_profile_id = ap.advisor_profile_id
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE asa.student_profile_id = quiz_attempt.student_profile_id
          AND asa.status = 'active'
          AND advisor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can create own quiz attempts"
ON quiz_attempt FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = quiz_attempt.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "attempt answers visible through attempt access"
ON attempt_answer FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM quiz_attempt qa
        JOIN student_profile sp ON qa.student_profile_id = sp.student_profile_id
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE qa.attempt_id = attempt_answer.attempt_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can create answers for own attempts"
ON attempt_answer FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM quiz_attempt qa
        JOIN student_profile sp ON qa.student_profile_id = sp.student_profile_id
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE qa.attempt_id = attempt_answer.attempt_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "progress visible to student instructor advisor or admin"
ON progress_record FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = progress_record.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM lesson l
        JOIN module m ON l.module_id = m.module_id
        JOIN course c ON m.course_id = c.course_id
        JOIN instructor_profile ip ON c.instructor_profile_id = ip.instructor_profile_id
        JOIN "user" instructor_u ON ip.user_id = instructor_u.user_id
        WHERE l.lesson_id = progress_record.lesson_id
          AND instructor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM advisor_student_assignment asa
        JOIN advisor_profile ap ON asa.advisor_profile_id = ap.advisor_profile_id
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE asa.student_profile_id = progress_record.student_profile_id
          AND asa.status = 'active'
          AND advisor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "students can upsert own progress records"
ON progress_record FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = progress_record.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = progress_record.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "activity visible to owner instructor advisor or admin"
ON activity_log FOR SELECT TO authenticated
USING (
    EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = activity_log.user_id AND u.auth_user_id = auth.uid())
);

CREATE POLICY "users can create own activity logs"
ON activity_log FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = activity_log.user_id AND u.auth_user_id = auth.uid()));

CREATE POLICY "advisor assignments visible to advisor student or admin"
ON advisor_student_assignment FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_student_assignment.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = advisor_student_assignment.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "advisor alerts visible to advisor student or admin"
ON advisor_alert FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_alert.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = advisor_alert.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "advisors can update own alerts"
ON advisor_alert FOR UPDATE TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_alert.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_alert.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "advisor follow ups visible to advisor student or admin"
ON advisor_follow_up FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_follow_up.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1
        FROM student_profile sp
        JOIN "user" student_u ON sp.user_id = student_u.user_id
        WHERE sp.student_profile_id = advisor_follow_up.student_profile_id
          AND student_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "advisors can create own follow ups"
ON advisor_follow_up FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM advisor_profile ap
        JOIN "user" advisor_u ON ap.user_id = advisor_u.user_id
        WHERE ap.advisor_profile_id = advisor_follow_up.advisor_profile_id
          AND advisor_u.auth_user_id = auth.uid()
    )
);

CREATE POLICY "active announcements visible to authenticated users"
ON announcement FOR SELECT TO authenticated
USING (status = 'active');

CREATE POLICY "admins can manage announcements"
ON announcement FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "notifications visible to recipient or admin"
ON notification FOR SELECT TO authenticated
USING (
    EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = notification.user_id AND u.auth_user_id = auth.uid())
);

CREATE POLICY "recipients can update read status"
ON notification FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = notification.user_id AND u.auth_user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM "user" u WHERE u.user_id = notification.user_id AND u.auth_user_id = auth.uid()));

CREATE POLICY "moderation visible to admins"
ON moderation_action FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "admins can create moderation actions"
ON moderation_action FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "audit logs visible to admins"
ON audit_log FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

CREATE POLICY "admins can create audit logs"
ON audit_log FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM "user" admin_u
        JOIN role admin_r ON admin_u.role_id = admin_r.role_id
        WHERE admin_u.auth_user_id = auth.uid()
          AND admin_r.role_name = 'Admin'
    )
);

COMMIT;

-- Quick RLS verification ideas:
-- 1. Log in as Demo Student and confirm only that student's progress,
--    notifications, quiz attempts, and submissions are visible.
-- 2. Log in as Demo Advisor and confirm the assigned student alert is visible.
-- 3. Log in as Demo Admin and confirm moderation and audit rows are visible.
-- 4. Log in as a non-admin user and confirm moderation and audit rows are hidden.

-- ============================================================
-- END OF RLS POLICY DRAFT
-- ============================================================
