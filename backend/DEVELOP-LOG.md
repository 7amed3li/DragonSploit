DragonSploit - Developer & Architecture Decision Log

This document tracks the key technical decisions, challenges, and solutions encountered during the development of the DragonSploit platform.

🛠 Tooling & Environment

IDE: Visual Studio Code

Database: PostgreSQL (via Docker)

ORM: Prisma

API Documentation: Swagger (OpenAPI)

AI Pair Programmer: Google's AI (Manus) — used for brainstorming, troubleshooting guidance, and documentation generation.

Rationale for Prisma:
Prisma was chosen over other ORMs (TypeORM, Sequelize) due to its superior type-safety, reducing runtime errors when working with TypeScript. Its auto-generated client and intuitive API for complex queries (e.g., relational data fetching) streamlined the development of tenant-aware logic.

📅 2025-09-19: Core SaaS API - Authentication & Authorization
1. Decision: API Structure & Initial Server Setup

Choice: A layered architecture (routes → controllers → services) was implemented to enforce Separation of Concerns.

Rationale: More maintainable, scalable, and testable code.

Service layer → business logic

Controller layer → HTTP requests/responses

Router layer → URL mapping

Implementation:

Initial Express server in src/index.ts.

Integrated ts-node and nodemon for a smooth dev workflow.

2. Challenge: Spontaneous Server Shutdown

Symptom: Node.js server exited immediately after starting (despite app.listen()).

Troubleshooting:

Hypothesis 1: Code error → ruled out.

Hypothesis 2: Environment issue → tested with minimal server (test.ts), which worked.

Narrowed cause: PrismaClient or swagger-jsdoc integration.

Solution:

Refactored entry point into a main async function.

Ensured server lifecycle is explicitly tied to long-running task (app.listen).

Key Lesson:
Node.js apps must keep the event loop alive. Wrapping startup logic in a main function ensures external connections (like Prisma) don’t prematurely terminate the process.

3. Decision: Implementing a Full Authentication System

Choice: JWT-based authentication.

Rationale: Industry standard for stateless APIs; secure and flexible.

Implementation:

Added bcryptjs (password hashing) & jsonwebtoken (token signing/verification).

POST /api/auth/register → Validates data, hashes passwords (never stored as plain text).

POST /api/auth/login → Validates credentials, returns signed JWT.

Created reusable middleware kimlikDoğrula → verifies JWT for protected routes.

4. Decision: Implementing Tenant-Aware Authorization

Challenge: Users could access all data across tenants → major security flaw.

Solution:

Automatic Membership:

kurumOlustur uses prisma.$transaction → creates Organization + Membership record linking creator with ADMIN role.

Scoped Data Retrieval:

kurumlariListele now queries Membership table → returns only organizations tied to current user.

Result: Strict data isolation → users can only access organizations they belong to.

5. Decision: Centralizing API Documentation with Swagger

Challenge: Manual documentation updates were error-prone; protected routes hard to test.

Choice: Integrated swagger-jsdoc + swagger-ui-express.

Rationale: "Documentation as Code" → always synced with implementation.

Implementation Fixes:

Centralized Schemas: Defined models (User, Organization) in components.schemas.

Authorization in UI: Added bearerAuth → enabled "Authorize" button in Swagger UI for JWT testing.

Result: Self-documenting, interactive, developer-friendly API portal.

✅ Milestone Achieved

Stable, production-ready local dev server.

Complete, secure authentication & authorization system.

API is now a multi-tenant platform, ready for further features.