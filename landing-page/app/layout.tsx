import { Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: "fieldmind - Field reporting that works offline",
  description: "fieldmind helps teams log incidents offline, triage them on the device, and sync everything when a connection comes back.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(125% 125% at 50% 90%, var(--color-background) 40%, var(--color-primary) 100%)`,
              backgroundSize: '100% 100%',
            }}
          />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
