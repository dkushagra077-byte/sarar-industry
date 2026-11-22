import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, getWhatsAppLink } from '../../utils/constants';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#071322', color: '#cbd5e1', borderTop: '4px solid #d97706' }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: '#0b1d33', padding: '36px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '6px' }}>Need Industrial Insulation or Sealing Quotations?</h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
              Speak directly with Siddharth Dwivedi or request custom technical product specifications.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn btn-secondary btn-sm">
              📞 Call Now
            </a>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
              💬 WhatsApp Us
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="btn btn-primary btn-sm" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              ✉ Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '60px 20px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Company Brief */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <img 
                src="/logos/sarar-logo.svg" 
                alt="SARAR INDUSTRIES" 
                style={{ height: '42px', filter: 'brightness(0) invert(1)' }} 
              />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '16px' }}>
              SARAR INDUSTRIES is a trusted manufacturer of industrial sealing, insulation, rubber and engineered products, backed by over 50 years of manufacturing experience and expertise.
            </p>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div><strong>Brand Portfolio:</strong> SAKET &amp; DWITECH</div>
              <div style={{ marginTop: '4px' }}><strong>Manufacturing Experience:</strong> 50+ Years</div>
            </div>
          </div>

          {/* Brand Portfolios */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', borderLeft: '3px solid #d97706', paddingLeft: '10px' }}>
              Our Specialized Brands
            </h4>
            <div style={{ marginBottom: '16px' }}>
              <Link to="/brands/saket" style={{ color: '#f59e0b', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                SAKET →
              </Link>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.
              </p>
            </div>
            <div>
              <Link to="/brands/dwitech" style={{ color: '#60a5fa', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                DWITECH →
              </Link>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                Rubber products and engineered components designed to meet industrial requirements.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', borderLeft: '3px solid #d97706', paddingLeft: '10px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: '#94a3b8' }}>About SARAR INDUSTRIES</Link></li>
              <li><Link to="/products" style={{ color: '#94a3b8' }}>Full Product Catalogue</Link></li>
              <li><Link to="/industries" style={{ color: '#94a3b8' }}>Industries We Serve</Link></li>
              <li><Link to="/contact" style={{ color: '#94a3b8' }}>Direct Manufacturer Contact</Link></li>
              <li><Link to="/admin/login" style={{ color: '#64748b', fontSize: '0.8rem' }}>Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', borderLeft: '3px solid #d97706', paddingLeft: '10px' }}>
              Contact Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>SARAR INDUSTRIES</strong>
                <span>Industrial Insulation &amp; Sealing Products</span>
              </div>
              <div>
                <span style={{ color: '#cbd5e1' }}>Contact Person:</span>
                <div style={{ color: '#ffffff', fontWeight: '600' }}>{COMPANY_INFO.contactPerson}</div>
              </div>
              <div>
                <span style={{ color: '#cbd5e1' }}>Phone:</span>
                <div>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
              <div>
                <span style={{ color: '#cbd5e1' }}>Official Email:</span>
                <div>
                  <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8125rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} SARAR INDUSTRIES. All Rights Reserved. Backed by over 50 years of manufacturing experience.
          </div>
          <div>
            <span>Brands: SAKET &amp; DWITECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
