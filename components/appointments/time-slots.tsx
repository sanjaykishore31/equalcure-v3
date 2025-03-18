'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: Date | undefined;
  onTimeSelect: (time: Date) => void;
}

export function TimeSlots({ selectedDate, selectedTime, onTimeSelect }: TimeSlotsProps) {
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