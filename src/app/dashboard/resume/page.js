'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SAMPLE_RESUME_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alex Rivera - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10.5pt;
      padding: 40px 45px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* Header */
    .header { text-align: center; margin-bottom: 16px; }
    .header h1 { font-size: 24pt; font-weight: 700; color: #000000; margin-bottom: 6px; letter-spacing: -0.01em; }
    .contact-line { font-size: 9.5pt; color: #374151; }
    .contact-line a { color: #1d4ed8; text-decoration: none; }
    .contact-line a:hover { text-decoration: underline; }
    .contact-sep { color: #9ca3af; margin: 0 6px; }
    
    /* Section Headings */
    h2.section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #000000;
      margin-top: 16px;
      margin-bottom: 4px;
    }
    .divider {
      border: none;
      border-top: 1px solid #111827;
      margin-bottom: 10px;
    }
    
    /* Content Elements */
    p.summary { font-size: 10pt; text-align: justify; color: #1f2937; margin-bottom: 12px; line-height: 1.5; }
    
    ul.item-list { padding-left: 18px; margin-bottom: 10px; }
    ul.item-list li { margin-bottom: 4px; font-size: 10pt; color: #1f2937; }
    
    .item-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5pt; }
    .item-title { font-weight: 700; color: #000000; }
    .item-date { font-weight: 400; font-size: 10pt; color: #111827; }
    .item-sub { font-size: 10pt; color: #374151; font-weight: 600; margin-bottom: 2px; }
    
    .project-item { margin-bottom: 12px; }
    .project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
    .project-title { font-weight: 700; font-size: 10.5pt; color: #000000; }
    .project-link { font-size: 9.5pt; color: #1d4ed8; text-decoration: none; }
    
    .skills-list { padding-left: 18px; }
    .skills-list li { margin-bottom: 5px; font-size: 10pt; color: #1f2937; }
    .skill-cat { font-weight: 700; color: #000000; }

    @media print {
      body { padding: 0; max-width: 100%; }
      .contact-line a { color: #000000; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <h1>Alex Rivera</h1>
    <div class="contact-line">
      <a href="mailto:alex.rivera@example.com">alex.rivera@example.com</a>
      <span class="contact-sep">|</span>
      <span>+1 (555) 234-5678</span>
      <span class="contact-sep">|</span>
      <a href="https://linkedin.com">LinkedIn</a>
      <span class="contact-sep">|</span>
      <a href="https://github.com">GitHub</a>
      <span class="contact-sep">|</span>
      <a href="https://example.com">Portfolio</a>
    </div>
  </div>

  <!-- Profile summary -->
  <h2 class="section-title">Profile summary</h2>
  <div class="divider"></div>
  <p class="summary">
    Entry-Level <strong>Data Scientist & AI Engineer</strong> with strong foundations in Machine Learning, Natural Language Processing (NLP), and full-stack AI system integration. Experienced in developing end-to-end data pipelines using <strong>Python</strong>, vector databases, and modern Large Language Model (LLM) architectures. Demonstrated capabilities in predictive analytics, audio-to-text processing, and exploratory data analysis. Passionate about solving complex business problems through statistical modeling and quantitative analysis.
  </p>

  <!-- Education -->
  <h2 class="section-title">Education</h2>
  <div class="divider"></div>
  <ul class="item-list" style="list-style-type: disc;">
    <li>
      <div class="item-header">
        <span class="item-title">Bachelor of Technology in AI & Data Science</span>
        <span class="item-date">2024–2028</span>
      </div>
      <div class="item-sub">Institute of Technology & Science</div>
      <div>CGPA: <strong>8.2</strong></div>
    </li>
    <li style="margin-top: 6px;">
      <div class="item-header">
        <span class="item-title">Senior Secondary Education (Class 12th)</span>
        <span class="item-date">2022</span>
      </div>
      <div>Percentage: <strong>78.0%</strong></div>
    </li>
    <li style="margin-top: 6px;">
      <div class="item-header">
        <span class="item-title">Secondary School Education (Class 10th)</span>
        <span class="item-date">2020</span>
      </div>
      <div>Percentage: <strong>82.5%</strong></div>
    </li>
  </ul>

  <!-- Projects -->
  <h2 class="section-title">Projects</h2>
  <div class="divider"></div>

  <div class="project-item">
    <div class="project-header">
      <span class="project-title">Type-To-Write: AI Knowledge Retrieval System</span>
      <a href="https://github.com" class="project-link">[GitHub]</a>
    </div>
    <ul class="item-list" style="list-style-type: disc;">
      <li>Built a RAG-based platform leveraging <strong>LangChain</strong> and <strong>OpenAI GPT models</strong> to convert educational video content into searchable notes.</li>
      <li>Integrated <strong>OpenAI Whisper</strong> for audio transcription, obtaining high accuracy in transcript generation across noisy inputs.</li>
      <li>Implemented <strong>Vector Embeddings</strong> and semantic search indexing, reducing search query latency by <strong>40%</strong>.</li>
      <li><strong>Tech Stack:</strong> Python, Whisper, Vector DB, LangChain, Next.js, FastAPI</li>
    </ul>
  </div>

  <div class="project-item">
    <div class="project-header">
      <span class="project-title">CineVerse: Movie Discovery & Recommendation Engine</span>
      <a href="https://github.com" class="project-link">[GitHub]</a>
    </div>
    <ul class="item-list" style="list-style-type: disc;">
      <li>Built an AI-driven movie recommendation engine using <strong>Content-Based Filtering</strong>, <strong>TF-IDF Vectorization</strong>, and <strong>Cosine Similarity</strong> for personalized content matching.</li>
      <li>Performed <strong>NLP & Sentiment Analysis</strong> on metadata and user reviews across <strong>5,000+ movie titles</strong> to compute weighted sentiment scores and popularity metrics.</li>
      <li>Integrated <strong>TMDB API</strong> endpoints with optimized data pipelines and client-side caching, improving recommendation retrieval speed by <strong>35%</strong>.</li>
      <li><strong>Tech Stack:</strong> HTML5, CSS3, JavaScript, React.js, TMDB API</li>
    </ul>
  </div>

  <div class="project-item">
    <div class="project-header">
      <span class="project-title">Interactive Sales Analytics & Profitability Dashboard</span>
      <a href="https://github.com" class="project-link">[GitHub]</a>
    </div>
    <ul class="item-list" style="list-style-type: disc;">
      <li>Engineered an end-to-end Data Science dashboard to evaluate corporate sales streams and classify financial performance into <strong>profit vs. loss trajectories</strong>.</li>
      <li>Built modular REST APIs using <strong>FastAPI</strong> and <strong>Uvicorn</strong> for real-time KPI calculations, transaction processing, live simulation engines, and automated CSV report generation.</li>
      <li>Implemented database architecture using <strong>MySQL</strong> schema and <strong>SQLAlchemy ORM</strong> models with zero-friction fallback to SQLite for rapid local testing.</li>
      <li>Designed multi-dimensional visual graphs (line, bar, doughnut charts) using <strong>Chart.js</strong>, <strong>Plotly.js</strong>, and <strong>Tailwind CSS</strong>, optimizing inventory distribution by <strong>18%</strong>.</li>
      <li><strong>Tech Stack:</strong> Python, FastAPI, Uvicorn, MySQL, SQLAlchemy, HTML5, Tailwind CSS, Chart.js, Plotly.js, Pandas, NumPy</li>
    </ul>
  </div>

  <!-- Skills -->
  <h2 class="section-title">Skills</h2>
  <div class="divider"></div>
  <ul class="skills-list" style="list-style-type: disc;">
    <li><span class="skill-cat">Data Science & Machine Learning:</span> Data Cleaning, EDA, Feature Engineering, Statistical Analysis, Predictive Modeling, Scikit-learn, PyTorch, Pandas, NumPy, Matplotlib.</li>
    <li><span class="skill-cat">AI & LLMs:</span> OpenAI API (GPT-4), Whisper, RAG Pipelines, Vector Embeddings, LangChain, Prompt Engineering.</li>
    <li><span class="skill-cat">Programming Languages:</span> Python, SQL, C++, Java, C, HTML, CSS.</li>
  </ul>

</body>
</html>`;

export default function ResumePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('code'); // 'code' | 'auto'
  const [customHtml, setCustomHtml] = useState(SAMPLE_RESUME_CODE);
  const [toast, setToast] = useState(null);

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

  // Helper to generate auto resume code from DB portfolio data in classic ATS format
  const generateAutoHtml = () => {
    if (!data) return '';
    const { portfolio, skills = [], projects = [], experiences = [], education = [], user } = data;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${user?.full_name || user?.username} - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
      color: #111827; background: #ffffff; line-height: 1.45; font-size: 10.5pt;
      padding: 40px 45px; max-width: 800px; margin: 0 auto;
    }
    .header { text-align: center; margin-bottom: 16px; }
    .header h1 { font-size: 24pt; font-weight: 700; color: #000; margin-bottom: 6px; }
    .contact-line { font-size: 9.5pt; color: #374151; }
    .contact-line a { color: #1d4ed8; text-decoration: none; }
    .contact-sep { color: #9ca3af; margin: 0 6px; }
    h2.section-title { font-size: 12pt; font-weight: 700; color: #000; margin-top: 16px; margin-bottom: 4px; }
    .divider { border: none; border-top: 1px solid #111827; margin-bottom: 10px; }
    p.summary { font-size: 10pt; text-align: justify; color: #1f2937; margin-bottom: 12px; line-height: 1.5; }
    ul.item-list { padding-left: 18px; margin-bottom: 10px; }
    ul.item-list li { margin-bottom: 4px; font-size: 10pt; color: #1f2937; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5pt; }
    .item-title { font-weight: 700; color: #000; }
    .item-date { font-weight: 400; font-size: 10pt; color: #111827; }
    .item-sub { font-size: 10pt; color: #374151; font-weight: 600; margin-bottom: 2px; }
    .project-item { margin-bottom: 12px; }
    .project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
    .project-title { font-weight: 700; font-size: 10.5pt; color: #000; }
    .project-link { font-size: 9.5pt; color: #1d4ed8; text-decoration: none; }
    .skills-list { padding-left: 18px; }
    .skills-list li { margin-bottom: 5px; font-size: 10pt; color: #1f2937; }
    .skill-cat { font-weight: 700; color: #000; }
    @media print { body { padding: 0; max-width: 100%; } .contact-line a { color: #000; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>${user?.full_name || portfolio?.hero_title || user?.username}</h1>
    <div class="contact-line">
      ${user?.email ? `<a href="mailto:${user.email}">${user.email}</a>` : ''}
      ${portfolio?.phone ? `<span class="contact-sep">|</span><span>${portfolio.phone}</span>` : ''}
      ${portfolio?.linkedin ? `<span class="contact-sep">|</span><a href="${portfolio.linkedin}">LinkedIn</a>` : ''}
      ${portfolio?.github ? `<span class="contact-sep">|</span><a href="${portfolio.github}">GitHub</a>` : ''}
      ${portfolio?.website ? `<span class="contact-sep">|</span><a href="${portfolio.website}">Portfolio</a>` : ''}
    </div>
  </div>

  ${(portfolio?.bio || portfolio?.about_text) ? `
    <h2 class="section-title">Profile summary</h2>
    <div class="divider"></div>
    <p class="summary">${portfolio.bio || portfolio.about_text}</p>
  ` : ''}

  ${education.length > 0 ? `
    <h2 class="section-title">Education</h2>
    <div class="divider"></div>
    <ul class="item-list" style="list-style-type: disc;">
      ${education.map(ed => `
        <li>
          <div class="item-header">
            <span class="item-title">${ed.degree}${ed.field ? ' in ' + ed.field : ''}</span>
            <span class="item-date">${ed.start_date}${ed.end_date ? '–' + ed.end_date : ''}</span>
          </div>
          <div class="item-sub">${ed.institution}</div>
          ${ed.description ? `<div>${ed.description}</div>` : ''}
        </li>
      `).join('')}
    </ul>
  ` : ''}

  ${projects.length > 0 ? `
    <h2 class="section-title">Projects</h2>
    <div class="divider"></div>
    ${projects.map(p => `
      <div class="project-item">
        <div class="project-header">
          <span class="project-title">${p.title}</span>
          ${p.github_url || p.live_url ? `<a href="${p.github_url || p.live_url}" class="project-link">[Link]</a>` : ''}
        </div>
        <ul class="item-list" style="list-style-type: disc;">
          ${p.short_description || p.description ? `<li>${p.short_description || p.description}</li>` : ''}
          ${Array.isArray(p.tech_stack) && p.tech_stack.length > 0 ? `<li><strong>Tech Stack:</strong> ${p.tech_stack.join(', ')}</li>` : ''}
        </ul>
      </div>
    `).join('')}
  ` : ''}

  ${experiences.length > 0 ? `
    <h2 class="section-title">Work Experience</h2>
    <div class="divider"></div>
    ${experiences.map(ex => `
      <div class="project-item">
        <div class="project-header">
          <span class="project-title">${ex.role} — ${ex.company}</span>
          <span class="item-date">${ex.start_date}${ex.end_date ? '–' + ex.end_date : ex.is_current ? '–Present' : ''}</span>
        </div>
        <ul class="item-list" style="list-style-type: disc;">
          ${ex.description ? `<li>${ex.description}</li>` : ''}
        </ul>
      </div>
    `).join('')}
  ` : ''}

  ${skills.length > 0 ? `
    <h2 class="section-title">Skills</h2>
    <div class="divider"></div>
    <ul class="skills-list" style="list-style-type: disc;">
      <li><span class="skill-cat">Technical Skills:</span> ${skills.map(s => s.name).join(', ')}</li>
    </ul>
  ` : ''}
</body>
</html>`;
  };

  const activeHtml = mode === 'code' ? customHtml : generateAutoHtml();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(activeHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const handleDownload = () => {
    const blob = new Blob([activeHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.user?.username || 'resume'}-ats-resume.html`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Resume HTML downloaded successfully!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeHtml);
    showToast('Code copied to clipboard!');
  };

  const handleResetSample = () => {
    if (confirm('Reset editor to standard sample ATS code template?')) {
      setCustomHtml(SAMPLE_RESUME_CODE);
      showToast('Reset code to sample template!');
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
    <div className="resume-builder-page">
      {/* Toast Alert */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Resume Code Builder</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>
            Build, edit as code, and export a classic LaTeX-style ATS resume template
          </p>
        </div>

        {/* Global Toolbar */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={handlePrint} className="btn btn-primary" title="Print or save as PDF">
            🖨️ Print / Save PDF
          </button>
          <button onClick={handleDownload} className="btn btn-secondary">
            📥 Download HTML
          </button>
          <button onClick={handleCopyCode} className="btn btn-secondary">
            📋 Copy Code
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'flex', gap: '0.75rem', marginBottom: '1.5rem',
        background: 'var(--color-bg-secondary)', padding: '6px',
        borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)',
        maxWidth: '520px',
      }}>
        <button
          onClick={() => setMode('code')}
          style={{
            flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
            background: mode === 'code' ? 'var(--color-primary)' : 'transparent',
            color: mode === 'code' ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          💻 Interactive Code Editor
        </button>
        <button
          onClick={() => setMode('auto')}
          style={{
            flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
            background: mode === 'auto' ? 'var(--color-primary)' : 'transparent',
            color: mode === 'auto' ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          📊 Auto-Sync Portfolio Data
        </button>
      </div>

      {/* Mode 1: Code Editor & Live Preview Split View */}
      {mode === 'code' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              💡 Edit the HTML/CSS code below or click &quot;Reset Sample Code&quot; to restore the template.
            </span>
            <button onClick={handleResetSample} className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '0.25rem 0.625rem' }}>
              🔄 Reset to Sample Code
            </button>
          </div>

          <div className="editor-preview-split" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
            alignItems: 'start', minHeight: '650px',
          }}>
            {/* Left: Code Editor */}
            <div style={{
              background: '#0d1117', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', height: '700px',
            }}>
              <div style={{
                padding: '0.75rem 1.25rem', background: '#161b22',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8b949e', fontWeight: 600 }}>
                  📄 resume-template.html
                </span>
                <span style={{ fontSize: '0.75rem', color: '#58a6ff' }}>HTML / CSS</span>
              </div>
              <textarea
                value={customHtml}
                onChange={e => setCustomHtml(e.target.value)}
                style={{
                  flex: 1, width: '100%', padding: '1.25rem', background: 'transparent',
                  color: '#e6edf3', fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.85rem', lineHeight: 1.6, border: 'none', outline: 'none',
                  resize: 'none', tabSize: 2,
                }}
                spellCheck={false}
              />
            </div>

            {/* Right: Live Preview Pane */}
            <div style={{
              background: '#ffffff', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              height: '700px', display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                padding: '0.75rem 1.25rem', background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                  👁️ Live Resume Preview
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>ATS Classic Serif Layout</span>
              </div>
              <iframe
                srcDoc={customHtml}
                title="Resume Preview"
                style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Auto-Generated Portfolio Data Resume */}
      {mode === 'auto' && (
        <div style={{
          background: '#ffffff', borderRadius: 'var(--radius-xl)',
          overflow: 'hidden', border: '1px solid var(--color-border)',
          maxWidth: '850px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            padding: '0.875rem 1.5rem', background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0', display: 'flex',
            justify: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              📊 Auto-Generated ATS Resume Preview
            </span>
            <Link href="/dashboard/edit" style={{ fontSize: '0.8rem', color: '#6C63FF', fontWeight: 600 }}>
              ✏️ Edit Portfolio Data ↗
            </Link>
          </div>
          <iframe
            srcDoc={generateAutoHtml()}
            title="Auto Resume Preview"
            style={{ width: '100%', height: '700px', border: 'none', background: '#fff' }}
          />
        </div>
      )}
    </div>
  );
}
