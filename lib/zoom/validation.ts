import { z } from 'zod';

const meetingInputSchema = z.object({
  startTime: z.string().datetime(),
  duration: z.number().min(1).max(240).optional(),
  topic: z.string().min(1).max(200).optional(),
});

export type MeetingInput = z.infer<typeof meetingInputSchema>;

export function validateMeetingInput(data: unknown) {
  return meetingInputSchema.parse(data);
}