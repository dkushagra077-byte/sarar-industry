import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ onOpenEnquiry }) => {
  return (
    <section style={{
      backgroundColor: '#0b1d33',
      color: '#ffffff',
      padding: '90px 0 100px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '4px solid #d97706',
      backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(217, 119, 6, 0.1) 0%, transparent 40%)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '820px' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#f59e0b',
            marginBottom: '20px'
          }}>
            <span>★</span> 50+ YEARS OF MANUFACTURING EXPERIENCE
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '24px',
            letterSpacing: '-0.5px'
          }}>
            Reliable Industrial Insulation &amp; Sealing Solutions
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#cbd5e1',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '720px'
          }}>
            Over 50 years of manufacturing expertise delivering quality-driven insulation, sealing, rubber and engineered products for industrial applications.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/brands" className="btn btn-saket btn-lg">
              Explore Our Brands →
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Contact Us
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            marginTop: '56px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>50+</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Years Experience</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>2 Brands</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SAKET &amp; DWITECH</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>Direct</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Manufacturer Pricing</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
