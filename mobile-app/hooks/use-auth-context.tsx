import type { Session, User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export type AuthContextData = {
  isLoading: boolean;
  isLoggedIn: boolean;
  session: Session | null;
  user: User | null;
};

export const AuthContext = createContext<AuthContextData>({
  isLoading: true,
  isLoggedIn: false,
  session: null,
  user: null,
});

export function useAuthContext() {
  return useContext(AuthContext);
}
