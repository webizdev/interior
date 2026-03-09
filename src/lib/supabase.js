import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL ERROR: Supabase URL or Anon Key is missing. Check your environment variables in Vercel.");
}

// Gunakan URL dummy untuk mencegah crash total saat env var hilang, 
// sehingga komponen bisa render state kosong tanpa infinite loading.
const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
const safeKey = supabaseAnonKey || 'placeholder';

export const supabase = createClient(safeUrl, safeKey);
