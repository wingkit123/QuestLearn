# QuestLearn Use Cases

## Overview

This document provides the use case reference for QuestLearn. It is written to support both academic report writing and UML diagram preparation. The content includes a full role-based use case list, formal use case descriptions, and process-flow drafts that can later be redrawn as submission-grade UML and activity diagrams.

## 1. Full Use Case List

### 1.1 Student Use Cases

1. Register account
2. Log in
3. Log out
4. Manage profile
5. View enrolled courses
6. View course modules
7. View lessons
8. Start lesson
9. Watch embedded video
10. Attempt quiz
11. Submit assignment
12. Receive automated feedback
13. View quiz history
14. View assignment status
15. View module completion progress
16. View recommended next steps
17. Review weak topics
18. View grades and assessment history
19. Receive notifications

### 1.2 Instructor Use Cases

1. Register account
2. Log in
3. Manage instructor profile
4. Create course
5. Edit course details
6. Create module
7. Create lesson
8. Upload video content
9. Add reading content
10. Create quiz (via H5P/Lumi embed)
11. Create assignment
12. Configure automated feedback
13. Publish lesson
14. Publish module
15. Update course content
16. Grade submissions
17. View student attempts
18. View class performance analytics
19. View course engagement analytics
20. Send course announcements
21. Receive notifications

### 1.3 Academic Advisor Use Cases

1. Log in
2. Manage profile
3. View assigned advisees
4. View student progress summary
5. View quiz performance trends
6. View overdue assignments
7. View student learning history summary
8. Send advisory follow-up
9. Monitor follow-up status
10. Receive notifications

### 1.4 Admin Use Cases

1. Log in
2. Manage users
3. Assign roles
4. Approve instructor accounts
5. Manage departments or programmes
6. Moderate learning content
7. Manage announcements
8. View platform-wide analytics
9. Deactivate account
10. Reactivate account
11. Reset user password
12. Receive notifications

## 2. Core Use Cases for the Main Diagram

These are the main use cases to prioritize in the final UML use case diagram:

- Register account
- Log in
- Manage profile
- Start lesson
- Attempt quiz
- Submit assignment
- View progress
- Create course
- Create lesson
- Upload learning content
- Create assignment
- View department students
- Manage users
- Manage announcements

## 3. Diagram-Ready Actor Mapping

### Student

- Register account
- Log in
- Manage profile
- Start lesson
- Attempt quiz
- Submit assignment
- Receive automated feedback
- View progress
- View recommended next steps
- Receive notifications

### Instructor

- Register account
- Log in
- Manage instructor profile
- Create course
- Create module
- Create lesson
- Upload learning content
- Create quiz
- Create assignment
- Grade submissions
- Configure automated feedback
- Publish learning content
- View course engagement analytics
- View student performance analytics
- Send course announcement
- Receive notifications

### Academic Advisor

- Log In
- Manage profile
- View assigned advisees
- Review student progress summary
- Review overdue assignments
- Send advisory follow-up
- Receive notifications

### Admin

- Log In
- Manage users
- Assign roles
- Approve instructor/advisor accounts
- Reset user password
- Moderate learning content
- Manage announcements
- View platform analytics
- Receive notifications

## 4. Formal Use Case Descriptions

### UC-01 Register Account and Login

**Primary Actor:** Student or Instructor  
**Trigger:** The user selects the registration function.  
**Precondition:** The user does not already have an active account.  
**Main Flow:**

1. The user opens the registration page.
2. The user enters required account information (name, email, student/staff ID, password, programme).
3. The system checks whether the email is already registered.
4. If the email is not registered, the system creates the account and assigns the appropriate role.
5. The user enters credentials on the login page.
6. The system validates the credentials and opens the user dashboard.

**Alternate Flow:**

1. If the email is already registered, the system shows an error and directs the user to log in.
2. If the credentials are invalid after 3 attempts, the system locks the account for 15 minutes.

**Postcondition:** The account is created and the user is logged in to their role-appropriate dashboard.

### UC-02 Start Lesson

**Primary Actor:** Student  
**Trigger:** The student selects a lesson from an enrolled course.  
**Precondition:** The student is logged in and enrolled in the selected course.  
**Main Flow:**

1. The student opens a course.
2. The system evaluates module locking status; if the previous lesson's quiz score is >= 50%, the current lesson is unlocked.
3. The student selects an available lesson.
4. The system initializes a `progress_record` row with `completion_status = 'in_progress'` and a baseline percentage.
5. The system displays lesson content, which may include reading material, YouTube embeds, or H5P/Lumi iframes.
6. The student clicks the "Mark Complete" toggle.
7. The system updates the `progress_record` status to `completed` and percentage to `100`.

**Alternate Flow:**

1. If the lesson falls sequentially after a quiz where the student scored < 50%, the system disables the lesson link, applies a locked style, and prevents access.
2. If the lesson is unpublished, the system informs the student that access is not currently available.

**Postcondition:** The lesson access event is stored in `progress_record` for tracking and analytics.

### UC-03 Attempt Quiz and Receive Automated Feedback

**Primary Actor:** Student  
**Trigger:** The student opens an available lesson quiz.  
**Precondition:** The student is logged in and the selected quiz is available.  
**Main Flow:**

1. The student starts the quiz.
2. The system fetches and sorts the questions by `sequence_no`.
3. The student submits answers.
4. The system auto-grades the attempt, calculating `score` and `max_score`, and saves it to the `quiz_attempt` table.
5. The system calculates the percentage. If the percentage is < 50%, the system flags the module as containing a Weak Topic, restricts access to subsequent lessons, and renders a "Weak Topic Detected" recommendation alert banner.
6. If the score is >= 50%, the system unlocks the next module sequences.

**Alternate Flow:**

1. If the quiz submission is incomplete, the system warns the student before final submission.

**Postcondition:** The attempt result is saved for performance analysis, and the course module locking state is dynamically updated based on the score.

### UC-04 Submit Assignment

**Primary Actor:** Student  
**Trigger:** The student opens an active assignment.  
**Precondition:** The student is logged in, enrolled in the course, and the assignment deadline has not passed unless late submission is allowed.  
**Main Flow:**

1. The student opens the assignment details page.
2. The system displays assignment instructions, deadline, and submission rules.
3. The student enters the submission URL (e.g., GitHub repository link or document URL).
4. The system validates that the URL is formatted correctly.
5. The system records the submission time and status.
6. The system confirms successful assignment submission.

**Alternate Flow:**

1. If the submission URL is empty or invalid, the system rejects the submission and requests correction.
2. If the deadline has passed, the system either blocks submission or marks it as late according to configured rules.

**Postcondition:** The assignment submission is stored for instructor review and student history.

### UC-05 Create Course and Learning Structure

**Primary Actor:** Instructor  
**Trigger:** The instructor selects the create course function.  
**Precondition:** The instructor account is active and approved.  
**Main Flow:**

1. The instructor opens the create course page.
2. The instructor enters course details such as title, code, department, and description.
3. The system creates the course record.
4. The instructor adds modules to the course.
5. The instructor adds lessons to each module.
6. The system stores the learning structure for later content publishing and student access.

**Alternate Flow:**

1. If required course details are missing, the system requests correction before saving.

**Postcondition:** The course structure is available for content, quiz, and assignment setup.

### UC-06 Publish Lesson Content

**Primary Actor:** Instructor  
**Trigger:** The instructor opens the lesson editor.  
**Precondition:** A course, module, and lesson already exist.  
**Main Flow:**

1. The instructor selects a lesson.
2. The instructor uploads or links reading material and video content.
3. The instructor saves lesson content.
4. The instructor publishes the lesson.
5. The system makes the lesson available to enrolled students.
6. The system records content publication for notification and analytics purposes.

**Alternate Flow:**

1. If uploaded or embedded content is invalid, the system rejects the content and requests correction.

**Postcondition:** Students can access the published lesson and the system can notify affected users.

### UC-07 Create Assessment and Configure Feedback

**Primary Actor:** Instructor  
**Trigger:** The instructor opens the Course Builder.  
**Precondition:** The instructor has an active course and module.  
**Main Flow:**

1. The instructor selects a module and creates a new lesson of type `h5p_lumi` with a title prefixing "Quiz".
2. The instructor inputs the Lumi/H5P shareable iframe URL.
3. The instructor configures automated feedback threshold rules (e.g. passing score).
4. The instructor saves and publishes the quiz.
5. The system embeds the Lumi player frame into the student lesson view.

**Alternate Flow:**

1. If the Lumi URL is missing or incorrectly formatted, the system displays an error and rejects the save.

**Postcondition:** The quiz assessment is embedded and available for student attempts.

### UC-08 View Advisor Dashboard and Follow Up

**Primary Actor:** Academic Advisor  
**Trigger:** The advisor opens the dashboard.  
**Precondition:** The advisor is logged in and has students in their department.  
**Main Flow:**

1. The advisor opens the advisor dashboard (`/advisor/students`).
2. The system queries the `advisor_student_assignment` table to fetch only the students directly assigned to this advisor.
3. The system displays these students along with progress summaries, quiz scores, overdue work, and active `advisor_alert` signals.
4. The advisor selects an at-risk student.
5. The advisor reviews the student's performance data and alert triggers.
6. The advisor authors a follow-up advisory message, optionally linking an `instructor_profile_id`.
7. The system records the message in `advisor_follow_up` and updates the alert status to resolved.

**Alternate Flow:**

1. If no students require attention, the advisor can still review student progress summaries.

**Postcondition:** The advisor has current information for follow-up and the follow-up action is recorded.

### UC-09 Manage User Registry and Announcements

**Primary Actor:** Admin  
**Trigger:** The admin opens the registry or announcement function.  
**Precondition:** The admin is logged in.  
**Main Flow:**

1. The admin opens the User Registry (`/admin/users`).
2. The system queries all `user` accounts.
3. The admin clicks "Suspend" or "Reactivate" to toggle user access, or "Kick" to permanently delete an account.
4. The system directly updates the `user` table state or cascades deletion.
5. The admin opens the Announcements dashboard (`/admin/announcements`).
6. The admin drafts a broadcast message and publishes it, storing it in the `announcement` table.

**Alternate Flow:**

1. The admin manually creates a new credentialed user by inputting Name, Email, and selecting a Role, instantly generating a profile without public registration.

**Postcondition:** User access states are dynamically changed and platform-wide announcements are made available to all users.

## 5. Process-Flow Drafts

### 5.1 Registration and Login Flow

```mermaid
flowchart TD
    A[Open Registration Page] --> B[Submit Account Details]
    B --> C[System Checks Email]
    C --> D[Create Account]
    D --> E[Login]
    E --> F[Open Dashboard]
```

### 5.2 Student Lesson and Quiz Flow

```mermaid
flowchart TD
    A[Login] --> B[View Enrolled Course]
    B --> C[Check Lock Status]
    C --> D{Is Lesson Locked?}
    D -- Yes --> E[Show Locked Badge]
    D -- No --> F[Start Lesson]
    F --> G[Init Progress Record]
    G --> H[View Content & Mark Complete]
    H --> I[Attempt Quiz]
    I --> J[Auto-Grade Attempt]
    J --> K{Score >= 50%?}
    K -- No --> L[Lock Next Lessons & Show Weak Topic Alert]
    K -- Yes --> M[Unlock Next Lessons]
```

### 5.3 Assignment Submission Flow

```mermaid
flowchart TD
    A[Open Assignment] --> B[Read Instructions and Deadline]
    B --> C[Upload or Submit Work]
    C --> D[Validate Submission]
    D --> E[Store Submission Record]
    E --> F[Update Assignment Status]
    F --> G[Send Submission Confirmation]
```

### 5.4 Instructor Content and Assessment Setup Flow

```mermaid
flowchart TD
    A[Create Course] --> B[Create Modules and Lessons]
    B --> C[Upload Video or Reading Content]
    C --> D[Create Quiz or Assignment]
    D --> E[Configure Feedback and Settings]
    E --> F[Publish Lesson or Assessment]
    F --> G[Notify Students and Enable Tracking]
```

### 5.5 Advisor Review and Follow-Up Flow

```mermaid
flowchart TD
    A[Advisor Login] --> B[Fetch Assigned Advisees]
    B --> C[Review Alerts and Progress]
    C --> D[Select At-Risk Student]
    D --> E[Link Instructor & Send Follow-Up]
    E --> F[Record in advisor_follow_up]
```

### 5.6 Admin Moderation and Announcement Flow

```mermaid
flowchart TD
    A[Admin Login] --> B[View User Registry]
    B --> C[Suspend / Reactivate User]
    B --> D[Manually Add User]
    B --> E[Kick / Delete User]
    A --> F[Open Announcements]
    F --> G[Draft and Broadcast]
    G --> H[Store in announcement table]
```

## 6. Activity Diagrams for Formal Use Cases

### UC-01 Register Account and Login

```mermaid
flowchart TD
    A((Start)) --> B["User goes to homepage and clicks 'Sign Up'"]
    B --> C["User enters name, email, ID (Student/Staff), password, Dept/Prog"]
    C --> D{"Email already registered?"}
    D -- Yes --> E["System shows error: 'Account exists, please log in'"]
    D -- No --> F["System creates account and assigns appropriate role"]
    E --> G["User enters credentials on login page"]
    F --> G
    G --> H{"Credentials valid?"}
    H -- No --> I["3 failed attempts: lock account for 15 min"]
    I --> N1((End))
    H -- Yes --> J["System opens User Dashboard"]
    J --> N2((End))
```

### UC-02 Start Lesson

```mermaid
flowchart TD
    A((Start)) --> B[Open course]
    B --> C[Evaluate lock status]
    C --> D{Lesson locked?}
    D -- Yes --> E[Apply locked style and disable link]
    E --> Z((End))
    D -- No --> F[Display lesson content]
    F --> G[Initialize progress record to in_progress]
    G --> H[Student clicks Mark Complete]
    H --> I[Update progress to completed]
    I --> Z
```

### UC-03 Attempt Quiz and Receive Automated Feedback

```mermaid
flowchart TD
    A((Start)) --> B[Open available quiz]
    B --> C[Fetch and sort questions]
    C --> D[Student submits answers]
    D --> E{Submission complete?}
    E -- No --> F[Warn student before final submission]
    F --> D
    E -- Yes --> G[Auto-grade calculating score and max_score]
    G --> H[Save to quiz_attempt table]
    H --> I{Score < 50%?}
    I -- Yes --> J[Lock subsequent lessons]
    J --> K[Render Weak Topic recommendation alert]
    K --> L((End))
    I -- No --> M[Unlock subsequent lessons]
    M --> L
```

### UC-04 Submit Assignment

```mermaid
flowchart TD
    A((Start)) --> B[Open assignment details]
    B --> C[Read instructions and deadline]
    C --> D[Enter submission URL]
    D --> E{URL valid?}
    E -- No --> F[Reject submission and request URL correction]
    F --> D
    E -- Yes --> G{Deadline passed?}
    G -- Yes --> H{Late submission allowed?}
    H -- No --> F
    H -- Yes --> I[Mark submission as late]
    G -- No --> J[Store submission time and status]
    I --> J
    J --> K[Confirm successful submission]
    K --> L((End))
```

### UC-05 Create Course and Learning Structure

```mermaid
flowchart TD
    A((Start)) --> B[Open create course page]
    B --> C[Enter course details]
    C --> D{Required details complete?}
    D -- No --> C
    D -- Yes --> E[Create course record]
    E --> F[Add modules]
    F --> G[Add lessons to modules]
    G --> H[Store learning structure]
    H --> I((End))
```

### UC-06 Publish Lesson Content

```mermaid
flowchart TD
    A((Start)) --> B[Open lesson editor]
    B --> C[Select existing lesson]
    C --> D[Upload or link content]
    D --> E{Content valid?}
    E -- No --> F[Reject content and request correction]
    F --> D
    E -- Yes --> G[Save lesson content]
    G --> H[Publish lesson]
    H --> I[Make lesson available to enrolled students]
    I --> J[Record publication for tracking]
    J --> K((End))
```

### UC-07 Create Assessment and Configure Feedback

### UC-07 Create Assessment and Configure Feedback

```mermaid
flowchart TD
    A((Start)) --> B[Open Course Builder]
    B --> C[Create Lesson of Type h5p_lumi with Quiz prefix]
    C --> D[Input Lumi/H5P shareable iframe URL]
    D --> E{URL formatted correctly?}
    E -- No --> D
    E -- Yes --> F[Configure automated feedback rules]
    F --> G[Save and publish Lesson]
    G --> H[Embed Lumi iframe player in student view]
    H --> I((End))
```

### UC-08 View Advisor Dashboard and Follow Up

```mermaid
flowchart TD
    A((Start)) --> B[Open advisor dashboard]
    B --> C[Query advisor_student_assignment]
    C --> D[Display assigned students & alerts]
    D --> E{Alerts active?}
    E -- No --> F[Review progress summaries]
    F --> Z((End))
    E -- Yes --> G[Select at-risk student]
    G --> H[Review quiz performance & alerts]
    H --> I[Write follow-up message & link instructor]
    I --> J[Insert into advisor_follow_up]
    J --> Z
```

### UC-09 Manage User Registry and Announcements

```mermaid
flowchart TD
    A((Start)) --> B[Open User Registry]
    B --> C[View All Accounts]
    C --> D{Decision?}
    D -- Toggle Access --> E[Update status to active or suspended]
    D -- Add User --> F[Create User and Profile]
    D -- Broadcast --> G[Open Announcements Dashboard]
    G --> H[Publish message to announcement table]
    E --> Z((End))
    F --> Z
    H --> Z
```
