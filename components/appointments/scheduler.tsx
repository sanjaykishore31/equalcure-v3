'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addDays, format, setHours, setMinutes } from 'date-fns';

// Available time slots (9 AM to 5 PM)
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

export function AppointmentScheduler() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [email, setEmail] = useState('');

  // Generate next 14 days for date selection
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return format(date, 'yyyy-MM-dd');
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedDate || !selectedTime || !email) {
        throw new Error('Please select a date, time, and provide your email');
      }

      // Combine date and time
      const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);

      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          startTime: appointmentDateTime.toISOString(),
          type: 'Video Consultation'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule appointment');
      }

      toast({
        title: 'Appointment Scheduled!',
        description: 'Check your email for the Zoom meeting details.',
      });

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select Date
        </label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Choose a date</option>
          {availableDates.map(date => (
            <option key={date} value={date}>
              {format(new Date(date), 'EEEE, MMMM d, yyyy')}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select Time
        </label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
          disabled={!selectedDate}
        >
          <option value="">Choose a time</option>
          {TIME_SLOTS.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Your Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Scheduling...' : 'Schedule Consultation'}
      </button>
    </form>
  );
} 