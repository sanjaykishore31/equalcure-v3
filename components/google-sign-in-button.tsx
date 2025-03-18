'use client';

import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/components/ui/google-logo';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function GoogleSignInButton({ className }: { className?: string }) {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      className={`w-full py-6 text-lg ${className}`}
      onClick={handleGoogleSignIn}
    >
      <GoogleLogo className="h-6 w-6 mr-3" />
      Continue with Google
    </Button>
  );
} 