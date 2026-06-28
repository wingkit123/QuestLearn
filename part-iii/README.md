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

## Current Prototype

The repository root contains the production Next.js 15 (App Router) prototype with Supabase backend. It implements separate role-isolated interfaces for all four actors:

- **Student:** enrolled learning path, lesson viewer with H5P/Lumi interactive content, quiz attempt with auto-grading, progress tracking, and grades history.
- **Instructor:** course management, curriculum builder, and assignment grading interface.
- **Academic Advisor:** at-risk student monitoring dashboard with early alert data (mocked).
- **Admin:** user management with pending instructor approval workflow.

### Quick Start (from repository root)

```bash
# Install dependencies (Bun recommended for speed)
bun install

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). See the root `README.md` for full setup instructions including Supabase configuration and demo account credentials.

## Evidence Status

Before final submission, the team still needs to capture:

- Supabase schema/table screenshots or SQL output
- Seed data query screenshots
- RLS/security test screenshots
- Full browser workflow tests for all role workflows
- Integration and security test outputs
- Vercel deployment preview evidence
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
