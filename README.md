# 💊 PharmaPulse - Pharmacy Management System

**PharmaPulse** is a full-stack enterprise pharmacy inventory and sales management system. It features a modern **Angular Single Page Application (SPA)** frontend coupled with a robust, layered **.NET Clean Architecture** Web API backend.

---

## 🏗️ Repository Architecture

This repository is organized as a monorepo containing both the backend service and the frontend web application:

```text
PharmaPulse/
├── PharmaPulse/                   # 🔴 Backend Solution (.NET Clean Architecture)
│   ├── PharmaPulse.Api            # REST API controllers & Web host
│   ├── PharmaPulse.Application    # Business logic, use cases & DTOs
│   ├── PharmaPulse.Domain         # Core domain entities & business rules
│   ├── PharmaPulse.Infrastructure # Data access, database context & repositories
│   └── PharmaPulse.slnx           # .NET Solution file
│
├── PharmaPulse.App/               # 🔵 Frontend Application (Angular & Material)
│   ├── src/                       # Angular source code (components, services, state)
│   ├── package.json               # Node modules & frontend dependencies
│   └── README.md                  # Detailed Frontend documentation
│
└── README.md                      # Root documentation (This file)