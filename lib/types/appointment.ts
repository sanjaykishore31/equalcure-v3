export interface AppointmentDetails {
  date: string;
  zoomUrl: string;
  zoomMeetingId: string;
  zoomPassword: string;
}

export interface ZoomMeetingConfig {
  startTime: string;
  duration: number;
  topic: string;
}