System Documentation

Individual Report

for

QuestLearn

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: G5**

| **Name** | **Student #** |
| ---------------- | --------------------- |
| Aziel Tan Zheng Chuan | [Student ID]      |

**Date:** 30/6/2026

# Contents

- [Revisions](#revisions)
- [1 System Overview](#1-system-overview)
  - [1.1 Description](#11-description)
  - [1.2 Use Cases](#12-use-cases)
  - [1.3 Assumptions and Dependencies](#13-assumptions-and-dependencies)
- [2 Requirements](#2-requirements)
  - [2.1 Use Case Diagram](#21-use-case-diagram)
  - [2.2 Class Diagrams / ERD](#22-class-diagrams--erd)
- [3 Design](#3-design)
  - [3.1 Use Cases](#31-use-cases)
    - [3.1.1 Use Case 1: Build Course Curriculum](#311-use-case-1-build-course-curriculum)
    - [3.1.2 Use Case 2: Grade Assignment Submissions](#312-use-case-2-grade-assignment-submissions)
  - [3.2 Data Dictionary](#32-data-dictionary)
  - [3.3 Subsystem Architecture](#33-subsystem-architecture)
  - [3.4 Subsystem Screens](#34-subsystem-screens)
  - [3.5 Subsystem Components](#35-subsystem-components)
    - [3.5.1 Component 1: Drag-and-Drop Curriculum Builder](#351-component-1-drag-and-drop-curriculum-builder)
    - [3.5.2 Component 2: Grading Server Action](#352-component-2-grading-server-action)
  - [3.6 Actor 1 State Transition Diagram](#36-actor-1-state-transition-diagram)
- [4 Implementation](#4-implementation)
  - [4.1 Development Environment](#41-development-environment)
  - [4.2 Main Program Codes](#42-main-program-codes)
  - [4.3 Sample Screens](#43-sample-screens)
- [5 Testing](#5-testing)
  - [5.1 Test Data](#51-test-data)
  - [5.2 Acceptance Testing](#52-acceptance-testing)
  - [5.3 Test Results](#53-test-results)
- [6 Conclusion](#6-conclusion)

---

# Revisions

| **Version** | **Primary Author(s)** | **Description of Version** | **Date Completed** |
| ------- | ----------------- | ---------------------- | -------------- |
| 1.0 | Aziel Tan Zheng Chuan | SRS in Part 1 (Requirements Analysis and Actor Mapping) | 01/05/2026 |
| 2.0 | Aziel Tan Zheng Chuan | SDS in Part 2 (Interface Specifications, Database Schema, UML Drafts) | 05/06/2026 |
| 3.0 | Aziel Tan Zheng Chuan | System Documentation in Part 3 (Course Builder, Grading Logic, Testing) | 30/06/2026 |

---

# 1 System Overview

## 1.1 Description
The Instructor Subsystem serves as the content creation and assessment engine of **QuestLearn**. It allows credentialed educators to design modular learning paths, embed dynamic external media (such as YouTube videos and H5P/Lumi interactive quizzes), and review student analytics. It also includes an interface to manually review and grade URL-based text assignment submissions.

## 1.2 Use Cases

| Actor | Use Cases |
| ----- | --------- |
| Instructor | UC-INS-01: Log In as Instructor<br>UC-INS-02: Manage Course Curriculum<br>UC-INS-03: Embed Lesson Content (Video, H5P, Reading)<br>UC-INS-04: Create Module Dependencies<br>UC-INS-05: Grade Assignment Submissions<br>UC-INS-06: View Student Progress Analytics |

## 1.3 Assumptions and Dependencies
**Dependencies:**
1. **Supabase Relational Logic**: The Course Builder UI relies on the strictly nested foreign key hierarchy of `Course -> Module -> Lesson -> Content Item` to properly fetch and render the curriculum tree.
2. **External Embed Support**: The system depends on `iframe` support from external providers (like Lumi) when storing `embed_url` strings in the content database.

**Assumptions:**
1. **Assignment Modality**: It is assumed that assignments are submitted by students as accessible URLs (e.g., links to external code repos or Google Docs), bypassing the need for complex server-side file upload handling and storage buckets in this MVP.
2. **Grading Integer**: It is assumed that assignments are graded out of 100 points, represented as numerical values in the database.

---

# 2 Requirements

## 2.1 Use Case Diagram

```mermaid
usecaseDiagram
    actor Instructor as "Instructor (Aziel Tan Zheng Chuan)"
    
    rect "QuestLearn - Instructor Subsystem" {
        usecase UC1 as "UC-INS-01: Log In as Instructor"
        usecase UC2 as "UC-INS-02: Manage Curriculum"
        usecase UC3 as "UC-INS-03: Embed H5P Lesson Content"
        usecase UC4 as "UC-INS-05: Grade Assignments"
        usecase UC5 as "UC-INS-06: View Progress Analytics"
    }
    
    Instructor --> UC1
    Instructor --> UC2
    Instructor --> UC3
    Instructor --> UC4
    Instructor --> UC5
```

## 2.2 Class Diagrams / ERD

```mermaid
erDiagram
    COURSE ||--|{ MODULE : contains
    MODULE ||--|{ LESSON : contains
    LESSON ||--|{ CONTENT_ITEM : contains
    COURSE ||--|{ ASSIGNMENT_SUBMISSION : owns

    COURSE {
        int course_id PK
        int instructor_profile_id FK
        string course_title
    }
    MODULE {
        int module_id PK
        int course_id FK
        string module_title
    }
    LESSON {
        int lesson_id PK
        int module_id FK
        string lesson_type
    }
    CONTENT_ITEM {
        int content_item_id PK
        int lesson_id FK
        string embed_url
    }
    ASSIGNMENT_SUBMISSION {
        int submission_id PK
        numeric score
        string feedback
        string status
    }
```

---

# 3 Design

## 3.1 Use Cases

### 3.1.1 Use Case 1: Build Course Curriculum
The instructor creates a new module, adds a lesson underneath it, and links an H5P embed URL as a content item.

```mermaid
sequenceDiagram
    autonumber
    actor Instructor as Instructor (Browser)
    participant Client as CourseBuilderClient
    participant Server as Server Actions
    participant DB as Supabase
    
    Instructor->>Client: Click 'Add Module'
    Client->>Server: insertModule(courseId)
    Server->>DB: INSERT INTO module
    DB-->>Server: Returning module_id
    Server-->>Client: Update UI
    Instructor->>Client: Add Lesson & Insert URL
    Client->>Server: insertLessonAndContent()
    Server->>DB: INSERT INTO lesson & content_item
    Server-->>Client: Save Success
```

### 3.1.2 Use Case 2: Grade Assignment Submissions
The instructor reviews a submitted URL, issues a numerical grade, and provides feedback text.

```mermaid
sequenceDiagram
    autonumber
    actor Instructor as Instructor
    participant Action as Grading Server Action
    participant DB as Supabase DB
    
    Instructor->>Action: submitGrade(score, feedback, submissionId)
    Action->>DB: UPDATE assignment_submission SET score, feedback, status='graded'
    DB-->>Action: Confirmation
    Action->>DB: INSERT INTO notification (for student)
    Action-->>Instructor: Redirect back to grading list
```

## 3.2 Data Dictionary

| Table Name | Field Name | Data Type | Length | PK/FK | Required | Null/Not Null | Description |
| ---------- | ---------- | --------- | ------ | ----- | -------- | ------------- | ----------- |
| `user` | `user_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the user table. |
| `user` | `auth_user_id` | `UUID` | `36` | `-` | `No` | `Null` | The auth user id value. |
| `user` | `role_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the role table. |
| `user` | `full_name` | `VARCHAR` | `150` | `-` | `Yes` | `Not Null` | The full name value. |
| `user` | `email` | `VARCHAR` | `255` | `-` | `Yes` | `Not Null` | The email value. |
| `user` | `account_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The account status value. |
| `user` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `instructor_profile` | `instructor_profile_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the instructor_profile table. |
| `instructor_profile` | `user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `instructor_profile` | `staff_no` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The staff no value. |
| `instructor_profile` | `specialization` | `VARCHAR` | `200` | `-` | `No` | `Null` | The specialization value. |
| `instructor_profile` | `subjects_taught` | `TEXT` | `-` | `-` | `No` | `Null` | The subjects taught value. |
| `instructor_profile` | `office_hours` | `VARCHAR` | `200` | `-` | `No` | `Null` | The office hours value. |
| `course` | `course_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the course table. |
| `course` | `instructor_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the instructor_profile table. |
| `course` | `course_code` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The course code value. |
| `course` | `course_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The course title value. |
| `course` | `description` | `TEXT` | `-` | `-` | `No` | `Null` | The description value. |
| `course` | `department` | `VARCHAR` | `100` | `-` | `No` | `Null` | The department value. |
| `course` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `course` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `module` | `module_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the module table. |
| `module` | `course_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the course table. |
| `module` | `module_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The module title value. |
| `module` | `sequence_no` | `INT` | `-` | `-` | `Yes` | `Not Null` | The sequence no value. |
| `module` | `description` | `TEXT` | `-` | `-` | `No` | `Null` | The description value. |
| `module` | `publish_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The publish status value. |
| `lesson` | `lesson_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the lesson table. |
| `lesson` | `module_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the module table. |
| `lesson` | `lesson_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The lesson title value. |
| `lesson` | `lesson_type` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The lesson type value. |
| `lesson` | `content_text` | `TEXT` | `-` | `-` | `No` | `Null` | The content text value. |
| `lesson` | `video_url` | `VARCHAR` | `500` | `-` | `No` | `Null` | The video url value. |
| `lesson` | `sequence_no` | `INT` | `-` | `-` | `Yes` | `Not Null` | The sequence no value. |
| `lesson` | `publish_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The publish status value. |
| `content_item` | `content_item_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the content_item table. |
| `content_item` | `lesson_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the lesson table. |
| `content_item` | `content_type` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The content type value. |
| `content_item` | `title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The title value. |
| `content_item` | `body_text` | `TEXT` | `-` | `-` | `No` | `Null` | The body text value. |
| `content_item` | `resource_url` | `VARCHAR` | `500` | `-` | `No` | `Null` | The resource url value. |
| `content_item` | `storage_path` | `VARCHAR` | `500` | `-` | `No` | `Null` | The storage path value. |
| `content_item` | `embed_url` | `VARCHAR` | `500` | `-` | `No` | `Null` | The embed url value. |
| `content_item` | `sequence_no` | `INT` | `-` | `-` | `Yes` | `Not Null` | The sequence no value. |
| `content_item` | `publish_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The publish status value. |
| `content_item` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `quiz` | `quiz_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the quiz table. |
| `quiz` | `lesson_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the lesson table. |
| `quiz` | `quiz_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The quiz title value. |
| `quiz` | `total_marks` | `INT` | `-` | `-` | `Yes` | `Not Null` | The total marks value. |
| `quiz` | `time_limit` | `INT` | `-` | `-` | `No` | `Null` | in minutes, NULL = no limit |
| `quiz` | `randomized` | `BOOLEAN` | `-` | `-` | `Yes` | `Not Null` | The randomized value. |
| `quiz` | `publish_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The publish status value. |
| `question_bank` | `question_bank_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the question_bank table. |
| `question_bank` | `course_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the course table. |
| `question_bank` | `bank_name` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The bank name value. |
| `question_bank` | `description` | `TEXT` | `-` | `-` | `No` | `Null` | The description value. |
| `question_bank` | `is_active` | `BOOLEAN` | `-` | `-` | `Yes` | `Not Null` | The is active value. |
| `question` | `question_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the question table. |
| `question` | `question_bank_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the question_bank table. |
| `question` | `question_type` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The question type value. |
| `question` | `prompt` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The prompt value. |
| `question` | `correct_answer` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The correct answer value. |
| `question` | `explanation` | `TEXT` | `-` | `-` | `No` | `Null` | The explanation value. |
| `question` | `difficulty` | `VARCHAR` | `10` | `-` | `No` | `Null` | The difficulty value. |
| `question` | `points` | `INT` | `-` | `-` | `Yes` | `Not Null` | The points value. |
| `quiz_question` | `quiz_question_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the quiz_question table. |
| `quiz_question` | `quiz_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the quiz table. |
| `quiz_question` | `question_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the question table. |
| `quiz_question` | `sequence_no` | `INT` | `-` | `-` | `No` | `Null` | The sequence no value. |
| `assignment` | `assignment_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the assignment table. |
| `assignment` | `course_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the course table. |
| `assignment` | `lesson_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the lesson table. |
| `assignment` | `assignment_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The assignment title value. |
| `assignment` | `description` | `TEXT` | `-` | `-` | `No` | `Null` | The description value. |
| `assignment` | `deadline` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The deadline value. |
| `assignment` | `total_marks` | `INT` | `-` | `-` | `Yes` | `Not Null` | The total marks value. |
| `assignment` | `publish_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The publish status value. |
| `assignment` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `assignment_submission` | `submission_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the assignment_submission table. |
| `assignment_submission` | `assignment_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the assignment table. |
| `assignment_submission` | `student_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the student_profile table. |
| `assignment_submission` | `submitted_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The submitted at value. |
| `assignment_submission` | `submission_url` | `VARCHAR` | `500` | `-` | `No` | `Null` | The submission url value. |
| `assignment_submission` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `assignment_submission` | `score` | `NUMERIC` | `5,2` | `-` | `No` | `Null` | The score value. |
| `assignment_submission` | `feedback` | `TEXT` | `-` | `-` | `No` | `Null` | The feedback value. |

## 3.3 Subsystem Architecture
The subsystem uses interactive React Client Components for state-heavy features like the Course Builder (handling deeply nested object rendering and modal state). Next.js Server Actions process the form submissions to ensure database writes are securely authenticated.

## 3.4 Subsystem Screens
1. **Course Builder (`/instructor/courses/[courseId]`)**: A hierarchical interface displaying Modules, the Lessons within them, and the configuration modals for Content Items.
2. **Grading Dashboard (`/instructor/grading`)**: A unified inbox showing ungraded and graded assignments from across all courses taught by the instructor.
3. **Analytics Portal (`/instructor/analytics`)**: Visual summaries of class participation and average quiz scores.

## 3.5 Subsystem Components

### 3.5.1 Component 1: Drag-and-Drop Curriculum Builder
A nested React component tree that manages local state before pushing to the server, allowing for rapid creation of the nested `module -> lesson -> content_item` hierarchy without full page reloads.

### 3.5.2 Component 2: Grading Server Action
A backend function that atomically updates the submission row and simultaneously fires an in-app notification to the student regarding their new grade.

## 3.6 Actor 1 State Transition Diagram
Represents the state of an Assignment Submission.

```mermaid
stateDiagram
    [*] --> Submitted : Student submits URL
    Submitted --> Graded : Instructor issues score & feedback
    Graded --> [*]
```

---

# 4 Implementation

## 4.1 Development Environment
* **Platform Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
* **Database Engine**: PostgreSQL 17.6 hosted on Supabase Cloud.

## 4.2 Main Program Codes

| Application | Files |
| ----------- | ----- |
| Course Curriculum Builder | `src/app/(instructor)/instructor/courses/[courseId]/CourseBuilderClient.tsx` |
| Assignment Grading Inbox | `src/app/(instructor)/instructor/grading/page.tsx` |
| Grade Processor | `src/app/(instructor)/instructor/grading/[submissionId]/actions.ts` |

## 4.3 Sample Screens
*(Insert screenshot of Course Builder hierarchy)*
*(Insert screenshot of Grading Input Form)*

---

# 5 Testing

## 5.1 Test Data
* **Course**: `QL-SEF101`.
* **Action**: Creating a new Module named "Module 4: Advanced Testing" with a Lesson containing a Lumi URL.

## 5.2 Acceptance Testing

| Criteria | Test Execution Steps | Expected Outcome | Fulfilled |
| -------- | -------------------- | ---------------- | --------- |
| **Hierarchy Creation**| Open Course Builder, add Module, add Lesson. | UI updates immediately, items appear in DB. | **Yes** |
| **Embed Rendering** | View Student perspective of created lesson. | The H5P iframe resolves the URL and displays correctly. | **Yes** |
| **Submission Grading**| Grade a mock submission with 95 points. | Status updates to 'graded' and score persists in DB. | **Yes** |

## 5.3 Test Results
All CRUD operations in the `CourseBuilderClient.tsx` successfully executed SQL INSERTS for `module`, `lesson`, and `content_item`. The grading actions successfully updated the `assignment_submission` table.

---

# 6 Conclusion
The Instructor subsystem effectively provides the foundational architecture needed for course administration. By separating the curriculum into the module-lesson-content tree, the platform maintains extreme flexibility for future extensions, such as drag-and-drop reordering. The grading loop successfully integrates with the student's notification inbox, closing the assessment feedback loop.
