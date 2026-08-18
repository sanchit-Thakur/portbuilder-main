import { NextResponse } from 'next/server';
import { query, queryOne, ensureDbInitialized } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateId, validateEmail } from '@/lib/utils';
import nodemailer from 'nodemailer';

// Helper to check if a user is admin
function isAdmin(user) {
  if (!user) return false;
  const adminEmails = ['sanchitthakur2345@gmail.com', 'sanchitt@gmail.com', 'sanchit@gmail.com'];
  const adminUsernames = ['san123'];
  return adminEmails.includes(user.email) || adminUsernames.includes(user.username);
}

// Send real email notification to sanchitthakur2345@gmail.com via Nodemailer SMTP
async function sendEmailNotification({ name, email, category, rating, message }) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const targetEmail = process.env.TARGET_EMAIL || 'sanchitthakur2345@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.log(`\n[FEEDBACK EMAIL DISPATCH] To: ${targetEmail}`);
    console.log(`From: ${name} (${email})`);
    console.log(`Category: ${category} | Rating: ${rating}/5`);
    console.log(`Message: ${message}`);
    console.log(`Note: To send actual SMTP emails to your Gmail inbox, add SMTP_USER & SMTP_PASS to .env.local\n`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"PortBuilder Feedback" <${smtpUser}>`,
      to: targetEmail,
      replyTo: email,
      subject: `[PortBuilder Feedback] ${category} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #6C63FF; margin-top: 0;">💬 New PortBuilder Feedback</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Rating:</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Feedback Message:</strong></p>
          <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #6C63FF; border-radius: 4px; font-size: 15px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    });
    console.log(`[FEEDBACK EMAIL SENT SUCCESSFULLY] Email delivered to ${targetEmail}`);
  } catch (err) {
    console.error('[FEEDBACK EMAIL FAILED]', err.message);
  }
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

// POST: Public submission of platform feedback
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

    // Send Real Email Notification via Nodemailer
    sendEmailNotification({
      name: name.trim(),
      email: email.trim(),
      category: category || 'General',
      rating: parsedRating,
      message: message.trim(),
    }).catch(err => console.error('Background email error:', err));

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
