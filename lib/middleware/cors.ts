import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function corsMiddleware(request: NextRequest) {
  // Check if it's an OPTIONS request
  const isOptions = request.method === 'OPTIONS';

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS request
  if (isOptions) {
    return NextResponse.json({}, { headers });
  }

  // For other requests, create response with CORS headers
  const response = NextResponse.next();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}