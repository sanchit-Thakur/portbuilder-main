'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0.75rem 0' : '1rem 0',
      background: scrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
          <span style={{ fontSize: '1.8rem', color: 'var(--color-primary)', filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.25))' }}>⬡</span>
          <span>Port<span className="text-gradient">Builder</span></span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: menuOpen ? 'flex' : '',
          alignItems: 'center', gap: '2rem',
        }} className={menuOpen ? 'mobile-nav-open' : 'desktop-nav'}>
          <a href="#features" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Features</a>
          <a href="#themes" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Themes</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Pricing</a>
          <a href="#feedback" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Feedback</a>
          <Link href="/auth/login" className="btn btn-ghost">Log In</Link>
          <Link href="/auth/signup" className="btn btn-primary">Get Started Free</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}></span>
        </button>
      </div>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ padding: '10rem 0 4rem', position: 'relative', overflow: 'hidden' }} className="bg-gradient-hero">
      {/* Floating Orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(80px)', background: 'rgba(108,99,255,0.15)', top: '-100px', left: '-100px', animation: 'blob 10s ease-in-out infinite, float 8s ease-in-out infinite' }}></div>
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(80px)', background: 'rgba(168,85,247,0.12)', top: '100px', right: '-50px', animation: 'blob 10s ease-in-out infinite, float 8s ease-in-out infinite', animationDelay: '-3s' }}></div>
      <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', filter: 'blur(80px)', background: 'rgba(236,72,153,0.1)', bottom: '-50px', left: '30%', animation: 'blob 10s ease-in-out infinite, float 8s ease-in-out infinite', animationDelay: '-6s' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Badge */}
        <div className="animate-fade-in-down">
          <span className="badge badge-primary" style={{ padding: '0.375rem 1rem', fontSize: '0.85rem' }}>✨ Build your dream portfolio in minutes</span>
        </div>

        {/* Heading */}
        <h1 className="heading-xl animate-fade-in-up" style={{ marginTop: '1.5rem' }}>
          Your Work Deserves a<br />
          <span className="text-gradient">Stunning Portfolio</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-2" style={{
          fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)',
          marginTop: '1.5rem', lineHeight: 1.8, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          Create a professional, live portfolio website with beautiful themes,
          built-in analytics, and resume export. No coding required.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-3" style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap',
        }}>
          <Link href="/auth/signup" className="btn btn-primary btn-lg">
            Start Building — It&apos;s Free
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <a href="#themes" className="btn btn-secondary btn-lg">View Themes</a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-4" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '3rem', marginTop: '4rem', paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary-light)' }}>5</span>
            <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Premium Themes</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'var(--color-border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary-light)' }}>∞</span>
            <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Customizations</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'var(--color-border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-primary-light)' }}>0</span>
            <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Lines of Code</span>
          </div>
        </div>
      </div>

      {/* Preview Mockup */}
      <div className="container animate-fade-in-up delay-5" style={{ marginTop: '4rem' }}>
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(108,99,255,0.1)',
          maxWidth: '900px', margin: '0 auto',
        }}>
          {/* Browser chrome header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0.75rem 1.25rem', background: 'var(--color-bg-tertiary)',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }}></span>
            </div>
            <div style={{
              flex: 1, textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)',
              background: 'var(--color-surface)', padding: '6px 16px', borderRadius: '6px',
            }}>
              portbuilder.com/portfolio/yourname
            </div>
          </div>

          {/* Browser body */}
          <div style={{ padding: '2.5rem' }}>
            {/* Mock hero */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem',
            }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #a855f7)' }}></div>
              <div style={{ width: '60%', height: '20px', background: 'var(--color-surface-hover)', borderRadius: '6px', marginTop: '16px' }}></div>
              <div style={{ width: '80%', height: '12px', background: 'var(--color-surface-hover)', borderRadius: '6px', marginTop: '8px' }}></div>
              <div style={{ width: '160px', height: '36px', background: 'var(--color-primary)', borderRadius: '8px', marginTop: '16px' }}></div>
            </div>
            {/* Mock project cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ height: '120px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-surface-hover), var(--color-bg-tertiary))', border: '1px solid var(--color-border)' }}></div>
              <div style={{ height: '120px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-surface-hover), var(--color-bg-tertiary))', border: '1px solid var(--color-border)' }}></div>
              <div style={{ height: '120px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-surface-hover), var(--color-bg-tertiary))', border: '1px solid var(--color-border)' }}></div>
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
    <section id="features" className="section bg-gradient-mesh">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>Features</span>
          <h2 className="heading-lg">Everything You Need to<br /><span className="text-gradient">Stand Out</span></h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Powerful tools wrapped in a beautiful interface. Build your professional presence in minutes, not days.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem',
        }}>
          {features.map((f, i) => (
            <div key={i} className="card card-hover" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 className="heading-sm">{f.title}</h3>
              <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{f.desc}</p>
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
    <section id="themes" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>Themes</span>
          <h2 className="heading-lg">5 Handcrafted Themes for<br /><span className="text-gradient">Every Creative</span></h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Each theme is carefully designed to showcase your unique style. Pick one and make it yours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }} className="theme-showcase-grid">
          {/* Theme Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {themes.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTheme(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.875rem 1.25rem', borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem', fontWeight: 500, textAlign: 'left', cursor: 'pointer',
                  color: i === activeTheme ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  background: i === activeTheme ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  border: `1px solid ${i === activeTheme ? t.color : 'var(--color-border)'}`,
                  boxShadow: i === activeTheme ? `0 0 20px ${t.color}25` : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.color, flexShrink: 0 }}></span>
                {t.name}
              </button>
            ))}
          </div>

          {/* Theme Preview */}
          <div style={{
            borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            border: '1px solid var(--color-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            background: themes[activeTheme].bg, color: themes[activeTheme].textColor,
            minHeight: '420px', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${themes[activeTheme].color}, ${themes[activeTheme].color}88)`, flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>John Developer</div>
                  <div style={{ opacity: 0.7, fontSize: '15px' }}>Full-Stack Engineer</div>
                </div>
              </div>
              <p style={{ opacity: 0.8, marginBottom: '20px', lineHeight: 1.7 }}>
                {themes[activeTheme].desc}. Passionate about building products that make a difference.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {['React', 'Node.js', 'TypeScript', 'Python'].map(s => (
                  <span key={s} style={{
                    padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500,
                    background: `${themes[activeTheme].color}22`, color: themes[activeTheme].color,
                    border: `1px solid ${themes[activeTheme].color}44`,
                  }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[1, 2].map(n => (
                  <div key={n} style={{
                    padding: '20px', borderRadius: '12px',
                    background: themes[activeTheme].textColor === '#1a1a2e' || themes[activeTheme].textColor === '#1d3557' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: '8px', background: `linear-gradient(135deg, ${themes[activeTheme].color}33, ${themes[activeTheme].color}11)`, marginBottom: '12px' }}></div>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>Project {n}</div>
                    <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>A showcase of great work</div>
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
    { num: '01', title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card needed.' },
    { num: '02', title: 'Fill Your Details', desc: 'Use our guided editor to add your projects, skills, and experience.' },
    { num: '03', title: 'Pick a Theme', desc: 'Choose from 5 premium themes that best represent your style.' },
    { num: '04', title: 'Go Live!', desc: 'Your portfolio is instantly live at a shareable URL. Share it with the world.' },
  ];

  return (
    <section className="section bg-gradient-mesh">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-success" style={{ marginBottom: '1rem', display: 'inline-block' }}>How It Works</span>
          <h2 className="heading-lg">Live in <span className="text-gradient">4 Simple Steps</span></h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800,
                background: 'linear-gradient(135deg, var(--color-primary), #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{s.num}</div>
              <h3 className="heading-sm" style={{ marginTop: '1rem' }}>{s.title}</h3>
              <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{s.desc}</p>
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
          <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pricing</span>
          <h2 className="heading-lg">Start Free, <span className="text-gradient">Upgrade Anytime</span></h2>
          <p style={{ maxWidth: '500px', margin: '1rem auto 0', fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Everything you need to build a professional portfolio. Free forever.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem', maxWidth: '800px', margin: '0 auto',
        }}>
          {/* Free Plan */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Free</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 800, marginTop: '0.5rem' }}>
              $0<span style={{ fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text-muted)' }}>/forever</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0 2rem' }}>
              {['5 Premium themes', 'Live portfolio URL', 'Up to 10 projects', 'Basic analytics', 'Resume export', 'Mobile responsive', 'SEO optimized'].map(f => (
                <li key={f} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>✓ {f}</li>
              ))}
            </ul>
            <Link href="/auth/signup" className="btn btn-secondary btn-lg" style={{ width: '100%', textAlign: 'center' }}>Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div className="card" style={{ padding: '2.5rem', borderColor: 'var(--color-primary)', boxShadow: '0 0 30px rgba(108,99,255,0.25)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--color-primary), #a855f7)',
              color: 'white', padding: '4px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
            }}>Most Popular</div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Pro</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 800, marginTop: '0.5rem' }}>
              $9<span style={{ fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text-muted)' }}>/month</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0 2rem' }}>
              {['Everything in Free', 'Custom domain', 'Unlimited projects', 'Advanced analytics', 'Priority support', 'Remove branding', 'Custom fonts'].map(f => (
                <li key={f} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>✓ {f}</li>
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
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.2) 0%, transparent 70%)' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 className="heading-lg" style={{ color: '#fff' }}>Ready to Build Your<br /><span className="text-gradient">Dream Portfolio?</span></h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '1rem auto 2rem', fontSize: 'var(--text-lg)' }}>
          Join thousands of professionals who&apos;ve elevated their career with PortBuilder.
        </p>
        <Link href="/auth/signup" className="btn btn-primary btn-lg">
          Create Your Portfolio Now
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '4rem 0 2rem', borderTop: '1px solid var(--color-border)' }}>
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
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
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
      
      // Open user mail client directed to sanchitthakur2345@gmail.com
      const mailSubject = encodeURIComponent(`PortBuilder Feedback [${feedbackForm.category}] from ${feedbackForm.name}`);
      const mailBody = encodeURIComponent(`Name: ${feedbackForm.name}\nEmail: ${feedbackForm.email}\nRating: ${feedbackForm.rating}/5\nCategory: ${feedbackForm.category}\n\nMessage:\n${feedbackForm.message}`);
      window.open(`mailto:sanchitthakur2345@gmail.com?subject=${mailSubject}&body=${mailBody}`, '_blank');

      setStatus({
        type: 'success',
        text: 'Thank you! Your feedback was saved & sent directly to sanchitthakur2345@gmail.com!',
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
    <section id="feedback" style={{ padding: '6rem 0', position: 'relative', borderTop: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-primary" style={{ padding: '0.375rem 1rem', fontSize: '0.85rem' }}>💬 Direct Feedback</span>
          <h2 className="heading-lg" style={{ color: '#fff', marginTop: '1rem' }}>Send Feedback Directly</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Share your thoughts, report a bug, or suggest a new feature. Your feedback is sent directly to <strong style={{ color: '#6C63FF' }}>sanchitthakur2345@gmail.com</strong>
          </p>
        </div>

        {status && (
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: status.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            color: status.type === 'success' ? '#34d399' : '#f87171',
            border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}>
            <span>{status.type === 'success' ? '✅' : '❌'}</span>
            <span>{status.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="feedback-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Name</label>
              <input
                type="text"
                required
                value={feedbackForm.name}
                onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                placeholder="Your Name"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Email</label>
              <input
                type="email"
                required
                value={feedbackForm.email}
                onChange={e => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                placeholder="your.email@example.com"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }} className="feedback-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Category</label>
              <select
                value={feedbackForm.category}
                onChange={e => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%236C63FF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                }}
              >
                <option value="General">General Feedback</option>
                <option value="Suggestion">Feature Suggestion</option>
                <option value="Bug">Report a Bug</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.375rem 0' }}>
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
                        transition: 'transform 0.1s, color 0.1s',
                        transform: hoveredStar === index ? 'scale(1.25)' : 'none',
                      }}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Message</label>
            <textarea
              required
              rows={4}
              value={feedbackForm.message}
              onChange={e => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
              placeholder="Tell us what you like or how we can improve PortBuilder..."
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                color: '#fff',
                outline: 'none',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                color: '#fff',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-glow)',
                transition: 'all 0.2s',
                border: 'none',
              }}
            >
              {submitting ? 'Sending...' : 'Send Feedback ✉️'}
            </button>

            <a
              href="mailto:sanchitthakur2345@gmail.com?subject=PortBuilder%20Feedback"
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              ✉️ Email Directly: sanchitthakur2345@gmail.com
            </a>
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
