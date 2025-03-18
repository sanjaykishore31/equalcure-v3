'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function MedicalHistoryButton() {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push('/medical-history')} 
      variant="default"
    >
      Complete Medical History
    </Button>
  );
} 