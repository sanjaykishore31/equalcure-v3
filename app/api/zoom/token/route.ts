import { NextResponse } from 'next/server';
import { getZoomAccessToken } from '@/lib/zoom/auth';

export async function GET() {
  try {
    const accessToken = await getZoomAccessToken();
    return NextResponse.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error getting Zoom token:', error);
    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    );
  }
}