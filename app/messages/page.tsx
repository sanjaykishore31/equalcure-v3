'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MessageList } from '@/components/messages/message-list';
import { MessageInput } from '@/components/messages/message-input';
import { StaffList } from '@/components/messages/staff-list';

export default function MessagesPage() {
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 p-4">
            <StaffList onSelect={setSelectedStaffId} selectedId={selectedStaffId} />
          </Card>

          <Card className="md:col-span-3 p-4">
            {selectedStaffId ? (
              <div className="flex flex-col h-[600px]">
                <MessageList staffId={selectedStaffId} />
                <MessageInput staffId={selectedStaffId} />
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                Select a care team member to start messaging
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}