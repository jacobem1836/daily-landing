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
      <div className="section-rule pb-8 mb-12 flex items-end justify-between gap-4">
        <h2
          id="personas-heading"
          className="font-serif font-optical-headline text-section text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Who it&rsquo;s for.
        </h2>
        <span className="font-mono text-label text-muted whitespace-nowrap hidden sm:block">
          Audience
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-0">
        {PERSONAS.map((p, i) => (
          <article
            key={p.label}
            className={
              `py-8 md:py-0 md:px-10 flex flex-col gap-5
              ${i > 0 ? 'border-t md:border-t-0 md:border-l border-rule' : 'md:pr-10 md:pl-0'}
              ${i === PERSONAS.length - 1 ? 'md:pr-0' : ''}`
            }
            aria-label={`Persona: ${p.label}`}
          >
            {/* Label */}
            <p className="font-mono text-label text-sienna tracking-widest small-caps">
              {p.label}
            </p>

            {/* Pull quote */}
            <blockquote>
              <p
                className="font-serif italic text-ink leading-snug"
                style={{
                  fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.1875rem)',
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                &ldquo;{p.quote}&rdquo;
              </p>
            </blockquote>

            {/* Secondary line */}
            <p className="font-serif font-optical-sm text-muted text-small leading-relaxed mt-auto">
              {p.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
