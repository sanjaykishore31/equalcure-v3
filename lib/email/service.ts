import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  appointmentDate: string;
  zoomLink: string;
}

export async function sendAppointmentEmail(emailData: EmailData) {
  try {
    const result = await resend.emails.send({
      from: 'appointments@yourdomain.com',
      to: emailData.to,
      subject: 'Your Video Consultation Appointment',
      html: `
        <h1>Your appointment has been scheduled</h1>
        <p>Date: ${new Date(emailData.appointmentDate).toLocaleDateString()}</p>
        <p>Time: ${new Date(emailData.appointmentDate).toLocaleTimeString()}</p>
        <p>Join URL: <a href="${emailData.zoomLink}">${emailData.zoomLink}</a></p>
      `,
    });
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}