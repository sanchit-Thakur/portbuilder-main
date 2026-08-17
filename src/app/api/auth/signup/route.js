import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { hashPassword, setAuthCookie } from '@/lib/auth';
import { generateId, validateEmail, validateUsername } from '@/lib/utils';
import { DEFAULT_SECTIONS_ORDER } from '@/lib/constants';

export async function POST(request) {
  try {
    await ensureDbInitialized();
    let finalUsername = username ? username.trim() : '';
    if (!finalUsername && email) {
      const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_-]/g, '');
      finalUsername = emailPrefix.length >= 3 ? emailPrefix : `${emailPrefix}${Math.floor(100 + Math.random() * 900)}`;
    }

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    if (!validateUsername(finalUsername)) {
      return NextResponse.json(
        { error: 'Username must be 3-30 characters, letters, numbers, hyphens, underscores only' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingEmail = await queryOne('SELECT id FROM users WHERE email = ?', [email]);
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const existingUsername = await queryOne('SELECT id FROM users WHERE username = ?', [finalUsername]);
    if (existingUsername) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // Create user
    const userId = generateId();
    const passwordHash = await hashPassword(password);
    await query(
      'INSERT INTO users (id, email, password_hash, username, full_name) VALUES (?, ?, ?, ?, ?)',
      [userId, email, passwordHash, finalUsername, fullName || '']
    );

    // Create default portfolio
    const portfolioId = generateId();
    await query(
      `INSERT INTO portfolios (id, user_id, hero_title, sections_order) VALUES (?, ?, ?, ?)`,
      [portfolioId, userId, fullName || finalUsername, JSON.stringify(DEFAULT_SECTIONS_ORDER)]
    );

    // Set auth cookie
    await setAuthCookie(userId, email, finalUsername);

    return NextResponse.json(
      { message: 'Account created successfully', user: { id: userId, email, username: finalUsername } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
