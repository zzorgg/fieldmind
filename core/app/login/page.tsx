import { Suspense } from 'react'
import GuestGuard from '@/components/guest-guard'
import LoginForm from '@/components/login-form'

export default function LoginPage() {
    return (
        <Suspense>
            <GuestGuard>
                <LoginForm />
            </GuestGuard>
        </Suspense>
    )
}
