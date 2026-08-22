import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser, removeAuthCookie, verifyPassword } from '@/lib/auth';

export async function DELETE(request) {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optional confirmation password check if provided
    let body = null;
    try {
      const text = await request.text();
      if (text) body = JSON.parse(text);
    } catch {}

    if (body?.password) {
      const fullUser = await queryOne('SELECT password_hash FROM users WHERE id = ?', [user.id]);
      if (fullUser) {
        const isValid = await verifyPassword(body.password, fullUser.password_hash);
        if (!isValid) {
          return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
        }
      }
    }

    // Clean up all related child entities explicitly for MySQL & SQLite
    const portfolio = await queryOne('SELECT id FROM portfolios WHERE user_id = ?', [user.id]);
    if (portfolio) {
      await query('DELETE FROM skills WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM projects WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM experiences WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM education WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM testimonials WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM analytics WHERE portfolio_id = ?', [portfolio.id]);
      await query('DELETE FROM portfolios WHERE id = ?', [portfolio.id]);
    }

    // Delete user
    await query('DELETE FROM users WHERE id = ?', [user.id]);

    // Clear session cookie
    await removeAuthCookie();

    return NextResponse.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
