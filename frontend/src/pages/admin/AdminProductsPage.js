import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { brandService } from '../../services/brandService';
import { categoryService } from '../../services/categoryService';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const AdminProductsPage = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand_id: '',
    category_id: '',
    short_description: '',
    description: '',
    main_image_url: '',
    specifications: '',
    applications: '',
    keywords: '',
    seo_title: '',
    seo_description: '',
    is_featured: false,
    status: 'active'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, brandRes, catRes] = await Promise.all([
        productService.getAll({ brand: selectedBrand, search: searchTerm, limit: 100 }),
        brandService.getAll(true),
        categoryService.getAll()
      ]);
      if (prodRes.data) setProducts(prodRes.data);
      if (brandRes.data) setBrands(brandRes.data);
      if (catRes.data) setCategories(catRes.data);
    } catch (err) {
      showToast('Error loading products: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedBrand, searchTerm]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand_id: brands[0]?.id || '',
      category_id: '',
      short_description: '',
      description: '',
      main_image_url: '',
      specifications: '{\n  "Thickness": "2.0 mm",\n  "Material": "Industrial"\n}',
      applications: 'High-temperature industrial gasketing, Furnace insulation',
      keywords: 'industrial, insulation, sealing',
      seo_title: '',
      seo_description: '',
      is_featured: false,
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      brand_id: p.brand_id,
      category_id: p.category_id || '',
      short_description: p.short_description || '',
      description: p.description,
      main_image_url: p.main_image_url || '',
      specifications: typeof p.specifications === 'object' ? JSON.stringify(p.specifications, null, 2) : (p.specifications || ''),
      applications: Array.isArray(p.applications) ? p.applications.join(', ') : (p.applications || ''),
      keywords: Array.isArray(p.keywords) ? p.keywords.join(', ') : (p.keywords || ''),
      seo_title: p.seo_title || '',
      seo_description: p.seo_description || '',
      is_featured: Boolean(p.is_featured),
      status: p.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingImage(true);
    try {
      const res = await productService.uploadImage(data);
      if (res.data?.url) {
        setFormData(prev => ({ ...prev, main_image_url: res.data.url }));
        showToast('Image uploaded successfully to storage', 'success');
      }
    } catch (err) {
      showToast('Image upload failed: ' + err.message, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(formData.specifications || '{}');
      } catch (e) {
        showToast('Specifications must be valid JSON format', 'error');
        return;
      }

      const payload = {
        ...formData,
        specifications: parsedSpecs,
        applications: formData.applications ? formData.applications.split(',').map(s => s.trim()) : [],
        keywords: formData.keywords ? formData.keywords.split(',').map(s => s.trim()) : []
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
        showToast('Product updated successfully', 'success');
      } else {
        await productService.create(payload);
        showToast('Product created successfully', 'success');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete product "${name}"?`)) return;
    try {
      await productService.delete(id);
      showToast('Product deleted', 'success');
      loadData();
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  const toggleStatus = async (product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    try {
      await productService.update(product.id, { status: newStatus });
      showToast(`Product set to ${newStatus}`, 'success');
      loadData();
    } catch (err) {
      showToast('Status update failed: ' + err.message, 'error');
    }
  };

  return (
    <div>
      <SEOHead title="Manage Products | Admin" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#0b1d33', margin: 0 }}>
            Manage Products
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Add, edit, activate/deactivate, and manage specifications for SAKET &amp; DWITECH products.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          + Add New Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="industrial-card" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by product name..."
          className="form-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <select
          className="form-select"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={{ maxWidth: '240px' }}
        >
          <option value="">All Brands</option>
          <option value="saket">SAKET</option>
          <option value="dwitech">DWITECH</option>
        </select>
      </div>

      {/* Table */}
      <div className="industrial-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const isSaket = p.brands?.slug === 'saket';
                return (
                  <tr key={p.id}>
                    <td style={{ width: 60 }}>
                      <img
                        src={p.main_image_url || '/images/products/product-placeholder.svg'}
                        alt=""
                        style={{ width: 44, height: 44, objectFit: 'contain', backgroundColor: '#f8fafc', borderRadius: 4 }}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/products/product-placeholder.svg'; }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0b1d33' }}>{p.name}</div>
                      <div style={{ fontSize: '0.785rem', color: '#64748b' }}>slug: {p.slug}</div>
                    </td>
                    <td>
                      <span className={`badge ${isSaket ? 'badge-saket' : 'badge-dwitech'}`}>
                        {p.brands?.name || 'Brand'}
                      </span>
                    </td>
                    <td>{p.categories?.name || '—'}</td>
                    <td>
                      {p.is_featured ? (
                        <span style={{ color: '#d97706', fontWeight: 700 }}>★ Featured</span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(p)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <span className={`badge ${p.status === 'active' ? 'badge-status-completed' : 'badge-status-closed'}`}>
                          {p.status}
                        </span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="btn btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.8rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0b1d33' }}>
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Industrial Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    <option value="">Select Category (Optional)</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
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
              </div>

              {/* Image Upload / Storage */}
              <div className="form-group" style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <label className="form-label">Upload Product Image (Supabase Storage)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    style={{ fontSize: '0.85rem' }}
                  />
                  {uploadingImage && <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Uploading to storage...</span>}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Or enter image URL directly"
                    value={formData.main_image_url}
                    onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Summary</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="One line industrial summary"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Technical Description *</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technical Specifications (JSON format)</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Industrial Applications (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.applications}
                  onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">SEO Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO Keywords</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <span>Mark as Featured Product</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProductsPage;
