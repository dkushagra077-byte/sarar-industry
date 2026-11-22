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

1. In your Supabase project dashboard, navigate to **Project Settings** → **API**.
2. Note the following values:
   - **Project URL**: `https://xyzcompany.supabase.co`
   - **anon / public key**: Used for public frontend client (if needed)
   - **service_role key**: Used securely on the Node.js backend
3. Add these to your `backend/.env` file:
   ```env
   SUPABASE_URL=https://xyzcompany.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

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
2. Paste and click **Run**.
3. This creates:
   - **SAKET** brand and its industrial insulation & sealing categories.
   - **DWITECH** brand and its rubber & engineered component categories.
   - Initial products with authentic specifications.
   - Default administrator account:
     - Email: `sararindustries@gmail.com`
     - Password: `Admin@Sarar2024!`

---

## 6. Configure Supabase Storage for Product Images

1. In the Supabase dashboard, click **Storage**.
2. Click **Create a new bucket**:
   - Bucket name: `product-media`
   - Public bucket: **Enabled (Checked)**
3. Under **Policies**, ensure `product-media` has:
   - **Select policy**: Give public access to read files.
   - **Insert policy**: Allow authenticated / service_role to upload files.
4. When you upload product photographs in `/admin/products`, the backend automatically uploads the file to the `product-media` bucket and stores the public URL in PostgreSQL.
