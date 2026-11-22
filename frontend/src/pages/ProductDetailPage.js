import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import EnquiryModal from '../components/common/EnquiryModal';
import ProductCard from '../components/products/ProductCard';
import SEOHead from '../components/common/SEOHead';
import { COMPANY_INFO, getWhatsAppLink } from '../utils/constants';

const ProductDetailPage = () => {
  const { brand: brandSlug, slug: productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getByBrandAndSlug(brandSlug, productSlug);
        if (res.data) {
          setProduct(res.data);
          setActiveImage(res.data.main_image_url || '/images/products/placeholder.jpg');
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [brandSlug, productSlug]);

  if (loading) {
    return (
      <div className="container section-py text-center">
        <p style={{ color: '#64748b' }}>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container section-py text-center">
        <h2 style={{ color: '#0b1d33', marginBottom: '12px' }}>Product Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          {error || 'The requested product could not be found under this brand.'}
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to Product Catalogue
        </Link>
      </div>
    );
  }

  const brandName = product.brands?.name || (brandSlug === 'saket' ? 'SAKET' : 'DWITECH');
  const isSaket = brandSlug === 'saket';
  const whatsappUrl = getWhatsAppLink(product.name, brandName);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <SEOHead
        title={product.seo_title || `${product.name} | ${brandName}`}
        description={product.seo_description || product.short_description || product.description}
        keywords={product.keywords?.join(', ')}
      />

      {/* Breadcrumb Strip */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 0' }}>
        <div className="container" style={{ fontSize: '0.85rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#64748b' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/products" style={{ color: '#64748b' }}>Products</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link to={`/brands/${brandSlug}`} style={{ color: isSaket ? '#b45309' : '#1d4ed8', fontWeight: 600 }}>
            {brandName}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#0b1d33', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div className="container section-py">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          marginBottom: '64px'
        }}>
          
          {/* Left Column: Image Gallery */}
          <div>
            <div style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '16px',
              padding: '24px'
            }}>
              <img
                src={activeImage}
                alt={product.name}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = isSaket ? '/logos/saket-logo.svg' : '/logos/dwitech-logo.svg';
                }}
              />
            </div>

            {product.product_images && product.product_images.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                <div
                  onClick={() => setActiveImage(product.main_image_url)}
                  style={{
                    width: '64px',
                    height: '64px',
                    border: activeImage === product.main_image_url ? '2px solid #0b1d33' : '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <img src={product.main_image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                {product.product_images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImage(img.image_url)}
                    style={{
                      width: '64px',
                      height: '64px',
                      border: activeImage === img.image_url ? '2px solid #0b1d33' : '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '4px',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <img src={img.image_url} alt={img.alt_text || ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Meta & Quotation Action */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className={`badge ${isSaket ? 'badge-saket' : 'badge-dwitech'}`}>
                {brandName}
              </span>
              {product.categories && (
                <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Category: <strong>{product.categories.name}</strong>
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.1rem', color: '#0b1d33', marginBottom: '16px', lineHeight: 1.25 }}>
              {product.name}
            </h1>

            <div style={{ fontSize: '1rem', color: '#334155', lineHeight: '1.7', marginBottom: '28px' }}>
              {product.description}
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0b1d33', marginBottom: '8px' }}>
                Manufacturer Direct Supply &amp; Custom Sizing Available
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '0 0 16px' }}>
                Contact Siddharth Dwivedi for technical datasheets, sample tests, and industrial volume quotations.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Request Official Quotation
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ flex: 1 }}
                >
                  💬 WhatsApp Enquiry
                </a>
              </div>

              <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: '#64748b' }}>
                <span>📞 Phone: <a href={`tel:${COMPANY_INFO.phoneRaw}`} style={{ color: '#0b1d33', fontWeight: 600 }}>{COMPANY_INFO.phone}</a></span>
                <span>✉ Email: <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#0b1d33', fontWeight: 600 }}>{COMPANY_INFO.email}</a></span>
              </div>
            </div>
          </div>

        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#0b1d33', marginBottom: '18px', borderLeft: '4px solid #0b1d33', paddingLeft: '12px' }}>
              Technical Specifications
            </h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Parameter / Property</th>
                    <th>Standard Specification Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, color: '#1e293b' }}>{key}</td>
                      <td>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#0b1d33', marginBottom: '18px', borderLeft: '4px solid #d97706', paddingLeft: '12px' }}>
              Recommended Industrial Applications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {product.applications.map((app, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    color: '#334155'
                  }}
                >
                  <span style={{ color: '#d97706', fontWeight: 700 }}>✓</span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {product.related_products && product.related_products.length > 0 && (
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#0b1d33', marginBottom: '24px' }}>
              Related {brandName} Products
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {product.related_products.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={{ ...rel, brands: { name: brandName, slug: brandSlug } }}
                  onEnquire={() => setEnquiryModalOpen(true)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialProduct={product}
        initialBrand={brandName}
      />
    </div>
  );
};

export default ProductDetailPage;
