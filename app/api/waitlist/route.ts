import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const preferredRegion = 'syd1'

const BASE_COUNT    = 127 // Pre-Resend signups
const MAX_CONTACTS  = 500 // Cap on Resend contacts before closing waitlist

// Cache contact count in module scope — avoids a contacts.list call on every signup
let cachedContactCount: number | null = null

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

async function initContactCount(resend: Resend, audienceId: string): Promise<number> {
  if (cachedContactCount !== null) return cachedContactCount
  const { data } = await resend.contacts.list({ audienceId })
  cachedContactCount = data?.data?.length ?? 0
  return cachedContactCount
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, variant, referrer } = body as {
      email: string
      variant: string
      referrer?: string
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const resend     = getResend()
    const audienceId = process.env.RESEND_AUDIENCE_ID

    // 1. Check cap + add contact
    let signupNumber = BASE_COUNT + 1
    if (audienceId) {
      const currentCount = await initContactCount(resend, audienceId)

      if (currentCount >= MAX_CONTACTS) {
        return NextResponse.json({ error: 'waitlist_full' }, { status: 410 })
      }

      await delay(500)
      await resend.contacts.create({ email, audienceId, unsubscribed: false })
      cachedContactCount = currentCount + 1
      signupNumber = cachedContactCount < 100
        ? BASE_COUNT + cachedContactCount
        : cachedContactCount
    }

    // 2. Send confirmation to the subscriber
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

    // 3. Notify yourself
    if (process.env.NOTIFICATION_EMAIL) {
      await delay(500)
      await resend.emails.send({
        from:    'dAIly Waitlist <hello@getdaily.dev>',
        to:      process.env.NOTIFICATION_EMAIL,
        subject: `New waitlist signup: ${email} (#${signupNumber})`,
        text: `Email: ${email}\nNumber: #${signupNumber}\nVariant: ${variant}\nReferrer: ${referrer ?? 'direct'}\nTime: ${new Date().toISOString()}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist]', err)
    return NextResponse.json({ ok: true })
  }
}
