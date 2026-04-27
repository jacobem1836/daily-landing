import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'dAIly — Your life briefs you.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Load Fraunces Italic from Google Fonts for the headline
  const frauncesItalic = fetch(
    'https://fonts.gstatic.com/s/fraunces/v31/6NUu8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnDSg.woff2'
  ).then((res) => res.arrayBuffer())

  const [frauncesItalicData] = await Promise.all([frauncesItalic])

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#f7f2e8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Top border rule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#1f1a14', marginBottom: '24px' }} />

          {/* Masthead row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '28px',
                fontWeight: 600,
                color: '#1f1a14',
                letterSpacing: '-0.02em',
              }}
            >
              dAIly
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#7a6e62',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Morning Intelligence — Pre-Launch
            </span>
          </div>

          {/* Thin rule under masthead */}
          <div style={{ width: '100%', height: '1px', backgroundColor: '#c8bfb2', marginTop: '20px' }} />
        </div>

        {/* Main content — two column */}
        <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flex: 1, paddingTop: '48px' }}>
          {/* Left — headline */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '40px', height: '3px', backgroundColor: '#b85c38' }} />
            <span
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '72px',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#1f1a14',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Your life briefs you.
            </span>
          </div>

          {/* Vertical column rule */}
          <div style={{ width: '1px', backgroundColor: '#c8bfb2', alignSelf: 'stretch' }} />

          {/* Right — description + sources */}
          <div style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '8px' }}>
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '22px',
                color: '#5a5048',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              A morning briefing, spoken to you before you open a single app. Built for operators.
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {['Gmail', 'Calendar', 'Slack', 'News', 'Messages', 'More'].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#7a6e62',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  — {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule + footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#1f1a14' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#7a6e62', letterSpacing: '0.06em' }}>
              getdaily.dev
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#7a6e62', letterSpacing: '0.06em' }}>
              Early access — 127 of 500 spots
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Fraunces',
          data: frauncesItalicData,
          style: 'italic',
          weight: 300,
        },
      ],
    }
  )
}
