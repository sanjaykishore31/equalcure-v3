'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { useMessages } from '@/hooks/use-messages';
import { FileUpload } from './file-upload';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/app/auth-provider';

interface MessageInputProps {
  staffId: string;
}

export function MessageInput({ staffId }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendMessage } = useMessages(staffId);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && !selectedFile) || isSubmitting) return;

    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to send messages.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let attachment;
      
      if (selectedFile) {
        toast({
          title: "Uploading file...",
          description: `Uploading ${selectedFile.name}`,
        });

        // Upload file to Supabase Storage
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `message-attachments/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('secure-files')
          .upload(filePath, selectedFile);

        if (uploadError) {
          console.error('File upload error:', uploadError);
          throw new Error(`Failed to upload file: ${uploadError.message}`);
        }

        // Get secure URL
        const { data: { publicUrl } } = supabase.storage
          .from('secure-files')
          .getPublicUrl(filePath);

        attachment = {
          file_name: selectedFile.name,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          file_url: publicUrl,
        };

        toast({
          title: "File uploaded",
          description: `${selectedFile.name} uploaded successfully`,
        });
      }

      toast({
        title: "Sending message...",
        description: "Your message is being sent",
      });

      await sendMessage(message, attachment);
      
      toast({
        title: "Message sent",
        description: "Your message was sent successfully",
      });
      
      setMessage('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? `Failed to send message: ${error.message}` 
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 space-y-4">
      <FileUpload
        onFileSelect={(file) => setSelectedFile(file)}
        onClear={() => setSelectedFile(null)}
        selectedFile={selectedFile || undefined}
      />
      
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[80px]"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={(!message.trim() && !selectedFile) || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      {selectedFile && (
        <p className="text-xs text-muted-foreground">
          Attaching: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </p>
      )}
    </form>
  );
}