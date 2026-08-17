'use client';

import { useState, useEffect } from 'react';
import { THEMES } from '@/lib/constants';

export default function ThemesPage() {
  const [currentTheme, setCurrentTheme] = useState('minimal-elegance');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { if (d.portfolio?.theme) setCurrentTheme(d.portfolio.theme); })
      .catch(() => {});
  }, []);

  const selectTheme = async (themeId) => {
    setCurrentTheme(themeId);
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: { theme: themeId } }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Choose Your Theme</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>Select a theme that represents your style</p>
        </div>
        {saved && <span className="badge badge-success">✓ Theme saved!</span>}
        {saving && <span className="spinner"></span>}
      </div>

      <div className="themes-grid">
        {Object.values(THEMES).map(theme => (
          <div
            key={theme.id}
            className={`theme-option card card-hover ${currentTheme === theme.id ? 'theme-selected' : ''}`}
            onClick={() => selectTheme(theme.id)}
          >
            {/* Theme preview */}
            <div
              className="theme-preview-box"
              style={{ background: theme.colors.background, color: theme.colors.text }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})` }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: theme.font }}>John Doe</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>Developer</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {['Skill 1', 'Skill 2'].map(s => (
                  <span key={s} style={{
                    fontSize: '10px', padding: '2px 8px', borderRadius: '10px',
                    background: `${theme.colors.accent}22`, color: theme.colors.accent
                  }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ height: '40px', borderRadius: '6px', background: `${theme.colors.accent}15` }}></div>
                <div style={{ height: '40px', borderRadius: '6px', background: `${theme.colors.accent}15` }}></div>
              </div>
            </div>

            {/* Theme info */}
            <div style={{ padding: '1rem 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{theme.name}</h3>
                {currentTheme === theme.id && <span className="badge badge-success">Active</span>}
              </div>
              <p className="text-muted" style={{ fontSize: 'var(--text-xs)', marginTop: '0.25rem' }}>{theme.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .themes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .theme-option {
          cursor: pointer;
          padding: 1rem;
          transition: all 0.3s;
        }
        .theme-selected {
          border-color: var(--color-primary) !important;
          box-shadow: var(--shadow-glow) !important;
        }
        .theme-preview-box {
          border-radius: var(--radius-md);
          padding: 1.25rem;
          min-height: 160px;
          border: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
}
