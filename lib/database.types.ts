export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          patient_name: string;
          patient_email: string;
          start_time: string;
          type: string;
          status: string;
          notes?: string | null;
          zoom_meeting_id?: string | null;
          zoom_join_url?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Insert: {
          id?: string
          patient_id: string
          staff_id?: string | null
          date: string
          type: string
          status?: string
          notes?: string | null
          zoom_meeting_id?: string | null
          zoom_join_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          staff_id?: string | null
          date?: string
          type?: string
          status?: string
          notes?: string | null
          zoom_meeting_id?: string | null
          zoom_join_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          registration_date: string
          first_visit_date: string | null
          lab_date: string | null
          hcv_confirmed: boolean
          daa_prescribed: boolean
          clinician_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          registration_date?: string
          first_visit_date?: string | null
          lab_date?: string | null
          hcv_confirmed?: boolean
          daa_prescribed?: boolean
          clinician_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          registration_date?: string
          first_visit_date?: string | null
          lab_date?: string | null
          hcv_confirmed?: boolean
          daa_prescribed?: boolean
          clinician_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}