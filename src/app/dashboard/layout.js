'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/edit', label: 'Edit Content', icon: '✏️' },
  { href: '/dashboard/resume', label: 'Resume', icon: '📄' },
  { href: '/dashboard/themes', label: 'Themes', icon: '🎨' },
  { href: '/dashboard/feedback', label: 'Feedback', icon: '💬' },
  { href: '/dashboard/preview', label: 'Preview', icon: '👁️' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user); })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };
  const visibleNavItems = navItems;

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-brand">
            <span style={{ fontSize: '1.6rem', color: 'var(--color-primary)', filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.3))' }}>⬡</span>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              Port<span className="text-gradient">Builder</span>
            </span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {visibleNavItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`sidebar-icon-container ${isActive ? 'active' : ''}`}>
                  {item.icon}
                </span>
                <span className="sidebar-link-text">{item.label}</span>
                {isActive && <span className="active-glow-indicator"></span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Floating Profile Card */}
        <div className="sidebar-footer">
          {user && (
            <Link href={`/portfolio/${user.username}`} target="_blank" className="sidebar-portfolio-link">
              <span className="portfolio-link-icon">🌐</span>
              <div className="portfolio-link-text-group">
                <span className="portfolio-link-title">View Portfolio</span>
                <span className="portfolio-link-subtitle">/portfolio/{user.username}</span>
              </div>
              <svg className="external-link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </Link>
          )}

          {user && (
            <div className="sidebar-profile-card">
              <div className="sidebar-avatar">
                {user.full_name ? user.full_name.split(' ').map(n => n[0]).join('').substring(0, 2) : user.username[0].toUpperCase()}
              </div>
              <div className="profile-info-group">
                <span className="profile-name">{user.full_name || user.username}</span>
                <span className="profile-email">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="sidebar-mini-logout" title="Logout">
                🚪
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          
          <div className="dashboard-header-right">
            {/* Minimal top bar since profile is now in sidebar */}
            <span className="header-status-badge">
              <span className="status-dot"></span> Live
            </span>
          </div>
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </main>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
        }
        
        /* ── Improved Sidebar ──────────────── */
        .sidebar {
          width: 280px;
          background: rgba(18, 18, 28, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sidebar-header {
          padding: 1.75rem 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        
        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        /* ── Sidebar Link Styling ──────────── */
        :global(.sidebar-link) {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all 0.25s var(--transition-base);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        :global(.sidebar-link:hover) {
          background: rgba(255, 255, 255, 0.04);
          color: var(--color-text);
          padding-left: 1.25rem;
        }
        
        :global(.sidebar-link.active) {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: #ffffff;
          box-shadow: 0 4px 20px var(--color-primary-glow);
          font-weight: 600;
        }

        /* ── Icon container inside nav item ── */
        .sidebar-icon-container {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s;
        }
        
        .sidebar-icon-container.active {
          background: rgba(255, 255, 255, 0.2);
        }
        
        :global(.sidebar-link:hover) .sidebar-icon-container {
          transform: scale(1.05);
        }

        .active-glow-indicator {
          position: absolute;
          left: 0;
          top: 25%;
          height: 50%;
          width: 4px;
          background: #ffffff;
          border-radius: 0 4px 4px 0;
        }
        
        /* ── Sidebar Footer ────────────────── */
        .sidebar-footer {
          padding: 1.25rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.15);
        }
        
        /* ── Live Portfolio Button ─────────── */
        :global(.sidebar-portfolio-link) {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border-radius: var(--radius-lg);
          color: #ffffff;
          background: linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(168, 85, 247, 0.15));
          border: 1px solid rgba(108, 99, 255, 0.3);
          transition: all 0.3s;
          cursor: pointer;
        }
        
        :global(.sidebar-portfolio-link:hover) {
          background: linear-gradient(135deg, rgba(108, 99, 255, 0.25), rgba(168, 85, 247, 0.25));
          border-color: rgba(108, 99, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(108, 99, 255, 0.2);
        }
        
        .portfolio-link-icon {
          font-size: 1.25rem;
        }
        
        .portfolio-link-text-group {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .portfolio-link-title {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        
        .portfolio-link-subtitle {
          font-size: 0.7rem;
          color: var(--color-text-secondary);
          opacity: 0.8;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .external-link-arrow {
          opacity: 0.7;
          transition: transform 0.2s;
        }

        :global(.sidebar-portfolio-link:hover) .external-link-arrow {
          transform: translate(2px, -2px);
          opacity: 1;
        }
        
        /* ── Profile Card ──────────────────── */
        .sidebar-profile-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }
        
        .sidebar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), #a855f7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: 0 2px 8px rgba(108, 99, 255, 0.3);
          flex-shrink: 0;
        }
        
        .profile-info-group {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        
        .profile-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .profile-email {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .sidebar-mini-logout {
          background: none;
          border: none;
          padding: 6px;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s;
        }
        
        .sidebar-mini-logout:hover {
          background: rgba(239, 68, 68, 0.15);
        }
        
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 99;
          display: none;
          backdrop-filter: blur(4px);
        }
        
        /* ── Main Layout Elements ──────────── */
        .dashboard-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }
        
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-bg);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        
        .menu-btn {
          display: none;
          color: var(--color-text);
          padding: 0.5rem;
        }
        
        .header-status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          animation: pulse 2s infinite;
        }
        
        .dashboard-content {
          flex: 1;
          padding: 2rem;
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-overlay { display: block; }
          .dashboard-main { margin-left: 0; }
          .menu-btn { display: block; }
        }
        
        @media (max-width: 768px) {
          .dashboard-content { padding: 1rem; }
          .dashboard-header { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
