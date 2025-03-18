import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function ReferLoading() {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading referral form...</p>
      </div>
    </Card>
  );
} 