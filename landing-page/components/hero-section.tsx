"use client"
import React from 'react'
import Link from 'next/link'
import type { Variants } from 'motion/react'
import { Button } from '@/components/ui/button'
import { FieldMindText } from '@/components/fieldmind-text'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import TechnologyCloud from './technology-cloud'
import { WifiSlashIcon, LightningIcon, ArrowsClockwiseIcon } from '@phosphor-icons/react'

const transitionVariants: { item: Variants } = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="relative overflow-hidden">
                <section>
                    <div className="relative pt-24">
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="sm:mx-auto lg:mx-auto lg:mt-0 text-center">
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.1,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mb-4 flex items-center justify-center">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
                                        <WifiSlashIcon weight="bold" className="size-4" />
                                        Works fully offline. Still useful when the signal drops.
                                    </span>
                                </AnimatedGroup>

                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mt-8 mx-auto max-w-3xl text-balance text-5xl font-medium md:text-6xl lg:mt-16">
                                    Field reporting that still works when the internet doesn&apos;t
                                </TextEffect>
                                <p className="mt-8 mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                                    <FieldMindText className="text-lg" /> helps crews record incidents by voice, get a quick on-device triage, and sync everything once they are back online. It is built for places where coverage comes and goes.
                                </p>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex items-center justify-center gap-2">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border border-dashed p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-5 text-base">
                                            <Link href="#features">
                                                <span className="text-nowrap">Explore Features</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-base">
                                        <Link href="#how-it-works">
                                            <span className="text-nowrap">See How It Works</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-12 px-2 sm:mt-16 md:mt-20">
                                <div className="mx-auto max-w-5xl">
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <HeroStat
                                            icon={<WifiSlashIcon weight="bold" className="size-5 text-primary" />}
                                            value="100%"
                                            label="Offline capable"
                                        />
                                        <HeroStat
                                            icon={<LightningIcon weight="bold" className="size-5 text-primary" />}
                                            value="<2s"
                                            label="On-device AI triage"
                                        />
                                        <HeroStat
                                            icon={<ArrowsClockwiseIcon weight="bold" className="size-5 text-primary" />}
                                            value="0"
                                            label="Data loss with PowerSync"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <TechnologyCloud />
            </main>
        </>
    )
}

function HeroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="group relative flex items-center gap-4 rounded-none border border-dashed bg-card p-5 shadow-zinc-950/5">
            <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
            <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
            <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
            <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        </div>
    )
}
