# Part II — Interface Design

This document describes the interface design for QuestLearn's 14 key screens. Each screen description includes its purpose, layout structure, key UI elements, data displayed, user actions, and responsive behavior. Wireframes should be created in Figma, draw.io, or similar tools based on these specifications.

---

## Design Principles

1. **Consistency** — All screens use the same navigation structure, colour palette, typography, and spacing.
2. **Role-Based Navigation** — The sidebar menu adapts based on the authenticated user's role, showing only relevant items.
3. **Responsive Design** — All screens adapt to desktop (≥1200px), tablet (768–1199px), and mobile (<768px) viewports.
4. **Accessibility** — All interactive elements have visible focus states, sufficient colour contrast (WCAG AA), and descriptive labels.
5. **Feedback** — User actions produce immediate visual feedback (loading indicators, success messages, error alerts).

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#1976D2` | Buttons, links, active states |
| Secondary | `#7C4DFF` | Accents, badges, highlights |
| Success | `#2E7D32` | Completed states, pass indicators |
| Warning | `#ED6C02` | Overdue items, low progress |
| Error | `#D32F2F` | Errors, failed states |
| Background | `#F5F5F5` | Page background |
| Surface | `#FFFFFF` | Cards, panels |
| Text Primary | `#212121` | Headings, body text |
| Text Secondary | `#757575` | Labels, captions |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page Title | Inter | 24px | 600 |
| Section Heading | Inter | 18px | 600 |
| Body Text | Inter | 14px | 400 |
| Caption | Inter | 12px | 400 |
| Button | Inter | 14px | 500 |

---

## Screen 1: Login and Registration Page

**Purpose:** Allow users to create an account or log in to the system.

**Layout:**
- Centred card on a gradient background
- Two tabs: "Login" and "Register"

**Login Tab Elements:**
- Email input field
- Password input field (with show/hide toggle)
- "Log In" primary button
- "Forgot Password?" link → directs to admin contact info
- Error message area for invalid credentials

**Register Tab Elements:**
- Full name input
- Email input
- Student/Staff ID input
- Password input with strength indicator
- Role selector (Student / Instructor dropdown)
- Department / Programme input
- "Register" primary button
- Terms and conditions checkbox

**Validation:** Real-time field validation with inline error messages.

**Responsive:** Card fills full width on mobile; split layout with illustration on desktop.

---

## Screen 2: Student Dashboard

**Purpose:** Give students an overview of their learning progress, upcoming deadlines, and recent activity.

**Layout:**
- Top: Welcome banner with student name and avatar
- Left: Sidebar navigation (Dashboard, My Courses, Grades, Notifications, Profile)
- Main: Content grid with cards

**Card Components:**
1. **Enrolled Courses** — List of course cards with progress bar, last accessed date
2. **Upcoming Deadlines** — Assignment and quiz deadlines sorted by date, with warning colour for overdue
3. **Recent Quiz Results** — Latest quiz scores with pass/fail indicator
4. **Recommended Next Steps** — Suggested lessons or topics based on weak areas
5. **Progress Overview** — Overall completion percentage across all courses
6. **Notifications** — Latest 3 unread notifications with "View All" link

**Responsive:** Cards stack vertically on mobile; 2-column grid on tablet; 3-column on desktop.

---

## Screen 3: Course Page

**Purpose:** Display course details with module and lesson navigation.

**Layout:**
- Top: Course header (title, code, instructor name, description)
- Left: Module sidebar listing all modules with expand/collapse
- Main: Selected module's lessons list

**Elements:**
- Module items show: title, lesson count, completion badge (✓ if all lessons completed)
- Lesson items show: title, type icon (video/reading/mixed), completion status, duration estimate
- "Start Lesson" button for each lesson
- Progress bar at module level

**Responsive:** Module sidebar becomes a top accordion on mobile.

---

## Screen 4: Lesson Viewer

**Purpose:** Display lesson content including embedded video and reading material.

**Layout:**
- Top: Breadcrumb navigation (Course → Module → Lesson)
- Main (left 70%): Content area with video player and reading text
- Sidebar (right 30%): Lesson outline, next/previous navigation, quiz link

**Elements:**
- Embedded YouTube video player (responsive, maintains 16:9 ratio)
- Reading content rendered as formatted HTML/Markdown
- "Mark as Complete" button
- "Take Quiz" button (appears if lesson has a quiz)
- Lesson progress indicator (percentage)

**Responsive:** Sidebar moves below content on mobile; video player scales to full width.

---

## Screen 5: Quiz Interface

**Purpose:** Present quiz questions to students with timer and navigation.

**Layout:**
- Top: Quiz title, timer countdown, question counter (e.g., "3 of 10")
- Main: Current question with answer options
- Bottom: Navigation bar (Previous, Next, Submit)

**Elements:**
- Question prompt text
- Answer options: Radio buttons for MCQ, text input for fill-in-blank, textarea for short answer
- Question navigation sidebar (numbered circles, filled for answered, empty for unanswered)
- Warning modal on Submit if unanswered questions exist
- Timer warning at 5 minutes remaining (colour change to red)

**Responsive:** Navigation sidebar becomes a bottom scrollable strip on mobile.

---

## Screen 6: Quiz Results and Feedback Page

**Purpose:** Display quiz score, per-question feedback, weak topics, and recommended next steps.

**Layout:**
- Top: Score summary card (score/total, percentage, pass/fail badge)
- Main: Per-question breakdown table
- Bottom: Weak topics section and recommendations

**Elements:**
- **Score Card:** Large score display, percentage ring chart, pass/fail indicator
- **Question Breakdown Table:**
  | # | Question | Your Answer | Correct Answer | Result | Explanation |
  |---|----------|-------------|----------------|--------|-------------|
- Incorrect answers highlighted in red, correct in green
- **Weak Topics:** List of topics where the student scored below threshold
- **Recommended Next Steps:** Links to specific lessons that cover weak topics
- "Retake Quiz" button (if retakes are allowed)
- "Back to Lesson" button

**Responsive:** Table scrolls horizontally on mobile; cards stack vertically.

---

## Screen 7: Student Grades and Progress Page

**Purpose:** Show a student's complete assessment history and performance trends.

**Layout:**
- Top: Overall GPA/average score summary
- Main: Tabs for "Quiz History" and "Assignment History"
- Bottom: Performance trend chart

**Elements:**
- **Quiz History Tab:** Table with columns: Course, Quiz, Score, Date, Feedback link
- **Assignment History Tab:** Table with columns: Course, Assignment, Status, Score, Submitted Date
- **Performance Trend Chart:** Line chart showing quiz scores over time (Chart.js)
- Filter options: By course, by date range
- Export button (CSV download)

---

## Screen 8: Instructor Dashboard

**Purpose:** Give instructors an overview of their courses and student performance.

**Layout:**
- Left: Sidebar (Dashboard, My Courses, Question Bank, Announcements, Profile)
- Main: Analytics cards and charts

**Card Components:**
1. **My Courses** — Course cards with student count, average score, active status
2. **Class Performance** — Bar chart of average quiz scores per course
3. **Engagement Metrics** — Pie chart of lesson completion rates
4. **Recent Submissions** — Latest assignment submissions awaiting review
5. **Announcements** — Recent course announcements with edit button

---

## Screen 9: Instructor Course Management Page

**Purpose:** Allow instructors to manage course structure, modules, lessons, and published content.

**Layout:**
- Top: Course details header with Edit button
- Main: Tabs for Modules, Quizzes, Assignments, Enrolled Students

**Elements:**
- **Modules Tab:** Draggable module list with Add/Edit/Delete, expand to show lessons
- **Quizzes Tab:** Quiz list with status badge, question count, Edit/Preview buttons
- **Assignments Tab:** Assignment list with deadline, submission count, Grade button
- **Students Tab:** Enrolled student table with name, progress %, last active

---

## Screen 10: Assessment Creation Page

**Purpose:** Allow instructors to create and configure quizzes and assignments.

**Layout:**
- Top: Assessment type selector (Quiz / Assignment)
- Main: Configuration form
- Bottom: Save as Draft / Publish buttons

**Quiz Form Elements:**
- Title, linked lesson selector, total marks, time limit
- Randomization toggle
- Question selector (pick from question bank or create new)
- Question preview area
- Feedback configuration per question

**Assignment Form Elements:**
- Title, description (rich text editor), deadline picker
- Total marks, submission type (file upload / text)
- Late submission policy toggle
- Linked lesson (optional)

---

## Screen 11: Advisor Dashboard

**Purpose:** Allow academic advisors to monitor students in their department.

**Layout:**
- Left: Sidebar (Dashboard, My Students, Follow-ups, Profile)
- Main: Student overview with filters

**Elements:**
- **Department filter** dropdown
- **Student Table:** Name, Programme, Avg. Progress %, Latest Quiz Score, Overdue Items count
- Row colours: Green (>70% progress), Yellow (40-70%), Red (<40%)
- Click row → Student detail view
- **Student Detail View:** Progress by course, quiz history, overdue assignments, activity timeline
- **Follow-up Action:** Text area for message, Send button, follow-up history log

---

## Screen 12: Admin Panel

**Purpose:** Allow admins to manage users, moderate content, and create announcements.

**Layout:**
- Left: Sidebar (Dashboard, Users, Content, Announcements, Platform Analytics, Settings)
- Main: Content area based on selected tab

**Users Tab:**
- User table with Name, Email, Role, Status, Actions (Approve / Suspend / Reset Password)
- Filter by role, status
- Bulk action toolbar

**Content Tab:**
- Flagged content list with course, content type, reason, Review button
- Approve / Remove actions

**Announcements Tab:**
- Announcement list with title, scope, date, status
- "Create Announcement" button → form with title, message, scope selector

**Platform Analytics Tab:**
- Stat cards: Total Users, Active Courses, Quiz Attempts This Week, Active Sessions
- Activity trend chart (last 30 days)

---

## Screen 13: Notification Inbox

**Purpose:** Display all notifications for the current user.

**Layout:**
- Top: "All" / "Unread" filter tabs
- Main: Notification list

**Elements:**
- Notification items: Icon (type-based), message, timestamp, read/unread indicator
- Click to mark as read and navigate to relevant page
- "Mark All as Read" button
- Notification types: Deadline reminder (⏰), New content (📘), Quiz score (📊), Announcement (📢)

---

## Screen 14: Profile Settings Page

**Purpose:** Allow users to view and edit their profile information.

**Layout:**
- Top: Profile header with avatar, name, role badge
- Main: Editable form fields (role-specific)

**Student Fields:** Full name, email (read-only), student ID (read-only), academic level, programme, department, learning preference

**Instructor Fields:** Full name, email (read-only), staff ID (read-only), specialization, subjects taught, office hours

**Advisor Fields:** Full name, email (read-only), staff ID (read-only), department, office hours

**Common Elements:**
- Change password section (current + new + confirm)
- Save Changes button
- Cancel button

---

## Screen Mapping to Use Cases

| Screen | Primary Use Cases |
|--------|------------------|
| Login/Registration | UC-01 |
| Student Dashboard | UC-02, UC-03 |
| Course Page | UC-02, UC-05 |
| Lesson Viewer | UC-02, UC-06 |
| Quiz Interface | UC-03 |
| Quiz Results | UC-03 |
| Grades Page | UC-03, UC-04 |
| Instructor Dashboard | UC-05, UC-07 |
| Course Management | UC-05, UC-06 |
| Assessment Creation | UC-07 |
| Advisor Dashboard | UC-08 |
| Admin Panel | UC-09 |
| Notification Inbox | All actors |
| Profile Settings | UC-01 |
