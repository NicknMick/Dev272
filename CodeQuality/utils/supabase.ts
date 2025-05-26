import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
    'https://bdtplyehbguiqbzgjfmf.supabase.co',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdHBseWVoYmd1aXFiemdqZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NjU4ODksImV4cCI6MjA2MjI0MTg4OX0.6ZRTV-SrnsEtFF7b6KJE7v2A8CIYzuXRTI1z5xIIybQ',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
