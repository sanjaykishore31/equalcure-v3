import { getZoomAccessToken } from './auth';

export async function createZoomMeeting({ 
  startTime,
  topic,
  duration = 30
}: {
  startTime: string;
  topic: string;
  duration?: number;
}) {
  try {
    const access_token = await getZoomAccessToken();

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic || 'Telehealth Consultation',
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: duration,
        settings: {
          join_before_host: true,
          waiting_room: true,
          mute_upon_entry: true,
          audio: 'both',
          auto_recording: 'none',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create Zoom meeting: ${error}`);
    }

    const meeting = await response.json();
    
    return {
      id: meeting.id,
      join_url: meeting.join_url,
      password: meeting.password,
      start_url: meeting.start_url,
      start_time: meeting.start_time,
      duration: meeting.duration,
      topic: meeting.topic,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while creating the Zoom meeting');
  }
}