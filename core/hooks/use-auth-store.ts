"use client"

import type { User } from "@supabase/supabase-js"
import { create } from "zustand"

import { supabase } from "@/lib/supabase"

type AuthStore = {
  user: User | null
  loading: boolean
  authenticatingProvider: string | null
  authError: string | null
  initialize: () => () => void
  signInWithGithub: (redirectTo: string) => Promise<void>
  signInWithGoogle: (redirectTo: string) => Promise<void>
  signOut: () => Promise<void>
  clearAuthError: () => void
}

let unsubscribeAuthListener: (() => void) | null = null

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  authenticatingProvider: null,
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
          authenticatingProvider: null,
        })
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        loading: false,
        authenticatingProvider: null,
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
    set({ authError: null, authenticatingProvider: "github" })

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    })

    if (error) {
      set({ authError: error.message, authenticatingProvider: null })
    }
  },

  signInWithGoogle: async (redirectTo: string) => {
    set({ authError: null, authenticatingProvider: "google" })

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    })

    if (error) {
      set({ authError: error.message, authenticatingProvider: null })
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      set({ authError: error.message })
      return
    }

    set({ user: null, authError: null, authenticatingProvider: null })
  },

  clearAuthError: () => set({ authError: null }),
}))
