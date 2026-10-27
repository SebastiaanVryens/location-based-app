import { type Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { getProfile } from '@/data/profiles';
import { useLoad } from '@/hooks/use-load';
import { supabase } from '@/lib/supabase';

type Account = {
  name: string;
  email: string;
};

type AuthContextValue = {
  // Undefined while the saved sign-in is read from the phone, null when signed out.
  session: Session | null | undefined;
  // Null when signed out.
  account: Account | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const profile = useLoad(getProfile, session?.user.id ?? null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const email = session?.user.email ?? '';
  const fullName = profile.status === 'done' ? profile.data?.fullName : null;
  const account = session ? { name: fullName || email, email } : null;

  return <AuthContext value={{ session, account }}>{children}</AuthContext>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used inside <AuthProvider>.');
  }
  return auth;
}
