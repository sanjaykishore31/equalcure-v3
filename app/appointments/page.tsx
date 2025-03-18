'use client';

import { TestScheduler } from '@/components/appointments/test-scheduler';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Schedule Your Video Consultation
        </h1>
        <TestScheduler />
      </div>
    </div>
  );
}