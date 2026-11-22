import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import EnquiryModal from '../components/common/EnquiryModal';
import SEOHead from '../components/common/SEOHead';
import { COMPANY_INFO } from '../utils/constants';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const executeSearch = async (term) => {
    if (!term.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await productService.search(term.trim());
      if (res.data) {
        setResults(res.data);
      }
    } catch (err) {
      console.error('Search request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(q);
    if (q) {
      executeSearch(q);
    }
  }, [q]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch(searchTerm);
  };

  const handleEnquire = (product) => {
    setSelectedProduct(product);
    setEnquiryModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '70vh' }}>
      <SEOHead
        title={`Search Results for "${q}"`}
        description="Search industrial products across SAKET and DWITECH brands by SARAR INDUSTRIES."
      />

      {/* Header */}
      <div style={{ backgroundColor: '#0b1d33', color: '#ffffff', padding: '50px 0 40px', borderBottom: '4px solid #d97706' }}>
        <div className="container">
          <h1 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '14px' }}>
            Product Search
          </h1>
          
          <form onSubmit={handleFormSubmit} style={{ maxWidth: '640px', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by product name, specification, category or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: '#ffffff', padding: '12px 16px' }}
            />
            <button type="submit" className="btn btn-saket" style={{ flexShrink: 0 }}>
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container section-py">
        {loading ? (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <p style={{ color: '#64748b' }}>Searching product database...</p>
          </div>
        ) : searched && results.length > 0 ? (
          <div>
            <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '28px' }}>
              Found <strong>{results.length}</strong> industrial products matching "<strong>{searchTerm}</strong>":
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          </div>
        ) : searched && results.length === 0 ? (
          /* Exact requested Empty Search state */
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '48px 24px',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            <h3 style={{ color: '#0b1d33', fontSize: '1.35rem', marginBottom: '12px' }}>
              No products found.
            </h3>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
              No products found. Please contact us for assistance with your industrial requirements.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="btn btn-primary"
              >
                Submit Custom Enquiry
              </button>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn btn-secondary">
                📞 Call: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            Enter a search term above to find products under SAKET and DWITECH.
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

export default SearchPage;
