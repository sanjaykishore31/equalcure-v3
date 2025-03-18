import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, appointmentDate, zoomLink } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('Sending email to:', to);
    console.log('Appointment date:', appointmentDate);
    
    const result = await resend.emails.send({
      from: 'EqualCure <onboarding@resend.dev>',
      to,
      subject: 'Your Video Consultation Appointment',
      html: `
        <h1>Your Video Consultation Appointment</h1>
        <p>Thank you for scheduling your video consultation with EqualCure.</p>
        <h2>Appointment Details</h2>
        <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(appointmentDate).toLocaleTimeString()}</p>
        <p><strong>Zoom Link:</strong> <a href="${zoomLink}">${zoomLink}</a></p>
        <p>Please join the meeting at the scheduled time by clicking the Zoom link above.</p>
        <p>If you need to reschedule or have any questions, please contact our support team at support@equalcure.com.</p>
        <p>Best regards,<br>The EqualCure Team</p>
      `,
      reply_to: 'support@equalcure.com',
    });

    console.log('Email sent:', result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}