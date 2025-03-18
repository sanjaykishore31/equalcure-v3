'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SuccessDialog } from './success-dialog';
import { isWeekend } from 'date-fns';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: Date | undefined;
  onTimeSelect: (time: Date) => void;
}

function TimeSlots({ selectedDate, selectedTime, onTimeSelect }: TimeSlotsProps) {
  const generateTimeSlots = () => {
    const slots: Date[] = [];
    const date = new Date(selectedDate);
    
    // Generate slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        date.setHours(hour, minute, 0, 0);
        slots.push(new Date(date));
      }
    }
    return slots;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map((time) => (
        <Button
          key={time.getTime()}
          variant={selectedTime?.getTime() === time.getTime() ? 'default' : 'outline'}
          className={cn(
            'w-full',
            selectedTime?.getTime() === time.getTime() && 'bg-primary text-primary-foreground'
          )}
          onClick={() => onTimeSelect(time)}
        >
          {formatTime(time)}
        </Button>
      ))}
    </div>
  );
}

export function TestScheduler() {
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<{
    date: string;
    time: string;
    zoomLink: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !email) return;

    setLoading(true);
    setError(null);
    
    try {
      // Create Zoom meeting via API route
      const startTime = new Date(selectedDate);
      startTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      
      const zoomResponse = await fetch('/api/zoom/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: `Video Consultation with ${email}`,
          startTime: startTime.toISOString(),
          duration: 30 // 30-minute consultation
        }),
      });

      if (!zoomResponse.ok) {
        const zoomError = await zoomResponse.json();
        throw new Error(zoomError.error || 'Failed to create Zoom meeting');
      }

      const zoomMeeting = await zoomResponse.json();

      // Send confirmation email
      console.log('Sending confirmation email to:', email);
      const emailResponse = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          appointmentDate: startTime.toISOString(),
          zoomLink: zoomMeeting.join_url
        }),
      });

      const emailResult = await emailResponse.json();
      
      if (!emailResponse.ok) {
        console.error('Email API error:', emailResult);
        throw new Error(emailResult.error || 'Failed to send confirmation email');
      }

      console.log('Email sent successfully:', emailResult);

      setAppointmentDetails({
        date: selectedDate.toLocaleDateString(),
        time: selectedTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        zoomLink: zoomMeeting.join_url
      });

      setShowDialog(true);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      setError(error instanceof Error ? error.message : 'Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Select Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => 
              date < new Date() || isWeekend(date)
            }
            className="rounded-md border"
          />
        </Card>

        {selectedDate && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Select Time</h2>
            <TimeSlots
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
          </Card>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-500 mt-2">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={!selectedDate || !selectedTime || !email || loading}
      >
        {loading ? 'Creating Meeting...' : 'Schedule Appointment'}
      </Button>

      <SuccessDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        appointmentDetails={appointmentDetails}
      />
    </form>
  );
} 