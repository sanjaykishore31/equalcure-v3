import { ZOOM_API_CONFIG } from './constants';
import type { CreateMeetingResponse } from './types';

interface CreateMeetingParams {
  startTime: Date;
  duration?: number;
  topic?: string;
}

export async function createZoomMeeting({ 
  startTime, 
  duration,
  topic 
}: CreateMeetingParams): Promise<CreateMeetingResponse> {
  try {
    const response = await fetch('/api/zoom/create-meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startTime: startTime.toISOString(),
        duration: duration || ZOOM_API_CONFIG.MEETING_DEFAULTS.DURATION,
        topic: topic || ZOOM_API_CONFIG.MEETING_DEFAULTS.TOPIC,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create Zoom meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Zoom meeting creation error:', error);
    throw error instanceof Error ? error : new Error('Failed to create Zoom meeting');
  }
}