import React, { useState } from 'react';
import SEOHead from '../components/common/SEOHead';
import { COMPANY_INFO } from '../utils/constants';
import EnquiryModal from '../components/common/EnquiryModal';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <SEOHead
        title="About Us | 50+ Years Manufacturing Experience"
        description="Learn about SARAR INDUSTRIES, trusted manufacturer of industrial sealing, insulation, rubber and engineered products under brands SAKET and DWITECH."
      />

      {/* Page Header */}
      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '60px 0 50px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Corporate Heritage
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '12px' }}>
            About SARAR INDUSTRIES
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '700px', fontSize: '1.05rem', margin: 0 }}>
            Over 50 years of manufacturing experience and expertise delivering quality-driven industrial insulation, sealing, rubber and engineered products.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container section-py">
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '1.85rem', color: '#0b1d33', marginBottom: '20px' }}>
            Built on Five Decades of Manufacturing Excellence
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.8', marginBottom: '24px' }}>
            <strong>SARAR INDUSTRIES</strong> is a trusted manufacturer of industrial sealing, insulation, rubber and engineered products, backed by over 50 years of manufacturing experience and expertise.
          </p>

          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
            With a strong foundation in quality craftsmanship, technical knowledge and manufacturing excellence, we specialize in producing a comprehensive range of asbestos and ceramic products under our brand <strong>SAKET</strong>, along with rubber products and other engineered components under our brand <strong>DWITECH</strong>.
          </p>

          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.8', marginBottom: '40px' }}>
            As manufacturers, we maintain a strong focus on product quality, consistent performance and customer satisfaction, delivering reliable industrial solutions to meet the diverse requirements of various industries. Our legacy of over five decades reflects our commitment to innovation, reliability and long-term customer relationships.
          </p>

          {/* Brands Presentation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <div className="industrial-card" style={{ padding: '28px', borderTop: '4px solid #d97706' }}>
              <span className="badge badge-saket" style={{ marginBottom: 12 }}>Brand Portfolio 1</span>
              <h3 style={{ fontSize: '1.4rem', color: '#0b1d33', marginBottom: 8 }}>SAKET</h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: 16 }}>
                Industrial insulation, asbestos, ceramic and sealing products engineered for dependable industrial applications.
              </p>
              <Link to="/brands/saket" className="btn btn-saket btn-sm">
                Explore SAKET Products →
              </Link>
            </div>

            <div className="industrial-card" style={{ padding: '28px', borderTop: '4px solid #2563eb' }}>
              <span className="badge badge-dwitech" style={{ marginBottom: 12 }}>Brand Portfolio 2</span>
              <h3 style={{ fontSize: '1.4rem', color: '#0b1d33', marginBottom: 8 }}>DWITECH</h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: 16 }}>
                Rubber products and engineered components designed to meet industrial requirements.
              </p>
              <Link to="/brands/dwitech" className="btn btn-dwitech btn-sm">
                Explore DWITECH Products →
              </Link>
            </div>
          </div>

          {/* Contact Box */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0b1d33', marginBottom: '8px' }}>
              Have Questions or Require Technical Consultation?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
              Contact Siddharth Dwivedi directly at <strong>{COMPANY_INFO.phone}</strong> or email <strong>{COMPANY_INFO.email}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary">
                Send an Enquiry
              </button>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn btn-secondary">
                📞 Call Siddharth Dwivedi
              </a>
            </div>
          </div>

        </div>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AboutPage;
