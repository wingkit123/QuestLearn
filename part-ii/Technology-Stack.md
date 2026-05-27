# Part II - Technology Stack

## 1. Overview

The selected technology stack for QuestLearn follows the project README: `Next.js`, `Supabase`, `Supabase Auth`, `Supabase Storage`, and `Vercel`. This stack is suitable for a university prototype because it reduces backend setup work while still supporting authentication, relational data design, file storage, analytics dashboards, and role-based access control.

The earlier React SPA + Express + Sequelize + Redis + Docker direction is no longer the selected stack. Those technologies may be mentioned only as alternatives considered, not as the implementation target.

---

## 2. Stack Summary

| Layer | Technology | Role |
| --- | --- | --- |
| Frontend and App Framework | Next.js | Page routing, React UI, server components, route handlers, server actions |
| UI Components | React components with Tailwind CSS or shadcn/ui-style components | Responsive dashboards, forms, tables, and navigation |
| Backend/API Layer | Next.js Route Handlers / Server Actions | Controlled server-side operations for protected workflows |
| Database | Supabase PostgreSQL | Relational storage for users, courses, lessons, assessments, progress, alerts, and notifications |
| Authentication | Supabase Auth | Registration, login, session management, authenticated identity |
| Authorization | PostgreSQL Row Level Security | Table and row access rules for Student, Instructor, Academic Advisor, and Admin |
| File and Media Storage | Supabase Storage | Lesson assets, assignment submissions, profile/media files |
| Charts and Analytics | Recharts or Chart.js | Dashboard visualizations for progress, engagement, and performance |
| Interactive Content | H5P authored through Lumi | Embeddable interactive learning activities |
| Deployment | Vercel + Supabase | Hosted Next.js application with managed backend services |
| Version Control | Git + GitHub | Source code management and collaboration |

---

## 3. Technology Justifications

### 3.1 Next.js

Next.js was selected because it combines React-based UI development with server-side capabilities in one framework. QuestLearn needs role-specific dashboards, protected pages, server-side data loading, and API-style operations. Next.js supports these needs through pages, layouts, Server Components, Route Handlers, and Server Actions.

Using Next.js also keeps the prototype close to the README direction and avoids maintaining a separate frontend and backend codebase for Part III.

**Alternative considered:** A standalone React SPA with a separate Express API was considered, but it adds more backend setup and deployment complexity for the team.

### 3.2 Supabase PostgreSQL

Supabase PostgreSQL was selected because QuestLearn's data model is relational. Courses, modules, lessons, enrollments, quizzes, attempts, progress records, advisor alerts, and notifications all depend on clear foreign-key relationships.

PostgreSQL also supports JSONB for flexible metadata in `activity_log` and content records while still preserving relational integrity for core academic data.

**Alternative considered:** A self-managed PostgreSQL server is possible, but Supabase reduces setup and provides database, auth, storage, and security features in one platform.

### 3.3 Supabase Auth

Supabase Auth handles registration, login, session management, and authenticated identity. This is better aligned with the selected stack than implementing custom password hashing and token generation.

Application-specific role data remains in QuestLearn tables such as `role`, `user`, `student_profile`, `instructor_profile`, and `advisor_profile`. Authorization rules should use trusted role/profile data and Row Level Security policies.

### 3.4 Row Level Security

Row Level Security is needed because Supabase can expose database tables through APIs. RLS policies define which rows each role can access:

- Students access their own profile, enrollments, attempts, progress, submissions, and notifications.
- Instructors access courses they own and student performance data for those courses.
- Academic advisors access assigned students, advisor alerts, and follow-up records.
- Admins access user management, moderation, announcements, and audit views.

### 3.5 Supabase Storage

Supabase Storage supports files and media required by QuestLearn, including assignment submissions, lesson resources, profile images, and uploaded content assets. Storage policies should restrict access based on role, enrollment, course ownership, or admin privileges.

H5P/Lumi content can be linked through embed URLs or stored as related lesson content metadata in `content_item`.

### 3.6 H5P/Lumi

H5P content authored through Lumi provides interactive learning activities without requiring the team to build a custom interactive content engine. The database should store H5P/Lumi references as lesson content items so the lesson viewer can render them with video and reading resources.

### 3.7 Vercel

Vercel is selected for deployment because it is designed for Next.js applications. It can provide preview deployments for review and production deployment for the final prototype, while Supabase hosts the backend services.

### 3.8 Charts and Analytics

Recharts or Chart.js can be used to display progress, engagement, quiz distribution, and advisor risk summaries. The final choice can be made during Part III implementation based on team comfort and prototype time.

---

## 4. Development Environment

### 4.1 Prerequisites

| Tool | Minimum Version / Requirement |
| --- | --- |
| Node.js | 20.x LTS |
| npm | 10.x |
| Git | 2.40+ |
| Supabase Project | Database, Auth, and Storage enabled |
| Vercel Account | For deployment and preview builds |

### 4.2 Project Structure

```text
src/
├── app/                         # Next.js App Router pages and layouts
│   ├── auth/                    # Login and registration pages
│   ├── dashboard/               # Role-specific dashboards
│   ├── courses/                 # Course, module, and lesson pages
│   ├── quizzes/                 # Quiz attempt and results pages
│   └── api/                     # Route Handlers for server-side workflows
├── components/                  # Reusable UI components
├── lib/
│   ├── supabase/                # Browser and server Supabase clients
│   ├── auth/                    # Role/session helpers
│   └── validators/              # Form and input validation helpers
├── features/                    # Domain modules grouped by workflow
│   ├── courses/
│   ├── assessments/
│   ├── progress/
│   ├── advisor/
│   └── admin/
├── database/                    # SQL schema and seed scripts
├── tests/                       # Unit, integration, and E2E tests
└── .github/workflows/           # Optional CI checks
```

### 4.3 Supabase Client Conventions

| Client Type | Purpose |
| --- | --- |
| Browser client | Client Components that need user-session-aware reads or UI actions |
| Server client | Server Components, Route Handlers, and Server Actions |
| Admin/service client | Restricted server-only operations such as admin maintenance and data repair |

The service role key must never be exposed to browser code. Public environment variables should use only the Supabase project URL and publishable key.

### 4.4 Route And Action Conventions

| Workflow | Suggested Interface |
| --- | --- |
| Register / login | Supabase Auth UI or custom forms calling Supabase Auth |
| Profile loading | Server-side Supabase client with current user session |
| Course creation | Server Action or Route Handler with instructor role check |
| Lesson content publishing | Server Action that writes `lesson` and `content_item` rows |
| Quiz submission | Route Handler or Server Action that stores attempt and answers |
| Advisor follow-up | Server Action that writes `advisor_follow_up` and audit records |
| Admin moderation | Server Action that writes `moderation_action` and `audit_log` |
| Notifications | Database writes into `notification`, optionally triggered by server-side workflow |

---

## 5. Key Application Workflows

| Workflow | Stack Support |
| --- | --- |
| Student registration and login | Supabase Auth + Next.js auth pages |
| Role-based dashboard access | Supabase session + role/profile tables + RLS policies |
| Course and lesson access | Next.js pages + Supabase queries filtered by enrollment or instructor ownership |
| H5P/Lumi lesson rendering | `content_item` records rendered in the lesson viewer |
| Quiz attempt and feedback | Server-side grading workflow writing `quiz_attempt` and `attempt_answer` |
| Advisor alert review | Advisor dashboard reads assigned students and open `advisor_alert` records |
| Admin moderation | Admin panel writes moderation and audit records |
| File uploads | Supabase Storage with bucket policies |

---

## 6. Rejected Alternatives

| Alternative | Reason Not Selected |
| --- | --- |
| React SPA + Express API | Requires maintaining separate frontend/backend applications and more deployment setup |
| Sequelize ORM | Supabase client and SQL schema are sufficient for the project prototype |
| Custom JWT + bcrypt auth | Supabase Auth already provides secure authentication and session handling |
| Redis cache | Not necessary for the Part III prototype; dashboard queries can be optimized later |
| Docker Compose deployment | Vercel + Supabase is simpler and matches the README direction |

