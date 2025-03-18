import { ZOOM_API_CONFIG } from './constants';
import type { ZoomMeetingResponse, ZoomError } from './types';

export async function createZoomApiMeeting(
  accessToken: string,
  params: {
    startTime: string;
    duration?: number;
    topic?: string;
  }
): Promise<ZoomMeetingResponse> {
  try {
    const response = await fetch(`${ZOOM_API_CONFIG.BASE_URL}/users/me/meetings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: params.topic || ZOOM_API_CONFIG.MEETING_DEFAULTS.TOPIC,
        type: 2, // Scheduled meeting
        start_time: params.startTime,
        duration: params.duration || ZOOM_API_CONFIG.MEETING_DEFAULTS.DURATION,
        settings: ZOOM_API_CONFIG.MEETING_DEFAULTS.SETTINGS,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const zoomError: ZoomError = {
        code: response.status,
        message: data.message || 'Failed to create Zoom meeting'
      };
      throw zoomError;
    }

    return data;
  } catch (error) {
    if ((error as ZoomError).code) {
      throw error;
    }
    throw new Error('Failed to connect to Zoom API');
  }
}