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
        if (!loading && !user) {
            const next = pathname && pathname !== '/' ? pathname : '/dashboard'
            router.replace(`/login?next=${encodeURIComponent(next)}`)
        }
    }, [loading, pathname, router, user])

    if (loading || !user) {
        return null
    }

    return <>{children}</>
}
