import { createZoomMeeting } from './server';

async function testZoomConnection() {
  try {
    console.log('Checking Zoom credentials...');
    
    const meeting = await createZoomMeeting({
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      topic: 'Test Meeting',
      duration: 30
    });

    console.log('✅ Successfully created Zoom meeting:');
    console.log('Meeting ID:', meeting.id);
    console.log('Join URL:', meeting.join_url);
    return true;
  } catch (error) {
    console.error('❌ Failed to create Zoom meeting:', error.message);
    if (error.message.includes('Missing Zoom credentials')) {
      console.log('\nTo fix this:');
      console.log('1. Go to the Zoom App Marketplace');
      console.log('2. Create a Server-to-Server OAuth app');
      console.log('3. Add these environment variables to your .env file:');
      console.log('   ZOOM_ACCOUNT_ID=your_account_id');
      console.log('   ZOOM_CLIENT_ID=your_client_id');
      console.log('   ZOOM_CLIENT_SECRET=your_client_secret');
    }
    return false;
  }
}

// Run the test
console.log('Testing Zoom API connection...');
testZoomConnection()
  .then((success) => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });