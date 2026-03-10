'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/hooks/use-auth-store'

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [isSigningOut, setIsSigningOut] = React.useState(false)
    const router = useRouter()
    const loading = useAuthStore((state) => state.loading)
    const user = useAuthStore((state) => state.user)
    const signOut = useAuthStore((state) => state.signOut)

    const { scrollYProgress } = useScroll()
    const displayName = user?.user_metadata?.user_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Signed in'

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    async function handleSignOut() {
        setIsSigningOut(true)
        await signOut()
        setMenuState(false)
        router.replace('/login')
        setIsSigningOut(false)
    }

    return (
        <header>
            <nav
                className={cn('fixed z-20 w-full border-b border-white/20 bg-transparent transition-colors duration-150', scrolled && 'border-border bg-background/85 backdrop-blur-3xl')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <Logo />
                        </Link>

                        <div className="hidden items-center gap-3 sm:flex">
                            <ThemeToggle />
                            {!loading && user ? (
                                <>
                                    <div className="hidden items-center rounded-full border border-dashed bg-background/80 px-3 py-1 text-xs text-muted-foreground lg:flex">
                                        <span className="max-w-32 truncate">{displayName}</span>
                                    </div>
                                    <Button asChild variant="ghost" size="lg">
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <Button type="button" variant="outline" size="lg" onClick={handleSignOut} disabled={isSigningOut}>
                                        <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button asChild size="lg">
                                        <Link href="/sign-up">
                                            <span>Get Started</span>
                                        </Link>
                                    </Button>
                                </>
                            )}
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
                                    {!loading && user ? (
                                        <>
                                            <div className="rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground">
                                                <p className="truncate font-medium text-foreground">{displayName}</p>
                                                <p className="truncate text-xs">{user.email}</p>
                                            </div>
                                            <Button asChild size="sm" variant="ghost" className="w-full">
                                                <Link href="/dashboard" onClick={() => setMenuState(false)}>Dashboard</Link>
                                            </Button>
                                            <Button type="button" size="sm" variant="outline" className="w-full" onClick={handleSignOut} disabled={isSigningOut}>
                                                {isSigningOut ? 'Signing out...' : 'Sign Out'}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild size="sm" variant="ghost" className="w-full">
                                                <Link href="/login" onClick={() => setMenuState(false)}>Log In</Link>
                                            </Button>
                                            <Button asChild size="sm" className="w-full">
                                                <Link href="/sign-up" onClick={() => setMenuState(false)}>Get Started</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
