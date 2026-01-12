# 🐉 DragonSploit

**DragonSploit** is an advanced, AI-powered security scanning platform designed to detect complex vulnerabilities like SQL Injection (SQLi) using a combination of deterministic scanning and intelligent, context-aware AI agents.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Node.js](https://img.shields.io/badge/runtime-Node.js-green)
![Status](https://img.shields.io/badge/status-Active-success)

---

## 🚀 Features

- **AI-Powered Scanning**: Uses Local LLMs (Ollama) and Cloud AI (Gemini) to generate context-aware payloads.
- **Model Context Protocol (MCP)**: Fully compliant MCP server for integration with AI agents (e.g., Claude Desktop).
- **Hybrid Engine**: Combines high-speed deterministic scanning with intelligent AI fallback.
- **WAF Evasion**: Advanced obfuscation engine to bypass Web Application Firewalls.
- **Multi-Vector Support**: Detects In-Band, Boolean-Based, Time-Based, and Out-of-Band SQLi.
- **Enterprise Security**: Hardened backend with Helmet, Rate Limiting, and HPP protection.
- **Distributed Architecture**: Scalable worker system using BullMQ and Redis.

## 🛠️ Tech Stack

- **Backend**: Node.js, TypeScript, Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Queue**: Redis, BullMQ
- **AI**: Ollama (Local), Google Gemini (Cloud)
- **Protocol**: Model Context Protocol (MCP)

## 📋 Prerequisites

- **Node.js**: v18+
- **Docker**: For running PostgreSQL and Redis
- **Ollama**: For local AI scanning (optional but recommended)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/7amed3li/DragonSploit.git
    cd DragonSploit/backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment**:
    Copy `.env.example` to `.env` and configure your keys.
    ```bash
    cp .env.example .env
    ```

4.  **Start Infrastructure**:
    ```bash
    docker-compose up -d
    ```

5.  **Initialize Database**:
    ```bash
    npx prisma migrate dev
    ```

## 🏃 Usage

### Development Server
Start the API server:
```bash
npm run dev
```

### Worker Process
Start the background worker:
```bash
npm run dev:worker
```

### MCP Server
Start the MCP server (for AI agent integration):
```bash
npm run mcp
```

### Launch a Scan
Run a test scan via CLI:
```bash
npm run launch-scan
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
