# dAIly Landing Page

Pre-launch waitlist page for dAIly — a voice-first AI morning briefing assistant.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 3** with oklch design tokens
- **Framer Motion 12** for scroll and entrance animations
- **Web Audio API** for real-time waveform visualisation
- **Resend** for waitlist confirmation emails

## Quick Start

```bash
cd landing
npm install          # or: pnpm install / bun install
cp .env.example .env.local
# fill in env vars (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Resend API key — https://resend.com
RESEND_API_KEY=re_...

# Email address to receive waitlist signup notifications
NOTIFICATION_EMAIL=jacobemarriott@icloud.com
```

For the Resend `from` address in `app/api/waitlist/route.ts`, update the domain
once your sending domain is verified in Resend.

## Swapping the Sample Audio

1. Record or generate a 60–90 second brief (see `../marketing/03-sample-brief-script.md`).
2. Export as MP3 192kbps, normalised to -16 LUFS.
3. Place it at `public/sample-brief.wav` (or `.mp3` — update the `src` prop in `Hero.tsx` to match).
4. The `AudioPlayer` component will pick it up automatically.

The waveform visualiser uses the **Web Audio API** — it reads real frequency data
from the playing audio. No fake animation. If `sample-brief.mp3` is absent, the
player shows an idle waveform animation instead.

## A/B Test

The headline is split-tested via query param or random assignment:

| Variant | Headline |
|---------|----------|
| `?v=a`  | "Your life briefs you." |
| `?v=b`  | "Stop checking seven apps before breakfast." |

- Test directly: `localhost:3000?v=a` / `localhost:3000?v=b`
- Without a param: random 50/50 split, sticky via cookie (`daily_variant`)
- Variant is recorded in the waitlist API payload — query your data to compare conversion

## Deployment (Vercel)

```bash
# From repo root or landing/ directory
vercel deploy
```

Set environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Directory Structure

```
landing/
├── app/
│   ├── layout.tsx          # Root layout, font loading
│   ├── globals.css         # Design tokens, base styles
│   ├── page.tsx            # Main page, A/B variant routing
│   └── api/waitlist/       # POST endpoint for email capture
├── components/
│   ├── DatelineBanner.tsx  # Sticky top bar with masthead + dateline
│   ├── hero/
│   │   ├── Hero.tsx        # Hero section container
│   │   ├── AudioPlayer.tsx # Web Audio API waveform player
│   │   └── EmailCapture.tsx
│   ├── sections/
│   │   ├── TheRitual.tsx
│   │   ├── SampleBrief.tsx
│   │   ├── WhoItsFor.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── sonic-waveform.tsx  # Decorative canvas waveform (editorial retheme)
├── lib/
│   └── utils.ts            # formatDateline, cn
└── public/
    └── sample-brief.mp3    # Add this file!
```

## Microcopy

All final microcopy is in `copy.md`. Edit there first, then update the components.
String constants are not yet centralised — PRs welcome once the copy stabilises.
