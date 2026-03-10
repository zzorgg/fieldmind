'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/hooks/use-auth-store'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const loading = useAuthStore((state) => state.loading)
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        if (!loading || user) {
            return
        }
    }, [loading, user])

    useEffect(() => {
        if (!loading && !user) {
            const next = pathname && pathname !== '/' ? pathname : '/dashboard'
            router.replace(`/login?next=${encodeURIComponent(next)}`)
        }
    }, [loading, pathname, router, user])

    if (loading || !user) {
        return (
            <section className="flex min-h-screen items-center justify-center px-6">
                <div className="bg-card w-full max-w-md rounded-2xl border border-dashed p-6 text-center shadow-sm">
                    <p className="text-sm font-medium">Checking your session...</p>
                    <p className="mt-2 text-sm text-muted-foreground">Protected content is only available after sign in.</p>
                </div>
            </section>
        )
    }

    return <>{children}</>
}