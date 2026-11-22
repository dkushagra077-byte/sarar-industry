# REST API Documentation — SARAR INDUSTRIES

The SARAR INDUSTRIES backend provides a complete RESTful API built with Express.js following MVC architecture. All endpoints communicate using standard JSON formats.

**Base URL**: `/api` (or `http://localhost:5000/api`)

---

## 1. System Endpoints

### Health Check
- **Endpoint**: `GET /api/health`
- **Access**: Public
- **Response**:
```json
{
  "status": "healthy",
  "service": "SARAR INDUSTRIES API",
  "timestamp": "2026-11-22T11:14:37.065Z"
}
```

### Official Company Information
- **Endpoint**: `GET /api/company-info`
- **Access**: Public
- **Response**:
```json
{
  "company_name": "SARAR INDUSTRIES",
  "company_type": "Manufacturers of Industrial Insulation & Sealing Products",
  "contact_person": "Siddharth Dwivedi",
  "phone": "+91 9123841340",
  "email": "sararindustries@gmail.com",
  "whatsapp": "919123841340",
  "experience_years": 50,
  "brands": ["SAKET", "DWITECH"]
}
```

---

## 2. Authentication Endpoints

### Admin Login
- **Endpoint**: `POST /api/auth/login`
- **Rate Limit**: 10 requests per 15 minutes
- **Request Body**:
```json
{
  "email": "sararindustries@gmail.com",
  "password": "Admin@Sarar2024!"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "u1111111-1111-1111-1111-111111111111",
      "name": "Siddharth Dwivedi",
      "email": "sararindustries@gmail.com",
      "role": "superadmin"
    }
  }
}
```

### Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Header**: `Authorization: Bearer <token>`
- **Response**: User object without password hash.

---

## 3. Brand Endpoints

### List Brands
- **Endpoint**: `GET /api/brands`
- **Query Parameters**: `all=true` (admin only, includes inactive brands)
- **Response**: Array of active brands (SAKET, DWITECH).

### Get Brand by Slug
- **Endpoint**: `GET /api/brands/:slug`
- **Examples**: `/api/brands/saket`, `/api/brands/dwitech`
- **Response**: Brand details, associated categories, and product catalogue.

### Update Brand (Admin)
- **Endpoint**: `PUT /api/brands/:id`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ "description": "...", "logo_url": "...", "status": "active" }`

---

## 4. Product Endpoints

### List Products (Filtered & Paginated)
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `brand`: Brand slug (`saket` or `dwitech`)
  - `category`: Category slug
  - `search`: Search query string
  - `sort`: `created_at_desc` | `name_asc` | `name_desc` | `oldest`
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)
- **Response**:
```json
{
  "success": true,
  "data": [ ...products ],
  "meta": {
    "total": 8,
    "page": 1,
    "limit": 12,
    "totalPages": 1
  }
}
```

### Search Products
- **Endpoint**: `GET /api/products/search?q=ceramic`
- **Response**: Array of matching products across name, description, keywords, category, and brand.

### Get Product by Brand & Slug
- **Endpoint**: `GET /api/products/brand/:brandSlug/:productSlug`
- **Example**: `/api/products/brand/saket/saket-ceramic-fiber-blanket`
- **Response**: Full product detail, technical specifications, applications, and related products.

### Create Product (Admin)
- **Endpoint**: `POST /api/products`
- **Header**: `Authorization: Bearer <token>`

### Update Product (Admin)
- **Endpoint**: `PUT /api/products/:id`
- **Header**: `Authorization: Bearer <token>`

### Delete Product (Admin)
- **Endpoint**: `DELETE /api/products/:id`
- **Header**: `Authorization: Bearer <token>`

---

## 5. Customer Enquiry Endpoints

### Submit Enquiry
- **Endpoint**: `POST /api/enquiries`
- **Access**: Public
- **Rate Limit**: 10 requests per 10 minutes
- **Request Body**:
```json
{
  "customer_name": "Rajesh Kumar",
  "company_name": "Apex Engineering Ltd",
  "phone": "+91 9876543210",
  "email": "procurement@apexengineering.example",
  "brand": "saket",
  "product": "SAKET Ceramic Fiber Insulation Blanket",
  "quantity": "50 Rolls",
  "message": "Kindly provide technical datasheet and quotation for 50 rolls delivered to plant site."
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Your industrial enquiry has been submitted successfully. Siddharth Dwivedi / SARAR INDUSTRIES will review your requirements and respond promptly.",
  "data": { ...enquiry }
}
```

### List Enquiries (Admin)
- **Endpoint**: `GET /api/enquiries`
- **Header**: `Authorization: Bearer <token>`
- **Query Parameters**: `status` (New, Contacted, In Progress, Completed, Closed), `search`, `page`, `limit`

### Update Enquiry Status & Notes (Admin)
- **Endpoint**: `PUT /api/enquiries/:id/status`
- **Header**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "status": "Contacted",
  "internal_notes": "Spoke with client. Quotation sent via email on Nov 22."
}
```

### Export Enquiries as CSV (Admin)
- **Endpoint**: `GET /api/enquiries/export/csv`
- **Header**: `Authorization: Bearer <token>`
- **Response**: Streamed CSV file download.

---

## 6. Dashboard Statistics (Admin)

### Overview Metrics
- **Endpoint**: `GET /api/stats`
- **Header**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "success": true,
  "data": {
    "totalProducts": 8,
    "activeProducts": 8,
    "totalEnquiries": 2,
    "newEnquiries": 1,
    "statusCounts": {
      "New": 1,
      "Contacted": 1
    }
  }
}
```

---

## 7. Image Upload Endpoint

### Upload to Supabase Storage
- **Endpoint**: `POST /api/upload`
- **Header**: `Authorization: Bearer <token>`
- **Format**: `multipart/form-data` (field: `image`)
- **Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://xyzcompany.supabase.co/storage/v1/object/public/product-media/products/...",
    "fileName": "products/1700000000-abcd.jpg",
    "fileSize": 254800,
    "mimeType": "image/jpeg"
  }
}
```
