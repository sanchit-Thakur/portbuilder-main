import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { THEMES } from '@/lib/constants';

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
      backdrop-filter: blur(12px);
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
    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.75rem; border-radius: 10px; font-weight: 600;
      background: var(--accent); color: #fff; border: none; cursor: pointer;
    }

    /* Sections */
    section { padding: 4rem 0; border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; }
    h2.section-title { font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2.5rem; }

    /* Grid */
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .card {
      background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
      border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
      border-radius: 14px; padding: 1.5rem; transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-3px); }

    /* Skills */
    .skills-flex { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
    .skill-badge {
      background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
      border: 1px solid var(--accent); color: var(--accent);
      padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;
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
      <a href="#" class="nav-brand">${p.hero_title || user.full_name || user.username}</a>
      <ul class="nav-links">
        ${skills.length > 0 ? '<li><a href="#skills">Skills</a></li>' : ''}
        ${projects.length > 0 ? '<li><a href="#projects">Projects</a></li>' : ''}
        ${experiences.length > 0 ? '<li><a href="#experience">Experience</a></li>' : ''}
        ${education.length > 0 ? '<li><a href="#education">Education</a></li>' : ''}
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main className="container">
    <div className="hero">
      ${p.profile_image ? `<img src="${p.profile_image}" alt="Profile" class="profile-img">` : ''}
      <h1>${p.hero_title || user.full_name || user.username}</h1>
      ${p.hero_subtitle ? `<div class="hero-subtitle">${p.hero_subtitle}</div>` : ''}
      ${p.tagline ? `<p class="tagline">${p.tagline}</p>` : ''}
      ${p.cta_text ? `<a href="${p.cta_link || '#projects'}" class="btn">${p.cta_text} →</a>` : ''}
    </div>

    ${p.about_text || p.bio ? `
      <section id="about" class="container">
        <h2 class="section-title">About Me</h2>
        <div class="card">
          ${p.bio ? `<p style="font-size:1.1rem; font-weight:600; margin-bottom:0.75rem;">${p.bio}</p>` : ''}
          ${p.about_text ? `<p style="opacity:0.85; line-height:1.8;">${p.about_text}</p>` : ''}
        </div>
      </section>
    ` : ''}

    ${skills.length > 0 ? `
      <section id="skills" class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-flex">
          ${skills.map(s => `<span class="skill-badge">${s.name}</span>`).join('')}
        </div>
      </section>
    ` : ''}

    ${projects.length > 0 ? `
      <section id="projects" class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="grid">
          ${projects.map(pr => `
            <div class="card">
              ${pr.image ? `<img src="${pr.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:1rem;">` : ''}
              <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">${pr.title}</h3>
              <p style="font-size:0.9rem; opacity:0.8; margin-bottom:1rem;">${pr.short_description || pr.description || ''}</p>
              ${Array.isArray(pr.tech_stack) ? `
                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:1rem;">
                  ${pr.tech_stack.map(st => `<span style="font-size:0.75rem; padding:2px 6px; background:rgba(108,99,255,0.1); color:var(--accent); border-radius:4px;">${st}</span>`).join('')}
                </div>
              ` : ''}
              <div style="display:flex; gap:1rem;">
                ${pr.live_url ? `<a href="${pr.live_url}" target="_blank" style="font-weight:600; font-size:0.85rem;">Live Demo ↗</a>` : ''}
                ${pr.github_url ? `<a href="${pr.github_url}" target="_blank" style="opacity:0.7; font-size:0.85rem;">GitHub ↗</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    ${experiences.length > 0 ? `
      <section id="experience" class="container">
        <h2 class="section-title">Work Experience</h2>
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          ${experiences.map(ex => `
            <div class="card">
              <h3 style="font-size:1.1rem; font-weight:700;">${ex.role} — <span style="color:var(--accent);">${ex.company}</span></h3>
              <div style="font-size:0.85rem; opacity:0.6; margin-bottom:0.5rem;">${ex.start_date} — ${ex.is_current ? 'Present' : ex.end_date}</div>
              <p style="font-size:0.95rem; opacity:0.85;">${ex.description || ''}</p>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    ${education.length > 0 ? `
      <section id="education" class="container">
        <h2 class="section-title">Education</h2>
        <div class="grid">
          ${education.map(ed => `
            <div class="card">
              <h3 style="font-size:1.1rem; font-weight:700;">${ed.degree}${ed.field ? ' in ' + ed.field : ''}</h3>
              <div style="color:var(--accent); font-weight:600; font-size:0.95rem;">${ed.institution}</div>
              <div style="font-size:0.85rem; opacity:0.6;">${ed.start_date} — ${ed.end_date}</div>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <section id="contact" class="container" style="text-align:center;">
      <h2 class="section-title">Get In Touch</h2>
      <p style="opacity:0.8; margin-bottom:1.5rem;">Ready to collaborate or discuss new opportunities?</p>
      ${user.email ? `<a href="mailto:${user.email}" class="btn">✉️ ${user.email}</a>` : ''}
    </section>
  </main>

  <footer>
    <div class="container">
      © ${new Date().getFullYear()} ${user.full_name || user.username}. Created with PortBuilder.
    </div>
  </footer>
</body>
</html>`;
}
