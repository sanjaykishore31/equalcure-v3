import type { ZoomMeetingType } from '@/types/zoom';

export async function createZoomMeeting(
  topic: string,
  startTime: string,
  duration: number = 30
) {
  try {
    // Get Zoom access token
    const tokenResponse = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'account_credentials',
        account_id: process.env.ZOOM_ACCOUNT_ID!,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Zoom access token');
    }

    const tokenData = await tokenResponse.json();

    // Create Zoom meeting
    const meetingResponse = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          waiting_room: true,
        },
      }),
    });

    if (!meetingResponse.ok) {
      throw new Error('Failed to create Zoom meeting');
    }

    return await meetingResponse.json();
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw error;
  }
} 