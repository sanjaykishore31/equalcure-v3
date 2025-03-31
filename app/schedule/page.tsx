'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  organization: string;
  phone: string;
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    phone: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Generate available times (9 AM - 4 PM ET)
  const times = Array.from({ length: 15 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  // Disable weekends and past dates
  const disabledDays = (date: Date) => {
    const day = date.getDay();
    return date < new Date() || day === 0 || day === 6;
  };

  const handleSubmit = async () => {
    const meetingData = {
      ...formData,
      date: date ? format(date, 'MMMM d, yyyy') : '',
      time: selectedTime,
    };
    
    try {
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule meeting');
      }

      // Show confirmation screen
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Please try again.');
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
        <div className="container mx-auto px-4 py-6">
          <Logo />
        </div>
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-white">Meeting Scheduled!</h1>
            <p className="text-white/80 mb-6">
              Your meeting is confirmed for {date ? format(date, 'MMMM d, yyyy') : ''} at {selectedTime} ET
            </p>
            <div className="text-white/80 text-left mb-8">
              <p>Name: {formData.name}</p>
              <p>Organization: {formData.organization}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
            </div>
            <p className="text-white/80 mb-8">
              You will receive a calendar invitation and meeting details shortly.
            </p>
            <Button asChild className="bg-white hover:bg-white/90 text-slate-900">
              <Link href="/">Return to Home</Link>
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Logo />
          <Link href="/" className="text-white/80 hover:text-white">
            Home
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
          <h1 className="text-3xl font-bold mb-6 text-white">Schedule a Partnership Call</h1>
          <p className="text-white/80 mb-8">
            Select a date and time for a 30-minute consultation to discuss how EqualCure can help expand your HCV treatment program.
          </p>

          {/* Contact Information */}
          <div className="mb-8 grid gap-4">
            <div>
              <Label className="text-white">Full Name</Label>
              <Input 
                className="bg-white/10 border-white/20 text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label className="text-white">Organization</Label>
              <Input 
                className="bg-white/10 border-white/20 text-white"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                placeholder="Enter your organization name"
              />
            </div>
            <div>
              <Label className="text-white">Email</Label>
              <Input 
                className="bg-white/10 border-white/20 text-white"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label className="text-white">Phone Number</Label>
              <Input 
                className="bg-white/10 border-white/20 text-white"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Select a Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={disabledDays}
                className="rounded-md border bg-white p-3"
                classNames={{
                  day_selected: "bg-slate-900 text-white hover:bg-slate-800 focus:bg-slate-900 font-bold",
                  day: "text-navy-900 hover:bg-slate-100 font-semibold",
                  day_today: "bg-slate-100 text-navy-900 font-bold",
                  day_disabled: "text-slate-300",
                  nav_button: "hover:bg-slate-100 text-navy-900",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  caption: "relative text-navy-900 font-bold text-lg flex justify-center items-center p-2",
                  head_cell: "text-navy-900 font-bold w-10 h-10 flex items-center justify-center",
                  cell: "w-10 h-10 flex items-center justify-center p-0",
                }}
                components={{
                  IconLeft: () => <ChevronLeft className="h-4 w-4 text-navy-900" />,
                  IconRight: () => <ChevronRight className="h-4 w-4 text-navy-900" />,
                }}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Select a Time (ET)</h2>
              <div className="grid grid-cols-2 gap-2">
                {times.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className={`w-full ${
                      selectedTime === time 
                        ? "bg-white text-slate-900" 
                        : "text-white border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-slate-900"
              disabled={!date || !selectedTime || !formData.name || !formData.email}
              onClick={handleSubmit}
            >
              Schedule Call
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
} 