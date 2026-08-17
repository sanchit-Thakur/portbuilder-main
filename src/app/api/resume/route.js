import { NextResponse } from 'next/server';
import { queryOne, query, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

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
    const experiences = await query('SELECT * FROM experiences WHERE portfolio_id = ? ORDER BY sort_order DESC', [portfolio.id]);
    const education = await query('SELECT * FROM education WHERE portfolio_id = ? ORDER BY sort_order DESC', [portfolio.id]);

    // Build resume HTML
    const html = buildResumeHTML(user, portfolio, skills, projects, experiences, education);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="${user.username}-resume.html"`,
      },
    });
  } catch (error) {
    console.error('Resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function buildResumeHTML(user, portfolio, skills, projects, experiences, education) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${user.full_name || user.username} - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #1a1a2e; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 18px; color: #6C63FF; border-bottom: 2px solid #6C63FF; padding-bottom: 4px; margin: 24px 0 12px; }
    h3 { font-size: 15px; margin-bottom: 2px; }
    .contact { color: #555; font-size: 13px; margin-bottom: 16px; }
    .contact a { color: #6C63FF; text-decoration: none; }
    .summary { font-size: 14px; color: #333; margin-bottom: 8px; }
    .entry { margin-bottom: 16px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
    .entry-header .date { font-size: 13px; color: #777; }
    .entry-sub { font-size: 13px; color: #555; }
    .entry p { font-size: 14px; margin-top: 4px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
    .skill-tag { background: #f0efff; color: #6C63FF; padding: 3px 10px; border-radius: 4px; font-size: 12px; }
    .projects-list .project { margin-bottom: 12px; }
    .project-title { font-weight: 600; font-size: 14px; }
    .project-desc { font-size: 13px; color: #555; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${user.full_name || user.username}</h1>
  <div class="contact">
    ${portfolio.location ? `📍 ${portfolio.location}` : ''}
    ${portfolio.phone ? ` | 📞 ${portfolio.phone}` : ''}
    ${user.email ? ` | ✉️ ${user.email}` : ''}
    ${portfolio.website ? ` | 🌐 <a href="${portfolio.website}">${portfolio.website}</a>` : ''}
    ${portfolio.linkedin ? ` | <a href="${portfolio.linkedin}">LinkedIn</a>` : ''}
    ${portfolio.github ? ` | <a href="${portfolio.github}">GitHub</a>` : ''}
  </div>

  ${portfolio.bio ? `<p class="summary">${portfolio.bio}</p>` : ''}

  ${experiences.length > 0 ? `
    <h2>Experience</h2>
    ${experiences.map(e => `
      <div class="entry">
        <div class="entry-header">
          <h3>${e.role}</h3>
          <span class="date">${e.start_date}${e.end_date ? ` — ${e.end_date}` : e.is_current ? ' — Present' : ''}</span>
        </div>
        <div class="entry-sub">${e.company}${e.location ? `, ${e.location}` : ''}</div>
        ${e.description ? `<p>${e.description}</p>` : ''}
      </div>
    `).join('')}
  ` : ''}

  ${education.length > 0 ? `
    <h2>Education</h2>
    ${education.map(ed => `
      <div class="entry">
        <div class="entry-header">
          <h3>${ed.degree}${ed.field ? ` in ${ed.field}` : ''}</h3>
          <span class="date">${ed.start_date}${ed.end_date ? ` — ${ed.end_date}` : ''}</span>
        </div>
        <div class="entry-sub">${ed.institution}</div>
        ${ed.description ? `<p>${ed.description}</p>` : ''}
      </div>
    `).join('')}
  ` : ''}

  ${skills.length > 0 ? `
    <h2>Skills</h2>
    <div class="skills-grid">
      ${skills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}
    </div>
  ` : ''}

  ${projects.length > 0 ? `
    <h2>Projects</h2>
    <div class="projects-list">
      ${projects.map(p => `
        <div class="project">
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.short_description || p.description || ''}</div>
        </div>
      `).join('')}
    </div>
  ` : ''}
</body>
</html>`;
}
