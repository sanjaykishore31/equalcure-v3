import { NextResponse } from 'next/server';
import { createZoomMeeting } from '@/lib/zoom/create-meeting';

export async function POST(request: Request) {
  try {
    const { topic, startTime, duration } = await request.json();

    const meeting = await createZoomMeeting(
      topic,
      startTime,
      duration
    );

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Failed to create Zoom meeting:', error);
    return NextResponse.json(
      { error: 'Failed to create Zoom meeting' },
      { status: 500 }
    );
  }
} 