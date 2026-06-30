# Documentation Changelog

This changelog records the holistic consistency audit performed across the `QuestLearn` deliverables to synchronize the baseline documents (Part I & Part II) with the final Next.js/Supabase production environment (Part III).

## 1. Architectural Model Discrepancies & Resolutions

### A. Admin Actor Workflows (UC-09)
*   **Deviation Detected:** The original use case for Admins only covered content moderation and global announcements. The live codebase (`src/app/(admin)/admin/AdminDashboardClient.tsx`) implemented a strict "Pending Approval" logic for registering Instructors and Advisors.
*   **Resolution Made:** Updated the Use Case description (UC-09) in `part-i/Use-Cases.md` to formally document the `pending` -> `active` / `decline` approval flow. Added the `moderation_action` table to the Data Dictionary to capture how the system stores these oversight operations.

### B. Advisor Actor Workflows (UC-08)
*   **Deviation Detected:** In the baseline documents, advisors were broadly assigned to "departments". However, the live `src/app/(advisor)/advisor/students/page.tsx` utilizes an explicit relational join table (`advisor_student_assignment`) to precisely map advisees.
*   **Resolution Made:** Updated the Use Case narrative for UC-08 to reflect this query structure. Inserted the `advisor_student_assignment` associative table into the Data Dictionary in `Part III SEF Group Final-template-2610.md` to bridge the gap between UI and Database schema.

### C. Instructor Actor Constraints
*   **Deviation Detected:** The initial database draft did not formalize the structural constraints of the learning materials. The live Supabase schema uses a strict hierarchy: `course -> module -> lesson -> content_item`.
*   **Resolution Made:** Updated the Data Dictionary to include `course`, `module`, and `instructor_profile` schemas to define the content hierarchy that drives the instructor interface and student rendering engine.

### D. Data Dictionary Synchronization (Section 4.1)
*   **Deviation Detected:** The previous iteration of the Data Dictionary was simplified and exclusively focused on the Student's perspective, omitting critical tables used by the other three actors.
*   **Resolution Made:** Completely overhauled Section 4.1 in the Group Report to include exhaustive definitions for:
    *   `instructor_profile` and `advisor_profile`
    *   `course` and `module` hierarchies
    *   `advisor_student_assignment` (for linking students to advisors)
    *   `advisor_alert` (for logging the recommendation triggers)
    *   `moderation_action` (for logging Admin approvals/declines)

## 2. Summary of Output Deliverables Updated
1.  **`part-i/Use-Cases.md`**: UC-08 and UC-09 rewritten. Flowcharts updated.
2.  **`part-i/Activity-Diagrams.md`**: Mermaid diagrams synchronized.
3.  **`part-iii/Part III SEF Group Final-template-2610.md`**: Section 4.1 Data Dictionary overhauled; state transition diagrams mapped to strict database enum states (`pending`, `active`, `suspended`, `draft`, `published`).
