# QuestLearn Activity Diagrams (Diagram-Only)

This document contains only the activity diagrams for formal use cases UC-01 to UC-09.

## UC-01 Register Account and Login

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

## UC-02 Start Lesson

```mermaid
flowchart TD
    A((Start)) --> B[Open course]
    B --> C[Select module]
    C --> D[Select lesson]
    D --> E{Lesson available?}
    E -- No --> F[Inform student lesson is unavailable]
    F --> Z((End))
    E -- Yes --> G[Display lesson content]
    G --> H[Track page visits and interactions]
    H --> I[Update lesson progress]
    I --> Z((End))
```

## UC-03 Attempt Quiz and Receive Automated Feedback

```mermaid
flowchart TD
    A((Start)) --> B[Open available quiz]
    B --> C[Display quiz questions]
    C --> D[Student answers questions]
    D --> E{Submission complete?}
    E -- No --> F[Warn student before final submission]
    F --> D
    E -- Yes --> G[Submit quiz]
    G --> H[Auto-grade objective questions]
    H --> I[Store score and attempt details]
    I --> J[Generate feedback and weak topics]
    J --> K[Show recommended next steps]
    K --> L((End))
```

## UC-04 Submit Assignment

```mermaid
flowchart TD
    A((Start)) --> B[Open assignment details]
    B --> C[Read instructions and deadline]
    C --> D[Upload or enter submission]
    D --> E{Submission valid?}
    E -- No --> F[Reject submission and request correction]
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

## UC-05 Create Course and Learning Structure

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

## UC-06 Publish Lesson Content

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

## UC-07 Create Assessment and Configure Feedback

```mermaid
flowchart TD
    A((Start)) --> B[Open assessment management]
    B --> C[Create quiz or assignment]
    C --> D[Define assessment rules]
    D --> E[Select or create question bank items]
    E --> F[Configure automated feedback]
    F --> G{Settings complete?}
    G -- No --> D
    G -- Yes --> H[Publish assessment]
    H --> I[Store assessment and availability rules]
    I --> J((End))
```

## UC-08 View Advisor Dashboard and Follow Up

```mermaid
flowchart TD
    A((Start)) --> B[Open advisor dashboard]
    B --> C[View students with progress and performance data]
    C --> D{Students need attention?}
    D -- No --> E[Review student progress summaries]
    E --> Z((End))
    D -- Yes --> F[Select student]
    F --> G[View progress history and quiz performance]
    G --> H[Review overdue assignments]
    H --> I[Send follow-up message]
    I --> J[Record follow-up status]
    J --> Z((End))
```

## UC-09 Moderate Content and Manage Announcements

```mermaid
flowchart TD
    A((Start)) --> B[Open moderation or announcement function]
    B --> C[Review flagged or managed content]
    C --> D{Action needed?}
    D -- No --> E[Close review without modification]
    E --> Z((End))
    D -- Yes --> F[Approve, update, or remove content]
    F --> G[Create or update announcement]
    G --> H[Store or distribute announcement]
    H --> I[Record moderation or announcement action]
    I --> Z((End))
```
