import React from 'react';
import QuickContact from '../components/home/QuickContact';
import SEOHead from '../components/common/SEOHead';

const ContactPage = () => {
  return (
    <div>
      <SEOHead
        title="Contact Us | Direct Manufacturer Enquiry"
        description="Contact SARAR INDUSTRIES directly. Contact Person: Siddharth Dwivedi. Phone: +91 9123841340. Email: sararindustries@gmail.com."
      />

      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '60px 0 50px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Direct Communication
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '12px' }}>
            Contact SARAR INDUSTRIES
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '720px', fontSize: '1.05rem', margin: 0 }}>
            Connect with our manufacturing headquarters for quotations, technical specifications, and industrial product orders.
          </p>
        </div>
      </div>

      <QuickContact />
    </div>
  );
};

export default ContactPage;
