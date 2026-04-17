'use client'

import { useEffect, useState } from 'react'
import { formatDateline } from '@/lib/utils'

export default function DatelineBanner() {
  const [dateline, setDateline] = useState('')

  useEffect(() => {
    setDateline(formatDateline())
    const interval = setInterval(() => setDateline(formatDateline()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className="w-full border-b border-ink bg-paper sticky top-0 z-50"
      role="banner"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-3 flex items-center justify-between gap-4">
        {/* Masthead */}
        <a
          href="#hero"
          className="font-serif font-optical-display text-ink font-bold tracking-tight hover:text-sienna transition-colors duration-150"
          style={{
            fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
            fontVariationSettings: '"opsz" 36, "SOFT" 0',
            letterSpacing: '-0.02em',
          }}
          aria-label="dAIly — return to top"
        >
          dAIly
        </a>

        {/* Dateline */}
        <time
          className="font-mono text-label text-muted hidden sm:block"
          suppressHydrationWarning
          aria-label={`Today's date: ${dateline}`}
        >
          {dateline}
        </time>

        {/* CTA — compact */}
        <button
          type="button"
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="font-mono text-label text-paper bg-ink px-4 py-2.5 min-h-[44px] flex items-center hover:bg-sienna transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sienna"
          aria-label="Join the waitlist"
        >
          Join waitlist →
        </button>
      </div>
    </header>
  )
}
