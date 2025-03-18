export interface Patient {
  id: string;
  user_id: string;
  name: string;
  email: string;
  registration_date: string;
  first_visit_date: string | null;
  lab_date: string | null;
  hcv_confirmed: boolean;
  daa_prescribed: boolean;
  clinician_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  staff_id: string;
  date: string;
  type: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}