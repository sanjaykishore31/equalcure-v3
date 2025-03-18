```tsx
'use client';

import { useEffect, useState } from 'react';
import { ZoomMeeting } from '@/components/zoom/meeting';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function MeetingPage() {
  const params = useParams();
  const [meetingDetails, setMeetingDetails] = useState<{
    meetingNumber: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    async function fetchMeetingDetails() {
      const { data, error } = await supabase
        .from('appointments')
        .select('zoom_meeting_id, zoom_password')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching meeting details:', error);
        return;
      }

      setMeetingDetails({
        meetingNumber: data.zoom_meeting_id,
        password: data.zoom_password,
      });
    }

    fetchMeetingDetails();
  }, [params.id]);

  if (!meetingDetails) {
    return <div>Loading meeting details...</div>;
  }

  return (
    <ZoomMeeting
      meetingNumber={meetingDetails.meetingNumber}
      password={meetingDetails.password}
      userName="Patient"
    />
  );
}
```