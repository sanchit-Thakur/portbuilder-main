'use client';

import { useState } from 'react';
import { THEMES, DEFAULT_SECTIONS_ORDER } from '@/lib/constants';

export default function PortfolioRenderer({ data }) {
  const { portfolio, skills = [], projects = [], experiences = [], education = [], testimonials = [], user } = data || {};
  const theme = THEMES[portfolio?.theme] || THEMES['minimal-elegance'];
  const t = theme.colors;
  const accentColor = portfolio?.accent_color || t.accent;

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sentStatus, setSentStatus] = useState(null);

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSentStatus(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          category: `Portfolio Message (${user?.username || 'user'})`,
          rating: 5,
          message: `[Message for ${user?.full_name || user?.username}]:\n${contactForm.message}`,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to send message');
      }
      setSentStatus({ type: 'success', text: 'Message sent successfully! Thank you for reaching out.' });
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSentStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const sectionsOrder = Array.isArray(portfolio?.sections_order) && portfolio.sections_order.length > 0
    ? portfolio.sections_order
    : DEFAULT_SECTIONS_ORDER;

  // Section renderers
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'hero':
        return (
          <section key="hero" id="hero" style={{
            padding: '6rem 1.5rem 4rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {portfolio?.profile_image && (
              <div style={{
                width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto 1.5rem',
                overflow: 'hidden', border: `3px solid ${accentColor}`,
                boxShadow: `0 0 30px ${accentColor}33`,
              }}>
                <img src={portfolio.profile_image} alt={portfolio.hero_title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15,
              marginBottom: '0.75rem', letterSpacing: '-0.02em',
            }}>
              {portfolio?.hero_title || user?.full_name || user?.username || 'Your Name'}
            </h1>
            {portfolio?.hero_subtitle && (
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', opacity: 0.85, marginBottom: '0.5rem', fontWeight: 500 }}>
                {portfolio.hero_subtitle}
              </p>
            )}
            {portfolio?.tagline && (
              <p style={{ fontSize: '1rem', opacity: 0.65, maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
                {portfolio.tagline}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.4rem 0.95rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500,
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
                    transition: 'all 0.2s',
                    color: t.text,
                    textDecoration: 'none',
                  }}>
                    <span>{link.icon}</span> {link.label}
                  </a>
                ))}
              </div>
            )}

            {portfolio?.cta_text && (
              <a href={portfolio.cta_link || '#projects'} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2.25rem', borderRadius: '12px', fontWeight: 600,
                background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
                color: '#fff', fontSize: '1rem', transition: 'all 0.3s',
                boxShadow: `0 6px 25px ${accentColor}44`,
                textDecoration: 'none',
              }}>
                {portfolio.cta_text} →
              </a>
            )}
          </section>
        );

      case 'about':
        if (!portfolio?.about_text && !portfolio?.bio) return null;
        return (
          <section key="about" id="about" style={{
            padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto',
          }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>About Me</h2>
            <div style={{
              display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
              padding: '2.5rem', borderRadius: '20px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              backdropFilter: portfolio?.theme === 'glassmorphism-modern' ? 'blur(20px)' : 'none',
            }}>
              {portfolio?.about_image && (
                <img src={portfolio.about_image} alt="About" style={{
                  width: '180px', height: '180px', objectFit: 'cover', borderRadius: '16px',
                  border: `2px solid ${accentColor}33`, flexShrink: 0,
                }} />
              )}
              <div style={{ flex: 1, minWidth: '280px' }}>
                {portfolio?.bio && <p style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.6 }}>{portfolio.bio}</p>}
                {portfolio?.about_text && <p style={{ opacity: 0.85, lineHeight: 1.8, fontSize: '0.975rem' }}>{portfolio.about_text}</p>}
                {portfolio?.location && (
                  <p style={{ marginTop: '1.25rem', opacity: 0.7, fontSize: '0.9rem', fontWeight: 500 }}>📍 {portfolio.location}</p>
                )}
              </div>
            </div>
          </section>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <section key="skills" id="skills" style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Skills & Expertise</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {skills.map((skill, i) => (
                <div key={skill.id || i} style={{
                  padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600,
                  background: isDark ? `${accentColor}18` : `${accentColor}12`,
                  color: accentColor,
                  border: `1px solid ${accentColor}35`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  {skill.name}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: '3px',
                    width: `${skill.proficiency || 80}%`,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
                    borderRadius: '0 2px 0 0',
                  }} />
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" id="projects" style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>Featured Projects</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.75rem',
            }}>
              {projects.map((proj, i) => (
                <div key={proj.id || i} style={{
                  borderRadius: '18px', overflow: 'hidden',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  backdropFilter: portfolio?.theme === 'glassmorphism-modern' ? 'blur(20px)' : 'none',
                }}>
                  {proj.image && (
                    <div style={{ height: '190px', overflow: 'hidden' }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
                    {proj.short_description && <p style={{ fontSize: '0.92rem', opacity: 0.75, marginBottom: '0.85rem', lineHeight: 1.6 }}>{proj.short_description}</p>}
                    {proj.impact_metrics && (
                      <p style={{ fontSize: '0.85rem', color: accentColor, fontWeight: 600, marginBottom: '0.85rem' }}>
                        📈 {proj.impact_metrics}
                      </p>
                    )}
                    {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                        {proj.tech_stack.map((tech, j) => (
                          <span key={j} style={{
                            fontSize: '0.75rem', padding: '0.15rem 0.55rem', borderRadius: '6px',
                            background: `${accentColor}18`, color: accentColor, fontWeight: 500,
                          }}>{tech}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      {proj.live_url && proj.live_url !== '#' && <a href={proj.live_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: accentColor, fontWeight: 600, textDecoration: 'none' }}>Live Demo ↗</a>}
                      {proj.github_url && proj.github_url !== '#' && <a href={proj.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 500, textDecoration: 'none' }}>GitHub ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (!experiences || experiences.length === 0) return null;
        return (
          <section key="experience" id="experience" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>Work Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{
                position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px',
                background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}33)`,
              }} />
              {experiences.map((exp, i) => (
                <div key={exp.id || i} style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-2rem', top: '8px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: accentColor, border: `3px solid ${t.background}`,
                    boxShadow: `0 0 10px ${accentColor}44`,
                  }} />
                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem' }}>{exp.role}</h3>
                  <p style={{ color: accentColor, fontWeight: 600, fontSize: '0.95rem', marginTop: '0.1rem' }}>{exp.company}</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5, margin: '0.25rem 0 0.5rem' }}>
                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date} {exp.location && `• ${exp.location}`}
                  </p>
                  {exp.description && <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '0.95rem' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" id="education" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu, i) => (
                <div key={edu.id || i} style={{
                  padding: '1.75rem', borderRadius: '16px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  backdropFilter: portfolio?.theme === 'glassmorphism-modern' ? 'blur(15px)' : 'none',
                }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: accentColor, fontWeight: 600, marginTop: '0.2rem' }}>{edu.institution}</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '0.25rem' }}>
                    {edu.start_date}{edu.end_date ? ` — ${edu.end_date}` : ''}
                  </p>
                  {edu.description && <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.92rem', lineHeight: 1.7 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'testimonials':
        if (!testimonials || testimonials.length === 0) return null;
        return (
          <section key="testimonials" id="testimonials" style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>Testimonials & Endorsements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {testimonials.map((test, i) => (
                <div key={test.id || i} style={{
                  padding: '1.75rem', borderRadius: '18px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  backdropFilter: portfolio?.theme === 'glassmorphism-modern' ? 'blur(20px)' : 'none',
                }}>
                  <p style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.5rem', opacity: 0.25 }}>&ldquo;</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.85, marginBottom: '1.25rem' }}>{test.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                    }}>
                      {test.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{test.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                        {test.role}{test.company ? ` at ${test.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key="contact" id="contact" style={{ padding: '5rem 1.5rem', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Get In Touch</h2>
            <p style={{ opacity: 0.75, marginBottom: '2rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Interested in collaborating or discussing new projects? Drop a message below.
            </p>

            {/* Status notification */}
            {sentStatus && (
              <div style={{
                padding: '0.875rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem',
                background: sentStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: sentStatus.type === 'success' ? '#34d399' : '#f87171',
                border: `1px solid ${sentStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                fontSize: '0.9rem',
              }}>
                {sentStatus.type === 'success' ? '✅ ' : '❌ '}{sentStatus.text}
              </div>
            )}

            {/* Interactive Contact Form */}
            <form onSubmit={handleContactSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left',
              padding: '2rem', borderRadius: '20px',
              background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
              backdropFilter: portfolio?.theme === 'glassmorphism-modern' ? 'blur(20px)' : 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', opacity: 0.8 }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{
                      width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                      background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                      color: t.text, outline: 'none', fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', opacity: 0.8 }}>Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{
                      width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                      background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                      color: t.text, outline: 'none', fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', opacity: 0.8 }}>Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi, I saw your portfolio and would like to discuss..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                    color: t.text, outline: 'none', fontSize: '0.9rem', resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: '100%', padding: '0.85rem', borderRadius: '10px',
                  background: `linear-gradient(135deg, ${accentColor}, ${t.primary})`,
                  color: '#fff', fontWeight: 600, fontSize: '0.95rem', border: 'none',
                  cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.25rem',
                  boxShadow: `0 4px 15px ${accentColor}44`,
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? 'Sending message...' : 'Send Message ✉️'}
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', marginTop: '2rem' }}>
              {user?.email && (
                <a href={`mailto:${user.email}`} style={{ color: accentColor, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                  Or email directly: {user.email}
                </a>
              )}
              {portfolio?.phone && <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>📞 {portfolio.phone}</p>}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

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
      {/* Ambient glassmorphism glowing orbs for Modern Glass theme */}
      {portfolio?.theme === 'glassmorphism-modern' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', width: '550px', height: '550px', borderRadius: '50%',
            filter: 'blur(100px)', background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            top: '-100px', left: '-100px',
          }} />
          <div style={{
            position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
            filter: 'blur(100px)', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
            top: '30%', right: '-120px',
          }} />
          <div style={{
            position: 'absolute', width: '450px', height: '450px', borderRadius: '50%',
            filter: 'blur(100px)', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
            bottom: '-80px', left: '20%',
          }} />
        </div>
      )}

      {/* Top Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '0.875rem 1.5rem',
        background: isDark ? 'rgba(12, 12, 29, 0.75)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <a href="#hero" style={{
            fontWeight: 800, fontSize: '1.15rem', color: t.text, textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}>
            {portfolio?.hero_title || user?.full_name || user?.username || 'Portfolio'}
          </a>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {skills?.length > 0 && <a href="#skills" style={{ fontSize: '0.85rem', fontWeight: 500, color: t.text, opacity: 0.8, textDecoration: 'none' }}>Skills</a>}
            {projects?.length > 0 && <a href="#projects" style={{ fontSize: '0.85rem', fontWeight: 500, color: t.text, opacity: 0.8, textDecoration: 'none' }}>Projects</a>}
            {experiences?.length > 0 && <a href="#experience" style={{ fontSize: '0.85rem', fontWeight: 500, color: t.text, opacity: 0.8, textDecoration: 'none' }}>Experience</a>}
            {education?.length > 0 && <a href="#education" style={{ fontSize: '0.85rem', fontWeight: 500, color: t.text, opacity: 0.8, textDecoration: 'none' }}>Education</a>}
            <a href="#contact" style={{
              fontSize: '0.85rem', fontWeight: 600, color: '#fff',
              background: accentColor, padding: '0.35rem 0.85rem', borderRadius: '8px',
              textDecoration: 'none',
            }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content Rendered in Dynamic Order */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sectionsOrder.map(sectionId => renderSection(sectionId))}

        {/* Footer */}
        <footer style={{
          padding: '2.5rem 1.5rem', textAlign: 'center',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          marginTop: '2rem', opacity: 0.6, fontSize: '0.85rem',
        }}>
          Built with <span style={{ color: accentColor }}>PortBuilder</span> • © {new Date().getFullYear()} {user?.full_name || user?.username}
        </footer>
      </div>
    </div>
  );
}
