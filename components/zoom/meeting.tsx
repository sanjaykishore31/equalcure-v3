```tsx
'use client';

import { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { zoomConfig } from '@/lib/zoom/config';

interface ZoomMeetingProps {
  meetingNumber: string;
  password: string;
  userName: string;
}

export function ZoomMeeting({ meetingNumber, password, userName }: ZoomMeetingProps) {
  useEffect(() => {
    const initZoom = async () => {
      const { sdkKey, sdkSecret } = zoomConfig;
      
      try {
        const signature = await ZoomMtg.generateSDKSignature({
          sdkKey,
          sdkSecret,
          meetingNumber,
          role: 0, // 0 for attendee
        });

        await ZoomMtg.init({
          leaveUrl: window.location.origin + '/appointments/completed',
          success: () => {
            ZoomMtg.join({
              signature,
              meetingNumber,
              userName,
              sdkKey,
              userEmail: '',
              passWord: password,
              success: () => {
                console.log('Joined meeting successfully');
              },
              error: (error: any) => {
                console.error('Failed to join meeting:', error);
              }
            });
          },
          error: (error: any) => {
            console.error('Failed to initialize Zoom:', error);
          }
        });
      } catch (error) {
        console.error('Error setting up Zoom meeting:', error);
      }
    };

    initZoom();

    return () => {
      ZoomMtg.leaveMeeting({});
    };
  }, [meetingNumber, password, userName]);

  return (
    <div id="zmmtg-root" className="w-full h-screen" />
  );
}