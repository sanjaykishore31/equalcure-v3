'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function AppointmentForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      // Log raw form data
      const rawData = {
        patientName: formData.get('patientName'),
        patientEmail: formData.get('patientEmail'),
        startTime: formData.get('startTime'),
        notes: formData.get('notes'),
      };
      console.log('Raw form data:', rawData);

      // Validate raw data first
      if (!rawData.patientName || !rawData.patientEmail || !rawData.startTime) {
        throw new Error('Please fill in all required fields');
      }

      const appointmentData = {
        patientId: 'temp-patient-id',
        patientName: rawData.patientName as string,
        patientEmail: rawData.patientEmail as string,
        startTime: rawData.startTime as string,
        type: 'Initial Consultation',
        notes: rawData.notes as string || null,
      };

      // Log the final data being sent
      console.log('Sending appointment data:', appointmentData);

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        if (responseData.missingFields) {
          throw new Error(`Missing fields: ${responseData.missingFields.join(', ')}`);
        }
        throw new Error(responseData.error || 'Failed to schedule appointment');
      }
      
      toast({
        title: 'Appointment Scheduled',
        description: 'Your appointment has been successfully scheduled.',
      });

    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to schedule appointment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="patientName" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          id="patientName"
          type="text"
          name="patientName"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="patientEmail" className="block text-sm font-medium">
          Email Address
        </label>
        <input
          id="patientEmail"
          type="email"
          name="patientEmail"
          placeholder="your@email.com"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="startTime" className="block text-sm font-medium">
          Appointment Date & Time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          name="startTime"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Any specific concerns or questions?"
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Scheduling...' : 'Schedule Appointment'}
      </button>
    </form>
  );
}