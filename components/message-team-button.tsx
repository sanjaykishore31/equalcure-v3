'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

interface MessageTeamButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function MessageTeamButton({ 
  variant = 'default', 
  size = 'default',
  className
}: MessageTeamButtonProps) {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push('/messages')} 
      variant={variant}
      size={size}
      className={className}
    >
      <MessageSquare className="mr-2 h-4 w-4" />
      Message Care Team
    </Button>
  );
} 