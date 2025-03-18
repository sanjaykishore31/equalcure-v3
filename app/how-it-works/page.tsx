'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ClipboardList, Video, MessageCircle } from 'lucide-react';
import { LabFinder } from '@/components/lab-finder/lab-finder';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How Cure Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with your telehealth journey in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <ClipboardList className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-4">Complete Medical History</h2>
            <p className="text-muted-foreground mb-8">
              Fill out your medical history to help our doctors provide the best care possible.
            </p>
            <Button className="w-full" asChild>
              <Link href="/medical-history">Complete Medical History</Link>
            </Button>
          </Card>

          <Card className="p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <Video className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-4">Video Consultation</h2>
            <p className="text-muted-foreground mb-8">
              Schedule a video call with one of our licensed healthcare professionals.
            </p>
            <Button className="w-full" asChild>
              <Link href="/appointments">Schedule Video Consultation</Link>
            </Button>
          </Card>

          <Card className="p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-4">Message Care Team</h2>
            <p className="text-muted-foreground mb-8">
              Send secure messages to your care team and get quick responses.
            </p>
            <Button className="w-full" asChild>
              <Link href="/messages">Message Care Team</Link>
            </Button>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <LabFinder />
        </div>
      </div>
    </div>
  );
}