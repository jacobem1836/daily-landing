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
                Wednesday, May 8 — 6:15am
              </p>
            </header>

            <div
              className="font-reading italic text-ink space-y-5 leading-relaxed"
              style={{
                fontSize: 'clamp(1.0625rem, 1vw + 0.7rem, 1.25rem)',
              }}
            >
              <p>
                Good morning. It&rsquo;s Wednesday, the 8th.{' '}
                <strong className="not-italic font-normal text-sienna">Four things matter today.</strong>
              </p>

              <p>
                First &mdash; your lead investor hasn&rsquo;t responded to Monday&rsquo;s term sheet follow-up.
                They tend to reply Wednesday mornings.
                I&rsquo;ve drafted a short note; say &ldquo;send it&rdquo; when you&rsquo;re ready.
              </p>

              <p>
                Second &mdash; your engineering channel had 31 messages overnight. One thread needs your
                input: the API rate limits are blocking the demo build. Your team is waiting on a call
                from you before they proceed.
              </p>

              <p>
                Third &mdash; Northfield&rsquo;s renewal is in eleven days. Their last three replies have
                been shorter than usual. I&rsquo;ve drafted a personal note &mdash; worth sending before
                this afternoon.
              </p>

              <p>
                Fourth &mdash; one story in the news: a major bank announced an AI chief-of-staff pilot
                for executive teams. Relevant to your positioning. I&rsquo;ve saved it to your reading list.
              </p>

              <p>
                Two external meetings today. First is at 10.{' '}
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
                'Read 34 emails. Summarised 9 requiring attention.',
                'Scanned 5 Slack channels. Surfaced 1 urgent thread, 3 direct mentions.',
                'Monitored 12 news sources. Flagged 1 story to reading list.',
                'Pulled today\'s calendar. Identified conflicts.',
                'Generated 2 draft replies. Pending your approval.',
                'Briefing complete.',
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
