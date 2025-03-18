export const ZOOM_CONFIG = {
  API: {
    BASE_URL: 'https://api.zoom.us/v2',
    TOKEN_URL: 'https://zoom.us/oauth/token',
  },
  MEETING: {
    DEFAULT_DURATION: 30,
    DEFAULT_TOPIC: 'Telehealth Consultation',
    SETTINGS: {
      join_before_host: true,
      waiting_room: true,
      mute_upon_entry: true,
      audio: 'both',
      auto_recording: 'none',
    },
  },
} as const;