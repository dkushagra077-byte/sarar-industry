# Production Deployment Guide — SARAR INDUSTRIES

This project deploys as one Node.js web service: Webpack builds the React app into `frontend/dist`, and Express serves those files and the `/api` routes. The repository includes a Render Blueprint (`render.yaml`) and pins Node.js with `.node-version`.

## 1. Prepare the database

1. Create a new Supabase project and copy its Project URL and server Secret key.
2. Run `database/schema.sql` and `database/policies/001_row_level_security.sql` in the Supabase SQL Editor. `database/schema.sql` contains `DROP TABLE` statements: run it only once on a new, empty project. Rerunning it deletes the existing tables and their data.
3. Run `database/seed/001_seed_brands_categories.sql` to add the current brands, categories, and catalogue products.
4. Create the administrator as described below. Do not use a shared/default password.

Use the new Supabase `SUPABASE_SECRET_KEY` on the backend. The legacy `SUPABASE_SERVICE_ROLE_KEY` is accepted temporarily for migration. Never put either key in browser code or Git.

## 2. Push the finished repository to GitHub

Check that `backend/.env` is ignored and that no credentials are staged. Keep secrets out of Git.

## 3. Create a Render Web Service

In Render, choose **New > Blueprint** and connect `dkushagra077-byte/sarar-industry`. Render reads `render.yaml` from the repository root. The Blueprint selects Node.js 24.22.1, deploys the `main` branch, builds the frontend, serves the API and frontend from one service, and checks `/api/health`.

The Blueprint prompts for `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. Enter the Project URL and server Secret key from Supabase. It generates a private `JWT_SECRET` automatically.

The equivalent build and start commands are:

**Build command**
```bash
npm ci --prefix backend && npm ci --prefix frontend && npm run build --prefix frontend
```

**Start command**
```bash
node backend/src/server.js
```

The backend listens on the host-provided `PORT` and binds to `0.0.0.0`.

## 4. Configure the production environment

The Blueprint sets `NODE_ENV=production`, generates `JWT_SECRET`, and sets `SUPABASE_STORAGE_BUCKET=product-media`. It asks for `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. Render provides `RENDER_EXTERNAL_URL`, which the backend uses as `FRONTEND_URL` by default. If you later attach a custom domain, set `FRONTEND_URL` to that site's origin in Render and update the SEO URLs described below.

Use the host dashboard’s secret environment-variable fields. Do not upload the `.env` file or put secrets into the source repository. Production startup checks that the database and required tables are available; a missing database configuration prevents startup.

Production enquiry retention uses Supabase, not the local JSON fallback. New enquiries appear in the administrator dashboard; the site does not send enquiry email notifications. Create the public `product-media` Supabase Storage bucket before using admin image uploads.

## 5. Create the administrator

After configuring the Supabase values in `backend/.env`, set a unique `ADMIN_PASSWORD` of at least 16 characters there and choose the admin email with `ADMIN_EMAIL`. Run the one-time command from the repository root to create the user in Supabase:

```bash
npm run bootstrap:admin --prefix backend
```

Remove the temporary `ADMIN_PASSWORD` from the local `.env` after setup. Do not add it to Render; admin credentials are stored as a password hash in Supabase. The application and seed do not include a shared default admin password.

## 6. Deploy and review

Wait for the service to become Live. Check `/api/health`, the home page, product pages and product images. Submit a test enquiry and verify it appears in Supabase and the administrator dashboard. Confirm that the admin login works with the unique password.

The Blueprint uses Render's Free plan to avoid selecting a paid plan on your behalf. Free services may sleep after inactivity and use an ephemeral filesystem; enquiry records remain in Supabase. The first request after a sleep can take about a minute. Choose a paid plan in Render if you need an always-on site.

## 7. Attach a domain

In the Render service settings, add the customer’s domain, configure the DNS records Render provides, then verify the domain. Render provisions HTTPS for custom domains. Update `FRONTEND_URL`, `frontend/public/sitemap.xml`, `frontend/public/robots.txt`, and the Open Graph URL/image if the final domain differs from `www.sararindustries.com`.
