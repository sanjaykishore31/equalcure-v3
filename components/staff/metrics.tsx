'use client';

import { Card } from '@/components/ui/card';
import { usePatients } from '@/hooks/use-patients';

export function DashboardMetrics() {
  const { patients } = usePatients();
  
  const totalPatients = patients.length;
  const confirmedHCV = patients.filter(p => p.hcvConfirmed).length;
  const onTreatment = patients.filter(p => p.daaPrescribed).length;
  const treatmentRate = confirmedHCV > 0 
    ? Math.round((onTreatment / confirmedHCV) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Total Patients
        </h3>
        <p className="text-3xl font-bold">{totalPatients}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Confirmed HCV
        </h3>
        <p className="text-3xl font-bold">{confirmedHCV}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Treatment Rate
        </h3>
        <p className="text-3xl font-bold">{treatmentRate}%</p>
      </Card>
    </div>
  );
}