'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: {
    date: string;
    time: string;
    zoomLink: string;
  } | null;
}

export function SuccessDialog({ isOpen, onClose, appointmentDetails }: SuccessDialogProps) {
  if (!appointmentDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Appointment Scheduled!
          </DialogTitle>
          <DialogDescription>
            Your video consultation has been scheduled successfully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="text-sm">
            <p><strong>Date:</strong> {appointmentDetails.date}</p>
            <p><strong>Time:</strong> {appointmentDetails.time}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium mb-2">Zoom Meeting Link:</p>
            <a 
              href={appointmentDetails.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline break-all"
            >
              {appointmentDetails.zoomLink}
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address with these details.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 