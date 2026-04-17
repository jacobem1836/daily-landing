'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface EmailCaptureProps {
  variant: 'a' | 'b'
  className?: string
}

type State = 'idle' | 'loading' | 'success' | 'error'

export default function EmailCapture({ variant, className }: EmailCaptureProps) {
  const [email,  setEmail]  = useState('')
  const [state,  setState]  = useState<State>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [count,  setCount]  = useState<number>(127)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d) => { if (typeof d.count === 'number') setCount(d.count) })
      .catch(() => {})
  }, [])

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || state === 'loading' || state === 'success') return

    setState('loading')
    setErrMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          variant,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Something went wrong.')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }, [email, state, variant])

  if (state === 'success') {
    return (
      <div className={cn('', className)}>
        <p className="font-serif font-optical-sm text-ink text-body leading-snug">
          You&rsquo;re in.{' '}
          <span className="text-sienna">The first brief lands when we&rsquo;re ready.</span>
        </p>
        <p className="mt-1 font-mono text-label text-muted">
          Check your inbox for a note from Jacob.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-0 border border-ink"
        noValidate
        aria-label="Join the waitlist"
      >
        <label className="sr-only" htmlFor="email-input">
          Email address
        </label>
        <input
          ref={inputRef}
          id="email-input"
          type="email"
          className="email-input flex-1 px-4 py-3.5 sm:py-4 text-body font-serif font-optical-sm min-w-0"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'email-error' : undefined}
          disabled={state === 'loading'}
          required
        />
        <button
          type="submit"
          disabled={state === 'loading' || !email}
          className="submit-btn px-5 py-3.5 sm:py-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Join the morning brief"
        >
          {state === 'loading' ? 'Joining…' : 'Join the morning brief →'}
        </button>
      </form>

      {state === 'error' && (
        <p id="email-error" role="alert" className="mt-2 font-mono text-label text-sienna">
          {errMsg}
        </p>
      )}

      <p className="mt-2 font-mono text-label text-muted">
        Early access &mdash; {count} of 500 spots taken.
        &ensp;No spam. One email when it&rsquo;s ready.
      </p>
    </div>
  )
}
