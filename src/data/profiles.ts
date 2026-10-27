import { supabase } from '@/lib/supabase';
import { type Profile } from '@/types/profile';

// Returns a user's profile. Users can only read their own.
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;

  return data ? { fullName: data.full_name } : null;
}
