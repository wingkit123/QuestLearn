-- ============================================================
-- QuestLearn Part III Supabase RLS Test Queries
-- Purpose: Screenshot-ready checks for TEST-04 security/RLS evidence
-- Run after:
--   1. ../part-ii/Database-Schema.sql
--   2. ./Supabase-Seed-Data.sql
--   3. ./Supabase-RLS-Policy-Draft.sql
-- ============================================================

-- Notes:
-- 1. These checks simulate authenticated users inside a transaction.
-- 2. Supabase RLS policies use auth.uid(), which reads request.jwt.claim.sub.
-- 3. Run each block separately in Supabase SQL Editor and screenshot results.
-- 4. If your project uses real Supabase Auth users, replace the demo UUIDs
--    with the matching auth.users.id values.

-- Student auth UUID:
-- 00000000-0000-0000-0000-000000000101
-- Instructor auth UUID:
-- 00000000-0000-0000-0000-000000000102
-- Advisor auth UUID:
-- 00000000-0000-0000-0000-000000000103
-- Admin auth UUID:
-- 00000000-0000-0000-0000-000000000104

-- TEST-04A: Student can see own progress, attempts, and notifications.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', TRUE);

SELECT
    'student_own_progress' AS check_name,
    COUNT(*) AS visible_rows
FROM progress_record;

SELECT
    'student_own_quiz_attempts' AS check_name,
    COUNT(*) AS visible_rows
FROM quiz_attempt;

SELECT
    'student_own_notifications' AS check_name,
    COUNT(*) AS visible_rows
FROM notification;

ROLLBACK;

-- TEST-04B: Student cannot see admin moderation or audit records.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', TRUE);

SELECT
    'student_moderation_rows_should_be_zero' AS check_name,
    COUNT(*) AS visible_rows
FROM moderation_action;

SELECT
    'student_audit_rows_should_be_zero' AS check_name,
    COUNT(*) AS visible_rows
FROM audit_log;

ROLLBACK;

-- TEST-04C: Instructor can see course students, submissions, and attempts.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000102', TRUE);

SELECT
    'instructor_course_enrollments' AS check_name,
    COUNT(*) AS visible_rows
FROM enrollment;

SELECT
    'instructor_assignment_submissions' AS check_name,
    COUNT(*) AS visible_rows
FROM assignment_submission;

SELECT
    'instructor_quiz_attempts' AS check_name,
    COUNT(*) AS visible_rows
FROM quiz_attempt;

ROLLBACK;

-- TEST-04D: Advisor can see assigned student alerts and follow-ups.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000103', TRUE);

SELECT
    'advisor_assignments' AS check_name,
    COUNT(*) AS visible_rows
FROM advisor_student_assignment;

SELECT
    'advisor_alerts' AS check_name,
    COUNT(*) AS visible_rows
FROM advisor_alert;

SELECT
    'advisor_follow_ups' AS check_name,
    COUNT(*) AS visible_rows
FROM advisor_follow_up;

ROLLBACK;

-- TEST-04E: Admin can see moderation and audit evidence.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000104', TRUE);

SELECT
    'admin_moderation_rows' AS check_name,
    COUNT(*) AS visible_rows
FROM moderation_action;

SELECT
    'admin_audit_rows' AS check_name,
    COUNT(*) AS visible_rows
FROM audit_log;

ROLLBACK;

-- TEST-04F: Unauthenticated role cannot read protected tables.
BEGIN;
SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub', '', TRUE);

SELECT
    'anon_user_rows_should_be_zero' AS check_name,
    COUNT(*) AS visible_rows
FROM "user";

SELECT
    'anon_progress_rows_should_be_zero' AS check_name,
    COUNT(*) AS visible_rows
FROM progress_record;

ROLLBACK;

-- ============================================================
-- END OF RLS TEST QUERIES
-- ============================================================
