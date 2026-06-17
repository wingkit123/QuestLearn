# Architecture and Stack Review Notes

Reviewer: See Wing Kit  
Week: Week 9, 27 May 2026 to 31 May 2026  
Scope: Part II architecture and technology stack alignment

## Decision

The official Part II stack is the README stack:

- Next.js for the application and frontend layer
- Next.js Route Handlers or Server Actions for controlled server-side workflows
- Supabase PostgreSQL for relational data
- Supabase Auth for registration, login, and sessions
- Supabase Storage for files and media
- Vercel for deployment
- Recharts or Chart.js for dashboard charts
- H5P/Lumi for interactive lesson content

## Reason

This stack is more realistic for the team than maintaining the older rejected multi-service stack. It also supports the Part III prototype path because Supabase provides database, auth, storage, and row-level authorization in one platform.

## Updated Files

- `Architecture-Design.md` was revised to describe the Next.js + Supabase architecture.
- `Technology-Stack.md` was rewritten to match the README stack and list the old stack as rejected alternatives.
- `Part-II-Design-Report.md` architecture, component, deployment, summary, and reference wording was updated for consistency.

## Remaining Team Work

- Aziel should update `Database-Design.md` and `Database-Schema.sql` with H5P/Lumi, advisor alert/follow-up, and admin audit/moderation tables.
- Vincent should remove remaining report placeholders and add diagram references/captions.
- Kian Rong should run the Part II traceability, security, and old-stack audit checklists.

## Review Status

| Item | Status |
| --- | --- |
| README stack reviewed | Complete |
| Architecture direction revised | Complete |
| Technology stack revised | Complete |
| Report stack wording partially aligned | Complete |
| Final Part II report approval | Pending team updates |
