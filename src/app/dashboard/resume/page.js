'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SAMPLE_LATEX_CODE = `\\documentclass[10pt,letterpaper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,      
    urlcolor=blue,
}

% Style section titles
\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{8pt}{4pt}

% Custom list styling
\\setlist[itemize]{leftmargin=*, noitemsep, topsep=2pt}

\\begin{document}
\\pagenumbering{gobble} % Hide page numbers

% Header
\\begin{center}
    {\\Huge \\textbf{Alex Rivera}} \\\\[4pt]
    \\small alex.rivera@example.com \\ $|$ \\ +1 (555) 234-5678 \\ $|$ \\ \\href{https://linkedin.com}{LinkedIn} \\ $|$ \\ \\href{https://github.com}{GitHub} \\ $|$ \\ \\href{https://example.com}{Portfolio}
\\end{center}

% Profile summary
\\section{Profile summary}
Entry-Level \\textbf{Data Scientist \\& AI Engineer} with strong foundations in Machine Learning, Natural Language Processing (NLP), and full-stack AI system integration. Experienced in developing end-to-end data pipelines using \\textbf{Python}, vector databases, and modern Large Language Model (LLM) architectures. Demonstrated capabilities in predictive analytics, audio-to-text processing, and exploratory data analysis. Passionate about solving complex business problems through statistical modeling and quantitative analysis.

% Education
\\section{Education}
\\begin{itemize}
  \\item \\textbf{Bachelor of Technology in AI \\& Data Science} \\hfill 2024 -- 2028 \\\\
  \\textit{Institute of Technology \\& Science} \\\\
  CGPA: \\textbf{8.2}
  \\item \\textbf{Senior Secondary Education (Class 12th)} \\hfill 2022 \\\\
  Percentage: \\textbf{78.0\\%}
  \\item \\textbf{Secondary School Education (Class 10th)} \\hfill 2020 \\\\
  Percentage: \\textbf{82.5\\%}
\\end{itemize}

% Projects
\\section{Projects}

\\textbf{Type-To-Write: AI Knowledge Retrieval System} \\hfill \\href{https://github.com}{[GitHub]}
\\begin{itemize}
  \\item Built a RAG-based platform leveraging \\textbf{LangChain} and \\textbf{OpenAI GPT models} to convert educational video content into searchable notes.
  \\item Integrated \\textbf{OpenAI Whisper} for audio transcription, achieving high accuracy in transcript generation across noisy inputs.
  \\item Implemented \\textbf{Vector Embeddings} and semantic search indexing, reducing search query latency by \\textbf{40\\%}.
  \\item \\textbf{Tech Stack:} Python, Whisper, Vector DB, LangChain, Next.js, FastAPI
\\end{itemize}

\\textbf{CineVerse: Movie Discovery \\& Recommendation Engine} \\hfill \\href{https://github.com}{[GitHub]}
\\begin{itemize}
  \\item Built an AI-driven movie recommendation engine using \\textbf{Content-Based Filtering}, \\textbf{TF-IDF Vectorization}, and \\textbf{Cosine Similarity} for personalized content matching.
  \\item Performed \\textbf{NLP \\& Sentiment Analysis} on metadata and user reviews across \\textbf{5,000+ movie titles} to compute weighted sentiment scores and popularity metrics.
  \\item Integrated \\textbf{TMDB API} endpoints with optimized data pipelines and client-side caching, improving recommendation retrieval speed by \\textbf{35\\%}.
  \\item \\textbf{Tech Stack:} HTML5, CSS3, JavaScript, React.js, TMDB API
\\end{itemize}

\\textbf{Interactive Sales Analytics \\& Profitability Dashboard} \\hfill \\href{https://github.com}{[GitHub]}
\\begin{itemize}
  \\item Engineered an end-to-end Data Science dashboard to evaluate corporate sales streams and classify financial performance into \\textbf{profit vs. loss trajectories}.
  \\item Built modular REST APIs using \\textbf{FastAPI} and \\textbf{Uvicorn} for real-time KPI calculations, transaction processing, live simulation engines, and automated CSV report generation.
  \\item Implemented database architecture using \\textbf{MySQL} schema and \\textbf{SQLAlchemy ORM} models with zero-friction fallback to SQLite for rapid local testing.
  \\item Designed multi-dimensional visual graphs (line, bar, doughnut charts) using \\textbf{Chart.js}, \\textbf{Plotly.js}, and \\textbf{Tailwind CSS}, optimizing inventory distribution by \\textbf{18\\%}.
  \\item \\textbf{Tech Stack:} Python, FastAPI, Uvicorn, MySQL, SQLAlchemy, HTML5, Tailwind CSS, Chart.js, Plotly.js, Pandas, NumPy
\\end{itemize}

% Skills
\\section{Skills}
\\begin{itemize}
  \\item \\textbf{Data Science \\& Machine Learning:} Data Cleaning, EDA, Feature Engineering, Statistical Analysis, Predictive Modeling, Scikit-learn, PyTorch, Pandas, NumPy, Matplotlib.
  \\item \\textbf{AI \\& LLMs:} OpenAI API (GPT-4), Whisper, RAG Pipelines, Vector Embeddings, LangChain, Prompt Engineering.
  \\item \\textbf{Programming Languages:} Python, SQL, C++, Java, C, HTML, CSS.
\\end{itemize}

\\end{document}`;

const SAMPLE_HTML_CODE = `<!DOCTYPE html>
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
    
    .header { text-align: center; margin-bottom: 16px; }
    .header h1 { font-size: 24pt; font-weight: 700; color: #000000; margin-bottom: 6px; letter-spacing: -0.01em; }
    .contact-line { font-size: 9.5pt; color: #374151; }
    .contact-line a { color: #1d4ed8; text-decoration: none; }
    .contact-sep { color: #9ca3af; margin: 0 6px; }
    
    h2.section-title { font-size: 12pt; font-weight: 700; color: #000000; margin-top: 16px; margin-bottom: 4px; }
    .divider { border: none; border-top: 1px solid #111827; margin-bottom: 10px; }
    
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

    @media print { body { padding: 0; max-width: 100%; } .contact-line a { color: #000; } }
  </style>
</head>
<body>
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

  <h2 class="section-title">Profile summary</h2>
  <div class="divider"></div>
  <p class="summary">
    Entry-Level <strong>Data Scientist & AI Engineer</strong> with strong foundations in Machine Learning, Natural Language Processing (NLP), and full-stack AI system integration. Experienced in developing end-to-end data pipelines using <strong>Python</strong>, vector databases, and modern Large Language Model (LLM) architectures.
  </p>

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
  </ul>

  <h2 class="section-title">Projects</h2>
  <div class="divider"></div>
  <div class="project-item">
    <div class="project-header">
      <span class="project-title">Type-To-Write: AI Knowledge Retrieval System</span>
      <a href="https://github.com" class="project-link">[GitHub]</a>
    </div>
    <ul class="item-list" style="list-style-type: disc;">
      <li>Built a RAG-based platform leveraging <strong>LangChain</strong> and <strong>OpenAI GPT models</strong>.</li>
      <li><strong>Tech Stack:</strong> Python, Whisper, Vector DB, LangChain, Next.js, FastAPI</li>
    </ul>
  </div>

  <h2 class="section-title">Skills</h2>
  <div class="divider"></div>
  <ul class="skills-list" style="list-style-type: disc;">
    <li><span class="skill-cat">Data Science & Machine Learning:</span> PyTorch, Pandas, NumPy, Scikit-learn.</li>
    <li><span class="skill-cat">Programming Languages:</span> Python, SQL, C++, Java, HTML, CSS.</li>
  </ul>
</body>
</html>`;

// Engine to convert LaTeX code into formatted HTML for iframe live preview
function renderLatexToHtml(latex) {
  if (!latex) return '';

  // If input is raw HTML document already, return as is
  if (/^\s*<!DOCTYPE\s+html/i.test(latex) || /^\s*<html/i.test(latex)) {
    return latex;
  }

  // 1. Remove comments
  let text = latex.replace(/%[^\n]*/g, '');

  // 2. Extract Document Body if \begin{document} is present
  const docMatch = text.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (docMatch) {
    text = docMatch[1];
  }

  // 3. Unescape LaTeX Special Characters
  text = text
    .replace(/\\\&/g, '&')
    .replace(/\\_/g, '_')
    .replace(/\\%/g, '%')
    .replace(/\\\$[|\s]*\\\$|\\\$|\\\|/g, '<span style="color:#9ca3af; margin:0 6px;">|</span>');

  // 4. Center Blocks \begin{center} ... \end{center}
  text = text.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (m, inner) => {
    return `<div style="text-align:center; margin-bottom:16px;">${inner}</div>`;
  });

  // 5. Clean LaTeX setup commands
  text = text
    .replace(/\\Huge/g, '')
    .replace(/\\large/g, '')
    .replace(/\\small/g, '')
    .replace(/\\pagenumbering\{[^}]*\}/g, '')
    .replace(/\\titleformat\{[^}]*\}\{[^}]*\}\{[^}]*\}\{[^}]*\}\[[^\]]*\]/g, '')
    .replace(/\\titlespacing\*?\{[^}]*\}\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, '')
    .replace(/\\setlist\[[^\]]*\]\{[^}]*\}/g, '')
    .replace(/\\hypersetup\{[\s\S]*?\}/g, '')
    .replace(/\\documentclass\[[^\]]*\]\{[^}]*\}/g, '')
    .replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, '');

  // 6. Section Titles \section{Title}
  text = text.replace(/\\section\{([^}]+)\}/g, (m, title) => {
    return `<h2 style="font-size:12pt; font-weight:700; text-transform:capitalize; margin-top:18px; margin-bottom:4px; color:#000000; font-family: Source Serif 4, Georgia, serif;">${title}</h2><hr style="border:none; border-top:1px solid #111827; margin-bottom:10px;" />`;
  });

  // 7. Bold and Italic formatting
  text = text.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
  text = text.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');

  // 8. Href Links \href{url}{label}
  text = text.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" style="color:#1d4ed8; text-decoration:none;" target="_blank">$2</a>');

  // 9. \hfill alignment (e.g. Title \hfill Date \\)
  text = text.replace(/([^\n\\]+)\\hfill\s+([^\n\\]+)(\\\\)?/g, (m, left, right) => {
    const l = left.replace(/[{}]/g, '').trim();
    const r = right.replace(/[{}]/g, '').trim();
    return `<div style="display:flex; justify-content:space-between; align-items:baseline; font-size:10.5pt; margin-bottom:2px;"><span style="font-weight:600;">${l}</span><span style="font-size:10pt; color:#111827;">${r}</span></div>`;
  });

  // 10. Itemize lists & Items
  text = text.replace(/\\begin\{itemize\}/g, `<ul style="padding-left:18px; margin-bottom:10px; list-style-type:disc;">`);
  text = text.replace(/\\end\{itemize\}/g, `</ul>`);
  
  text = text.replace(/\\item\s+([\s\S]*?)(?=\\item|\\end\{itemize\}|<ul|<\/ul>|\\section|\n\n|$)/g, (m, content) => {
    return `<li style="margin-bottom:4px; font-size:10pt; color:#1f2937;">${content.replace(/[{}]/g, '').trim()}</li>`;
  });

  // 11. Clean line breaks and stray braces
  text = text.replace(/\\\\\s*\[[^\]]*\]|\\\\/g, '<br />');
  text = text.replace(/[{}]/g, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap");
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
      color: #111827; background: #ffffff; line-height: 1.45; font-size: 10.5pt;
      padding: 40px 45px; max-width: 800px; margin: 0 auto;
    }
    a { color: #1d4ed8; text-decoration: none; }
    @media print { body { padding: 0; max-width: 100%; } }
  </style>
</head>
<body>
  ${text}
</body>
</html>`;
}

export default function ResumePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('latex'); // 'latex' | 'html' | 'auto'
  const [code, setCode] = useState(SAMPLE_LATEX_CODE);
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

  // Helper to generate auto resume LaTeX from DB portfolio data
  const generateAutoLatex = () => {
    if (!data) return '';
    const { portfolio, skills = [], projects = [], experiences = [], education = [], user } = data;
    
    return `\\documentclass[10pt,letterpaper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.5in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}

\\begin{document}
\\pagenumbering{gobble}

\\begin{center}
    {\\Huge \\textbf{${user?.full_name || portfolio?.hero_title || user?.username}}} \\\\[4pt]
    \\small ${user?.email || ''} \\ $|$ \\ ${portfolio?.phone || ''} \\ $|$ \\ \\href{${portfolio?.linkedin || '#'}}{LinkedIn} \\ $|$ \\ \\href{${portfolio?.github || '#'}}{GitHub}
\\end{center}

${(portfolio?.bio || portfolio?.about_text) ? `\\section{Profile summary}
${portfolio.bio || portfolio.about_text}` : ''}

${education.length > 0 ? `\\section{Education}
\\begin{itemize}
${education.map(ed => `  \\item \\textbf{${ed.degree}${ed.field ? ' in ' + ed.field : ''}} \\hfill ${ed.start_date}${ed.end_date ? ' -- ' + ed.end_date : ''} \\\\
  \\textit{${ed.institution}} ${ed.description ? '\\\\ ' + ed.description : ''}`).join('\n')}
\\end{itemize}` : ''}

${projects.length > 0 ? `\\section{Projects}
${projects.map(p => `\\textbf{${p.title}} \\hfill \\href{${p.github_url || p.live_url || '#'}}{[Link]}
\\begin{itemize}
  \\item ${p.short_description || p.description || ''}
  ${Array.isArray(p.tech_stack) && p.tech_stack.length > 0 ? `\\item \\textbf{Tech Stack:} ${p.tech_stack.join(', ')}` : ''}
\\end{itemize}`).join('\n')}` : ''}

${experiences.length > 0 ? `\\section{Work Experience}
${experiences.map(ex => `\\textbf{${ex.role} --- ${ex.company}} \\hfill ${ex.start_date}${ex.end_date ? ' -- ' + ex.end_date : ex.is_current ? ' -- Present' : ''}
\\begin{itemize}
  ${ex.description ? `\\item ${ex.description}` : ''}
\\end{itemize}`).join('\n')}` : ''}

${skills.length > 0 ? `\\section{Skills}
\\begin{itemize}
  \\item \\textbf{Technical Skills:} ${skills.map(s => s.name).join(', ')}
\\end{itemize}` : ''}

\\end{document}`;
  };

  // Compute active preview HTML string
  const activePreviewHtml = lang === 'latex'
    ? renderLatexToHtml(code)
    : lang === 'html'
    ? renderLatexToHtml(code)
    : renderLatexToHtml(generateAutoLatex());

  const activeRawCode = lang === 'auto' ? generateAutoLatex() : code;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(activePreviewHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const handleDownload = () => {
    const ext = lang === 'latex' ? 'tex' : 'html';
    const mime = lang === 'latex' ? 'text/x-tex;charset=utf-8' : 'text/html;charset=utf-8';
    const blob = new Blob([activeRawCode], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.user?.username || 'resume'}-ats.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Resume ${ext.toUpperCase()} file downloaded!`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeRawCode);
    showToast('Code copied to clipboard!');
  };

  const handleResetSample = () => {
    if (confirm('Reset code editor to sample template?')) {
      if (lang === 'latex') {
        setCode(SAMPLE_LATEX_CODE);
      } else {
        setCode(SAMPLE_HTML_CODE);
      }
      showToast('Reset to sample template!');
    }
  };

  const switchLanguage = (newLang) => {
    setLang(newLang);
    if (newLang === 'latex') {
      setCode(SAMPLE_LATEX_CODE);
    } else if (newLang === 'html') {
      setCode(SAMPLE_HTML_CODE);
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
            Write LaTeX or HTML code to generate a classic ATS resume with real-time compiled preview
          </p>
        </div>

        {/* Global Toolbar */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={handlePrint} className="btn btn-primary" title="Print or save as PDF">
            🖨️ Print / Save PDF
          </button>
          <button onClick={handleDownload} className="btn btn-secondary">
            📥 Download {lang === 'latex' ? '.TEX' : '.HTML'}
          </button>
          <button onClick={handleCopyCode} className="btn btn-secondary">
            📋 Copy Code
          </button>
        </div>
      </div>

      {/* Language / Mode Switcher Tabs */}
      <div style={{
        display: 'flex', gap: '0.75rem', marginBottom: '1.5rem',
        background: 'var(--color-bg-secondary)', padding: '6px',
        borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)',
        maxWidth: '600px',
      }}>
        <button
          onClick={() => switchLanguage('latex')}
          style={{
            flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
            background: lang === 'latex' ? 'var(--color-primary)' : 'transparent',
            color: lang === 'latex' ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          📄 LaTeX Code (.tex)
        </button>
        <button
          onClick={() => switchLanguage('html')}
          style={{
            flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
            background: lang === 'html' ? 'var(--color-primary)' : 'transparent',
            color: lang === 'html' ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          🌐 HTML / CSS (.html)
        </button>
        <button
          onClick={() => switchLanguage('auto')}
          style={{
            flex: 1, padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
            background: lang === 'auto' ? 'var(--color-primary)' : 'transparent',
            color: lang === 'auto' ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          📊 Auto-Sync DB
        </button>
      </div>

      {/* Editor & Live Preview Split Container */}
      {lang !== 'auto' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              💡 Edit the {lang === 'latex' ? 'LaTeX (\\documentclass...)' : 'HTML/CSS'} code on the left — the preview compiles live on the right!
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
                  {lang === 'latex' ? '📄 resume-template.tex' : '📄 resume-template.html'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#58a6ff', fontWeight: 600 }}>
                  {lang === 'latex' ? 'LaTeX Code' : 'HTML / CSS'}
                </span>
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{
                  flex: 1, width: '100%', padding: '1.25rem', background: 'transparent',
                  color: '#e6edf3', fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.85rem', lineHeight: 1.6, border: 'none', outline: 'none',
                  resize: 'none', tabSize: 2,
                }}
                spellCheck={false}
              />
            </div>

            {/* Right: Compiled Live Resume Preview */}
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
                  👁️ Compiled Live Resume Preview
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  ✓ LaTeX / ATS Render Engine Active
                </span>
              </div>
              <iframe
                srcDoc={activePreviewHtml}
                title="Live Resume Preview"
                style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Auto-Sync Mode */
        <div style={{
          background: '#ffffff', borderRadius: 'var(--radius-xl)',
          overflow: 'hidden', border: '1px solid var(--color-border)',
          maxWidth: '850px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            padding: '0.875rem 1.5rem', background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              📊 Auto-Generated ATS LaTeX Resume Preview
            </span>
            <Link href="/dashboard/edit" style={{ fontSize: '0.8rem', color: '#6C63FF', fontWeight: 600 }}>
              ✏️ Edit Portfolio Data ↗
            </Link>
          </div>
          <iframe
            srcDoc={activePreviewHtml}
            title="Auto Resume Preview"
            style={{ width: '100%', height: '700px', border: 'none', background: '#fff' }}
          />
        </div>
      )}
    </div>
  );
}
