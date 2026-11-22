import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { useToast } from '../../context/ToastContext';
import { COMPANY_INFO } from '../../utils/constants';

const EnquiryModal = ({ isOpen, onClose, initialProduct = null, initialBrand = null }) => {
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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        customer_name: '',
        company_name: '',
        phone: '',
        email: '',
        brand: initialBrand || (initialProduct?.brands?.name || ''),
        product: initialProduct?.name || '',
        quantity: '',
        message: initialProduct
          ? `Kindly share technical quotation, available sizes, and lead time for ${initialProduct.name}.`
          : 'I would like to enquire about your industrial insulation and sealing products.'
      });
    }
  }, [isOpen, initialProduct, initialBrand]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.phone || !formData.email || !formData.message) {
      showToast('Please fill in all required fields (Name, Phone, Email, Message)', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submit({
        ...formData,
        product_id: initialProduct?.id || null
      });
      showToast('Enquiry submitted successfully! Siddharth Dwivedi will contact you promptly.', 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to submit enquiry. Please call us directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0b1d33' }}>
              {initialProduct ? `Enquire for ${initialProduct.name}` : 'Request Industrial Product Quotation'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.825rem', color: '#64748b' }}>
              Direct Manufacturer Response from SARAR INDUSTRIES ({COMPANY_INFO.phone})
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#64748b',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Customer Name *</label>
              <input
                type="text"
                name="customer_name"
                className="form-input"
                placeholder="Your full name"
                value={formData.customer_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company / Industrial Plant</label>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Brand</label>
              <select
                name="brand"
                className="form-select"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Select Brand (Optional)</option>
                <option value="SAKET">SAKET (Insulation &amp; Sealing)</option>
                <option value="DWITECH">DWITECH (Rubber &amp; Engineered)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Required Quantity</label>
              <input
                type="text"
                name="quantity"
                className="form-input"
                placeholder="e.g. 50 Sheets / 100 Metres"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Name / Requirement</label>
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
            <label className="form-label">Detailed Enquiry / Application Details *</label>
            <textarea
              name="message"
              className="form-textarea"
              rows={4}
              placeholder="Specify dimensions, operating temperatures, media, or project timelines..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={submitting}
            >
              {submitting ? 'Submitting Enquiry...' : 'Submit Official Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
