'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

export default function OAuthDebug() {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDebugClick = async () => {
    setLoading(true);
    setDebugInfo('');
    
    try {
      // Get the current URL
      const currentUrl = window.location.href;
      const origin = window.location.origin;
      const redirectUrl = `${origin}/auth/callback`;
      
      // Get Supabase URL
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      
      // Try to get Google provider settings from Supabase
      let providerInfo = 'Unable to get provider info directly';
      
      // Collect all debug info
      const debugData = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        browser: navigator.userAgent,
        currentUrl,
        origin,
        redirectUrl,
        supabaseUrl,
        providerInfo
      };
      
      setDebugInfo(JSON.stringify(debugData, null, 2));
    } catch (error) {
      console.error('Debug error:', error);
      setDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectGoogleSignIn = async () => {
    try {
      // This uses a slightly different approach for testing
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
      
      // If we get here, the redirect is happening
      setDebugInfo(`Redirect initiated: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Google sign in error:', error);
      setDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">OAuth Debug Tool</h1>
      
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <Button 
          onClick={handleDebugClick} 
          disabled={loading}
          className="mb-4"
        >
          {loading ? 'Loading...' : 'Collect Debug Info'}
        </Button>
        
        <Button 
          onClick={handleDirectGoogleSignIn} 
          variant="outline"
          className="ml-2 mb-4"
        >
          Test Direct Google Sign In
        </Button>
        
        {debugInfo && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {debugInfo}
          </pre>
        )}
      </Card>
    </div>
  );
} 