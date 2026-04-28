const CONTROLS = [
  {
    label: 'Sources',
    detail: 'Gmail, Calendar, Slack, news feeds, Messages, and more — connect what you want, ignore the rest.',
  },
  {
    label: 'Length',
    detail: 'A focused sprint or a full read-through. Set a target length and the brief adapts.',
  },
  {
    label: 'Schedule',
    detail: 'Once at dawn. Midday check-in. Evening wind-down. Run one or all three.',
  },
  {
    label: 'Priorities',
    detail: 'Weight urgent emails heavier. Lead with your calendar. Bury low-signal newsletters.',
  },
  {
    label: 'Tone',
    detail: 'Brisk and executive, or conversational and measured. Yours to dial in.',
  },
  {
    label: 'Depth',
    detail: 'Headlines and decisions only, or full context on each thread. Per-source granularity.',
  },
]

export default function Customizable() {
  return (
    <section
      id="customizable"
      className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32"
      aria-labelledby="customizable-heading"
    >
      {/* Section header */}
      <div className="section-rule pb-8 mb-12">
        <h2
          id="customizable-heading"
          className="font-serif font-optical-headline text-section text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Yours to configure.
        </h2>
      </div>

      {/* Two-column editorial split */}
      <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-12">

        {/* Left — intro */}
        <div className="flex flex-col gap-6 lg:pr-8">
          <p
            className="font-serif italic text-ink leading-snug"
            style={{
              fontSize: 'clamp(1.25rem, 1vw + 0.9rem, 1.875rem)',
              fontVariationSettings: '"opsz" 24',
            }}
          >
            No two mornings are the same. Your brief shouldn&rsquo;t be either.
          </p>
          <p
            className="font-mono text-muted leading-relaxed"
            style={{ fontSize: 'clamp(0.9375rem, 0.85rem + 0.3vw, 1.0625rem)' }}
          >
            dAIly is built to fit your workflow, not replace it with someone else&rsquo;s. Every
            dimension of the briefing is a lever you control — from which apps you connect to how
            long the brief runs. Set it once and forget it, or adjust it as your life changes.
          </p>
          <p
            className="font-mono text-label text-ink-mid tracking-widest small-caps mt-2"
          >
            Everything on the roadmap. Nothing locked in.
          </p>
        </div>

        {/* Right — controls grid */}
        <div className="grid sm:grid-cols-2 gap-0 border-t border-rule lg:border-t-0 lg:border-l border-rule lg:pl-12">
          {CONTROLS.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-2
                ${i < 2 ? 'pt-0 pb-8' : 'py-6'}
                ${i % 2 === 1 ? 'sm:border-l sm:pl-6 border-rule' : ''}
                ${i >= 2 ? 'border-t border-rule' : ''}
                ${i % 2 === 0 && i >= 2 ? 'sm:pr-6' : ''}
              `}
            >
              <p className="font-mono text-label text-ink-mid tracking-widest small-caps">
                {item.label}
              </p>
              <p
                className="font-mono text-muted leading-relaxed"
                style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)' }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
