# Part II SD — Team Assignment Guide (Section-by-Section Split)

> **Template**: Updated Project Part II SD - Template 2610
> **Project**: QuestLearn — Group 5, TT7L
> **Submission Deadline**: 5 June 2026
> **Source Report**: [Part-II-Design-Report.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md)

---

## The 2-2-2-1 Section Allocation Strategy

To ensure a clean division of labor, the document sections (including the Cover Page, Revisions, Summary, and References) are allocated so that **three members own exactly 2 major sections**, and **one member owns 1 major section** (along with the cover/revisions/references structure).

| Team Member | Sections Assigned | Main Focus |
| --- | --- | --- |
| **Wing Kit** | **Section 1** (System Overview) & **Section 8** (Deployment Design) | High-level system structure, assumptions, deployment diagram, and final compilation review. |
| **Aziel** | **Section 2** (Activity Diagrams) & **Section 5** (Architecture Design) | Exporting the 9 UML activity diagrams, defining the subsystem architecture, and creating the layer diagrams. |
| **Vincent** | **Section 3** (Data Design) & **Section 4** (Behavioral Modeling) | Database design (ERD, data dictionary, data structures), sequence diagrams, and state diagrams. |
| **Kian Rong** | **Section 6** (Interface Design) & **Section 7** (Component Design) | UI/UX interface wireframes (14 screens), screen classification, components table, and auto-grading pseudocode. |

---

## Section-by-Section Workflow Breakdown

### 📋 Cover Page, Revisions & Administrative Work
* **Owner:** **Wing Kit** (As Team Leader, compiles final submission)
* **Tasks:**
  * Populate cover page details (Names, Student IDs, Date, Group 5, Tutorial TT7L).
  * Fill the Revisions table (Version 1.0 = SRS, Version 2.0 = SDS).
  * Assemble and review all sections, generating the final PDF.

---

### 1️⃣ Section 1 — System Overview
* **Owner:** **Wing Kit**
* **Tasks:**
  * **1.1 Description:** Copy/adapt the system description text and major processes table from [Part-II-Design-Report.md L70-L81](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L70-L81).
  * **1.2 Actors:** Copy actor definitions (Student, Instructor, Advisor, Admin) from [Part-II-Design-Report.md L83-L90](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L83-L90).
  * **1.3 Assumptions and Dependencies:** Copy the 5 design-phase assumptions from [Part-II-Design-Report.md L92-L101](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L92-L101).
  * **1.4 Use Case Diagram:** Export the Use Case Diagram from the Part I assets folder and insert it here.

---

### 2️⃣ Section 2 — Activity Diagrams
* **Owner:** **Aziel**
* **Tasks:**
  * Open each of the 9 use case activity diagram `.drawio.xml` files in [part-i/](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i) using draw.io.
  * Export them as high-quality PNGs (300 DPI) and place them in `part-ii/diagrams/`.
  * Insert the diagrams and match them with the 2-3 sentence descriptions already in [Part-II-Design-Report.md L112-L165](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L112-L165):
    * **2.1.1 UC-01:** Register Account and Login
    * **2.1.2 UC-02:** Start Lesson
    * **2.1.3 UC-03:** Attempt Quiz & Receive Automated Feedback
    * **2.1.4 UC-04:** Submit Assignment
    * **2.1.5 UC-05:** Create Course and Learning Structure
    * **2.1.6 UC-06:** Publish Lesson Content
    * **2.1.7 UC-07:** Create Assessment and Configure Feedback
    * **2.1.8 UC-08:** View Advisor Dashboard and Follow Up
    * **2.1.9 UC-09:** Moderate Content and Manage Announcements

---

### 3️⃣ Section 3 — Data Design
* **Owner:** **Vincent**
* **Tasks:**
  * **3.1 Design Class Diagram / ERD:** Export the high-resolution ERD from [ERD-UML.drawio.xml](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i/ERD-UML.drawio.xml) and insert it. Copy the 1-2 paragraph description from [Part-II-Design-Report.md L172-L178](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L172-L178).
  * **3.2 Data Dictionary:** Format the 21-row table containing all entities, key attributes, types, and purposes from [Part-II-Design-Report.md L184-L206](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L184-L206).
  * **3.3 Data Structures:** Detail the four logical groups (Identity, Learning Structure, Assessment, Support/Analytics) using descriptions in [Part-II-Design-Report.md L210-L232](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L210-L232).

---

### 4️⃣ Section 4 — Behavioral Modeling
* **Owner:** **Vincent**
* **Tasks:**
  * **4.1 Sequence Diagrams:** Create and export 5 sequence diagrams in draw.io based on the requirements in [Sequence-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Sequence-Diagrams.md). Insert them along with descriptions:
    * **4.1.1 SD-01:** Register & Login
    * **4.1.2 SD-02:** Quiz Attempt & Automated Feedback
    * **4.1.3 SD-03:** Create Course Content
    * **4.1.4 SD-04:** Advisor Reviews Student Progress
    * **4.1.5 SD-05:** Admin Moderates Content
  * **4.2 State Diagrams:** Create and export 5 state diagrams based on [State-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/State-Diagrams.md):
    * **4.2.1 ST-01:** User Account States (Pending → Active → Suspended → Deactivated)
    * **4.2.2 ST-02:** Course States (Draft → Published → Active → Completed → Archived)
    * **4.2.3 ST-03:** Quiz States (Draft → Published → Active → Closed → Archived)
    * **4.2.4 ST-04:** Assignment Submission States (Not Started → In Progress → Submitted → Under Review → Graded)
    * **4.2.5 ST-05:** Enrollment States (Enrolled → Active → Completed/Withdrawn)

---

### 5️⃣ Section 5 — Architecture Design
* **Owner:** **Aziel**
* **Tasks:**
  * **5.1 Software Architecture:** Describe the 4-layer architecture (Presentation, Application Logic, Data/Security, Integration). Copy text from [Part-II-Design-Report.md L312](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L310-L314). Create and export a clean architecture layer block diagram. Copy the subsystem assignment table (L318-L323).
  * **5.1.1 Subsystem 1 (Auth & User):** Copy description from L325-L327.
  * **5.1.2 Subsystem 2 (Course & Content):** Copy description from L329-L331.
  * **5.1.3 Subsystem 3 (Grading & Progress):** Copy description from L333-L335.
  * **5.1.4 Subsystem 4 (Notifications & Support):** Copy description from L337-L339.

---

### 6️⃣ Section 6 — Interface Design
* **Owner:** **Kian Rong**
* **Tasks:**
  * **6.1 Main Screens:** Create wireframes/mockups for all 14 screens defined in [Interface-Design.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Interface-Design.md) (e.g., using Figma, draw.io, or PowerPoint). Export as PNGs, insert into the template, and copy their descriptions.
  * **6.2 Subsystem 1 Screens:** Explain how Screens 1, 14, and 12 (Users tab) connect.
  * **6.3 Subsystem 2 Screens:** Explain how Screens 3, 4, 9, and 10 connect.
  * **6.4 Subsystem 3 Screens:** Explain how Screens 5, 6, 7, 2 (progress), and 8 (analytics) connect.
  * **6.5 Subsystem 4 Screens:** Explain how Screens 13, 11, and 12 (Content/Announcements) connect.

---

### 7️⃣ Section 7 — Component Design
* **Owner:** **Kian Rong**
* **Tasks:**
  * **7.1 Main Components:** Copy the 10-row components mapping table from [Part-II-Design-Report.md L396-L407](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L396-L407).
  * **7.1.1 Component 1 (GradingService):** Copy the pseudocode algorithm from [Part-II-Design-Report.md L413-L449](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L413-L449). Create a basic flowchart diagram illustrating this grading logic for extra presentation marks.

---

### 8️⃣ Section 8 — Deployment Design
* **Owner:** **Wing Kit**
* **Tasks:**
  * **8.1 Deployment Diagram:** Create a UML deployment diagram representing Vercel (Next.js client/server) interacting with Supabase services (Auth, Database, Storage).
  * Copy the deployment responsibility table and GitHub workflow explanation from [Part-II-Design-Report.md L462-L470](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L462-L470).

---

### 9️⃣ Section 9 — Summary & References
* **Owner:** **Wing Kit**
* **Tasks:**
  * **Summary:** Copy from [Part-II-Design-Report.md L476-L478](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L474-L478).
  * **References:** Copy the 10 references from [Part-II-Design-Report.md L484-L493](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L484-L493) and ensure APA format styling.

---

## Revision & Submission Checklist

- [ ] All `TO DO` placeholders in the report replaced with actual content.
- [ ] Diagrams exported (300 DPI PNG) and inserted cleanly (no broken layouts).
- [ ] Cover page details complete and Table of Contents updated.
- [ ] File formatting checked for consistency (fonts, margins).
- [ ] Wing Kit final review and sign-off.
