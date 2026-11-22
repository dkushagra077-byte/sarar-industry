import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const AdminCategoriesPage = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand_id: '',
    description: '',
    status: 'active'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, brandRes] = await Promise.all([
        categoryService.getAll(),
        brandService.getAll(true)
      ]);
      if (catRes.data) setCategories(catRes.data);
      if (brandRes.data) setBrands(brandRes.data);
    } catch (err) {
      showToast('Error loading categories: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      brand_id: brands[0]?.id || '',
      description: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      brand_id: cat.brand_id,
      description: cat.description || '',
      status: cat.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, formData);
        showToast('Category updated successfully', 'success');
      } else {
        await categoryService.create(formData);
        showToast('Category created successfully', 'success');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      await categoryService.delete(id);
      showToast('Category deleted', 'success');
      loadData();
    } catch (err) {
      showToast('Failed to delete: ' + err.message, 'error');
    }
  };

  return (
    <div>
      <SEOHead title="Manage Categories | Admin" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#0b1d33', margin: 0 }}>
            Manage Categories
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Organize product lines under SAKET and DWITECH brands.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          + Add New Category
        </button>
      </div>

      <div className="industrial-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0b1d33' }}>{c.name}</div>
                    <div style={{ fontSize: '0.785rem', color: '#64748b' }}>slug: {c.slug}</div>
                  </td>
                  <td>
                    <span className={`badge ${c.brands?.slug === 'saket' ? 'badge-saket' : 'badge-dwitech'}`}>
                      {c.brands?.name || 'Brand'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '300px' }}>
                    {c.description || '—'}
                  </td>
                  <td>
                    <span className={`badge ${c.status === 'active' ? 'badge-status-completed' : 'badge-status-closed'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => openEditModal(c)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="btn btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.8rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.25rem', color: '#0b1d33' }}>
              {editingCategory ? `Edit: ${editingCategory.name}` : 'Create Category'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand *</label>
                <select
                  className="form-select"
                  value={formData.brand_id}
                  onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCategoriesPage;
