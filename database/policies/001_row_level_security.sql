-- ====================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- SARAR INDUSTRIES FULL-STACK SYSTEM
-- ====================================================================

-- 1. Enable Row Level Security on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 2. BRANDS POLICIES
-- Public read access for active brands
CREATE POLICY "Public users can view active brands"
    ON brands FOR SELECT
    USING (status = 'active');

-- Service role and admin backend has full management access
CREATE POLICY "Admin full access on brands"
    ON brands FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 3. CATEGORIES POLICIES
-- Public read access for active categories
CREATE POLICY "Public users can view active categories"
    ON categories FOR SELECT
    USING (status = 'active');

-- Service role and admin backend has full management access
CREATE POLICY "Admin full access on categories"
    ON categories FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 4. PRODUCTS POLICIES
-- Public read access for active products
CREATE POLICY "Public users can view active products"
    ON products FOR SELECT
    USING (status = 'active');

-- Service role and admin backend has full management access
CREATE POLICY "Admin full access on products"
    ON products FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5. PRODUCT IMAGES POLICIES
-- Public read access for product images
CREATE POLICY "Public users can view product images"
    ON product_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products
            WHERE products.id = product_images.product_id
            AND products.status = 'active'
        )
    );

-- Service role and admin backend has full management access
CREATE POLICY "Admin full access on product images"
    ON product_images FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 6. USERS POLICIES
-- Never expose users table to public
CREATE POLICY "Admin full access on users"
    ON users FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 7. ENQUIRIES POLICIES
-- Public can submit enquiries (INSERT only)
CREATE POLICY "Public users can submit enquiries"
    ON enquiries FOR INSERT
    WITH CHECK (true);

-- Service role and admin backend has full management access to read, update status, add notes
CREATE POLICY "Admin full access on enquiries"
    ON enquiries FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- SUPABASE STORAGE BUCKET POLICIES FOR 'product-media'
-- ====================================================================

-- Note: In Supabase dashboard or via SQL, create the bucket:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-media', 'product-media', true);

-- Storage policy: Anyone can view product images
-- CREATE POLICY "Public Access to Product Images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'product-media');

-- Storage policy: Service role can upload/delete images
-- CREATE POLICY "Admin Upload to Product Images" ON storage.objects
--   FOR INSERT TO service_role WITH CHECK (bucket_id = 'product-media');
-- CREATE POLICY "Admin Delete from Product Images" ON storage.objects
--   FOR DELETE TO service_role USING (bucket_id = 'product-media');
