import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { brandService } from '../services/brandService';
import ProductCard from '../components/products/ProductCard';
import EnquiryModal from '../components/common/EnquiryModal';
import SEOHead from '../components/common/SEOHead';
import { getWhatsAppLink } from '../utils/constants';

const BrandDetailPage = () => {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await brandService.getBySlug(slug);
        if (res.data) {
          setBrand(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load brand details');
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [slug]);

  const handleEnquire = (product = null) => {
    setSelectedProductForEnquiry(product);
    setEnquiryModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container section-py text-center">
        <p style={{ color: '#64748b' }}>Loading brand catalogue...</p>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="container section-py text-center">
        <h2 style={{ color: '#0b1d33', marginBottom: '12px' }}>Brand Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>{error || 'Requested brand catalogue could not be retrieved.'}</p>
        <Link to="/brands" className="btn btn-primary">Back to Brands</Link>
      </div>
    );
  }

  const isSaket = brand.slug === 'saket';
  const brandThemeColor = isSaket ? '#d97706' : '#2563eb';

  return (
    <div>
      <SEOHead
        title={`${brand.name} Products | Industrial Solutions`}
        description={brand.description}
      />

      {/* Brand Hero Header */}
      <div style={{
        backgroundColor: '#0b1d33',
        color: '#ffffff',
        padding: '70px 0 60px',
        borderBottom: `5px solid ${brandThemeColor}`,
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: brandThemeColor, borderLeftColor: brandThemeColor }}>
                SARAR INDUSTRIES BRAND
              </div>
              <h1 style={{ color: '#ffffff', fontSize: '2.8rem', fontWeight: 800, marginBottom: '14px' }}>
                {brand.name}
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '28px' }}>
                {brand.description}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleEnquire(null)}
                  className={`btn ${isSaket ? 'btn-saket' : 'btn-dwitech'}`}
                >
                  Enquire for {brand.name} Products
                </button>
                <a
                  href={getWhatsAppLink(null, brand.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  💬 WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '10px',
              border: `2px solid ${brandThemeColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <img
                src={brand.logo_url}
                alt={brand.name}
                style={{ height: '70px', width: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Categories Section */}
      {brand.categories && brand.categories.length > 0 && (
        <div style={{ backgroundColor: '#f8fafc', padding: '48px 0', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.35rem', color: '#0b1d33', marginBottom: '20px' }}>
              {brand.name} Product Categories
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              {brand.categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?brand=${brand.slug}&category=${cat.slug}`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    display: 'block',
                    transition: 'all 0.15s ease'
                  }}
                  className="industrial-card"
                >
                  <div style={{ fontWeight: 700, color: '#0b1d33', fontSize: '0.95rem', marginBottom: '4px' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                    View catalogue →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Brand Product Catalogue Section */}
      <div className="container section-py">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 className="section-title" style={{ margin: 0, fontSize: '1.85rem' }}>
              {brand.name} Manufactured Products
            </h2>
            <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.9rem' }}>
              Showing {brand.products?.length || 0} products manufactured under {brand.name}
            </p>
          </div>
          <Link to={`/products?brand=${brand.slug}`} className="btn btn-secondary btn-sm">
            Filter in Full Catalogue
          </Link>
        </div>

        {brand.products && brand.products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {brand.products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, brands: { name: brand.name, slug: brand.slug } }}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>No products listed under this brand yet.</p>
            <button onClick={() => handleEnquire(null)} className="btn btn-primary">
              Contact us for {brand.name} custom manufacturing
            </button>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialBrand={brand.name}
        initialProduct={selectedProductForEnquiry}
      />
    </div>
  );
};

export default BrandDetailPage;
