import { Resend } from 'resend';
import type { AppointmentDetails } from '../types/appointment';
import { getAppointmentEmailTemplate } from './templates/appointment';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentEmail(email: string, appointment: AppointmentDetails) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - skipping email send');
    return;
  }

  try {
    const { subject, html } = getAppointmentEmailTemplate(appointment);
    
    await resend.emails.send({
      from: 'appointments@cure-telehealth.com',
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    // Don't throw - we don't want to fail the appointment creation if email fails
  }
}