'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <Button 
      onClick={handleSignIn}
      variant="outline" 
      className="w-full flex items-center gap-2"
    >
      <FcGoogle className="h-5 w-5" />
      Sign in with Google
    </Button>
  );
} 