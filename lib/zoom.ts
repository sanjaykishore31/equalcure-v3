import { supabase } from './supabase';

interface ZoomMeeting {
  id: string;
  join_url: string;
  start_url: string;
  password: string;
}

export async function createZoomMeeting(date: Date, patientName: string): Promise<ZoomMeeting> {
  // In a real implementation, this would call the Zoom API
  // For demo purposes, we'll create a mock meeting
  return {
    id: Math.random().toString(36).substring(7),
    join_url: `https://zoom.us/j/${Math.random().toString().substring(2, 11)}`,
    start_url: `https://zoom.us/s/${Math.random().toString().substring(2, 11)}`,
    password: Math.random().toString(36).substring(7),
  };
}