# SARAR INDUSTRIES — FULL-STACK CORPORATE WEBSITE

> Trusted manufacturer of industrial sealing, insulation, rubber and engineered products, backed by over 50 years of manufacturing experience and expertise.
> Brands: **SAKET** and **DWITECH**.

---

## 🏭 Company Information

- **Company Name**: SARAR INDUSTRIES
- **Company Type**: Manufacturers of Industrial Insulation & Sealing Products
- **Contact Person**: Siddharth Dwivedi
- **Phone Number**: +91 9123841340
- **Official Email**: sararindustries@gmail.com
- **Brand Portfolios**:
  - **SAKET**: Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.
  - **DWITECH**: Rubber products and engineered components designed to meet industrial requirements.

---

## 🛠️ Mandatory Technology Stack

- **Frontend**: React.js (without Vite or Next.js), Webpack 5, Babel, CSS3, Responsive Design.
- **Backend**: Node.js, Express.js (MVC Architecture: Models, Controllers, Routes, Middleware, Services, Validators).
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`, Row Level Security (RLS) enabled, indexed, migrations, and seeds).
- **Authentication**: Backend-managed email/password authentication using `bcryptjs` password hashing and secure JWT tokens.
- **Storage**: Supabase Storage (`product-media` bucket) for product images.
- **Direct Communications**: WhatsApp click-to-chat integration (with product-specific & general pre-filled messages), tel, and mailto.

---

## 📁 Repository Structure

```
sarar-industries/
├── frontend/                     # React.js application
│   ├── public/                   # Static assets, SVG logos, sitemap.xml, robots.txt
│   │   ├── logos/                # SARAR, SAKET, DWITECH SVG vector logos
│   │   ├── images/               # Product category & catalogue visual assets
│   │   ├── index.html            # HTML5 template with SEO meta tags
│   │   ├── robots.txt            # Search engine crawler directives
│   │   └── sitemap.xml           # XML sitemap for SEO discovery
│   ├── src/
│   │   ├── components/           # Reusable UI & domain components
│   │   │   ├── common/           # Navbar, Footer, WhatsAppFloat, EnquiryModal, SEOHead
│   │   │   ├── home/             # Hero, BrandsGrid, AboutSection, CategoriesSection, IndustriesSection, WhyChooseUs, QuickContact
│   │   │   └── products/         # ProductCard, ProductFilter
│   │   ├── context/              # AuthContext, ToastContext
│   │   ├── layouts/              # PublicLayout, AdminLayout
│   │   ├── pages/                # HomePage, AboutPage, BrandsPage, BrandDetailPage, ProductsPage, ProductDetailPage, SearchPage, IndustriesPage, ContactPage
│   │   │   └── admin/            # AdminLoginPage, AdminDashboardPage, AdminProductsPage, AdminCategoriesPage, AdminBrandsPage, AdminEnquiriesPage
│   │   ├── services/             # API client, authService, productService, brandService, categoryService, enquiryService
│   │   ├── styles/               # Industrial B2B CSS design system
│   │   ├── utils/                # Constants, formatters, WhatsApp link generator
│   │   ├── App.js                # React Router v6 tree with public & protected admin routes
│   │   └── index.js              # Application entry point
│   ├── package.json
│   ├── webpack.config.js         # Webpack 5 production & development configuration
│   └── .babelrc
│
├── backend/                      # Node.js & Express.js REST API
│   ├── src/
│   │   ├── config/               # database.js (Supabase client), environment.js
│   │   ├── controllers/          # authController, brandController, categoryController, productController, enquiryController, statsController, uploadController
│   │   ├── middleware/           # authMiddleware, rateLimiter, errorMiddleware, uploadMiddleware
│   │   ├── models/               # Brand, Category, Product, User, Enquiry (Supabase data access)
│   │   ├── routes/               # authRoutes, brandRoutes, categoryRoutes, productRoutes, enquiryRoutes, statsRoutes, uploadRoutes
│   │   ├── utils/                # logger, jwtHelper, slugify, responseFormatter
│   │   ├── validators/           # express-validator schemas for auth, enquiry, product, category
│   │   ├── app.js                # Express app configuration & static build serving
│   │   └── server.js             # HTTP server entry point
│   ├── package.json
│   ├── .env.example              # Environment variables template
│   └── tests/
│       └── verify-api.js         # Complete backend integration test suite
│
├── database/
│   ├── schema.sql                # Complete unified PostgreSQL schema
│   ├── migrations/               # Database migrations (001_initial_schema.sql)
│   ├── policies/                 # Supabase Row Level Security (RLS) policies
│   └── seed/                     # Seed data for SAKET & DWITECH brands, categories, and products
│
├── docs/                         # Comprehensive engineering documentation
│   ├── installation.md           # Local setup instructions
│   ├── deployment.md             # Production deployment guide
│   ├── database-setup.md         # Supabase PostgreSQL & Storage configuration
│   ├── api-documentation.md      # REST API endpoints & request/response payloads
│   └── seo-setup.md              # SEO, sitemap, meta tags, and indexing setup
│
├── .gitignore
├── README.md
└── package.json                  # Root orchestration scripts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### 2. Installation
```bash
# Install all backend and frontend dependencies
npm run install:all
```

### 3. Environment Configuration
Copy the template and configure your credentials:
```bash
cp backend/.env.example backend/.env
```
Update `backend/.env` with your Supabase credentials:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=your-secure-random-jwt-key
PORT=5000
```
*(Note: If you run without Supabase credentials initially, the backend automatically initializes a high-fidelity local seed store with all SAKET and DWITECH data so the system works immediately out-of-the-box!)*

### 4. Build Frontend
```bash
npm run build
```

### 5. Start Server
```bash
npm start
```
The application will be live at `http://localhost:5000` (serving both the React frontend and Express REST API)!

---

## 🔐 Administrative Credentials

- **Admin Login URL**: `/admin/login`
- **Email**: `sararindustries@gmail.com`
- **Initial Password**: `Admin@Sarar2024!`

The administrator dashboard allows:
1. **Product Management**: Add, edit, delete, activate/deactivate, toggle featured, upload images to Supabase storage, edit JSON specifications and applications.
2. **Brand Management**: Edit SAKET and DWITECH descriptions, logos, and active status.
3. **Category Management**: Add and organize categories under brands.
4. **Enquiry Management**: View enquiries, search/filter by status (New, Contacted, In Progress, Completed, Closed), add internal notes, and export to CSV.
5. **Dashboard Overview**: Real-time database counts for products, active items, total enquiries, and status breakdowns.

---

## 🧪 Testing & Verification

Run the automated backend test suite:
```bash
npm test
```
Tests include:
- Health check & company information
- Brands & brand slug endpoints (`/brands/saket`, `/brands/dwitech`)
- Product listing & full-text search
- Admin authentication & JWT verification
- Protected dashboard statistics
- Customer enquiry submission (rate limited & validated)
- Admin enquiries list and CSV download
