// Utility functions for appointment scheduling
export function generateTimeSlots(selectedDate: Date) {
  const slots = [];
  const date = new Date(selectedDate);
  
  for (let hour = 9; hour < 15; hour++) {
    for (let minutes of [0, 20, 40]) {
      date.setHours(hour, minutes, 0, 0);
      slots.push(new Date(date));
    }
  }
  return slots;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}