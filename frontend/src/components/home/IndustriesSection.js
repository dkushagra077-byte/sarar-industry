import React from 'react';
import { COMPANY_INFO } from '../../utils/constants';

const IndustriesSection = () => {
  return (
    <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div className="section-heading-tag">Industrial Applications</div>
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Delivering reliable industrial solutions engineered to meet the harsh operational parameters of specialized sectors.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {COMPANY_INFO.industriesServed.map((ind, i) => (
            <div
              key={i}
              className="industrial-card"
              style={{
                padding: '28px',
                borderLeft: '4px solid #0b1d33',
                backgroundColor: '#f8fafc'
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#0b1d33',
                color: '#f59e0b',
                fontWeight: '800',
                fontSize: '0.9rem',
                marginBottom: '16px'
              }}>
                0{i + 1}
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#0b1d33', marginBottom: '10px' }}>
                {ind.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {ind.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
