'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video } from 'lucide-react';
import Link from 'next/link';

interface ConfirmationBoxProps {
  appointment: {
    date: string;
    zoomUrl: string;
    zoomMeetingId: string;
    zoomPassword: string;
  };
}

export function ConfirmationBox({ appointment }: ConfirmationBoxProps) {
  const date = new Date(appointment.date);
  
  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
        <p className="text-muted-foreground">
          Your telehealth consultation has been scheduled
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Date</p>
            <p className="text-muted-foreground">
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Time</p>
            <p className="text-muted-foreground">
              {date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Video className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Video Consultation Details</p>
            <p className="text-muted-foreground">Meeting ID: {appointment.zoomMeetingId}</p>
            <p className="text-muted-foreground">Password: {appointment.zoomPassword}</p>
            <a 
              href={appointment.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Join Meeting
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <Button asChild className="w-full">
          <Link href="/appointments">Schedule Another Appointment</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </Card>
  );
}