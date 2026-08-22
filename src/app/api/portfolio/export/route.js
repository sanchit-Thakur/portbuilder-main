import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { THEMES, DEFAULT_SECTIONS_ORDER } from '@/lib/constants';

export async function GET() {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolio = await queryOne('SELECT * FROM portfolios WHERE user_id = ?', [user.id]);
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Parse sections order if needed
    if (portfolio.sections_order && typeof portfolio.sections_order === 'string') {
      try {
        portfolio.sections_order = JSON.parse(portfolio.sections_order);
      } catch {
        portfolio.sections_order = DEFAULT_SECTIONS_ORDER;
      }
    }

    const skills = await query('SELECT * FROM skills WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const projects = await query('SELECT * FROM projects WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const experiences = await query('SELECT * FROM experiences WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const education = await query('SELECT * FROM education WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const testimonials = await query('SELECT * FROM testimonials WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);

    // Parse tech stack in projects
    projects.forEach(p => {
      if (p.tech_stack && typeof p.tech_stack === 'string') {
        try { p.tech_stack = JSON.parse(p.tech_stack); } catch { p.tech_stack = []; }
      }
    });

    const theme = THEMES[portfolio?.theme] || THEMES['minimal-elegance'];
    const accent = portfolio?.accent_color || theme.colors.accent;
    const isDark = ['developer-dark', 'creative-studio', 'glassmorphism-modern'].includes(portfolio?.theme);

    const html = generateStandaloneHTML(user, portfolio, skills, projects, experiences, education, testimonials, theme, accent, isDark);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${user.username}-portfolio.html"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateStandaloneHTML(user, p, skills, projects, experiences, education, testimonials, theme, accent, isDark) {
  const t = theme.colors;
  const title = `${p.hero_title || user.full_name || user.username} — Portfolio`;

  const socialLinks = [
    { url: p.linkedin, label: 'LinkedIn' },
    { url: p.github, label: 'GitHub' },
    { url: p.twitter, label: 'Twitter' },
    { url: p.dribbble, label: 'Dribbble' },
    { url: p.behance, label: 'Behance' },
    { url: p.youtube, label: 'YouTube' },
    { url: p.instagram, label: 'Instagram' },
    { url: p.website, label: 'Website' },
  ].filter(l => l.url);

  const sectionsOrder = Array.isArray(p.sections_order) && p.sections_order.length > 0
    ? p.sections_order
    : DEFAULT_SECTIONS_ORDER;

  const sectionRenderers = {
    hero: `
      <div id="hero" class="hero">
        ${p.profile_image ? `<img src="${p.profile_image}" alt="Profile" class="profile-img">` : ''}
        <h1>${p.hero_title || user.full_name || user.username}</h1>
        ${p.hero_subtitle ? `<div class="hero-subtitle">${p.hero_subtitle}</div>` : ''}
        ${p.tagline ? `<p class="tagline">${p.tagline}</p>` : ''}
        ${socialLinks.length > 0 ? `
          <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.5rem;">
            ${socialLinks.map(l => `<a href="${l.url}" target="_blank" class="social-chip">${l.label}</a>`).join('')}
          </div>
        ` : ''}
        ${p.cta_text ? `<a href="${p.cta_link || '#projects'}" class="btn">${p.cta_text} →</a>` : ''}
      </div>
    `,
    about: (p.about_text || p.bio) ? `
      <section id="about">
        <h2 class="section-title">About Me</h2>
        <div class="card about-card">
          ${p.about_image ? `<img src="${p.about_image}" alt="About" style="width:160px; height:160px; object-fit:cover; border-radius:12px; margin-bottom:1rem;">` : ''}
          <div>
            ${p.bio ? `<p style="font-size:1.15rem; font-weight:600; margin-bottom:0.75rem;">${p.bio}</p>` : ''}
            ${p.about_text ? `<p style="opacity:0.85; line-height:1.8;">${p.about_text}</p>` : ''}
            ${p.location ? `<p style="margin-top:1rem; opacity:0.6; font-size:0.9rem;">📍 ${p.location}</p>` : ''}
          </div>
        </div>
      </section>
    ` : '',
    skills: skills.length > 0 ? `
      <section id="skills">
        <h2 class="section-title">Skills & Expertise</h2>
        <div class="skills-flex">
          ${skills.map(s => `<span class="skill-badge">${s.name}</span>`).join('')}
        </div>
      </section>
    ` : '',
    projects: projects.length > 0 ? `
      <section id="projects">
        <h2 class="section-title">Featured Projects</h2>
        <div class="grid">
          ${projects.map(pr => `
            <div class="card">
              ${pr.image ? `<img src="${pr.image}" style="width:100%; height:170px; object-fit:cover; border-radius:8px; margin-bottom:1rem;">` : ''}
              <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">${pr.title}</h3>
              <p style="font-size:0.9rem; opacity:0.8; margin-bottom:1rem;">${pr.short_description || pr.description || ''}</p>
              ${pr.impact_metrics ? `<p style="font-size:0.85rem; color:var(--accent); font-weight:600; margin-bottom:0.75rem;">📈 ${pr.impact_metrics}</p>` : ''}
              ${Array.isArray(pr.tech_stack) && pr.tech_stack.length > 0 ? `
                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:1rem;">
                  ${pr.tech_stack.map(st => `<span style="font-size:0.75rem; padding:2px 8px; background:rgba(108,99,255,0.15); color:var(--accent); border-radius:4px; font-weight:500;">${st}</span>`).join('')}
                </div>
              ` : ''}
              <div style="display:flex; gap:1rem;">
                ${pr.live_url && pr.live_url !== '#' ? `<a href="${pr.live_url}" target="_blank" style="font-weight:600; font-size:0.85rem;">Live Demo ↗</a>` : ''}
                ${pr.github_url && pr.github_url !== '#' ? `<a href="${pr.github_url}" target="_blank" style="opacity:0.7; font-size:0.85rem;">GitHub ↗</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : '',
    experience: experiences.length > 0 ? `
      <section id="experience">
        <h2 class="section-title">Work Experience</h2>
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          ${experiences.map(ex => `
            <div class="card">
              <h3 style="font-size:1.15rem; font-weight:700;">${ex.role} — <span style="color:var(--accent);">${ex.company}</span></h3>
              <div style="font-size:0.85rem; opacity:0.6; margin-bottom:0.5rem;">${ex.start_date} — ${ex.is_current ? 'Present' : ex.end_date} ${ex.location ? `• ${ex.location}` : ''}</div>
              <p style="font-size:0.95rem; opacity:0.85;">${ex.description || ''}</p>
            </div>
          `).join('')}
        </div>
      </section>
    ` : '',
    education: education.length > 0 ? `
      <section id="education">
        <h2 class="section-title">Education</h2>
        <div class="grid">
          ${education.map(ed => `
            <div class="card">
              <h3 style="font-size:1.1rem; font-weight:700;">${ed.degree}${ed.field ? ' in ' + ed.field : ''}</h3>
              <div style="color:var(--accent); font-weight:600; font-size:0.95rem;">${ed.institution}</div>
              <div style="font-size:0.85rem; opacity:0.6;">${ed.start_date} — ${ed.end_date}</div>
              ${ed.description ? `<p style="margin-top:0.5rem; opacity:0.8; font-size:0.9rem;">${ed.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    ` : '',
    testimonials: testimonials.length > 0 ? `
      <section id="testimonials">
        <h2 class="section-title">Testimonials</h2>
        <div class="grid">
          ${testimonials.map(tm => `
            <div class="card">
              <p style="font-size:1.75rem; line-height:1; opacity:0.3; margin-bottom:0.5rem;">&ldquo;</p>
              <p style="font-size:0.95rem; opacity:0.85; line-height:1.7; margin-bottom:1rem;">${tm.text}</p>
              <div style="font-weight:700; font-size:0.95rem;">${tm.name}</div>
              <div style="font-size:0.8rem; opacity:0.6;">${tm.role}${tm.company ? ` at ${tm.company}` : ''}</div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : '',
    contact: `
      <section id="contact" style="text-align:center;">
        <h2 class="section-title">Get In Touch</h2>
        <p style="opacity:0.8; margin-bottom:1.5rem; font-size:1.05rem;">Interested in collaborating or discussing new opportunities?</p>
        ${user.email ? `<a href="mailto:${user.email}" class="btn">✉️ ${user.email}</a>` : ''}
        ${p.phone ? `<p style="margin-top:1rem; opacity:0.7;">📞 ${p.phone}</p>` : ''}
      </section>
    `,
  };

  const renderedContent = sectionsOrder
    .map(secKey => sectionRenderers[secKey] || '')
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${p.bio || p.tagline || 'Personal Portfolio'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accent};
      --bg: ${t.background};
      --surface: ${t.surface};
      --text: ${t.text};
      --primary: ${t.primary};
      --font: ${theme.font};
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
    }
    a { color: var(--accent); text-decoration: none; }
    .container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }
    
    /* Header / Nav */
    nav {
      position: sticky; top: 0; z-index: 100;
      background: ${isDark ? 'rgba(13, 17, 23, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
      backdrop-filter: blur(16px);
      border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
      padding: 1rem 0;
    }
    .nav-inner { display: flex; justify-content: space-between; align-items: center; }
    .nav-brand { font-weight: 800; font-size: 1.25rem; color: var(--text); }
    .nav-links { display: flex; gap: 1.5rem; list-style: none; }
    .nav-links a { color: var(--text); opacity: 0.8; font-size: 0.9rem; font-weight: 500; }
    .nav-links a:hover { opacity: 1; color: var(--accent); }

    /* Hero */
    .hero { padding: 6rem 0 4rem; text-align: center; }
    .profile-img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent); margin-bottom: 1.5rem; }
    .hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 0.5rem; }
    .hero-subtitle { font-size: 1.25rem; opacity: 0.85; margin-bottom: 0.5rem; }
    .tagline { opacity: 0.7; max-width: 600px; margin: 0 auto 1.5rem; font-size: 1rem; }
    .social-chip {
      display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.85rem;
      border-radius: 20px; font-size: 0.85rem; border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};
      color: var(--text); background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
    }
    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 2rem; border-radius: 10px; font-weight: 600;
      background: var(--accent); color: #fff; border: none; cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    /* Sections */
    section { padding: 4rem 0; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; }
    h2.section-title { font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2.5rem; }

    /* Grid */
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .card {
      background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
      border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
      border-radius: 16px; padding: 1.5rem; transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-3px); }

    /* Skills */
    .skills-flex { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
    .skill-badge {
      background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
      border: 1px solid var(--accent); color: var(--accent);
      padding: 0.5rem 1.25rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;
    }

    /* Footer */
    footer { padding: 3rem 0; text-align: center; opacity: 0.6; font-size: 0.85rem; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container nav-inner">
      <a href="#hero" class="nav-brand">${p.hero_title || user.full_name || user.username}</a>
      <ul class="nav-links">
        ${skills.length > 0 ? '<li><a href="#skills">Skills</a></li>' : ''}
        ${projects.length > 0 ? '<li><a href="#projects">Projects</a></li>' : ''}
        ${experiences.length > 0 ? '<li><a href="#experience">Experience</a></li>' : ''}
        ${education.length > 0 ? '<li><a href="#education">Education</a></li>' : ''}
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main class="container">
    ${renderedContent}
  </main>

  <footer>
    <div class="container">
      © ${new Date().getFullYear()} ${user.full_name || user.username}. Built with PortBuilder.
    </div>
  </footer>
</body>
</html>`;
}
