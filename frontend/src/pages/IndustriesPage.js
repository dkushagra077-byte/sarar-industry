import React, { useState } from 'react';
import IndustriesSection from '../components/home/IndustriesSection';
import SEOHead from '../components/common/SEOHead';
import EnquiryModal from '../components/common/EnquiryModal';

const IndustriesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <SEOHead
        title="Industries We Serve | SARAR INDUSTRIES"
        description="Discover the industrial sectors served by SARAR INDUSTRIES: Manufacturing, Engineering, Power Generation, Industrial Processing, Infrastructure, and Heavy Industries."
      />

      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '60px 0 50px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Market Expertise
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '12px' }}>
            Industries We Serve
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '720px', fontSize: '1.05rem', margin: 0 }}>
            SARAR INDUSTRIES provides high-performance sealing, thermal insulation, rubber and engineered products engineered for specialized industrial operating conditions.
          </p>
        </div>
      </div>

      <IndustriesSection />

      <div className="container" style={{ paddingBottom: '80px', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '720px',
          margin: '0 auto'
        }}>
          <h3 style={{ color: '#0b1d33', fontSize: '1.35rem', marginBottom: '10px' }}>
            Need Custom Technical Formulations for Your Industry?
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Our engineering team can evaluate your mechanical drawings, chemical exposures, and thermal cycles.
          </p>
          <button onClick={() => setModalOpen(true)} className="btn btn-primary">
            Request Industrial Consultation
          </button>
        </div>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default IndustriesPage;
