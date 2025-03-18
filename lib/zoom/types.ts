export interface ZoomMeeting {
  id: string;
  join_url: string;
  password: string;
  start_url: string;
  start_time: string;
  duration: number;
  topic: string;
}

export interface CreateMeetingParams {
  startTime: Date;
  duration?: number;
  topic?: string;
}

export interface ZoomError {
  code: number;
  message: string;
}