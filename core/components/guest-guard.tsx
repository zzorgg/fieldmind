'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/hooks/use-auth-store'

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const loading = useAuthStore((state) => state.loading)
    const user = useAuthStore((state) => state.user)
    const nextPath = searchParams.get('next')
    const redirectAfterLogin = nextPath && nextPath.startsWith('/') ? nextPath : '/dashboard'

    useEffect(() => {
        if (!loading && user) {
            router.replace(redirectAfterLogin)
        }
    }, [loading, redirectAfterLogin, router, user])

    if (loading || user) {
        return null
    }

    return <>{children}</>
}
