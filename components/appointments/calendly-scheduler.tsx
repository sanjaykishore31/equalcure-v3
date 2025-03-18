'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CalendlyScheduler() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCalendly = () => {
    setIsLoading(true);
    setError(null);

    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Add load and error handlers
    script.onload = () => {
      setIsLoading(false);
    };
    
    script.onerror = () => {
      setIsLoading(false);
      setError('Failed to load scheduling widget. Please try again.');
    };

    // Set a timeout for slow connections
    const timeout = setTimeout(() => {
      if (isLoading) {
        setError('Loading is taking longer than expected. Please refresh and try again.');
        script.remove();
      }
    }, 10000); // 10 seconds timeout

    document.body.appendChild(script);

    // Clean up
    return () => {
      clearTimeout(timeout);
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    const cleanup = loadCalendly();
    return cleanup;
  }, []);

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center h-[600px] text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadCalendly}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div 
        className="calendly-inline-widget min-h-[600px] w-full" 
        data-url="https://calendly.com/sanjaykishore31"
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-[600px]">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Loading scheduler...</p>
          </div>
        )}
      </div>
    </Card>
  );
}