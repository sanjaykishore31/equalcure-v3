'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Appointment Scheduled!</h1>
          <p className="text-muted-foreground mb-8">
            Your video consultation has been confirmed. You'll receive an email with the Zoom meeting details and a calendar invitation.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/appointments">Schedule Another Appointment</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}