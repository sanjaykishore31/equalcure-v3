import { createEvents, EventAttributes } from 'ics';

interface CalendarEventParams {
  date: string;
  topic: string;
}

export function generateCalendarEvent({ date, topic }: CalendarEventParams) {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 minutes

  const event: EventAttributes = {
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ] as [number, number, number, number, number],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ] as [number, number, number, number, number],
    title: topic,
    description: 'Your telehealth consultation. A video link will be sent separately.',
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'EqualCure', email: 'appointments@equalcure.com' },
  };

  return createEvents([event]);
}