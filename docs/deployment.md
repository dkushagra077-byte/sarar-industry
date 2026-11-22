# Production Deployment Guide — SARAR INDUSTRIES

This guide describes how to deploy the SARAR INDUSTRIES corporate website to a public domain for high availability, security, and global accessibility.

---

## Architecture Overview

The application is designed for versatile production deployment:

1. **Unified Deployment (Recommended)**:
   - Build the React frontend with Webpack (`npm run build`).
   - Run the Node.js Express backend server (`node backend/src/server.js`).
   - Express serves the REST API under `/api` and automatically serves the compiled React SPA files from `frontend/dist`.
   - Host on platforms like Render, Railway, DigitalOcean, Heroku, or a Linux VPS.

2. **Split Deployment**:
   - Frontend deployed on Vercel, Netlify, or Cloudflare Pages.
   - Backend deployed on Render, Railway, AWS ECS, or Fly.io.
   - Connected via `CORS_ORIGIN` and `REACT_APP_API_URL`.

---

## Option 1: Unified Deployment on Render / Railway (Recommended)

### Step 1: Push Repository to GitHub
```bash
git init
git add .
git commit -m "Initial commit: SARAR INDUSTRIES full-stack corporate website"
git remote add origin https://github.com/your-username/sarar-industries.git
git push -u origin main
```

### Step 2: Create Web Service on Render / Railway
1. Click **New Web Service** and select your GitHub repository.
2. Configure settings:
   - **Environment**: `Node`
   - **Build Command**:
     ```bash
     npm run install:all && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
3. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave default assigned by host)
   - `SUPABASE_URL`: `https://[your-project-id].supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `[your-service-role-key]`
   - `SUPABASE_ANON_KEY`: `[your-anon-key]`
   - `JWT_SECRET`: `[generate-a-secure-random-string]`
4. Click **Deploy**.

---

## Option 2: Deploying to a Linux VPS (Ubuntu / Debian with Nginx & PM2)

### Step 1: Server Setup
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm nginx git -y
sudo npm install -g pm2
```

### Step 2: Clone and Build
```bash
git clone https://github.com/your-username/sarar-industries.git /var/www/sarar-industries
cd /var/www/sarar-industries
npm run install:all
npm run build
```

### Step 3: Configure Environment
```bash
cp backend/.env.example backend/.env
nano backend/.env
```
Fill in production Supabase credentials and JWT secret.

### Step 4: Run Application with PM2
```bash
pm2 start backend/src/server.js --name "sarar-industries"
pm2 save
pm2 startup
```

### Step 5: Configure Nginx as Reverse Proxy
Create `/etc/nginx/sites-available/sararindustries.com`:
```nginx
server {
    listen 80;
    server_name sararindustries.com www.sararindustries.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/sararindustries.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo system-service nginx reload
```

### Step 6: Install Free SSL Certificate (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d sararindustries.com -d www.sararindustries.com
```

---

## Production Security Checklist

- [x] Passwords hashed using `bcrypt` (10 rounds).
- [x] JWT sessions with expiration.
- [x] Supabase Row Level Security (RLS) active on all tables.
- [x] Rate limiting on authentication and enquiry forms to prevent DDoS/spam.
- [x] Security HTTP headers configured via `helmet`.
- [x] Input sanitization and validation on all routes via `express-validator`.
- [x] Service role key never exposed to client-side frontend code.
- [x] WhatsApp click-to-chat pre-filled links verified for desktop and mobile.
