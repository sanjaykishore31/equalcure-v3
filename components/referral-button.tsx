'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';

interface ReferralButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ReferralButton({ 
  variant = 'default', 
  size = 'default',
  className 
}: ReferralButtonProps) {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push('/refer')}
      variant={variant}
      size={size}
      className={className}
    >
      <UserPlus className="mr-2 h-4 w-4" />
      Refer a Patient
    </Button>
  );
} 