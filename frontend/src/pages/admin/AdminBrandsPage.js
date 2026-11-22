import React, { useState, useEffect } from 'react';
import { brandService } from '../../services/brandService';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const AdminBrandsPage = () => {
  const { showToast } = useToast();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({ description: '', logo_url: '', status: 'active' });

  const loadBrands = async () => {
    setLoading(true);
    try {
      const res = await brandService.getAll(true);
      if (res.data) setBrands(res.data);
    } catch (err) {
      showToast('Failed to load brands: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const openEdit = (b) => {
    setEditingBrand(b);
    setFormData({
      description: b.description || '',
      logo_url: b.logo_url || '',
      status: b.status || 'active'
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await brandService.update(editingBrand.id, formData);
      showToast(`${editingBrand.name} updated successfully`, 'success');
      setEditingBrand(null);
      loadBrands();
    } catch (err) {
      showToast('Update failed: ' + err.message, 'error');
    }
  };

  return (
    <div>
      <SEOHead title="Manage Brands | Admin" />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#0b1d33', margin: 0 }}>
          Manage Specialized Brands
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>
          Official brand profiles for <strong>SAKET</strong> and <strong>DWITECH</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {brands.map((b) => {
          const isSaket = b.slug === 'saket';
          return (
            <div
              key={b.id}
              className="industrial-card"
              style={{
                padding: '28px',
                borderTop: `4px solid ${isSaket ? '#d97706' : '#2563eb'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <img
                  src={b.logo_url}
                  alt={b.name}
                  style={{ height: '48px', width: 'auto' }}
                />
                <span className={`badge ${isSaket ? 'badge-saket' : 'badge-dwitech'}`}>
                  {b.name}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', color: '#0b1d33', marginBottom: '8px' }}>
                {b.name}
              </h3>

              <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '20px' }}>
                {b.description}
              </p>

              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px' }}>
                <div><strong>Slug:</strong> <code>/brands/{b.slug}</code></div>
                <div><strong>Status:</strong> <span className={`badge ${b.status === 'active' ? 'badge-status-completed' : 'badge-status-closed'}`}>{b.status}</span></div>
              </div>

              <button onClick={() => openEdit(b)} className="btn btn-secondary btn-sm btn-block">
                Edit Brand Information
              </button>
            </div>
          );
        })}
      </div>

      {editingBrand && (
        <div className="modal-overlay" onClick={() => setEditingBrand(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.25rem', color: '#0b1d33' }}>
              Edit Brand: {editingBrand.name}
            </h3>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Brand Description</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand Logo URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={() => setEditingBrand(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBrandsPage;
