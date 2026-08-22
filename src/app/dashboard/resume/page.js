'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Featured Fake Sample: Aarav Sharma (Entry-Level AI & Full-Stack Engineer) matching the uploaded format
const FAKE_SAMPLE_LATEX_TEMPLATE = `\\documentclass[10pt, a4paper]{article}

% --- UNIVERSAL PREAMBLE BLOCK ---
\\usepackage[a4paper, top=1cm, bottom=1cm, left=1.2cm, right=1.2cm]{geometry}
\\usepackage{fontspec}
\\usepackage[english, bidi=basic, provide=*]{babel}

\\babelprovide[import, onchar=ids fonts]{english}

% Classical Serif Font matching sample
\\babelfont{rm}{Noto Serif}

\\usepackage{enumitem}
\\setlist[itemize]{label=-, leftmargin=0.15in, noitemsep, topsep=1pt, parsep=1pt}
\\usepackage{hyperref}
\\usepackage{color}

% Color definitions
\\definecolor{linkblue}{rgb}{0.0, 0.35, 0.65}

\\hypersetup{
    colorlinks=true,
    linkcolor=linkblue,
    urlcolor=linkblue,
}

\\begin{document}

\\pagestyle{empty}

% --- HEADER ---
\\begin{center}
    {\\Huge \\textbf{Aarav Sharma}} \\\\[4pt]
    \\small
    \\href{mailto:aarav.sharma.dev@gmail.com}{aarav.sharma.dev@gmail.com} $|$ +91 9876543210 $|$ 
    \\href{https://www.linkedin.com/in/aarav-sharma-dev/}{LinkedIn} $|$ 
    \\href{https://github.com/aarav-sharma-dev}{GitHub} $|$ 
    \\href{https://aaravsharma.dev}{Portfolio}
\\end{center}

\\vspace{-4pt}

% --- PROFILE SUMMARY ---
\\noindent \\textbf{\\Large Profile summary}
\\vspace{2pt}
\\hrule
\\vspace{3pt}
\\noindent Entry-Level Data Scientist \\& AI Engineer with strong foundations in Machine Learning, Deep Learning (NLP \\& CV), and full-stack AI system integration. Experienced in developing scalable data pipelines using Python, vector databases, and modern Large Language Model (LLM) architectures. Demonstrated capabilities in predictive time-series modeling, automated speech recognition, and high-throughput REST API services. Passionate about solving complex quantitative challenges through statistical modeling.

\\vspace{6pt}

% --- EDUCATION ---
\\noindent \\textbf{\\Large Education}
\\vspace{2pt}
\\hrule
\\vspace{3pt}
\\begin{itemize}
    \\item \\textbf{Bachelor of Technology in Computer Science \\& AI} \\hfill 2024--2028 \\\\
    Indian Institute of Information Technology (IIIT), Delhi \\\\
    CGPA: \\textbf{8.5}
    \\item \\textbf{Senior Secondary Education (Class 12th)} \\hfill 2022 \\\\
    CBSE Board \\\\
    Percentage: \\textbf{78.5\\%}
    \\item \\textbf{Secondary School Education (Class 10th)} \\hfill 2020 \\\\
    CBSE Board \\\\
    Percentage: \\textbf{86.2\\%}
\\end{itemize}

\\vspace{4pt}

% --- SKILLS ---
\\noindent \\textbf{\\Large Skills}
\\vspace{2pt}
\\hrule
\\vspace{3pt}
\\begin{itemize}
    \\item \\textbf{Data Science \\& Machine Learning:} Data Cleaning, EDA, Feature Engineering, Statistical Analysis, Predictive Modeling, Scikit-learn, PyTorch, Pandas, NumPy, Matplotlib.
    \\item \\textbf{AI \\& LLMs:} OpenAI API (GPT-4o), Whisper, RAG Pipelines, Vector Embeddings, LangChain, Qdrant, Prompt Engineering.
    \\item \\textbf{Programming Languages:} Python, SQL, C++, Java, JavaScript, TypeScript, HTML, CSS.
    \\item \\textbf{Tools \\& Databases:} MySQL, PostgreSQL, Git, GitHub, VS Code, Docker, Jupyter Notebooks.
    \\item \\textbf{Core CS \\& Soft Skills:} Data Structures \\& Algorithms (DSA), Object-Oriented Programming (OOP), DBMS, Problem Solving, Adaptability, Teamwork.
\\end{itemize}

\\vspace{4pt}

% --- PROJECTS ---
\\noindent \\textbf{\\Large Projects}
\\vspace{2pt}
\\hrule
\\vspace{3pt}

\\noindent \\href{https://github.com/aarav-sharma-dev/AeroHealth-Analytics}{\\textcolor{black}{\\textbf{AeroHealth: Real-Time Patient Vital \\& ECG Diagnostics Platform}}} \\hfill \\href{https://github.com/aarav-sharma-dev/AeroHealth-Analytics}{\\small [GitHub]}
\\begin{itemize}
    \\item Developed a full-stack medical telemetry platform to streamline ECG signal processing, cardiac arrhythmia detection, and patient health analytics.
    \\item Implemented real-time streaming state management using Redux Toolkit to monitor biometrics and historical health score trends.
    \\item Designed a responsive, high-contrast dark-mode interface utilizing Tailwind CSS and Material UI for clinical usability.
    \\item \\textbf{Tech Stack:} React.js, Next.js, Node.js, Express, MongoDB, MySQL, Redux Toolkit, Tailwind CSS, Material UI
\\end{itemize}

\\vspace{3pt}

\\noindent \\href{https://github.com/aarav-sharma-dev/DevResume-ATS-Engine}{\\textcolor{black}{\\textbf{DevResume: Automated Developer Portfolio \\& ATS Resume Platform}}} \\hfill \\href{https://github.com/aarav-sharma-dev/DevResume-ATS-Engine}{\\small [GitHub]}
\\begin{itemize}
    \\item Engineered an interactive web application enabling automated generation of SEO-friendly developer portfolios and ATS-optimized resumes.
    \\item Built real-time live preview compilation using Zustand for state synchronization and dynamic section reordering across modular UI blocks.
    \\item Integrated one-click PDF print rendering and standalone HTML exporter, reducing developer portfolio setup time by 80\\%.
    \\item \\textbf{Tech Stack:} Next.js 14, Tailwind CSS, Zustand, Server Actions, REST API Routes, MySQL, SQLite
\\end{itemize}

\\vspace{3pt}

\\noindent \\href{https://github.com/aarav-sharma-dev/NexusSales-Forecasting}{\\textcolor{black}{\\textbf{NexusSales: Predictive Demand Forecasting \\& Revenue Analytics Engine}}} \\hfill \\href{https://github.com/aarav-sharma-dev/NexusSales-Forecasting}{\\small [GitHub]}
\\begin{itemize}
    \\item Built time-series ML models (Holt-Winters, Ridge Regression) across 75k+ retail transactions, achieving an $R^2$ of 0.981 and 3.25\\% MAPE.
    \\item Developed a dynamic What-If pricing engine to model price elasticity of demand ($E_d$), marketing ad spend, and gross margin variance.
    \\item Designed a responsive dark-mode analytics dashboard connected to Node.js REST APIs and a Python data science pipeline.
    \\item \\textbf{Tech Stack:} Next.js, TypeScript, Python, Node.js/Express, Tailwind CSS, Recharts, Statsmodels, Docker
\\end{itemize}

\\vspace{4pt}

% --- ACHIEVEMENTS / PARTICIPATION ---
\\noindent \\textbf{\\Large Achievements / Participation}
\\vspace{2pt}
\\hrule
\\vspace{3pt}
\\begin{itemize}
    \\item Solved 250+ Data Structures \\& Algorithms (DSA) problems across platforms like LeetCode and GeeksforGeeks.
    \\item Built and deployed 4+ end-to-end Machine Learning \\& AI applications with live interactive user interfaces.
    \\item Maintained a 100+ day consistent coding streak on GitHub, actively contributing to open-source developer tools.
    \\item Finalist in National Level AI Hackathon 2024 for developing a real-time computer vision assisted smart surveillance tool.
\\end{itemize}

\\vspace{4pt}

% --- CERTIFICATIONS ---
\\noindent \\textbf{\\Large Certifications}
\\vspace{2pt}
\\hrule
\\vspace{3pt}
\\begin{itemize}
    \\item \\textbf{Claude Code in Action} --- Certified by Anthropic. \\hfill \\href{https://anthropic.com}{\\small [Link]}
    \\item \\textbf{Basics of Data Science} --- Certified by uniAthena. \\hfill \\href{https://uniathena.com}{\\small [Link]}
    \\item \\textbf{Introduction to Prompt Engineering} --- Certified by Simplilearn. \\hfill \\href{https://simplilearn.com}{\\small [Link]}
    \\item \\textbf{C++ Programming \\& DSA Fundamentals} --- Certified in OOP and Data Structures. \\hfill \\href{https://hackerrank.com}{\\small [Link]}
    \\item \\textbf{Programming Fundamentals (Python)} --- Issued by HackerRank. \\hfill \\href{https://hackerrank.com}{\\small [Link]}
    \\item \\textbf{Professional Writing} --- Issued by Saylor Academy. \\hfill \\href{https://saylor.org}{\\small [Link]}
    \\item \\textbf{Career Skills in Data Analytics} --- Issued by LinkedIn Learning. \\hfill \\href{https://linkedin.com}{\\small [Link]}
\\end{itemize}

\\end{document}`;



const SAMPLE_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aarav Sharma - ATS Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Source Serif 4', 'Noto Serif', 'Times New Roman', Georgia, serif;
      color: #000; background: #fff; line-height: 1.34; font-size: 10pt;
      padding: 24px 34px; max-width: 850px; margin: 0 auto;
    }
    .resume-header { text-align: center; margin-bottom: 8px; }
    .resume-name { font-size: 24pt; font-weight: 700; color: #000; letter-spacing: -0.01em; margin-bottom: 2px; font-family: inherit; }
    .resume-contacts { font-size: 9.5pt; color: #222; }
    .resume-contacts a { color: #0059a6; text-decoration: none; font-weight: 500; }
    .resume-contacts a:hover { text-decoration: underline; }
    .sep { color: #555; margin: 0 5px; font-size: 9pt; }
    
    .section-header { margin-top: 10px; margin-bottom: 3px; }
    .section-title { font-size: 12.5pt; font-weight: 700; color: #000; font-family: inherit; margin-bottom: 2px; }
    .section-line { width: 100%; border-bottom: 1px solid #000; margin-bottom: 5px; }
    
    .resume-para { font-size: 9.75pt; color: #000; text-align: justify; line-height: 1.36; margin-bottom: 5px; }
    
    .resume-list { list-style-type: disc; padding-left: 18px; margin-bottom: 5px; }
    .resume-list li { margin-bottom: 2.5px; font-size: 9.75pt; color: #000; text-align: justify; line-height: 1.35; }
    
    .item-top { display: flex; justify-content: space-between; align-items: baseline; font-size: 9.75pt; }
    .item-left { font-weight: 700; color: #000; }
    .item-right { font-size: 9.5pt; color: #000; font-weight: 400; text-align: right; }
    .item-sub { font-size: 9.5pt; color: #111; margin-top: 1px; }
    
    .project-heading { display: flex; justify-content: space-between; align-items: baseline; margin-top: 6px; margin-bottom: 2px; }
    .proj-name { font-weight: 700; font-size: 10pt; color: #000; }
    .proj-link a, .ext-link { color: #0059a6; text-decoration: none; font-size: 9pt; font-weight: 500; }
    .proj-link-bold { color: #000 !important; text-decoration: none; }
    .proj-link-bold:hover { text-decoration: underline; }
    
    a { color: #0059a6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { font-weight: 700; color: #000; }
    
    @media print {
      body { padding: 0; max-width: 100%; font-size: 9.5pt; }
      .section-line { border-bottom: 1px solid #000; }
    }
  </style>
</head>
<body>
  <div class="resume-header">
    <h1 class="resume-name">Aarav Sharma</h1>
    <div class="resume-contacts">
      <a href="mailto:aarav.sharma.dev@gmail.com">aarav.sharma.dev@gmail.com</a>
      <span class="sep">|</span>
      <span>+91 9876543210</span>
      <span class="sep">|</span>
      <a href="https://www.linkedin.com/in/aarav-sharma-dev/">LinkedIn</a>
      <span class="sep">|</span>
      <a href="https://github.com/aarav-sharma-dev">GitHub</a>
      <span class="sep">|</span>
      <a href="https://aaravsharma.dev">Portfolio</a>
    </div>
  </div>

  <div class="section-header">
    <h2 class="section-title">Profile summary</h2>
    <div class="section-line"></div>
  </div>
  <p class="resume-para">
    Entry-Level Data Scientist & AI Engineer with strong foundations in Machine Learning, Deep Learning (NLP & CV), and full-stack AI system integration. Experienced in developing scalable data pipelines using Python, vector databases, and modern Large Language Model (LLM) architectures. Demonstrated capabilities in predictive time-series modeling, automated speech recognition, and high-throughput REST API services. Passionate about solving complex quantitative challenges through statistical modeling.
  </p>

  <div class="section-header">
    <h2 class="section-title">Education</h2>
    <div class="section-line"></div>
  </div>
  <ul class="resume-list">
    <li>
      <div class="item-top">
        <span class="item-left">Bachelor of Technology in Computer Science & AI</span>
        <span class="item-right">2024–2028</span>
      </div>
      <div class="item-sub">Indian Institute of Information Technology (IIIT), Delhi<br />CGPA: <strong>8.5</strong></div>
    </li>
    <li>
      <div class="item-top">
        <span class="item-left">Senior Secondary Education (Class 12th)</span>
        <span class="item-right">2022</span>
      </div>
      <div class="item-sub">CBSE Board<br />Percentage: <strong>78.5%</strong></div>
    </li>
    <li>
      <div class="item-top">
        <span class="item-left">Secondary School Education (Class 10th)</span>
        <span class="item-right">2020</span>
      </div>
      <div class="item-sub">CBSE Board<br />Percentage: <strong>86.2%</strong></div>
    </li>
  </ul>

  <div class="section-header">
    <h2 class="section-title">Skills</h2>
    <div class="section-line"></div>
  </div>
  <ul class="resume-list">
    <li><strong>Data Science & Machine Learning:</strong> Data Cleaning, EDA, Feature Engineering, Statistical Analysis, Predictive Modeling, Scikit-learn, PyTorch, Pandas, NumPy, Matplotlib.</li>
    <li><strong>AI & LLMs:</strong> OpenAI API (GPT-4o), Whisper, RAG Pipelines, Vector Embeddings, LangChain, Qdrant, Prompt Engineering.</li>
    <li><strong>Programming Languages:</strong> Python, SQL, C++, Java, JavaScript, TypeScript, HTML, CSS.</li>
    <li><strong>Tools & Databases:</strong> MySQL, PostgreSQL, Git, GitHub, VS Code, Docker, Jupyter Notebooks.</li>
    <li><strong>Core CS & Soft Skills:</strong> Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), DBMS, Problem Solving, Adaptability, Teamwork.</li>
  </ul>

  <div class="section-header">
    <h2 class="section-title">Projects</h2>
    <div class="section-line"></div>
  </div>
  <div class="project-heading">
    <span class="proj-name"><a href="https://github.com/aarav-sharma-dev/AeroHealth-Analytics" class="proj-link-bold">AeroHealth: Real-Time Patient Vital & ECG Diagnostics Platform</a></span>
    <span class="proj-link"><a href="https://github.com/aarav-sharma-dev/AeroHealth-Analytics" class="ext-link">[GitHub]</a></span>
  </div>
  <ul class="resume-list">
    <li>Developed a full-stack medical telemetry platform to streamline ECG signal processing, cardiac arrhythmia detection, and patient health analytics.</li>
    <li>Implemented real-time streaming state management using Redux Toolkit to monitor biometrics and historical health score trends.</li>
    <li>Designed a responsive, high-contrast dark-mode interface utilizing Tailwind CSS and Material UI for clinical usability.</li>
    <li><strong>Tech Stack:</strong> React.js, Next.js, Node.js, Express, MongoDB, MySQL, Redux Toolkit, Tailwind CSS, Material UI</li>
  </ul>

  <div class="project-heading">
    <span class="proj-name"><a href="https://github.com/aarav-sharma-dev/DevResume-ATS-Engine" class="proj-link-bold">DevResume: Automated Developer Portfolio & ATS Resume Platform</a></span>
    <span class="proj-link"><a href="https://github.com/aarav-sharma-dev/DevResume-ATS-Engine" class="ext-link">[GitHub]</a></span>
  </div>
  <ul class="resume-list">
    <li>Engineered an interactive web application enabling automated generation of SEO-friendly developer portfolios and ATS-optimized resumes.</li>
    <li>Built real-time live preview compilation using Zustand for state synchronization and dynamic section reordering across modular UI blocks.</li>
    <li>Integrated one-click PDF print rendering and standalone HTML exporter, reducing developer portfolio setup time by 80%.</li>
    <li><strong>Tech Stack:</strong> Next.js 14, Tailwind CSS, Zustand, Server Actions, REST API Routes, MySQL, SQLite</li>
  </ul>

  <div class="section-header">
    <h2 class="section-title">Achievements / Participation</h2>
    <div class="section-line"></div>
  </div>
  <ul class="resume-list">
    <li>Solved 250+ Data Structures & Algorithms (DSA) problems across platforms like LeetCode and GeeksforGeeks.</li>
    <li>Built and deployed 4+ end-to-end Machine Learning & AI applications with live interactive user interfaces.</li>
    <li>Maintained a 100+ day consistent coding streak on GitHub, actively contributing to open-source developer tools.</li>
    <li>Finalist in National Level AI Hackathon 2024 for developing a real-time computer vision assisted smart surveillance tool.</li>
  </ul>

  <div class="section-header">
    <h2 class="section-title">Certifications</h2>
    <div class="section-line"></div>
  </div>
  <ul class="resume-list">
    <li><div class="item-top"><span class="item-left"><strong>Claude Code in Action</strong> — Certified by Anthropic.</span><span class="item-right"><a href="https://anthropic.com" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>Basics of Data Science</strong> — Certified by uniAthena.</span><span class="item-right"><a href="https://uniathena.com" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>Introduction to Prompt Engineering</strong> — Certified by Simplilearn.</span><span class="item-right"><a href="https://simplilearn.com" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>C++ Programming & DSA Fundamentals</strong> — Certified in OOP and Data Structures.</span><span class="item-right"><a href="https://hackerrank.com" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>Programming Fundamentals (Python)</strong> — Issued by HackerRank.</span><span class="item-right"><a href="https://hackerrank.com" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>Professional Writing</strong> — Issued by Saylor Academy.</span><span class="item-right"><a href="https://saylor.org" class="ext-link">[Link]</a></span></div></li>
    <li><div class="item-top"><span class="item-left"><strong>Career Skills in Data Analytics</strong> — Issued by LinkedIn Learning.</span><span class="item-right"><a href="https://linkedin.com" class="ext-link">[Link]</a></span></div></li>
  </ul>
</body>
</html>`;

// High-fidelity LaTeX to HTML Live Compiler Engine
function renderLatexToHtml(latex) {
  if (!latex) return '';

  // If input is raw HTML document already, return as is
  if (/^\s*<!DOCTYPE\s+html/i.test(latex) || /^\s*<html/i.test(latex)) {
    return latex;
  }

  // 1. Remove comments (% not preceded by backslash)
  let text = latex.replace(/(^|[^\\])%[^\n]*/g, '$1');

  // 2. Extract Document Body
  const docMatch = text.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (docMatch) {
    text = docMatch[1];
  }

  // Helper to format inline LaTeX text (bold, italic, links, math, entities)
  function formatInline(str) {
    if (!str) return '';
    let s = str
      .replace(/\$\s*\|\s*\$/g, ' | ')
      .replace(/\$\s*\\\|\s*\$/g, ' | ')
      .replace(/\$R\^2\$/g, 'R<sup>2</sup>')
      .replace(/\(\$E_d\$\)/g, '(E<sub>d</sub>)')
      .replace(/\\&/g, '&')
      .replace(/\\_/g, '_')
      .replace(/\\%/g, '%')
      .replace(/---/g, ' — ')
      .replace(/--/g, '–');

    // \href{url}{\textcolor{black}{\textbf{Title}}}
    s = s.replace(/\\href\{([^}]+)\}\{\\textcolor\{[^}]*\}\{\\textbf\{([^}]+)\}\}\}/g, '<a href="$1" class="proj-link-bold" target="_blank"><strong>$2</strong></a>');
    s = s.replace(/\\href\{([^}]+)\}\{\\textbf\{([^}]+)\}\}/g, '<a href="$1" class="proj-link-bold" target="_blank"><strong>$2</strong></a>');
    s = s.replace(/\\href\{([^}]+)\}\{\\small\s*\[([^\]]+)\]\}/g, '<a href="$1" class="ext-link" target="_blank">[$2]</a>');
    s = s.replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" target="_blank">$2</a>');

    s = s.replace(/\\textcolor\{[^}]*\}\{([^}]+)\}/g, '$1');
    s = s.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
    s = s.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
    s = s.replace(/\\small/g, '');
    s = s.replace(/\\Large/g, '');
    s = s.replace(/\\noindent/g, '');
    s = s.replace(/\\vspace\{[^}]*\}/g, '');
    s = s.replace(/\\\\/g, '');
    s = s.replace(/\\/g, '');
    return s.trim();
  }

  // Parse Header \begin{center} ... \end{center}
  let headerHtml = '';
  const centerMatch = text.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
  if (centerMatch) {
    let rawHeader = centerMatch[1];
    let nameMatch = rawHeader.match(/\{?\\Huge\s*\\textbf\{([^}]+)\}\}?/);
    let name = nameMatch ? nameMatch[1] : 'Resume';
    
    let linksPart = rawHeader.replace(/\{?\\Huge\s*\\textbf\{([^}]+)\}\}?(\s*\\\\(?:\s*\[[^\]]*\])?)?/, '');
    let formattedLinks = formatInline(linksPart)
      .replace(/\|/g, '<span class="sep">|</span>');

    headerHtml = `<div class="resume-header"><h1 class="resume-name">${name}</h1><div class="resume-contacts">${formattedLinks}</div></div>`;
    text = text.replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/, '');
  }

  // Process blocks
  const blocks = [];
  const lines = text.split('\n');
  let inItemize = false;
  let currentList = [];
  let currentItemLines = [];

  function flushCurrentItem() {
    if (currentItemLines.length > 0) {
      let firstLine = currentItemLines[0].trim();
      let restLines = currentItemLines.slice(1).map(l => l.trim()).filter(Boolean);

      if (firstLine.includes('\\hfill')) {
        let parts = firstLine.split('\\hfill');
        let left = formatInline(parts[0]);
        let right = formatInline(parts[1]);
        let sub = restLines.map(l => formatInline(l)).filter(Boolean).join('<br />');
        currentList.push(`<li><div class="item-top"><span class="item-left">${left}</span><span class="item-right">${right}</span></div>${sub ? `<div class="item-sub">${sub}</div>` : ''}</li>`);
      } else {
        let full = currentItemLines.map(l => formatInline(l)).filter(Boolean).join(' ');
        currentList.push(`<li>${full}</li>`);
      }
      currentItemLines = [];
    }
  }

  function flushList() {
    flushCurrentItem();
    if (currentList.length > 0) {
      blocks.push(`<ul class="resume-list">${currentList.join('')}</ul>`);
      currentList = [];
    }
    inItemize = false;
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    // Check section header: \noindent \textbf{\Large ...} or \section{...}
    let secMatch = line.match(/^\\noindent\s*\\textbf\{\\Large\s*([^}]+)\}/) || line.match(/^\\section\{([^}]+)\}/);
    if (secMatch) {
      flushList();
      blocks.push(`<div class="section-header"><h2 class="section-title">${secMatch[1].trim()}</h2><div class="section-line"></div></div>`);
      continue;
    }

    if (line === '\\hrule' || line.startsWith('\\vspace') || line.startsWith('\\pagestyle') || line.startsWith('\\usepackage') || line.startsWith('\\documentclass') || line.startsWith('\\babel') || line.startsWith('\\definecolor') || line.startsWith('\\hypersetup') || line.startsWith('\\setlist') || line.startsWith('\\titlespacing') || line.startsWith('\\titleformat')) {
      continue;
    }

    if (line.includes('\\begin{itemize}')) {
      flushList();
      inItemize = true;
      continue;
    }

    if (line.includes('\\end{itemize}')) {
      flushList();
      continue;
    }

    if (inItemize) {
      if (line.startsWith('\\item')) {
        flushCurrentItem();
        currentItemLines.push(line.replace(/^\\item\s*/, ''));
      } else {
        currentItemLines.push(line);
      }
      continue;
    }

    // Check standalone project line with \hfill (e.g. \noindent \href{...}{...} \hfill \href{...}{[GitHub]})
    if (line.includes('\\hfill')) {
      flushList();
      let parts = line.split('\\hfill');
      let left = formatInline(parts[0]);
      let right = formatInline(parts[1]);
      blocks.push(`<div class="project-heading"><span class="proj-name">${left}</span><span class="proj-link">${right}</span></div>`);
      continue;
    }

    // Normal paragraph text (e.g. Profile summary)
    flushList();
    blocks.push(`<p class="resume-para">${formatInline(line)}</p>`);
  }

  flushList();

  const bodyHtml = headerHtml + '\n' + blocks.join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Source Serif 4', 'Noto Serif', 'Times New Roman', Georgia, serif;
    color: #000; background: #fff; line-height: 1.34; font-size: 10pt;
    padding: 24px 34px; max-width: 850px; margin: 0 auto;
  }
  .resume-header { text-align: center; margin-bottom: 8px; }
  .resume-name { font-size: 24pt; font-weight: 700; color: #000; letter-spacing: -0.01em; margin-bottom: 2px; font-family: inherit; }
  .resume-contacts { font-size: 9.5pt; color: #222; }
  .resume-contacts a { color: #0059a6; text-decoration: none; font-weight: 500; }
  .resume-contacts a:hover { text-decoration: underline; }
  .sep { color: #555; margin: 0 5px; font-size: 9pt; }
  
  .section-header { margin-top: 10px; margin-bottom: 3px; }
  .section-title { font-size: 12.5pt; font-weight: 700; color: #000; font-family: inherit; margin-bottom: 2px; }
  .section-line { width: 100%; border-bottom: 1px solid #000; margin-bottom: 5px; }
  
  .resume-para { font-size: 9.75pt; color: #000; text-align: justify; line-height: 1.36; margin-bottom: 5px; }
  
  .resume-list { list-style-type: disc; padding-left: 18px; margin-bottom: 5px; }
  .resume-list li { margin-bottom: 2.5px; font-size: 9.75pt; color: #000; text-align: justify; line-height: 1.35; }
  
  .item-top { display: flex; justify-content: space-between; align-items: baseline; font-size: 9.75pt; }
  .item-left { font-weight: 700; color: #000; }
  .item-right { font-size: 9.5pt; color: #000; font-weight: 400; text-align: right; }
  .item-sub { font-size: 9.5pt; color: #111; margin-top: 1px; }
  
  .project-heading { display: flex; justify-content: space-between; align-items: baseline; margin-top: 6px; margin-bottom: 2px; }
  .proj-name { font-weight: 700; font-size: 10pt; color: #000; }
  .proj-link a, .ext-link { color: #0059a6; text-decoration: none; font-size: 9pt; font-weight: 500; }
  .proj-link-bold { color: #000 !important; text-decoration: none; }
  .proj-link-bold:hover { text-decoration: underline; }
  
  a { color: #0059a6; text-decoration: none; }
  a:hover { text-decoration: underline; }
  strong { font-weight: 700; color: #000; }
  
  @media print {
    body { padding: 0; max-width: 100%; font-size: 9.5pt; }
    .section-line { border-bottom: 1px solid #000; }
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

export default function ResumePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('latex'); // 'latex' | 'html' | 'auto'
  const [code, setCode] = useState(FAKE_SAMPLE_LATEX_TEMPLATE);
  const [activeTemplateName, setActiveTemplateName] = useState('fake_sample');
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
    {\\Huge \\textbf{${user?.full_name || portfolio?.hero_title || user?.username || 'Your Name'}}} \\\\[4pt]
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
${projects.map(p => `\\textbf{${p.title}} \\hfill \\href{${p.github_url || p.live_url || '#'}}{[GitHub]}
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

  const handleSelectTemplate = (templateKey) => {
    setActiveTemplateName(templateKey);
    if (templateKey === 'fake_sample') {
      setCode(FAKE_SAMPLE_LATEX_TEMPLATE);
      setLang('latex');
      showToast('Loaded Aarav Sharma (ATS Resume Template)!');
    } else if (templateKey === 'html') {
      setCode(SAMPLE_HTML_CODE);
      setLang('html');
      showToast('Loaded Classic HTML / CSS Template!');
    }
  };

  const switchLanguage = (newLang) => {
    setLang(newLang);
    if (newLang === 'latex') {
      setCode(FAKE_SAMPLE_LATEX_TEMPLATE);
      setActiveTemplateName('fake_sample');
    } else if (newLang === 'html') {
      setCode(SAMPLE_HTML_CODE);
      setActiveTemplateName('html');
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

      {/* Template Selector & Presets Bar */}
      <div style={{
        background: 'var(--color-bg-secondary)', padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)',
        marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            📑 Resume Presets:
          </span>
          <button
            onClick={() => handleSelectTemplate('fake_sample')}
            className="btn btn-sm"
            style={{
              background: activeTemplateName === 'fake_sample' && lang === 'latex' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
              color: activeTemplateName === 'fake_sample' && lang === 'latex' ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              fontWeight: 600,
            }}
          >
            🌟 Aarav Sharma (Featured AI Sample)
          </button>
          <button
            onClick={() => handleSelectTemplate('sanchit')}
            className="btn btn-sm"
            style={{
              background: activeTemplateName === 'sanchit' && lang === 'latex' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
              color: activeTemplateName === 'sanchit' && lang === 'latex' ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            🤖 Sanchit Thakur (AI & Data Science)
          </button>
          <button
            onClick={() => handleSelectTemplate('alex')}
            className="btn btn-sm"
            style={{
              background: activeTemplateName === 'alex' && lang === 'latex' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
              color: activeTemplateName === 'alex' && lang === 'latex' ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            💻 Alex Rivera (Full-Stack Cloud)
          </button>
        </div>

        {/* Language / Mode Switcher Tabs */}
        <div style={{
          display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.25)',
          padding: '4px', borderRadius: 'var(--radius-md)',
        }}>
          <button
            onClick={() => switchLanguage('latex')}
            style={{
              padding: '0.4rem 0.85rem', borderRadius: '6px',
              fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', border: 'none',
              background: lang === 'latex' ? 'var(--color-primary)' : 'transparent',
              color: lang === 'latex' ? '#fff' : 'var(--color-text-muted)',
            }}
          >
            📄 LaTeX
          </button>
          <button
            onClick={() => switchLanguage('html')}
            style={{
              padding: '0.4rem 0.85rem', borderRadius: '6px',
              fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', border: 'none',
              background: lang === 'html' ? 'var(--color-primary)' : 'transparent',
              color: lang === 'html' ? '#fff' : 'var(--color-text-muted)',
            }}
          >
            🌐 HTML
          </button>
          <button
            onClick={() => switchLanguage('auto')}
            style={{
              padding: '0.4rem 0.85rem', borderRadius: '6px',
              fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', border: 'none',
              background: lang === 'auto' ? 'var(--color-primary)' : 'transparent',
              color: lang === 'auto' ? '#fff' : 'var(--color-text-muted)',
            }}
          >
            📊 Auto-Sync DB
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Split Container */}
      {lang !== 'auto' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              💡 Edit the {lang === 'latex' ? 'LaTeX code' : 'HTML/CSS code'} on the left — the preview compiles live on the right!
            </span>
          </div>

          <div className="editor-preview-split" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
            alignItems: 'start', minHeight: '680px',
          }}>
            {/* Left: Code Editor */}
            <div style={{
              background: '#0d1117', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', height: '760px',
            }}>
              <div style={{
                padding: '0.75rem 1.25rem', background: '#161b22',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8b949e', fontWeight: 600 }}>
                  {lang === 'latex' ? '📄 resume.tex' : '📄 resume.html'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#58a6ff', fontWeight: 600 }}>
                  {lang === 'latex' ? 'LaTeX Editor' : 'HTML / CSS Editor'}
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
              height: '760px', display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                padding: '0.75rem 1.25rem', background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                  👁️ Live ATS Resume Preview
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  ✓ Live Engine Active
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
            style={{ width: '100%', height: '760px', border: 'none', background: '#fff' }}
          />
        </div>
      )}
    </div>
  );
}
