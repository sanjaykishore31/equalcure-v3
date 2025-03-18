import { createZoomMeeting } from '@/lib/zoom/create-meeting';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import type { AppointmentData } from '@/types/zoom';

export async function createAppointment(appointmentData: AppointmentData) {
  try {
    // Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(
      `Medical Consultation - ${appointmentData.patientName}`,
      appointmentData.startTime,
      60 // Duration in minutes
    );

    // Create appointment in Supabase
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        patient_id: appointmentData.patientId,
        staff_id: appointmentData.staffId || null,
        date: appointmentData.startTime,
        type: appointmentData.type,
        status: appointmentData.status || 'scheduled',
        notes: appointmentData.notes,
        zoom_meeting_id: zoomMeeting.id,
        zoom_join_url: zoomMeeting.join_url
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create appointment: ${error.message}`);
    }

    // Send email notification
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'appointments@yourdomain.com', // Update with your verified domain
      to: appointmentData.patientEmail,
      subject: 'Your Video Consultation Appointment',
      html: `
        <h1>Your appointment has been scheduled</h1>
        <p>Date: ${new Date(appointmentData.startTime).toLocaleDateString()}</p>
        <p>Time: ${new Date(appointmentData.startTime).toLocaleTimeString()}</p>
        <p>Join URL: <a href="${zoomMeeting.join_url}">${zoomMeeting.join_url}</a></p>
      `,
    });

    return appointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}