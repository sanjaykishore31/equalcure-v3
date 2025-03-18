'use client';

import { Card } from '@/components/ui/card';
import { TimeSlots } from '@/components/appointments/time-slots';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TimeSlotsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const selectedDate = dateParam ? new Date(dateParam) : new Date();
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Calendar
        </Button>

        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">
            Select an Available Time Slot
          </h1>
          
          <div className="space-y-8">
            <p className="text-muted-foreground">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <TimeSlots
              selectedDate={selectedDate}
              onSelectTime={setSelectedTime}
            />

            {selectedTime && (
              <Button 
                size="lg"
                className="w-full"
                onClick={() => router.push('/appointments/confirm')}
              >
                Continue to Book Appointment
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}