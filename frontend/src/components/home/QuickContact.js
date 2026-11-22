import React, { useState } from 'react';
import { COMPANY_INFO, getWhatsAppLink } from '../../utils/constants';
import { enquiryService } from '../../services/enquiryService';
import { useToast } from '../../context/ToastContext';

const QuickContact = () => {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    phone: '',
    email: '',
    brand: '',
    product: '',
    quantity: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.phone || !formData.email || !formData.message) {
      showToast('Please provide your name, phone, email, and enquiry message.', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submit(formData);
      showToast('Thank you! Your enquiry has been received. Siddharth Dwivedi will contact you promptly.', 'success');
      setFormData({
        customer_name: '',
        company_name: '',
        phone: '',
        email: '',
        brand: '',
        product: '',
        quantity: '',
        message: ''
      });
    } catch (err) {
      showToast(err.message || 'Failed to submit enquiry. Please call us directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start'
        }}>
          
          {/* Company Details Column */}
          <div>
            <div className="section-heading-tag">Direct Manufacturer Contact</div>
            <h2 className="section-title">Connect with SARAR INDUSTRIES</h2>
            
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', marginBottom: '28px' }}>
              Connect directly with our manufacturing unit for quotations, technical specifications, and industrial product enquiries under <strong>SAKET</strong> and <strong>DWITECH</strong>.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '28px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Manufacturing Company</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1d33' }}>{COMPANY_INFO.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>{COMPANY_INFO.type}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Person</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0b1d33' }}>{COMPANY_INFO.contactPerson}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</span>
                <div>
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0b1d33', textDecoration: 'none' }}>
                    📞 {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</span>
                <div>
                  <a href={`mailto:${COMPANY_INFO.email}`} style={{ fontSize: '1rem', fontWeight: 600, color: '#2563eb', textDecoration: 'none' }}>
                    ✉ {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn btn-secondary">
                📞 Call Now
              </a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                💬 WhatsApp Enquiry
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="btn btn-primary">
                ✉ Send Email
              </a>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="industrial-card" style={{ padding: '36px 32px', borderTop: '4px solid #0b1d33' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#0b1d33', marginBottom: '8px' }}>
              Send a Product Enquiry
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
              Fill in your specifications below for a direct manufacturer response.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    className="form-input"
                    placeholder="Company name"
                    value={formData.company_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+91 9123841340"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Select Brand</label>
                  <select
                    name="brand"
                    className="form-select"
                    value={formData.brand}
                    onChange={handleChange}
                  >
                    <option value="">Select Brand</option>
                    <option value="SAKET">SAKET (Insulation &amp; Sealing)</option>
                    <option value="DWITECH">DWITECH (Rubber &amp; Engineered)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    className="form-input"
                    placeholder="Required quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Name / Type</label>
                <input
                  type="text"
                  name="product"
                  className="form-input"
                  placeholder="e.g. Asbestos Millboard, Ceramic Blanket, Rubber Sheets"
                  value={formData.product}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Technical Requirements *</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  rows={4}
                  placeholder="Please describe sizes, temperature ratings, delivery timeline, or application details..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? 'Submitting Enquiry...' : 'Submit Industrial Enquiry'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default QuickContact;
