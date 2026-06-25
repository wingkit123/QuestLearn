# QuestLearn Part III Evidence Folder

This folder stores screenshots, SQL results, test outputs, and deployment proof for the Part III submission.

Use [../../../part-iii/Part-III-Evidence-Index.md](../../../part-iii/Part-III-Evidence-Index.md) as the source of truth for required filenames and status. Do not mark an item as `Captured` or `Inserted` in the evidence index until the matching file exists here or the index points to its actual location.

## Expected Artifact Groups

| Group | Examples |
| --- | --- |
| Environment | `project-structure.png`, `environment-variables-masked.png`, `local-dev-server.txt`, `screen-prototype-dashboard-desktop.png`, `screen-prototype-dashboard-mobile.png` |
| Current role-specific scaffold | `screen-prototype-dashboard-desktop-full.png`, `screen-prototype-dashboard-mobile-full.png`, `screen-instructor-analytics.png`, `screen-advisor-dashboard.png`, `screen-admin-content-announcements.png`, `tests-vitest-output.txt`, `build-output.txt` |
| Database | `../../../part-iii/Supabase-Seed-Data.sql`, `../../../part-iii/Supabase-Evidence-Queries.sql`, `../../../part-iii/Supabase-RLS-Policy-Draft.sql`, `supabase-schema-execution.png`, `supabase-schema-table-list.png`, `sql-users-profiles.png`, `sql-course-content.png` |
| Screens | `screen-login-registration.png`, `screen-student-dashboard.png`, `screen-advisor-dashboard.png`, `screen-notification-inbox.png` |
| Tests | `../../../part-iii/Supabase-RLS-Test-Queries.sql`, `tests-unit-output.png`, `tests-integration-output.png`, `tests-browser-workflows.png`, `tests-security-rls.png` |
| Sign-off | `acceptance-testing-signoff.png`, final reviewed acceptance table screenshot |

## Evidence Rules

1. Mask passwords, Supabase service role keys, access tokens, and private deployment settings.
2. Use filenames from the evidence index unless there is a clear reason to use a different name.
3. Keep screenshots readable at normal zoom.
4. Prefer one screenshot per proof item instead of combining unrelated workflows.
5. If a feature is not implemented, do not add fake screenshots; mark it as `Not Implemented` in the evidence index and explain it in the report.
