# DragonSploit - Developer & Architecture Decision Log

This document tracks the key technical decisions, challenges, and solutions encountered during the development of the DragonSploit platform.

---

### Tooling & Environment
*   **IDE:** Visual Studio Code
*   **Database:** PostgreSQL (via Docker)
*   **ORM:** Prisma
*   **AI Pair Programmer:** Google's AI (Manus) was used for brainstorming, troubleshooting guidance, and documentation generation.

---

## 2025-09-18: Infrastructure Setup & Database Architecture

**Objective:** Establish a robust, local development environment and define a comprehensive database schema to serve as the project's foundation.

### 1. Decision: Local Development Environment using Docker

*   **Choice:** PostgreSQL running in a Docker container.
*   **Rationale:** To ensure a consistent, isolated, and reproducible development environment for all team members, eliminating "it works on my machine" issues. This aligns with modern DevOps best practices.

### 2. Challenge: Database Connection Failure (`P1000` & `P1001` Errors)

*   **Symptoms:** Initially, Prisma was unable to connect to the local Docker database, throwing `P1000: Authentication failed` errors. This led to a complex troubleshooting process.
*   **Troubleshooting Journey:**
    1.  **Hypothesis 1: Configuration Error.** All configuration files (`.env`, `docker-compose.yml`, `schema.prisma`) were meticulously checked and found to be correct. The issue persisted.
    2.  **Hypothesis 2: Network/Firewall Issue.** We attempted to switch to a cloud-based database (Supabase) to rule out local machine problems. This failed with a `P1001: Can't reach database server` error. `ping` commands to the Supabase domain also failed, while `ping` to `google.com` succeeded, indicating a potential network-level block.
    3.  **Hypothesis 3: Port Conflict.** After returning to the local Docker setup, we investigated the possibility of a port conflict.

*   **Solution:** The root cause was identified as a port conflict. Another process on the local machine was already occupying the default PostgreSQL port `5432`. The solution was to remap the port:
    *   Modified `docker-compose.yml` to map the host port `5433` to the container's port `5432` (`ports: - "5433:5432"`).
    *   Updated the `DATABASE_URL` in the `.env` file to point to `localhost:5433`.
    *   **Result:** The connection was immediately successful.

*   **Key Lesson Learned:** When facing persistent connection issues, always verify port availability on the host machine as a primary diagnostic step.

### 3. Decision: Comprehensive SaaS Database Schema

*   **Choice:** Moved from a basic schema to a full-fledged, multi-tenant SaaS architecture.
*   **Rationale:** To build a scalable and feature-rich platform from the ground up, accommodating future requirements for teamwork, security, and integration.
*   **Implementation:**
    *   Designed and implemented a complete schema in `schema.prisma` including models for `Organization`, `Membership`, `Invitation`, `Role`, `AuditLog`, `ApiToken`, and more.
    *   This structure supports core SaaS features like role-based access control (RBAC), team management, and security auditing.
    *   Successfully applied the schema to the database using the `npx prisma migrate dev --name add_full_saas_schema` command.

### 4. Milestone Achieved

*   A fully operational local development environment is now running.
*   A comprehensive and scalable database schema has been designed and deployed.
*   The project is now ready for the development of the core application logic (API services).

