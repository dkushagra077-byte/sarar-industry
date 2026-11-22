# Search Engine Optimization (SEO) Setup — SARAR INDUSTRIES

This document describes the SEO architecture, indexing configurations, and metadata implemented across the SARAR INDUSTRIES corporate website.

---

## 1. Technical SEO Specifications

- **Semantic HTML5 Elements**: Proper usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`, and hierarchical heading tags (`<h1>`, `<h2>`, `<h3>`).
- **Dynamic Head Metadata**: Implemented via `SEOHead.js` component dynamically injecting:
  - `<title>`: Tailored for every page, brand, and product.
  - `<meta name="description">`: Concise, keyword-optimized summaries.
  - `<meta name="keywords">`: Industrial target keywords.
  - OpenGraph tags: `og:title`, `og:description`, `og:image`, `og:type`.
  - Twitter card tags: `twitter:card`, `twitter:title`, `twitter:description`.
  - Canonical link tags: Prevents duplicate content indexation.

---

## 2. Robots.txt Configuration

The `frontend/public/robots.txt` is served directly at the domain root (`https://www.sararindustries.com/robots.txt`):

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.sararindustries.com/sitemap.xml
```

**Directives**:
- Allows all major search engines (Googlebot, Bingbot, DuckDuckBot, etc.) to crawl public pages, brand catalogues, and product detail URLs.
- Protects administrative paths (`/admin/`) and REST endpoints (`/api/`) from unauthorized indexing.

---

## 3. XML Sitemap Configuration

The `frontend/public/sitemap.xml` file includes prioritized indexation for search engines:

| Page / Section | Priority | Change Frequency |
|---|---|---|
| Homepage (`/`) | 1.0 | Weekly |
| SAKET Brand Catalogue (`/brands/saket`) | 0.9 | Weekly |
| DWITECH Brand Catalogue (`/brands/dwitech`) | 0.9 | Weekly |
| Full Product Catalogue (`/products`) | 0.9 | Daily |
| About Us (`/about`) | 0.8 | Monthly |
| Contact Us (`/contact`) | 0.8 | Monthly |
| Industries We Serve (`/industries`) | 0.7 | Monthly |

---

## 4. Google Search Console & Webmaster Verification

To verify ownership and expedite indexing in Google Search Console:

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Add your domain property (`sararindustries.com`).
3. Verification methods:
   - **DNS TXT Record** (Recommended): Add the provided TXT record to your domain registrar (GoDaddy, Namecheap, Cloudflare).
   - **HTML Meta Tag**: Paste the verification meta tag inside `frontend/public/index.html` within `<head>`.
4. Submit the sitemap URL:
   ```
   https://www.sararindustries.com/sitemap.xml
   ```

---

## 5. Schema.org Structured Data (JSON-LD)

To enable rich snippets and industrial organization badges in Google Search results, add the following structured data script to `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  "name": "SARAR INDUSTRIES",
  "description": "Manufacturers of Industrial Insulation & Sealing Products with over 50 years of manufacturing experience.",
  "url": "https://www.sararindustries.com",
  "telephone": "+91-9123841340",
  "email": "sararindustries@gmail.com",
  "founder": {
    "@type": "Person",
    "name": "Siddharth Dwivedi"
  },
  "brand": [
    {
      "@type": "Brand",
      "name": "SAKET",
      "description": "Industrial insulation, asbestos, ceramic and sealing products"
    },
    {
      "@type": "Brand",
      "name": "DWITECH",
      "description": "Rubber products and engineered components"
    }
  ]
}
</script>
```
