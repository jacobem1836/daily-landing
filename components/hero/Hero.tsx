'use client'

import { motion, type Variants } from 'framer-motion'
import AudioPlayer from './AudioPlayer'
import EmailCapture from './EmailCapture'

interface HeroProps {
  variant: 'a' | 'b'
}

const HEADLINES = {
  a: 'Your life briefs you.',
  b: 'Stop checking seven apps before breakfast.',
}

export default function Hero({ variant }: HeroProps) {
  const headline = HEADLINES[variant]

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const stagger: { container: Variants; item: Variants } = {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    },
    item: {
      hidden:  { opacity: 0, y: 24 },
      visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease },
      },
    },
  }

  return (
    <section
      id="hero"
      className="grain-overlay min-h-[90vh] flex flex-col justify-between pt-28 pb-16 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-screen-xl mx-auto"
      aria-labelledby="hero-headline"
    >
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start"
      >
        {/* Left column — Headline and sub */}
        <motion.div variants={stagger.item} className="pr-0 lg:pr-12 lg:col-rule pb-12 lg:pb-0">
          {/* Vol / Edition label — newspaper convention */}
          <p className="font-mono text-label text-muted small-caps mb-6 tracking-wider">
            Morning Intelligence — Pre-Launch
          </p>

          <h1
            id="hero-headline"
            className="font-serif font-optical-display text-display text-ink mb-6 italic"
            style={{ fontVariationSettings: '"opsz" 72, "SOFT" 0' }}
          >
            {headline}
          </h1>

          <div
            className="w-12 h-px bg-sienna mb-6"
            role="presentation"
            aria-hidden="true"
          />

          <p className="font-serif font-optical-sm text-pull text-muted leading-relaxed max-w-md">
            A 90-second executive briefing, spoken to you every morning. Your email, calendar, Slack,
            news, and messages &mdash; synthesised, prioritised, and read to you before you open a
            single app. Fully customisable &mdash; choose your sources, set your brief time, tune
            what matters.
          </p>

          {/* Source citations — newspaper convention */}
          <p className="mt-8 font-mono text-label text-muted">
            Gmail · Calendar · Slack · News · Messages
          </p>
        </motion.div>

        {/* Column rule */}
        <div className="hidden lg:block bg-rule" aria-hidden="true" />

        {/* Right column — Audio + email. Offset on desktop so the player lands below
            the headline's first line, creating a visual lead from left→right↓ */}
        <motion.div variants={stagger.item} className="lg:pl-12 pt-12 lg:pt-16 flex flex-col gap-8">
          <div>
            <p className="font-mono text-label text-muted small-caps mb-4 tracking-wider">
              Press play &darr;
            </p>
            <AudioPlayer src="/sample-brief.mp3" />
          </div>

          <div id="waitlist" className="section-rule-muted pt-8">
            <EmailCapture variant={variant} />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom section tag — newspaper footer convention */}
      <motion.div
        variants={stagger.item}
        initial="hidden"
        animate="visible"
        className="section-rule pt-4 mt-12 lg:mt-16 flex items-center justify-between"
      >
        <span className="font-mono text-label text-muted">Built for operators. Brisbane, 2026.</span>
        <span className="font-mono text-label text-muted hidden sm:block">M1 — Early Access</span>
      </motion.div>
    </section>
  )
}
