import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const AdminEnquiriesPage = () => {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected enquiry for details modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await enquiryService.getAll({
        status: statusFilter,
        search: searchTerm,
        limit: 100
      });
      if (res.data) {
        setEnquiries(res.data);
      }
    } catch (err) {
      showToast('Failed to load enquiries: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, searchTerm]);

  const openDetails = (enq) => {
    setSelectedEnquiry(enq);
    setModalStatus(enq.status);
    setModalNotes(enq.internal_notes || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      await enquiryService.updateStatus(selectedEnquiry.id, modalStatus, modalNotes);
      showToast('Enquiry updated successfully', 'success');
      setSelectedEnquiry(null);
      loadEnquiries();
    } catch (err) {
      showToast('Failed to update enquiry: ' + err.message, 'error');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      await enquiryService.exportCSV();
      showToast('Enquiries exported to CSV successfully', 'success');
    } catch (err) {
      showToast('CSV export failed: ' + err.message, 'error');
    }
  };

  return (
    <div>
      <SEOHead title="Manage Enquiries | Admin" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#0b1d33', margin: 0 }}>
            Manage Customer Enquiries
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Track, filter, update status, and manage leads for SARAR INDUSTRIES.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary">
          ⬇ Export Enquiries as CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="industrial-card" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by customer name, company, email, phone..."
          className="form-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '340px' }}
        />
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="industrial-card">
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Loading customer enquiries...
          </div>
        ) : enquiries.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Brand / Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0b1d33' }}>{enq.customer_name}</div>
                    </td>
                    <td>{enq.company_name || '—'}</td>
                    <td>
                      <div><a href={`tel:${enq.phone}`} style={{ color: '#0b1d33', fontWeight: 600 }}>📞 {enq.phone}</a></div>
                      <div style={{ fontSize: '0.785rem', color: '#64748b' }}>✉ {enq.email}</div>
                    </td>
                    <td>
                      <div><strong>{enq.brands?.name || 'General'}</strong></div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{enq.products?.name || '—'}</div>
                    </td>
                    <td>{enq.quantity || '—'}</td>
                    <td>
                      <span className={`badge badge-status-${enq.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => openDetails(enq)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        View / Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No customer enquiries match your search filter.
          </div>
        )}
      </div>

      {/* Enquiry Details & Status Update Modal */}
      {selectedEnquiry && (
        <div className="modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0b1d33' }}>
                Enquiry Details
              </h3>
              <button onClick={() => setSelectedEnquiry(null)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>
                &times;
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16, fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Customer Name</span>
                <strong>{selectedEnquiry.customer_name}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Company</span>
                <strong>{selectedEnquiry.company_name || 'Individual Client'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Phone</span>
                <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#2563eb' }}>{selectedEnquiry.phone}</a>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Email</span>
                <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#2563eb' }}>{selectedEnquiry.email}</a>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Brand / Product</span>
                <span>{selectedEnquiry.brands?.name || ''} {selectedEnquiry.products?.name ? `(${selectedEnquiry.products.name})` : ''}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block' }}>Required Quantity</span>
                <span>{selectedEnquiry.quantity || 'Not specified'}</span>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>Customer Message</span>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '12px 14px',
                fontSize: '0.9rem',
                color: '#1e293b',
                whiteSpace: 'pre-wrap'
              }}>
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Workflow Status</label>
              <select
                className="form-select"
                value={modalStatus}
                onChange={(e) => setModalStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Internal Notes (Private to Admin)</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Log internal follow-up remarks, quotations sent, customer discussions..."
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" onClick={() => setSelectedEnquiry(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="btn btn-primary btn-sm"
                disabled={savingNotes}
              >
                {savingNotes ? 'Saving...' : 'Update Enquiry & Save Notes'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminEnquiriesPage;
