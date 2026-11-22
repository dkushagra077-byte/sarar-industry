import React from 'react';
import BrandsGrid from '../components/home/BrandsGrid';
import SEOHead from '../components/common/SEOHead';

const BrandsPage = () => {
  return (
    <div>
      <SEOHead
        title="Our Brands | SAKET & DWITECH"
        description="Discover SAKET for industrial insulation, asbestos and ceramic products, and DWITECH for industrial rubber and engineered components by SARAR INDUSTRIES."
      />

      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '60px 0 50px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Brand Architecture
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '12px' }}>
            Our Manufacturing Brands
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '720px', fontSize: '1.05rem', margin: 0 }}>
            SARAR INDUSTRIES houses two specialized industrial manufacturing brands: SAKET and DWITECH.
          </p>
        </div>
      </div>

      <BrandsGrid />
    </div>
  );
};

export default BrandsPage;
