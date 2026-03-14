import { AuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Failed to restore auth session:', error.message);
      }

      if (!isMounted) {
        return;
      }

      const currentSession = data.session ?? null;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    }

    bootstrapSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isLoggedIn: !!session,
      session,
      user,
    }),
    [isLoading, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
