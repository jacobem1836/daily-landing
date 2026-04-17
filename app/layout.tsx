import type { Metadata, Viewport } from 'next'
import { Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  // Variable font — expose weight, optical size, and softness axes
  axes: ['opsz', 'SOFT', 'WONK'],
  weight: 'variable',
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

export const viewport: Viewport = {
  themeColor: '#f7f2ea',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://getdaily.dev'),
  title: 'dAIly — Your life briefs you.',
  description:
    'A 90-second executive briefing, spoken to you every morning. Your email, calendar, Slack, and messages — synthesised, prioritised, and read to you before you open a single app.',
  openGraph: {
    title: 'dAIly — Your life briefs you.',
    description:
      'A 90-second executive briefing, spoken to you every morning. Built for operators.',
    type: 'website',
    locale: 'en_AU',
    siteName: 'dAIly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dAIly — Your life briefs you.',
    description:
      'A 90-second executive briefing, spoken to you every morning. Built for operators.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
