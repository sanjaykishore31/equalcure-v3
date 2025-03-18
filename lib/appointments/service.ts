import { createZoomMeeting } from '@/lib/zoom/create-meeting';
import { createAppointmentRecord } from './repository';
import type { AppointmentData } from '@/types/zoom';

export async function scheduleAppointment(appointmentData: AppointmentData) {
  try {
    // Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(
      `Medical Consultation - ${appointmentData.patientName}`,
      appointmentData.startTime,
      60
    );

    // Add Zoom details to appointment data
    const appointmentWithZoom = {
      ...appointmentData,
      zoomMeetingId: zoomMeeting.id,
      zoomJoinUrl: zoomMeeting.join_url
    };

    // Create appointment record
    const appointment = await createAppointmentRecord(appointmentWithZoom);

    // Send confirmation email via API route
    const emailResponse = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: appointmentData.patientEmail,
        appointmentDate: appointmentData.startTime,
        zoomLink: zoomMeeting.join_url
      }),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send confirmation email');
    }

    return appointment;
  } catch (error) {
    console.error('Error in scheduleAppointment:', error);
    throw error;
  }
}