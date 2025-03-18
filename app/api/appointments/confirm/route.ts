import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateCalendarEvent } from '@/lib/calendar/ics';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, date } = await request.json();

    // Generate calendar event
    const event = generateCalendarEvent({
      date,
      topic: 'Telehealth Consultation',
    });

    // Send confirmation email
    await resend.emails.send({
      from: 'appointments@cure-telehealth.com',
      to: email,
      subject: 'Your Telehealth Appointment Confirmation',
      html: `
        <h1>Your Appointment is Confirmed</h1>
        <p>Your telehealth consultation has been scheduled for:</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(date).toLocaleTimeString()}</p>
        <p>You will receive a separate email with the video consultation link before your appointment.</p>
      `,
      attachments: [
        {
          filename: 'appointment.ics',
          content: event.value,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in confirm route:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation' },
      { status: 500 }
    );
  }
}