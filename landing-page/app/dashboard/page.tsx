'use client'

import { HeroHeader } from '@/components/header'
import AuthGuard from '@/components/auth-guard'
import { useAuthStore } from '@/hooks/use-auth-store'

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user)
    const displayName = user?.user_metadata?.user_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Operator'

    return (
        <AuthGuard>
            <HeroHeader />
            <main className="min-h-screen px-6 pb-16 pt-32">
                <div className="mx-auto grid max-w-5xl gap-6">
                    <section className="bg-card rounded-3xl border border-dashed p-8 shadow-sm">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Protected</p>
                        <h1 className="mt-4 text-3xl font-semibold">Welcome back, {displayName}.</h1>
                        <p className="mt-3 max-w-2xl text-muted-foreground">
                            This page is protected by the client-side auth store. Unauthenticated users are redirected to the login screen before they can access it.
                        </p>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        <div className="bg-card rounded-2xl border border-dashed p-5">
                            <p className="text-sm text-muted-foreground">Signed in as</p>
                            <p className="mt-2 font-medium">{user?.email || 'No email available'}</p>
                        </div>
                        <div className="bg-card rounded-2xl border border-dashed p-5">
                            <p className="text-sm text-muted-foreground">Auth provider</p>
                            <p className="mt-2 font-medium">GitHub via Supabase</p>
                        </div>
                        <div className="bg-card rounded-2xl border border-dashed p-5">
                            <p className="text-sm text-muted-foreground">Session state</p>
                            <p className="mt-2 font-medium">Active in Zustand store</p>
                        </div>
                    </section>
                </div>
            </main>
        </AuthGuard>
    )
}