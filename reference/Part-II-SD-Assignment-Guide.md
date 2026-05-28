# Part II SD — Team Assignment Guide

> **Template**: Updated Project Part II SD - Template 2610
> **Project**: QuestLearn — Group 5, TT7L
> **Submission Deadline**: 5 June 2026
> **Source Report**: [Part-II-Design-Report.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md)

---

## Quick Legend

| Symbol | Meaning |
| --- | --- |
| ✅ | Content already written in `Part-II-Design-Report.md` — copy/adapt into template |
| 📊 | Diagram needed — export from `.drawio.xml` as image and insert |
| ✏️ | Needs to be written fresh |
| 🔗 | Pull from an existing reference file |

---

## Cover Page & Revisions

| Field | What to Insert | Who |
| --- | --- | --- |
| System Name | **QuestLearn System** | **Vincent** |
| Version | **2.0** | **Vincent** |
| Group No. | **5** | **Vincent** |
| Member Table | See Wing Kit — 261UC240PJ, Aziel Tan Zheng Chuan — 261UC240LY, Vincent Lock Chun Kit — 261UC2406W, Soo Kian Rong — 261UC26145 | **Vincent** |
| Date | Submission date (5 June 2026) | **Vincent** |
| Revisions Table | Version 1.0 = SRS Part I (01/05/2026), Version 2.0 = SDS Part II (05/06/2026) — list all members as authors | **Vincent** |

> [!TIP]
> Vincent owns all formatting/cover/revision table work as the documentation lead. Just copy the info from [Part-II-Design-Report.md lines 1–64](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L1-L64).

---

## Section 1 — System Overview

### 1.1 Description ✅
| Owner | **Wing Kit** |
| --- | --- |
| Status | Already written |
| What to insert | Copy the description from [Part-II-Design-Report.md L72](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L70-L81). Include the Actor × Major Processes table. |

### 1.2 Actors ✅
| Owner | **Wing Kit** |
| --- | --- |
| Status | Already written |
| What to insert | Copy the actor definitions from [Part-II-Design-Report.md L83-L90](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L83-L90). Four actors: Student, Instructor, Academic Advisor, Admin with their roles. |

### 1.3 Assumptions and Dependencies ✅
| Owner | **Wing Kit** |
| --- | --- |
| Status | Already written |
| What to insert | Copy the 5 assumptions from [Part-II-Design-Report.md L92-L101](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L92-L101). Covers browser support, video hosting, PostgreSQL, file storage, email. |

### 1.4 Use Case Diagram 📊
| Owner | **Aziel** |
| --- | --- |
| Status | Diagram exists in Part I but needs to be exported as image |
| What to insert | Export the Use Case Diagram from Part I (same diagram, unchanged). Insert as an image with a brief caption. Reference: [Use-Case-Diagram-Spec.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i/Use-Case-Diagram-Spec.md) |

---

## Section 2 — Activity Diagrams

> [!IMPORTANT]
> The **Updated template** uses **Activity Diagrams** (Section 2), NOT "Use Cases with sequence diagrams" like the older template. The report has 9 use cases with activity diagram `.drawio.xml` files already created.

### Who does what

| Use Case | Activity Diagram File | Owner | What to insert |
| --- | --- | --- | --- |
| **UC-01** Register Account and Login | `Activity-Diagrams_UC-01.drawio.xml` | **Wing Kit** | 📊 Export diagram as PNG/image. Write 2-3 sentence description (already in report L112-L116). Insert both. |
| **UC-02** Start Lesson | `Activity-Diagrams_UC-02.drawio.xml` | **Aziel** | 📊 Export diagram. Write 2-3 sentence description (report L118-L121). Insert both. |
| **UC-03** Attempt Quiz & Receive Feedback | `Activity-Diagrams_UC-03.drawio.xml` | **Vincent** | 📊 Export diagram. Write 2-3 sentence description (report L124-L127). Insert both. |
| **UC-04** Submit Assignment | `Activity-Diagrams_UC-04.drawio.xml` | **Aziel** | 📊 Export diagram. Write 2-3 sentence description (report L130-L133). Insert both. |
| **UC-05** Create Course & Learning Structure | `Activity-Diagrams_UC-05.drawio.xml` | **Aziel** | 📊 Export diagram. Write 2-3 sentence description (report L136-L139). Insert both. |
| **UC-06** Publish Lesson Content | `Activity-Diagrams_UC-06.drawio.xml` | **Aziel** | 📊 Export diagram. Write 2-3 sentence description (report L142-L145). Insert both. |
| **UC-07** Create Assessment & Configure Feedback | `Activity-Diagrams_UC-07.drawio.xml` | **Vincent** | 📊 Export diagram. Write 2-3 sentence description (report L148-L151). Insert both. |
| **UC-08** View Advisor Dashboard & Follow Up | `Activity-Diagrams_UC-08.drawio.xml` | **Kian Rong** | 📊 Export diagram. Write 2-3 sentence description (report L154-L157). Insert both. |
| **UC-09** Moderate Content & Manage Announcements | `Activity-Diagrams_UC-09.drawio.xml` | **Kian Rong** | 📊 Export diagram. Write 2-3 sentence description (report L160-L163). Insert both. |

> [!NOTE]
> All `.drawio.xml` files are in [part-i/](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i). Open each in draw.io, **File → Export as → PNG** (300 DPI recommended), save to `part-ii/diagrams/`, then insert into the Word doc.

---

## Section 3 — Data Design

### 3.1 Design Class Diagram / ERD 📊
| Owner | **Wing Kit** |
| --- | --- |
| Status | ERD exists as [ERD-UML.drawio.xml](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i/ERD-UML.drawio.xml) |
| What to insert | Export the ERD as a high-res image. Add 1-2 paragraphs explaining the 21 entities in 4 logical groups (already written in report L172-L177). Mention 3NF and the profile table design. |

### 3.2 Data Dictionary ✅
| Owner | **Vincent** |
| --- | --- |
| Status | Already written |
| What to insert | Copy the full data dictionary table from [Part-II-Design-Report.md L184-L206](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L184-L206). This has all 21 entities with Key Attributes, Type, and Purpose. Format as a clean Word table. |

### 3.3 Data Structures ✅
| Owner | **Vincent** |
| --- | --- |

**What to insert for each data structure group:**

| Sub-section | Content Source | What to Write |
| --- | --- | --- |
| **3.3.1 Identity and Access Group** | Report L210-L214 | Describe `role`, `user`, `student_profile`, `instructor_profile`, `advisor_profile` and their 1→1 / 1→∗ relationships |
| **3.3.2 Learning Structure Group** | Report L216-L220 | Describe `course`, `module`, `lesson`, `enrollment` and course hierarchy relationships |
| **3.3.3 Assessment and Performance Group** | Report L222-L226 | Describe `quiz`, `assignment`, `question_bank`, `question`, `quiz_question`, `quiz_attempt`, `attempt_answer`, `assignment_submission`, `progress_record` |
| **3.3.4 Support and Analytics Group** | Report L228-L232 | Describe `activity_log`, `announcement`, `notification` with JSONB metadata explanation |

> [!TIP]
> Vincent can also reference [Database-Design.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Database-Design.md) and [Database-Schema.sql](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Database-Schema.sql) for detailed attribute info.

---

## Section 4 — Behavioral Modeling

> [!IMPORTANT]
> The Updated template has **TWO** sub-sections: **Sequence Diagrams** (4.1) and **State Diagrams** (4.2). Both need diagrams + descriptions.

### 4.1 Sequence Diagrams 📊
| Owner | **Wing Kit** (overall), individual diagrams split below |
| --- | --- |

| Sequence Diagram | Owner | What to Insert |
| --- | --- | --- |
| **SD-01** UC-01 Register & Login | **Wing Kit** | ✏️ Create sequence diagram in draw.io showing User → Frontend → Supabase Auth → DB flow. Export + insert with description from report L242-L245. |
| **SD-02** UC-03 Quiz Attempt & Feedback | **Vincent** | ✏️ Create sequence diagram showing Student → Quiz UI → Grading Service → DB → Feedback. Export + insert with description from report L248-L251. |
| **SD-03** UC-05 Create Course Content | **Aziel** | ✏️ Create sequence diagram showing Instructor → Course UI → Course Actions → DB. Export + insert with description from report L254-L257. |
| **SD-04** UC-08 Advisor Reviews Progress | **Kian Rong** | ✏️ Create sequence diagram showing Advisor → Dashboard → Advisor Actions → DB → Follow-up. Export + insert with description from report L260-L263. |
| **SD-05** UC-09 Admin Moderates Content | **Kian Rong** | ✏️ Create sequence diagram showing Admin → Admin Panel → Admin Actions → DB → Notification. Export + insert with description from report L266-L269. |

> Detailed sequence specifications are in [Sequence-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Sequence-Diagrams.md).

### 4.2 State Diagrams 📊
| Owner | **Vincent** (overall), with support |
| --- | --- |

| State Diagram | States | Owner | What to Insert |
| --- | --- | --- | --- |
| **ST-01** User Account | Pending → Active → Suspended → Deactivated | **Wing Kit** | ✏️ Create state diagram. Export + insert with 2-3 sentence description. |
| **ST-02** Course | Draft → Published → Active → Completed → Archived | **Aziel** | ✏️ Create state diagram. Export + insert. |
| **ST-03** Quiz | Draft → Published → Active → Closed → Archived | **Vincent** | ✏️ Create state diagram. Export + insert. |
| **ST-04** Assignment Submission | Not Started → In Progress → Submitted → Under Review → Graded → Returned | **Vincent** | ✏️ Create state diagram. Export + insert. |
| **ST-05** Enrollment | Enrolled → Active → Completed / Withdrawn | **Kian Rong** | ✏️ Create state diagram. Export + insert. |

> Detailed state descriptions are in [State-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/State-Diagrams.md).

---

## Section 5 — Architecture Design

### 5.1 Software Architecture ✅ + 📊
| Owner | **Wing Kit** |
| --- | --- |
| Status | Text written, diagram needed |
| What to insert | Write the 4-layer architecture description (Presentation, Application Logic, Data and Security, External Integration). Copy from report L312. Create and export an architecture layer diagram. Include the subsystem assignment table (report L318-L323). |

### 5.1.1 Subsystem 1 — Authentication & User Management ✅
| Owner | **Wing Kit** |
| --- | --- |
| What to insert | Copy description from report L325-L327. Mention entities: `user`, `role`, `student_profile`, `instructor_profile`, `advisor_profile`. |

### 5.1.2 Subsystem 2 — Course & Content Management ✅
| Owner | **Aziel** |
| --- | --- |
| What to insert | Copy description from report L329-L331. Mention entities: `course`, `module`, `lesson`, `enrollment`, `quiz`, `assignment`, `question_bank`, `question`, `quiz_question`. |

### 5.1.3 Subsystem 3 — Grading, Progress, and Analytics ✅
| Owner | **Vincent** |
| --- | --- |
| What to insert | Copy description from report L333-L335. Mention entities: `quiz_attempt`, `attempt_answer`, `assignment_submission`, `progress_record`, `activity_log`. |

### 5.1.4 Subsystem 4 — Notifications, Advisor Support, and Admin ✅
| Owner | **Kian Rong** |
| --- | --- |
| What to insert | Copy description from report L337-L339. Mention entities: `advisor_alert`, `advisor_follow_up`, `announcement`, `notification`, `moderation_action`, `audit_log`. |

---

## Section 6 — Interface Design

### 6.1 Main Screens ✅ + 📊
| Owner | **Vincent** (compile), individual screens below |
| --- | --- |

| Screen | Actor | Owner | What to Insert |
| --- | --- | --- | --- |
| Login / Registration | All | **Wing Kit** | ✏️📊 Create wireframe/mockup. Write 2-3 sentence description. |
| Student Dashboard | Student | **Wing Kit** | ✏️📊 Create wireframe/mockup. Describe progress overview, enrolled courses. |
| Course Page | Student | **Aziel** | ✏️📊 Create wireframe/mockup. Describe module listing, enrollment. |
| Lesson Viewer | Student | **Aziel** | ✏️📊 Create wireframe/mockup. Describe content display, video, progress. |
| Quiz Interface | Student | **Vincent** | ✏️📊 Create wireframe/mockup. Describe question display, timer, submit. |
| Quiz Results & Feedback | Student | **Vincent** | ✏️📊 Create wireframe/mockup. Describe score, weak topics, feedback. |
| Grades & Progress | Student | **Vincent** | ✏️📊 Create wireframe/mockup. Describe progress charts, grade history. |
| Instructor Dashboard | Instructor | **Aziel** | ✏️📊 Create wireframe/mockup. Describe course stats, analytics. |
| Course Management | Instructor | **Aziel** | ✏️📊 Create wireframe/mockup. Describe CRUD for courses/modules/lessons. |
| Assessment Creation | Instructor | **Aziel** | ✏️📊 Create wireframe/mockup. Describe quiz builder, question bank. |
| Advisor Dashboard | Advisor | **Kian Rong** | ✏️📊 Create wireframe/mockup. Describe advisee list, risk alerts. |
| Admin Panel | Admin | **Kian Rong** | ✏️📊 Create wireframe/mockup. Describe user management, moderation. |
| Notification Inbox | All | **Kian Rong** | ✏️📊 Create wireframe/mockup. Describe notification list, read/unread. |
| Profile Settings | All | **Wing Kit** | ✏️📊 Create wireframe/mockup. Describe profile edit, password change. |

> Detailed screen descriptions are in [Interface-Design.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Interface-Design.md).

### 6.2–6.5 Subsystem Screens ✅
| Sub-section | Subsystem | Owner | What to Insert |
| --- | --- | --- | --- |
| 6.2 | Auth & User Mgmt Screens | **Wing Kit** | List screens 1, 14, 12(Users tab). Brief explanation of how they connect. |
| 6.3 | Course & Content Screens | **Aziel** | List screens 3, 4, 9, 10. Brief explanation. |
| 6.4 | Grading, Progress, Analytics Screens | **Vincent** | List screens 5, 6, 7, 2(progress), 8(analytics). Brief explanation. |
| 6.5 | Notifications, Advisor, Admin Screens | **Kian Rong** | List screens 13, 11, 12(Content & Announcements tabs). Brief explanation. |

---

## Section 7 — Component Design

### 7.1 Main Components Table ✅
| Owner | **Wing Kit** |
| --- | --- |
| What to insert | Copy the component table from [report L396-L407](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L396-L407). Maps 10 components to subsystems with technology and description. |

### 7.1.1 GradingService — Auto-Grading Algorithm ✅
| Owner | **Vincent** |
| --- | --- |
| What to insert | Copy the pseudocode from [report L413-L449](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L413-L449). This includes the `autoGradeQuizAttempt` function with weak-topic detection. Format as a code block or flowchart in Word. |

> [!NOTE]
> The template says: _"There should be algorithm, pseudocode, flowchart, activity diagram to support the processing in the component."_ The pseudocode is already written. **Vincent** could optionally convert it into a flowchart diagram for extra marks.

---

## Section 8 — Deployment Design

### 8.1 Deployment Diagram ✅ + 📊
| Owner | **Wing Kit** |
| --- | --- |
| Status | Text written, diagram needed |
| What to insert | Copy the deployment table from [report L462-L468](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L462-L468). Create a UML deployment diagram showing Vercel ↔ Supabase ↔ GitHub. Export and insert. Add the deployment workflow description (report L470). |

---

## Section 9 — Summary ✅

| Owner | **Wing Kit** |
| --- | --- |
| What to insert | Copy from [report L476-L478](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L474-L478). Summarises design approach and readiness for Part III implementation. |

---

## References ✅

| Owner | **Vincent** |
| --- | --- |
| What to insert | Copy and format the 10 references from [report L484-L493](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L484-L493). Use proper academic citation format. |

---

## Summary: Who Owns What

### Wing Kit (Team Leader, Integration, Critical Sections)
| Section | Task | Type |
| --- | --- | --- |
| 1.1 Description | Copy/adapt from report | ✅ |
| 1.2 Actors | Copy/adapt from report | ✅ |
| 1.3 Assumptions | Copy/adapt from report | ✅ |
| 2.1.1 UC-01 Activity Diagram | Export diagram + description | 📊 |
| 3.1 ERD | Export ERD diagram + description | 📊 |
| 4.1.1 SD-01 Sequence Diagram | Create + export diagram | ✏️📊 |
| 4.2.1 ST-01 User Account State Diagram | Create + export diagram | ✏️📊 |
| 5.1 Architecture + diagram | Write architecture + create diagram | ✅📊 |
| 5.1.1 Subsystem 1 | Copy/adapt from report | ✅ |
| 6.1 Screens 1, 2, 14 | Create 3 wireframes | ✏️📊 |
| 6.2 Subsystem 1 Screen list | Brief write-up | ✅ |
| 7.1 Component Table | Copy from report | ✅ |
| 8.1 Deployment Diagram | Create diagram + copy text | ✅📊 |
| 9 Summary | Copy from report | ✅ |
| **Final Review** | Review entire document before submission | 🔍 |

### Aziel (Support Coder, Course/Content Owner)
| Section | Task | Type |
| --- | --- | --- |
| 1.4 Use Case Diagram | Export from Part I | 📊 |
| 2.1.2 UC-02 Activity Diagram | Export diagram + description | 📊 |
| 2.1.4 UC-04 Activity Diagram | Export diagram + description | 📊 |
| 2.1.5 UC-05 Activity Diagram | Export diagram + description | 📊 |
| 2.1.6 UC-06 Activity Diagram | Export diagram + description | 📊 |
| 4.1.3 SD-03 Sequence Diagram | Create + export diagram | ✏️📊 |
| 4.2.2 ST-02 Course State Diagram | Create + export diagram | ✏️📊 |
| 5.1.2 Subsystem 2 | Copy/adapt from report | ✅ |
| 6.1 Screens 3, 4, 8, 9, 10 | Create 5 wireframes | ✏️📊 |
| 6.3 Subsystem 2 Screen list | Brief write-up | ✅ |

### Vincent (Documentation, Charts, Formatting)
| Section | Task | Type |
| --- | --- | --- |
| Cover Page & Revisions | Format cover page, fill revision table | ✅ |
| 2.1.3 UC-03 Activity Diagram | Export diagram + description | 📊 |
| 2.1.7 UC-07 Activity Diagram | Export diagram + description | 📊 |
| 3.2 Data Dictionary | Copy full table from report | ✅ |
| 3.3 Data Structures (all 4 groups) | Copy descriptions from report | ✅ |
| 4.1.2 SD-02 Sequence Diagram | Create + export diagram | ✏️📊 |
| 4.2.3 ST-03 Quiz State Diagram | Create + export diagram | ✏️📊 |
| 4.2.4 ST-04 Assignment Submission State Diagram | Create + export diagram | ✏️📊 |
| 5.1.3 Subsystem 3 | Copy/adapt from report | ✅ |
| 6.1 Screens 5, 6, 7 | Create 3 wireframes | ✏️📊 |
| 6.4 Subsystem 3 Screen list | Brief write-up | ✅ |
| 7.1.1 Auto-Grading Pseudocode | Copy + optionally make flowchart | ✅ |
| References | Format reference list | ✅ |
| **Final Formatting** | Grammar, layout, consistent fonts | 🔍 |

### Kian Rong (QA, Testing, Advisor/Admin Sections)
| Section | Task | Type |
| --- | --- | --- |
| 2.1.8 UC-08 Activity Diagram | Export diagram + description | 📊 |
| 2.1.9 UC-09 Activity Diagram | Export diagram + description | 📊 |
| 4.1.4 SD-04 Sequence Diagram | Create + export diagram | ✏️📊 |
| 4.1.5 SD-05 Sequence Diagram | Create + export diagram | ✏️📊 |
| 4.2.5 ST-05 Enrollment State Diagram | Create + export diagram | ✏️📊 |
| 5.1.4 Subsystem 4 | Copy/adapt from report | ✅ |
| 6.1 Screens 11, 12, 13 | Create 3 wireframes | ✏️📊 |
| 6.5 Subsystem 4 Screen list | Brief write-up | ✅ |

---

## Workload Count Summary

| Member | ✅ Copy/Adapt | 📊 Export Existing | ✏️📊 Create New Diagram | 🔍 Review | Total Items |
| --- | --- | --- | --- | --- | --- |
| **Wing Kit** | 8 | 2 | 5 (SD-01, ST-01, Arch, Deploy, 3 wireframes) | Final Review | ~15 |
| **Aziel** | 2 | 5 | 7 (SD-03, ST-02, 5 wireframes) | — | ~14 |
| **Vincent** | 7 | 2 | 5 (SD-02, ST-03, ST-04, 3 wireframes) | Final Formatting | ~14 |
| **Kian Rong** | 2 | 2 | 6 (SD-04, SD-05, ST-05, 3 wireframes) | — | ~10 |

> [!WARNING]
> Kian Rong has fewer items but his sequence diagrams (SD-04, SD-05) and wireframes (Advisor Dashboard, Admin Panel, Notification Inbox) require understanding of the advisor/admin workflows. He should reference [Sequence-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Sequence-Diagrams.md) and [Interface-Design.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Interface-Design.md) for details.

---

## Diagram Export Checklist

All diagrams live in [part-i/](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i) (activity diagrams, ERD, use case) or need to be created fresh (sequence, state, architecture, deployment, wireframes).

**Export settings**: PNG, 300 DPI, transparent or white background, save to `part-ii/diagrams/`.

| # | Diagram | Source File | Status |
| --- | --- | --- | --- |
| 1 | Use Case Diagram | Part I (draw.io) | ⬜ Export |
| 2 | Activity Diagram UC-01 | `Activity-Diagrams_UC-01.drawio.xml` | ⬜ Export |
| 3 | Activity Diagram UC-02 | `Activity-Diagrams_UC-02.drawio.xml` | ⬜ Export |
| 4 | Activity Diagram UC-03 | `Activity-Diagrams_UC-03.drawio.xml` | ⬜ Export |
| 5 | Activity Diagram UC-04 | `Activity-Diagrams_UC-04.drawio.xml` | ⬜ Export |
| 6 | Activity Diagram UC-05 | `Activity-Diagrams_UC-05.drawio.xml` | ⬜ Export |
| 7 | Activity Diagram UC-06 | `Activity-Diagrams_UC-06.drawio.xml` | ⬜ Export |
| 8 | Activity Diagram UC-07 | `Activity-Diagrams_UC-07.drawio.xml` | ⬜ Export |
| 9 | Activity Diagram UC-08 | `Activity-Diagrams_UC-08.drawio.xml` | ⬜ Export |
| 10 | Activity Diagram UC-09 | `Activity-Diagrams_UC-09.drawio.xml` | ⬜ Export |
| 11 | ERD / Class Diagram | `ERD-UML.drawio.xml` | ⬜ Export |
| 12 | Sequence Diagram SD-01 | ⬜ Create in draw.io | ⬜ Create + Export |
| 13 | Sequence Diagram SD-02 | ⬜ Create in draw.io | ⬜ Create + Export |
| 14 | Sequence Diagram SD-03 | ⬜ Create in draw.io | ⬜ Create + Export |
| 15 | Sequence Diagram SD-04 | ⬜ Create in draw.io | ⬜ Create + Export |
| 16 | Sequence Diagram SD-05 | ⬜ Create in draw.io | ⬜ Create + Export |
| 17 | State Diagram ST-01 | ⬜ Create in draw.io | ⬜ Create + Export |
| 18 | State Diagram ST-02 | ⬜ Create in draw.io | ⬜ Create + Export |
| 19 | State Diagram ST-03 | ⬜ Create in draw.io | ⬜ Create + Export |
| 20 | State Diagram ST-04 | ⬜ Create in draw.io | ⬜ Create + Export |
| 21 | State Diagram ST-05 | ⬜ Create in draw.io | ⬜ Create + Export |
| 22 | Architecture Layer Diagram | ⬜ Create in draw.io | ⬜ Create + Export |
| 23 | Deployment Diagram | ⬜ Create in draw.io | ⬜ Create + Export |
| 24-37 | 14 Wireframes/Mockups | ⬜ Create (Figma/draw.io/tool) | ⬜ Create + Export |

---

## Final Submission Checklist

- [ ] All `TO DO` placeholders in the report replaced with actual content
- [ ] All diagrams exported and inserted as images (not links)
- [ ] Cover page has correct group number, names, student IDs, and date
- [ ] Revision table filled in with Part I and Part II versions
- [ ] Table of Contents updated (Word → right-click ToC → Update Field)
- [ ] All section numbering matches the template (1, 2, 3, 4, 5, 6, 7, 8, 9)
- [ ] Consistent formatting: fonts, heading styles, table borders
- [ ] Page numbers present
- [ ] File named according to submission requirements
- [ ] Exported as PDF if required
- [ ] All team members reviewed their sections
- [ ] Wing Kit final review sign-off
