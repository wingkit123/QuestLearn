# Part II — Technology Stack

## 1. Overview

The technology stack for QuestLearn was selected to balance development efficiency, team familiarity, and alignment with the system architecture defined in the Architecture Design document. All selected technologies are open-source or freely available, making them suitable for a university prototype project.

---

## 2. Stack Summary

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| Frontend | React.js | 18.x | Single-page application framework |
| UI Library | Material UI (MUI) | 5.x | Pre-built, responsive UI components |
| Routing | React Router | 6.x | Client-side navigation and role-based routing |
| State Management | React Context + Hooks | — | Lightweight global state for auth and user data |
| Backend | Node.js | 20.x LTS | Server runtime |
| API Framework | Express.js | 4.x | RESTful API routing and middleware |
| ORM | Sequelize | 6.x | Database abstraction and query building |
| Database | PostgreSQL | 16.x | Relational data storage |
| Caching | Redis | 7.x | Session caching and query result caching |
| Authentication | JWT + bcrypt | — | Stateless auth tokens and password hashing |
| Testing | Jest + Supertest | — | Unit and integration testing |
| E2E Testing | Playwright | — | Browser-based end-to-end testing |
| Containerization | Docker + Docker Compose | — | Consistent development and deployment environments |
| CI/CD | GitHub Actions | — | Automated testing and deployment pipeline |
| Version Control | Git + GitHub | — | Source code management and collaboration |

---

## 3. Technology Justifications

### 3.1 React.js (Frontend)

React was chosen for the presentation layer because its component-based architecture aligns well with the modular dashboard design required by QuestLearn. Each dashboard (Student, Instructor, Advisor, Admin) can be built as an independent set of reusable components. React's virtual DOM provides efficient re-rendering for interactive elements such as the quiz interface and real-time progress updates.

**Alternative considered:** Vue.js offers similar capabilities with a gentler learning curve; however, React's larger ecosystem and the team's prior experience made it the preferred choice.

### 3.2 Node.js + Express.js (Backend)

Node.js was selected because it allows the team to use JavaScript across both the frontend and backend, reducing context-switching during development. Express.js provides a lightweight, unopinionated framework that gives the team full control over middleware, routing, and error handling.

**Alternative considered:** Python with Django would provide more built-in features (admin panel, ORM, auth), but Node.js offers better alignment with the React frontend and supports non-blocking I/O for handling concurrent API requests.

### 3.3 PostgreSQL (Database)

PostgreSQL was chosen because QuestLearn's data model involves complex relationships across 20+ entities, multiple foreign key constraints, and analytical queries that benefit from a mature relational database. PostgreSQL's support for JSONB columns (used in `activity_log.metadata`) provides flexibility for semi-structured engagement data without sacrificing relational integrity.

**Alternative considered:** MySQL offers similar relational capabilities, but PostgreSQL's advanced features (partial indexes, JSONB, window functions) better support the analytics queries required for dashboards.

### 3.4 Redis (Caching)

Redis serves two purposes in the architecture: session token storage for fast JWT validation, and query result caching for dashboard data that does not need real-time freshness. This reduces database load for frequently accessed reference data such as course lists and role definitions.

### 3.5 JWT + bcrypt (Authentication)

JSON Web Tokens provide stateless authentication that scales well and simplifies the API design. Each token carries the user's `user_id` and `role_name`, enabling the backend to authorize requests without additional database lookups. Passwords are hashed using bcrypt with a minimum of 10 salt rounds, ensuring resistance to brute-force and rainbow table attacks.

### 3.6 Sequelize (ORM)

Sequelize was selected as the ORM to provide a consistent, type-safe interface between the business logic layer and PostgreSQL. It supports model definitions, migrations, seeders, and parameterized queries that prevent SQL injection by default.

### 3.7 Docker (Containerization)

Docker ensures that all team members work in identical development environments, eliminating "works on my machine" issues. The `docker-compose.yml` file defines four services (frontend, API, database, Redis) that can be started with a single command.

---

## 4. Development Environment

### 4.1 Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 20.x LTS |
| npm | 10.x |
| Docker Desktop | 4.x |
| Git | 2.40+ |
| PostgreSQL (for local dev without Docker) | 16.x |

### 4.2 Project Structure

```
src/
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route-level page components
│   │   ├── services/            # API client functions
│   │   ├── contexts/            # React Context providers
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Helpers and constants
│   └── package.json
│
├── backend/                     # Express API
│   ├── config/                  # Database and app configuration
│   ├── controllers/             # Route handlers
│   ├── middleware/               # Auth, validation, error handling
│   ├── models/                  # Sequelize model definitions
│   ├── routes/                  # API route definitions
│   ├── services/                # Business logic services
│   ├── seeders/                 # Demo data seeders
│   └── package.json
│
├── database/                    # SQL scripts
│   └── Database-Schema.sql
│
├── tests/                       # Test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docker-compose.yml
└── .github/workflows/ci.yml    # GitHub Actions CI pipeline
```

### 4.3 API Design Conventions

| Convention | Standard |
|---|---|
| Base URL | `/api/v1/` |
| Response Format | JSON with `{ success, data, message }` structure |
| Authentication | `Authorization: Bearer <JWT>` header |
| Error Handling | Consistent error codes with descriptive messages |
| Pagination | `?page=1&limit=20` query parameters |
| Naming | kebab-case for URLs, camelCase for JSON properties |

### 4.4 Key API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and receive JWT | No |
| GET | `/api/v1/users/profile` | Get current user profile | Yes |
| PUT | `/api/v1/users/profile` | Update profile | Yes |
| GET | `/api/v1/courses` | List courses | Yes |
| POST | `/api/v1/courses` | Create course | Instructor |
| GET | `/api/v1/courses/:id/modules` | List modules in course | Yes |
| POST | `/api/v1/courses/:id/enroll` | Enroll in course | Student |
| GET | `/api/v1/lessons/:id` | Get lesson content | Student |
| POST | `/api/v1/quizzes/:id/attempt` | Submit quiz attempt | Student |
| GET | `/api/v1/quizzes/:id/results` | Get quiz results + feedback | Student |
| GET | `/api/v1/dashboard/student` | Student dashboard data | Student |
| GET | `/api/v1/dashboard/instructor` | Instructor analytics | Instructor |
| GET | `/api/v1/dashboard/advisor` | Advisor student list | Advisor |
| GET | `/api/v1/admin/users` | Admin user management | Admin |
| POST | `/api/v1/announcements` | Create announcement | Admin |
| GET | `/api/v1/notifications` | Get user notifications | Yes |
