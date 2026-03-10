"use client"
import { cn } from '../lib/utils'
import { FarmIcon } from '@phosphor-icons/react'
import { FieldMindText } from '@/components/fieldmind-text'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <span className={cn('flex items-center gap-2', className)}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <FarmIcon weight="fill" className="size-5 text-primary-foreground" />
            </span>
            <FieldMindText className="text-lg font-medium" />
        </span>
    )
}

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <span className={cn('flex size-8 items-center justify-center rounded-lg bg-primary', className)}>
            <FarmIcon weight="fill" className="size-5 text-primary-foreground" />
        </span>
    )
}
