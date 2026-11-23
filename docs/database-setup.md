# Supabase Database & Storage Setup — SARAR INDUSTRIES

This document outlines the setup process for Supabase PostgreSQL database tables, Row Level Security (RLS) policies, and Supabase Storage for product media.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create an account.
2. Click **New Project** and choose a project name (e.g., `sarar-industries`).
3. Set a strong database password and select the region nearest to your customers (e.g., `South Asia (Mumbai)` for India).
4. Wait for the database cluster to finish provisioning.

---

## 2. Obtain API Keys & URL

1. In the Supabase dashboard, open **Project Settings** > **API Keys**.
2. Copy the **Project URL** and the server-side **Secret key**.
3. Store them only in the backend environment:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=
   ```
   Never put this secret key in frontend code or commit it to Git. The backend still accepts the legacy `SUPABASE_SERVICE_ROLE_KEY` during migration.
---

## 3. Run Database Migrations

You can run the schema migrations directly in the Supabase Dashboard SQL Editor:

1. Open the **SQL Editor** in Supabase.
2. Open `database/schema.sql` from this repository.
3. Paste the contents into the SQL Editor and click **Run**.
4. The following tables will be created:
   - `brands`
   - `categories`
   - `products`
   - `product_images`
   - `users`
   - `enquiries`
   - Full-text search GIN indexes
   - Updated_at triggers

---

## 4. Apply Row Level Security (RLS) Policies

1. In the Supabase SQL Editor, open `database/policies/001_row_level_security.sql`.
2. Paste the SQL statements and click **Run**.
3. RLS ensures:
   - Public users can only read active brands, categories, and products.
   - Public users can only INSERT enquiries (cannot view or edit existing customer enquiries).
   - Only backend authenticated administrators have full read/write privileges.

---

## 5. Seed Initial Brands & Products

1. In the Supabase SQL Editor, open `database/seed/001_seed_brands_categories.sql`.
2. Run it to add SAKET and DWITECH brands, categories, and current catalogue products.
3. Create an administrator with a unique password. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend environment (password must be at least 16 characters), then run:
   ```bash
   npm run bootstrap:admin --prefix backend
   ```
4. Remove `ADMIN_PASSWORD` from production runtime variables after this one-time command. The application no longer seeds or displays shared default admin credentials.
## 6. Configure Supabase Storage for Product Images

1. In the Supabase dashboard, click **Storage**.
2. Click **Create a new bucket**:
   - Bucket name: `product-media`
   - Public bucket: **Enabled (Checked)**
3. Under **Policies**, ensure `product-media` has:
   - **Select policy**: Give public access to read files.
   - **Insert policy**: Allow authenticated / service_role to upload files.
4. When you upload product photographs in `/admin/products`, the backend automatically uploads the file to the `product-media` bucket and stores the public URL in PostgreSQL.
