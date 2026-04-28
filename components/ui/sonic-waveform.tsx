"use client"

/**
 * sonic-waveform.tsx
 *
 * Original component: dark/cinematic canvas-based waveform.
 * This version is fully rethemed for the dAIly editorial aesthetic:
 * — warm paper background instead of black
 * — ink/sienna bars instead of teal glow lines
 * — removed the teal colour palette entirely
 * — adapted overlay gradient to match paper tokens
 *
 * The original component structure (canvas, mouse interaction, animation loop)
 * is preserved. The AudioPlayer component supersedes this for the actual
 * audio-reactive waveform — this component serves as a decorative background
 * canvas if needed in other contexts.
 */

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ')

const EditorialWaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    let time = 0

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      // Warm paper fade instead of black
      ctx.fillStyle = 'rgba(247, 242, 234, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const lineCount    = 40
      const segmentCount = 80
      const height       = canvas.height / 2

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath()

        const progress        = i / lineCount
        const colorIntensity  = Math.sin(progress * Math.PI)

        const v = Math.round(50 + colorIntensity * 40)
        ctx.strokeStyle = `rgba(${v}, ${v - 5}, ${v - 8}, ${colorIntensity * 0.3})`
        ctx.lineWidth   = 1

        for (let j = 0; j < segmentCount + 1; j++) {
          const x = (j / segmentCount) * canvas.width

          const distToMouse = Math.hypot(x - mouse.x, height - mouse.y)
          const mouseEffect = Math.max(0, 1 - distToMouse / 350)

          const noise = Math.sin(j * 0.1 + time + i * 0.2) * 12
          const spike = Math.cos(j * 0.2 + time + i * 0.1) * Math.sin(j * 0.05 + time) * 30
          const y     = height + noise + spike * (1 + mouseEffect * 1.5)

          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      time += 0.016
      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    window.addEventListener('resize',      resizeCanvas)
    window.addEventListener('mousemove',   handleMouseMove)

    resizeCanvas()
    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize',    resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
      style={{ backgroundColor: 'oklch(97.2% 0.011 85)' }}
      aria-hidden="true"
    />
  )
}

/**
 * EditorialWaveformHero
 *
 * Drop-in variant of the original SonicWaveformHero rethemed for the
 * editorial Morning Intelligence aesthetic. Typography uses Fraunces/JetBrains
 * font variables. Not used directly on the landing page (Hero.tsx takes its
 * place) but exported for potential reuse.
 */
const EditorialWaveformHero = () => {
  const fadeUpVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay:    i * 0.15 + 0.3,
        duration: 0.7,
        ease:     [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <EditorialWaveformCanvas />

      {/* Gradient uses paper tones instead of black */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to top, oklch(97.2% 0.011 85) 0%, oklch(97.2% 0.011 85 / 0.6) 30%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 text-center p-6 max-w-2xl">
        <motion.p
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase mb-6"
          style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}
        >
          Morning Intelligence &mdash; Pre-Launch
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-serif italic text-ink mb-5"
          style={{
            fontFamily:           'var(--font-fraunces, Georgia, serif)',
            fontSize:             'clamp(3rem, 6vw + 1rem, 6rem)',
            lineHeight:           '1',
            letterSpacing:        '-0.02em',
            fontVariationSettings: '"opsz" 72, "SOFT" 0',
          }}
        >
          Your life briefs you.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-mono text-muted mb-10 leading-relaxed"
          style={{
            fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.25rem)',
          }}
        >
          A morning briefing, spoken before you open a single app.
        </motion.p>

        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
          <button
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-paper font-mono text-[0.8125rem] tracking-wide hover:bg-accent-hover transition-colors duration-150"
            style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}
          >
            Join the morning brief
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export { EditorialWaveformCanvas, EditorialWaveformHero }
export default EditorialWaveformHero
