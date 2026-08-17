'use client';

import { THEMES } from '@/lib/constants';

export default function PortfolioRenderer({ data }) {
  const { portfolio, skills, projects, experiences, education, testimonials, user } = data;
  const theme = THEMES[portfolio?.theme] || THEMES['minimal-elegance'];
  const t = theme.colors;
  const accentColor = portfolio?.accent_color || t.accent;

  const socialLinks = [
    { url: portfolio?.linkedin, label: 'LinkedIn', icon: '💼' },
    { url: portfolio?.github, label: 'GitHub', icon: '🐙' },
    { url: portfolio?.twitter, label: 'Twitter', icon: '🐦' },
    { url: portfolio?.dribbble, label: 'Dribbble', icon: '🎨' },
    { url: portfolio?.behance, label: 'Behance', icon: '🅱️' },
    { url: portfolio?.youtube, label: 'YouTube', icon: '▶️' },
    { url: portfolio?.instagram, label: 'Instagram', icon: '📷' },
    { url: portfolio?.website, label: 'Website', icon: '🌐' },
  ].filter(l => l.url);

  const isDark = ['developer-dark', 'creative-studio', 'glassmorphism-modern'].includes(portfolio?.theme);

  return (
    <div className="portfolio-page" style={{
      '--accent': accentColor,
      '--bg': t.background,
      '--surface': t.surface,
      '--text': t.text,
      '--primary': t.primary,
      fontFamily: theme.font,
      background: t.background,
      color: t.text,
      minHeight: '100vh',
    }}>
      {/* Glassmorphism gradient background */}
      {portfolio?.theme === 'glassmorphism-modern' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, ${accentColor}25 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #764ba233 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, #ec489922 0%, transparent 50%),
            ${t.background}
          `,
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── HERO ──────────────────────────────── */}
        <section style={{
          padding: '6rem 1.5rem 4rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {portfolio?.profile_image && (
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem',
              overflow: 'hidden', border: `3px solid ${accentColor}`,
              boxShadow: `0 0 30px ${accentColor}33`,
            }}>
              <img src={portfolio.profile_image} alt={portfolio.hero_title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1,
            marginBottom: '0.75rem', letterSpacing: '-0.02em',
          }}>
            {portfolio?.hero_title || user?.full_name || user?.username || 'Your Name'}
          </h1>
          {portfolio?.hero_subtitle && (
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.8, marginBottom: '0.5rem' }}>
              {portfolio.hero_subtitle}
            </p>
          )}
          {portfolio?.tagline && (
            <p style={{ fontSize: '1rem', opacity: 0.6, maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              {portfolio.tagline}
            </p>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.375rem 0.875rem', borderRadius: '20px', fontSize: '0.85rem',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  transition: 'all 0.2s',
                  color: t.text,
                }} onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
                   onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = t.text; }}>
                  <span>{link.icon}</span> {link.label}
                </a>
              ))}
            </div>
          )}

          {portfolio?.cta_text && (
            <a href={portfolio.cta_link || '#projects'} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 600,
              background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
              color: '#fff', fontSize: '1rem', transition: 'all 0.3s',
              boxShadow: `0 4px 20px ${accentColor}44`,
            }}>
              {portfolio.cta_text} →
            </a>
          )}
        </section>

        {/* ── ABOUT ─────────────────────────────── */}
        {(portfolio?.about_text || portfolio?.bio) && (
          <section id="about" style={{
            padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto',
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>About Me</h2>
            <div style={{
              display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap',
            }}>
              {portfolio?.about_image && (
                <img src={portfolio.about_image} alt="About" style={{
                  width: '200px', height: '200px', objectFit: 'cover', borderRadius: '16px',
                  border: `2px solid ${accentColor}33`, flexShrink: 0,
                }} />
              )}
              <div style={{ flex: 1, minWidth: '280px' }}>
                {portfolio?.bio && <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.6 }}>{portfolio.bio}</p>}
                {portfolio?.about_text && <p style={{ opacity: 0.8, lineHeight: 1.8 }}>{portfolio.about_text}</p>}
                {portfolio?.location && (
                  <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.9rem' }}>📍 {portfolio.location}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── SKILLS ────────────────────────────── */}
        {skills?.length > 0 && (
          <section id="skills" style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{
                  padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500,
                  background: isDark
                    ? `${accentColor}18`
                    : `${accentColor}12`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  {skill.name}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: '3px',
                    width: `${skill.proficiency}%`,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
                    borderRadius: '0 2px 0 0',
                  }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PROJECTS ──────────────────────────── */}
        {projects?.length > 0 && (
          <section id="projects" style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Projects</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}>
              {projects.map((proj, i) => (
                <div key={i} style={{
                  borderRadius: '16px', overflow: 'hidden',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  transition: 'all 0.3s',
                  ...(portfolio?.theme === 'glassmorphism-modern' ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' } : {}),
                }}>
                  {proj.image && (
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
                    {proj.short_description && <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.75rem', lineHeight: 1.6 }}>{proj.short_description}</p>}
                    {proj.impact_metrics && (
                      <p style={{ fontSize: '0.85rem', color: accentColor, fontWeight: 600, marginBottom: '0.75rem' }}>
                        📈 {proj.impact_metrics}
                      </p>
                    )}
                    {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
                        {proj.tech_stack.map((tech, j) => (
                          <span key={j} style={{
                            fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '6px',
                            background: `${accentColor}15`, color: accentColor,
                          }}>{tech}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {proj.live_url && <a href={proj.live_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: accentColor, fontWeight: 600 }}>Live Demo ↗</a>}
                      {proj.github_url && <a href={proj.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: 500 }}>GitHub ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EXPERIENCE ────────────────────────── */}
        {experiences?.length > 0 && (
          <section id="experience" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{
                position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px',
                background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}33)`,
              }} />
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-2rem', top: '8px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: accentColor, border: `3px solid ${t.background}`,
                    boxShadow: `0 0 10px ${accentColor}44`,
                  }} />
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{exp.role}</h3>
                  <p style={{ color: accentColor, fontWeight: 600, fontSize: '0.95rem' }}>{exp.company}</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '0.5rem' }}>
                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date} {exp.location && `• ${exp.location}`}
                  </p>
                  {exp.description && <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '0.95rem' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EDUCATION ─────────────────────────── */}
        {education?.length > 0 && (
          <section id="education" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu, i) => (
                <div key={i} style={{
                  padding: '1.5rem', borderRadius: '12px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: accentColor, fontWeight: 500 }}>{edu.institution}</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>
                    {edu.start_date}{edu.end_date ? ` — ${edu.end_date}` : ''}
                  </p>
                  {edu.description && <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.7 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TESTIMONIALS ──────────────────────── */}
        {testimonials?.length > 0 && (
          <section id="testimonials" style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Testimonials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {testimonials.map((test, i) => (
                <div key={i} style={{
                  padding: '1.5rem', borderRadius: '16px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  ...(portfolio?.theme === 'glassmorphism-modern' ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' } : {}),
                }}>
                  <p style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '0.75rem', opacity: 0.3 }}>&ldquo;</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.85, marginBottom: '1rem' }}>{test.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                    }}>
                      {test.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{test.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                        {test.role}{test.company ? ` at ${test.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONTACT ───────────────────────────── */}
        <section id="contact" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Get In Touch</h2>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Interested in working together? Feel free to reach out.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            {user?.email && (
              <a href={`mailto:${user.email}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 600,
                background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
                color: '#fff', fontSize: '1rem',
              }}>
                ✉️ {user.email}
              </a>
            )}
            {portfolio?.phone && <p style={{ opacity: 0.7 }}>📞 {portfolio.phone}</p>}
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────── */}
        <footer style={{
          padding: '2rem 1.5rem', textAlign: 'center',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          marginTop: '2rem', opacity: 0.5, fontSize: '0.85rem',
        }}>
          Built with PortBuilder
        </footer>
      </div>
    </div>
  );
}
