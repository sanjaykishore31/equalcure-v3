import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAppointmentEmailTemplate } from '@/lib/email/templates/appointment';
import type { AppointmentEmailData } from '@/lib/email/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, data } = await request.json() as {
      email: string;
      data: AppointmentEmailData;
    };

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const { subject, html } = getAppointmentEmailTemplate(data);
    
    await resend.emails.send({
      from: 'appointments@cure-telehealth.com',
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}