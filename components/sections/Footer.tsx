export default function Footer() {
  return (
    <footer className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-12 border-t border-ink">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-label text-ink tracking-wide">
            dAIly &mdash; built by a solo founder in Brisbane. 2026.
          </p>
        </div>

        <a
          href="mailto:hello@daily.so"
          className="font-mono text-label text-muted hover:text-sienna transition-colors duration-150"
          aria-label="Email Jacob"
        >
          hello@daily.so
        </a>
      </div>
    </footer>
  )
}
