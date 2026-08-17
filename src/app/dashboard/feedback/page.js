'use client';

import { useState, useEffect } from 'react';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [toast, setToast] = useState(null);

  const isAdmin = (u) => {
    if (!u) return false;
    const adminEmails = ['sanchitt@gmail.com', 'sanchit@gmail.com'];
    const adminUsernames = ['san123'];
    return adminEmails.includes(u.email) || adminUsernames.includes(u.username);
  };

  useEffect(() => {
    const fetchUserAndFeedback = async () => {
      try {
        // 1. Fetch current logged-in user profile
        const userRes = await fetch('/api/portfolio');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);

          // If the user is admin, fetch feedbacks
          if (isAdmin(userData.user)) {
            const url = new URL('/api/feedback', window.location.origin);
            if (filterCategory !== 'All') url.searchParams.set('category', filterCategory);
            if (filterRating !== 'All') url.searchParams.set('rating', filterRating);
            
            const res = await fetch(url);
            if (res.ok) {
              const data = await res.json();
              setFeedbacks(data);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndFeedback();
  }, [filterCategory, filterRating]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      const res = await fetch(`/api/feedback?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Feedback deleted successfully!');
        setFeedbacks(prev => prev.filter(f => f.id !== id));
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Stats calculation
  const totalSubmissions = feedbacks.length;
  const avgRating = totalSubmissions > 0
    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalSubmissions).toFixed(1)
    : '0.0';

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Bug': return { bg: 'rgba(239, 68, 68, 0.12)', text: '#f87171' }; // red
      case 'Suggestion': return { bg: 'rgba(245, 158, 11, 0.12)', text: '#fbbf24' }; // yellow
      case 'Other': return { bg: 'rgba(107, 114, 128, 0.12)', text: '#9ca3af' }; // gray
      default: return { bg: 'rgba(139, 92, 246, 0.12)', text: '#a78bfa' }; // purple (General)
    }
  };

  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Access check
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  if (!isAdmin(user)) {
    return (
      <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '4rem auto' }}>
        <span style={{ fontSize: '3rem' }}>🔒</span>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: '1.5rem', color: 'var(--color-error)' }}>Access Denied</h2>
        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
          This page is restricted to platform administrators only. If you believe this is an error, please contact support.
        </p>
        <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
          Back to Overview
        </Link>
      </div>
    );
  }

  return (
    <div className="feedback-dashboard">
      {/* Toast Alert */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      {/* Header */}
      <div className="feedback-header">
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Platform Feedback (Admin)</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>View feedback and ratings submitted by users of PortBuilder</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
        <div className="stat-card card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div className="stat-card-icon" style={{ background: 'rgba(108, 99, 255, 0.12)', color: '#8B83FF', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>💬</div>
          <div>
            <div className="stat-card-value" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{totalSubmissions}</div>
            <div className="stat-card-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>Total Submissions</div>
          </div>
        </div>
        <div className="stat-card card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>⭐</div>
          <div>
            <div className="stat-card-value" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{avgRating} / 5.0</div>
            <div className="stat-card-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>Average Platform Rating</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card filters-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filters:</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Category:</label>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              background: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
              color: 'var(--color-text)',
              outline: 'none',
            }}
          >
            <option value="All">All Categories</option>
            <option value="General">General Feedback</option>
            <option value="Suggestion">Feature Suggestion</option>
            <option value="Bug">Report a Bug</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Rating:</label>
          <select
            value={filterRating}
            onChange={e => setFilterRating(e.target.value)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              background: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
              color: 'var(--color-text)',
              outline: 'none',
            }}
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Main Feedback List */}
      <div className="feedback-list-container">
        {feedbacks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '3rem' }}>💬</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1rem', color: 'var(--color-text-secondary)' }}>No feedback found</h3>
            <p className="text-muted" style={{ maxWidth: '400px', margin: '0.5rem auto 0', fontSize: '0.9rem' }}>
              {filterCategory !== 'All' || filterRating !== 'All'
                ? 'Try clearing your filters to see more results.'
                : 'Feedback submitted by visitors on the PortBuilder landing page will appear here.'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {feedbacks.map((item) => {
              const catColor = getCategoryColor(item.category);
              return (
                <div key={item.id} className="card feedback-item-card" style={{ padding: '1.5rem', position: 'relative' }}>
                  
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {/* Avatar initials */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        {item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                        <a href={`mailto:${item.email}`} style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', textDecoration: 'underline' }}>{item.email}</a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{timeAgo(item.created_at)}</span>
                      <div style={{ color: '#fbbf24', fontSize: '0.95rem' }}>{getRatingStars(item.rating)}</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '0.5rem', margin: '0.75rem 0', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                      background: catColor.bg,
                      color: catColor.text,
                      fontWeight: 600
                    }}>{item.category}</span>
                  </div>

                  {/* Feedback Message */}
                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    margin: '0.75rem 0',
                    border: '1px solid rgba(255,255,255,0.03)',
                    whiteSpace: 'pre-wrap'
                  }}>{item.message}</p>

                  {/* Actions Area */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.75rem' }}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-ghost"
                      style={{ fontSize: '0.85rem', color: 'var(--color-error)', padding: '0.375rem 0.75rem' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .feedback-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .feedback-item-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .feedback-item-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
      `}</style>
    </div>
  );
}
