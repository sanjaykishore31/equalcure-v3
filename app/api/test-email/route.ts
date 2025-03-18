import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    console.log('Testing Resend configuration...');
    console.log('API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    const result = await resend.emails.send({
      from: 'EqualCure <onboarding@resend.dev>',
      to: 'test@resend.dev',
      subject: 'Test Email',
      html: '<p>This is a test email to verify the EqualCure email configuration.</p>',
      reply_to: 'support@equalcure.com'
    });

    console.log('Test email result:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Test email failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send test email',
      },
      { status: 500 }
    );
  }
} 