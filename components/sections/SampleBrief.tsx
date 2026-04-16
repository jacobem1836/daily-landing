export default function SampleBrief() {
  return (
    <section
      id="sample-brief"
      className="bg-paper-dark border-y border-rule"
      aria-labelledby="brief-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32">
        {/* Section header */}
        <div className="pb-8 mb-12 flex items-end justify-between gap-4 border-b border-ink">
          <h2
            id="brief-heading"
            className="font-serif font-optical-headline text-section text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            This is what a brief sounds like.
          </h2>
          <span className="font-mono text-label text-muted whitespace-nowrap hidden sm:block">
            Sample Brief
          </span>
        </div>

        {/* The brief — typeset as editorial pull quote / blockquote */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
          <article aria-label="Example morning briefing transcript">
            {/* Intro line — dateline style */}
            <header className="mb-6">
              <p className="font-mono text-label text-muted tracking-wider">
                Tuesday, April 15 — 6:15am
              </p>
            </header>

            <div
              className="font-serif italic text-ink space-y-5 font-optical-sm leading-relaxed"
              style={{
                fontSize: 'clamp(1.0625rem, 1vw + 0.7rem, 1.25rem)',
                fontVariationSettings: '"opsz" 14',
              }}
            >
              <p>
                Good morning. It&rsquo;s Tuesday, the 15th.{' '}
                <strong className="not-italic font-normal text-sienna">Three things matter today.</strong>
              </p>

              <p>
                First &mdash; Paul at CHOMP hasn&rsquo;t replied to your follow-up in six days.
                Based on his reply history, he&rsquo;s most responsive Tuesday mornings.
                I&rsquo;ve drafted a nudge; say{' '}
                <span
                  className="font-mono not-italic text-[0.875em] bg-sienna-pale px-1.5 py-0.5 text-ink"
                  aria-label="say send it"
                >
                  &ldquo;send it&rdquo;
                </span>{' '}
                when you&rsquo;re ready.
              </p>

              <p>
                Second &mdash; your proposal draft is due Friday. Your calendar has a
                four-and-a-half-hour deep work window from 10 to 2:30.
                I&rsquo;ve protected it.
              </p>

              <p>
                Third &mdash; Ben emailed last night about a venture idea.
                Worth your attention, but not urgent. I&rsquo;ll surface it after lunch.
              </p>

              <p>
                Two meetings today. First one&rsquo;s at 3.{' '}
                <strong className="not-italic font-normal">Your morning is yours.</strong>
              </p>
            </div>

            {/* Footer of the brief card */}
            <footer className="mt-8 pt-5 border-t border-rule">
              <p className="font-mono text-label text-muted">
                Length: 1:07 &ensp;&middot;&ensp; Items reviewed: 34 &ensp;&middot;&ensp; Actions queued: 1
              </p>
            </footer>
          </article>

          {/* Pull aside — what's happening under the hood */}
          <aside aria-label="How the brief is assembled">
            <p className="font-mono text-label text-muted small-caps tracking-wider mb-5">
              What happened while you slept
            </p>
            <ul className="space-y-3 font-mono text-small text-muted" role="list">
              {[
                'Read 34 emails. Summarised 12 requiring attention.',
                'Scanned 3 Slack channels. Surfaced 2 direct mentions.',
                'Pulled today\'s calendar. Identified conflicts.',
                'Checked task list. 1 deadline approaching.',
                'Generated draft reply for Paul. Pending your approval.',
                'Total briefing: 90 seconds.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-sienna mt-px shrink-0" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
