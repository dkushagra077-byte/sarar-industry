import React from 'react';

const ProductFilter = ({
  brands = [],
  categories = [],
  selectedBrand,
  selectedCategory,
  searchTerm,
  sortBy,
  onBrandChange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onReset
}) => {
  return (
    <div style={{
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
        
        {/* Search */}
        <div>
          <label className="form-label" style={{ fontSize: '0.8125rem' }}>Search Product</label>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, specs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Brand Filter */}
        <div>
          <label className="form-label" style={{ fontSize: '0.8125rem' }}>Filter by Brand</label>
          <select
            className="form-select"
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
          >
            <option value="">All Brands (SAKET &amp; DWITECH)</option>
            <option value="saket">SAKET (Insulation &amp; Sealing)</option>
            <option value="dwitech">DWITECH (Rubber &amp; Engineered)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="form-label" style={{ fontSize: '0.8125rem' }}>Filter by Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.brands?.name ? `[${cat.brands.name}] ` : ''}{cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div>
          <label className="form-label" style={{ fontSize: '0.8125rem' }}>Sort By</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="created_at_desc">Newest Products First</option>
            <option value="name_asc">Product Name (A-Z)</option>
            <option value="name_desc">Product Name (Z-A)</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <button
            type="button"
            onClick={onReset}
            className="btn btn-secondary btn-block"
            style={{ fontSize: '0.875rem', padding: '10px' }}
          >
            Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductFilter;
