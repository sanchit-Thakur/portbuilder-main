import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { THEMES } from '@/lib/constants';
import PortfolioClient from './PortfolioClient';

export async function generateMetadata({ params }) {
  const { username } = await params;
  try {
    await ensureDbInitialized();
    const user = await queryOne('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) return { title: 'Portfolio Not Found' };

    const portfolio = await queryOne('SELECT * FROM portfolios WHERE user_id = ?', [user.id]);
    const theme = THEMES[portfolio?.theme] || THEMES['minimal-elegance'];

    return {
      title: `${user.full_name || user.username} — Portfolio`,
      description: portfolio?.bio || portfolio?.tagline || `${user.full_name || user.username}'s professional portfolio`,
      openGraph: {
        title: `${user.full_name || user.username} — Portfolio`,
        description: portfolio?.bio || portfolio?.tagline || 'Professional portfolio',
        type: 'website',
      },
      themeColor: theme.colors.accent,
    };
  } catch {
    return { title: 'Portfolio' };
  }
}

export default async function PortfolioPage({ params }) {
  const { username } = await params;
  try {
    await ensureDbInitialized();
    const user = await queryOne(
      'SELECT id, email, username, full_name FROM users WHERE username = ?',
      [username]
    );

    if (!user) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0f', color: '#f0f0f5', fontFamily: "'Inter', sans-serif",
          flexDirection: 'column', gap: '1rem',
        }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, opacity: 0.2 }}>404</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.6 }}>Portfolio not found</p>
          <a href="/" style={{
            padding: '0.75rem 2rem', borderRadius: '10px',
            background: '#6C63FF', color: '#fff', fontWeight: 600,
            marginTop: '1rem', display: 'inline-block',
          }}>Go Home</a>
        </div>
      );
    }

    const portfolio = await queryOne('SELECT * FROM portfolios WHERE user_id = ?', [user.id]);

    if (!portfolio) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0f', color: '#f0f0f5', fontFamily: "'Inter', sans-serif",
        }}>
          <p>This user hasn&apos;t set up their portfolio yet.</p>
        </div>
      );
    }

    // Parse JSON fields
    if (portfolio.sections_order && typeof portfolio.sections_order === 'string') {
      try { portfolio.sections_order = JSON.parse(portfolio.sections_order); } catch { portfolio.sections_order = null; }
    }

    const skills = await query('SELECT * FROM skills WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const projects = await query('SELECT * FROM projects WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const experiences = await query('SELECT * FROM experiences WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const educationData = await query('SELECT * FROM education WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);
    const testimonials = await query('SELECT * FROM testimonials WHERE portfolio_id = ? ORDER BY sort_order', [portfolio.id]);

    // Parse tech_stack JSON
    projects.forEach(p => {
      if (p.tech_stack && typeof p.tech_stack === 'string') {
        try { p.tech_stack = JSON.parse(p.tech_stack); } catch { p.tech_stack = []; }
      }
    });

    const data = {
      portfolio,
      skills,
      projects,
      experiences,
      education: educationData,
      testimonials,
      user,
    };

    return <PortfolioClient data={data} username={username} />;
  } catch (error) {
    console.error('Portfolio page error:', error);
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0f', color: '#f0f0f5', fontFamily: "'Inter', sans-serif",
      }}>
        <p>Something went wrong loading this portfolio.</p>
      </div>
    );
  }
}
