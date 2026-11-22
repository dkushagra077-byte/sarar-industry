# Installation Guide — SARAR INDUSTRIES

This document provides step-by-step instructions to set up the SARAR INDUSTRIES full-stack corporate website on your local development workstation.

---

## 1. System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v18.0.0 or later (v20+ recommended)
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

# Supabase PostgreSQL Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_STORAGE_BUCKET=product-media

# Authentication
JWT_SECRET=your-random-jwt-secret-key-32-chars-minimum
JWT_EXPIRES_IN=7d

# Official Company Information
COMPANY_NAME=SARAR INDUSTRIES
CONTACT_PERSON=Siddharth Dwivedi
CONTACT_PHONE=+919123841340
CONTACT_EMAIL=sararindustries@gmail.com
WHATSAPP_NUMBER=919123841340
```

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

## 7. Admin Credentials for Local Testing

- **URL**: `http://localhost:3000/admin/login` (or `http://localhost:5000/admin/login`)
- **Email**: `sararindustries@gmail.com`
- **Password**: `Admin@Sarar2024!`
