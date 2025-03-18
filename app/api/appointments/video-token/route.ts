import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { generateSignature } from '@/lib/zoom/sdk';

export async function POST(request: Request) {
  try {
    const { appointmentId } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    // Get appointment details
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('zoom_meeting_id, zoom_password')
      .eq('id', appointmentId)
      .single();

    if (error || !appointment) {
      throw new Error('Appointment not found');
    }

    // Generate Zoom signature
    const signature = await generateSignature(appointment.zoom_meeting_id);

    return NextResponse.json({
      signature,
      meetingNumber: appointment.zoom_meeting_id,
      password: appointment.zoom_password,
    });
  } catch (error) {
    console.error('Error generating video token:', error);
    return NextResponse.json(
      { error: 'Failed to generate video token' },
      { status: 500 }
    );
  }
}