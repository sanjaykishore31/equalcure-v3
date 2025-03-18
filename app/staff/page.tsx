'use client';

import { useEffect } from 'react';
import { StaffDashboard } from '@/components/staff/dashboard';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';

export default function StaffPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/staff/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <StaffDashboard />;
}