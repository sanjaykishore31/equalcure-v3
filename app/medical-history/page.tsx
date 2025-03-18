'use client';

import { Card } from '@/components/ui/card';
import { MedicalHistoryForm } from '@/components/medical-history/form';

export default function MedicalHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Medical History</h1>
        <Card className="p-6">
          <MedicalHistoryForm />
        </Card>
      </div>
    </div>
  );
}