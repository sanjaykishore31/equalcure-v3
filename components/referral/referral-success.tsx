'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ReferralSuccessProps {
  referralId: string | null;
}

export function ReferralSuccess({ referralId }: ReferralSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Referral Submitted Successfully</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Thank you for your referral. Our team will review it and contact the patient soon.
      </p>
      
      {referralId && (
        <div className="bg-muted p-4 rounded-md mb-6 w-full max-w-xs">
          <p className="text-sm font-medium mb-1">Referral ID:</p>
          <p className="font-mono text-lg">{referralId}</p>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-6">
        If you have any questions, please contact us at <a href="mailto:support@equalcure.com" className="text-primary hover:underline">support@equalcure.com</a>
      </p>
      
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/refer">Submit Another Referral</Link>
        </Button>
      </div>
    </div>
  );
} 