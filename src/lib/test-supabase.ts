import { supabase } from './supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('Successfully connected to Supabase:', data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection(); 