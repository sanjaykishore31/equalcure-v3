import { Resend } from 'resend';
import { getAppointmentConfirmationEmail } from './templates';
import type { AppointmentDetails } from '../types/appointment';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentConfirmation(
  email: string,
  appointment: AppointmentDetails
) {
  const { subject, html } = getAppointmentConfirmationEmail(appointment);
  
  await resend.emails.send({
    from: 'appointments@cure-telehealth.com',
    to: email,
    subject,
    html,
  });
}