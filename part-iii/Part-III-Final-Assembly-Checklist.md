# QuestLearn Part III Final Assembly Checklist

This checklist is the final packaging guide for Part III. It assumes [Part-III-System-Documentation.md](./Part-III-System-Documentation.md) is the master report, [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md) is the execution plan, [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md) maps requirements to artifacts, and [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) is the source of truth for proof artifacts.

## 1. Source of Truth

Use these files for final checking and submission assembly:

- [Part-III-System-Documentation.md](./Part-III-System-Documentation.md)
- [Part-III-Implementation-Task-Plan.md](./Part-III-Implementation-Task-Plan.md)
- [Part-III-Traceability-Matrix.md](./Part-III-Traceability-Matrix.md)
- [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md)
- [Testing-Strategy.md](./Testing-Strategy.md)
- [Prototype-Setup-Notes.md](./Prototype-Setup-Notes.md)
- [../part-i/Use-Cases.md](../part-i/Use-Cases.md)
- [../part-i/Requirements-Traceability.md](../part-i/Requirements-Traceability.md)
- [../part-ii/Part-II-Design-Report.md](../part-ii/Part-II-Design-Report.md)
- [../part-ii/Database-Schema.sql](../part-ii/Database-Schema.sql)
- [../part-ii/Database-Design.md](../part-ii/Database-Design.md)
- [../part-ii/Interface-Design.md](../part-ii/Interface-Design.md)
- [../part-ii/Architecture-Design.md](../part-ii/Architecture-Design.md)

## 2. Minimum Submission Package

The final Part III package should contain:

- Cover details with tutorial section, group number, names, and student IDs.
- Revision table for Part I, Part II, and Part III.
- Project management and individual contribution sections.
- System overview, actors, assumptions, and use case diagram reference.
- ERD, state diagrams, data dictionary, architecture, component, and deployment references.
- Implementation environment, software integration, and database evidence.
- Testing strategy, test data, acceptance testing, and sign-off table.
- Sample screen screenshots or clearly labelled design-reference screenshots.
- Reflection and learning outcomes for all members.
- User guide for Student, Instructor, Academic Advisor, and Admin.
- Conclusion and references.
- Evidence appendix or linked evidence folder.

## 3. Manual Fill-Ins Before Export

| Item | Owner | Status |
| --- | --- | --- |
| Confirm final Part III completion date | See Wing Kit | Pending |
| Replace tool version ranges with actual installed versions if required | See Wing Kit | Pending |
| Insert final Gantt chart or actual-vs-planned schedule | Vincent Lock Chun Kit | Pending |
| Insert exported use case diagram | Vincent Lock Chun Kit | Pending |
| Insert exported ERD | Aziel Tan Zheng Chuan | Pending |
| Insert exported state diagrams | Vincent Lock Chun Kit | Pending |
| Insert architecture and deployment diagrams | See Wing Kit | Pending |
| Insert implementation screenshots | All members | Pending |
| Insert Supabase SQL/table screenshots | Aziel Tan Zheng Chuan | Pending |
| Insert test output screenshots | Soo Kian Rong | Pending |
| Complete acceptance testing table | Soo Kian Rong | Pending |
| Add final individual contribution paragraphs | All members | Pending |
| Add final reflection details based on actual work | All members | Pending |

## 4. Evidence Gates

Do not mark Part III as submission-ready until these gates are resolved.

| Gate | Required Evidence | Source Tracker |
| --- | --- | --- |
| Environment gate | IDE, local server, local app, masked environment variables | `ENV-*` in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) |
| Database gate | Schema execution, table list, seed data, SQL query outputs | `DB-*` in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) |
| Screen gate | Actor workflow screenshots for all implemented screens | `SCR-*` in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) |
| Test gate | Unit, integration, browser, security, and acceptance evidence | `TEST-*` in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) |
| Acceptance gate | Every acceptance criterion marked `Y`, `Partial`, `N`, or `Not Implemented` with remarks | Section 5 in [Part-III-Evidence-Index.md](./Part-III-Evidence-Index.md) |
| Security gate | No secrets exposed in screenshots or committed files | Manual review before export |

## 5. Consistency Checks

- [ ] Actor names are exactly `Student`, `Instructor`, `Academic Advisor`, and `Admin`.
- [ ] Subsystem names match Part II and the Part III report.
- [ ] Database table names match [../part-ii/Database-Schema.sql](../part-ii/Database-Schema.sql).
- [ ] Screen names match the 14-screen list from Part II interface design.
- [ ] Use case names match Part I and Part II wording.
- [ ] Acceptance criteria map to at least one evidence item.
- [ ] Design-only screenshots are labelled as design references, not implemented screens.
- [ ] Pending or not-implemented items are explained honestly.
- [ ] No Supabase service role key, password, token, or private URL is visible in screenshots.

## 6. Red-Team Rubric Check

- [ ] The report explains what was built, what was tested, and what evidence proves it.
- [ ] Part III clearly builds from Part I requirements and Part II design.
- [ ] Implementation evidence is specific, not generic.
- [ ] Test evidence covers happy paths, access control, and important failure cases.
- [ ] Database evidence proves the schema, seed data, and key workflows.
- [ ] Screenshots show role-specific workflows rather than only static pages.
- [ ] The conclusion does not overclaim unfinished prototype features.
- [ ] The evidence index and acceptance table agree with each other.

## 7. Export Checklist

- [ ] Markdown or DOCX report exports cleanly to PDF.
- [ ] Tables fit within page width or are moved to landscape/appendix format.
- [ ] Screenshots are readable at normal zoom.
- [ ] Diagram labels are readable.
- [ ] Figure captions and section references are consistent.
- [ ] Links to local evidence are either converted into embedded screenshots or included as appendix references.
- [ ] Final PDF opens correctly on another device.
- [ ] File name follows lecturer format if specified.
- [ ] No local-only working notes are uploaded accidentally.

## 8. Final Search Audit

Before export, run or manually check for:

- [ ] unresolved task placeholder markers
- [ ] unresolved fill-in placeholder markers
- [ ] `Pending final test execution`
- [ ] `Pending` in acceptance rows that should now be final
- [ ] visible secret values such as Supabase service keys or passwords

Expected final state:

- [ ] Every pending item is either completed or explicitly marked `Not Implemented`.
- [ ] Every completed claim has matching evidence.
- [ ] The report, testing strategy, setup notes, evidence index, and final checklist agree.
