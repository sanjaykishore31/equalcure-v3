'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth-provider';
import { initializeZoomMeeting } from '@/lib/zoom/sdk';

interface VideoSessionProps {
  appointmentId: string;
}

export function VideoSession({ appointmentId }: VideoSessionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Get video token
        const response = await fetch('/api/appointments/video-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ appointmentId }),
        });

        if (!response.ok) throw new Error('Failed to get video token');
        
        const { signature, meetingNumber, password } = await response.json();

        // Initialize Zoom meeting
        await initializeZoomMeeting({
          meetingNumber,
          signature,
          userName: user?.user_metadata?.full_name || 'Patient',
          password,
        });
      } catch (err) {
        console.error('Error initializing video session:', err);
        setError('Failed to start video session. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, [appointmentId, user]);

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p>Initializing video session...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Card>
    );
  }

  return <div id="zmmtg-root" className="w-full h-screen" />;
}