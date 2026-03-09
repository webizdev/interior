import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://uavwpmvpxgckrnubnqex.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdndwbXZweGdja3JudWJucWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMjgyNzQsImV4cCI6MjA4MzcwNDI3NH0.M9yc7xf6v0_PqLomBI48v8UF5SncxK78Z9ZhUqsgVBU';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

const safeUrl = supabaseUrl;
const safeKey = supabaseAnonKey;

export const supabase = createClient(safeUrl, safeKey);
