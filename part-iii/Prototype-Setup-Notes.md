# QuestLearn Part III Prototype Setup Notes

## Official Prototype Stack

| Layer | Selected Tool |
| --- | --- |
| Web application | Next.js App Router |
| Server-side workflows | Next.js Route Handlers and Server Actions |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| File storage | Supabase Storage |
| Deployment | Netlify connected to Supabase |
| Charts | Recharts or Chart.js |
| Interactive content | H5P/Lumi embed records stored as `content_item` rows |

This stack is the implementation baseline for Part III. Execute the work in the order defined by [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md). If the team changes any tool, the reason and effect on testing evidence must be recorded in [Part-III-System-Documentation.md](./Part-III-System-Documentation.md), [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md), and [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md).

## Current Local Scaffold

The current checkout now includes a React + Vite scaffold in `src/` for early Part III screenshot capture. It is intentionally narrower than the official stack: it provides role-specific QuestLearn interfaces, seeded local data, visible allowed/blocked permission lists, responsive layout, and Vitest coverage. It does not yet connect to Supabase Auth, Supabase PostgreSQL, Supabase Storage, or Netlify.

Verified local commands:

```text
./node_modules/.bin/vitest run
./node_modules/.bin/tsc -b
./node_modules/.bin/vite build
npx vite --host 127.0.0.1 --port 5173
```

Current local URL used for evidence capture: `http://127.0.0.1:5173/`.

Captured scaffold evidence:

| Evidence | File |
| --- | --- |
| Server status | `docs/evidence/part-iii/local-dev-server.txt` |
| Desktop viewport screenshot | `docs/evidence/part-iii/screen-prototype-dashboard-desktop.png` |
| Mobile viewport screenshot | `docs/evidence/part-iii/screen-prototype-dashboard-mobile.png` |
| Desktop full-page screenshot | `docs/evidence/part-iii/screen-prototype-dashboard-desktop-full.png` |
| Mobile full-page screenshot | `docs/evidence/part-iii/screen-prototype-dashboard-mobile-full.png` |
| Instructor role screenshot | `docs/evidence/part-iii/screen-instructor-analytics.png` |
| Advisor role screenshot | `docs/evidence/part-iii/screen-advisor-dashboard.png` |
| Admin role screenshot | `docs/evidence/part-iii/screen-admin-content-announcements.png` |
| Vitest output | `docs/evidence/part-iii/tests-vitest-output.txt` |
| Build output | `docs/evidence/part-iii/build-output.txt` |

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
    part-iii/
```

The final implementation may use an `src/` wrapper if the Next.js project is scaffolded with `src/app`. If that structure is used, screenshots and documentation should refer to the actual path rather than the planned path above.

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
- Environment screenshots for submission must mask secret values. Show variable names and successful configuration only.

## Setup Validation Gates

| Gate | Check | Evidence |
| --- | --- | --- |
| Gate 1: Project scaffold | Next.js app runs locally without build-time errors | Terminal screenshot showing local server |
| Gate 2: Supabase connection | App can read a safe public/test query from Supabase | Browser or terminal output with secret values hidden |
| Gate 3: Schema applied | Part II SQL schema creates required tables | Supabase table list or SQL execution screenshot |
| Gate 4: Seed data loaded | Sample users, courses, lessons, quizzes, alerts, and notifications exist | Table screenshots or SQL query outputs |
| Gate 5: Auth routing | Each actor reaches the correct dashboard after login | Browser screenshots for four roles |
| Gate 6: RLS enforced | Unauthorized cross-role access is blocked | SQL/API/browser test output |
| Gate 7: Deployment preview | Netlify preview loads and connects to Supabase | Netlify deployment screenshot and preview URL |

## Setup Sequence

1. Create the Next.js project in the repository root or a clearly named app folder.
2. Install Supabase client packages.
3. Create a Supabase project with Auth, Database, and Storage enabled.
4. Apply the Part II schema from `part-ii/Database-Schema.sql`.
5. Add seed data for roles, sample users, courses, lessons, quizzes, alerts, and notifications using [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql) as the baseline.
6. Run evidence queries from [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql) and capture the required SQL result screenshots.
7. Create Supabase Storage buckets for lesson assets and assignment submissions.
8. Review and apply RLS policies for students, instructors, advisors, and admins using [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql) as the baseline.
9. Validate RLS behaviour with [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql).
10. Implement role-based dashboard routes.
11. Deploy preview build to Netlify and connect environment variables.

## Minimum Seed Dataset

| Area | Minimum Rows |
| --- | --- |
| Roles | Student, Instructor, Academic Advisor, Admin |
| Users and profiles | One account for each role |
| Courses | One active course owned by the instructor |
| Modules and lessons | At least two modules and three lessons |
| Content items | Reading content, video URL, and H5P/Lumi embed sample |
| Enrollment | Student enrolled in the sample course |
| Quiz data | One quiz with MCQ, fill-in-the-blank, and short-answer questions |
| Quiz attempt data | One submitted attempt with correct and incorrect answers |
| Assignment data | One upcoming assignment and one overdue assignment |
| Advisor data | One advisor-student assignment and one open alert |
| Notifications | At least one unread and one read notification |
| Admin records | One announcement, one moderation action, and one audit log row |

## Evidence Capture Checklist

| Evidence | File / Screenshot To Capture | Used In Report Section |
| --- | --- | --- |
| Project folder structure | `project-structure.png` or terminal tree output | 6.2 Software Integration |
| `.env.local` variable names | `environment-variables-masked.png` | 6.1 Development Environment |
| Local development server | `local-dev-server.png` | 6.1 Development Environment |
| Supabase table list | `supabase-schema-table-list.png` | 6.3 Database |
| Seed data sample rows | `supabase-seed-data-samples.png` | 6.3 Database / 7.2 Test Data |
| Four role dashboards | `screen-student-dashboard.png`, `screen-instructor-dashboard.png`, `screen-advisor-dashboard.png`, `screen-admin-panel.png` | 5.3 / 8 Sample Screens |
| Test command output | `tests-unit-integration-output.png` | 7 Testing |
| Netlify preview | `netlify-preview-url.png` | 5.9 Deployment / 6.1 Development Environment |

Track the final status and actual evidence paths in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md).

## Week 10 Evidence Checklist

| Evidence | Owner |
| --- | --- |
| Final Part II review checklist | See Wing Kit |
| Prototype setup notes and environment-variable plan | See Wing Kit |
| Supabase schema execution or SQL setup log | Aziel Tan Zheng Chuan |
| Part III documentation draft sections | Vincent Lock Chun Kit |
| Testing strategy draft and submission checklist | Soo Kian Rong |

## Final Packaging Check

Before submitting Part III:

1. Replace any version ranges such as `1.x`, `10.x`, or `15.x` with actual installed versions if required by the lecturer.
2. Insert real screenshots into the report or place them in the evidence appendix and reference them clearly.
3. Complete the acceptance testing table with `Y`, `Partial`, or `N`.
4. Confirm every `Pending` item in the report either has evidence attached or is explicitly explained as not implemented.
5. Check that actor names, subsystem names, and table names match Part I and Part II.
6. Do not expose Supabase service role keys, passwords, access tokens, or personal account secrets in screenshots.
