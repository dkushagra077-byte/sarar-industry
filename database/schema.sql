-- ====================================================================
-- SARAR INDUSTRIES - FULL POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop Tables if rebuilding (in dependency order)
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 3. BRANDS TABLE
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    description TEXT,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS TABLE
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    short_description TEXT,
    description TEXT,
    main_image_url TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    keywords TEXT[] DEFAULT '{}',
    seo_title VARCHAR(200),
    seo_description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_brand_product_slug UNIQUE (brand_id, slug)
);

-- 6. PRODUCT IMAGES TABLE
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. USERS (ADMIN ACCOUNTS) TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin', 'editor')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ENQUIRIES TABLE
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(200),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed', 'Closed')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_status ON brands(status);

CREATE INDEX idx_categories_brand_id ON categories(brand_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_status ON categories(status);

CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_name_trgm ON products USING gin (to_tsvector('english', name || ' ' || COALESCE(short_description, '') || ' ' || COALESCE(description, '')));

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_display_order ON product_images(display_order);

CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_brand_id ON enquiries(brand_id);
CREATE INDEX idx_enquiries_product_id ON enquiries(product_id);

-- 10. AUTO-UPDATE UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
