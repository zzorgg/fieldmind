'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'
import { cn } from '@/lib/utils'

const CORE_URL = process.env.NEXT_PUBLIC_CORE_URL!

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)

    const navLinkClassName = 'text-sm text-muted-foreground transition-colors hover:text-foreground'

    return (
        <header>
            <nav
                className="fixed left-0 top-0 z-20 w-full border-b border-border/50 bg-background/85 backdrop-blur-3xl">
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <Logo />
                        </Link>

                        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center sm:flex">
                            <Link href="/contact" className={navLinkClassName}>
                                Contact
                            </Link>
                        </div>

                        <div className="hidden items-center gap-3 sm:flex">
                            <ThemeToggle />
                            <Button asChild size="lg">
                                <Link href={`${CORE_URL}/sign-up`}>
                                    <span>Get Started</span>
                                </Link>
                            </Button>
                        </div>

                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 block cursor-pointer p-2.5 sm:hidden">
                            <ListIcon className={cn('size-6 duration-200', menuState && 'rotate-180 scale-0 opacity-0')} />
                            <XIcon className={cn('absolute inset-0 m-auto size-6 duration-200', !menuState && '-rotate-180 scale-0 opacity-0')} />
                        </button>

                        {menuState && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border bg-background p-4 shadow-lg sm:hidden">
                                <div className="flex flex-col gap-3">
                                    <ThemeToggle />
                                    <Button asChild size="sm" variant="ghost" className="w-full">
                                        <Link href="/contact" onClick={() => setMenuState(false)}>Contact</Link>
                                    </Button>
                                    <Button asChild size="sm" variant="ghost" className="w-full">
                                        <Link href={`${CORE_URL}/login`} onClick={() => setMenuState(false)}>Log In</Link>
                                    </Button>
                                    <Button asChild size="sm" className="w-full">
                                        <Link href={`${CORE_URL}/sign-up`} onClick={() => setMenuState(false)}>Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
