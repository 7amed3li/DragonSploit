# DragonSploit Pro 🐉

[![License](https://img.shields.io/github/license/7amed3li/DragonSploit?style=for-the-badge )](https://github.com/7amed3li/DragonSploit/blob/main/LICENSE )
[![Language](https://img.shields.io/github/languages/top/7amed3li/DragonSploit?style=for-the-badge )](https://github.com/7amed3li/DragonSploit )


**An intelligent, context-aware vulnerability scanning platform, powered by AI.**

DragonSploit is not just another scanner. It's an integrated ecosystem designed to revolutionize how web application vulnerabilities are discovered. By combining **deep reconnaissance**, **contextual analysis**, and **generative AI**, DragonSploit moves beyond blind fuzzing to deliver high-precision, low-noise security assessments.

![DragonSploit In Action](https://i.imgur.com/YOUR_ANIMATED_GIF_HERE.gif )
*A quick demo showing the end-to-end scan process: from job creation to vulnerability detection.*

---

## ✨ Core Philosophy: Understand, then Attack

Traditional scanners are noisy. They generate thousands of false positives and treat every target as a black box. DragonSploit operates on a different principle:

1.  **Fingerprint First:** It begins by identifying the target's technology stack (frameworks, web servers, languages).
2.  **Reason and Strategize:** Based on the fingerprint, it selects the most relevant attack vectors. No more testing for ASP.NET vulnerabilities on a LAMP stack.
3.  **AI-Powered Payloads:** For complex scenarios, it leverages a generative AI to create novel, context-specific payloads, mimicking a human pen-tester's thought process.
4.  **Certainty-Based Validation:** Every finding is rigorously verified to eliminate false positives.

---

## 🎯 Who is this for? (Use Cases)

DragonSploit is built for a variety of security-conscious professionals:

-   **Penetration Testers:** Automate initial reconnaissance and identify low-hanging fruit, allowing you to focus on more complex, high-impact vulnerabilities.
-   **DevSecOps Teams:** Integrate DragonSploit into your CI/CD pipeline to automatically scan applications before they reach production, shifting security left.
-   **Security-Minded Developers:** Understand how your applications can be attacked and proactively secure your code against common and advanced threats.
-   **Security Researchers:** Use the platform as a framework for testing new vulnerability detection techniques and AI-driven attack strategies.

---

## 🚀 Features

-   **Multi-Tenant SaaS Architecture:** Securely manage multiple organizations and targets from a single platform.
-   **Intent-Based Orchestrator:** A central "brain" that dispatches jobs to a fleet of specialized workers.
-   **Specialist Worker Army:** Dedicated workers for specific vulnerabilities (SQLi, XSS, etc.) and technologies (WordPress, Nginx, etc.).
-   **Conversational AI Pen-Tester:** An AI agent that reasons about its attack strategy and adapts based on the target's responses.
-   **Resilient & Fault-Tolerant:** Built-in mechanisms to handle API rate limits, job failures, and external service outages gracefully.
-   **RESTful API with Swagger Docs:** A fully documented API for easy integration and management.

---

## 🛠️ Tech Stack

| Category              | Technology                                                              |
| --------------------- | ----------------------------------------------------------------------- |
| **Frontend**          | React 18, TypeScript, Tailwind CSS, Shadcn/ui, TanStack Query           |
| **Backend**           | Node.js, Express.js, TypeScript                                         |
| **Database & ORM**    | PostgreSQL, Prisma                                                      |
| **Job Queue System**  | Redis, BullMQ                                                           |
| **Authentication**    | JWT, Passport.js, bcrypt                                                |
| **AI Engine**         | Google Gemini API                                                       |
| **Containerization**  | Docker, Docker Compose                                                  |
| **API Documentation** | Swagger / OpenAPI                                                       |

---

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18+)
-   Docker & Docker Compose
-   A running PostgreSQL instance
-   A running Redis instance
-   `pnpm` (or `npm`/`yarn`)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/7amed3li/DragonSploit.git
    cd DragonSploit/backend
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Configure your environment:**
    -   Copy the `.env.example` file to `.env`.
    -   Fill in your database credentials, JWT secret, and `GEMINI_API_KEY`.
    ```sh
    cp .env.example .env
    # nano .env
    ```

4.  **Apply database migrations:**
    ```sh
    pnpm prisma migrate dev
    ```

5.  **Run the application:**
    -   Open two separate terminals in the `backend` directory.

    -   **Terminal 1: Start the API Server**
        ```sh
        pnpm dev
        ```
        *API will be available at `http://localhost:3001`*
        *Swagger docs at `http://localhost:3001/api-docs`*

    -   **Terminal 2: Start the Worker Fleet**
        ```sh
        pnpm dev:worker
        ```
        *The workers will now listen for jobs on the Redis queue.*

---

## 📖 Project History & Key Decisions

This project's journey was forged in the fire of debugging and strategic pivots. The `DEVELOPER_LOG.md` documents the entire saga, but here are the highlights:

-   **The "Simple is Better" Pivot:** We abandoned complex orchestration engines like Temporal and Camunda in favor of a lean, powerful BullMQ + Redis setup, boosting development velocity tenfold.
-   **The "Monolith-First" Approach:** A standalone worker microservice created a "Prisma Client Nightmare." We merged the API and Worker into a single project to create a single source of truth, solving all type-safety issues.
-   **The "Orchestrator & Army" Architecture:** We evolved from a single worker to a central "Orchestrator" that delegates tasks to a fleet of specialized workers, forming the core of our intelligent scanning engine.
-   **The "Conversational AI" Breakthrough:** We transformed our AI from a simple fuzzer into a strategic partner by engineering its prompt to force it to *reason* about its choices, complete with a "selective memory" to manage context length.
-   **The "Total War" Doctrine:** We rewrote the scanner's logic to relentlessly hunt for *all* vulnerabilities, not just the first one it finds, ensuring comprehensive reports.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [CONTRIBUTING.md](https://github.com/7amed3li/DragonSploit/blob/main/CONTRIBUTING.md ) for details on our code of conduct and the process for submitting pull requests.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Hamed Mohammed Abdulaleem Kamel

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hamed_Kamel-0077B5?style=for-the-badge&logo=linkedin )](https://www.linkedin.com/in/h-amedmohamed/ )


Project Link: [https://github.com/your-username/dragonsploit-pro](https://github.com/your-username/dragonsploit-pro )
