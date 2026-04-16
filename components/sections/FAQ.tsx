'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is this another AI thing?',
    a: 'Technically yes. Practically no. You never see a chat window. You never prompt anything. You wake up, and your day is already understood. The AI is infrastructure — the ritual is the product.',
  },
  {
    q: 'Where does my data go?',
    a: "Your raw emails and messages never leave encrypted storage. Only summaries are retained. OAuth tokens are AES-256 encrypted at rest. I'm a solo founder — I'd rather build this right than scale fast.",
  },
  {
    q: 'When can I use it?',
    a: 'First 500 early-access users in mid-2026. Founding partners — the first 100 — shape the product and get lifetime access. Join the waitlist and reply to the confirmation email if you want to be one of them.',
  },
  {
    q: 'Why voice?',
    a: "Because you already have eyes full of screens. A brief you listen to while making coffee is categorically different from one you read between notifications. Your morning deserves something more deliberate.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="bg-paper-dark border-y border-rule"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32">
        {/* Section header */}
        <div className="pb-8 mb-0 flex items-end justify-between gap-4 border-b border-ink">
          <h2
            id="faq-heading"
            className="font-serif font-optical-headline text-section text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            A few questions.
          </h2>
          <span className="font-mono text-label text-muted whitespace-nowrap hidden sm:block">
            FAQ
          </span>
        </div>

        {/* Accordion */}
        <dl className="divide-y divide-rule" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="faq-item py-0">
                <dt>
                  <button
                    className="faq-question w-full flex items-start justify-between gap-6 py-6 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span
                      className="font-serif text-ink"
                      style={{
                        fontSize: 'clamp(1rem, 0.9rem + 0.4vw, 1.1875rem)',
                        fontVariationSettings: '"opsz" 14',
                        lineHeight: '1.4',
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-label text-muted shrink-0 mt-1 transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={cn(
                    'overflow-hidden transition-all duration-400',
                    isOpen ? 'max-h-96 pb-6' : 'max-h-0',
                  )}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <p
                    className="font-serif font-optical-sm text-muted leading-relaxed pr-10"
                    style={{ fontSize: 'clamp(0.9375rem, 0.85rem + 0.3vw, 1.0625rem)' }}
                  >
                    {faq.a}
                  </p>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
