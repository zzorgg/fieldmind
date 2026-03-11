"use client"
import { cn } from '@/lib/utils'
import { FarmIcon } from '@phosphor-icons/react'

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <span className={cn('flex size-8 items-center justify-center rounded-lg bg-primary', className)}>
            <FarmIcon weight="fill" className="size-5 text-primary-foreground" />
        </span>
    )
}
