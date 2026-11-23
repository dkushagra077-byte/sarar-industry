import React from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '../../utils/constants';

const ProductCard = ({ product, onEnquire }) => {
  const brandSlug = product.brands?.slug || (product.brand_id?.includes('1111') ? 'saket' : 'dwitech');
  const brandName = product.brands?.name || (brandSlug === 'saket' ? 'SAKET' : 'DWITECH');
  const isSaket = brandSlug === 'saket';

  const productUrl = `/products/${brandSlug}/${product.slug}`;
  const whatsappUrl = getWhatsAppLink(product.name, brandName);

  return (
      <div className="industrial-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Product Image Area */}
      <div className="product-card-media" style={{
        height: '210px',
        backgroundColor: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          className="product-card-image"
          src={product.main_image_url || '/images/products/product-placeholder.svg'}
          alt={product.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            padding: '16px',
            transition: 'transform 0.25s ease'
          }}
          onError={(e) => {
            // Keep catalogue cards usable when a product image has not been supplied.
            e.target.onerror = null;
            e.target.src = '/images/products/product-placeholder.svg';
          }}
        />

        {/* Brand Badge */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span className={`badge ${isSaket ? 'badge-saket' : 'badge-dwitech'}`}>
            {brandName}
          </span>
        </div>

        {product.is_featured && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <span style={{
              backgroundColor: '#0b1d33',
              color: '#f59e0b',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {product.categories && (
            <div style={{ fontSize: '0.785rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              {product.categories.name}
            </div>
          )}

          <h3 style={{ fontSize: '1.15rem', color: '#0b1d33', marginBottom: '8px', lineHeight: 1.3 }}>
            <Link to={productUrl} style={{ color: '#0b1d33', textDecoration: 'none' }}>
              {product.name}
            </Link>
          </h3>

          <p style={{
            fontSize: '0.85rem',
            color: '#64748b',
            lineHeight: '1.5',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.short_description || product.description}
          </p>
        </div>

        {/* Actions */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Link to={productUrl} className="btn btn-secondary btn-sm" style={{ padding: '8px 10px', fontSize: '0.8125rem' }}>
              View Details
            </Link>
            <button
              onClick={() => onEnquire && onEnquire(product)}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 10px', fontSize: '0.8125rem' }}
            >
              Enquire
            </button>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
          >
            💬 WhatsApp Quotation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
