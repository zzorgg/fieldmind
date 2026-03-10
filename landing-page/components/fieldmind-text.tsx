"use client"

import { EncryptedText } from '@/components/ui/encrypted-text'
import { cn } from '@/lib/utils'

export function FieldMindText({ className }: { className?: string }) {
    return (
        <EncryptedText
            text="fieldmind"
            className={cn('font-serif lowercase tracking-tight', className)}
            encryptedClassName="text-foreground/55"
            revealedClassName="text-foreground"
            revealDelayMs={70}
            flipDelayMs={40}
            loop
            loopDelayMs={60000}
        />
    )
}