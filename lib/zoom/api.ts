import { ZOOM_API_CONFIG } from './constants';
import type { MeetingInput } from './validation';
import type { ZoomMeeting } from './types';

export async function createZoomApiMeeting(
  accessToken: string,
  params: MeetingInput
): Promise<ZoomMeeting> {
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create Zoom meeting');
  }

  return await response.json();
}