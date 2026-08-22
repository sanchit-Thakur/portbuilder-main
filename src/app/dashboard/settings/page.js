'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [toast, setToast] = useState(null);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetch('/api/portfolio')
      .then(async (r) => {
        if (r.status === 401) {
          router.push('/auth/login?redirect=/dashboard/settings');
          return null;
        }
        return r.json();
      })
      .then(d => {
        if (d?.user) setUser(d.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { full_name: user.full_name } }),
      });
      if (!res.ok) throw new Error('Failed to save profile');
      showToast('Profile information updated successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      showToast('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.prompt(
      '⚠️ WARNING: This will permanently delete your account, portfolio, projects, and all data.\n\nType DELETE to confirm:'
    );

    if (confirmation !== 'DELETE') {
      if (confirmation !== null) {
        showToast('Account deletion cancelled (confirmation text did not match)', 'error');
      }
      return;
    }

    setDeletingAccount(true);
    try {
      const res = await fetch('/api/auth/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to delete account');
      }

      alert('Your account and all associated data have been permanently deleted.');
      window.location.href = '/';
    } catch (err) {
      showToast(err.message, 'error');
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Account Settings</h1>
        <p className="text-muted" style={{ marginTop: '0.25rem' }}>Manage your profile, credentials, and account lifecycle</p>
      </div>

      {/* Profile Info Form */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.75rem', borderRadius: '16px' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1.25rem' }}>Profile Information</h2>
        <form onSubmit={handleProfileSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={user?.full_name || ''}
                onChange={e => setUser({ ...user, full_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
              <span className="form-helper">Email is linked to your login session</span>
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" value={user?.username || ''} disabled style={{ opacity: 0.6 }} />
              <span className="form-helper">Unique handle used for your public portfolio link</span>
            </div>
            <div className="form-group">
              <label className="form-label">Public Portfolio URL</label>
              <input
                className="form-input"
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/portfolio/${user?.username}`}
                disabled
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem' }} disabled={savingProfile}>
            {savingProfile ? 'Saving...' : '💾 Save Profile Changes'}
          </button>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.75rem', borderRadius: '16px' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>Change Password</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Update your account password securely.
        </p>

        <form onSubmit={handlePasswordChange}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px' }}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="form-input"
                placeholder="Minimum 6 characters"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="form-input"
                placeholder="Confirm new password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} disabled={savingPassword}>
              {savingPassword ? 'Updating...' : '🔒 Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.35)', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.03)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-error)', marginBottom: '0.5rem' }}>
          Danger Zone
        </h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Deleting your account will permanently wipe your profile, portfolio configuration, projects, analytics records, and uploaded files. This action cannot be reversed.
        </p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
        >
          {deletingAccount ? 'Deleting Account...' : '🗑️ Delete My Account Permanently'}
        </button>
      </div>
    </div>
  );
}
