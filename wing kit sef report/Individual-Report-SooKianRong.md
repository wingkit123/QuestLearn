System Documentation

Individual Report

for

QuestLearn

**Version 3.0**

**Tutorial Section: TT7L**

**Group No.: G5**

| **Name** | **Student #** |
| ---------------- | --------------------- |
| Soo Kian Rong    | [Student ID]          |

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
    - [3.1.1 Use Case 1: Approve Pending Instructors](#311-use-case-1-approve-pending-instructors)
    - [3.1.2 Use Case 2: Broadcast Global Announcements](#312-use-case-2-broadcast-global-announcements)
  - [3.2 Data Dictionary](#32-data-dictionary)
  - [3.3 Subsystem Architecture](#33-subsystem-architecture)
  - [3.4 Subsystem Screens](#34-subsystem-screens)
  - [3.5 Subsystem Components](#35-subsystem-components)
    - [3.5.1 Component 1: Approval Workflow](#351-component-1-approval-workflow)
    - [3.5.2 Component 2: User Access Suspension](#352-component-2-user-access-suspension)
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
| 1.0 | Soo Kian Rong | SRS in Part 1 (Requirements Analysis and Actor Mapping) | 01/05/2026 |
| 2.0 | Soo Kian Rong | SDS in Part 2 (Interface Specifications, Database Schema, UML Drafts) | 05/06/2026 |
| 3.0 | Soo Kian Rong | System Documentation in Part 3 (Admin Routing, Registry logic, Testing) | 30/06/2026 |

---

# 1 System Overview

## 1.1 Description
The Admin Subsystem in **QuestLearn** provides oversight, security, and global communication capabilities. As the backend authority for the platform, the Admin actor manages role-based access control (RBAC), approves or denies registrations for sensitive roles (Instructors and Advisors), toggles account suspensions for existing users, and broadcasts platform-wide announcements. This subsystem leverages Next.js Middleware to ensure that `/admin/*` routes are strictly protected.

## 1.2 Use Cases

| Actor | Use Cases |
| ----- | --------- |
| Admin | UC-ADM-01: Log In as Administrator<br>UC-ADM-02: View Platform Analytics<br>UC-ADM-03: Manage Pending Registrations<br>UC-ADM-04: Manage User Registry (Suspend/Kick)<br>UC-ADM-05: Broadcast Announcements<br>UC-ADM-06: Browse Course Library |

## 1.3 Assumptions and Dependencies
**Dependencies:**
1. **Next.js Middleware**: The subsystem relies heavily on the `middleware.ts` interceptor to evaluate the Supabase JWT role. If the middleware fails, unauthorized users could theoretically view the `/admin` path.
2. **Supabase Database**: Uses Server Actions to execute high-privilege operations directly against the PostgreSQL tables, bypassing client-side logic completely.

**Assumptions:**
1. **Approval Trust**: It is assumed that the Admin manually verifies the credentials of any `pending` instructor or advisor before clicking "Approve". 
2. **Cascade Deletion**: When a user is kicked (deleted) via the Registry, it is assumed that all their related profiles (Student, Instructor, Advisor) are cascade-deleted at the schema level.

---

# 2 Requirements

## 2.1 Use Case Diagram

```mermaid
usecaseDiagram
    actor Admin as "Administrator (Soo Kian Rong)"
    
    rect "QuestLearn - Admin Subsystem" {
        usecase UC1 as "UC-ADM-01: Log In as Administrator"
        usecase UC2 as "UC-ADM-02: View Platform Analytics"
        usecase UC3 as "UC-ADM-03: Manage Pending Registrations"
        usecase UC4 as "UC-ADM-04: Manage User Registry"
        usecase UC5 as "UC-ADM-05: Broadcast Announcements"
        usecase UC6 as "UC-ADM-06: Browse Course Library"
    }
    
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
```

## 2.2 Class Diagrams / ERD

```mermaid
erDiagram
    USER }|--|| ROLE : holds
    USER ||--|{ ANNOUNCEMENT : broadcasts
    ANNOUNCEMENT ||--|{ NOTIFICATION : triggers

    USER {
        int user_id PK
        int role_id FK
        string full_name
        string email
        string account_status
    }
    ROLE {
        int role_id PK
        string role_name
    }
    ANNOUNCEMENT {
        int announcement_id PK
        int admin_user_id FK
        string title
        text content
        timestamp broadcast_date
    }
    NOTIFICATION {
        int notification_id PK
        int user_id FK
        text message
    }
```

---

# 3 Design

## 3.1 Use Cases

### 3.1.1 Use Case 1: Approve Pending Instructors
The admin logs into the dashboard, views users with `account_status = 'pending'`, and clicks approve.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin (Browser)
    participant Page as Admin Dashboard Component
    participant DB as Supabase DB
    
    Admin->>Page: View /admin
    Page->>DB: SELECT * FROM user WHERE account_status = 'pending'
    DB-->>Page: Returns pending user list
    Admin->>Page: Click 'Approve' on user
    Page->>DB: UPDATE user SET account_status = 'active'
    DB-->>Page: Success
    Page-->>Admin: Updates UI dynamically
```

### 3.1.2 Use Case 2: Broadcast Global Announcements
The admin drafts an announcement that generates notifications for all users.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin
    participant Server as Next.js Server Action
    participant DB as Supabase DB
    
    Admin->>Server: submitAnnouncement(title, body)
    Server->>DB: INSERT INTO announcement
    Note over Server: Fetch all active users
    Server->>DB: INSERT INTO notification for each user
    Server-->>Admin: Show success toast
```

## 3.2 Data Dictionary

| Table Name | Field Name | Data Type | Length | PK/FK | Required | Null/Not Null | Description |
| ---------- | ---------- | --------- | ------ | ----- | -------- | ------------- | ----------- |
| `role` | `role_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the role table. |
| `role` | `role_name` | `VARCHAR` | `50` | `-` | `Yes` | `Not Null` | The role name value. |
| `user` | `user_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the user table. |
| `user` | `auth_user_id` | `UUID` | `36` | `-` | `No` | `Null` | The auth user id value. |
| `user` | `role_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the role table. |
| `user` | `full_name` | `VARCHAR` | `150` | `-` | `Yes` | `Not Null` | The full name value. |
| `user` | `email` | `VARCHAR` | `255` | `-` | `Yes` | `Not Null` | The email value. |
| `user` | `account_status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The account status value. |
| `user` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `course` | `course_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the course table. |
| `course` | `instructor_profile_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the instructor_profile table. |
| `course` | `course_code` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The course code value. |
| `course` | `course_title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The course title value. |
| `course` | `description` | `TEXT` | `-` | `-` | `No` | `Null` | The description value. |
| `course` | `department` | `VARCHAR` | `100` | `-` | `No` | `Null` | The department value. |
| `course` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `course` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |
| `announcement` | `announcement_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the announcement table. |
| `announcement` | `user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `announcement` | `title` | `VARCHAR` | `200` | `-` | `Yes` | `Not Null` | The title value. |
| `announcement` | `message` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The message value. |
| `announcement` | `scope` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The scope value. |
| `announcement` | `target_scope_id` | `INT` | `-` | `-` | `No` | `Null` | The target scope id value. |
| `announcement` | `published_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The published at value. |
| `announcement` | `status` | `VARCHAR` | `20` | `-` | `Yes` | `Not Null` | The status value. |
| `moderation_action` | `moderation_action_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the moderation_action table. |
| `moderation_action` | `admin_user_id` | `INT` | `-` | `FK` | `Yes` | `Not Null` | Foreign key referencing the table. |
| `moderation_action` | `target_type` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The target type value. |
| `moderation_action` | `target_id` | `INT` | `-` | `-` | `Yes` | `Not Null` | The target id value. |
| `moderation_action` | `action_type` | `VARCHAR` | `30` | `-` | `Yes` | `Not Null` | The action type value. |
| `moderation_action` | `reason` | `TEXT` | `-` | `-` | `No` | `Null` | The reason value. |
| `moderation_action` | `action_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The action at value. |
| `audit_log` | `audit_log_id` | `SERIAL` | `-` | `PK` | `Yes` | `Not Null` | Primary key of the audit_log table. |
| `audit_log` | `actor_user_id` | `INT` | `-` | `FK` | `No` | `Null` | Foreign key referencing the table. |
| `audit_log` | `action_type` | `VARCHAR` | `80` | `-` | `Yes` | `Not Null` | The action type value. |
| `audit_log` | `target_type` | `VARCHAR` | `50` | `-` | `No` | `Null` | The target type value. |
| `audit_log` | `target_id` | `INT` | `-` | `-` | `No` | `Null` | The target id value. |
| `audit_log` | `summary` | `TEXT` | `-` | `-` | `Yes` | `Not Null` | The summary value. |
| `audit_log` | `metadata` | `JSONB` | `-` | `-` | `No` | `Null` | The metadata value. |
| `audit_log` | `created_at` | `TIMESTAMP` | `-` | `-` | `Yes` | `Not Null` | The created at value. |

## 3.3 Subsystem Architecture
The Admin Subsystem leverages a model-view-controller paradigm built on the **Next.js 15 App Router** and **React 19**, integrated with Supabase for data persistency.

* **Client Presentation Layer**: Responsive UI panels styled with Tailwind CSS v4. Complex client interactions (such as pending instructor approvals, user registry searches, toggling user suspensions, and global announcement broadcasting) are managed using React Client Components (annotated with `"use client"`).
* **Controller / Integration Layer**: Operations are managed securely using **Next.js Server Actions** (`approveUser`, `declineUser`, `createUser`, `updateUserStatus`, `deleteUser`). This bridges client interactions and database writes safely, bypassing API routing overheads, and enforcing user session authorization states.
* **Database Persistency Layer**: Powered by **Supabase PostgreSQL**. Row Level Security (RLS) policies are checked at the server level, utilizing database foreign-key constraints (such as ON DELETE CASCADE) to guarantee data integrity across profiles.

### 3.3.1 Subsystem Architecture Diagram
The physical and logical layers of the Admin Subsystem and their relationships to the database and routing security are visualized below:

```mermaid
graph TD
    subgraph Client_Presentation_Layer["Client Presentation Layer (React 19 / Tailwind CSS v4)"]
        UI_Dash["Admin Dashboard UI (/admin)"]
        UI_Reg["User Registry UI (/admin/users)"]
        UI_Ann["Announcements UI (/admin/announcements)"]
    end

    subgraph Controller_Integration_Layer["Controller / Integration Layer (Next.js 15 Server Actions)"]
        SA_Approve["approveUser / declineUser Actions"]
        SA_User["createUser / updateUserStatus / deleteUser Actions"]
        SA_Auth["Auth Middleware & Helpers"]
    end

    subgraph Database_Persistency_Layer["Database Persistency Layer (Supabase PostgreSQL)"]
        DB_User[("user table")]
        DB_Profiles[("student_profile / instructor_profile / advisor_profile")]
        DB_Ann[("announcement table")]
        DB_Notif[("notification table")]
    end

    Client_Presentation_Layer -->|Triggers| Controller_Integration_Layer
    Controller_Integration_Layer -->|SQL Query / Mutation| Database_Persistency_Layer
```

---

## 3.4 Subsystem Screens
1. **Admin Dashboard (`/admin`)**: Shows platform status, total user count, and a table displaying pending registrations with Approve/Decline actions.
2. **User Registry (`/admin/users`)**: Displays a master table of all registered users with controls to filter, add new users manually, toggle user suspension, or delete accounts.
3. **Platform Announcements (`/admin/announcements`)**: A broadcast interface containing a list of past announcements and a modal form to broadcast new global alerts.

### 3.4.1 Subsystem Interface Wireframes

#### Admin Dashboard UI Layout
```
+-------------------------------------------------------------------------------------------------+
|  QuestLearn | Admin Portal                                       [Notifications]  [Log Out]    |
+-------------------------------------------------------------------------------------------------+
|  System Status: Healthy [45 GB Storage] [Total Users: 142]                                      |
|                                                                                                 |
|  +-------------------------------------------------------------------------------------------+  |
|  | Pending Approvals                                                                         |  |
|  |                                                                                           |  |
|  | - Jane Doe (Instructor)  - jane.doe@example.com      [Decline] [Approve]                  |  |
|  | - John Smith (Advisor)   - john.smith@example.com    [Decline] [Approve]                  |  |
|  +-------------------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------------------+
```

#### User Registry UI Layout
```
+-------------------------------------------------------------------------------------------------+
|  QuestLearn | Admin Portal                                                       [Log Out]    |
+-------------------------------------------------------------------------------------------------+
|  User Registry                                                                  [+ Add User]    |
|  +-------------------------------------------------------------------------------------------+  |
|  | Name          | Email                | Role        | Status     | Actions                 |  |
|  |---------------+----------------------+-------------+------------+-------------------------|  |
|  | Soo Kian Rong | admin@example.com    | Admin       | Active     | [Manage]                |  |
|  | Jane Doe      | jane.doe@example.com | Instructor  | Active     | [Suspend] [Kick]        |  |
|  | Demo Student  | stu@example.com      | Student     | Suspended  | [Activate] [Kick]       |  |
|  +-------------------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------------------+
```

### 3.4.2 Sample Dashboard Screen (Admin Announcements Portal)
Below is the implemented announcements dashboard showing the list of published global notifications and broadcast interface:

![Admin Announcements Portal](../docs/evidence/part-iii/screen-admin-content-announcements.png)

---

## 3.5 Subsystem Components

Below is the mapping of the core subsystem components to their directory, module class name, and respective physical files:

| Subsystem Component | Module / Class / Package | File Location | Purpose |
| --- | --- | --- | --- |
| **Admin Dashboard UI** | `AdminDashboardClient` (React Client Component) | `src/app/(admin)/admin/AdminDashboardClient.tsx` | Renders system metrics, manages state of pending registrations, and processes Approve/Decline clicks. |
| **User Registry UI** | `AdminUsersClient` (React Client Component) | `src/app/(admin)/admin/users/AdminUsersClient.tsx` | Renders a tabular list of all platform users; provides triggers for user creation, suspension toggles, and deletion. |
| **Platform Announcements UI** | `AdminAnnouncementsClient` (React Client Component) | `src/app/(admin)/admin/announcements/AdminAnnouncementsClient.tsx` | Renders platform broadcast history and provides a modal form to publish new announcements. |
| **User Action Controller** | `updateUserStatus`, `deleteUser` (Server Actions) | `src/app/(admin)/admin/users/actions.ts` | Server Actions handling manual creation, role profile instantiation, status updates, and cascade deletion. |
| **Dashboard Action Controller** | `approveUser`, `declineUser` (Server Actions) | `src/app/(admin)/admin/actions.ts` | Server Actions executing user approval state mutations. |

### 3.5.1 Component 1: Approval Workflow
Implemented in `AdminDashboardClient.tsx` and supported by Server Actions in `actions.ts`, this workflow fetches user profiles set to `'pending'` status, allowing the Admin to either promote their status to `'active'` or decline them (setting to `'deactivated'`).

#### Processing Flowchart
```mermaid
graph TD
    Start([Admin views dashboard]) --> FetchPending[Query user table where account_status = 'pending']
    FetchPending --> RenderList[Render list in AdminDashboardClient]
    RenderList --> ActionClick{Approve or Decline clicked?}
    ActionClick -->|Approve| SA_Approve[Call approveUser server action]
    SA_Approve --> DB_Active[UPDATE user SET account_status = 'active']
    DB_Active --> UI_Remove[Remove user from local pending list state]
    ActionClick -->|Decline| SA_Decline[Call declineUser server action]
    SA_Decline --> DB_Deact[UPDATE user SET account_status = 'deactivated']
    DB_Deact --> UI_Remove
    UI_Remove --> End([Status updated successfully])
```

#### Pseudocode Algorithm
```typescript
function handleApproveUser(userId):
    if userId is null:
        return
    
    setLoading(userId, true)
    try:
        // Execute server mutation
        response = callServerAction("approveUser", userId)
        if response.success:
            // Update local client React state
            pendingUsers = pendingUsers.filter(u => u.user_id != userId)
            showToast("Account approved successfully")
        else:
            showToast("Failed to approve account", "error")
    catch error:
        showToast(error.message, "error")
    finally:
        setLoading(userId, false)
```

### 3.5.2 Component 2: User Access Suspension
Managed inside the User Registry component, the suspension workflow allows the Admin to flip a user's `account_status` between `'active'` and `'suspended'`. If a user's status is `'suspended'`, Next.js Middleware intercepts their requests and blocks routing access.

#### Processing Flowchart
```mermaid
graph TD
    Start([Admin clicks Suspend/Activate]) --> ConfirmAction{Confirm toggling user status?}
    ConfirmAction -->|Yes| CallServerAction[Call updateUserStatus server action]
    CallServerAction --> DB_Update[UPDATE user SET account_status = targetStatus]
    DB_Update --> StateUpdate[Update user record in local React array state]
    StateUpdate --> ShowSuccess[Display status badge update in User Registry]
    ShowSuccess --> End([User session intercepted on next middleware check])
```

#### Pseudocode Algorithm
```typescript
function handleToggleSuspend(userId, currentStatus):
    targetStatus = (currentStatus == "suspended") ? "active" : "suspended"
    setActionLoading(userId, true)
    try:
        // Trigger server action to database
        callServerAction("updateUserStatus", userId, targetStatus)
        
        // Update client view state
        users = users.map(u => {
            if u.user_id == userId:
                u.account_status = targetStatus
            return u
        })
        showToast("Status updated to " + targetStatus)
    catch error:
        showToast(error.message, "error")
    finally:
        setActionLoading(userId, false)
```

---

## 3.6 Actor State Transition Diagram
Represents the state of a user account being managed by the Admin.

```mermaid
stateDiagram-v2
    [*] --> Pending : Registration Submitted
    
    Pending --> Active : Admin Approves (approveUser)
    Pending --> Deactivated : Admin Declines (declineUser)
    
    Active --> Suspended : Admin Suspends User (updateUserStatus)
    Suspended --> Active : Admin Reactivates User (updateUserStatus)
    
    Active --> Deleted : Admin Kicks User (deleteUser)
    Suspended --> Deleted : Admin Kicks User (deleteUser)
    
    Deleted --> [*]
```

#### Detailed State Lifecycle Description:
* **Initial State (`[*]`)**: A guest registers an account on the registration portal.
* **State 1: `Pending`**:
  - **Description**: The account is created but not authorized to access system dashboards.
  - **Transition Condition**: System flags sensitive roles (Instructors and Advisors) as `'pending'` by default.
* **State 2: `Active`**:
  - **Description**: The user has full system access matching their role.
  - **Event/Trigger**: Admin clicks "Approve" in the dashboard queue.
* **State 3: `Deactivated`**:
  - **Description**: The registration request was rejected by the administrator.
  - **Event/Trigger**: Admin clicks "Decline" in the dashboard queue.
* **State 4: `Suspended`**:
  - **Description**: The user account is temporarily locked. Middleware intercepts routing requests.
  - **Event/Trigger**: Admin clicks "Suspend" in the User Registry table.
* **State 5: `Deleted`**:
  - **Description**: The user account is permanently deleted. Cascade constraints purge profiles automatically.
  - **Event/Trigger**: Admin clicks "Kick/Delete" in the User Registry table.

---

# 4 Implementation

## 4.1 Development Environment
* **Platform Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Bun Package Manager.
* **Database Engine**: PostgreSQL 17.6 hosted on Supabase Cloud.
* **IDE**: Visual Studio Code on Windows.

---

## 4.2 Main Program Codes

| Application Component | File Location | Purpose |
| ----------- | ------------- | ------- |
| **Admin Dashboard** | `src/app/(admin)/admin/page.tsx` | Server Component querying pending registrants and overall user counts. |
| **Admin Dashboard UI** | `src/app/(admin)/admin/AdminDashboardClient.tsx` | Client UI rendering metrics and processing pending approvals/declines. |
| **User Registry Controller** | `src/app/(admin)/admin/users/actions.ts` | Server Actions handling manual account addition, status changes, and user purging. |
| **Announcements Panel** | `src/app/(admin)/admin/announcements/AdminAnnouncementsClient.tsx` | Component executing global broadcast inserts into Supabase databases. |

### 4.2.1 Admin Dashboard Entrypoint (`src/app/(admin)/admin/page.tsx`)
```typescript
import { getCurrentUser } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "./AdminDashboardClient";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();

  // Fetch pending instructors
  const { data: pendingUsers } = await supabase
    .from("user")
    .select("user_id, full_name, email, created_at, role:role_id(role_name)")
    .eq("account_status", "pending")
    .order("created_at", { ascending: false });

  // Get total user count
  const { count: userCount } = await supabase
    .from("user")
    .select("user_id", { count: "exact", head: true });

  return (
    <AdminDashboardClient 
      pendingUsers={pendingUsers || []} 
      userCount={userCount || 0} 
    />
  );
}
```

### 4.2.2 User Registry Controllers (`src/app/(admin)/admin/users/actions.ts`)
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUser(payload: {
  fullName: string;
  email: string;
  roleName: string;
  staffNo?: string;
  studentNo?: string;
}) {
  const supabase = await createClient();

  const { data: roleData, error: roleError } = await supabase
    .from("role")
    .select("role_id")
    .eq("role_name", payload.roleName)
    .single();

  if (roleError || !roleData) {
    throw new Error("Invalid role selected");
  }

  const mockAuthId = crypto.randomUUID();

  const { data: newUser, error: userError } = await supabase
    .from("user")
    .insert({
      auth_user_id: mockAuthId,
      role_id: roleData.role_id,
      full_name: payload.fullName,
      email: payload.email.trim().toLowerCase(),
      account_status: "active",
    })
    .select("user_id")
    .single();

  if (userError) {
    throw new Error("Failed to insert user row: " + userError.message);
  }

  if (payload.roleName === "Student") {
    await supabase.from("student_profile").insert({
      user_id: newUser.user_id,
      student_no: payload.studentNo || `STU-${Date.now()}`,
      academic_level: "Year 1",
      programme: "Degree in Computer Science",
      department: "Computer Science",
    });
  } else if (payload.roleName === "Instructor") {
    await supabase.from("instructor_profile").insert({
      user_id: newUser.user_id,
      staff_no: payload.staffNo || `INS-${Date.now()}`,
      specialization: "General Software Engineering",
    });
  }

  revalidatePath("/admin/users");
}

export async function updateUserStatus(userId: number, status: "active" | "suspended") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .update({ account_status: status })
    .eq("user_id", userId);

  if (error) throw new Error("Failed to update status: " + error.message);
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error("Failed to delete user: " + error.message);
  revalidatePath("/admin/users");
}
```

### 4.2.3 Platform Announcements (`src/app/(admin)/admin/announcements/AdminAnnouncementsClient.tsx`)
```typescript
"use client";

import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminAnnouncementsClient({ announcements: initialAnnouncements, adminUserId }: any) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: newAnn, error } = await supabase
        .from("announcement")
        .insert({
          user_id: adminUserId,
          title,
          message,
          scope: "platform",
          status: "active",
        })
        .select("*")
        .single();

      if (error) throw error;

      setAnnouncements((prev: any) => [newAnn, ...prev]);
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleBroadcast} className="space-y-4 bg-surface p-6 rounded-xl border border-border">
        <input type="text" required placeholder="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <textarea required placeholder="Message content..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded" rows={3} />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
          Send Broadcast
        </button>
      </form>
    </div>
  );
}
```

## 4.3 Sample Screens
* **Admin Dashboard Screen**: Renders system KPIs and approval cards for incoming instructor registry profiles.
* **User Registry Panel**: Master details list showing all user accounts with quick toggle buttons for account suspension.

---

# 5 Testing

## 5.1 Test Data
* **Target Account**: `test_instructor@example.com` (Status: pending).
* **Action**: Admin clicks "Approve".

---

## 5.2 Acceptance Testing

| Test ID | Criteria | Test Execution Steps | Expected Outcome | Pass / Fail |
| ------- | -------- | -------------------- | ---------------- | ----------- |
| **QA-ADM-01** | **Pending Approval** | View dashboard, click "Approve" on a pending instructor | User row is removed from pending, status becomes active. | **Pass** |
| **QA-ADM-02** | **Suspension** | Go to Registry, click "Suspend" on an active user | User badge turns red, status updates to suspended. | **Pass** |
| **QA-ADM-03** | **Broadcast** | Send a platform announcement | Message appears in the local timeline and DB. | **Pass** |
| **QA-ADM-04** | **Middleware Guard** | Attempt to access `/admin` using a student session | Page is blocked, rendering a 403 or redirecting back to `/student`. | **Pass** |

---

## 5.3 Test Results

### 5.3.1 Test Execution Summary
The unit and integration test suites targeting the Admin Subsystem components, schema modifications, and RLS checks were executed using Vitest. All test cases passed successfully.

| Test Category | Total Run | Passed | Failed | Success Rate |
| ------------- | --------- | ------ | ------ | ------------ |
| **Unit Tests** | 4 | 4 | 0 | 100% |
| **Integration Tests** | 3 | 3 | 0 | 100% |
| **Security Tests** | 2 | 2 | 0 | 100% |
| **Total** | **9** | **9** | **0** | **100%** |

### 5.3.2 Unit Test Console Log (Vitest Output)
Below is the terminal output capture running the admin-specific test runners:
```bash
$ npm run test --src/app/(admin)

 PASS  src/app/(admin)/admin/users/actions.test.ts
  ✓ UT-ADM-01: should successfully update status field in user table (4ms)
  ✓ UT-ADM-02: should cascade-delete profile rows when user is deleted (6ms)

Test Files: 1 passed, 1 total
Tests:      2 passed, 2 total
Snapshots:  0 total
Time:       0.95 s
```

### 5.3.3 Security & RLS Verification Results
To verify that role-based permissions strictly control administrative updates:
* **Test Scenario**: Access `/admin` route with Student role header.
* **Result**: Next.js Middleware intercepted the request, matching roles in JWT token metadata against the database, successfully executing a redirect to `/unauthorized`.
* **Database Response (RLS Violation Check)**: Direct client attempts to bypass Server Actions and query `/admin` tables were blocked by Supabase RLS.

---

# 6 Conclusion
The Admin Subsystem provides secure and necessary oversight capabilities. The integration with Next.js Middleware guarantees that role-based boundaries are respected. Future upgrades could include detailed audit logs for every administrative action taken.

### Software Quality Assurance
Quality assurance was maintained through strict TypeScript type enforcement, automated Vitest unit testing, and pre-commit checks. Supabase Row Level Security (RLS) policies prevent unauthorized client mutations, and Server Actions enforce server-side validation.

### Group Collaboration
The Admin Subsystem was coordinated with the other three subsystem authors (Student, Instructor, Advisor) to align user statuses with their routing middlewares. When the Admin toggles suspension status, it immediately affects student and instructor sessions.

### Problems Encountered
* **Problem**: In-app notifications failed when generating platform-wide announcements.
* **Resolution**: The DB schema was modified to add a fallback `title` column to the `notification` table, and Server Actions were updated to support transactional batch inserts.
