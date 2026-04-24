# QuestLearn Part I Ready-to-Paste Report Outline

Use this outline to merge the current files into one Part I document with minimal rewriting.

## Cover Page

Fill these manually:

- Project Part: `PI`
- Tutorial Code: `TT7L`
- Group Number: `[fill in]`
- Lecturer Name: `[fill in]`
- Student Names: `[fill in]`
- Project Title: `QuestLearn`
- Tagline: `A Smart Interactive Learning System for Personalized Microlearning and Early Academic Support`

## 1. System Overview

Paste from [Part-I-System-Overview.md](./Part-I-System-Overview.md):

- `1.1 Introduction`
- `1.2 Problem Statement`
- `1.3 Proposed Solution`
- `1.4 Objectives`
- `1.5 Scope of the System`
- `1.6 Main User Scenarios`
- `1.7 Proposed Innovation`
- `1.8 Conclusion`

## 2. Use Case Analysis

### 2.1 Actor List

Paste and lightly format:

- `Student`
- `Instructor`
- `Academic Advisor`
- `Admin`

### 2.2 Full Role-Based Use Case List

Paste Section `1. Full Use Case List` from [Use-Cases.md](./Use-Cases.md).

### 2.3 Use Case Diagram

Do not paste the Mermaid draft.

Instead:

- redraw the final UML use case diagram using [Use-Case-Diagram-Spec.md](./Use-Case-Diagram-Spec.md)
- insert the exported diagram here
- add a short caption such as:
  - `Figure X. UML Use Case Diagram for QuestLearn`

### 2.4 Formal Use Case Descriptions

Paste Section `4. Formal Use Case Descriptions` from [Use-Cases.md](./Use-Cases.md).

If the report becomes too long:

- keep all 9 use case descriptions in the appendix
- keep the most important 4 to 6 in the main body

Recommended main-body set:

- `UC-01 Register Account and Verify Email`
- `UC-03 Attempt Quiz and Receive Automated Feedback`
- `UC-04 Submit Assignment`
- `UC-05 Create Course and Learning Structure`
- `UC-08 View Advisor Alert Dashboard and Follow Up`
- `UC-09 Moderate Content and Manage Announcements`

## 3. Process Flow Analysis

Insert clean redrawn versions of these flows from [Use-Cases.md](./Use-Cases.md):

- `5.1 Registration, Login, and Email Verification Flow`
- `5.2 Student Lesson and Quiz Flow`
- `5.3 Assignment Submission Flow`
- `5.4 Instructor Content and Assessment Setup Flow`
- `5.5 Advisor Alert Review and Follow-Up Flow`
- `5.6 Admin Moderation and Announcement Flow`

Add figure captions such as:

- `Figure X. Student Lesson and Quiz Flow`
- `Figure X. Assignment Submission Flow`

## 4. Data and Domain Model

### 4.1 Core Entities

Paste selected parts from [ERD-UML.md](./ERD-UML.md):

- Overview paragraph
- `1. Core Entities`
- `2. Main Relationships`
- `4. Integration Notes`

You do not need to paste every attribute line if space is limited. If needed, keep:

- entity name
- purpose
- key attributes only

### 4.2 ERD

Do not paste the Mermaid draft.

Instead:

- redraw the ERD using the entity list and relationships from [ERD-UML.md](./ERD-UML.md)
- insert the exported diagram here
- caption it:
  - `Figure X. Entity Relationship Diagram for QuestLearn`

### 4.3 Class Diagram

Include only if useful or required:

- redraw from Section `6. Mermaid Draft - Expanded Class Diagram` in [ERD-UML.md](./ERD-UML.md)
- insert after the ERD
- caption it:
  - `Figure X. Class Diagram for QuestLearn`

## 5. Project Planning

### 5.1 Gantt Chart

Redraw the chart from [Gantt-Chart.md](./Gantt-Chart.md), then insert it here.

Caption suggestion:

- `Figure X. Project Gantt Chart for Part I, Part II, and Part III`

### 5.2 Work Responsibility Summary

Write this as a short paragraph using the final team plan:

- Team Lead controls scope, integration, and final review
- Member B supports ERD and class logic under direction
- Member C produces report sections, diagrams, and Gantt chart
- Member D performs requirement checking, proofreading, and completeness audit

Keep this short and formal.

## 6. Final Consistency Check

Before export, compare the merged document against:

- [Requirements-Traceability.md](./Requirements-Traceability.md)
- [Terminology-Sheet.md](./Terminology-Sheet.md)
- [Part-I-Gap-Review-and-Workload-Plan.md](./reference/Part-I-Gap-Review-and-Workload-Plan.md)

Confirm:

- every TT7L requirement is covered
- actor names are consistent
- assignment management appears in overview, use cases, and ERD
- email verification appears in overview, use cases, and process flow
- notifications and announcements are visible in both use cases and ERD

## Appendix Option

If the main report becomes too crowded, move these into an appendix:

- full role-based use case list
- all 9 formal use case descriptions
- expanded class diagram
- traceability table

Keep the main body focused on the clearest evidence for rubric marks.
