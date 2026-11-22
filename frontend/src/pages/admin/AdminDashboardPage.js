import React, { useState, useEffect } from 'react';
import ApiClient from '../../services/api';
import { enquiryService } from '../../services/enquiryService';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await ApiClient.get('/stats');
        if (statsRes.data) {
          setStats(statsRes.data);
        }

        const enquiriesRes = await enquiryService.getAll({ limit: 5 });
        if (enquiriesRes.data) {
          setRecentEnquiries(enquiriesRes.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return <div>Loading real database metrics...</div>;
  }

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, color: '#0b1d33', icon: '📦' },
    { label: 'Active Products', value: stats?.activeProducts || 0, color: '#15803d', icon: '✅' },
    { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, color: '#2563eb', icon: '📨' },
    { label: 'New Enquiries', value: stats?.newEnquiries || 0, color: '#d97706', icon: '🔔' }
  ];

  return (
    <div>
      <SEOHead title="Admin Dashboard Overview" />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#0b1d33', marginBottom: '6px' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
          Real database metrics for products, catalogues, and customer enquiries.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        {statCards.map((card, i) => (
          <div
            key={i}
            className="industrial-card"
            style={{ padding: '24px', borderLeft: `4px solid ${card.color}` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{card.label}</span>
              <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: card.color, fontFamily: 'var(--font-heading)' }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Enquiries by Status */}
      <div className="industrial-card" style={{ padding: '24px', marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#0b1d33', marginBottom: '16px' }}>
          Enquiries by Status Breakdown
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['New', 'Contacted', 'In Progress', 'Completed', 'Closed'].map((st) => {
            const count = stats?.statusCounts?.[st] || 0;
            return (
              <div
                key={st}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '12px 18px',
                  minWidth: '130px'
                }}
              >
                <div style={{ fontSize: '0.785rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {st}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0b1d33' }}>
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="industrial-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#0b1d33', margin: 0 }}>
            Recent Customer Enquiries
          </h3>
          <Link to="/admin/enquiries" className="btn btn-secondary btn-sm">
            View All Enquiries →
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Brand / Product</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td style={{ fontWeight: 600 }}>{enq.customer_name}</td>
                    <td>{enq.company_name || '—'}</td>
                    <td><a href={`tel:${enq.phone}`}>{enq.phone}</a></td>
                    <td>{enq.brands?.name || enq.products?.name || 'General Enquiry'}</td>
                    <td>
                      <span className={`badge badge-status-${enq.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#64748b', margin: 0 }}>No customer enquiries received yet.</p>
        )}
      </div>

    </div>
  );
};

export default AdminDashboardPage;
