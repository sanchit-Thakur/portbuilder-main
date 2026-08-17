'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateId } from '@/lib/utils';
import { SKILL_CATEGORIES } from '@/lib/constants';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';

const TABS = [
  { id: 'hero', label: '🏠 Hero', icon: '🏠' },
  { id: 'about', label: '👤 About', icon: '👤' },
  { id: 'skills', label: '⚡ Skills', icon: '⚡' },
  { id: 'projects', label: '💼 Projects', icon: '💼' },
  { id: 'experience', label: '📋 Experience', icon: '📋' },
  { id: 'education', label: '🎓 Education', icon: '🎓' },
  { id: 'testimonials', label: '💬 Testimonials', icon: '💬' },
  { id: 'contact', label: '📧 Contact', icon: '📧' },
];

const PRESET_COLORS = ['#6C63FF', '#00d4aa', '#ff6b35', '#3a86ff', '#ec4899', '#f59e0b', '#10b981'];

export default function EditPortfolio() {
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [splitView, setSplitView] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveData = useCallback(async (updates) => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to save');
      showToast('Changes saved successfully!');
    } catch {
      showToast('Failed to save. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  }, []);

  const updatePortfolio = (field, value) => {
    setData(prev => ({
      ...prev,
      portfolio: { ...prev.portfolio, [field]: value }
    }));
  };

  const handleSave = () => {
    saveData({
      portfolio: data.portfolio,
      skills: data.skills,
      projects: data.projects,
      experiences: data.experiences,
      education: data.education,
      testimonials: data.testimonials,
      user: data.user,
    });
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/portfolio/upload', { method: 'POST', body: formData });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    return result.url;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  return (
    <div className="editor">
      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <div className="editor-header">
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Edit Portfolio</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>Customize your content with real-time live preview</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSplitView(!splitView)}
            style={{ fontSize: '0.85rem' }}
          >
            {splitView ? '👁️ Full Editor' : '📱 Split Live Preview'}
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></span> Saving...</> : '💾 Save All Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="editor-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`editor-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Layout Container */}
      <div className={`editor-main-container ${splitView ? 'split' : 'full'}`}>
        {/* Editor Form Panel */}
        <div className="editor-content card">
          {activeTab === 'hero' && <HeroEditor data={data} updatePortfolio={updatePortfolio} uploadImage={uploadImage} />}
          {activeTab === 'about' && <AboutEditor data={data} updatePortfolio={updatePortfolio} uploadImage={uploadImage} />}
          {activeTab === 'skills' && <SkillsEditor data={data} setData={setData} />}
          {activeTab === 'projects' && <ProjectsEditor data={data} setData={setData} uploadImage={uploadImage} />}
          {activeTab === 'experience' && <ExperienceEditor data={data} setData={setData} />}
          {activeTab === 'education' && <EducationEditor data={data} setData={setData} />}
          {activeTab === 'testimonials' && <TestimonialsEditor data={data} setData={setData} />}
          {activeTab === 'contact' && <ContactEditor data={data} updatePortfolio={updatePortfolio} />}
        </div>

        {/* Live Preview Panel */}
        {splitView && (
          <div className="editor-live-preview-panel">
            <div className="preview-chrome-header">
              <div className="chrome-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="chrome-url">Real-time Live Preview</div>
            </div>
            <div className="preview-scroll-area">
              <PortfolioRenderer data={data} />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .editor-tabs {
          display: flex;
          gap: 0.25rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .editor-tab {
          padding: 0.625rem 1rem;
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-muted);
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          white-space: nowrap;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
        }
        .editor-tab:hover { color: var(--color-text); background: var(--color-surface); }
        .editor-tab.active {
          color: var(--color-primary-light);
          border-bottom-color: var(--color-primary);
          background: rgba(108, 99, 255, 0.06);
        }
        .editor-main-container {
          display: grid;
          gap: 1.5rem;
        }
        .editor-main-container.split {
          grid-template-columns: 1fr 1fr;
        }
        .editor-main-container.full {
          grid-template-columns: 1fr;
        }
        .editor-content { padding: 2rem; }
        .editor-live-preview-panel {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--color-surface);
          display: flex;
          flex-direction: column;
          height: calc(100vh - 220px);
          position: sticky;
          top: 100px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }
        .preview-chrome-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border);
        }
        .chrome-dots { display: flex; gap: 6px; }
        .chrome-dots .dot { width: 10px; height: 10px; border-radius: 50%; display: block; }
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green { background: #28c840; }
        .chrome-url {
          flex: 1; textAlign: center; font-size: 0.75rem;
          color: var(--color-text-muted); background: var(--color-surface);
          padding: 3px 12px; border-radius: 6px; font-weight: 500;
        }
        .preview-scroll-area {
          flex: 1;
          overflow-y: auto;
          background: #000;
        }

        @media (max-width: 1024px) {
          .editor-main-container.split { grid-template-columns: 1fr; }
          .editor-live-preview-panel { height: 500px; position: static; }
        }
        @media (max-width: 768px) {
          .editor-content { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}

/* ── Hero Editor ────────────────────────────────────────── */
function HeroEditor({ data, updatePortfolio, uploadImage }) {
  const p = data.portfolio;
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      updatePortfolio('profile_image', url);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="editor-section">
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: '1.5rem' }}>Hero Section</h2>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Your Name / Title</label>
          <input className="form-input" placeholder="John Doe" value={p.hero_title || ''} onChange={e => updatePortfolio('hero_title', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Subtitle / Role</label>
          <input className="form-input" placeholder="Full-Stack Developer" value={p.hero_subtitle || ''} onChange={e => updatePortfolio('hero_subtitle', e.target.value)} />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Tagline</label>
          <input className="form-input" placeholder="Building the future, one line of code at a time" value={p.tagline || ''} onChange={e => updatePortfolio('tagline', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Accent Color</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input type="color" value={p.accent_color || '#6C63FF'} onChange={e => updatePortfolio('accent_color', e.target.value)} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updatePortfolio('accent_color', c)}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', background: c, border: p.accent_color === c ? '2px solid #fff' : 'none', cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">CTA Button Text</label>
          <input className="form-input" placeholder="View My Work" value={p.cta_text || ''} onChange={e => updatePortfolio('cta_text', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">CTA Button Link</label>
          <input className="form-input" placeholder="#projects" value={p.cta_link || ''} onChange={e => updatePortfolio('cta_link', e.target.value)} />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Profile Photo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {p.profile_image && (
              <div className="avatar avatar-lg" style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden' }}>
                <img src={p.profile_image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
              📷 Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── About Editor ───────────────────────────────────────── */
function AboutEditor({ data, updatePortfolio, uploadImage }) {
  const p = data.portfolio;
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      updatePortfolio('about_image', url);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="editor-section">
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: '1.5rem' }}>About Me</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Short Bio</label>
          <input className="form-input" placeholder="A passionate developer with 5+ years of experience..." value={p.bio || ''} onChange={e => updatePortfolio('bio', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">About Text (detailed)</label>
          <textarea className="form-input form-textarea" placeholder="Tell your story. What drives you? What's your philosophy?" value={p.about_text || ''} onChange={e => updatePortfolio('about_text', e.target.value)} rows={6} />
        </div>
        <div className="form-group">
          <label className="form-label">About Photo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {p.about_image && (
              <img src={p.about_image} alt="About" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
            )}
            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
              📷 Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Skills Editor ──────────────────────────────────────── */
function SkillsEditor({ data, setData }) {
  const addSkill = () => {
    setData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { id: generateId(), name: '', category: 'General', proficiency: 80 }]
    }));
  };

  const updateSkill = (index, field, value) => {
    setData(prev => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...prev, skills };
    });
  };

  const removeSkill = (index) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="editor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Skills</h2>
        <button className="btn btn-primary btn-sm" onClick={addSkill}>+ Add Skill</button>
      </div>

      {data.skills?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</p>
          <p>No skills added yet. Click &quot;Add Skill&quot; to get started.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.skills?.map((skill, i) => (
          <div key={skill.id || i} className="item-row" style={{ display: 'flex', gap: '0.5rem' }}>
            <input className="form-input" placeholder="Skill name" value={skill.name} onChange={e => updateSkill(i, 'name', e.target.value)} style={{ flex: 2 }} />
            <select className="form-input" value={skill.category} onChange={e => updateSkill(i, 'category', e.target.value)} style={{ flex: 1 }}>
              {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" className="form-input" min="0" max="100" value={skill.proficiency} onChange={e => updateSkill(i, 'proficiency', parseInt(e.target.value) || 0)} style={{ width: '80px' }} />
            <button className="btn btn-ghost btn-sm" onClick={() => removeSkill(i)} style={{ color: 'var(--color-error)' }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Projects Editor ────────────────────────────────────── */
function ProjectsEditor({ data, setData, uploadImage }) {
  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), {
        id: generateId(), title: '', description: '', short_description: '',
        image: '', tech_stack: [], live_url: '', github_url: '', category: '',
        impact_metrics: '', featured: false,
      }]
    }));
  };

  const updateProject = (index, field, value) => {
    setData(prev => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const removeProject = (index) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      updateProject(index, 'image', url);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="editor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Projects</h2>
        <button className="btn btn-primary btn-sm" onClick={addProject}>+ Add Project</button>
      </div>

      {data.projects?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💼</p>
          <p>No projects yet. Showcase your best work!</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.projects?.map((proj, i) => (
          <div key={proj.id || i} className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>Project {i + 1}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => removeProject(i)} style={{ color: 'var(--color-error)' }}>🗑️ Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="My Awesome Project" value={proj.title} onChange={e => updateProject(i, 'title', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" placeholder="Web App, Mobile, etc." value={proj.category || ''} onChange={e => updateProject(i, 'category', e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Short Description</label>
                <input className="form-input" placeholder="A brief one-liner about the project" value={proj.short_description || ''} onChange={e => updateProject(i, 'short_description', e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Full Description</label>
                <textarea className="form-input form-textarea" placeholder="Describe the problem, your process, and the impact..." value={proj.description || ''} onChange={e => updateProject(i, 'description', e.target.value)} rows={4} />
              </div>
              <div className="form-group">
                <label className="form-label">Tech Stack (comma separated)</label>
                <input className="form-input" placeholder="React, Node.js, PostgreSQL" value={Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : ''} onChange={e => updateProject(i, 'tech_stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
              </div>
              <div className="form-group">
                <label className="form-label">Impact Metrics</label>
                <input className="form-input" placeholder="Increased conversions by 25%" value={proj.impact_metrics || ''} onChange={e => updateProject(i, 'impact_metrics', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Live URL</label>
                <input className="form-input" placeholder="https://example.com" value={proj.live_url || ''} onChange={e => updateProject(i, 'live_url', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input className="form-input" placeholder="https://github.com/..." value={proj.github_url || ''} onChange={e => updateProject(i, 'github_url', e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Project Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {proj.image && <img src={proj.image} alt="" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />}
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    📷 Upload
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, i)} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Experience Editor ──────────────────────────────────── */
function ExperienceEditor({ data, setData }) {
  const addExp = () => {
    setData(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), {
        id: generateId(), company: '', role: '', description: '',
        start_date: '', end_date: '', is_current: false, location: ''
      }]
    }));
  };

  const updateExp = (index, field, value) => {
    setData(prev => {
      const experiences = [...prev.experiences];
      experiences[index] = { ...experiences[index], [field]: value };
      return { ...prev, experiences };
    });
  };

  const removeExp = (index) => {
    setData(prev => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
  };

  return (
    <div className="editor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Experience</h2>
        <button className="btn btn-primary btn-sm" onClick={addExp}>+ Add Experience</button>
      </div>

      {data.experiences?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</p>
          <p>No experience added. Share your career journey!</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.experiences?.map((exp, i) => (
          <div key={exp.id || i} className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>Experience {i + 1}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => removeExp(i)} style={{ color: 'var(--color-error)' }}>🗑️</button>
            </div>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Company</label><input className="form-input" placeholder="Google" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Role</label><input className="form-input" placeholder="Senior Engineer" value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" placeholder="Jan 2022" value={exp.start_date || ''} onChange={e => updateExp(i, 'start_date', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">End Date</label><input className="form-input" placeholder="Present" value={exp.end_date || ''} onChange={e => updateExp(i, 'end_date', e.target.value)} disabled={exp.is_current} /></div>
              <div className="form-group"><label className="form-label">Location</label><input className="form-input" placeholder="San Francisco, CA" value={exp.location || ''} onChange={e => updateExp(i, 'location', e.target.value)} /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                <input type="checkbox" checked={exp.is_current || false} onChange={e => updateExp(i, 'is_current', e.target.checked)} id={`current-${i}`} />
                <label htmlFor={`current-${i}`} style={{ fontSize: 'var(--text-sm)' }}>Currently working here</label>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Description</label><textarea className="form-input form-textarea" placeholder="Describe your responsibilities and achievements..." value={exp.description || ''} onChange={e => updateExp(i, 'description', e.target.value)} rows={3} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Education Editor ───────────────────────────────────── */
function EducationEditor({ data, setData }) {
  const addEdu = () => {
    setData(prev => ({
      ...prev,
      education: [...(prev.education || []), {
        id: generateId(), institution: '', degree: '', field: '',
        start_date: '', end_date: '', description: ''
      }]
    }));
  };

  const updateEdu = (index, field, value) => {
    setData(prev => {
      const education = [...prev.education];
      education[index] = { ...education[index], [field]: value };
      return { ...prev, education };
    });
  };

  const removeEdu = (index) => {
    setData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  return (
    <div className="editor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Education</h2>
        <button className="btn btn-primary btn-sm" onClick={addEdu}>+ Add Education</button>
      </div>

      {data.education?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</p>
          <p>No education entries yet. Add your academic background.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.education?.map((edu, i) => (
          <div key={edu.id || i} className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>Education {i + 1}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => removeEdu(i)} style={{ color: 'var(--color-error)' }}>🗑️</button>
            </div>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Institution</label><input className="form-input" placeholder="MIT" value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Degree</label><input className="form-input" placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Field of Study</label><input className="form-input" placeholder="Computer Science" value={edu.field || ''} onChange={e => updateEdu(i, 'field', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Start — End</label><input className="form-input" placeholder="2018 — 2022" value={`${edu.start_date || ''}${edu.end_date ? ' — ' + edu.end_date : ''}`} onChange={e => { const parts = e.target.value.split('—').map(s => s.trim()); updateEdu(i, 'start_date', parts[0] || ''); updateEdu(i, 'end_date', parts[1] || ''); }} /></div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Description</label><textarea className="form-input form-textarea" placeholder="Relevant coursework, achievements..." value={edu.description || ''} onChange={e => updateEdu(i, 'description', e.target.value)} rows={2} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials Editor ────────────────────────────────── */
function TestimonialsEditor({ data, setData }) {
  const addTestimonial = () => {
    setData(prev => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), {
        id: generateId(), name: '', role: '', company: '', text: '', image: ''
      }]
    }));
  };

  const updateTest = (index, field, value) => {
    setData(prev => {
      const testimonials = [...prev.testimonials];
      testimonials[index] = { ...testimonials[index], [field]: value };
      return { ...prev, testimonials };
    });
  };

  const removeTest = (index) => {
    setData(prev => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== index) }));
  };

  return (
    <div className="editor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Testimonials</h2>
        <button className="btn btn-primary btn-sm" onClick={addTestimonial}>+ Add Testimonial</button>
      </div>

      {data.testimonials?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</p>
          <p>No testimonials yet. Add praise from clients or colleagues!</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.testimonials?.map((test, i) => (
          <div key={test.id || i} className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>Testimonial {i + 1}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => removeTest(i)} style={{ color: 'var(--color-error)' }}>🗑️</button>
            </div>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" placeholder="Jane Smith" value={test.name} onChange={e => updateTest(i, 'name', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Role</label><input className="form-input" placeholder="CEO" value={test.role || ''} onChange={e => updateTest(i, 'role', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Company</label><input className="form-input" placeholder="Acme Corp" value={test.company || ''} onChange={e => updateTest(i, 'company', e.target.value)} /></div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Testimonial Text</label><textarea className="form-input form-textarea" placeholder="What they said about working with you..." value={test.text} onChange={e => updateTest(i, 'text', e.target.value)} rows={3} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact Editor ─────────────────────────────────────── */
function ContactEditor({ data, updatePortfolio }) {
  const p = data.portfolio;

  return (
    <div className="editor-section">
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: '1.5rem' }}>Contact & Social Links</h2>
      <div className="form-grid">
        <div className="form-group"><label className="form-label">📍 Location</label><input className="form-input" placeholder="San Francisco, CA" value={p.location || ''} onChange={e => updatePortfolio('location', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">📞 Phone</label><input className="form-input" placeholder="+1 (555) 000-0000" value={p.phone || ''} onChange={e => updatePortfolio('phone', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">🌐 Website</label><input className="form-input" placeholder="https://yoursite.com" value={p.website || ''} onChange={e => updatePortfolio('website', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">💼 LinkedIn</label><input className="form-input" placeholder="https://linkedin.com/in/..." value={p.linkedin || ''} onChange={e => updatePortfolio('linkedin', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">🐙 GitHub</label><input className="form-input" placeholder="https://github.com/..." value={p.github || ''} onChange={e => updatePortfolio('github', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">🐦 Twitter / X</label><input className="form-input" placeholder="https://x.com/..." value={p.twitter || ''} onChange={e => updatePortfolio('twitter', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">🎨 Dribbble</label><input className="form-input" placeholder="https://dribbble.com/..." value={p.dribbble || ''} onChange={e => updatePortfolio('dribbble', e.target.value)} /></div>
        <div className="form-group"><label className="form-label">📷 Instagram</label><input className="form-input" placeholder="https://instagram.com/..." value={p.instagram || ''} onChange={e => updatePortfolio('instagram', e.target.value)} /></div>
      </div>
    </div>
  );
}
