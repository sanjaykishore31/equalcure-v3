'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ReferralForm } from '@/components/referral/referral-form';
import { ReferralSuccess } from '@/components/referral/referral-success';

export default function ReferPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralId, setReferralId] = useState<string | null>(null);

  const handleSuccess = (id: string) => {
    setReferralId(id);
    setIsSubmitted(true);
  };

  return (
    <Card className="p-6">
      {isSubmitted ? (
        <ReferralSuccess referralId={referralId} />
      ) : (
        <ReferralForm onSuccess={handleSuccess} />
      )}
    </Card>
  );
} 