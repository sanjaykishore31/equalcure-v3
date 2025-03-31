import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    await resend.emails.send({
      from: 'EqualCure <scheduling@equalcure.org>',
      to: ['sanjay@equalcure.org'], // Add all recipient emails
      subject: `New Meeting Request: ${data.name} from ${data.organization}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e293b;">New Meeting Request</h1>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <h2 style="color: #334155;">Meeting Details</h2>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time} ET</p>
            
            <h2 style="color: #334155; margin-top: 20px;">Contact Information</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Organization:</strong> ${data.organization}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Meeting scheduled successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
} 