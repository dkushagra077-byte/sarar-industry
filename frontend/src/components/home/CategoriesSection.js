import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getAll({ status: 'active' });
        if (res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="section-py" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container text-center">
          <p style={{ color: '#64748b' }}>Loading industrial product categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-py" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        
        <div className="text-center" style={{ marginBottom: '44px' }}>
          <div className="section-heading-tag">Catalogue Overview</div>
          <h2 className="section-title">Product Categories</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore our specialized categories across thermal insulation, industrial gasketing, and precision engineered rubber components.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {categories.map((cat) => {
            const isSaket = cat.brands?.slug === 'saket' || cat.brand_id?.includes('1111');
            const badgeClass = isSaket ? 'badge-saket' : 'badge-dwitech';
            const brandLabel = isSaket ? 'SAKET' : 'DWITECH';
            const brandSlug = isSaket ? 'saket' : 'dwitech';

            return (
              <div key={cat.id} className="industrial-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className={`badge ${badgeClass}`}>{brandLabel}</span>
                    <span style={{ fontSize: '0.785rem', color: '#64748b' }}>
                      {cat.product_count || 0} Products
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#0b1d33', marginBottom: '10px' }}>
                    {cat.name}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                    {cat.description || 'Precision manufactured industrial components engineered to exact quality standards.'}
                  </p>
                </div>

                <div>
                  <Link
                    to={`/products?brand=${brandSlug}&category=${cat.slug}`}
                    className="btn btn-secondary btn-sm btn-block"
                  >
                    View Category Products →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;
