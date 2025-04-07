import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  db: { schema: 'public' },
  global: {
    fetch: fetch.bind(globalThis)
  }
});

export async function GET() {
  try {
    // First try a simple query to test the connection
    const { data: testData, error: testError } = await supabase
      .from('assets')
      .select('count');

    if (testError) {
      console.error('Error testing connection:', testError);
      return NextResponse.json({ error: testError.message }, { status: 500 });
    }

    // If test succeeds, proceed with the actual query
    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!assets || assets.length === 0) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data: assets });
  } catch (error) {
    console.error('Error in assets API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
} 