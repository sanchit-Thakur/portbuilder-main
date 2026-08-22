'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: scrolled ? '12px' : '0', left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0 1.5rem' : '1.25rem 0',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(14, 14, 24, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
        borderRadius: scrolled ? 'var(--radius-full)' : '0',
        padding: scrolled ? '0.65rem 1.75rem' : '0',
        boxShadow: scrolled ? '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
          <span style={{ fontSize: '1.7rem', color: 'var(--color-primary)', filter: 'drop-shadow(0 0 10px rgba(108,99,255,0.5))' }}>⬡</span>
          <span>Port<span className="text-gradient">Builder</span></span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: menuOpen ? 'flex' : '',
          alignItems: 'center', gap: '1.75rem',
        }} className={menuOpen ? 'mobile-nav-open' : 'desktop-nav'}>
          <a href="#features" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Features</a>
          <a href="#themes" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Themes</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Pricing</a>
          <a href="#feedback" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Feedback</a>
          <Link href="/auth/login" className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>Log In</Link>
          <Link href="/auth/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get Started Free</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
        </button>
      </div>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ padding: '11rem 0 5rem', position: 'relative', overflow: 'hidden' }} className="bg-gradient-hero">
      {/* Floating Ambient Glowing Glass Orbs */}
      <div className="glass-orb glass-orb-primary" style={{ width: '550px', height: '550px', top: '-120px', left: '-120px', animation: 'blob 12s ease-in-out infinite, float 8s ease-in-out infinite' }}></div>
      <div className="glass-orb glass-orb-secondary" style={{ width: '450px', height: '450px', top: '80px', right: '-80px', animation: 'blob 14s ease-in-out infinite, float 9s ease-in-out infinite', animationDelay: '-3s' }}></div>
      <div className="glass-orb glass-orb-accent" style={{ width: '400px', height: '400px', bottom: '-80px', left: '25%', animation: 'blob 10s ease-in-out infinite, float 7s ease-in-out infinite', animationDelay: '-6s' }}></div>
      <div className="glass-orb glass-orb-cyan" style={{ width: '300px', height: '300px', top: '40%', right: '20%', animation: 'blob 11s ease-in-out infinite, float 10s ease-in-out infinite', animationDelay: '-4s' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Glass Badge */}
        <div className="animate-fade-in-down">
          <span className="badge badge-primary glass-pill" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', backdropFilter: 'blur(16px)', border: '1px solid rgba(108,99,255,0.4)', boxShadow: '0 0 20px rgba(108,99,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
            ✨ Build & Publish Your Dream Portfolio in Minutes
          </span>
        </div>

        {/* Heading */}
        <h1 className="heading-xl animate-fade-in-up" style={{ marginTop: '1.75rem', letterSpacing: '-0.03em' }}>
          Your Work Deserves a<br />
          <span className="text-gradient">Stunning Glass Portfolio</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-2" style={{
          fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)',
          marginTop: '1.5rem', lineHeight: 1.8, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          Create a modern, live portfolio website with frosted glass themes,
          real-time live editor, built-in analytics, and resume PDF export.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-3" style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.75rem', flexWrap: 'wrap',
        }}>
          <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ boxShadow: 'var(--shadow-lg), 0 0 30px rgba(108,99,255,0.4)' }}>
            Start Building — It&apos;s Free
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <a href="#themes" className="btn btn-secondary btn-lg" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.06)' }}>
            View Live Themes
          </a>
        </div>

        {/* Glass Stats Strip */}
        <div className="animate-fade-in-up delay-4" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem', marginTop: '4rem', padding: '1.25rem 2.5rem',
          background: 'rgba(22, 22, 36, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary-light)' }}>5</span>
            <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Themes</span>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: '#34d399' }}>100%</span>
            <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customizable</span>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: '#ec4899' }}>0</span>
            <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Code Required</span>
          </div>
        </div>
      </div>

      {/* Glass Preview Mockup */}
      <div className="container animate-fade-in-up delay-5" style={{ marginTop: '4.5rem' }}>
        <div style={{
          background: 'rgba(18, 18, 30, 0.7)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          boxShadow: '0 30px 80px -15px rgba(0,0,0,0.7), 0 0 60px rgba(108,99,255,0.18), inset 0 1px 1px rgba(255,255,255,0.25)',
          maxWidth: '920px', margin: '0 auto', position: 'relative',
        }}>
          {/* Top light reflection line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>

          {/* Browser chrome header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0.85rem 1.5rem', background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ display: 'flex', gap: '7px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block', boxShadow: '0 0 6px rgba(255,95,87,0.5)' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e', display: 'inline-block', boxShadow: '0 0 6px rgba(254,188,46,0.5)' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'inline-block', boxShadow: '0 0 6px rgba(40,200,64,0.5)' }}></span>
            </div>
            <div style={{
              flex: 1, textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)',
              background: 'rgba(255, 255, 255, 0.05)', padding: '6px 18px', borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)',
            }}>
              🔒 portbuilder.com/portfolio/alex-rivera
            </div>
          </div>

          {/* Browser body */}
          <div style={{ padding: '2.5rem', background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.12) 0%, transparent 60%)' }}>
            {/* Mock hero */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              paddingBottom: '2.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem',
            }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), #a855f7)',
                boxShadow: '0 0 25px rgba(108,99,255,0.5), inset 0 2px 2px rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
              }}>
                👨‍💻
              </div>
              <div style={{ width: '55%', height: '22px', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', marginTop: '16px' }}></div>
              <div style={{ width: '75%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', marginTop: '10px' }}></div>
              <div style={{
                padding: '8px 24px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                borderRadius: 'var(--radius-md)', marginTop: '18px', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                boxShadow: '0 0 20px rgba(108,99,255,0.4)',
              }}>
                Explore Projects →
              </div>
            </div>
            {/* Mock project cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  padding: '1.25rem', borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}>
                  <div style={{ height: '70px', borderRadius: '8px', background: `linear-gradient(135deg, rgba(108,99,255,${0.15 + i * 0.05}), rgba(168,85,247,0.1))`, marginBottom: '10px' }}></div>
                  <div style={{ width: '70%', height: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }}></div>
                  <div style={{ width: '45%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginTop: '6px' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ────────────────────────────────────────────── */
const features = [
  { icon: '🎨', title: '5 Premium Themes', desc: 'From minimal elegance to bold creative studios. Each theme is handcrafted and fully responsive.' },
  { icon: '⚡', title: 'Live Portfolio URL', desc: 'Get a shareable link instantly. Your portfolio goes live the moment you hit publish.' },
  { icon: '📊', title: 'Built-in Analytics', desc: 'Track visitors, page views, and popular projects with a beautiful analytics dashboard.' },
  { icon: '📝', title: 'Guided Editor', desc: 'No drag-and-drop confusion. Fill in forms, see your portfolio update in real-time.' },
  { icon: '📄', title: 'Resume PDF Export', desc: 'Generate an ATS-friendly resume from your portfolio data. One click to download.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your data is protected with industry-standard encryption. You own your content.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Every theme is designed mobile-first. Looks stunning on any device, any screen size.' },
  { icon: '🚀', title: 'SEO Optimized', desc: 'Built-in meta tags, Open Graph cards, and semantic HTML for maximum discoverability.' },
  { icon: '🎯', title: 'Section Control', desc: 'Hero, About, Skills, Projects, Experience, Education, Testimonials, Contact — reorder as you wish.' },
];

function Features() {
  return (
    <section id="features" className="section bg-gradient-mesh" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-primary glass-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>✨ Features</span>
          <h2 className="heading-lg">Everything You Need to<br /><span className="text-gradient">Stand Out</span></h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Powerful tools wrapped in a beautiful frosted glass interface. Build your professional presence in minutes.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem',
        }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '2.25rem 2rem' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', marginBottom: '1.25rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}>
                {f.icon}
              </div>
              <h3 className="heading-sm">{f.title}</h3>
              <p style={{ marginTop: '0.6rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── THEME SHOWCASE ──────────────────────────────────────── */
const themes = [
  { name: 'Minimal Elegance', desc: 'Clean serif typography with luxurious white space', color: '#e94560', bg: '#fff5f7', textColor: '#1a1a2e' },
  { name: 'Developer Dark', desc: 'Terminal-inspired with monospace and neon accents', color: '#00d4aa', bg: '#0d1117', textColor: '#e6edf3' },
  { name: 'Creative Studio', desc: 'Bold, vibrant colors with asymmetric layouts', color: '#ff6b35', bg: '#1a1a2e', textColor: '#edf2f4' },
  { name: 'Corporate Professional', desc: 'Structured and business-ready clean design', color: '#3a86ff', bg: '#f0f4f8', textColor: '#1d3557' },
  { name: 'Glassmorphism Modern', desc: 'Frosted glass cards with gradient backgrounds', color: '#667eea', bg: '#0c0c1d', textColor: '#f0f0f0' },
];

function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState(0);

  return (
    <section id="themes" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-primary glass-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>🎨 Themes</span>
          <h2 className="heading-lg">5 Handcrafted Themes for<br /><span className="text-gradient">Every Creative</span></h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Each theme is carefully designed with frosted glass accents to showcase your unique style.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }} className="theme-showcase-grid">
          {/* Theme Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {themes.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTheme(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  fontSize: '0.92rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer',
                  color: i === activeTheme ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  background: i === activeTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${i === activeTheme ? t.color : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: i === activeTheme ? `0 10px 25px -5px ${t.color}35, inset 0 1px 0 rgba(255,255,255,0.2)` : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  transform: i === activeTheme ? 'translateX(4px)' : 'none',
                }}
              >
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color, flexShrink: 0, boxShadow: `0 0 10px ${t.color}` }}></span>
                {t.name}
              </button>
            ))}
          </div>

          {/* Theme Preview */}
          <div style={{
            borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 70px -15px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)',
            background: themes[activeTheme].bg, color: themes[activeTheme].textColor,
            minHeight: '440px', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
          }}>
            <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${themes[activeTheme].color}, ${themes[activeTheme].color}88)`, flexShrink: 0, boxShadow: `0 0 20px ${themes[activeTheme].color}50` }}></div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Alex Rivera</div>
                  <div style={{ opacity: 0.75, fontSize: '15px' }}>Senior Full-Stack & UI Engineer</div>
                </div>
              </div>
              <p style={{ opacity: 0.85, marginBottom: '20px', lineHeight: 1.7 }}>
                {themes[activeTheme].desc}. Passionate about building products that make a difference.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'UI Design'].map(s => (
                  <span key={s} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                    background: `${themes[activeTheme].color}22`, color: themes[activeTheme].color,
                    border: `1px solid ${themes[activeTheme].color}44`,
                    backdropFilter: 'blur(8px)',
                  }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[1, 2].map(n => (
                  <div key={n} style={{
                    padding: '20px', borderRadius: '14px',
                    background: themes[activeTheme].textColor === '#1a1a2e' || themes[activeTheme].textColor === '#1d3557' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: '8px', background: `linear-gradient(135deg, ${themes[activeTheme].color}33, ${themes[activeTheme].color}11)`, marginBottom: '12px' }}></div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>Project {n}</div>
                    <div style={{ fontSize: '12px', opacity: 0.65, marginTop: '4px' }}>A showcase of full-stack engineering</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Sign Up Free', desc: 'Create your account in seconds with zero credit card required.' },
    { num: '02', title: 'Fill Your Details', desc: 'Use our guided live editor to add projects, skills, and work experience.' },
    { num: '03', title: 'Pick a Theme', desc: 'Choose from 5 premium themes that best represent your aesthetic.' },
    { num: '04', title: 'Go Live!', desc: 'Your portfolio is instantly live at your custom shareable URL.' },
  ];

  return (
    <section className="section bg-gradient-mesh" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-success glass-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>⚡ Quick Start</span>
          <h2 className="heading-lg">Live in <span className="text-gradient">4 Simple Steps</span></h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem',
        }}>
          {steps.map((s, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.75rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800,
                background: 'linear-gradient(135deg, var(--color-primary-light), #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{s.num}</div>
              <h3 className="heading-sm" style={{ marginTop: '1.25rem' }}>{s.title}</h3>
              <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ─────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-primary glass-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>💳 Pricing</span>
          <h2 className="heading-lg">Start Free, <span className="text-gradient">Upgrade Anytime</span></h2>
          <p style={{ maxWidth: '500px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Everything you need to build a professional portfolio. Free forever.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem', maxWidth: '820px', margin: '0 auto',
        }}>
          {/* Free Plan */}
          <div className="glass-card" style={{ padding: '2.75rem' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Free</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 800, marginTop: '0.5rem' }}>
              $0<span style={{ fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text-muted)' }}>/forever</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', margin: '1.75rem 0 2.25rem' }}>
              {['5 Premium themes', 'Live portfolio URL', 'Up to 10 projects', 'Basic analytics', 'Resume export', 'Mobile responsive', 'SEO optimized'].map(f => (
                <li key={f} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup" className="btn btn-secondary btn-lg" style={{ width: '100%', textAlign: 'center' }}>Get Started Free</Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-panel" style={{
            padding: '2.75rem',
            border: '1px solid rgba(108, 99, 255, 0.45)',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6), 0 0 40px rgba(108,99,255,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--color-primary), #a855f7)',
              color: 'white', padding: '4px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
              boxShadow: '0 0 15px rgba(108,99,255,0.5)',
            }}>Most Popular</div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Pro</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 800, marginTop: '0.5rem' }}>
              $9<span style={{ fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text-muted)' }}>/month</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', margin: '1.75rem 0 2.25rem' }}>
              {['Everything in Free', 'Custom domain', 'Unlimited projects', 'Advanced analytics', 'Priority support', 'Remove branding', 'Custom fonts'].map(f => (
                <li key={f} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-primary-light)', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ width: '100%', textAlign: 'center' }}>Start Free Trial</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA SECTION ─────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="glass-panel" style={{
          padding: '4rem 2rem', textAlign: 'center',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(108,99,255,0.2) 0%, rgba(18,18,30,0.85) 80%)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <h2 className="heading-lg" style={{ color: '#fff' }}>Ready to Build Your<br /><span className="text-gradient">Dream Portfolio?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '1rem auto 2.25rem', fontSize: 'var(--text-lg)' }}>
            Join thousands of professionals who&apos;ve elevated their career with PortBuilder.
          </p>
          <Link href="/auth/signup" className="btn btn-primary btn-lg" style={{ boxShadow: 'var(--shadow-glow)' }}>
            Create Your Portfolio Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '4rem 0 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(10, 10, 16, 0.8)', backdropFilter: 'blur(20px)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }} className="footer-grid-layout">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              <span style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }}>⬡</span>
              <span>Port<span className="text-gradient">Builder</span></span>
            </div>
            <p style={{ marginTop: '1rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
              Build professional portfolios in minutes. Showcase your work with style.
            </p>
          </div>
          {[
            { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Themes', href: '#themes' }, { label: 'Pricing', href: '#pricing' }] },
            { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Support', href: '#' }] },
            { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
          ].map(col => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{col.title}</h4>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} PortBuilder. Built with ❤️ for creatives everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── PLATFORM FEEDBACK ───────────────────────────────────── */
function PlatformFeedback() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    category: 'General',
    rating: 5,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackForm),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit feedback');
      
      setStatus({
        type: 'success',
        text: 'Thank you! Your feedback has been sent successfully.',
      });
      setFeedbackForm({
        name: '',
        email: '',
        category: 'General',
        rating: 5,
        message: '',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-primary glass-pill" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}>💬 Feedback</span>
          <h2 className="heading-lg" style={{ color: '#fff', marginTop: '1rem' }}>Send Feedback</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Share your thoughts, report a bug, or suggest a new feature. We value your feedback!
          </p>
        </div>

        {status && (
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: status.type === 'success' ? '#34d399' : '#f87171',
            border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            backdropFilter: 'blur(10px)',
          }}>
            <span>{status.type === 'success' ? '✅' : '❌'}</span>
            <span>{status.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          padding: '2.75rem',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="feedback-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Name</label>
              <input
                type="text"
                required
                value={feedbackForm.name}
                onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                placeholder="Your Name"
                className="form-input"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Email</label>
              <input
                type="email"
                required
                value={feedbackForm.email}
                onChange={e => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                placeholder="your.email@example.com"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }} className="feedback-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Category</label>
              <select
                value={feedbackForm.category}
                onChange={e => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                className="form-input"
                style={{
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%236C63FF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                }}
              >
                <option value="General" style={{ background: '#12121a' }}>General Feedback</option>
                <option value="Suggestion" style={{ background: '#12121a' }}>Feature Suggestion</option>
                <option value="Bug" style={{ background: '#12121a' }}>Report a Bug</option>
                <option value="Other" style={{ background: '#12121a' }}>Other</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem 0' }}>
                {[1, 2, 3, 4, 5].map((index) => {
                  const isActive = index <= (hoveredStar || feedbackForm.rating);
                  return (
                    <button
                      key={index}
                      type="button"
                      onMouseEnter={() => setHoveredStar(index)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: index })}
                      style={{
                        fontSize: '1.75rem',
                        color: isActive ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.15)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1,
                        transition: 'transform 0.15s, color 0.15s',
                        transform: hoveredStar === index ? 'scale(1.25)' : 'none',
                        filter: isActive ? 'drop-shadow(0 0 6px rgba(108,99,255,0.6))' : 'none',
                      }}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Message</label>
            <textarea
              required
              rows={4}
              value={feedbackForm.message}
              onChange={e => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
              placeholder="Tell us what you like or how we can improve PortBuilder..."
              className="form-input"
              style={{ minHeight: '110px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                opacity: submitting ? 0.7 : 1,
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              {submitting ? 'Sending...' : 'Send Feedback ✉️'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ── LANDING PAGE ────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ThemeShowcase />
        <HowItWorks />
        <Pricing />
        <CTA />
        <PlatformFeedback />
      </main>
      <Footer />

      {/* Global responsive overrides */}
      <style jsx global>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .mobile-nav-open {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10,10,15,0.97);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          z-index: 999;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .theme-showcase-grid { grid-template-columns: 1fr !important; }
          .footer-grid-layout { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </>
  );
}
