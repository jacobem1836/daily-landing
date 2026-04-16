import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:      'var(--paper)',
        'paper-dark': 'var(--paper-dark)',
        'paper-mid': 'var(--paper-mid)',
        ink:        'var(--ink)',
        'ink-light': 'var(--ink-light)',
        sienna:     'var(--sienna)',
        'sienna-pale': 'var(--sienna-pale)',
        muted:      'var(--muted)',
        rule:       'var(--rule)',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
        mono:  ['var(--font-jetbrains)', '"Courier New"', 'monospace'],
      },
      fontSize: {
        'display':  ['clamp(3rem, 6vw + 1rem, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'headline': ['clamp(2rem, 3.5vw + 0.5rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'section':  ['clamp(1.5rem, 2.5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'pull':     ['clamp(1.25rem, 2vw, 1.875rem)', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'body':     ['clamp(1rem, 0.9rem + 0.3vw, 1.125rem)', { lineHeight: '1.7' }],
        'small':    ['clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)', { lineHeight: '1.5' }],
        'label':    ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        section: 'clamp(5rem, 10vw, 9rem)',
      },
      animation: {
        'idle-wave': 'idleWave 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'grain': 'grain 0.4s steps(1) infinite',
      },
      keyframes: {
        idleWave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        grain: {
          '0%':   { transform: 'translate(0, 0)' },
          '10%':  { transform: 'translate(-1%, -1%)' },
          '20%':  { transform: 'translate(2%, 1%)' },
          '30%':  { transform: 'translate(-1%, 2%)' },
          '40%':  { transform: 'translate(1%, -1%)' },
          '50%':  { transform: 'translate(-2%, 1%)' },
          '60%':  { transform: 'translate(2%, -2%)' },
          '70%':  { transform: 'translate(-1%, 1%)' },
          '80%':  { transform: 'translate(1%, 2%)' },
          '90%':  { transform: 'translate(-2%, -1%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
