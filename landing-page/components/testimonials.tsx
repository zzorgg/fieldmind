import { FieldMindText } from '@/components/fieldmind-text'
import { Lightning } from '@phosphor-icons/react/dist/ssr'

export default function TestimonialsSection() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <blockquote>
                        <p className="text-lg font-semibold sm:text-xl md:text-3xl">
                            &ldquo;Most tools stop being useful the second the connection drops. <FieldMindText className="text-lg sm:text-xl md:text-3xl" /> was built for teams that do not have that luxury.&rdquo;
                        </p>

                        <div className="mt-12 flex items-center justify-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                                <Lightning weight="fill" className="size-5 text-primary-foreground" />
                            </div>
                            <div className="space-y-0.5 text-left">
                                <cite className="font-medium not-italic"><FieldMindText className="text-base" /> team</cite>
                                <span className="text-muted-foreground block text-sm">PowerSync AI Hackathon 2026</span>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
