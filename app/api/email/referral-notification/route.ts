import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { referralId, patientName, referrerName, urgency } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email to staff
    await resend.emails.send({
      from: 'EqualCure <onboarding@resend.dev>',
      to: 'staff@equalcure.com', // Change to your staff email
      subject: `New Patient Referral: ${urgency === 'urgent' ? '[URGENT] ' : ''}${patientName}`,
      html: `
        <h1>New Patient Referral</h1>
        <p><strong>Referral ID:</strong> ${referralId}</p>
        <p><strong>Patient:</strong> ${patientName}</p>
        <p><strong>Referred by:</strong> ${referrerName}</p>
        <p><strong>Urgency:</strong> ${urgency === 'urgent' ? 'URGENT' : 'Routine'}</p>
        <p>Please log in to the staff portal to view the complete referral details.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/staff/referrals/${referralId}">View Referral Details</a></p>
      `,
      reply_to: 'referrals@equalcure.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send referral notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
} 