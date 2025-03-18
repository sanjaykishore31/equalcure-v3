'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePatients } from '@/hooks/use-patients';
import { format } from 'date-fns';

export function PatientRegistry() {
  const { patients } = usePatients();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Registry</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>First Visit</TableHead>
            <TableHead>Lab Date</TableHead>
            <TableHead>HCV Confirmed</TableHead>
            <TableHead>DAA Prescribed</TableHead>
            <TableHead>Clinician</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{format(new Date(patient.registrationDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>
                {patient.firstVisitDate
                  ? format(new Date(patient.firstVisitDate), 'MM/dd/yyyy')
                  : 'Not scheduled'}
              </TableCell>
              <TableCell>
                {patient.labDate
                  ? format(new Date(patient.labDate), 'MM/dd/yyyy')
                  : 'Pending'}
              </TableCell>
              <TableCell>{patient.hcvConfirmed ? 'Yes' : 'No'}</TableCell>
              <TableCell>{patient.daaPrescribed ? 'Yes' : 'No'}</TableCell>
              <TableCell>{patient.clinician}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}