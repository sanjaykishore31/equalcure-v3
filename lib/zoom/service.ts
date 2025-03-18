import { ZOOM_API_CONFIG } from './constants';
import type { CreateMeetingParams, ZoomMeeting } from './types';

export async function createZoomMeeting(params: CreateMeetingParams): Promise<ZoomMeeting> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      : window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/zoom/create-meeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startTime: params.startTime.toISOString(),
        duration: params.duration || ZOOM_API_CONFIG.MEETING_DEFAULTS.DURATION,
        topic: params.topic || ZOOM_API_CONFIG.MEETING_DEFAULTS.TOPIC,
      }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Invalid response format from Zoom API');
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('Zoom API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      throw new Error(data.error || 'Failed to create Zoom meeting');
    }

    return data;
  } catch (error) {
    console.error('Zoom meeting creation failed:', error);
    throw error instanceof Error ? error : new Error('Failed to create Zoom meeting');
  }
}