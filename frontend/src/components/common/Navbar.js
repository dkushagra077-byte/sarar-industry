import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { COMPANY_INFO } from '../../utils/constants';

const Navbar = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Brands', path: '/brands' },
    { name: 'Products', path: '/products' },
    { name: 'Industries We Serve', path: '/industries' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      {/* Top Corporate Strip */}
      <div style={{
        backgroundColor: '#071322',
        color: '#94a3b8',
        fontSize: '0.785rem',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: '#d97706', fontWeight: 700 }}>50+ YEARS</span> OF INDUSTRIAL MANUFACTURING EXPERTISE
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Contact Person: <strong style={{ color: '#e2e8f0' }}>{COMPANY_INFO.contactPerson}</strong></span>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} style={{ color: '#94a3b8' }}>
              📞 {COMPANY_INFO.phone}
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#94a3b8' }}>
              ✉ {COMPANY_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`site-header${isScrolled ? ' site-header-scrolled' : ''}`} style={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: isScrolled ? '0 10px 28px rgba(11,29,51,0.12)' : '0 2px 8px rgba(11,29,51,0.04)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              className="site-wordmark"
              src="/logos/sarar-logo.svg" 
              alt="SARAR INDUSTRIES" 
              style={{ height: '46px', width: 'auto' }} 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? '#d97706' : '#0b1d33',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  padding: '6px 0',
                  borderBottom: isActive ? '2px solid #d97706' : '2px solid transparent',
                  transition: 'color 0.15s ease'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Search bar & Enquire Now button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'none' }} className="desktop-search">
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 12px 8px 32px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    width: '180px',
                    outline: 'none'
                  }}
                />
                <span style={{ position: 'absolute', left: 10, top: 8, fontSize: '0.85rem', color: '#64748b' }}>🔍</span>
              </div>
            </form>

            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="btn btn-primary btn-sm"
              style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Enquire Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#0b1d33'
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-panel" style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
          }}>
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem'
                }}
              />
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? '#d97706' : '#0b1d33',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid #f1f5f9'
                  })}
                >
                  {link.name}
                </NavLink>
              ))}

              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start' }}
                >
                  📞 Call: {COMPANY_INFO.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry && onOpenEnquiry();
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
