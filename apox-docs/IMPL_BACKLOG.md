# Implementation Backlog

<!-- impl-batch:TASK-SYS-INFRA-SETUP-01-01::SYS-INFRA-SETUP-01::[N/A]::TASK-SYS-INFRA-SETUP-01-02::SYS-INFRA-SETUP-01::[N/A]::TASK-SYS-INFRA-SETUP-01-03::SYS-INFRA-SETUP-01::[N/A]::TASK-SYS-INFRA-SETUP-01-04::SYS-INFRA-SETUP-01::[N/A]::TASK-SYS-INFRA-CONFIG-01-01::SYS-INFRA-CONFIG-01::[N/A] -->

## **Task-ID**: TASK-SYS-INFRA-SETUP-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SETUP-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Initialize PNPM Monorepo

**Task Type**: INFRA

**Priority/Phase**: T0-INFRA

**Dependency**: -

**DECISION-REF**: —

### 🔹 **Coverage**:

*   Project Structure: Creation of the root directory `myfitness2-repo` and initialization of a PNPM workspace.
*   Configuration: Setup of `pnpm-workspace.yaml` to define monorepo structure.
*   Tooling: Ensures `pnpm` is the package manager for consistent dependency management.
*   Database Changes: Not Applicable.
*   UI/Components: Not Applicable.
*   Interaction Logic: Not Applicable.
*   Business Boundary Condition: Not Applicable.
*   Observability: Not Applicable.
*   Performance Considerations: Minimal impact; foundational setup.
*   Non-Functional: Facilitates consistent dependency management across frontend and backend.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: User executes CLI commands.
    *   Output: `myfitness2-repo/pnpm-workspace.yaml` and `myfitness2-repo/package.json` files are created.
*   **Decision point application**: No specific decisions from `DECISION-REF` apply here.
*   **Main Function/Class Design**: N/A; this is a setup task using CLI commands.
*   **Code Location**:
    *   `myfitness2-repo/pnpm-workspace.yaml`
    *   `myfitness2-repo/package.json` (root)
*   **Call Chain**: User -> CLI -> File System.
*   **Performance/Security/Logging Considerations**: N/A for this initial setup task.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (if applicable)**

1.  Request Handling: N/A.
2.  Business Logic: N/A.
3.  Data Access: N/A.
4.  Error and Exception Handling: CLI command errors.
5.  Logging and Metrics: N/A.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target    | Description                      |
| ----- | -------------------- | -------------------------------- |
| Write | `pnpm-workspace.yaml` | Defines monorepo package paths.  |
| Write | `package.json`       | Root package file for monorepo.  |
| Audit | Log Event            | CLI command execution for setup. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant CLI as "Terminal CLI"
participant FS as "File System"
USER->>CLI: pnpm init -w
activate CLI
CLI->>FS: Create pnpm-workspace.yaml
CLI->>FS: Create package.json
FS-->>CLI: Files created
deactivate CLI
CLI-->>USER: Workspace initialized
```

### 🔹 **Error and Exception Mapping**

| Scenario      | Error Code   | HTTP Status | User Prompt                 |
| ------------- | ------------ | ----------- | --------------------------- |
| Invalid Command | CMD_ERROR    | N/A         | Please check command syntax |
| Permissions   | PERM_DENIED  | N/A         | Cannot write to directory   |

### 🔹 **Security and Observability Hooks**

*   Transport Security: N/A.
*   Authentication: N/A.
*   Log Event Naming and Field Standards: N/A.
*   Metric Naming: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an empty directory named `myfitness2-repo`
*   ✅ When `pnpm init -w` is executed within it
*   ✅ Then a `pnpm-workspace.yaml` file and a `package.json` file should be created in the root.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                |
| ------------------ | ------------ | ------------------------------------------ |
| Single Responsibility | ✅           | Focuses solely on initializing the monorepo. |
| Independence       | ✅           | No external dependencies beyond pnpm CLI.  |
| Testability        | ✅           | Verifiable by checking file existence.     |
| Small Subset Testing | ✅           | Can be tested in isolation.                |

### 🔹 **Code Location**

```
myfitness2-repo/pnpm-workspace.yaml
myfitness2-repo/package.json
```

---

## **Task-ID**: TASK-SYS-INFRA-SETUP-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SETUP-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Scaffold Backend NestJS Application

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-01

**DECISION-REF**: —

### 🔹 **Coverage**:

*   Project Structure: Creation of the `apps/backend` directory with a standard NestJS application.
*   Configuration: Generation of NestJS-specific files like `nest-cli.json`, `tsconfig.json`, `package.json` for the backend.
*   Tooling: Sets up TypeScript and basic NestJS dependencies.
*   Database Changes: Not Applicable.
*   UI/Components: Not Applicable.
*   Interaction Logic: Not Applicable.
*   Business Boundary Condition: Not Applicable.
*   Observability: Not Applicable.
*   Performance Considerations: Minimal impact; foundational setup.
*   Non-Functional: Establishes the backend's core development environment.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: User executes CLI commands.
    *   Output: A new NestJS project structure within `apps/backend`.
*   **Decision point application**: No specific decisions from `DECISION-REF` apply here.
*   **Main Function/Class Design**: N/A; this is a setup task using CLI commands. The scaffolded app will contain `main.ts`, `app.module.ts`, etc.
*   **Code Location**:
    *   `myfitness2-repo/apps/backend/` (and all its subdirectories)
*   **Call Chain**: User -> NestJS CLI -> File System.
*   **Performance/Security/Logging Considerations**: N/A for this initial setup task.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (if applicable)**

1.  Request Handling: N/A.
2.  Business Logic: N/A.
3.  Data Access: N/A.
4.  Error and Exception Handling: CLI command errors.
5.  Logging and Metrics: N/A.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                            |
| ----- | ----------------- | -------------------------------------- |
| Write | `apps/backend/`   | Creates NestJS project files.          |
| Audit | Log Event         | CLI command execution for scaffolding. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant CLI as "NestJS CLI"
participant FS as "File System"
USER->>CLI: nest new backend --pnpm
activate CLI
CLI->>FS: Create apps/backend dir
CLI->>FS: Generate boilerplate files
CLI->>FS: Install dependencies
FS-->>CLI: Files and dependencies ready
deactivate CLI
CLI-->>USER: Backend scaffolded
```

### 🔹 **Error and Exception Mapping**

| Scenario             | Error Code   | HTTP Status | User Prompt                           |
| -------------------- | ------------ | ----------- | ------------------------------------- |
| Directory Exists     | DIR_EXISTS   | N/A         | Backend folder already exists         |
| Network Error (NPM) | NET_ERROR    | N/A         | Failed to install dependencies        |
| Permissions          | PERM_DENIED  | N/A         | Cannot write to apps/backend directory |

### 🔹 **Security and Observability Hooks**

*   Transport Security: N/A.
*   Authentication: N/A.
*   Log Event Naming and Field Standards: N/A.
*   Metric Naming: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a monorepo initialized with `pnpm-workspace.yaml`
*   ✅ When `nest new backend --package-manager pnpm` is run from the root, creating `apps/backend`
*   ✅ Then `apps/backend` should contain a valid NestJS project structure with `src`, `package.json`, and `tsconfig.json`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                  |
| ------------------ | ------------ | -------------------------------------------- |
| Single Responsibility | ✅           | Focuses solely on scaffolding the backend app. |
| Independence       | ✅           | Depends only on pnpm workspace and NestJS CLI. |
| Testability        | ✅           | Verifiable by checking directory structure.  |
| Small Subset Testing | ✅           | Can be executed in isolation.                |

### 🔹 **Code Location**

```
apps/backend/
```

---

## **Task-ID**: TASK-SYS-INFRA-SETUP-01-03

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SETUP-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Scaffold Frontend Next.js Application

**Task Type**: Frontend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-01

**DECISION-REF**: —

### 🔹 **Coverage**:

*   Project Structure: Creation of the `apps/frontend` directory with a standard Next.js application (App Router, TypeScript).
*   Configuration: Generation of Next.js-specific files like `next.config.js`, `tsconfig.json`, `package.json` for the frontend.
*   Tooling: Sets up TypeScript, ESLint, Tailwind CSS, and basic Next.js dependencies.
*   Database Changes: Not Applicable.
*   UI/Components: Not Applicable.
*   Interaction Logic: Not Applicable.
*   Business Boundary Condition: Not Applicable.
*   Observability: Not Applicable.
*   Performance Considerations: Minimal impact; foundational setup.
*   Non-Functional: Establishes the frontend's core development environment.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: User executes CLI commands.
    *   Output: A new Next.js project structure within `apps/frontend`.
*   **Decision point application**: No specific decisions from `DECISION-REF` apply here.
*   **Main Function/Class Design**: N/A; this is a setup task using CLI commands. The scaffolded app will contain `app/layout.tsx`, `app/page.tsx`, etc.
*   **Code Location**:
    *   `myfitness2-repo/apps/frontend/` (and all its subdirectories)
*   **Call Chain**: User -> Next.js CLI -> File System.
*   **Performance/Security/Logging Considerations**: N/A for this initial setup task.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process (if applicable)**

1.  Page or Component Location: N/A.
2.  Triggering Logic: N/A.
3.  Interaction with the Backend: N/A.
4.  UI Success/Failure Feedback: N/A.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                           |
| ----- | ----------------- | ------------------------------------- |
| Write | `apps/frontend/`  | Creates Next.js project files.        |
| Audit | Log Event         | CLI command execution for scaffolding |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant CLI as "Next.js CLI"
participant FS as "File System"
USER->>CLI: pnpm create next-app frontend
activate CLI
CLI->>FS: Create apps/frontend dir
CLI->>FS: Generate boilerplate files
CLI->>FS: Install dependencies
FS-->>CLI: Files and dependencies ready
deactivate CLI
CLI-->>USER: Frontend scaffolded
```

### 🔹 **Error and Exception Mapping**

| Scenario             | Error Code   | HTTP Status | User Prompt                             |
| -------------------- | ------------ | ----------- | --------------------------------------- |
| Directory Exists     | DIR_EXISTS   | N/A         | Frontend folder already exists          |
| Network Error (NPM) | NET_ERROR    | N/A         | Failed to install dependencies          |
| Permissions          | PERM_DENIED  | N/A         | Cannot write to apps/frontend directory |

### 🔹 **Security and Observability Hooks**

*   Transport Security: N/A.
*   Authentication: N/A.
*   Log Event Naming and Field Standards: N/A.
*   Metric Naming: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a monorepo initialized with `pnpm-workspace.yaml`
*   ✅ When `pnpm create next-app frontend --ts --eslint --tailwind --app --src-dir --import-alias '@*'` is run from the root
*   ✅ Then `apps/frontend` should contain a valid Next.js App Router project structure with `src/app`, `package.json`, and `tsconfig.json`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                   |
| ------------------ | ------------ | --------------------------------------------- |
| Single Responsibility | ✅           | Focuses solely on scaffolding the frontend app. |
| Independence       | ✅           | Depends only on pnpm workspace and Next.js CLI. |
| Testability        | ✅           | Verifiable by checking directory structure.   |
| Small Subset Testing | ✅           | Can be executed in isolation.                 |

### 🔹 **Code Location**

```
apps/frontend/
```

---

## **Task-ID**: TASK-SYS-INFRA-SETUP-01-04

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SETUP-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Configure Basic CI Pipeline (Lint, Test)

**Task Type**: INFRA

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-02, TASK-SYS-INFRA-SETUP-01-03

**DECISION-REF**: —

### 🔹 **Coverage**:

*   CI/CD: Setup of a basic GitHub Actions workflow for linting and testing both frontend and backend applications.
*   Build Process: Ensures code quality checks (lint) and unit tests are run on every push.
*   Configuration: Creation of `.github/workflows/ci.yml`.
*   Tooling: Integration with `eslint`, `jest` (for backend) and `react-testing-library` (for frontend, if applicable).
*   Database Changes: Not Applicable.
*   UI/Components: Not Applicable.
*   Interaction Logic: Not Applicable.
*   Business Boundary Condition: Not Applicable.
*   Observability: CI status is observable via GitHub Actions interface.
*   Performance Considerations: CI job execution time should be optimized to provide quick feedback.
*   Non-Functional: Ensures code quality and stability.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: `push` event to Git repository.
    *   Output: CI job execution report on GitHub Actions.
*   **Decision point application**: No specific decisions from `DECISION-REF` apply here.
*   **Main Function/Class Design**: N/A; this is a YAML configuration for CI.
*   **Code Location**:
    *   `myfitness2-repo/.github/workflows/ci.yml`
    *   `myfitness2-repo/apps/backend/package.json` (for `lint` and `test` scripts)
    *   `myfitness2-repo/apps/frontend/package.json` (for `lint` and `test` scripts)
*   **Call Chain**: Git Push -> GitHub Actions -> Runner -> Monorepo Apps (lint/test scripts).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Optimize CI jobs to run in parallel where possible for frontend and backend.
    *   **Security**: Ensure CI runners operate with minimal necessary permissions. No sensitive data should be exposed in logs.
    *   **Logging**: GitHub Actions provides logs for each step.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (if applicable)**

1.  Request Handling: N/A.
2.  Business Logic: N/A.
3.  Data Access: N/A.
4.  Error and Exception Handling: CI job failure indicates lint/test errors.
5.  Logging and Metrics: Standard CI logs.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target             | Description                                   |
| ----- | ----------------------------- | --------------------------------------------- |
| Read  | Source Code Files             | For linting and testing.                      |
| Write | N/A                           | No persistent data written by CI (only temp). |
| Audit | GitHub Actions Run Log        | Records execution details and status.         |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DEV as "Developer"
participant GIT as "Git Repository"
participant GHA as "GitHub Actions"
participant BACKEND as "Backend App"
participant FRONTEND as "Frontend App"

DEV->>GIT: git push (code changes)
activate GIT
GIT->>GHA: Trigger CI workflow
activate GHA
GHA->>GHA: Checkout code
GHA->>BACKEND: Run 'pnpm --filter backend lint'
activate BACKEND
BACKEND-->>GHA: Lint results (success/fail)
deactivate BACKEND
GHA->>BACKEND: Run 'pnpm --filter backend test'
activate BACKEND
BACKEND-->>GHA: Test results (success/fail)
deactivate BACKEND
GHA->>FRONTEND: Run 'pnpm --filter frontend lint'
activate FRONTEND
FRONTEND-->>GHA: Lint results (success/fail)
deactivate FRONTEND
GHA->>FRONTEND: Run 'pnpm --filter frontend test'
activate FRONTEND
FRONTEND-->>GHA: Test results (success/fail)
deactivate FRONTEND
GHA-->>GIT: Update commit status
deactivate GHA
GIT-->>DEV: Notify CI status
deactivate GIT
```

### 🔹 **Error and Exception Mapping**

| Scenario      | Error Code  | HTTP Status | User Prompt                       |
| ------------- | ----------- | ----------- | --------------------------------- |
| Lint Failure  | LINT_ERRORS | N/A         | Code style or quality issues      |
| Test Failure  | TEST_FAILED | N/A         | Functional regression detected    |
| Workflow Error | CI_CONFIG_ERR | N/A         | Invalid CI YAML configuration     |

### 🔹 **Security and Observability Hooks**

*   Transport Security: GitHub Actions communication uses TLS.
*   Authentication: GitHub's built-in token-based authentication for CI.
*   Log Event Naming and Field Standards: Standardized output from lint/test commands.
*   Metric Naming: `ci_job_status_total`, `ci_job_duration_seconds`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a configured `.github/workflows/ci.yml` in the monorepo
*   ✅ When a change is pushed to a branch
*   ✅ Then GitHub Actions should trigger, run linting for both frontend and backend, run tests for both frontend and backend, and report the status.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                   |
| ------------------ | ------------ | --------------------------------------------- |
| Single Responsibility | ✅           | Orchestrates linting and testing across the monorepo. |
| Independence       | ✅           | Operates on the checked-out codebase.         |
| Testability        | ✅           | Testable by committing code with/without errors. |
| Small Subset Testing | ✅           | Can be tested by running specific `pnpm --filter` commands locally. |

### 🔹 **Code Location**

```
.github/workflows/ci.yml
apps/backend/package.json
apps/frontend/package.json
```

---

## **Task-ID**: TASK-SYS-INFRA-CONFIG-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-CONFIG-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Implement Backend Configuration (env-vars)

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-02

**DECISION-REF**: —

### 🔹 **Coverage**:

*   Configuration Management: Loading environment variables from `.env` files.
*   Backend Integration: Using NestJS `ConfigModule` and `ConfigService`.
*   Security: Separation of sensitive configurations from code.
*   Database Changes: Not Applicable (config for DB connection will be handled here).
*   UI/Components: Not Applicable.
*   Interaction Logic: Not Applicable.
*   Business Boundary Condition: Not Applicable.
*   Observability: Configuration values can be logged (carefully masking sensitive ones).
*   Performance Considerations: Configuration loading should be fast, occurring once at app startup.
*   Non-Functional: Provides a standardized, secure way to manage runtime configurations.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: `.env` file containing key-value pairs (e.g., `DATABASE_URL="postgresql://user:pass@host:port/db"`).
    *   Output: `ConfigService` instance providing access to parsed configuration values.
*   **Decision point application**: No specific decisions from `DECISION-REF` apply here.
*   **Main Function/Class Design**:
    *   `ConfigModule.forRoot()`: Registers the configuration module, loads `.env`.
    *   `ConfigService`: Injected into other services/controllers to access config values.
*   **Code Location**:
    *   `myfitness2-repo/apps/backend/src/app.module.ts` (for `ConfigModule` import)
    *   `myfitness2-repo/apps/backend/src/main.ts` (optional, for validation or logging)
    *   `myfitness2-repo/apps/backend/.env.example` (template for env vars)
    *   `myfitness2-repo/apps/backend/.env` (actual env vars, excluded from git)
*   **Call Chain**: NestJS Application -> ConfigModule -> `dotenv` -> File System (`.env`).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: `ConfigModule` is initialized once at application bootstrap.
    *   **Security**: `.env` file must be excluded from version control (`.gitignore`). Sensitive values should be validated.
    *   **Logging**: Initial configuration loading can be logged (e.g., "Configuration loaded successfully"). Sensitive values must be redacted or masked in logs.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (if applicable)**

1.  Request Handling: N/A directly, but the config is available to all handlers.
2.  Business Logic: N/A directly, but business logic uses config values (e.g., database connection string).
3.  Data Access: `ConfigService` will provide `DATABASE_URL` to Prisma.
4.  Error and Exception Handling: `ConfigModule` can be configured for strict validation, throwing errors if required environment variables are missing.
5.  Logging and Metrics: Log when config is loaded, warn if critical variables are missing.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target     | Description                                      |
| ----- | --------------------- | ------------------------------------------------ |
| Read  | `apps/backend/.env`   | Loads environment variables at startup.          |
| Read  | `process.env`         | Reads system environment variables.              |
| Write | `ConfigService` state | Stores parsed configuration values in memory.    |
| Audit | Log Event             | Records config loading status and potentially warns on missing critical vars. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant NESTJS_APP as "main.ts"
participant APP_MODULE as "app.module.ts"
participant CONFIG_MODULE as "ConfigModule"
participant CONFIG_SERVICE as "ConfigService"
participant FS as "File System (.env)"
participant ENV as "process.env"

NESTJS_APP->>APP_MODULE: Imports root module
activate APP_MODULE
APP_MODULE->>CONFIG_MODULE: .forRoot() call
activate CONFIG_MODULE
CONFIG_MODULE->>FS: Read .env file
alt .env file exists
FS-->>CONFIG_MODULE: Return env vars
else .env file missing
CONFIG_MODULE->>CONFIG_MODULE: No .env loaded
end
CONFIG_MODULE->>ENV: Read system env vars
ENV-->>CONFIG_MODULE: Return system env vars
CONFIG_MODULE->>CONFIG_SERVICE: Initialize with parsed values
CONFIG_SERVICE-->>CONFIG_MODULE: ConfigService instance
deactivate CONFIG_MODULE
APP_MODULE-->>NESTJS_APP: Application bootstrap
deactivate APP_MODULE
NESTJS_APP->>CONFIG_SERVICE: Get config values
activate CONFIG_SERVICE
CONFIG_SERVICE-->>NESTJS_APP: Return config value
deactivate CONFIG_SERVICE
```

### 🔹 **Error and Exception Mapping**

| Scenario                   | Error Code          | HTTP Status | User Prompt                                    |
| -------------------------- | ------------------- | ----------- | ---------------------------------------------- |
| Missing Required Env Var   | ENV_VAR_MISSING     | 500         | Required environment variable is not defined   |
| Invalid Env Var Format     | ENV_VAR_INVALID_FMT | 500         | Environment variable has invalid format        |

### 🔹 **Security and Observability Hooks**

*   Transport Security: N/A directly, but configures secure connections (e.g., `DATABASE_URL` for TLS).
*   Authentication: N/A directly, but configures JWT secrets (`JWT_SECRET`).
*   Log Event Naming and Field Standards: `config_load_success`, `config_load_failure`, `config_missing_critical_variable`. Logs should mask sensitive values.
*   Metric Naming: N/A directly for config loading, but config values often enable other metrics.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an `apps/backend/.env` file with `APP_PORT=3001`
*   ✅ When the NestJS application starts
*   ✅ Then `ConfigService.get('APP_PORT')` should return `3001`.
*   ✅ Given an `apps/backend/.env` file that is missing a critical environment variable (e.g., `DATABASE_URL` if marked as required)
*   ✅ When the NestJS application starts
*   ✅ Then the application should fail to bootstrap with an informative error message.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                   |
| ------------------ | ------------ | --------------------------------------------- |
| Single Responsibility | ✅           | Handles backend configuration loading.        |
| Independence       | ✅           | Relies on NestJS `ConfigModule` and `.env` files. |
| Testability        | ✅           | Testable by mocking `process.env` or providing `.env` files. |
| Small Subset Testing | ✅           | Can be tested by verifying `ConfigService` output. |

### 🔹 **Code Location**

```
apps/backend/src/app.module.ts
apps/backend/.env.example
```

<!-- impl-batch:TASK-SYS-INFRA-CONFIG-01-02::SYS-INFRA-CONFIG-01::[N/A]::TASK-SYS-INFRA-DB-01-01::SYS-INFRA-DB-01::[N/A]::TASK-SYS-INFRA-DB-01-02::SYS-INFRA-DB-01::[N/A]::TASK-SYS-INFRA-DB-01-03::SYS-INFRA-DB-01::[N/A]::TASK-SYS-INFRA-LOG-01-01::SYS-INFRA-LOG-01::[N/A] -->

## **TASK-ID**: TASK-SYS-INFRA-CONFIG-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-CONFIG-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Implement Frontend Environment Variable Handling

**Task Type**: Frontend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-03

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A
- Exceptions: N/A
- API/Protocol: N/A (configuration loading)
- Database Changes: Not Covered
- UI/Components: `next.config.js` for public variable exposure, `src/lib/config.ts` for structured access.
- Interaction Logic: Frontend application loads variables at build/runtime.
- Business Boundary Condition: N/A
- Observability: Logs for missing essential variables during build/startup.
- Performance Considerations: Environment variables are loaded once at build time or on server start.
- Non-Functional: Environment-specific configuration for API endpoints.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: `.env.local` file with key-value pairs (e.g., `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1`).
    *   Output: JavaScript object `process.env` accessible in Next.js code.
*   **Decision point application**: N/A
*   **Main Function/Class Design** (including responsibilities)
    *   `apps/frontend/next.config.js`: Responsible for ensuring `NEXT_PUBLIC_` prefixed variables are exposed to the browser.
    *   `apps/frontend/src/lib/config.ts`: A utility file responsible for consolidating and providing typed access to all necessary environment variables, performing basic validation (e.g., `process.env.NEXT_PUBLIC_API_BASE_URL || 'DEFAULT_URL'`).
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/frontend/.env.local`
    *   `apps/frontend/.env.development`
    *   `apps/frontend/.env.production`
    *   `apps/frontend/next.config.js`
    *   `apps/frontend/src/lib/config.ts`
*   **Call Chain** (prefix → current task → downstream)
    *   `Node.js Process` → `Next.js Build/Dev Server` → `next.config.js` (exposes `NEXT_PUBLIC_` variables) → `src/lib/config.ts` (consumes variables) → `Frontend Services/Components` (uses configuration).
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Variables are read once. No performance overhead.
    *   **Security**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client-side bundle. Sensitive keys (e.g., API secrets) must not use this prefix.
    *   **Logging**: `src/lib/config.ts` can log warnings if crucial environment variables are missing (e.g., `console.warn('API_BASE_URL is not set, using default.')`).

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: N/A, this is a foundational configuration task.
2.  **Triggering Logic**: Next.js automatically loads `.env` files based on the environment (`.env.local`, `.env.development`, `.env.production`).
3.  **[Decision hook]**: N/A
4.  **Interaction with the Backend**: N/A, this task focuses on frontend configuration loading.
5.  **UI Success/Failure Feedback**: N/A

**Back-End Process (N/A for this task)**

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :-------------------------------------------- |
| Read | `File System (.env)` | Read environment variables from `.env` files. |
| Write | `process.env`       | Populate `process.env` object in Node.js runtime. |
| Audit | `console.warn`      | Log warnings if required env variables are missing. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DEV as "Developer"
participant NEXTJS_CLI as "Next.js CLI"
participant FS_ENV as "File System (.env)"
participant NEXTJS_SRV as "Next.js Server"
participant CONFIG_LIB as "config.ts"
participant APP_COMP as "App Component"

DEV->>NEXTJS_CLI: run dev/build command
activate NEXTJS_CLI
NEXTJS_CLI->>FS_ENV: read .env files
activate FS_ENV
FS_ENV-->>NEXTJS_CLI: environment variables
deactivate FS_ENV
NEXTJS_CLI->>NEXTJS_SRV: start server, pass env
activate NEXTJS_SRV
NEXTJS_SRV->>CONFIG_LIB: import configuration
activate CONFIG_LIB
CONFIG_LIB->>NEXTJS_SRV: provide typed config
deactivate CONFIG_LIB
NEXTJS_SRV->>APP_COMP: render page, provide config
APP_COMP->>CONFIG_LIB: use config values
deactivate NEXTJS_SRV
deactivate NEXTJS_CLI
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code           | HTTP Status | User Prompt                                   |
| :------- | :------------------- | :---------- | :-------------------------------------------- |
| Missing Env | MISSING_ENV_VARIABLE | N/A         | Console warning: "Required variable is missing" |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for this task.
*   **Authentication**: N/A for this task.
*   **Log Event Naming and Field Standards**: `frontend_config_load_warning` if a crucial variable is missing.
*   **Metric Naming**: N/A for this task.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a `.env.local` file with `NEXT_PUBLIC_TEST_VAR=hello`
*   ✅ When the Next.js development server is started
*   ✅ Then `process.env.NEXT_PUBLIC_TEST_VAR` should be accessible as 'hello' in frontend code.
*   ✅ Given a `next.config.js` and `src/lib/config.ts` is created
*   ✅ When a frontend component tries to access `config.apiBaseUrl`
*   ✅ Then it should receive the value from `NEXT_PUBLIC_API_BASE_URL` defined in `.env.local`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                        |
| :----------------- | :----------- | :------------------------------------------------- |
| Single Responsibility | ✅            | Focused on environment variable loading and access. |
| Independence       | ✅            | Independent of business logic.                     |
| Testability        | ✅            | Config module can be unit tested for default values. |
| Small Subset Testing | ✅            | Can be tested by simply accessing env vars.        |

### 🔹 **Code Location**

```
apps/frontend/next.config.js
apps/frontend/.env.local
apps/frontend/src/lib/config.ts
```

---

## **TASK-ID**: TASK-SYS-INFRA-DB-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-DB-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Define Prisma Schema Models

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-CONFIG-01-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (Schema definition, not runtime validation)
- Exceptions: N/A
- API/Protocol: N/A
- Database Changes: Defines the schema for `User`, `Units`, `Exercise`, `ExerciseType`, `WorkoutSession`, `LoggedExercise`, `StrengthSet`, `CardioEntry`.
- UI/Components: N/A
- Interaction Logic: N/A
- Business Boundary Condition: Enforces email uniqueness, cascade deletes for workout sessions, restrict delete for exercises used in logs.
- Observability: N/A
- Performance Considerations: Sets up indices (`@@unique`, `@@index`) for optimal query performance.
- Non-Functional: Ensures data integrity and relationships.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: High-level database design requirements (as provided in the prompt's Database Design section).
    *   Output: `schema.prisma` file, which Prisma uses to generate client and migrations.
*   **Decision point application**: N/A
*   **Main Function/Class Design** (including responsibilities)
    *   `apps/backend/prisma/schema.prisma`: Defines the data models, their fields, relationships, and constraints.
    *   `generator client`: Configures Prisma Client generation for TypeScript.
    *   `datasource db`: Configures the PostgreSQL database connection using the `DATABASE_URL` environment variable.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/backend/prisma/schema.prisma`
*   **Call Chain** (prefix → current task → downstream)
    *   `Developer` → `schema.prisma` (defines models) → `Prisma CLI` (reads schema for migration/client generation) → `Prisma Client` (generated ORM).
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `@@unique([name, createdById])` on `Exercise` and `@@index([userId, startTime])` on `WorkoutSession` improve query performance.
    *   **Security**: `passwordHash` field is defined, enforcing storage of hashed passwords. `onDelete: Cascade` ensures related data is cleaned up securely.
    *   **Logging**: N/A for schema definition itself.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A.
2.  **[Decision hook]**: N/A.
3.  **Business Logic**: This task *defines* the structure that business logic will operate on.
    *   `User`: `id`, `email` (unique), `passwordHash`, `displayName`, `preferredUnits` (enum), timestamps.
    *   `Units` enum: `METRIC`, `IMPERIAL`.
    *   `Exercise`: `id`, `name`, `type` (enum), `createdBy` relation, `createdById` (nullable for system exercises), timestamps. Unique constraint `@@unique([name, createdById])`.
    *   `ExerciseType` enum: `STRENGTH`, `CARDIO`.
    *   `WorkoutSession`: `id`, `user` relation, `userId`, `startTime`, `endTime` (nullable), timestamps. Index `@@index([userId, startTime])`. `onDelete: Cascade` for user deletion.
    *   `LoggedExercise`: `id`, `session` relation, `sessionId`, `exercise` relation, `exerciseId`, `notes`, `strengthSets` relation, `cardioEntry` relation. `onDelete: Cascade` for session deletion. `onDelete: Restrict` for exercise deletion to prevent orphaned logs.
    *   `StrengthSet`: `id`, `loggedExercise` relation, `loggedExerciseId`, `setNumber`, `reps`, `weight`. `onDelete: Cascade` for logged exercise deletion.
    *   `CardioEntry`: `id`, `loggedExercise` relation, `loggedExerciseId` (unique), `durationSeconds`, `distanceMeters`. `onDelete: Cascade` for logged exercise deletion.
4.  **Data Access**: The Prisma schema itself is the core definition for data access.
5.  **Error and Exception Handling**: Schema constraints (e.g., `unique` fields) will lead to database errors if violated, which Prisma then translates into exceptions.
6.  **Logging and Metrics**: N/A.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description                                        |
| :--- | :---------------- | :------------------------------------------------- |
| Read | N/A               | Schema is defined, not reading data.               |
| Write | `schema.prisma`   | Updated with new model definitions and relations. |
| Audit | N/A               |                                                    |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DEV as "Developer"
participant SCHEMA as "schema.prisma"
participant DB_DESIGN as "DB Design Doc"

DEV->>DB_DESIGN: consult for models
DB_DESIGN-->>DEV: provide entity requirements
DEV->>SCHEMA: define User model
DEV->>SCHEMA: define Exercise model
DEV->>SCHEMA: define WorkoutSession model
DEV->>SCHEMA: define LoggedExercise model
DEV->>SCHEMA: define StrengthSet model
DEV->>SCHEMA: define CardioEntry model
SCHEMA-->>DEV: schema completed
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                               |
| :----------------------- | :---------------- | :---------- | :---------------------------------------- |
| Duplicate Unique Field   | P2002 (Prisma)    | 409         | (Backend Only) Unique constraint violation |
| Foreign Key Constraint | P2003 (Prisma)    | 400         | (Backend Only) Foreign key violation       |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A
*   **Authentication**: Schema defines `passwordHash` for secure storage.
*   **Log Event Naming and Field Standards**: N/A
*   **Metric Naming**: N/A

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `schema.prisma` file is defined
*   ✅ When `npx prisma validate` is run
*   ✅ Then the schema should be valid and report no errors.
*   ✅ Given `User` and `WorkoutSession` models are defined
*   ✅ When a user is deleted
*   ✅ Then all associated `WorkoutSession` records should be cascaded deleted (due to `onDelete: Cascade`).
*   ✅ Given `Exercise` and `LoggedExercise` models are defined
*   ✅ When an `Exercise` that is part of a `LoggedExercise` is attempted to be deleted
*   ✅ Then the deletion should be restricted (due to `onDelete: Restrict`).

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                        |
| :----------------- | :----------- | :------------------------------------------------- |
| Single Responsibility | ✅            | Solely defines the database schema.                |
| Independence       | ✅            | Independent of implementation logic, serves as foundation. |
| Testability        | ✅            | Validated by `prisma validate`.                    |
| Small Subset Testing | ✅            | Basic schema can be defined and validated quickly. |

### 🔹 **Code Location**

```
apps/backend/prisma/schema.prisma
```

---

## **TASK-ID**: TASK-SYS-INFRA-DB-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-DB-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Generate Initial DB Migration with Prisma

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-DB-01-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A
- Exceptions: Migration conflicts, database connection errors.
- API/Protocol: N/A
- Database Changes: Creates tables and applies constraints defined in `schema.prisma`.
- UI/Components: N/A
- Interaction Logic: N/A
- Business Boundary Condition: Ensures the database structure matches the defined schema for all subsequent tasks.
- Observability: Logs migration events (start, success, failure) to console/stdout.
- Performance Considerations: Initial migration typically runs once.
- Non-Functional: Establishes the database foundation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: `schema.prisma` file (from `TASK-SYS-INFRA-DB-01-01`).
    *   Output: SQL migration script(s) in `prisma/migrations` and an updated database schema.
*   **Decision point application**: N/A
*   **Main Function/Class Design** (including responsibilities)
    *   Prisma CLI command `npx prisma migrate dev --name init`: Responsible for comparing the `schema.prisma` with the current database state (or creating a new migration if the database is empty), generating the SQL, and applying it. The `--name init` provides a descriptive name for the first migration.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/backend/prisma/migrations/{timestamp}_init/migration.sql` (generated file)
    *   `apps/backend/prisma/migrations/migration_lock.toml` (generated file for migration history)
*   **Call Chain** (prefix → current task → downstream)
    *   `Developer` → `Prisma CLI` (`npx prisma migrate dev`) → `Prisma Migration Engine` → `PostgreSQL Database`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: The initial migration creates all tables and indexes. Subsequent migrations will be incremental.
    *   **Security**: Ensure the `DATABASE_URL` used by Prisma has appropriate permissions (e.g., table creation).
    *   **Logging**: Prisma CLI outputs detailed logs about the migration process to the console.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A.
2.  **[Decision hook]**: N/A.
3.  **Business Logic**: N/A, this is an infrastructure task.
4.  **Data Access**: Prisma's migration engine connects to the PostgreSQL database using the `DATABASE_URL` environment variable.
    *   It reads the `schema.prisma`.
    *   It inspects the current state of the connected database.
    *   It calculates the differences.
    *   It generates a new SQL migration file in `prisma/migrations`.
    *   It applies the SQL migration to the database, creating tables and setting up relationships/constraints.
5.  **Error and Exception Handling**:
    *   Database connection failures: Prisma CLI will report an error.
    *   Syntax errors in `schema.prisma`: `prisma migrate dev` will fail validation.
    *   Migration conflicts: If schema changes conflict with existing data or other migrations, Prisma will guide resolution.
6.  **Logging and Metrics**: Prisma CLI provides verbose output on migration status, including SQL statements executed and any errors.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target       | Description                                        |
| :---- | :---------------------- | :------------------------------------------------- |
| Read  | `schema.prisma`         | Prisma reads the schema definition.                |
| Read  | `PostgreSQL Database`   | Prisma inspects current database state.            |
| Write | `File System (migrations)` | Prisma writes generated SQL migration files.      |
| Write | `PostgreSQL Database`   | Prisma applies SQL to create/alter tables and other DB objects. |
| Audit | `Console/Stdout`        | Prisma CLI logs migration steps and outcomes.      |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DEV as "Developer"
participant PRISMA_CLI as "Prisma CLI"
participant SCHEMA as "schema.prisma"
participant PRISMA_ENGINE as "Prisma Engine"
participant DB as "PostgreSQL DB"

DEV->>PRISMA_CLI: npx prisma migrate dev
activate PRISMA_CLI
PRISMA_CLI->>SCHEMA: read schema definition
SCHEMA-->>PRISMA_CLI: schema content
PRISMA_CLI->>PRISMA_ENGINE: generate & apply migration
activate PRISMA_ENGINE
PRISMA_ENGINE->>DB: inspect DB state
DB-->>PRISMA_ENGINE: current schema info
PRISMA_ENGINE->>DB: execute migration SQL
activate DB
DB-->>PRISMA_ENGINE: SQL execution result
deactivate DB
PRISMA_ENGINE-->>PRISMA_CLI: migration success
deactivate PRISMA_ENGINE
PRISMA_CLI-->>DEV: migration applied, files created
deactivate PRISMA_CLI
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                             |
| :----------------------- | :---------------- | :---------- | :-------------------------------------- |
| DB Connection Failure    | P1001             | N/A         | "Can't reach database server"           |
| Schema Validation Error  | P1012             | N/A         | "Schema validation error"               |
| Migration History Issue  | P3006             | N/A         | "Migration history is out of sync"      |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Database connection should use TLS/SSL, configured via `DATABASE_URL`.
*   **Authentication**: Prisma connects using credentials in `DATABASE_URL`.
*   **Log Event Naming and Field Standards**: Migration output is standard Prisma CLI logs.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `schema.prisma` is defined (TASK-SYS-INFRA-DB-01-01 completed)
*   ✅ When `npx prisma migrate dev --name init` is executed
*   ✅ Then a new migration file `prisma/migrations/{timestamp}_init/migration.sql` should be created.
*   ✅ And the migration should be successfully applied to the connected PostgreSQL database.
*   ✅ And the database should contain all tables and relationships defined in `schema.prisma`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                        |
| :----------------- | :----------- | :------------------------------------------------- |
| Single Responsibility | ✅            | Manages database schema evolution.                 |
| Independence       | ✅            | Operates on the schema, independent of application runtime. |
| Testability        | ✅            | Directly testable via Prisma CLI commands.         |
| Small Subset Testing | ✅            | Can be run against an empty database.              |

### 🔹 **Code Location**

```
apps/backend/prisma/migrations/{timestamp}_init/migration.sql
```

---

## **TASK-ID**: TASK-SYS-INFRA-DB-01-03

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-DB-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Create Seed Script for Predefined Exercises

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-DB-01-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (data is hardcoded)
- Exceptions: Database connection errors, unique constraint violations during seeding.
- API/Protocol: N/A
- Database Changes: Inserts initial data into the `Exercise` table.
- UI/Components: N/A
- Interaction Logic: N/A
- Business Boundary Condition: Populates the essential `Exercise` library for workout session creation (SYS-CORE-EXERCISE-01).
- Observability: Logs seed script execution and any errors.
- Performance Considerations: Runs once during setup/development.
- Non-Functional: Provides baseline data for development and testing.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: Hardcoded array of predefined exercises (`{ name: 'Bench Press', type: ExerciseType.STRENGTH }`).
    *   Output: Rows inserted into the `Exercise` table in the PostgreSQL database.
*   **Decision point application**: N/A
*   **Main Function/Class Design** (including responsibilities)
    *   `apps/backend/prisma/seed.ts`: A TypeScript script responsible for initializing Prisma Client, defining seed data, and executing `prisma.exercise.createMany()` with `skipDuplicates: true`.
    *   `PrismaClient`: Provides the ORM interface to interact with the database.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/backend/prisma/seed.ts`
*   **Call Chain** (prefix → current task → downstream)
    *   `Developer` → `Prisma CLI` (`npx prisma db seed`) → `seed.ts script` → `Prisma Client` → `PostgreSQL Database`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `createMany` is efficient for bulk inserts. `skipDuplicates` prevents errors on re-running.
    *   **Security**: Ensure the `DATABASE_URL` used by Prisma has `INSERT` permissions.
    *   **Logging**: The script includes `console.error` for exception handling. Prisma CLI also logs seed execution status.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A.
2.  **[Decision hook]**: N/A.
3.  **Business Logic**:
    *   The `seed.ts` script is executed via `npx prisma db seed`.
    *   It initializes `PrismaClient`.
    *   It defines an array of static `Exercise` data (name, type).
    *   It calls `prisma.exercise.createMany()` with this data.
    *   `skipDuplicates: true` is crucial to allow the seed script to be run multiple times without failing on unique constraint violations (e.g., if 'Bench Press' already exists).
4.  **Data Access**: The `PrismaClient` directly interacts with the `Exercise` table.
5.  **Error and Exception Handling**:
    *   `try-catch` block is used to catch any errors during database operations, logging them to the console.
    *   `finally` block ensures `prisma.$disconnect()` is called.
6.  **Logging and Metrics**: `console.error` for errors; `console.log` for successful seed (can be added).

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target     | Description                                        |
| :---- | :-------------------- | :------------------------------------------------- |
| Read  | N/A                   | Data is hardcoded in the script.                   |
| Write | `PostgreSQL Database` | Inserts initial records into the `Exercise` table. |
| Audit | `Console/Stdout`      | Logs success/failure of the seed script.           |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DEV as "Developer"
participant PRISMA_CLI as "Prisma CLI"
participant SEED_SCRIPT as "seed.ts"
participant PRISMA_CLIENT as "Prisma Client"
participant DB as "PostgreSQL DB"

DEV->>PRISMA_CLI: npx prisma db seed
activate PRISMA_CLI
PRISMA_CLI->>SEED_SCRIPT: execute seed script
activate SEED_SCRIPT
SEED_SCRIPT->>PRISMA_CLIENT: instantiate PrismaClient
activate PRISMA_CLIENT
PRISMA_CLIENT-->>SEED_SCRIPT: client instance
SEED_SCRIPT->>PRISMA_CLIENT: createMany Exercises
PRISMA_CLIENT->>DB: INSERT INTO Exercise (...)
activate DB
DB-->>PRISMA_CLIENT: insert success/fail
deactivate DB
PRISMA_CLIENT-->>SEED_SCRIPT: operation result
deactivate PRISMA_CLIENT
SEED_SCRIPT-->>PRISMA_CLI: script finished
deactivate SEED_SCRIPT
PRISMA_CLI-->>DEV: seed successful
deactivate PRISMA_CLI
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                               |
| :----------------------- | :---------------- | :---------- | :---------------------------------------- |
| DB Connection Failure    | P1001             | N/A         | "Can't reach database server"             |
| Duplicate Entry (if `skipDuplicates` false) | P2002 (Prisma)    | N/A         | "Unique constraint violation"             |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Database connection should use TLS/SSL, configured via `DATABASE_URL`.
*   **Authentication**: Prisma connects using credentials in `DATABASE_URL`.
*   **Log Event Naming and Field Standards**: `db_seed_success`, `db_seed_failure`.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `schema.prisma` is migrated and `seed.ts` is created
*   ✅ When `npx prisma db seed` is executed
*   ✅ Then the `Exercise` table in the database should contain the predefined exercises ('Bench Press', 'Squat', 'Running', etc.).
*   ✅ And running the command a second time should not result in errors, and no duplicate entries should be created.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                        |
| :----------------- | :----------- | :------------------------------------------------- |
| Single Responsibility | ✅            | Populates initial seed data.                       |
| Independence       | ✅            | Executed separately from the main application.     |
| Testability        | ✅            | Directly testable via CLI, checks DB content.      |
| Small Subset Testing | ✅            | Focuses only on exercise data insertion.           |

### 🔹 **Code Location**

```
apps/backend/prisma/seed.ts
```

---

## **TASK-ID**: TASK-SYS-INFRA-LOG-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-LOG-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Integrate Structured Logger (Pino) in NestJS

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-02

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A
- Exceptions: N/A
- API/Protocol: N/A (Internal logging)
- Database Changes: Not Covered
- UI/Components: N/A
- Interaction Logic: All NestJS modules will use the injected `LoggerService` for structured logging.
- Business Boundary Condition: Ensures all backend operations are auditable and debuggable via structured logs.
- Observability: Logs will be structured (JSON format), including timestamps, log levels, context (e.g., controller/service name), and custom fields.
- Performance Considerations: Logging library should be performant with minimal overhead. Pino is known for this.
- Non-Functional: Centralized, configurable, structured logging.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: Log message (string), optional context (string), optional metadata object (e.g., `{ userId: 'cuid123', sessionId: 'wkout456' }`).
    *   Output: JSON string to `stdout`/`stderr` (e.g., `{"level":30,"time":1678886400000,"pid":1,"hostname":"host","context":"AuthService","msg":"User registered successfully","userId":"cuid123"}`).
*   **Decision point application**: N/A
*   **Main Function/Class Design** (including responsibilities)
    *   `apps/backend/src/common/logging/logger.module.ts`: NestJS module that provides the custom `LoggerService`.
    *   `apps/backend/src/common/logging/logger.service.ts`: Implements NestJS's `LoggerService` interface, using `pino` internally. Responsible for formatting logs, adding context, and handling different log levels.
    *   `apps/backend/src/main.ts`: Configures the global `LoggerService` for the NestJS application.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/backend/src/common/logging/logger.module.ts`
    *   `apps/backend/src/common/logging/logger.service.ts`
    *   `apps/backend/src/main.ts` (for global configuration)
    *   `apps/backend/src/{module}/{service}.ts` (for usage: `this.logger.log('message', { userId: id })`)
*   **Call Chain** (prefix → current task → downstream)
    *   `Application Component/Service` → `LoggerService.log()` → `Pino Instance` → `Stdout/Stderr`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Pino is very fast. Configuration can include `level` to disable lower-priority logs in production.
    *   **Security**: Ensure sensitive data is never logged directly (e.g., raw passwords, API keys). Sanitize inputs if necessary before logging.
    *   **Logging**: Structured JSON logs are easy for log aggregators (ELK, Datadog) to parse. Includes context and standard fields.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A.
2.  **[Decision hook]**: N/A.
3.  **Business Logic**:
    *   **`logger.service.ts`**:
        *   Injects a `PinoLogger` instance.
        *   Implements `NestJS LoggerService` methods (`log`, `error`, `warn`, `debug`, `verbose`).
        *   Each method calls the corresponding `pino` method, passing the message and any additional data.
        *   Ensures a `context` field is added (e.g., class name).
    *   **`logger.module.ts`**:
        *   Exports the custom `LoggerService`.
        *   Can provide configuration options for Pino (e.g., transport for development pretty-printing vs. production JSON).
    *   **`main.ts`**:
        *   Configures NestJS to use the custom `LoggerService` globally: `app.useLogger(app.get(LoggerService))`. This allows injecting `Logger` into any module.
4.  **Data Access**: N/A.
5.  **Error and Exception Handling**: Error logs (`logger.error`) will capture exceptions with stack traces.
6.  **Logging and Metrics**:
    *   All application modules will `inject` the `LoggerService` and use its methods.
    *   Logs will automatically include `timestamp`, `level`, `context`, and `message`.
    *   Additional structured data can be passed as an object: `this.logger.log('Operation completed', { userId: req.user.id, duration: 123 })`.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                        |
| :---- | :---------------- | :------------------------------------------------- |
| Read  | N/A               | Logging consumes data, doesn't read from external sources. |
| Write | `Stdout/Stderr`   | Writes structured JSON logs to standard output/error. |
| Audit | `Log Aggregator`  | Logs are sent to a centralized system for storage and analysis. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant APP_INIT as "main.ts"
participant NESTJS_APP as "NestJS App"
participant LOGGER_MOD as "LoggerModule"
participant CUSTOM_LOGGER as "LoggerService"
participant PINO as "Pino Library"
participant STDOUT as "Stdout/Stderr"

APP_INIT->>NESTJS_APP: bootstrap application
activate NESTJS_APP
NESTJS_APP->>LOGGER_MOD: import LoggerModule
activate LOGGER_MOD
LOGGER_MOD->>CUSTOM_LOGGER: provide LoggerService
activate CUSTOM_LOGGER
CUSTOM_LOGGER->>PINO: initialize Pino instance
activate PINO
PINO-->>CUSTOM_LOGGER: Pino instance ready
deactivate PINO
CUSTOM_LOGGER-->>LOGGER_MOD: LoggerService instance
deactivate CUSTOM_LOGGER
LOGGER_MOD-->>NESTJS_APP: LoggerService available
deactivate LOGGER_MOD
NESTJS_APP->>APP_INIT: app initialized
deactivate NESTJS_APP

APP_INIT->>NESTJS_APP: use custom logger globally
activate NESTJS_APP
NESTJS_APP->>CUSTOM_LOGGER: set as global logger
deactivate NESTJS_APP

participant SVC as "AuthService"
SVC->>CUSTOM_LOGGER: log message info
activate CUSTOM_LOGGER
CUSTOM_LOGGER->>PINO: emit structured log
activate PINO
PINO->>STDOUT: write JSON log
activate STDOUT
STDOUT-->>PINO: write complete
deactivate STDOUT
PINO-->>CUSTOM_LOGGER: log emitted
deactivate PINO
CUSTOM_LOGGER-->>SVC: log processed
deactivate CUSTOM_LOGGER
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                             |
| :----------------------- | :---------------- | :---------- | :-------------------------------------- |
| Internal Logging Failure | LOGGING_ERROR     | 500         | (Internal) "Failed to write log" (should ideally not happen, or be handled silently) |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for logging within the application process.
*   **Authentication**: N/A.
*   **Log Event Naming and Field Standards**: `service_method_action_outcome` (e.g., `auth_service_register_success`). Key fields: `userId`, `sessionId`, `traceId`.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `LoggerService` is implemented using Pino
*   ✅ When a service method calls `this.logger.log('Test message', { data: 'value' })`
*   ✅ Then a structured JSON log should appear in `stdout` with `level:30` (info), the message, and the `data` field.
*   ✅ Given the global `LoggerService` is configured in `main.ts`
*   ✅ When `Logger` is injected into any NestJS module or service
*   ✅ Then it should use the custom Pino-backed `LoggerService`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                        |
| :----------------- | :----------- | :------------------------------------------------- |
| Single Responsibility | ✅            | Provides structured logging capabilities.          |
| Independence       | ✅            | Independent of business logic, can be swapped out. |
| Testability        | ✅            | Can be mocked or tested by capturing stdout.       |
| Small Subset Testing | ✅            | Basic log emissions can be tested easily.          |

### 🔹 **Code Location**

```
apps/backend/src/common/logging/logger.module.ts
apps/backend/src/common/logging/logger.service.ts
apps/backend/src/main.ts
```

<!-- impl-batch:TASK-SYS-INFRA-LOG-01-02::SYS-INFRA-LOG-01::[N/A]::TASK-SYS-INFRA-ERROR-01-01::SYS-INFRA-ERROR-01::[N/A]::TASK-SYS-INFRA-ERROR-01-02::SYS-INFRA-ERROR-01::[N/A]::TASK-SYS-INFRA-SEC-01-01::SYS-INFRA-SEC-01::[N/A]::TASK-SYS-INFRA-SEC-02-01::SYS-INFRA-SEC-02::[N/A] -->

## **Task-ID**: TASK-SYS-INFRA-LOG-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-LOG-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Implement Logging Middleware for Requests

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-LOG-01-01 (Assumed `LoggerService` exists)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Not applicable, middleware observes requests
- Exceptions: Logs errors but does not handle them directly; errors are passed to the next handler
- API/Protocol: Applies to all incoming HTTP requests for backend services
- Database Changes: Not Covered
- UI/Components: Not applicable
- Interaction Logic: Intercepts requests before controllers and logs response after completion
- Business Boundary Condition: Not applicable
- Observability: Crucial for request/response logging, performance monitoring, and debugging
- Performance Considerations: Logging must be asynchronous and non-blocking, minimal overhead
- Non-Functional: Logs are structured (JSON) for easy parsing by monitoring systems; logs in English

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: `Request` object (e.g., `req.method`, `req.url`, `req.headers`), `Response` object (`res.statusCode`).
    *   Output: Structured log entry (JSON format) containing `timestamp`, `correlationId`, `method`, `url`, `statusCode`, `responseTimeMs`, `userId` (if authenticated).
    *   Example Log:
        ```json
        {
          "timestamp": "2023-10-27T10:00:00.000Z",
          "level": "info",
          "message": "HTTP Request handled",
          "correlationId": "abc-123",
          "method": "GET",
          "url": "/api/v1/profile",
          "statusCode": 200,
          "responseTimeMs": 55,
          "userId": "user-cuid-123"
        }
        ```
*   **Main Function/Class Design**: `LoggingMiddleware` class implementing `NestMiddleware`. It will inject a `LoggerService` (from `TASK-SYS-INFRA-LOG-01-01`) to perform logging.
*   **Code Location**: `apps/backend/src/common/logging/logging.middleware.ts`
*   **Call Chain**: `Client` → `NestJS App` (via `main.ts` `app.use(json())` etc.) → `LoggingMiddleware.use()` → `Controller` → `LoggingMiddleware` (on response finish) → `Client`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Use `res.on('finish')` to log after response is sent, minimizing impact on request processing time. Benchmark `LoggerService` performance.
    *   **Security**: Ensure sensitive data (e.g., passwords in request body) are not logged. Log `userId` only if authentication is successful and available in the request context.
    *   **Logging**: Generate a unique `correlationId` for each request to link related log entries across different services/layers.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Middleware)**:
    *   Create `LoggingMiddleware` class implementing `NestMiddleware`.
    *   Inject `LoggerService` (assuming `TASK-SYS-INFRA-LOG-01-01` has provided this).
    *   In the `use` method:
        *   Record `startTime` for response time calculation.
        *   Generate a `correlationId` and attach it to the request context (e.g., `req.id`).
        *   Log initial request details (method, URL, `correlationId`).
        *   Call `next()` to pass control to the next middleware/handler.
        *   Attach a `finish` event listener to the `res` object:
            *   When `res.on('finish')` fires, calculate `responseTimeMs`.
            *   Retrieve `userId` from `req.user` if authenticated.
            *   Log response details (status code, `responseTimeMs`, `correlationId`, `userId`).
2.  **Business Logic**: Not applicable; this middleware is cross-cutting.
3.  **Data Access**: Not applicable.
4.  **Error and Exception Handling**: If an error occurs downstream, the global exception filter (from `TASK-SYS-INFRA-ERROR-01-01`) will handle it. This middleware will log the final status code (including error codes) and response time.
5.  **Logging and Metrics**:
    *   Utilize the `LoggerService` for structured logging.
    *   Log level `info` for successful requests, potentially `warn` or `error` if a specific status code (e.g., 4xx, 5xx) is detected (though the exception filter typically handles error logging for 5xx).
    *   Consider metrics for `http_requests_total` (with labels for method, path, status) and `http_request_duration_seconds`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| -- | --------- | --------- |
| Read | `Request` object | HTTP method, URL, headers, user ID (from JWT payload) |
| Read | `Response` object | HTTP status code |
| Write | Log Stream | Structured JSON log event containing request/response details |
| Audit | Log Event | Record of every HTTP request, its processing time, and outcome |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Client Browser"
participant APP as "NestJS App (main.ts)"
participant MIDDLEWARE as "LoggingMiddleware"
participant CONTROLLER as "API Controller"
participant LOGGER as "LoggerService"
CLIENT->>APP: HTTP Request
activate APP
APP->>MIDDLEWARE: Request Intercept
activate MIDDLEWARE
MIDDLEWARE->>LOGGER: Log Request Start
LOGGER-->>MIDDLEWARE: Logged
MIDDLEWARE->>CONTROLLER: Forward Request
activate CONTROLLER
CONTROLLER-->>MIDDLEWARE: Response/Exception
deactivate CONTROLLER
MIDDLEWARE->>MIDDLEWARE: Calculate duration
MIDDLEWARE->>LOGGER: Log Request End/Status
LOGGER-->>MIDDLEWARE: Logged
MIDDLEWARE-->>APP: Response Continue
deactivate MIDDLEWARE
APP-->>CLIENT: HTTP Response
deactivate APP
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| ----- | -------------- | ------- | ------ |
| N/A | N/A | N/A | N/A |
| *Note: This middleware observes and logs, it does not handle or map errors directly. The status code logged will reflect the final outcome of the request, including error status codes generated by downstream layers or the global exception filter.* |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Assumes HTTPS is configured upstream; middleware logs HTTP details regardless of transport.
*   **Authentication**: Extracts `req.user.id` (if available from JWT payload after authentication) for logging. This helps in auditing user activities.
*   **Log Event Naming and Field Standards**: Events `http_request_incoming`, `http_request_outgoing`. Fields: `correlationId`, `method`, `url`, `statusCode`, `responseTimeMs`, `userId`, `userAgent`.
*   **Metric Naming**: `http_requests_total{method,path,status}`, `http_request_duration_seconds{method,path,status}`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated or unauthenticated HTTP request is made to any backend API endpoint.
*   ✅ When the request begins processing.
*   ✅ Then `LoggingMiddleware` records a log entry containing the request method, URL, and a unique correlation ID, and forwards the request.
*   ✅ When the request processing is complete and a response is sent (successfully or with an error).
*   ✅ Then `LoggingMiddleware` records a second log entry containing the HTTP status code, the calculated response time, the correlation ID, and the user ID (if authenticated).

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| ----- | ----- | -- |
| Single Responsibility | ✅ | Logs incoming HTTP requests and their responses. |
| Independence | ✅ | Can be applied globally to any NestJS application without affecting core logic. |
| Testability | ✅ | Can be unit tested by mocking `LoggerService` and `Request/Response` objects. |
| Small Subset Testing | ✅ | Easily testable by sending HTTP requests and verifying log output. |

### 🔹 **Code Location**

```
apps/backend/src/common/logging/logging.middleware.ts
apps/backend/src/app.module.ts (for applying the middleware globally or per-module)
apps/backend/src/common/logging/logger.service.ts (assumed existing)
```

---

## **Task-ID**: TASK-SYS-INFRA-ERROR-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-ERROR-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Create Global Exception Filter in NestJS

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-LOG-01-01 (Assumed `LoggerService` exists)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Not applicable (catches exceptions, does not validate input)
- Exceptions: Catches all unhandled exceptions (both `HttpException` and generic `Error`) across the application.
- API/Protocol: Applies to all API endpoints.
- Database Changes: Not Covered.
- UI/Components: Not applicable, but defines the structure of error messages consumed by the frontend.
- Interaction Logic: Intercepts exception propagation to normalize error responses.
- Business Boundary Condition: Not applicable.
- Observability: Logs detailed internal error information (e.g., stack traces) for debugging.
- Performance Considerations: Minimal overhead, should be efficient to process exceptions.
- Non-Functional: Standardized API response format for errors, consistent logging of failures.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: `unknown` type exception (`HttpException`, `Error`, etc.), `ArgumentsHost`.
    *   Output: HTTP response with a standardized JSON error body (defined in `TASK-SYS-INFRA-ERROR-01-02`). Internal log entry with full details.
    *   Example Output (to client):
        ```json
        {
          "statusCode": 400,
          "message": "Validation failed: email must be an email",
          "errorCode": "INVALID_INPUT"
        }
        ```
*   **Main Function/Class Design**: `AllExceptionsFilter` class implementing `ExceptionFilter<unknown>`. It will use the `LoggerService` for internal logging and the `StandardErrorResponseDto` for consistent client responses.
*   **Code Location**: `apps/backend/src/common/exceptions/all-exceptions.filter.ts`
*   **Call Chain**: `Client` → `Controller/Service/Repository` (throws exception) → `AllExceptionsFilter.catch()` → `LoggerService` (log internal details) → `Response` (send standardized error DTO) → `Client`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Should handle exceptions quickly without adding significant latency.
    *   **Security**: For `500 Internal Server Error`, never expose sensitive internal details (stack traces, raw database errors) to the client in production environments. Only provide a generic message. Full details are logged internally.
    *   **Logging**: Log exceptions with `error` level, including stack traces for `500 Internal Server Errors`. For `HttpException` (e.g., 400s, 404s), log at `warn` or `info` level as they are often expected client errors.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Global Filter)**:
    *   Create `AllExceptionsFilter` implementing `ExceptionFilter<unknown>`.
    *   Inject `LoggerService` (from `TASK-SYS-INFRA-LOG-01-01`).
    *   The `catch(exception: unknown, host: ArgumentsHost)` method will:
        *   Determine the HTTP context (`HttpArgumentsHost`) to access `Request` and `Response` objects.
        *   Identify the type of exception:
            *   If `exception` is an instance of `HttpException`, extract its `getStatus()` and `getResponse()` (which might be a string or object for validation errors).
            *   Otherwise, assume it's a generic `Error` and set status to `HttpStatus.INTERNAL_SERVER_ERROR`.
        *   Construct the response body using the `StandardErrorResponseDto` (from `TASK-SYS-INFRA-ERROR-01-02`).
            *   For `HttpException`, use its message/response.
            *   For `InternalServerError`, use a generic message like "Internal server error".
        *   Send the standardized JSON response to the client.
        *   Log the exception internally:
            *   For `HttpException` (e.g., `BadRequestException` from validation pipes), log at `warn` or `info` level, including the correlation ID.
            *   For generic `Error` (internal server errors), log at `error` level, including the full stack trace and correlation ID.
2.  **Business Logic**: Not applicable; purely error handling.
3.  **Data Access**: Not applicable.
4.  **Error and Exception Handling**: This is the core logic for this task. It centralizes and normalizes how all errors are presented to clients and logged internally.
5.  **Logging and Metrics**: Increment error-specific metrics (e.g., `http_errors_total`, `internal_server_errors_total`). Use `LoggerService` for detailed internal error logging.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| -- | --------- | --------- |
| Read | `Exception` object | Error details, status, message |
| Read | `Request` context | Correlation ID (if present from middleware) |
| Write | HTTP Response | Standardized JSON error payload |
| Write | Log Stream | Internal log event with exception details (including stack trace) |
| Audit | Log Event | Record of all exceptions, their severity, and context |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Client Browser"
participant APP as "NestJS App"
participant CONTROLLER as "API Controller"
participant SERVICE as "Domain Service"
participant EXCEPTION_FILTER as "AllExceptionsFilter"
participant LOGGER as "LoggerService"
CLIENT->>APP: HTTP Request
activate APP
APP->>CONTROLLER: Forward Request
activate CONTROLLER
CONTROLLER->>SERVICE: Call Business Logic
activate SERVICE
SERVICE->>SERVICE: Process data (throws error)
deactivate SERVICE
CONTROLLER--xAPP: Unhandled Exception
deactivate CONTROLLER
APP->>EXCEPTION_FILTER: Exception Caught
activate EXCEPTION_FILTER
EXCEPTION_FILTER->>EXCEPTION_FILTER: Normalize Error
EXCEPTION_FILTER->>LOGGER: Log Exception Details
LOGGER-->>EXCEPTION_FILTER: Logged
EXCEPTION_FILTER-->>APP: Standardized Error Response
deactivate EXCEPTION_FILTER
APP-->>CLIENT: Send Error Response
deactivate APP
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| ----- | -------------- | ------- | ------ |
| Invalid Input (e.g., validation) | INVALID_INPUT | 400 | "Invalid input provided." or specific validation message |
| Unauthorized Access | UNAUTHORIZED | 401 | "Authentication required." or "Invalid credentials." |
| Forbidden Resource | FORBIDDEN | 403 | "You are not authorized to perform this action." |
| Resource Not Found | NOT_FOUND | 404 | "The requested resource was not found." |
| Conflicting Resource | CONFLICT | 409 | "A resource with this identifier already exists." |
| Internal Server Error | INTERNAL_ERROR | 500 | "An unexpected server error occurred." |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A.
*   **Authentication**: If an `UnauthorizedException` is thrown, it's handled here. This filter does not perform authentication itself.
*   **Log Event Naming and Field Standards**: `exception_caught`, `http_error_response`. Fields: `correlationId`, `errorType`, `errorMessage`, `stackTrace` (for 500s only), `statusCode`, `userId`.
*   **Metric Naming**: `http_errors_total{status_code, error_code}`, `internal_server_errors_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an API request triggers a `BadRequestException` (e.g., from `ValidationPipe`).
*   ✅ When the exception is thrown.
*   ✅ Then `AllExceptionsFilter` catches it, logs a warning internally, and returns a 400 HTTP response with a standardized `INVALID_INPUT` error code and specific validation messages to the client.
*   ✅ Given an API request triggers an unexpected `Error` (e.g., a bug in service logic).
*   ✅ When the error is thrown.
*   ✅ Then `AllExceptionsFilter` catches it, logs the full stack trace at `error` level internally, and returns a 500 HTTP response with a generic `INTERNAL_ERROR` message to the client.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| ----- | ----- | -- |
| Single Responsibility | ✅ | Provides a centralized mechanism for catching and handling all application exceptions. |
| Independence | ✅ | Can be plugged into any NestJS application without internal dependencies on business logic. |
| Testability | ✅ | The mapping logic from `Exception` to `StandardErrorResponseDto` can be unit tested. |
| Small Subset Testing | ✅ | Easily testable by intentionally throwing different exception types. |

### 🔹 **Code Location**

```
apps/backend/src/common/exceptions/all-exceptions.filter.ts
apps/backend/src/main.ts (for applying the global filter)
apps/backend/src/common/logging/logger.service.ts (assumed existing)
apps/backend/src/common/exceptions/dtos/standard-error.dto.ts (dependency)
```

---

## **Task-ID**: TASK-SYS-INFRA-ERROR-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-ERROR-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Define Standardized API Error Response DTO

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-ERROR-01-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Not applicable (defines output structure)
- Exceptions: Defines the consistent format for all error responses returned by the API.
- API/Protocol: All API endpoints that may return an error will conform to this DTO.
- Database Changes: Not Covered.
- UI/Components: Frontend will consume and interpret error messages based on this standardized structure.
- Interaction Logic: Not applicable.
- Business Boundary Condition: Not applicable.
- Observability: A consistent error format simplifies parsing and alerting in monitoring systems.
- Performance Considerations: Minimal, just a data structure.
- Non-Functional: Enhances developer experience for frontend integration, supports future internationalization of `message`.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input: Not applicable (this task defines the output structure itself).
    *   Output: TypeScript class/interface representing the error response.
    *   Example DTO:
        ```typescript
        // standard-error.dto.ts
        export class StandardErrorResponseDto {
          statusCode: number;
          message: string | string[]; // Can be a string or an array of strings for validation errors
          errorCode: string; // Custom application-specific error code
          timestamp: string;
          path: string;
          details?: Record<string, any>; // Optional additional details, e.g., field validation errors
        }
        ```
*   **Main Function/Class Design**: `StandardErrorResponseDto` class or interface. This DTO will be used by the `AllExceptionsFilter` (from `TASK-SYS-INFRA-ERROR-01-01`) to construct error payloads.
*   **Code Location**: `apps/backend/src/common/exceptions/dtos/standard-error.dto.ts`
*   **Call Chain**: `AllExceptionsFilter` → `StandardErrorResponseDto` (instantiate/populate) → `Response` (send).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Negligible impact.
    *   **Security**: The `details` field must be carefully controlled to avoid leaking sensitive information. Only include non-sensitive data like specific validation failures.
    *   **Internationalization**: The `message` field should ideally be a key that can be resolved to a translated string on the frontend, or the backend can translate it based on `Accept-Language` headers. For MVP, direct English strings are acceptable.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **DTO Definition**:
    *   Create `standard-error.dto.ts` in `apps/backend/src/common/exceptions/dtos`.
    *   Define the `StandardErrorResponseDto` class/interface with fields `statusCode` (number), `message` (string or string array), `errorCode` (string), `timestamp` (string, ISO format), `path` (string), and an optional `details` (object).
2.  **Usage by Exception Filter**:
    *   The `AllExceptionsFilter` will import and use this DTO.
    *   When an exception is caught, the filter will populate an instance of `StandardErrorResponseDto` based on the exception type and details.
    *   This populated DTO will then be sent as the JSON response body.
3.  **Data Access**: Not applicable.
4.  **Error and Exception Handling**: This DTO forms the consistent output for all error handling.
5.  **Logging and Metrics**: Not applicable directly; the logging middleware and exception filter will log the error details, which will now have a consistent `errorCode` for easier filtering.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| -- | --------- | --------- |
| Write | HTTP Response Payload | The structured error object sent back to the client. |
| Audit | Log Event | The `errorCode` and `message` from this DTO can be included in internal error logs. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant EXCEPTION_FILTER as "AllExceptionsFilter"
participant ERROR_DTO as "StandardErrorResponseDto"
participant CLIENT as "Client Browser"
EXCEPTION_FILTER->>ERROR_DTO: Instantiate DTO
activate ERROR_DTO
ERROR_DTO->>ERROR_DTO: Set statusCode, message, errorCode etc.
ERROR_DTO-->>EXCEPTION_FILTER: Return populated DTO
deactivate ERROR_DTO
EXCEPTION_FILTER-->>CLIENT: Send JSON response (using DTO)
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| ----- | -------------- | ------- | ------ |
| (Any error scenario) | (Defined in `errorCode` field) | (Defined in `statusCode` field) | (Defined in `message` field) |
| *Note: This task defines the structure, not the specific mappings. The `AllExceptionsFilter` is responsible for populating these fields correctly based on the caught exception.* |

### 🔹 **Security and Observability Hooks**

*   **Log Event Naming and Field Standards**: The `errorCode` field is crucial for consistent log analysis and error identification.
*   **Metric Naming**: The `statusCode` and `errorCode` fields enable granular error metrics.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `StandardErrorResponseDto` is defined with `statusCode`, `message`, `errorCode`, `timestamp`, `path` and optional `details` fields.
*   ✅ When `AllExceptionsFilter` is used to handle any exception.
*   ✅ Then the HTTP response body strictly adheres to the structure of `StandardErrorResponseDto`.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| ----- | ----- | -- |
| Single Responsibility | ✅ | Defines the structure for API error responses. |
| Independence | ✅ | A plain data transfer object, no external logic. |
| Testability | ✅ | Can be tested for correct type definitions and field presence. |
| Small Subset Testing | ✅ | Easily verifiable. |

### 🔹 **Code Location**

```
apps/backend/src/common/exceptions/dtos/standard-error.dto.ts
```

---

## **Task-ID**: TASK-SYS-INFRA-SEC-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SEC-01

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Configure Deployment Environment for HTTPS

**Task Type**: INFRA

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-04 (Deployment Environment Setup)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Not applicable.
- Exceptions: Not applicable, this is an infrastructure configuration.
- API/Protocol: All client-server communication must occur over HTTPS/TLS 1.2+ (preferably 1.3).
- Database Changes: Not Covered.
- UI/Components: Frontend will communicate via `https://`.
- Interaction Logic: All HTTP requests are automatically redirected to HTTPS.
- Business Boundary Condition: Not applicable.
- Observability: Monitoring for certificate expiration, successful TLS handshakes, and HSTS enforcement.
- Performance Considerations: TLS handshake overhead (optimized with TLS 1.3, HTTP/2).
- Non-Functional: Mandatory NFR for transport security.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**: Not applicable (this is an infrastructure configuration task).
*   **Main Function/Class Design**: Not applicable. This involves configuring cloud services or server software.
*   **Code Location**:
    *   Cloud Provider Console/Terraform/CloudFormation scripts for Load Balancers (AWS ALB, GCP Load Balancer), CDN (CloudFront, Cloudflare).
    *   Kubernetes Ingress Controller configurations (e.g., `Ingress` resources with `cert-manager` and `nginx-ingress-controller`).
    *   `nginx.conf` (if running Nginx as a reverse proxy).
    *   `vercel.json` or Heroku app settings.
*   **Call Chain**: `User Browser` → `CDN/Load Balancer` (HTTPS termination) → `NestJS Backend` (internal HTTP).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Configure TLS 1.3, modern cipher suites, HTTP/2. Use a CDN for global distribution and faster TLS handshakes.
    *   **Security**:
        *   **Certificate Management**: Use auto-renewing certificates from a trusted Certificate Authority (e.g., Let's Encrypt, AWS Certificate Manager).
        *   **HTTP Strict Transport Security (HSTS)**: Implement `Strict-Transport-Security` header to prevent downgrade attacks and ensure browsers only connect via HTTPS.
        *   **Cipher Suites**: Configure strong, modern cipher suites, disable weak ones.
        *   **TLS Versions**: Enforce minimum TLS 1.2, ideally 1.3. Disable older TLS/SSL versions.
    *   **Logging**: Monitor TLS handshake failures, certificate expiration alerts, and access logs for HTTP vs HTTPS requests.

### 🔹 **Implementation Logic Decomposition**

**INFRA Process**

1.  **HTTPS Termination Point Identification**:
    *   For Kubernetes: Use `Ingress` resource with `cert-manager` (for automated certs from Let's Encrypt) and an `Ingress Controller` (e.g., Nginx or Traefik).
    *   For PaaS (Vercel/Heroku): HTTPS is often automatically enabled and managed by the platform. Verify settings.
    *   For AWS/GCP: Utilize a Load Balancer (ALB/GCP HTTP(S) Load Balancing) or CDN (CloudFront) configured for HTTPS.
2.  **Certificate Provisioning**:
    *   **Automated (Recommended)**:
        *   Kubernetes: `cert-manager` requests and renews Let's Encrypt certificates.
        *   AWS: AWS Certificate Manager (ACM) provisions and renews certificates for ALBs, CloudFront.
    *   **Manual**: Purchase and upload certificates to the load balancer/server.
3.  **HTTP to HTTPS Redirection**:
    *   Configure the Load Balancer/Ingress Controller to automatically redirect all incoming HTTP traffic (port 80) to HTTPS (port 443). This ensures all requests are encrypted.
    *   Example Nginx: `return 301 https://$host$request_uri;`
4.  **HSTS Configuration**:
    *   Add the `Strict-Transport-Security` header to all HTTPS responses.
    *   Example: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (31536000 seconds = 1 year).
5.  **Backend Application Configuration**:
    *   Ensure the NestJS backend is configured to trust the upstream proxy/load balancer (e.g., `app.enableCors({ origin: true })` and `app.set('trust proxy', 1)` if needed for IP filtering or rate limiting based on client IP).
    *   The backend typically listens on plain HTTP internally, as TLS is terminated at the load balancer.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| -- | --------- | --------- |
| Read | Network Traffic | Incoming client requests |
| Write | Network Traffic | Encrypted responses (HTTPS), HTTP to HTTPS redirects |
| Cache | Browser Cache | HSTS policy storage in browser |
| Audit | Access Logs | Records of HTTP requests and redirects |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER_BROWSER as "User Browser"
participant HTTP_LB as "HTTP Load Balancer"
participant HTTPS_LB as "HTTPS Load Balancer"
participant BACKEND_API as "NestJS Backend"
USER_BROWSER->>HTTP_LB: HTTP Request (e.g., http://myfitness.com)
activate HTTP_LB
HTTP_LB->>USER_BROWSER: 301 Redirect to HTTPS
deactivate HTTP_LB
USER_BROWSER->>HTTPS_LB: HTTPS Request (e.g., https://myfitness.com)
activate HTTPS_LB
HTTPS_LB->>HTTPS_LB: TLS Handshake/Decrypt
HTTPS_LB->>BACKEND_API: Forward HTTP Request (Internal)
activate BACKEND_API
BACKEND_API-->>HTTPS_LB: HTTP Response (Internal)
deactivate BACKEND_API
HTTPS_LB->>HTTPS_LB: Encrypt Response
HTTPS_LB-->>USER_BROWSER: HTTPS Response
deactivate HTTPS_LB
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| ----- | -------------- | ------- | ------ |
| Attempt to access via HTTP | N/A | 301 Moved Permanently | Browser automatically redirects to HTTPS. |
| Invalid/Expired SSL Certificate | N/A | Browser error | "Your connection is not private" or similar browser warning. |
| TLS Handshake Failure | N/A | Network error | "SSL_PROTOCOL_ERROR" or similar. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: **Active enforcement** of HTTPS, HSTS header. Regular vulnerability scans (e.g., SSL Labs) to ensure robust TLS configuration.
*   **Authentication**: N/A.
*   **Log Event Naming and Field Standards**: `http_to_https_redirect_count`, `tls_handshake_success`, `tls_handshake_failure`, `certificate_expiration_alert`.
*   **Metric Naming**: `https_requests_total`, `http_redirects_total`, `tls_version_usage`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a user attempts to access `myfitness2.com` using `http://`.
*   ✅ When the request is made.
*   ✅ Then the user's browser is automatically redirected to `https://myfitness2.com`.
*   ✅ Given a user accesses `myfitness2.com` using `https://`.
*   ✅ When the page loads.
*   ✅ Then the browser displays a secure connection indicator (e.g., padlock icon), indicating a valid and trusted TLS certificate.
*   ✅ Given the backend application is deployed behind a load balancer.
*   ✅ When requests arrive at the load balancer.
*   ✅ Then the load balancer terminates HTTPS, and forwards plain HTTP requests internally to the backend.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| ----- | ----- | -- |
| Single Responsibility | ✅ | Ensures and enforces secure transport layer for all external communication. |
| Independence | ✅ | Handled at the infrastructure layer, independent of application logic. |
| Testability | ✅ | Can be tested with `curl`, browser inspections, and SSL scanners. |
| Small Subset Testing | ✅ | Easily testable by deploying to a test environment and verifying access. |

### 🔹 **Code Location**

```
k8s/ingress/myfitness2-ingress.yaml (for Kubernetes)
infra/aws/alb.tf (for AWS ALB/Terraform)
nginx/conf.d/default.conf (for Nginx reverse proxy)
```

---

## **Task-ID**: TASK-SYS-INFRA-SEC-02-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SEC-02

**Related UX-ID**: [N/A]

**Related UI-ID**: [N/A]

**Task Name**: Implement Password Hashing Service (bcrypt)

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SETUP-01-02 (Package installation, e.g., `bcryptjs`)

**DECISION-REF**: DECISION-001

### **Coverage**:

- Input Validation: Not applicable (service performs hashing, not primary validation). Assumes input password has passed basic length validation (as per DECISION-001).
- Exceptions: Handles errors during hashing or comparison (e.g., bcrypt library issues).
- API/Protocol: Internal service, no direct API endpoint. Used by `AuthService`.
- Database Changes: Stores the resulting `passwordHash` in the `User` model.
- UI/Components: Not applicable.
- Interaction Logic: Used during user registration (hashing) and login (comparison).
- Business Boundary Condition: Not applicable.
- Observability: Logs errors related to hashing/comparison failures.
- Performance Considerations: `bcrypt` is intentionally CPU-intensive; `saltRounds` must be tuned for acceptable performance (e.g., <200ms per operation).
- Non-Functional: Mandatory NFR for secure password storage.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure**:
    *   Input (Hashing): Plaintext password (`string`).
    *   Output (Hashing): Hashed password (`string`).
    *   Input (Comparison): Plaintext password (`string`), stored hash (`string`).
    *   Output (Comparison): Match status (`boolean`).
    *   Example:
        *   `hashPassword('StrongPass123')` → `'$2b$10$abcdef...xyz'`
        *   `comparePassword('StrongPass123', '$2b$10$abcdef...xyz')` → `true`
*   **Decision point application**: Applying `DECISION-001`, the service will hash any password passed to it, only relying on prior validation (e.g., in DTOs or pipes) for minimum length (8 characters). No additional complexity checks (numbers, symbols, uppercase) will be enforced by this service.
*   **Main Function/Class Design**: `PasswordHashingService` class, decorated with `@Injectable()`. It will encapsulate `bcryptjs` library calls.
*   **Code Location**: `apps/backend/src/common/security/password-hashing.service.ts`
*   **Call Chain**: `AuthService.register()` → `PasswordHashingService.hashPassword()` → `Prisma` (save hash). `AuthService.login()` → `PasswordHashingService.comparePassword()`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Configure `saltRounds` (e.g., 10-12) based on server CPU capacity, aiming for hashing operations to take around 100-200ms. Store `saltRounds` in configuration (e.g., `.env`).
    *   **Security**: Use `bcryptjs` (Node.js compatible bcrypt implementation). The salt is automatically generated and embedded within the hash by `bcrypt`, which is a secure practice. Avoid storing plaintext passwords or displaying hashes.
    *   **Logging**: Log any unexpected errors during hashing or comparison operations as `error` level events. Do *not* log plaintext passwords or generated hashes.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Service Definition**:
    *   Create `PasswordHashingService` in `apps/backend/src/common/security`.
    *   Define two public methods:
        *   `async hashPassword(password: string): Promise<string>`: Takes a plaintext password and returns its bcrypt hash.
        *   `async comparePassword(password: string, hash: string): Promise<boolean>`: Takes a plaintext password and a hash, returns `true` if they match, `false` otherwise.
2.  **Hashing Logic (`hashPassword`)**:
    *   Import `bcrypt` (or `bcryptjs`).
    *   Call `bcrypt.hash(password, this.saltRounds)`.
    *   Implement `try-catch` block to handle potential errors from `bcrypt`, throwing a custom `InternalServerErrorException` if hashing fails.
    *   The `saltRounds` should be configurable, ideally read from environment variables or a configuration service.
3.  **Comparison Logic (`comparePassword`)**:
    *   Call `bcrypt.compare(password, hash)`.
    *   Implement `try-catch` block to handle potential errors, throwing a custom `InternalServerErrorException` if comparison fails.
4.  **Integration**:
    *   Inject `PasswordHashingService` into `AuthService` (and potentially other services needing password operations, though `AuthService` is primary).
    *   During user registration (`AuthService.register`), call `passwordHashingService.hashPassword()` before saving to the database.
    *   During user login (`AuthService.login`), retrieve the stored hash from the database, then call `passwordHashingService.comparePassword()` to verify the provided password.
5.  **Logging and Metrics**:
    *   Log `error` events if `bcrypt` operations fail internally.
    *   Consider metrics for `password_hash_operations_total` and `password_compare_operations_total` to monitor security operations.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| -- | --------- | --------- |
| Read | DTO | Plaintext password from user input (for hashing/comparison) |
| Read | `User` Model | Stored `passwordHash` (for comparison during login) |
| Write | `User` Model | New `passwordHash` (during registration or password change) |
| Audit | Log Event | Record of internal hashing/comparison failures |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant AUTH_SERVICE as "AuthService"
participant PASSWORD_SERVICE as "PasswordHashingService"
participant BCRYPT_LIB as "bcryptjs Library"
participant DB as "PostgreSQL (User Table)"

AUTH_SERVICE->>PASSWORD_SERVICE: hashPassword("plainTextPass")
activate PASSWORD_SERVICE
PASSWORD_SERVICE->>BCRYPT_LIB: hash("plainTextPass", saltRounds)
activate BCRYPT_LIB
BCRYPT_LIB-->>PASSWORD_SERVICE: return "hashedPass"
deactivate BCRYPT_LIB
PASSWORD_SERVICE-->>AUTH_SERVICE: return "hashedPass"
deactivate PASSWORD_SERVICE
AUTH_SERVICE->>DB: Save User with "hashedPass"
DB-->>AUTH_SERVICE: User saved

AUTH_SERVICE->>DB: Get User by email
DB-->>AUTH_SERVICE: return User (contains "hashedPass")
AUTH_SERVICE->>PASSWORD_SERVICE: comparePassword("plainTextAttempt", "hashedPass")
activate PASSWORD_SERVICE
PASSWORD_SERVICE->>BCRYPT_LIB: compare("plainTextAttempt", "hashedPass")
activate BCRYPT_LIB
BCRYPT_LIB-->>PASSWORD_SERVICE: return true/false
deactivate BCRYPT_LIB
PASSWORD_SERVICE-->>AUTH_SERVICE: return true/false (password match)
deactivate PASSWORD_SERVICE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| ----- | -------------- | ------- | ------ |
| Internal error during hashing/comparison | PASSWORD_HASHING_FAILED | 500 | "An internal server error occurred during authentication." |
| Password mismatch (during login) | INVALID_CREDENTIALS | 401 | "Invalid email or password." (Handled by AuthService logic, not this service directly) |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A (this service operates on data already received via secure transport).
*   **Authentication**: Integral component for secure authentication.
*   **Log Event Naming and Field Standards**: `password_hash_success`, `password_hash_failure`, `password_compare_success`, `password_compare_failure`. Do NOT log raw passwords.
*   **Metric Naming**: `password_hashing_duration_seconds`, `password_compare_duration_seconds`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a plaintext password.
*   ✅ When `PasswordHashingService.hashPassword()` is called with the password.
*   ✅ Then a unique bcrypt hash is generated and returned, suitable for storage.
*   ✅ Given a plaintext password and its previously generated bcrypt hash.
*   ✅ When `PasswordHashingService.comparePassword()` is called with these values.
*   ✅ Then it returns `true`.
*   ✅ Given a plaintext password and a non-matching bcrypt hash.
*   ✅ When `PasswordHashingService.comparePassword()` is called with these values.
*   ✅ Then it returns `false`.
*   ✅ Given an invalid input or internal `bcryptjs` error during hashing or comparison.
*   ✅ When a method in `PasswordHashingService` is called.
*   ✅ Then it throws an `InternalServerErrorException` and logs the error details.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| ----- | ----- | -- |
| Single Responsibility | ✅ | Dedicated solely to the cryptographic hashing and comparison of passwords. |
| Independence | ✅ | Pure service that can be reused by any module requiring password security. |
| Testability | ✅ | Easily unit testable by mocking the `bcryptjs` library and asserting outcomes. |
| Small Subset Testing | ✅ | Two core methods, `hashPassword` and `comparePassword`, with clear inputs and outputs. |

### 🔹 **Code Location**

```
apps/backend/src/common/security/password-hashing.service.ts
apps/backend/src/auth/auth.module.ts (provider)
apps/backend/src/auth/auth.service.ts (consumer)
apps/backend/src/common/config/config.service.ts (for saltRounds)
```

<!-- impl-batch:TASK-SYS-INFRA-SEC-02-02::SYS-INFRA-SEC-02::[N/A]::TASK-SYS-INFRA-AUTH-01-01::SYS-INFRA-AUTH-01::[N/A]::TASK-SYS-INFRA-AUTH-01-02::SYS-INFRA-AUTH-01::[N/A]::TASK-SYS-INFRA-AUTH-01-03::SYS-INFRA-AUTH-01::[N/A]::TASK-SYS-INFRA-BACKUP-01-01::SYS-INFRA-BACKUP-01::[N/A] -->

## **Task-ID**: TASK-SYS-INFRA-SEC-02-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-SEC-02

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Integrate Hashing into User Model/Service

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SEC-02-01 (Assumed: Bcrypt library setup), TASK-SYS-INFRA-DB-01-01 (Assumed: User schema with passwordHash)

**DECISION-REF**: DECISION-001 (Password validation enforces only minimum length of 8 characters, no further complexity is required for hashing)

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input (for hashing): `password: string` (e.g., `"mySecureP@ss1"`)
    *   Output (from hashing): `passwordHash: string` (e.g., `"$2b$10$abcdefghijklmnopqrstuvwx.abcdefghijklmnopqrstuvwxyz"`)
    *   Input (for comparison): `password: string`, `passwordHash: string`
    *   Output (from comparison): `match: boolean` (e.g., `true`)
*   **Decision point application**: `DECISION-001` guides the pre-hashing validation. Before calling the hashing function, the system will only check if the password meets the minimum length of 8 characters. No other complexity rules (symbols, numbers, uppercase) will be checked at this stage, thus reducing friction as per the decision.
*   **Main Function/Class Design**:
    *   `AuthService` (in `apps/backend/src/auth/auth.service.ts`): Will contain methods for `hashPassword` and `comparePassword`.
    *   `hashPassword(password: string): Promise<string>`: Responsible for taking a plain password and returning its bcrypt hash.
    *   `comparePassword(password: string, hash: string): Promise<boolean>`: Responsible for comparing a plain password against a stored hash.
*   **Code Location**: `apps/backend/src/auth/auth.service.ts`
*   **Call Chain**: `AuthService.register()` (or similar user creation logic) -> `AuthService.hashPassword()` -> `AuthService.login()` (or similar authentication logic) -> `AuthService.comparePassword()`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Use `bcrypt` with a reasonable `saltRounds` value (e.g., 10-12) to balance security and performance. Hashing is a CPU-intensive operation, but acceptable for authentication flows.
    *   **Security**: `bcrypt` is a robust, well-vetted hashing algorithm. Never store plain text passwords. `saltRounds` should be configurable via environment variables or `ConfigService`.
    *   **Logging**: Log any errors during hashing or comparison (e.g., bcrypt library internal errors) as 'error' level. Avoid logging actual passwords or hashes.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A. This task implements utility functions used by other API endpoints like `/auth/register` and `/auth/login`.
2.  **Business Logic (Service Methods)**:
    *   In `AuthService`, import the `bcrypt` library.
    *   Implement `async hashPassword(password: string)`:
        *   Determine `saltRounds` (e.g., `10` or from `ConfigService`).
        *   Call `bcrypt.hash(password, saltRounds)`.
        *   Return the resulting hash string.
        *   Catch potential errors from `bcrypt.hash` and rethrow as `InternalServerErrorException` after logging.
    *   Implement `async comparePassword(password: string, hash: string)`:
        *   Call `bcrypt.compare(password, hash)`.
        *   Return the boolean result.
        *   Catch potential errors from `bcrypt.compare` and rethrow as `InternalServerErrorException` after logging.
3.  **Data Access**: The `passwordHash` field in the `User` model (as defined in `schema.prisma`) will store the hashed password. No direct database interaction within `hashPassword` or `comparePassword`, but these methods are crucial for `AuthService`'s database operations (e.g., creating a user or fetching a user for login).
4.  **Error and Exception Handling**:
    *   If `bcrypt.hash` or `bcrypt.compare` encounters an unexpected error (e.g., malformed input from library), log the error and throw a `NestJS InternalServerErrorException`.
5.  **Logging and Metrics**:
    *   Log `debug` messages when `hashPassword` or `comparePassword` is invoked.
    *   Log `error` messages for any exceptions originating from the bcrypt library.
    *   Consider metrics for `auth.password_hashing.duration` and `auth.password_comparison.duration`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | N/A               | This task does not directly read from DB, but its output is used by DB write. |
| Write | `User.passwordHash` | The generated hash is written to the `passwordHash` column in the `User` table when a user registers. |
| Audit | Log Event         | `password.hash.success`, `password.hash.failure`, `password.compare.success`, `password.compare.failure`. Do not include sensitive data. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
    participant REGISTER_OR_LOGIN_SVC as "auth.service.ts"
    participant BCRYPT_LIB as "bcrypt library"
    REGISTER_OR_LOGIN_SVC->>BCRYPT_LIB: hash(password, salt) or compare(password, hash)
    activate BCRYPT_LIB
    BCRYPT_LIB-->>REGISTER_OR_LOGIN_SVC: hashedPassword or comparisonResult
    deactivate BCRYPT_LIB
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code           | HTTP Status | User Prompt                               |
| :------- | :------------------- | :---------- | :---------------------------------------- |
| Hashing Lib Fail | `PASSWORD_HASH_FAILED` | 500         | "An unexpected server error occurred."    |
| Comparison Lib Fail | `PASSWORD_COMPARE_FAILED` | 500         | "An unexpected server error occurred."    |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: The plain password is transmitted over HTTPS from the frontend to the backend before being hashed.
*   **Authentication**: Hashing is a foundational component for secure authentication by storing user passwords securely.
*   **Log Event Naming and Field Standards**: Use structured logging with fields like `event: "password.hash.success"`, `userId: "..."`, `durationMs: "..."`. For failures, include `error: "..."`, `stack: "..."`.
*   **Metric Naming**: `auth_password_hash_duration_ms_bucket`, `auth_password_compare_duration_ms_bucket`, `auth_password_hash_failure_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a valid plain-text password (meeting min length 8)
*   ✅ When `AuthService.hashPassword` is called
*   ✅ Then a unique and cryptographically secure bcrypt hash is returned.
*   ✅ Given a plain-text password and its corresponding bcrypt hash
*   ✅ When `AuthService.comparePassword` is called
*   ✅ Then it returns `true`.
*   ✅ Given an incorrect plain-text password and a valid bcrypt hash
*   ✅ When `AuthService.comparePassword` is called
*   ✅ Then it returns `false`.
*   ✅ Given an invalid password format passed to `hashPassword` (e.g., non-string, handled by type system)
*   ✅ When the hashing logic internally fails (e.g., bcrypt internal error)
*   ✅ Then an `InternalServerErrorException` is thrown and logged.

### 🔹 **Atomization Checklist**

| Dimension         | Pass or Fail | Description                                |
| :---------------- | :----------- | :----------------------------------------- |
| Single Responsibility | ✅            | Solely handles password hashing/comparison. |
| Independence      | ✅            | Only depends on `bcrypt` library and `ConfigService`. |
| Testability       | ✅            | Pure functions, easy to mock dependencies. |
| Small Subset Testing | ✅            | Unit tests can verify hash and compare functionalities independently. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.service.ts
```

---

## **Task-ID**: TASK-SYS-INFRA-AUTH-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-AUTH-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Setup NestJS Auth Module with Passport

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-SEC-02-02 (Hashing is needed by AuthService within the Auth module)

**DECISION-REF**: —

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**: N/A. This task is for module setup. The AuthModule provides `AuthService` and `AuthController` as outputs.
*   **Decision point application**: N/A.
*   **Main Function/Class Design**:
    *   `AuthModule` (NestJS module): Orchestrates `AuthController`, `AuthService`, and imports `PassportModule`, `JwtModule`, and `PrismaModule`.
    *   `AuthService`: Will encapsulate business logic for user registration, login, and possibly user retrieval for JWT validation.
    *   `AuthController`: Exposes REST API endpoints for `/auth/register` and `/auth/login`.
*   **Code Location**: `apps/backend/src/auth/auth.module.ts`, `apps/backend/src/auth/auth.service.ts`, `apps/backend/src/auth/auth.controller.ts`.
*   **Call Chain**: `main.ts` -> `AppModule` imports `AuthModule`. `AuthModule` itself imports `PassportModule` and `JwtModule`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Module initialization is a one-time startup cost. Should be negligible.
    *   **Security**: The JWT secret must be securely loaded from environment variables using NestJS `ConfigService`. Never hardcode secrets. Ensure `JwtModule` configuration includes appropriate `signOptions` (e.g., `expiresIn`).
    *   **Logging**: Log `AuthModule` initialization success/failure.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A, this is a module setup task.
2.  **Business Logic (Service Methods)**:
    *   Create `auth.module.ts`:
        *   Import `PassportModule.register({ defaultStrategy: 'jwt' })` to configure the default strategy.
        *   Import `JwtModule.registerAsync()` to dynamically load the JWT secret and expiry from `ConfigService`. This avoids hardcoding and ensures secrets are environment-specific.
            *   `useFactory: async (configService: ConfigService) => ({ secret: configService.get<string>('JWT_SECRET'), signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') } })`
            *   `inject: [ConfigService]`
        *   Declare `AuthController` in `controllers`.
        *   Declare `AuthService` (and potentially `JwtStrategy` in later tasks) in `providers`.
        *   Export `AuthService` and `JwtModule` (if other modules need to use JWT functionalities, e.g., signing tokens for other purposes).
    *   Ensure `AuthService` has a constructor dependency on `PrismaService` and `ConfigService` for database interaction and configuration retrieval, respectively.
3.  **Data Access**: `PrismaService` needs to be imported and provided to `AuthModule` so `AuthService` can interact with the `User` model.
4.  **Error and Exception Handling**: During module startup, if essential configuration (e.g., `JWT_SECRET`) is missing, NestJS will typically throw an initialization error, halting the application. This will be caught by the overall application error handling.
5.  **Logging and Metrics**:
    *   Log `info` message on `AuthModule` successful initialization.
    *   Log `error` if there's a problem with `JwtModule.registerAsync` configuration (e.g., missing environment variables).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `ConfigService`   | Reads `JWT_SECRET` and `JWT_EXPIRES_IN` environment variables during module setup. |
| Audit | Log Event         | `auth.module.init.success`, `auth.module.init.failure`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
    participant MAIN_TS as "main.ts"
    participant APP_MODULE as "app.module.ts"
    participant AUTH_MODULE as "auth.module.ts"
    participant PASSPORT_MODULE as "PassportModule"
    participant JWT_MODULE as "JwtModule"
    participant CONFIG_SERVICE as "ConfigService"
    MAIN_TS->>APP_MODULE: bootstrap NestJS
    activate APP_MODULE
    APP_MODULE->>AUTH_MODULE: import AuthModule
    activate AUTH_MODULE
    AUTH_MODULE->>PASSPORT_MODULE: register PassportModule
    AUTH_MODULE->>JWT_MODULE: register JwtModule.registerAsync()
    activate JWT_MODULE
    JWT_MODULE->>CONFIG_SERVICE: get JWT_SECRET, JWT_EXPIRES_IN
    activate CONFIG_SERVICE
    CONFIG_SERVICE-->>JWT_MODULE: return config values
    deactivate CONFIG_SERVICE
    JWT_MODULE-->>AUTH_MODULE: JwtModule registered
    deactivate JWT_MODULE
    deactivate AUTH_MODULE
    APP_MODULE-->>MAIN_TS: Module initialized
    deactivate APP_MODULE
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code           | HTTP Status | User Prompt                          |
| :----------------------- | :------------------- | :---------- | :----------------------------------- |
| Missing JWT Secret       | `AUTH_CONFIG_MISSING` | 500         | "Server configuration error."        |
| Invalid JWT Expiry       | `AUTH_CONFIG_INVALID` | 500         | "Server configuration error."        |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for module setup itself.
*   **Authentication**: Foundational setup for JWT-based authentication. Ensures JWT secrets are handled securely.
*   **Log Event Naming and Field Standards**: `auth.module.init.success`, `auth.module.init.failure`.
*   **Metric Naming**: N/A for module setup.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the NestJS application starts
*   ✅ When `AuthModule` is imported and initialized in `AppModule`
*   ✅ Then `PassportModule` and `JwtModule` are correctly registered within `AuthModule`.
*   ✅ And `JwtModule` is configured to asynchronously load `JWT_SECRET` and `JWT_EXPIRES_IN` from `ConfigService`.
*   ✅ And `AuthService` and `AuthController` are provided and made available within the `AuthModule` scope.
*   ✅ When `JWT_SECRET` environment variable is missing
*   ✅ Then the application fails to start with a clear error indicating missing configuration.

### 🔹 **Atomization Checklist**

| Dimension         | Pass or Fail | Description                                |
| :---------------- | :----------- | :----------------------------------------- |
| Single Responsibility | ✅            | Configures and encapsulates authentication-related components. |
| Independence      | ✅            | Depends only on core NestJS modules and `ConfigService`. |
| Testability       | ✅            | Can be tested using NestJS module testing utilities. |
| Small Subset Testing | ✅            | Module configuration can be verified in isolation. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.module.ts
apps/backend/src/auth/auth.service.ts
apps/backend/src/auth/auth.controller.ts
```

---

## **Task-ID**: TASK-SYS-INFRA-AUTH-01-02

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-AUTH-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Implement JWT Strategy for Token Validation

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-AUTH-01-01 (Auth module and Passport setup)

**DECISION-REF**: —

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: `payload` (object, e.g., `{ sub: "cuid_userId", email: "user@example.com" }`) from decoded JWT.
    *   Output: `user` (object, e.g., `{ id: "cuid_userId", email: "user@example.com", displayName: "John Doe" }`) representing the authenticated user, attached to `req.user`.
*   **Decision point application**: N/A.
*   **Main Function/Class Design**:
    *   `JwtStrategy` (NestJS Passport strategy): Extends `PassportStrategy(Strategy, 'jwt')`. Implements the `validate` method.
*   **Code Location**: `apps/backend/src/auth/strategies/jwt.strategy.ts`
*   **Call Chain**: `PassportMiddleware` (internally by NestJS) -> `JwtStrategy.validate(payload)`. The strategy is invoked when a route is protected by `AuthGuard('jwt')`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: The `validate` method should be efficient. Database lookups should be optimized (e.g., indexed `id` and `email` fields on `User` table). Consider caching user data if user load is extremely high, but for MVP, direct DB lookup is fine.
    *   **Security**: The strategy must correctly verify the JWT signature (handled by `passport-jwt` library itself based on the secret from `JwtModule`). The `validate` method ensures the user corresponding to the token still exists and is active in the system. It should guard against token replay attacks if a specific mechanism is implemented (out of scope for MVP).
    *   **Logging**: Log successful and failed token validations at an `info` or `debug` level. Log any unexpected errors within the strategy as `error`. Never log sensitive parts of the token or user details.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A. `JwtStrategy` is an internal component of the Passport authentication flow.
2.  **Business Logic (Service Methods)**:
    *   Create `jwt.strategy.ts` in `apps/backend/src/auth/strategies/`.
    *   Define `JwtStrategy` class, extending `PassportStrategy(Strategy, 'jwt')`.
        *   Constructor: Inject `ConfigService` to retrieve `JWT_SECRET`. The `super()` call configures `passport-jwt` to extract the JWT from the `Authorization` header (`Bearer` token) and use the provided secret.
        *   `async validate(payload: { sub: string; email: string })`:
            *   This method is called after the JWT is successfully decoded and verified for signature.
            *   It receives the `payload` from the token.
            *   Inject `AuthService` (or `UsersService`) into the strategy.
            *   Use `AuthService` to find a user by `payload.sub` (userId).
            *   If no user is found, throw a `new UnauthorizedException('User not found.')`.
            *   If a user is found, return the user object. Passport will attach this `user` object to `req.user` in the controller.
3.  **Data Access**: `AuthService` (which uses `PrismaService`) will be called from `JwtStrategy` to query the `User` model by ID.
4.  **Error and Exception Handling**:
    *   If the user specified in the JWT payload (`payload.sub`) does not exist in the database, `UnauthorizedException` is thrown. NestJS's global exception filter (SYS-INFRA-ERROR-01) will catch this and return a 401 response.
    *   Any issues with `ConfigService` (e.g., `JWT_SECRET` missing) would have prevented module startup (TASK-SYS-INFRA-AUTH-01-01).
5.  **Logging and Metrics**:
    *   Log `debug` for payload processing in `validate`.
    *   Log `warn` if a user ID from a valid token cannot be found (potential user deletion or data inconsistency).
    *   Log `error` for any unexpected exceptions within the `validate` method.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `User` model      | Queries the `User` table to verify user existence and retrieve user details based on `payload.sub`. |
| Audit | Log Event         | `jwt.strategy.validate.success`, `jwt.strategy.validate.user_not_found`, `jwt.strategy.validate.failure`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
    participant AUTH_GUARD as "JwtAuthGuard"
    participant JWT_STRATEGY as "jwt.strategy.ts"
    participant AUTH_SERVICE as "auth.service.ts"
    participant PRISMA_SERVICE as "PrismaService"
    AUTH_GUARD->>JWT_STRATEGY: validate(jwtPayload)
    activate JWT_STRATEGY
    JWT_STRATEGY->>AUTH_SERVICE: findUserById(jwtPayload.sub)
    activate AUTH_SERVICE
    AUTH_SERVICE->>PRISMA_SERVICE: user.findUnique({ where: { id: userId } })
    activate PRISMA_SERVICE
    PRISMA_SERVICE-->>AUTH_SERVICE: User data or null
    deactivate PRISMA_SERVICE
    AUTH_SERVICE-->>JWT_STRATEGY: User data or null
    deactivate AUTH_SERVICE
    alt User found
        JWT_STRATEGY-->>AUTH_GUARD: return User object
    else User not found
        JWT_STRATEGY->>JWT_STRATEGY: throw UnauthorizedException
    end
    deactivate JWT_STRATEGY
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                                    |
| :----------------------- | :---------------- | :---------- | :--------------------------------------------- |
| Invalid/Expired Token    | `INVALID_TOKEN`   | 401         | "Authentication token is invalid or expired."  |
| User in Token Not Found  | `USER_NOT_FOUND`  | 401         | "Authentication token is invalid. User not found." |
| Strategy Internal Error  | `INTERNAL_ERROR`  | 500         | "An unexpected server error occurred."         |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: JWT is transmitted over HTTPS.
*   **Authentication**: Core component for validating the authenticity and integrity of the JWT. Ensures only valid, existing users can access protected resources.
*   **Log Event Naming and Field Standards**: Structured logs, e.g., `event: "jwt.validate.success"`, `userId: "..."`, `email: "..."`. For failures, `event: "jwt.validate.failed"`, `reason: "..."`.
*   **Metric Naming**: `auth_jwt_validate_success_total`, `auth_jwt_validate_failure_total`, `auth_jwt_validate_user_not_found_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a valid JWT (signed with correct secret, not expired)
*   ✅ And the user ID in the JWT payload exists in the database
*   ✅ When `JwtStrategy.validate` processes the token
*   ✅ Then it returns the corresponding `User` object.
*   ✅ Given an expired JWT
*   ✅ When `JwtStrategy.validate` processes the token
*   ✅ Then `passport-jwt` (before `validate` method) throws an error, resulting in a 401.
*   ✅ Given a JWT with a valid signature but a non-existent `sub` (user ID) in the payload
*   ✅ When `JwtStrategy.validate` attempts to find the user
*   ✅ Then it throws an `UnauthorizedException`.

### 🔹 **Atomization Checklist**

| Dimension         | Pass or Fail | Description                                |
| :---------------- | :----------- | :----------------------------------------- |
| Single Responsibility | ✅            | Validates the JWT payload and retrieves the associated user. |
| Independence      | ✅            | Depends on `passport-jwt` library, `ConfigService`, and `AuthService` (for user lookup). |
| Testability       | ✅            | Easy to mock dependencies (`ConfigService`, `AuthService`) and test the `validate` method in isolation. |
| Small Subset Testing | ✅            | Unit tests can cover success cases, user-not-found cases, and internal errors. |

### 🔹 **Code Location**

```
apps/backend/src/auth/strategies/jwt.strategy.ts
apps/backend/src/auth/auth.module.ts (provider)
apps/backend/src/auth/auth.service.ts (user lookup dependency)
```

---

## **Task-ID**: TASK-SYS-INFRA-AUTH-01-03

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-AUTH-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Create JWT Auth Guard for Secured Routes

**Task Type**: Backend

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-AUTH-01-02 (JWT Strategy exists)

**DECISION-REF**: —

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**: N/A for the guard itself. It either allows the request to proceed (populating `req.user`) or throws an `UnauthorizedException`.
*   **Decision point application**: N/A.
*   **Main Function/Class Design**:
    *   `JwtAuthGuard` (NestJS Guard): A class that extends `AuthGuard('jwt')`.
*   **Code Location**: `apps/backend/src/auth/guards/jwt-auth.guard.ts`
*   **Call Chain**: `API_CONTROLLER` method (`@UseGuards(JwtAuthGuard)`) -> `JwtAuthGuard` -> (internally) `JwtStrategy`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Guards are lightweight and executed early in the request lifecycle. Performance impact is minimal.
    *   **Security**: The primary purpose is to secure API routes by enforcing JWT authentication. Any route decorated with this guard will require a valid JWT.
    *   **Logging**: The guard itself typically doesn't log much; detailed logging for JWT validation is handled by the `JwtStrategy` (TASK-SYS-INFRA-AUTH-01-02). Global exception filters (SYS-INFRA-ERROR-01) will log `UnauthorizedException` thrown by the guard.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**:
    *   Create `jwt-auth.guard.ts` in `apps/backend/src/auth/guards/`.
    *   Define `JwtAuthGuard` class, extending `AuthGuard('jwt')`. This automatically hooks into the 'jwt' Passport strategy.
    *   (Optional) Override `handleRequest(err, user, info)` method if custom error messages or specific logic for `req.user` population is needed. For the MVP, the default behavior of `AuthGuard` is sufficient:
        *   If `err` or `info` exists (indicating auth failure), `AuthGuard` throws an `UnauthorizedException`.
        *   If `user` is null (no user found by strategy), `AuthGuard` throws an `UnauthorizedException`.
        *   Otherwise, it returns the `user` object.
2.  **Business Logic (Service Methods)**: The guard primarily orchestrates authentication. No complex business logic resides here; it delegates to Passport's strategy.
3.  **Data Access**: N/A.
4.  **Error and Exception Handling**:
    *   If authentication fails (e.g., invalid token, user not found by strategy), `AuthGuard` automatically throws an `UnauthorizedException`.
    *   This exception will be caught by NestJS's global exception filter (SYS-INFRA-ERROR-01), which will standardize the 401 Unauthorized response to the client.
5.  **Logging and Metrics**:
    *   N/A for specific guard-level logging. Errors are caught and logged by the global exception filter.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | N/A               | The guard does not directly read from the database. |
| Write | `req.user`        | If authentication is successful, the `user` object from the `JwtStrategy` is attached to `request.user`. |
| Audit | Log Event         | N/A. Audit logs for authentication success/failure are primarily handled by the `JwtStrategy` and the global error handler. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
    participant CLIENT as "Frontend"
    participant API_CONTROLLER as "API Controller"
    participant JWT_AUTH_GUARD as "JwtAuthGuard"
    participant JWT_STRATEGY as "jwt.strategy.ts"
    CLIENT->>API_CONTROLLER: Protected API Call (with JWT)
    activate API_CONTROLLER
    API_CONTROLLER->>JWT_AUTH_GUARD: @UseGuards(JwtAuthGuard) activated
    activate JWT_AUTH_GUARD
    JWT_AUTH_GUARD->>JWT_STRATEGY: delegate authentication
    activate JWT_STRATEGY
    JWT_STRATEGY-->>JWT_AUTH_GUARD: authentication result (User object or null/error)
    deactivate JWT_STRATEGY
    alt Authentication successful (User object)
        JWT_AUTH_GUARD-->>API_CONTROLLER: grant access, req.user populated
        API_CONTROLLER->>API_CONTROLLER: execute business logic
        API_CONTROLLER-->>CLIENT: API response (200 OK, etc.)
    else Authentication failed (null or error)
        JWT_AUTH_GUARD->>JWT_AUTH_GUARD: throw UnauthorizedException
        JWT_AUTH_GUARD-->>API_CONTROLLER: (exception propagated)
        API_CONTROLLER-->>CLIENT: 401 Unauthorized
    end
    deactivate JWT_AUTH_GUARD
    deactivate API_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                           |
| :----------------------- | :---------------- | :---------- | :------------------------------------ |
| Missing/Invalid JWT      | `UNAUTHORIZED`    | 401         | "Authentication required. Please log in." |
| User Not Found (by strategy) | `UNAUTHORIZED`    | 401         | "Authentication required. Please log in." |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for guard.
*   **Authentication**: The guard enforces that only authenticated users (with valid JWTs) can access specific API endpoints. It is the primary gatekeeper for protected resources.
*   **Log Event Naming and Field Standards**: Errors from the guard (Unauthorized) will be caught and logged by the global exception filter (SYS-INFRA-ERROR-01).
*   **Metric Naming**: `auth_guard_pass_total`, `auth_guard_fail_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an API endpoint decorated with `@UseGuards(JwtAuthGuard)`
*   ✅ When a request is made to this endpoint with a valid JWT in the `Authorization` header
*   ✅ Then the request is allowed to proceed to the controller method.
*   ✅ And `req.user` object in the controller method contains the authenticated user's details.
*   ✅ When a request is made to this endpoint with a missing JWT
*   ✅ Then the request is immediately rejected with a 401 Unauthorized status.
*   ✅ When a request is made to this endpoint with an invalid or expired JWT
*   ✅ Then the request is immediately rejected with a 401 Unauthorized status.

### 🔹 **Atomization Checklist**

| Dimension         | Pass or Fail | Description                                |
| :---------------- | :----------- | :----------------------------------------- |
| Single Responsibility | ✅            | Protects routes based on JWT authentication. |
| Independence      | ✅            | Depends on NestJS Passport `AuthGuard` and the 'jwt' strategy. |
| Testability       | ✅            | Can be tested by mocking requests in controller tests or E2E tests. |
| Small Subset Testing | ✅            | Unit tests for the guard itself are simple, mostly testing `canActivate` logic if overridden. |

### 🔹 **Code Location**

```
apps/backend/src/auth/guards/jwt-auth.guard.ts
```

---

## **Task-ID**: TASK-SYS-INFRA-BACKUP-01-01

**Related Epic**: —

**Related Story**: —

**Source SYS-ID**: SYS-INFRA-BACKUP-01

**Related UX-ID:** [N/A]

**Related UI-ID:** [N/A]

**Task Name**: Configure Automated Database Backup Script/Job

**Task Type**: INFRA

**Priority/Phase**: T0-INFRA

**Dependency**: TASK-SYS-INFRA-DB-01-02 (Assumed: Prisma migrations are set up and applied for a functional database schema)

**DECISION-REF**: —

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: PostgreSQL connection details (host, port, user, password, database name) via environment variables or Kubernetes secrets. Cloud storage (e.g., S3) credentials and bucket name.
    *   Output: Gzipped PostgreSQL dump file (`.sql.gz`) stored in a specified cloud storage bucket.
    *   Example filename: `myfitness2-db-backup-20231027_143000.sql.gz`
*   **Decision point application**: N/A.
*   **Main Function/Class Design**:
    *   Shell script (`backup.sh`): Contains the logic for dumping the database, compressing it, and uploading it to cloud storage.
    *   Kubernetes CronJob: Schedules the execution of the `backup.sh` script at a regular interval (e.g., daily). If not Kubernetes, `cron` on a VM or a PaaS scheduler.
*   **Code Location**: `myfitness2-repo/infra/scripts/backup.sh` and `myfitness2-repo/kubernetes/cronjob-db-backup.yaml` (if using Kubernetes).
*   **Call Chain**: `CronJob` (or scheduler) -> `backup.sh` -> `pg_dump` command -> `gzip` command -> `aws s3 cp` (or equivalent cloud CLI tool).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: The backup should ideally run during off-peak hours to minimize impact on database performance. `pg_dump` can be configured for parallel processing for large databases.
    *   **Security**:
        *   Database credentials (PGUSER, PGPASSWORD) must be stored securely (e.g., Kubernetes Secrets, environment variables injected at runtime, not hardcoded).
        *   Cloud storage credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY or IAM Roles) must also be secure and have minimal necessary permissions (write-only to the backup bucket).
        *   Backup files should be encrypted at rest in cloud storage (e.g., S3 server-side encryption).
        *   Network communication between the backup process and the database should be encrypted (e.g., TLS/SSL for PostgreSQL connection).
        *   Access to the backup storage should be strictly controlled (IAM policies).
    *   **Logging**: The script should output progress and status messages to standard output/error, which will be captured by the CronJob logs and forwarded to the centralized logging system (SYS-INFRA-LOG-01) for monitoring.

### 🔹 **Implementation Logic Decomposition**

**INFRA Process**

1.  **Backup Script (`backup.sh`)**:
    *   **Environment Variables**:
        *   `PGHOST`, `PGPORT`, `PGUSER`, `PGDATABASE`: PostgreSQL connection details.
        *   `PGPASSWORD`: **Crucially, this should be set via secure means, not directly in the script.**
        *   `S3_BUCKET_NAME`: The target S3 bucket.
        *   `S3_REGION`: AWS region for the bucket.
        *   AWS credentials (if not using IAM roles on the K8s node): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
    *   **Dump Database**: Use `pg_dump`.
        ```bash
        FILENAME="myfitness2-db-backup-$(date +%Y%m%d_%H%M%S).sql"
        PGPASSWORD="$PGPASSWORD" pg_dump -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -Fc > "$FILENAME"
        # -Fc is custom format, allows selective restore and typically smaller than plain SQL
        ```
    *   **Compress Dump**: Use `gzip`.
        ```bash
        gzip "$FILENAME"
        COMPRESSED_FILENAME="$FILENAME.gz"
        ```
    *   **Upload to Cloud Storage**: Use AWS CLI (assuming S3).
        ```bash
        aws s3 cp "$COMPRESSED_FILENAME" "s3://$S3_BUCKET_NAME/backups/$COMPRESSED_FILENAME" --region "$S3_REGION"
        ```
    *   **Clean up local files**:
        ```bash
        rm "$COMPRESSED_FILENAME"
        ```
    *   **Retention Policy (via S3 Lifecycle Rules)**: Configure an S3 bucket lifecycle rule to automatically expire (delete) objects in the `backups/` prefix older than 30 days. This is more robust than scripting deletion.
2.  **Scheduling (Kubernetes CronJob Example)**:
    *   Define a `CronJob` in `kubernetes/cronjob-db-backup.yaml`.
    *   `schedule`: Set to `"0 2 * * *"` for daily backup at 2:00 AM UTC.
    *   `image`: Use an image that contains `postgresql-client` (for `pg_dump`) and `aws-cli`.
    *   `envFrom`: Reference a Kubernetes Secret for `PGPASSWORD`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
    *   `command`: Execute the `backup.sh` script.
3.  **Error Handling**: The `backup.sh` script should check the exit status of each command (`pg_dump`, `gzip`, `aws s3 cp`) and exit with a non-zero code on failure. This will cause the CronJob to be marked as failed, triggering alerts.
4.  **Logging and Metrics**:
    *   Script output (stdout/stderr) is captured by Kubernetes/PaaS logs.
    *   Use the centralized logging system (SYS-INFRA-LOG-01) to collect and parse these logs for monitoring backup health.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | PostgreSQL Database | Reads all data from the database tables. |
| Write | S3/Cloud Storage  | Writes the compressed database dump file to the specified S3 bucket. |
| Cache | N/A               | |
| Audit | Log Event         | `db.backup.start`, `db.backup.success`, `db.backup.failure` (with error details), `db.backup.upload_duration_ms`. CronJob execution logs. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
    participant CRON_JOB as "CronJob (daily)"
    participant BACKUP_SCRIPT as "backup.sh"
    participant POSTGRES_DB as "PostgreSQL DB"
    participant S3_STORAGE as "S3 Backup Storage"
    CRON_JOB->>BACKUP_SCRIPT: execute /infra/scripts/backup.sh
    activate BACKUP_SCRIPT
    BACKUP_SCRIPT->>POSTGRES_DB: pg_dump (read all data)
    activate POSTGRES_DB
    POSTGRES_DB-->>BACKUP_SCRIPT: database dump (stream)
    deactivate POSTGRES_DB
    BACKUP_SCRIPT->>BACKUP_SCRIPT: gzip (compress dump)
    BACKUP_SCRIPT->>S3_STORAGE: aws s3 cp (upload .sql.gz)
    activate S3_STORAGE
    S3_STORAGE-->>BACKUP_SCRIPT: upload success/failure
    deactivate S3_STORAGE
    BACKUP_SCRIPT->>BACKUP_SCRIPT: rm (cleanup local file)
    BACKUP_SCRIPT-->>CRON_JOB: script exit status (0 for success)
    deactivate BACKUP_SCRIPT
    CRON_JOB->>S3_STORAGE: S3 Lifecycle Rule (delete old backups)
    activate S3_STORAGE
    S3_STORAGE-->>CRON_JOB: (automatic deletion by S3)
    deactivate S3_STORAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code           | HTTP Status | User Prompt                                    |
| :----------------------- | :------------------- | :---------- | :--------------------------------------------- |
| Database Connection Failed | `DB_CONN_FAILED`     | N/A         | N/A (Internal, triggers ops alert)             |
| `pg_dump` Execution Failed | `DB_DUMP_FAILED`     | N/A         | N/A (Internal, triggers ops alert)             |
| S3 Upload Failed         | `BACKUP_UPLOAD_FAILED` | N/A         | N/A (Internal, triggers ops alert)             |
| Insufficient S3 Permissions | `S3_PERM_ERROR`      | N/A         | N/A (Internal, triggers ops alert)             |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All network communication for `pg_dump` and S3 uploads should use TLS/HTTPS.
*   **Authentication**: Kubernetes Secrets for DB credentials, IAM Roles/Secrets for AWS access. Principle of least privilege applied.
*   **Log Event Naming and Field Standards**: `event: "db.backup.start"`, `event: "db.backup.success"`, `event: "db.backup.failure"`, with fields like `jobName`, `timestamp`, `durationMs`, `errorMessage`.
*   **Metric Naming**: `db_backup_job_runs_total`, `db_backup_job_success_total`, `db_backup_job_failure_total`, `db_backup_duration_seconds_bucket`. Alerts on `db_backup_job_failure_total > 0`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a configured Kubernetes CronJob and a running PostgreSQL database.
*   ✅ When the CronJob runs daily at 2:00 AM UTC.
*   ✅ Then a compressed `myfitness2-db-backup-YYYYMMDD_HHMMSS.sql.gz` file is created and uploaded to the specified S3 bucket.
*   ✅ And the backup file in S3 is encrypted at rest.
*   ✅ And S3 lifecycle rules automatically delete backup files older than 30 days.
*   ✅ When the database is unreachable or `pg_dump` fails
*   ✅ Then the CronJob run is marked as failed, and an alert is triggered through the monitoring system.
*   ✅ When the S3 upload fails due to network issues or permissions
*   ✅ Then the CronJob run is marked as failed, and an alert is triggered.

### 🔹 **Atomization Checklist**

| Dimension         | Pass or Fail | Description                                |
| :---------------- | :----------- | :----------------------------------------- |
| Single Responsibility | ✅            | The script handles the complete backup process (dump, compress, upload). |
| Independence      | ✅            | Operates as an independent scheduled job, decoupled from application logic. |
| Testability       | ✅            | The script can be executed manually and against a test environment to verify functionality. |
| Small Subset Testing | ✅            | Each command within the script (`pg_dump`, `gzip`, `aws s3 cp`) can be tested individually. |

### 🔹 **Code Location**

```
myfitness2-repo/infra/scripts/backup.sh
myfitness2-repo/kubernetes/cronjob-db-backup.yaml
```

<!-- impl-batch:TASK-SYS-CORE-AUTH-01-01::SYS-CORE-AUTH-01::UX-001::TASK-SYS-CORE-AUTH-01-02::SYS-CORE-AUTH-01::UX-001::TASK-SYS-CORE-AUTH-01-03::SYS-CORE-AUTH-01::UX-001::TASK-SYS-CORE-AUTH-01-04::SYS-CORE-AUTH-01::UX-001::TASK-SYS-CORE-AUTH-01-05::SYS-CORE-AUTH-01::UX-001 -->

## **Task-ID**: TASK-SYS-CORE-AUTH-01-01

**Related Epic**: EPIC-001-S1 User Registration

**Related Story**: EPIC-001-S1 User Registration

**Source SYS-ID**: SYS-CORE-AUTH-01

**Related UX-ID:** UX-001

**Related UI-ID:** UI-016 (Implied by Registration Page)

**Task Name**: BE: Implement POST /auth/register Controller

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-AUTH-01 (JWT Authentication Foundation)

**DECISION-REF**: DECISION-001 (Password complexity only checks length)

### **Coverage**:

- Input Validation: Email format, password minLength 8 characters. (Per UX-001 and DECISION-001)
- Exceptions: Invalid input (400), Email already exists (409).
- API/Protocol: `POST /auth/register` endpoint.
- Database Changes: Not directly, controller delegates to service.
- UI/Components: N/A (Backend task).
- Interaction Logic: Receive request, validate DTO, delegate to `AuthService`.
- Business Boundary Condition: Email unique constraint is handled by downstream service.
- Observability: Log incoming registration requests and validation results.
- Performance Considerations: Validation logic should be fast, negligible overhead.
- Non-Functional: Standard API response format.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `RegisterDto` (shared-types)
        ```typescript
        // packages/shared-types/src/auth.types.ts
        export class RegisterDto {
          @IsEmail()
          email: string; // example: "user@example.com"

          @IsString()
          @MinLength(8) // DECISION-001 applied
          password: string; // example: "StrongPass123"
        }
        ```
    *   **Output (Success)**: `HttpStatus.CREATED` (201) with no body or a simple success message.
    *   **Output (Error)**: Standard `Error` object as defined in API Design components.
        ```typescript
        // example 400 response
        {
          "statusCode": 400,
          "message": "Validation failed (email is invalid)",
          "error": "Bad Request"
        }
        // example 409 response (from service)
        {
          "statusCode": 409,
          "message": "User with this email already exists",
          "error": "Conflict"
        }
        ```
*   **Decision point application**: `DECISION-001` is applied by using `@MinLength(8)` for the password in the `RegisterDto`. No further complexity rules are added at this stage.
*   **Main Function/Class Design**
    *   `AuthController`: Handles the `/auth` route.
    *   `register` method: `@Post('register')` decorator. Receives `RegisterDto` via `@Body()`. Injects `AuthService`.
*   **Code Location**: `apps/backend/src/auth/auth.controller.ts`, `packages/shared-types/src/auth.types.ts`
*   **Call Chain**: `Frontend -> AuthController -> AuthService`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Input validation is synchronous and lightweight.
    *   **Security**: Uses NestJS `ValidationPipe` for automatic DTO validation, preventing malformed requests from reaching business logic.
    *   **Logging**: Logs incoming requests and validation success/failure using `LoggerService`.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   A `POST` request to `/auth/register` is received by `AuthController`.
    *   NestJS `ValidationPipe` automatically applies validation rules defined in `RegisterDto` (e.g., `@IsEmail`, `@MinLength(8)` for password, adhering to `DECISION-001`).
    *   If validation fails, a `BadRequestException` (HTTP 400) is thrown automatically by the pipe, with detailed error messages.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**:
    *   If validation passes, the controller injects and calls `AuthService.register(registerDto)`.
    *   The service will handle checking for existing users and password hashing.
3.  **Data Access (Prisma Models and Query Methods)**: N/A for controller directly.
4.  **Error and Exception Handling**:
    *   `ValidationPipe` handles `BadRequestException` for DTO validation.
    *   `AuthService` will throw a `ConflictException` if the email already exists (HTTP 409), which the global exception filter will catch and format.
5.  **Logging and Metrics**:
    *   `LoggerService` will record the incoming request (`AuthService.register`).
    *   Log fields include: `method`, `path`, `statusCode` (on response), `requestId`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Request Body | `RegisterDto` fields (email, password) |
| Write | N/A | Controller doesn't write to DB directly |
| Cache | N/A | Not applicable |
| Audit | Log Event | `auth.register.request.received`, `auth.register.validation.failed` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT_APP as "client.ts"
participant API_CONTROLLERS as "auth.controller.ts"
participant AUTH_SVC as "auth.service.ts"
participant VALIDATION_PIPE as "Validation Pipe"

CLIENT_APP->>API_CONTROLLERS: POST /auth/register (RegisterDto)
activate API_CONTROLLERS
API_CONTROLLERS->>VALIDATION_PIPE: Validate RegisterDto
activate VALIDATION_PIPE
alt Validation Success
VALIDATION_PIPE-->>API_CONTROLLERS: Validation OK
API_CONTROLLERS->>AUTH_SVC: register(RegisterDto)
deactivate VALIDATION_PIPE
else Validation Failure (e.g., bad email, short password)
VALIDATION_PIPE--xAPI_CONTROLLERS: BadRequestException
API_CONTROLLERS--xCLIENT_APP: 400 Bad Request
deactivate VALIDATION_PIPE
end
deactivate API_CONTROLLERS
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code    | HTTP Status | User Prompt                |
| :----------------------- | :------------ | :---------- | :------------------------- |
| Invalid Email Format     | INVALID_EMAIL | 400         | Invalid email format       |
| Password Too Short (<8)  | PASSWORD_SHORT | 400         | Password too short         |
| Missing Required Field   | BAD_REQUEST   | 400         | Email and password required |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All traffic over HTTPS (SYS-INFRA-SEC-01).
*   **Authentication**: N/A for registration endpoint (public).
*   **Log Event Naming**: `AuthRegisterRequestReceived`, `AuthRegisterValidationFailed`.
*   **Field Standards**: Log `email` (sanitized), `ipAddress`, `userAgent`. Do NOT log raw `password`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a valid email and a password of at least 8 characters
*   ✅ When a POST request is sent to `/auth/register`
*   ✅ Then the request should be successfully processed by the controller and delegated to the auth service.
*   ✅ Given an invalid email format
*   ✅ When a POST request is sent to `/auth/register`
*   ✅ Then the API should respond with HTTP 400 Bad Request and an appropriate error message.
*   ✅ Given a password shorter than 8 characters (e.g., "short")
*   ✅ When a POST request is sent to `/auth/register`
*   ✅ Then the API should respond with HTTP 400 Bad Request and an appropriate error message.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                         |
| :----------------- | :----------- | :-------------------------------------------------- |
| Single Responsibility | ✅            | Handles request parsing, DTO validation, delegation. |
| Independence       | ✅            | Operates without direct DB or external calls.       |
| Testability        | ✅            | Can be unit-tested by mocking `AuthService`.        |
| Small Subset Testing | ✅            | Covered by integration tests on the controller level. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.controller.ts
apps/backend/src/auth/dto/register.dto.ts (or packages/shared-types/src/auth.types.ts)
```

---

## **Task-ID**: TASK-SYS-CORE-AUTH-01-02

**Related Epic**: EPIC-001-S1 User Registration

**Related Story**: EPIC-001-S1 User Registration

**Source SYS-ID**: SYS-CORE-AUTH-01

**Related UX-ID:** UX-001

**Related UI-ID:** N/A

**Task Name**: BE: Implement AuthService.register Logic

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-01-01, SYS-INFRA-SEC-02 (Password Hashing Implementation)

**DECISION-REF**: DECISION-001 (Password complexity only checks length)

### **Coverage**:

- Input Validation: Uses `RegisterDto` with minLength 8 for password (from controller).
- Exceptions: Email already exists (409), Database errors (500).
- API/Protocol: Called by `AuthController`.
- Database Changes: Inserts a new `User` record into the `User` table.
- UI/Components: N/A (Backend task).
- Interaction Logic: Checks for existing user, hashes password, creates new user.
- Business Boundary Condition: Enforces unique email.
- Observability: Logs user creation, password hashing events.
- Performance Considerations: Password hashing is CPU-bound but `bcrypt` is efficient.
- Non-Functional: Secure password storage using bcrypt.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `RegisterDto` (email: string, password: string)
        ```typescript
        // packages/shared-types/src/auth.types.ts
        export class RegisterDto {
          email: string; // example: "user@example.com"
          password: string; // example: "StrongPass123"
        }
        ```
    *   **Output (Success)**: `User` object (sanitized, without `passwordHash`)
        ```typescript
        // apps/backend/src/auth/auth.service.ts
        // Return type after successful registration
        interface RegisteredUser {
          id: string;
          email: string;
          createdAt: Date;
        }
        ```
    *   **Output (Error)**: `ConflictException` (if email exists), `InternalServerErrorException` for other DB issues.
*   **Decision point application**: `DECISION-001` influences the service logic indirectly. While the controller handles basic password length validation, the `AuthService` relies on the password being valid before hashing. No further complexity checks are added within the service to maintain consistency with `DECISION-001`.
*   **Main Function/Class Design**
    *   `AuthService`: Contains the core business logic for authentication.
    *   `register` method: Receives `RegisterDto`. Depends on `PrismaService` and `BcryptService` (or direct `bcrypt` calls).
*   **Code Location**: `apps/backend/src/auth/auth.service.ts`, `apps/backend/src/prisma/schema.prisma` (User model), `apps/backend/src/common/encryption/bcrypt.service.ts`
*   **Call Chain**: `AuthController -> AuthService -> PrismaClient -> BcryptService`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `bcrypt.hash` is intentionally slow to deter brute-force attacks. This is acceptable for user registration. Database insert is generally fast.
    *   **Security**: Critical: uses `bcrypt` for password hashing (SYS-INFRA-SEC-02). Ensures `passwordHash` is stored securely and never exposed.
    *   **Logging**: Logs `auth.user.created` event including `userId` and `email` (sanitized). Logs `auth.register.email.exists` event.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Business Logic (Service Methods)**:
    *   `AuthService.register(registerDto: RegisterDto)`:
        *   **Check for Existing User**: Query `prisma.user.findUnique({ where: { email: registerDto.email } })`.
        *   If a user with the given email already exists, throw a `ConflictException` (`ACCOUNT_EXISTS`).
        *   **Password Hashing**: Use `BcryptService.hash(registerDto.password)` (or direct `bcrypt.hash` call) to hash the password. This is sourced from `SYS-INFRA-SEC-02`.
        *   **Create User**: Call `prisma.user.create({ data: { email: registerDto.email, passwordHash: hashedPassword } })`.
        *   Handle potential `PrismaClientKnownRequestError` if a race condition leads to a unique constraint violation (though checked beforehand, defensive coding is good).
        *   Return a subset of the created `User` object, excluding sensitive fields like `passwordHash`.
2.  **Data Access (Prisma Models and Query Methods)**:
    *   `PrismaService` is injected into `AuthService`.
    *   `prisma.user.findUnique`: To check for email existence.
    *   `prisma.user.create`: To persist the new user.
3.  **Error and Exception Handling**:
    *   `ConflictException` (`ACCOUNT_EXISTS`): Thrown if email already exists.
    *   `InternalServerErrorException`: For unexpected database errors during user creation.
4.  **Logging and Metrics**:
    *   `LoggerService` logs:
        *   `UserRegistrationAttempted` (before check for existing user)
        *   `UserEmailExists` (if `findUnique` returns a user)
        *   `UserPasswordHashed` (details like hash length, not hash itself)
        *   `UserCreatedSuccessfully` (with user ID and email)

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                 |
| :---- | :---------------- | :------------------------------------------ |
| Read  | `User` table      | Check if `email` already exists (`findUnique`). |
| Write | `User` table      | Insert new `User` record (`create`).        |
| Cache | N/A               | Not applicable.                             |
| Audit | Log Event         | `auth.user.created`, `auth.email.conflict`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant API_CONTROLLERS as "auth.controller.ts"
participant AUTH_SVC as "auth.service.ts"
participant PRISMA_SERVICE as "prisma.service.ts"
participant USER_MODEL as "User Model"
participant BCRYPT_SVC as "bcrypt.service.ts"
participant LOGGER_SERVICE as "logger.service.ts"

API_CONTROLLERS->>AUTH_SVC: register(RegisterDto)
activate AUTH_SVC
AUTH_SVC->>LOGGER_SERVICE: Log: UserRegistrationAttempted
AUTH_SVC->>PRISMA_SERVICE: user.findUnique({email})
activate PRISMA_SERVICE
PRISMA_SERVICE->>USER_MODEL: Query user by email
USER_MODEL-->>PRISMA_SERVICE: User data (or null)
deactivate PRISMA_SERVICE

alt User Email Exists
AUTH_SVC->>LOGGER_SERVICE: Log: UserEmailExists
AUTH_SVC--xAPI_CONTROLLERS: ConflictException (409)
else New User
AUTH_SVC->>BCRYPT_SVC: hash(password)
activate BCRYPT_SVC
BCRYPT_SVC-->>AUTH_SVC: hashedPassword
deactivate BCRYPT_SVC
AUTH_SVC->>PRISMA_SERVICE: user.create({data: email, hashedPassword})
activate PRISMA_SERVICE
PRISMA_SERVICE->>USER_MODEL: Insert new user
USER_MODEL-->>PRISMA_SERVICE: Created user data
deactivate PRISMA_SERVICE
AUTH_SVC->>LOGGER_SERVICE: Log: UserCreatedSuccessfully
AUTH_SVC-->>API_CONTROLLERS: Created User (sanitized)
end
deactivate AUTH_SVC
```

### 🔹 **Error and Exception Mapping**

| Scenario               | Error Code     | HTTP Status | User Prompt                               |
| :--------------------- | :------------- | :---------- | :---------------------------------------- |
| Email Already Registered | ACCOUNT_EXISTS | 409         | An account with this email already exists. |
| Database Error         | INTERNAL_ERROR | 500         | An unexpected server error occurred.      |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: HTTPS enforced at gateway (SYS-INFRA-SEC-01).
*   **Password Hashing**: Mandatory use of `bcrypt` for all new user passwords (SYS-INFRA-SEC-02).
*   **Log Event Naming**: Consistent naming like `Auth.Service.Register.Success`, `Auth.Service.Register.Conflict`.
*   **Field Standards**: Ensure no raw passwords are ever logged. Log `userId` and `email` for audit trails.
*   **Metrics**: Consider a counter `auth_registrations_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a unique email and a valid password (min 8 chars as per DECISION-001)
*   ✅ When `AuthService.register` is called
*   ✅ Then a new user record should be created in the database with the password hashed.
*   ✅ Given an email that already exists in the database
*   ✅ When `AuthService.register` is called
*   ✅ Then it should throw a `ConflictException` and no new user should be created.
*   ✅ Given a valid email and password
*   ✅ When `AuthService.register` is called
*   ✅ Then the returned user object should not contain the `passwordHash`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                   |
| :----------------- | :----------- | :------------------------------------------------------------ |
| Single Responsibility | ✅            | Handles user creation business logic, delegates hashing/DB. |
| Independence       | ❌            | Depends on `PrismaService` and `BcryptService`.             |
| Testability        | ✅            | Can be unit-tested by mocking `PrismaService` and `BcryptService`. |
| Small Subset Testing | ✅            | Covered by unit tests for different scenarios.                |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.service.ts
apps/backend/src/prisma/prisma.service.ts
apps/backend/src/common/encryption/bcrypt.service.ts
apps/backend/src/common/exceptions/custom.exceptions.ts
```

---

## **Task-ID**: TASK-SYS-CORE-AUTH-01-03

**Related Epic**: EPIC-001-S1 User Registration

**Related Story**: EPIC-001-S1 User Registration

**Source SYS-ID**: SYS-CORE-AUTH-01

**Related UX-ID:** UX-001

**Related UI-ID:** N/A

**Task Name**: BE: Unit/Integration Tests for Registration

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-01-02

**DECISION-REF**: DECISION-001 (Password complexity only checks length)

### **Coverage**:

- Input Validation: Tests email format, password minLength 8, and other `RegisterDto` rules.
- Exceptions: Tests `BadRequestException` (validation), `ConflictException` (email exists), `InternalServerErrorException` (DB error).
- API/Protocol: Tests `POST /auth/register` endpoint (integration), `AuthService.register` method (unit).
- Database Changes: Mocks database interactions; does not perform actual DB changes.
- UI/Components: N/A (Backend task).
- Interaction Logic: Verifies correct behavior of controller and service under various valid/invalid inputs.
- Business Boundary Condition: Confirms unique email enforcement, password hashing.
- Observability: Ensures logging calls are made as expected (mocked).
- Performance Considerations: Tests should run quickly.
- Non-Functional: Verifies correct HTTP status codes and error responses.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Test Input**: Valid and invalid `RegisterDto` objects.
        ```typescript
        // Valid case
        const validRegisterDto = { email: 'test@example.com', password: 'password123' };
        // Invalid email
        const invalidEmailDto = { email: 'bad-email', password: 'password123' };
        // Short password (DECISION-001)
        const shortPasswordDto = { email: 'test@example.com', password: 'short' };
        ```
    *   **Expected Output**: HTTP Status codes (201, 400, 409, 500) and expected response bodies, or service return values/thrown exceptions.
*   **Decision point application**: Tests explicitly cover `DECISION-001` for password validation (e.g., asserting that passwords with length < 8 fail, but other complexities are not checked).
*   **Main Function/Class Design**
    *   `AuthService` unit tests (`auth.service.spec.ts`): Use `jest.mock` for `PrismaService` and `BcryptService`.
    *   `AuthController` integration tests (`auth.controller.spec.ts`): Use `@nestjs/testing` `Test.createTestingModule` and `supertest` to simulate HTTP requests. Mock `AuthService` dependencies.
*   **Code Location**: `apps/backend/src/auth/auth.service.spec.ts`, `apps/backend/src/auth/auth.controller.spec.ts`
*   **Call Chain**: Test runner invokes `AuthService` methods or `AuthController` endpoints.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Unit tests are isolated and fast. Integration tests involve more setup but should still be efficient.
    *   **Security**: Tests edge cases for input validation to prevent security vulnerabilities. Never use real secrets in tests.
    *   **Logging**: Mocks `LoggerService` to assert that correct log messages are generated without actual I/O.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (Testing)**

1.  **Unit Tests for `AuthService`**:
    *   **Setup**: Use `Test.createTestingModule` to provide mocked `PrismaService` and `BcryptService`.
    *   **Test Cases**:
        *   Successful registration: Expect `prisma.user.create` and `bcrypt.hash` to be called. Expect a sanitized user object returned.
        *   Registration with existing email: Mock `prisma.user.findUnique` to return a user. Expect `ConflictException` to be thrown.
        *   Database error during creation: Mock `prisma.user.create` to throw an error. Expect `InternalServerErrorException`.
        *   Verify logging calls for success and conflict scenarios.
2.  **Integration Tests for `AuthController`**:
    *   **Setup**: Use `Test.createTestingModule` to create a testing module that includes `AuthModule`. Mock `AuthService` to control its behavior without hitting real DB/hashing.
    *   **Test Cases**:
        *   `POST /auth/register` with valid data: Expect HTTP 201.
        *   `POST /auth/register` with invalid email format: Expect HTTP 400.
        *   `POST /auth/register` with password `< 8` chars (as per `DECISION-001`): Expect HTTP 400.
        *   `POST /auth/register` with existing email: Mock `AuthService.register` to throw `ConflictException`. Expect HTTP 409.
        *   `POST /auth/register` with internal server error: Mock `AuthService.register` to throw `InternalServerErrorException`. Expect HTTP 500.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description                            |
| :--- | :---------------- | :------------------------------------- |
| Read | N/A               | Tests mock data; no real data access. |
| Write | N/A               | Tests assert mock calls; no real writes. |
| Cache | N/A               | Not applicable.                        |
| Audit | Log Event         | Assertions on `loggerService.log` calls. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST_RUNNER as "Test Runner"
participant AUTH_CONTROLLER as "auth.controller.spec.ts"
participant AUTH_SERVICE as "auth.service.spec.ts"
participant MOCKED_PRISMA as "Mocked PrismaService"
participant MOCKED_BCRYPT as "Mocked BcryptService"
participant MOCKED_LOGGER as "Mocked LoggerService"

TEST_RUNNER->>AUTH_CONTROLLER: Test POST /auth/register (valid)
activate AUTH_CONTROLLER
AUTH_CONTROLLER->>AUTH_SERVICE: register(dto) (mocked)
activate AUTH_SERVICE
AUTH_SERVICE->>MOCKED_PRISMA: user.findUnique (mock)
MOCKED_PRISMA-->>AUTH_SERVICE: null
AUTH_SERVICE->>MOCKED_BCRYPT: hash (mock)
MOCKED_BCRYPT-->>AUTH_SERVICE: "hashedPassword"
AUTH_SERVICE->>MOCKED_PRISMA: user.create (mock)
MOCKED_PRISMA-->>AUTH_SERVICE: Created User
AUTH_SERVICE->>MOCKED_LOGGER: Log: UserCreatedSuccessfully
AUTH_SERVICE-->>AUTH_CONTROLLER: User (sanitized)
deactivate AUTH_SERVICE
AUTH_CONTROLLER-->>TEST_RUNNER: 201 Created
deactivate AUTH_CONTROLLER

TEST_RUNNER->>AUTH_CONTROLLER: Test POST /auth/register (existing email)
activate AUTH_CONTROLLER
AUTH_CONTROLLER->>AUTH_SERVICE: register(dto) (mocked to throw Conflict)
activate AUTH_SERVICE
AUTH_SERVICE--xAUTH_CONTROLLER: ConflictException
deactivate AUTH_SERVICE
AUTH_CONTROLLER--xTEST_RUNNER: 409 Conflict
deactivate AUTH_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario               | Error Code     | HTTP Status | Test Assertion                                 |
| :--------------------- | :------------- | :---------- | :--------------------------------------------- |
| Invalid Email Format   | INVALID_EMAIL  | 400         | Expect `status(400)` and specific error message. |
| Password Too Short     | PASSWORD_SHORT | 400         | Expect `status(400)` and specific error message. |
| Email Already Registered | ACCOUNT_EXISTS | 409         | Expect `status(409)` and specific error message. |
| Internal Server Error  | INTERNAL_ERROR | 500         | Expect `status(500)` and generic error message. |

### 🔹 **Security and Observability Hooks**

*   **Security**: Tests cover common input validation bypasses. Mocks are used to prevent unintended side effects or exposure of sensitive data.
*   **Observability**: Tests assert that `LoggerService` methods are called with expected parameters in success and failure scenarios.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a mock `AuthService` and `AuthController`
*   ✅ When a valid `RegisterDto` is provided to `AuthService.register`
*   ✅ Then `prisma.user.create` and `bcrypt.hash` should be called once with correct parameters.
*   ✅ Given an `AuthService` where `prisma.user.findUnique` returns an existing user
*   ✅ When `AuthService.register` is called
*   ✅ Then a `ConflictException` should be thrown.
*   ✅ Given an `AuthController` and a valid registration request
*   ✅ When the `POST /auth/register` endpoint is hit
*   ✅ Then the response status should be 201 Created.
*   ✅ Given an `AuthController` and a registration request with an invalid email or password shorter than 8 characters (per DECISION-001)
*   ✅ When the `POST /auth/register` endpoint is hit
*   ✅ Then the response status should be 400 Bad Request.
*   ✅ Given an `AuthController` and a registration request for an existing email
*   ✅ When the `POST /auth/register` endpoint is hit
*   ✅ Then the response status should be 409 Conflict.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                         |
| :----------------- | :----------- | :-------------------------------------------------- |
| Single Responsibility | ✅            | Tests focus on the behavior of `AuthService` and `AuthController`. |
| Independence       | ✅            | Tests are isolated using mocks; no external dependencies. |
| Testability        | ✅            | Fully testable, mocking allows control over dependencies. |
| Small Subset Testing | ✅            | Unit tests cover specific methods; integration tests cover the API endpoint. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.service.spec.ts
apps/backend/src/auth/auth.controller.spec.ts
apps/backend/test/app.e2e-spec.ts (for broader E2E tests)
```

---

## **Task-ID**: TASK-SYS-CORE-AUTH-01-04

**Related Epic**: EPIC-001-S1 User Registration

**Related Story**: EPIC-001-S1 User Registration

**Source SYS-ID**: SYS-CORE-AUTH-01

**Related UX-ID:** UX-001

**Related UI-ID:** UI-016 (Implied by Registration Page)

**Task Name**: FE: Create Registration Page & Form Component

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-SETUP-01 (Monorepo Setup)

**DECISION-REF**: DECISION-001 (Password complexity only checks length)

### **Coverage**:

- Input Validation: Client-side validation for email format and password minimum length (8 chars, per UX-001 and DECISION-001).
- Exceptions: Displays validation errors inline.
- API/Protocol: Prepares data for `POST /auth/register`.
- Database Changes: N/A (Frontend task).
- UI/Components: `/register` page (`page.tsx`), `RegisterForm` component, input fields (email, password), submit button.
- Interaction Logic: User input, client-side validation, form submission handling (disabling button).
- Business Boundary Condition: Email format, password length.
- Observability: N/A (Frontend display).
- Performance Considerations: Fast client-side validation.
- Non-Functional: Basic accessibility, responsive design.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: User typing into email and password fields.
        ```typescript
        // Local state for form inputs
        interface RegistrationFormState {
          email: string; // example: "user@example.com"
          password: string; // example: "StrongPass123"
          confirmPassword: string; // example: "StrongPass123"
        }
        ```
    *   **Output (to API client)**: `RegisterDto` (email, password) - shared-types.
        ```typescript
        // packages/shared-types/src/auth.types.ts
        export class RegisterDto {
          email: string;
          password: string;
        }
        ```
*   **Decision point application**: `DECISION-001` is strictly applied by implementing client-side validation that checks only for a minimum password length of 8 characters. No other complexity rules (e.g., uppercase, numbers, symbols) are enforced on the frontend.
*   **Main Function/Class Design**
    *   `RegisterPage`: (`apps/frontend/src/app/(auth)/register/page.tsx`) The Next.js page that renders the `RegisterForm`.
    *   `RegisterForm`: (`apps/frontend/src/components/auth/RegisterForm.tsx`) A React component responsible for the form UI, local state, and client-side validation.
*   **Code Location**: `apps/frontend/src/app/(auth)/register/page.tsx`, `apps/frontend/src/components/auth/RegisterForm.tsx`
*   **Call Chain**: `User -> RegisterPage -> RegisterForm`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Client-side validation provides immediate feedback, improving UX. Form rendering should be efficient.
    *   **Security**: Client-side validation is for UX; actual security relies on backend validation.
    *   **Logging**: N/A for this task directly.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**:
    *   The main registration page will be `apps/frontend/src/app/(auth)/register/page.tsx`.
    *   This page will import and render `RegisterForm` from `apps/frontend/src/components/auth/RegisterForm.tsx`.
2.  **Triggering Logic (events, buttons, input validation)**:
    *   `RegisterForm` will contain `<input type="email">` and `<input type="password">` elements.
    *   `onChange` handlers for inputs will update local React state.
    *   `onSubmit` handler for the form will trigger client-side validation.
    *   A submit button will be rendered, potentially `disabled` during submission or if validation fails.
3.  **[Decision hook]**: Per `DECISION-001`, the client-side validation within `RegisterForm` will:
    *   Validate email format (basic regex).
    *   Validate password length: `password.length >= 8`.
    *   Confirm password match (`password === confirmPassword`).
    *   No other password complexity rules (e.g., symbols, numbers, uppercase) will be implemented.
4.  **Interaction with the Backend**: N/A for this task, but the `RegisterForm` will eventually pass validated data to an API client (handled in `TASK-SYS-CORE-AUTH-01-05`).
5.  **UI Success/Failure Feedback and State Recovery**:
    *   Validation errors will be displayed as inline text below the respective input fields.
    *   The submit button's state will reflect `loading` during submission.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                 |
| :---- | :---------------- | :------------------------------------------ |
| Read  | User Input Fields | Reads email, password, confirmPassword from user. |
| Write | Component State   | Updates `email`, `password`, `confirmPassword`, `validationErrors`, `isLoading`. |
| Cache | N/A               | Not applicable.                             |
| Audit | N/A               | Not applicable.                             |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant REGISTER_PAGE as "register/page.tsx"
participant REGISTER_FORM as "RegisterForm.tsx"

USER->>REGISTER_PAGE: Navigate to /register
activate REGISTER_PAGE
REGISTER_PAGE->>REGISTER_FORM: Render form component
activate REGISTER_FORM
USER->>REGISTER_FORM: Type email and password
REGISTER_FORM->>REGISTER_FORM: Update local state
REGISTER_FORM->>REGISTER_FORM: Perform client-side validation (DECISION-001)
REGISTER_FORM-->>USER: Display inline validation errors
alt Form Validated
USER->>REGISTER_FORM: Click Submit
REGISTER_FORM->>REGISTER_FORM: Disable Submit button
REGISTER_FORM-->>REGISTER_PAGE: Submit event with form data (to API client)
else Form Invalid
USER->>REGISTER_FORM: See errors, cannot submit
end
deactivate REGISTER_FORM
deactivate REGISTER_PAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code    | HTTP Status | User Prompt                               |
| :----------------------- | :------------ | :---------- | :---------------------------------------- |
| Invalid Email Format     | CLIENT_BAD_EMAIL | N/A         | Please enter a valid email address.       |
| Password Too Short (<8)  | CLIENT_PASSWORD_SHORT | N/A         | Password must be at least 8 characters long. |
| Passwords Don't Match    | CLIENT_PASSWORD_MISMATCH | N/A         | Passwords do not match.                   |
| Empty Field              | CLIENT_EMPTY_FIELD | N/A         | This field is required.                   |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for UI.
*   **Authentication**: N/A for UI.
*   **Log Event Naming**: N/A for UI.
*   **Accessibility**: Input fields will have `aria-label` or `<label>` tags. Error messages will be associated with inputs for screen readers.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the registration page is open
*   ✅ When the user inputs valid email and a password of at least 8 characters (per DECISION-001) that match
*   ✅ Then the submit button should be enabled.
*   ✅ Given an invalid email format is entered
*   ✅ When the user attempts to submit the form
*   ✅ Then an inline error message "Please enter a valid email address" should be displayed.
*   ✅ Given a password shorter than 8 characters (e.g., "short")
*   ✅ When the user attempts to submit the form
*   ✅ Then an inline error message "Password must be at least 8 characters long" should be displayed.
*   ✅ Given password and confirm password fields do not match
*   ✅ When the user attempts to submit the form
*   ✅ Then an inline error message "Passwords do not match" should be displayed.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                         |
| :----------------- | :----------- | :-------------------------------------------------- |
| Single Responsibility | ✅            | `RegisterPage` renders the form; `RegisterForm` manages input/validation UI. |
| Independence       | ✅            | Component is self-contained for UI and validation logic. |
| Testability        | ✅            | Can be unit-tested using React Testing Library for UI and validation logic. |
| Small Subset Testing | ✅            | Render with various props/states to test all validation paths. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(auth)/register/page.tsx
apps/frontend/src/components/auth/RegisterForm.tsx
apps/frontend/src/lib/validation.ts (for reusable validation functions)
```

---

## **Task-ID**: TASK-SYS-CORE-AUTH-01-05

**Related Epic**: EPIC-001-S1 User Registration

**Related Story**: EPIC-001-S1 User Registration

**Source SYS-ID**: SYS-CORE-AUTH-01

**Related UX-ID:** UX-001

**Related UI-ID:** UI-016 (Implied by Registration Page)

**Task Name**: FE: Implement Registration API Client & State

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-01-01, TASK-SYS-CORE-AUTH-01-04

**DECISION-REF**: DECISION-001 (Password complexity only checks length)

### **Coverage**:

- Input Validation: Sends already validated data from `RegisterForm`.
- Exceptions: Handles API errors (400, 409, 500) and displays user-friendly messages.
- API/Protocol: `POST /auth/register` using Axios.
- Database Changes: N/A (Frontend task).
- UI/Components: `RegisterForm` component, global/local state for `isLoading`, `error`, `isSuccess`.
- Interaction Logic: Triggers API call on form submission, updates UI state based on API response, redirects on success.
- Business Boundary Condition: Ensures `RegisterDto` matches backend requirements.
- Observability: Basic console logging for API requests/responses in development.
- Performance Considerations: API calls should be asynchronous and not block UI.
- Non-Functional: Error message internationalization, accessibility for error feedback.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (to API client method)**: `RegisterDto`
        ```typescript
        // packages/shared-types/src/auth.types.ts
        export interface RegisterDto {
          email: string; // example: "user@example.com"
          password: string; // example: "StrongPass123"
        }
        ```
    *   **Output (from API client method)**: `Promise<any>` (resolves on 201, rejects on error).
        ```typescript
        // frontend/src/services/auth.service.ts
        // A successful registration might return no content or a simple success message
        // Error response structure matches backend's common Error object
        interface ApiError {
          statusCode: number;
          message: string;
          error: string;
        }
        ```
*   **Decision point application**: The API client sends the `email` and `password` string directly as received from the form. The `DECISION-001` regarding password length (min 8) is a pre-condition ensured by `TASK-SYS-CORE-AUTH-01-04` (client-side validation) and then enforced by `TASK-SYS-CORE-AUTH-01-01` (backend DTO validation). The client strictly adheres to sending this validated structure.
*   **Main Function/Class Design**
    *   `AuthService`: (`apps/frontend/src/services/auth.service.ts`) Contains methods for authentication-related API calls.
    *   `register` method: `async` function using `axios.post`.
    *   `RegisterForm`: Consumes `AuthService.register` and manages UI state.
*   **Code Location**: `apps/frontend/src/services/auth.service.ts`, `apps/frontend/src/components/auth/RegisterForm.tsx` (where the service is called), `packages/shared-types/src/auth.types.ts`
*   **Call Chain**: `RegisterForm -> auth.service.ts -> Backend API`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Uses `async/await` to handle API calls non-blockingly. `axios` is optimized for HTTP requests.
    *   **Security**: All API calls over HTTPS (SYS-INFRA-SEC-01). No sensitive data (like unhashed passwords) should be logged client-side.
    *   **Logging**: `console.error` for API failures. In a production environment, this would integrate with a client-side error reporting tool.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: The `RegisterForm` component (`apps/frontend/src/components/auth/RegisterForm.tsx`) will be responsible for initiating the API call.
2.  **Triggering Logic**:
    *   On `RegisterForm` submission (after client-side validation passes), an `onSubmit` handler will be invoked.
    *   This handler will set an `isLoading` state to `true` and clear any previous error messages.
3.  **Interaction with the Backend (API Client & State)**:
    *   **API Client**: `apps/frontend/src/services/auth.service.ts` will contain an `async register(email, password)` method:
        ```typescript
        // apps/frontend/src/services/auth.service.ts
        import axiosInstance from '../lib/axios'; // Centralized Axios instance
        import { RegisterDto } from 'shared-types';

        export const authService = {
          async register(data: RegisterDto) {
            try {
              const response = await axiosInstance.post('/auth/register', data);
              return response.data; // Or handle status 201 no content
            } catch (error) {
              // Custom error handling or re-throw for component to catch
              if (axios.isAxiosError(error) && error.response) {
                throw error.response.data; // Return backend error details
              }
              throw { message: 'Network Error', statusCode: 500 };
            }
          },
        };
        ```
    *   The `RegisterForm`'s `onSubmit` handler will call `authService.register(email, password)`.
    *   It will use `try/catch` to handle the asynchronous API call:
        *   **Success**: On a 201 response, set `isLoading` to `false`, clear errors, and redirect the user (e.g., to login page or dashboard).
        *   **Failure**: Catch the error, set `isLoading` to `false`, and update a local `error` state variable.
4.  **UI Success/Failure Feedback and State Recovery**:
    *   Display a generic success message (e.g., "Registration successful, please log in.") or redirect immediately.
    *   Display a user-friendly error message based on the API response (e.g., "Email already registered" for 409, "Invalid input" for 400, "Server error" for 500).
    *   The submit button remains disabled while `isLoading` is true.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                 |
| :---- | :---------------- | :------------------------------------------ |
| Read  | Form Data         | Reads validated `email` and `password` from `RegisterForm`. |
| Write | Backend API       | Sends `RegisterDto` to `POST /auth/register`. |
| Write | Component State   | Updates `isLoading`, `errorMessage`, `isSuccess` states. |
| Cache | N/A               | Not applicable.                             |
| Audit | Log Event         | `auth.api.register.success`, `auth.api.register.failure` (client-side console). |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant REGISTER_FORM as "RegisterForm.tsx"
participant FE_AUTH_SERVICE as "auth.service.ts"
participant AXIOS_INSTANCE as "axios.ts"
participant BE_API_CONTROLLER as "auth.controller.ts"

REGISTER_FORM->>FE_AUTH_SERVICE: register({email, password})
activate FE_AUTH_SERVICE
FE_AUTH_SERVICE->>AXIOS_INSTANCE: POST /api/v1/auth/register
activate AXIOS_INSTANCE
AXIOS_INSTANCE->>BE_API_CONTROLLER: HTTP POST /auth/register
activate BE_API_CONTROLLER
BE_API_CONTROLLER-->>AXIOS_INSTANCE: 201 Created / 4xx / 5xx
deactivate BE_API_CONTROLLER
AXIOS_INSTANCE-->>FE_AUTH_SERVICE: API Response
deactivate AXIOS_INSTANCE
alt API Call Success (201)
FE_AUTH_SERVICE-->>REGISTER_FORM: Success Response
REGISTER_FORM->>REGISTER_FORM: Redirect to Login/Dashboard
else API Call Failure (4xx/5xx)
FE_AUTH_SERVICE-->>REGISTER_FORM: Error Response
REGISTER_FORM->>REGISTER_FORM: Display error message
end
deactivate FE_AUTH_SERVICE
```

### 🔹 **Error and Exception Mapping**

| Scenario               | Error Code         | HTTP Status | User Prompt                               |
| :--------------------- | :----------------- | :---------- | :---------------------------------------- |
| Invalid Input (FE)     | (CLIENT_VALIDATION) | N/A         | (Handled by TASK-SYS-CORE-AUTH-01-04)   |
| Invalid Input (BE)     | INVALID_INPUT      | 400         | Invalid email or password.                |
| Email Already Registered | ACCOUNT_EXISTS     | 409         | An account with this email already exists. |
| Network Error          | NETWORK_ERROR      | (N/A)       | Cannot connect to server. Please try again. |
| Server Error (BE)      | INTERNAL_ERROR     | 500         | An unexpected error occurred. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All frontend API calls are assumed to be over HTTPS, as enforced by the deployment environment (SYS-INFRA-SEC-01).
*   **Authentication**: N/A for registration endpoint.
*   **Log Event Naming**: Log client-side API call successes/failures (e.g., `Client.Auth.Register.Success`, `Client.Auth.Register.Failure`) for debugging.
*   **Error Handling**: Centralized error handling for Axios can ensure consistent logging/reporting of API failures.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given valid and client-side validated registration data (email, password >= 8 chars per DECISION-001)
*   ✅ When the `RegisterForm` submits and calls `authService.register`
*   ✅ Then a `POST` request should be sent to `/api/v1/auth/register` with the correct payload.
*   ✅ Given the backend responds with a 201 Created status
*   ✅ When `authService.register` completes successfully
*   ✅ Then the `RegisterForm` should redirect the user to the login page or dashboard.
*   ✅ Given the backend responds with a 409 Conflict status (email exists)
*   ✅ When `authService.register` catches the error
*   ✅ Then the `RegisterForm` should display "An account with this email already exists."
*   ✅ Given the backend responds with a 400 Bad Request status (e.g., invalid input caught by backend DTO validation)
*   ✅ When `authService.register` catches the error
*   ✅ Then the `RegisterForm` should display "Invalid email or password."
*   ✅ Given a network error occurs during the API call
*   ✅ When `authService.register` catches the network error
*   ✅ Then the `RegisterForm` should display "Cannot connect to server. Please try again."

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                         |
| :----------------- | :----------- | :-------------------------------------------------- |
| Single Responsibility | ✅            | `auth.service.ts` handles API calls; `RegisterForm` manages UI state and error display. |
| Independence       | ✅            | `auth.service.ts` is a modular client; `RegisterForm` integrates it. |
| Testability        | ✅            | `auth.service.ts` can be unit-tested by mocking Axios; `RegisterForm` can be tested with mock API calls. |
| Small Subset Testing | ✅            | Test success/failure paths, various error responses. |

### 🔹 **Code Location**

```
apps/frontend/src/services/auth.service.ts
apps/frontend/src/lib/axios.ts (centralized axios instance)
apps/frontend/src/components/auth/RegisterForm.tsx
apps/frontend/src/app/(auth)/register/page.tsx
```

<!-- impl-batch:TASK-SYS-CORE-AUTH-02-01::SYS-CORE-AUTH-02::UX-002::TASK-SYS-CORE-AUTH-02-02::SYS-CORE-AUTH-02::UX-002::TASK-SYS-CORE-AUTH-02-03::SYS-CORE-AUTH-02::UX-002::TASK-SYS-CORE-AUTH-02-04::SYS-CORE-AUTH-02::UX-002::TASK-SYS-CORE-AUTH-02-05::SYS-CORE-AUTH-02::UX-002 -->

## **Task-ID**: TASK-SYS-CORE-AUTH-02-01

**Related Epic**: EPIC-001 User Registration & Login

**Related Story**: EPIC-001-S2 User Login

**Source SYS-ID**: SYS-CORE-AUTH-02

**Related UX-ID:** UX-002

**Task Name**: BE: Implement POST /auth/login Controller

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-INFRA-AUTH-01-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Email format, password presence.
- Exceptions: Invalid Credentials → 401 Unauthorized, Bad Request (validation) → 400 Bad Request.
- API/Protocol: `POST /api/v1/auth/login`
- Database Changes: Not Covered
- UI/Components: Interacts with frontend `Login API Client`
- Interaction Logic: Receives login request, validates DTO, calls `AuthService.login`, returns JWT.
- Business Boundary Condition: Email must be a valid format, password must be provided.
- Observability: Log incoming request, validation errors, and successful/failed authentication attempts (without sensitive data).
- Performance Considerations: Controller layer overhead minimal, primary logic handled by service.
- Non-Functional: Standardized API response format for success and errors.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `LoginDto` (defined in `shared-types` and in NestJS)
        ```typescript
        // apps/backend/src/auth/dto/login.dto.ts
        export class LoginDto {
          @IsEmail()
          email: string; // example: "user@example.com"

          @IsString()
          @IsNotEmpty()
          password: string; // example: "StrongPass123"
        }
        ```
    *   **Output**: `AuthResponseDto`
        ```typescript
        // apps/backend/src/auth/dto/auth-response.dto.ts
        export class AuthResponseDto {
          accessToken: string; // example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
*   **Decision point application**: No specific `DECISION-REF` applies directly to this controller task, but it will uphold validations as per API design.
*   **Main Function/Class Design**
    *   `AuthController`: Handles HTTP requests for authentication. Its responsibility is to validate input and delegate to `AuthService`.
    *   `@Post('login')`: Decorator for the login endpoint.
*   **Code Location**
    *   Controller: `apps/backend/src/auth/auth.controller.ts`
    *   DTOs: `apps/backend/src/auth/dto/login.dto.ts`, `apps/backend/src/auth/dto/auth-response.dto.ts`
*   **Call Chain**
    `FE: Login API Client` → `AuthController.login` → `AuthService.login`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Fast input validation using NestJS's `ValidationPipe`.
    *   **Security**: Ensure DTO validation prevents malformed requests from reaching the service layer.
    *   **Logging**: Log at the start and end of the request, including DTO details (excluding password) and response status.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**
    *   Define `AuthController` class decorated with `@Controller('auth')`.
    *   Implement a `@Post('login')` method that accepts a `LoginDto` in the request body.
    *   Use `@Body()` decorator with `LoginDto` to automatically apply validation via `ValidationPipe`.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Inject `AuthService` into `AuthController`.
    *   Call `this.authService.login(loginDto.email, loginDto.password)`.
    *   Wrap the service call in a `try-catch` block to handle potential `UnauthorizedException` or other business logic errors thrown by `AuthService`.
3.  **Data Access**: Not directly in the controller; delegated to `AuthService`.
4.  **Error and Exception Handling**
    *   NestJS `ValidationPipe` will automatically return `400 Bad Request` for invalid DTO inputs.
    *   Catch `UnauthorizedException` from `AuthService` and allow NestJS's global exception filter (SYS-INFRA-ERROR-01) to map it to `401 Unauthorized`.
    *   Any other unexpected errors will be caught by the global exception filter and mapped to `500 Internal Server Error`.
5.  **Logging and Metrics**
    *   Use the injected `LoggerService` (SYS-INFRA-LOG-01) to log:
        *   `info`: Incoming POST /auth/login request.
        *   `warn`: Validation errors (if not handled gracefully by `ValidationPipe`).
        *   `info`: Successful login attempt (without user email, just user ID).
        *   `error`: Failed login attempt or server-side errors.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | HTTP Request Body | `email` and `password` for validation. |
| Write | HTTP Response | Returns `AuthResponseDto` with `accessToken`. |
| Cache | N/A | No caching at this layer. |
| Audit | Log Event | Logs API call entry/exit and results. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT_APP as "Frontend (UX-002)"
participant AUTH_CONTROLLER as "auth.controller.ts"
participant AUTH_SERVICE as "auth.service.ts"
CLIENT_APP->>AUTH_CONTROLLER: POST /auth/login (LoginDto)
activate AUTH_CONTROLLER
AUTH_CONTROLLER->>AUTH_SERVICE: login(email, password)
activate AUTH_SERVICE
AUTH_SERVICE-->>AUTH_CONTROLLER: { accessToken } or error
deactivate AUTH_SERVICE
AUTH_CONTROLLER-->>CLIENT_APP: 200 OK / 401 Unauthorized
deactivate AUTH_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :--------------- | :---------- | :---------- |
| Invalid DTO Input | VALIDATION_ERROR | 400 | Invalid email or missing password. |
| Invalid Credentials | UNAUTHORIZED | 401 | Invalid email or password. |
| Server Error | INTERNAL_SERVER_ERROR | 500 | An unexpected error occurred. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Assumed to be enforced by SYS-INFRA-SEC-01 at the API Gateway/Ingress layer.
*   **Authentication (JWT Verification Process)**: This controller *generates* JWTs; validation occurs via `JwtStrategy` (SYS-INFRA-AUTH-01) for *protected* routes, not here.
*   **Log Event Naming and Field Standards**: `auth.login.request.received`, `auth.login.validation.failed`, `auth.login.success`, `auth.login.failed`. Fields include `correlationId`, `userId` (after auth), `statusCode`, `endpoint`. Sensitive data (passwords) MUST NOT be logged.
*   **Metric Naming**: `auth_login_total`, `auth_login_success_total`, `auth_login_failed_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a valid email and password
*   ✅ When a POST request is made to `/auth/login`
*   ✅ Then a 200 OK response with an `accessToken` is returned.
*   ✅ Given an invalid email format or missing password
*   ✅ When a POST request is made to `/auth/login`
*   ✅ Then a 400 Bad Request response is returned.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Controller solely handles request input/output and delegates business logic. |
| Independence | ✅ | Decoupled from core business logic, relies on `AuthService`. |
| Testability | ✅ | Can be easily unit-tested by mocking `AuthService`. |
| Small Subset Testing | ✅ | Testable independently without full system setup. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.controller.ts
apps/backend/src/auth/dto/login.dto.ts
apps/backend/src/auth/dto/auth-response.dto.ts
```

### 🔹 **Additional Tags**

*   **New Requirement**: Added
*   **Requirement to be Clarified**: N/A

---

## **Task-ID**: TASK-SYS-CORE-AUTH-02-02

**Related Epic**: EPIC-001 User Registration & Login

**Related Story**: EPIC-001-S2 User Login

**Source SYS-ID**: SYS-CORE-AUTH-02

**Related UX-ID:** UX-002

**Task Name**: BE: Implement AuthService.login Logic

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-02-01, SYS-INFRA-SEC-02 (Password Hashing), SYS-INFRA-AUTH-01 (JWT Foundation)

**DECISION-REF**: —

### **Coverage**:

- Core Business Logic: User lookup, password comparison, JWT token generation.
- Exceptions: User Not Found, Invalid Password → `UnauthorizedException`.
- API/Protocol: Internal service method call.
- Database Changes: Read `User` table (email, passwordHash).
- UI/Components: N/A (Backend service).
- Interaction Logic: Called by `AuthController`, interacts with `PrismaService` and `JwtService`.
- Business Boundary Condition: User must exist, provided password must match stored hash.
- Observability: Log password comparison result, JWT generation success/failure.
- Performance Considerations: Password comparison (bcrypt) is CPU-intensive but necessary. JWT generation is fast.
- Non-Functional: Secure password comparison, robust token generation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `email: string`, `password: string`
    *   **Output**: `{ accessToken: string }`
*   **Decision point application**: Applies `SYS-INFRA-SEC-02` for password hashing and comparison, ensuring bcrypt is used. Applies `SYS-INFRA-AUTH-01` for JWT token generation.
*   **Main Function/Class Design**
    *   `AuthService`: Contains the core business logic for authentication.
    *   `login(email: string, password: string)`: Method responsible for authenticating a user.
    *   `JwtService`: NestJS module for JWT creation.
    *   `PrismaService`: Injected to interact with the database (`User` model).
    *   `BcryptService` (or similar utility): Injected for password comparison.
*   **Code Location**
    *   Service: `apps/backend/src/auth/auth.service.ts`
    *   Prisma Integration: `apps/backend/src/prisma/prisma.service.ts`
    *   JWT Module: `apps/backend/src/auth/auth.module.ts` (configures `JwtModule`)
    *   Bcrypt Utility: `apps/backend/src/common/security/bcrypt.service.ts` (or similar)
*   **Call Chain**
    `AuthController.login` → `AuthService.login` → `PrismaService.user.findUnique` (for user lookup) → `BcryptService.compare` (for password validation) → `JwtService.sign` (for token generation)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `bcrypt.compare` is a synchronous, computationally intensive operation. Ensure it's not a bottleneck for high concurrency (Node.js event loop considerations).
    *   **Security**: Use `bcrypt` for password comparison (SYS-INFRA-SEC-02). NEVER return the password hash to the client. JWT payload should only contain necessary, non-sensitive information (e.g., `userId`, `email`).
    *   **Logging**: Log user lookup outcome, password comparison result (success/fail), and JWT generation. Mask sensitive data (passwords, JWT secrets).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A, this is a service method.
2.  **Business Logic**
    *   **Find User**: Use `PrismaService` to find a `User` by their `email`.
        *   If no user is found, throw an `UnauthorizedException` with an appropriate message (e.g., "Invalid credentials").
    *   **Compare Password**: Use `BcryptService.compare()` to compare the provided plaintext `password` with the `user.passwordHash` retrieved from the database.
        *   If passwords do not match, throw an `UnauthorizedException`.
    *   **Generate JWT**:
        *   Create a `payload` object for the JWT, typically containing `sub` (user ID) and `email`.
        *   Use `JwtService.sign(payload)` to generate the `accessToken`.
3.  **Data Access**
    *   `prisma.user.findUnique({ where: { email } })`: To retrieve the user object.
4.  **Error and Exception Handling**
    *   Throw `UnauthorizedException` in case of user not found or password mismatch. These will be caught by the global exception filter and returned as `401 Unauthorized`.
5.  **Logging and Metrics**
    *   `LoggerService` (SYS-INFRA-LOG-01) will log:
        *   `debug`: User lookup attempt for email.
        *   `info`: User found, proceeding with password comparison.
        *   `warn`: User not found or password mismatch attempt for email.
        *   `info`: Successful authentication for `userId`.
        *   `error`: Any unexpected errors during the process.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `User` table | Reads `email` and `passwordHash` to verify user. |
| Write | N/A | No direct database write; generates a JWT. |
| Cache | N/A | No caching at this layer for MVP. |
| Audit | Log Event | Records authentication outcome (success/failure). |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant AUTH_CONTROLLER as "auth.controller.ts"
participant AUTH_SERVICE as "auth.service.ts"
participant PRISMA_SERVICE as "prisma.service.ts"
participant USER_MODEL as "User Model (DB)"
participant BCRYPT_SERVICE as "bcrypt.service.ts"
participant JWT_SERVICE as "jwt.service.ts"

AUTH_CONTROLLER->>AUTH_SERVICE: login(email, password)
activate AUTH_SERVICE
AUTH_SERVICE->>PRISMA_SERVICE: find user by email
activate PRISMA_SERVICE
PRISMA_SERVICE->>USER_MODEL: SELECT email, passwordHash WHERE email = ?
activate USER_MODEL
USER_MODEL-->>PRISMA_SERVICE: user record or null
deactivate USER_MODEL
deactivate PRISMA_SERVICE
alt User found
  AUTH_SERVICE->>BCRYPT_SERVICE: compare(password, user.passwordHash)
  activate BCRYPT_SERVICE
  BCRYPT_SERVICE-->>AUTH_SERVICE: true/false
  deactivate BCRYPT_SERVICE
  alt Passwords match
    AUTH_SERVICE->>JWT_SERVICE: sign({ userId, email })
    activate JWT_SERVICE
    JWT_SERVICE-->>AUTH_SERVICE: accessToken
    deactivate JWT_SERVICE
    AUTH_SERVICE-->>AUTH_CONTROLLER: { accessToken }
  else Passwords do not match
    AUTH_SERVICE--xAUTH_CONTROLLER: UnauthorizedException
  end
else User not found
  AUTH_SERVICE--xAUTH_CONTROLLER: UnauthorizedException
end
deactivate AUTH_SERVICE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------------------ | :--------------- | :---------- | :---------- |
| Invalid Credentials | UNAUTHORIZED | 401 | Invalid email or password. |
| Server Error        | INTERNAL_SERVER_ERROR | 500 | An unexpected error occurred. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Handled by `SYS-INFRA-SEC-01`.
*   **Authentication (JWT Verification Process)**: This service *creates* the JWT using `JwtService` and the secret configured via `SYS-INFRA-AUTH-01`.
*   **Log Event Naming and Field Standards**: `auth.login.user_lookup`, `auth.login.password_compare.success`, `auth.login.password_compare.failed`, `auth.login.jwt_generated`. Fields include `userId` (if found), `email` (masked), `durationMs`.
*   **Metric Naming**: `auth_login_user_found_total`, `auth_login_password_match_total`, `auth_login_password_mismatch_total`, `auth_login_jwt_generation_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a registered user with valid credentials
*   ✅ When `AuthService.login` is called with those credentials
*   ✅ Then it returns an `accessToken`.
*   ✅ Given a registered user with an incorrect password
*   ✅ When `AuthService.login` is called with the incorrect password
*   ✅ Then it throws an `UnauthorizedException`.
*   ✅ Given an unregistered email address
*   ✅ When `AuthService.login` is called with that email
*   ✅ Then it throws an `UnauthorizedException`.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Focuses solely on authentication logic (user lookup, password verify, token generate). |
| Independence | ✅ | Relies on `PrismaService` and `JwtService` but encapsulates the authentication workflow. |
| Testability | ✅ | Easily unit-testable by mocking `PrismaService`, `BcryptService`, and `JwtService`. |
| Small Subset Testing | ✅ | Can be tested in isolation. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.service.ts
apps/backend/src/auth/auth.module.ts
apps/backend/src/prisma/prisma.service.ts
apps/backend/src/common/security/bcrypt.service.ts
```

### 🔹 **Additional Tags**

*   **New Requirement**: Added
*   **Requirement to be Clarified**: N/A

---

## **Task-ID**: TASK-SYS-CORE-AUTH-02-03

**Related Epic**: EPIC-001 User Registration & Login

**Related Story**: EPIC-001-S2 User Login

**Source SYS-ID**: SYS-CORE-AUTH-02

**Related UX-ID:** UX-002

**Task Name**: BE: Unit/Integration Tests for Login

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-02-02

**DECISION-REF**: —

### **Coverage**:

- Unit Tests: `AuthService` logic (user lookup, password comparison, JWT generation).
- Integration Tests: `AuthController` endpoint behavior (request handling, DTO validation, service delegation, error mapping).
- Exceptions: Validating `UnauthorizedException` for incorrect credentials, `BadRequestException` for invalid input.
- API/Protocol: Internal (service tests) and HTTP requests (controller tests).
- Database Changes: Mocked for tests.
- UI/Components: N/A.
- Interaction Logic: Simulating service method calls and HTTP requests.
- Business Boundary Condition: Ensuring all authentication paths (success, invalid user, wrong password) are covered.
- Observability: Test logs for test execution.
- Performance Considerations: Tests should run quickly.
- Non-Functional: Verify correct HTTP status codes and error messages.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Unit)**: `email: string`, `password: string`
    *   **Output (Unit)**: `{ accessToken: string }` or `UnauthorizedException`
    *   **Input (Integration)**: HTTP Request Body `{ email: string, password: string }`
    *   **Output (Integration)**: HTTP Response `{ accessToken: string }` or error payload
*   **Decision point application**: No specific `DECISION-REF` applies directly.
*   **Main Function/Class Design**
    *   `AuthService` Unit Tests: Use Jest to test `AuthService` methods, mocking `PrismaService`, `BcryptService`, and `JwtService`.
    *   `AuthController` Integration Tests: Use NestJS `TestingModule` and `supertest` to simulate HTTP requests and test the full API flow.
*   **Code Location**
    *   `apps/backend/src/auth/auth.service.spec.ts` (Unit Tests)
    *   `apps/backend/src/auth/auth.controller.spec.ts` (Integration Tests)
*   **Call Chain**
    *   Unit: Test runner -> `AuthService` (mocked dependencies)
    *   Integration: Test runner -> `supertest` -> `AuthController` -> `AuthService` (real instance with mocked DB/JWT/Bcrypt)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Avoid real database calls in unit tests. Use in-memory database or mocks for integration tests where appropriate.
    *   **Security**: Ensure test data does not contain real sensitive information. Do not log sensitive data in test outputs.
    *   **Logging**: Tests can verify that logging calls occur at expected points, but generally do not focus on the content of logs themselves, unless testing a logging-specific feature.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (Testing)**

1.  **Unit Tests for `AuthService`**
    *   Setup: Create a testing module that provides `AuthService` and mocks its dependencies (`PrismaService`, `BcryptService`, `JwtService`).
    *   Test Cases:
        *   Successful login: Mock `findUnique` to return a user, `compare` to return true, `sign` to return a token. Assert the returned token.
        *   User not found: Mock `findUnique` to return `null`. Assert `UnauthorizedException` is thrown.
        *   Incorrect password: Mock `findUnique` to return a user, `compare` to return false. Assert `UnauthorizedException` is thrown.
        *   Error during JWT generation: Mock `sign` to throw an error. Assert the error is handled.
2.  **Integration Tests for `AuthController`**
    *   Setup: Create a testing module for `AuthController`, providing a real `AuthService` but with mocked `PrismaService`, `BcryptService`, `JwtService`. Use `supertest` for HTTP request simulation.
    *   Test Cases:
        *   `POST /auth/login` with valid data: Send request, expect `200 OK` and an `accessToken`.
        *   `POST /auth/login` with invalid email format: Send request, expect `400 Bad Request`.
        *   `POST /auth/login` with missing password: Send request, expect `400 Bad Request`.
        *   `POST /auth/login` with non-existent user: Mock `AuthService.login` to throw `UnauthorizedException`. Expect `401 Unauthorized`.
        *   `POST /auth/login` with wrong password: Mock `AuthService.login` to throw `UnauthorizedException`. Expect `401 Unauthorized`.
        *   Error from service: Mock `AuthService.login` to throw generic error. Expect `500 Internal Server Error`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Mocked data | Simulate database records for users. |
| Write | N/A | Tests do not persist data. |
| Cache | N/A | N/A. |
| Audit | Test results | Verifies functional behavior. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST_RUNNER as "Test Runner"
participant AUTH_CONTROLLER_SPEC as "auth.controller.spec.ts"
participant AUTH_SERVICE_MOCK as "AuthService (Mock)"
participant HTTP_CLIENT_MOCK as "supertest (HTTP Mock)"

TEST_RUNNER->>AUTH_CONTROLLER_SPEC: Run Integration Tests
activate AUTH_CONTROLLER_SPEC
AUTH_CONTROLLER_SPEC->>HTTP_CLIENT_MOCK: POST /auth/login
activate HTTP_CLIENT_MOCK
HTTP_CLIENT_MOCK->>AUTH_CONTROLLER_SPEC: Calls AuthController
AUTH_CONTROLLER_SPEC->>AUTH_SERVICE_MOCK: login(email, password)
activate AUTH_SERVICE_MOCK
AUTH_SERVICE_MOCK-->>AUTH_CONTROLLER_SPEC: { accessToken } / Exception
deactivate AUTH_SERVICE_MOCK
AUTH_CONTROLLER_SPEC-->>HTTP_CLIENT_MOCK: HTTP Response (200 / 401)
deactivate HTTP_CLIENT_MOCK
AUTH_CONTROLLER_SPEC-->>TEST_RUNNER: Assertions Pass/Fail
deactivate AUTH_CONTROLLER_SPEC
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | Test Assertion |
| :-------- | :--------------- | :---------- | :------------- |
| Invalid DTO Input | VALIDATION_ERROR | 400 | `expect(response.status).toBe(400)` |
| Invalid Credentials | UNAUTHORIZED | 401 | `expect(response.status).toBe(401)` |
| Server Error | INTERNAL_SERVER_ERROR | 500 | `expect(response.status).toBe(500)` |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Not directly tested; focus is on API logic.
*   **Authentication (JWT Verification Process)**: Tests verify that the correct JWT is generated, but not its validity via a separate verification flow.
*   **Log Event Naming and Field Standards**: N/A, tests focus on functional output.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `AuthService` is mocked to return a valid user and match password
*   ✅ When `AuthService.login` is called with correct credentials
*   ✅ Then it returns an access token.
*   ✅ Given `AuthService` is mocked to not find a user or mismatch password
*   ✅ When `AuthService.login` is called
*   ✅ Then it throws an `UnauthorizedException`.
*   ✅ Given `AuthController` receives a `POST /auth/login` request with valid credentials
*   ✅ When the request is processed
*   ✅ Then the response is `200 OK` with an access token.
*   ✅ Given `AuthController` receives a `POST /auth/login` request with invalid DTO data
*   ✅ When the request is processed
*   ✅ Then the response is `400 Bad Request`.
*   ✅ Given `AuthController` receives a `POST /auth/login` request with incorrect credentials
*   ✅ When the request is processed
*   ✅ Then the response is `401 Unauthorized`.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Unit tests focus on service logic, integration tests on controller/API boundary. |
| Independence | ✅ | Tests are self-contained and don't rely on external state. |
| Testability | ✅ | Dependencies are mocked or stubbed. |
| Small Subset Testing | ✅ | Each test case targets a specific scenario. |

### 🔹 **Code Location**

```
apps/backend/src/auth/auth.service.spec.ts
apps/backend/src/auth/auth.controller.spec.ts
```

### 🔹 **Additional Tags**

*   **New Requirement**: Added
*   **Requirement to be Clarified**: N/A

---

## **Task-ID**: TASK-SYS-CORE-AUTH-02-04

**Related Epic**: EPIC-001 User Registration & Login

**Related Story**: EPIC-001-S2 User Login

**Source SYS-ID**: SYS-CORE-AUTH-02

**Related UX-ID:** UX-002

**Task Name**: FE: Create Login Page & Form Component

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-SETUP-01

**DECISION-REF**: DECISION-001 (Password validation only by length, not complexity)

### **Coverage**:

- UI/Components: Login page (`/login`), reusable form component (`LoginForm`).
- Input Validation: Client-side validation for email format and password presence.
- Accessibility: ARIA labels for form inputs.
- Internationalization: English text labels for inputs, buttons, and error messages.
- Mobile Adaptation: Responsive design for form elements.
- Page Routing: Accessible via `/login` route.
- Interaction Logic: Displays input fields for email and password, a "Login" button, and a link to the registration page.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Component Props)**: N/A (form state managed internally or via hook)
    *   **Output (Form Data)**: `{ email: string, password: string }`
        ```typescript
        // Data submitted from form
        interface LoginFormValues {
          email: string; // example: "user@example.com"
          password: string; // example: "StrongPass123"
        }
        ```
*   **Decision point application**: `DECISION-001` influences frontend password validation. The frontend will only enforce `minLength: 8` for the password input field.
*   **Main Function/Class Design**
    *   `LoginPage`: A Next.js page component (`apps/frontend/src/app/(auth)/login/page.tsx`) that acts as the entry point for the login route. It will render the `LoginForm` component.
    *   `LoginForm`: A React component (`apps/frontend/src/components/auth/login-form.tsx`) responsible for rendering the email and password input fields, local client-side validation, and the submit button. It takes an `onSubmit` prop.
*   **Code Location**
    *   Page: `apps/frontend/src/app/(auth)/login/page.tsx`
    *   Component: `apps/frontend/src/components/auth/login-form.tsx`
    *   UI components: `apps/frontend/src/components/common/input.tsx`, `apps/frontend/src/components/common/button.tsx`
*   **Call Chain**
    `User Input` → `LoginForm` (internal state/validation) → `LoginPage` (renders form)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Optimize form rendering, avoid unnecessary re-renders. Client-side validation provides immediate feedback.
    *   **Security**: Implement `type="password"` for password input. Client-side validation is for UX, not a security boundary; server-side validation is paramount.
    *   **Logging**: N/A for this UI-only task.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**
    *   Create `apps/frontend/src/app/(auth)/login/page.tsx` for the `/login` route.
    *   Create `apps/frontend/src/components/auth/login-form.tsx` for the reusable form.
2.  **Triggering Logic (events, buttons, input validation)**
    *   `LoginForm` will use React state or a form library (e.g., React Hook Form) to manage input values (`email`, `password`).
    *   Input fields: `<input type="email" name="email" required />` and `<input type="password" name="password" minLength="8" required />`.
    *   Client-side validation will check:
        *   Email: Basic format validation (e.g., using a regex or HTML5 `type="email"`).
        *   Password: `minLength: 8` (as per `DECISION-001`). Must be non-empty.
    *   The "Login" button will be enabled only when client-side validation passes.
3.  **[Decision hook]**: `DECISION-001` is applied here. The password input will have `minLength="8"` as its primary client-side validation. No other complexity rules (symbols, numbers, uppercase) will be enforced at this stage.
4.  **Interaction with the Backend**: N/A for this task; the form will emit an `onSubmit` event with the validated data, which the `LoginPage` (and `TASK-SYS-CORE-AUTH-02-05`) will handle.
5.  **UI Success/Failure Feedback and State Recovery**: N/A for this task; only form rendering and basic client-side validation. Error messages for client-side validation will appear next to the invalid input fields.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | User Input | Email and password entered by the user. |
| Write | Component State | Internal state updates as user types. |
| Cache | N/A | No caching. |
| Audit | N/A | N/A. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant LOGIN_PAGE as "login/page.tsx"
participant LOGIN_FORM as "login-form.tsx"
participant INPUT_EMAIL as "Input Component (Email)"
participant INPUT_PASSWORD as "Input Component (Password)"

USER->>LOGIN_PAGE: Navigates to /login
activate LOGIN_PAGE
LOGIN_PAGE->>LOGIN_FORM: Renders LoginForm
activate LOGIN_FORM
LOGIN_FORM->>INPUT_EMAIL: Renders Email Input
LOGIN_FORM->>INPUT_PASSWORD: Renders Password Input
USER->>INPUT_EMAIL: Types email
INPUT_EMAIL-->>LOGIN_FORM: onChange (update state)
USER->>INPUT_PASSWORD: Types password
INPUT_PASSWORD-->>LOGIN_FORM: onChange (update state)
LOGIN_FORM->>LOGIN_FORM: Client-side validation (email format, password minLength)
alt Validation Passes
  USER->>LOGIN_FORM: Clicks "Login" button
  LOGIN_FORM-->>LOGIN_PAGE: onSubmit event (form data)
else Validation Fails
  LOGIN_FORM-->>USER: Display validation errors
end
deactivate LOGIN_FORM
deactivate LOGIN_PAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :--------------- | :---------- | :---------- |
| Invalid Email Format | CLIENT_VALIDATION | N/A | Please enter a valid email address. |
| Missing Password | CLIENT_VALIDATION | N/A | Password is required. |
| Password Too Short | CLIENT_VALIDATION | N/A | Password must be at least 8 characters. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Handled by frontend deployment (Next.js on Vercel/Node).
*   **Authentication (JWT Verification Process)**: N/A, UI only.
*   **Log Event Naming and Field Standards**: N/A, UI only.
*   **Metric Naming**: N/A, UI only.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `/login` route is accessed
*   ✅ When the page loads
*   ✅ Then a form with email and password input fields and a Login button is displayed.
*   ✅ Given the email field is invalid (e.g., missing '@')
*   ✅ When the user tries to submit the form
*   ✅ Then a client-side validation error for email is shown.
*   ✅ Given the password field is less than 8 characters (e.g., "short")
*   ✅ When the user tries to submit the form
*   ✅ Then a client-side validation error for password length is shown.
*   ✅ Given both email and password fields are valid
*   ✅ When the user clicks "Login"
*   ✅ Then the `onSubmit` event is triggered with the form data.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | `LoginPage` handles routing, `LoginForm` handles form rendering and client validation. |
| Independence | ✅ | Components are reusable and can be tested in isolation. |
| Testability | ✅ | Components can be rendered and tested with testing libraries (e.g., React Testing Library). |
| Small Subset Testing | ✅ | Each input field's validation can be tested individually. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(auth)/login/page.tsx
apps/frontend/src/components/auth/login-form.tsx
apps/frontend/src/components/common/input.tsx
apps/frontend/src/components/common/button.tsx
```

### 🔹 **Additional Tags**

*   **New Requirement**: Added
*   **Requirement to be Clarified**: N/A

---

## **Task-ID**: TASK-SYS-CORE-AUTH-02-05

**Related Epic**: EPIC-001 User Registration & Login

**Related Story**: EPIC-001-S2 User Login

**Source SYS-ID**: SYS-CORE-AUTH-02

**Related UX-ID:** UX-002

**Task Name**: FE: Implement Login API Client & Auth State Mgt

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-AUTH-02-01, TASK-SYS-CORE-AUTH-02-04

**DECISION-REF**: —

### **Coverage**:

- API Client: Method for `POST /auth/login`, handling success/error responses.
- Auth State Management: Storing JWT, updating global authentication state, user redirection.
- UI Feedback: Displaying backend error messages, managing loading states.
- Error Handling: Catching API errors and presenting user-friendly messages.
- Performance: Asynchronous API calls, minimal state updates.
- Security: Storing JWT in `localStorage` (for MVP, with awareness of `httpOnly` cookie alternatives).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (API Client Method)**: `login(email: string, password: string)`
    *   **Output (API Client Method)**: `Promise<{ accessToken: string }>` or `Promise.reject(Error)`
    *   **Input (Auth Store)**: `accessToken: string`, `user: UserProfile` (optional, after getting profile)
    *   **Output (Auth Store)**: Updated global state
*   **Decision point application**: No direct `DECISION-REF` applies.
*   **Main Function/Class Design**
    *   `AuthService` (Frontend): A singleton or class (`apps/frontend/src/services/auth.service.ts`) responsible for making API calls to the backend authentication endpoints.
    *   `useAuthStore`: A Zustand store/hook (`apps/frontend/src/store/auth.store.ts`) for managing global authentication state (e.g., `isLoggedIn`, `accessToken`, `user`).
    *   `LoginPage` (`apps/frontend/src/app/(auth)/login/page.tsx`): Integrates the `LoginForm`, calls `AuthService.login`, and uses `useAuthStore` to update state and handle redirection.
*   **Code Location**
    *   API Client: `apps/frontend/src/services/auth.service.ts`
    *   Auth Store: `apps/frontend/src/store/auth.store.ts`
    *   Page Logic: `apps/frontend/src/app/(auth)/login/page.tsx`
*   **Call Chain**
    `LoginForm (onSubmit)` → `LoginPage` → `AuthService (frontend) -> API Client (Axios)` → `Backend API (/auth/login)` → `AuthService (frontend)` → `useAuthStore` → `Next.js Router`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use `async/await` for non-blocking API calls. Batch state updates if necessary.
    *   **Security**: Store `accessToken` in `localStorage` for simplicity in MVP. *Acknowledge that `httpOnly` cookies are generally more secure against XSS for JWTs, but complicate CSRF handling.* Implement token refresh mechanism (out of scope for this specific task, but important for NFRs).
    *   **Logging**: Log API call requests and responses (status, duration) to browser console during development, and potentially to a client-side logging service in production for debugging (e.g., Sentry).

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Triggering Logic (events, buttons, input validation)**
    *   The `onSubmit` event from `LoginForm` will trigger the login logic in `LoginPage`.
2.  **Interaction with the Backend (interfaces, parameters, state flow)**
    *   **API Client (`auth.service.ts`)**:
        *   Define an `async login(email: string, password: string)` method.
        *   Use `axios` (or similar HTTP client) to send a `POST` request to `/api/v1/auth/login` with the `email` and `password` in the body.
        *   Handle successful `200 OK` response: Extract `accessToken` from the response body.
        *   Handle error responses (e.g., `401 Unauthorized`, `400 Bad Request`): Throw a custom error or return specific error data to the caller.
    *   **Login Page (`login/page.tsx`)**:
        *   Import `AuthService` and `useAuthStore`.
        *   Implement the `handleSubmit` function for the `LoginForm`.
        *   Set a `loading` state to disable the form during API call.
        *   Call `AuthService.login(email, password)`:
            *   On success: Call `authStore.setAccessToken(accessToken)`. Use `next/navigation` to `router.push('/dashboard')` (or home page).
            *   On failure: Update a local `errorMessage` state to display to the user.
3.  **UI Success/Failure Feedback and State Recovery**
    *   **Loading State**: Display a loading spinner or disable the submit button while the API call is in progress.
    *   **Success**: Clear any error messages, redirect the user.
    *   **Failure**: Display the `errorMessage` (e.g., "Invalid email or password.") to the user in a prominent alert or toast notification.
    *   **Auth Store (`auth.store.ts`)**:
        *   Define state: `accessToken: string | null`, `isLoggedIn: boolean`.
        *   Actions: `setAccessToken(token: string)`, `logout()`.
        *   `setAccessToken` should update both `accessToken` and `isLoggedIn` and persist the token to `localStorage`.
        *   `logout` should clear the token from state and `localStorage`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `LoginForm` data | User's `email` and `password`. |
| Write | `localStorage` | Stores `accessToken` for persistence across sessions. |
| Write | `useAuthStore` | Updates global `accessToken` and `isLoggedIn` state. |
| Write | `router.push()` | Navigates the user to a new page. |
| Read | Backend API Response | Fetches `accessToken` or error details. |
| Audit | Client-side console | Logs API request/response for debugging. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant LOGIN_PAGE as "login/page.tsx"
participant LOGIN_FORM as "login-form.tsx"
participant AUTH_SERVICE_FE as "auth.service.ts (FE)"
participant API_CLIENT_AXIOS as "Axios HTTP Client"
participant BACKEND_API as "Backend API (/auth/login)"
participant AUTH_STORE as "auth.store.ts (Zustand)"
participant ROUTER as "Next.js Router"

LOGIN_FORM-->>LOGIN_PAGE: onSubmit({email, password})
activate LOGIN_PAGE
LOGIN_PAGE->>AUTH_SERVICE_FE: login(email, password)
activate AUTH_SERVICE_FE
AUTH_SERVICE_FE->>API_CLIENT_AXIOS: POST /api/v1/auth/login
activate API_CLIENT_AXIOS
API_CLIENT_AXIOS->>BACKEND_API: HTTP Request (LoginDto)
activate BACKEND_API
BACKEND_API-->>API_CLIENT_AXIOS: HTTP Response (200 OK / 401 Unauthorized)
deactivate BACKEND_API
API_CLIENT_AXIOS-->>AUTH_SERVICE_FE: { accessToken } or error
deactivate API_CLIENT_AXIOS
alt Login Successful
  AUTH_SERVICE_FE-->>LOGIN_PAGE: { accessToken }
  deactivate AUTH_SERVICE_FE
  LOGIN_PAGE->>AUTH_STORE: setAccessToken(token)
  activate AUTH_STORE
  AUTH_STORE->>localStorage: Save token
  localStorage-->>AUTH_STORE: Token saved confirmation
  AUTH_STORE-->>LOGIN_PAGE: State updated
  deactivate AUTH_STORE
  LOGIN_PAGE->>ROUTER: push('/dashboard')
  deactivate LOGIN_PAGE
else Login Failed
  AUTH_SERVICE_FE-->>LOGIN_PAGE: Error object
  deactivate AUTH_SERVICE_FE
  LOGIN_PAGE-->>LOGIN_PAGE: Set errorMessage state
  LOGIN_PAGE-->>LOGIN_FORM: Display error to user
  deactivate LOGIN_PAGE
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :--------------- | :---------- | :---------- |
| Invalid Credentials | UNAUTHORIZED | 401 | Invalid email or password. |
| Backend Validation | VALIDATION_ERROR | 400 | Please check your input and try again. |
| Network Error | NETWORK_ERROR | N/A | Could not connect to the server. Please try again. |
| Server Error | INTERNAL_SERVER_ERROR | 500 | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Frontend makes requests over HTTPS (SYS-INFRA-SEC-01).
*   **Authentication (JWT Verification Process)**: The frontend stores and sends the JWT; backend (`SYS-INFRA-AUTH-01`) is responsible for verification.
*   **Log Event Naming and Field Standards**: Client-side logs for API requests/responses (e.g., using `console.debug` or a logger service like Sentry) - `frontend.auth.login.request`, `frontend.auth.login.success`, `frontend.auth.login.failed`.
*   **Metric Naming**: `frontend_login_attempts_total`, `frontend_login_success_total`, `frontend_login_failed_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given valid login credentials are submitted from the form
*   ✅ When `AuthService.login` is called successfully
*   ✅ Then the `accessToken` is stored in `localStorage` and `useAuthStore`.
*   ✅ And the user is redirected to the `/dashboard` page.
*   ✅ Given invalid login credentials are submitted from the form
*   ✅ When `AuthService.login` returns an error
*   ✅ Then an appropriate error message is displayed on the login page.
*   ✅ Given the network is unavailable during login
*   ✅ When `AuthService.login` is called
*   ✅ Then a network error message is displayed, and the form remains active.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | API client handles HTTP calls; auth store handles global state; page orchestrates. |
| Independence | ✅ | API client and auth store are decoupled from UI components. |
| Testability | ✅ | API client can be mocked for page tests; store can be tested in isolation. |
| Small Subset Testing | ✅ | Each part (API call, state update, redirection) can be tested separately. |

### 🔹 **Code Location**

```
apps/frontend/src/services/auth.service.ts
apps/frontend/src/store/auth.store.ts
apps/frontend/src/app/(auth)/login/page.tsx
```

### 🔹 **Additional Tags**

*   **New Requirement**: Added
*   **Requirement to be Clarified**: N/A

<!-- impl-batch:TASK-SYS-CORE-WORKOUT-01-01::SYS-CORE-WORKOUT-01::UX-004::TASK-SYS-CORE-WORKOUT-01-02::SYS-CORE-WORKOUT-01::UX-004::TASK-SYS-CORE-WORKOUT-01-03::SYS-CORE-WORKOUT-01::UX-004::TASK-SYS-CORE-WORKOUT-01-04::SYS-CORE-WORKOUT-01::UX-004::TASK-SYS-CORE-EXERCISE-01-01::SYS-CORE-EXERCISE-01::UX-005 -->

## **Task-ID**: TASK-SYS-CORE-WORKOUT-01-01

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S1 Initiate New Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-01 Initiate Workout Session

**Related UX-ID:** UX-004 Start Workout Session

**Related UI-ID:** UI-019 Dashboard (implicit button)

**Task Name**: BE: Implement POST /workouts Controller

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-AUTH-01 (Auth Guard)

**DECISION-REF**: Not Applicable

### 🔹 **Coverage**:

*   **Input Validation**: `startTime` is optional (`Date` format), `userId` derived from JWT.
*   **Exceptions**: Unauthorized (401), Internal Server Error (500), Bad Request (400) for invalid `startTime`.
*   **API/Protocol**: `POST /api/v1/workouts`
*   **Database Changes**: Not Covered (handled by service layer)
*   **UI/Components**: Not Covered
*   **Interaction Logic**: Controller receives request, validates DTO, calls `WorkoutService.startSession`, returns `WorkoutSession` object.
*   **Business Boundary Condition**: `startTime` must be a valid date-time.
*   **Observability**: Log controller entry, exit, and any exceptions.
*   **Performance Considerations**: Controller overhead minimal, focus on service performance.
*   **Non-Functional**: Internationalization for error messages (via exception filter).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`CreateWorkoutSessionDto`)**:
        ```typescript
        // apps/backend/src/workouts/dto/create-workout-session.dto.ts
        import { IsOptional, IsDateString } from 'class-validator';

        export class CreateWorkoutSessionDto {
          @IsOptional()
          @IsDateString()
          startTime?: string; // e.g., "2023-10-27T10:00:00Z"
        }
        ```
    *   **Output (`WorkoutSession` representation)**:
        ```typescript
        // packages/shared-types/src/workout.types.ts
        export interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string; // ISO Date String
          endTime: string | null; // ISO Date String or null
          createdAt: string;
          updatedAt: string;
        }
        ```
*   **Main Function/Class Design**
    *   `WorkoutsController`: Handles the `POST /workouts` route. Injects `WorkoutsService`.
    *   `AuthGuard` (`JwtAuthGuard`): Protects the route, ensuring only authenticated users can access. Extracts `userId` from JWT.
*   **Code Location**
    *   Controller: `apps/backend/src/workouts/workouts.controller.ts`
    *   DTO: `apps/backend/src/workouts/dto/create-workout-session.dto.ts`
    *   Shared Type: `packages/shared-types/src/workout.types.ts`
*   **Call Chain**
    `Frontend` → `POST /workouts` → `WorkoutsController` → `WorkoutsService.startSession` → `PrismaClient`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `class-validator` for DTO validation is efficient.
    *   **Security**: `AuthGuard` ensures authenticated access. `userId` is obtained securely from the JWT payload, not from the request body.
    *   **Logging**: Use `LoggerService` to log incoming request, DTO validation status, and success/failure of the controller action.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   A `WorkoutsController` method `startSession` is decorated with `@Post('/')` and `@UseGuards(JwtAuthGuard)`.
    *   The `CreateWorkoutSessionDto` is injected into the method, automatically validated by NestJS `ValidationPipe`.
    *   The authenticated user's ID is retrieved from the `Request` object using `@Req() req` or a custom decorator (e.g., `@GetUser('id')`).
2.  **Business Logic (Service Method Call)**:
    *   The controller calls `this.workoutsService.startSession(userId, createWorkoutSessionDto)`.
3.  **Error and Exception Handling**:
    *   `ValidationPipe` handles `400 BadRequest` for invalid DTO input.
    *   `JwtAuthGuard` handles `401 Unauthorized`.
    *   Any other service-level errors will be caught by the global exception filter and mapped to appropriate HTTP status codes (e.g., `500 Internal Server Error`).
4.  **Logging and Metrics**:
    *   `WorkoutsController` logs the start and end of the `startSession` method call, including `userId` and `dto` details (excluding sensitive data).

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                 |
| ----- | ----------------- | ------------------------------------------- |
| Read  | JWT Payload       | `userId` from authenticated user            |
| Write | N/A               | Controller does not write directly, delegates |
| Cache | N/A               | No caching at controller level              |
| Audit | Log Event         | `workout_start_request`, `workout_start_success`, `workout_start_failure` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Frontend (UX-004)"
participant CONTROLLER as "workouts.controller.ts"
participant AUTHGUARD as "JwtAuthGuard"
participant SERVICE as "workouts.service.ts"
participant LOGGING as "logging.service.ts"

CLIENT->>CONTROLLER: POST /api/v1/workouts
activate CONTROLLER
CONTROLLER->>AUTHGUARD: Apply JwtAuthGuard
activate AUTHGUARD
AUTHGUARD->>CONTROLLER: User authenticated, userId extracted
deactivate AUTHGUARD
CONTROLLER->>LOGGING: Log request received
CONTROLLER->>SERVICE: startSession(userId, dto)
activate SERVICE
SERVICE-->>CONTROLLER: New workout session
deactivate SERVICE
CONTROLLER->>LOGGING: Log success
CONTROLLER-->>CLIENT: 201 Created (WorkoutSession)
deactivate CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                               |
| ------------------------ | ----------------- | ----------- | ----------------------------------------- |
| Invalid `startTime` format | VALIDATION_FAILED | 400         | Invalid date/time format for start time.  |
| Missing/Invalid JWT      | UNAUTHORIZED      | 401         | Authentication required.                  |
| Server-side error        | INTERNAL_ERROR    | 500         | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Assumed HTTPS/TLS enforced at API Gateway/Load Balancer level.
*   **Authentication**: `JwtAuthGuard` validates the JWT token provided in the `Authorization` header, ensuring `userId` is valid and non-tampered.
*   **Log Event Naming and Field Standards**:
    *   `event: workout_start_request`, `level: info`, `userId: {id}`, `payload: {startTime}`
    *   `event: workout_start_success`, `level: info`, `userId: {id}`, `sessionId: {id}`
    *   `event: workout_start_failure`, `level: error`, `userId: {id}`, `error: {message}`
*   **Metric Naming**: `workouts_started_total`, `workouts_start_duration_seconds`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ **Given** an authenticated user
*   ✅ **When** a POST request is sent to `/workouts` with a valid `startTime` (or no `startTime`)
*   ✅ **Then** a 201 Created response is returned with the new workout session details, and a new `WorkoutSession` record is created in the database (verified by `WorkoutsService` unit tests).

*   ✅ **Given** an unauthenticated user
*   ✅ **When** a POST request is sent to `/workouts`
*   ✅ **Then** a 401 Unauthorized response is returned.

*   ✅ **Given** an authenticated user
*   ✅ **When** a POST request is sent to `/workouts` with an invalid `startTime` format
*   ✅ **Then** a 400 Bad Request response is returned.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                       |
| ------------------ | ------------ | ------------------------------------------------- |
| Single Responsibility | ✅           | Controller only handles HTTP request/response and delegates to service. |
| Independence       | ✅           | Can be tested independently with mocks for service. |
| Testability        | ✅           | Easily mockable dependencies for unit testing.    |
| Small Subset Testing | ✅           | Focuses only on request handling and DTO validation. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
apps/backend/src/workouts/dto/create-workout-session.dto.ts
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-01-02

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S1 Initiate New Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-01 Initiate Workout Session

**Related UX-ID:** UX-004 Start Workout Session

**Related UI-ID:** UI-019 Dashboard (implicit button)

**Task Name**: BE: Implement WorkoutService.startSession

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-DB-01 (Prisma setup)

**DECISION-REF**: DECISION-003 (Not Applicable - client-side concern only for discarding unsaved workouts)

### 🔹 **Coverage**:

*   **Input Validation**: `userId` must be present, `startTime` is optional (`Date` format, defaults to `new Date()`).
*   **Exceptions**: `NotFoundError` if `userId` is invalid (though checked by auth guard, defensive check), `InternalServerError` for database issues.
*   **API/Protocol**: Service method call, no direct HTTP.
*   **Database Changes**: Creates a new `WorkoutSession` record.
*   **UI/Components**: Not Covered
*   **Interaction Logic**: Service receives `userId` and DTO, constructs data, interacts with Prisma, returns created `WorkoutSession`.
*   **Business Boundary Condition**: `startTime` defaults to current timestamp if not provided.
*   **Observability**: Detailed logging of database operations, potential errors.
*   **Performance Considerations**: Database insert operation performance.
*   **Non-Functional**: Internationalization not directly in service, but error messages passed to global handler.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`userId: string`, `createWorkoutSessionDto: CreateWorkoutSessionDto`)**:
        ```typescript
        // From Task-SYS-CORE-WORKOUT-01-01
        // userId example: "cln0f7q1u0000abc123def456"
        // createWorkoutSessionDto example: { startTime: "2023-10-27T10:00:00Z" } or {}
        ```
    *   **Output (`WorkoutSession` object)**:
        ```typescript
        // packages/shared-types/src/workout.types.ts
        export interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string; // ISO Date String
          endTime: string | null; // ISO Date String or null
          createdAt: string;
          updatedAt: string;
        }
        ```
*   **Main Function/Class Design**
    *   `WorkoutsService`: Contains the `startSession` method. Injects `PrismaService` for database access and `LoggerService` for logging.
    *   `PrismaService`: Wrapper around `PrismaClient` for consistent database interactions.
*   **Code Location**
    *   Service: `apps/backend/src/workouts/workouts.service.ts`
    *   Prisma Schema: `apps/backend/src/prisma/schema.prisma`
*   **Call Chain**
    `WorkoutsController` → `WorkoutsService.startSession` → `PrismaClient.workoutSession.create`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Prisma's `create` operation is optimized. Index on `userId, startTime` in `WorkoutSession` model supports future queries but not direct creation.
    *   **Security**: `userId` is trusted from the `AuthGuard` in the controller. No direct user input is used for `userId` here.
    *   **Logging**: Log the database transaction (attempt, success, failure) with contextual `userId` and `startTime`.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Business Logic (Service Methods)**:
    *   The `startSession` method receives `userId` and `createWorkoutSessionDto`.
    *   It determines the `startTime`: if `createWorkoutSessionDto.startTime` is provided, parse it; otherwise, use `new Date()`.
    *   It calls `this.prisma.workoutSession.create()` to create a new `WorkoutSession` record.
    *   The `data` object for Prisma will include `userId` and the determined `startTime`.
2.  **Data Access (Prisma Models and Query Methods)**:
    *   Uses `prisma.workoutSession.create({ data: { userId, startTime } })`.
    *   The `WorkoutSession` model's default `id` (`cuid()`) and `createdAt`, `updatedAt` (`now()`, `@updatedAt`) are automatically handled by Prisma.
3.  **Error and Exception Handling**:
    *   Catch any potential `PrismaClientKnownRequestError` (e.g., if a foreign key constraint on `userId` somehow failed, though unlikely with proper auth flow) or other generic errors.
    *   Map these to application-specific exceptions (e.g., `InternalServerErrorException`) for consistent handling by the global exception filter.
4.  **Logging and Metrics**:
    *   Log `event: workout_session_creation_attempt`, `userId: {id}`, `requestedStartTime: {time}`.
    *   Log `event: workout_session_created`, `userId: {id}`, `sessionId: {id}`, `actualStartTime: {time}`.
    *   Log `event: workout_session_creation_failed`, `userId: {id}`, `error: {message}`.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target      | Description                         |
| ----- | ---------------------- | ----------------------------------- |
| Read  | N/A                    | N/A                                 |
| Write | `WorkoutSession` Table | New row inserted with `userId`, `startTime`. |
| Cache | N/A                    | No caching at service level           |
| Audit | Log Event              | `workout_session_created`, `workout_session_creation_failed` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CONTROLLER as "workouts.controller.ts"
participant SERVICE as "workouts.service.ts"
participant PRISMA as "PrismaService"
participant DB as "PostgreSQL Database"
participant LOGGING as "logging.service.ts"

CONTROLLER->>SERVICE: startSession(userId, dto)
activate SERVICE
SERVICE->>LOGGING: Log creation attempt
alt startTime provided
SERVICE->>SERVICE: Parse startTime from DTO
else startTime not provided
SERVICE->>SERVICE: Use current timestamp as startTime
end
SERVICE->>PRISMA: workoutSession.create({data})
activate PRISMA
PRISMA->>DB: INSERT into WorkoutSession
activate DB
DB-->>PRISMA: Return new WorkoutSession record
deactivate DB
PRISMA-->>SERVICE: New WorkoutSession object
deactivate PRISMA
SERVICE->>LOGGING: Log creation success
SERVICE-->>CONTROLLER: New WorkoutSession object
deactivate SERVICE
```

### 🔹 **Error and Exception Mapping**

| Scenario               | Error Code        | HTTP Status | User Prompt                               |
| ---------------------- | ----------------- | ----------- | ----------------------------------------- |
| Database insertion error | DB_INSERT_FAILED  | 500         | Failed to start workout session due to a database error. |
| Unexpected error       | INTERNAL_ERROR    | 500         | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Covered at controller/gateway level.
*   **Authentication**: `userId` passed from the authenticated context (JWT) is used directly for database insertion, preventing unauthorized session creation for other users.
*   **Log Event Naming and Field Standards**:
    *   `event: workout_session_creation_attempt`, `level: debug`, `userId: {id}`, `requestedStartTime: {time}`
    *   `event: workout_session_created`, `level: info`, `userId: {id}`, `sessionId: {id}`, `actualStartTime: {time}`
    *   `event: workout_session_creation_failed`, `level: error`, `userId: {id}`, `error: {message}`
*   **Metric Naming**: `workouts_service_start_session_duration_seconds`, `workouts_service_start_session_errors_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ **Given** a valid `userId` and no `startTime` in DTO
*   ✅ **When** `WorkoutsService.startSession` is called
*   ✅ **Then** a new `WorkoutSession` record is created in the database with `startTime` set to the current timestamp.

*   ✅ **Given** a valid `userId` and a specific `startTime` in DTO
*   ✅ **When** `WorkoutsService.startSession` is called
*   ✅ **Then** a new `WorkoutSession` record is created in the database with the provided `startTime`.

*   ✅ **Given** a valid `userId`
*   ✅ **When** `WorkoutsService.startSession` fails due to a database error
*   ✅ **Then** an `InternalServerErrorException` is thrown, and the failure is logged.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                       |
| ------------------ | ------------ | ------------------------------------------------- |
| Single Responsibility | ✅           | Service handles business logic and delegates data persistence to Prisma. |
| Independence       | ✅           | Can be tested independently with mocks for Prisma. |
| Testability        | ✅           | Easily mockable dependencies for unit testing.    |
| Small Subset Testing | ✅           | Focuses only on creating the workout session record. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/prisma/schema.prisma
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-01-03

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S1 Initiate New Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-01 Initiate Workout Session

**Related UX-ID:** UX-004 Start Workout Session

**Related UI-ID:** UI-019 Dashboard (implicit button)

**Task Name**: BE: Unit/Integration Tests for Start Session

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-01-01, TASK-SYS-CORE-WORKOUT-01-02

**DECISION-REF**: Not Applicable

### 🔹 **Coverage**:

*   **Input Validation**: Test DTO validation for `CreateWorkoutSessionDto`.
*   **Exceptions**: Test 401 Unauthorized for missing/invalid JWT, 400 Bad Request for invalid `startTime`, 500 for service/DB errors.
*   **API/Protocol**: Test `POST /workouts` endpoint using `supertest`.
*   **Database Changes**: Mock Prisma operations.
*   **UI/Components**: Not Covered
*   **Interaction Logic**: Verify controller correctly calls service, and service correctly interacts with Prisma. Verify proper error responses.
*   **Business Boundary Condition**: Test `startTime` default behavior (current timestamp).
*   **Observability**: Verify logs are generated during test execution (e.g., mock `LoggerService`).
*   **Performance Considerations**: Not applicable to testing itself, but tests should be fast.
*   **Non-Functional**: Ensure test coverage for security (auth guard) and error handling.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Test Data**: Mock `userId`, `CreateWorkoutSessionDto` (valid and invalid), expected `WorkoutSession` output.
    *   **Auth Token**: Mock JWT token for authenticated requests.
*   **Main Function/Class Design**
    *   **Unit Tests (`workouts.service.spec.ts`)**: Use `jest.mock` for `PrismaService` and `LoggerService`. Test `WorkoutsService.startSession` in isolation.
    *   **Integration Tests (`workouts.controller.spec.ts`)**: Use NestJS `Test.createTestingModule` to set up a partial application context. Mock `WorkoutsService` to control its behavior. Use `supertest` to make actual HTTP requests to the controller.
*   **Code Location**
    *   Service Unit Tests: `apps/backend/src/workouts/workouts.service.spec.ts`
    *   Controller Integration Tests: `apps/backend/src/workouts/workouts.controller.spec.ts`
*   **Call Chain**
    *   Unit Test: `Service` -> `Prisma` (mock)
    *   Integration Test: `HTTP Client` -> `Controller` -> `Service` (mock) -> `Prisma` (mock)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use lightweight mocks for `PrismaService` to keep unit tests fast. Integration tests involve more setup but should still be quick.
    *   **Security**: Integration tests explicitly verify `AuthGuard` functionality (e.g., 401 for no token).
    *   **Logging**: Mock `LoggerService` to assert that correct log messages are emitted during various scenarios (success, failure).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (Testing)**

1.  **Unit Tests for `WorkoutsService`**:
    *   **Setup**: Use `Test.createTestingModule` to provide `WorkoutsService` and mock `PrismaService`, `LoggerService`.
    *   **Test Case 1 (Successful creation - no `startTime`)**:
        *   Mock `prisma.workoutSession.create` to return a `WorkoutSession` object.
        *   Call `service.startSession(userId, {})`.
        *   Assert that `prisma.workoutSession.create` was called with `userId` and a `startTime` close to `now()`.
        *   Assert that the returned object matches the mock output.
    *   **Test Case 2 (Successful creation - with `startTime`)**:
        *   Mock `prisma.workoutSession.create` to return a `WorkoutSession` object.
        *   Call `service.startSession(userId, { startTime: '2023-01-01T10:00:00Z' })`.
        *   Assert that `prisma.workoutSession.create` was called with the specified `startTime`.
    *   **Test Case 3 (Database error)**:
        *   Mock `prisma.workoutSession.create` to throw an error.
        *   Assert that `service.startSession` throws an `InternalServerErrorException`.
2.  **Integration Tests for `WorkoutsController`**:
    *   **Setup**: Use `Test.createTestingModule` to provide `WorkoutsController` and mock `WorkoutsService` (to control its return values and verify calls) and `AuthGuard` (to mock authentication success/failure). Create an `app` instance using `app.createNestApplication()`.
    *   **Test Case 1 (Successful POST)**:
        *   Mock `AuthGuard` to allow the request (e.g., by setting `req.user.id`).
        *   Mock `workoutsService.startSession` to return a mock `WorkoutSession`.
        *   Use `supertest` to send `POST /workouts` with a valid body.
        *   Assert `statusCode` is 201 and `body` matches the mock `WorkoutSession`.
        *   Assert `workoutsService.startSession` was called with correct parameters.
    *   **Test Case 2 (Unauthorized access)**:
        *   Do not provide an auth token or mock `AuthGuard` to throw `UnauthorizedException`.
        *   Use `supertest` to send `POST /workouts`.
        *   Assert `statusCode` is 401.
    *   **Test Case 3 (Invalid DTO input)**:
        *   Mock `AuthGuard` to allow the request.
        *   Use `supertest` to send `POST /workouts` with an invalid `startTime` (e.g., `startTime: "not-a-date"`).
        *   Assert `statusCode` is 400 and `body` contains validation error messages.
    *   **Test Case 4 (Service error)**:
        *   Mock `AuthGuard` to allow the request.
        *   Mock `workoutsService.startSession` to throw an `InternalServerErrorException`.
        *   Use `supertest` to send `POST /workouts`.
        *   Assert `statusCode` is 500.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                            |
| ----- | ----------------- | -------------------------------------- |
| Read  | Mocked Service/DB | Tests read from mocked dependencies.   |
| Write | Mocked Service/DB | Tests simulate writes to mocked dependencies. |
| Cache | N/A               | N/A                                    |
| Audit | Mocked Logger     | Assert that specific log events are called. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST_RUNNER as "Test Runner"
participant CONTROLLER_SPEC as "workouts.controller.spec.ts"
participant SERVICE_SPEC as "workouts.service.spec.ts"
participant MOCK_CONTROLLER as "Mocked WorkoutsController"
participant MOCK_SERVICE as "Mocked WorkoutsService"
participant MOCK_PRISMA as "Mocked PrismaService"
participant MOCK_AUTHGUARD as "Mocked JwtAuthGuard"
participant MOCK_LOGGER as "Mocked LoggerService"

TEST_RUNNER->>SERVICE_SPEC: Run unit tests
activate SERVICE_SPEC
SERVICE_SPEC->>MOCK_PRISMA: Mock prisma.workoutSession.create()
SERVICE_SPEC->>MOCK_LOGGER: Mock logger calls
SERVICE_SPEC->>MOCK_SERVICE: Call startSession()
MOCK_SERVICE->>MOCK_PRISMA: Attempts DB write
MOCK_PRISMA-->>MOCK_SERVICE: Returns success/error
MOCK_SERVICE->>MOCK_LOGGER: Logs events
MOCK_SERVICE-->>SERVICE_SPEC: Returns result/throws
SERVICE_SPEC->>TEST_RUNNER: Assertions passed
deactivate SERVICE_SPEC

TEST_RUNNER->>CONTROLLER_SPEC: Run integration tests
activate CONTROLLER_SPEC
CONTROLLER_SPEC->>MOCK_AUTHGUARD: Mock authentication
CONTROLLER_SPEC->>MOCK_SERVICE: Mock service.startSession()
CONTROLLER_SPEC->>MOCK_LOGGER: Mock logger calls
CONTROLLER_SPEC->>MOCK_CONTROLLER: Call POST /workouts via Supertest
MOCK_CONTROLLER->>MOCK_AUTHGUARD: Authenticates request
MOCK_AUTHGUARD-->>MOCK_CONTROLLER: User context (or Unauthorized)
MOCK_CONTROLLER->>MOCK_LOGGER: Logs request
MOCK_CONTROLLER->>MOCK_SERVICE: Calls startSession()
MOCK_SERVICE-->>MOCK_CONTROLLER: Returns result (or throws)
MOCK_CONTROLLER->>MOCK_LOGGER: Logs response
MOCK_CONTROLLER-->>CONTROLLER_SPEC: HTTP Response
CONTROLLER_SPEC->>TEST_RUNNER: Assertions passed
deactivate CONTROLLER_SPEC
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt (Test Assertion)           |
| ------------------------ | ----------------- | ----------- | -------------------------------------- |
| Invalid DTO input        | VALIDATION_FAILED | 400         | Expect `statusCode` 400 and validation errors. |
| Missing/Invalid Auth Token | UNAUTHORIZED      | 401         | Expect `statusCode` 401.               |
| Service/DB failure       | INTERNAL_ERROR    | 500         | Expect `statusCode` 500.               |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Not directly tested, assumed infra level.
*   **Authentication**: Explicitly test scenarios for authenticated and unauthenticated requests to verify `AuthGuard` behavior.
*   **Log Event Naming and Field Standards**: Assertions verify that `MOCK_LOGGER` was called with expected event names and fields in different scenarios (e.g., `workout_start_request`, `workout_start_success`, `workout_start_failure`).
*   **Metric Naming**: Not directly tested, but mock calls could simulate metric emission.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ **Given** `WorkoutsService` with mocked `PrismaService`
*   ✅ **When** `startSession` is called with valid data
*   ✅ **Then** `prisma.workoutSession.create` is called with the correct `userId` and `startTime`, and the created session is returned.

*   ✅ **Given** the `WorkoutsController` setup with mocked `AuthGuard` and `WorkoutsService`
*   ✅ **When** `POST /workouts` is called with a valid `CreateWorkoutSessionDto` and a valid JWT
*   ✅ **Then** the response status is 201, and `workoutsService.startSession` is called.

*   ✅ **Given** the `WorkoutsController` setup
*   ✅ **When** `POST /workouts` is called without a valid JWT
*   ✅ **Then** the response status is 401.

*   ✅ **Given** the `WorkoutsController` setup
*   ✅ **When** `POST /workouts` is called with an invalid `CreateWorkoutSessionDto` (e.g., bad `startTime` format)
*   ✅ **Then** the response status is 400.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                       |
| ------------------ | ------------ | ------------------------------------------------- |
| Single Responsibility | ✅           | Each spec file focuses on testing one component (`Service` or `Controller`). |
| Independence       | ✅           | Tests mock dependencies, making them independent. |
| Testability        | ✅           | Components are designed for easy mocking.         |
| Small Subset Testing | ✅           | Unit tests focus on small method logic, integration tests on single endpoint. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.spec.ts
apps/backend/src/workouts/workouts.controller.spec.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-01-04

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S1 Initiate New Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-01 Initiate Workout Session

**Related UX-ID:** UX-004 Start Workout Session

**Related UI-ID:** UI-019 Dashboard (Start Workout button)

**Task Name**: FE: Implement "Start Workout" Dashboard Logic

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-01-01, TASK-SYS-CORE-AUTH-02-05 (FE: Implement Auth Context/State)

**DECISION-REF**: DECISION-003 (Handling Existing Unsaved Workouts)

### 🔹 **Coverage**:

*   **Input Validation**: Optional `startTime` field validation on the frontend.
*   **Exceptions**: API call errors (network issues, 4xx, 5xx) handled with user feedback.
*   **API/Protocol**: Calls `POST /api/v1/workouts`.
*   **Database Changes**: Not Covered (backend responsibility)
*   **UI/Components**: Dashboard page (`apps/frontend/src/app/(app)/dashboard/page.tsx`), "Start Workout" button (`apps/frontend/src/components/common/Button.tsx`).
*   **Interaction Logic**: User clicks "Start Workout" button → client-side logic to initiate API call → on success, navigate to workout session page; on failure, display error. **Applies DECISION-003 strategy**: any existing unsaved workout state is discarded.
*   **Business Boundary Condition**: `startTime` can be for now or a past date.
*   **Observability**: Frontend error logging for API failures.
*   **Performance Considerations**: Responsive UI, loading states, minimal API latency.
*   **Non-Functional**: Internationalization (button text, error messages), Accessibility (button ARIA labels), Mobile adaptation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Frontend Request (`CreateWorkoutSessionPayload`)**:
        ```typescript
        // packages/shared-types/src/workout.types.ts
        export interface CreateWorkoutSessionPayload {
          startTime?: string; // Optional, ISO date string
        }
        ```
    *   **Backend Response (`WorkoutSession`)**:
        ```typescript
        // packages/shared-types/src/workout.types.ts
        export interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string;
          endTime: string | null;
          createdAt: string;
          updatedAt: string;
        }
        ```
*   **Main Function/Class Design**
    *   `DashboardPage` component: Renders the "Start Workout" button and handles its click event.
    *   `workout.service.ts` (frontend API client): Contains `startSession(payload)` method that wraps `axios` call to `POST /api/v1/workouts`.
    *   `useWorkout` hook (or global state): Manages the current workout session ID, navigation logic.
*   **Code Location**
    *   Page: `apps/frontend/src/app/(app)/dashboard/page.tsx`
    *   Frontend Service: `apps/frontend/src/services/workout.service.ts`
    *   Shared Types: `packages/shared-types/src/workout.types.ts`
*   **Call Chain**
    `DashboardPage` → `workout.service.ts` (frontend) → `POST /api/v1/workouts` → `WorkoutsController` (backend)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use React's `useState` for loading states to prevent multiple clicks. Implement optimistic UI updates if feasible (not for this task).
    *   **Security**: Ensure API calls include the JWT token (handled by `auth.service.ts` or `axios` interceptor).
    *   **Logging**: Implement client-side error logging (e.g., Sentry) for API call failures.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**:
    *   The "Start Workout" button is located on the `apps/frontend/src/app/(app)/dashboard/page.tsx`.
2.  **Triggering Logic**:
    *   The `onClick` event of the "Start Workout" button triggers an asynchronous handler.
    *   **[Decision hook: DECISION-003]**: Before calling the backend, the frontend will implicitly or explicitly **discard any existing unsaved workout state** (e.g., clearing a local storage item or a global state variable related to an active, uncompleted session). This happens without a prompt, as per the decision.
3.  **Interaction with the Backend**:
    *   Call `workoutService.startSession({})` (or with `startTime` if a date picker is implemented).
    *   Set a loading state (`isLoading: true`) on the button.
    *   Handle `try/catch` block for API call.
    *   On success (`201 Created`):
        *   Update global state with the new `WorkoutSession` ID.
        *   Navigate the user to the `workouts/[id]` page (e.g., `/workouts/{sessionId}`).
    *   On failure (e.g., `401`, `400`, `500`):
        *   Display a user-friendly error message using a toast notification or modal.
        *   Log the error to client-side logging service.
    *   Finally, reset loading state (`isLoading: false`).
4.  **UI Success/Failure Feedback and State Recovery**:
    *   A loading spinner/disabled state on the button during API call.
    *   Success: Redirect to the workout session detail page.
    *   Failure: Display an error message to the user.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                        |
| ------- | ----------------- | -------------------------------------------------- |
| Read    | N/A               | Reads current user context (for auth token)        |
| Write   | Global State      | Store newly created `workoutSession.id`            |
| Write   | Local Storage     | (Implicitly clear) any previously stored "unsaved workout" state |
| Audit   | Console/Sentry Log | Log API call success/failure details               |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant DASHBOARD as "DashboardPage (UI-019)"
participant FE_SVC as "workout.service.ts"
participant API as "POST /api/v1/workouts"
participant BE_CONTROLLER as "WorkoutsController"
participant AUTHGUARD as "JwtAuthGuard"
participant BE_SERVICE as "WorkoutsService"
participant DB as "PostgreSQL Database"
participant GLOBAL_STATE as "Workout Global State"

DASHBOARD->>DASHBOARD: User clicks "Start Workout"
activate DASHBOARD
DASHBOARD->>DASHBOARD: (DECISION-003) Discard any unsaved workout state
DASHBOARD->>FE_SVC: startSession({})
activate FE_SVC
FE_SVC->>API: HTTPS POST /api/v1/workouts
API->>BE_CONTROLLER: Request
activate BE_CONTROLLER
BE_CONTROLLER->>AUTHGUARD: Validate JWT
activate AUTHGUARD
AUTHGUARD-->>BE_CONTROLLER: Token valid, userId
deactivate AUTHGUARD
BE_CONTROLLER->>BE_SERVICE: startSession(userId, {})
activate BE_SERVICE
BE_SERVICE->>DB: INSERT WorkoutSession
activate DB
DB-->>BE_SERVICE: New session data
deactivate DB
BE_SERVICE-->>BE_CONTROLLER: WorkoutSession object
deactivate BE_SERVICE
BE_CONTROLLER-->>API: 201 Created (WorkoutSession)
deactivate BE_CONTROLLER
API-->>FE_SVC: 201 Created (WorkoutSession)
deactivate FE_SVC
FE_SVC-->>DASHBOARD: WorkoutSession object
DASHBOARD->>GLOBAL_STATE: Update activeSessionId
DASHBOARD->>DASHBOARD: Navigate to /workouts/{id}
deactivate DASHBOARD
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                               |
| ------------------------ | ----------------- | ----------- | ----------------------------------------- |
| Network Error            | NETWORK_ERROR     | N/A         | Could not connect to the server. Please check your internet connection. |
| Unauthorized (Expired JWT) | UNAUTHORIZED      | 401         | Your session has expired. Please log in again. |
| Invalid Input (e.g. malformed `startTime` if UI allows) | VALIDATION_FAILED | 400         | Invalid input provided for workout start. |
| Server Error             | INTERNAL_ERROR    | 500         | Failed to start workout. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Frontend always communicates over HTTPS.
*   **Authentication**: JWT token must be included in `Authorization` header for API calls. `axios` interceptors are responsible for this.
*   **Log Event Naming and Field Standards**: Client-side logs for `FE_workout_start_success`, `FE_workout_start_failure`, `FE_API_error`. Include user agent, browser info for context.
*   **Metric Naming**: `FE_workout_start_button_clicks_total`, `FE_workout_start_api_duration_seconds`, `FE_workout_start_api_errors_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ **Given** an authenticated user is on the Dashboard page
*   ✅ **When** the "Start Workout" button is clicked
*   ✅ **Then** any previous unsaved workout state is discarded without a prompt, a loading indicator is shown, and a `POST /api/v1/workouts` request is sent.
*   ✅ **And** if the request is successful, the user is navigated to the new workout session's detail page (`/workouts/{id}`).

*   ✅ **Given** an authenticated user is on the Dashboard page
*   ✅ **When** the "Start Workout" button is clicked and the API returns an error
*   ✅ **Then** a user-friendly error message is displayed, and the loading indicator is removed.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                       |
| ------------------ | ------------ | ------------------------------------------------- |
| Single Responsibility | ✅           | Dashboard page orchestrates UI, `workout.service.ts` handles API, state management handles state. |
| Independence       | ✅           | Components are reusable and API service can be mocked for testing. |
| Testability        | ✅           | Can write unit tests for button click handler, integration tests with mocked API. |
| Small Subset Testing | ✅           | Test button interaction, API call logic, and navigation separately. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(app)/dashboard/page.tsx
apps/frontend/src/services/workout.service.ts
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-EXERCISE-01-01

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S2 Select Exercise from Library

**Source SYS-ID**: SYS-CORE-EXERCISE-01 Exercise Library Search

**Related UX-ID:** UX-005 Exercise Library Search

**Related UI-ID:** UI-012 Exercise Card (implicit search bar)

**Task Name**: BE: Implement GET /exercises Controller

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-AUTH-01 (Auth Guard)

**DECISION-REF**: Not Applicable

### 🔹 **Coverage**:

*   **Input Validation**: Optional `search` query parameter (string).
*   **Exceptions**: Unauthorized (401), Internal Server Error (500), Bad Request (400) for invalid query params.
*   **API/Protocol**: `GET /api/v1/exercises?search={query}`
*   **Database Changes**: Not Covered (handled by service layer)
*   **UI/Components**: Not Covered
*   **Interaction Logic**: Controller receives request, validates query, calls `ExerciseService.searchLibrary`, returns list of `Exercise` objects.
*   **Business Boundary Condition**: Empty `search` query returns all (or paginated) exercises.
*   **Observability**: Log controller entry, exit, and any exceptions.
*   **Performance Considerations**: Controller overhead minimal, focus on service performance for efficient search.
*   **Non-Functional**: Internationalization for error messages (via exception filter).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`GetExercisesQueryDto`)**:
        ```typescript
        // apps/backend/src/exercises/dto/get-exercises-query.dto.ts
        import { IsOptional, IsString } from 'class-validator';

        export class GetExercisesQueryDto {
          @IsOptional()
          @IsString()
          search?: string; // e.g., "bench"
        }
        ```
    *   **Output (`Exercise[]` representation)**:
        ```typescript
        // packages/shared-types/src/exercise.types.ts
        import { ExerciseType } from '@prisma/client'; // Use Prisma's generated enum for consistency

        export interface Exercise {
          id: string;
          name: string;
          type: ExerciseType; // e.g., STRENGTH, CARDIO
          createdBy?: string; // Optional user ID if custom
          createdAt: string;
          updatedAt: string;
        }
        ```
*   **Main Function/Class Design**
    *   `ExercisesController`: Handles the `GET /exercises` route. Injects `ExercisesService`.
    *   `AuthGuard` (`JwtAuthGuard`): Protects the route, ensuring only authenticated users can access.
*   **Code Location**
    *   Controller: `apps/backend/src/exercises/exercises.controller.ts`
    *   DTO: `apps/backend/src/exercises/dto/get-exercises-query.dto.ts`
    *   Shared Type: `packages/shared-types/src/exercise.types.ts`
*   **Call Chain**
    `Frontend` → `GET /exercises` → `ExercisesController` → `ExercisesService.searchLibrary` → `PrismaClient`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: `class-validator` for DTO validation is efficient. Service layer will handle database query optimization (e.g., using indexes).
    *   **Security**: `AuthGuard` ensures authenticated access. No sensitive user input is directly processed beyond the search query.
    *   **Logging**: Use `LoggerService` to log incoming request, query parameters, and success/failure of the controller action.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   An `ExercisesController` method `findAll` (or `search`) is decorated with `@Get('/')` and `@UseGuards(JwtAuthGuard)`.
    *   The `GetExercisesQueryDto` is injected into the method using `@Query()`, automatically validated by NestJS `ValidationPipe`.
2.  **Business Logic (Service Method Call)**:
    *   The controller calls `this.exercisesService.searchLibrary(getExercisesQueryDto.search)`. The `userId` is not directly passed to the service method for searching *predefined* exercises, but could be passed if searching *custom* exercises. For `SYS-CORE-EXERCISE-01`, it's for the general library.
3.  **Error and Exception Handling**:
    *   `ValidationPipe` handles `400 BadRequest` for invalid DTO input (e.g., `search` is not a string).
    *   `JwtAuthGuard` handles `401 Unauthorized`.
    *   Any other service-level errors will be caught by the global exception filter and mapped to appropriate HTTP status codes (e.g., `500 Internal Server Error`).
4.  **Logging and Metrics**:
    *   `ExercisesController` logs the start and end of the `searchLibrary` method call, including `search` query.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                                 |
| ----- | ----------------- | ------------------------------------------- |
| Read  | JWT Payload       | `userId` for authentication                 |
| Write | N/A               | Controller does not write directly, delegates |
| Cache | N/A               | No caching at controller level              |
| Audit | Log Event         | `exercise_search_request`, `exercise_search_success`, `exercise_search_failure` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Frontend (UX-005)"
participant CONTROLLER as "exercises.controller.ts"
participant AUTHGUARD as "JwtAuthGuard"
participant SERVICE as "exercises.service.ts"
participant LOGGING as "logging.service.ts"

CLIENT->>CONTROLLER: GET /api/v1/exercises?search=query
activate CONTROLLER
CONTROLLER->>AUTHGUARD: Apply JwtAuthGuard
activate AUTHGUARD
AUTHGUARD-->>CONTROLLER: User authenticated
deactivate AUTHGUARD
CONTROLLER->>LOGGING: Log request received
CONTROLLER->>SERVICE: searchLibrary(searchQuery)
activate SERVICE
SERVICE-->>CONTROLLER: List of Exercises
deactivate SERVICE
CONTROLLER->>LOGGING: Log success
CONTROLLER-->>CLIENT: 200 OK (Exercise[])
deactivate CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code        | HTTP Status | User Prompt                               |
| ------------------------ | ----------------- | ----------- | ----------------------------------------- |
| Invalid `search` parameter | VALIDATION_FAILED | 400         | Invalid search query.                     |
| Missing/Invalid JWT      | UNAUTHORIZED      | 401         | Authentication required.                  |
| Server-side error        | INTERNAL_ERROR    | 500         | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Assumed HTTPS/TLS enforced at API Gateway/Load Balancer level.
*   **Authentication**: `JwtAuthGuard` validates the JWT token, ensuring only authenticated users can query the exercise library.
*   **Log Event Naming and Field Standards**:
    *   `event: exercise_search_request`, `level: info`, `userId: {id}`, `query: {search}`
    *   `event: exercise_search_success`, `level: info`, `userId: {id}`, `query: {search}`, `resultCount: {count}`
    *   `event: exercise_search_failure`, `level: error`, `userId: {id}`, `query: {search}`, `error: {message}`
*   **Metric Naming**: `exercise_searches_total`, `exercise_search_duration_seconds`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ **Given** an authenticated user
*   ✅ **When** a GET request is sent to `/exercises` with a valid `search` query
*   ✅ **Then** a 200 OK response is returned with a list of matching exercises.

*   ✅ **Given** an authenticated user
*   ✅ **When** a GET request is sent to `/exercises` with no `search` query
*   ✅ **Then** a 200 OK response is returned with a list of all (or a default subset of) exercises.

*   ✅ **Given** an unauthenticated user
*   ✅ **When** a GET request is sent to `/exercises`
*   ✅ **Then** a 401 Unauthorized response is returned.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                       |
| ------------------ | ------------ | ------------------------------------------------- |
| Single Responsibility | ✅           | Controller only handles HTTP request/response and delegates to service. |
| Independence       | ✅           | Can be tested independently with mocks for service. |
| Testability        | ✅           | Easily mockable dependencies for unit testing.    |
| Small Subset Testing | ✅           | Focuses only on request handling and DTO validation. |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.controller.ts
apps/backend/src/exercises/dto/get-exercises-query.dto.ts
packages/shared-types/src/exercise.types.ts
```

<!-- impl-batch:TASK-SYS-CORE-EXERCISE-01-02::SYS-CORE-EXERCISE-01::UX-005::TASK-SYS-CORE-EXERCISE-01-03::SYS-CORE-EXERCISE-01::UX-005::TASK-SYS-CORE-EXERCISE-01-04::SYS-CORE-EXERCISE-01::UX-005::TASK-SYS-CORE-EXERCISE-01-05::SYS-CORE-EXERCISE-01::UX-005::TASK-SYS-CORE-WORKOUT-02-01::SYS-CORE-WORKOUT-02::UX-007 -->

## **Task-ID**: TASK-SYS-CORE-EXERCISE-01-02

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S2 Select Exercise from Library

**Source SYS-ID**: SYS-CORE-EXERCISE-01

**Related UX-ID:** UX-005 Exercise library search

**Related UI-ID:** UI-012 ExerciseCard

**Task Name**: BE: Implement ExerciseService.searchLibrary

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-CORE-AUTH-02 (User Login Endpoint)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Optional `search` query string.
- API/Protocol: `GET /api/v1/exercises?search={query}`
- Database Changes: Index on `Exercise.name` for efficient search.
- Interaction Logic: Backend service queries the `Exercise` model for matching names.
- Business Boundary Condition: Search should be case-insensitive.
- Observability: Log search requests, search terms, and number of results.
- Performance Considerations: API response < 200ms (P95), efficient DB query using indexes.
- Non-Functional: Authentication required via JWT.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `GET /api/v1/exercises?search=squat`
        *   `search`: `string` (optional query parameter, e.g., "bench")
        *   `userId`: `string` (from JWT payload, for authorization context)
    *   **Output (Success 200 OK)**: `Exercise[]`
        ```typescript
        [
          { id: "clx001", name: "Squat", type: "STRENGTH", createdById: null, createdAt: "...", updatedAt: "..." },
          { id: "clx002", name: "Front Squat", type: "STRENGTH", createdById: "user123", createdAt: "...", updatedAt: "..." }
        ]
        ```
*   **Decision point application**: Not applicable.
*   **Main Function/Class Design**
    *   `ExercisesController`: Handles HTTP requests for `/exercises`.
    *   `ExercisesService`: Contains business logic for exercise operations, including searching the library.
    *   `PrismaService`: Injects `PrismaClient` for database interactions.
*   **Code Location**
    *   `apps/backend/src/exercises/exercises.controller.ts`
    *   `apps/backend/src/exercises/exercises.service.ts`
    *   `packages/shared-types/src/exercise.types.ts` (for DTOs/response types)
    *   `apps/backend/src/prisma/schema.prisma` (for `@@index([name])` on `Exercise` model)
*   **Call Chain**: `Frontend API Client` → `ExercisesController.findAll` → `ExercisesService.searchLibrary` → `PrismaClient.exercise.findMany` → `PostgreSQL Database`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Prisma query will leverage the `name` index on the `Exercise` table. `mode: 'insensitive'` for case-insensitivity.
    *   **Security**: `@UseGuards(JwtAuthGuard)` will protect the endpoint, ensuring only authenticated users can access the exercise library.
    *   **Logging**: Structured logs will capture `GET /exercises` requests, `userId`, `searchTerm`, and number of results for observability.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   In `apps/backend/src/exercises/exercises.controller.ts`, add a `GET` endpoint:
        ```typescript
        import { Controller, Get, Query, UseGuards } from '@nestjs/common';
        import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming path
        import { ExercisesService } from './exercises.service';
        import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

        @ApiTags('Exercises')
        @Controller('exercises')
        @UseGuards(JwtAuthGuard)
        @ApiBearerAuth()
        export class ExercisesController {
          constructor(private readonly exercisesService: ExercisesService) {}

          @Get()
          @ApiQuery({ name: 'search', required: false, type: String, description: 'Optional search query for exercise names' })
          @ApiResponse({ status: 200, description: 'List of exercises', type: [Exercise] }) // Assuming Exercise DTO
          async findAll(@Query('search') search?: string) {
            return this.exercisesService.searchLibrary(search);
          }
        }
        ```
2.  **Business Logic (Service Methods)**:
    *   In `apps/backend/src/exercises/exercises.service.ts`:
        ```typescript
        import { Injectable } from '@nestjs/common';
        import { PrismaService } from '../prisma/prisma.service'; // Assuming path
        import { Exercise } from '@prisma/client'; // Import Prisma's generated Exercise type

        @Injectable()
        export class ExercisesService {
          constructor(private prisma: PrismaService) {}

          async searchLibrary(searchQuery?: string): Promise<Exercise[]> {
            // Log search request
            console.log(`User searching exercises with query: ${searchQuery || 'none'}`); // Use structured logger in real app

            return this.prisma.exercise.findMany({
              where: {
                name: {
                  contains: searchQuery,
                  mode: 'insensitive', // For case-insensitive search
                },
              },
              orderBy: {
                name: 'asc', // Order results alphabetically
              },
            });
          }
        }
        ```
3.  **Data Access (Prisma Models and Query Methods)**:
    *   The `PrismaService` (injected into `ExercisesService`) handles the direct interaction with `PrismaClient`.
    *   The `findMany` method constructs the SQL query.
    *   Ensure the `schema.prisma` has an index for `Exercise.name` for performance:
        ```prisma
        // apps/backend/src/prisma/schema.prisma
        model Exercise {
          id                String            @id @default(cuid())
          name              String
          type              ExerciseType
          // ... other fields
          loggedExercises   LoggedExercise[]

          @@unique([name, createdById])
          @@index([name]) // Add this index for search performance
        }
        ```
        Run `npx prisma migrate dev` to apply schema changes.
4.  **Error and Exception Handling**:
    *   NestJS's global exception filter (SYS-INFRA-ERROR-01) will catch any unexpected database errors and format them as 500 Internal Server Error.
    *   No specific error codes for search results; an empty array is returned if no matches found.
5.  **Logging and Metrics**:
    *   Use the structured logger (SYS-INFRA-LOG-01) to log:
        *   `event: 'exercise_search_requested'`, `userId`, `searchTerm`.
        *   `event: 'exercise_search_completed'`, `userId`, `searchTerm`, `resultCount`, `durationMs`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `Exercise` table  | Queries the exercise library based on an optional search term. |
| Audit | Log Event         | Records `exercise_search_requested` and `exercise_search_completed` events. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
  Participant FRONTEND as "Frontend (UX-005)"
  Participant API_CLIENT as "API Client Axios"
  Participant EXERCISES_CONTROLLER as "exercises.controller.ts"
  Participant JWT_AUTH_GUARD as "JwtAuthGuard"
  Participant EXERCISES_SERVICE as "exercises.service.ts"
  Participant PRISMA_SERVICE as "PrismaService"
  Participant POSTGRES_DB as "PostgreSQL Database"

  FRONTEND->>API_CLIENT: User input search query
  activate API_CLIENT
  API_CLIENT->>EXERCISES_CONTROLLER: GET /exercises?search={query} (with JWT)
  activate EXERCISES_CONTROLLER
  EXERCISES_CONTROLLER->>JWT_AUTH_GUARD: Validate JWT
  activate JWT_AUTH_GUARD
  JWT_AUTH_GUARD-->>EXERCISES_CONTROLLER: JWT Valid
  deactivate JWT_AUTH_GUARD
  EXERCISES_CONTROLLER->>EXERCISES_SERVICE: searchLibrary(query)
  activate EXERCISES_SERVICE
  EXERCISES_SERVICE->>PRISMA_SERVICE: findMany(Exercise, where:{name:{contains,mode}})
  activate PRISMA_SERVICE
  PRISMA_SERVICE->>POSTGRES_DB: SELECT * FROM "Exercise" WHERE name ILIKE '%query%' ORDER BY name ASC
  activate POSTGRES_DB
  POSTGRES_DB-->>PRISMA_SERVICE: Exercise[]
  deactivate POSTGRES_DB
  PRISMA_SERVICE-->>EXERCISES_SERVICE: Exercise[]
  deactivate PRISMA_SERVICE
  EXERCISES_SERVICE-->>EXERCISES_CONTROLLER: Exercise[]
  deactivate EXERCISES_SERVICE
  EXERCISES_CONTROLLER-->>API_CLIENT: 200 OK, Exercise[]
  deactivate EXERCISES_CONTROLLER
  API_CLIENT-->>FRONTEND: Exercise[]
  deactivate API_CLIENT
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                 |
| :----------------------- | :-------------- | :---------- | :-------------------------- |
| Authentication Failed    | UNAUTHORIZED    | 401         | Invalid Login Status        |
| Internal Server Error    | INTERNAL_ERROR  | 500         | System Exception            |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All communication will be encrypted via HTTPS/TLS (SYS-INFRA-SEC-01).
*   **Authentication**: JWT is validated by `JwtAuthGuard` (SYS-INFRA-AUTH-01) before reaching the controller logic.
*   **Log Event Naming**: Use `exercise_search_requested` (before service call) and `exercise_search_completed` (after service returns) to track requests and their outcomes. Log fields include `userId`, `searchTerm`, `resultCount`, `responseDurationMs`.
*   **Metric Naming**: `exercise_search_requests_total`, `exercise_search_duration_seconds`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user
*   ✅ When a GET request is made to `/exercises` without a search query
*   ✅ Then a list of all predefined and custom exercises should be returned with a 200 status.
*   ✅ Given an authenticated user
*   ✅ When a GET request is made to `/exercises?search=squat`
*   ✅ Then a list of exercises containing "squat" (case-insensitive) in their name should be returned with a 200 status.
*   ✅ Given an authenticated user
*   ✅ When a GET request is made to `/exercises?search=nonexistent`
*   ✅ Then an empty array `[]` should be returned with a 200 status.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                   |
| :----------------- | :----------- | :------------------------------------------------------------ |
| Single Responsibility | ✅            | The service focuses solely on querying exercises.           |
| Independence       | ✅            | Operates independently of other domain logic once authenticated. |
| Testability        | ✅            | Service logic is mockable for Prisma, controller for HTTP.    |
| Small Subset Testing | ✅            | Can be tested in isolation with mocked data.                  |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.controller.ts
apps/backend/src/exercises/exercises.service.ts
apps/backend/src/prisma/schema.prisma
packages/shared-types/src/exercise.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-EXERCISE-01-03

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S2 Select Exercise from Library

**Source SYS-ID**: SYS-CORE-EXERCISE-01

**Related UX-ID:** UX-005 Exercise library search

**Related UI-ID:** UI-012 ExerciseCard

**Task Name**: BE: Unit/Integration Tests for Exercise Search

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-EXERCISE-01-02 (BE: Implement ExerciseService.searchLibrary)

**DECISION-REF**: —

### **Coverage**:

- Unit tests for `ExercisesService.searchLibrary` method, mocking `PrismaClient`.
- Integration tests for `ExercisesController.findAll` endpoint, mocking authentication and `PrismaClient`.
- Test cases for various search scenarios: no query, exact match, partial match, case-insensitive match, no results, and authenticated access.
- Assertion of correct HTTP status codes and response payloads.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Unit Test Input**: `searchQuery: string | undefined`
    *   **Unit Test Expected Output**: `Promise<Exercise[]>`
    *   **Integration Test Input**: HTTP `GET /exercises?search={query}`, valid/invalid JWT
    *   **Integration Test Expected Output**: HTTP `Response` (status code, body)
*   **Decision point application**: Not applicable.
*   **Main Function/Class Design**
    *   `ExercisesService` unit tests (`exercises.service.spec.ts`).
    *   `ExercisesController` integration tests (`exercises.controller.spec.ts`).
    *   `@nestjs/testing` module for test setup.
    *   `jest` for mocking and assertions.
    *   `supertest` for simulating HTTP requests in integration tests.
*   **Code Location**
    *   `apps/backend/src/exercises/exercises.service.spec.ts`
    *   `apps/backend/src/exercises/exercises.controller.spec.ts`
*   **Call Chain**: Test Runner → Test Suite → Mocked Dependencies.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Tests are isolated and fast, using in-memory mocks.
    *   **Security**: Integration tests explicitly verify authentication (`401 Unauthorized`) for protected endpoints.
    *   **Logging**: Test logs will confirm test execution, not application logs.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Unit Tests (`exercises.service.spec.ts`)**:
    *   Set up a `TestingModule` to provide `ExercisesService` and mock `PrismaService`.
    *   Define mock data for `Exercise` model.
    *   **Test Cases**:
        *   `should return all exercises when no search query is provided`: Call `searchLibrary()` and assert all mock exercises are returned.
        *   `should return filtered exercises for a matching search query (case-insensitive)`: Call `searchLibrary('squat')` and assert matching exercises.
        *   `should return an empty array if no exercises match the query`: Call `searchLibrary('xyz')` and assert an empty array.
        *   `should handle partial matches`: Call `searchLibrary('pre')` and assert "Bench Press".
    ```typescript
    // apps/backend/src/exercises/exercises.service.spec.ts
    import { Test, TestingModule } from '@nestjs/testing';
    import { PrismaService } from '../prisma/prisma.service';
    import { ExercisesService } from './exercises.service';
    import { ExerciseType } from '@prisma/client';

    const mockExercises = [
      { id: '1', name: 'Bench Press', type: ExerciseType.STRENGTH, createdById: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Squat', type: ExerciseType.STRENGTH, createdById: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', name: 'Deadlift', type: ExerciseType.STRENGTH, createdById: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '4', name: 'Running', type: ExerciseType.CARDIO, createdById: null, createdAt: new Date(), updatedAt: new Date() },
    ];

    describe('ExercisesService', () => {
      let service: ExercisesService;
      let prisma: PrismaService;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ExercisesService,
            {
              provide: PrismaService,
              useValue: {
                exercise: {
                  findMany: jest.fn().mockImplementation((options) => {
                    const search = options?.where?.name?.contains?.toLowerCase();
                    if (!search) return mockExercises;
                    return mockExercises.filter(e => e.name.toLowerCase().includes(search));
                  }),
                },
              },
            },
          ],
        }).compile();

        service = module.get<ExercisesService>(ExercisesService);
        prisma = module.get<PrismaService>(PrismaService);
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      it('should return all exercises when no search query is provided', async () => {
        const result = await service.searchLibrary();
        expect(result).toEqual(mockExercises);
        expect(prisma.exercise.findMany).toHaveBeenCalledWith({
          where: { name: { contains: undefined, mode: 'insensitive' } },
          orderBy: { name: 'asc' },
        });
      });

      it('should return filtered exercises for a matching search query (case-insensitive)', async () => {
        const result = await service.searchLibrary('squat');
        expect(result).toEqual([mockExercises[1]]);
        expect(prisma.exercise.findMany).toHaveBeenCalledWith({
          where: { name: { contains: 'squat', mode: 'insensitive' } },
          orderBy: { name: 'asc' },
        });
      });

      it('should return an empty array if no exercises match the query', async () => {
        const result = await service.searchLibrary('nonexistent');
        expect(result).toEqual([]);
      });

      it('should handle partial matches', async () => {
        const result = await service.searchLibrary('press');
        expect(result).toEqual([mockExercises[0]]);
      });
    });
    ```
2.  **Integration Tests (`exercises.controller.spec.ts`)**:
    *   Set up a `TestingModule` for `ExercisesController`, providing `ExercisesService` with a mock.
    *   Mock `JwtAuthGuard` to allow/deny access based on test needs.
    *   Use `supertest` for HTTP requests.
    *   **Test Cases**:
        *   `should return 200 and all exercises for authenticated request with no query`.
        *   `should return 200 and filtered exercises for authenticated request with query`.
        *   `should return 401 Unauthorized if no JWT is provided`.
    ```typescript
    // apps/backend/src/exercises/exercises.controller.spec.ts
    import { Test, TestingModule } from '@nestjs/testing';
    import { INestApplication } from '@nestjs/common';
    import * as request from 'supertest';
    import { ExercisesController } from './exercises.controller';
    import { ExercisesService } from './exercises.service';
    import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
    import { ExerciseType } from '@prisma/client';

    const mockExercises = [
      { id: '1', name: 'Bench Press', type: ExerciseType.STRENGTH, createdById: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Squat', type: ExerciseType.STRENGTH, createdById: null, createdAt: new Date(), updatedAt: new Date() },
    ];

    describe('ExercisesController (e2e)', () => {
      let app: INestApplication;
      let exercisesService: ExercisesService;

      beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          controllers: [ExercisesController],
          providers: [
            {
              provide: ExercisesService,
              useValue: {
                searchLibrary: jest.fn().mockImplementation((searchQuery) => {
                  if (!searchQuery) return mockExercises;
                  return mockExercises.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
                }),
              },
            },
          ],
        })
        .overrideGuard(JwtAuthGuard) // Mock JwtAuthGuard for testing
        .useValue({ canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: 'testUserId' }; // Mock authenticated user
          return true; // Allow access
        }})
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        exercisesService = moduleFixture.get<ExercisesService>(ExercisesService);
      });

      afterAll(async () => {
        await app.close();
      });

      it('/exercises (GET) should return all exercises when no search query', async () => {
        const response = await request(app.getHttpServer()).get('/exercises').expect(200);
        expect(response.body).toEqual(mockExercises);
        expect(exercisesService.searchLibrary).toHaveBeenCalledWith(undefined);
      });

      it('/exercises (GET) should return filtered exercises with a search query', async () => {
        const response = await request(app.getHttpServer()).get('/exercises?search=squat').expect(200);
        expect(response.body).toEqual([mockExercises[1]]);
        expect(exercisesService.searchLibrary).toHaveBeenCalledWith('squat');
      });

      it('/exercises (GET) should return 401 Unauthorized if no JWT', async () => {
        // Temporarily override the guard to deny activation for this specific test
        jest.spyOn(app.get(JwtAuthGuard), 'canActivate').mockReturnValueOnce(false);
        await request(app.getHttpServer()).get('/exercises').expect(401);
      });
    });
    ```

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target | Description                      |
| :---- | :---------------- | :------------------------------- |
| Read  | Mocked DB/Service | Test data for assertions.        |
| Write | Test assertions   | Verify expected outcomes.        |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
  Participant TEST_RUNNER as "Test Runner"
  Participant SERVICE_SPEC as "exercises.service.spec.ts"
  Participant MOCK_PRISMA as "Mock PrismaClient"
  Participant CONTROLLER_SPEC as "exercises.controller.spec.ts"
  Participant NESTJS_TEST_APP as "NestJS Test App"
  Participant MOCK_JWT_GUARD as "Mock JwtAuthGuard"

  TEST_RUNNER->>SERVICE_SPEC: Run unit tests
  activate SERVICE_SPEC
  SERVICE_SPEC->>MOCK_PRISMA: Call searchLibrary
  MOCK_PRISMA-->>SERVICE_SPEC: Return mock exercises
  SERVICE_SPEC->>SERVICE_SPEC: Assert results
  deactivate SERVICE_SPEC

  TEST_RUNNER->>CONTROLLER_SPEC: Run integration tests
  activate CONTROLLER_SPEC
  CONTROLLER_SPEC->>NESTJS_TEST_APP: HTTP GET /exercises (simulated)
  activate NESTJS_TEST_APP
  NESTJS_TEST_APP->>MOCK_JWT_GUARD: Call canActivate()
  MOCK_JWT_GUARD-->>NESTJS_TEST_APP: Return true (authenticated)
  NESTJS_TEST_APP->>MOCK_PRISMA: Call searchLibrary (via service)
  MOCK_PRISMA-->>NESTJS_TEST_APP: Return mock exercises
  NESTJS_TEST_APP-->>CONTROLLER_SPEC: Return 200 OK, Exercise[]
  deactivate NESTJS_TEST_APP
  CONTROLLER_SPEC->>CONTROLLER_SPEC: Assert response
  deactivate CONTROLLER_SPEC
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code   | HTTP Status | User Prompt                 |
| :----------------------- | :----------- | :---------- | :-------------------------- |
| Unauthenticated Access   | UNAUTHORIZED | 401         | Invalid Login Status (Test) |

### 🔹 **Security and Observability Hooks**

*   Tests verify the `JwtAuthGuard` protection by asserting `401 Unauthorized` responses when a valid JWT is not provided or the guard is mocked to deny access.
*   No application-level logging or metrics are generated by the tests themselves; the focus is on verifying functional and security aspects.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `ExercisesService.searchLibrary` is called without a search query
*   ✅ When it queries the mocked Prisma client
*   ✅ Then it should return all predefined mock exercises.
*   ✅ Given `ExercisesService.searchLibrary` is called with a specific search query (e.g., "squat")
*   ✅ When it queries the mocked Prisma client
*   ✅ Then it should return only the exercises matching that query (case-insensitive).
*   ✅ Given an unauthenticated request to `GET /exercises`
*   ✅ When the request is made to the NestJS test app
*   ✅ Then the response should be 401 Unauthorized.
*   ✅ Given an authenticated request to `GET /exercises?search=bench`
*   ✅ When the request is made to the NestJS test app
*   ✅ Then the response should be 200 OK and contain the filtered exercises.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                        |
| :----------------- | :----------- | :----------------------------------------------------------------- |
| Single Responsibility | ✅            | Tests focus specifically on the exercise search functionality.     |
| Independence       | ✅            | Tests use mocks to isolate components from external dependencies.  |
| Testability        | ✅            | Code is designed for testability (dependency injection, guard mocking). |
| Small Subset Testing | ✅            | Each test case covers a distinct scenario for the search feature.  |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.service.spec.ts
apps/backend/src/exercises/exercises.controller.spec.ts
```

---

## **Task-ID**: TASK-SYS-CORE-EXERCISE-01-04

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S2 Select Exercise from Library

**Source SYS-ID**: SYS-CORE-EXERCISE-01

**Related UX-ID:** UX-005 Exercise library search

**Related UI-ID:** UI-012 ExerciseCard

**Task Name**: FE: Create Exercise Library Modal Component

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-SETUP-01 (Project setup for frontend components)

**DECISION-REF**: —

### **Coverage**:

- React component for a modal dialog to display exercise library.
- Search input field within the modal.
- List display area for search results (e.g., using `ExerciseCard` UI-012).
- Loading and empty states for the exercise list.
- Basic accessibility attributes (`aria-modal`, `role="dialog"`).
- Internationalization for all static text within the component.
- Accepts `Exercise[]`, `isLoading`, `error` as props.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Props**:
        ```typescript
        interface ExerciseLibraryModalProps {
          isOpen: boolean;
          onClose: () => void;
          onSelectExercise: (exercise: Exercise) => void;
          exercises: Exercise[]; // Array of shared Exercise type
          isLoading: boolean;
          onSearch: (query: string) => void;
          errorMessage?: string; // Optional error message to display
        }
        ```
    *   **Output**: React JSX for the modal UI.
*   **Decision point application**: Not applicable.
*   **Main Function/Class Design**
    *   `ExerciseLibraryModal` (functional React component): Manages UI rendering based on props.
    *   Leverages existing common UI components like `Modal`, `TextInput`, `Button`, `LoadingSpinner`.
    *   `ExerciseCard` component will be used to render individual exercises.
*   **Code Location**
    *   `apps/frontend/src/components/workout/ExerciseLibraryModal.tsx`
    *   `apps/frontend/src/components/common/Modal.tsx` (reusable base modal)
    *   `apps/frontend/src/components/common/TextInput.tsx`
    *   `apps/frontend/src/components/common/Button.tsx`
    *   `apps/frontend/src/components/workout/ExerciseCard.tsx` (for individual exercises)
*   **Call Chain**: Parent Component (e.g., `WorkoutSessionPage`) → `ExerciseLibraryModal` → `ExerciseCard`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Pure component, re-renders only on prop changes. Virtualization could be added for very long lists if needed (out of scope for initial).
    *   **Security**: No direct security concerns for a UI component; relies on data passed securely from parent/API.
    *   **Logging**: No client-side logging directly from this component.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**:
    *   Create `apps/frontend/src/components/workout/ExerciseLibraryModal.tsx`.
    *   This component will be imported and used by parent components, such as `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` (or other workout management pages).
2.  **Triggering Logic (events, buttons, input validation)**:
    *   The `TextInput` for search will trigger `onSearch` prop on change.
    *   The "Close" button will trigger the `onClose` prop.
    *   Clicking an `ExerciseCard` will trigger `onSelectExercise` prop.
3.  **Interaction with the Backend (interfaces, parameters, state flow)**:
    *   This component is a "dumb" component. It receives `exercises`, `isLoading`, `errorMessage` as props.
    *   It does *not* directly interact with the backend or manage its own search state. Instead, it fires `onSearch` callback to its parent, which then handles API calls and state updates.
4.  **UI Success/Failure Feedback and State Recovery**:
    *   Displays a `LoadingSpinner` if `isLoading` prop is `true`.
    *   Displays `errorMessage` prop if present.
    *   Displays "No exercises found" if `!isLoading` and `exercises.length === 0`.
    *   Modal visibility is controlled by the `isOpen` prop.

```tsx
// apps/frontend/src/components/workout/ExerciseLibraryModal.tsx
import React from 'react';
import { Modal } from '@/components/common/Modal'; // Assuming a reusable Modal component
import { TextInput } from '@/components/common/TextInput'; // Reusable input
import { Button } from '@/components/common/Button'; // Reusable button
import { Exercise } from 'packages/shared-types/src/exercise.types'; // Shared type
import { useTranslation } from 'react-i18next'; // For i18n
import { ExerciseCard } from './ExerciseCard'; // A component to display individual exercises

interface ExerciseLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
  exercises: Exercise[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  errorMessage?: string;
  currentSearchQuery: string; // To keep search input synced
}

export const ExerciseLibraryModal: React.FC<ExerciseLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectExercise,
  exercises,
  isLoading,
  onSearch,
  errorMessage,
  currentSearchQuery,
}) => {
  const { t } = useTranslation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('exercise_modal.title')} aria-label={t('exercise_modal.title')}>
      <div className="flex flex-col gap-4">
        <TextInput
          label={t('exercise_modal.search_label')}
          placeholder={t('exercise_modal.search_placeholder')}
          value={currentSearchQuery}
          onChange={handleSearchChange}
          aria-label={t('exercise_modal.search_label')}
        />

        {isLoading ? (
          <div className="flex justify-center py-8">
            {/* Replace with actual LoadingSpinner component */}
            <p>{t('common.loading')}</p> 
          </div>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : exercises.length === 0 && currentSearchQuery ? (
          <p className="text-center text-gray-500">{t('exercise_modal.no_results_for_query', { query: currentSearchQuery })}</p>
        ) : exercises.length === 0 ? (
          <p className="text-center text-gray-500">{t('exercise_modal.no_exercises_available')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => onSelectExercise(exercise)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="secondary">
          {t('common.cancel')}
        </Button>
      </div>
    </Modal>
  );
};

// Example i18n keys (to be defined in translation files):
// "exercise_modal.title": "Select Exercise"
// "exercise_modal.search_label": "Search Exercises"
// "exercise_modal.search_placeholder": "e.g. Bench Press, Running"
// "exercise_modal.no_results_for_query": "No exercises found for '{query}'"
// "exercise_modal.no_exercises_available": "No exercises available. Create a custom one!"
// "common.loading": "Loading..."
// "common.cancel": "Cancel"
```

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description                                 |
| :--- | :---------------- | :------------------------------------------ |
| Read | Component Props   | `isOpen`, `exercises`, `isLoading`, `errorMessage`, `currentSearchQuery` |
| Write | Callbacks         | `onClose`, `onSelectExercise`, `onSearch`   |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
  Participant PARENT_COMP as "Parent Component"
  Participant EXERCISE_MODAL as "ExerciseLibraryModal"
  Participant TEXT_INPUT as "TextInput Component"
  Participant EXERCISE_CARD as "ExerciseCard Component"
  Participant BUTTON as "Button Component"

  PARENT_COMP->>EXERCISE_MODAL: Render (isOpen=true, exercises, isLoading, etc.)
  activate EXERCISE_MODAL
  EXERCISE_MODAL->>TEXT_INPUT: Render Search Input (value=currentSearchQuery)
  TEXT_INPUT->>EXERCISE_MODAL: onChange event (user types)
  EXERCISE_MODAL->>PARENT_COMP: onSearch(newValue)
  
  alt isLoading is true
    EXERCISE_MODAL->>EXERCISE_MODAL: Display Loading Spinner
  else errorMessage is present
    EXERCISE_MODAL->>EXERCISE_MODAL: Display Error Message
  else exercises.length === 0
    EXERCISE_MODAL->>EXERCISE_MODAL: Display "No exercises found"
  else exercises are available
    EXERCISE_MODAL->>EXERCISE_CARD: Render ExerciseCard for each exercise
    activate EXERCISE_CARD
    EXERCISE_CARD->>EXERCISE_MODAL: onClick event (user selects)
    deactivate EXERCISE_CARD
    EXERCISE_MODAL->>PARENT_COMP: onSelectExercise(selectedExercise)
  end

  EXERCISE_MODAL->>BUTTON: Render Close Button
  BUTTON->>EXERCISE_MODAL: onClick event
  EXERCISE_MODAL->>PARENT_COMP: onClose()
  deactivate EXERCISE_MODAL
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                 |
| :----------------------- | :-------------- | :---------- | :-------------------------- |
| API Call Failure         | (Prop-driven)   | N/A         | `errorMessage` prop value   |

### 🔹 **Security and Observability Hooks**

*   **Accessibility**: Implemented `aria-label` and `role="dialog"` for screen readers.
*   **Internationalization**: All visible text should be translated using `react-i18next` hooks and keys.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `ExerciseLibraryModal` is opened (`isOpen=true`) with a list of exercises
*   ✅ When the modal is rendered
*   ✅ Then a search input and a scrollable list of `ExerciseCard` components should be displayed.
*   ✅ Given the `isLoading` prop is `true`
*   ✅ When the modal is rendered
*   ✅ Then a loading indicator should be shown, and the exercise list should be hidden.
*   ✅ Given the `exercises` prop is an empty array and `currentSearchQuery` is not empty
*   ✅ When the modal is rendered
*   ✅ Then a "No results found for '{query}'" message should be displayed.
*   ✅ Given the user clicks on an `ExerciseCard`
*   ✅ When the `ExerciseCard` is clicked
*   ✅ Then the `onSelectExercise` callback should be fired with the selected exercise object.
*   ✅ Given the user clicks the close button
*   ✅ When the button is clicked
*   ✅ Then the `onClose` callback should be fired.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                  |
| :----------------- | :----------- | :----------------------------------------------------------- |
| Single Responsibility | ✅            | Responsible only for rendering the modal UI and triggering events. |
| Independence       | ✅            | Pure component, receives all data and callbacks via props.   |
| Testability        | ✅            | Highly testable with mock props using React Testing Library. |
| Small Subset Testing | ✅            | Can be rendered and tested in isolation.                     |

### 🔹 **Code Location**

```
apps/frontend/src/components/workout/ExerciseLibraryModal.tsx
apps/frontend/src/components/common/Modal.tsx
apps/frontend/src/components/common/TextInput.tsx
apps/frontend/src/components/common/Button.tsx
apps/frontend/src/components/workout/ExerciseCard.tsx
```

---

## **Task-ID**: TASK-SYS-CORE-EXERCISE-01-05

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S2 Select Exercise from Library

**Source SYS-ID**: SYS-CORE-EXERCISE-01

**Related UX-ID:** UX-005 Exercise library search

**Related UI-ID:** UI-012 ExerciseCard

**Task Name**: FE: Implement Exercise Search API Client & State

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-EXERCISE-01-01 (BE: Exercise Search API existence), TASK-SYS-CORE-EXERCISE-01-04 (FE: Exercise Library Modal Component)

**DECISION-REF**: —

### **Coverage**:

- Frontend API client function (`getExercises`) for `GET /exercises`.
- Custom React hook (`useExerciseSearch`) to manage search state (query, results, loading, error).
- Debouncing logic for the search input to limit API calls.
- Integration of the `useExerciseSearch` hook with the `ExerciseLibraryModal`.
- Handling of loading and error states for user feedback.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **API Client Input**: `searchQuery: string | undefined`
    *   **API Client Output**: `Promise<Exercise[]>`
    *   **Hook Output**:
        ```typescript
        interface UseExerciseSearchResult {
          searchQuery: string;
          setSearchQuery: (query: string) => void;
          exercises: Exercise[];
          isLoading: boolean;
          error: string | null;
          fetchExercises: (query?: string) => Promise<void>; // Expose for initial fetch or manual trigger
        }
        ```
*   **Decision point application**: Not applicable.
*   **Main Function/Class Design**
    *   `exercise.service.ts`: Axios-based client for backend exercise APIs.
    *   `useExerciseSearch.ts`: Custom React Hook to encapsulate search logic, state, and debouncing.
    *   Parent component (e.g., `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`): Integrates the hook and passes props to `ExerciseLibraryModal`.
*   **Code Location**
    *   `apps/frontend/src/services/exercises.service.ts`
    *   `apps/frontend/src/hooks/useExerciseSearch.ts`
    *   `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` (example usage)
    *   `packages/shared-types/src/exercise.types.ts`
*   **Call Chain**: Parent Component → `useExerciseSearch` (hook) → `exercises.service.ts` (API client) → Backend API.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Implements debouncing (e.g., 500ms) on the search input to prevent excessive API calls.
    *   **Security**: The API client must include the JWT in the request headers (e.g., via an Axios interceptor or directly).
    *   **Logging**: Client-side errors (network issues, API failures) will be caught and stored in the `error` state. No direct client-side logging for API calls in this component, relies on backend logging.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **API Client (`exercises.service.ts`)**:
    *   Create `apps/frontend/src/services/exercises.service.ts`.
    *   This file will export a function to fetch exercises.
    ```typescript
    // apps/frontend/src/services/exercises.service.ts
    import axiosInstance from '@/lib/axios'; // Assuming a configured Axios instance
    import { Exercise } from 'packages/shared-types/src/exercise.types';

    export const getExercises = async (searchQuery?: string): Promise<Exercise[]> => {
      try {
        const response = await axiosInstance.get('/exercises', {
          params: { search: searchQuery },
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
        throw error;
      }
    };
    ```
2.  **State Management Hook (`useExerciseSearch.ts`)**:
    *   Create `apps/frontend/src/hooks/useExerciseSearch.ts`.
    *   This hook will manage the search query, fetched exercises, loading state, and error state.
    ```typescript
    // apps/frontend/src/hooks/useExerciseSearch.ts
    import { useState, useEffect, useCallback } from 'react';
    import { getExercises } from '@/services/exercises.service';
    import { Exercise } from 'packages/shared-types/src/exercise.types';
    import { useDebounce } from '@/hooks/useDebounce'; // Assuming a generic debounce hook

    interface UseExerciseSearchResult {
      searchQuery: string;
      setSearchQuery: (query: string) => void;
      exercises: Exercise[];
      isLoading: boolean;
      error: string | null;
      fetchExercises: (query?: string) => Promise<void>;
    }

    export const useExerciseSearch = (initialQuery = ''): UseExerciseSearchResult => {
      const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
      const [exercises, setExercises] = useState<Exercise[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);

      const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce for 500ms

      const fetchExercises = useCallback(async (query?: string) => {
        setIsLoading(true);
        setError(null);
        try {
          const fetched = await getExercises(query);
          setExercises(fetched);
        } catch (err) {
          setError('Failed to load exercises. Please try again.'); // User-friendly error
          setExercises([]); // Clear previous results on error
        } finally {
          setIsLoading(false);
        }
      }, []);

      // Effect to fetch exercises when debounced query changes
      useEffect(() => {
        fetchExercises(debouncedSearchQuery);
      }, [debouncedSearchQuery, fetchExercises]); // fetchExercises is stable due to useCallback

      // Initial fetch if component mounts with a query
      useEffect(() => {
        if (initialQuery && initialQuery === searchQuery) {
          fetchExercises(initialQuery);
        }
      }, [initialQuery, searchQuery, fetchExercises]);


      return {
        searchQuery,
        setSearchQuery,
        exercises,
        isLoading,
        error,
        fetchExercises, // Expose for explicit initial load or refresh if needed
      };
    };
    ```
    *   A generic `useDebounce` hook would be needed:
    ```typescript
    // apps/frontend/src/hooks/useDebounce.ts
    import { useState, useEffect } from 'react';

    export function useDebounce<T>(value: T, delay: number): T {
      const [debouncedValue, setDebouncedValue] = useState<T>(value);

      useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      }, [value, delay]);

      return debouncedValue;
    }
    ```
3.  **Integration with `ExerciseLibraryModal` (e.g., in a Workout Page)**:
    *   In a component like `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`, use the hook and pass props to the modal.
    ```tsx
    // apps/frontend/src/app/(app)/workouts/[id]/page.tsx (simplified example)
    'use client'; // For Next.js App Router client component
    import React, { useState } from 'react';
    import { ExerciseLibraryModal } from '@/components/workout/ExerciseLibraryModal';
    import { useExerciseSearch } from '@/hooks/useExerciseSearch';
    import { Exercise } from 'packages/shared-types/src/exercise.types';

    export default function WorkoutSessionPage() {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const { searchQuery, setSearchQuery, exercises, isLoading, error } = useExerciseSearch();

      const handleOpenModal = () => setIsModalOpen(true);
      const handleCloseModal = () => setIsModalOpen(false);

      const handleSelectExercise = (exercise: Exercise) => {
        console.log('Selected exercise:', exercise.name);
        // Logic to add exercise to current workout session
        handleCloseModal();
      };

      return (
        <div>
          <h1>Workout Session</h1>
          <button onClick={handleOpenModal}>Add Exercise</button>

          <ExerciseLibraryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelectExercise={handleSelectExercise}
            exercises={exercises}
            isLoading={isLoading}
            onSearch={setSearchQuery}
            errorMessage={error || undefined}
            currentSearchQuery={searchQuery}
          />
        </div>
      );
    }
    ```

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description                                                 |
| :--- | :---------------- | :---------------------------------------------------------- |
| Read | Backend API       | Fetches exercise data.                                      |
| Write | Component State   | Updates `searchQuery`, `exercises`, `isLoading`, `error` in `useExerciseSearch`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
  Participant WORKOUT_PAGE as "Workout Session Page"
  Participant USE_EXERCISE_SEARCH as "useExerciseSearch Hook"
  Participant EXERCISE_MODAL as "ExerciseLibraryModal"
  Participant USE_DEBOUNCE as "useDebounce Hook"
  Participant EXERCISE_API_CLIENT as "exercises.service.ts"
  Participant BACKEND_API as "NestJS Backend"

  WORKOUT_PAGE->>EXERCISE_MODAL: Render (initial props)
  activate EXERCISE_MODAL
  EXERCISE_MODAL->>USE_EXERCISE_SEARCH: setSearchQuery(query_A)
  deactivate EXERCISE_MODAL
  activate USE_EXERCISE_SEARCH
  USE_EXERCISE_SEARCH->>USE_DEBOUNCE: Update value (query_A)
  activate USE_DEBOUNCE
  USE_DEBOUNCE-->>USE_DEBOUNCE: Debounce timer starts
  alt User types again before debounce (query_B)
    USE_EXERCISE_SEARCH->>USE_DEBOUNCE: Update value (query_B)
    USE_DEBOUNCE-->>USE_DEBOUNCE: Reset timer for query_B
  else Debounce timer for query_A expires
    USE_DEBOUNCE-->>USE_EXERCISE_SEARCH: Return debouncedQuery (query_A)
    deactivate USE_DEBOUNCE
    USE_EXERCISE_SEARCH->>EXERCISE_API_CLIENT: getExercises(query_A)
    activate EXERCISE_API_CLIENT
    EXERCISE_API_CLIENT->>BACKEND_API: GET /exercises?search=query_A (with JWT)
    activate BACKEND_API
    BACKEND_API-->>EXERCISE_API_CLIENT: 200 OK, Exercise[]
    deactivate BACKEND_API
    EXERCISE_API_CLIENT-->>USE_EXERCISE_SEARCH: Exercise[]
    deactivate EXERCISE_API_CLIENT
    USE_EXERCISE_SEARCH->>WORKOUT_PAGE: Update exercises, isLoading (false)
    WORKOUT_PAGE->>EXERCISE_MODAL: Re-render with new props
  end
  deactivate USE_EXERCISE_SEARCH
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                 |
| :----------------------- | :-------------- | :---------- | :-------------------------- |
| Network Error / API Failure | (Client-side)   | N/A         | "Failed to load exercises. Please try again." |
| Authentication Required  | UNAUTHORIZED    | 401         | "Invalid Login Status" (handled by Axios interceptor/auth flow) |

### 🔹 **Security and Observability Hooks**

*   **Authentication**: The `axiosInstance` should be configured with an interceptor to automatically attach the JWT to all outgoing requests. If the JWT is invalid or expired, the interceptor should handle refresh or redirect to login.
*   **Observability**: Client-side errors caught by the `getExercises` function or `useExerciseSearch` hook can be sent to a client-side error tracking service (e.g., Sentry) for monitoring.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `useExerciseSearch` is initialized
*   ✅ When no `searchQuery` is provided initially
*   ✅ Then `fetchExercises` should be called to retrieve all exercises.
*   ✅ Given the user types into the `ExerciseLibraryModal` search input
*   ✅ When `setSearchQuery` is called with the new value
*   ✅ Then `getExercises` should be called only after a debounce period, with the latest search query.
*   ✅ Given an API call to `getExercises` is in progress
*   ✅ When `useExerciseSearch` detects this
*   ✅ Then `isLoading` should be `true`.
*   ✅ Given `getExercises` returns data successfully
*   ✅ When `useExerciseSearch` receives the data
*   ✅ Then `exercises` state should be updated with the fetched exercises, and `isLoading` should be `false`.
*   ✅ Given `getExercises` encounters an error
*   ✅ When `useExerciseSearch` catches the error
*   ✅ Then `error` state should be updated with a user-friendly message, `exercises` cleared, and `isLoading` set to `false`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                  |
| :----------------- | :----------- | :----------------------------------------------------------- |
| Single Responsibility | ✅            | `exercises.service.ts` for API calls, `useExerciseSearch` for search state management. |
| Independence       | ✅            | API client is separate from hook; hook is reusable.          |
| Testability        | ✅            | API client can be mocked; hook can be tested with `@testing-library/react-hooks`. |
| Small Subset Testing | ✅            | Each part (client, hook) can be tested independently.        |

### 🔹 **Code Location**

```
apps/frontend/src/services/exercises.service.ts
apps/frontend/src/hooks/useExerciseSearch.ts
apps/frontend/src/hooks/useDebounce.ts
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
packages/shared-types/src/exercise.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-02-01

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S4 Record Strength Training Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-02

**Related UX-ID:** UX-007 Reps and weight must be non-negative numbers

**Related UI-ID:** N/A (Backend task)

**Task Name**: BE: Implement API for Logging Strength Sets

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-CORE-WORKOUT-01 (Initiate Workout Session), SYS-INFRA-AUTH-01 (JWT Authentication Foundation)

**DECISION-REF**: DECISION-004 (Pre-filling Strength Set Data: No pre-fill, fields start empty)

### **Coverage**:

- API endpoint: `POST /api/v1/workouts/{id}/logged-exercises/{leId}/sets`.
- Input Validation: `reps` (integer, non-negative), `weight` (float, non-negative), `setNumber` (integer, positive).
- Authentication: JWT required.
- Authorization: Ensure the authenticated user owns the `WorkoutSession`.
- Database interaction: Create a new `StrengthSet` record linked to a `LoggedExercise`.
- Error Handling: 400 for invalid input, 401 for unauthorized, 403 for forbidden (not owner), 404 for non-existent session/logged exercise.
- Observability: Log details of each strength set creation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `POST /api/v1/workouts/{workoutId}/logged-exercises/{loggedExerciseId}/sets`
        *   Path parameters: `workoutId: string`, `loggedExerciseId: string`
        *   Request Body (`CreateStrengthSetDto`):
            ```json
            {
              "reps": 10,
              "weight": 60.5,
              "setNumber": 1
            }
            ```
            *   `reps`: `number` (integer, >= 0)
            *   `weight`: `number` (float, >= 0)
            *   `setNumber`: `number` (integer, >= 1)
        *   `userId`: `string` (from JWT payload, for authorization)
    *   **Output (Success 201 Created)**: `StrengthSet`
        ```json
        {
          "id": "set_clx001",
          "loggedExerciseId": "le_clx001",
          "setNumber": 1,
          "reps": 10,
          "weight": 60.5,
          "createdAt": "2024-07-20T10:00:00.000Z"
        }
        ```
*   **Decision point application**: DECISION-004 is a frontend decision. The backend implementation does not pre-fill data; it simply processes the incoming, fully-formed set data.
*   **Main Function/Class Design**
    *   `WorkoutsController`: Handles `POST` request, extracts path params and body, delegates to service.
    *   `WorkoutsService`: Contains business logic to create `StrengthSet`, performs validation checks (existence of session/logged exercise, ownership).
    *   `CreateStrengthSetDto`: DTO for request body validation.
    *   `WorkoutOwnerGuard`: A custom NestJS guard to ensure the authenticated user owns the `WorkoutSession`.
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.controller.ts`
    *   `apps/backend/src/workouts/workouts.service.ts`
    *   `apps/backend/src/workouts/dto/create-strength-set.dto.ts`
    *   `apps/backend/src/workouts/guards/workout-owner.guard.ts` (new guard)
    *   `packages/shared-types/src/workout.types.ts`
*   **Call Chain**: `Frontend API Client` → `WorkoutsController.logStrengthSet` → `JwtAuthGuard` → `WorkoutOwnerGuard` → `WorkoutsService.logStrengthSet` → `PrismaClient.strengthSet.create` → `PostgreSQL Database`.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: DB writes are typically fast. Ensure `findUnique` operations for validation are efficient (rely on `id` and `userId` indexes).
    *   **Security**: `JwtAuthGuard` authenticates the user. `WorkoutOwnerGuard` authorizes, preventing users from logging data to other users' workouts. Input validation prevents malicious data.
    *   **Logging**: Log `strength_set_created` events with `userId`, `workoutId`, `loggedExerciseId`, and set parameters for audit and debugging.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   In `apps/backend/src/workouts/workouts.controller.ts`, add a new `POST` endpoint:
        ```typescript
        // apps/backend/src/workouts/workouts.controller.ts
        import { Controller, Post, Param, Body, UseGuards, Req, NotFoundException, ForbiddenException } from '@nestjs/common';
        import { WorkoutsService } from './workouts.service';
        import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
        import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
        import { WorkoutOwnerGuard } from './guards/workout-owner.guard'; // New guard
        import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
        import { Request } from 'express'; // For @Req().user

        @ApiTags('Workouts')
        @ApiBearerAuth()
        @Controller('workouts')
        @UseGuards(JwtAuthGuard) // Authenticate first
        export class WorkoutsController {
          constructor(private readonly workoutsService: WorkoutsService) {}

          @Post(':workoutId/logged-exercises/:loggedExerciseId/sets')
          @UseGuards(WorkoutOwnerGuard) // Authorize ownership
          @ApiOperation({ summary: 'Log a new strength set for a logged exercise' })
          @ApiResponse({ status: 201, description: 'Strength set successfully logged.', type: StrengthSetResponseDto }) // Define DTO
          @ApiResponse({ status: 400, description: 'Invalid input data.' })
          @ApiResponse({ status: 401, description: 'Unauthorized.' })
          @ApiResponse({ status: 403, description: 'Forbidden. User does not own the workout session.' })
          @ApiResponse({ status: 404, description: 'Workout session or logged exercise not found.' })
          async logStrengthSet(
            @Req() req: Request,
            @Param('workoutId') workoutId: string,
            @Param('loggedExerciseId') loggedExerciseId: string,
            @Body() createStrengthSetDto: CreateStrengthSetDto,
          ) {
            // userId is available from JwtAuthGuard, attached to req.user
            const userId = (req.user as any).userId; 
            // The WorkoutOwnerGuard will have already verified workoutId ownership.
            // Now, we just need to ensure the loggedExerciseId belongs to the workoutId.

            // This check could also be integrated into the WorkoutService's logic
            const loggedExercise = await this.workoutsService.findLoggedExerciseByIdAndSession(loggedExerciseId, workoutId);
            if (!loggedExercise) {
                throw new NotFoundException(`Logged exercise with ID ${loggedExerciseId} not found in workout ${workoutId}`);
            }

            return this.workoutsService.logStrengthSet(
                userId, // Passed for logging, or if service needs to re-verify
                workoutId,
                loggedExerciseId,
                createStrengthSetDto
            );
          }
        }
        ```
2.  **DTO Definition (`CreateStrengthSetDto`)**:
    *   Create `apps/backend/src/workouts/dto/create-strength-set.dto.ts`.
    *   Utilize `@nestjs/class-validator` decorators.
    ```typescript
    // apps/backend/src/workouts/dto/create-strength-set.dto.ts
    import { IsInt, IsNumber, Min, IsNotEmpty } from 'class-validator';
    import { ApiProperty } from '@nestjs/swagger';

    export class CreateStrengthSetDto {
      @ApiProperty({ description: 'Number of repetitions', example: 10, minimum: 0 })
      @IsInt({ message: 'Reps must be an integer.' })
      @Min(0, { message: 'Reps must be a non-negative number.' })
      @IsNotEmpty({ message: 'Reps cannot be empty.' })
      reps: number;

      @ApiProperty({ description: 'Weight used (in preferred units)', example: 60.5, minimum: 0 })
      @IsNumber({}, { message: 'Weight must be a number.' })
      @Min(0, { message: 'Weight must be a non-negative number.' })
      @IsNotEmpty({ message: 'Weight cannot be empty.' })
      weight: number;

      @ApiProperty({ description: 'The set number within the logged exercise', example: 1, minimum: 1 })
      @IsInt({ message: 'Set number must be an integer.' })
      @Min(1, { message: 'Set number must be a positive number.' })
      @IsNotEmpty({ message: 'Set number cannot be empty.' })
      setNumber: number;
    }

    // A DTO for the response, to avoid exposing all Prisma fields
    export class StrengthSetResponseDto {
        @ApiProperty() id: string;
        @ApiProperty() loggedExerciseId: string;
        @ApiProperty() setNumber: number;
        @ApiProperty() reps: number;
        @ApiProperty() weight: number;
        @ApiProperty() createdAt: Date;
    }
    ```
3.  **Custom Guard (`WorkoutOwnerGuard`)**:
    *   Create `apps/backend/src/workouts/guards/workout-owner.guard.ts`.
    *   This guard checks if the `userId` from the JWT matches the `userId` of the `WorkoutSession` identified by `workoutId` in the request parameters.
    ```typescript
    // apps/backend/src/workouts/guards/workout-owner.guard.ts
    import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
    import { WorkoutsService } from '../workouts.service'; // Adjust path as needed

    @Injectable()
    export class WorkoutOwnerGuard implements CanActivate {
      constructor(private workoutsService: WorkoutsService) {}

      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId; // User ID from JWT payload
        const workoutId = request.params.workoutId; // workoutId from URL params

        if (!userId || !workoutId) {
          throw new ForbiddenException('Missing user or workout ID for authorization check.');
        }

        const workout = await this.workoutsService.findWorkoutSessionByIdAndUser(workoutId, userId);

        if (!workout) {
          // Differentiate between Not Found (e.g., non-existent ID) and Forbidden (exists, but not owned)
          // For simplicity, we'll throw NotFound if it's not found, or Forbidden if it exists but userId doesn't match
          // A more robust check might differentiate if the workout exists at all.
          // For this guard, if `findWorkoutSessionByIdAndUser` returns null, it's either not found or not owned.
          // Let's assume for simplicity, if it's not found for this user, it's effectively "not found" or "forbidden" from their perspective.
          throw new ForbiddenException(`Access to workout session ${workoutId} denied.`);
        }
        
        // If workout is found and owned by the user, attach it to the request for later use if needed
        request.workout = workout; 
        return true;
      }
    }
    ```
4.  **Business Logic (Service Methods)**:
    *   In `apps/backend/src/workouts/workouts.service.ts`:
        ```typescript
        // apps/backend/src/workouts/workouts.service.ts
        import { Injectable, NotFoundException } from '@nestjs/common';
        import { PrismaService } from '../prisma/prisma.service';
        import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
        import { StrengthSet, WorkoutSession, LoggedExercise } from '@prisma/client'; // Import types
        import { LoggerService } from '@/common/logging/logger.service'; // Assuming path

        @Injectable()
        export class WorkoutsService {
          constructor(
            private prisma: PrismaService,
            private logger: LoggerService, // Inject logger
          ) {}

          async findWorkoutSessionByIdAndUser(workoutId: string, userId: string): Promise<WorkoutSession | null> {
            return this.prisma.workoutSession.findUnique({
              where: { id: workoutId, userId: userId },
            });
          }

          async findLoggedExerciseByIdAndSession(loggedExerciseId: string, sessionId: string): Promise<LoggedExercise | null> {
            return this.prisma.loggedExercise.findUnique({
              where: { id: loggedExerciseId, sessionId: sessionId },
            });
          }

          async logStrengthSet(
            userId: string,
            workoutId: string,
            loggedExerciseId: string,
            dto: CreateStrengthSetDto,
          ): Promise<StrengthSet> {
            // The controller and guard ensure workout and logged exercise existence and ownership
            // But a final check in the service adds robustness, especially if called internally
            const workoutSession = await this.findWorkoutSessionByIdAndUser(workoutId, userId);
            if (!workoutSession) {
              this.logger.warn(`Workout session not found for user ${userId} and workoutId ${workoutId}.`);
              throw new NotFoundException(`Workout session ${workoutId} not found.`);
            }

            const loggedExercise = await this.findLoggedExerciseByIdAndSession(loggedExerciseId, workoutId);
            if (!loggedExercise) {
              this.logger.warn(`Logged exercise not found for workoutId ${workoutId} and loggedExerciseId ${loggedExerciseId}.`);
              throw new NotFoundException(`Logged exercise ${loggedExerciseId} not found in workout ${workoutId}.`);
            }

            const strengthSet = await this.prisma.strengthSet.create({
              data: {
                loggedExerciseId: loggedExerciseId,
                setNumber: dto.setNumber,
                reps: dto.reps,
                weight: dto.weight,
              },
            });

            this.logger.log({
              event: 'strength_set_created',
              userId,
              workoutId,
              loggedExerciseId,
              setNumber: dto.setNumber,
              reps: dto.reps,
              weight: dto.weight,
              strengthSetId: strengthSet.id,
            });

            return strengthSet;
          }
        }
        ```
5.  **Data Access (Prisma Models and Query Methods)**:
    *   The `PrismaService` (injected into `WorkoutsService`) handles interactions.
    *   `this.prisma.workoutSession.findUnique(...)` for ownership check.
    *   `this.prisma.loggedExercise.findUnique(...)` for `loggedExerciseId` validity.
    *   `this.prisma.strengthSet.create(...)` for creating the new record.
6.  **Error and Exception Handling**:
    *   `ValidationPipe` (globally configured in `main.ts`) will handle `CreateStrengthSetDto` validation errors and return 400 Bad Request.
    *   `JwtAuthGuard` returns 401 Unauthorized.
    *   `WorkoutOwnerGuard` returns 403 Forbidden.
    *   `NotFoundException` will be thrown by the service if `LoggedExercise` is not found, returning 404 Not Found.
    *   Any other unexpected errors are caught by `SYS-INFRA-ERROR-01` global filter and returned as 500 Internal Server Error.
7.  **Logging and Metrics**:
    *   The `LoggerService` (SYS-INFRA-LOG-01) is used within `WorkoutsService`.
    *   Log `strength_set_created` event upon successful creation, including relevant IDs and values.
    *   Metrics: `workout_strength_set_logged_total`, `workout_strength_set_logged_duration_ms`.

### 🔹 **Data Flow and State Change**

| Type  | Read/Write Target      | Description                                                 |
| :---- | :--------------------- | :---------------------------------------------------------- |
| Read  | `WorkoutSession` table | Check existence and ownership of the workout session.       |
| Read  | `LoggedExercise` table | Check existence of the logged exercise within the session.  |
| Write | `StrengthSet` table    | Inserts a new `StrengthSet` record.                         |
| Audit | Log Event              | Records `strength_set_created` with detailed set parameters. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
  Participant FRONTEND as "Frontend"
  Participant WORKOUTS_CONTROLLER as "workouts.controller.ts"
  Participant JWT_AUTH_GUARD as "JwtAuthGuard"
  Participant WORKOUT_OWNER_GUARD as "WorkoutOwnerGuard"
  Participant WORKOUTS_SERVICE as "workouts.service.ts"
  Participant PRISMA_SERVICE as "PrismaService"
  Participant POSTGRES_DB as "PostgreSQL Database"
  Participant LOGGER as "LoggerService"

  FRONTEND->>WORKOUTS_CONTROLLER: POST /workouts/{id}/logged-exercises/{leId}/sets (Body: DTO)
  activate WORKOUTS_CONTROLLER
  WORKOUTS_CONTROLLER->>JWT_AUTH_GUARD: Validate JWT
  activate JWT_AUTH_GUARD
  JWT_AUTH_GUARD-->>WORKOUTS_CONTROLLER: JWT Valid, userId extracted
  deactivate JWT_AUTH_GUARD
  
  WORKOUTS_CONTROLLER->>WORKOUTS_CONTROLLER: Validate DTO (ValidationPipe)
  alt DTO validation fails
    WORKOUTS_CONTROLLER--xFRONTEND: 400 Bad Request
  else DTO valid
    WORKOUTS_CONTROLLER->>WORKOUT_OWNER_GUARD: Check workout ownership (workoutId, userId)
    activate WORKOUT_OWNER_GUARD
    WORKOUT_OWNER_GUARD->>WORKOUTS_SERVICE: findWorkoutSessionByIdAndUser(workoutId, userId)
    activate WORKOUTS_SERVICE
    WORKOUTS_SERVICE->>PRISMA_SERVICE: findUnique(WorkoutSession, {id, userId})
    activate PRISMA_SERVICE
    PRISMA_SERVICE->>POSTGRES_DB: SELECT * FROM "WorkoutSession" WHERE id=? AND userId=?
    deactivate PRISMA_SERVICE
    POSTGRES_DB-->>WORKOUTS_SERVICE: WorkoutSession | null
    deactivate WORKOUTS_SERVICE
    
    alt WorkoutSession not found or not owned
      WORKOUT_OWNER_GUARD--xWORKOUTS_CONTROLLER: 403 Forbidden (or 404 NotFound based on guard implementation)
      WORKOUTS_CONTROLLER--xFRONTEND: 403 / 404 Error
    else WorkoutSession found and owned
      WORKOUT_OWNER_GUARD-->>WORKOUTS_CONTROLLER: Access Granted
      deactivate WORKOUT_OWNER_GUARD
      WORKOUTS_CONTROLLER->>WORKOUTS_SERVICE: findLoggedExerciseByIdAndSession(loggedExerciseId, workoutId)
      activate WORKOUTS_SERVICE
      WORKOUTS_SERVICE->>PRISMA_SERVICE: findUnique(LoggedExercise, {id, sessionId})
      activate PRISMA_SERVICE
      PRISMA_SERVICE->>POSTGRES_DB: SELECT * FROM "LoggedExercise" WHERE id=? AND sessionId=?
      deactivate PRISMA_SERVICE
      POSTGRES_DB-->>WORKOUTS_SERVICE: LoggedExercise | null
      deactivate WORKOUTS_SERVICE

      alt LoggedExercise not found in session
        WORKOUTS_CONTROLLER--xFRONTEND: 404 Not Found
      else LoggedExercise found
        WORKOUTS_CONTROLLER->>WORKOUTS_SERVICE: logStrengthSet(userId, workoutId, loggedExerciseId, dto)
        activate WORKOUTS_SERVICE
        WORKOUTS_SERVICE->>PRISMA_SERVICE: create(StrengthSet, data: {loggedExerciseId, setNumber, reps, weight})
        activate PRISMA_SERVICE
        PRISMA_SERVICE->>POSTGRES_DB: INSERT INTO "StrengthSet" (...) VALUES (...)
        deactivate PRISMA_SERVICE
        POSTGRES_DB-->>PRISMA_SERVICE: New StrengthSet record
        deactivate PRISMA_SERVICE
        WORKOUTS_SERVICE->>LOGGER: Log strength_set_created event
        activate LOGGER
        LOGGER-->>WORKOUTS_SERVICE: Logged
        deactivate LOGGER
        WORKOUTS_SERVICE-->>WORKOUTS_CONTROLLER: Created StrengthSet
        deactivate WORKOUTS_SERVICE
        WORKOUTS_CONTROLLER-->>FRONTEND: 201 Created, StrengthSet
      end
    end
  end
  deactivate WORKOUTS_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario                        | Error Code          | HTTP Status | User Prompt                                    |
| :------------------------------ | :------------------ | :---------- | :--------------------------------------------- |
| Invalid Input (reps/weight)     | INVALID_INPUT       | 400         | Reps/weight must be non-negative numbers.      |
| Invalid Input (setNumber)       | INVALID_INPUT       | 400         | Set number must be a positive integer.         |
| Unauthenticated                 | UNAUTHORIZED        | 401         | Authentication token is missing or invalid.    |
| Not Authorized (not owner)      | FORBIDDEN_RESOURCE  | 403         | You do not have permission to modify this workout. |
| Workout/Logged Exercise Not Found | RESOURCE_NOT_FOUND  | 404         | The specified workout or exercise entry was not found. |
| Server Error                    | INTERNAL_ERROR      | 500         | System exception. Please try again later.      |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Ensured by deployment configuration (SYS-INFRA-SEC-01).
*   **Authentication (JWT Verification Process)**: Handled by `JwtAuthGuard` (SYS-INFRA-AUTH-01), extracting `userId` from the token.
*   **Authorization**: `WorkoutOwnerGuard` ensures the `userId` in the JWT payload is the owner of the `workoutId` in the URL parameters.
*   **Input Validation**: `CreateStrengthSetDto` with `@Min(0)` and `@IsInt`/`@IsNumber` ensures valid numeric inputs for `reps` and `weight`, preventing malicious or invalid data.
*   **Log Event Naming and Field Standards**: `strength_set_created` event logged with fields: `userId`, `workoutId`, `loggedExerciseId`, `strengthSetId`, `setNumber`, `reps`, `weight`, `ipAddress` (if available from request context).
*   **Metric Naming**: `workout_strength_set_logged_total` (counter for total sets logged), `workout_strength_set_logged_duration_ms` (histogram/summary for request processing time).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user with an existing `WorkoutSession` and `LoggedExercise` they own
*   ✅ When a POST request is made to `/workouts/{id}/logged-exercises/{leId}/sets` with valid `reps`, `weight`, and `setNumber`
*   ✅ Then a new `StrengthSet` record should be created, linked to the `LoggedExercise`, and returned with a 201 Created status.
*   ✅ Given an authenticated user
*   ✅ When a POST request is made with `reps` or `weight` as negative or non-numeric values
*   ✅ Then a 400 Bad Request error should be returned with a clear validation message (UX-007).
*   ✅ Given an authenticated user
*   ✅ When a POST request is made with a `setNumber` that is zero or negative
*   ✅ Then a 400 Bad Request error should be returned with a clear validation message.
*   ✅ Given an authenticated user
*   ✅ When a POST request is made to a `workoutId` or `loggedExerciseId` that does not exist
*   ✅ Then a 404 Not Found error should be returned.
*   ✅ Given an authenticated user
*   ✅ When a POST request is made to a `workoutId` or `loggedExerciseId` that exists but belongs to *another* user
*   ✅ Then a 403 Forbidden error should be returned.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                        |
| :----------------- | :----------- | :----------------------------------------------------------------- |
| Single Responsibility | ✅            | Controller handles request, service handles business logic for logging a set. |
| Independence       | ✅            | Logic is self-contained for creating a strength set, relying on existing workout/exercise entities. |
| Testability        | ✅            | Controller, service, and guard are all designed for unit and integration testing. |
| Small Subset Testing | ✅            | The API endpoint and its associated logic can be tested in isolation. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/workouts/dto/create-strength-set.dto.ts
apps/backend/src/workouts/guards/workout-owner.guard.ts
apps/backend/src/prisma/schema.prisma
packages/shared-types/src/workout.types.ts
```

<!-- impl-batch:TASK-SYS-CORE-WORKOUT-02-02::SYS-CORE-WORKOUT-02::UX-007::TASK-SYS-CORE-WORKOUT-02-03::SYS-CORE-WORKOUT-02::UX-007::TASK-SYS-CORE-WORKOUT-02-04::SYS-CORE-WORKOUT-02::UX-007::TASK-SYS-CORE-WORKOUT-03-01::SYS-CORE-WORKOUT-03::UX-008::TASK-SYS-CORE-WORKOUT-03-02::SYS-CORE-WORKOUT-03::UX-008 -->

## **Task-ID**: TASK-SYS-CORE-WORKOUT-02-02

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S4 Record Strength Training Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-02

**Related UX-ID:** UX-007

**Related UI-ID:** N/A (Backend task, UI interaction handled by `TASK-SYS-CORE-WORKOUT-02-04`)

**Task Name**: BE: Implement WorkoutService.logStrengthSet

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-02-01 (BE: Implement API for Logging Strength Set - assumed controller endpoint exists to call this service)

**DECISION-REF**: DECISION-004 (Pre-filling Strength Set Data)

### **Coverage**:

- Input Validation: `reps` and `weight` must be non-negative numbers. `workoutId` and `loggedExerciseId` must exist and belong to the authenticated user.
- Exceptions: Invalid input (400), WorkoutSession/LoggedExercise not found (404), User Unauthorized (401, handled by guard).
- API/Protocol: Called by `WorkoutController` for `POST /workouts/{id}/logged-exercises/{leId}/sets`.
- Database Changes: Create a new `StrengthSet` record.
- UI/Components: Not covered (Service layer).
- Interaction Logic: Service receives DTO, validates, finds parent entities, calculates `setNumber`, creates `StrengthSet`, returns it.
- Business Boundary Condition: `reps` and `weight` values must be >= 0.
- Observability: Log successful strength set creation and any validation/persistence failures.
- Performance Considerations: Database operations should be efficient using Prisma client. Expected <50ms.
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`CreateStrengthSetDto`):**
        ```typescript
        // apps/backend/src/workouts/dto/create-strength-set.dto.ts
        export class CreateStrengthSetDto {
          reps: number; // e.g., 10
          weight: number; // e.g., 50.5 (kg or lbs, depending on user preference, stored in base unit)
        }
        ```
    *   **Output (`StrengthSet` model from Prisma):**
        ```typescript
        // Prisma.StrengthSet
        {
          id: 'clxxxxxxx',
          loggedExerciseId: 'clzzzzzzz',
          setNumber: 1, // Derived by service
          reps: 10,
          weight: 50.5,
          createdAt: '2023-10-27T10:00:00.000Z'
        }
        ```
*   **Decision point application**: `DECISION-004` states: "The default implementation will not pre-fill any data. All input fields for new sets will start empty to ensure explicit user entry." This decision primarily applies to the frontend. On the backend, it means the service expects explicit `reps` and `weight` values for each new set; it will not attempt to derive them from previous sets. The `setNumber` will be derived by the backend to ensure sequential order.
*   **Main Function/Class Design**
    *   `WorkoutService`: Contains the `logStrengthSet` method.
    *   Responsibilities:
        1.  Validate input `CreateStrengthSetDto` for `reps` and `weight`.
        2.  Verify `workoutId` and `loggedExerciseId` exist and belong to the `userId`.
        3.  Determine the next sequential `setNumber` for the given `loggedExerciseId`.
        4.  Persist the new `StrengthSet` record using Prisma.
        5.  Handle and re-throw application-specific exceptions (e.g., `NotFoundException`, `BadRequestException`).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.ts`
    *   `apps/backend/src/workouts/dto/create-strength-set.dto.ts`
*   **Call Chain**
    `WorkoutController.logStrengthSet` (receives request) → `WorkoutService.logStrengthSet` (validates, persists) → `PrismaClient` (database interaction)

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**: `WorkoutController.logStrengthSet`
    *   Receives `userId` (from JWT), `workoutId` (path param), `loggedExerciseId` (path param), and `CreateStrengthSetDto` (body).
    *   Uses NestJS `ValidationPipe` for DTO schema validation.
    *   Calls `WorkoutService.logStrengthSet`.
    *   Returns 201 Created on success.
2.  **Business Logic (Service Methods)**: `WorkoutService.logStrengthSet`
    *   **Input Validation**: Ensure `reps` and `weight` are non-negative.
        ```typescript
        // In CreateStrengthSetDto, using class-validator
        import { IsNumber, IsPositive, Min } from 'class-validator';
        export class CreateStrengthSetDto {
          @IsNumber()
          @Min(0) // UX-007: non-negative
          reps: number;

          @IsNumber()
          @Min(0) // UX-007: non-negative
          weight: number;
        }
        ```
    *   **Entity Verification**:
        *   Query `LoggedExercise` by `loggedExerciseId`.
        *   Check if `LoggedExercise.sessionId` matches `workoutId`.
        *   Check if `WorkoutSession.userId` matches `userId`.
        *   If any check fails, throw `NotFoundException` or `ForbiddenException`.
    *   **Set Number Derivation**:
        *   Query `StrengthSet` for the given `loggedExerciseId` to find the maximum existing `setNumber`.
        *   `const latestSet = await this.prisma.strengthSet.findFirst({ where: { loggedExerciseId }, orderBy: { setNumber: 'desc' } });`
        *   `const nextSetNumber = (latestSet?.setNumber || 0) + 1;`
    *   **Persistence**: Create the new `StrengthSet` record.
        ```typescript
        const newSet = await this.prisma.strengthSet.create({
          data: {
            loggedExercise: { connect: { id: loggedExerciseId } },
            setNumber: nextSetNumber,
            reps: dto.reps,
            weight: dto.weight,
          },
        });
        ```
3.  **Error and Exception Handling**:
    *   Use NestJS `HttpException` (e.g., `NotFoundException`, `BadRequestException`) for specific scenarios, handled by the global exception filter (`SYS-INFRA-ERROR-01`).
    *   Prisma errors are caught and transformed into appropriate `HttpException`s.
4.  **Logging and Metrics**:
    *   Log successful strength set creation: `this.logger.log({ event: 'strength_set_created', userId, workoutId, loggedExerciseId, setId: newSet.id });`
    *   Log validation errors or not-found errors: `this.logger.warn({ event: 'strength_set_creation_failed', reason: 'validation_error', ... });`

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :------------------------------------------------------ |
| Read | `WorkoutSession`  | To verify `userId` ownership.                           |
| Read | `LoggedExercise`  | To verify `sessionId` and existance.                    |
| Read | `StrengthSet`     | To determine `nextSetNumber` for the `loggedExerciseId`. |
| Write | `StrengthSet`     | Create a new `StrengthSet` record.                      |
| Audit | Log Event         | `strength_set_created`, `strength_set_creation_failed` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant FE as Frontend (UX-007)
participant API as API (/workouts/{id}/logged-exercises/{leId}/sets)
participant WSVC as WorkoutService
participant DB as Prisma (DB)
FE->>API: POST /workouts/123/logged-exercises/456/sets (dto)
activate API
API->>WSVC: logStrengthSet(userId, workoutId, loggedExerciseId, dto)
activate WSVC
WSVC->>DB: find LoggedExercise & WorkoutSession
activate DB
DB-->>WSVC: return LoggedExercise & WorkoutSession
deactivate DB
alt Not found or Unauthorized
WSVC-->>API: throws NotFound/Forbidden
API-->>FE: HTTP 404/403
else Found and Authorized
WSVC->>DB: find max setNumber for loggedExerciseId
activate DB
DB-->>WSVC: return maxSetNumber (or null)
deactivate DB
WSVC->>DB: create StrengthSet (newSetNumber, dto)
activate DB
DB-->>WSVC: return newSet
deactivate DB
WSVC-->>API: return newSet
deactivate WSVC
API-->>FE: HTTP 201 Created (newSet)
deactivate API
end
```

### 🔹 **Error and Exception Mapping**

| Scenario                                    | Error Code      | HTTP Status | User Prompt                             |
| :------------------------------------------ | :-------------- | :---------- | :-------------------------------------- |
| Invalid `reps` or `weight` (e.g., negative) | INVALID_INPUT   | 400         | Reps and weight must be non-negative.   |
| `WorkoutSession` or `LoggedExercise` not found | NOT_FOUND       | 404         | Workout or exercise not found.          |
| `LoggedExercise` does not belong to `WorkoutSession` | FORBIDDEN       | 403         | Access denied for this resource.        |
| `WorkoutSession` does not belong to `userId` | FORBIDDEN       | 403         | Access denied for this resource.        |
| Internal Server Error                     | INTERNAL_ERROR  | 500         | An unexpected error occurred.           |

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): Ensured by SYS-INFRA-SEC-01.
*   Authentication (JWT Verification Process): Handled by NestJS `JwtAuthGuard` (`SYS-INFRA-AUTH-01`) before reaching the controller. `userId` extracted from token.
*   Log Event Naming and Field Standards: `strength_set_created`, `strength_set_creation_failed`, with `userId`, `workoutId`, `loggedExerciseId`, `setId`, `reason` fields.
*   Metric Naming: `workout_strength_set_created_total`, `workout_strength_set_failed_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user and an existing `WorkoutSession` with a `LoggedExercise`
*   ✅ When a valid request to log a strength set (reps >= 0, weight >= 0) is sent to `POST /workouts/{id}/logged-exercises/{leId}/sets`
*   ✅ Then a new `StrengthSet` record should be created in the database, with the correct `setNumber` (incremented), and the API should respond with a 201 status and the created set data.
*   ✅ Given an authenticated user
*   ✅ When a request with invalid `reps` (e.g., string) or `weight` (e.g., -5) is sent
*   ✅ Then the API should respond with a 400 status and an `INVALID_INPUT` error.
*   ✅ Given an authenticated user
*   ✅ When a request to a non-existent `workoutId` or `loggedExerciseId` is sent
*   ✅ Then the API should respond with a 404 status and a `NOT_FOUND` error.
*   ✅ Given an authenticated user
*   ✅ When a request to `loggedExerciseId` not associated with `workoutId`, or `workoutId` not associated with `userId` is sent
*   ✅ Then the API should respond with a 403 status and a `FORBIDDEN` error.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                                                                                                                                                                                                                                                                  |
| :----------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility | ✅            | The service method is solely responsible for creating a strength set, including validation and persistence. It does not handle authentication, authorization (beyond checking ownership), or API response formatting directly, delegating these to guards, controllers, and exception filters respectively. |
| Independence       | ✅            | The service logic is independent of specific UI implementations. It depends on Prisma for data access and NestJS features (like DTO validation) but not on other business modules directly, only on foundational entities (`User`, `WorkoutSession`, `LoggedExercise`).                                |
| Testability        | ✅            | The service method is a pure function (given a Prisma client and DTO, it performs its logic). It can be easily unit-tested by mocking the `PrismaClient` dependency.                                                                                                                                       |
| Small Subset Testing | ✅            | Unit tests can target just this `logStrengthSet` method without needing the entire application context, by mocking its dependencies. Integration tests can target the `/sets` endpoint to verify controller-service-database interaction.                                                            |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/workouts/workouts.controller.ts # (assuming TASK-SYS-CORE-WORKOUT-02-01 creates this)
apps/backend/src/workouts/dto/create-strength-set.dto.ts
packages/db/prisma/schema.prisma # (StrengthSet model already defined)
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-02-03

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S4 Record Strength Training Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-02

**Related UX-ID:** UX-007

**Related UI-ID:** N/A (Backend task)

**Task Name**: BE: Unit/Integration Tests for Logging Strength

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-02-02 (BE: Implement WorkoutService.logStrengthSet)

**DECISION-REF**: N/A

### **Coverage**:

- Input Validation: Test cases for valid and invalid `reps`/`weight` in DTO.
- Exceptions: Test cases for `NotFoundException`, `ForbiddenException` when `workoutId`/`loggedExerciseId` are incorrect or unauthorized.
- API/Protocol: Integration tests for `POST /workouts/{id}/logged-exercises/{leId}/sets` HTTP status codes and response body.
- Database Changes: Verify new `StrengthSet` records are created correctly in unit tests (mocked Prisma) and integration tests (real DB).
- UI/Components: Not applicable.
- Interaction Logic: Unit test `WorkoutService.logStrengthSet` logic. Integration test controller-service-DB flow.
- Business Boundary Condition: Test `reps >= 0`, `weight >= 0`. Test `setNumber` auto-increment logic.
- Observability: Verify logging calls (mock logger).
- Performance Considerations: Not directly measured in tests but ensure tests run efficiently.
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Test Data Examples**:
        *   Valid `CreateStrengthSetDto`: `{ reps: 10, weight: 50.5 }`
        *   Invalid `CreateStrengthSetDto`: `{ reps: -1, weight: 60 }`, `{ reps: 'ten', weight: 50 }`
    *   **Expected Outputs**: `StrengthSet` object on success (unit), `201 Created` with `StrengthSet` body (integration); `400 BadRequest`, `404 NotFound`, `403 Forbidden` with error body on failure.
*   **Decision point application**: No specific `DECISION-REF` applies directly to testing, but tests will ensure the implementation adheres to all related decisions (e.g., `DECISION-004` on the backend means no pre-filling is expected by the service, so tests won't mock that behavior).
*   **Main Function/Class Design**
    *   `WorkoutService` unit tests: `workouts.service.spec.ts`
        *   Mocks `PrismaClient` to isolate service logic.
        *   Tests `logStrengthSet` method directly.
    *   `WorkoutController` integration tests: `workouts.controller.spec.ts`
        *   Uses NestJS testing module to create an e2e testing environment.
        *   Uses `Supertest` to make actual HTTP requests to the controller.
        *   Interacts with a test database (e.g., ephemeral PostgreSQL or SQLite for quick setup).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.spec.ts`
    *   `apps/backend/src/workouts/workouts.controller.spec.ts`
*   **Call Chain**
    *   **Unit**: Test runner → `workouts.service.spec.ts` → `WorkoutService.logStrengthSet` (with mocked dependencies)
    *   **Integration**: Test runner → `workouts.controller.spec.ts` → `Supertest` (HTTP call) → `WorkoutController` → `WorkoutService` → `PrismaClient` (test DB)

### 🔹 **Implementation Logic Decomposition**

**Back-End Process (Testing)**

1.  **Unit Tests (`workouts.service.spec.ts`)**:
    *   **Setup**: Use `Test.createTestingModule` to provide `WorkoutService` with a mocked `PrismaClient` and `Logger`.
    *   **Test Cases**:
        *   **Success**:
            *   Given a valid `userId`, `workoutId`, `loggedExerciseId`, `CreateStrengthSetDto`.
            *   Mock `prisma.loggedExercise.findUnique`, `prisma.workoutSession.findUnique` to return valid entities owned by the user.
            *   Mock `prisma.strengthSet.findFirst` to return previous sets or `null`.
            *   Mock `prisma.strengthSet.create` to return a new `StrengthSet`.
            *   Expect `logStrengthSet` to return the created `StrengthSet` and `prisma.strengthSet.create` to be called with correct data (including derived `setNumber`).
        *   **Invalid Input**:
            *   Given invalid `CreateStrengthSetDto` (e.g., `reps: -1`).
            *   Expect `logStrengthSet` to throw `BadRequestException`.
        *   **Not Found**:
            *   Mock `prisma.loggedExercise.findUnique` to return `null`.
            *   Expect `logStrengthSet` to throw `NotFoundException`.
        *   **Unauthorized/Forbidden**:
            *   Mock `prisma.workoutSession.findUnique` to return an entity not owned by `userId`.
            *   Expect `logStrengthSet` to throw `ForbiddenException`.
        *   **Set Number Calculation**: Test multiple calls to `logStrengthSet` for the same `loggedExerciseId` to ensure `setNumber` increments correctly.
2.  **Integration Tests (`workouts.controller.spec.ts`)**:
    *   **Setup**: Use `Test.createTestingModule` to wire up `WorkoutController`, `WorkoutService`, and a real `PrismaClient` configured to a test database. Mock `AuthGuard` to simulate an authenticated user with a specific `userId`.
    *   **Test Cases**:
        *   **Success (201 Created)**:
            *   Pre-populate test DB with user, workout session, logged exercise.
            *   Send `POST /workouts/{workoutId}/logged-exercises/{leId}/sets` with valid DTO.
            *   Expect HTTP 201 status and the created `StrengthSet` in the response body.
            *   Verify the record exists in the database.
        *   **Invalid Input (400 Bad Request)**:
            *   Send `POST` with DTO missing `reps` or `weight`, or with negative values.
            *   Expect HTTP 400 status.
        *   **Not Found (404 Not Found)**:
            *   Send `POST` to non-existent `workoutId` or `loggedExerciseId`.
            *   Expect HTTP 404 status.
        *   **Unauthorized (401 Unauthorized)**: (Implicitly handled by AuthGuard setup; if guard is not mocked, expect this on unauthenticated request).
        *   **Forbidden (403 Forbidden)**:
            *   Pre-populate DB with entities not owned by the simulated authenticated user.
            *   Send `POST` request.
            *   Expect HTTP 403 status.
        *   **Database State Verification**: After successful creation, query the test database directly to confirm the `StrengthSet` was created correctly, including its `setNumber`.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target    | Description                                                                 |
| :------ | :------------------- | :-------------------------------------------------------------------------- |
| Read    | Test DB / Mocked DB | Query existing `WorkoutSession`, `LoggedExercise`, `StrengthSet` records.   |
| Write   | Test DB / Mocked DB | Create new `StrengthSet` records.                                           |
| Verify  | HTTP Response        | Check status code, headers, and body of API responses.                      |
| Verify  | Logger               | Confirm logger methods were called with expected event data.                |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST as Test Runner
participant USPEC as WorkoutService (Unit Test)
participant ISPEC as WorkoutController (Integration Test)
participant WSVC as WorkoutService (Real)
participant WCTR as WorkoutController (Real)
participant PRISMA as Prisma Client (Mocked/Test DB)
participant HTTP as HTTP Request (Supertest)

TEST->>USPEC: setup unit test context
activate USPEC
USPEC->>PRISMA: mock prisma methods
USPEC->>USPEC: call service.logStrengthSet(valid data)
USPEC->>PRISMA: expect create to be called
USPEC-->>TEST: unit test passed
deactivate USPEC

TEST->>ISPEC: setup integration test context
activate ISPEC
ISPEC->>HTTP: simulate POST /workouts/id/logged-exercises/leId/sets
activate HTTP
HTTP->>WCTR: request received
activate WCTR
WCTR->>WSVC: logStrengthSet(...)
activate WSVC
WSVC->>PRISMA: find entities, calculate setNumber, create
activate PRISMA
PRISMA-->>WSVC: return created set
deactivate PRISMA
WSVC-->>WCTR: return created set
deactivate WSVC
WCTR-->>HTTP: HTTP 201 response
deactivate WCTR
HTTP-->>ISPEC: response received
deactivate HTTP
ISPEC->>PRISMA: verify DB state directly
ISPEC-->>TEST: integration test passed
deactivate ISPEC
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Expected HTTP Status | Expected Error Body (Integration) | Expected Exception (Unit)   |
| :----------------------- | :------------------- | :-------------------------------- | :-------------------------- |
| Invalid DTO input        | 400 Bad Request      | `message: ['reps must be non-negative', ...]` | `BadRequestException`       |
| Workout/LoggedExercise not found | 404 Not Found        | `message: 'Not Found'`            | `NotFoundException`         |
| Unauthorized access      | 403 Forbidden        | `message: 'Forbidden resource'`   | `ForbiddenException`        |
| Server error             | 500 Internal Server Error | `message: 'Internal Server Error'` | `InternalServerErrorException` |

### 🔹 **Security and Observability Hooks**

*   **Authentication Mocking**: For integration tests, ensure the JWT authentication guard is mocked to allow testing without needing to generate actual tokens, but verify that an unauthenticated request would yield a 401.
*   **Logging Verification**: Unit tests for the service should include assertions that the `Logger` service methods (e.g., `log`, `warn`, `error`) are called with the expected structured data on success and failure paths.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a `WorkoutService` instance with mocked `PrismaClient`
*   ✅ When `logStrengthSet` is called with valid data for an existing `LoggedExercise`
*   ✅ Then `prisma.strengthSet.create` should be called with correct parameters including an incremented `setNumber`.
*   ✅ Given an HTTP `POST` request to ` /workouts/{id}/logged-exercises/{leId}/sets` with valid strength set data by an authenticated user
*   ✅ When the request is processed by the controller and service
*   ✅ Then the system should respond with a `201 Created` status, and the new strength set should be verifiable in the database.
*   ✅ Given an HTTP `POST` request with invalid `reps` or `weight` (e.g., negative or non-numeric)
*   ✅ When the request is processed
*   ✅ Then the system should respond with a `400 Bad Request` status indicating input validation failure.
*   ✅ Given an HTTP `POST` request referencing a `workoutId` or `loggedExerciseId` that does not exist
*   ✅ When the request is processed
*   ✅ Then the system should respond with a `404 Not Found` status.
*   ✅ Given an HTTP `POST` request referencing `workoutId` or `loggedExerciseId` that does not belong to the authenticated user
*   ✅ When the request is processed
*   ✅ Then the system should respond with a `403 Forbidden` status.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                                                                                                                             |
| :----------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility | ✅            | Unit tests focus on the service's logic; integration tests focus on the full API flow. Each test case targets a specific scenario.                                 |
| Independence       | ✅            | Unit tests are isolated via mocking. Integration tests use a dedicated test database to avoid side effects on other tests.                                                |
| Testability        | ✅            | The tests demonstrate the service's high testability by easily mocking dependencies. The controller is testable via HTTP request simulation.                           |
| Small Subset Testing | ✅            | Specific functionalities (e.g., `setNumber` calculation, validation rules, error handling paths) are tested independently.                                              |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.spec.ts
apps/backend/src/workouts/workouts.controller.spec.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-02-04

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S4 Record Strength Training Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-02

**Related UX-ID:** UX-007

**Related UI-ID:** UI-012 (ExerciseCard)

**Task Name**: FE: Implement Strength Set Logging UI in Card

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-02-02 (BE: Implement WorkoutService.logStrengthSet)

**DECISION-REF**: DECISION-004 (Pre-filling Strength Set Data)

### **Coverage**:

- Input Validation: Client-side validation for `reps` and `weight` (numeric, non-negative).
- Exceptions: Display error messages from API (400, 404, 403) to user.
- API/Protocol: `workout.service.ts` client calls `POST /api/v1/workouts/{id}/logged-exercises/{leId}/sets`.
- Database Changes: Not applicable.
- UI/Components: `src/components/workout/ExerciseCard.tsx` or similar, including input fields, "Add Set" button, and display for logged sets.
- Interaction Logic: User input, client-side validation, API call, state update (optimistic or after success), error display, loading states.
- Business Boundary Condition: `reps` and `weight` must be numeric and non-negative.
- Observability: Client-side error logging (e.g., Sentry for UI errors).
- Performance Considerations: Debounced input, efficient re-rendering of the exercise card.
- Non-Functional: Internationalization for labels and error messages. Accessibility labels for input fields. Responsive design for mobile adaptation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (User interaction):**
        *   `reps` (e.g., 10) in an input field.
        *   `weight` (e.g., 50.5) in an input field.
    *   **Output (UI state change & API call):**
        *   Updated `LoggedExercise` object within the workout session state.
        *   API call with `CreateStrengthSetDto`.
*   **Decision point application**: `DECISION-004` states: "The default implementation will not pre-fill any data. All input fields for new sets will start empty to ensure explicit user entry."
    *   This means the input fields for `reps` and `weight` in the `ExerciseCard` will initialize as empty strings or `null`. No attempt will be made to pre-populate them with values from previous sets or user history.
*   **Main Function/Class Design**
    *   `ExerciseCard` (React component): Displays exercise details, existing sets, and input fields to add new sets.
    *   `WorkoutService` (Frontend API client): Handles the HTTP `POST` request to the backend.
    *   `useWorkout` (Custom hook or state management): Manages the current workout session state, including adding new sets.
    *   Responsibilities:
        1.  Render input fields for `reps` and `weight`.
        2.  Render a button to "Add Set".
        3.  Perform client-side validation on input.
        4.  Call the backend API `workout.service.ts` to log the new set.
        5.  Update local component state and global workout state (e.g., via `useWorkout` or Redux/Zustand).
        6.  Display loading indicators during API calls.
        7.  Display error messages for failed API calls or client-side validation.
        8.  Display previously logged sets for the exercise.
*   **Code Location**
    *   `apps/frontend/src/components/workout/ExerciseCard.tsx`
    *   `apps/frontend/src/services/workout.service.ts`
    *   `apps/frontend/src/store/workoutStore.ts` (if using Zustand/Redux)
    *   `apps/frontend/src/hooks/useWorkout.ts` (if using a custom hook)
*   **Call Chain**
    `User Input` → `ExerciseCard` (client-side validation) → `workout.service.ts` (API call) → `Backend API` → `workout.service.ts` (response) → `ExerciseCard` (update UI/state)

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: `apps/frontend/src/components/workout/ExerciseCard.tsx` (within `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`).
2.  **Triggering Logic**:
    *   `onChange` event on `reps` and `weight` input fields to update local component state.
    *   `onClick` event on the "Add Set" button.
3.  **Client-side Validation (Decision hook application)**:
    *   When the "Add Set" button is clicked:
        *   Check if `reps` and `weight` inputs are valid numbers.
        *   Check if `reps` and `weight` are non-negative (`>= 0`).
        *   If validation fails, display inline error messages next to the input fields.
    *   **DECISION-004**: Input fields for `reps` and `weight` will start empty.
        ```typescript
        // Inside ExerciseCard.tsx
        const [repsInput, setRepsInput] = useState('');
        const [weightInput, setWeightInput] = useState('');
        // ...
        <input type="number" value={repsInput} onChange={(e) => setRepsInput(e.target.value)} />
        <input type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)} />
        ```
4.  **Interaction with the Backend**:
    *   On successful client-side validation, call `workoutService.logStrengthSet(workoutId, loggedExerciseId, { reps: Number(repsInput), weight: Number(weightInput) });`
    *   `workoutService` uses `axios` to make the `POST` request.
    *   Handle `loading` state (`setIsLoading(true)` before call, `setIsLoading(false)` after).
5.  **UI Success/Failure Feedback and State Recovery**:
    *   **Success (201 Created)**:
        *   Clear `repsInput` and `weightInput` fields.
        *   Update the `WorkoutSession` state (e.g., using `useWorkout` hook to add the newly created set to the relevant `LoggedExercise`). This will trigger a re-render to display the new set.
        *   Display a transient success message (e.g., toast notification).
    *   **Failure (400, 404, 403, 500)**:
        *   Display a user-friendly error message, ideally near the input fields or as a modal/toast (e.g., "Invalid input for reps/weight", "Workout session not found", "Failed to add set. Please try again.").
        *   Do not clear input fields, allowing the user to correct them.
    *   **State Management**: The component should subscribe to workout session changes. When the backend successfully adds a set, the updated workout session object (either fetched again or optimistically updated) should trigger a UI refresh showing the new set.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                                                         |
| :------ | :---------------- | :---------------------------------------------------------------------------------- |
| Read    | UI Input Fields   | User-entered `reps` and `weight`.                                                   |
| Read    | Global State      | Current `WorkoutSession` details (e.g., `workoutId`, `loggedExerciseId`, existing sets). |
| Write   | Local State       | `repsInput`, `weightInput`, `isLoading`, `error` messages.                        |
| Write   | Global State      | Add new `StrengthSet` to the `LoggedExercise` within `WorkoutSession`.            |
| Audit   | Console/Sentry    | Log client-side errors or API call failures.                                        |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as User
participant COMP as ExerciseCard (FE)
participant WSVC as WorkoutService (FE Client)
participant API as API (BE)
participant STATE as Global State (FE)

USER->>COMP: enters reps and weight
activate COMP
COMP->>COMP: update local input state
COMP->>USER: displays current input
USER->>COMP: clicks "Add Set" button
COMP->>COMP: client-side validation
alt Validation fails
COMP->>USER: display inline error
else Validation succeeds
COMP->>COMP: set loading state
COMP->>WSVC: logStrengthSet(workoutId, loggedExerciseId, dto)
activate WSVC
WSVC->>API: POST /workouts/id/logged-exercises/leId/sets
activate API
API-->>WSVC: HTTP 201 Created (newSet) or Error
deactivate API
WSVC-->>COMP: return newSet or error
deactivate WSVC
alt API call successful
COMP->>STATE: update workout session with newSet
activate STATE
STATE-->>COMP: updated session
deactivate STATE
COMP->>COMP: clear input fields, unset loading
COMP->>USER: displays new set, success message
else API call failed
COMP->>COMP: unset loading
COMP->>USER: display API error message
end
end
deactivate COMP
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code     | HTTP Status | User Prompt                                    |
| :----------------------- | :------------- | :---------- | :--------------------------------------------- |
| Invalid Input (FE)       | CLIENT_VALIDATION | N/A         | Reps/Weight must be valid numbers (e.g., 10), and non-negative. |
| Invalid Input (BE)       | INVALID_INPUT  | 400         | Invalid Reps or Weight provided.               |
| Workout/Exercise Not Found | NOT_FOUND      | 404         | The workout or exercise could not be found.    |
| Unauthorized Action      | FORBIDDEN      | 403         | You are not authorized to add sets to this exercise. |
| Server Error             | INTERNAL_ERROR | 500         | An unexpected error occurred. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Frontend always communicates with backend over HTTPS (SYS-INFRA-SEC-01).
*   **Authentication**: Frontend includes JWT in `Authorization` header for all authenticated requests.
*   **Client-side Error Logging**: Integrate a client-side error tracking tool (e.g., Sentry, configured in `apps/frontend/lib/logger.ts`) to capture JavaScript errors and API failures, sending relevant context (user ID, component name).
*   **Accessibility Labels**: Use `aria-label` or `htmlFor` for input fields for screen reader compatibility.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user on an active workout session page with an `ExerciseCard`
*   ✅ When the user enters valid non-negative numbers for `reps` and `weight` into the input fields (which are initially empty due to `DECISION-004`)
*   ✅ And clicks the "Add Set" button
*   ✅ Then a loading indicator should appear, a `POST` request should be sent to the backend, and upon success, the input fields should clear, the new set should be displayed in the card, and the loading indicator should disappear.
*   ✅ Given the same scenario with invalid input (e.g., text, negative numbers)
*   ✅ When the user clicks "Add Set"
*   ✅ Then client-side validation errors should display, and no API call should be made.
*   ✅ Given an API call failure (e.g., 400, 404, 500)
*   ✅ When the API response is received
*   ✅ Then an appropriate error message should be displayed to the user, and the input fields should retain their values.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                                                                                                              |
| :----------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility | ✅            | `ExerciseCard` handles UI rendering and user interaction for adding sets. `workout.service.ts` handles API calls. Global state manages workout data.   |
| Independence       | ✅            | The `ExerciseCard` component is reusable and depends only on its props and the `workout.service.ts` API client. It doesn't know about other pages.     |
| Testability        | ✅            | The component can be unit-tested using React Testing Library (mocking API calls and global state hooks). E2E tests can cover the full user flow.      |
| Small Subset Testing | ✅            | Input validation, API call initiation, loading states, and error display logic can be tested in isolation.                                             |

### 🔹 **Code Location**

```
apps/frontend/src/components/workout/ExerciseCard.tsx
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
apps/frontend/src/services/workout.service.ts
apps/frontend/src/store/workoutStore.ts # (or relevant state management file)
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-03-01

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S5 Record Cardio/Time-Based Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-03

**Related UX-ID:** UX-008

**Related UI-ID:** N/A (Backend task, UI interaction will be in a subsequent FE task)

**Task Name**: BE: Implement API for Logging Cardio Entry

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-CORE-WORKOUT-01 (Initiate Workout Session)

**DECISION-REF**: N/A

### **Coverage**:

- Input Validation: `durationSeconds` and `distanceMeters` must be non-negative numbers. At least one of `durationSeconds` or `distanceMeters` must be provided.
- Exceptions: Invalid input (400), WorkoutSession/LoggedExercise not found (404), CardioEntry already exists for LoggedExercise (409), User Unauthorized (401, handled by guard).
- API/Protocol: `POST /workouts/{id}/logged-exercises/{leId}/cardio`.
- Database Changes: Create a new `CardioEntry` record.
- UI/Components: Not covered (Controller layer).
- Interaction Logic: Controller receives DTO, validates, calls `WorkoutService.logCardioEntry`, returns 201 Created.
- Business Boundary Condition: `durationSeconds >= 0`, `distanceMeters >= 0`. At least one value present.
- Observability: Log API request and response details.
- Performance Considerations: Standard API response time (<50ms).
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`CreateCardioEntryDto`):**
        ```typescript
        // apps/backend/src/workouts/dto/create-cardio-entry.dto.ts
        export class CreateCardioEntryDto {
          durationSeconds?: number; // e.g., 1800 (30 minutes)
          distanceMeters?: number;  // e.g., 5000 (5 kilometers)
        }
        ```
    *   **Output (`CardioEntry` model from Prisma):**
        ```typescript
        // Prisma.CardioEntry
        {
          id: 'clxxxxxxx',
          loggedExerciseId: 'clzzzzzzz',
          durationSeconds: 1800,
          distanceMeters: 5000,
          createdAt: '2023-10-27T10:30:00.000Z'
        }
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `WorkoutController`: Contains the `logCardioEntry` endpoint.
    *   Responsibilities:
        1.  Receive `POST` requests to `/workouts/{id}/logged-exercises/{leId}/cardio`.
        2.  Extract `userId` from JWT, `workoutId` and `loggedExerciseId` from path parameters.
        3.  Apply `ValidationPipe` for `CreateCardioEntryDto`.
        4.  Delegate business logic to `WorkoutService.logCardioEntry`.
        5.  Return appropriate HTTP status (201 Created on success, 4xx on failure).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.controller.ts`
    *   `apps/backend/src/workouts/dto/create-cardio-entry.dto.ts`
*   **Call Chain**
    `JwtAuthGuard` (authentication) → `WorkoutController.logCardioEntry` (request handling) → `WorkoutService.logCardioEntry` (business logic)

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**: `WorkoutController.logCardioEntry`
    *   **Route Definition**:
        ```typescript
        // apps/backend/src/workouts/workouts.controller.ts
        import { Controller, Post, Param, Body, UseGuards, Req, HttpCode } from '@nestjs/common';
        import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // SYS-INFRA-AUTH-01
        import { WorkoutsService } from './workouts.service';
        import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';
        import { Request } from 'express'; // for userId

        @UseGuards(JwtAuthGuard)
        @Controller('workouts')
        export class WorkoutsController {
          constructor(private readonly workoutsService: WorkoutsService) {}

          @Post(':workoutId/logged-exercises/:loggedExerciseId/cardio')
          @HttpCode(201)
          async logCardioEntry(
            @Req() req: Request,
            @Param('workoutId') workoutId: string,
            @Param('loggedExerciseId') loggedExerciseId: string,
            @Body() createCardioEntryDto: CreateCardioEntryDto,
          ) {
            const userId = req.user['id']; // Extracted from JWT payload
            return this.workoutsService.logCardioEntry(
              userId,
              workoutId,
              loggedExerciseId,
              createCardioEntryDto,
            );
          }
        }
        ```
    *   **Authentication**: `JwtAuthGuard` ensures `req.user` is populated.
    *   **DTO Validation**: `CreateCardioEntryDto` will have class-validator decorators.
        ```typescript
        // apps/backend/src/workouts/dto/create-cardio-entry.dto.ts
        import { IsNumber, IsOptional, Min, ValidateIf } from 'class-validator';

        export class CreateCardioEntryDto {
          @IsOptional()
          @IsNumber()
          @Min(0) // UX-008: non-negative
          @ValidateIf(o => o.distanceMeters !== undefined) // Only validate if present
          durationSeconds?: number;

          @IsOptional()
          @IsNumber()
          @Min(0) // UX-008: non-negative
          @ValidateIf(o => o.durationSeconds !== undefined) // Only validate if present
          distanceMeters?: number;

          // Custom validator or service logic to ensure at least one is provided
          // For NestJS, this can be done via a custom decorator or in the service.
          // For simplicity here, will assume service handles the "at least one" rule.
        }
        ```
2.  **Error and Exception Handling**:
    *   NestJS `ValidationPipe` automatically transforms validation errors into `400 BadRequest` responses.
    *   Exceptions thrown by `WorkoutService.logCardioEntry` (e.g., `NotFoundException`, `ConflictException`) are caught by the global exception filter (`SYS-INFRA-ERROR-01`) and converted to standardized HTTP error responses.
3.  **Logging and Metrics**:
    *   The controller itself primarily logs incoming requests and outgoing responses using the global logging interceptor.
    *   Specific business event logging is delegated to the `WorkoutService`.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                         |
| :------ | :---------------- | :-------------------------------------------------- |
| Read    | Request Body      | `CreateCardioEntryDto` (durationSeconds, distanceMeters). |
| Read    | Path Parameters   | `workoutId`, `loggedExerciseId`.                    |
| Read    | JWT Payload       | `userId`.                                           |
| Write   | HTTP Response     | `201 Created` with `CardioEntry` on success.        |
| Audit   | Access Log        | Record API call to `/workouts/id/logged-exercises/leId/cardio`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as API Client
participant GAURD as JwtAuthGuard
participant WCTR as WorkoutController
participant WSVC as WorkoutService
participant DB as Prisma (DB)

CLIENT->>WCTR: POST /workouts/id/logged-exercises/leId/cardio (dto)
activate WCTR
WCTR->>GAURD: validate JWT
activate GAURD
GAURD-->>WCTR: JWT valid, userId extracted
deactivate GAURD
WCTR->>WCTR: DTO validation (ValidationPipe)
alt DTO validation fails
WCTR-->>CLIENT: HTTP 400 Bad Request
else DTO validation succeeds
WCTR->>WSVC: logCardioEntry(userId, workoutId, loggedExerciseId, dto)
activate WSVC
WSVC->>DB: check entities, create CardioEntry
activate DB
DB-->>WSVC: return created CardioEntry or Error
deactivate DB
WSVC-->>WCTR: return created CardioEntry or Error
deactivate WSVC
alt Service returns Error
WCTR-->>CLIENT: HTTP 404/409/500
else Service returns CardioEntry
WCTR-->>CLIENT: HTTP 201 Created (CardioEntry)
end
end
deactivate WCTR
```

### 🔹 **Error and Exception Mapping**

| Scenario                                    | Error Code      | HTTP Status | User Prompt                             |
| :------------------------------------------ | :-------------- | :---------- | :-------------------------------------- |
| Invalid `durationSeconds` or `distanceMeters` | INVALID_INPUT   | 400         | Duration and distance must be non-negative. At least one must be provided. |
| `WorkoutSession` or `LoggedExercise` not found | NOT_FOUND       | 404         | Workout or exercise not found.          |
| `LoggedExercise` does not belong to `WorkoutSession` | FORBIDDEN       | 403         | Access denied for this resource.        |
| `WorkoutSession` does not belong to `userId` | FORBIDDEN       | 403         | Access denied for this resource.        |
| `CardioEntry` already exists for `LoggedExercise` | CONFLICT        | 409         | Cardio entry already exists for this exercise. |
| Internal Server Error                     | INTERNAL_ERROR  | 500         | An unexpected error occurred.           |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Ensured by SYS-INFRA-SEC-01, applied at the deployment level for all API traffic.
*   **Authentication (JWT Verification Process)**: `JwtAuthGuard` (`SYS-INFRA-AUTH-01`) protects the endpoint, validating the JWT and extracting `userId`.
*   **Log Event Naming and Field Standards**: Controller access logs (handled by `SYS-INFRA-LOG-01` interceptor) will record endpoint, method, status, duration. Specific business logic logging is in the service.
*   **Metric Naming**: `api_workout_cardio_create_total`, `api_workout_cardio_create_duration_ms`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user with a valid JWT
*   ✅ When a `POST` request is sent to ` /workouts/{id}/logged-exercises/{leId}/cardio` with a `CreateCardioEntryDto` containing valid non-negative `durationSeconds` or `distanceMeters` (or both)
*   ✅ And the `workoutId` and `loggedExerciseId` exist and belong to the user
*   ✅ And no `CardioEntry` already exists for `loggedExerciseId`
*   ✅ Then the API should respond with a `201 Created` status and the newly created `CardioEntry` data.
*   ✅ Given a `POST` request with invalid `durationSeconds` or `distanceMeters` (e.g., negative, non-numeric)
*   ✅ When the request is sent
*   ✅ Then the API should respond with a `400 Bad Request` status.
*   ✅ Given a `POST` request where both `durationSeconds` and `distanceMeters` are omitted or `null`
*   ✅ When the request is sent
*   ✅ Then the API should respond with a `400 Bad Request` status.
*   ✅ Given a `POST` request to a `workoutId` or `loggedExerciseId` that does not exist
*   ✅ When the request is sent
*   ✅ Then the API should respond with a `404 Not Found` status.
*   ✅ Given a `POST` request to a `loggedExerciseId` for which a `CardioEntry` already exists
*   ✅ When the request is sent
*   ✅ Then the API should respond with a `409 Conflict` status.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                                                                                                                                                                     |
| :----------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility | ✅            | The controller focuses on request parsing, authentication (via guard), DTO validation, and delegating to the service. It does not contain core business logic.                                             |
| Independence       | ✅            | The controller depends on `JwtAuthGuard` and `WorkoutsService`, but is independent of specific database implementations (abstracted by service/Prisma) or UI details.                                        |
| Testability        | ✅            | The controller can be integration tested using `Supertest` to simulate HTTP requests. Dependencies like `WorkoutsService` can be mocked to isolate controller logic.                                       |
| Small Subset Testing | ✅            | API endpoint validation (e.g., path params, DTO validation errors) and guard integration can be tested without fully engaging the underlying business logic or database.                                     |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
apps/backend/src/workouts/dto/create-cardio-entry.dto.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-03-02

**Related Epic**: EPIC-002 Workout Session Management

**Related Story**: EPIC-002-S5 Record Cardio/Time-Based Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-03

**Related UX-ID:** UX-008

**Related UI-ID:** N/A (Backend task)

**Task Name**: BE: Implement WorkoutService.logCardioEntry

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-03-01 (BE: Implement API for Logging Cardio Entry)

**DECISION-REF**: N/A

### **Coverage**:

- Input Validation: `durationSeconds` and `distanceMeters` must be non-negative numbers. At least one of `durationSeconds` or `distanceMeters` must be provided. `workoutId` and `loggedExerciseId` must exist and belong to the authenticated user.
- Exceptions: Invalid input (400), WorkoutSession/LoggedExercise not found (404), CardioEntry already exists for LoggedExercise (409), User Unauthorized (401, handled by guard).
- API/Protocol: Called by `WorkoutController` for `POST /workouts/{id}/logged-exercises/{leId}/cardio`.
- Database Changes: Create a new `CardioEntry` record.
- UI/Components: Not covered (Service layer).
- Interaction Logic: Service receives DTO, validates (including "at least one present"), verifies entities, checks for existing cardio entry, creates `CardioEntry`, returns it.
- Business Boundary Condition: `durationSeconds >= 0`, `distanceMeters >= 0`. At least one must be non-null.
- Observability: Log successful cardio entry creation and any validation/persistence failures.
- Performance Considerations: Database operations should be efficient using Prisma client. Expected <50ms.
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (`CreateCardioEntryDto`):**
        ```typescript
        // apps/backend/src/workouts/dto/create-cardio-entry.dto.ts
        export class CreateCardioEntryDto {
          durationSeconds?: number; // e.g., 1800
          distanceMeters?: number;  // e.g., 5000
        }
        ```
    *   **Output (`CardioEntry` model from Prisma):**
        ```typescript
        // Prisma.CardioEntry
        {
          id: 'clxxxxxxx',
          loggedExerciseId: 'clzzzzzzz',
          durationSeconds: 1800,
          distanceMeters: null, // or a number if provided
          createdAt: '2023-10-27T10:30:00.000Z'
        }
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `WorkoutService`: Contains the `logCardioEntry` method.
    *   Responsibilities:
        1.  Validate input `CreateCardioEntryDto` for non-negativity and "at least one present" rule.
        2.  Verify `workoutId` and `loggedExerciseId` exist and belong to the `userId`.
        3.  Check if a `CardioEntry` already exists for the given `loggedExerciseId` (due to `@unique` constraint in schema).
        4.  Persist the new `CardioEntry` record using Prisma.
        5.  Handle and re-throw application-specific exceptions (e.g., `NotFoundException`, `BadRequestException`, `ConflictException`).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.ts`
    *   `apps/backend/src/workouts/dto/create-cardio-entry.dto.ts`
*   **Call Chain**
    `WorkoutController.logCardioEntry` (receives DTO) → `WorkoutService.logCardioEntry` (validates, persists) → `PrismaClient` (database interaction)

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**: Already described in `TASK-SYS-CORE-WORKOUT-03-01`. The controller simply calls this service method.
2.  **Business Logic (Service Methods)**: `WorkoutService.logCardioEntry`
    *   **Input Validation**: Beyond `IsNumber` and `Min(0)` from DTO, also ensure at least one of `durationSeconds` or `distanceMeters` is provided.
        ```typescript
        // apps/backend/src/workouts/workouts.service.ts
        // ... inside logCardioEntry method
        if (!dto.durationSeconds && !dto.distanceMeters) {
          throw new BadRequestException('At least one of durationSeconds or distanceMeters must be provided.');
        }
        ```
    *   **Entity Verification**:
        *   Query `LoggedExercise` by `loggedExerciseId`, including its `session` and `session.user`.
        *   `const loggedExercise = await this.prisma.loggedExercise.findUnique({ where: { id: loggedExerciseId }, include: { session: { include: { user: true } } } });`
        *   Check if `loggedExercise` exists.
        *   Check if `loggedExercise.sessionId` matches `workoutId`.
        *   Check if `loggedExercise.session.userId` matches `userId`.
        *   If any check fails, throw `NotFoundException` or `ForbiddenException`.
    *   **Uniqueness Check**: Before creating, check if a `CardioEntry` already exists for this `loggedExerciseId`.
        *   `const existingCardio = await this.prisma.cardioEntry.findUnique({ where: { loggedExerciseId } });`
        *   If `existingCardio` exists, throw a `ConflictException` because a `LoggedExercise` can only have one `CardioEntry` (due to `loggedExerciseId @unique` in schema).
    *   **Persistence**: Create the new `CardioEntry` record.
        ```typescript
        const newCardioEntry = await this.prisma.cardioEntry.create({
          data: {
            loggedExercise: { connect: { id: loggedExerciseId } },
            durationSeconds: dto.durationSeconds,
            distanceMeters: dto.distanceMeters,
          },
        });
        ```
3.  **Error and Exception Handling**:
    *   Use NestJS `HttpException` (`BadRequestException`, `NotFoundException`, `ForbiddenException`, `ConflictException`).
    *   Prisma errors are caught and transformed.
4.  **Logging and Metrics**:
    *   Log successful cardio entry creation: `this.logger.log({ event: 'cardio_entry_created', userId, workoutId, loggedExerciseId, cardioId: newCardioEntry.id });`
    *   Log validation errors or conflicts: `this.logger.warn({ event: 'cardio_entry_creation_failed', reason: 'conflict_or_validation', ... });`

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :------------------------------------------------------ |
| Read | `WorkoutSession`  | To verify `userId` ownership.                           |
| Read | `LoggedExercise`  | To verify `sessionId` and existance.                    |
| Read | `CardioEntry`     | To check for existing entry for `loggedExerciseId`.     |
| Write | `CardioEntry`     | Create a new `CardioEntry` record.                      |
| Audit | Log Event         | `cardio_entry_created`, `cardio_entry_creation_failed` |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant WCTR as WorkoutController
participant WSVC as WorkoutService
participant DB as Prisma (DB)

WCTR->>WSVC: logCardioEntry(userId, workoutId, loggedExerciseId, dto)
activate WSVC
WSVC->>WSVC: validate "at least one metric"
alt Validation fails
WSVC-->>WCTR: throws BadRequest
else Validation succeeds
WSVC->>DB: find LoggedExercise & WorkoutSession for ownership
activate DB
DB-->>WSVC: return LoggedExercise & WorkoutSession
deactivate DB
alt Not found or Unauthorized
WSVC-->>WCTR: throws NotFound/Forbidden
else Found and Authorized
WSVC->>DB: find existing CardioEntry for loggedExerciseId
activate DB
DB-->>WSVC: return existingCardio (or null)
deactivate DB
alt CardioEntry already exists
WSVC-->>WCTR: throws Conflict
else No existing CardioEntry
WSVC->>DB: create CardioEntry (dto)
activate DB
DB-->>WSVC: return newCardioEntry
deactivate DB
WSVC-->>WCTR: return newCardioEntry
end
end
end
deactivate WSVC
```

### 🔹 **Error and Exception Mapping**

| Scenario                                    | Error Code      | HTTP Status | User Prompt                             |
| :------------------------------------------ | :-------------- | :---------- | :-------------------------------------- |
| Invalid `durationSeconds` or `distanceMeters` | INVALID_INPUT   | 400         | Duration and distance must be non-negative. At least one must be provided. |
| `WorkoutSession` or `LoggedExercise` not found | NOT_FOUND       | 404         | Workout or exercise not found.          |
| `LoggedExercise` does not belong to `WorkoutSession` | FORBIDDEN       | 403         | Access denied for this resource.        |
| `WorkoutSession` does not belong to `userId` | FORBIDDEN       | 403         | Access denied for this resource.        |
| `CardioEntry` already exists for `LoggedExercise` | CONFLICT        | 409         | Cardio entry already exists for this exercise. |
| Internal Server Error                     | INTERNAL_ERROR  | 500         | An unexpected error occurred.           |

### 🔹 **Security and Observability Hooks**

*   **Transport Security (HTTPS/TLS)**: Ensured by SYS-INFRA-SEC-01.
*   **Authentication (JWT Verification Process)**: `userId` is passed from the authenticated controller. Service assumes authentication is already verified.
*   **Log Event Naming and Field Standards**: `cardio_entry_created`, `cardio_entry_creation_failed`, with `userId`, `workoutId`, `loggedExerciseId`, `cardioId`, `reason` fields.
*   **Metric Naming**: `workout_cardio_entry_created_total`, `workout_cardio_entry_failed_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user, an existing `WorkoutSession` with a `LoggedExercise`, and no existing `CardioEntry` for that `LoggedExercise`
*   ✅ When `logCardioEntry` is called with valid non-negative `durationSeconds` or `distanceMeters` (or both)
*   ✅ Then a new `CardioEntry` record should be created in the database, and the service should return the created entry.
*   ✅ Given `logCardioEntry` is called with invalid `durationSeconds` (e.g., -5) or both `durationSeconds` and `distanceMeters` are `null`/undefined
*   ✅ When the service processes the request
*   ✅ Then it should throw a `BadRequestException`.
*   ✅ Given `logCardioEntry` is called with a `workoutId` or `loggedExerciseId` that does not exist or does not belong to the user
*   ✅ When the service processes the request
*   ✅ Then it should throw a `NotFoundException` or `ForbiddenException`.
*   ✅ Given an existing `CardioEntry` for the `loggedExerciseId`
*   ✅ When `logCardioEntry` is called for the same `loggedExerciseId`
*   ✅ Then it should throw a `ConflictException`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                                                                                                                                                                                                                                                                                             |
| :----------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single Responsibility | ✅            | The service method is solely responsible for the business logic of creating a cardio entry, including input validation, ownership checks, uniqueness enforcement, and persistence. It does not handle HTTP request/response directly, delegating to the controller.                                                               |
| Independence       | ✅            | The service logic is independent of specific UI implementations. It depends on Prisma for data access and NestJS DTOs/exceptions, but its core logic for creating a `CardioEntry` is self-contained.                                                                                                                               |
| Testability        | ✅            | The service method is highly testable by mocking the `PrismaClient`. All validation paths, existence checks, ownership verification, and conflict detection can be unit-tested efficiently.                                                                                                                                         |
| Small Subset Testing | ✅            | Specific aspects like "at least one metric" validation, `CardioEntry` uniqueness, and proper entity lookup can be tested in isolation, ensuring each piece of logic functions correctly before integration.                                                                                                                    |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/workouts/dto/create-cardio-entry.dto.ts
packages/db/prisma/schema.prisma # (CardioEntry model already defined)
```

<!-- impl-batch:TASK-SYS-CORE-WORKOUT-03-03::SYS-CORE-WORKOUT-03::UX-008::TASK-SYS-CORE-WORKOUT-03-04::SYS-CORE-WORKOUT-03::UX-008::TASK-SYS-CORE-WORKOUT-04-01::SYS-CORE-WORKOUT-04::UX-010::TASK-SYS-CORE-WORKOUT-04-02::SYS-CORE-WORKOUT-04::UX-010::TASK-SYS-CORE-WORKOUT-04-03::SYS-CORE-WORKOUT-04::UX-010 -->

## **Task-ID**: TASK-SYS-CORE-WORKOUT-03-03

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S5 Record Cardio/Time-Based Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-03

**Related UX-ID:** UX-008

**Task Name**: BE: Unit/Integration Tests for Logging Cardio

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-03-02

### **Coverage**:

- Input Validation: Duration and distance must be non-negative numbers (UX-008)
- Exceptions: Session Not Found, Logged Exercise Not Found, Invalid Input
- API/Protocol: Internal service and controller calls (simulated for tests)
- Database Changes: Not Covered (testing existing `CardioEntry` creation)
- UI/Components: Not Covered
- Interaction Logic: Not Covered
- Business Boundary Condition: Duration and distance cannot be negative.
- Observability: Verify log entries for successful and failed operations.
- Performance Considerations: Test execution time.
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `LoggedExercise` ID (`string`), `AddCardioEntryDto` (`{ durationSeconds: number; distanceMeters: number; }`)
        *   Example DTO: `{ "durationSeconds": 3600, "distanceMeters": 10000.5 }`
    *   **Output**: `CardioEntry` object on success.
*   **Main Function/Class Design**
    *   `WorkoutService` methods: `logCardioEntry` (responsibility: persist cardio data, apply business rules).
    *   `WorkoutController` methods: `addCardioEntry` (responsibility: validate request, delegate to service).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.spec.ts` (Unit tests for service)
    *   `apps/backend/src/workouts/workouts.controller.spec.ts` (Integration tests for controller)
*   **Call Chain**
    *   Test Runner -> `WorkoutController.addCardioEntry` -> `WorkoutService.logCardioEntry` -> `PrismaService.cardioEntry.create`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Tests should run quickly. Mock database calls to isolate unit test performance.
    *   **Security**: Test authorization (JWT guard) on the controller endpoint.
    *   **Logging**: Assert that log entries are created on success and failure (mock `LoggerService`).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**
    *   Unit test `WorkoutController.addCardioEntry` to ensure it correctly calls `WorkoutService.logCardioEntry` with the validated parameters.
    *   Test cases for `AuthGuard` and `JwtAuthGuard` ensuring authenticated access.
    *   Test cases for path parameter `workoutId` and `loggedExerciseId` validation.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Unit test `WorkoutService.logCardioEntry` for:
        *   Successful creation of a `CardioEntry`.
        *   Validation: `durationSeconds` and `distanceMeters` are non-negative (UX-008).
        *   Error handling: `LoggedExercise` not found.
        *   Error handling: `WorkoutSession` not found (implied by `LoggedExercise` not found or not belonging to user).
        *   Ensuring the `createdAt` timestamp is set correctly.
3.  **Data Access (Prisma Models and Query Methods)**
    *   Mock `PrismaService` methods (`cardioEntry.create`, `loggedExercise.findUnique`) to simulate database interactions without actual database access for unit tests.
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**
    *   Test that `NotFoundException` (404) is thrown if `LoggedExercise` or `WorkoutSession` is not found.
    *   Test that `BadRequestException` (400) is thrown for invalid input (e.g., negative duration/distance).
5.  **Logging and Metrics (Structured fields, event name, duration)**
    *   Mock `LoggerService` to assert that `logger.log` and `logger.error` are called with appropriate messages and context.
    *   Verify log fields such as `event: 'CardioLogged'`, `loggedExerciseId`, `userId`, `status: 'success'/'failure'`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| ---- | ----------------- | ----------- |
| Read | LoggedExercise    | Verify existence and ownership. |
| Write | CardioEntry      | Create new cardio entry linked to `LoggedExercise`. |
| Audit | Log Event         | Record successful cardio entry logging and any failures. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TESTER as "Test Runner"
participant CTRL as "WorkoutController"
participant SVC as "WorkoutService"
participant REPO as "PrismaService (Mock)"
TESTER->>CTRL: Call addCardioEntry()
activate CTRL
CTRL->>SVC: call logCardioEntry()
activate SVC
SVC->>REPO: findUnique LoggedExercise
REPO-->>SVC: return LoggedExercise
SVC->>REPO: create CardioEntry
REPO-->>SVC: return CardioEntry
deactivate SVC
CTRL-->>TESTER: return 201 Created
deactivate CTRL
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| -------- | ---------- | ----------- | ----------- |
| Invalid Input | INVALID_INPUT | 400 | Duration/distance must be non-negative. |
| Logged Exercise Not Found | NOT_FOUND | 404 | Logged exercise not found. |
| Unauthorized | UNAUTHORIZED | 401 | User not authorized to log cardio for this session. |
| Server Error | INTERNAL_ERROR | 500 | System exception. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for unit/integration tests.
*   **Authentication**: Test `JwtAuthGuard` application to `WorkoutController.addCardioEntry`.
*   **Log Event Naming and Field Standards**: `WorkoutService` should log `event: 'CardioLogged'`, `userId`, `loggedExerciseId`, `status: 'success' | 'failure'`, `errorDetails` on failure.
*   **Metric Naming**: Potentially `workout_cardio_logged_success_total`, `workout_cardio_logged_failure_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user and an existing workout session with a logged exercise
*   ✅ When a valid request to log cardio data (positive duration, positive distance) is made
*   ✅ Then a new `CardioEntry` should be created and returned with a 201 status, and a success log entry should be recorded.
*   ✅ Given an authenticated user and an existing workout session with a logged exercise
*   ✅ When an invalid request to log cardio data (e.g., negative duration) is made
*   ✅ Then a 400 Bad Request error should be returned, and an error log entry should be recorded.
*   ✅ Given an authenticated user
*   ✅ When a request to log cardio data for a non-existent `loggedExerciseId` is made
*   ✅ Then a 404 Not Found error should be returned, and an error log entry should be recorded.
*   ✅ Given an unauthenticated user
*   ✅ When a request to log cardio data is made
*   ✅ Then a 401 Unauthorized error should be returned.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| --------- | ------------ | ----------- |
| Single Responsibility | ✅ | Tests focus on specific units or integrations. |
| Independence | ✅ | Tests are isolated and do not depend on order or external state. |
| Testability | ✅ | Mocking Prisma and Logger services allows easy testing. |
| Small Subset Testing | ✅ | Each test case targets a specific scenario. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.spec.ts
apps/backend/src/workouts/workouts.service.spec.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-03-04

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S5 Record Cardio/Time-Based Parameters

**Source SYS-ID**: SYS-CORE-WORKOUT-03

**Related UX-ID:** UX-008

**Task Name**: FE: Implement Cardio Entry Logging UI in Card

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-03-01

### **Coverage**:

- Input Validation: Duration and distance must be non-negative numbers (UX-008)
- Exceptions: Display error messages from API, handle network errors.
- API/Protocol: `POST /workouts/{id}/logged-exercises/{leId}/cardio`
- Database Changes: Not Covered
- UI/Components: `WorkoutCard` component, input fields for duration and distance, "Add Cardio" button.
- Interaction Logic: User inputs values, clicks "Add Cardio", UI shows loading, then success/error.
- Business Boundary Condition: Duration and distance inputs must be positive numbers.
- Observability: Not directly applicable to frontend, but API calls are logged on backend.
- Performance Considerations: Smooth UI updates, debouncing inputs if complex validation.
- Non-Functional: Internationalization (English), Accessibility Labels.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (User UI)**: `duration` (number, e.g., `60`), `distance` (number, e.g., `1.5`)
    *   **Output (API Call)**: `AddCardioEntryDto` (`{ durationSeconds: number; distanceMeters: number; }`)
        *   Example DTO: `{ "durationSeconds": 3600, "distanceMeters": 10000.5 }`
    *   **Output (UI State)**: `loading`, `error`, `success` states for the form.
*   **Main Function/Class Design**
    *   `CardioEntryForm` component (responsibility: render inputs, handle local state, validate, submit).
    *   `workout.service.ts` client method: `addCardioEntry` (responsibility: make API call).
*   **Code Location**
    *   `apps/frontend/src/components/workout/CardioEntryForm.tsx` (New component)
    *   `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` (Integrate form)
    *   `apps/frontend/src/services/workout.service.ts` (API client method)
*   **Call Chain**
    *   `CardioEntryForm` -> `workout.service.addCardioEntry` -> Backend API (`POST /workouts/{id}/logged-exercises/{leId}/cardio`)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Optimize re-renders, use React hooks like `useCallback` for event handlers. Client-side validation for immediate feedback.
    *   **Security**: Ensure no sensitive data is stored client-side without encryption.
    *   **Logging**: Use client-side logging/analytics tools if available (not defined in NFRs for MVP).

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**
    *   A new React component `CardioEntryForm.tsx` will be created within `apps/frontend/src/components/workout/`.
    *   This component will be integrated into the `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` or a sub-component within it, specifically rendered for `LoggedExercise` entries of type `CARDIO`.
2.  **Triggering Logic (events, buttons, input validation)**
    *   The `CardioEntryForm` will contain input fields for "Duration (seconds)" and "Distance (meters)".
    *   Client-side validation will be performed when input changes and on form submission:
        *   Ensure inputs are numeric.
        *   Ensure inputs are non-negative (UX-008).
        *   Display inline error messages if validation fails.
    *   A "Add Cardio" button will trigger the form submission.
3.  **Interaction with the Backend (interfaces, parameters, state flow)**
    *   On valid submission, the form will call `workoutService.addCardioEntry(workoutId, loggedExerciseId, { durationSeconds, distanceMeters })`.
    *   The UI will display a loading spinner or disable the submit button while the API request is in progress.
    *   Use shared types from `packages/shared-types/workout.types.ts` for DTOs.
4.  **UI Success/Failure Feedback and State Recovery**
    *   **Success**: Clear form fields, display a brief success message (e.g., a toast notification), and update the displayed workout session to include the new cardio entry.
    *   **Failure**: Display a user-friendly error message (e.g., "Failed to add cardio entry. Please check your inputs or try again.") based on the API response. Re-enable the form. Handle network errors gracefully.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| ---- | ----------------- | ----------- |
| Read | User Input (form) | Duration and distance values entered by the user. |
| Write | Local Component State | Manage input field values, loading state, error messages. |
| Write | Global App State (e.g., Zustand) | Update `WorkoutSession` data after successful API call. |
| Write | Backend API `POST /workouts/{id}/logged-exercises/{leId}/cardio` | Send new cardio entry data to the backend. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant UI as "CardioEntryForm.tsx"
participant API_CLIENT as "workout.service.ts"
participant API as "WorkoutController"
participant SVC as "WorkoutService"
participant DB as "PostgreSQL"
UI->>UI: Validate inputs (UX-008)
alt Inputs are valid
UI->>API_CLIENT: addCardioEntry(data)
activate API_CLIENT
API_CLIENT->>API: POST /cardio
activate API
API->>SVC: logCardioEntry(data)
activate SVC
SVC->>DB: Create CardioEntry
activate DB
DB-->>SVC: CardioEntry created
deactivate DB
SVC-->>API: CardioEntry
deactivate SVC
API-->>API_CLIENT: 201 Created (CardioEntry)
deactivate API
API_CLIENT-->>UI: Success
deactivate API_CLIENT
UI->>UI: Update UI with new entry
else Inputs are invalid
UI->>UI: Display validation errors
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| -------- | ---------- | ----------- | ----------- |
| Invalid Input | INVALID_INPUT | 400 | Duration and distance must be non-negative numbers. |
| Logged Exercise Not Found | NOT_FOUND | 404 | The exercise you are trying to log cardio for was not found. |
| Unauthorized | UNAUTHORIZED | 401 | You are not logged in or authorized for this action. |
| Server Error | INTERNAL_ERROR | 500 | An unexpected error occurred. Please try again. |
| Network Error | NETWORK_ERROR | N/A | Could not connect to the server. Please check your internet connection. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Frontend always communicates over HTTPS.
*   **Authentication**: API client includes JWT in `Authorization` header.
*   **Log Event Naming and Field Standards**: Backend logs will capture `CardioLogged` events.
*   **Metric Naming**: Not directly from frontend, but backend `workout_cardio_logged_success_total` will increment.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a workout session with an active logged cardio exercise displayed
*   ✅ When I enter "60" for duration and "1.5" for distance and click "Add Cardio"
*   ✅ Then the UI should show a loading state, then clear inputs and update the display with the new cardio entry.
*   ✅ Given a workout session with an active logged cardio exercise displayed
*   ✅ When I enter "-10" for duration and "1.5" for distance and click "Add Cardio"
*   ✅ Then the UI should display an inline error message indicating duration must be non-negative.
*   ✅ Given a workout session with an active logged cardio exercise displayed
*   ✅ When the backend returns a 404 error (e.g., logged exercise not found) after submission
*   ✅ Then the UI should display a user-friendly error message.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| --------- | ------------ | ----------- |
| Single Responsibility | ✅ | Component handles cardio input and submission logic. |
| Independence | ✅ | Component can be reused within any logged exercise card. |
| Testability | ✅ | Easily testable with mock API calls and state management. |
| Small Subset Testing | ✅ | Inputs, validation, and submission flow can be tested separately. |

### 🔹 **Code Location**

```
apps/frontend/src/components/workout/CardioEntryForm.tsx
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
apps/frontend/src/services/workout.service.ts
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-04-01

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S7 Complete and Save Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-04

**Related UX-ID:** UX-010

**Task Name**: BE: Implement PUT /workouts/{id}/complete API

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-CORE-WORKOUT-01

### **Coverage**:

- Input Validation: `id` (workout ID) must be a valid CUID format.
- Exceptions: Workout Session Not Found → 404, Unauthorized Access → 403, Session Already Completed → 400.
- API/Protocol: `PUT /workouts/{id}/complete`
- Database Changes: Not Covered (handled by service layer)
- UI/Components: Not Covered
- Interaction Logic: Handles incoming HTTP PUT request for workout completion.
- Business Boundary Condition: Only the owner can complete their workout session. A workout can only be completed once.
- Observability: Record API request logs.
- Performance Considerations: API response time < 200ms (P95).
- Non-Functional: Standardized API response format, error handling.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Path Parameter)**: `id` (`string`, CUID format, e.g., `clx0j2m6q00003z4l6b7v8c9e`)
    *   **Output (HTTP 200 Success)**: Empty body or a simple success message.
    *   **Output (HTTP 4xx/5xx Error)**: Standard error response `{ statusCode: number, message: string, error: string }`.
*   **Main Function/Class Design**
    *   `WorkoutController` method: `@Put(':id/complete') completeSession(@Param('id') id: string, @Req() req)` (responsibility: route request, apply guards, validate ID, delegate to `WorkoutService`).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.controller.ts`
*   **Call Chain**
    *   Client API call -> `WorkoutController.completeSession` -> `WorkoutService.completeSession`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use `cuid` regex for ID validation to prevent unnecessary service calls for invalid IDs.
    *   **Security**: Implement `JwtAuthGuard` and potentially a custom `OwnerGuard` to ensure only the session owner can complete it.
    *   **Logging**: Log incoming requests, path parameters, and outcome (success/failure) at the controller level.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**
    *   Define a `PUT` endpoint `/workouts/:id/complete` in `WorkoutController`.
    *   Apply `JwtAuthGuard` to protect the route, ensuring the user is authenticated.
    *   Use `@Param('id')` to extract the workout session ID from the URL.
    *   Implement input validation for the `id` parameter (e.g., using `Pipe` with `class-validator` to ensure it's a valid CUID).
2.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Call `WorkoutService.completeSession(id, userId)` passing the extracted workout ID and the authenticated user's ID (`req.user.id`).
3.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**
    *   Catch exceptions thrown by the `WorkoutService` (e.g., `NotFoundException`, `ForbiddenException`, `BadRequestException`) and allow NestJS's global exception filter (SYS-INFRA-ERROR-01) to transform them into standardized HTTP error responses.
    *   Specific error: if `completeSession` determines the workout is already completed, throw a `BadRequestException` with a clear message.
4.  **Logging and Metrics (Structured fields, event name, duration)**
    *   Use `LoggerService` (SYS-INFRA-LOG-01) to log the incoming API call: `logger.log({ event: 'WorkoutCompleteRequest', workoutId: id, userId: req.user.id })`.
    *   Log successful completion and any errors at the controller level to monitor API usage and issues.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| ---- | ----------------- | ----------- |
| Read | HTTP Request      | Extract `id` from path, `userId` from JWT. |
| Write | HTTP Response     | Send 200 OK or appropriate error status. |
| Audit | Log Event         | Log API call and parameters. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Frontend Client"
participant CTRL as "WorkoutController"
participant SVC as "WorkoutService"
CLIENT->>CTRL: PUT /workouts/{id}/complete
activate CTRL
CTRL->>CTRL: Validate workout ID
alt ID is valid
CTRL->>CTRL: Authenticate User (JwtAuthGuard)
alt User is authenticated
CTRL->>SVC: completeSession(id, userId)
activate SVC
SVC-->>CTRL: Session completed
deactivate SVC
CTRL-->>CLIENT: 200 OK
else User is unauthenticated
CTRL-->>CLIENT: 401 Unauthorized
end
else ID is invalid
CTRL-->>CLIENT: 400 Bad Request
end
deactivate CTRL
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| -------- | ---------- | ----------- | ----------- |
| Invalid Workout ID | INVALID_INPUT | 400 | Invalid workout session ID format. |
| Unauthorized | UNAUTHORIZED | 401 | Authentication token is missing or invalid. |
| Forbidden | FORBIDDEN | 403 | You are not authorized to complete this workout. |
| Workout Not Found | NOT_FOUND | 404 | Workout session not found. |
| Session Already Completed | BAD_REQUEST | 400 | This workout session is already completed. |
| Server Error | INTERNAL_ERROR | 500 | System exception. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: The API endpoint will be exposed over HTTPS as per SYS-INFRA-SEC-01.
*   **Authentication**: `JwtAuthGuard` will be used to ensure valid JWT is present and user is authenticated.
*   **Log Event Naming and Field Standards**: `WorkoutCompleteRequest`, `WorkoutCompleteSuccess`, `WorkoutCompleteFailure` with `workoutId`, `userId`, `statusCode`, `errorDetails`.
*   **Metric Naming**: `api_workout_complete_total`, `api_workout_complete_success`, `api_workout_complete_failure`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user with an active workout session
*   ✅ When a `PUT` request is made to `/workouts/{id}/complete` with a valid `id`
*   ✅ Then the API should respond with a 200 OK status.
*   ✅ Given an unauthenticated user
*   ✅ When a `PUT` request is made to `/workouts/{id}/complete`
*   ✅ Then the API should respond with a 401 Unauthorized status.
*   ✅ Given an authenticated user
*   ✅ When a `PUT` request is made to `/workouts/{id}/complete` with a non-existent `id`
*   ✅ Then the API should respond with a 404 Not Found status.
*   ✅ Given an authenticated user who is not the owner of the workout session
*   ✅ When a `PUT` request is made to `/workouts/{id}/complete`
*   ✅ Then the API should respond with a 403 Forbidden status.
*   ✅ Given an authenticated user with an already completed workout session
*   ✅ When a `PUT` request is made to `/workouts/{id}/complete` with that session's `id`
*   ✅ Then the API should respond with a 400 Bad Request status.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| --------- | ------------ | ----------- |
| Single Responsibility | ✅ | Controller only handles request routing, validation, and delegation. |
| Independence | ✅ | Controller logic is decoupled from business logic in the service. |
| Testability | ✅ | Easily testable by mocking the service layer. |
| Small Subset Testing | ✅ | ID validation, guard application, and service calls can be tested independently. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-04-02

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S7 Complete and Save Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-04

**Related UX-ID:** UX-010

**Task Name**: BE: Implement WorkoutService.completeSession

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-04-01

### **Coverage**:

- Input Validation: Workout `sessionId` and `userId` must be valid.
- Exceptions: Workout Session Not Found, Not Owned by User, Already Completed.
- API/Protocol: Internal service method call.
- Database Changes: Update `WorkoutSession` table (`endTime` field, `status` if applicable).
- UI/Components: Not Covered
- Interaction Logic: Updates workout session record in DB.
- Business Boundary Condition: Set `endTime` to current timestamp. A session can only be completed by its `userId` and if it's not already completed.
- Observability: Record service method execution logs (start, end, errors).
- Performance Considerations: Database update should be fast.
- Non-Functional: Transactional integrity for DB updates.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input**: `sessionId` (`string`), `userId` (`string`)
        *   Example: `completeSession('clx0j2m6q00003z4l6b7v8c9e', 'user_id_123')`
    *   **Output**: Updated `WorkoutSession` object on success.
*   **Main Function/Class Design**
    *   `WorkoutService` method: `completeSession(sessionId: string, userId: string): Promise<WorkoutSession>` (responsibility: find session, validate ownership/status, update `endTime`).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.ts`
*   **Call Chain**
    *   `WorkoutController.completeSession` -> `WorkoutService.completeSession` -> `PrismaService.workoutSession.update`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Optimize Prisma query for finding and updating the workout session. Use `select` to only fetch necessary fields.
    *   **Security**: Crucially, enforce ownership by checking `workoutSession.userId === userId` to prevent users from completing others' workouts.
    *   **Logging**: Log the `completeSession` call, its success, and any failures, including relevant IDs and error details.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**
    *   N/A (This is a service layer task, called by the controller).
2.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   `completeSession` method in `WorkoutService`:
        *   **Fetch Workout Session**: Query `PrismaService` to find the `WorkoutSession` by `sessionId`.
        *   **Validate Existence**: If not found, throw `NotFoundException`.
        *   **Validate Ownership**: Check if `workoutSession.userId` matches the provided `userId`. If not, throw `ForbiddenException`.
        *   **Validate Status**: Check if `workoutSession.endTime` is already set (meaning it's already completed). If so, throw `BadRequestException`.
        *   **Update Session**: Use `PrismaService.workoutSession.update` to set the `endTime` field to `new Date()`.
        *   **Return Updated Session**: Return the updated `WorkoutSession` object.
3.  **Data Access (Prisma Models and Query Methods)**
    *   `PrismaService.workoutSession.findUnique()`: To retrieve the session for validation.
    *   `PrismaService.workoutSession.update()`: To set the `endTime` and potentially update a `status` field if implemented (though `endTime` itself implies completion).
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**
    *   Throw NestJS `NotFoundException`, `ForbiddenException`, `BadRequestException` as appropriate. These will be caught by the global exception filter and converted to standardized HTTP responses.
5.  **Logging and Metrics (Structured fields, event name, duration)**
    *   Log `event: 'CompleteWorkoutSession'`, `sessionId`, `userId`, `status: 'starting'`, `status: 'success'`, or `status: 'failure'` with `errorDetails`.
    *   Measure the duration of the `completeSession` method execution for performance monitoring.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| ---- | ----------------- | ----------- |
| Read | WorkoutSession     | Find session by ID, verify ownership and completion status. |
| Write | WorkoutSession     | Update `endTime` field to mark completion. |
| Audit | Log Event          | Record attempt and outcome of workout completion. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CTRL as "WorkoutController"
participant SVC as "WorkoutService"
participant REPO as "PrismaService"
participant DB as "PostgreSQL"
CTRL->>SVC: completeSession(sessionId, userId)
activate SVC
SVC->>REPO: findUnique WorkoutSession
activate REPO
REPO->>DB: SELECT WorkoutSession
DB-->>REPO: WorkoutSession data
deactivate REPO
alt Session not found
SVC-->>CTRL: Throw NotFoundException
else User not owner
SVC-->>CTRL: Throw ForbiddenException
else Session already completed
SVC-->>CTRL: Throw BadRequestException
else Valid session
SVC->>REPO: update WorkoutSession (endTime: now())
activate REPO
REPO->>DB: UPDATE WorkoutSession
DB-->>REPO: Updated data
deactivate REPO
SVC-->>CTRL: Return updated WorkoutSession
end
deactivate SVC
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| -------- | ---------- | ----------- | ----------- |
| Workout Not Found | NOT_FOUND | 404 | The workout session was not found. |
| Not Owned by User | FORBIDDEN | 403 | You do not have permission to complete this workout. |
| Already Completed | BAD_REQUEST | 400 | This workout session has already been completed. |
| Server Error | INTERNAL_ERROR | 500 | An unexpected error occurred while completing the workout. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A (service layer).
*   **Authentication**: `userId` is passed from the authenticated context (JWT) to ensure ownership check.
*   **Log Event Naming and Field Standards**: `CompleteWorkoutSession`, `CompleteWorkoutSessionSuccess`, `CompleteWorkoutSessionFailure`. Include `sessionId`, `userId`, and `errorReason` in logs.
*   **Metric Naming**: `workout_complete_service_duration_ms`, `workout_complete_service_success_total`, `workout_complete_service_failure_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an existing, incomplete workout session belonging to `userId`
*   ✅ When `completeSession(sessionId, userId)` is called
*   ✅ Then the `WorkoutSession` record should have its `endTime` field set to the current timestamp.
*   ✅ Given a non-existent `sessionId`
*   ✅ When `completeSession(sessionId, userId)` is called
*   ✅ Then a `NotFoundException` should be thrown.
*   ✅ Given an existing, incomplete workout session belonging to a different user
*   ✅ When `completeSession(sessionId, userId)` is called with the current `userId`
*   ✅ Then a `ForbiddenException` should be thrown.
*   ✅ Given an existing, already completed workout session
*   ✅ When `completeSession(sessionId, userId)` is called
*   ✅ Then a `BadRequestException` should be thrown.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| --------- | ------------ | ----------- |
| Single Responsibility | ✅ | Service method focuses on business logic for completing a session. |
| Independence | ✅ | Method is self-contained and takes all necessary parameters. |
| Testability | ✅ | Easily testable by mocking `PrismaService`. |
| Small Subset Testing | ✅ | Each validation rule and the update operation can be tested. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/prisma/schema.prisma
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-04-03

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S7 Complete and Save Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-04

**Related UX-ID:** UX-010

**Task Name**: BE: Unit/Integration Tests for Complete Session

**Task Type**: Backend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-04-02

### **Coverage**:

- Input Validation: Workout `id` and `userId` must be valid.
- Exceptions: Session Not Found → 404, Not Owned → 403, Already Completed → 400.
- API/Protocol: Internal service and controller calls (simulated for tests).
- Database Changes: Not Covered (testing existing `WorkoutSession` updates).
- UI/Components: Not Covered
- Interaction Logic: Not Covered
- Business Boundary Condition: Ownership, non-completed status validation.
- Observability: Verify log entries for successful and failed operations.
- Performance Considerations: Test execution time.
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Service)**: `sessionId` (`string`), `userId` (`string`)
    *   **Input (Controller)**: `id` (path param `string`), `req.user.id` (`string`)
    *   **Output**: Updated `WorkoutSession` object on success.
*   **Main Function/Class Design**
    *   `WorkoutService` methods: `completeSession` (tested for business logic).
    *   `WorkoutController` methods: `completeSession` (tested for request handling and delegation).
*   **Code Location**
    *   `apps/backend/src/workouts/workouts.service.spec.ts` (Unit tests for service)
    *   `apps/backend/src/workouts/workouts.controller.spec.ts` (Integration tests for controller)
*   **Call Chain**
    *   Test Runner -> `WorkoutController.completeSession` (for integration tests)
    *   Test Runner -> `WorkoutService.completeSession` (for unit tests)
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Mock database calls to isolate unit test performance.
    *   **Security**: Test `JwtAuthGuard` and `OwnershipGuard` (if implemented separately) on the controller.
    *   **Logging**: Assert that log entries are created on success and failure (mock `LoggerService`).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**
    *   Unit test `WorkoutController.completeSession` to ensure:
        *   It correctly calls `WorkoutService.completeSession` with the validated `id` and `userId`.
        *   `JwtAuthGuard` protects the route.
        *   Proper HTTP status codes are returned for service-thrown exceptions.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Unit test `WorkoutService.completeSession` for:
        *   Successful completion: `endTime` is set to a valid date.
        *   Validation: `WorkoutSession` not found (throws `NotFoundException`).
        *   Validation: User is not the owner (throws `ForbiddenException`).
        *   Validation: Session is already completed (throws `BadRequestException`).
        *   Ensuring the `updatedAt` timestamp is updated.
3.  **Data Access (Prisma Models and Query Methods)**
    *   Mock `PrismaService` methods (`workoutSession.findUnique`, `workoutSession.update`) to simulate database interactions without actual database access for unit tests.
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**
    *   Test that the service throws correct NestJS exceptions (`NotFoundException`, `ForbiddenException`, `BadRequestException`).
    *   Test that the controller maps these exceptions to the correct HTTP status codes (404, 403, 400 respectively) via the global exception filter.
5.  **Logging and Metrics (Structured fields, event name, duration)**
    *   Mock `LoggerService` to assert that `logger.log` and `logger.error` are called with appropriate messages and context for `WorkoutComplete` events.
    *   Verify log fields such as `event: 'WorkoutCompleteSuccess'`, `sessionId`, `userId`, `status: 'success'/'failure'`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| ---- | ----------------- | ----------- |
| Read | WorkoutSession     | Verify existence, ownership, and completion status. |
| Write | WorkoutSession     | Update `endTime` field. |
| Audit | Log Event          | Record successful workout completion and any failures. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TESTER as "Test Runner"
participant CTRL as "WorkoutController"
participant SVC as "WorkoutService"
participant REPO as "PrismaService (Mock)"
TESTER->>CTRL: Call completeSession() (Integr. Test)
activate CTRL
CTRL->>SVC: call completeSession()
activate SVC
SVC->>REPO: findUnique WorkoutSession
REPO-->>SVC: return MockSession
SVC->>REPO: update WorkoutSession
REPO-->>SVC: return UpdatedSession
deactivate SVC
CTRL-->>TESTER: return 200 OK
deactivate CTRL
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| -------- | ---------- | ----------- | ----------- |
| Invalid Workout ID | INVALID_INPUT | 400 | Invalid workout session ID format. |
| Unauthorized | UNAUTHORIZED | 401 | Authentication token is missing or invalid. |
| Forbidden | FORBIDDEN | 403 | User is not authorized to complete this workout. |
| Workout Not Found | NOT_FOUND | 404 | Workout session not found. |
| Already Completed | BAD_REQUEST | 400 | This workout session is already completed. |
| Server Error | INTERNAL_ERROR | 500 | System exception. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for unit/integration tests.
*   **Authentication**: Test `JwtAuthGuard` application to `WorkoutController.completeSession` and that `userId` is correctly extracted.
*   **Log Event Naming and Field Standards**: `WorkoutService` should log `event: 'WorkoutComplete'`, `userId`, `sessionId`, `status: 'success' | 'failure'`, `errorDetails` on failure.
*   **Metric Naming**: Potentially `workout_complete_success_total`, `workout_complete_failure_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user and an existing, incomplete workout session they own
*   ✅ When a valid request to complete the session is made via the controller
*   ✅ Then the API should return a 200 OK status, and the service should update the `endTime`.
*   ✅ Given an authenticated user and an existing, incomplete workout session they do not own
*   ✅ When a request to complete the session is made via the controller
*   ✅ Then the API should return a 403 Forbidden status.
*   ✅ Given an authenticated user and an existing, already completed workout session they own
*   ✅ When a request to complete the session is made via the controller
*   ✅ Then the API should return a 400 Bad Request status.
*   ✅ Given an unauthenticated user
*   ✅ When a request to complete any workout session is made via the controller
*   ✅ Then the API should return a 401 Unauthorized error.
*   ✅ Given an authenticated user
*   ✅ When a request to complete a non-existent workout session is made via the controller
*   ✅ Then the API should return a 404 Not Found error.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| --------- | ------------ | ----------- |
| Single Responsibility | ✅ | Tests focus on specific units or integrations. |
| Independence | ✅ | Tests are isolated and do not depend on order or external state. |
| Testability | ✅ | Mocking Prisma and Logger services allows easy testing. |
| Small Subset Testing | ✅ | Each validation, ownership check, and update scenario can be tested. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.spec.ts
apps/backend/src/workouts/workouts.service.spec.ts
```

<!-- impl-batch:TASK-SYS-CORE-WORKOUT-04-04::SYS-CORE-WORKOUT-04::UX-010::TASK-SYS-CORE-WORKOUT-04-05::SYS-CORE-WORKOUT-04::UX-010::TASK-SYS-PLAT-PROFILE-01-01::SYS-PLAT-PROFILE-01::UX-003::TASK-SYS-PLAT-PROFILE-01-02::SYS-PLAT-PROFILE-01::UX-003::TASK-SYS-PLAT-PROFILE-01-03::SYS-PLAT-PROFILE-01::UX-003 -->

## **Task-ID**: TASK-SYS-CORE-WORKOUT-04-04

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S7 Complete and Save Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-04

**Related UX-ID:** UX-010

**Related UI-ID:** N/A (implied within Workout Session UI)

**Task Name**: FE: Create Workout Summary Screen

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: SYS-INFRA-SETUP-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (display only)
- Exceptions: N/A (display only)
- API/Protocol: N/A (display only for this task)
- Database Changes: Not Covered
- UI/Components: `src/app/(app)/workouts/[id]/WorkoutSummary.tsx`, displaying workout details.
- Interaction Logic: Renders workout session data from local state, including exercises, sets, and cardio entries.
- Business Boundary Condition: Accurately reflects all logged activities for the current workout session.
- Observability: N/A (frontend rendering)
- Performance Considerations: Efficient rendering of potentially large lists of sets/entries.
- Non-Functional: Internationalization (English), Accessibility labels for displayed data, Mobile adaptation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: `WorkoutSession` object (from client-side state) including nested `LoggedExercise`, `StrengthSet`, and `CardioEntry` arrays.
        ```typescript
        // Example `WorkoutSession` structure (from shared-types/workout.types.ts)
        interface WorkoutSession {
          id: string;
          userId: string;
          startTime: Date;
          endTime?: Date | null;
          loggedExercises: Array<{
            id: string;
            exercise: { name: string; type: 'STRENGTH' | 'CARDIO' };
            notes?: string;
            strengthSets: Array<{
              id: string;
              setNumber: number;
              reps: number;
              weight: number; // e.g., 50.0
            }>;
            cardioEntry?: {
              id: string;
              durationSeconds?: number; // e.g., 1800
              distanceMeters?: number; // e.g., 5000.0
            };
          }>;
        }
        ```
    *   Output: Rendered React UI displaying the workout summary.
*   **Decision point application**: N/A for this task.
*   **Main Function/Class Design**: A React functional component, `WorkoutSummaryScreen`, responsible for displaying the structured workout data. It will likely use sub-components for individual exercises or sets.
*   **Code Location**: `apps/frontend/src/app/(app)/workouts/[id]/WorkoutSummary.tsx`.
*   **Call Chain**: The `workouts/[id]/page.tsx` component will fetch the active workout state (e.g., from a global store) and pass it as props to `WorkoutSummary.tsx` for rendering.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Use React's memoization (`React.memo`) for sub-components to prevent unnecessary re-renders when parent state changes but props to children remain the same. Optimize list rendering with `key` props.
    *   **Security**: N/A, purely client-side rendering of already-secured data.
    *   **Logging**: Basic console logging for debugging purposes if rendering issues arise.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  Page or Component Location: The `WorkoutSummary` component will reside at `apps/frontend/src/app/(app)/workouts/[id]/WorkoutSummary.tsx`.
2.  Triggering Logic (events, buttons, input validation): The component renders when its parent page (`apps/frontend/src/app/(app)/workouts/[id]/page.tsx`) passes it the current workout session data, typically when the workout is considered "active" and the user is reviewing it before completion.
3.  [Decision hook]: N/A.
4.  Interaction with the Backend (interfaces, parameters, state flow): This specific task focuses only on *display*. The `WorkoutSummary` component will receive the complete workout session object (including `loggedExercises`, `strengthSets`, `cardioEntry`) as props from a parent component or directly from a client-side global state management store (e.g., Zustand). It does not directly interact with the backend API.
5.  UI Success/Failure Feedback and State Recovery: N/A, purely for display.

**Back-End Process (if applicable)**
N/A for this frontend-only task.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Client-side state   | Retrieves the active `WorkoutSession` data from the global store (e.g., Zustand). |
| Write | N/A               | This task does not modify data. |
| Cache | N/A               | N/A.        |
| Audit | N/A               | N/A.        |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Participant APP_PAGE as "workouts/[id]/page.tsx"
Participant STORE as "Client State Store"
Participant UI_COMP as "WorkoutSummary.tsx"
APP_PAGE->>STORE: Get active workout state
activate STORE
STORE-->>APP_PAGE: Return WorkoutSession data
deactivate STORE
APP_PAGE->>UI_COMP: Render with workout data
activate UI_COMP
UI_COMP-->>APP_PAGE: Rendered UI output
deactivate UI_COMP
```

### 🔹 **Error and Exception Mapping**
N/A for this task (pure UI rendering).

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): Ensured by the overall system architecture, but not directly managed by this component.
*   Authentication (JWT Verification Process): Handled at the API client level and backend, not relevant for this display component.
*   Log Event Naming and Field Standards: N/A for this task.
*   Metric Naming (e.g., `auth_register_success_total`): N/A for this task.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an active workout session containing strength exercises with multiple sets and a cardio exercise, stored in the client-side state.
*   ✅ When the `WorkoutSummary` component is rendered with this workout session data.
*   ✅ Then the screen accurately displays the start time, all logged exercises, their types, notes, and for strength exercises, lists each set with its reps and weight, and for cardio exercises, displays duration and distance.
*   ✅ Given an active workout session with no logged exercises.
*   ✅ When the `WorkoutSummary` component is rendered.
*   ✅ Then an appropriate message like "No exercises logged yet" is displayed.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                         |
| :----------------- | :----------- | :-------------------------------------------------- |
| Single Responsibility | ✅            | Solely responsible for displaying workout summary.  |
| Independence       | ✅            | Receives data via props or client-side store, no direct backend calls. |
| Testability        | ✅            | Can be easily tested with mocked `WorkoutSession` data. |
| Small Subset Testing | ✅            | Can be rendered in isolation from the full application. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(app)/workouts/[id]/WorkoutSummary.tsx
```

---

## **Task-ID**: TASK-SYS-CORE-WORKOUT-04-05

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S7 Complete and Save Workout Session

**Source SYS-ID**: SYS-CORE-WORKOUT-04

**Related UX-ID:** UX-010

**Related UI-ID:** N/A (part of workout session UI)

**Task Name**: FE: Implement 'Finish Workout' Flow & API Call

**Task Type**: Frontend

**Priority/Phase**: T0-CORE

**Dependency**: TASK-SYS-CORE-WORKOUT-04-01 (Backend API for workout start), TASK-SYS-CORE-WORKOUT-04-04 (Workout Summary Screen exists)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (API call parameters are implicit, `sessionId`)
- Exceptions: Network errors, backend errors (401, 404, 500).
- API/Protocol: `PUT /api/v1/workouts/{id}/complete`
- Database Changes: Updates `WorkoutSession.endTime` and potentially `status`.
- UI/Components: 'Finish Workout' button, loading spinner, error toast/modal.
- Interaction Logic: User clicks button → loading state → API call → success/error feedback → state update/redirection.
- Business Boundary Condition: Workout must be active and owned by the user.
- Observability: Frontend logs for API call initiation, success, and failure.
- Performance Considerations: API call response time, responsive UI during loading.
- Non-Functional: Error handling with user-friendly messages, network resilience (retry mechanisms if critical).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Input: `sessionId` (string, extracted from current workout state).
    *   API Request: `PUT /api/v1/workouts/{sessionId}/complete` (no request body needed, `endTime` set on backend).
    *   API Response (Success): `200 OK`, `WorkoutSession` object with `endTime` populated.
        ```typescript
        // Example response (simplified)
        interface CompletedWorkoutSession {
          id: string;
          userId: string;
          startTime: Date;
          endTime: Date; // Now populated
          // ... other workout data
        }
        ```
    *   API Response (Error): `4xx` or `5xx` with an error object (e.g., `{ statusCode: 404, message: 'Workout not found', error: 'Not Found' }`).
*   **Decision point application**: N/A for this task.
*   **Main Function/Class Design**: A React component (e.g., `FinishWorkoutButton`) with an associated click handler that dispatches an action to a client-side service/store to make the API call.
*   **Code Location**:
    *   Button component: `apps/frontend/src/app/(app)/workouts/[id]/FinishWorkoutButton.tsx`
    *   API client method: `apps/frontend/src/services/workout.service.ts`
*   **Call Chain**: `FinishWorkoutButton` (User click) → `WorkoutService.completeSession(sessionId)` → `Backend API (/workouts/{id}/complete)` → `Backend WorkoutService.completeSession` → `Prisma ORM` → `PostgreSQL DB`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Ensure the API client (Axios) has appropriate timeouts. Optimize UI updates to avoid jank during loading states.
    *   **Security**: The API call must include the user's JWT in the `Authorization` header. The backend will validate this token and ensure the `sessionId` belongs to the authenticated user.
    *   **Logging**: Client-side logging (e.g., `console.info`, `console.error`) for API request initiation, success, and failure, including error messages for debugging.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  Page or Component Location: A `FinishWorkoutButton` component will be integrated into the `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` or the `WorkoutSummary.tsx` component.
2.  Triggering Logic (events, buttons, input validation): The user clicks the "Finish Workout" button. The button will be disabled during the API request.
3.  [Decision hook]: N/A.
4.  Interaction with the Backend (interfaces, parameters, state flow):
    *   Upon button click, extract the `sessionId` from the active workout state.
    *   Set a loading state (`isLoading = true`) for the button/UI.
    *   Call `workoutService.completeSession(sessionId)` (an asynchronous function).
    *   **On success**:
        *   Unset loading state (`isLoading = false`).
        *   Clear the active workout session from client-side state.
        *   Display a success message (e.g., toast).
        *   Redirect the user to their workout history or dashboard.
    *   **On failure**:
        *   Unset loading state (`isLoading = false`).
        *   Display a user-friendly error message (e.g., toast, modal) based on the HTTP status code and error message from the backend (e.g., "Could not complete workout. Please try again.").
        *   The active workout session state on the client should persist to allow for retry.
5.  UI Success/Failure Feedback and State Recovery: Use a library like `react-hot-toast` or similar for notifications. The button will show a loading spinner, and upon success/failure, a message will appear. The client-side state will be updated to reflect no active workout on success.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target         | Description                                                      |
| :------ | :------------------------ | :--------------------------------------------------------------- |
| Read    | Client-side state         | Reads the active `sessionId` to pass to the API.                 |
| Write   | `WorkoutSession` (DB)     | Backend updates the `endTime` and potentially `status` of the workout. |
| Write   | Client-side state         | Clears the active `WorkoutSession` from the global store on success. |
| Cache   | N/A                       | N/A.                                                             |
| Audit   | Backend Log Event         | Records `workout_complete_success` or `workout_complete_failed` events. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Participant FE_CLIENT as "Frontend Client"
Participant WORKOUT_SVC_FE as "workout.service.ts"
Participant BE_API as "BE API /workouts/{id}/complete"
Participant AUTH_GUARD as "Auth Guard"
Participant WORKOUT_CTRL as "Workout Controller"
Participant WORKOUT_SVC_BE as "Workout Service"
Participant PRISMA_ORM as "Prisma ORM"
Participant POSTGRES_DB as "PostgreSQL DB"
Participant LOG_SVC as "Logging Service"

FE_CLIENT->>WORKOUT_SVC_FE: Call completeSession(sessionId)
activate WORKOUT_SVC_FE
WORKOUT_SVC_FE->>BE_API: PUT /workouts/{id}/complete (JWT)
activate BE_API
BE_API->>AUTH_GUARD: Validate JWT
activate AUTH_GUARD
AUTH_GUARD-->>BE_API: Token valid, attach user
deactivate AUTH_GUARD
BE_API->>WORKOUT_CTRL: Route to completeWorkout()
activate WORKOUT_CTRL
WORKOUT_CTRL->>WORKOUT_SVC_BE: completeSession(userId, sessionId)
activate WORKOUT_SVC_BE
WORKOUT_SVC_BE->>PRISMA_ORM: Update WorkoutSession (endTime)
activate PRISMA_ORM
PRISMA_ORM->>POSTGRES_DB: UPDATE "WorkoutSession" SET endTime = NOW()
activate POSTGRES_DB
POSTGRES_DB-->>PRISMA_ORM: Rows affected
deactivate POSTGRES_DB
PRISMA_ORM-->>WORKOUT_SVC_BE: Updated session data
deactivate PRISMA_ORM
WORKOUT_SVC_BE->>LOG_SVC: Log workout_complete_success
WORKOUT_SVC_BE-->>WORKOUT_CTRL: Return updated session
deactivate WORKOUT_SVC_BE
WORKOUT_CTRL-->>BE_API: 200 OK, session data
deactivate WORKOUT_CTRL
BE_API-->>WORKOUT_SVC_FE: 200 OK, session data
deactivate BE_API
WORKOUT_SVC_FE-->>FE_CLIENT: Success, updated session
deactivate WORKOUT_SVC_FE
FE_CLIENT->>FE_CLIENT: Update UI, redirect
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                             |
| :----------------------- | :-------------- | :---------- | :-------------------------------------- |
| Invalid/Missing Token    | UNAUTHORIZED    | 401         | Your session has expired. Please log in again. |
| Workout Not Found        | NOT_FOUND       | 404         | The workout session was not found or is already completed. |
| Workout Not Owned by User | FORBIDDEN       | 403         | You are not authorized to complete this workout. |
| Server-side Error        | INTERNAL_ERROR  | 500         | An unexpected error occurred. Please try again later. |
| Network Error (FE)       | NETWORK_ERROR   | N/A         | Could not connect to the server. Check your internet connection. |

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): Enforced at the API Gateway/Ingress level (SYS-INFRA-SEC-01).
*   Authentication (JWT Verification Process): NestJS `AuthGuard` using Passport-JWT verifies the token for every protected route (SYS-INFRA-AUTH-01). The `userId` is extracted from the JWT payload and used to ensure resource ownership in the `WorkoutService`.
*   Log Event Naming and Field Standards:
    *   Backend: `workout_complete_request` (with `userId`, `sessionId`), `workout_complete_success` (with `userId`, `sessionId`, `duration`), `workout_complete_failed` (with `userId`, `sessionId`, `error_message`, `status_code`).
    *   Frontend: `FE_workout_complete_init`, `FE_workout_complete_success`, `FE_workout_complete_failed`.
*   Metric Naming (e.g., `auth_register_success_total`): `workout_complete_total`, `workout_complete_success_total`, `workout_complete_failed_total`, `workout_complete_duration_ms` (for API response time).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user with an active workout session.
*   ✅ When the user clicks the "Finish Workout" button.
*   ✅ Then a `PUT` request is sent to `/api/v1/workouts/{id}/complete` with the user's JWT.
*   ✅ And the backend updates the `endTime` of the `WorkoutSession` in the database.
*   ✅ And the frontend clears the active workout state and redirects the user to the workout history/dashboard.
*   ✅ Given an authenticated user attempting to finish a workout that does not exist or belong to them.
*   ✅ When the "Finish Workout" button is clicked.
*   ✅ Then the backend returns a `404 Not Found` or `403 Forbidden` error.
*   ✅ And the frontend displays an appropriate error message without changing the active workout state.
*   ✅ Given an unauthenticated user attempting to finish a workout.
*   ✅ When the "Finish Workout" button is clicked.
*   ✅ Then the backend returns a `401 Unauthorized` error.
*   ✅ And the frontend displays a session expired message and prompts for re-login.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                         |
| :----------------- | :----------- | :------------------------------------------------------------------ |
| Single Responsibility | ✅            | Manages the action and API call for completing a workout.           |
| Independence       | ✅            | Relies on `workout.service.ts` for API, state store for session ID. |
| Testability        | ✅            | Can be unit tested by mocking `workout.service.ts` and router.    |
| Small Subset Testing | ✅            | The button component and its logic can be tested in isolation.      |

### 🔹 **Code Location**

```
apps/frontend/src/app/(app)/workouts/[id]/FinishWorkoutButton.tsx
apps/frontend/src/services/workout.service.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-PROFILE-01-01

**Related Epic**: EPIC-001 User Account Management

**Related Story**: EPIC-001-S3 Basic Profile Management

**Source SYS-ID**: SYS-PLAT-PROFILE-01

**Related UX-ID:** UX-003

**Related UI-ID:** UI-018

**Task Name**: BE: Implement GET/PUT /profile Controllers

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: SYS-CORE-AUTH-02 (Auth Guard)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: For `PUT /profile`, `displayName` must not be empty, `preferredUnits` must be a valid enum value.
- Exceptions: `401 Unauthorized`, `400 Bad Request` (for invalid input on PUT), `500 Internal Server Error`.
- API/Protocol: `GET /api/v1/profile`, `PUT /api/v1/profile`
- Database Changes: Not Covered by controller, handled by service.
- UI/Components: N/A
- Interaction Logic: Handles incoming HTTP requests, validates DTOs, delegates to `ProfileService`, and sends HTTP responses.
- Business Boundary Condition: Ensures only authenticated users can access/modify their profile.
- Observability: Logs incoming requests and any validation failures.
- Performance Considerations: Low latency for request handling.
- Non-Functional: Authentication enforcement, structured error responses.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   `GET /profile`:
        *   Input: JWT in `Authorization` header.
        *   Output: `200 OK`, JSON body:
            ```json
            {
              "id": "cuid_user_id",
              "email": "user@example.com",
              "displayName": "John Doe",
              "preferredUnits": "METRIC"
            }
            ```
    *   `PUT /profile`:
        *   Input: JWT in `Authorization` header, JSON body:
            ```json
            {
              "displayName": "New Name",
              "preferredUnits": "IMPERIAL"
            }
            ```
        *   Output: `200 OK`, JSON body:
            ```json
            {
              "id": "cuid_user_id",
              "email": "user@example.com",
              "displayName": "New Name",
              "preferredUnits": "IMPERIAL"
            }
            ```
*   **Decision point application**: N/A for this task. `displayName` cannot be empty, which is enforced by DTO validation (`@IsNotEmpty()`). `preferredUnits` must be an enum, enforced by `@IsEnum(Units)`.
*   **Main Function/Class Design**: `ProfileController` class in NestJS, decorated with `@Controller('profile')` and `@UseGuards(JwtAuthGuard)`. It will have methods decorated with `@Get()` and `@Put()`.
*   **Code Location**: `apps/backend/src/profile/profile.controller.ts`.
*   **Call Chain**: `Frontend API Client` → `ProfileController` → `AuthGuard` (JWT validation) → `ProfileService`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Controllers should be thin, delegating heavy logic to services, keeping request handling fast.
    *   **Security**: `@UseGuards(JwtAuthGuard)` is crucial for protecting these endpoints. `userId` from the JWT payload is extracted using `@Req() req` or a custom decorator to identify the user making the request.
    *   **Logging**: Log requests to `/profile` (GET and PUT), including the `userId` and request body for PUT requests (excluding sensitive data). Log any validation or authorization failures.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  Request Handling (Controller or Route):
    *   Create `ProfileController` in `apps/backend/src/profile/profile.controller.ts`.
    *   Apply `@UseGuards(JwtAuthGuard)` at the class level to protect all profile routes. This guard (from `SYS-INFRA-AUTH-01`) ensures a valid JWT is present and populates `req.user` with the JWT payload (containing `userId`).
    *   Define `ProfileDto` for the response and `UpdateProfileDto` for the `PUT` request body:
        ```typescript
        // apps/backend/src/profile/dto/profile.dto.ts
        import { Units } from '@prisma/client'; // From prisma schema
        export class ProfileDto {
          id: string;
          email: string;
          displayName?: string;
          preferredUnits: Units;
        }

        // apps/backend/src/profile/dto/update-profile.dto.ts
        import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
        import { Units } from '@prisma/client';
        export class UpdateProfileDto {
          @IsOptional()
          @IsString()
          @IsNotEmpty({ message: 'Display name cannot be empty' })
          @MinLength(1, { message: 'Display name must be at least 1 character' })
          displayName?: string;

          @IsOptional()
          @IsEnum(Units, { message: 'Invalid preferred units' })
          preferredUnits?: Units;
        }
        ```
    *   Implement `@Get()` method for `/profile`:
        *   `@Req() req` to get the authenticated user's `id`.
        *   Call `profileService.getProfile(req.user.id)`.
        *   Return the result.
    *   Implement `@Put()` method for `/profile`:
        *   `@Req() req` to get `userId`.
        *   `@Body() updateProfileDto: UpdateProfileDto` with `@UsePipes(ValidationPipe)` to automatically validate the request body against `UpdateProfileDto`.
        *   Call `profileService.updateProfile(req.user.id, updateProfileDto)`.
        *   Return the updated profile.
2.  [Decision hook]: The DTOs (`UpdateProfileDto`) strictly enforce the `UX-003` constraint that `displayName` cannot be empty (`@IsNotEmpty`, `@MinLength(1)`) and `preferredUnits` must be a valid enum (`@IsEnum`).
3.  Business Logic (Service Methods + Dependent Capability Calls): Delegates directly to `ProfileService` (TASK-SYS-PLAT-PROFILE-01-02).
4.  Data Access (Prisma Models and Query Methods): N/A (handled by `ProfileService`).
5.  Error and Exception Handling (including HTTP Status Codes and Error Codes):
    *   `AuthGuard` automatically throws `UnauthorizedException` (401) for invalid/missing JWTs.
    *   `ValidationPipe` automatically throws `BadRequestException` (400) for DTO validation failures.
    *   Any service-level errors (e.g., `NotFoundException`) will be caught by the global exception filter (SYS-INFRA-ERROR-01) and returned as standardized error responses.
6.  Logging and Metrics (Structured fields, event name, duration): Use the injected `LoggerService` (SYS-INFRA-LOG-01) to log incoming requests, particularly for `PUT` operations, including the `userId` and relevant parts of the `updateProfileDto`.

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                                 |
| :------ | :---------------- | :---------------------------------------------------------- |
| Read    | JWT Payload       | Extracts `userId` from the authenticated user's JWT.        |
| Read    | Request Body      | Reads `displayName` and `preferredUnits` from `PUT` request. |
| Write   | N/A               | Controllers do not directly write to the database.          |
| Cache   | N/A               | N/A.                                                        |
| Audit   | Log Event         | Records controller entry and exit, especially for `PUT` operations. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Participant FE_CLIENT as "Frontend Client"
Participant BE_API as "BE API /profile"
Participant AUTH_GUARD as "Auth Guard"
Participant PROFILE_CTRL as "Profile Controller"
Participant PROFILE_SVC as "Profile Service"

FE_CLIENT->>BE_API: GET /profile (JWT) or PUT /profile (JWT, body)
activate BE_API
BE_API->>AUTH_GUARD: Validate JWT
activate AUTH_GUARD
AUTH_GUARD-->>BE_API: Token valid, attach user
deactivate AUTH_GUARD
BE_API->>PROFILE_CTRL: Route to getProfile() or updateProfile()
activate PROFILE_CTRL
PROFILE_CTRL->>PROFILE_SVC: getProfile(userId) or updateProfile(userId, dto)
activate PROFILE_SVC
PROFILE_SVC-->>PROFILE_CTRL: User/Updated User
deactivate PROFILE_SVC
PROFILE_CTRL-->>BE_API: 200 OK, User/Updated User
deactivate PROFILE_CTRL
BE_API-->>FE_CLIENT: 200 OK, User/Updated User
deactivate BE_API
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                             |
| :----------------------- | :-------------- | :---------- | :-------------------------------------- |
| Invalid/Missing Token    | UNAUTHORIZED    | 401         | Your session has expired. Please log in again. |
| Invalid Input (PUT)      | INVALID_INPUT   | 400         | Display name cannot be empty. / Invalid preferred units. |
| User Not Found (Service) | USER_NOT_FOUND  | 404         | The user profile could not be found.    |
| Server-side Error        | INTERNAL_ERROR  | 500         | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): Implemented at the infrastructure layer (SYS-INFRA-SEC-01).
*   Authentication (JWT Verification Process): `@UseGuards(JwtAuthGuard)` ensures JWT validity and extracts user context for authorization.
*   Log Event Naming and Field Standards: `profile_get_request`, `profile_update_request`, `profile_update_validation_failed`. Logs should include `userId` for traceability.
*   Metric Naming (e.g., `auth_register_success_total`): `profile_get_total`, `profile_get_success_total`, `profile_update_total`, `profile_update_success_total`, `profile_update_validation_errors_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user with a profile.
*   ✅ When a `GET` request is sent to `/api/v1/profile` with a valid JWT.
*   ✅ Then a `200 OK` response is returned containing the user's `id`, `email`, `displayName`, and `preferredUnits`.
*   ✅ Given an authenticated user.
*   ✅ When a `PUT` request is sent to `/api/v1/profile` with a valid JWT and a body `{ "displayName": "New Name", "preferredUnits": "IMPERIAL" }`.
*   ✅ Then a `200 OK` response is returned with the updated profile, and `ProfileService.updateProfile` is called with the correct `userId` and data.
*   ✅ Given an authenticated user.
*   ✅ When a `PUT` request is sent to `/api/v1/profile` with a valid JWT but an invalid body (e.g., `{ "displayName": "" }`).
*   ✅ Then a `400 Bad Request` response is returned with a descriptive error message from the `ValidationPipe`.
*   ✅ Given an unauthenticated user.
*   ✅ When a `GET` or `PUT` request is sent to `/api/v1/profile`.
*   ✅ Then a `401 Unauthorized` response is returned.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                         |
| :----------------- | :----------- | :------------------------------------------------------------------ |
| Single Responsibility | ✅            | Handles HTTP request/response, DTO validation, and delegates to service. |
| Independence       | ✅            | Depends on `AuthGuard`, `ValidationPipe`, and `ProfileService`.      |
| Testability        | ✅            | Can be integration tested using Supertest with mocked `ProfileService`. |
| Small Subset Testing | ✅            | The controller logic can be tested without the entire application context. |

### 🔹 **Code Location**

```
apps/backend/src/profile/profile.controller.ts
apps/backend/src/profile/dto/profile.dto.ts
apps/backend/src/profile/dto/update-profile.dto.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-PROFILE-01-02

**Related Epic**: EPIC-001 User Account Management

**Related Story**: EPIC-001-S3 Basic Profile Management

**Source SYS-ID**: SYS-PLAT-PROFILE-01

**Related UX-ID:** UX-003

**Related UI-ID:** UI-018

**Task Name**: BE: Implement ProfileService.get/updateProfile

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-PROFILE-01-01 (Controllers will call this service)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Assumes `UpdateProfileDto` is already validated by controller.
- Exceptions: `NotFoundException` (if user somehow not found post-authentication), `InternalServerErrorException` for database issues.
- API/Protocol: N/A (internal service)
- Database Changes: Reads from and writes to the `User` table.
- UI/Components: N/A
- Interaction Logic: Encapsulates business logic for retrieving and updating user profile data, interacting with the database.
- Business Boundary Condition: Ensures `displayName` is updated correctly, `preferredUnits` are valid.
- Observability: Logs database interactions.
- Performance Considerations: Efficient database queries.
- Non-Functional: Data consistency, robust error handling.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   `getProfile(userId: string)`:
        *   Input: `userId` (string).
        *   Output: `Promise<ProfileDto>` (e.g., `{ id: "...", email: "...", displayName: "...", preferredUnits: "METRIC" }`).
    *   `updateProfile(userId: string, data: UpdateProfileDto)`:
        *   Input: `userId` (string), `data: UpdateProfileDto` (e.g., `{ displayName: "Jane Doe", preferredUnits: "IMPERIAL" }`).
        *   Output: `Promise<ProfileDto>`.
*   **Decision point application**: N/A for this task, as validation is handled by the DTO in the controller. The service assumes valid input.
*   **Main Function/Class Design**: `ProfileService` class in NestJS, decorated with `@Injectable()`. It will inject `PrismaService`.
*   **Code Location**: `apps/backend/src/profile/profile.service.ts`.
*   **Call Chain**: `ProfileController` → `ProfileService` → `PrismaService` → `PostgreSQL DB`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Use `prisma.user.findUniqueOrThrow` or `findUnique` with explicit error handling to ensure efficient lookups by `id`. Select only necessary fields (`select`) to minimize data transfer from DB.
    *   **Security**: Ensure only the authenticated `userId` can retrieve/update their own profile. Sensitive fields like `passwordHash` must *never* be selected/returned from this service.
    *   **Logging**: Log successful profile retrievals and updates, including `userId`. Log any database errors with full details (excluding sensitive data).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  Request Handling (Controller or Route): N/A (service layer).
2.  [Decision hook]: The service assumes input validation (e.g., `displayName` not empty, `preferredUnits` enum validity) has been performed at the controller/DTO layer.
3.  Business Logic (Service Methods + Dependent Capability Calls):
    *   Create `ProfileService` in `apps/backend/src/profile/profile.service.ts`.
    *   Inject `PrismaService` into the constructor.
    *   Implement `getProfile(userId: string)`:
        *   Call `this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, displayName: true, preferredUnits: true } })`.
        *   If no user is found, throw a `NotFoundException` (or similar application-specific error, which the global exception filter will convert to 404).
        *   Return the selected user data.
    *   Implement `updateProfile(userId: string, data: UpdateProfileDto)`:
        *   Call `this.prisma.user.update({ where: { id: userId }, data, select: { id: true, email: true, displayName: true, preferredUnits: true } })`.
        *   The `data` object will contain `displayName` and `preferredUnits` fields to update.
        *   Catch potential `PrismaClientKnownRequestError` if an unexpected database issue occurs (e.g., unique constraint violation, though not applicable for basic profile updates on `id`). Rethrow as `InternalServerErrorException`.
        *   Return the updated user data.
4.  Data Access (Prisma Models and Query Methods): Directly uses the `PrismaClient` instance (via `PrismaService`) to query and update the `User` model.
5.  Error and Exception Handling (including HTTP Status Codes and Error Codes):
    *   `NotFoundException` for `getProfile` if user not found.
    *   Catch `PrismaClientKnownRequestError` (e.g., P2025 for record not found during update, or generic DB errors) and map to appropriate NestJS HTTP exceptions (`NotFoundException`, `InternalServerErrorException`).
6.  Logging and Metrics (Structured fields, event name, duration): Use `LoggerService` to log operations:
    *   `ProfileService.getProfile called for userId: {userId}`
    *   `ProfileService.updateProfile called for userId: {userId} with data: {data}`
    *   `ProfileService.getProfile success for userId: {userId}`
    *   `ProfileService.updateProfile success for userId: {userId}`
    *   `ProfileService.getProfile failed for userId: {userId} with error: {error}`

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                                 |
| :------ | :---------------- | :---------------------------------------------------------- |
| Read    | `User` table      | `SELECT` query to retrieve user profile by `id`.            |
| Write   | `User` table      | `UPDATE` query to modify `displayName` and `preferredUnits`. |
| Cache   | N/A               | N/A.                                                        |
| Audit   | Log Event         | Records successful and failed data access operations.       |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Participant PROFILE_CTRL as "Profile Controller"
Participant PROFILE_SVC as "Profile Service"
Participant PRISMA_SVC as "Prisma Service"
Participant PRISMA_ORM as "Prisma ORM"
Participant POSTGRES_DB as "PostgreSQL DB"
Participant LOG_SVC as "Logging Service"

PROFILE_CTRL->>PROFILE_SVC: getProfile(userId)
activate PROFILE_SVC
PROFILE_SVC->>LOG_SVC: Log service call
PROFILE_SVC->>PRISMA_SVC: Call user.findUnique()
activate PRISMA_SVC
PRISMA_SVC->>PRISMA_ORM: SELECT from User (userId)
activate PRISMA_ORM
PRISMA_ORM->>POSTGRES_DB: SELECT * FROM "User" WHERE id = userId
activate POSTGRES_DB
POSTGRES_DB-->>PRISMA_ORM: User data
deactivate POSTGRES_DB
PRISMA_ORM-->>PRISMA_SVC: User data
deactivate PRISMA_ORM
PRISMA_SVC-->>PROFILE_SVC: User data
deactivate PRISMA_SVC
PROFILE_SVC->>LOG_SVC: Log service success
PROFILE_SVC-->>PROFILE_CTRL: ProfileDto
deactivate PROFILE_SVC

alt Update Profile Flow
PROFILE_CTRL->>PROFILE_SVC: updateProfile(userId, dto)
activate PROFILE_SVC
PROFILE_SVC->>LOG_SVC: Log service call with data
PROFILE_SVC->>PRISMA_SVC: Call user.update()
activate PRISMA_SVC
PRISMA_SVC->>PRISMA_ORM: UPDATE User (userId, dto)
activate PRISMA_ORM
POSTGRES_DB-->>PRISMA_ORM: Updated user data
deactivate POSTGRES_DB
PRISMA_ORM-->>PRISMA_SVC: Updated user data
deactivate PRISMA_ORM
PRISMA_SVC-->>PROFILE_SVC: Updated user data
deactivate PRISMA_SVC
PROFILE_SVC->>LOG_SVC: Log service success
PROFILE_SVC-->>PROFILE_CTRL: ProfileDto
deactivate PROFILE_SVC
end
```

### 🔹 **Error and Exception Mapping**

| Scenario                 | Error Code      | HTTP Status | User Prompt                             |
| :----------------------- | :-------------- | :---------- | :-------------------------------------- |
| User Not Found           | USER_NOT_FOUND  | 404         | The user profile could not be found.    |
| Database Error (Generic) | DB_ERROR        | 500         | A database error occurred. Please try again later. |
| Unknown Error            | INTERNAL_ERROR  | 500         | An unexpected server error occurred.    |

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): N/A (internal service).
*   Authentication (JWT Verification Process): `userId` passed from the controller is trusted as it came from a validated JWT.
*   Log Event Naming and Field Standards: `profile_service_get_started`, `profile_service_get_success`, `profile_service_get_failed`, `profile_service_update_started`, `profile_service_update_success`, `profile_service_update_failed`. Each log entry includes `userId` and relevant operation details.
*   Metric Naming (e.g., `auth_register_success_total`): `profile_service_get_duration_ms`, `profile_service_update_duration_ms`, `profile_service_db_errors_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a `userId` that exists in the database.
*   ✅ When `ProfileService.getProfile(userId)` is called.
*   ✅ Then the service returns a `ProfileDto` containing `id`, `email`, `displayName`, and `preferredUnits`, and does not return `passwordHash`.
*   ✅ Given a `userId` that does not exist.
*   ✅ When `ProfileService.getProfile(userId)` is called.
*   ✅ Then a `NotFoundException` is thrown.
*   ✅ Given a `userId` that exists and a valid `UpdateProfileDto` (e.g., `{ displayName: "New Name", preferredUnits: "IMPERIAL" }`).
*   ✅ When `ProfileService.updateProfile(userId, dto)` is called.
*   ✅ Then the `User` record in the database for `userId` is updated with the new `displayName` and `preferredUnits`.
*   ✅ And the service returns the `ProfileDto` with the updated values.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                         |
| :----------------- | :----------- | :------------------------------------------------------------------ |
| Single Responsibility | ✅            | Encapsulates business logic for profile management and database interaction. |
| Independence       | ✅            | Depends only on `PrismaService` for data access.                  |
| Testability        | ✅            | Can be unit tested by mocking `PrismaService`.                    |
| Small Subset Testing | ✅            | Logic is self-contained and testable in isolation.                  |

### 🔹 **Code Location**

```
apps/backend/src/profile/profile.service.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-PROFILE-01-03

**Related Epic**: EPIC-001 User Account Management

**Related Story**: EPIC-001-S3 Basic Profile Management

**Source SYS-ID**: SYS-PLAT-PROFILE-01

**Related UX-ID:** UX-003

**Related UI-ID:** N/A

**Task Name**: BE: Unit/Integration Tests for Profile Mgt

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-PROFILE-01-02 (Service logic is implemented)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Tests DTO validation in controller.
- Exceptions: Tests `Unauthorized`, `BadRequest`, `NotFound`, `Internal Server Error` scenarios.
- API/Protocol: Tests `GET /profile`, `PUT /profile` HTTP responses and status codes.
- Database Changes: Unit tests mock database interactions, integration tests typically use in-memory DB or rollback transactions.
- UI/Components: N/A
- Interaction Logic: Verifies correct behavior of `ProfileController` and `ProfileService` in various scenarios.
- Business Boundary Condition: Ensures only authenticated users can access/modify their profile, and validation rules are enforced.
- Observability: Tests ensure logging is triggered for critical events/errors.
- Performance Considerations: Tests should run quickly.
- Non-Functional: Verifies security (auth), error handling, data integrity.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   Unit tests: Direct method calls with mocked inputs.
    *   Integration tests: Simulated HTTP requests (e.g., Supertest), asserting HTTP responses.
    *   Outputs: Asserted return values, thrown exceptions, HTTP status codes, and response bodies.
*   **Decision point application**: N/A for this task.
*   **Main Function/Class Design**: Jest test suites (`.spec.ts` files).
    *   `ProfileService` unit tests: Use `jest.mock` for `PrismaService`.
    *   `ProfileController` integration tests: Use `NestJsTestingModule` and `supertest`.
*   **Code Location**:
    *   `apps/backend/src/profile/profile.service.spec.ts`
    *   `apps/backend/src/profile/profile.controller.spec.ts`
*   **Call Chain**: Test runner directly interacts with the module under test (`ProfileService` or `ProfileController`).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Tests should be fast; avoid real database calls in unit tests.
    *   **Security**: Integration tests verify `AuthGuard` functionality and resource ownership checks.
    *   **Logging**: Tests can assert that `LoggerService` methods are called appropriately.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  Request Handling (Controller or Route): N/A (this is the testing task).
2.  [Decision hook]: N/A.
3.  Business Logic (Service Methods + Dependent Capability Calls): N/A.
4.  Data Access (Prisma Models and Query Methods): N/A.
5.  Error and Exception Handling (including HTTP Status Codes and Error Codes):
    *   **Unit Tests for `ProfileService` (`profile.service.spec.ts`):**
        *   Mock `PrismaService` (`findUnique`, `update` methods).
        *   Test `getProfile`:
            *   Successfully retrieves a user.
            *   Throws `NotFoundException` if user not found.
        *   Test `updateProfile`:
            *   Successfully updates `displayName` and `preferredUnits`.
            *   Returns the correct updated `ProfileDto`.
            *   Handles cases where the user ID might not exist (e.g., by throwing `NotFoundException` if `findUnique` prior to update fails, or checking `prisma.user.update` return).
    *   **Integration Tests for `ProfileController` (`profile.controller.spec.ts`):**
        *   Use `Test.createTestingModule` to set up a NestJS testing application.
        *   Mock `ProfileService` to control its behavior (e.g., `getProfile` returns a user, `updateProfile` returns an updated user, or throws exceptions).
        *   Use `supertest` to send HTTP requests.
        *   Test `GET /profile`:
            *   **Success**: With a valid JWT, expect `200 OK` and correct `ProfileDto`.
            *   **Unauthorized**: Without a JWT, expect `401 Unauthorized`.
        *   Test `PUT /profile`:
            *   **Success**: With a valid JWT and valid `UpdateProfileDto` (e.g., `{ displayName: "Test", preferredUnits: "METRIC" }`), expect `200 OK` and updated `ProfileDto`.
            *   **Unauthorized**: Without a JWT, expect `401 Unauthorized`.
            *   **Bad Request (Validation)**: With a valid JWT but invalid `UpdateProfileDto` (e.g., `{ displayName: "" }`), expect `400 Bad Request` and validation error message.
            *   **Not Found (Service Error)**: Mock `ProfileService.updateProfile` to throw `NotFoundException`, expect `404 Not Found` from the API.
6.  Logging and Metrics (Structured fields, event name, duration): N/A (tests assert functionality, not directly implement logging for itself).

### 🔹 **Data Flow and State Change**

| Type    | Read/Write Target | Description                                             |
| :------ | :---------------- | :------------------------------------------------------ |
| Read    | Mocked/Test Data  | For unit tests, data is mocked.                         |
| Write   | Mocked/Test Data  | For unit tests, mocked data state changes are asserted. |
| Cache   | N/A               | N/A.                                                    |
| Audit   | N/A               | N/A.                                                    |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Participant TEST_RUNNER as "Test Runner (Jest)"
Participant PROFILE_CTRL as "Profile Controller"
Participant PROFILE_SVC as "Profile Service"
Participant MOCK_PRISMA as "Mock Prisma Service"
Participant MOCK_AUTH_GUARD as "Mock Auth Guard"
Participant MOCK_LOGGER as "Mock Logger"

TEST_RUNNER->>PROFILE_SVC: Unit test getProfile()
activate PROFILE_SVC
PROFILE_SVC->>MOCK_PRISMA: findUnique()
activate MOCK_PRISMA
MOCK_PRISMA-->>PROFILE_SVC: Mock user data
deactivate MOCK_PRISMA
PROFILE_SVC-->>TEST_RUNNER: Assert result
deactivate PROFILE_SVC

TEST_RUNNER->>PROFILE_CTRL: Integration test PUT /profile
activate PROFILE_CTRL
PROFILE_CTRL->>MOCK_AUTH_GUARD: Call AuthGuard.canActivate()
activate MOCK_AUTH_GUARD
MOCK_AUTH_GUARD-->>PROFILE_CTRL: Authenticated user
deactivate MOCK_AUTH_GUARD
PROFILE_CTRL->>PROFILE_SVC: Call updateProfile()
activate PROFILE_SVC
PROFILE_SVC->>MOCK_PRISMA: update()
activate MOCK_PRISMA
MOCK_PRISMA-->>PROFILE_SVC: Mock updated user
deactivate MOCK_PRISMA
PROFILE_SVC-->>PROFILE_CTRL: Updated user
deactivate PROFILE_SVC
PROFILE_CTRL->>MOCK_LOGGER: Log success
activate MOCK_LOGGER
MOCK_LOGGER-->>PROFILE_CTRL: Logged
deactivate MOCK_LOGGER
PROFILE_CTRL-->>TEST_RUNNER: Assert 200 OK
deactivate PROFILE_CTRL
```

### 🔹 **Error and Exception Mapping**
This task *verifies* the error and exception mappings defined in `TASK-SYS-PLAT-PROFILE-01-01` and `TASK-SYS-PLAT-PROFILE-01-02`. The tests confirm that the system responds with the expected HTTP status codes and error messages for various scenarios.

### 🔹 **Security and Observability Hooks**

*   Transport Security (HTTPS/TLS): N/A (testing environment).
*   Authentication (JWT Verification Process): Integration tests specifically verify that requests without valid JWTs are rejected with `401 Unauthorized`.
*   Log Event Naming and Field Standards: Tests ensure that logging functions are called at appropriate points, confirming the intended observability hooks are in place.
*   Metric Naming (e.g., `auth_register_success_total`): Tests can check if metric incrementing logic is called.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `ProfileService` with a mocked `PrismaService`.
*   ✅ When `getProfile` is called with an existing `userId`.
*   ✅ Then it returns the correct `ProfileDto` and `PrismaService.user.findUnique` is called once.
*   ✅ Given `ProfileService` with a mocked `PrismaService`.
*   ✅ When `updateProfile` is called with an existing `userId` and new `displayName`.
*   ✅ Then `PrismaService.user.update` is called with the correct `userId` and `data`, and the updated `ProfileDto` is returned.
*   ✅ Given the NestJS testing application with `ProfileController` and mocked `ProfileService`.
*   ✅ When an authenticated `GET /profile` request is made using Supertest.
*   ✅ Then the response status is `200 OK` and the body contains the expected user profile.
*   ✅ Given the NestJS testing application with `ProfileController` and mocked `ProfileService`.
*   ✅ When an unauthenticated `PUT /profile` request is made.
*   ✅ Then the response status is `401 Unauthorized`.
*   ✅ Given the NestJS testing application with `ProfileController` and mocked `ProfileService`.
*   ✅ When an authenticated `PUT /profile` request is made with an empty `displayName`.
*   ✅ Then the response status is `400 Bad Request` and the error message indicates a validation failure for `displayName`.

### 🔹 **Atomization Checklist**

| Dimension          | Pass or Fail | Description                                                         |
| :----------------- | :----------- | :------------------------------------------------------------------ |
| Single Responsibility | ✅            | Each test suite and individual test focuses on a specific aspect of profile management. |
| Independence       | ✅            | Tests use mocks or isolated testing modules to ensure independence. |
| Testability        | ✅            | The architecture allows for easy mocking of dependencies.         |
| Small Subset Testing | ✅            | Both unit and integration tests focus on small, specific code paths. |

### 🔹 **Code Location**

```
apps/backend/src/profile/profile.service.spec.ts
apps/backend/src/profile/profile.controller.spec.ts
```

<!-- impl-batch:TASK-SYS-PLAT-PROFILE-01-04::SYS-PLAT-PROFILE-01::UX-003::TASK-SYS-PLAT-PROFILE-01-05::SYS-PLAT-PROFILE-01::UX-003::TASK-SYS-PLAT-EXERCISE-02-01::SYS-PLAT-EXERCISE-02::UX-006::TASK-SYS-PLAT-EXERCISE-02-02::SYS-PLAT-EXERCISE-02::UX-006::TASK-SYS-PLAT-EXERCISE-02-03::SYS-PLAT-EXERCISE-02::UX-006 -->

## **Task-ID**: TASK-SYS-PLAT-PROFILE-01-04

**Related Epic**: EPIC-001 User Account Management

**Related Story**: EPIC-001-S3 Basic Profile Management

**Source SYS-ID**: SYS-PLAT-PROFILE-01

**Related UX-ID:** UX-003

**Task Name**: FE: Create Profile Page & Form Component

**Task Type**: Frontend

**Priority/Phase**: T1

**Dependency**: SYS-INFRA-SETUP-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Display name non-empty, preferred units selection.
- Exceptions: Client-side validation errors displayed inline.
- API/Protocol: Not directly covered, but prepares data for `PUT /profile`.
- Database Changes: Not covered.
- UI/Components: `src/app/(app)/profile/page.tsx` for the profile page, `src/components/profile/ProfileForm.tsx` for the form component, including input fields for `displayName` and a dropdown/radio for `preferredUnits`.
- Interaction Logic: Page renders profile data from state, form allows editing, client-side validation prevents submission of invalid data.
- Business Boundary Condition: Display name string, preferred units enum (`METRIC`, `IMPERIAL`).
- Observability: Not applicable for a pure FE component task.
- Performance Considerations: Efficient rendering of form, debouncing inputs if necessary.
- Non-Functional: Internationalization (English), Accessibility labels, Mobile adaptation for responsive form layout.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**:
    *   Input: `UserProfile` object (e.g., `{ id: '...', email: 'test@example.com', displayName: 'John Doe', preferredUnits: 'METRIC' }`)
    *   Output: `UpdateProfileDto` object (e.g., `{ displayName: 'Johnny D', preferredUnits: 'IMPERIAL' }`)
*   **Decision point application**: No specific DECISION-REF applies to this task. Client-side validation will enforce UX-003 constraints: display name cannot be empty.
*   **Main Function/Class Design** (including responsibilities):
    *   `ProfilePage` (`app/(app)/profile/page.tsx`): Responsible for fetching initial profile data (via `ProfileAPIClient` and state management), rendering the `ProfileForm` component, and handling submission to update the profile.
    *   `ProfileForm` (`components/profile/ProfileForm.tsx`): A reusable presentational component responsible for displaying the form fields, handling local input state, and performing client-side validation. It emits an `onSubmit` event with validated data.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.):
    *   `apps/frontend/src/app/(app)/profile/page.tsx`
    *   `apps/frontend/src/components/profile/ProfileForm.tsx`
    *   `packages/shared-types/src/user.types.ts` (for `UserProfile` and `Units` types)
*   **Call Chain** (prefix → current task → downstream): User interaction → `ProfilePage` → `ProfileForm` (client-side validation) → (Data passed to `ProfileAPIClient` in TASK-SYS-PLAT-PROFILE-01-05).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Optimize component rendering with React's `memo` if necessary for complex parts. Avoid unnecessary re-renders.
    *   **Security**: Ensure no sensitive user data is exposed in the UI unnecessarily. Client-side validation is for UX, not a security boundary.
    *   **Logging**: Basic console logging for development, but no production logging/observability hooks at this UI component level.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**:
    *   Create `apps/frontend/src/app/(app)/profile/page.tsx` to serve as the main profile page.
    *   Create `apps/frontend/src/components/profile/ProfileForm.tsx` for the reusable form.
2.  **Triggering Logic (events, buttons, input validation)**:
    *   `ProfilePage` will load initially and pass `UserProfile` data to `ProfileForm` as props.
    *   `ProfileForm` will use local state (`useState` or a form library like React Hook Form) to manage `displayName` and `preferredUnits` inputs.
    *   Input fields will have `onChange` handlers to update local state.
    *   A "Save" button will trigger the form submission.
    *   **Client-side Validation (UX-003)**:
        *   `displayName` field: Must not be empty. Display an error message if empty on blur or submit attempt.
        *   `preferredUnits` field: Ensure it's one of `METRIC` or `IMPERIAL`. This will typically be enforced by a dropdown selection.
3.  **Interaction with the Backend (interfaces, parameters, state flow)**:
    *   The `ProfileForm` will emit an `onSubmit` event, passing the validated form data (`UpdateProfileDto`) up to the `ProfilePage`.
    *   The `ProfilePage` will then utilize the `ProfileAPIClient` (from TASK-SYS-PLAT-PROFILE-01-05) to send this data to the backend.
4.  **UI Success/Failure Feedback and State Recovery**:
    *   The `ProfileForm` will display client-side validation errors directly next to the input fields.
    *   Loading states will be managed by the `ProfilePage` (e.g., disabling the submit button) while API calls are in progress.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | FE State (Auth/User) | Reads current user's profile data to pre-fill the form. |
| Write | FE Local Component State | Updates `displayName` and `preferredUnits` as user types/selects. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant FE_PAGE as "profile/page.tsx"
participant FE_FORM as "ProfileForm.tsx"

USER->>FE_PAGE: Navigates to Profile
activate FE_PAGE
FE_PAGE->>FE_FORM: Renders with initial data
activate FE_FORM
USER->>FE_FORM: Edits form fields
FE_FORM->>FE_FORM: Updates local state
USER->>FE_FORM: Clicks "Save"
FE_FORM->>FE_FORM: Client-side validation
alt Validation Failed
FE_FORM->>USER: Display error message
else Validation Success
FE_FORM->>FE_PAGE: Emits onSubmit(formData)
deactivate FE_FORM
deactivate FE_PAGE
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| Display Name Empty | CLIENT_VALIDATION | N/A (Frontend) | Display name cannot be empty. |
| Invalid Units | CLIENT_VALIDATION | N/A (Frontend) | Please select a valid unit. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A (component logic).
*   **Authentication**: N/A (component logic).
*   **Log Event Naming and Field Standards**: N/A (component logic).
*   **Metric Naming**: N/A (component logic).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user is on the profile page
*   ✅ When the page loads
*   ✅ Then the `ProfileForm` component displays with the user's current `displayName` and `preferredUnits`.
*   ✅ Given an authenticated user is on the profile page
*   ✅ When the user clears the `displayName` field and tries to save
*   ✅ Then a client-side validation error message "Display name cannot be empty." is shown, and the form cannot be submitted.
*   ✅ Given an authenticated user is on the profile page
*   ✅ When the user selects a valid `preferredUnits` option (e.g., "IMPERIAL")
*   ✅ Then the form's local state is updated with the new selection.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | `ProfileForm` handles form display and local validation; `ProfilePage` handles data fetching/submission. |
| Independence | ✅ | `ProfileForm` is a reusable component, accepting props for initial data and callbacks for submission. |
| Testability | ✅ | Components can be easily rendered and tested with mock props. |
| Small Subset Testing | ✅ | Unit tests can verify `ProfileForm`'s rendering, input handling, and validation. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(app)/profile/page.tsx
apps/frontend/src/components/profile/ProfileForm.tsx
packages/shared-types/src/user.types.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-PROFILE-01-05

**Related Epic**: EPIC-001 User Account Management

**Related Story**: EPIC-001-S3 Basic Profile Management

**Source SYS-ID**: SYS-PLAT-PROFILE-01

**Related UX-ID:** UX-003

**Task Name**: FE: Implement Profile API Client & State

**Task Type**: Frontend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-PROFILE-01-04, SYS-INFRA-AUTH-01 (FE depends on Auth for JWT)

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (backend handles API-level validation).
- Exceptions: Handles network errors, 401 Unauthorized, 400 Bad Request from API.
- API/Protocol: `GET /profile`, `PUT /profile` using `axios` with JWT.
- Database Changes: Not covered.
- UI/Components: Integrates with `src/app/(app)/profile/page.tsx` for data display and form submission.
- Interaction Logic: Fetches profile on mount, sends updates on form submit, manages loading/error states, updates global user state.
- Business Boundary Condition: Ensures `preferredUnits` are valid enum values, `displayName` is a string.
- Observability: Logs API request/response for debugging.
- Performance Considerations: Debounce API calls if multiple rapid updates are possible (not typical for profile).
- Non-Functional: Internationalization of error messages.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**:
    *   `GET /profile` (Input: JWT in header) → Output: `UserProfile` (e.g., `{ id: '...', email: 'test@example.com', displayName: 'John Doe', preferredUnits: 'METRIC' }`)
    *   `PUT /profile` (Input: JWT in header, `UpdateProfileDto` in body, e.g., `{ displayName: 'Johnny D', preferredUnits: 'IMPERIAL' }`) → Output: Updated `UserProfile`
*   **Decision point application**: No specific DECISION-REF applies to this task.
*   **Main Function/Class Design** (including responsibilities):
    *   `ProfileService` (`services/profile.service.ts`): An API client responsible for making HTTP requests to `GET /profile` and `PUT /profile`. It will use `axios` configured with the JWT.
    *   `UserProfileStore` (`store/profile.store.ts` or integrated into `useAuth`): A global state management solution (e.g., Zustand context) to store the currently logged-in user's profile data. This store will be updated after successful `GET` or `PUT` operations.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.):
    *   `apps/frontend/src/services/profile.service.ts`
    *   `apps/frontend/src/store/user.store.ts` (or similar for global user state)
    *   `apps/frontend/src/app/(app)/profile/page.tsx` (for integration)
    *   `packages/shared-types/src/user.types.ts`
*   **Call Chain** (prefix → current task → downstream): `ProfilePage` → `ProfileService.getProfile()` / `ProfileService.updateProfile()` → (Backend API `AuthGuard` in `AuthModule`, `ProfileController`, `ProfileService` in `ProfileModule`).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Minimize redundant API calls (e.g., cache profile data in state, only refetch if stale or explicitly triggered).
    *   **Security**: Ensure JWT is securely stored (e.g., HTTP-only cookies or local storage with care) and sent with all authenticated requests. Handle 401 Unauthorized by redirecting to login.
    *   **Logging**: Log API request failures to the browser console for debugging.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: The `apps/frontend/src/app/(app)/profile/page.tsx` will be modified to integrate with the new `ProfileService` and `UserProfileStore`.
2.  **Triggering Logic (events, buttons, input validation)**:
    *   On `ProfilePage` mount: Call `ProfileService.getProfile()` to fetch initial data.
    *   On `ProfileForm` submit: Call `ProfileService.updateProfile()` with the submitted data.
3.  **Interaction with the Backend (interfaces, parameters, state flow)**:
    *   **ProfileAPIClient (`profile.service.ts`)**:
        *   `getProfile()`: Makes a `GET` request to `/api/v1/profile`.
        *   `updateProfile(dto: UpdateProfileDto)`: Makes a `PUT` request to `/api/v1/profile` with the DTO as the request body.
    *   Both methods handle `axios` errors and potentially re-throw them for the UI to catch.
    *   **UserProfileStore**: After a successful `getProfile` or `updateProfile`, the `UserProfileStore` will be updated with the latest user data. This ensures other parts of the application always have access to the current profile.
4.  **UI Success/Failure Feedback and State Recovery**:
    *   The `ProfilePage` will display loading indicators while API calls are in progress.
    *   On API success: Display a success toast/message, update the UI (which reacts to `UserProfileStore` changes).
    *   On API failure: Display an error toast/message. For 401 Unauthorized, redirect the user to the login page. For 400 Bad Request, display the specific error message from the backend (e.g., "Display name cannot be empty.").

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Backend API (`/profile`) | Fetches user profile data from the server. |
| Write | Backend API (`/profile`) | Sends updated user profile data to the server. |
| Write | FE Global State (User) | Updates the global user profile state in the `UserProfileStore` after successful API calls. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant FE_PAGE as "profile/page.tsx"
participant FE_SVC as "profile.service.ts"
participant BE_CTRL as "ProfileController"
participant BE_SVC as "ProfileService"
participant DB_PRISMA as "Prisma ORM"

USER->>FE_PAGE: Navigates to Profile
activate FE_PAGE
FE_PAGE->>FE_SVC: getProfile()
activate FE_SVC
FE_SVC->>BE_CTRL: GET /api/v1/profile (with JWT)
activate BE_CTRL
BE_CTRL->>BE_SVC: getProfile(userId)
activate BE_SVC
BE_SVC->>DB_PRISMA: findUnique(userId)
activate DB_PRISMA
DB_PRISMA-->>BE_SVC: User data
deactivate DB_PRISMA
BE_SVC-->>BE_CTRL: UserProfile
deactivate BE_SVC
BE_CTRL-->>FE_SVC: 200 UserProfile
deactivate BE_CTRL
FE_SVC-->>FE_PAGE: UserProfile
deactivate FE_SVC
FE_PAGE->>FE_PAGE: Update global state & display form
USER->>FE_PAGE: Submits updated profile
FE_PAGE->>FE_SVC: updateProfile(dto)
activate FE_SVC
FE_SVC->>BE_CTRL: PUT /api/v1/profile (with JWT, dto)
activate BE_CTRL
BE_CTRL->>BE_SVC: updateProfile(userId, dto)
activate BE_SVC
BE_SVC->>DB_PRISMA: update(userId, dto)
activate DB_PRISMA
DB_PRISMA-->>BE_SVC: Updated User data
deactivate DB_PRISMA
BE_SVC-->>BE_CTRL: Updated UserProfile
deactivate BE_SVC
BE_CTRL-->>FE_SVC: 200 Updated UserProfile
deactivate BE_CTRL
FE_SVC-->>FE_PAGE: Updated UserProfile
deactivate FE_SVC
FE_PAGE->>FE_PAGE: Update global state & show success
deactivate FE_PAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| Unauthorized Access | UNAUTHORIZED | 401 | Your session has expired. Please log in again. |
| Invalid Input (BE validation) | BAD_REQUEST | 400 | The display name cannot be empty. / Invalid preferred units. |
| Server Error | INTERNAL_ERROR | 500 | An unexpected error occurred. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All API calls over HTTPS enforced by deployment (SYS-INFRA-SEC-01).
*   **Authentication**: JWT is sent in the `Authorization` header with each request and validated by backend `AuthGuard` (SYS-INFRA-AUTH-01).
*   **Log Event Naming and Field Standards**: Frontend logs API call successes/failures (e.g., `profile_get_success`, `profile_update_failure`).
*   **Metric Naming**: Can expose `profile_get_latency`, `profile_update_latency` on the frontend.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user is on the profile page
*   ✅ When the page loads
*   ✅ Then `ProfileService.getProfile()` is called, and the fetched data populates the `UserProfileStore` and `ProfileForm`.
*   ✅ Given an authenticated user updates their display name and preferred units in the form
*   ✅ When they click "Save"
*   ✅ Then `ProfileService.updateProfile()` is called with the correct data, and on success, the `UserProfileStore` is updated.
*   ✅ Given an unauthenticated user tries to access the profile page
*   ✅ When the `ProfileService.getProfile()` call returns 401
*   ✅ Then the user is redirected to the login page.
*   ✅ Given an authenticated user submits an empty display name
*   ✅ When the `ProfileService.updateProfile()` call returns 400
*   ✅ Then an appropriate error message is displayed to the user.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | `ProfileService` handles API calls, `UserProfileStore` handles state. |
| Independence | ✅ | `ProfileService` is decoupled from UI; `UserProfileStore` is a global store. |
| Testability | ✅ | `ProfileService` can be easily mocked in unit tests; integration tests can simulate API calls. |
| Small Subset Testing | ✅ | Unit tests for `ProfileService` and `UserProfileStore` are feasible. |

### 🔹 **Code Location**

```
apps/frontend/src/services/profile.service.ts
apps/frontend/src/store/user.store.ts
apps/frontend/src/app/(app)/profile/page.tsx
packages/shared-types/src/user.types.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-EXERCISE-02-01

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S3 Add Custom Exercise During Workout

**Source SYS-ID**: SYS-PLAT-EXERCISE-02

**Related UX-ID:** UX-006

**Task Name**: BE: Implement POST /exercises (Custom) API

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: SYS-CORE-EXERCISE-01, SYS-INFRA-AUTH-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Exercise `name` is required and non-empty. `type` is required and valid (`STRENGTH`, `CARDIO`).
- Exceptions: `400 Bad Request` for invalid input, `401 Unauthorized` for missing/invalid JWT, `409 Conflict` if exercise name already exists for the user.
- API/Protocol: `POST /api/v1/exercises`
- Database Changes: Not directly, but orchestrates call to service which persists `Exercise`.
- UI/Components: Not covered (backend task).
- Interaction Logic: Authenticates user, validates request body, delegates to `ExerciseService`.
- Business Boundary Condition: Exercise name must be unique per user or for system.
- Observability: Logs request details, validation errors.
- Performance Considerations: Validation should be fast.
- Non-Functional: Internationalization (error messages).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**:
    *   Input: `CreateExerciseDto` (e.g., `{ name: 'Custom Pushup', type: 'STRENGTH' }`)
    *   Output: `Exercise` object (e.g., `{ id: '...', name: 'Custom Pushup', type: 'STRENGTH', createdById: '...', createdAt: '...' }`)
*   **Decision point application**: No specific DECISION-REF applies to this task. UX-006 ("Exercise name cannot be empty") will be enforced via DTO validation.
*   **Main Function/Class Design** (including responsibilities):
    *   `ExercisesController` (`exercises/exercises.controller.ts`): Responsible for handling the `POST /exercises` endpoint. It applies `JwtAuthGuard` for authentication, validates the incoming `CreateExerciseDto`, extracts `userId` from the request, and calls `ExerciseService.createCustom`.
    *   `CreateExerciseDto`: A NestJS DTO class using `class-validator` decorators to define validation rules for `name` (e.g., `@IsNotEmpty(), @IsString()`) and `type` (e.g., `@IsEnum(ExerciseType)`).
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.):
    *   `apps/backend/src/exercises/exercises.controller.ts`
    *   `apps/backend/src/exercises/dto/create-exercise.dto.ts`
    *   `apps/backend/src/auth/guards/jwt-auth.guard.ts` (SYS-INFRA-AUTH-01)
    *   `apps/backend/src/prisma/schema.prisma` (for `ExerciseType` enum)
*   **Call Chain** (prefix → current task → downstream): Frontend Request → `ExercisesController.create()` → (Authentication Guard, DTO Validation) → `ExerciseService.createCustom()`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Input validation occurs early in the request pipeline to fail fast and minimize resource usage for invalid requests.
    *   **Security**: `JwtAuthGuard` ensures only authenticated users can create exercises. The `userId` is obtained from the JWT payload, preventing users from creating exercises for others.
    *   **Logging**: Log successful custom exercise creation (e.g., `custom_exercise_created_event`, `userId`, `exerciseId`, `name`) and validation failures (e.g., `custom_exercise_creation_validation_failed`, `userId`, `errorDetails`).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**:
    *   Define `ExercisesController` at `apps/backend/src/exercises/exercises.controller.ts`.
    *   Add a `POST` method decorated with `@Post('/')` and `@UseGuards(JwtAuthGuard)` and `@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))`.
    *   The method signature will be `async create(@Body() createExerciseDto: CreateExerciseDto, @Req() req)` where `req.user.id` provides the authenticated user's ID.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**:
    *   The controller extracts the `userId` from `req.user.id` (populated by `JwtAuthGuard` and `JwtStrategy`).
    *   It then calls `this.exerciseService.createCustom(userId, createExerciseDto)`.
3.  **Data Access (Prisma Models and Query Methods)**: N/A, this is handled by the `ExerciseService` (TASK-SYS-PLAT-EXERCISE-02-02).
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**:
    *   `ValidationPipe` automatically handles validation errors by throwing `BadRequestException` (HTTP 400).
    *   `JwtAuthGuard` throws `UnauthorizedException` (HTTP 401) if no valid JWT is provided.
    *   The `ExerciseService` will handle `409 Conflict` if the exercise name is not unique for the user.
5.  **Logging and Metrics (Structured fields, event name, duration)**:
    *   Use `LoggerService` to log incoming requests and the outcome of the API call (success or specific error types).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Request Body | Reads `name` and `type` for the new exercise. |
| Read | JWT Payload | Extracts `userId` of the creator. |
| Write | N/A (Delegated) | The controller orchestrates, `ExerciseService` performs the write. |
| Audit | Log Event | Records `POST /exercises` request details, validation status, and authentication result. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant FE_APP as "Frontend App"
participant BE_CTRL as "ExercisesController"
participant JWT_GUARD as "JwtAuthGuard"
participant DTO_VALIDATOR as "ValidationPipe"
participant BE_SVC as "ExerciseService"

FE_APP->>BE_CTRL: POST /api/v1/exercises (CreateExerciseDto, JWT)
activate BE_CTRL
BE_CTRL->>JWT_GUARD: Validate JWT
activate JWT_GUARD
alt Valid JWT
JWT_GUARD-->>BE_CTRL: Authenticated user ID
deactivate JWT_GUARD
BE_CTRL->>DTO_VALIDATOR: Validate CreateExerciseDto
activate DTO_VALIDATOR
alt DTO Valid
DTO_VALIDATOR-->>BE_CTRL: Validated DTO
deactivate DTO_VALIDATOR
BE_CTRL->>BE_SVC: createCustom(userId, dto)
activate BE_SVC
BE_SVC-->>BE_CTRL: Created Exercise
deactivate BE_SVC
BE_CTRL-->>FE_APP: 201 Created Exercise
deactivate BE_CTRL
else DTO Invalid
DTO_VALIDATOR-->>BE_CTRL: Throws BadRequestException
deactivate DTO_VALIDATOR
BE_CTRL-->>FE_APP: 400 Bad Request
deactivate BE_CTRL
end
else Invalid/Missing JWT
JWT_GUARD-->>BE_CTRL: Throws UnauthorizedException
deactivate JWT_GUARD
BE_CTRL-->>FE_APP: 401 Unauthorized
deactivate BE_CTRL
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| Invalid Exercise Name | VALIDATION_ERROR | 400 | Exercise name must not be empty. |
| Invalid Exercise Type | VALIDATION_ERROR | 400 | Invalid exercise type. Please choose STRENGTH or CARDIO. |
| Unauthorized Access | UNAUTHORIZED | 401 | You are not authorized to perform this action. |
| Duplicate Exercise Name | EXERCISE_NAME_CONFLICT | 409 | An exercise with this name already exists for your custom exercises. |
| Server Error | INTERNAL_SERVER_ERROR | 500 | An unexpected error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: HTTPS (SYS-INFRA-SEC-01) is used for all API communication.
*   **Authentication**: `JwtAuthGuard` (SYS-INFRA-AUTH-01) protects the endpoint, ensuring only authenticated users can create custom exercises. The `userId` is obtained securely from the JWT payload.
*   **Log Event Naming and Field Standards**: `exercise_custom_create_request`, `exercise_custom_create_success`, `exercise_custom_create_validation_error`, `exercise_custom_create_conflict_error`. Include `userId` and request body for errors.
*   **Metric Naming**: `api_exercises_post_total`, `api_exercises_post_duration_seconds`. Status code specific metrics (e.g., `api_exercises_post_4xx_total`).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user
*   ✅ When a `POST` request is made to `/api/v1/exercises` with a valid `name` and `type`
*   ✅ Then a new custom exercise is created and returned with a `201` status code.
*   ✅ Given an unauthenticated user
*   ✅ When a `POST` request is made to `/api/v1/exercises`
*   ✅ Then a `401 Unauthorized` status is returned.
*   ✅ Given an authenticated user
*   ✅ When a `POST` request is made to `/api/v1/exercises` with an empty `name`
*   ✅ Then a `400 Bad Request` status is returned with a validation error.
*   ✅ Given an authenticated user
*   ✅ When a `POST` request is made to `/api/v1/exercises` with an invalid `type` (e.g., "INVALID")
*   ✅ Then a `400 Bad Request` status is returned with a validation error.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Controller handles request parsing, validation, authentication, and delegates business logic to the service. |
| Independence | ✅ | The controller relies on services and guards for specific functions, promoting modularity. |
| Testability | ✅ | The controller can be unit tested by mocking `ExerciseService` and guards; integration tests can cover the HTTP layer. |
| Small Subset Testing | ✅ | Testing individual routes, guards, and DTOs is straightforward. |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.controller.ts
apps/backend/src/exercises/dto/create-exercise.dto.ts
apps/backend/src/auth/guards/jwt-auth.guard.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-EXERCISE-02-02

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S3 Add Custom Exercise During Workout

**Source SYS-ID**: SYS-PLAT-EXERCISE-02

**Related UX-ID:** UX-006

**Task Name**: BE: Implement ExerciseService.createCustom

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-EXERCISE-02-01, SYS-INFRA-DB-01

**DECISION-REF**: —

### **Coverage**:

- Input Validation: N/A (assumes DTO already validated by controller).
- Exceptions: Handles `PrismaClientKnownRequestError` for unique constraint violation (`P2002`).
- API/Protocol: Not directly covered (service layer).
- Database Changes: Creates a new `Exercise` record in the `Exercise` table.
- UI/Components: Not covered (backend task).
- Interaction Logic: Persists a new `Exercise` entity, linking it to the creating user.
- Business Boundary Condition: Enforces `@@unique([name, createdById])` constraint on `Exercise` model.
- Observability: Logs database operations.
- Performance Considerations: Direct database write, should be performant.
- Non-Functional: Internationalization (error messages).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**:
    *   Input: `userId: string`, `createExerciseDto: CreateExerciseDto` (e.g., `'clx...xyz'`, `{ name: 'Custom Curl', type: 'STRENGTH' }`)
    *   Output: `Exercise` object created (e.g., `{ id: '...', name: 'Custom Curl', type: 'STRENGTH', createdById: 'clx...xyz', createdAt: '...', updatedAt: '...' }`)
*   **Decision point application**: No specific DECISION-REF applies to this task. The unique constraint `@@unique([name, createdById])` defined in `schema.prisma` will be handled to return a `409 Conflict` if violated, adhering to UX-006's implication that a user should not create duplicate custom exercises.
*   **Main Function/Class Design** (including responsibilities):
    *   `ExerciseService` (`exercises/exercises.service.ts`): Contains the core business logic for exercise management. The `createCustom(userId, dto)` method is responsible for interacting with Prisma to create the `Exercise` record and handle potential unique constraint errors.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.):
    *   `apps/backend/src/exercises/exercises.service.ts`
    *   `apps/backend/src/prisma/prisma.service.ts` (for Prisma client injection)
    *   `apps/backend/src/prisma/schema.prisma` (defines `Exercise` model and unique constraint)
    *   `apps/backend/src/common/exceptions/http-exception.filter.ts` (SYS-INFRA-ERROR-01 for handling Prisma errors)
*   **Call Chain** (prefix → current task → downstream): `ExercisesController.create()` → `ExerciseService.createCustom()` → `PrismaService.exercise.create()`.
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: The `create` operation is a direct database insert, which is efficient. Indexing on `name` and `createdById` in the `Exercise` table supports the unique constraint check (though Prisma handles much of this).
    *   **Security**: Ensures `createdById` is always set to the authenticated `userId`, preventing unauthorized exercise creation for other users.
    *   **Logging**: Log successful database insertions (`db_exercise_create_success`, `exerciseId`, `name`, `createdById`). Log Prisma errors (e.g., `db_exercise_create_unique_constraint_violation`, `errorDetails`, `userId`, `name`).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**: N/A (service layer).
2.  **Business Logic (Service Methods + Dependent Capability Calls)**:
    *   Define `createCustom(userId: string, createExerciseDto: CreateExerciseDto)` method in `ExerciseService`.
    *   Inside the method, construct the data object for Prisma, including `createdBy: { connect: { id: userId } }` to link the exercise to the user, and `type: createExerciseDto.type`.
    *   Use a `try-catch` block to handle `PrismaClientKnownRequestError` specifically for code `P2002` (unique constraint violation).
3.  **Data Access (Prisma Models and Query Methods)**:
    *   Inject `PrismaService` into `ExerciseService`.
    *   Call `this.prisma.exercise.create({ data: { name: dto.name, type: dto.type, createdById: userId } })`.
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**:
    *   If a `PrismaClientKnownRequestError` with code `P2002` (unique constraint violation) occurs (meaning the user already has a custom exercise with that name), throw a `ConflictException` (HTTP 409) with a user-friendly message.
    *   Other Prisma errors should ideally be caught by a global exception filter (SYS-INFRA-ERROR-01) and translated to a `500 Internal Server Error`.
5.  **Logging and Metrics (Structured fields, event name, duration)**:
    *   Log the successful creation of an exercise, including the generated `exerciseId` and `userId`.
    *   Log any errors caught in the service layer, providing context (e.g., `userId`, attempted `exerciseName`, error details).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | DTO | Reads `name` and `type` for the new exercise. |
| Read | `userId` | Reads the ID of the user creating the exercise. |
| Write | `Exercise` Table | Inserts a new `Exercise` record. |
| Audit | Log Event | Records the outcome of the database operation. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant BE_CTRL as "ExercisesController"
participant BE_SVC as "ExerciseService"
participant DB_PRISMA as "Prisma ORM"
participant DB_POSTGRES as "PostgreSQL DB"
participant ERROR_FILTER as "HttpExceptionFilter"

BE_CTRL->>BE_SVC: createCustom(userId, dto)
activate BE_SVC
BE_SVC->>DB_PRISMA: create Exercise(data)
activate DB_PRISMA
DB_PRISMA->>DB_POSTGRES: INSERT INTO "Exercise" (...)
activate DB_POSTGRES
alt Unique constraint violation
DB_POSTGRES--xDB_PRISMA: Error (P2002)
deactivate DB_POSTGRES
DB_PRISMA--xBE_SVC: Throws PrismaClientKnownRequestError
deactivate DB_PRISMA
BE_SVC->>BE_SVC: Catches P2002 error
BE_SVC->>ERROR_FILTER: Throws ConflictException
activate ERROR_FILTER
ERROR_FILTER--xBE_SVC:
deactivate ERROR_FILTER
BE_SVC--xBE_CTRL: 409 Conflict
else Success
DB_POSTGRES-->>DB_PRISMA: New record ID
deactivate DB_POSTGRES
DB_PRISMA-->>BE_SVC: Created Exercise object
deactivate DB_PRISMA
BE_SVC-->>BE_CTRL: Created Exercise object
deactivate BE_SVC
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| Duplicate Exercise Name for User | EXERCISE_NAME_CONFLICT | 409 | An exercise with this name already exists for your custom exercises. |
| Database Connection Error | DB_CONNECTION_FAILED | 500 | Could not connect to the database. Please try again. |
| Other Prisma Error | DB_OPERATION_FAILED | 500 | A database error occurred while creating the exercise. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A (service logic).
*   **Authentication**: N/A (authentication handled by controller guard).
*   **Log Event Naming and Field Standards**: `exercise_creation_db_success`, `exercise_creation_db_conflict`, `exercise_creation_db_error`. Include `userId`, `exerciseName`, and relevant error details.
*   **Metric Naming**: `service_exercise_create_custom_total`, `service_exercise_create_custom_duration_seconds`, `service_exercise_create_custom_conflict_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a valid `userId` and `CreateExerciseDto`
*   ✅ When `ExerciseService.createCustom` is called
*   ✅ Then a new `Exercise` record is successfully created in the database, linked to the `userId`.
*   ✅ Given a `userId` who already has a custom exercise with a specific name
*   ✅ When `ExerciseService.createCustom` is called with the same `userId` and exercise name
*   ✅ Then a `ConflictException` (HTTP 409) is thrown.
*   ✅ Given a valid `userId` and `CreateExerciseDto`
*   ✅ When `ExerciseService.createCustom` is called and a database error occurs (e.g., connection issue)
*   ✅ Then an appropriate `InternalServerErrorException` (HTTP 500) is thrown or handled by the global filter.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Service handles the business logic of creating an exercise and specific data access interactions. |
| Independence | ✅ | The service is independent of the HTTP layer, relying only on DTOs and `PrismaService`. |
| Testability | ✅ | The service can be unit tested by mocking `PrismaService`. |
| Small Subset Testing | ✅ | Testing the `createCustom` method in isolation is feasible. |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.service.ts
apps/backend/src/prisma/schema.prisma
apps/backend/src/prisma/prisma.service.ts
apps/backend/src/common/exceptions/http-exception.filter.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-EXERCISE-02-03

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S3 Add Custom Exercise During Workout

**Source SYS-ID**: SYS-PLAT-EXERCISE-02

**Related UX-ID:** UX-006

**Task Name**: BE: Unit/Integration Tests for Custom Exercise

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-EXERCISE-02-02

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Test cases for valid and invalid `CreateExerciseDto` inputs in controller integration tests.
- Exceptions: Test cases for `400 Bad Request`, `401 Unauthorized`, `409 Conflict`, and `500 Internal Server Error`.
- API/Protocol: Integration tests cover `POST /api/v1/exercises` endpoint behavior.
- Database Changes: Unit tests for service mock Prisma calls; integration tests use a test database or transactional setup.
- UI/Components: Not covered (backend task).
- Interaction Logic: Verify authentication guard, DTO validation, service method call, and error handling.
- Business Boundary Condition: Test that exercise name uniqueness is enforced per user.
- Observability: Verify error logging in service unit tests.
- Performance Considerations: Tests should run quickly.
- Non-Functional: N/A (testing task).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**: N/A (testing task, verifies feature behavior).
*   **Decision point application**: No specific DECISION-REF applies to this task. Tests will directly verify UX-006 ("Exercise name cannot be empty") via API validation and the unique constraint.
*   **Main Function/Class Design** (including responsibilities):
    *   `ExerciseService` Unit Tests (`exercises.service.spec.ts`): Focus on testing the business logic within `ExerciseService.createCustom` in isolation. Mock `PrismaService` to control database interactions.
    *   `ExercisesController` Integration Tests (`exercises.controller.spec.ts`): Use NestJS `Test` module and `Supertest` to simulate HTTP requests to the `POST /exercises` endpoint. Verify end-to-end behavior including authentication, validation, service delegation, and HTTP responses.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.):
    *   `apps/backend/src/exercises/exercises.service.spec.ts`
    *   `apps/backend/src/exercises/exercises.controller.spec.ts`
*   **Call Chain** (prefix → current task → downstream): N/A (testing task).
*   **Performance/Security/Logging Considerations**:
    *   **Performance**: Unit tests should be fast, running in milliseconds. Integration tests might be slightly slower but should still complete quickly. In-memory databases or transactional test setups can speed up integration tests.
    *   **Security**: Integration tests will explicitly test authentication success and failure scenarios for the `POST /exercises` endpoint.
    *   **Logging**: Test that `LoggerService` methods are called appropriately during success and error paths in unit tests.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**: N/A (testing task).
2.  **Business Logic (Service Methods + Dependent Capability Calls)**:
    *   **Unit Tests (`exercises.service.spec.ts`)**:
        *   Test `createCustom` with valid data: Expect `prisma.exercise.create` to be called with correct arguments and return the new exercise.
        *   Test `createCustom` with duplicate name: Mock `prisma.exercise.create` to throw a `PrismaClientKnownRequestError` with code `P2002`. Expect `ConflictException` to be thrown.
        *   Test `createCustom` with other database errors: Mock `prisma.exercise.create` to throw a generic `Error` or other `PrismaClientKnownRequestError`. Expect a `500` level error or re-throw.
        *   Verify `LoggerService` calls on success and error paths.
3.  **Data Access (Prisma Models and Query Methods)**: N/A (testing task).
4.  **Error and Exception Handling (including HTTP Status Codes and Error Codes)**:
    *   **Integration Tests (`exercises.controller.spec.ts`)**:
        *   Test `POST /exercises` with no JWT: Expect `401 Unauthorized`.
        *   Test `POST /exercises` with invalid DTO (e.g., empty name, invalid type): Expect `400 Bad Request` and specific validation error messages.
        *   Test `POST /exercises` with valid DTO: Expect `201 Created` and the created exercise object.
        *   Test `POST /exercises` when the service throws a `ConflictException` (simulating duplicate): Expect `409 Conflict`.
        *   Test `POST /exercises` when the service throws an unexpected error: Expect `500 Internal Server Error`.
5.  **Logging and Metrics (Structured fields, event name, duration)**: N/A (testing task).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Mock/Test Data | Test input payloads and expected outputs. |
| Write | In-memory DB / Test DB | Integration tests may interact with a temporary database. |
| Audit | Test Reports | Records test results, coverage, and failures. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
Note over TASK_SYS_PLAT_EXERCISE_02_03: Testing task, no runtime sequence diagram directly applicable.
Note over TASK_SYS_PLAT_EXERCISE_02_03: The task verifies the sequences of previous tasks.
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| No Auth Token | AUTH_REQUIRED | 401 | (Verified by test) |
| Invalid Request Body | VALIDATION_FAILED | 400 | (Verified by test) |
| Duplicate Exercise Name | EXERCISE_NAME_CONFLICT | 409 | (Verified by test) |
| Unexpected Service Error | INTERNAL_ERROR | 500 | (Verified by test) |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A (testing task).
*   **Authentication**: Integration tests explicitly cover `JwtAuthGuard` behavior.
*   **Log Event Naming and Field Standards**: Unit tests confirm proper logging calls (e.g., `logger.error`, `logger.log`).
*   **Metric Naming**: N/A (testing task).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `ExerciseService.createCustom` is called with valid data
*   ✅ When `prisma.exercise.create` is mocked to succeed
*   ✅ Then `createCustom` returns the expected `Exercise` object and `logger.log` is called.
*   ✅ Given `ExerciseService.createCustom` is called with a name that conflicts for the user
*   ✅ When `prisma.exercise.create` is mocked to throw `PrismaClientKnownRequestError` with `P2002`
*   ✅ Then `createCustom` throws a `ConflictException` and `logger.error` is called.
*   ✅ Given a `POST /exercises` request is sent without a valid JWT
*   ✅ When the endpoint is hit
*   ✅ Then the response status is `401 Unauthorized`.
*   ✅ Given a `POST /exercises` request is sent with an empty exercise `name`
*   ✅ When the endpoint is hit with a valid JWT
*   ✅ Then the response status is `400 Bad Request` with a validation error message.
*   ✅ Given a `POST /exercises` request is sent with a valid JWT and unique data
*   ✅ When the endpoint is hit
*   ✅ Then the response status is `201 Created` with the new exercise object.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Unit tests focus on individual methods; integration tests focus on API endpoints. |
| Independence | ✅ | Tests are isolated, mocking dependencies as needed to prevent side effects. |
| Testability | ✅ | The modular design of NestJS services and controllers makes them highly testable. |
| Small Subset Testing | ✅ | Individual methods and API routes are tested separately. |

### 🔹 **Code Location**

```
apps/backend/src/exercises/exercises.service.spec.ts
apps/backend/src/exercises/exercises.controller.spec.ts
```

<!-- impl-batch:TASK-SYS-PLAT-EXERCISE-02-04::SYS-PLAT-EXERCISE-02::UX-006::TASK-SYS-PLAT-WORKOUT-05-01::SYS-PLAT-WORKOUT-05::UX-011::TASK-SYS-PLAT-WORKOUT-05-02::SYS-PLAT-WORKOUT-05::UX-011::TASK-SYS-PLAT-WORKOUT-05-03::SYS-PLAT-WORKOUT-05::UX-011::TASK-SYS-PLAT-WORKOUT-05-04::SYS-PLAT-WORKOUT-05::UX-011 -->

## **Task-ID**: TASK-SYS-PLAT-EXERCISE-02-04

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S3 Add Custom Exercise During Workout

**Source SYS-ID**: SYS-PLAT-EXERCISE-02

**Related UX-ID**: UX-006

**Task Name**: FE: Implement Create Custom Exercise Modal/Logic

**Task Type**: Frontend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-EXERCISE-02-01, TASK-SYS-CORE-EXERCISE-01-04

**DECISION-REF**: N/A

### 🔹 **Coverage**:

- Input Validation: Exercise Name Required, non-empty.
- Exceptions: Backend API `400` for invalid input, `401` for unauthorized, `409` for duplicate name.
- API/Protocol: Frontend Form Submission → `POST /api/v1/exercises`
- Database Changes: Not Covered (handled by backend).
- UI/Components: `src/components/workout/CreateCustomExerciseModal.tsx`, input field for name, radio buttons for type (Strength/Cardio), Submit button.
- Interaction Logic: User opens modal → enters name, selects type → clicks Save → form validation → API call → Success: modal closes, new exercise added to local state/list; Failure: error message displayed in modal.
- Business Boundary Condition: Exercise name must be unique per user or system.
- Observability: Backend logs API calls. Frontend logs user interaction errors.
- Performance Considerations: Frontend validation should be instant. API call should be < 200ms.
- Non-Functional: Internationalization (English), Accessibility Labels.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Frontend form to API request body):**
        ```typescript
        // packages/shared-types/src/exercise.types.ts
        interface CreateExerciseDto {
          name: string; // e.g., "My Custom Bicep Curl"
          type: 'STRENGTH' | 'CARDIO'; // e.g., "STRENGTH"
        }
        ```
    *   **Output (API response body):**
        ```typescript
        // packages/shared-types/src/exercise.types.ts
        interface Exercise {
          id: string; // e.g., "clv0d7n6q0000abcde123fg"
          name: string;
          type: 'STRENGTH' | 'CARDIO';
          createdById: string | null; // User ID if custom, null if system predefined
          createdAt: string; // ISO date string
          updatedAt: string; // ISO date string
        }
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `CreateCustomExerciseModal` component: Handles local state for form inputs, client-side validation, and dispatching API calls.
    *   `exercise.service.ts` (frontend): Contains `createCustomExercise` method to interact with the backend API.
*   **Code Location**
    *   Frontend Component: `apps/frontend/src/components/workout/CreateCustomExerciseModal.tsx`
    *   Frontend Service: `apps/frontend/src/services/exercise.service.ts`
    *   Shared Types: `packages/shared-types/src/exercise.types.ts`
*   **Call Chain**
    `User Interaction` → `CreateCustomExerciseModal (FE)` → `ExerciseService (FE)` → `API Controllers (BE)`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Frontend form validation prevents unnecessary API calls.
    *   **Security**: Ensure `AuthService` handles JWT token inclusion in requests. Backend API performs proper authorization (user must be logged in).
    *   **Logging**: Frontend logs errors from API calls (e.g., in a `useToast` hook or similar).

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: The `CreateCustomExerciseModal` component will be rendered conditionally, typically triggered from the `WorkoutEditorScreen` or `ExerciseLibrary` page.
2.  **Triggering Logic**:
    *   A button (e.g., "Add Custom Exercise") click opens the `CreateCustomExerciseModal`.
    *   Input fields for "Exercise Name" (text) and "Type" (radio buttons for STRENGTH/CARDIO).
3.  **Client-Side Validation**:
    *   On submit, check if "Exercise Name" is non-empty. Display inline error message if not.
4.  **Interaction with the Backend**:
    *   If client-side validation passes, construct `CreateExerciseDto` object.
    *   Call `exerciseService.createCustomExercise(dto)`:
        ```typescript
        // apps/frontend/src/services/exercise.service.ts
        import { axiosInstance } from '../lib/axios'; // Or similar API client
        import { CreateExerciseDto, Exercise } from 'shared-types';

        export const exerciseService = {
          async createCustomExercise(dto: CreateExerciseDto): Promise<Exercise> {
            const response = await axiosInstance.post<Exercise>('/exercises', dto);
            return response.data;
          },
          // ... other exercise methods
        };
        ```
5.  **UI Success/Failure Feedback and State Recovery**:
    *   **Success (HTTP 201 Created)**: Close the modal. Emit an event or update a global store to reflect the new exercise in the exercise library list. Show a success toast notification.
    *   **Failure (HTTP 4xx/5xx)**: Display a user-friendly error message within the modal (e.g., "Exercise name already exists" for 409, "Invalid input" for 400, "Failed to create exercise" for 500).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | N/A | No direct read from DB by FE for this task. |
| Write | `Exercise` (via Backend API) | New `Exercise` record created in the database. |
| Cache | Local FE State | The new exercise might be added to an in-memory list or global state management for immediate display. |
| Audit | Backend Log Event | `exercise_create_custom_success` or `exercise_create_custom_failure`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant MODAL as "CreateCustomExerciseModal"
participant ESVC as "exercise.service.ts (FE)"
participant API as "exercises.controller.ts (BE)"
participant SVC as "ExerciseService (BE)"
participant REPO as "Prisma Exercise"
participant DB as "PostgreSQL"

MODAL->>ESVC: createCustomExercise(dto)
activate ESVC
ESVC->>API: POST /exercises
activate API
API->>API: Validate DTO
alt DTO Invalid
API-->>ESVC: 400 Bad Request
else DTO Valid
API->>SVC: createCustom(userId, dto)
activate SVC
SVC->>REPO: create Exercise record
activate REPO
REPO->>DB: INSERT Exercise
activate DB
DB-->>REPO: New Exercise
deactivate DB
REPO-->>SVC: New Exercise
deactivate REPO
SVC-->>API: New Exercise
deactivate SVC
API-->>ESVC: 201 Created Exercise
deactivate API
ESVC-->>MODAL: New Exercise
deactivate ESVC
end
MODAL->>MODAL: Update UI state
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| Empty Name | VALIDATION_FAILED | 400 | Exercise name is required. |
| Duplicate Name | CONFLICT | 409 | An exercise with this name already exists. |
| Unauthorized | UNAUTHORIZED | 401 | Please log in to create custom exercises. |
| Server Error | INTERNAL_ERROR | 500 | Failed to create exercise. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All communication between frontend and backend is over HTTPS/TLS (SYS-INFRA-SEC-01).
*   **Authentication**: JWT token must be included in the `Authorization` header by `axiosInstance` (configured in `auth.service.ts` or `axios.ts`). Backend `AuthGuard` validates the token (SYS-INFRA-AUTH-01).
*   **Log Event Naming**: Backend will log `exercise_create_custom_success` or `exercise_create_custom_failure` with fields like `userId`, `exerciseName`, `exerciseType`, `errorReason`, `durationMs`.
*   **Metric Naming**: Backend will increment `exercise_create_custom_total` on success/failure and record `exercise_create_custom_duration_ms`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given I am logged in and on the workout creation screen
*   ✅ When I click "Add Custom Exercise", fill in "My Awesome Exercise" as name, select "STRENGTH", and click "Save"
*   ✅ Then a new exercise named "My Awesome Exercise" of type "STRENGTH" is created and available in my exercise library, and the modal closes.
*   ✅ Given I am logged in and try to create a custom exercise with an empty name
*   ✅ When I click "Save"
*   ✅ Then an error message "Exercise name is required" is displayed within the modal, and the exercise is not created.
*   ✅ Given I am logged in and have previously created "My Awesome Exercise"
*   ✅ When I try to create another custom exercise with the name "My Awesome Exercise"
*   ✅ Then an error message "An exercise with this name already exists" is displayed, and a duplicate exercise is not created.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Component handles form, service handles API, types define data. |
| Independence | ✅ | Modal can be reused. Backend logic is self-contained. |
| Testability | ✅ | Components can be unit tested in isolation. Backend service logic is testable. |
| Small Subset Testing | ✅ | Can test modal UI/validation, service call, backend endpoint in isolation. |

### 🔹 **Code Location**

```
apps/frontend/src/components/workout/CreateCustomExerciseModal.tsx
apps/frontend/src/services/exercise.service.ts
apps/backend/src/exercises/exercises.controller.ts
apps/backend/src/exercises/exercises.service.ts
packages/shared-types/src/exercise.types.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-WORKOUT-05-01

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S8 Edit Past Workout Session

**Source SYS-ID**: SYS-PLAT-WORKOUT-05

**Related UX-ID**: UX-011

**Task Name**: BE: Implement PUT /workouts/{id} (Edit) API

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: SYS-CORE-WORKOUT-04

**DECISION-REF**: N/A

### 🔹 **Coverage**:

- Input Validation: Workout ID (path param), `startTime` (optional, date-time format), `endTime` (optional, date-time format), potential updates to `LoggedExercise`, `StrengthSet`, `CardioEntry` (handled within DTOs for nested updates). UX-011: All parameters must be re-validated.
- Exceptions: `400` Bad Request (invalid input), `401` Unauthorized (missing/invalid JWT), `403` Forbidden (user does not own workout), `404` Not Found (workout ID invalid).
- API/Protocol: `PUT /api/v1/workouts/:id`
- Database Changes: Updates `WorkoutSession` and potentially related `LoggedExercise`, `StrengthSet`, `CardioEntry` records.
- UI/Components: Not Covered (backend task).
- Interaction Logic: Not Covered (backend task).
- Business Boundary Condition: Only the owner of a workout can edit it. `startTime` must be before `endTime` if both are provided.
- Observability: Log request details, errors, and success.
- Performance Considerations: Database updates should be transactional to ensure data consistency. Response time < 200ms.
- Non-Functional: Security (authorization), logging.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (API path params):**
        ```typescript
        // @Param('id') id: string; // e.g., "clv0d7n6q0000abcde123fg"
        ```
    *   **Input (API request body):**
        ```typescript
        // apps/backend/src/workouts/dto/update-workout.dto.ts
        import { Type } from 'class-transformer';
        import { IsOptional, IsISO8601, ValidateNested, IsString, IsNotEmpty, IsEnum, IsInt, IsNumber, Min } from 'class-validator';
        import { ExerciseType } from '@prisma/client'; // From Prisma generated client

        class UpdateStrengthSetDto {
          @IsString() @IsNotEmpty() @IsOptional()
          id?: string; // Optional for new sets, required for existing
          @IsInt() @Min(1)
          setNumber: number;
          @IsInt() @Min(0)
          reps: number;
          @IsNumber() @Min(0)
          weight: number;
        }

        class UpdateCardioEntryDto {
          @IsString() @IsNotEmpty() @IsOptional()
          id?: string; // Required for existing
          @IsInt() @Min(0) @IsOptional()
          durationSeconds?: number;
          @IsNumber() @Min(0) @IsOptional()
          distanceMeters?: number;
        }

        class UpdateLoggedExerciseDto {
          @IsString() @IsNotEmpty() @IsOptional()
          id?: string; // Optional for new logged exercises, required for existing
          @IsString() @IsNotEmpty()
          exerciseId: string; // ID of the Exercise model
          @IsString() @IsOptional()
          notes?: string;

          @IsEnum(ExerciseType)
          type: ExerciseType; // Helps differentiate strength/cardio for logging

          @IsOptional() @ValidateNested({ each: true }) @Type(() => UpdateStrengthSetDto)
          strengthSets?: UpdateStrengthSetDto[];

          @IsOptional() @ValidateNested() @Type(() => UpdateCardioEntryDto)
          cardioEntry?: UpdateCardioEntryDto; // Only one cardio entry per logged exercise
        }

        export class UpdateWorkoutDto {
          @IsOptional() @IsISO8601()
          startTime?: string; // ISO 8601 date string
          @IsOptional() @IsISO8601()
          endTime?: string; // ISO 8601 date string

          @IsOptional() @ValidateNested({ each: true }) @Type(() => UpdateLoggedExerciseDto)
          loggedExercises?: UpdateLoggedExerciseDto[];
        }
        ```
    *   **Output (API response body):**
        ```typescript
        // packages/shared-types/src/workout.types.ts
        // A full WorkoutSession object including updated nested data.
        interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string;
          endTime: string | null;
          createdAt: string;
          updatedAt: string;
          loggedExercises?: LoggedExercise[]; // Including nested structure
        }

        interface LoggedExercise {
          id: string;
          sessionId: string;
          exerciseId: string;
          notes: string | null;
          strengthSets?: StrengthSet[];
          cardioEntry?: CardioEntry | null;
        }

        interface StrengthSet {
          id: string;
          loggedExerciseId: string;
          setNumber: number;
          reps: number;
          weight: number;
          createdAt: string;
        }

        interface CardioEntry {
          id: string;
          loggedExerciseId: string;
          durationSeconds: number | null;
          distanceMeters: number | null;
          createdAt: string;
        }
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `WorkoutsController`: Handles incoming PUT request, validates path parameters, and delegates to `WorkoutService`.
    *   `WorkoutsGuard`: Ensures the authenticated user is the owner of the workout being updated.
    *   `UpdateWorkoutDto`: DTO for validation and type safety.
*   **Code Location**
    *   Controller: `apps/backend/src/workouts/workouts.controller.ts`
    *   DTOs: `apps/backend/src/workouts/dto/update-workout.dto.ts`
    *   Guards: `apps/backend/src/workouts/guards/workout-owner.guard.ts` (custom guard)
*   **Call Chain**
    `API Gateway` → `WorkoutsController (BE)` → `WorkoutsGuard (BE)` → `WorkoutService (BE)` → `Prisma ORM`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use Prisma's transactional capabilities (`$transaction`) for complex nested updates to ensure atomicity and potentially optimize multiple database operations. Database indexes (`@@index([userId, startTime])` on `WorkoutSession`) aid lookup performance.
    *   **Security**: Implement `WorkoutsGuard` to prevent users from modifying other users' workout sessions. Input validation (`class-validator`) prevents common injection attacks and ensures data integrity.
    *   **Logging**: Log successful updates (`workout_edit_success`) with workout ID and user ID. Log failures (`workout_edit_failure`) with error details and original request body.

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**:
    *   `WorkoutsController` receives `PUT /workouts/:id`.
    *   The `AuthGuard` (SYS-INFRA-AUTH-01) verifies the JWT token.
    *   A custom `WorkoutOwnerGuard` (or similar logic within the controller/service) will extract `userId` from the JWT payload and compare it against the `userId` of the workout identified by `id`. If they don't match, throw `ForbiddenException`.
    *   `@Param('id')` captures the workout ID.
    *   `@Body()` captures the `UpdateWorkoutDto`.
    *   `ValidationPipe` applies `class-validator` rules to the DTO.
2.  **Business Logic (Service Methods + Dependent Capability Calls)**:
    *   Call `WorkoutService.editSession(userId, workoutId, updateWorkoutDto)`.
    *   Inside `editSession`, retrieve the existing `WorkoutSession` to ensure it exists and belongs to the `userId`.
    *   Apply updates from `updateWorkoutDto` to the `WorkoutSession` fields (`startTime`, `endTime`).
    *   Handle nested `loggedExercises` updates:
        *   For each `loggedExercise` in DTO:
            *   If `loggedExercise.id` exists, update the existing `LoggedExercise` and its nested `StrengthSet`s or `CardioEntry`. This involves identifying existing sets/entries and either updating them or deleting/recreating based on the DTO.
            *   If `loggedExercise.id` is missing, create a new `LoggedExercise` along with its nested sets/entries.
            *   Ensure `exerciseId` refers to a valid `Exercise` record.
            *   Perform validation on all nested data (reps, weight, duration, distance must be non-negative).
    *   Ensure `startTime` is always before `endTime` if both are present in the update.
    *   Use Prisma transactions for atomicity of complex updates.
3.  **Data Access (Prisma Models and Query Methods)**:
    *   `prisma.workoutSession.update()` for the main session data.
    *   `prisma.loggedExercise.upsert()` or `create()` / `update()` / `deleteMany()` for logged exercises.
    *   `prisma.strengthSet.upsert()` or `createMany()` / `updateMany()` / `deleteMany()` for strength sets.
    *   `prisma.cardioEntry.upsert()` or `create()` / `update()` / `delete()` for cardio entries.
4.  **Error and Exception Handling**:
    *   `NotFoundException` if `workoutId` does not exist.
    *   `ForbiddenException` if `userId` does not match workout owner.
    *   `BadRequestException` for DTO validation failures (e.g., `startTime` after `endTime`, invalid numeric inputs, empty exercise ID).
    *   `InternalServerErrorException` for unexpected database errors.
5.  **Logging and Metrics**:
    *   Log `workout_edit_session_success` on successful update.
    *   Log `workout_edit_session_failure` with error details.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | `WorkoutSession` | Fetch existing workout to verify ownership and current state. |
| Write | `WorkoutSession` | Update `startTime`, `endTime`. |
| Write | `LoggedExercise` | Create, update, or delete `LoggedExercise` records. |
| Write | `StrengthSet` | Create, update, or delete `StrengthSet` records. |
| Write | `CardioEntry` | Create, update, or delete `CardioEntry` records. |
| Cache | N/A | No direct cache for this task. |
| Audit | Backend Log Event | Detailed logs of update operations. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant CLIENT as "Frontend Client"
participant W_CONTROLLER as "workouts.controller.ts"
participant AUTH_GUARD as "AuthGuard"
participant OWNER_GUARD as "WorkoutOwnerGuard"
participant W_SERVICE as "WorkoutService"
participant PRISMA as "Prisma ORM"
participant DB as "PostgreSQL"

CLIENT->>W_CONTROLLER: PUT /workouts/{id} (dto)
activate W_CONTROLLER
W_CONTROLLER->>AUTH_GUARD: Validate JWT
activate AUTH_GUARD
AUTH_GUARD-->>W_CONTROLLER: Token Valid (userId)
deactivate AUTH_GUARD
W_CONTROLLER->>OWNER_GUARD: Check Ownership (id, userId)
activate OWNER_GUARD
OWNER_GUARD->>W_SERVICE: findWorkoutById(id)
activate W_SERVICE
W_SERVICE->>PRISMA: findUnique WorkoutSession
activate PRISMA
PRISMA->>DB: SELECT WorkoutSession
activate DB
DB-->>PRISMA: WorkoutSession
deactivate DB
PRISMA-->>W_SERVICE: WorkoutSession
deactivate PRISMA
W_SERVICE-->>OWNER_GUARD: WorkoutSession
deactivate W_SERVICE
alt User is not owner
OWNER_GUARD--xW_CONTROLLER: 403 Forbidden
else User is owner
OWNER_GUARD-->>W_CONTROLLER: Access Granted
deactivate OWNER_GUARD
W_CONTROLLER->>W_SERVICE: editSession(userId, id, dto)
activate W_SERVICE
W_SERVICE->>W_SERVICE: Validate DTO, business logic
W_SERVICE->>PRISMA: $transaction
activate PRISMA
PRISMA->>DB: UPDATE WorkoutSession,
PRISMA->>DB: UPSERT/DELETE LoggedExercise,
PRISMA->>DB: UPSERT/DELETE StrengthSet/CardioEntry
activate DB
DB-->>PRISMA: Updated Records
deactivate DB
PRISMA-->>W_SERVICE: Updated WorkoutSession
deactivate PRISMA
W_SERVICE-->>W_CONTROLLER: Updated WorkoutSession
deactivate W_SERVICE
W_CONTROLLER-->>CLIENT: 200 OK (Updated Workout)
deactivate W_CONTROLLER
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------------------------------ | :-------------- | :---------- | :---------- |
| Invalid Workout ID              | NOT_FOUND       | 404         | Workout not found. |
| User Not Owner                  | FORBIDDEN       | 403         | You are not authorized to edit this workout. |
| Invalid Input (e.g., negative reps, endTime before startTime) | BAD_REQUEST     | 400         | Invalid input provided. Please check your entries. |
| Unauthorized (missing JWT)      | UNAUTHORIZED    | 401         | Please log in to edit workouts. |
| Internal Server Error           | INTERNAL_ERROR  | 500         | Failed to update workout. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: HTTPS/TLS must be enforced (SYS-INFRA-SEC-01).
*   **Authentication**: JWT-based authentication (SYS-INFRA-AUTH-01) is required via `AuthGuard`.
*   **Authorization**: A custom `WorkoutOwnerGuard` (or similar) ensures that a user can only modify their own workout sessions, preventing horizontal privilege escalation.
*   **Log Event Naming**: `workout_edit_session_success` for successful operations; `workout_edit_session_failure` for errors, including `userId`, `workoutId`, `errorDetails`, `requestBodySnippet`.
*   **Metric Naming**: `workout_edit_session_total` (counter for total edit attempts), `workout_edit_session_duration_ms` (histogram for response times).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given I am logged in and have a workout session with ID `WID1` that I own.
*   ✅ When I send a `PUT /workouts/WID1` request with `startTime: "2023-01-01T10:00:00Z"`
*   ✅ Then the workout session `WID1`'s start time is updated, and I receive a `200 OK` response with the updated workout data.
*   ✅ Given I am logged in as `UserA` and try to `PUT /workouts/WID_OF_USERB`
*   ✅ When the request is processed
*   ✅ Then I receive a `403 Forbidden` response.
*   ✅ Given I am logged in and have workout `WID1` with a `LoggedExercise` having `id=LEID1` and a `StrengthSet` with `id=SSID1` (reps: 10, weight: 100).
*   ✅ When I send a `PUT /workouts/WID1` request with `loggedExercises: [{ id: "LEID1", exerciseId: "EXID_SQUAT", strengthSets: [{ id: "SSID1", setNumber: 1, reps: 12, weight: 105 }] }]`
*   ✅ Then `StrengthSet SSID1` is updated to reps: 12 and weight: 105, and I receive a `200 OK`.
*   ✅ Given I am logged in and try to update workout `WID1` with `startTime: "2023-01-01T10:00:00Z", endTime: "2023-01-01T09:00:00Z"`
*   ✅ When the request is processed
*   ✅ Then I receive a `400 Bad Request` due to invalid time order.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Controller handles request, guard handles auth, service handles business logic and orchestration. |
| Independence | ✅ | The PUT endpoint for workouts is a self-contained operation. |
| Testability | ✅ | Controller, guard, and service logic can be unit and integration tested. |
| Small Subset Testing | ✅ | Can test DTO validation, guard logic, service update methods (with mock Prisma). |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/workouts/dto/update-workout.dto.ts
apps/backend/src/workouts/guards/workout-owner.guard.ts
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-WORKOUT-05-02

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S8 Edit Past Workout Session

**Source SYS-ID**: SYS-PLAT-WORKOUT-05

**Related UX-ID**: UX-011

**Task Name**: BE: Implement WorkoutService.editSession

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-WORKOUT-05-01

**DECISION-REF**: N/A

### 🔹 **Coverage**:

- Core Business Logic: Orchestrates updates to `WorkoutSession`, `LoggedExercise`, `StrengthSet`, and `CardioEntry` entities based on the provided DTO.
- Data Validation: Enforces business rules (e.g., `startTime` before `endTime`, non-negative numeric values for sets/cardio). Ensures workout ownership.
- Database Interaction: Utilizes Prisma to perform complex, transactional database operations.
- Error Handling: Throws specific exceptions for business rule violations (e.g., `NotFoundException`, `ForbiddenException`, `BadRequestException`).
- Transactions: Ensures atomicity of multiple database modifications.
- UI/Components: Not Covered (backend task).
- Interaction Logic: Not Covered (backend task).
- Observability: Logs detailed information about successful and failed update attempts.
- Performance Considerations: Efficient database queries and updates, transactional integrity.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Service method parameters):**
        ```typescript
        // From workouts.service.ts method signature
        editSession(userId: string, workoutId: string, updateWorkoutDto: UpdateWorkoutDto): Promise<WorkoutSession>
        ```
        `updateWorkoutDto` is the same as defined in `TASK-SYS-PLAT-WORKOUT-05-01`.
    *   **Output (Service method return):**
        ```typescript
        // Full WorkoutSession object including updated nested data.
        // Similar to the API response body in TASK-SYS-PLAT-WORKOUT-05-01.
        interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string;
          endTime: string | null;
          createdAt: string;
          updatedAt: string;
          loggedExercises?: LoggedExercise[]; // Including nested structure
        }
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `WorkoutService`: Centralizes all workout-related business logic. The `editSession` method will contain the primary logic for updating a workout. It will interact directly with `PrismaClient`.
*   **Code Location**
    *   Service: `apps/backend/src/workouts/workouts.service.ts`
    *   Prisma Client: `apps/backend/src/prisma/prisma.service.ts` (often just `PrismaClient` injected directly)
*   **Call Chain**
    `WorkoutsController (BE)` → `WorkoutService.editSession (BE)` → `Prisma ORM`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Crucial to use Prisma's `$transaction` API (`prisma.$transaction(async (tx) => { ... })`) to group all updates (WorkoutSession, LoggedExercise, StrengthSet, CardioEntry) into a single atomic operation. This ensures data consistency and can improve performance by reducing round trips to the database. Efficient queries (e.g., `include` for nested data) will minimize database load.
    *   **Security**: The service must perform the final check for workout ownership, even if a guard is present, as a defense-in-depth measure. Validate all incoming data thoroughly.
    *   **Logging**: `LoggerService` should be injected and used to log significant events (e.g., `info` for successful edits, `warn` for invalid data, `error` for system failures).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**:
    *   The `editSession` method is called by the `WorkoutsController` with `userId`, `workoutId`, and `updateWorkoutDto`.
2.  **Business Logic**:
    *   **1. Find Existing Workout & Ownership Check**:
        *   Query `prisma.workoutSession.findUnique()` for the given `workoutId` including `loggedExercises` and their nested `strengthSets`/`cardioEntry`.
        *   If not found, throw `NotFoundException`.
        *   If `foundWorkout.userId !== userId`, throw `ForbiddenException`.
    *   **2. Validate & Update Base WorkoutSession**:
        *   If `updateWorkoutDto.startTime` or `updateWorkoutDto.endTime` are provided, validate their format and ensure `startTime` is not after `endTime`. Throw `BadRequestException` if invalid.
        *   Prepare the update object for `WorkoutSession`.
    *   **3. Process LoggedExercises (within a transaction)**:
        *   Begin a Prisma transaction (`prisma.$transaction`).
        *   Iterate through `updateWorkoutDto.loggedExercises` (if provided):
            *   **Create New LoggedExercise**: If `loggedExercise.id` is missing, create a new `LoggedExercise` record for the `workoutId`. Validate `exerciseId` refers to an existing exercise.
            *   **Update Existing LoggedExercise**: If `loggedExercise.id` exists:
                *   Update `LoggedExercise` notes or `exerciseId` if provided.
                *   Handle nested `StrengthSet`s:
                    *   For each `strengthSet` in DTO: if `strengthSet.id` is missing, create; if present, update. Validate `reps`, `weight`, `setNumber` are valid.
                    *   Identify and delete any `StrengthSet`s that exist in the database for this `LoggedExercise` but are *not* present in the `updateWorkoutDto`.
                *   Handle nested `CardioEntry`:
                    *   If `cardioEntry` exists in DTO: if `cardioEntry.id` is missing, create; if present, update. Validate `durationSeconds`, `distanceMeters`.
                    *   If `cardioEntry` is null/undefined in DTO but exists in DB, delete it.
        *   **4. Delete Removed LoggedExercises**: Identify any `LoggedExercise` records that exist in the database for this `WorkoutSession` but are *not* present in the `updateWorkoutDto.loggedExercises` list (if `loggedExercises` array is provided in DTO). Perform a cascade delete for these.
    *   **5. Execute Updates**:
        *   Commit all changes within the transaction.
        *   Return the fully updated `WorkoutSession` object, including all nested data.
3.  **Data Access (Prisma Models and Query Methods)**:
    *   `prisma.workoutSession.findUnique()`
    *   `prisma.workoutSession.update()`
    *   `prisma.loggedExercise.create()`, `update()`, `deleteMany()`
    *   `prisma.strengthSet.createMany()`, `updateMany()`, `deleteMany()`
    *   `prisma.cardioEntry.create()`, `update()`, `delete()`
    *   Use `include` clauses to fetch and return related data for the response.
4.  **Error and Exception Handling**:
    *   `NotFoundException`
    *   `ForbiddenException`
    *   `BadRequestException`
    *   `InternalServerErrorException` (for unexpected errors during Prisma operations).
5.  **Logging and Metrics**:
    *   `this.logger.log('info', 'workout_edit_session_success', { userId, workoutId, ... })` on success.
    *   `this.logger.log('error', 'workout_edit_session_failure', { userId, workoutId, error: e.message, ... })` on failure.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | `WorkoutSession` | Initial fetch to ensure existence and ownership. |
| Write | `WorkoutSession` | Update basic workout session properties. |
| Read/Write | `LoggedExercise` | Fetch existing, create new, update, or delete. |
| Read/Write | `StrengthSet` | Fetch existing, create new, update, or delete. |
| Read/Write | `CardioEntry` | Fetch existing, create new, update, or delete. |
| Cache | N/A | No direct cache for this task. |
| Audit | Backend Log Event | Detailed logs of service method execution, including input and outcome. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant W_CONTROLLER as "workouts.controller.ts"
participant W_SERVICE as "WorkoutService"
participant PRISMA as "PrismaClient"
participant DB as "PostgreSQL"

W_CONTROLLER->>W_SERVICE: editSession(userId, id, dto)
activate W_SERVICE
W_SERVICE->>PRISMA: findUnique WorkoutSession (id, include:nested)
activate PRISMA
PRISMA->>DB: SELECT WorkoutSession AND related
activate DB
DB-->>PRISMA: Existing WorkoutSession
deactivate DB
PRISMA-->>W_SERVICE: Existing WorkoutSession
deactivate PRISMA
alt Workout not found OR User not owner
W_SERVICE--xW_CONTROLLER: NotFound/ForbiddenException
else Workout found and owned by user
W_SERVICE->>W_SERVICE: Validate DTO/business rules
alt DTO validation fails
W_SERVICE--xW_CONTROLLER: BadRequestException
else DTO validation passes
W_SERVICE->>PRISMA: $transaction
activate PRISMA
PRISMA->>DB: UPDATE WorkoutSession (base)
PRISMA->>DB: UPSERT/DELETE LoggedExercises and children (iterative)
activate DB
DB-->>PRISMA: Updated records
deactivate DB
PRISMA-->>W_SERVICE: Updated WorkoutSession
deactivate PRISMA
W_SERVICE-->>W_CONTROLLER: Updated WorkoutSession
deactivate W_SERVICE
end
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt (via Controller) |
| :------------------------------- | :-------------- | :---------- | :------------------------------------------- |
| Workout Not Found                | NOT_FOUND       | 404         | Workout not found.                           |
| User Not Authorized to Edit      | FORBIDDEN       | 403         | You are not authorized to edit this workout. |
| Invalid Start/End Time Order     | BAD_REQUEST     | 400         | Start time cannot be after end time.         |
| Invalid Numeric Input (reps, weight, duration, distance) | BAD_REQUEST     | 400         | Invalid numeric input for exercise data.     |
| Exercise Not Found (for logged exercise) | BAD_REQUEST     | 400         | Referenced exercise does not exist.          |
| Database Transaction Failure     | INTERNAL_ERROR  | 500         | Failed to update workout due to system error. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Inherits from the controller; HTTPS.
*   **Authentication**: Assumed handled by controller's `AuthGuard`.
*   **Authorization**: Explicit check for `workout.userId === userId` within `editSession` as a security hardening measure.
*   **Log Event Naming**: `workout_edit_session_service_success`, `workout_edit_session_service_failure`. Log `workoutId`, `userId`, `dto_summary`, and full error stack.
*   **Metric Naming**: Service layer metrics for `workout_edit_session_duration_ms` to track business logic execution time.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `WorkoutService.editSession` is called with a valid `userId`, `workoutId`, and `UpdateWorkoutDto` where `startTime` is updated.
*   ✅ When the method executes
*   ✅ Then the `WorkoutSession` in the database is updated with the new `startTime`, and the method returns the updated workout object.
*   ✅ Given `WorkoutService.editSession` is called with a `workoutId` that does not exist.
*   ✅ When the method executes
*   ✅ Then a `NotFoundException` is thrown.
*   ✅ Given `WorkoutService.editSession` is called with a `userId` that does not own the `workoutId`.
*   ✅ When the method executes
*   ✅ Then a `ForbiddenException` is thrown.
*   ✅ Given `WorkoutService.editSession` is called to add a new `LoggedExercise` to an existing workout.
*   ✅ When the method executes
*   ✅ Then a new `LoggedExercise` and its associated `StrengthSet`s/`CardioEntry` are created and linked to the `WorkoutSession`.
*   ✅ Given `WorkoutService.editSession` is called to remove an existing `LoggedExercise` from a workout.
*   ✅ When the method executes
*   ✅ Then the `LoggedExercise` and all its children (`StrengthSet`s, `CardioEntry`) are cascade-deleted from the database.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Focuses on workout editing business logic and database orchestration. |
| Independence | ✅ | `editSession` method can be called independently by any controller or internal process. |
| Testability | ✅ | Easily testable by mocking `PrismaClient` and injecting `LoggerService`. |
| Small Subset Testing | ✅ | Individual scenarios (update base fields, add/update/delete logged exercises/sets) can be tested. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/prisma/prisma.service.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-WORKOUT-05-03

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S8 Edit Past Workout Session

**Source SYS-ID**: SYS-PLAT-WORKOUT-05

**Related UX-ID**: UX-011

**Task Name**: BE: Unit/Integration Tests for Edit Workout

**Task Type**: Backend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-WORKOUT-05-02

**DECISION-REF**: N/A

### 🔹 **Coverage**:

- Unit Tests: Verify `WorkoutService.editSession` behavior in isolation, mocking `PrismaClient` to ensure business logic correctness and proper error handling.
- Integration Tests: Verify `WorkoutsController`'s `PUT /workouts/:id` endpoint, including DTO validation, `AuthGuard`, `WorkoutOwnerGuard`, and `WorkoutService` interaction with a test database (or a highly integrated mock).
- Edge Cases: Test invalid workout ID, unauthorized access, invalid input data (e.g., negative reps, non-existent exercise ID), concurrent updates.
- Success Paths: Test successful updates of base workout details, adding new logged exercises/sets, updating existing, and deleting existing.
- Exception Handling: Verify correct exceptions are thrown and mapped to appropriate HTTP status codes.
- Database Changes: Not Covered (testing the logic, not implementing DB changes).
- UI/Components: Not Covered.
- Interaction Logic: Not Covered.
- Observability: Ensure test setup can verify logs and metrics are generated (e.g., by spying on logger/metrics services).
- Performance Considerations: Tests should be fast. Unit tests should run in milliseconds; integration tests in seconds.
- Non-Functional: Security (authorization checks), error handling.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Test Input**: Mock data for `WorkoutSession`, `LoggedExercise`, `StrengthSet`, `CardioEntry`, and `UpdateWorkoutDto`.
    *   **Expected Output**: Assertions on returned `WorkoutSession` objects, thrown exceptions, HTTP status codes.
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   Jest test files (`.spec.ts`):
        *   `workouts.service.spec.ts`: Unit tests for `WorkoutService.editSession`.
        *   `workouts.controller.int-spec.ts`: Integration tests for `WorkoutsController`.
*   **Code Location**
    *   Service Unit Tests: `apps/backend/src/workouts/workouts.service.spec.ts`
    *   Controller Integration Tests: `apps/backend/src/workouts/workouts.controller.int-spec.ts`
*   **Call Chain**
    *   Unit Test: `Test Runner` → `WorkoutService` (with mocked dependencies)
    *   Integration Test: `Test Runner` → `Supertest` (`http client`) → `NestJS App` → `WorkoutsController` → `WorkoutService` → `Test DB`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use `describe.only` and `it.only` for focused debugging. For integration tests, ensure a clean test database state before each test (e.g., `beforeEach`/`afterEach` to clear tables).
    *   **Security**: Explicitly test scenarios where unauthorized users attempt to modify workouts.
    *   **Logging**: Use `jest.spyOn(loggerService, 'log')` to assert that logs are generated correctly.

### 🔹 **Implementation Logic Decomposition**

**Unit Tests (WorkoutsService)**

1.  **Test Setup (`beforeEach`)**:
    *   Initialize `TestingModule` with `WorkoutsService` and mock dependencies (`PrismaClient`, `LoggerService`).
    *   Mock `PrismaClient` methods (e.g., `findUnique`, `update`, `$transaction`, `loggedExercise.updateMany`, etc.) to return predefined test data or throw errors. `jest.fn().mockResolvedValue(...)` or `mockRejectedValue(...)`.
2.  **Test Cases (describe blocks for logical groupings)**:
    *   **Success Scenarios**:
        *   Update only `startTime` and `endTime`.
        *   Add a new `LoggedExercise` with `StrengthSet`s.
        *   Update an existing `LoggedExercise` and its `StrengthSet`s/`CardioEntry`.
        *   Delete `StrengthSet`s from an existing `LoggedExercise`.
        *   Delete an entire `LoggedExercise`.
    *   **Failure Scenarios**:
        *   Workout not found (mock `findUnique` to return `null`).
        *   User not owner (mock `findUnique` to return a workout with different `userId`).
        *   Invalid `startTime`/`endTime` order.
        *   Invalid numeric input for `reps`/`weight`/`duration`/`distance`.
        *   Referencing a non-existent `exerciseId`.
        *   Database transaction failure (mock `$transaction` to throw an error).
3.  **Assertions (`expect`)**:
    *   Verify the return value matches the expected updated workout object.
    *   Verify that `PrismaClient` methods were called with correct parameters.
    *   Verify that correct exceptions (`NotFoundException`, `ForbiddenException`, `BadRequestException`, `InternalServerErrorException`) are thrown.
    *   Verify that `LoggerService` methods are called appropriately.

**Integration Tests (WorkoutsController)**

1.  **Test Setup (`beforeAll`/`beforeEach`)**:
    *   Create a NestJS `TestApp`.
    *   Inject `PrismaService` to interact with a dedicated test database (or a robust in-memory database).
    *   Seed test data (users, exercises, workout sessions).
    *   Generate a valid JWT for a test user.
2.  **Test Cases**:
    *   **Success Scenarios**:
        *   `PUT /workouts/:id` with valid data and correct user JWT returns `200 OK` and the updated workout.
        *   Verify database state after update.
    *   **Failure Scenarios**:
        *   `PUT /workouts/:id` with invalid JWT returns `401 Unauthorized`.
        *   `PUT /workouts/:id` with another user's JWT returns `403 Forbidden`.
        *   `PUT /workouts/:invalidId` returns `404 Not Found`.
        *   `PUT /workouts/:id` with invalid DTO (e.g., negative weight) returns `400 Bad Request`.
3.  **Assertions (`expect`)**:
    *   Verify HTTP status codes (`expect(res.status).toBe(200)`).
    *   Verify response body structure and data.
    *   Query the test database directly to confirm persistent changes.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | Mocked/Test DB | Unit tests: Mocked Prisma. Integration tests: Actual test database reads. |
| Write | Mocked/Test DB | Unit tests: Assert Prisma method calls. Integration tests: Actual test database writes. |
| Cache | N/A | No cache to test for this task. |
| Audit | Mocked Logger | Verify logger methods are called with expected parameters. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST_RUNNER as "Test Runner (Jest)"
participant S_SPEC as "workouts.service.spec.ts"
participant W_SERVICE as "WorkoutService"
participant M_PRISMA as "Mocked PrismaClient"
participant C_INT_SPEC as "workouts.controller.int-spec.ts"
participant SUPERTEST as "Supertest"
participant NEST_APP as "NestJS App"
participant W_CONTROLLER as "WorkoutsController"
participant AUTH_GUARD as "AuthGuard"
participant OWNER_GUARD as "WorkoutOwnerGuard"
participant P_SERVICE as "PrismaService"
participant TEST_DB as "Test Database"

group Unit Tests for Service
    TEST_RUNNER->>S_SPEC: Run test 'should update workout'
    activate S_SPEC
    S_SPEC->>W_SERVICE: editSession(userId, id, dto)
    activate W_SERVICE
    W_SERVICE->>M_PRISMA: findUnique/update/transaction
    activate M_PRISMA
    M_PRISMA-->>W_SERVICE: Mocked data/result
    deactivate M_PRISMA
    W_SERVICE-->>S_SPEC: Updated WorkoutSession
    deactivate W_SERVICE
    S_SPEC->>S_SPEC: Assert result
    deactivate S_SPEC
end

group Integration Tests for Controller
    TEST_RUNNER->>C_INT_SPEC: Run test 'PUT /workouts/{id} authorized'
    activate C_INT_SPEC
    C_INT_SPEC->>SUPERTEST: request.put(/workouts/{id}).setAuth().send(dto)
    activate SUPERTEST
    SUPERTEST->>NEST_APP: HTTP Request
    activate NEST_APP
    NEST_APP->>AUTH_GUARD: Validate JWT
    AUTH_GUARD-->>NEST_APP: Valid
    NEST_APP->>W_CONTROLLER: Handle request
    activate W_CONTROLLER
    W_CONTROLLER->>OWNER_GUARD: Check ownership
    OWNER_GUARD-->>W_CONTROLLER: Authorized
    W_CONTROLLER->>W_SERVICE: editSession(...)
    activate W_SERVICE
    W_SERVICE->>P_SERVICE: CRUD via Prisma
    activate P_SERVICE
    P_SERVICE->>TEST_DB: UPDATE/SELECT
    activate TEST_DB
    TEST_DB-->>P_SERVICE: Data
    deactivate TEST_DB
    P_SERVICE-->>W_SERVICE: Result
    deactivate P_SERVICE
    W_SERVICE-->>W_CONTROLLER: Result
    deactivate W_SERVICE
    W_CONTROLLER-->>NEST_APP: HTTP Response (200 OK)
    deactivate W_CONTROLLER
    NEST_APP-->>SUPERTEST: HTTP Response
    deactivate NEST_APP
    SUPERTEST-->>C_INT_SPEC: Response
    deactivate SUPERTEST
    C_INT_SPEC->>C_INT_SPEC: Assert status and body
    C_INT_SPEC->>P_SERVICE: Query TEST_DB to verify changes
    P_SERVICE->>TEST_DB: SELECT
    activate TEST_DB
    TEST_DB-->>P_SERVICE: Data
    deactivate TEST_DB
    P_SERVICE-->>C_INT_SPEC: Verified data
    deactivate P_INT_SPEC
    deactivate C_INT_SPEC
end
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code (Internal) | HTTP Status (Integration) | Assertion Type |
| :------------------------------ | :-------------------- | :------------------------ | :------------- |
| Workout Not Found               | `NotFoundException`   | 404                       | `expect().toThrow()`, `expect(res.status).toBe(404)` |
| User Not Owner                  | `ForbiddenException`  | 403                       | `expect().toThrow()`, `expect(res.status).toBe(403)` |
| Invalid DTO Input               | `BadRequestException` | 400                       | `expect().toThrow()`, `expect(res.status).toBe(400)` |
| Unauthorized (missing JWT)      | `UnauthorizedException` | 401                       | `expect(res.status).toBe(401)` |
| Database Transaction Failed     | `InternalServerErrorException` | 500                       | `expect().toThrow()`, `expect(res.status).toBe(500)` |

### 🔹 **Security and Observability Hooks**

*   **Security**: Dedicated integration tests for `AuthGuard` and `WorkoutOwnerGuard` to ensure they correctly prevent unauthorized and forbidden access. Test JWT expiry.
*   **Observability**: Unit tests for services spy on `LoggerService` to verify correct logging messages (level, content) are emitted for various success/failure paths. Integration tests could verify external logging if an actual logging framework is integrated (e.g., checking test log files).

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given `WorkoutService.editSession` is called with a valid workout ID owned by the `userId`
*   ✅ When updating only the `endTime`
*   ✅ Then the `PrismaClient.workoutSession.update` method is called correctly, and the updated workout is returned.
*   ✅ Given an API request `PUT /workouts/123` with a valid JWT for `userA` but workout `123` is owned by `userB`
*   ✅ When the request is sent to the `WorkoutsController`
*   ✅ Then the response status is `403 Forbidden`, and the workout in the database remains unchanged.
*   ✅ Given an API request `PUT /workouts/456` with valid JWT for `userC` and valid `UpdateWorkoutDto` including a new `LoggedExercise` and `StrengthSet`
*   ✅ When the request is sent
*   ✅ Then the response status is `200 OK`, and the database contains the new `LoggedExercise` and `StrengthSet` associated with workout `456`.
*   ✅ Given an API request `PUT /workouts/789` with an `UpdateWorkoutDto` containing negative `reps` in a `StrengthSet`
*   ✅ When the request is sent
*   ✅ Then the response status is `400 Bad Request`, and the workout is not modified.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Test files focus on testing specific units/integration points. |
| Independence | ✅ | Unit tests are isolated via mocking. Integration tests use dedicated test environments. |
| Testability | ✅ | All components are designed to be testable. |
| Small Subset Testing | ✅ | Tests are broken down into granular scenarios. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.spec.ts
apps/backend/src/workouts/workouts.controller.int-spec.ts
```

---

## **Task-ID**: TASK-SYS-PLAT-WORKOUT-05-04

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S8 Edit Past Workout Session

**Source SYS-ID**: SYS-PLAT-WORKOUT-05

**Related UX-ID**: UX-011

**Task Name**: FE: Create Workout Editor Screen Component

**Task Type**: Frontend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-CORE-WORKOUT-02-04, TASK-SYS-CORE-WORKOUT-03-04

**DECISION-REF**: N/A

### 🔹 **Coverage**:

- UI/Components: `WorkoutEditorScreen` component, utilizing reusable components for exercise logging (`StrengthSetLogger`, `CardioEntryLogger`) (dependencies).
- Interaction Logic:
    *   Fetch existing workout data by ID upon loading.
    *   Display workout start/end times, and lists of logged exercises.
    *   Enable editing of workout details (time), logged exercise notes, and adding/editing/deleting strength sets and cardio entries.
    *   Form submission to `PUT /api/v1/workouts/{id}`.
- Data Management: Local state for form inputs, global state for managing selected exercises/workout progress.
- Input Validation: Client-side validation for `startTime`, `endTime` (e.g., valid date format, `startTime` before `endTime`), and delegated validation to nested components for exercise data.
- Exceptions: Handle API `4xx` errors (e.g., `404` workout not found, `403` forbidden, `400` validation errors) and `5xx` errors with user-friendly messages.
- API/Protocol: `GET /api/v1/workouts/{id}` to fetch, `PUT /api/v1/workouts/{id}` to save.
- Observability: Frontend error logging for API failures.
- Performance Considerations: Debouncing input changes, optimizing re-renders.
- Non-Functional: Internationalization (English), Accessibility labels, Mobile adaptation.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Component Props / Route Params):**
        ```typescript
        // apps/frontend/src/app/(app)/workouts/[id]/page.tsx
        // From Next.js dynamic route segment
        interface WorkoutEditorPageProps {
          params: { id: string }; // e.g., "clv0d7n6q0000abcde123fg"
        }
        ```
    *   **Input (Data fetched from API):**
        ```typescript
        // packages/shared-types/src/workout.types.ts
        interface WorkoutSession {
          id: string;
          userId: string;
          startTime: string; // ISO date string
          endTime: string | null; // ISO date string
          loggedExercises: LoggedExercise[];
          // ... nested structures for LoggedExercise, StrengthSet, CardioEntry
        }
        ```
    *   **Output (Data sent to API for update):**
        ```typescript
        // packages/shared-types/src/workout.types.ts
        // UpdateWorkoutDto - as defined in TASK-SYS-PLAT-WORKOUT-05-01
        ```
*   **Decision point application**: N/A
*   **Main Function/Class Design**
    *   `WorkoutEditorScreen` (page component): Responsible for fetching initial data, managing the overall state of the workout being edited, and orchestrating the save operation.
    *   `useWorkoutEditor` (custom hook): Encapsulates state management for the workout form, including handling `loggedExercises` array and their nested data. Manages client-side validation and API calls.
    *   Reusable components: `ExerciseCard`, `StrengthSetInput`, `CardioInput` will be used within `WorkoutEditorScreen`.
*   **Code Location**
    *   Page Component: `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`
    *   Custom Hook: `apps/frontend/src/hooks/useWorkoutEditor.ts`
    *   Frontend Service: `apps/frontend/src/services/workout.service.ts`
*   **Call Chain**
    `User Navigation` → `WorkoutEditorScreen (FE)` → `WorkoutService (FE)` → `API Controllers (BE)`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use React's `useState` and `useCallback` effectively to minimize re-renders. Use skeleton loaders or spinners for data fetching. Debounce inputs for complex validations if needed.
    *   **Security**: Ensure all API calls are authenticated with a valid JWT. Display generic error messages for sensitive failures (e.g., "Unauthorized" instead of "You don't own this workout").
    *   **Logging**: Frontend should log non-sensitive errors (e.g., network issues, validation failures) using a client-side logger or error tracking tool.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`. This page will render the main editor interface.
2.  **Initial Data Fetching**:
    *   On component mount, extract `id` from `params`.
    *   Call `workoutService.getWorkoutById(id)` to fetch the current workout data.
    *   Use a loading state while fetching.
    *   Handle `404` (redirect to dashboard/error page) or `403`/`401` (redirect to login/error page).
3.  **State Management**:
    *   Use `useState` or a custom hook (`useWorkoutEditor`) to manage the editable `WorkoutSession` object.
    *   The state will mirror the structure of `UpdateWorkoutDto`, allowing modifications to `startTime`, `endTime`, and the array of `loggedExercises`.
    *   Each `loggedExercise` within the state will hold its own `strengthSets` or `cardioEntry` arrays/objects.
4.  **UI Rendering**:
    *   Display current `startTime` and `endTime` with editable date/time pickers.
    *   Iterate through `loggedExercises` array. For each:
        *   Display `Exercise` name and notes (editable).
        *   If `type` is STRENGTH, render `StrengthSetLogger` component (from `TASK-SYS-CORE-WORKOUT-02-04`) to display/edit sets. Provide options to add new sets, edit existing, or delete sets.
        *   If `type` is CARDIO, render `CardioEntryLogger` component (from `TASK-SYS-CORE-WORKOUT-03-04`) to display/edit cardio entry. Provide options to edit or delete.
        *   Include a button to "Add Exercise" to the workout, which might open a modal for exercise selection and add a new `LoggedExercise` to the local state.
    *   "Save Changes" button.
5.  **Client-Side Validation**:
    *   Validate `startTime` and `endTime` (e.g., `startTime` must be before `endTime`, valid date format).
    *   Delegate specific exercise data validation to the `StrengthSetLogger` and `CardioEntryLogger` components.
    *   Show inline error messages for invalid inputs.
6.  **Interaction with the Backend (Save)**:
    *   On "Save Changes" button click:
        *   Perform client-side validation. If any fail, prevent API call and show errors.
        *   Construct the `UpdateWorkoutDto` from the component's state.
        *   Call `workoutService.updateWorkout(workoutId, updateWorkoutDto)`:
            ```typescript
            // apps/frontend/src/services/workout.service.ts
            import { axiosInstance } from '../lib/axios';
            import { WorkoutSession, UpdateWorkoutDto } from 'shared-types';

            export const workoutService = {
              async getWorkoutById(id: string): Promise<WorkoutSession> {
                const response = await axiosInstance.get<WorkoutSession>(`/workouts/${id}`);
                return response.data;
              },
              async updateWorkout(id: string, dto: UpdateWorkoutDto): Promise<WorkoutSession> {
                const response = await axiosInstance.put<WorkoutSession>(`/workouts/${id}`, dto);
                return response.data;
              },
              // ... other workout methods
            };
            ```
7.  **UI Success/Failure Feedback and State Recovery**:
    *   **Success (HTTP 200 OK)**: Show a success toast/notification. Optionally, redirect back to the workout history page or update displayed data to reflect server state.
    *   **Failure (HTTP 4xx/5xx)**: Display an error toast/notification. For `400` validation errors, attempt to map backend errors to specific fields in the form (if possible) or display a general "Invalid input" message.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | Backend API: `GET /workouts/{id}` | Initial population of workout editor screen. |
| Write | Backend API: `PUT /workouts/{id}` | Submitting changes to the workout session. |
| Cache | Local React State | Holds the current editable workout data. |
| Audit | Frontend Error Log | Logs client-side validation errors and API call failures. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant PAGE as "workouts/[id]/page.tsx"
participant USVCE as "workout.service.ts (FE)"
participant API as "workouts.controller.ts (BE)"
participant SVC as "WorkoutService (BE)"
participant DB as "PostgreSQL"

USER->>PAGE: Navigate to /workouts/{id}
activate PAGE
PAGE->>USVCE: getWorkoutById(id)
activate USVCE
USVCE->>API: GET /workouts/{id}
activate API
API->>SVC: findWorkoutById(id)
activate SVC
SVC->>DB: SELECT WorkoutSession (id)
activate DB
DB-->>SVC: WorkoutSession data
deactivate DB
SVC-->>API: WorkoutSession data
deactivate SVC
API-->>USVCE: 200 OK (WorkoutSession)
deactivate API
USVCE-->>PAGE: WorkoutSession data
deactivate USVCE
PAGE->>PAGE: Render editor with fetched data
USER->>PAGE: Edit data, click Save
PAGE->>PAGE: Client-side validation
alt Client-side validation fails
PAGE-->>USER: Display errors
else Client-side validation passes
PAGE->>USVCE: updateWorkout(id, updateDto)
activate USVCE
USVCE->>API: PUT /workouts/{id} (updateDto)
activate API
API->>SVC: editSession(userId, id, updateDto)
activate SVC
SVC->>DB: Perform transactional update
activate DB
DB-->>SVC: Updated data
deactivate DB
SVC-->>API: Updated WorkoutSession
deactivate SVC
API-->>USVCE: 200 OK (Updated WorkoutSession)
deactivate API
USVCE-->>PAGE: Updated WorkoutSession
deactivate USVCE
PAGE->>PAGE: Update UI, show success
end
deactivate PAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code (from Backend) | HTTP Status | User Prompt |
| :------------------------------ | :------------------------ | :---------- | :---------- |
| Workout Not Found               | NOT_FOUND                 | 404         | Workout not found. |
| User Not Authorized             | FORBIDDEN / UNAUTHORIZED  | 403 / 401   | You are not authorized to view or edit this workout. |
| Invalid Input (FE/BE)           | VALIDATION_FAILED / BAD_REQUEST | 400         | Invalid input provided. Please check your entries. |
| Save Conflict                   | CONFLICT                  | 409         | Could not save. Another change might have occurred. |
| Network Error                   | NETWORK_ERROR             | (Client-side) | Failed to connect to server. Please check your internet. |
| Server Error                    | INTERNAL_ERROR            | 500         | A system error occurred. Please try again later. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All frontend-backend communication is over HTTPS.
*   **Authentication**: Frontend ensures JWT is sent with all authenticated requests. Backend enforces `AuthGuard`.
*   **Authorization**: Frontend gracefully handles `401`/`403` responses by redirecting or showing appropriate messages.
*   **Log Event Naming**: Frontend logs errors from API calls (e.g., `fe_workout_edit_fetch_error`, `fe_workout_edit_save_error`) including component name, error message, and `workoutId`.
*   **Metric Naming**: Can track `fe_workout_editor_load_duration_ms` or `fe_workout_editor_save_attempts_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given I am logged in and navigate to `/workouts/WID1`
*   ✅ When `WID1` is owned by me and exists
*   ✅ Then the `WorkoutEditorScreen` loads, displaying the workout's details, including `startTime`, `endTime`, and all `LoggedExercise`s with their nested `StrengthSet`s or `CardioEntry`.
*   ✅ Given I am on the `WorkoutEditorScreen` for `WID1`
*   ✅ When I change the `startTime` from 10:00 AM to 10:30 AM, add a new `StrengthSet` to an existing `LoggedExercise`, and click "Save Changes"
*   ✅ Then the changes are successfully saved, I receive a success notification, and the updated workout data is displayed.
*   ✅ Given I am on the `WorkoutEditorScreen` for `WID1` and attempt to set `endTime` before `startTime`
*   ✅ When I click "Save Changes"
*   ✅ Then a client-side validation error is shown, and the changes are not sent to the backend.
*   ✅ Given I am logged in and try to navigate to `/workouts/WID_OF_ANOTHER_USER`
*   ✅ When the page attempts to fetch the workout
*   ✅ Then I am redirected to an unauthorized page or shown a `403 Forbidden` message.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | `WorkoutEditorScreen` handles orchestration. Child components manage their specific inputs. Hook manages state. |
| Independence | ✅ | Relies on reusable child components, but is itself a self-contained page. |
| Testability | ✅ | Components can be tested with mocked props/hooks. Page can be tested with E2E framework. |
| Small Subset Testing | ✅ | Can test loading state, rendering existing data, modifying data, submitting form, error handling. |

### 🔹 **Code Location**

```
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
apps/frontend/src/hooks/useWorkoutEditor.ts
apps/frontend/src/services/workout.service.ts
apps/frontend/src/components/workout/StrengthSetLogger.tsx (from dependency)
apps/frontend/src/components/workout/CardioEntryLogger.tsx (from dependency)
packages/shared-types/src/workout.types.ts
```

<!-- impl-batch:TASK-SYS-PLAT-WORKOUT-05-05::SYS-PLAT-WORKOUT-05::UX-011::TASK-SYS-EXT-WORKOUT-06-01::SYS-EXT-WORKOUT-06::UX-009::TASK-SYS-EXT-WORKOUT-06-02::SYS-EXT-WORKOUT-06::UX-009::TASK-SYS-EXT-WORKOUT-07-01::SYS-EXT-WORKOUT-07::UX-012::TASK-SYS-EXT-WORKOUT-07-02::SYS-EXT-WORKOUT-07::UX-012 -->

## **Task-ID**: TASK-SYS-PLAT-WORKOUT-05-05

**Related Epic**: EPIC-002 Workout Tracking

**Related Story**: EPIC-002-S8 Edit Past Workout Session

**Source SYS-ID**: SYS-PLAT-WORKOUT-05

**Related UX-ID:** UX-011

**Related UI-ID:** UI-022

**Task Name**: FE: Implement Edit Workout API Client & State

**Task Type**: Frontend

**Priority/Phase**: T1

**Dependency**: TASK-SYS-PLAT-WORKOUT-05-01, TASK-SYS-PLAT-WORKOUT-05-04

**DECISION-REF**: —

### **Coverage**:

- Input Validation: Client-side validation for updated workout details (e.g., non-empty fields, numeric inputs for reps/weight/distance) matching backend requirements.
- Exceptions: Handle `400 BadRequest` for invalid input, `401 Unauthorized`, `404 NotFound` for non-existent workouts.
- API/Protocol: `PUT /api/v1/workouts/{id}` for updating workout session and its logged exercises.
- Database Changes: Not Covered (handled by backend).
- UI/Components: `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` for displaying and editing workout details, including forms for `WorkoutSession`, `LoggedExercise`, `StrengthSet`, `CardioEntry` properties.
- Interaction Logic: User loads workout details, modifies fields, clicks "Save Changes" -> API call -> Success: navigate back or show success message; Failure: display error.
- Business Boundary Condition: Only the workout owner can edit a session.
- Observability: Log frontend API call success/failure, response times.
- Performance Considerations: Debounce input changes for complex forms, optimize data fetching for initial load.
- Non-Functional: Internationalization (English), Accessibility labels for form fields.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Frontend to Backend - `WorkoutUpdateDto`):**
        ```typescript
        // packages/shared-types/src/workout.types.ts
        interface StrengthSetUpdateDto {
          id?: string; // Optional for new sets
          setNumber: number;
          reps: number;
          weight: number;
        }

        interface CardioEntryUpdateDto {
          id?: string; // Optional for new entries
          durationSeconds?: number | null;
          distanceMeters?: number | null;
        }

        interface LoggedExerciseUpdateDto {
          id?: string; // Optional for new logged exercises
          exerciseId: string;
          notes?: string | null;
          strengthSets?: StrengthSetUpdateDto[];
          cardioEntry?: CardioEntryUpdateDto;
        }

        interface WorkoutUpdateDto {
          startTime?: string; // ISO date string
          endTime?: string | null; // ISO date string
          loggedExercises?: LoggedExerciseUpdateDto[];
        }

        // Example:
        const updatePayload: WorkoutUpdateDto = {
            startTime: "2023-10-27T10:00:00Z",
            loggedExercises: [
                {
                    id: "loggedEx123",
                    exerciseId: "ex456",
                    notes: "Updated notes",
                    strengthSets: [{ setNumber: 1, reps: 10, weight: 100 }],
                }
            ]
        };
        ```
    *   **Output (Backend to Frontend - `WorkoutSessionResponse`):**
        ```typescript
        // packages/shared-types/src/workout.types.ts
        interface WorkoutSessionResponse {
          id: string;
          userId: string;
          startTime: string; // ISO date string
          endTime: string | null; // ISO date string
          loggedExercises: LoggedExerciseResponse[];
          // ... other fields for logged exercises, sets, cardio entries
        }
        ```
*   **Main Function/Class Design**
    *   `WorkoutService` in frontend: Contains `updateWorkout(id: string, dto: WorkoutUpdateDto): Promise<WorkoutSessionResponse>` to encapsulate API calls.
    *   Workout Edit Page Component (`apps/frontend/src/app/(app)/workouts/[id]/page.tsx`): Manages local state for the workout being edited, handles form submissions, and calls the `WorkoutService`.
    *   `useWorkoutEditForm` (custom hook): Manages form state, validation, and handles changes to nested workout data (exercises, sets).
*   **Code Location**
    *   Frontend API Client: `apps/frontend/src/services/workout.service.ts`
    *   Frontend Page: `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`
    *   Shared Types: `packages/shared-types/src/workout.types.ts`
    *   Custom Hook (Optional): `apps/frontend/src/hooks/useWorkoutEditForm.ts`
*   **Call Chain**: `Workout Edit Page` → `workout.service.ts` → `Backend API (PUT /workouts/{id})`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Optimize form rendering for large workouts. Use `React.memo` for sub-components. Debounce API calls for autosave if implemented (not in scope for MVP).
    *   **Security**: Ensure `Bearer` token is sent with requests. Client-side validation should prevent obvious invalid data, but backend validation is the ultimate gate.
    *   **Logging**: Use client-side logging library (e.g., Sentry, Pino browser) to log API request/response and errors.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page Location**: `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`
2.  **Triggering Logic**:
    *   Page loads: Fetches workout data using `workout.service.ts.getWorkout(id)`.
    *   User edits form fields: `onChange` events update local component state or hook state (e.g., `useWorkoutEditForm`).
    *   User clicks "Save Changes" button: Triggers `onSubmit` handler.
3.  **Client-side Validation**: Before sending to backend, validate data locally (e.g., all reps/weight/duration are non-negative, required fields are not empty). Use a validation library like Zod or Yup.
4.  **Interaction with the Backend**:
    *   `workout.service.ts` will use an `axios` instance configured with an `AuthInterceptor` to include the JWT.
    *   `put(`/workouts/${id}`, updatePayload)`
5.  **UI Success/Failure Feedback and State Recovery**:
    *   **Success (200 OK)**: Display a success toast notification (e.g., "Workout updated successfully!") and/or navigate back to the dashboard/workout history. Reset form dirty state.
    *   **Failure (400, 401, 404, 500)**: Display an error toast notification with a user-friendly message based on the error code. Keep form data for user to correct.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `WorkoutSessionResponse` | Initial fetch of workout data for editing. |
| Write | Local Component State | User input updates form fields and temporary state. |
| Write | `WorkoutUpdateDto` | Constructed payload sent to backend on save. |
| Audit | Client-side logs | Record `workout_edit_submit`, `workout_edit_success`, `workout_edit_failure`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant UI as Frontend (UX-011)
participant API_CLIENT as workout.service.ts
participant BACKEND_API as PUT /workouts/{id}
participant WORKOUT_SVC as WorkoutService
participant DB as Prisma (WorkoutSession)

UI->>API_CLIENT: updateWorkout(id, dto)
activate API_CLIENT
API_CLIENT->>BACKEND_API: HTTP PUT /api/v1/workouts/{id}
activate BACKEND_API
BACKEND_API->>WORKOUT_SVC: editSession(userId, id, dto)
activate WORKOUT_SVC
WORKOUT_SVC->>DB: update WorkoutSession/LoggedExercise/Sets/Cardio
activate DB
DB-->>WORKOUT_SVC: Save complete
deactivate DB
WORKOUT_SVC-->>BACKEND_API: Workout updated
deactivate WORKOUT_SVC
BACKEND_API-->>API_CLIENT: 200 OK / 400 Error
deactivate BACKEND_API
API_CLIENT-->>UI: Response data or error
deactivate API_CLIENT
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| Invalid Input | INVALID_INPUT | 400 | Please check the entered workout details. |
| Unauthorized | UNAUTHORIZED | 401 | You are not authorized to edit this workout. |
| Not Found | NOT_FOUND | 404 | The workout session was not found. |
| Server Error | INTERNAL_ERROR | 500 | An unexpected error occurred. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All communication via HTTPS/TLS (SYS-INFRA-SEC-01).
*   **Authentication**: Frontend ensures valid JWT is present and attached to `Authorization` header by `axios` interceptor. Backend `JwtAuthGuard` verifies the token (SYS-INFRA-AUTH-01).
*   **Log Event Naming**: `frontend.workout.edit.attempt`, `frontend.workout.edit.success`, `frontend.workout.edit.failure`.
*   **Metric Naming**: `frontend_workout_edit_requests_total`, `frontend_workout_edit_duration_ms_bucket`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given I am logged in and viewing an existing workout session
*   ✅ When I modify the workout details (e.g., change reps/weight, add notes) and click "Save Changes"
*   ✅ Then the workout session is updated in the database, and I receive a success notification.
*   ✅ Given I attempt to save a workout with invalid data (e.g., negative reps)
*   ✅ When I click "Save Changes"
*   ✅ Then I see a validation error message, and the workout is not updated.
*   ✅ Given I am not logged in or try to edit another user's workout
*   ✅ When I attempt to save changes
*   ✅ Then I receive an unauthorized/forbidden error.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | `workout.service.ts` handles API. Page handles UI state and orchestration. Hook handles form logic. |
| Independence | ✅ | The edit workout logic is contained within its module/page and uses shared services. |
| Testability | ✅ | `workout.service.ts` methods are easily mockable. React components/hooks can be tested with Jest/RTL. |
| Small Subset Testing | ✅ | Unit tests for service methods, integration tests for page behavior. |

### 🔹 **Code Location**

```
apps/frontend/src/services/workout.service.ts
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
apps/frontend/src/hooks/useWorkoutEditForm.ts
packages/shared-types/src/workout.types.ts
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-06-01

**Related Epic**: EPIC-002 Workout Tracking

**Related Story**: EPIC-002-S6 Record Optional Rest Time

**Source SYS-ID**: SYS-EXT-WORKOUT-06

**Related UX-ID:** UX-009

**Related UI-ID:** UI-013

**Task Name**: FE: Create Rest Timer Component

**Task Type**: Frontend

**Priority/Phase**: T2

**Dependency**: SYS-INFRA-SETUP-01

**DECISION-REF**: DECISION-002

### **Coverage**:

- Input Validation: N/A (Component displays state, not user input).
- Exceptions: N/A.
- API/Protocol: N/A.
- Database Changes: Not Covered.
- UI/Components: A `RestTimer` React component that displays a countdown, a "Pause" button, a "Resume" button, and a "Skip" button.
- Interaction Logic: Starts at a fixed duration (60s as per DECISION-002), counts down, allows pausing/resuming, and skipping.
- Business Boundary Condition: Fixed 60-second duration.
- Observability: N/A (purely client-side UI component).
- Performance Considerations: Efficient rendering of countdown, minimal re-renders.
- Non-Functional: Internationalization (English), Accessibility labels for buttons.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Component Props):**
        ```typescript
        interface RestTimerProps {
          timeLeft: number; // Seconds remaining
          isRunning: boolean;
          onStart: () => void;
          onPause: () => void;
          onResume: () => void;
          onSkip: () => void;
          onFinish: () => void; // Callback when timer reaches 0
        }
        ```
    *   **Output**: Renders UI based on `timeLeft` and `isRunning`. No direct output from component.
*   **Decision point application**: Adheres to **DECISION-002** by using a fixed 60-second duration for the timer. User configuration is out of scope.
*   **Main Function/Class Design**
    *   `RestTimer` (React functional component): Renders the time, and buttons for start/pause/resume/skip. It receives `timeLeft`, `isRunning`, and handler functions as props.
*   **Code Location**
    *   Component: `apps/frontend/src/components/workout/RestTimer.tsx`
*   **Call Chain**: Parent component (e.g., WorkoutSession page) -> `RestTimer` component.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use `requestAnimationFrame` for smooth countdown updates if highly critical, otherwise `setInterval` (managed by `useRestTimer` hook) is sufficient for 1-second interval. Avoid unnecessary re-renders in parent components.
    *   **Security**: N/A.
    *   **Logging**: N/A.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: `apps/frontend/src/components/workout/RestTimer.tsx`
2.  **Triggering Logic**:
    *   Component mounts: Displays initial time.
    *   `timeLeft` prop changes: Component re-renders to show updated time.
    *   Button clicks (`Pause`, `Resume`, `Skip`): Call respective handler functions passed via props.
3.  **[Decision hook]**: The component's initial state (timer duration) is fixed at 60 seconds, as per DECISION-002. This is managed by the `useRestTimer` hook which will pass `timeLeft` to this component.
4.  **Interaction with the Backend**: N/A.
5.  **UI Success/Failure Feedback and State Recovery**:
    *   Visual updates of countdown text and button states (e.g., "Pause" button becomes "Resume" when paused).
    *   When `timeLeft` reaches 0, `onFinish` prop is called, and the timer display can indicate "Rest finished".

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | Component Props | `timeLeft`, `isRunning` determine display. |
| Write | UI Render | Updates visual representation of timer. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant PARENT_UI as Workout Page (UI-022)
participant REST_TIMER_COMP as RestTimer.tsx (UI-013)
participant REST_TIMER_HOOK as useRestTimer.ts

PARENT_UI->>REST_TIMER_HOOK: start timer
activate REST_TIMER_HOOK
loop every second
    REST_TIMER_HOOK->>PARENT_UI: Update timeLeft, isRunning
end
REST_TIMER_HOOK-->>PARENT_UI: Timer finished / Skipped
deactivate REST_TIMER_HOOK
PARENT_UI->>REST_TIMER_COMP: render(timeLeft, isRunning, handlers)
activate REST_TIMER_COMP
REST_TIMER_COMP->>REST_TIMER_COMP: Display countdown
REST_TIMER_COMP->>PARENT_UI: onPause / onResume / onSkip triggered
deactivate REST_TIMER_COMP
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| N/A | N/A | N/A | N/A |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A.
*   **Authentication**: N/A.
*   **Log Event Naming**: N/A.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the rest timer is active
*   ✅ When the `RestTimer` component is rendered
*   ✅ Then it displays a countdown from 60 seconds (as per DECISION-002).
*   ✅ Given the rest timer is active
*   ✅ When I click the "Pause" button
*   ✅ Then the countdown pauses, and the button changes to "Resume".
*   ✅ Given the rest timer is paused
*   ✅ When I click the "Resume" button
*   ✅ Then the countdown resumes from where it left off, and the button changes to "Pause".
*   ✅ Given the rest timer is active or paused
*   ✅ When I click the "Skip" button
*   ✅ Then the timer immediately finishes, and the `onSkip` callback is triggered.
*   ✅ Given the rest timer is active
*   ✅ When the countdown reaches 0
*   ✅ Then the timer finishes, and the `onFinish` callback is triggered.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Component is solely responsible for rendering the timer UI based on props. |
| Independence | ✅ | It's a reusable component, not tied to specific page logic. |
| Testability | ✅ | Easily testable by passing different props and simulating events. |
| Small Subset Testing | ✅ | Unit tests can verify rendering logic and button interactions. |

### 🔹 **Code Location**

```
apps/frontend/src/components/workout/RestTimer.tsx
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-06-02

**Related Epic**: EPIC-002 Workout Tracking

**Related Story**: EPIC-002-S6 Record Optional Rest Time

**Source SYS-ID**: SYS-EXT-WORKOUT-06

**Related UX-ID:** UX-009

**Related UI-ID:** UI-013

**Task Name**: FE: Implement Rest Timer State Logic/Hook

**Task Type**: Frontend

**Priority/Phase**: T2

**Dependency**: TASK-SYS-EXT-WORKOUT-06-01

**DECISION-REF**: DECISION-002

### **Coverage**:

- Input Validation: N/A.
- Exceptions: N/A.
- API/Protocol: N/A.
- Database Changes: Not Covered.
- UI/Components: Provides state and control functions for the `RestTimer` component.
- Interaction Logic: Manages the countdown state (start, pause, resume, skip, finish).
- Business Boundary Condition: Fixed 60-second timer duration as per DECISION-002.
- Observability: N/A (purely client-side logic).
- Performance Considerations: Efficient use of `setInterval` or `requestAnimationFrame` to prevent memory leaks and unnecessary re-renders.
- Non-Functional: N/A.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Hook Parameters):**
        ```typescript
        interface UseRestTimerOptions {
          initialDurationSeconds?: number; // Defaults to 60 (DECISION-002)
          onFinish?: () => void;
          onSkip?: () => void;
        }
        ```
    *   **Output (Hook Return Value):**
        ```typescript
        interface RestTimerControl {
          timeLeft: number; // Seconds remaining
          isRunning: boolean;
          isPaused: boolean;
          isFinished: boolean;
          startTimer: () => void;
          pauseTimer: () => void;
          resumeTimer: () => void;
          skipTimer: () => void;
          resetTimer: () => void; // Resets to initialDuration
        }
        ```
*   **Decision point application**: Adheres to **DECISION-002** by setting the `initialDurationSeconds` to a fixed 60 seconds if not provided.
*   **Main Function/Class Design**
    *   `useRestTimer` (React custom hook): Encapsulates the timer logic using `useState` for `timeLeft`, `isRunning`, `isPaused`, `isFinished` and `useEffect` for `setInterval` management.
*   **Code Location**
    *   Custom Hook: `apps/frontend/src/hooks/useRestTimer.ts`
*   **Call Chain**: Workout page/component -> `useRestTimer` hook -> (optionally) `RestTimer` component.
*   **Performance/Security/Logging Considerations**
    *   **Performance**: The `useEffect` hook should correctly clear the `setInterval` on unmount to prevent memory leaks. Use `useCallback` for handler functions to maintain referential stability.
    *   **Security**: N/A.
    *   **Logging**: N/A.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**: `apps/frontend/src/hooks/useRestTimer.ts`
2.  **Triggering Logic**:
    *   Hook initialized: Sets initial `timeLeft` to 60 seconds (DECISION-002) and `isRunning` to false.
    *   `startTimer()`: Sets `isRunning` to true, starts `setInterval`.
    *   `pauseTimer()`: Sets `isPaused` to true, clears `setInterval`.
    *   `resumeTimer()`: Sets `isPaused` to false, restarts `setInterval`.
    *   `skipTimer()`: Sets `timeLeft` to 0, sets `isFinished` to true, clears `setInterval`, calls `onSkip`.
    *   `setInterval` fires: Decrements `timeLeft` by 1. If `timeLeft` reaches 0, clears `setInterval`, sets `isFinished` to true, calls `onFinish`.
3.  **[Decision hook]**: The default `initialDurationSeconds` for the timer is 60 seconds as specified by DECISION-002. This hook directly manages this duration.
4.  **Interaction with the Backend**: N/A.
5.  **UI Success/Failure Feedback and State Recovery**:
    *   The hook provides `timeLeft`, `isRunning`, `isPaused`, `isFinished` to the consuming component (`RestTimer` or workout page), which then updates its UI.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | N/A | Hook receives optional `initialDurationSeconds`. |
| Write | Internal state (`useState`) | `timeLeft`, `isRunning`, `isPaused`, `isFinished` are managed. |
| Audit | N/A | |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant PARENT_UI as Workout Page (UI-022)
participant REST_TIMER_HOOK as useRestTimer.ts
participant REST_TIMER_COMP as RestTimer.tsx (UI-013)

PARENT_UI->>REST_TIMER_HOOK: initialize(onFinish, onSkip)
activate REST_TIMER_HOOK
REST_TIMER_HOOK-->>PARENT_UI: {timeLeft:60, isRunning:false, ...}
PARENT_UI->>REST_TIMER_COMP: render(timeLeft, isRunning, ...)

PARENT_UI->>REST_TIMER_HOOK: startTimer()
REST_TIMER_HOOK->>REST_TIMER_HOOK: Set interval
activate REST_TIMER_HOOK
loop every second
    REST_TIMER_HOOK->>REST_TIMER_HOOK: Decrement timeLeft
    REST_TIMER_HOOK-->>PARENT_UI: Update {timeLeft, isRunning}
    PARENT_UI->>REST_TIMER_COMP: render(updated props)
end
REST_TIMER_HOOK->>REST_TIMER_HOOK: Call onFinish() when timeLeft=0
deactivate REST_TIMER_HOOK

REST_TIMER_COMP->>PARENT_UI: onSkip triggered
PARENT_UI->>REST_TIMER_HOOK: skipTimer()
activate REST_TIMER_HOOK
REST_TIMER_HOOK->>REST_TIMER_HOOK: Set timeLeft=0, call onSkip()
deactivate REST_TIMER_HOOK
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| N/A | N/A | N/A | N/A |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A.
*   **Authentication**: N/A.
*   **Log Event Naming**: N/A.
*   **Metric Naming**: N/A.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given the `useRestTimer` hook is initialized without an explicit duration
*   ✅ When `startTimer()` is called
*   ✅ Then `timeLeft` starts at 60 seconds (DECISION-002) and decrements every second.
*   ✅ Given the timer is running
*   ✅ When `pauseTimer()` is called
*   ✅ Then `isRunning` becomes false, and `timeLeft` stops decrementing.
*   ✅ Given the timer is paused
*   ✅ When `resumeTimer()` is called
*   ✅ Then `isRunning` becomes true, and `timeLeft` resumes decrementing.
*   ✅ Given the timer is running
*   ✅ When `skipTimer()` is called
*   ✅ Then `timeLeft` immediately becomes 0, `isFinished` becomes true, and the `onSkip` callback is invoked.
*   ✅ Given the timer is running
*   ✅ When `timeLeft` reaches 0
*   ✅ Then `isFinished` becomes true, and the `onFinish` callback is invoked.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | The hook is solely responsible for managing the timer's state and logic. |
| Independence | ✅ | Independent of UI specifics, can be used by any component. |
| Testability | ✅ | Easily testable using React Hooks Testing Library or by mocking `setInterval`. |
| Small Subset Testing | ✅ | Unit tests can cover all state transitions and callback invocations. |

### 🔹 **Code Location**

```
apps/frontend/src/hooks/useRestTimer.ts
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-07-01

**Related Epic**: EPIC-002 Workout Tracking

**Related Story**: EPIC-002-S9 Delete Past Workout Session

**Source SYS-ID**: SYS-EXT-WORKOUT-07

**Related UX-ID:** UX-012

**Related UI-ID:** UI-015 (Confirmation Dialog)

**Task Name**: BE: Implement DELETE /workouts/{id} API

**Task Type**: Backend

**Priority/Phase**: T2

**Dependency**: SYS-CORE-WORKOUT-04

**DECISION-REF**: DECISION-005

### **Coverage**:

- Input Validation: Path parameter `id` must be a valid CUID.
- Exceptions: `401 Unauthorized` if not logged in, `403 Forbidden` if user is not the owner of the workout, `404 NotFound` if workout does not exist.
- API/Protocol: `DELETE /api/v1/workouts/{id}`. Returns `204 No Content` on success.
- Database Changes: Not Covered (handled by `WorkoutService.deleteSession` in TASK-SYS-EXT-WORKOUT-07-02).
- UI/Components: Frontend will call this API after user confirmation (UX-012).
- Interaction Logic: Controller receives request, validates ID, extracts user from JWT, calls service layer.
- Business Boundary Condition: Only the authenticated user who created the workout can delete it.
- Observability: Log request and response, including `userId` and `workoutId`.
- Performance Considerations: Low latency operation.
- Non-Functional: HTTPS enforced (SYS-INFRA-SEC-01), JWT authentication (SYS-INFRA-AUTH-01).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Request Parameters):**
        *   `id`: `string` (CUID from path parameter). Example: `DELETE /api/v1/workouts/cln2x8x1k0000qf75q9l1y7t7`
        *   `req.user.id`: `string` (User ID extracted from JWT via `AuthGuard`).
    *   **Output (Response):**
        *   `204 No Content` on successful deletion.
        *   `400 Bad Request` if `id` is malformed.
        *   `401 Unauthorized` if no valid JWT.
        *   `403 Forbidden` if `userId` does not match workout owner.
        *   `404 Not Found` if workout `id` does not exist.
*   **Decision point application**: `DECISION-005` states "soft delete on the User model" for user deletion. However, this task is about deleting a `WorkoutSession`. The Prisma schema for `WorkoutSession` defines `onDelete: Cascade` for `loggedExercises`, implying a *hard delete* of the workout and all its associated data. This decision does not directly apply to `WorkoutSession` deletion, and the implementation will proceed with hard deletion as implied by the schema.
*   **Main Function/Class Design**
    *   `WorkoutsController`: Handles the incoming HTTP `DELETE` request for `/workouts/{id}`. It will use `@Param('id')`, `@Req()`, `@UseGuards(JwtAuthGuard)` and `@HttpCode(HttpStatus.NO_CONTENT)`.
    *   `WorkoutsService`: The controller delegates the deletion logic to `WorkoutService.deleteSession(userId, workoutId)`.
*   **Code Location**
    *   Controller: `apps/backend/src/workouts/workouts.controller.ts`
    *   DTOs (if any for path params): `apps/backend/src/workouts/dto/delete-workout.dto.ts` (minimal, just id).
*   **Call Chain**: `Client (FE)` → `WorkoutsController` → `WorkoutsService`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Should be fast, relying on database indexes for lookup and cascade delete.
    *   **Security**: Crucial to enforce `JwtAuthGuard` and ensure the authenticated `userId` matches the `userId` of the workout being deleted. This prevents unauthorized deletion (SYS-INFRA-AUTH-01).
    *   **Logging**: Log deletion attempts, success, and failures with relevant context (user ID, workout ID). Use `LoggerService` (SYS-INFRA-LOG-01).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller or Route)**
    *   `@Delete(':id')` endpoint in `WorkoutsController`.
    *   Uses `@UseGuards(JwtAuthGuard)` to ensure the user is authenticated.
    *   Extracts `id` from `@Param()` and `userId` from `req.user.id`.
    *   Input validation: Ensure `id` is a valid CUID format. Throw `BadRequestException` if invalid.
2.  **[Decision hook]**: This task implements a hard delete for `WorkoutSession` as per the `onDelete: Cascade` in the Prisma schema, and not a soft delete, because `DECISION-005` explicitly applies to the `User` model, not `WorkoutSession`.
3.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Calls `this.workoutsService.deleteSession(userId, id)`.
4.  **Data Access**: (Implemented in TASK-SYS-EXT-WORKOUT-07-02) `WorkoutService` will use `PrismaClient` to delete the `WorkoutSession` record.
5.  **Error and Exception Handling**:
    *   `UnauthorizedException` from `JwtAuthGuard` if no token.
    *   `ForbiddenException` if `deleteSession` determines the `userId` does not own the `workoutId`.
    *   `NotFoundException` if `deleteSession` cannot find the workout.
    *   `InternalServerErrorException` for unexpected database errors.
6.  **Logging and Metrics**:
    *   Log `info` for successful deletions: `workout_deleted_success`, `userId`, `workoutId`.
    *   Log `warn` or `error` for failures: `workout_delete_failed`, `userId`, `workoutId`, `reason`.
    *   Metrics for `workout_delete_total`, `workout_delete_success_total`, `workout_delete_error_total`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | JWT Payload | Authenticated `userId`. |
| Write | N/A (delegated to service) | Controller doesn't directly write. |
| Audit | Log Event | `API_WorkoutDeleteAttempt`, `API_WorkoutDeleteSuccess`, `API_WorkoutDeleteFailure`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant FE_CLIENT as Frontend (UX-012)
participant API_CONTROLLER as workouts.controller.ts
participant AUTH_GUARD as JwtAuthGuard
participant WORKOUT_SVC as WorkoutService
participant LOGGING_SVC as LoggerService
participant GLOBAL_ERROR as GlobalExceptionFilter

FE_CLIENT->>API_CONTROLLER: DELETE /api/v1/workouts/{id} (JWT)
activate API_CONTROLLER
API_CONTROLLER->>AUTH_GUARD: Validate JWT & Extract User
activate AUTH_GUARD
alt Valid JWT and User
    AUTH_GUARD-->>API_CONTROLLER: User payload
else Invalid/Missing JWT
    AUTH_GUARD-->>GLOBAL_ERROR: 401 Unauthorized
    GLOBAL_ERROR-->>FE_CLIENT: Error Response
    deactivate AUTH_GUARD
    deactivate API_CONTROLLER
    return
end
deactivate AUTH_GUARD

API_CONTROLLER->>LOGGING_SVC: Log WorkoutDeleteAttempt
activate LOGGING_SVC
LOGGING_SVC-->>API_CONTROLLER: Logged
deactivate LOGGING_SVC

API_CONTROLLER->>WORKOUT_SVC: deleteSession(userId, workoutId)
activate WORKOUT_SVC
WORKOUT_SVC-->>API_CONTROLLER: Delete Result (Success/Error)
deactivate WORKOUT_SVC

alt Deletion Successful
    API_CONTROLLER->>LOGGING_SVC: Log WorkoutDeleteSuccess
    API_CONTROLLER-->>FE_CLIENT: 204 No Content
else Deletion Failed (e.g., 403, 404)
    API_CONTROLLER->>LOGGING_SVC: Log WorkoutDeleteFailure
    API_CONTROLLER->>GLOBAL_ERROR: Throws Exception (403, 404)
    activate GLOBAL_ERROR
    GLOBAL_ERROR-->>FE_CLIENT: Error Response
    deactivate GLOBAL_ERROR
end
deactivate API_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| Invalid Workout ID | BAD_REQUEST | 400 | Invalid workout identifier provided. |
| Missing/Invalid JWT | UNAUTHORIZED | 401 | Please log in to delete workouts. |
| Not Workout Owner | FORBIDDEN | 403 | You do not have permission to delete this workout. |
| Workout Not Found | NOT_FOUND | 404 | The workout you are trying to delete was not found. |
| Server Error | INTERNAL_ERROR | 500 | An unexpected error occurred while deleting the workout. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: All API communication occurs over HTTPS/TLS (SYS-INFRA-SEC-01).
*   **Authentication**: `JwtAuthGuard` validates the JWT token for every request, extracting the `userId` to ensure the user is authenticated.
*   **Log Event Naming**: Use `WorkoutDeleteAttempt`, `WorkoutDeleteSuccess`, `WorkoutDeleteFailure` with fields like `userId`, `workoutId`, `ipAddress`, `userAgent`.
*   **Metric Naming**: Track `workouts_delete_total`, `workouts_delete_success_total`, `workouts_delete_failed_total`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user owns a workout session
*   ✅ When a `DELETE /workouts/{id}` request is sent with the correct ID and JWT
*   ✅ Then the API responds with `204 No Content`, and the workout is marked for deletion in the database.
*   ✅ Given an unauthenticated user or a user without a valid JWT
*   ✅ When a `DELETE /workouts/{id}` request is sent
*   ✅ Then the API responds with `401 Unauthorized`.
*   ✅ Given an authenticated user does NOT own a workout session
*   ✅ When a `DELETE /workouts/{id}` request is sent for that workout
*   ✅ Then the API responds with `403 Forbidden`.
*   ✅ Given an authenticated user attempts to delete a non-existent workout
*   ✅ When a `DELETE /workouts/{id}` request is sent for a non-existent ID
*   ✅ Then the API responds with `404 Not Found`.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | Controller handles request parsing and delegates to service; authentication is handled by guard. |
| Independence | ✅ | The controller's logic is independent of other controllers. |
| Testability | ✅ | Easily testable by mocking `WorkoutService` and `AuthGuard`. |
| Small Subset Testing | ✅ | Unit tests for controller logic; integration tests for endpoint behavior. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.controller.ts
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-07-02

**Related Epic**: EPIC-002 Workout Tracking

**Related Story**: EPIC-002-S9 Delete Past Workout Session

**Source SYS-ID**: SYS-EXT-WORKOUT-07

**Related UX-ID:** UX-012

**Related UI-ID:** UI-015

**Task Name**: BE: Implement WorkoutService.deleteSession

**Task Type**: Backend

**Priority/Phase**: T2

**Dependency**: TASK-SYS-EXT-WORKOUT-07-01

**DECISION-REF**: DECISION-005

### **Coverage**:

- Input Validation: `userId` and `sessionId` must be valid CUIDs.
- Exceptions: `NotFoundException` if workout not found, `ForbiddenException` if `userId` does not own the session. `InternalServerErrorException` for database errors.
- API/Protocol: N/A (internal service method).
- Database Changes: Deletes `WorkoutSession` record and cascades delete to `LoggedExercise`, `StrengthSet`, `CardioEntry` due to Prisma `onDelete: Cascade` rules.
- UI/Components: Not Covered.
- Interaction Logic: Verifies ownership, then performs the deletion.
- Business Boundary Condition: Only the owner can delete a workout. Cascade deletion ensures referential integrity and complete removal of associated data.
- Observability: Log database operations, success/failure.
- Performance Considerations: Efficient database query for deletion.
- Non-Functional: Database transactionality.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input (Method Parameters):**
        ```typescript
        // From controller
        deleteSession(userId: string, sessionId: string): Promise<void>
        ```
    *   **Output (Method Return):** `Promise<void>` (no content, indicates success).
*   **Decision point application**: `DECISION-005` states "soft delete on the User model" for user deletion. This task is for `WorkoutSession` deletion. The Prisma schema defines `onDelete: Cascade` for `loggedExercises` related to `WorkoutSession`, which results in a *hard delete* for `WorkoutSession` and all its children. This is the intended behavior for `WorkoutSession` deletion as no other explicit policy for workout data deletion was provided. The decision is therefore acknowledged as not applicable to this specific model but respected for its intended context.
*   **Main Function/Class Design**
    *   `WorkoutService.deleteSession(userId: string, sessionId: string)`:
        1.  Find the `WorkoutSession` by `sessionId`.
        2.  Check if the `workout.userId` matches the provided `userId`.
        3.  If not found, throw `NotFoundException`.
        4.  If not owned, throw `ForbiddenException`.
        5.  Execute `prisma.workoutSession.delete()` which will cascade delete due to schema definitions.
*   **Code Location**
    *   Service: `apps/backend/src/workouts/workouts.service.ts`
    *   Prisma Schema: `apps/backend/src/prisma/schema.prisma` (defines cascade delete).
*   **Call Chain**: `WorkoutsController` → `WorkoutService` → `PrismaClient`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: The initial `findUnique` query should be optimized with an index on `id`. The `delete` operation (even cascaded) is typically efficient for single records.
    *   **Security**: Critical ownership check (`workout.userId === userId`) prevents users from deleting others' workouts. This is the core authorization logic.
    *   **Logging**: Log successful deletion and any authorization/not-found failures. `LoggerService` should be used (SYS-INFRA-LOG-01).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling**: N/A (this is a service method).
2.  **[Decision hook]**: The implementation performs a hard delete for `WorkoutSession` and its related `LoggedExercise`, `StrengthSet`, and `CardioEntry` records. This aligns with the `onDelete: Cascade` defined in the Prisma schema for `WorkoutSession` and the absence of a specific soft-delete policy for workouts. DECISION-005 regarding soft-delete for the `User` model is not directly applied here.
3.  **Business Logic (Service Methods + Dependent Capability Calls)**
    *   Inject `PrismaService` into `WorkoutService`.
    *   `deleteSession` method:
        *   `const workout = await this.prisma.workoutSession.findUnique({ where: { id: sessionId } });`
        *   `if (!workout) { throw new NotFoundException('Workout session not found.'); }`
        *   `if (workout.userId !== userId) { throw new ForbiddenException('You do not own this workout session.'); }`
        *   `await this.prisma.workoutSession.delete({ where: { id: sessionId } });` (This triggers cascade deletion as per schema).
        *   Log `info` for successful deletion.
4.  **Data Access (Prisma Models and Query Methods)**
    *   Uses `prisma.workoutSession.findUnique` for lookup.
    *   Uses `prisma.workoutSession.delete` for deletion.
5.  **Error and Exception Handling**:
    *   `NotFoundException`: If `findUnique` returns null.
    *   `ForbiddenException`: If `userId` check fails.
    *   `InternalServerErrorException`: For any Prisma client or database errors during delete.
6.  **Logging and Metrics**:
    *   Log `info` with `workout_deleted`, `userId`, `sessionId`.
    *   Log `warn` with `workout_delete_unauthorized` or `workout_delete_notfound`.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :--- | :---------------- | :---------- |
| Read | `WorkoutSession` Table | Retrieve workout to verify ownership. |
| Write | `WorkoutSession` Table | Delete the session record. |
| Write | `LoggedExercise`, `StrengthSet`, `CardioEntry` Tables | Cascade deletion of related data. |
| Audit | Log Event | `Service_WorkoutDelete`, `Service_WorkoutDeleteForbidden`, `Service_WorkoutDeleteNotFound`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant API_CONTROLLER as workouts.controller.ts
participant WORKOUT_SVC as WorkoutService
participant PRISMA as PrismaService (ORM)
participant DB as PostgreSQL Database
participant LOGGING_SVC as LoggerService
participant GLOBAL_ERROR as GlobalExceptionFilter

API_CONTROLLER->>WORKOUT_SVC: deleteSession(userId, sessionId)
activate WORKOUT_SVC
WORKOUT_SVC->>PRISMA: findUnique WorkoutSession by sessionId
activate PRISMA
PRISMA->>DB: SELECT * FROM "WorkoutSession" WHERE id = sessionId
activate DB
DB-->>PRISMA: Workout record / null
deactivate DB
PRISMA-->>WORKOUT_SVC: Workout record / null
deactivate PRISMA

alt Workout not found
    WORKOUT_SVC->>GLOBAL_ERROR: Throw NotFoundException
    activate GLOBAL_ERROR
    GLOBAL_ERROR-->>API_CONTROLLER: Error response
    deactivate GLOBAL_ERROR
    WORKOUT_SVC--xAPI_CONTROLLER: Exception
else Workout found
    WORKOUT_SVC->>WORKOUT_SVC: Check userId matches workout.userId
    alt userId mismatch
        WORKOUT_SVC->>GLOBAL_ERROR: Throw ForbiddenException
        activate GLOBAL_ERROR
        GLOBAL_ERROR-->>API_CONTROLLER: Error response
        deactivate GLOBAL_ERROR
        WORKOUT_SVC--xAPI_CONTROLLER: Exception
    else userId matches
        WORKOUT_SVC->>LOGGING_SVC: Log Workout delete initiated
        activate LOGGING_SVC
        LOGGING_SVC-->>WORKOUT_SVC: Logged
        deactivate LOGGING_SVC

        WORKOUT_SVC->>PRISMA: delete WorkoutSession by sessionId (cascade)
        activate PRISMA
        PRISMA->>DB: DELETE FROM "WorkoutSession" WHERE id = sessionId; CASCADE
        activate DB
        DB-->>PRISMA: Deletion successful
        deactivate DB
        PRISMA-->>WORKOUT_SVC: Deletion result
        deactivate PRISMA
        WORKOUT_SVC-->>API_CONTROLLER: Deletion complete
    end
end
deactivate WORKOUT_SVC
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :-------- | :-------------- | :---------- | :---------- |
| Workout Not Found | NOT_FOUND | 404 | The workout you are trying to delete was not found. |
| Not Workout Owner | FORBIDDEN | 403 | You do not have permission to delete this workout. |
| Database Error | INTERNAL_ERROR | 500 | A database error occurred during deletion. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Inherited from the controller/API gateway (SYS-INFRA-SEC-01).
*   **Authentication**: `userId` is passed from the authenticated context (JWT) ensuring the operation is performed on behalf of a known user (SYS-INFRA-AUTH-01).
*   **Log Event Naming**: `Service.Workout.DeleteSuccess`, `Service.Workout.DeleteForbidden`, `Service.Workout.DeleteNotFound`. Fields: `sessionId`, `userId`, `correlationId`.
*   **Metric Naming**: `service_workout_delete_calls_total`, `service_workout_delete_duration_ms_bucket`.

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a workout session exists and I am its owner
*   ✅ When `deleteSession(myUserId, mySessionId)` is called
*   ✅ Then the `WorkoutSession` record and all its associated `LoggedExercise`, `StrengthSet`, and `CardioEntry` records are permanently removed from the database.
*   ✅ Given a workout session exists but I am NOT its owner
*   ✅ When `deleteSession(anotherUserId, mySessionId)` is called
*   ✅ Then a `ForbiddenException` is thrown, and no data is deleted.
*   ✅ Given a workout session does NOT exist
*   ✅ When `deleteSession(myUserId, nonExistentSessionId)` is called
*   ✅ Then a `NotFoundException` is thrown, and no data is deleted.
*   ✅ Given a database error occurs during deletion
*   ✅ When `deleteSession(myUserId, mySessionId)` is called
*   ✅ Then an `InternalServerErrorException` is thrown.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅ | The service method is solely responsible for the business logic of deleting a workout session and enforcing ownership. |
| Independence | ✅ | It depends only on `PrismaService` for data access and standard NestJS exception types. |
| Testability | ✅ | Easily testable by mocking `PrismaService` methods like `findUnique` and `delete`. |
| Small Subset Testing | ✅ | Unit tests can cover all paths: success, not found, forbidden, and database errors. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.ts
apps/backend/src/prisma/schema.prisma
```

<!-- impl-batch:TASK-SYS-EXT-WORKOUT-07-03::SYS-EXT-WORKOUT-07::UX-012::TASK-SYS-EXT-WORKOUT-07-04::SYS-EXT-WORKOUT-07::UX-012::TASK-SYS-EXT-WORKOUT-07-05::SYS-EXT-WORKOUT-07::UX-012 -->

## **Task-ID**: TASK-SYS-EXT-WORKOUT-07-03

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S9 Delete Past Workout Session

**Source SYS-ID**: SYS-EXT-WORKOUT-07

**Related UX-ID:** UX-012

**Related UI-ID:** —

**Task Name**: BE: Unit/Integration Tests for Delete Workout

**Task Type**: Backend

**Priority/Phase**: T2

**Dependency**: SYS-EXT-WORKOUT-07 (Implicitly, the implementation of the delete workout feature)

**DECISION-REF**: DECISION-005 (Soft delete is not in scope, so testing will cover hard cascade delete as per schema.)

### 🔹 **Coverage**:

- Input Validation: Valid `workoutId` (CUID format), `userId` from authenticated context.
- Exceptions: Workout not found (404), workout not owned by user (403), unauthorized (401).
- API/Protocol: Internal service calls, controller HTTP DELETE response.
- Database Changes: Verification of cascade deletion of `WorkoutSession`, `LoggedExercise`, `StrengthSet`, `CardioEntry`.
- UI/Components: Not Covered
- Interaction Logic: Testing service logic for deletion, controller routing and authentication.
- Business Boundary Condition: Only the owner can delete a workout session.
- Observability: Verification of logging for successful and failed deletion attempts.
- Performance Considerations: Tests should verify deletion performance for a workout with typical associated data (e.g., 5 logged exercises, 3 sets each).
- Non-Functional: N/A

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input to Service**: `deleteSession(sessionId: string, userId: string)`
    *   **Output from Service**: `void` or a confirmation object `{ message: 'Workout deleted successfully' }`.
    *   **Input to Controller**: `DELETE /workouts/:id` (where `id` is `workoutId` from `param`), `userId` from JWT payload.
    *   **Output from Controller (Success)**: `200 OK` or `204 No Content` (for successful deletion).
    *   **Output from Controller (Failure)**: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.
*   **Decision point application**: DECISION-005 implies testing will verify the complete removal of the workout session and its related data, as a soft delete mechanism is not implemented for the MVP. The `onDelete: Cascade` in `schema.prisma` will be leveraged and tested.
*   **Main Function/Class Design** (including responsibilities)
    *   `WorkoutService` (responsible for business logic of deleting a workout and its associated records).
    *   `WorkoutController` (responsible for handling HTTP requests, authenticating, and delegating to `WorkoutService`).
    *   `PrismaService` (mocked in unit tests, used in integration tests for database interaction).
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/backend/src/workouts/workouts.service.spec.ts` (Unit tests for `WorkoutService`)
    *   `apps/backend/src/workouts/workouts.controller.spec.ts` (Integration tests for `WorkoutController`)
    *   `apps/backend/src/workouts/workouts.module.ts` (Ensure proper setup for integration testing)
*   **Call Chain** (prefix → current task → downstream)
    *   **Unit Tests**: `WorkoutService.deleteSession` -> `PrismaService.workoutSession.delete` (mocked)
    *   **Integration Tests**: `Test Client` -> `WorkoutController.delete` -> `AuthGuard` -> `WorkoutService.deleteSession` -> `PrismaService.workoutSession.delete`
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Tests ensure that the delete operation is efficient, especially with cascade deletions. Test with a mock database to ensure no N+1 query issues.
    *   **Security**: Integration tests must confirm that only the `userId` associated with the workout can delete it. Test cases for unauthorized access and forbidden access are critical.
    *   **Logging**: Tests should assert that appropriate logs are generated for successful deletions, and specific error logs are created for failures (e.g., `WORKOUT_DELETE_SUCCESS`, `WORKOUT_NOT_FOUND_ERROR`).

### 🔹 **Implementation Logic Decomposition**

**Back-End Process**

1.  **Request Handling (Controller)**
    *   **File**: `apps/backend/src/workouts/workouts.controller.ts`
    *   The `DELETE /workouts/:id` endpoint will be tested.
    *   The `@UseGuards(JwtAuthGuard)` and `@Req() req` will ensure that the `userId` is extracted from the JWT payload and available to the controller method.
    *   The controller method will call `WorkoutService.deleteSession(workoutId, userId)`.
    *   It will handle `NotFoundException` (404) and `ForbiddenException` (403) from the service.
2.  **Business Logic (Service Methods)**
    *   **File**: `apps/backend/src/workouts/workouts.service.ts`
    *   **Unit Test Setup**: Mock `PrismaService` to control database responses.
    *   **`deleteSession(sessionId: string, userId: string)` logic**:
        *   **Step 1: Authorization Check**: Query `WorkoutSession` by `sessionId` and `userId`.
            *   If no session found or `session.userId !== userId`, throw `NotFoundException` (if not found at all) or `ForbiddenException` (if found but not owned by user).
        *   **Step 2: Delete Operation**: Call `this.prisma.workoutSession.delete({ where: { id: sessionId } })`.
            *   Prisma's `onDelete: Cascade` will handle the deletion of related `LoggedExercise`, `StrengthSet`, and `CardioEntry` records automatically.
        *   **Step 3: Logging**: Log successful deletion with relevant `sessionId` and `userId`.
3.  **Data Access (Prisma Models and Query Methods)**
    *   **File**: `apps/backend/src/prisma/prisma.service.ts` (Prisma client)
    *   **Methods used**:
        *   `prisma.workoutSession.findUnique`: To verify ownership before deletion.
        *   `prisma.workoutSession.delete`: To perform the deletion.
    *   Unit tests will mock these Prisma calls to simulate scenarios without actual DB interaction.
4.  **Error and Exception Handling**
    *   **NestJS Exceptions**: `NotFoundException`, `ForbiddenException`, `UnauthorizedException`.
    *   **Global Exception Filter**: `SYS-INFRA-ERROR-01` ensures these exceptions are caught and standardized into appropriate HTTP responses (e.g., `404`, `403`). Tests will assert these HTTP status codes.
5.  **Logging and Metrics**
    *   **LoggerService**: `SYS-INFRA-LOG-01`
    *   Tests will verify that logs like `WorkoutSession deleted: {sessionId}` are produced on success.
    *   Error logs for `Workout not found` or `Unauthorized delete attempt` should also be asserted.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | `WorkoutSession`    | Query to verify ownership before deletion. |
| Write | `WorkoutSession`    | Delete the workout session. Cascade deletes `LoggedExercise`, `StrengthSet`, `CardioEntry` due to Prisma schema. |
| Audit | `Log Event`         | `WORKOUT_DELETE_SUCCESS` or `WORKOUT_DELETE_FAILED` with `sessionId`, `userId`, and error details. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant TEST_CLIENT as "Test Client"
participant W_CONTROLLER as "WorkoutController"
participant AUTH_GUARD as "JwtAuthGuard"
participant W_SERVICE as "WorkoutService"
participant PRISMA as "PrismaService"
participant DB as "PostgreSQL DB"

TEST_CLIENT->>W_CONTROLLER: DELETE /workouts/:id (with JWT)
activate W_CONTROLLER
W_CONTROLLER->>AUTH_GUARD: Validate JWT
activate AUTH_GUARD
AUTH_GUARD-->>W_CONTROLLER: User authenticated (userId)
deactivate AUTH_GUARD
W_CONTROLLER->>W_SERVICE: deleteSession(id, userId)
activate W_SERVICE
W_SERVICE->>PRISMA: findUnique WorkoutSession (id, userId)
activate PRISMA
PRISMA->>DB: SELECT WorkoutSession
deactivate PRISMA
alt WorkoutSession Found & Owned
PRISMA-->>W_SERVICE: WorkoutSession object
W_SERVICE->>PRISMA: delete WorkoutSession (id)
activate PRISMA
PRISMA->>DB: DELETE WorkoutSession (cascade)
deactivate PRISMA
PRISMA-->>W_SERVICE: Deletion success
W_SERVICE-->>W_CONTROLLER: void
else WorkoutSession Not Found or Not Owned
PRISMA-->>W_SERVICE: null or throw
W_SERVICE--xW_CONTROLLER: Throw NotFound/ForbiddenException
end
deactivate W_SERVICE
W_CONTROLLER-->>TEST_CLIENT: HTTP 200/204 OR 403/404
deactivate W_CONTROLLER
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt (for frontend) |
| :------- | :----------- | :---------- | :------------------------- |
| Unauthorized Delete | UNAUTHORIZED | 401         | Your session has expired. Please log in again. |
| Forbidden Delete | FORBIDDEN | 403         | You do not have permission to delete this workout. |
| Workout Not Found | WORKOUT_NOT_FOUND | 404         | The workout you are trying to delete was not found. |
| Internal Server Error | INTERNAL_SERVER_ERROR | 500         | An unexpected error occurred. Please try again. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Assumed HTTPS/TLS for the test environment.
*   **Authentication**: `JwtAuthGuard` is mocked/used to ensure the `userId` in the JWT payload correctly authorizes the deletion. Tests include cases for missing/invalid JWTs.
*   **Log Event Naming**:
    *   `workout_delete_success`: `sessionId`, `userId`.
    *   `workout_delete_failed`: `sessionId`, `userId`, `error_type`, `error_message`.
    *   `workout_delete_unauthorized`: `sessionId`, `attempted_by_userId`.
*   **Metric Naming**:
    *   `workout_delete_total_count`
    *   `workout_delete_success_count`
    *   `workout_delete_failed_count` (with `error_type` label)
    *   `workout_delete_duration_ms`

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given an authenticated user and an existing workout session owned by that user,
    When the user sends a `DELETE /workouts/{id}` request for that session,
    Then the API should respond with `200 OK` or `204 No Content`, and the workout session (along with all its logged exercises, sets, and cardio entries) should be permanently removed from the database.
*   ✅ Given an authenticated user and an existing workout session NOT owned by that user,
    When the user sends a `DELETE /workouts/{id}` request for that session,
    Then the API should respond with `403 Forbidden`, and the workout session should remain in the database unchanged.
*   ✅ Given an authenticated user and a non-existent `workoutId`,
    When the user sends a `DELETE /workouts/{id}` request,
    Then the API should respond with `404 Not Found`.
*   ✅ Given an unauthenticated request,
    When a `DELETE /workouts/{id}` request is sent,
    Then the API should respond with `401 Unauthorized`.
*   ✅ Given a successful deletion,
    When checking the logs,
    Then a `workout_delete_success` event with the `sessionId` and `userId` should be present.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅            | Tests focus solely on the deletion logic and endpoint. |
| Independence | ✅            | Each test case runs in isolation without side effects on others. Mocking ensures this. |
| Testability | ✅            | `WorkoutService` and `WorkoutController` are designed for easy testing, with dependencies injectable. |
| Small Subset Testing | ✅            | Unit tests target individual service methods; integration tests verify controller-service interaction. |

### 🔹 **Code Location**

```
apps/backend/src/workouts/workouts.service.spec.ts
apps/backend/src/workouts/workouts.controller.spec.ts
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-07-04

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S9 Delete Past Workout Session

**Source SYS-ID**: SYS-EXT-WORKOUT-07

**Related UX-ID:** UX-012

**Related UI-ID:** UI-012 (Implicit, as a confirmation dialog)

**Task Name**: FE: Create Deletion Confirmation Modal

**Task Type**: Frontend

**Priority/Phase**: T2

**Dependency**: SYS-INFRA-SETUP-01 (Basic frontend project setup)

**DECISION-REF**: —

### 🔹 **Coverage**:

- Input Validation: N/A (UI component only, props are passed).
- Exceptions: N/A.
- API/Protocol: N/A (Does not directly interact with API).
- Database Changes: N/A.
- UI/Components: `DeleteConfirmationModal` component, including title, message, and action buttons.
- Interaction Logic: Modal visibility toggling, `onConfirm` and `onCancel` callback execution.
- Business Boundary Condition: Must be dismissible, clearly communicate the action.
- Observability: Logs user interaction with the modal (e.g., "Confirm" clicked, "Cancel" clicked).
- Performance Considerations: Fast rendering, minimal impact on page load.
- Non-Functional: Internationalization (English), accessibility (ARIA attributes), mobile responsiveness.

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Props Input**:
        ```typescript
        interface DeleteConfirmationModalProps {
          isOpen: boolean; // Controls modal visibility
          onClose: () => void; // Callback to close modal without action
          onConfirm: () => void; // Callback for confirm action
          title: string; // Modal title, e.g., "Delete Workout?"
          message: string; // Confirmation message, e.g., "Are you sure you want to delete this workout?"
          confirmButtonText?: string; // Optional custom text, defaults to "Delete"
          cancelButtonText?: string; // Optional custom text, defaults to "Cancel"
        }
        ```
    *   **Output**: Invocation of `onConfirm()` or `onClose()` based on user action.
*   **Decision point application**: N/A for this task.
*   **Main Function/Class Design** (including responsibilities)
    *   `DeleteConfirmationModal` (React Functional Component): Responsible for rendering a generic, reusable confirmation dialog. It should accept props to customize its content and behavior.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/frontend/src/components/common/DeleteConfirmationModal.tsx`
*   **Call Chain** (prefix → current task → downstream)
    *   Parent Component (`workouts/[id]/page.tsx`) -> `DeleteConfirmationModal` (rendering and passing props) -> User Interaction -> Parent Component (handling `onConfirm`/`onClose` callbacks).
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use React's memoization or `useMemo` if the modal content is complex to prevent unnecessary re-renders. Ensure efficient styling (e.g., CSS-in-JS or Tailwind CSS).
    *   **Security**: No direct security implications for this component itself. It should not process sensitive user input.
    *   **Logging**: Use a simple client-side logger to capture `modal_delete_workout_shown`, `modal_delete_workout_confirmed`, `modal_delete_workout_cancelled` events.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**
    *   `apps/frontend/src/components/common/DeleteConfirmationModal.tsx`
2.  **Triggering Logic (events, buttons, input validation)**
    *   The modal will be rendered conditionally by its parent component based on an `isOpen` boolean state.
    *   It will contain two main buttons: "Confirm" (or `confirmButtonText`) and "Cancel" (or `cancelButtonText`).
    *   Clicking "Confirm" triggers the `onConfirm` prop callback.
    *   Clicking "Cancel" or pressing `Escape` or clicking outside the modal (if supported by the underlying UI library) triggers the `onClose` prop callback.
3.  **[Decision hook]**: N/A.
4.  **Interaction with the Backend (interfaces, parameters, state flow)**
    *   This component has no direct interaction with the backend API. It acts as a pure UI component.
    *   The `onConfirm` and `onClose` callbacks will be handled by the parent component, which might then interact with the backend.
5.  **UI Success/Failure Feedback and State Recovery**
    *   The modal simply shows or hides. Its own success/failure is purely visual.
    *   The parent component handles the result of the `onConfirm` action (e.g., showing a toast message after a successful API call).

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | Component Props | `isOpen`, `title`, `message`, `confirmButtonText`, `cancelButtonText`. |
| Audit | `Log Event`         | `modal_delete_workout_shown`, `modal_delete_workout_confirmed`, `modal_delete_workout_cancelled`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant PARENT_COMP as "Parent Component"
participant CONF_MODAL as "DeleteConfirmationModal"
participant USER as "User"

PARENT_COMP->>CONF_MODAL: Render (isOpen = false)
USER->>PARENT_COMP: Clicks "Delete" button
PARENT_COMP->>PARENT_COMP: Set isOpen = true
PARENT_COMP->>CONF_MODAL: Render (isOpen = true, props)
CONF_MODAL->>USER: Display confirmation modal
USER->>CONF_MODAL: Clicks "Confirm"
CONF_MODAL->>PARENT_COMP: Calls onConfirm()
PARENT_COMP->>PARENT_MODAL: Calls onClose() (or sets isOpen=false)
CONF_MODAL->>USER: Hide confirmation modal
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| N/A | N/A | N/A | N/A |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: N/A for a UI component.
*   **Authentication**: N/A for a UI component.
*   **Log Event Naming and Field Standards**:
    *   `ui_event_modal_delete_workout_shown`: `{ workoutId }`
    *   `ui_event_modal_delete_workout_confirmed`: `{ workoutId }`
    *   `ui_event_modal_delete_workout_cancelled`: `{ workoutId }`
*   **Metric Naming**:
    *   `ui_modal_delete_workout_confirm_count`
    *   `ui_modal_delete_workout_cancel_count`

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a parent component,
    When `DeleteConfirmationModal` is rendered with `isOpen: true`,
    Then the modal should be visible with the provided `title` and `message`, and both "Confirm" and "Cancel" buttons.
*   ✅ Given `DeleteConfirmationModal` is open,
    When the "Confirm" button is clicked,
    Then the `onConfirm` callback prop should be invoked once.
*   ✅ Given `DeleteConfirmationModal` is open,
    When the "Cancel" button is clicked,
    Then the `onClose` callback prop should be invoked once.
*   ✅ Given `DeleteConfirmationModal` is open,
    When it is rendered with `isOpen: false`,
    Then the modal should not be visible.
*   ✅ Given the `DeleteConfirmationModal` is rendered,
    When inspecting for accessibility,
    Then it should have appropriate ARIA attributes (e.g., `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅            | The component is solely responsible for displaying a confirmation prompt. |
| Independence | ✅            | It is a reusable, stateless component that takes props for customization and callbacks for actions. |
| Testability | ✅            | Easily testable with component testing libraries (e.g., React Testing Library) by mocking props. |
| Small Subset Testing | ✅            | Can be tested in isolation to verify its UI and interaction logic. |

### 🔹 **Code Location**

```
apps/frontend/src/components/common/DeleteConfirmationModal.tsx
```

---

## **Task-ID**: TASK-SYS-EXT-WORKOUT-07-05

**Related Epic**: EPIC-002 Workout Management

**Related Story**: EPIC-002-S9 Delete Past Workout Session

**Source SYS-ID**: SYS-EXT-WORKOUT-07

**Related UX-ID:** UX-012

**Related UI-ID:** UI-022 (Workout details page where delete button would be)

**Task Name**: FE: Implement Delete Workout API Client & Logic

**Task Type**: Frontend

**Priority/Phase**: T2

**Dependency**: TASK-SYS-EXT-WORKOUT-07-01 (BE: Delete Workout API Endpoint), TASK-SYS-EXT-WORKOUT-07-04 (FE: Create Deletion Confirmation Modal)

**DECISION-REF**: —

### 🔹 **Coverage**:

- Input Validation: `workoutId` (passed from UI, typically a CUID).
- Exceptions: Handles 401, 403, 404, 500 API responses.
- API/Protocol: `DELETE /workouts/{id}` API call via Axios.
- Database Changes: Not Covered (handled by backend).
- UI/Components: Integration with `DeleteConfirmationModal`, display of loading/error states, redirect/UI update on success.
- Interaction Logic: Triggers confirmation, calls API, updates UI based on API response.
- Business Boundary Condition: Confirmed action required before API call.
- Observability: Logs API call initiation, success, and failure.
- Performance Considerations: API call should be non-blocking; UI should provide immediate feedback (e.g., loading spinner).
- Non-Functional: Internationalization (success/error messages), accessibility (loading indicators).

### 🔹 **Implementation Key Points**

*   **Input → Output Data Structure (including type examples)**
    *   **Input to API Client Function**: `deleteWorkout(workoutId: string): Promise<void>`
    *   **Output from API Client Function**: Resolves on success (void), rejects on API error.
    *   **Input to UI Logic**: `workoutId` (from route params or component props).
    *   **Output from UI Logic**: UI state changes (loading, error, success message, redirect).
*   **Decision point application**: N/A for this task.
*   **Main Function/Class Design** (including responsibilities)
    *   `WorkoutService` (API Client - `apps/frontend/src/services/workout.service.ts`): Contains the `deleteWorkout` method, responsible for making the HTTP `DELETE` request.
    *   `WorkoutDetailsPage` (or similar, `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`): Responsible for orchestrating the user interaction, displaying the confirmation modal, calling the API client, and handling UI feedback/redirection.
*   **Code Location** (by Monorepo directory: apps/api/core/infra, etc.)
    *   `apps/frontend/src/services/workout.service.ts`
    *   `apps/frontend/src/app/(app)/workouts/[id]/page.tsx`
*   **Call Chain** (prefix → current task → downstream)
    *   `User` -> `WorkoutDetailsPage` -> `DeleteConfirmationModal` -> `WorkoutDetailsPage` -> `WorkoutService.deleteWorkout` -> `Backend API` -> `WorkoutService.deleteWorkout` -> `WorkoutDetailsPage` -> `Router` (redirect).
*   **Performance/Security/Logging Considerations**
    *   **Performance**: Use `async/await` for API calls to keep the UI responsive. Implement a loading state to prevent multiple submissions.
    *   **Security**: Ensure the Axios instance is configured to automatically include the JWT in the `Authorization` header. Handle 401 responses by redirecting to login.
    *   **Logging**: Log API call requests (`workout_delete_request`), successes (`workout_delete_success_frontend`), and failures (`workout_delete_failed_frontend`) with relevant `workoutId` and error details.

### 🔹 **Implementation Logic Decomposition**

**Front-End Process**

1.  **Page or Component Location**
    *   `apps/frontend/src/app/(app)/workouts/[id]/page.tsx` (Workout details page)
2.  **Triggering Logic (events, buttons, input validation)**
    *   A "Delete Workout" button is present on the `WorkoutDetailsPage`.
    *   Clicking this button triggers a state change to `showConfirmationModal: true`.
    *   The `DeleteConfirmationModal` is conditionally rendered based on `showConfirmationModal`.
    *   When the user confirms deletion in the modal, the `onConfirm` callback from the modal is invoked.
3.  **[Decision hook]**: N/A.
4.  **Interaction with the Backend (interfaces, parameters, state flow)**
    *   **`apps/frontend/src/services/workout.service.ts`**:
        ```typescript
        import api from '../lib/api'; // Pre-configured Axios instance with JWT interceptor

        export const workoutService = {
          // ... other methods
          deleteWorkout: async (workoutId: string): Promise<void> => {
            await api.delete(`/workouts/${workoutId}`);
          },
        };
        ```
    *   **`WorkoutDetailsPage` logic (inside the component)**:
        ```typescript
        const [showConfirmationModal, setShowConfirmationModal] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter(); // Next.js router
        const { id: workoutId } = useParams(); // Get workout ID from URL

        const handleDelete = async () => {
          setIsLoading(true);
          try {
            await workoutService.deleteWorkout(workoutId as string);
            toast.success('Workout deleted successfully!'); // UI success feedback
            router.push('/dashboard'); // Redirect after successful deletion
          } catch (error) {
            console.error('Failed to delete workout:', error);
            toast.error(error.message || 'Failed to delete workout.'); // UI error feedback
          } finally {
            setIsLoading(false);
            setShowConfirmationModal(false); // Close modal
          }
        };

        // Render button and modal
        // <button onClick={() => setShowConfirmationModal(true)} disabled={isLoading}>Delete Workout</button>
        // <DeleteConfirmationModal
        //   isOpen={showConfirmationModal}
        //   onClose={() => setShowConfirmationModal(false)}
        //   onConfirm={handleDelete}
        //   title="Delete Workout?"
        //   message="Are you sure you want to permanently delete this workout and all its data?"
        // />
        ```
5.  **UI Success/Failure Feedback and State Recovery**
    *   `isLoading` state is used to disable the delete button and potentially show a spinner.
    *   `toast` notifications (e.g., from `react-hot-toast`) are used for success and error messages.
    *   On successful deletion, the user is redirected to the dashboard. On failure, an error message is displayed.

### 🔹 **Data Flow and State Change**

| Type | Read/Write Target | Description |
| :-- | :---------------- | :---------- |
| Read | UI (route params) | `workoutId` from the URL. |
| Write | Backend API | `DELETE /workouts/{id}` request sent. |
| State | Component State | `showConfirmationModal` (boolean), `isLoading` (boolean). |
| Audit | `Log Event`         | `workout_delete_request`, `workout_delete_success_frontend`, `workout_delete_failed_frontend`. |

### 🔹 **Sequence Diagram (Mermaid)**

```mermaid
sequenceDiagram
participant USER as "User"
participant W_PAGE as "WorkoutDetailsPage"
participant CONF_MODAL as "DeleteConfirmationModal"
participant W_SERVICE as "workout.service.ts"
participant BACKEND_API as "NestJS Backend API"

USER->>W_PAGE: Clicks "Delete Workout" button
activate W_PAGE
W_PAGE->>CONF_MODAL: Render with isOpen=true
activate CONF_MODAL
CONF_MODAL->>USER: Displays confirmation dialog
USER->>CONF_MODAL: Clicks "Confirm"
CONF_MODAL->>W_PAGE: onConfirm() callback
deactivate CONF_MODAL
W_PAGE->>W_PAGE: Set isLoading=true
W_PAGE->>W_SERVICE: deleteWorkout(workoutId)
activate W_SERVICE
W_SERVICE->>BACKEND_API: DELETE /workouts/{id} (with JWT)
activate BACKEND_API
BACKEND_API-->>W_SERVICE: HTTP 200/204 (Success) or 4xx/5xx (Error)
deactivate BACKEND_API
W_SERVICE-->>W_PAGE: Promise resolved/rejected
deactivate W_SERVICE
alt Deletion Successful
W_PAGE->>W_PAGE: Show success toast
W_PAGE->>W_PAGE: Redirect to /dashboard
else Deletion Failed
W_PAGE->>W_PAGE: Show error toast
end
W_PAGE->>W_PAGE: Set isLoading=false
deactivate W_PAGE
```

### 🔹 **Error and Exception Mapping**

| Scenario | Error Code | HTTP Status | User Prompt |
| :------- | :----------- | :---------- | :---------- |
| API Unauthorized | UNAUTHORIZED | 401         | Your session has expired. Please log in again. |
| API Forbidden | FORBIDDEN | 403         | You do not have permission to delete this workout. |
| API Workout Not Found | WORKOUT_NOT_FOUND | 404         | The workout you are trying to delete was not found. It might have already been deleted. |
| API Server Error | INTERNAL_SERVER_ERROR | 500         | An unexpected error occurred on the server. Please try again. |
| Network Error | NETWORK_ERROR | (Client-side) | Could not connect to the server. Please check your internet connection. |

### 🔹 **Security and Observability Hooks**

*   **Transport Security**: Frontend always communicates with backend over HTTPS (enforced by `SYS-INFRA-SEC-01`).
*   **Authentication**: The Axios client (`api`) should automatically attach the user's JWT to the `Authorization` header. On 401 errors, a global Axios interceptor can redirect the user to the login page.
*   **Log Event Naming and Field Standards**:
    *   `fe_workout_delete_request`: `{ workoutId }`
    *   `fe_workout_delete_success`: `{ workoutId, duration_ms }`
    *   `fe_workout_delete_failure`: `{ workoutId, error_message, error_code, http_status }`
*   **Metric Naming**:
    *   `fe_workout_delete_api_call_count`
    *   `fe_workout_delete_api_success_count`
    *   `fe_workout_delete_api_failure_count` (with `error_type` label)
    *   `fe_workout_delete_api_latency_ms`

### 🔹 **Acceptance Criteria (GWT)**

*   ✅ Given a user viewing their workout details page,
    When they click the "Delete Workout" button,
    Then the `DeleteConfirmationModal` should appear.
*   ✅ Given the `DeleteConfirmationModal` is open,
    When the user clicks "Cancel",
    Then the modal should close, and no API call should be made.
*   ✅ Given the `DeleteConfirmationModal` is open,
    When the user clicks "Confirm" and the API call is successful,
    Then a success toast message should be displayed, and the user should be redirected to the dashboard.
*   ✅ Given the `DeleteConfirmationModal` is open,
    When the user clicks "Confirm" and the API call fails with a 403 Forbidden error,
    Then an error toast message like "You do not have permission to delete this workout." should be displayed, and the user should remain on the workout details page.
*   ✅ Given the `DeleteConfirmationModal` is open,
    When the user clicks "Confirm" and the API call fails with a 404 Not Found error,
    Then an error toast message like "The workout you are trying to delete was not found." should be displayed.

### 🔹 **Atomization Checklist**

| Dimension | Pass or Fail | Description |
| :-------- | :----------- | :---------- |
| Single Responsibility | ✅            | `workout.service.ts` solely handles API interaction. `WorkoutDetailsPage` orchestrates UI logic and state. |
| Independence | ✅            | The API client is decoupled from the UI component. |
| Testability | ✅            | API client can be unit tested by mocking Axios. UI component can be tested by mocking the API client. |
| Small Subset Testing | ✅            | Each part can be tested individually. |

### 🔹 **Code Location**

```
apps/frontend/src/services/workout.service.ts
apps/frontend/src/app/(app)/workouts/[id]/page.tsx
```