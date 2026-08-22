import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { query, queryOne } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me';
const TOKEN_NAME = 'pb_token';
const TOKEN_EXPIRY = '7d';

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function setAuthCookie(userId, email, username) {
  const token = signToken({ userId, email, username });
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return token;
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) {
      try { cookieStore.delete(TOKEN_NAME); } catch {}
      return null;
    }

    const user = await queryOne(
      'SELECT id, email, username, full_name, created_at FROM users WHERE id = ?',
      [decoded.userId]
    );
    if (!user) {
      try { cookieStore.delete(TOKEN_NAME); } catch {}
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
