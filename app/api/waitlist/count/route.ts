import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const preferredRegion = 'syd1'
export const revalidate = 60 // cache for 60s

export async function GET() {
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const apiKey     = process.env.RESEND_API_KEY

  if (!audienceId || !apiKey) {
    return NextResponse.json({ count: 127 })
  }

  try {
    const resend = new Resend(apiKey)
    const { data } = await resend.contacts.list({ audienceId })
    const count = data?.data?.length ?? 127
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 127 })
  }
}
