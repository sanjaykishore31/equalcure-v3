'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function TestOAuth() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/test-oauth');
        const data = await response.json();
        setConfig(data.config);
      } catch (err) {
        setError('Failed to fetch configuration');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

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
      setError('Failed to sign in with Google. Check console for details.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">OAuth Configuration Test</h1>
      
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <p><strong>Supabase URL:</strong> {config?.supabaseUrl}</p>
          <p><strong>Supabase Key:</strong> {config?.supabaseKey}</p>
          <p><strong>Current Origin:</strong> {config?.origin}</p>
          <p><strong>Redirect URL:</strong> {config?.redirectUrl}</p>
          <p><strong>Site URL:</strong> {config?.siteUrl}</p>
          <p><strong>Full Supabase Redirect URL:</strong> {config?.fullRedirectUrl}</p>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Google Sign In</h2>
        <p className="mb-4">
          Make sure you've added these redirect URIs to your Google OAuth credentials:
        </p>
        <ul className="list-disc pl-5 mb-4">
          {config?.expectedGoogleRedirectUris.map((uri: string, index: number) => (
            <li key={index} className="mb-1">{uri}</li>
          ))}
        </ul>
        
        <Button onClick={handleGoogleSignIn}>
          Test Google Sign In
        </Button>
      </Card>
    </div>
  );
} 