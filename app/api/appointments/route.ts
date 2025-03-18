import { NextResponse } from 'next/server';
import { scheduleAppointment } from '@/lib/appointments/service';

export async function POST(request: Request) {
  try {
    const appointmentData = await request.json();
    console.log('Received appointment data:', appointmentData);

    // Validate each field explicitly
    const validationErrors = [];
    
    if (!appointmentData.patientId || appointmentData.patientId.trim() === '') {
      validationErrors.push('patientId');
    }
    if (!appointmentData.patientName || appointmentData.patientName.trim() === '') {
      validationErrors.push('patientName');
    }
    if (!appointmentData.patientEmail || appointmentData.patientEmail.trim() === '') {
      validationErrors.push('patientEmail');
    }
    if (!appointmentData.startTime) {
      validationErrors.push('startTime');
    }
    if (!appointmentData.type || appointmentData.type.trim() === '') {
      validationErrors.push('type');
    }

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json({
        error: 'Missing required appointment data',
        missingFields: validationErrors,
        receivedData: appointmentData
      }, { status: 400 });
    }

    const appointment = await scheduleAppointment(appointmentData);
    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error('Error in appointment route:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to create appointment'
    }, { status: 500 });
  }
}