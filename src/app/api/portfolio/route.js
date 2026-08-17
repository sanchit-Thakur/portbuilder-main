import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateId } from '@/lib/utils';

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

    // Parse JSON fields
    if (portfolio.sections_order && typeof portfolio.sections_order === 'string') {
      portfolio.sections_order = JSON.parse(portfolio.sections_order);
    }

    const skills = await query('SELECT * FROM skills WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const projects = await query('SELECT * FROM projects WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const experiences = await query('SELECT * FROM experiences WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const education = await query('SELECT * FROM education WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const testimonials = await query('SELECT * FROM testimonials WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);

    // Parse tech_stack JSON in projects
    projects.forEach(p => {
      if (p.tech_stack && typeof p.tech_stack === 'string') {
        try { p.tech_stack = JSON.parse(p.tech_stack); } catch { p.tech_stack = []; }
      }
    });

    return NextResponse.json({
      portfolio,
      skills,
      projects,
      experiences,
      education,
      testimonials,
      user: { id: user.id, email: user.email, username: user.username, full_name: user.full_name },
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const portfolio = await queryOne('SELECT * FROM portfolios WHERE user_id = ?', [user.id]);
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Update portfolio main fields
    if (data.portfolio) {
      const p = data.portfolio;
      await query(
        `UPDATE portfolios SET
          theme = ?, accent_color = ?, tagline = ?, bio = ?, profile_image = ?,
          hero_title = ?, hero_subtitle = ?, cta_text = ?, cta_link = ?,
          about_text = ?, about_image = ?, resume_url = ?,
          location = ?, phone = ?, website = ?,
          linkedin = ?, github = ?, twitter = ?, dribbble = ?,
          behance = ?, youtube = ?, instagram = ?,
          sections_order = ?, is_published = ?
        WHERE id = ?`,
        [
          p.theme || portfolio.theme,
          p.accent_color || portfolio.accent_color,
          p.tagline ?? portfolio.tagline,
          p.bio ?? portfolio.bio,
          p.profile_image ?? portfolio.profile_image,
          p.hero_title ?? portfolio.hero_title,
          p.hero_subtitle ?? portfolio.hero_subtitle,
          p.cta_text ?? portfolio.cta_text,
          p.cta_link ?? portfolio.cta_link,
          p.about_text ?? portfolio.about_text,
          p.about_image ?? portfolio.about_image,
          p.resume_url ?? portfolio.resume_url,
          p.location ?? portfolio.location,
          p.phone ?? portfolio.phone,
          p.website ?? portfolio.website,
          p.linkedin ?? portfolio.linkedin,
          p.github ?? portfolio.github,
          p.twitter ?? portfolio.twitter,
          p.dribbble ?? portfolio.dribbble,
          p.behance ?? portfolio.behance,
          p.youtube ?? portfolio.youtube,
          p.instagram ?? portfolio.instagram,
          JSON.stringify(p.sections_order || portfolio.sections_order),
          p.is_published ?? portfolio.is_published,
          portfolio.id,
        ]
      );
    }

    // Update skills
    if (data.skills !== undefined) {
      await query('DELETE FROM skills WHERE portfolio_id = ?', [portfolio.id]);
      for (let i = 0; i < data.skills.length; i++) {
        const s = data.skills[i];
        await query(
          'INSERT INTO skills (id, portfolio_id, name, category, proficiency, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
          [s.id || generateId(), portfolio.id, s.name, s.category || 'General', s.proficiency || 80, i]
        );
      }
    }

    // Update projects
    if (data.projects !== undefined) {
      await query('DELETE FROM projects WHERE portfolio_id = ?', [portfolio.id]);
      for (let i = 0; i < data.projects.length; i++) {
        const p = data.projects[i];
        await query(
          `INSERT INTO projects (id, portfolio_id, title, description, short_description, image, tech_stack, live_url, github_url, category, impact_metrics, featured, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id || generateId(), portfolio.id, p.title, p.description || '', p.short_description || '',
            p.image || '', JSON.stringify(p.tech_stack || []), p.live_url || '', p.github_url || '',
            p.category || '', p.impact_metrics || '', p.featured ? 1 : 0, i,
          ]
        );
      }
    }

    // Update experiences
    if (data.experiences !== undefined) {
      await query('DELETE FROM experiences WHERE portfolio_id = ?', [portfolio.id]);
      for (let i = 0; i < data.experiences.length; i++) {
        const e = data.experiences[i];
        await query(
          `INSERT INTO experiences (id, portfolio_id, company, role, description, start_date, end_date, is_current, location, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            e.id || generateId(), portfolio.id, e.company, e.role, e.description || '',
            e.start_date || '', e.end_date || '', e.is_current ? 1 : 0, e.location || '', i,
          ]
        );
      }
    }

    // Update education
    if (data.education !== undefined) {
      await query('DELETE FROM education WHERE portfolio_id = ?', [portfolio.id]);
      for (let i = 0; i < data.education.length; i++) {
        const ed = data.education[i];
        await query(
          `INSERT INTO education (id, portfolio_id, institution, degree, field, start_date, end_date, description, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            ed.id || generateId(), portfolio.id, ed.institution, ed.degree, ed.field || '',
            ed.start_date || '', ed.end_date || '', ed.description || '', i,
          ]
        );
      }
    }

    // Update testimonials
    if (data.testimonials !== undefined) {
      await query('DELETE FROM testimonials WHERE portfolio_id = ?', [portfolio.id]);
      for (let i = 0; i < data.testimonials.length; i++) {
        const t = data.testimonials[i];
        await query(
          `INSERT INTO testimonials (id, portfolio_id, name, role, company, text, image, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            t.id || generateId(), portfolio.id, t.name, t.role || '', t.company || '',
            t.text, t.image || '', i,
          ]
        );
      }
    }

    // Update user full_name if provided
    if (data.user?.full_name !== undefined) {
      await query('UPDATE users SET full_name = ? WHERE id = ?', [data.user.full_name, user.id]);
    }

    return NextResponse.json({ message: 'Portfolio updated successfully' });
  } catch (error) {
    console.error('Update portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
