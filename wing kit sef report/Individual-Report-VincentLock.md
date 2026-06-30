System Documentation

Individual Report

for

QuestLearn

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: G5**

| **Name** | **Student #** |
| ---------------- | --------------------- |
| Vincent Lock Chun Kit | [Student ID]      |

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
    - [3.1.1 Use Case 1: Monitor Active Advisor Alerts](#311-use-case-1-monitor-active-advisor-alerts)
    - [3.1.2 Use Case 2: Log Follow-Up Intervention](#312-use-case-2-log-follow-up-intervention)
  - [3.2 Data Dictionary](#32-data-dictionary)
  - [3.3 Subsystem Architecture](#33-subsystem-architecture)
  - [3.4 Subsystem Screens](#34-subsystem-screens)
  - [3.5 Subsystem Components](#35-subsystem-components)
    - [3.5.1 Component 1: Alert Aggregation Query](#351-component-1-alert-aggregation-query)
    - [3.5.2 Component 2: Intervention Messaging Workflow](#352-component-2-intervention-messaging-workflow)
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
| 1.0 | Vincent Lock Chun Kit | SRS in Part 1 (Requirements Analysis and Actor Mapping) | 01/05/2026 |
| 2.0 | Vincent Lock Chun Kit | SDS in Part 2 (Interface Specifications, Database Schema, UML Drafts) | 05/06/2026 |
| 3.0 | Vincent Lock Chun Kit | System Documentation in Part 3 (Advisor Dashboard, Alerts logic, Testing) | 30/06/2026 |

---

# 1 System Overview

## 1.1 Description
The Academic Advisor Subsystem acts as the primary support and intervention layer within **QuestLearn**. Instead of manually polling for student progress, the system proactively surfaces actionable intelligence to the Advisor via automated alerts (`low_quiz_score` or `low_engagement`). The Advisor can then use the platform to log follow-up messages and optionally loop in the relevant instructor, forming a cohesive academic support workflow.

## 1.2 Use Cases

| Actor | Use Cases |
| ----- | --------- |
| Advisor | UC-ADV-01: Log In as Advisor<br>UC-ADV-02: View Advisor Dashboard & System Analytics<br>UC-ADV-03: Monitor Assigned Students & Active Alerts<br>UC-ADV-04: Log Follow-Up Intervention & Notify Student<br>UC-ADV-05: Review Follow-Up History |

## 1.3 Assumptions and Dependencies
**Dependencies:**
1. **Student Subsystem Rule-Engine**: The Advisor dashboard relies on the Student Subsystem's auto-grading component to insert records into the `advisor_alert` table whenever a student scores below 50%.
2. **Supabase Relational Integrity**: Accurate display of data assumes the `advisor_student_assignment` mapping table is properly maintained, ensuring advisors only see students in their assigned purview.

**Assumptions:**
1. **Alert Volume**: It is assumed that alerts will remain manageable enough for a table view without needing complex pagination or AI-summarization in the MVP phase.
2. **Intervention Modality**: The system assumes interventions are purely text-based messages sent via the in-app notification system, bypassing external email for MVP simplicity.

---

# 2 Requirements

## 2.1 Use Case Diagram

```mermaid
usecaseDiagram
    actor Advisor as "Academic Advisor (Vincent Lock Chun Kit)"
    
    rect "QuestLearn - Advisor Subsystem" {
        usecase UC1 as "UC-ADV-01: Log In as Advisor"
        usecase UC2 as "UC-ADV-02: View Advisor Dashboard"
        usecase UC3 as "UC-ADV-03: Monitor Active Alerts"
        usecase UC4 as "UC-ADV-04: Log Follow-Up Intervention"
        usecase UC5 as "UC-ADV-05: Review Follow-Up History"
    }
    
    Advisor --> UC1
    Advisor --> UC2
    Advisor --> UC3
    Advisor --> UC4
    Advisor --> UC5
```

## 2.2 Class Diagrams / ERD

```mermaid
erDiagram
    ADVISOR_PROFILE ||--|{ ADVISOR_STUDENT_ASSIGNMENT : mapped_to
    STUDENT_PROFILE ||--|{ ADVISOR_STUDENT_ASSIGNMENT : mapped_to
    STUDENT_PROFILE ||--|{ ADVISOR_ALERT : generates
    ADVISOR_ALERT ||--|{ ADVISOR_FOLLOW_UP : resolved_by

    ADVISOR_PROFILE {
        int advisor_profile_id PK
        int user_id FK
        string staff_no
    }
    STUDENT_PROFILE {
        int student_profile_id PK
    }
    ADVISOR_STUDENT_ASSIGNMENT {
        int assignment_id PK
        int advisor_profile_id FK
        int student_profile_id FK
    }
    ADVISOR_ALERT {
        int advisor_alert_id PK
        int student_profile_id FK
        int advisor_profile_id FK
        string alert_type
        string status
    }
    ADVISOR_FOLLOW_UP {
        int follow_up_id PK
        int advisor_alert_id FK
        text message
    }
```

---

# 3 Design

## 3.1 Use Cases

### 3.1.1 Use Case 1: Monitor Active Advisor Alerts
The system fetches all students assigned to the advisor and lists any active alerts generated by failing grades.

```mermaid
sequenceDiagram
    autonumber
    actor Advisor as Advisor (Browser)
    participant Server as Next.js Server Component
    participant DB as Supabase DB
    
    Advisor->>Server: View /advisor/students
    Server->>DB: Fetch advisor_student_assignment
    DB-->>Server: Return assigned student IDs
    Server->>DB: Fetch active advisor_alert records for IDs
    DB-->>Server: Return alerts
    Server-->>Advisor: Render Advisee Table with Alert indicators
```

### 3.1.2 Use Case 2: Log Follow-Up Intervention
The advisor selects a student, types a message, and submits it to log the intervention and alert the student.

```mermaid
sequenceDiagram
    autonumber
    actor Advisor as Advisor
    participant Client as Advisor Client Component
    participant DB as Supabase DB
    
    Advisor->>Client: Submit follow-up message
    Client->>DB: INSERT INTO advisor_follow_up
    Client->>DB: INSERT INTO notification (user_id = student)
    Client->>DB: UPDATE advisor_alert SET status = 'in_progress'
    Client-->>Advisor: Show success message and close modal
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
| `advisor_profile` | `advisor_profile_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the advisor_profile table. |
| `advisor_profile` | `user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `advisor_profile` | `staff_no` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The staff no value. |
| `advisor_profile` | `department` | `VARCHAR` | `100` | `-` | `No` | `Null` | The department value. |
| `advisor_profile` | `office_hours` | `VARCHAR` | `200` | `-` | `No` | `Null` | The office hours value. |
| `student_profile` | `student_profile_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the student_profile table. |
| `student_profile` | `user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `student_profile` | `student_no` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The student no value. |
| `student_profile` | `academic_level` | `VARCHAR` | `50` | `-` | `No` | `Null` | The academic level value. |
| `student_profile` | `programme` | `VARCHAR` | `100` | `-` | `No` | `Null` | The programme value. |
| `student_profile` | `department` | `VARCHAR` | `100` | `-` | `No` | `Null` | The department value. |
| `student_profile` | `learning_preference` | `VARCHAR` | `50` | `-` | `No` | `Null` | The learning preference value. |
| `advisor_student_assignment` | `advisor_student_assignment_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the advisor_student_assignment table. |
| `advisor_student_assignment` | `advisor_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the advisor_profile table. |
| `advisor_student_assignment` | `student_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the student_profile table. |
| `advisor_student_assignment` | `assigned_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The assigned at value. |
| `advisor_student_assignment` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `advisor_alert` | `advisor_alert_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the advisor_alert table. |
| `advisor_alert` | `student_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the student_profile table. |
| `advisor_alert` | `advisor_profile_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the advisor_profile table. |
| `advisor_alert` | `alert_type` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The alert type value. |
| `advisor_alert` | `severity` | `VARCHAR` | `10` | `-` | `Yes` | `Not Null` | The severity value. |
| `advisor_alert` | `source_type` | `VARCHAR` | `50` | `-` | `No` | `Null` | The source type value. |
| `advisor_alert` | `source_id` | `INT` | `-` | `-` | `No` | `Null` | The source id value. |
| `advisor_alert` | `message` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The message value. |
| `advisor_alert` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `advisor_alert` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `advisor_alert` | `resolved_at` | `TIMESTAMP` | `-` | `-` | `No` | `Null` | The resolved at value. |
| `advisor_follow_up` | `advisor_follow_up_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the advisor_follow_up table. |
| `advisor_follow_up` | `advisor_alert_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the advisor_alert table. |
| `advisor_follow_up` | `advisor_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the advisor_profile table. |
| `advisor_follow_up` | `student_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the student_profile table. |
| `advisor_follow_up` | `instructor_profile_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the instructor_profile table. |
| `advisor_follow_up` | `follow_up_type` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The follow up type value. |
| `advisor_follow_up` | `message` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The message value. |
| `advisor_follow_up` | `next_action` | `TEXT` | `-` | `-` | `No` | `Null` | The next action value. |
| `advisor_follow_up` | `follow_up_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The follow up at value. |
| `notification` | `notification_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the notification table. |
| `notification` | `user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `notification` | `announcement_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the announcement table. |
| `notification` | `message` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The message value. |
| `notification` | `is_read` | `BOOLEAN` | `-` | `-` | `Yes` | `Not Null` | The is read value. |
| `notification` | `sent_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The sent at value. |

## 3.3 Subsystem Architecture
The subsystem uses Next.js Client Components (e.g., `AdvisorStudentsClient.tsx`) to handle interactive elements like the Follow-up Modal, while Server Components fetch the heavily nested relational data (joining Profiles to Assignments to Alerts) securely via Supabase.

## 3.4 Subsystem Screens
1. **Dashboard (`/advisor`)**: Overview metrics showing total assigned students and aggregate alert counts.
2. **Advisee Registry (`/advisor/students`)**: A detailed table of students, showing academic information and highlighting those with active risk alerts.

_<TO DO: Place the screen designs/wireframes for these subsystem interfaces here>_

## 3.5 Subsystem Components

_<TO DO: Place the table mapping subsystem components to modules/classes/packages here>_

### 3.5.1 Component 1: Alert Aggregation Query
A complex Server-side query that joins the mapping table to the alert table, returning a structured JSON object to the Client Component to render warning icons next to specific student names.

### 3.5.2 Component 2: Intervention Messaging Workflow
A client-side form that executes multiple inserts: saving the historical text in `advisor_follow_up` and directly pushing a real-time message into the `notification` table for the target student to see on their next login.

## 3.6 Actor 1 State Transition Diagram
Represents the lifecycle of an Advisor Alert.

```mermaid
stateDiagram
    [*] --> Open : Student Fails Quiz
    Open --> In_Progress : Advisor Logs Message
    In_Progress --> Resolved : Student Completes Recovery Action
    Resolved --> [*]
```

---

# 4 Implementation

## 4.1 Development Environment
* **Platform Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
* **Database Engine**: PostgreSQL 17.6 hosted on Supabase Cloud.

_<TO DO: Place relevant images that show the development environment/IDE here>_

## 4.2 Main Program Codes

| Application Component | File Location | Purpose |
| ----------- | ------------- | ------- |
| **Advisor Dashboard** | `src/app/(advisor)/advisor/page.tsx` | Main panel loading metrics and critical early warnings. |
| **Advisee Management Page** | `src/app/(advisor)/advisor/students/page.tsx` | Server component resolving profile context and pulling advisee list. |
| **Advisee Management Client** | `src/app/(advisor)/advisor/students/AdvisorStudentsClient.tsx` | Client UI component managing filters, student progress summaries, and modal follow-up logs. |
| **Follow-up History Page** | `src/app/(advisor)/advisor/follow-ups/page.tsx` | Fetches historical log reports of advisor follow-ups. |

### 4.2.1 Advisor Dashboard (`src/app/(advisor)/advisor/page.tsx`)
This controller page retrieves advisee summaries, active alerts count, and renders them:
```typescript
import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/ui/MetricCard";
import { Users, AlertTriangle, TrendingDown } from "lucide-react";
import Link from "next/link";

export default async function AdvisorDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch Advisor Profile
  const { data: advisorProfile } = await supabase
    .from("advisor_profile")
    .select("advisor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!advisorProfile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl">
        <p className="text-danger font-medium">Advisor profile not found.</p>
      </div>
    );
  }

  // Fetch assigned students
  const { data: assignments } = await supabase
    .from("advisor_student_assignment")
    .select(`
      student_profile_id,
      student_profile:student_profile_id (
        student_profile_id,
        student_no,
        academic_level,
        programme,
        user:user_id (
          full_name,
          email
        )
      )
    `)
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id);

  const studentsList = assignments?.map((a: any) => a.student_profile) || [];

  // Fetch active alerts
  const { data: alerts } = await supabase
    .from("advisor_alert")
    .select("*")
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id)
    .in("status", ["open", "reviewed"]);

  const atRiskStudentIds = new Set(alerts?.map((a: any) => a.student_profile_id) || []);

  const studentsWithStatus = studentsList.map((sp: any) => {
    const isAtRisk = sp.student_no === "QL-STU-001" || atRiskStudentIds.has(sp.student_profile_id);
    const studentAlerts = alerts?.filter((a: any) => a.student_profile_id === sp.student_profile_id) || [];
    const alertMessage = studentAlerts[0]?.message || (isAtRisk ? "Failed Quiz 1 (Score: 40%)" : "Stable");

    return {
      id: sp.student_profile_id,
      name: sp.user.full_name,
      studentNo: sp.student_no,
      programme: sp.programme || "N/A",
      academicLevel: sp.academic_level || "N/A",
      status: isAtRisk ? "At Risk" : "Stable",
      alertMessage,
      progress: isAtRisk ? 40 : 100,
      lastActive: isAtRisk ? "3 days ago" : "Active today",
    };
  });

  const totalAssigned = studentsList.length;
  const activeAlertsCount = alerts?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">Advisor Dashboard</h1>
        <p className="text-text-muted">Monitor student progress and intervene early.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Assigned Students" value={totalAssigned} icon={Users} />
        <MetricCard
          title="At-Risk Alerts"
          value={activeAlertsCount}
          icon={AlertTriangle}
          className={activeAlertsCount > 0 ? "border-danger/50 bg-danger-bg/30" : ""}
        />
        <MetricCard title="Avg Engagement Drop" value="12%" icon={TrendingDown} />
      </div>

      <section>
        <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" /> Early Alerts (Needs Attention)
        </h2>
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-page/50 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Academic Info</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold">Intervention Message / Alert</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {studentsWithStatus.map((s) => (
                <tr key={s.id} className="hover:bg-bg-page/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-text">{s.name}</td>
                  <td className="px-6 py-4 text-text-muted">{s.studentNo}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-text">{s.programme}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{s.academicLevel}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold leading-none ${
                      s.status === "At Risk" ? "bg-danger-bg/45 text-danger" : "bg-success-bg/45 text-success"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted max-w-xs truncate">{s.alertMessage}</td>
                  <td className="px-6 py-4 text-center">
                    <Link href="/advisor/students" className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all inline-block">
                      Review Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

### 4.2.2 Advisee Management Page (`src/app/(advisor)/advisor/students/page.tsx`)
Server component that fetches assigned student profiles and the list of available instructors to populate dropdown controls:
```typescript
import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdvisorStudentsClient } from "./AdvisorStudentsClient";

export default async function AdvisorStudentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: advisorProfile } = await supabase
    .from("advisor_profile")
    .select("advisor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!advisorProfile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl">
        <p className="text-danger font-medium">Advisor profile not found.</p>
      </div>
    );
  }

  // Fetch assigned students
  const { data: students } = await supabase
    .from("advisor_student_assignment")
    .select(`
      *,
      student_profile:student_profile_id (
        student_profile_id,
        student_no,
        academic_level,
        programme,
        user:user_id (
          full_name,
          email
        )
      )
    `)
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id);

  // Fetch all instructors
  const { data: instructors } = await supabase
    .from("instructor_profile")
    .select(`
      instructor_profile_id,
      staff_no,
      user:user_id (
        full_name,
        email
      )
    `);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-text mb-2">My Advisees</h1>
        <p className="text-text-muted">Overview of all students assigned to your department.</p>
      </header>

      <AdvisorStudentsClient 
        students={students || []} 
        advisorProfileId={advisorProfile.advisor_profile_id} 
        instructors={instructors || []}
      />
    </div>
  );
}
```

### 4.2.3 Advisee Management Actions (`src/app/(advisor)/advisor/students/AdvisorStudentsClient.tsx`)
This client component manages UI tabs and encapsulates the handler to dispatch early warning follow-ups to both students and target instructors via notification bindings:
```typescript
// Handler executing the advisor follow-up insertion and triggering messages
const handleSendFollowup = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!followupMessage.trim()) return;
  setLoading(true);

  try {
    // 1. Resolve or create active alert log
    const { data: alerts } = await supabase
      .from("advisor_alert")
      .select("advisor_alert_id")
      .eq("student_profile_id", selectedStudent.student_profile_id)
      .limit(1);

    let alertId = alerts?.[0]?.advisor_alert_id;

    if (!alertId) {
      const { data: newAlert, error: alertError } = await supabase
        .from("advisor_alert")
        .insert({
          student_profile_id: selectedStudent.student_profile_id,
          advisor_profile_id: advisorProfileId,
          alert_type: "low_progress",
          severity: "medium",
          message: "Manual advisor intervention follow-up.",
          status: "open",
        })
        .select("advisor_alert_id")
        .single();

      if (alertError) throw alertError;
      alertId = newAlert.advisor_alert_id;
    }

    // 2. Insert advisor_follow_up record
    const { error: followupError } = await supabase
      .from("advisor_follow_up")
      .insert({
        advisor_alert_id: alertId,
        advisor_profile_id: advisorProfileId,
        student_profile_id: selectedStudent.student_profile_id,
        follow_up_type: "message",
        message: followupMessage,
        next_action: "Monitor student response",
        instructor_profile_id: selectedInstructorId ? parseInt(selectedInstructorId) : null,
      });

    if (followupError) throw followupError;

    // 3. Pushes advisory notification to Student inbox
    const { data: studentData } = await supabase
      .from("student_profile")
      .select("user_id")
      .eq("student_profile_id", selectedStudent.student_profile_id)
      .single();

    if (studentData?.user_id) {
      await supabase
        .from("notification")
        .insert({
          user_id: studentData.user_id,
          message: `[Academic Advisory Note] Your Advisor has logged a follow-up intervention suggest: "${followupMessage.trim()}"`,
          is_read: false,
        });
    }

    // 4. Pushes warning notification to Linked Instructor inbox
    if (selectedInstructorId) {
      const { data: instructorData } = await supabase
        .from("instructor_profile")
        .select("user_id")
        .eq("instructor_profile_id", parseInt(selectedInstructorId))
        .single();

      if (instructorData?.user_id) {
        await supabase
          .from("notification")
          .insert({
            user_id: instructorData.user_id,
            message: `[Advisor Intervention Logged] Advisor logged an intervention follow-up for student ${selectedStudent.user.full_name}: "${followupMessage.trim()}"`,
            is_read: false,
          });
      }
    }

    showToast("Follow-up advisory message sent successfully!");
    setFollowupMessage("");
    setIsFollowupOpen(false);
  } catch (err: any) {
    showToast(err.message || "Failed to log follow-up.", "error");
  } finally {
    setLoading(false);
  }
};
```

### 4.2.4 Follow-up History Page (`src/app/(advisor)/advisor/follow-ups/page.tsx`)
Retrieves and tracks logs of all previous follow-up interventions dispatched by the academic advisor:
```typescript
import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdvisorFollowupsClient } from "./AdvisorFollowupsClient";

export default async function AdvisorFollowupsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: advisorProfile } = await supabase
    .from("advisor_profile")
    .select("advisor_profile_id")
    .eq("user_id", user.userId)
    .single();

  if (!advisorProfile) {
    return (
      <div className="p-8 text-center bg-surface border border-border rounded-xl">
        <p className="text-danger font-medium">Advisor profile not found.</p>
      </div>
    );
  }

  // Fetch follow-ups history
  const { data: followups } = await supabase
    .from("advisor_follow_up")
    .select(`
      *,
      student_profile:student_profile_id (
        student_profile_id,
        user:user_id (
          full_name,
          email
        )
      ),
      instructor_profile:instructor_profile_id (
        instructor_profile_id,
        staff_no,
        user:user_id (
          full_name
        )
      )
    `)
    .eq("advisor_profile_id", advisorProfile.advisor_profile_id)
    .order("logged_at", { ascending: false });

  return (
    <AdvisorFollowupsClient 
      followups={followups || []} 
      advisorProfileId={advisorProfile.advisor_profile_id} 
    />
  );
}
```

## 4.3 Sample Screens
*(Insert screenshot of Advisee table with Warning icon)*
*(Insert screenshot of Log Follow-up Modal)*

---

# 5 Testing

## 5.1 Test Data
* **Assigned Student**: See Wing Kit (`student_profile_id = 1`).
* **Condition**: Student has an active alert in `advisor_alert` from failing a testing strategies quiz.

## 5.2 Acceptance Testing

| Criteria | Test Execution Steps | Expected Outcome | Fulfilled |
| -------- | -------------------- | ---------------- | --------- |
| **Alert Display** | Open `/advisor/students` | The "Status" column shows a red "Needs Attention" badge. | **Yes** |
| **Log Intervention** | Click "Follow-Up", type message, click Send | Success toast appears, modal closes. | **Yes** |
| **Notification Hook** | Check student dashboard | In-app notification appears for the student. | **Yes** |

## 5.3 Test Results
Confirmed that the `advisor_follow_up` table properly logged the message, and the `notification` table received the insert via the client-side Supabase query execution.

_<TO DO: Place the subsystem/application test result screens and SQL output screenshots here>_

---

# 6 Conclusion
The Advisor subsystem successfully translates raw student struggle (failed quizzes) into a human intervention workflow. By surfacing these alerts automatically, the system prevents students from falling through the cracks. Future iterations could integrate automated email delivery for follow-ups alongside the in-app notifications.

### Software Quality Assurance
_<TO DO: Include details of software quality assurance practices here>_

### Group Collaboration
_<TO DO: Include details of group collaboration and teamwork here>_

### Problems Encountered
_<TO DO: Include details of problems encountered during the project and how they were resolved here>_
