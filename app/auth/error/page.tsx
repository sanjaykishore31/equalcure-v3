import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-muted-foreground">
            There was a problem signing you in. Please try again later.
          </p>
        </div>
      </Card>
    </div>
  );
}