import { supabase } from './supabase';

async function testConnection() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connection successful:', data);
  }
}

testConnection(); 