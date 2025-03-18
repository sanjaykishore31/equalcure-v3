export const ZOOM_API_CONFIG = {
  BASE_URL: 'https://api.zoom.us/v2',
  TOKEN_URL: 'https://zoom.us/oauth/token',
  MEETING_DEFAULTS: {
    DURATION: 30,
    TOPIC: 'Telehealth Consultation',
    SETTINGS: {
      join_before_host: true,
      waiting_room: true,
      mute_upon_entry: true,
      audio: 'both',
      auto_recording: 'none',
    },
  },
  HEADERS: {
    JSON_CONTENT: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    FORM_URLENCODED: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
} as const;