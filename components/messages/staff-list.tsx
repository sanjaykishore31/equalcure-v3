'use client';

import { useStaff } from '@/hooks/use-staff';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { UserRound, Loader2 } from 'lucide-react';

interface StaffListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export function StaffList({ onSelect, selectedId }: StaffListProps) {
  const { staff, loading } = useStaff();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading care team...</p>
      </div>
    );
  }

  if (staff.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-2">
        <UserRound className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground text-center">
          No care team members available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="font-semibold mb-4">Care Team</h2>
      {staff.map((member) => (
        <Button
          key={member.id}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            selectedId === member.id && "bg-accent"
          )}
          onClick={() => onSelect(member.id)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-medium">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}