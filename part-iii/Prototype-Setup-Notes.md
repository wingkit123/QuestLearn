# QuestLearn Part III Prototype Setup Notes

## Official Prototype Stack

| Layer | Selected Tool |
| --- | --- |
| Web application | Next.js App Router |
| Server-side workflows | Next.js Route Handlers and Server Actions |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| File storage | Supabase Storage |
| Deployment | Vercel connected to Supabase |
| Charts | Recharts or Chart.js |
| Interactive content | H5P/Lumi embed records stored as `content_item` rows |

## Planned Repository Structure

```text
app/
  (auth)/
  student/
  instructor/
  advisor/
  admin/
  api/
components/
  dashboard/
  forms/
  layout/
lib/
  auth/
  supabase/
  validation/
supabase/
  schema.sql
  seed.sql
docs/
  evidence/
```

## Environment Variables

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Rules:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` may be used in browser code.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used in server-only files and must never be committed.
- Supabase RLS policies should be enabled before any table is exposed to client-side queries.

## Setup Sequence

1. Create the Next.js project in the repository root or a clearly named app folder.
2. Install Supabase client packages.
3. Create a Supabase project with Auth, Database, and Storage enabled.
4. Apply the Part II schema from `part-ii/Database-Schema.sql`.
5. Add seed data for roles, sample users, courses, lessons, quizzes, alerts, and notifications.
6. Create Supabase Storage buckets for lesson assets and assignment submissions.
7. Add RLS policies for students, instructors, advisors, and admins.
8. Implement role-based dashboard routes.
9. Deploy preview build to Vercel and connect environment variables.

## Week 10 Evidence Checklist

| Evidence | Owner |
| --- | --- |
| Final Part II review checklist | See Wing Kit |
| Prototype setup notes and environment-variable plan | See Wing Kit |
| Supabase schema execution or SQL setup log | Aziel Tan Zheng Chuan |
| Part III documentation draft sections | Vincent Lock Chun Kit |
| Testing strategy draft and submission checklist | Soo Kian Rong |
