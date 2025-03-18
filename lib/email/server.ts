import { Resend } from 'resend';
import type { AppointmentDetails } from '../types/appointment';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentEmail(email: string, appointment: AppointmentDetails) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - skipping email send');
    return;
  }

  try {
    await resend.emails.send({
      from: 'appointments@cure-telehealth.com',
      to: email,
      subject: 'Your Telehealth Appointment Confirmation',
      html: getAppointmentEmailHtml(appointment),
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    // Don't throw - we don't want to fail the appointment creation if email fails
  }
}

function getAppointmentEmailHtml(appointment: AppointmentDetails): string {
  const date = new Date(appointment.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const time = new Date(appointment.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  return `
    <h1>Your Appointment is Confirmed</h1>
    <p>Your telehealth consultation has been scheduled for:</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Duration:</strong> 30 minutes</p>
    <p>Join your appointment using this link:</p>
    <p><a href="${appointment.zoomUrl}">${appointment.zoomUrl}</a></p>
    <p>Meeting ID: ${appointment.zoomMeetingId}</p>
    <p>Password: ${appointment.zoomPassword}</p>
  `;
}