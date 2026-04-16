import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const WAITLIST_COUNT = 127 // Hardcoded for now — update manually or wire to a DB

// Lazy-initialized so build doesn't fail without env vars
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, variant, referrer } = body as {
      email: string
      variant: string
      referrer?: string
    }

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const resend = getResend()

    // 1. Send confirmation to the subscriber
    await resend.emails.send({
      from:    'Jacob <hello@getdaily.dev>',  // Update domain once you have it
      to:      email,
      subject: "You're in.",
      text: `Hey —

You just joined the dAIly waitlist. You're #${WAITLIST_COUNT + 1}.

I'm Jacob. I'm building this solo, part-time, carefully. No VC, no hype, no shipping-before-it's-ready.

Here's what happens next:
- I'll email you once when the product is ready to test. Probably mid-2026.
- If you want to shape it, reply to this email with one sentence: what's the first app you check in the morning, and why? I read every reply.
- The first 100 founding partners get lifetime access. I'll pick them from the people who reply.

That's it. Go have a calm morning.

— Jacob
Brisbane`,
    })

    // 2. Notify yourself
    if (process.env.NOTIFICATION_EMAIL) {
      await resend.emails.send({
        from:    'dAIly Waitlist <hello@getdaily.dev>',
        to:      process.env.NOTIFICATION_EMAIL,
        subject: `New waitlist signup: ${email}`,
        text: `Email: ${email}\nVariant: ${variant}\nReferrer: ${referrer ?? 'direct'}\nTime: ${new Date().toISOString()}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist]', err)
    // Return success anyway — don't block on email failure
    return NextResponse.json({ ok: true })
  }
}
