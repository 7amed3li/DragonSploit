# DragonSploit - Developer & Architecture Decision Log

This document tracks the key technical decisions, challenges, and solutions encountered during the development of the DragonSploit platform.

---

🛠 **Tooling & Environment**

* **IDE:** Visual Studio Code
* **Database:** PostgreSQL (via Docker)
* **ORM:** Prisma
* **API Documentation:** Swagger (OpenAPI)
* **AI Pair Programmer:** Google's AI (Manus) — used for brainstorming, troubleshooting guidance, and documentation generation.

**Rationale for Prisma:**
Prisma was chosen over other ORMs (TypeORM, Sequelize) due to its superior type-safety, reducing runtime errors when working with TypeScript. Its auto-generated client and intuitive API for complex queries (e.g., relational data fetching) streamlined the development of tenant-aware logic.

---

📅 **2025-09-19: Core SaaS API - Authentication & Authorization**

1. **Decision: API Structure & Initial Server Setup**

   * **Choice:** A layered architecture (routes → controllers → services) was implemented to enforce Separation of Concerns.
   * **Rationale:** More maintainable, scalable, and testable code.
   * **Implementation:** Initial Express server in `src/index.ts`; integrated `ts-node` and `nodemon` for smoother dev workflow.

2. **Challenge: Spontaneous Server Shutdown**

   * **Symptom:** Node.js server exited immediately despite `app.listen()`.
   * **Solution:** Refactored entry point into an async main function, ensuring Prisma and Swagger integrations didn’t terminate the process.
   * **Key Lesson:** Node.js apps must keep the event loop alive. Wrapping startup logic in a main function ensures external connections (like Prisma) don’t prematurely terminate the process.

3. **Decision: Implementing a Full Authentication System**

   * **Choice:** JWT-based authentication.
   * **Implementation:**

     * `bcryptjs` for password hashing.
     * `jsonwebtoken` for signing/verifying tokens.
     * Routes: `/api/auth/register`, `/api/auth/login`.
     * Middleware `kimlikDoğrula` for protected routes.

4. **Decision: Implementing Tenant-Aware Authorization**

   * **Challenge:** Users could access all tenants’ data.
   * **Solution:**

     * Organization creation (`kurumOlustur`) auto-generates Membership with ADMIN role.
     * Data queries now scoped via Membership table.
   * **Result:** Strict tenant-level data isolation.

5. **Decision: Centralizing API Documentation with Swagger**

   * **Choice:** Integrated `swagger-jsdoc` + `swagger-ui-express`.
   * **Enhancements:** Centralized schemas, added JWT bearerAuth support in Swagger UI.

✅ **Milestone Achieved:**

* Stable, production-ready dev server.
* Complete authentication & authorization system.
* Multi-tenant platform ready for next features.

---

📅 **2025-09-24: Implementing Core Business Logic - Target Management**

1. **Decision: Structuring Target Endpoints**

   * **Choice:** Full CRUD endpoints for `Target`:

     * `POST /api/targets` → Create target.
     * `GET /api/targets` → List targets by organization.
     * `GET /api/targets/{id}` → Retrieve target by ID.
     * `DELETE /api/targets/{id}` → Delete target.
   * **Rationale:** Standard RESTful pattern covers all resource operations.

2. **Challenge: Ensuring Tenant-Scoped Target Management**

   * **Symptom:** Preventing cross-organization access by ID.
   * **Solution:**

     * **POST:** Verify `organizationId` belongs to user’s org.
     * **GET (list):** Require `organizationId` query param, verify membership.
     * **GET/DELETE by ID:** Ensure target’s `organizationId` matches user’s org.
   * **Key Lesson:** Authorization must apply at both endpoint and data levels.

3. **Decision: API Input Validation**

   * **Choice:** Integrated `express-validator`.
   * **Implementation:**

     * POST validation:

       * `name` → non-empty string.
       * `url` → valid URL.
       * `organizationId` → valid UUID.
     * Centralized middleware returns `400 Bad Request` with clear errors.

4. **Update: Swagger Documentation for Targets**

   * **Action:** Documented new Target endpoints.
   * **Enhancements:**

     * Defined POST body schema.
     * Added required `organizationId` param for GET.
     * Documented 401 (Unauthorized), 403 (Forbidden), 404 (Not Found).

✅ **Milestone Achieved:**

* Full CRUD for Targets implemented & secured.
* Multi-tenancy enforcement across Target operations.
* Developer-friendly API with validation + up-to-date Swagger.

🚀 **Next Steps:**

* **Implement Scan Module:**

  * `POST /api/scans` → initiate scan.
  * `GET /api/scans/{id}` → check status/results.
* **Develop Scanning Engine:**

  * Decide architecture (RabbitMQ / job manager).
* **Flesh out User Roles & Permissions:**

  * E.g., restrict `DELETE` to ADMIN role.

---

📅 **2025-09-27: Building the Scan Module & Intensive Debugging**

1. **Decision: Implementing the Scan API Endpoints**

   * **Choice:** Created a secure, tenant-aware CRUD-like set of endpoints for `Scan`:

     * `POST /api/scans` → Initiate scan.
     * `GET /api/scans` → List scans by organization.
     * `GET /api/scans/{id}` → Retrieve scan status/details.
   * **Rationale:** Provides a complete interface for managing scan lifecycles with strict security boundaries.

2. **Challenge: Cross-Component Integration & Type-Safety**

   * **Symptoms:** TypeScript errors (TSError) + runtime `500 Internal Server Error`.
   * **Solutions:**

     * Fixed missing Prisma back-relations (`Organization` ↔ `ScanConfiguration`).
     * Converted `undefined` to `null` in `configurationId || null`.
     * Extended Express `Request` type to include `kullanici`.
     * Corrected import paths (`../services/scans.service`).

3. **Challenge: API & Browser Integration (CORS & JSON Parsing)**

   * **Symptoms:** Swagger UI failed (`Failed to fetch`, `CORS`, `400 Bad Request`).
   * **Solutions:**

     * Enabled `cors` middleware in `src/index.ts`.
     * Fixed JSON syntax (removed trailing commas).

4. **Decision: Refining Authorization Logic for Better UX**

   * **Problem:** Generic `403 Forbidden` errors lacked clarity.
   * **Solution:**

     * Step 1: Query for resource — if missing → `404 Not Found`.
     * Step 2: Check permissions — if unauthorized → `403 Forbidden`.
   * **Result:** Clearer, developer-friendly API responses.

✅ **Milestone Achieved:**

* Fully implemented and tested Scan API module.
* Robust error handling + CORS support.
* Precise authorization and developer-friendly UX.
* Core functionality for creating & monitoring scans completed.

🚀 **Next Steps:**

* **Background Job Processing:** Integrate BullMQ + Redis to offload scan execution.
* **Worker Development:** Build worker process to consume jobs, simulate scans (e.g., HTTP request), and update status (`RUNNING → COMPLETED/FAILED`).

