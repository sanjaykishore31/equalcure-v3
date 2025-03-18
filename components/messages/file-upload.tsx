'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, X } from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/types/message';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  selectedFile?: File;
}

export function FileUpload({ onFileSelect, onClear, selectedFile }: FileUploadProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid file type (images, PDF, or Word documents).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Files must be smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div>
      {selectedFile ? (
        <div className="flex items-center gap-2 text-sm">
          <Paperclip className="h-4 w-4" />
          <span className="truncate">{selectedFile.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-md p-4 ${
            isDragging ? 'border-primary' : 'border-muted'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            accept={ALLOWED_FILE_TYPES.join(',')}
          />
          <div className="text-center text-sm text-muted-foreground">
            <Paperclip className="h-4 w-4 mx-auto mb-2" />
            <p>Drop a file here or click to upload</p>
            <p className="text-xs mt-1">Max size: 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}