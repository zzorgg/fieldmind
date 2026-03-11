import { Suspense } from 'react'
import GuestGuard from '@/components/guest-guard'
import SignUpForm from '@/components/signup-form'

export default function Page() {
    return (
        <Suspense>
            <GuestGuard>
                <SignUpForm />
            </GuestGuard>
        </Suspense>
    )
}
