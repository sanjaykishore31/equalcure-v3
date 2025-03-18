import { supabase } from '@/lib/supabase';
import type { AppointmentData } from '@/types/zoom';

export async function createAppointmentRecord(appointmentData: AppointmentData) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        patient_id: appointmentData.patientId,
        staff_id: appointmentData.staffId || null,
        date: appointmentData.startTime,
        type: appointmentData.type,
        status: appointmentData.status || 'scheduled',
        notes: appointmentData.notes,
        zoom_meeting_id: appointmentData.zoomMeetingId,
        zoom_join_url: appointmentData.zoomJoinUrl
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create appointment record: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in createAppointmentRecord:', error);
    throw error;
  }
}