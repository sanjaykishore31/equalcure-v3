import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createZoomMeeting } from '@/lib/zoom/create-meeting';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, startTime, type } = await request.json();

    // Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(
      'Video Consultation',
      startTime,
      30 // 30-minute consultation
    );

    // Send email with Zoom link
    await resend.emails.send({
      from: 'appointments@yourdomain.com',
      to: email,
      subject: 'Your Video Consultation Appointment',
      html: `
        <h1>Your appointment has been scheduled!</h1>
        <p>Date: ${new Date(startTime).toLocaleDateString()}</p>
        <p>Time: ${new Date(startTime).toLocaleTimeString()}</p>
        <p>Join URL: <a href="${zoomMeeting.join_url}">${zoomMeeting.join_url}</a></p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment scheduled successfully'
    });

  } catch (error) {
    console.error('Scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule appointment' },
      { status: 500 }
    );
  }
} 