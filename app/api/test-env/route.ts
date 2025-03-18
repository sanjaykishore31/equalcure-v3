import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
    zoomId: process.env.ZOOM_CLIENT_ID ? 'Set' : 'Not set',
    zoomSecret: process.env.ZOOM_CLIENT_SECRET ? 'Set' : 'Not set',
    resendKey: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
  });
} 