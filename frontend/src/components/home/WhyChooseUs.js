import React from 'react';
import { COMPANY_INFO } from '../../utils/constants';

const WhyChooseUs = () => {
  return (
    <section className="section-py" style={{ backgroundColor: '#0b1d33', color: '#ffffff' }}>
      <div className="container">
        
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Manufacturing Heritage
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>Why Choose SARAR INDUSTRIES</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8', margin: '0 auto' }}>
            Built on a legacy of over five decades of quality craftsmanship, technical knowledge, and dependable manufacturing excellence.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {COMPANY_INFO.whyChooseUs.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '30px 24px',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{
                color: '#d97706',
                fontSize: '1.6rem',
                fontWeight: 800,
                marginBottom: '12px',
                fontFamily: 'var(--font-heading)'
              }}>
                0{i + 1}.
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '10px' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
