import 'expo-sqlite/localStorage/install';

import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

// Generated from the database with `npm run types:db`. Run it again after every migration.
import { type Database } from '@/types/database';

// Both values are safe to put in the app. Never put the database password or a secret key here.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
  auth: {
    // Keeps the user signed in after the app restarts.
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Phones have no URL to read a session from.
    detectSessionInUrl: false,
  },
});

// Refresh the sign-in only while the app is open.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
