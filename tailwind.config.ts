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
        'ink-mid':  'var(--ink-mid)',
        accent:     'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        muted:      'var(--muted)',
        rule:       'var(--rule)',
      },
      fontFamily: {
        serif:   ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
        reading: ['var(--font-mono)', '"Courier New"', 'monospace'],
        mono:    ['var(--font-mono)', '"Courier New"', 'monospace'],
      },
      fontSize: {
        // Major third scale (×1.25). Steps from 1rem: 0.8, 1, 1.25, 1.5625, 1.953, 2.441, 3.052, 3.815, 4.768
        'display':  ['clamp(3.052rem, 2.5rem + 2.25vw, 4.768rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'headline': ['clamp(2.441rem, 2rem + 1.5vw, 3.052rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'section':  ['clamp(1.953rem, 1.7rem + 0.8vw, 2.441rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'pull':     ['clamp(1.25rem, 1.1rem + 0.5vw, 1.5625rem)', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'body':     ['clamp(1rem, 0.9rem + 0.3vw, 1.25rem)', { lineHeight: '1.7' }],
        'small':    ['clamp(0.8rem, 0.75rem + 0.15vw, 1rem)', { lineHeight: '1.5' }],
        'label':    ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        section: 'clamp(4rem, 7vw, 7rem)',
        // Major third spacing scale (×1.25 from 0.25rem = 4px)
        'sp-1':  'var(--sp-1)',
        'sp-2':  'var(--sp-2)',
        'sp-3':  'var(--sp-3)',
        'sp-4':  'var(--sp-4)',
        'sp-5':  'var(--sp-5)',
        'sp-6':  'var(--sp-6)',
        'sp-7':  'var(--sp-7)',
        'sp-8':  'var(--sp-8)',
        'sp-9':  'var(--sp-9)',
        'sp-10': 'var(--sp-10)',
        'sp-11': 'var(--sp-11)',
        'sp-12': 'var(--sp-12)',
        'sp-13': 'var(--sp-13)',
        'sp-14': 'var(--sp-14)',
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
