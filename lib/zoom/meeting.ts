import type { CreateMeetingResponse } from './types';

interface CreateMeetingParams {
  startTime: Date;
  duration?: number; // in minutes
  topic?: string;
}

export async function createZoomMeeting({ 
  startTime, 
  duration = 30,
  topic = 'Telehealth Consultation'
}: CreateMeetingParams): Promise<CreateMeetingResponse> {
  try {
    const response = await fetch('/api/zoom/create-meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startTime: startTime.toISOString(),
        duration,
        topic,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Zoom meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw error;
  }
}