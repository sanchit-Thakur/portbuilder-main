'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { setUser(d.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { full_name: user.full_name } }),
      });
      setToast('Settings saved!');
      setTimeout(() => setToast(''), 3000);
    } catch {
      setToast('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone!')) return;
    // In production, call a delete API
    alert('Account deletion would happen here in production.');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className="toast-container">
          <div className="toast toast-success">{toast}</div>
        </div>
      )}

      <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: '0.25rem' }}>Settings</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Manage your account settings</p>

      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.5rem' }}>Profile Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={user?.full_name || ''} onChange={e => setUser({ ...user, full_name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
            <span className="form-helper">Email cannot be changed</span>
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={user?.username || ''} disabled style={{ opacity: 0.6 }} />
            <span className="form-helper">Username cannot be changed</span>
          </div>
          <div className="form-group">
            <label className="form-label">Portfolio URL</label>
            <input className="form-input" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/portfolio/${user?.username}`} disabled style={{ opacity: 0.6 }} />
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : '💾 Save Changes'}
        </button>
      </div>

      <div className="card" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-error)', marginBottom: '0.5rem' }}>Danger Zone</h2>
        <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: '1rem' }}>
          Once you delete your account, all your data will be permanently removed. This action cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}
