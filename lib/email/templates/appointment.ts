import { formatDate, formatTime } from '../utils';
import type { AppointmentEmailData } from '../types';

export function getAppointmentEmailTemplate(data: AppointmentEmailData) {
  return {
    subject: 'Your Telehealth Appointment Confirmation',
    html: `
      <h1>Your Appointment is Confirmed</h1>
      <p>Your telehealth consultation has been scheduled for:</p>
      <p><strong>Date:</strong> ${formatDate(data.date)}</p>
      <p><strong>Time:</strong> ${formatTime(data.date)}</p>
      <p><strong>Duration:</strong> 30 minutes</p>
      <p>Join your appointment using this link:</p>
      <p><a href="${data.zoomUrl}">${data.zoomUrl}</a></p>
      <p>Meeting ID: ${data.zoomMeetingId}</p>
      <p>Password: ${data.zoomPassword}</p>
    `
  };
}