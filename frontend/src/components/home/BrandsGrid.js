import React from 'react';
import { Link } from 'react-router-dom';

const BrandsGrid = () => {
  return (
    <section className="section-py" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div className="section-heading-tag" style={{ borderLeftColor: '#d97706' }}>Specialized Manufacturing Brands</div>
          <h2 className="section-title">Our Brands</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We specialize in producing a comprehensive range of asbestos and ceramic products under our brand SAKET, along with rubber products and other engineered components under our brand DWITECH.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          
          {/* BRAND CARD 1: SAKET */}
          <div className="industrial-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '5px solid #d97706',
            padding: '36px 32px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <img
                  src="/logos/Saket.jpeg"
                  alt="SAKET Brand"
                  style={{ height: '52px', width: 'auto' }}
                />
                <span className="badge badge-saket">Brand 1</span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#0b1d33' }}>
                SAKET
              </h3>

              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.
              </p>

              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fef3c7',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '28px',
                fontSize: '0.875rem',
                color: '#92400e'
              }}>
                <strong>Core Product Lines:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', lineHeight: '1.6' }}>
                  <li>Asbestos &amp; Non-Asbestos Millboards &amp; Sheets</li>
                  <li>High-Temperature Ceramic Fiber Blankets &amp; Ropes</li>
                  <li>Compressed Jointing Gasket Sheets</li>
                </ul>
              </div>
            </div>

            <div>
              <Link to="/brands/saket" className="btn btn-saket btn-block" style={{ fontSize: '1rem' }}>
                Explore SAKET Products →
              </Link>
            </div>
          </div>

          {/* BRAND CARD 2: DWITECH */}
          <div className="industrial-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '5px solid #2563eb',
            padding: '36px 32px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <img
                  src="/logos/Dwitech.jpeg"
                  alt="DWITECH Brand"
                  style={{ height: '52px', width: 'auto' }}
                />
                <span className="badge badge-dwitech">Brand 2</span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#0b1d33' }}>
                DWITECH
              </h3>

              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Rubber products and engineered components designed to meet industrial requirements.
              </p>

              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #dbeafe',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '28px',
                fontSize: '0.875rem',
                color: '#1e40af'
              }}>
                <strong>Core Product Lines:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', lineHeight: '1.6' }}>
                  <li>Heavy-Duty Industrial Rubber Sheets (NBR, EPDM, Neoprene)</li>
                  <li>Precision Molded Rubber Bushes, Seals &amp; Diaphragms</li>
                  <li>Extruded Rubber Profiles &amp; Anti-Vibration Mounts</li>
                </ul>
              </div>
            </div>

            <div>
              <Link to="/brands/dwitech" className="btn btn-dwitech btn-block" style={{ fontSize: '1rem' }}>
                Explore DWITECH Products →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandsGrid;
