import { z } from 'zod';

export const appointmentSchema = z.object({
  date: z.string().datetime(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export function validateAppointmentInput(data: unknown) {
  return appointmentSchema.parse(data);
}