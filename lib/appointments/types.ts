export interface AppointmentInput {
  date: string;
  name: string;
  email: string;
}

export interface Appointment {
  id: string;
  date: string;
  patient_name: string;
  patient_email: string;
  type: string;
  status: string;
  zoom_meeting_id?: string;
  zoom_password?: string;
  zoom_join_url?: string;
  created_at: string;
  updated_at: string;
}