'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById('resume-paper');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data?.user?.full_name || data?.user?.username || 'Resume'} — Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; color: #1a1a2e; padding: 30px; }
            h1 { font-size: 26px; margin-bottom: 4px; color: #111; }
            h2 { font-size: 16px; color: #6C63FF; border-bottom: 2px solid #6C63FF; padding-bottom: 4px; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: 0.5px; }
            h3 { font-size: 14px; font-weight: 700; }
            .contact { color: #555; font-size: 12px; margin-bottom: 14px; line-height: 1.5; }
            .summary { font-size: 13px; color: #333; margin-bottom: 12px; line-height: 1.6; }
            .entry { margin-bottom: 12px; }
            .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
            .entry-header .date { font-size: 12px; color: #666; }
            .entry-sub { font-size: 12px; color: #444; font-weight: 600; }
            .entry p { font-size: 13px; margin-top: 3px; color: #333; line-height: 1.5; }
            .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
            .skill-tag { background: #f0efff; color: #6C63FF; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
            .project { margin-bottom: 10px; }
            .project-title { font-weight: 600; font-size: 13px; }
            .project-desc { font-size: 12px; color: #555; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  const { portfolio, skills = [], projects = [], experiences = [], education = [], user } = data || {};

  return (
    <div className="resume-dashboard-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Resume Builder & Export</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>Auto-generated ATS-friendly resume built directly from your portfolio data</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-primary">
            🖨️ Print / Save PDF
          </button>
          <a href="/api/resume" target="_blank" download className="btn btn-secondary">
            📄 Download HTML Resume
          </a>
          <Link href="/dashboard/edit" className="btn btn-secondary">
            ✏️ Edit Content
          </Link>
        </div>
      </div>

      {/* Main Resume Sheet Container */}
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#ffffff',
        color: '#1a1a2e',
        borderRadius: '12px',
        padding: '3.5rem 3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }} id="resume-paper">
        {/* Header Section */}
        <header style={{ marginBottom: '1.25rem', borderBottom: '1px solid #eeeeee', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            {user?.full_name || portfolio?.hero_title || user?.username}
          </h1>
          {portfolio?.hero_subtitle && (
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#6C63FF', marginTop: '0.25rem' }}>
              {portfolio.hero_subtitle}
            </p>
          )}

          {/* Contact Details */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.825rem', color: '#475569', marginTop: '0.75rem' }}>
            {portfolio?.location && <span>📍 {portfolio.location}</span>}
            {portfolio?.phone && <span>📞 {portfolio.phone}</span>}
            {user?.email && <span>✉️ {user.email}</span>}
            {portfolio?.website && <span>🌐 <a href={portfolio.website} target="_blank" rel="noreferrer" style={{ color: '#6C63FF' }}>{portfolio.website}</a></span>}
            {portfolio?.linkedin && <span>💼 <a href={portfolio.linkedin} target="_blank" rel="noreferrer" style={{ color: '#6C63FF' }}>LinkedIn</a></span>}
            {portfolio?.github && <span>🐙 <a href={portfolio.github} target="_blank" rel="noreferrer" style={{ color: '#6C63FF' }}>GitHub</a></span>}
          </div>
        </header>

        {/* Professional Summary */}
        {(portfolio?.bio || portfolio?.about_text) && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6C63FF', borderBottom: '2px solid #6C63FF', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
              {portfolio.bio || portfolio.about_text}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6C63FF', borderBottom: '2px solid #6C63FF', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Work Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {experiences.map(e => (
                <div key={e.id} className="entry">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{e.role}</h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {e.start_date}{e.end_date ? ` — ${e.end_date}` : e.is_current ? ' — Present' : ''}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6C63FF', marginTop: '0.125rem' }}>
                    {e.company}{e.location ? `, ${e.location}` : ''}
                  </div>
                  {e.description && (
                    <p style={{ fontSize: '0.875rem', color: '#334155', marginTop: '0.375rem', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6C63FF', borderBottom: '2px solid #6C63FF', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Key Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {projects.map(p => (
                <div key={p.id} className="project">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{p.title}</span>
                    {p.live_url && (
                      <a href={p.live_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#6C63FF', fontWeight: 500 }}>
                        Link ↗
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem', lineHeight: 1.5 }}>
                    {p.short_description || p.description || ''}
                  </p>
                  {Array.isArray(p.tech_stack) && p.tech_stack.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
                      {p.tech_stack.map(st => (
                        <span key={st} style={{ fontSize: '0.75rem', padding: '1px 6px', background: '#f1f5f9', color: '#475569', borderRadius: '4px' }}>
                          {st}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6C63FF', borderBottom: '2px solid #6C63FF', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {education.map(ed => (
                <div key={ed.id} className="entry">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {ed.degree}{ed.field ? ` in ${ed.field}` : ''}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {ed.start_date}{ed.end_date ? ` — ${ed.end_date}` : ''}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6C63FF' }}>
                    {ed.institution}
                  </div>
                  {ed.description && (
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem' }}>
                      {ed.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#6C63FF', borderBottom: '2px solid #6C63FF', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Technical Skills & Competencies
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map(s => (
                <span key={s.id} style={{
                  background: '#f0efff',
                  color: '#6C63FF',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
