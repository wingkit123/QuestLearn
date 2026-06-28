-- ============================================================
-- QuestLearn Auth Seed (Supabase)
-- Purpose: Create demo Auth users so you can login immediately
-- Run AFTER: Database-Schema.sql and Supabase-Seed-Data.sql
-- ============================================================
--
-- IMPORTANT: Before running this, disable email confirmation:
--   Supabase Dashboard → Authentication → Providers → Email
--   → Toggle OFF "Confirm email"
--
-- All demo accounts use password: 123456
-- ============================================================

-- Insert demo users into Supabase Auth
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  confirmation_token, email_change, email_change_token_new, recovery_token
)
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000101',
    'authenticated', 'authenticated',
    'student@example.com',
    crypt('123456', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Demo Student"}',
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000102',
    'authenticated', 'authenticated',
    'instructor@example.com',
    crypt('123456', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Demo Instructor"}',
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000103',
    'authenticated', 'authenticated',
    'advisor@example.com',
    crypt('123456', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Demo Advisor"}',
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000104',
    'authenticated', 'authenticated',
    'admin@example.com',
    crypt('123456', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Demo Admin"}',
    '', '', '', ''
  )
ON CONFLICT (id) DO NOTHING;

-- Insert matching identities (required for email/password login)
INSERT INTO auth.identities (id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000101',
    'email',
    jsonb_build_object('sub', '00000000-0000-0000-0000-000000000101', 'email', 'student@example.com', 'email_verified', true),
    NOW(), NOW(), NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000102',
    'email',
    jsonb_build_object('sub', '00000000-0000-0000-0000-000000000102', 'email', 'instructor@example.com', 'email_verified', true),
    NOW(), NOW(), NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000103',
    'email',
    jsonb_build_object('sub', '00000000-0000-0000-0000-000000000103', 'email', 'advisor@example.com', 'email_verified', true),
    NOW(), NOW(), NOW()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000104',
    '00000000-0000-0000-0000-000000000104',
    'email',
    jsonb_build_object('sub', '00000000-0000-0000-0000-000000000104', 'email', 'admin@example.com', 'email_verified', true),
    NOW(), NOW(), NOW()
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- END OF AUTH SEED
-- ============================================================
