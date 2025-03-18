import { NextResponse } from 'next/server';
import { createZoomApiMeeting } from '@/lib/zoom/api';
import { getZoomAccessToken } from '@/lib/zoom/auth';
import { validateMeetingInput } from '@/lib/zoom/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = validateMeetingInput(body);
    const accessToken = await getZoomAccessToken();
    const meeting = await createZoomApiMeeting(accessToken, data);

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Failed to create Zoom meeting:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create Zoom meeting' },
      { status: 500 }
    );
  }
}