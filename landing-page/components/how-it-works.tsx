import { WifiSlash, ArrowsClockwise, CloudArrowUp, Monitor } from '@phosphor-icons/react/dist/ssr'
import type { ElementType } from 'react'

const steps = [
    {
        phase: '01',
        icon: WifiSlash,
        title: 'Offline, no signal',
        description: 'A worker records an incident by voice, photo, or text. The app transcribes it, tags severity, and saves everything on the device.',
        details: ['Whisper.rn transcribes voice', 'LLM classifies severity', 'Auto-drafts report', 'Compliance keywords flagged'],
    },
    {
        phase: '02',
        icon: ArrowsClockwise,
        title: 'Sync when connection returns',
        description: 'As soon as the device reconnects, PowerSync sends local changes to Supabase and pulls down updates from the cloud. Conflicts are handled automatically.',
        details: ['Auto-detect connectivity', 'Bidirectional sync', 'Conflict resolution', 'Queue management'],
    },
    {
        phase: '03',
        icon: CloudArrowUp,
        title: 'Cloud review',
        description: 'After sync, Mastra agents take a second look, flag urgent issues, prepare compliance notes, and summarize the shift.',
        details: ['Incident re-classification', 'Auto-escalation workflow', 'Compliance audit reports', 'Shift summary generation'],
    },
    {
        phase: '04',
        icon: Monitor,
        title: 'Supervisor dashboard',
        description: 'Supervisors see incidents as soon as they arrive, review escalations, download reports, and follow activity across teams.',
        details: ['Real-time incident feed', 'Escalation approval', 'Downloadable reports', 'Worker status map'],
    },
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-semibold md:text-4xl">From offline incident to supervisor dashboard</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Four steps, one flow. No re-entering data and no chasing missing reports.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 hidden h-full w-px border-l border-dashed md:block" />

                    <div className="space-y-12 md:space-y-16">
                        {steps.map((step) => (
                            <PhaseStep key={step.phase} {...step} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function PhaseStep({
    phase,
    icon: Icon,
    title,
    description,
    details,
}: {
    phase: string
    icon: ElementType
    title: string
    description: string
    details: string[]
}) {
    return (
        <div className="relative md:pl-20">
            <div className="absolute left-0 top-0 z-10 hidden md:block">
                <div className="flex size-16 items-center justify-center rounded-none border border-dashed bg-background shadow-zinc-950/5">
                    <Icon weight="bold" className="size-6 text-primary" />
                </div>
            </div>

            <div className="group relative rounded-none border border-dashed bg-card p-6 shadow-zinc-950/5 md:p-8">
                <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
                <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
                <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
                <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>

                <div className="mb-4 flex items-center gap-3 md:hidden">
                    <div className="flex size-10 items-center justify-center rounded-none border border-dashed bg-background">
                        <Icon weight="bold" className="size-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phase {phase}</span>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phase {phase}</span>
                </div>

                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {details.map((detail) => (
                        <span
                            key={detail}
                            className="inline-flex items-center rounded-md border border-dashed bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            {detail}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
