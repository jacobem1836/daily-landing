# Design Concepts — dAIly Landing Page

Three directions considered. One built.

---

## Concept A — "Morning Editorial" ✓ CHOSEN

**Aesthetic:** Newspaper front-page. Serif-heavy. Dateline. Column rules. Pull quotes.

**Palette:**
- Paper: `oklch(97.2% 0.011 85)` — quality newsprint warmth
- Ink: `oklch(16% 0.018 55)` — near-black with brown undertone
- Accent: `oklch(52% 0.155 48)` — burnt sienna
- Muted: `oklch(50% 0.018 65)`
- Rule: `oklch(81% 0.012 80)` — column dividers

**Typography:** Fraunces (variable serif, `opsz` axis exploited at 72 for display, 14 for body) + JetBrains Mono for timestamps, metadata, and UI chrome.

**Why chosen:**
1. **Most distinctive for the target user.** Founders who read Stratechery and use Superhuman respond to editorial aesthetics — they read *a lot*. This positions dAIly in the same visual register as quality publications they already respect.
2. **Most coherent with "executive briefing."** A newspaper *is* a briefing. The format makes the metaphor tangible — not described, demonstrated.
3. **Concept B is everywhere.** Every AI voice startup in 2025 shipped a dark cinematic reveal. The differentiation value of Concept B is near zero. Concept A is genuinely rare in this category.
4. **Grain + column rules = tactile.** The grain overlay (from Concept C) adds the analog warmth without the kitsch. Editorial structure does the heavy lifting.

**Influence references (mental):**
- The Economist (section labels, column rules, pull quotes)
- Superhuman's original pre-launch page (authority through restraint)
- Revue / Substack (editorial serif + mono pairing)
- Linear's landing pages (negative space, confident typography)

---

## Concept B — "Ambient Voice" (rejected)

**Aesthetic:** Dark, cinematic. Full-bleed animated waveform. Apple-tier restraint.

**Why rejected:**
1. **Zero category differentiation.** Notion AI, Claude, Perplexity, Otter.ai, and a dozen others have shipped this exact visual language. You'd be the fifteenth dark/teal/waveform AI page.
2. **Anti-ritual.** The brief says the product should "feel like a calm morning ritual." Dark cinematic feels like a product announcement, not a morning ritual.
3. **iOS Safari risk.** Full-bleed canvas animations have a history of performance issues on mobile Safari — exactly where the target user will land.
4. **Adaptation note:** The provided `sonic-waveform.tsx` component uses this aesthetic. It's been preserved but fully rethemed in `components/ui/sonic-waveform.tsx` — ink bars on paper instead of teal lines on black. The canvas architecture is retained because it's technically sound.

---

## Concept C — "Radio Hour" (partially merged)

**Aesthetic:** Analog. Grain texture. Warm paper. Radio/broadcast iconography. Editorial serif + typewriter mono.

**Why not chosen as primary:**
1. **Risk of kitsch.** Radio/broadcast iconography is *extremely* easy to get wrong — one wrong icon and it reads as a podcast app or a retro pastiche, not a premium executive tool.
2. **Typography overlap.** The Fraunces + JetBrains Mono pairing already covers the editorial serif + mono requirement. Adding broadcast elements on top is redundant.
3. **The good parts were merged.** Concept A adopted:
   - Grain overlay texture (CSS SVG filter, subtle opacity)
   - Warm paper palette (same temperature as C)
   - JetBrains Mono for the "typewriter" feel on metadata
   - The "ambient" quality in motion (slow idle waveform, subtle timing)

---

## What We're Not Doing

- **No purple/blue gradient.** The gradient is the most common signal that a page was scaffolded from a template.
- **No hero blob.** The glassmorphism blob era is over. Warm flat surfaces with column rules are more distinctive now.
- **No testimonials.** We have none. Leaving the space for what we actually have — the sample brief — is more credible.
- **No feature icons.** Every SaaS page has a 3-column icon grid explaining features. The ritual section instead shows *what happens*, not what features exist.
- **No chatbot widget.** The product is about reducing screen interaction, not adding more of it.
