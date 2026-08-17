'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page bg-gradient-hero">
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>

      <div className="auth-container animate-scale-in">
        <Link href="/" className="auth-brand">
          <span style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>⬡</span>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>
            Port<span className="text-gradient">Builder</span>
          </span>
        </Link>

        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: '2rem' }}>Welcome back</h1>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>Sign in to your portfolio dashboard</p>

        {error && (
          <div className="auth-error">
            {error === 'Invalid credentials'
              ? 'Invalid credentials. If you have not registered yet, click "Create one free" below to sign up.'
              : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span> : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create one free</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        .auth-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 8s ease-in-out infinite;
        }
        .auth-orb-1 {
          width: 400px; height: 400px;
          background: rgba(108, 99, 255, 0.15);
          top: -100px; right: -100px;
        }
        .auth-orb-2 {
          width: 350px; height: 350px;
          background: rgba(236, 72, 153, 0.1);
          bottom: -100px; left: -100px;
          animation-delay: -4s;
        }
        .auth-container {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-2xl);
          padding: 3rem;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-xl);
          position: relative;
          z-index: 2;
        }
        .auth-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 2rem;
        }
        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
