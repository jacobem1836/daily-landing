'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

const BAR_COUNT = 52
const IDLE_AMPLITUDE = 0.28
const IDLE_SPEED = 0.018

interface AudioPlayerProps {
  src?: string
  className?: string
}


export default function AudioPlayer({ src = '/sample-brief.mp3', className }: AudioPlayerProps) {
  const audioRef      = useRef<HTMLAudioElement | null>(null)
  const canvasRef     = useRef<HTMLCanvasElement | null>(null)
  const analyserRef   = useRef<AnalyserNode | null>(null)
  const contextRef    = useRef<AudioContext | null>(null)
  const rafRef        = useRef<number>(0)
  const idlePhaseRef  = useRef(0)
  const dataArrayRef  = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const connectedRef  = useRef(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [duration,  setDuration]  = useState(0)
  const [hasAudio,  setHasAudio]  = useState(false)
  const [isReady,   setIsReady]   = useState(false)

  // ── Canvas draw loop ──────────────────────────────────────────────────────
  const drawBars = useCallback(() => {
    const canvas  = canvasRef.current
    if (!canvas) return

    const ctx    = canvas.getContext('2d')
    if (!ctx) return

    const dpr    = window.devicePixelRatio ?? 1
    const w      = canvas.clientWidth
    const h      = canvas.clientHeight

    canvas.width  = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, w, h)

    const analyser  = analyserRef.current
    const dataArray = dataArrayRef.current

    // Compute bar heights
    const heights: number[] = []

    if (isPlaying && analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray)

      // Map frequency buckets to bars — skip DC + very high freqs
      const usable = Math.floor(dataArray.length * 0.55)
      const step   = usable / BAR_COUNT

      for (let i = 0; i < BAR_COUNT; i++) {
        const start = Math.floor(i * step)
        const end   = Math.floor((i + 1) * step)
        let   sum   = 0
        for (let j = start; j < end; j++) sum += dataArray[j]
        const avg = (end - start) > 0 ? sum / (end - start) : 0
        heights.push(avg / 255)
      }
    } else {
      // Idle animation — gentle sine wave
      idlePhaseRef.current += IDLE_SPEED
      const phase = idlePhaseRef.current

      for (let i = 0; i < BAR_COUNT; i++) {
        const t = i / BAR_COUNT
        const v =
          Math.sin(phase + t * Math.PI * 2.8) * 0.5 +
          Math.sin(phase * 1.7 + t * Math.PI * 5.2) * 0.25 +
          Math.sin(phase * 0.8 + t * Math.PI * 1.4) * 0.25

        heights.push(0.04 + Math.abs(v) * IDLE_AMPLITUDE)
      }
    }

    // Bar geometry
    const gap        = 2.5
    const totalGap   = gap * (BAR_COUNT - 1)
    const barWidth   = (w - totalGap) / BAR_COUNT
    const maxHeight  = h * 0.92
    const baseline   = h

    // Colours
    const played = progress / Math.max(duration, 1)

    for (let i = 0; i < BAR_COUNT; i++) {
      const x    = i * (barWidth + gap)
      const bh   = Math.max(2, heights[i] * maxHeight)
      const y    = baseline - bh

      const isPast = isPlaying && (i / BAR_COUNT) < played

      // Ink-family colour based on state
      if (isPast) {
        ctx.fillStyle = 'oklch(52% 0.155 48)' // sienna
      } else if (isPlaying) {
        ctx.fillStyle = 'oklch(35% 0.018 55)' // ink-light
      } else {
        ctx.fillStyle = 'oklch(70% 0.012 70)' // muted/rule-ish
      }

      ctx.fillRect(x, y, barWidth, bh)
    }
  }, [isPlaying, progress, duration])

  // ── Animation loop ────────────────────────────────────────────────────────
  const startLoop = useCallback(() => {
    const loop = () => {
      drawBars()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [drawBars])

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Wire up Web Audio API on first play ──────────────────────────────────
  const initAudio = useCallback(async () => {
    if (connectedRef.current) return
    const audio = audioRef.current
    if (!audio) return

    const ctx     = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize         = 256
    analyser.smoothingTimeConstant = 0.78

    const source  = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(ctx.destination)

    contextRef.current  = ctx
    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>
    connectedRef.current = true

    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
  }, [])

  // ── Play / Pause ─────────────────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      await initAudio()
      audio.play().then(() => setIsPlaying(true)).catch(() => {/* no audio file yet */})
    }
  }, [isPlaying, initAudio])

  // ── Seek on waveform click ────────────────────────────────────────────────
  const handleWaveformClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
    setProgress(audio.currentTime)
  }, [duration])

  // ── Time update ──────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate  = () => setProgress(audio.currentTime)
    const onLoadedMeta  = () => { setDuration(audio.duration); setIsReady(true) }
    const onCanPlay     = () => setHasAudio(true)
    const onEnded       = () => { setIsPlaying(false); setProgress(0) }
    const onError       = () => setHasAudio(false)

    audio.addEventListener('timeupdate',     onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMeta)
    audio.addEventListener('canplay',        onCanPlay)
    audio.addEventListener('ended',          onEnded)
    audio.addEventListener('error',          onError)

    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMeta)
      audio.removeEventListener('canplay',        onCanPlay)
      audio.removeEventListener('ended',          onEnded)
      audio.removeEventListener('error',          onError)
    }
  }, [])

  // ── Start / stop animation loop ──────────────────────────────────────────
  useEffect(() => {
    startLoop()
    return stopLoop
  }, [startLoop, stopLoop])

  const elapsed   = formatDuration(progress)
  const remaining = formatDuration(duration - progress)

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Hidden audio element — lazy loads so it doesn't block LCP */}
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        aria-hidden="true"
      />

      {/* Player card */}
      <div
        className="rounded-none border border-rule bg-paper-dark px-6 py-5 sm:px-8 sm:py-6"
        style={{ boxShadow: '6px 6px 0 oklch(35% 0.018 55)' }}
      >
        {/* Label */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-label text-muted small-caps tracking-wider"
            aria-label="Sample briefing audio"
            suppressHydrationWarning
          >
            The Brief — {formatBriefDate()}
          </span>
          {hasAudio && (
            <span className="font-mono text-label text-muted tabular-nums">
              {elapsed} / {formatDuration(duration)}
            </span>
          )}
          {!hasAudio && !isPlaying && (
            <span className="font-mono text-label text-muted">
              ~ 1:05
            </span>
          )}
        </div>

        {/* Waveform canvas — interactive, keyboard accessible */}
        <div className="relative h-16 sm:h-20 mb-5 cursor-pointer group">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            onClick={handleWaveformClick}
            role="slider"
            aria-label="Audio progress"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onKeyDown={(e) => {
              const audio = audioRef.current
              if (!audio || !duration) return
              if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, duration)
              if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(audio.currentTime - 5, 0)
            }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-5">
          {/* Play / Pause button */}
          <button
            className="play-button w-12 h-12 rounded-full flex items-center justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sienna"
            onClick={toggle}
            aria-label={isPlaying ? 'Pause briefing' : 'Play briefing'}
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>

          {/* Progress bar — thin line */}
          <div className="flex-1 relative h-px bg-rule" role="presentation">
            <div
              className="absolute inset-y-0 left-0 bg-sienna transition-none"
              style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
            />
          </div>

          {/* Remaining time */}
          <span className="font-mono text-label text-muted tabular-nums shrink-0">
            {duration > 0 ? `-${remaining}` : '1:05'}
          </span>
        </div>

        {/* Sub-label */}
        <p className="mt-4 font-mono text-[0.625rem] text-muted tracking-widest uppercase">
          An actual morning brief — your calendar, email, Slack, synthesised
        </p>
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────
function formatBriefDate(): string {
  const d = new Date()
  const day = d.toLocaleDateString('en-AU', { weekday: 'short' })
  const month = d.toLocaleDateString('en-AU', { month: 'short' })
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours < 12 ? 'am' : 'pm'
  const h12 = hours % 12 === 0 ? 12 : hours % 12
  return `${day} ${month} ${date}, ${h12}:${minutes}${ampm}`
}

function formatDuration(s: number): string {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${r}`
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M5 3.5l10 5.5-10 5.5V3.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <rect x="4" y="3" width="3.5" height="12" rx="1" />
      <rect x="10.5" y="3" width="3.5" height="12" rx="1" />
    </svg>
  )
}
