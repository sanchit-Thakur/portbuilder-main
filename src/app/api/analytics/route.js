import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized, getEngine } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateId } from '@/lib/utils';

// GET — Retrieve analytics stats for dashboard
export async function GET() {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolio = await queryOne('SELECT id FROM portfolios WHERE user_id = ?', [user.id]);
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const engine = await getEngine();

    // Total views
    const totalResult = await queryOne(
      'SELECT COUNT(*) as total FROM analytics WHERE portfolio_id = ?',
      [portfolio.id]
    );

    // Unique visitors (approximate by IP)
    const uniqueResult = await queryOne(
      'SELECT COUNT(DISTINCT ip_address) as total FROM analytics WHERE portfolio_id = ?',
      [portfolio.id]
    );

    // Top referrers
    const referrers = await query(
      `SELECT referrer, COUNT(*) as count FROM analytics
       WHERE portfolio_id = ? AND referrer != '' AND referrer IS NOT NULL
       GROUP BY referrer ORDER BY count DESC LIMIT 5`,
      [portfolio.id]
    );

    // Cross-engine date aggregation
    let dailyViews = [];
    let todayViewsCount = 0;

    if (engine === 'mysql') {
      dailyViews = await query(
        `SELECT DATE(visited_at) as date, COUNT(*) as views
         FROM analytics WHERE portfolio_id = ? AND visited_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         GROUP BY DATE(visited_at) ORDER BY date`,
        [portfolio.id]
      );
      const todayResult = await queryOne(
        `SELECT COUNT(*) as total FROM analytics WHERE portfolio_id = ? AND DATE(visited_at) = CURDATE()`,
        [portfolio.id]
      );
      todayViewsCount = todayResult?.total || 0;
    } else {
      // SQLite date handling
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const isoSevenDays = sevenDaysAgo.toISOString();

      const rawRows = await query(
        `SELECT visited_at FROM analytics WHERE portfolio_id = ? AND visited_at >= ?`,
        [portfolio.id, isoSevenDays]
      );

      const todayStr = new Date().toISOString().split('T')[0];
      const dateCounts = {};

      (rawRows || []).forEach(row => {
        const dStr = new Date(row.visited_at).toISOString().split('T')[0];
        dateCounts[dStr] = (dateCounts[dStr] || 0) + 1;
        if (dStr === todayStr) {
          todayViewsCount++;
        }
      });

      dailyViews = Object.keys(dateCounts).sort().map(d => ({
        date: d,
        views: dateCounts[d],
      }));
    }

    return NextResponse.json({
      totalViews: totalResult?.total || 0,
      uniqueVisitors: uniqueResult?.total || 0,
      todayViews: todayViewsCount,
      dailyViews: dailyViews || [],
      topReferrers: referrers || [],
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST — Track a page view (called from the public portfolio page)
export async function POST(request) {
  try {
    await ensureDbInitialized();
    const { username, referrer, userAgent } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const user = await queryOne('SELECT id FROM users WHERE username = ?', [username]);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const portfolio = await queryOne('SELECT id FROM portfolios WHERE user_id = ?', [user.id]);
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    await query(
      'INSERT INTO analytics (id, portfolio_id, referrer, user_agent, ip_address) VALUES (?, ?, ?, ?, ?)',
      [generateId(), portfolio.id, referrer || '', userAgent || '', ip]
    );

    return NextResponse.json({ message: 'View tracked' });
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
