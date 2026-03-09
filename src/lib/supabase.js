import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

if (!isSupabaseConfigured) {
    console.warn("SUPABASE CONFIGURATION MISSING: Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
}

const safeUrl = supabaseUrl || 'https://uavwpmvpxgckrnubnqex.supabase.co'; // Fallback to your project URL instead of placeholder for better initial state
const safeKey = supabaseAnonKey || 'placeholder';

export const supabase = createClient(safeUrl, safeKey);
