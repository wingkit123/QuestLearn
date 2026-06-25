# QuestLearn Part III Documentation Entry Point

This folder contains the Part III system documentation, implementation plan, evidence tracker, SQL support scripts, testing strategy, and final assembly checklist for the QuestLearn prototype.

Part III uses all earlier project parts as reference:

- Part I supplies the requirements, actors, use cases, and requirement traceability.
- Part II supplies the database schema, architecture, interface design, sequence/state diagrams, deployment design, and selected stack.
- Part III records the implementation plan, testing plan, evidence requirements, and final system documentation.

## Read First

| File | Purpose |
| --- | --- |
| [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) | Master report draft for Part III submission |
| [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md) | Ordered execution plan for setup, database, workflows, testing, evidence, and export |
| [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md) | Maps Part I / Part II requirements to Part III artifacts and evidence IDs |
| [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) | Source of truth for screenshots, SQL results, test outputs, and acceptance evidence |
| [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md) | Final packaging and export checklist |

## Setup and Testing Support

| File | Purpose |
| --- | --- |
| [Prototype-Setup-Notes.md](./Prototype-Setup-Notes.md) | Stack, setup sequence, validation gates, seed dataset, and evidence capture checklist |
| [Testing-Strategy.md](./Testing-Strategy.md) | Unit, integration, browser, security, and acceptance testing plan |
| [../docs/evidence/part-iii/README.md](../docs/evidence/part-iii/README.md) | Evidence folder instructions and artifact rules |

## Current Role-Specific Scaffold

The repository root now contains a React + Vite scaffold for early Part III prototype screenshots and role-access checks. It is not yet the final Supabase-connected Next.js implementation, but it now demonstrates separate interfaces, functions, and visible permission boundaries for the four required actors:

- Student: enrolled learning path, quiz attempt, assignment status, progress, grades, and notifications.
- Instructor: course authoring, lesson publishing, assessment setup, submission review, and class analytics.
- Academic Advisor: assigned/department student monitoring, risk alerts, progress summaries, and follow-up actions.
- Admin: user management, role assignment, instructor approval, moderation, announcements, and audit review.

Run the current scaffold from the repository root:

```text
bun install
bun run test
./node_modules/.bin/vite --host 127.0.0.1 --port 5173
```

Verified evidence files are stored in `../docs/evidence/part-iii/`, including desktop/mobile dashboard screenshots, Vitest output, build output, and local server status. After interface changes, regenerate screenshots so the evidence shows the role-specific scaffold rather than the older shared dashboard shell.

## Supabase SQL Execution Order

Run these files in this order when preparing the Supabase evidence environment:

1. [../part-ii/Database-Schema.sql](../part-ii/Database-Schema.sql)
2. [Supabase-Seed-Data.sql](./Supabase-Seed-Data.sql)
3. [Supabase-Evidence-Queries.sql](./Supabase-Evidence-Queries.sql)
4. [Supabase-RLS-Policy-Draft.sql](./Supabase-RLS-Policy-Draft.sql)
5. [Supabase-RLS-Test-Queries.sql](./Supabase-RLS-Test-Queries.sql)

The evidence query file is read-only. The RLS policy draft should be reviewed before applying to a live Supabase project because final policies may need adjustment after real Auth users and final app routes exist.

## Evidence Status

Partial runtime evidence has been captured for the local React + Vite scaffold. Before final submission, the team still needs to capture:

- Supabase schema/table screenshots or SQL output
- Seed data query screenshots
- RLS/security test screenshots
- Full browser workflow tests for all role workflows
- Integration and security test outputs
- Netlify deployment preview evidence
- Acceptance testing sign-off

Use [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) to update each evidence item from `Pending` to `Captured`, `Inserted`, or `Not Implemented`.

## Final Packaging Flow

1. Execute the tasks in [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md).
2. Capture artifacts in `../docs/evidence/part-iii/`.
3. Update [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md).
4. Update statuses in [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md).
5. Insert or reference evidence in [Part-III-System-Documentation.md](./Part-III-System-Documentation.md).
6. Complete [Part-III-Final-Assembly-Checklist.md](./Part-III-Final-Assembly-Checklist.md).
7. Export the final report to the lecturer-required format.
