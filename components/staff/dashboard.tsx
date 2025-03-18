'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { PatientRegistry } from './patient-registry';
import { Appointments } from './appointments';
import { StaffMessages } from './messages';
import { DashboardMetrics } from './metrics';

export function StaffDashboard() {
  const [activeView, setActiveView] = useState<'patients' | 'appointments' | 'messages'>('patients');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-8">
        <DashboardMetrics />
        {activeView === 'patients' && <PatientRegistry />}
        {activeView === 'appointments' && <Appointments />}
        {activeView === 'messages' && <StaffMessages />}
      </main>
    </div>
  );
}