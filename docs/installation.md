# Installation Guide — SARAR INDUSTRIES

This document provides step-by-step instructions to set up the SARAR INDUSTRIES full-stack corporate website on your local development workstation.

---

## 1. System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v22.0.0 or later (the deployment configuration pins v24.22.1)
- **Package Manager**: npm v9+
- **Version Control**: Git

---

## 2. Clone the Repository

```bash
git clone https://github.com/your-username/sarar-industries.git
cd sarar-industries
```

---

## 3. Dependency Installation

The project uses a clean modular structure separating frontend and backend. You can install all dependencies from the root directory:

```bash
# Using root npm script
npm run install:all
```

Or install separately:
```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

---

## 4. Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your preferred configuration:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=
TRUST_PROXY=0

# Server-side Supabase key only
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=<server-side-secret-from-Supabase>
SUPABASE_STORAGE_BUCKET=product-media

# Local fallback admin account (keep private)
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=use-a-unique-password-at-least-16-characters

# Production must use a random, unique secret
JWT_SECRET=generate-a-random-secret-for-this-environment
JWT_EXPIRES_IN=7d

```

Enquiries are stored in the database and reviewed from the administrator dashboard. The website does not send email notifications for new enquiries.

In production, configure a real Supabase project. Production startup now fails if Supabase, the required tables, a strong `JWT_SECRET`, or `FRONTEND_URL` are missing. The local JSON enquiry store is for development only and may not persist on hosted filesystems.
---

## 5. Running the Application in Development Mode

You can run both backend and frontend concurrently:

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```
Backend will start on `http://localhost:5000`.

### Terminal 2: Frontend Webpack Dev Server
```bash
cd frontend
npm start
```
Frontend Webpack development server will start on `http://localhost:3000` with hot module replacement and automatic API proxying to port 5000.

---

## 6. Running Integration Verification Tests

Verify backend endpoints, database models, and authentication:

```bash
npm run test:backend
```
Expected output:
```
GET /api/health 200
GET /api/company-info 200
GET /api/brands 200
GET /api/brands/saket 200
GET /api/products 200
GET /api/products/search 200
POST /api/auth/login 200
GET /api/stats (protected) 200
POST /api/enquiries (public) 201
GET /api/enquiries (admin) 200
ALL BACKEND API VERIFICATIONS PASSED 100%
```

---

## 7. Administrator Setup

In local development, use the private `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`. For Supabase, set those variables temporarily and run `npm run bootstrap:admin --prefix backend`, then remove `ADMIN_PASSWORD` from the production runtime environment. The login page does not contain shared credentials.
