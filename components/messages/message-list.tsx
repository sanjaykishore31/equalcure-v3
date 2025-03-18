'use client';

import { useMessages } from '@/hooks/use-messages';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/app/auth-provider';
import { cn } from '@/lib/utils';
import { MessageAttachmentPreview } from './message-attachment';
import { Loader2, MessageSquare } from 'lucide-react';

interface MessageListProps {
  staffId: string;
}

export function MessageList({ staffId }: MessageListProps) {
  const { user } = useAuth();
  const { messages, loading } = useMessages(staffId);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">No messages yet</h3>
        <p className="text-muted-foreground text-center max-w-xs">
          Start the conversation by sending a message to this care team member.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] rounded-lg p-4",
              message.sender_id === user?.id
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <p>{message.content}</p>
            {message.attachments?.map((attachment) => (
              <MessageAttachmentPreview
                key={attachment.id}
                attachment={attachment}
              />
            ))}
            <p className="text-xs opacity-70 mt-1">
              {new Date(message.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}