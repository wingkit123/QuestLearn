# QuestLearn — Implementation Plan

## Deadline: June 29, 11:59 PM (~48 hours)

---

## 1. Confirmed Decisions (From Your Answers)

| Decision | Choice |
|----------|--------|
| Framework | **Next.js 15** (App Router) |
| Backend | **Supabase** (PostgreSQL + Auth + Storage) |
| Registration | Students: open self-reg → active. Instructors: self-reg → pending (admin approves). Advisors/Admins: seed data only |
| Advisor assignment | Hardcoded in seed data |
| H5P delivery | Lumi Cloud iframe URL stored in `content_item.embed_url` |
| Risk alerts | Mocked via seed data in `advisor_alert` table |
| Quiz policy | No timer, unlimited retakes, save latest attempt |
| Assignments | Text URL submission, simple number grading |
| Notifications | In-app only (bell icon dropdown) |
| Deployment | **Vercel** |
| Git strategy | Solo push to `main` |
| Colour palette | Prototype CSS (teal `#196b61`, seafoam `#65d6c4`, dark navy `#122033`) |
| CSS approach | **Tailwind CSS v4** with prototype palette configured in theme |
| Phase 1 & 2 | Fully functional with real Supabase data |
| Phase 3 & 4 | Polished UI with static/mocked data |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     VERCEL (Host)                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js App Router                    │  │
│  │                                                    │  │
│  │  /(auth)          → Login / Register               │  │
│  │  /(student)       → Student Dashboard + Courses    │  │
│  │  /(instructor)    → Instructor Dashboard + Mgmt    │  │
│  │  /(advisor)       → Advisor Dashboard (mocked)     │  │
│  │  /(admin)         → Admin Panel (mocked)           │  │
│  │                                                    │  │
│  │  middleware.ts     → Route guard by role            │  │
│  └───────────────────────────────────────────────────┘  │
│                          │                               │
│                          ▼                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Supabase (Managed)                     │  │
│  │  • Auth (sessions, JWT)                            │  │
│  │  • PostgreSQL (26 tables + RLS)                    │  │
│  │  • Storage (future)                                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Strict RBAC Routing

Each role gets a **completely isolated route group**. Middleware enforces that:
- A student session can ONLY access `/student/*`
- An instructor session can ONLY access `/instructor/*`
- An advisor session can ONLY access `/advisor/*`
- An admin session can ONLY access `/admin/*`
- Unauthenticated users can ONLY access `/login` and `/register`

There is **zero route overlap** between roles.

---

## 3. Folder Structure

```
questlearn/                          # NEW Next.js project (replaces current Vite root)
├── .env.local                       # Supabase URL + anon key (gitignored)
├── next.config.ts
├── package.json
├── tsconfig.json
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout: html, body, global CSS import
│   │   ├── page.tsx                  # "/" → redirect to /login or /dashboard
│   │   ├── globals.css              # Design system (ported from prototype)
│   │   │
│   │   ├── (auth)/                  # Route group: unauthenticated pages
│   │   │   ├── layout.tsx           # Centered card layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login form
│   │   │   └── register/
│   │   │       └── page.tsx         # Student + Instructor registration
│   │   │
│   │   ├── (student)/               # Route group: STUDENT role only
│   │   │   ├── layout.tsx           # Student sidebar + topbar
│   │   │   ├── student/
│   │   │   │   ├── page.tsx         # Student dashboard (Screen 2)
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx     # Enrolled courses list
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       ├── page.tsx # Course detail (Screen 3)
│   │   │   │   │       └── lessons/
│   │   │   │   │           └── [lessonId]/
│   │   │   │   │               └── page.tsx  # Lesson viewer (Screen 4)
│   │   │   │   ├── quizzes/
│   │   │   │   │   ├── [quizId]/
│   │   │   │   │   │   ├── page.tsx      # Quiz attempt (Screen 5)
│   │   │   │   │   │   └── results/
│   │   │   │   │   │       └── page.tsx  # Quiz results (Screen 6)
│   │   │   │   ├── grades/
│   │   │   │   │   └── page.tsx     # Grades & progress (Screen 7)
│   │   │   │   ├── notifications/
│   │   │   │   │   └── page.tsx     # Notification inbox
│   │   │   │   └── profile/
│   │   │   │       └── page.tsx     # Student profile settings
│   │   │
│   │   ├── (instructor)/            # Route group: INSTRUCTOR role only
│   │   │   ├── layout.tsx           # Instructor sidebar + topbar
│   │   │   ├── instructor/
│   │   │   │   ├── page.tsx         # Instructor dashboard (Screen 8)
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx     # My courses list
│   │   │   │   │   ├── create/
│   │   │   │   │   │   └── page.tsx # Create course form
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       ├── page.tsx # Course management (Screen 9)
│   │   │   │   │       └── assessments/
│   │   │   │   │           └── create/
│   │   │   │   │               └── page.tsx  # Assessment creation (Screen 10)
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx     # Class analytics
│   │   │   │   └── profile/
│   │   │   │       └── page.tsx     # Instructor profile
│   │   │
│   │   ├── (advisor)/               # Route group: ADVISOR role only
│   │   │   ├── layout.tsx           # Advisor sidebar + topbar
│   │   │   ├── advisor/
│   │   │   │   ├── page.tsx         # Advisor dashboard (Screen 11) — MOCKED DATA
│   │   │   │   ├── students/
│   │   │   │   │   └── [studentId]/
│   │   │   │   │       └── page.tsx # Student detail — MOCKED DATA
│   │   │   │   └── follow-ups/
│   │   │   │       └── page.tsx     # Follow-up history — MOCKED DATA
│   │   │
│   │   ├── (admin)/                 # Route group: ADMIN role only
│   │   │   ├── layout.tsx           # Admin sidebar + topbar
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx         # Admin dashboard (Screen 12) — MOCKED DATA
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx     # User management — MOCKED with Approve button
│   │   │   │   ├── announcements/
│   │   │   │   │   └── page.tsx     # Announcements — MOCKED DATA
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx     # Platform analytics — MOCKED DATA
│   │   │
│   │   └── api/                     # Route Handlers (server-side)
│   │       ├── auth/
│   │       │   └── callback/
│   │       │       └── route.ts     # Supabase auth callback
│   │       └── ...                  # Additional API routes as needed
│   │
│   ├── components/                  # Shared UI components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Role-adaptive sidebar navigation
│   │   │   ├── Topbar.tsx           # Header with user info + notification bell
│   │   │   └── AuthCard.tsx         # Centered card wrapper for auth pages
│   │   ├── ui/
│   │   │   ├── StatusBadge.tsx      # Salvaged from prototype
│   │   │   ├── MetricCard.tsx       # Salvaged from prototype
│   │   │   ├── ProgressBar.tsx      # Progress track bar
│   │   │   ├── DataTable.tsx        # Reusable data table
│   │   │   ├── EmptyState.tsx       # Empty state placeholder
│   │   │   └── NotificationBell.tsx # Bell icon with dropdown
│   │   └── forms/
│   │       ├── LoginForm.tsx        # Login form component
│   │       └── RegisterForm.tsx     # Registration form component
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser Supabase client
│   │   │   ├── server.ts            # Server-side Supabase client
│   │   │   └── middleware.ts        # Supabase middleware helper
│   │   ├── auth/
│   │   │   └── helpers.ts           # getCurrentUser, getUserRole, etc.
│   │   └── constants.ts             # Role IDs, nav configs, permission maps
│   │
│   ├── types/
│   │   └── database.ts              # TypeScript types matching DB schema
│   │
│   └── middleware.ts                # Next.js middleware: route guard
│
├── database/                        # Reference SQL (not deployed from here)
│   ├── schema.sql                   # Symlink/copy of Database-Schema.sql
│   └── seed.sql                     # Symlink/copy of Supabase-Seed-Data.sql
│
└── docs/
    └── manual-tasks-guide.md        # Step-by-step guide for Supabase + Lumi setup
```

---

## 4. Phased Build Schedule

### Phase 1 — Foundation (Day 1, ~4 hours)

> **Goal**: Auth working, middleware enforcing roles, all 4 role shells rendering

| # | Task | Files |
|---|------|-------|
| 1.1 | Create Next.js 15 project with TypeScript | `package.json`, `next.config.ts`, `tsconfig.json` |
| 1.2 | Install deps: `@supabase/supabase-js`, `@supabase/ssr`, `lucide-react`, `tailwindcss@next`, `@tailwindcss/postcss@next` | `package.json` |
| 1.3 | Configure Tailwind v4 with prototype palette in `app/globals.css` using `@theme` | `globals.css` |
| 1.4 | Create Supabase client helpers (browser + server + middleware) | `lib/supabase/*` |
| 1.5 | Create `types/database.ts` with TS types for all entities | `types/database.ts` |
| 1.6 | Create `lib/constants.ts` with role definitions, nav configs | `lib/constants.ts` |
| 1.7 | Build auth pages: Login + Register (Student/Instructor) | `(auth)/login`, `(auth)/register` |
| 1.8 | Create `middleware.ts` — read session, check role, redirect unauthorized | `middleware.ts` |
| 1.9 | Create root `page.tsx` — redirect to role dashboard or login | `app/page.tsx` |
| 1.10 | Create 4 role layouts with `Sidebar` + `Topbar` | `(student)/layout.tsx`, etc. |
| 1.11 | Create placeholder dashboard pages for all 4 roles | `student/page.tsx`, etc. |

**Verification**: Can register as Student → lands on `/student`. Register as Instructor → lands on `/student` but in `pending` state (redirect to "account pending" page). Cannot access `/admin` as student.

---

### Phase 2 — Student Experience (Day 1, ~6 hours)

> **Goal**: Student dashboard, course/lesson viewer, quiz interface — ALL with real Supabase data

| # | Task | Files |
|---|------|-------|
| 2.1 | Build Student Dashboard — enrolled courses, progress, recent quiz, deadlines | `student/page.tsx` |
| 2.2 | Build Courses List — fetch from `enrollment` → `course` | `student/courses/page.tsx` |
| 2.3 | Build Course Detail — modules accordion, lesson list with completion | `student/courses/[courseId]/page.tsx` |
| 2.4 | Build Lesson Viewer — reading content, embedded video (YouTube), H5P iframe, Mark Complete | `student/courses/[courseId]/lessons/[lessonId]/page.tsx` |
| 2.5 | Build Quiz Attempt — fetch questions via `quiz_question` → `question`, submit answers | `student/quizzes/[quizId]/page.tsx` |
| 2.6 | Build Quiz Results — score, per-question feedback, weak topics, next steps | `student/quizzes/[quizId]/results/page.tsx` |
| 2.7 | Build Grades Page — quiz history table, assignment history | `student/grades/page.tsx` |

**Data flow**:
- Dashboard: `SELECT` from `enrollment` + `progress_record` + `quiz_attempt` + `assignment` WHERE student_profile matches session user
- Quiz submit: `INSERT` into `quiz_attempt` + `attempt_answer`, auto-grade MCQ/fill-in-blank by comparing to `question.correct_answer`

---

### Phase 3 — Instructor Experience (Day 2 Morning, ~4 hours)

> **Goal**: Instructor dashboard and course management with real Supabase data

| # | Task | Files |
|---|------|-------|
| 3.1 | Build Instructor Dashboard — my courses summary, class avg, recent submissions | `instructor/page.tsx` |
| 3.2 | Build Course List — fetch courses owned by instructor | `instructor/courses/page.tsx` |
| 3.3 | Build Create Course form — saves to `course` table | `instructor/courses/create/page.tsx` |
| 3.4 | Build Course Management — tabs: Modules, Quizzes, Assignments, Students | `instructor/courses/[courseId]/page.tsx` |
| 3.5 | Build Assessment Creation — quiz + assignment forms | `instructor/courses/[courseId]/assessments/create/page.tsx` |

**Data flow**:
- Course creation: `INSERT` into `course`, then `INSERT` into `module`, then `INSERT` into `lesson`
- Instructor can only see/manage courses where `course.instructor_profile_id` matches their profile

---

### Phase 4 — Mocked Dashboards + Polish (Day 2 Afternoon, ~6 hours)

> **Goal**: Advisor & Admin dashboards look polished with static data. Notifications working. Overall polish.

| # | Task | Files |
|---|------|-------|
| 4.1 | Build Advisor Dashboard — student table, risk alerts, follow-ups (ALL MOCKED) | `advisor/page.tsx`, `advisor/students/[studentId]/page.tsx` |
| 4.2 | Build Admin Panel — user table with Approve button, announcements, stats (ALL MOCKED) | `admin/page.tsx`, `admin/users/page.tsx` |
| 4.3 | Build Notification Bell — dropdown with unread notifications | `NotificationBell.tsx` |
| 4.4 | Build Notification Inbox page | `student/notifications/page.tsx` |
| 4.5 | Build Profile Settings page (shared component, role-specific fields) | `student/profile/page.tsx` |
| 4.6 | Polish: hover effects, transitions, loading states, empty states | All CSS |
| 4.7 | Create `manual-tasks-guide.md` for Supabase + Lumi setup | `docs/manual-tasks-guide.md` |
| 4.8 | Final testing: all 4 role flows end-to-end | Manual |

---

## 5. Component Architecture

### Shared Components (reusable across roles)

```
Sidebar          — Renders role-specific nav items from constants.ts
Topbar           — User name, role badge, notification bell
StatusBadge      — "Completed" / "In Progress" / "Draft" / "Attention" pills
MetricCard       — Label + large value + detail text
ProgressBar      — Percentage track with fill
DataTable        — Header + rows, sortable (used in Grades, Admin Users, etc.)
NotificationBell — Icon + unread count badge + dropdown
EmptyState       — "No data" placeholder with icon
```

### Role-Specific Page Components

```
Student:    CourseCard, LessonRow, QuizQuestion, FeedbackPanel, WeakTopicTag
Instructor: CourseForm, ModuleAccordion, QuestionEditor, SubmissionRow
Advisor:    StudentRiskRow, AlertCard, FollowUpForm (all mocked)
Admin:      UserRow, ApproveButton, AnnouncementForm, StatCard (all mocked)
```

---

## 6. Middleware Logic

```typescript
// Simplified middleware flow:

1. Check if request path is public (/login, /register, /_next, /api/auth) → ALLOW
2. Get Supabase session from cookies
3. If no session → REDIRECT to /login
4. Fetch user role from "user" table using session.user.id (auth_user_id)
5. Extract role path prefix from URL (/student, /instructor, /advisor, /admin)
6. If user role does NOT match path prefix → REDIRECT to correct dashboard
7. If instructor account_status === 'pending' → REDIRECT to /pending page
8. ALLOW the request
```

---

## 7. CSS Strategy — Tailwind CSS v4

Configure the prototype palette as Tailwind theme tokens in `globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Prototype palette — confirmed by user */
  --color-primary: #196b61;
  --color-accent: #65d6c4;
  --color-bg-dark: #122033;
  --color-bg-page: #f7f9fc;
  --color-surface: #ffffff;
  --color-border: #dfe7f0;
  --color-text: #152033;
  --color-text-muted: #65748a;

  /* Status colors */
  --color-success: #176b4d;
  --color-success-bg: #dff7ec;
  --color-warning: #7a5311;
  --color-warning-bg: #fff1cf;
  --color-danger: #9f2f2f;
  --color-danger-bg: #ffe1e1;
  --color-neutral: #526174;
  --color-neutral-bg: #edf2f7;

  /* Typography */
  --font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

This gives us utility classes like `bg-primary`, `text-accent`, `bg-success-bg`, `border-border`, etc. — all derived from the prototype's teal-green / dark navy palette.

Salvage from prototype: colour values, spacing ratios, status badge colour pairings, and responsive breakpoint logic. The actual CSS classes are replaced by Tailwind utilities.

---

## 8. What Gets Preserved From Old Prototype

| Asset | What Gets Ported | How |
|-------|-----------------|-----|
| Colour palette values | All hex colour values and pairings | Configure in Tailwind `@theme` block |
| Status badge colours | Completed/In Progress/Draft/Attention pairings | Map to Tailwind `bg-success-bg text-success`, etc. |
| Spacing & sizing ratios | Card padding, sidebar width, metric card min-height | Use as reference for Tailwind utility selection |
| Responsive breakpoints | 940px and 640px logic | Use Tailwind responsive prefixes (`md:`, `lg:`) |
| Role metadata | Role IDs, labels, nav items, permission model | Port to `lib/constants.ts` |
| Icon mapping | `navIconMap` using lucide-react | Port to `lib/constants.ts` |

---

## 9. What Gets Discarded

| Asset | Reason |
|-------|--------|
| `App.tsx` monolith | Contradicts isolated route architecture |
| Role tab switching | Contradicts strict RBAC — each role has its own URL space |
| `EvidenceStrip` component | Part III evidence tracking not relevant to production app |
| `AccessPanel` (allowed/blocked lists) | Debug tool, not a user-facing feature |
| Vite config, `main.tsx` | Replaced by Next.js |
| Old tests | Written for prototype structure |

---

## 10. Verification Plan

### After Phase 1
- [ ] `npm run dev` starts without errors
- [ ] Can visit `/login` → see login form
- [ ] Can register as Student → redirected to `/student`
- [ ] Can register as Instructor → redirected to `/pending`
- [ ] Cannot access `/admin` as student → redirected back to `/student`

### After Phase 2
- [ ] Student dashboard shows enrolled courses from Supabase
- [ ] Can navigate: Dashboard → Course → Module → Lesson
- [ ] Lesson viewer displays reading text + embedded YouTube video
- [ ] Can attempt quiz, submit answers, see auto-graded results
- [ ] Grades page shows quiz attempt history

### After Phase 3
- [ ] Instructor dashboard shows owned courses
- [ ] Can create a new course with modules and lessons
- [ ] Can create a quiz with question bank items
- [ ] Can see enrolled students for a course

### After Phase 4
- [ ] Advisor dashboard renders with mocked student data
- [ ] Admin panel renders with mocked user table + Approve button
- [ ] Notification bell shows unread count
- [ ] All 4 role dashboards look polished and portfolio-ready
- [ ] Responsive layout works on mobile viewport

### Manual Testing
- [ ] Test all 4 demo accounts from seed data
- [ ] Verify route isolation (no cross-role access)
- [ ] Check responsive design at mobile/tablet/desktop

---

## 11. Open Risks

| Risk | Mitigation |
|------|------------|
| Supabase not set up yet | I'll create `manual-tasks-guide.md` with exact Supabase setup steps. App works with env vars placeholder until Supabase is live. |
| 48-hour deadline is tight | Phase 3 & 4 use mocked data to guarantee visual completeness even if Supabase integration lags. |
| RLS policies may block queries | Start with RLS disabled during dev, enable + test at the end. |
| Auth callback URL config | Document exact Vercel + Supabase redirect URL setup in the guide. |

---

## 12. Next Steps After Your Approval

1. **Initialize** new Next.js 15 project in the workspace root (replacing Vite setup)
2. **Execute Phase 1** — Foundation, auth, middleware, layouts
3. **Execute Phase 2** — Student experience with real data
4. **Execute Phase 3** — Instructor experience with real data
5. **Execute Phase 4** — Advisor/Admin mocked UI + polish
6. **Create** `manual-tasks-guide.md` for Supabase + Lumi setup
7. **Update** `README.md` with final setup instructions

> [!IMPORTANT]
> Before I begin execution, I need your approval on this plan. Any changes to the folder structure, phasing, or scope should be raised now.
