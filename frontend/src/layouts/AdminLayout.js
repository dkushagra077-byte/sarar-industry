import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#071322', color: '#ffffff' }}>
        <p>Verifying admin session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', exact: true, icon: '📊' },
    { name: 'Manage Products', path: '/admin/products', icon: '📦' },
    { name: 'Manage Categories', path: '/admin/categories', icon: '📁' },
    { name: 'Manage Brands', path: '/admin/brands', icon: '🏷️' },
    { name: 'Manage Enquiries', path: '/admin/enquiries', icon: '📨' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0b1d33',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div>
          {/* Logo Brand Header */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>SARAR</span>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#d97706', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>ADMIN</span>
            </Link>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
              Industrial Management Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'rgba(217, 119, 6, 0.2)' : 'transparent',
                  color: isActive ? '#f59e0b' : '#cbd5e1',
                  borderLeft: isActive ? '3px solid #d97706' : '3px solid transparent'
                })}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>{user?.name || 'Administrator'}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user?.email}</div>
            <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#d97706', marginTop: '4px' }}>
              {user?.role || 'Admin'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '8px',
                fontSize: '0.8125rem',
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#cbd5e1',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              ↗ View Public Website
            </Link>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '0.8125rem',
                backgroundColor: 'transparent',
                color: '#f87171',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        
        {/* Top Navbar */}
        <header style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0b1d33', margin: 0 }}>
              SARAR INDUSTRIES Portal
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem' }}>
            <span style={{ color: '#64748b' }}>Connected as: <strong>{user?.name}</strong></span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ padding: '6px 12px' }}>
              Logout
            </button>
          </div>
        </header>

        {/* Admin Page Content */}
        <main style={{ padding: '32px', flex: 1 }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
