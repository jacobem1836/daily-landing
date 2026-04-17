import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const preferredRegion = 'syd1'

const BASE_COUNT   = 127
const MAX_CONTACTS = 500

// Rate limiting: max 3 submissions per IP per minute
const RATE_WINDOW = 60_000
const RATE_MAX    = 3
const rateMap     = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_MAX) return false
  entry.count++
  return true
}

// Cache contact count and email set — populated once per cold start
let cachedContactCount:  number | null      = null
let cachedContactEmails: Set<string> | null = null

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

async function initContactCache(
  resend: Resend,
  audienceId: string,
): Promise<{ count: number; emails: Set<string> }> {
  if (cachedContactCount !== null && cachedContactEmails !== null) {
    return { count: cachedContactCount, emails: cachedContactEmails }
  }
  const { data } = await resend.contacts.list({ audienceId })
  const contacts = data?.data ?? []
  cachedContactCount  = contacts.length
  cachedContactEmails = new Set(contacts.map((c) => c.email.toLowerCase()))
  return { count: cachedContactCount, emails: cachedContactEmails }
}

function sanitize(value: unknown, maxLen = 200): string {
  if (typeof value !== 'string') return 'unknown'
  return value.replace(/[\r\n]/g, ' ').slice(0, maxLen)
}

export async function POST(req: NextRequest) {
  // Body size guard (~10kb is more than enough for an email address)
  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (contentLength > 10_240) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  // Rate limit by IP
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429 },
    )
  }

  try {
    const body = await req.json()
    const { email, variant, referrer } = body as {
      email: unknown
      variant: unknown
      referrer?: unknown
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    }
    if (email.length > 254) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const safeVariant  = sanitize(variant)
    const safeReferrer = sanitize(referrer)
    const normalEmail  = email.toLowerCase()

    const resend     = getResend()
    const audienceId = process.env.RESEND_AUDIENCE_ID

    let signupNumber = BASE_COUNT + 1
    if (audienceId) {
      const { count: currentCount, emails } = await initContactCache(resend, audienceId)

      if (currentCount >= MAX_CONTACTS) {
        return NextResponse.json({ error: 'waitlist_full' }, { status: 410 })
      }

      // Duplicate: already on the waitlist — acknowledge silently
      if (emails.has(normalEmail)) {
        return NextResponse.json({ ok: true })
      }

      await delay(500)
      await resend.contacts.create({ email, audienceId, unsubscribed: false })

      cachedContactCount = currentCount + 1
      cachedContactEmails!.add(normalEmail)

      signupNumber =
        cachedContactCount < 100
          ? BASE_COUNT + cachedContactCount
          : cachedContactCount
    }

    await delay(500)
    await resend.emails.send({
      from:    'Jacob <hello@getdaily.dev>',
      to:      email,
      subject: "You're in.",
      text: `Hey —

You just joined the dAIly waitlist. You're #${signupNumber}.

I'm Jacob. I'm building this solo, part-time, carefully. No VC, no hype, no shipping-before-it's-ready.

Here's what happens next:
- I'll email you once when the product is ready to test. Probably mid-2026.
- If you want to shape it, reply to this email with one sentence: what's the first app you check in the morning, and why? I read every reply.
- The first 100 founding partners get lifetime access. I'll pick them from the people who reply.

That's it. Go have a calm morning.

— Jacob
Brisbane`,
    })

    if (process.env.NOTIFICATION_EMAIL) {
      await delay(500)
      await resend.emails.send({
        from:    'dAIly Waitlist <hello@getdaily.dev>',
        to:      process.env.NOTIFICATION_EMAIL,
        subject: `New waitlist signup: ${email} (#${signupNumber})`,
        text:    `Email: ${email}\nNumber: #${signupNumber}\nVariant: ${safeVariant}\nReferrer: ${safeReferrer}\nTime: ${new Date().toISOString()}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist]', err instanceof Error ? err.message : 'unknown error')
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
