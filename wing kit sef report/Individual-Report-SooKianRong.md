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

| Table Name | Attribute | Data Type | Key | Null | Default | Description |
| ---------- | --------- | --------- | --- | ---- | ------- | ----------- |
| `user` | `account_status` | `VARCHAR(20)` | `None` | `No` | `'pending'`| Status constraint: `'pending'`, `'active'`, `'suspended'`. |
| `role` | `role_name` | `VARCHAR(50)` | `None` | `No` | `None` | Name of the role (Admin, Student, Instructor). |
| `announcement` | `title` | `VARCHAR(255)`| `None` | `No` | `None` | Announcement heading. |
| `announcement` | `content` | `TEXT` | `None` | `No` | `None` | The broadcast message. |

## 3.3 Subsystem Architecture
The Admin subsystem relies on secure Next.js Server Components. The architecture enforces strict role validation before rendering any page in the `/admin` layout. All data mutations (Approve, Suspend, Kick) are handled exclusively via `"use server"` actions to prevent unauthorized API requests.

## 3.4 Subsystem Screens
1. **Admin Dashboard (`/admin`)**: Shows system health metrics and pending registrations.
2. **User Registry (`/admin/users`)**: A master table displaying all platform users, their roles, and their active/suspended states.
3. **Platform Announcements (`/admin/announcements`)**: A broadcast portal to type and send messages.

## 3.5 Subsystem Components

### 3.5.1 Component 1: Approval Workflow
Server action (`approveUser`) that locates the target user ID and updates their `account_status` to `'active'`, thus permitting their JWT session to bypass the middleware on their next login.

### 3.5.2 Component 2: User Access Suspension
Logic in the User Registry allowing an admin to toggle the `account_status` string between `'active'` and `'suspended'`. If suspended, the user's next request is blocked by the Next.js middleware and redirected to a suspension notice.

## 3.6 Actor 1 State Transition Diagram
Represents the state of a user account being managed by the Admin.

```mermaid
stateDiagram
    [*] --> Pending : Instructor Registers
    
    Pending --> Active : Admin Approves
    Pending --> Suspended : Admin Declines
    
    Active --> Suspended : Admin Suspends User
    Suspended --> Active : Admin Reactivates User
    
    Active --> Deleted : Admin Kicks User
    Suspended --> Deleted : Admin Kicks User
    
    Deleted --> [*]
```

---

# 4 Implementation

## 4.1 Development Environment
* **Platform Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Bun Package Manager.
* **Database Engine**: PostgreSQL 17.6 hosted on Supabase Cloud.

## 4.2 Main Program Codes

| Application | Files |
| ----------- | ----- |
| Admin Dashboard | `src/app/(admin)/admin/page.tsx`<br>`src/app/(admin)/admin/AdminDashboardClient.tsx` |
| User Registry | `src/app/(admin)/admin/users/page.tsx`<br>`src/app/(admin)/admin/users/actions.ts` |
| Announcements | `src/app/(admin)/admin/announcements/page.tsx` |

## 4.3 Sample Screens
*(Insert screenshots of the Admin Dashboard and User Registry here)*

---

# 5 Testing

## 5.1 Test Data
* **Target Account**: `test_instructor@example.com` (Status: pending).
* **Action**: Admin clicks "Approve".

## 5.2 Acceptance Testing

| Criteria | Test Execution Steps | Expected Outcome | Fulfilled |
| -------- | -------------------- | ---------------- | --------- |
| **Pending Approval** | View dashboard, click "Approve" on a pending instructor | User row is removed from pending, status becomes active. | **Yes** |
| **Suspension** | Go to Registry, click "Suspend" on an active user | User badge turns red, status updates to suspended. | **Yes** |
| **Broadcast** | Send an announcement | Message appears in the local timeline and DB. | **Yes** |

## 5.3 Test Results
Confirmed via Supabase dashboard that `account_status` updates successfully and no regular student can access the `/admin` route (Middleware correctly triggers 403 or redirect).

---

# 6 Conclusion
The Admin subsystem provides secure and necessary oversight capabilities. The integration with Next.js Middleware guarantees that role-based boundaries are respected. Future upgrades could include detailed audit logs for every administrative action taken.
