'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is this another AI thing?',
    a: 'Technically yes. Practically no. You never see a chat window. You never prompt anything. You wake up, and your day is already understood. The AI is infrastructure — the ritual is the product.',
  },
  {
    q: 'What data actually leaves my device?',
    a: "You choose. Connect only the sources you're comfortable with. By default, dAIly processes content in-memory to generate your brief — raw email bodies and message threads are never written to disk. Only the synthesised summary is retained (cached for 24 hours so your morning playback is instant, then discarded). OAuth tokens are AES-256 encrypted at rest and never exposed to the LLM layer. Local-first processing — where the brief is generated entirely on your machine — is on the roadmap.",
  },
  {
    q: 'Can I limit what gets sent to the cloud?',
    a: "Yes. Every source is opt-in. Don't want your Slack DMs in the brief? Leave it disconnected. Only want calendar and email? Connect just those. You can also configure dAIly to use metadata only — subject lines, sender names, event titles — without processing message bodies at all. Privacy-first mode is a first-class setting, not an afterthought.",
  },
  {
    q: 'Where does my data go?',
    a: "Raw emails and messages are processed in-memory and never stored. Only the final brief is cached. OAuth credentials are encrypted with AES-256 and stored in a secure vault — they're never logged, never passed to the AI, and never shared. I'm a solo founder building this for operators like me. I'd rather get this right than scale fast.",
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
      className="bg-ink border-y border-paper/10"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-32">
        {/* Section header */}
        <div className="pb-8 mb-0 flex items-end justify-between gap-4 border-b border-paper/20">
          <h2
            id="faq-heading"
            className="font-serif font-optical-headline text-section text-paper"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            A few questions.
          </h2>
          <span className="font-mono text-label text-paper/60 whitespace-nowrap hidden sm:block">
            FAQ
          </span>
        </div>

        {/* Accordion */}
        <dl className="divide-y divide-paper/15" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="faq-item py-0">
                <dt>
                  <button
                    className="faq-question w-full flex items-start justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span
                      className="font-serif text-paper"
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
                        'font-serif text-[2rem] leading-none text-paper shrink-0 transition-transform duration-300',
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
                    className="font-mono text-paper/60 leading-relaxed pr-10"
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
