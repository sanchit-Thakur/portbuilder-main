'use client';

import { useState, useEffect } from 'react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';

export default function PreviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Portfolio Preview</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>This is how your portfolio looks to visitors</p>
        </div>
      </div>

      <div style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: '#fff',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          background: 'var(--color-bg-tertiary)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e', display: 'block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'block' }}></span>
          </div>
          <div style={{
            flex: 1, textAlign: 'center', fontSize: '0.8rem',
            color: 'var(--color-text-muted)', background: 'var(--color-surface)',
            padding: '4px 16px', borderRadius: '6px'
          }}>
            /portfolio/{data?.user?.username}
          </div>
        </div>
        <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
          {data && <PortfolioRenderer data={data} />}
        </div>
      </div>
    </div>
  );
}
