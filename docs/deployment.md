# Production Deployment Guide — SARAR INDUSTRIES

This project deploys as one Node.js web service: Webpack builds the React app into `frontend/dist`, and Express serves those files and the `/api` routes.

## 1. Prepare the database

1. Create a Supabase project and copy its Project URL and server Secret key.
2. Run `database/schema.sql` and `database/policies/001_row_level_security.sql` in the Supabase SQL Editor.
3. Run `database/seed/001_seed_brands_categories.sql` to add the current brands, categories, and catalogue products.
4. Create the administrator as described below. Do not use a shared/default password.

Use the new Supabase `SUPABASE_SECRET_KEY` on the backend. The legacy `SUPABASE_SERVICE_ROLE_KEY` is accepted temporarily for migration. Never put either key in browser code or Git.

## 2. Push the finished repository to GitHub

Check that `backend/.env` is ignored and that no credentials are staged. Keep secrets out of Git.

## 3. Create a Render Web Service

Connect the GitHub repository and use the repository root. Set:

**Build command**
```bash
npm ci --prefix backend && npm ci --prefix frontend && npm run build --prefix frontend
```

**Start command**
```bash
node backend/src/server.js
```

The backend listens on the host-provided `PORT` and binds to `0.0.0.0`.

## 4. Add production environment variables in the Render dashboard

Set `NODE_ENV=production`, `FRONTEND_URL` to the public site origin, a random unique `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `SUPABASE_STORAGE_BUCKET=product-media`.

Use the host dashboard’s secret environment-variable fields. Do not upload the `.env` file or put secrets into the source repository. Production startup checks that the database and required tables are available; a missing database configuration prevents startup.

Production enquiry retention uses Supabase, not the local JSON fallback. New enquiries appear in the administrator dashboard; the site does not send enquiry email notifications.

## 5. Create the administrator

Temporarily set `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` of at least 16 characters in the service environment. Run the one-time command with those settings available:

```bash
npm run bootstrap:admin --prefix backend
```

Remove `ADMIN_PASSWORD` from the production runtime variables after the administrator is created. The application and seed no longer include a default admin password.

## 6. Deploy and review

Wait for the service to become Live. Check `/api/health`, the home page, product pages and product images. Submit a test enquiry and verify it appears in Supabase and the administrator dashboard. Confirm that the admin login works with the unique password.

## 7. Attach a domain

In the Render service settings, add the customer’s domain, configure the DNS records Render provides, then verify the domain. Render provisions HTTPS for custom domains. Update `FRONTEND_URL`, `frontend/public/sitemap.xml`, `frontend/public/robots.txt`, and the Open Graph URL/image if the final domain differs from `www.sararindustries.com`.
