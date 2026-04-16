import { cn } from '@/lib/utils'

const RITUAL_STEPS = [
  {
    time: '6:00am',
    heading: 'While you sleep.',
    body: 'Your assistant reads your inbox, calendar, Slack, and messages. It identifies what matters, who needs a response, and what you can safely ignore.',
  },
  {
    time: '6:15am',
    heading: 'You wake up.',
    body: 'Your brief plays automatically. 90 seconds. The most important three things, prioritised. No notification badge. No inbox. Just voice.',
  },
  {
    time: '6:16am',
    heading: 'You act.',
    body: 'You ask one follow-up. Approve two replies. You haven\'t opened an app. Your morning is yours — not your notifications\'.',
  },
]

export default function TheRitual() {
  return (
    <section
      id="the-ritual"
      className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32"
      aria-labelledby="ritual-heading"
    >
      {/* Section header */}
      <div className="section-rule pb-8 mb-12 flex items-end justify-between gap-4">
        <h2
          id="ritual-heading"
          className="font-serif font-optical-headline text-section text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          The 16 minutes that change the day.
        </h2>
        <span className="font-mono text-label text-muted whitespace-nowrap hidden sm:block">
          The Ritual
        </span>
      </div>

      {/* Three timestamped steps */}
      <ol
        className="grid md:grid-cols-3 gap-0"
        role="list"
        aria-label="The dAIly morning ritual"
      >
        {RITUAL_STEPS.map((step, i) => (
          <li
            key={step.time}
            className={cn(
              'py-8 md:py-0 md:px-10',
              i > 0 && 'border-t md:border-t-0 md:border-l border-rule',
              i === 0 && 'md:pr-10 md:pl-0',
              i === RITUAL_STEPS.length - 1 && 'md:pr-0',
            )}
          >
            {/* Timestamp */}
            <time
              className="font-mono text-label text-sienna tracking-widest block mb-4"
              dateTime={`06:${i === 0 ? '00' : i === 1 ? '15' : '16'}`}
            >
              {step.time}
            </time>

            {/* Step heading */}
            <h3
              className="font-serif font-optical-headline text-ink mb-3 italic"
              style={{
                fontSize: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem)',
                fontVariationSettings: '"opsz" 24',
                lineHeight: '1.25',
              }}
            >
              {step.heading}
            </h3>

            {/* Body */}
            <p className="font-serif font-optical-sm text-muted text-body leading-relaxed">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
