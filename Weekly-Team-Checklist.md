# QuestLearn Weekly Team Checklist

This checklist is updated for Week 10 (1/6/2026) and Week 9 (27/5/2026). Part I has been submitted. The team is finalizing Part II design files for submission by 5 June 2026 and initializing the Part III prototype setup.

Main current Part I source:

- [Part I_Group5_QuestLearn latest.md](./Part%20I_Group5_QuestLearn%20latest.md)

Main Part II working files:

- [Database-Design.md](part-ii/Database-Design.md)
- [Database-Schema.sql](part-ii/Database-Schema.sql)
- [Architecture-Design.md](part-ii/Architecture-Design.md)
- [Sequence-Diagrams.md](part-ii/Sequence-Diagrams.md)
- [State-Diagrams.md](part-ii/State-Diagrams.md)
- [Interface-Design.md](part-ii/Interface-Design.md)
- [Technology-Stack.md](part-ii/Technology-Stack.md)
- [Part-II-Design-Report.md](part-ii/Part-II-Design-Report.md)

## Current Status

### Part I - Submitted and Diagram-Complete

- [x] project title set to `QuestLearn`
- [x] group number updated to `Group 5`
- [x] student IDs inserted
- [x] system overview completed
- [x] actor table completed
- [x] assumptions and dependencies completed
- [x] non-functional requirements completed
- [x] 9 formal use cases completed (UC-01 to UC-09)
- [x] use case diagram completed in latest Part I source
- [x] ERD completed in latest Part I source
- [x] Gantt chart completed in latest Part I source
- [x] activity diagrams completed for all 9 use cases
- [x] requirements traceability completed
- [x] latest source identified as `Part I_Group5_QuestLearn latest.md`

### Part II - Drafted, Needs Revision

- [x] `part-ii/` directory structure exists
- [x] database design document drafted
- [x] database schema SQL file drafted
- [x] architecture design document drafted
- [x] sequence diagrams drafted
- [x] state transition diagrams drafted
- [x] interface design / wireframes drafted
- [x] technology stack justification drafted
- [/] Part II master design report drafted but incomplete
- [/] align Part II stack with README stack
- [ ] complete all `TO DO` and `Insert exported` placeholders in `Part-II-Design-Report.md`
- [ ] add H5P/Lumi database support
- [ ] add advisor follow-up and advisor alert modeling
- [ ] add admin audit/moderation modeling
- [ ] add Supabase Auth/RLS/Storage security section

### Official Stack

Use the README stack as the official direction:

- Frontend and app layer: `Next.js`
- Backend/API layer: `Next.js Route Handlers` or `Server Actions`
- Database: `Supabase PostgreSQL`
- Authentication: `Supabase Auth`
- File and media storage: `Supabase Storage`
- Deployment: `Vercel` with `Supabase`
- Charts and analytics: `Recharts` or `Chart.js`
- Interactive content: H5P/Lumi embed pipeline

## Week 10 Priority (1/6/2026 - 7/6/2026)

This week focuses on submitting the final Part II Design Report by the 5 June 2026 deadline and beginning the prototype setup for Part III.

### Week 10 Part II Submission & Part III Setup Targets

- [ ] Complete final review, formatting, and audit of `Part-II-Design-Report.md`
- [ ] Run final search audits (ensure zero placeholder text, correct stack terminology)
- [ ] Package and submit the Part II Design Report
- [ ] Create Next.js and Supabase prototype project structures (repository and setup configuration)
- [ ] Draft the initial Part III Testing Strategy (unit, integration, functional, security, and acceptance)

### Who Does What This Week

1. See Wing Kit
   - Perform final review of all Part II report sections and submit the report.
   - Lead the initialization of the Part III Next.js and Supabase environments.

2. Aziel Tan Zheng Chuan
   - Assist in setting up the initial backend and database schema definitions in Supabase for Part III.
   - Prepare database seeding scripts or initial sample data setup.

3. Vincent Lock Chun Kit
   - Handle formatting, style check, and consistency check for the final Part II report.
   - Begin drafting template structures for the Part III System Documentation.

4. Soo Kian Rong
   - Manage the submission completeness checklist and verify all diagram references/links.
   - Draft the 5-section Testing Strategy for the Part III documentation.

## Week 9 Priority (27/5/2026 - 31/5/2026)

This week continues Part II. The goal is to revise the existing Part II draft so it is consistent, complete, and ready for final cleanup before the 5 June 2026 submission.

### Week 9 Part II Revision Targets

- [ ] Standardize all Part II documents to the README stack
- [ ] Complete `Part-II-Design-Report.md`
- [ ] Add H5P/Lumi database support
- [ ] Add advisor follow-up and advisor alert modeling
- [ ] Add admin audit/moderation modeling
- [ ] Add Supabase Auth, RLS, and Storage security section
- [ ] Remove stale Express/Sequelize/JWT/Redis/Docker wording unless listed as rejected alternatives
- [ ] Confirm every Part I requirement maps to Part II database, architecture, interface, and diagrams

### Who Does What This Week

1. See Wing Kit
   - Lead Part II stack alignment to the README stack.
   - Revise architecture direction from old Express/Sequelize wording to Next.js + Supabase.
   - Review final Part II report consistency before submission.
   - Own final decisions for scope, wording, and design tradeoffs.

2. Aziel Tan Zheng Chuan
   - Revise database design and schema.
   - Add H5P/Lumi content support.
   - Add advisor follow-up, advisor alert, and admin audit/moderation tables.
   - Update schema examples, indexes, and table descriptions.

3. Vincent Lock Chun Kit
   - Complete and polish `Part-II-Design-Report.md`.
   - Remove TODO placeholders.
   - Add diagram references and captions.
   - Update interface descriptions and report wording to match the revised database and architecture.

4. Soo Kian Rong
   - Own equal-weight QA and traceability work.
   - Create Part II completion checklist.
   - Verify all Part I requirements map to Part II database, architecture, interface, and diagrams.
   - Add Supabase security/RLS review checklist.
   - Track old-stack terms that must be removed or marked as replaced.

## See Wing Kit - Project Leader

### Week 10

- [ ] conduct final review of Part II Design Report for completeness, coherence, and consistency
- [ ] audit and verify all final Part II files (Database, Architecture, Sequence/State diagrams, Interface, Tech Stack)
- [ ] oversee and sign off on all team members' Week 10 evidence submissions
- [ ] package and submit Part II Design Report by the 5 June 2026 deadline
- [ ] initialize Part III Next.js codebase and connect to Supabase project
- [ ] create and share prototype setup notes and configurations
- [ ] produce final review checklist and prototype setup notes as evidence

### Week 9

- [x] review `README.md` stack and lock it as the official Part II stack
- [x] revise `Architecture-Design.md` direction to Next.js + Supabase
- [x] revise `Technology-Stack.md` to remove old selected-stack wording
- [ ] review `Part-II-Design-Report.md` for consistency after all member updates
- [ ] approve final Part II scope before submission cleanup
- [x] produce architecture/stack review notes as evidence

## Aziel Tan Zheng Chuan - Programming Leader

### Week 10

- [ ] resolve any remaining database design feedback or schema mismatches before Part II submission
- [ ] assist Team Leader in setting up the Supabase project schemas (tables, auth, storage, RLS) for Part III
- [ ] create database seeding scripts or initial sample data setup for prototype testing
- [ ] initialize backend folders (Next.js route handlers or server actions structure) for Part III
- [ ] produce database setup logs, schema execution logs, or prototype changed files as evidence

### Week 9

- [ ] revise `Database-Design.md` for Supabase PostgreSQL direction
- [ ] revise `Database-Schema.sql` with H5P/Lumi content support
- [ ] add advisor follow-up and advisor alert table design
- [ ] add admin audit/moderation table design
- [ ] update indexes and sample SQL queries for new tables
- [ ] produce updated schema/table list and database design notes as evidence

## Vincent Lock Chun Kit - Documentation Manager

### Week 10

- [ ] complete final formatting, style review, and academic writing polish of `Part-II-Design-Report.md`
- [ ] cross-check that all section numbers, table headings, and figure captions match submission guidelines
- [ ] begin drafting the Part III System Documentation structure (copying and refining sections from Part II design)
- [ ] collaborate with Kian Rong to format the Part III testing templates
- [ ] produce the formatted Part II Design Report PDF/Markdown and Part III draft sections as evidence

### Week 9

- [ ] complete `Part-II-Design-Report.md` incomplete sections
- [ ] remove all unresolved `TO DO` and `Insert exported` placeholders from the final report draft
- [ ] add diagram references and captions
- [ ] update interface design wording to reflect H5P/Lumi, advisor follow-up, alerts, and audit trail
- [ ] polish academic writing and formatting
- [ ] produce updated report sections and caption list as evidence

## Soo Kian Rong - Quality and Traceability Owner

### Week 10

- [ ] manage and verify the Part II submission completeness checklist
- [ ] verify that all UML diagrams (Use Case, ERD, Sequence, State, Component, Deployment) are correctly referenced and linked in the report
- [ ] verify that no placeholders (e.g. `TO DO`, `Insert exported`) remain in the submitted report
- [ ] draft the Part III Testing Strategy covering 5 sections: unit, integration, functional, security, and acceptance testing
- [ ] produce the Part II final submission check log and the 5-section Part III Testing Strategy draft as evidence

### Week 9

- [ ] create Part II completion checklist
- [ ] create traceability checklist from latest Part I requirements to Part II database, architecture, interface, and diagrams
- [ ] create Supabase security/RLS review checklist
- [ ] run old-stack audit for `React SPA`, `Express`, `Sequelize`, `JWT`, `bcrypt`, `Redis`, and `Docker Compose`
- [ ] track unresolved `TO DO` and `Insert exported` placeholders
- [ ] produce traceability checklist, security checklist, and old-stack audit list as evidence

## Part II Search Audit

Before finalizing Part II, search for these terms:

- [ ] `TO DO`
- [ ] `Insert exported`
- [ ] `React SPA`
- [ ] `Express`
- [ ] `Sequelize`
- [ ] `JWT`
- [ ] `bcrypt`
- [ ] `Redis`
- [ ] `Docker Compose`

Expected final state:

- [ ] no unresolved TODO placeholders remain
- [ ] old stack terms are removed or clearly marked as rejected alternatives
- [ ] Part II consistently uses Next.js + Supabase + Vercel wording
- [ ] H5P/Lumi, advisor follow-up, admin audit, and Supabase security are covered

## Evidence Required

### Week 10 Evidence
| Member | Required Evidence |
| --- | --- |
| See Wing Kit | Final review checklist and prototype setup notes |
| Aziel Tan Zheng Chuan | Backend/database task notes or changed files |
| Vincent Lock Chun Kit | Formatted report and Part III draft sections |
| Soo Kian Rong | Submission checklist and 5-section testing strategy draft |

### Week 9 Evidence
| Member | Required Evidence |
| --- | --- |
| See Wing Kit | Architecture/stack review notes |
| Aziel Tan Zheng Chuan | Updated schema/table list and database design notes |
| Vincent Lock Chun Kit | Updated Part II report sections and caption list |
| Soo Kian Rong | Traceability checklist, security checklist, and old-stack audit list |

## Upcoming Milestones

| Milestone | Date | Status |
| --- | --- | --- |
| Part I submitted | 2026-05-01 | Done |
| Week 9 Part II revision | 2026-05-27 to 2026-05-31 | Done |
| Week 10 Part II submission & prototype setup | 2026-06-01 to 2026-06-07 | In progress |
| Part II submission deadline | 2026-06-05 | Pending |
| Part III prototype first working version | 2026-06-15 | Pending |
| Part III testing and reports | 2026-06-20 | Pending |
| Part III submission deadline | 2026-06-26 | Pending |
| Presentation window | 2026-06-29 to 2026-07-03 | Pending |

## Status Legend

| Status | Meaning |
| --- | --- |
| `[ ]` | Not started |
| `[/]` | In progress |
| `[x]` | Completed |
