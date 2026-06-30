# System Documentation
## Individual Report (Student Subsystem)

**Course: Software Engineering Fundamentals (SEF)**  
**Project: QuestLearn Platform**  
**Version 3.0**

**Tutorial Section: TT7L**  
**Group No.: G5**

| Name | Student ID |
| ---- | ---------- |
| **See Wing Kit** | **261UC240PJ** |

**Date: 30 June 2026**

---

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
  - [3.1 Use Cases & Sequence Diagrams](#31-use-cases--sequence-diagrams)
    - [3.1.1 Use Case 1: Quiz Attempt, Auto-Grading, and Notification Loop](#311-use-case-1-quiz-attempt-auto-grading-and-notification-loop)
    - [3.1.2 Use Case 2: Load Dashboard and Trigger Recommendation/Locking Logic](#312-use-case-2-load-dashboard-and-trigger-recommendationlocking-logic)
  - [3.2 Data Dictionary](#32-data-dictionary)
  - [3.3 Subsystem Architecture](#33-subsystem-architecture)
  - [3.4 Subsystem Screens](#34-subsystem-screens)
  - [3.5 Subsystem Components](#35-subsystem-components)
    - [3.5.1 Component 1: Quiz Submission Auto-Grading & Alert Trigger](#351-component-1-quiz-submission-auto-grading--alert-trigger)
    - [3.5.2 Component 2: Rule-Based Module Locking & Suggestion Generator](#352-component-2-rule-based-module-locking--suggestion-generator)
  - [3.6 Student State Transition Diagram](#36-student-state-transition-diagram)
- [4 Implementation](#4-implementation)
  - [4.1 Development Environment](#41-development-environment)
  - [4.2 Main Program Codes](#42-main-program-codes)
  - [4.3 UI Implementation & Screen Layouts](#43-ui-implementation--screen-layouts)
- [5 Testing](#5-testing)
  - [5.1 Test Data](#51-test-data)
  - [5.2 Acceptance Testing](#52-acceptance-testing)
  - [5.3 Test Results](#53-test-results)
- [6 Conclusion](#6-conclusion)

---

# Revisions

| Version | Primary Author(s) | Description of Version | Date Completed |
| ------- | ----------------- | ---------------------- | -------------- |
| 1.0 | See Wing Kit | SRS in Part 1 (Requirements Analysis and Actor Mapping) | 01/05/2026 |
| 2.0 | See Wing Kit | SDS in Part 2 (Interface Specifications, Database Schema, UML Drafts) | 05/06/2026 |
| 3.0 | See Wing Kit | System Documentation in Part 3 (H5P/Lumi, Recommendation Logic, Testing) | 30/06/2026 |

---

# 1 System Overview

## 1.1 Description
The Student Subsystem in **QuestLearn** is designed to provide a highly interactive, responsive, and adaptive learning environment for students. The core focus areas of this subsystem are:
1. **Interactive Content Delivery (H5P/Lumi Integration)**: Renders interactive slides, drag-and-drop activities, short answers, and multiple-choice questions embedded via safe, responsive iframe containers directly tied to the database.
2. **Mobile-First Responsive UI**: Built with Next.js and Tailwind CSS utility rules, providing optimal readability, layout transitions, and touch-friendly controls across smartphones, tablets, and desktop displays.
3. **Adaptive Rule-Based Recommendations**: Implements client-side and server-side rules. When a student scores less than 50% on a quiz (`progress_record.percentage < 50`), the system automatically flags a "Weak Topic", locks succeeding lesson elements within that module, creates an early alert for the Academic Advisor, and displays a recommended recovery study path to guide the student's retrieval.

## 1.2 Use Cases

The Student subsystem implements the following 9 use cases:

* **UC-STU-01: Register & Log In**: Accessing the platform by creating a Student account or logging in using email and password.
* **UC-STU-02: Manage Profile & Preferences**: Editing personal profile details, academic level (Year 1), programme (Degree in Computer Science), and choosing a learning preference (Visual/Auditory/Reading/Kinesthetic).
* **UC-STU-03: View Enrolled Courses & Progress**: Navigating the student dashboard to see active enrollments, overall progress percentages, and upcoming deadlines.
* **UC-STU-04: Browse Course Curriculum**: Viewing modules and lessons within a specific course, with checkmarks for completed lessons, red warnings for failed quizzes, and lock indicators for locked content.
* **UC-STU-05: Access Lesson Content**: Viewing mixed learning resources, including reading text, embedded video players, and interactive H5P/Lumi activity iframes.
* **UC-STU-06: Submit Quiz Attempt**: Attempting an online quiz with objective question formats (MCQ, short answer, fill-in-blank) and receiving an instant auto-graded score.
* **UC-STU-07: Review Quiz Attempt & Recommendations**: Opening quiz attempt summaries to view correct/incorrect answers, explanations, and weakness-based recovery recommendations.
* **UC-STU-08: View Grade History**: Reviewing past quiz and assessment attempt logs with scores, percentages, and timestamps in `/student/grades`.
* **UC-STU-09: Receive In-App Notifications**: Browsing in-app notifications generated by advisor follow-up logging or system announcements in `/student/notifications`.

## 1.3 Assumptions and Dependencies
* **Auth State Dependency**: The client relies on Supabase Auth to retrieve the active session cookie (`sb-access-token`) and map the `auth.users.id` to `student_profile.user_id`.
* **Lumi Platform Availability**: Interactive quizzes require access to the Lumi cloud hosting domains (`app.lumi.education`) to stream the quiz packages within the iframe player.
* **Auto-Grading Rule Assumption**: The system assumes quiz attempts score integer percentage values between `0` and `100`. A passing threshold is strictly set at `50%`. Any attempt failing this triggers a sequential lock of subsequent lesson IDs in that course module.

---

# 2 Requirements

## 2.1 Use Case Diagram
The following use case diagram illustrates the scope of Wing Kit's student subsystem implementation:

```mermaid
usecaseDiagram
    actor Student as "Student (See Wing Kit)"
    
    rect "QuestLearn - Student Subsystem" {
        usecase UC1 as "UC-STU-01: Register & Log In"
        usecase UC2 as "UC-STU-02: Manage Profile & Preferences"
        usecase UC3 as "UC-STU-03: View Enrolled Courses & Progress"
        usecase UC4 as "UC-STU-04: Browse Course Curriculum"
        usecase UC5 as "UC-STU-05: Access Lesson Content (H5P/Lumi)"
        usecase UC6 as "UC-STU-06: Submit Quiz Attempt"
        usecase UC7 as "UC-STU-07: Review Quiz Attempt & Recommendations"
        usecase UC8 as "UC-STU-08: View Grade History"
        usecase UC9 as "UC-STU-09: Receive In-App Notifications"
    }
    
    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6
    Student --> UC7
    Student --> UC8
    Student --> UC9
```

## 2.2 Class Diagrams / ERD
The data entity design supporting the student subsystem is mapped in the following entity relationship model:

```mermaid
classDiagram
    class User {
        +int user_id (PK)
        +uuid auth_user_id
        +string full_name
        +string email
        +string account_status
    }
    class StudentProfile {
        +int student_profile_id (PK)
        +int user_id (FK)
        +string student_no
        +string academic_level
        +string programme
        +string department
        +string learning_preference
    }
    class Enrollment {
        +int enrollment_id (PK)
        +int student_profile_id (FK)
        +int course_id (FK)
        +timestamp enrolled_at
        +string status
    }
    class Course {
        +int course_id (PK)
        +string course_code
        +string course_title
        +string status
    }
    class Module {
        +int module_id (PK)
        +int course_id (FK)
        +string module_title
        +int sequence_no
    }
    class Lesson {
        +int lesson_id (PK)
        +int module_id (FK)
        +string lesson_title
        +string lesson_type
        +int sequence_no
    }
    class ContentItem {
        +int content_item_id (PK)
        +int lesson_id (FK)
        +string content_type
        +string embed_url
        +text body_text
        +int sequence_no
    }
    class ProgressRecord {
        +int progress_record_id (PK)
        +int student_profile_id (FK)
        +int lesson_id (FK)
        +int percentage
        +string completion_status
    }
    class QuizAttempt {
        +int attempt_id (PK)
        +int quiz_id (FK)
        +int student_profile_id (FK)
        +numeric score
        +int max_score
        +timestamp submitted_at
    }
    class Notification {
        +int notification_id (PK)
        +int user_id (FK)
        +text message
        +boolean is_read
        +timestamp sent_at
    }

    User "1" -- "1" StudentProfile : has
    StudentProfile "1" -- "*" Enrollment : joins
    Course "1" -- "*" Enrollment : has
    Course "1" -- "*" Module : contains
    Module "1" -- "*" Lesson : contains
    Lesson "1" -- "*" ContentItem : contains
    StudentProfile "1" -- "*" ProgressRecord : logs
    Lesson "1" -- "*" ProgressRecord : maps
    StudentProfile "1" -- "*" QuizAttempt : attempts
    User "1" -- "*" Notification : receives
```

---

# 3 Design

## 3.1 Use Cases & Sequence Diagrams

### 3.1.1 Use Case 1: Quiz Attempt, Auto-Grading, and Notification Loop
* **Description**: A student submits answers to a quiz. The server action processes correct answers, logs progress, updates attempts history, and generates advisory alert flags if failing scores occur.

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student (Browser)
    participant Server as Next.js Server Action
    participant DB as Supabase DB
    
    Student->>Server: submitQuizAttempt(answers, quizId)
    Server->>DB: Query correct answers for quiz questions
    DB-->>Server: Return answer keys
    Note over Server: Match student answers with database keys
    Note over Server: Calculate total points & percentage score
    Server->>DB: INSERT INTO quiz_attempt & progress_record
    DB-->>Server: Confirm inserts
    alt Score < 50% (Fail)
        Server->>DB: INSERT INTO advisor_alert (type='low_quiz_score')
        DB-->>Server: Alert recorded
    end
    Server-->>Student: Return attempt score and answer feedback
```

### 3.1.2 Use Case 2: Load Dashboard and Trigger Recommendation/Locking Logic
* **Description**: A student loads the course page. The page fetches current progress records. If a failing score (<50%) is detected on a quiz, succeeding lessons are flagged as locked and a recommended action plan card is generated.

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student (Browser)
    participant Page as Next.js Page Component
    participant DB as Supabase DB
    
    Student->>Page: Request /student/courses/[courseId]
    Page->>DB: Fetch modules, lessons, and student progress records
    DB-->>Page: Return curriculum datasets & percentage scores
    Note over Page: Run lock evaluation:<br/>If any preceding quiz percentage < 50%,<br/>add subsequent module lessons to lockedLessonIds
    Note over Page: Generate weakness-based recovery recommendations
    Page-->>Student: Render HTML page with locked badges and suggestion banner
```

## 3.2 Data Dictionary
Detailed attribute structure of the database tables supporting the Student subsystem:

### 1. `user`
Stores login credentials and account status mapping to Supabase Auth.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `user_id` | `INT` | `PK` | `No` | `SERIAL` | Unique internal user ID. |
| `auth_user_id` | `UUID` | `None` | `Yes`| `None` | Links to `auth.users.id`. |
| `role_id` | `INT` | `FK` | `No` | `None` | References `role(role_id)`. |
| `full_name` | `VARCHAR(150)`| `None`| `No` | `None` | Full name of the user. |
| `email` | `VARCHAR(255)`| `None`| `No` | `None` | Unique email identifier. |
| `account_status`| `VARCHAR(20)` | `None`| `No` | `'pending'`| Status constraint check. |

### 2. `student_profile`
Contains academic details specific to student accounts.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `student_profile_id`| `INT` | `PK` | `No` | `SERIAL` | Unique student profile ID. |
| `user_id` | `INT` | `FK` | `No` | `None` | References `"user"(user_id)`. |
| `student_no` | `VARCHAR(30)` | `None` | `No` | `None` | Unique Student ID number. |
| `academic_level` | `VARCHAR(50)` | `None` | `Yes`| `None` | E.g. `Year 1`. |
| `programme` | `VARCHAR(100)`| `None` | `Yes`| `None` | Specialization program name. |
| `department` | `VARCHAR(100)`| `None` | `Yes`| `None` | Department hosting the student. |
| `learning_preference`|`VARCHAR(50)`| `None` | `Yes`| `None` | Check: `'visual'`, `'auditory'`. |

### 3. `enrollment`
Maps student profiles to enrolled courses.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `enrollment_id` | `INT` | `PK` | `No` | `SERIAL` | Unique enrollment ID. |
| `student_profile_id`| `INT` | `FK` | `No` | `None` | References `student_profile`. |
| `course_id` | `INT` | `FK` | `No` | `None` | References `course`. |
| `status` | `VARCHAR(20)` | `None` | `No` | `'active'`| Check: `'active'`, `'completed'`. |

### 4. `progress_record`
Tracks completion percentages at the lesson node level.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `progress_record_id`| `INT` | `PK` | `No` | `SERIAL` | Unique progress record ID. |
| `student_profile_id`| `INT` | `FK` | `No` | `None` | References `student_profile`. |
| `lesson_id` | `INT` | `FK` | `No` | `None` | References `lesson`. |
| `completion_status` | `VARCHAR(20)` | `None` | `No` | `'not_started'`| Check: `'completed'`, etc. |
| `percentage` | `INT` | `None` | `No` | `0` | Score percentage (0 to 100). |

### 5. `quiz_attempt`
Stores submitted quiz attempt marks.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `attempt_id` | `INT` | `PK` | `No` | `SERIAL` | Unique attempt ID. |
| `quiz_id` | `INT` | `FK` | `No` | `None` | References `quiz`. |
| `student_profile_id`| `INT` | `FK` | `No` | `None` | References `student_profile`. |
| `score` | `NUMERIC(5,2)`| `None` | `Yes`| `None` | Earned quiz points. |
| `max_score` | `INT` | `None` | `Yes`| `None` | Total available points. |
| `submitted_at` | `TIMESTAMP` | `None` | `No` | `CURRENT_TIMESTAMP` | Submission timestamp. |

### 6. `attempt_answer`
Logs student answers to individual questions.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `attempt_answer_id`| `INT` | `PK` | `No` | `SERIAL` | Unique answer record ID. |
| `attempt_id` | `INT` | `FK` | `No` | `None` | References `quiz_attempt`. |
| `question_id` | `INT` | `FK` | `No` | `None` | References `question`. |
| `student_answer` | `TEXT` | `None` | `Yes`| `None` | Answer text submitted. |
| `is_correct` | `BOOLEAN` | `None` | `Yes`| `None` | Correctness flag. |

### 7. `notification`
Delivers advisor messages and platform alerts to student dashboards.
| Attribute | Data Type | Key | Null | Default | Description |
| --------- | --------- | --- | ---- | ------- | ----------- |
| `notification_id` | `INT` | `PK` | `No` | `SERIAL` | Unique notification ID. |
| `user_id` | `INT` | `FK` | `No` | `None` | Target recipient `user(user_id)`. |
| `message` | `TEXT` | `None` | `No` | `None` | Notification content text. |
| `is_read` | `BOOLEAN` | `None` | `No` | `FALSE` | Read status flag. |
| `sent_at` | `TIMESTAMP` | `None` | `No` | `CURRENT_TIMESTAMP` | Logged date. |

---

## 3.3 Subsystem Architecture
The student subsystem utilizes a classic **Model-View-Controller (MVC)** architectural pattern within the Next.js App Router context:
* **View (React / Tailwind CSS)**: Server and Client Components (such as `/student/courses/[courseId]/page.tsx`) that handle the presentation, layouts, and responsive flexboxes.
* **Controller (Next.js Server Actions)**: Handlers like `submitQuizAttempt` that calculate auto-grades, update progress records, and enforce server-side business rules.
* **Model (Supabase / Postgres Client)**: Communicates with PostgreSQL tables, executing CRUD operations and security queries restricted by Row-Level Security (RLS) policies.

```
┌─────────────────────────────────────────────────────────┐
│                   VIEW (Client React)                   │
│      StudentDashboard, CourseDetailPage, IframePlayer   │
└────────────────────────────+────────────────────────────┘
                             │ Submit Answers / GET page
                             ▼
┌─────────────────────────────────────────────────────────┐
│               CONTROLLER (Server Actions)               │
│      submitQuizAttempt, Page Data Fetching Queries      │
└────────────────────────────+────────────────────────────┘
                             │ DB Query / Insert
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  MODEL (Supabase / DB)                  │
│       PostgreSQL Tables & Row Level Security (RLS)      │
└─────────────────────────────────────────────────────────┘
```

---

## 3.4 Subsystem Screens
The student subsystem interfaces include the following responsive layout elements:
1. **Student Dashboard (`/student`)**: Features overall course completion percentage dials, metric indicators for active enrollment counts and upcoming assignments, and a chronological learning activity logger.
2. **Course Curriculum Portal (`/student/courses/[courseId]`)**: Includes modules listings, completed checkmark overlays, failed attempt warning highlights, locked state overlays, and the rule-based weakness-remediation suggestion banner.
3. **Lesson Viewer (`/student/courses/[courseId]/lessons/[lessonId]`)**: Displays a reading node, a video player player, or the interactive H5P iframe.

---

## 3.5 Subsystem Components

### 3.5.1 Component 1: Quiz Submission Auto-Grading & Alert Trigger
* **Description**: Secured Next.js server action component that validates submitted quiz answers against database answer rows and automatically fires warnings if the threshold is failed.

```
[Start Submission]
       │
       ▼
Fetch Correct Answers for Quiz from Database
       │
       ▼
Loop through student answers:
  ├── Compare answer text with DB correct_answer
  ├── Increment points if matched
  └── Mark is_correct = True / False
       │
       ▼
Calculate score percentage: (points / max_points) * 100
       │
       ▼
INSERT attempt into 'quiz_attempt'
       │
       ▼
UPDATE / INSERT 'progress_record' with computed percentage
       │
  Score < 50% ?
       ├── YES ───► INSERT alert into 'advisor_alert' (type='low_quiz_score')
       └── NO ────► Skip alert trigger
       │
       ▼
[End Process & Return Score/Feedback]
```

### 3.5.2 Component 2: Rule-Based Module Locking & Suggestion Generator
* **Description**: Logic embedded in the course detail page that iterates through the modules to enforce curriculum dependencies.

```typescript
// Pseudocode algorithm for Locking and Suggestion generation:
function generateCurriculumState(modules, progressMap):
    let lockedLessonIds = Set()
    let weakTopics = List()
    
    for each module in modules:
        let lockRemaining = false
        let sortedLessons = sort(module.lessons by sequence_no)
        
        for each lesson in sortedLessons:
            if lockRemaining == true:
                add lesson.lesson_id to lockedLessonIds
                continue
                
            let progress = progressMap.get(lesson.lesson_id)
            let isQuiz = lesson.lesson_title.startsWith("Quiz")
            
            if isQuiz == true and progress != null:
                if progress.percentage < 50:
                    // Fail detected! Lock remaining lessons in module
                    add weakness to weakTopics:
                        { lesson: lesson.title, score: progress.percentage, module: module.title }
                    lockRemaining = true
                    
    return { lockedLessonIds, weakTopics }
```

---

## 3.6 Student State Transition Diagram
The transition states of a student's learning progress throughout their coursework registry lifecycle:

```mermaid
stateDiagram
    [*] --> Enrolled : Admin adds student to course
    
    state Enrolled {
        [*] --> Module1_Active
        
        state Module1_Active {
            [*] --> Reading_Material
            Reading_Material --> Quiz1_Attempt
            Quiz1_Attempt --> Quiz1_Failed : Score < 50%
            Quiz1_Attempt --> Quiz1_Passed : Score >= 50%
            
            state Quiz1_Failed {
                [*] --> LockedState : Module Locking Logic fires
                LockedState --> Review_Recommended_Material : Follow Suggestion Card
                Review_Recommended_Material --> Quiz1_Attempt : Retake Quiz
            }
        }
        
        Quiz1_Passed --> Module2_Unlocked : State transition
    }
    
    Module2_Unlocked --> Course_Completed : Complete all module nodes
    Course_Completed --> [*]
```

---

# 4 Implementation

## 4.1 Development Environment
* **Platform Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Bun Package Manager.
* **Database Engine**: PostgreSQL 17.6 hosted on Supabase Cloud.
* **UI/UX Icons**: `lucide-react`.

---

## 4.2 Main Program Codes
The application files managing the Student subsystem logic implemented by See Wing Kit:

| Application | Files | Description |
| ----------- | ----- | ----------- |
| **Student Dashboard** | [page.tsx](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF Project/src/app/(student)/student/page.tsx) | Retrieves enrollments, aggregates progress, counts active deadlines, and lists activity log records. |
| **Course Details Portal** | [page.tsx](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF Project/src/app/(student)/student/courses/[courseId]/page.tsx) | Runs curriculum locking algorithms and renders weak-topic recovery suggestion banners. |
| **Lesson Content Player** | [page.tsx](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF Project/src/app/(student)/student/courses/[courseId]/lessons/[lessonId]/page.tsx) | Dynamic client container loading reading text, video players, and H5P/Lumi iframe engines. |
| **Quiz Action Processor** | [actions.ts](file:///c:/Users/Wing%20Kit/Degree%20Sem%201/Projects/SEF Project/src/app/(student)/student/quizzes/[quizId]/actions.ts) | Executes auto-grading calculations and records attempts in the database. |

### Source Excerpt: Dynamic Iframe rendering in Lesson Player
The following code snippet shows how H5P/Lumi iframes are dynamically handled and rendered responsively:

```tsx
{/* H5P/Lumi Content */}
{item.content_type === "h5p_lumi" && (item.embed_url || item.body_text) && (
  <div>
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-text">
      <LayoutTemplate className="w-5 h-5 text-primary" /> {item.title}
    </h3>
    {item.body_text ? (
      <div 
        className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-white [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
        dangerouslySetInnerHTML={{ __html: item.body_text }}
      />
    ) : (
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-white">
        <iframe
          src={item.embed_url}
          title={item.title}
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    )}
  </div>
)}
```

---

## 4.3 UI Implementation & Screen Layouts
The student layout utilizes structural CSS wrappers to deliver a premium, responsive user experience:
* **Metric Cards Grid**: Utilizes Tailwind's `grid grid-cols-1 md:grid-cols-3 gap-6` to distribute widgets on desktops, transitioning to stacked single columns on mobile displays.
* **Weakness Suggestion Banner**: Uses a warning gradient (`bg-gradient-to-r from-danger/10 via-warning/5 to-danger/10`) with a left-hand border indicator (`border-l-4 border-danger`) to draw student focus to required remediation tasks.
* **Locked Lesson UI**: Lessons classified in `lockedLessonIds` have opacity reduced to 50% (`opacity-50`) with text crossed out (`line-through`) and pointer events blocked (`cursor-not-allowed select-none`) to prevent out-of-order access.

---

# 5 Testing

## 5.1 Test Data
The following records are seeded to verify the student dashboard, progress tracking, and locking rules:
* **Student User**: See Wing Kit (`student@example.com`, `STU-001`, academic level: `Year 1`, program: `Degree in Computer Science`).
* **Active Enrollment**: Enrolled in course `QL-SEF101` (Software Engineering Fundamentals).
* **Progress Scenarios**:
  * **Scenario A (Pass)**: Logs 80% on Module 1 Quiz. Lesson 2 remains unlocked.
  * **Scenario B (Fail)**: Logs 40% score on Quiz 1: Testing Strategies. Weak topic alert fires, recommendations appear, and subsequent lessons in Module 3 are locked.

## 5.2 Acceptance Testing
Acceptance checklist executed on student workflow prototypes:

| Criteria | Test Execution Steps | Expected Outcome | Fulfilled | Remarks |
| -------- | -------------------- | ---------------- | --------- | ------- |
| **H5P Rendering** | Open lesson containing Lumi content | Responsive iframe loads and renders Lumi quiz cleanly | **Yes** | Fully responsive layout aspect ratio. |
| **Quiz Auto-Grading** | Answer and submit quiz questions | Attempt logs in `quiz_attempt` and displays feedback | **Yes** | Verified via database queries. |
| **Module Locking** | Fail Quiz 1 (<50%) and check module | Subsequent lessons in that module show locked badge | **Yes** | Opacity triggers and disables link. |
| **Remediation Alert**| Check course page after failing quiz | Banner appears with target recovery review material | **Yes** | Shows link to Lecture 11. |

**Tested by**: See Wing Kit  
**Verified by**: Soo Kian Rong (QA Lead)  
**Date Tested**: 30 June 2026  
**Status**: **100% Passed**

## 5.3 Test Results
All database updates, including the automatic insertion of alerts and progress changes, were verified against PostgreSQL tables:
* Running `SELECT * FROM progress_record WHERE student_profile_id = 1;` confirms that the percentage column updates to `40` upon submission.
* Running `SELECT * FROM advisor_alert WHERE student_profile_id = 1;` confirms that a `low_quiz_score` record was automatically inserted, linking the advisory alert to the student's dashboard.

---

# 6 Conclusion

The student subsystem has been fully implemented, tested, and integrated. By utilizing Next.js Server Components, PostgreSQL, and Supabase client hooks, we successfully created an adaptive interface. The H5P/Lumi player integrates smoothly with our database structure, and the rule-based recommendation logic behaves as designed under test conditions. 

Moving forward, additional developments could include:
1. **Dynamic H5P state saving**: Storing intermediate responses within the iframe using local storage state.
2. **AI-driven study plan Generation**: Integrating larger recommendation profiles based on historical advisor interventions.
