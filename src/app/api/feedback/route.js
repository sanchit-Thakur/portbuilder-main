import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateId, validateEmail } from '@/lib/utils';

// Helper to check if a user is admin
function isAdmin(user) {
  if (!user) return false;
  const adminEmails = ['sanchitthakur2345@gmail.com', 'sanchitt@gmail.com', 'sanchit@gmail.com'];
  const adminUsernames = ['san123'];
  return adminEmails.includes(user.email) || adminUsernames.includes(user.username);
}

// GET: Fetch all platform feedback (admin only)
export async function GET(request) {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse query params for filtering
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const rating = searchParams.get('rating');

    let sql = 'SELECT * FROM feedbacks';
    const params = [];

    const conditions = [];
    if (category && category !== 'All') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (rating && rating !== 'All') {
      conditions.push('rating = ?');
      params.push(parseInt(rating));
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const feedbacks = await query(sql, params);
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Get feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Public submission of platform feedback (called by visitors on the landing page)
export async function POST(request) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const { name, email, category, rating, message } = body;

    // Validation
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const feedbackId = generateId();
    await query(
      `INSERT INTO feedbacks (id, name, email, category, rating, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [feedbackId, name.trim(), email.trim(), category || 'General', parsedRating, message.trim()]
    );

    return NextResponse.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Post feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Delete a specific feedback (admin only)
export async function DELETE(request) {
  try {
    await ensureDbInitialized();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 });
    }

    // Verify feedback exists
    const feedback = await queryOne('SELECT id FROM feedbacks WHERE id = ?', [id]);
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    await query('DELETE FROM feedbacks WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Delete feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
