'use client';

import { Card } from '@/components/ui/card';
import { MessageList } from '@/components/messages/message-list';
import { MessageInput } from '@/components/messages/message-input';
import { StaffList } from '@/components/messages/staff-list';
import { useState } from 'react';

export function StaffMessages() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 p-4">
          <h2 className="font-semibold mb-4">My Patients</h2>
          <div className="space-y-2">
            {/* Demo patient list */}
            <button
              className="w-full text-left p-2 hover:bg-accent rounded-md"
              onClick={() => setSelectedPatientId('1')}
            >
              John Doe
            </button>
            <button
              className="w-full text-left p-2 hover:bg-accent rounded-md"
              onClick={() => setSelectedPatientId('2')}
            >
              Jane Smith
            </button>
          </div>
        </Card>

        <Card className="md:col-span-3 p-4">
          {selectedPatientId ? (
            <div className="flex flex-col h-[600px]">
              <MessageList staffId={selectedPatientId} />
              <MessageInput staffId={selectedPatientId} />
            </div>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Select a patient to view messages
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}