import { cn } from '@/lib/utils'

const PERSONAS = [
  {
    quote:
      'For the founder who wakes up at 5:47am and immediately checks Slack. This is what that habit was always reaching for.',
    label: 'Solo founders',
    detail: 'You don\'t have a chief of staff. Now you have something better.',
  },
  {
    quote:
      'For the operator running three companies who needs one signal, not thirty notifications across four platforms.',
    label: 'Operators',
    detail: 'Context-switching is expensive. A brief is cheap.',
  },
  {
    quote:
      'For anyone who\'s realised inbox zero was never the point — the point was knowing what matters before it becomes urgent.',
    label: 'Chief-of-staff archetypes',
    detail: 'You already process this manually every morning. This makes it automatic.',
  },
]

export default function WhoItsFor() {
  return (
    <section
      id="who-its-for"
      className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32"
      aria-labelledby="personas-heading"
    >
      {/* Section header */}
      <div className="section-rule pb-8 mb-12">
        <h2
          id="personas-heading"
          className="font-serif font-optical-headline text-section text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Who it&rsquo;s for.
        </h2>
      </div>

      {/* Full-width stacked personas with editorial blockquote layout */}
      <div className="space-y-0">
        {PERSONAS.map((p, i) => (
          <article
            key={p.label}
            className={cn(
              'py-12 px-0',
              i > 0 && 'border-t border-rule',
            )}
            aria-label={`Persona: ${p.label}`}
          >
            {/* Label */}
            <p className="font-mono text-label text-ink-mid tracking-widest small-caps mb-6">
              {p.label}
            </p>

            {/* Pull quote — editorial blockquote */}
            <blockquote className="mb-6">
              <p
                className="font-serif italic text-ink leading-relaxed"
                style={{
                  fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.4375rem)',
                  fontVariationSettings: '"opsz" 18',
                }}
              >
                &ldquo;{p.quote}&rdquo;
              </p>
            </blockquote>

            {/* Secondary detail line */}
            <p className="font-mono text-muted text-small leading-relaxed">
              {p.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
