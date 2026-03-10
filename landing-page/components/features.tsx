import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FieldMindText } from '@/components/fieldmind-text'
import { cn } from '@/lib/utils'
import { WifiSlash, Microphone, ArrowsClockwise, Brain, ShieldCheck, ChartBar } from '@phosphor-icons/react/dist/ssr'
import { type ReactNode, type ElementType } from 'react'

export default function Features() {
    return (
        <section id="features" className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-semibold md:text-4xl">Made for places where signal is never guaranteed</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        From mines to remote sites, <FieldMindText className="text-lg" /> keeps incident reporting moving even when the network drops.
                    </p>
                </div>
                <div className="mx-auto grid gap-4 lg:grid-cols-2">
                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={WifiSlash}
                                title="Offline-First AI"
                                description="Record an incident, speak naturally, and get a first pass triage right on the device. No connection needed."
                            />
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="grid grid-cols-2 gap-3">
                                <FeaturePill label="Voice transcription" />
                                <FeaturePill label="Severity classification" />
                                <FeaturePill label="Auto-draft reports" />
                                <FeaturePill label="Compliance flagging" />
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={ArrowsClockwise}
                                title="Reliable Sync"
                                description="Everything is saved locally first. When the connection returns, PowerSync syncs changes both ways and handles conflicts in the background."
                            />
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="grid grid-cols-2 gap-3">
                                <FeaturePill label="SQLite ↔ Postgres" />
                                <FeaturePill label="Conflict resolution" />
                                <FeaturePill label="Bidirectional sync" />
                                <FeaturePill label="Sync Streams" />
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Brain}
                                title="Cloud Follow-Up"
                                description="After sync, cloud agents can review incidents again, flag urgent cases, prepare audit notes, and summarize the shift."
                            />
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="grid grid-cols-2 gap-3">
                                <FeaturePill label="Incident triage" />
                                <FeaturePill label="Auto-escalation" />
                                <FeaturePill label="Compliance audit" />
                                <FeaturePill label="Shift summaries" />
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={ChartBar}
                                title="Supervisor View"
                                description="Supervisors can see new incidents as they arrive, review escalations, download reports, and track what is happening across sites."
                            />
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="grid grid-cols-2 gap-3">
                                <FeaturePill label="Live incident feed" />
                                <FeaturePill label="Push notifications" />
                                <FeaturePill label="Audit reports" />
                                <FeaturePill label="Worker tracking" />
                            </div>
                        </CardContent>
                    </FeatureCard>

                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    children: ReactNode
    className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
    <Card className={cn('group relative h-full rounded-none shadow-zinc-950/5', className)}>
        <CardDecorator />
        {children}
    </Card>
)

const CardDecorator = () => (
    <>
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
)

interface CardHeadingProps {
    icon: ElementType
    title: string
    description: string
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-muted-foreground flex items-center gap-2">
            <Icon weight="bold" className="size-4" />
            {title}
        </span>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
    </div>
)

function FeaturePill({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center rounded-md border border-dashed bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {label}
        </span>
    )
}


