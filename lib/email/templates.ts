import { format } from 'date-fns';
import type { AppointmentDetails } from '../types/appointment';

export function getAppointmentConfirmationEmail(appointment: AppointmentDetails) {
  const date = format(new Date(appointment.date), 'MMMM d, yyyy');
  const time = format(new Date(appointment.date), 'h:mm a');

  return {
    subject: 'Your Telehealth Appointment Confirmation',
    html: `
      <h1>Your Appointment is Confirmed</h1>
      <p>Your telehealth consultation has been scheduled for:</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Duration:</strong> 30 minutes</p>
      <p>Join your appointment using this link:</p>
      <p><a href="${appointment.zoomUrl}">${appointment.zoomUrl}</a></p>
      <p>Meeting ID: ${appointment.zoomMeetingId}</p>
      <p>Password: ${appointment.zoomPassword}</p>
    `,
  };
}