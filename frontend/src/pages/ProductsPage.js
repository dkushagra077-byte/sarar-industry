import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import EnquiryModal from '../components/common/EnquiryModal';
import SEOHead from '../components/common/SEOHead';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialBrand = queryParams.get('brand') || '';
  const initialCategory = queryParams.get('category') || '';
  const initialSearch = queryParams.get('search') || '';
  const initialSort = queryParams.get('sort') || 'created_at_desc';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getAll({ status: 'active' });
        if (res.data) setCategories(res.data);
      } catch (e) {
        console.error('Failed to load categories for filter', e);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedBrand(params.get('brand') || '');
    setSelectedCategory(params.get('category') || '');
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await productService.getAll({
        brand: selectedBrand,
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        page,
        limit: 12,
        status: 'active'
      });

      if (res.data) {
        setProducts(res.data);
        if (res.meta) {
          setPagination({
            page: res.meta.page,
            limit: res.meta.limit,
            total: res.meta.total,
            totalPages: res.meta.totalPages
          });
        }
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [selectedBrand, selectedCategory, searchTerm, sortBy]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    const params = new URLSearchParams(location.search);
    if (brand) params.set('brand', brand);
    else params.delete('brand');
    navigate(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(location.search);
    if (cat) params.set('category', cat);
    else params.delete('category');
    navigate(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSearchTerm('');
    setSortBy('created_at_desc');
    navigate('/products');
  };

  const handleEnquire = (product) => {
    setSelectedProduct(product);
    setEnquiryModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <SEOHead
        title="Industrial Products Catalogue | SAKET & DWITECH"
        description="Browse the complete catalogue of industrial insulation, sealing products, ceramic blankets, rubber sheets and engineered components by SARAR INDUSTRIES."
      />

      {/* Header */}
      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '60px 0 50px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <div className="section-heading-tag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#f59e0b', borderLeftColor: '#f59e0b' }}>
            Official Catalogue
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '12px' }}>
            Industrial Product Catalogue
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '720px', fontSize: '1.05rem', margin: 0 }}>
            Comprehensive range of asbestos and ceramic products under our brand <strong>SAKET</strong>, along with rubber products and engineered components under our brand <strong>DWITECH</strong>.
          </p>
        </div>
      </div>

      <div className="container section-py">
        <ProductFilter
          categories={categories}
          selectedBrand={selectedBrand}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          sortBy={sortBy}
          onBrandChange={handleBrandChange}
          onCategoryChange={handleCategoryChange}
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
            Showing <strong>{products.length}</strong> of <strong>{pagination.total}</strong> products
            {selectedBrand && <span> under brand <strong>{selectedBrand.toUpperCase()}</strong></span>}
          </div>
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <p style={{ color: '#64748b' }}>Loading products from database...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => fetchProducts(pageNum)}
                    className={`btn btn-sm ${pagination.page === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#0b1d33', marginBottom: '10px' }}>No products found</h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              No products found matching your current filters. Please contact us for assistance with your industrial requirements.
            </p>
            <button onClick={() => setEnquiryModalOpen(true)} className="btn btn-primary">
              Submit Direct Requirement Enquiry
            </button>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductsPage;
