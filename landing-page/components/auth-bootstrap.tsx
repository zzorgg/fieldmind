'use client'

import { useEffect } from 'react'

import { useAuthStore } from '@/hooks/use-auth-store'

export default function AuthBootstrap() {
    const initialize = useAuthStore((state) => state.initialize)

    useEffect(() => initialize(), [initialize])

    return null
}