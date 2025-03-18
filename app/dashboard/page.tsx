'use client';

import { TreatmentProgressTracker } from '@/components/patient/treatment-progress-tracker';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, FileText, Pill, User, Info } from 'lucide-react';
import Link from 'next/link';

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">EqualCure</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium text-foreground">
                  Dashboard
                </Link>
                <Link href="/appointments" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Appointments
                </Link>
                <Link href="/messages" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Messages
                </Link>
                <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <User className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-blue-500/10 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Info className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-sm text-blue-500">
            <span className="font-medium">Demo Mode:</span> This is a preview of the patient dashboard. In a real implementation, this would be protected by authentication.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Treatment Progress Tracker */}
            <TreatmentProgressTracker />
            
            {/* Upcoming Appointments */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 rounded-lg bg-muted">
                  <div className="p-2 rounded-full mr-4 bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Follow-up Consultation</h4>
                      <span className="text-xs text-muted-foreground">Tomorrow</span>
                    </div>
                    <p className="text-sm text-muted-foreground">10:00 AM - 10:30 AM with Dr. Sarah Johnson</p>
                    <div className="flex items-center mt-2">
                      <Button variant="outline" size="sm" className="mr-2">Reschedule</Button>
                      <Button size="sm">Join Call</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span className="text-sm">Message Team</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">Schedule Visit</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                  <Pill className="h-6 w-6 mb-2" />
                  <span className="text-sm">Medication</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">Resources</span>
                </Button>
              </div>
            </Card>
            
            {/* Medication Reminders */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Medication Reminders</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-primary/10">
                  <div className="p-2 rounded-full mr-3 bg-primary/20">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Sofosbuvir/Velpatasvir</h4>
                    <p className="text-xs text-muted-foreground">1 tablet daily with food</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Taken
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}