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
      className="grain-overlay min-h-[90vh] flex flex-col pt-28 pb-16 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-screen-xl mx-auto"
      aria-labelledby="hero-headline"
    >
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-12"
      >
        {/* Headline — full width, visual anchor */}
        <motion.div variants={stagger.item}>
          <h1
            id="hero-headline"
            className="font-serif font-optical-display text-ink italic"
            style={{
              fontSize: 'clamp(3.5rem, 3rem + 5vw, 7rem)',
              lineHeight: 1.05,
              fontVariationSettings: '"opsz" 72, "SOFT" 0',
            }}
          >
            {headline}
          </h1>
        </motion.div>

        {/* Below the headline — two columns on desktop, stacked on mobile */}
        <motion.div
          variants={stagger.item}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Left — body copy */}
          <div>
            <div
              className="w-12 h-px bg-ink mb-6"
              role="presentation"
              aria-hidden="true"
            />
            <p className="font-mono text-pull text-muted leading-relaxed max-w-md">
              Your email, calendar, Slack, news, messages, and more &mdash; synthesised,
              prioritised, and read to you before you open a single app. Fully
              customisable &mdash; choose your sources, set your length, tune what matters.
            </p>
          </div>

          {/* Right — audio player + email capture */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-label text-muted small-caps mb-4 tracking-wider">
                Press play &darr;
              </p>
              <AudioPlayer src="/sample-brief.mp3" />
            </div>

            <div id="waitlist" className="section-rule-muted pt-8" style={{ scrollMarginTop: '5rem' }}>
              <EmailCapture variant={variant} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
