import { type AuthError } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  return error ? describeAuthError(error) : null;
}

export async function signUp(fullName: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: fullName.trim() } },
  });
  if (error) return describeAuthError(error);

  // (TODO: later when you guys have a fake test email/account: Turn on "Confirm email" in Supabase)
  if (!data.session) return 'Check your inbox and confirm your email, then sign in.';
  return null;
}

export async function signOut() {
  await supabase.auth.signOut();
}

function describeAuthError(error: AuthError) {
  switch (error.code) {
    case 'invalid_credentials':
      return 'Wrong email or password.';
    case 'user_already_exists':
      return 'There is already an account with this email. Sign in instead.';
    case 'email_address_invalid':
    case 'validation_failed':
      return 'Enter a valid email address.';
    case 'weak_password':
      // Supabase's message says what the password needs, e.g. "at least 6 characters".
      return error.message;
    case 'email_not_confirmed':
      return 'Confirm your email first. Check your inbox for the link.';
    case 'over_request_rate_limit':
      return 'Too many tries. Wait a moment and try again.';
    default:
      return 'Something went wrong. Check your internet connection and try again.';
  }
}
