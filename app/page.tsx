import { type ReadonlyURLSearchParams } from 'next/navigation'
import { cookies } from 'next/headers'
import DatelineBanner from '@/components/DatelineBanner'
import Hero from '@/components/hero/Hero'
import TheRitual from '@/components/sections/TheRitual'
import SampleBrief from '@/components/sections/SampleBrief'
import WhoItsFor from '@/components/sections/WhoItsFor'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'

interface PageProps {
  searchParams: Promise<{ v?: string }>
}

/**
 * A/B variant resolution order:
 * 1. ?v=a or ?v=b query param (explicit)
 * 2. Persisted cookie from a previous visit (sticky)
 * 3. Random 50/50 split — written to cookie so UX is consistent
 *
 * Variant A: "Your life briefs you." (executive, confident)
 * Variant B: "Stop checking seven apps before breakfast." (pain-led)
 */
async function resolveVariant(sp: { v?: string }): Promise<'a' | 'b'> {
  // Explicit query param overrides everything
  if (sp.v === 'a') return 'a'
  if (sp.v === 'b') return 'b'

  // Check for persisted cookie (sticky assignment)
  const cookieStore = await cookies()
  const persisted   = cookieStore.get('daily_variant')?.value
  if (persisted === 'a' || persisted === 'b') return persisted

  // 50/50 random assignment — cookie is set in the response
  return Math.random() < 0.5 ? 'a' : 'b'
}

export default async function Page({ searchParams }: PageProps) {
  const sp      = await searchParams
  const variant = await resolveVariant(sp)

  return (
    <>
      <DatelineBanner />

      <main id="main-content">
        {/* ── 1. Hero ── */}
        <Hero variant={variant} />

        {/* ── Section divider ── */}
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <hr className="border-rule" />
        </div>

        {/* ── 2. The Ritual ── */}
        <TheRitual />

        {/* ── 3. A Sample Brief ── */}
        <SampleBrief />

        {/* ── 4. Who It's For ── */}
        <WhoItsFor />

        {/* ── 5. FAQ ── */}
        <FAQ />
      </main>

      {/* ── 6. Footer ── */}
      <Footer />
    </>
  )
}
