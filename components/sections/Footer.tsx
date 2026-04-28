export default function Footer() {
  return (
    <footer className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-12 border-t border-ink">
      {/* Contact row */}
      <div className="pb-8 mb-8 border-b border-rule grid sm:grid-cols-3 gap-6">
        <div>
          <p className="font-mono text-label text-ink-mid tracking-widest small-caps mb-2">Contact</p>
          <a
            href="mailto:hello@getdaily.dev"
            className="font-mono text-label text-ink hover:text-ink-mid transition-colors duration-150"
            aria-label="Email the dAIly team"
          >
            hello@getdaily.dev
          </a>
        </div>

        <div>
          <p className="font-mono text-label text-ink-mid tracking-widest small-caps mb-2">Waitlist</p>
          <a
            href="#hero"
            className="font-mono text-label text-ink hover:text-ink-mid transition-colors duration-150"
          >
            getdaily.dev
          </a>
        </div>

        <div>
          <p className="font-mono text-label text-ink-mid tracking-widest small-caps mb-2">Built by</p>
          <a
            href="https://x.com/jacobemarriott1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label text-ink hover:text-ink-mid transition-colors duration-150"
            aria-label="Jacob Marriott on X"
          >
            Jacob Marriott — Brisbane
          </a>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-label text-muted tracking-wide">
          dAIly &mdash; your life briefs you. 2026.
        </p>
        <p className="font-mono text-label text-muted">
          M1 Early Access &mdash; 500 spots
        </p>
      </div>
    </footer>
  )
}
