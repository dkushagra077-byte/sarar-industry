import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      showToast('Welcome back to SARAR INDUSTRIES Admin Dashboard', 'success');
      navigate('/admin');
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please check credentials.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#071322',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <SEOHead title="Admin Login" />

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        maxWidth: '440px',
        width: '100%',
        padding: '40px 32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        borderTop: '4px solid #d97706'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            className="site-wordmark"
            src="/logos/sarar-logo.svg"
            alt="SARAR INDUSTRIES"
            style={{ height: '48px', margin: '0 auto 16px' }}
          />
          <h1 style={{ fontSize: '1.45rem', color: '#0b1d33', marginBottom: '6px' }}>
            Administrative Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
            Sign in with authorized corporate credentials
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Corporate Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
            style={{ marginTop: '8px' }}
          >
            {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8125rem' }}>
          <a href="/" style={{ color: '#64748b', textDecoration: 'none' }}>
            ← Return to Public Website
          </a>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
