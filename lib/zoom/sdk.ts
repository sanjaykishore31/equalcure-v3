import { ZoomMtg } from '@zoomus/websdk';

// Initialize Zoom SDK
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

export async function generateSignature(meetingNumber: string) {
  const sdkKey = process.env.NEXT_PUBLIC_ZOOM_SDK_KEY;
  const sdkSecret = process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET;
  
  if (!sdkKey || !sdkSecret) {
    throw new Error('Missing Zoom SDK credentials');
  }

  return ZoomMtg.generateSDKSignature({
    sdkKey,
    sdkSecret,
    meetingNumber,
    role: 0, // 0 for attendee
  });
}

export async function initializeZoomMeeting({
  meetingNumber,
  signature,
  userName,
  password,
}: {
  meetingNumber: string;
  signature: string;
  userName: string;
  password: string;
}) {
  const sdkKey = process.env.NEXT_PUBLIC_ZOOM_SDK_KEY;

  return new Promise((resolve, reject) => {
    ZoomMtg.init({
      leaveUrl: `${window.location.origin}/appointments/completed`,
      success: () => {
        ZoomMtg.join({
          signature,
          meetingNumber,
          userName,
          sdkKey,
          userEmail: '',
          passWord: password,
          success: resolve,
          error: reject,
        });
      },
      error: reject,
    });
  });
}