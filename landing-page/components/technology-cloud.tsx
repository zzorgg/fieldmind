import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const technologyLogos = [
    {
        name: 'PowerSync',
        lightSrc: '/technology/powersync/powersync-dark.svg',
        darkSrc: '/technology/powersync/powersync-light.svg',
        width: 144,
        height: 32,
    },
    {
        name: 'Supabase',
        lightSrc: '/technology/supabase/supabase-dark.svg',
        darkSrc: '/technology/supabase/supabase-light.svg',
        width: 148,
        height: 32,
    },
    {
        name: 'Mastra',
        lightSrc: '/technology/mastra/mastra-dark.svg',
        darkSrc: '/technology/mastra/mastra-light.svg',
        width: 132,
        height: 32,
    },
    {
        name: 'Expo',
        lightSrc: '/technology/expo/expo-dark.svg',
        darkSrc: '/technology/expo/expo-light.svg',
        width: 118,
        height: 32,
    },
    {
        name: 'Rust',
        lightSrc: '/technology/rust/rust-dark.svg',
        darkSrc: '/technology/rust/rust-light.svg',
        width: 118,
        height: 32,
    },
    {
        name: 'Next.js',
        lightSrc: '/technology/nextjs/nextjs-light.svg',
        darkSrc: '/technology/nextjs/nextjs-dark.svg',
        width: 124,
        height: 32,
    },
    {
        name: 'shadcn/ui',
        lightSrc: '/technology/shadcn/shadcn-ui-dark.svg',
        darkSrc: '/technology/shadcn/shadcn-ui-light.svg',
        width: 144,
        height: 32,
    },
]

export default function TechnologyCloud() {
    return (
        <section id="tech-stack" className="overflow-hidden bg-transparent py-16 md:py-24">
            <div className="group relative mx-auto max-w-5xl px-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    <div className="md:max-w-52 md:border-r md:border-dashed md:pr-6">
                        <p className="text-center text-sm font-medium text-muted-foreground md:text-end">
                            Built with tools teams already trust
                        </p>
                    </div>
                    <div className="relative w-full py-6 md:w-[calc(100%-13rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {technologyLogos.map((logo) => (
                                <TechnologyLogo key={logo.name} {...logo} />
                            ))}
                        </InfiniteSlider>

                        <div
                            aria-hidden
                            className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                        />
                        <div
                            aria-hidden
                            className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

type TechnologyLogoProps = {
    name: string
    src?: string
    lightSrc?: string
    darkSrc?: string
    width: number
    height: number
}

function TechnologyLogo({ name, src, lightSrc, darkSrc, width, height }: TechnologyLogoProps) {
    return (
        <div className="flex h-12 items-center justify-center transition duration-200">
            {src ? (
                <Image src={src} alt={name} width={width} height={height} className="h-8 w-auto" />
            ) : (
                <>
                    <Image
                        src={lightSrc!}
                        alt={name}
                        width={width}
                        height={height}
                        className="h-8 w-auto dark:hidden"
                    />
                    <Image
                        src={darkSrc!}
                        alt={name}
                        width={width}
                        height={height}
                        className="hidden h-8 w-auto dark:block"
                    />
                </>
            )}
        </div>
    )
}
