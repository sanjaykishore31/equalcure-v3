'use client';

import { format } from 'date-fns';
import { Video, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface AppointmentSummaryProps {
  date: Date;
  time: Date;
}

export function AppointmentSummary({ date, time }: AppointmentSummaryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Appointment Summary</h2>
      <div className="space-y-2">
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-2" />
          {format(date, 'MMMM d, yyyy')}
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          {format(time, 'h:mm a')}
        </div>
        <div className="flex items-center text-muted-foreground">
          <Video className="h-4 w-4 mr-2" />
          30-minute video consultation
        </div>
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        <p>After scheduling, you will:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Receive a confirmation email</li>
          <li>Get a calendar invitation</li>
          <li>Receive the video consultation link before your appointment</li>
        </ul>
      </div>
    </div>
  );
}