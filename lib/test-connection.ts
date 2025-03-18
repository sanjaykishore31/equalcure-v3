import { supabase } from './supabase';

async function testConnection() {
  try {
    // Test query to patients table
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error connecting to Supabase:');
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      return false;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log('Sample data:', data);
    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Run the test
console.log('Testing Supabase connection...');
testConnection()
  .then((success) => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });