'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/analytics').then(r => r.json()),
      fetch('/api/portfolio').then(r => r.json()),
    ]).then(([analyticsData, portfolioData]) => {
      setStats(analyticsData);
      setUser(portfolioData.user);
      setPortfolio(portfolioData.portfolio);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  const maxViews = stats?.dailyViews?.length > 0
    ? Math.max(...stats.dailyViews.map(d => d.views))
    : 1;

  return (
    <div className="overview">
      <div className="overview-header">
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
            Welcome back, <span className="text-gradient">{user?.full_name || user?.username || 'User'}</span> 👋
          </h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>Here&apos;s how your portfolio is performing</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/dashboard/edit" className="btn btn-primary">Edit Portfolio</Link>
          {user && (
            <Link href={`/portfolio/${user.username}`} target="_blank" className="btn btn-secondary">
              View Live ↗
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-card-icon" style={{ background: 'rgba(108, 99, 255, 0.12)', color: '#8B83FF' }}>👁️</div>
          <div>
            <div className="stat-card-value">{stats?.totalViews || 0}</div>
            <div className="stat-card-label">Total Views</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>👥</div>
          <div>
            <div className="stat-card-value">{stats?.uniqueVisitors || 0}</div>
            <div className="stat-card-label">Unique Visitors</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}>📈</div>
          <div>
            <div className="stat-card-value">{stats?.todayViews || 0}</div>
            <div className="stat-card-label">Views Today</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-card-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>🎨</div>
          <div>
            <div className="stat-card-value" style={{ textTransform: 'capitalize' }}>
              {portfolio?.theme?.replace(/-/g, ' ') || 'None'}
            </div>
            <div className="stat-card-label">Current Theme</div>
          </div>
        </div>
      </div>

      {/* Chart + Referrers */}
      <div className="overview-grid">
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Views — Last 7 Days</h3>
          <div className="chart-container">
            {stats?.dailyViews?.length > 0 ? (
              <div className="bar-chart">
                {stats.dailyViews.map((d, i) => (
                  <div key={i} className="bar-col">
                    <div className="bar-value">{d.views}</div>
                    <div className="bar" style={{ height: `${(d.views / maxViews) * 100}%` }}></div>
                    <div className="bar-label">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span style={{ fontSize: '2rem' }}>📊</span>
                <p className="text-muted">No views yet. Share your portfolio to get started!</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Top Referrers</h3>
          {stats?.topReferrers?.length > 0 ? (
            <div className="referrers-list">
              {stats.topReferrers.map((r, i) => (
                <div key={i} className="referrer-item">
                  <span className="text-muted" style={{ fontSize: 'var(--text-sm)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.referrer || 'Direct'}
                  </span>
                  <span className="badge badge-primary">{r.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span style={{ fontSize: '2rem' }}>🔗</span>
              <p className="text-muted">Referrer data will appear as visitors arrive.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard/edit" className="btn btn-secondary">✏️ Edit Content</Link>
          <Link href="/dashboard/themes" className="btn btn-secondary">🎨 Change Theme</Link>
          <a href="/api/resume" target="_blank" className="btn btn-secondary">📄 Download Resume</a>
          {user && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user.username}`);
                alert('Portfolio URL copied!');
              }}
            >
              📋 Copy Portfolio URL
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
        }
        .stat-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .stat-card-value {
          font-size: var(--text-xl);
          font-weight: 700;
        }
        .stat-card-label {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 0.125rem;
        }
        .overview-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        .chart-container {
          height: 220px;
          display: flex;
          align-items: flex-end;
        }
        .bar-chart {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          height: 100%;
          align-items: flex-end;
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .bar-value {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 0.25rem;
        }
        .bar {
          width: 100%;
          max-width: 50px;
          background: linear-gradient(to top, var(--color-primary), var(--color-primary-light));
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          min-height: 4px;
          transition: height 0.5s ease;
        }
        .bar-label {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 0.5rem;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 0.75rem;
          text-align: center;
        }
        .referrers-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .referrer-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .referrer-item:last-child { border-bottom: none; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .overview-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
