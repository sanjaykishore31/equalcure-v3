import { ZOOM_API_CONFIG } from './constants';
import type { ZoomTokenResponse } from './types';

export async function getZoomAccessToken(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Missing Zoom credentials');
  }

  try {
    const response = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'account_credentials',
        account_id: accountId,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Zoom OAuth error: ${response.statusText}`);
    }

    const data = await response.json() as ZoomTokenResponse;
    return data.access_token;
  } catch (error) {
    console.error('Failed to get Zoom access token:', error);
    throw new Error('Failed to authenticate with Zoom');
  }
}