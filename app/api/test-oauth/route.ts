import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  
  try {
    // Get the Supabase URL and key from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Get the current origin
    const origin = requestUrl.origin;
    
    // Get the redirect URL that would be used for Google OAuth
    const redirectUrl = `${origin}/auth/callback`;
    
    // Get the site URL configured in Supabase (if available)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
    
    return NextResponse.json({
      status: 'success',
      config: {
        supabaseUrl: supabaseUrl ? 'configured' : 'missing',
        supabaseKey: supabaseKey ? 'configured' : 'missing',
        origin,
        redirectUrl,
        siteUrl,
        fullRedirectUrl: `${supabaseUrl}/auth/v1/callback`,
        expectedGoogleRedirectUris: [
          redirectUrl,
          `${supabaseUrl}/auth/v1/callback`
        ]
      }
    });
  } catch (error) {
    console.error('Error in test-oauth route:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 