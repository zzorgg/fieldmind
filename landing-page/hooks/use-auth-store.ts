"use client"

import type { User } from "@supabase/supabase-js"
import { create } from "zustand"

import { supabase } from "@/lib/supabase"

type AuthStore = {
  user: User | null
  loading: boolean
  isAuthenticating: boolean
  authError: string | null
  initialize: () => () => void
  signInWithGithub: (redirectTo: string) => Promise<void>
  signOut: () => Promise<void>
  clearAuthError: () => void
}

let unsubscribeAuthListener: (() => void) | null = null

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  isAuthenticating: false,
  authError: null,

  initialize: () => {
    if (unsubscribeAuthListener) {
      return unsubscribeAuthListener
    }

    void supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        set({ user: session?.user ?? null, loading: false })
      })
      .catch((error: Error) => {
        set({
          authError: error.message,
          loading: false,
          isAuthenticating: false,
        })
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        loading: false,
        isAuthenticating: false,
        authError: null,
      })
    })

    unsubscribeAuthListener = () => {
      subscription.unsubscribe()
      unsubscribeAuthListener = null
    }

    return unsubscribeAuthListener
  },

  signInWithGithub: async (redirectTo: string) => {
    set({ authError: null, isAuthenticating: true })

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    })

    if (error) {
      set({ authError: error.message, isAuthenticating: false })
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      set({ authError: error.message })
      return
    }

    set({ user: null, authError: null, isAuthenticating: false })
  },

  clearAuthError: () => set({ authError: null }),
}))
