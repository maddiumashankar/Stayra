# Stayra

> **Smart stays. Fair rent. Better living.**  
> An AI-native PG & Co-living accommodation ecosystem with automated SLA maintenance tracking, rent compensation, itemized utility billing, and persistent digital resident identities.

---

## 📑 Table of Contents
- [Architecture & Monorepo Structure](#-architecture--monorepo-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
- [Running the Services](#-running-the-services)
- [Database Management & Seeding](#-database-management--seeding)
- [Pre-configured Demo Accounts](#-pre-configured-demo-accounts)
- [Available npm Scripts](#-available-npm-scripts)
- [Roadmap & Milestone Progress](#-roadmap--milestone-progress)
- [Documentation Links](#-documentation-links)

---

## 🏛 Architecture & Monorepo Structure

Stayra is architected as an **npm workspaces monorepo** with strict type-safety across backend, mobile, and shared libraries:

```text
Stayra/
├── apps/
│   ├── backend/               # NestJS Modular Monolith API
│   │   ├── prisma/            # Prisma schema, SQLite/PostgreSQL migrations & seeders
│   │   ├── src/
│   │   │   ├── modules/       # Auth (JWT/OTP/RBAC), Health, Properties, etc.
│   │   │   ├── common/        # Filters, Interceptors, Guards, Zod validation pipes
│   │   │   └── database/      # PrismaService
│   │   └── .env.example       # Backend environment variables
│   │
│   └── mobile/                # React Native / Expo Router v3 application
│       ├── app/               # File-based routing: (auth), (resident), (owner), (modals)
│       ├── src/
│       │   ├── components/    # Atomic UI library (Button, Input, PropertyCard, SlaBadge)
│       │   ├── services/      # ApiClient and secure token storage
│       │   ├── stores/        # Zustand state stores (useStayraStore)
│       │   └── theme/         # Design tokens, typography & color system
│       └── metro.config.js    # Monorepo Metro bundler config
│
├── packages/
│   ├── shared-types/          # Shared TypeScript interfaces, DTOs & UserRole types
│   └── validation-schemas/    # Shared Zod runtime validation schemas
│
├── docker/                    # Docker Compose for PostGIS, Redis & MinIO
├── docs/                      # Architectural diagrams & design specifications
├── PRD.md                     # Comprehensive Product Requirements Document
└── TECHNICAL_ARCHITECTURE.md  # System topology, ERD & Milestones specification
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher (Node 20 LTS recommended via `nvm`)
- **npm**: `v10.x` or higher
- **Expo Go App** (optional): On iOS or Android if testing mobile on physical hardware

```bash
# Verify versions
node -v # >= v20.0.0
npm -v  # >= 10.0.0
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
From the repository root:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the example environment file for the backend:
```bash
cp apps/backend/.env.example apps/backend/.env
```
*(The default `.env` is pre-configured out-of-the-box for local SQLite development at `apps/backend/prisma/dev.db`)*.

### 3. Initialize & Migrate the Database
Run the initial Prisma migration to create all tables:
```bash
npm run db:migrate
```

### 4. Seed the Database with Realistic Test Data
Populate the database with demo users, PG properties, rooms, beds, tenancies, bills, and SLA tickets:
```bash
npm run db:seed
```

### 5. Build Shared Packages & Apps
```bash
npm run build
```

---

## 💻 Running the Services

### Start the Backend API (NestJS)
Runs the backend API with hot-reload in development:
```bash
npm run dev:backend
```
- **Base API URL**: `http://localhost:4000/api/v1`
- **Health Check**: `http://localhost:4000/api/v1/health`
- **Auth Endpoints**: `http://localhost:4000/api/v1/auth/*`

### Start the Mobile App (Expo)
Starts the Metro bundler for React Native:
```bash
npm run dev:mobile
```
- Press **`w`** in the terminal to view in a desktop web browser (`http://localhost:8081`).
- Press **`i`** to open in the iOS Simulator (macOS with Xcode).
- Press **`a`** to open in Android Emulator (Android Studio).
- Scan the printed QR code using the **Expo Go** mobile app on physical iOS/Android devices.

### Open Prisma Database GUI
To inspect or edit database tables visually:
```bash
npm run db:studio
```
- **Prisma Studio**: `http://localhost:5555`
*(Or inspect `apps/backend/prisma/dev.db` directly using the **SQLite Viewer** extension in VS Code).*

---

## 🔑 Pre-configured Demo Accounts

In development mode, phone login uses the static test OTP: **`123456`**.

| Role | Name | Phone Number | Default OTP | Notes / Context |
| :--- | :--- | :--- | :---: | :--- |
| **RESIDENT** | Rohan Verma | `+919876543220` | `123456` | Active tenant in Koramangala Hub (ID: `STR-RES-202609-0842`) |
| **RESIDENT** | Ananya Iyer | `+919876543221` | `123456` | Active tenant in HSR Layout Hub |
| **OWNER** | Suresh Reddy | `+919876543211` | `123456` | Operator of *Stayra Prime Koramangala* |
| **OWNER** | Vikram Malhotra | `+919876543212` | `123456` | Operator of *Stayra Living HSR Layout* |
| **ADMIN** | Stayra Admin | `+919876543210` | `123456` | Platform Super-Admin |

> 💡 **Tip:** On the mobile login screen (`apps/mobile/app/(auth)/login.tsx`), you can also tap the **"Resident Demo"** or **"PG Owner Demo"** shortcut buttons to log in instantly.

---

## 📜 Available npm Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev:backend` | Start the NestJS backend in watch/development mode |
| `npm run dev:mobile` | Start the Expo development server / Metro bundler |
| `npm run build` | Build all monorepo packages (`shared-types`, `validation-schemas`, `backend`) |
| `npm run test` | Run Jest unit tests across workspaces |
| `npm run type-check` | Run `tsc --noEmit` across all apps and packages |
| `npm run db:migrate` | Apply Prisma schema migrations to local SQLite database |
| `npm run db:seed` | Wipe and re-seed the database with realistic MVP sample data |
| `npm run db:studio` | Launch Prisma Studio web interface at `localhost:5555` |
| `npm run db:generate` | Regenerate Prisma Client types after schema changes |
| `npm run docker:up` | Spin up local Docker services (PostgreSQL PostGIS, Redis, MinIO) |
| `npm run docker:down` | Stop Docker services |

---

## 🗺️ Roadmap & Milestone Progress

```
[ Milestone 1 ] ──> [ Milestone 2 ] ──> [ Milestone 3 ] ──> [ Milestone 4 ] ──> [ Milestone 5 ] ──> [ Milestone 6 ]
  Repo Scaffold       Auth & RBAC        Discovery & Map     Tenancy & Ledger     SLA & Rent Credit    AI Multi-Agent
    [ COMPLETED ]       [ COMPLETED ]       [ IN PROGRESS ]        [ QUEUED ]          [ QUEUED ]          [ QUEUED ]
```

- [x] **Milestone 1: Scaffolding** (Workspaces, NestJS, Expo Router v3, Prisma models)
- [x] **Milestone 2: Identity & Auth** (Phone OTP, JWT rotation, Stayra ID generator, RBAC guards, Expo secure store)
- [ ] **Milestone 3: Discovery & Inventory** (PostGIS / geo-search, PG/Room inventory CRUD, interactive map & list filters)
- [ ] **Milestone 4: Tenancy Lifecycle & Ledger** (Digital tenancy state machine, double-entry ledger, bill runs, Razorpay payments)
- [ ] **Milestone 5: SLA Engine & Maintenance** (Ticket lifecycle, SLA countdown timers, auto rent credit calculation)
- [ ] **Milestone 6: AI Multi-Agent Gateway** (Natural language PG recommendation, complaint triage, billing anomaly detection)

---

## 📚 Documentation Links
- [Product Requirements Document (PRD)](./PRD.md)
- [Technical Architecture Specification](./TECHNICAL_ARCHITECTURE.md)
- [Visual System Architecture & Flows](./docs/)
