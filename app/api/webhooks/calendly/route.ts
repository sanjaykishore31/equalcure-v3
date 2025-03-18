import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createZoomMeeting } from '@/lib/zoom/server';
import { sendAppointmentEmail } from '@/lib/email/server';
import { verifyCalendlySignature } from '@/lib/calendly/verify-signature';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('Calendly-Webhook-Signature');
    const body = await request.text();

    // In production, uncomment this to verify signatures
    // if (!signature || !verifyCalendlySignature(signature, body, process.env.CALENDLY_WEBHOOK_SECRET!)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const event = JSON.parse(body);
    
    // Only handle invitee.created events
    if (event.event !== 'invitee.created') {
      return NextResponse.json({ message: 'Event ignored' });
    }

    const { 
      event_type: { name: eventType },
      invitee: { name, email },
      event: { start_time, end_time }
    } = event.payload;

    // Create Zoom meeting
    const meeting = await createZoomMeeting({
      startTime: start_time,
      topic: `Telehealth Consultation with ${name}`,
      duration: Math.round((new Date(end_time).getTime() - new Date(start_time).getTime()) / 60000)
    });

    const supabase = createRouteHandlerClient({ cookies });

    // Create appointment record
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        date: start_time,
        patient_name: name,
        patient_email: email,
        type: eventType,
        status: 'scheduled',
        zoom_meeting_id: meeting.id,
        zoom_password: meeting.password,
        zoom_join_url: meeting.join_url
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Send confirmation email
    await sendAppointmentEmail(email, {
      date: start_time,
      zoomUrl: meeting.join_url,
      zoomMeetingId: meeting.id,
      zoomPassword: meeting.password
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Calendly webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}