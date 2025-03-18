'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, Download, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { MessageAttachment } from '@/lib/types/message';

interface MessageAttachmentProps {
  attachment: MessageAttachment;
}

export function MessageAttachmentPreview({ attachment }: MessageAttachmentProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const isImage = attachment.file_type.startsWith('image/');
  const isPDF = attachment.file_type === 'application/pdf';

  const handleDownload = () => {
    window.open(attachment.file_url, '_blank');
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <FileIcon className="h-4 w-4" />
      <span className="text-sm truncate flex-1">{attachment.file_name}</span>
      
      <div className="flex gap-1">
        {(isImage || isPDF) && (
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              {isImage ? (
                <img
                  src={attachment.file_url}
                  alt={attachment.file_name}
                  className="max-h-[80vh] object-contain"
                />
              ) : (
                <iframe
                  src={attachment.file_url}
                  className="w-full h-[80vh]"
                  title={attachment.file_name}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="h-8 w-8 p-0"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}