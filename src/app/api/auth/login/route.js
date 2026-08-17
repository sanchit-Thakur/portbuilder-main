import { NextResponse } from 'next/server';
import { queryOne, ensureDbInitialized } from '@/lib/db';
import { verifyPassword, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    await ensureDbInitialized();
    const { email, password, identifier: rawIdentifier } = await request.json();
    const identifier = email || rawIdentifier;
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await queryOne('SELECT * FROM users WHERE email = ? OR username = ?', [identifier, identifier]);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await setAuthCookie(user.id, user.email, user.username);

    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
