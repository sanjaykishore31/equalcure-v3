'use client';

import { Users, Calendar, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface SidebarProps {
  activeView: 'patients' | 'appointments' | 'messages';
  onViewChange: (view: 'patients' | 'appointments' | 'messages') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/staff/login');
  };

  return (
    <div className="w-64 border-r bg-card p-6">
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            activeView === 'patients' && 'bg-muted'
          )}
          onClick={() => onViewChange('patients')}
        >
          <Users className="mr-2 h-4 w-4" />
          My Patients
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            activeView === 'appointments' && 'bg-muted'
          )}
          onClick={() => onViewChange('appointments')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          My Appointments
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            activeView === 'messages' && 'bg-muted'
          )}
          onClick={() => onViewChange('messages')}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Button>
      </nav>
      <div className="absolute bottom-6 left-6 right-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}