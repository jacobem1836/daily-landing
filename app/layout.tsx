import type { Metadata, Viewport } from 'next'
import { Fraunces, DM_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
  weight: 'variable',
  style: ['normal', 'italic'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})


export const viewport: Viewport = {
  themeColor: '#f0ebe3',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://getdaily.dev'),
  title: 'dAIly — Your life briefs you.',
  description:
    'A morning briefing, spoken to you before you open a single app. Your email, calendar, Slack, messages, and more — synthesised, prioritised, and delivered as voice.',
  openGraph: {
    title: 'dAIly — Your life briefs you.',
    description:
      'A morning briefing, spoken to you before you open a single app. Built for operators.',
    type: 'website',
    locale: 'en_AU',
    siteName: 'dAIly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dAIly — Your life briefs you.',
    description:
      'A morning briefing, spoken to you before you open a single app. Built for operators.',
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
    <html lang="en" className={`${fraunces.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
