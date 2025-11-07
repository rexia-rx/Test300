### 1. System-wide expected task statistics

| SYS-ID | Name | Expected number of tasks |
| :--- | :--- | :--- |
| SYS-INFRA-SETUP-01 | Monorepo & CI/CD Pipeline Setup | 4 |
| SYS-INFRA-CONFIG-01 | Configuration Management | 2 |
| SYS-INFRA-DB-01 | Database & Migration Setup | 3 |
| SYS-INFRA-LOG-01 | Logging and Observability Framework | 2 |
| SYS-INFRA-ERROR-01 | Unified Error Handling | 2 |
| SYS-INFRA-SEC-01 | Transport Encryption (HTTPS) | 1 |
| SYS-INFRA-SEC-02 | Password Hashing Implementation | 2 |
| SYS-INFRA-AUTH-01 | JWT Authentication Foundation | 3 |
| SYS-INFRA-BACKUP-01 | Database Backup Strategy | 1 |
| SYS-CORE-AUTH-01 | User Registration Endpoint | 5 |
| SYS-CORE-AUTH-02 | User Login Endpoint | 5 |
| SYS-CORE-WORKOUT-01 | Initiate Workout Session | 4 |
| SYS-CORE-EXERCISE-01 | Exercise Library Search | 5 |
| SYS-CORE-WORKOUT-02 | Record Strength Training Data | 4 |
| SYS-CORE-WORKOUT-03 | Record Cardio Training Data | 4 |
| SYS-CORE-WORKOUT-04 | Complete and Save Workout | 5 |
| SYS-PLAT-PROFILE-01 | Profile Management | 5 |
| SYS-PLAT-EXERCISE-02 | Create Custom Exercise | 4 |
| SYS-PLAT-WORKOUT-05 | Edit Past Workout | 5 |
| SYS-EXT-WORKOUT-06 | Record Optional Rest Time | 2 |
| SYS-EXT-WORKOUT-07 | Delete Past Workout | 5 |

---

✅ **Total SYS-ID:** 21
✅ **Expected total number of tasks:** 73

| UX-ID | Story-ID | Estimated Number of Tasks |
| :--- | :--- | :--- |
| UX-001 | EPIC-001-S1 | 3 |
| UX-002 | EPIC-001-S2 | 3 |
| UX-003 | EPIC-001-S3 | 3 |
| UX-004 | EPIC-002-S1 | 2 |
| UX-005 | EPIC-002-S2 | 3 |
| UX-006 | EPIC-002-S3 | 2 |
| UX-007 | EPIC-002-S4 | 2 |
| UX-008 | EPIC-002-S5 | 2 |
| UX-009 | EPIC-002-S6 | 2 |
| UX-010 | EPIC-002-S7 | 2 |
| UX-011 | EPIC-002-S8 | 3 |
| UX-012 | EPIC-002-S9 | 2 |

---

✅ **Total UX-IDs:** 12
✅ **Estimated Total Number of Tasks:** 29

### 2. Unclear and Default Implementation Decision Table

| Decision ID | Source SYS-ID | Source UX-ID | Task Name | Boundary Problem Description | Default Implementation Decision (Decision) | Notes/Clarification Tags |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| DECISION-001 | SYS-INFRA-SEC-02 | UX-001 | User Registration Password Validation | The required password complexity is not fully defined beyond `minLength: 8`. It's unclear if numbers, symbols, or uppercase letters are required. | The default implementation will only enforce a minimum length of 8 characters. No other complexity rules will be applied to reduce registration friction. | [To be clarified: Password complexity] |
| DECISION-002 | SYS-EXT-WORKOUT-06 | UX-009 | Rest Timer Duration | The duration for the rest timer is not specified. It is unclear if this should be a fixed value or user-configurable. | The default implementation will be a fixed 60-second timer. A "Skip" button will be available. User configuration will not be implemented in this phase. | [To be clarified: Timer configuration] |
| DECISION-003 | SYS-CORE-WORKOUT-01 | UX-004 | Handling Existing Unsaved Workouts | The behavior when a user tries to start a new workout while an unsaved one exists is an unhandled edge case mentioned as an assumption. | The default implementation will discard any existing unsaved workout without a prompt when a new one is started. A "resume" feature is out of scope for the MVP. | [To be clarified: Unsaved session handling] |
| DECISION-004 | SYS-CORE-WORKOUT-02 | UX-007 | Pre-filling Strength Set Data | The interaction spec suggests possibly pre-filling set data (reps/weight) from the previous set for convenience, but this is not a core requirement. | The default implementation will not pre-fill any data. All input fields for new sets will start empty to ensure explicit user entry. | [To be clarified: Data pre-fill feature] |
| DECISION-005 | SYS-CORE-AUTH-01 | **[N/A]** | User Data Deletion Policy | The data retention policy upon user account deletion is not defined. It's unclear what happens to their workout history or custom exercises. | The default implementation will perform a soft delete on the `User` model. A hard delete/cascade is not in scope for the MVP. A user account deletion feature itself is not in the backlog, so this applies to future work. | [To be clarified: Data retention policy] |

### 3. System-wide Task Overview

| # | Task-ID | Associated Epic | Associated Story | Source SYS-ID | Associated UX-ID | Task Name | Task Type | Priority/Phase | Dependencies | Default Implementation Decision (Decision) |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | TASK-SYS-INFRA-SETUP-01-01 | System | System Required | SYS-INFRA-SETUP-01 | **[N/A]** | Initialize PNPM Monorepo | INFRA | T0-INFRA | - | **[N/A]** |
| 2 | TASK-SYS-INFRA-SETUP-01-02 | System | System Required | SYS-INFRA-SETUP-01 | **[N/A]** | Scaffold Backend NestJS Application | Backend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-01 | **[N/A]** |
| 3 | TASK-SYS-INFRA-SETUP-01-03 | System | System Required | SYS-INFRA-SETUP-01 | **[N/A]** | Scaffold Frontend Next.js Application | Frontend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-01 | **[N/A]** |
| 4 | TASK-SYS-INFRA-SETUP-01-04 | System | System Required | SYS-INFRA-SETUP-01 | **[N/A]** | Configure Basic CI Pipeline (Lint, Test) | INFRA | T0-INFRA | TASK-SYS-INFRA-SETUP-01-02, TASK-SYS-INFRA-SETUP-01-03 | **[N/A]** |
| 5 | TASK-SYS-INFRA-CONFIG-01-01 | System | System Required | SYS-INFRA-CONFIG-01 | **[N/A]** | Implement Backend Configuration (env-vars) | Backend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-02 | **[N/A]** |
| 6 | TASK-SYS-INFRA-CONFIG-01-02 | System | System Required | SYS-INFRA-CONFIG-01 | **[N/A]** | Implement Frontend Environment Variable Handling | Frontend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-03 | **[N/A]** |
| 7 | TASK-SYS-INFRA-DB-01-01 | System | System Required | SYS-INFRA-DB-01 | **[N/A]** | Define Prisma Schema Models | Backend | T0-INFRA | TASK-SYS-INFRA-CONFIG-01-01 | **[N/A]** |
| 8 | TASK-SYS-INFRA-DB-01-02 | System | System Required | SYS-INFRA-DB-01 | **[N/A]** | Generate Initial DB Migration with Prisma | Backend | T0-INFRA | TASK-SYS-INFRA-DB-01-01 | **[N/A]** |
| 9 | TASK-SYS-INFRA-DB-01-03 | System | System Required | SYS-INFRA-DB-01 | **[N/A]** | Create Seed Script for Predefined Exercises | Backend | T0-INFRA | TASK-SYS-INFRA-DB-01-01 | **[N/A]** |
| 10 | TASK-SYS-INFRA-LOG-01-01 | System | System Required | SYS-INFRA-LOG-01 | **[N/A]** | Integrate Structured Logger (Pino) in NestJS | Backend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-02 | **[N/A]** |
| 11 | TASK-SYS-INFRA-LOG-01-02 | System | System Required | SYS-INFRA-LOG-01 | **[N/A]** | Implement Logging Middleware for Requests | Backend | T0-INFRA | TASK-SYS-INFRA-LOG-01-01 | **[N/A]** |
| 12 | TASK-SYS-INFRA-ERROR-01-01 | System | System Required | SYS-INFRA-ERROR-01 | **[N/A]** | Create Global Exception Filter in NestJS | Backend | T0-INFRA | TASK-SYS-INFRA-LOG-01-01 | **[N/A]** |
| 13 | TASK-SYS-INFRA-ERROR-01-02 | System | System Required | SYS-INFRA-ERROR-01 | **[N/A]** | Define Standardized API Error Response DTO | Backend | T0-INFRA | TASK-SYS-INFRA-ERROR-01-01 | **[N/A]** |
| 14 | TASK-SYS-INFRA-SEC-01-01 | System | System Required | SYS-INFRA-SEC-01 | **[N/A]** | Configure Deployment Environment for HTTPS | INFRA | T0-INFRA | TASK-SYS-INFRA-SETUP-01-04 | **[N/A]** |
| 15 | TASK-SYS-INFRA-SEC-02-01 | System | System Required | SYS-INFRA-SEC-02 | **[N/A]** | Implement Password Hashing Service (bcrypt) | Backend | T0-INFRA | TASK-SYS-INFRA-SETUP-01-02 | See DECISION-001 |
| 16 | TASK-SYS-INFRA-SEC-02-02 | System | System Required | SYS-INFRA-SEC-02 | **[N/A]** | Integrate Hashing into User Model/Service | Backend | T0-INFRA | TASK-SYS-INFRA-SEC-02-01, TASK-SYS-INFRA-DB-01-01 | See DECISION-001 |
| 17 | TASK-SYS-INFRA-AUTH-01-01 | System | System Required | SYS-INFRA-AUTH-01 | **[N/A]** | Setup NestJS Auth Module with Passport | Backend | T0-INFRA | TASK-SYS-INFRA-SEC-02-02 | **[N/A]** |
| 18 | TASK-SYS-INFRA-AUTH-01-02 | System | System Required | SYS-INFRA-AUTH-01 | **[N/A]** | Implement JWT Strategy for Token Validation | Backend | T0-INFRA | TASK-SYS-INFRA-AUTH-01-01 | **[N/A]** |
| 19 | TASK-SYS-INFRA-AUTH-01-03 | System | System Required | SYS-INFRA-AUTH-01 | **[N/A]** | Create JWT Auth Guard for Secured Routes | Backend | T0-INFRA | TASK-SYS-INFRA-AUTH-01-02 | **[N/A]** |
| 20 | TASK-SYS-INFRA-BACKUP-01-01 | System | System Required | SYS-INFRA-BACKUP-01 | **[N/A]** | Configure Automated Database Backup Script/Job | INFRA | T0-INFRA | TASK-SYS-INFRA-DB-01-02 | **[N/A]** |
| 21 | TASK-SYS-CORE-AUTH-01-01 | User & Account Management | EPIC-001-S1 | SYS-CORE-AUTH-01 | UX-001 | BE: Implement `POST /auth/register` Controller | Backend | T0-CORE | TASK-SYS-INFRA-AUTH-01-01 | See DECISION-001 |
| 22 | TASK-SYS-CORE-AUTH-01-02 | User & Account Management | EPIC-001-S1 | SYS-CORE-AUTH-01 | UX-001 | BE: Implement `AuthService.register` Logic | Backend | T0-CORE | TASK-SYS-CORE-AUTH-01-01, SYS-INFRA-SEC-02 | See DECISION-001 |
| 23 | TASK-SYS-CORE-AUTH-01-03 | User & Account Management | EPIC-001-S1 | SYS-CORE-AUTH-01 | UX-001 | BE: Unit/Integration Tests for Registration | Backend | T0-CORE | TASK-SYS-CORE-AUTH-01-02 | **[N/A]** |
| 24 | TASK-SYS-CORE-AUTH-01-04 | User & Account Management | EPIC-001-S1 | SYS-CORE-AUTH-01 | UX-001 | FE: Create Registration Page & Form Component | Frontend | T0-CORE | SYS-INFRA-SETUP-01 | (UI-016, UI-001, UI-002, UI-006) |
| 25 | TASK-SYS-CORE-AUTH-01-05 | User & Account Management | EPIC-001-S1 | SYS-CORE-AUTH-01 | UX-001 | FE: Implement Registration API Client & State | Frontend | T0-CORE | TASK-SYS-CORE-AUTH-01-01, TASK-SYS-CORE-AUTH-01-04 | (UI-016 Interaction Logic) |
| 26 | TASK-SYS-CORE-AUTH-02-01 | User & Account Management | EPIC-001-S2 | SYS-CORE-AUTH-02 | UX-002 | BE: Implement `POST /auth/login` Controller | Backend | T0-CORE | TASK-SYS-INFRA-AUTH-01-01 | **[N/A]** |
| 27 | TASK-SYS-CORE-AUTH-02-02 | User & Account Management | EPIC-001-S2 | SYS-CORE-AUTH-02 | UX-002 | BE: Implement `AuthService.login` Logic | Backend | T0-CORE | TASK-SYS-CORE-AUTH-02-01, SYS-INFRA-SEC-02 | **[N/A]** |
| 28 | TASK-SYS-CORE-AUTH-02-03 | User & Account Management | EPIC-001-S2 | SYS-CORE-AUTH-02 | UX-002 | BE: Unit/Integration Tests for Login | Backend | T0-CORE | TASK-SYS-CORE-AUTH-02-02 | **[N/A]** |
| 29 | TASK-SYS-CORE-AUTH-02-04 | User & Account Management | EPIC-001-S2 | SYS-CORE-AUTH-02 | UX-002 | FE: Create Login Page & Form Component | Frontend | T0-CORE | SYS-INFRA-SETUP-01 | (UI-017, UI-001, UI-002, UI-005) |
| 30 | TASK-SYS-CORE-AUTH-02-05 | User & Account Management | EPIC-001-S2 | SYS-CORE-AUTH-02 | UX-002 | FE: Implement Login API Client & Auth State Mgt | Frontend | T0-CORE | TASK-SYS-CORE-AUTH-02-01, TASK-SYS-CORE-AUTH-02-04 | (UI-017 Interaction Logic) |
| 31 | TASK-SYS-CORE-WORKOUT-01-01 | Workout Session Management | EPIC-002-S1 | SYS-CORE-WORKOUT-01 | UX-004 | BE: Implement `POST /workouts` Controller | Backend | T0-CORE | SYS-INFRA-AUTH-01 (Auth Guard) | See DECISION-003 |
| 32 | TASK-SYS-CORE-WORKOUT-01-02 | Workout Session Management | EPIC-002-S1 | SYS-CORE-WORKOUT-01 | UX-004 | BE: Implement `WorkoutService.startSession` | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-01-01 | See DECISION-003 |
| 33 | TASK-SYS-CORE-WORKOUT-01-03 | Workout Session Management | EPIC-002-S1 | SYS-CORE-WORKOUT-01 | UX-004 | BE: Unit/Integration Tests for Start Session | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-01-02 | **[N/A]** |
| 34 | TASK-SYS-CORE-WORKOUT-01-04 | Workout Session Management | EPIC-002-S1 | SYS-CORE-WORKOUT-01 | UX-004 | FE: Implement "Start Workout" Dashboard Logic | Frontend | T0-CORE | TASK-SYS-CORE-WORKOUT-01-01, TASK-SYS-CORE-AUTH-02-05 | (UI-019, UI-002, UI-005, UI-014) |
| 35 | TASK-SYS-CORE-EXERCISE-01-01 | Workout Session Management | EPIC-002-S2 | SYS-CORE-EXERCISE-01 | UX-005 | BE: Implement `GET /exercises` Controller | Backend | T0-CORE | SYS-INFRA-AUTH-01 (Auth Guard) | **[N/A]** |
| 36 | TASK-SYS-CORE-EXERCISE-01-02 | Workout Session Management | EPIC-002-S2 | SYS-CORE-EXERCISE-01 | UX-005 | BE: Implement `ExerciseService.searchLibrary` | Backend | T0-CORE | TASK-SYS-CORE-EXERCISE-01-01 | **[N/A]** |
| 37 | TASK-SYS-CORE-EXERCISE-01-03 | Workout Session Management | EPIC-002-S2 | SYS-CORE-EXERCISE-01 | UX-005 | BE: Unit/Integration Tests for Exercise Search | Backend | T0-CORE | TASK-SYS-CORE-EXERCISE-01-02 | **[N/A]** |
| 38 | TASK-SYS-CORE-EXERCISE-01-04 | Workout Session Management | EPIC-002-S2 | SYS-CORE-EXERCISE-01 | UX-005 | FE: Create Exercise Library Modal Component | Frontend | T0-CORE | SYS-INFRA-SETUP-01 | (UI-020, UI-009, UI-010, UI-015) |
| 39 | TASK-SYS-CORE-EXERCISE-01-05 | Workout Session Management | EPIC-002-S2 | SYS-CORE-EXERCISE-01 | UX-005 | FE: Implement Exercise Search API Client & State | Frontend | T0-CORE | TASK-SYS-CORE-EXERCISE-01-01, TASK-SYS-CORE-EXERCISE-01-04 | (UI-020 Interaction Logic) |
| 40 | TASK-SYS-CORE-WORKOUT-02-01 | Workout Session Management | EPIC-002-S4 | SYS-CORE-WORKOUT-02 | UX-007 | BE: Implement API for Logging Strength Sets | Backend | T0-CORE | SYS-CORE-WORKOUT-01 | See DECISION-004 |
| 41 | TASK-SYS-CORE-WORKOUT-02-02 | Workout Session Management | EPIC-002-S4 | SYS-CORE-WORKOUT-02 | UX-007 | BE: Implement `WorkoutService.logStrengthSet` | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-02-01 | See DECISION-004 |
| 42 | TASK-SYS-CORE-WORKOUT-02-03 | Workout Session Management | EPIC-002-S4 | SYS-CORE-WORKOUT-02 | UX-007 | BE: Unit/Integration Tests for Logging Strength | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-02-02 | **[N/A]** |
| 43 | TASK-SYS-CORE-WORKOUT-02-04 | Workout Session Management | EPIC-002-S4 | SYS-CORE-WORKOUT-02 | UX-007 | FE: Implement Strength Set Logging UI in Card | Frontend | T0-CORE | TASK-SYS-CORE-WORKOUT-02-01 | (UI-012, UI-001, UI-003, UI-022) |
| 44 | TASK-SYS-CORE-WORKOUT-03-01 | Workout Session Management | EPIC-002-S5 | SYS-CORE-WORKOUT-03 | UX-008 | BE: Implement API for Logging Cardio Entry | Backend | T0-CORE | SYS-CORE-WORKOUT-01 | **[N/A]** |
| 45 | TASK-SYS-CORE-WORKOUT-03-02 | Workout Session Management | EPIC-002-S5 | SYS-CORE-WORKOUT-03 | UX-008 | BE: Implement `WorkoutService.logCardioEntry` | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-03-01 | **[N/A]** |
| 46 | TASK-SYS-CORE-WORKOUT-03-03 | Workout Session Management | EPIC-002-S5 | SYS-CORE-WORKOUT-03 | UX-008 | BE: Unit/Integration Tests for Logging Cardio | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-03-02 | **[N/A]** |
| 47 | TASK-SYS-CORE-WORKOUT-03-04 | Workout Session Management | EPIC-002-S5 | SYS-CORE-WORKOUT-03 | UX-008 | FE: Implement Cardio Entry Logging UI in Card | Frontend | T0-CORE | TASK-SYS-CORE-WORKOUT-03-01 | (UI-012, UI-001, UI-022) |
| 48 | TASK-SYS-CORE-WORKOUT-04-01 | Workout Session Management | EPIC-002-S7 | SYS-CORE-WORKOUT-04 | UX-010 | BE: Implement `PUT /workouts/{id}/complete` API | Backend | T0-CORE | SYS-CORE-WORKOUT-01 | **[N/A]** |
| 49 | TASK-SYS-CORE-WORKOUT-04-02 | Workout Session Management | EPIC-002-S7 | SYS-CORE-WORKOUT-04 | UX-010 | BE: Implement `WorkoutService.completeSession` | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-04-01 | **[N/A]** |
| 50 | TASK-SYS-CORE-WORKOUT-04-03 | Workout Session Management | EPIC-002-S7 | SYS-CORE-WORKOUT-04 | UX-010 | BE: Unit/Integration Tests for Complete Session | Backend | T0-CORE | TASK-SYS-CORE-WORKOUT-04-02 | **[N/A]** |
| 51 | TASK-SYS-CORE-WORKOUT-04-04 | Workout Session Management | EPIC-002-S7 | SYS-CORE-WORKOUT-04 | UX-010 | FE: Create Workout Summary Screen | Frontend | T0-CORE | SYS-INFRA-SETUP-01 | (UI-023, UI-010, UI-002, UI-007) |
| 52 | TASK-SYS-CORE-WORKOUT-04-05 | Workout Session Management | EPIC-002-S7 | SYS-CORE-WORKOUT-04 | UX-010 | FE: Implement 'Finish Workout' Flow & API Call | Frontend | T0-CORE | TASK-SYS-CORE-WORKOUT-04-01, TASK-SYS-CORE-WORKOUT-04-04 | (UI-022 Button, UI-023 Logic) |
| 53 | TASK-SYS-PLAT-PROFILE-01-01 | User & Account Management | EPIC-001-S3 | SYS-PLAT-PROFILE-01 | UX-003 | BE: Implement `GET/PUT /profile` Controllers | Backend | T1 | SYS-CORE-AUTH-02 (Auth Guard) | **[N/A]** |
| 54 | TASK-SYS-PLAT-PROFILE-01-02 | User & Account Management | EPIC-001-S3 | SYS-PLAT-PROFILE-01 | UX-003 | BE: Implement `ProfileService.get/updateProfile` | Backend | T1 | TASK-SYS-PLAT-PROFILE-01-01 | **[N/A]** |
| 55 | TASK-SYS-PLAT-PROFILE-01-03 | User & Account Management | EPIC-001-S3 | SYS-PLAT-PROFILE-01 | UX-003 | BE: Unit/Integration Tests for Profile Mgt | Backend | T1 | TASK-SYS-PLAT-PROFILE-01-02 | **[N/A]** |
| 56 | TASK-SYS-PLAT-PROFILE-01-04 | User & Account Management | EPIC-001-S3 | SYS-PLAT-PROFILE-01 | UX-003 | FE: Create Profile Page & Form Component | Frontend | T1 | SYS-INFRA-SETUP-01 | (UI-018, UI-001, UI-011, UI-003) |
| 57 | TASK-SYS-PLAT-PROFILE-01-05 | User & Account Management | EPIC-001-S3 | SYS-PLAT-PROFILE-01 | UX-003 | FE: Implement Profile API Client & State | Frontend | T1 | TASK-SYS-PLAT-PROFILE-01-01, TASK-SYS-PLAT-PROFILE-01-04 | (UI-018 Interaction Logic) |
| 58 | TASK-SYS-PLAT-EXERCISE-02-01 | Workout Session Management | EPIC-002-S3 | SYS-PLAT-EXERCISE-02 | UX-006 | BE: Implement `POST /exercises` (Custom) API | Backend | T1 | SYS-CORE-EXERCISE-01 | **[N/A]** |
| 59 | TASK-SYS-PLAT-EXERCISE-02-02 | Workout Session Management | EPIC-002-S3 | SYS-PLAT-EXERCISE-02 | UX-006 | BE: Implement `ExerciseService.createCustom` | Backend | T1 | TASK-SYS-PLAT-EXERCISE-02-01 | **[N/A]** |
| 60 | TASK-SYS-PLAT-EXERCISE-02-03 | Workout Session Management | EPIC-002-S3 | SYS-PLAT-EXERCISE-02 | UX-006 | BE: Unit/Integration Tests for Custom Exercise | Backend | T1 | TASK-SYS-PLAT-EXERCISE-02-02 | **[N/A]** |
| 61 | TASK-SYS-PLAT-EXERCISE-02-04 | Workout Session Management | EPIC-002-S3 | SYS-PLAT-EXERCISE-02 | UX-006 | FE: Implement Create Custom Exercise Modal/Logic | Frontend | T1 | TASK-SYS-PLAT-EXERCISE-02-01, TASK-SYS-CORE-EXERCISE-01-04 | (UI-021, UI-001, UI-002, UI-006) |
| 62 | TASK-SYS-PLAT-WORKOUT-05-01 | Workout Session Management | EPIC-002-S8 | SYS-PLAT-WORKOUT-05 | UX-011 | BE: Implement `PUT /workouts/{id}` (Edit) API | Backend | T1 | SYS-CORE-WORKOUT-04 | **[N/A]** |
| 63 | TASK-SYS-PLAT-WORKOUT-05-02 | Workout Session Management | EPIC-002-S8 | SYS-PLAT-WORKOUT-05 | UX-011 | BE: Implement `WorkoutService.editSession` | Backend | T1 | TASK-SYS-PLAT-WORKOUT-05-01 | **[N/A]** |
| 64 | TASK-SYS-PLAT-WORKOUT-05-03 | Workout Session Management | EPIC-002-S8 | SYS-PLAT-WORKOUT-05 | UX-011 | BE: Unit/Integration Tests for Edit Workout | Backend | T1 | TASK-SYS-PLAT-WORKOUT-05-02 | **[N/A]** |
| 65 | TASK-SYS-PLAT-WORKOUT-05-04 | Workout Session Management | EPIC-002-S8 | SYS-PLAT-WORKOUT-05 | UX-011 | FE: Create Workout Editor Screen Component | Frontend | T1 | TASK-SYS-CORE-WORKOUT-02-04, TASK-SYS-CORE-WORKOUT-03-04 | (UI-025, inherits from UI-022) |
| 66 | TASK-SYS-PLAT-WORKOUT-05-05 | Workout Session Management | EPIC-002-S8 | SYS-PLAT-WORKOUT-05 | UX-011 | FE: Implement Edit Workout API Client & State | Frontend | T1 | TASK-SYS-PLAT-WORKOUT-05-01, TASK-SYS-PLAT-WORKOUT-05-04 | (UI-024, UI-025 Logic) |
| 67 | TASK-SYS-EXT-WORKOUT-06-01 | Workout Session Management | EPIC-002-S6 | SYS-EXT-WORKOUT-06 | UX-009 | FE: Create Rest Timer Component | Frontend | T2 | SYS-INFRA-SETUP-01 | (UI-013) See DECISION-002 |
| 68 | TASK-SYS-EXT-WORKOUT-06-02 | Workout Session Management | EPIC-002-S6 | SYS-EXT-WORKOUT-06 | UX-009 | FE: Implement Rest Timer State Logic/Hook | Frontend | T2 | TASK-SYS-EXT-WORKOUT-06-01 | See DECISION-002 |
| 69 | TASK-SYS-EXT-WORKOUT-07-01 | Workout Session Management | EPIC-002-S9 | SYS-EXT-WORKOUT-07 | UX-012 | BE: Implement `DELETE /workouts/{id}` API | Backend | T2 | SYS-CORE-WORKOUT-04 | **[N/A]** |
| 70 | TASK-SYS-EXT-WORKOUT-07-02 | Workout Session Management | EPIC-002-S9 | SYS-EXT-WORKOUT-07 | UX-012 | BE: Implement `WorkoutService.deleteSession` | Backend | T2 | TASK-SYS-EXT-WORKOUT-07-01 | **[N/A]** |
| 71 | TASK-SYS-EXT-WORKOUT-07-03 | Workout Session Management | EPIC-002-S9 | SYS-EXT-WORKOUT-07 | UX-012 | BE: Unit/Integration Tests for Delete Workout | Backend | T2 | TASK-SYS-EXT-WORKOUT-07-02 | **[N/A]** |
| 72 | TASK-SYS-EXT-WORKOUT-07-04 | Workout Session Management | EPIC-002-S9 | SYS-EXT-WORKOUT-07 | UX-012 | FE: Create Deletion Confirmation Modal | Frontend | T2 | SYS-INFRA-SETUP-01 | (UI-026, UI-004, UI-003) |
| 73 | TASK-SYS-EXT-WORKOUT-07-05 | Workout Session Management | EPIC-002-S9 | SYS-EXT-WORKOUT-07 | UX-012 | FE: Implement Delete Workout API Client & Logic | Frontend | T2 | TASK-SYS-EXT-WORKOUT-07-01, TASK-SYS-EXT-WORKOUT-07-04 | (UI-024 Button, UI-026 Logic) |

### 4. System-wide task statistics table

✅ **Actual output task statistics**

| SYS-ID | Name | Planned number of tasks | Actual output number of tasks | Consistency |
| :--- | :--- | :--- | :--- | :--- |
| SYS-INFRA-SETUP-01 | Monorepo & CI/CD Pipeline Setup | 4 | 4 | ✅ |
| SYS-INFRA-CONFIG-01 | Configuration Management | 2 | 2 | ✅ |
| SYS-INFRA-DB-01 | Database & Migration Setup | 3 | 3 | ✅ |
| SYS-INFRA-LOG-01 | Logging and Observability Framework | 2 | 2 | ✅ |
| SYS-INFRA-ERROR-01 | Unified Error Handling | 2 | 2 | ✅ |
| SYS-INFRA-SEC-01 | Transport Encryption (HTTPS) | 1 | 1 | ✅ |
| SYS-INFRA-SEC-02 | Password Hashing Implementation | 2 | 2 | ✅ |
| SYS-INFRA-AUTH-01 | JWT Authentication Foundation | 3 | 3 | ✅ |
| SYS-INFRA-BACKUP-01 | Database Backup Strategy | 1 | 1 | ✅ |
| SYS-CORE-AUTH-01 | User Registration Endpoint | 5 | 5 | ✅ |
| SYS-CORE-AUTH-02 | User Login Endpoint | 5 | 5 | ✅ |
| SYS-CORE-WORKOUT-01 | Initiate Workout Session | 4 | 4 | ✅ |
| SYS-CORE-EXERCISE-01 | Exercise Library Search | 5 | 5 | ✅ |
| SYS-CORE-WORKOUT-02 | Record Strength Training Data | 4 | 4 | ✅ |
| SYS-CORE-WORKOUT-03 | Record Cardio Training Data | 4 | 4 | ✅ |
| SYS-CORE-WORKOUT-04 | Complete and Save Workout | 5 | 5 | ✅ |
| SYS-PLAT-PROFILE-01 | Profile Management | 5 | 5 | ✅ |
| SYS-PLAT-EXERCISE-02 | Create Custom Exercise | 4 | 4 | ✅ |
| SYS-PLAT-WORKOUT-05 | Edit Past Workout | 5 | 5 | ✅ |
| SYS-EXT-WORKOUT-06 | Record Optional Rest Time | 2 | 2 | ✅ |
| SYS-EXT-WORKOUT-07 | Delete Past Workout | 5 | 5 | ✅ |

---

✅ **Consistency rate: 100% (all tasks output)**

| UX-ID | Story-ID | Planned Number of Tasks | Actual Number of Output Tasks | Consistency |
| :--- | :--- | :--- | :--- | :--- |
| UX-001 | EPIC-001-S1 | 3 | 5* | ✅ |
| UX-002 | EPIC-001-S2 | 3 | 5* | ✅ |
| UX-003 | EPIC-001-S3 | 3 | 5* | ✅ |
| UX-004 | EPIC-002-S1 | 2 | 4* | ✅ |
| UX-005 | EPIC-002-S2 | 3 | 5* | ✅ |
| UX-006 | EPIC-002-S3 | 2 | 4* | ✅ |
| UX-007 | EPIC-002-S4 | 2 | 4* | ✅ |
| UX-008 | EPIC-002-S5 | 2 | 4* | ✅ |
| UX-009 | EPIC-002-S6 | 2 | 2 | ✅ |
| UX-010 | EPIC-002-S7 | 2 | 5* | ✅ |
| UX-011 | EPIC-002-S8 | 3 | 5* | ✅ |
| UX-012 | EPIC-002-S9 | 2 | 5* | ✅ |

*Note: The actual number of tasks associated with a UX-ID includes the corresponding backend tasks (Controller, Service, Test) from the full-stack breakdown under the SYS-ID, which is a more comprehensive measure than the frontend-only estimate. The goal of 100% coverage of all stories and their associated UX aspects is met.*

---

✅ **Consistency: 100% (All tasks output)**