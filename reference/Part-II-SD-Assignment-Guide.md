# Part II SD — Team Assignment Guide (7-Section Split)

> **Template**: Updated Project Part II SD - Template 2610
> **Project**: QuestLearn — Group 5, TT7L
> **Submission Deadline**: 5 June 2026
> **Source Report**: [Part-II-Design-Report.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md)

---

## The 2-2-2-1 Section Allocation Strategy

Based on the **Updated Project Part II SD - Template 2610**, there are exactly **7 main sections**. To ensure a clean division of labor, the sections are allocated so that **three members own exactly 2 major sections**, and **one member owns 1 major section** (because Section 2 is massive and requires 5 sequence diagrams).

| Team Member | Sections Assigned | Main Focus |
| --- | --- | --- |
| **Wing Kit** | **Section 1** (System Overview) & **Section 7** (Deployment Design) | High-level system structure, assumptions, deployment diagram, and final compilation review. |
| **Aziel** | **Section 4** (Architecture Design) & **Section 5** (Interface Design) | Architecture diagrams, subsystem breakdown, and all 14 screen wireframes. |
| **Kian Rong** | **Section 3** (Data Design) & **Section 6** (Component Design) | Database design (ERD, data dictionary), components table, and inserting the activity diagrams/pseudocode. |
| **Vincent** | **Section 2** (Use Cases) | Massive section: writing the actor use cases and creating/exporting all 5 Sequence Diagrams. |

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

### 2️⃣ Section 2 — Use Cases
* **Owner:** **Vincent**
* **Tasks:**
  * **2.1 Use Case Diagram:** Insert the same Use Case diagram again (or reference 1.4).
  * **Organize by Actor:** Group the 9 use cases under their primary actors (Student, Instructor, Advisor, Admin).
  * **Write Descriptions:** Copy descriptions for all 9 use cases from [Part-II-Design-Report.md L112-L165](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L112-L165).
  * **Create & Insert Sequence Diagrams:** Create and export 5 sequence diagrams in draw.io based on the requirements in [Sequence-Diagrams.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Sequence-Diagrams.md). Place them under their respective use cases:
    * **SD-01:** UC-01 Register & Login
    * **SD-02:** UC-03 Quiz Attempt & Automated Feedback
    * **SD-03:** UC-05 Create Course Content
    * **SD-04:** UC-08 Advisor Reviews Student Progress
    * **SD-05:** UC-09 Admin Moderates Content

---

### 3️⃣ Section 3 — Data Design
* **Owner:** **Kian Rong**
* **Tasks:**
  * **3.1 Design Class Diagram / ERD:** Export the high-resolution ERD from [ERD-UML.drawio.xml](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-i/ERD-UML.drawio.xml) and insert it. Copy the 1-2 paragraph description from [Part-II-Design-Report.md L172-L178](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L172-L178).
  * **3.2 Data Dictionary:** Format the 21-row table containing all entities, key attributes, types, and purposes from [Part-II-Design-Report.md L184-L206](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L184-L206).
  * **3.3 Data Structures:** Detail the four logical groups (Identity, Learning Structure, Assessment, Support/Analytics) using descriptions in [Part-II-Design-Report.md L210-L232](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L210-L232).

---

### 4️⃣ Section 4 — Architecture Design
* **Owner:** **Aziel**
* **Tasks:**
  * **4.1 Software Architecture:** Describe the 4-layer architecture (Presentation, Application Logic, Data/Security, Integration). Copy text from [Part-II-Design-Report.md L312](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L310-L314). Create and export a clean architecture layer block diagram. Copy the subsystem assignment table (L318-L323).
  * **4.1.1 Subsystem 1 (Auth & User):** Copy description from L325-L327.
  * **4.1.2 Subsystem 2 (Course & Content):** Copy description from L329-L331.
  * *Note: You can add 4.1.3 and 4.1.4 for the remaining two subsystems if the template allows.*

---

### 5️⃣ Section 5 — Interface Design
* **Owner:** **Aziel**
* **Tasks:**
  * **5.1 Main Screens:** Create wireframes/mockups for all 14 screens defined in [Interface-Design.md](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Interface-Design.md) (e.g., using Figma, draw.io, or PowerPoint). Export as PNGs, insert into the template, and copy their descriptions.
  * **5.2 Subsystem 1 Screens:** Explain how Screens 1, 14, and 12 (Users tab) connect.
  * **5.3 Subsystem 2 Screens:** Explain how Screens 3, 4, 9, and 10 connect.
  * *Note: Group the remaining screens into additional sub-sections as needed.*

---

### 6️⃣ Section 6 — Component Design
* **Owner:** **Kian Rong**
* **Tasks:**
  * **6.1 Main Components:** Copy the 10-row components mapping table from [Part-II-Design-Report.md L396-L407](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L396-L407).
  * **6.1.1 Component 1 (GradingService & Others):**
    * Copy the pseudocode algorithm from [Part-II-Design-Report.md L413-L449](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L413-L449).
    * Since the template asks for Activity Diagrams here ("_There should be algorithm, pseudocode, flowchart, activity diagram to support the processing in the component_"), **export the 9 existing Activity Diagrams** (`Activity-Diagrams_UC-XX.drawio.xml`) from the `part-i/` folder as PNGs and insert them into this section to support your component processing descriptions.

---

### 7️⃣ Section 7 — Deployment Design
* **Owner:** **Wing Kit**
* **Tasks:**
  * **7.1 Deployment Diagram:** Create a UML deployment diagram representing Vercel (Next.js client/server) interacting with Supabase services (Auth, Database, Storage).
  * Copy the deployment responsibility table and GitHub workflow explanation from [Part-II-Design-Report.md L462-L470](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L462-L470).

---

## References (Add to end)
* **Owner:** **Vincent** (can combine this with his Section 2 work).
* **Tasks:** Copy the 10 references from [Part-II-Design-Report.md L484-L493](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF%20Project/part-ii/Part-II-Design-Report.md#L484-L493) and ensure APA format styling.

---

## Revision & Submission Checklist

- [ ] All `TO DO` placeholders in the report replaced with actual content.
- [ ] Diagrams exported (300 DPI PNG) and inserted cleanly (no broken layouts).
- [ ] Cover page details complete and Table of Contents updated.
- [ ] File formatting checked for consistency (fonts, margins).
- [ ] Wing Kit final review and sign-off.
