import { useStore } from '../store/useStore'
import { translations } from '../locales/translations'

export default function LandingPage({ onStart, onStartTracker }) {
  const { language } = useStore()
  const t = translations[language]

  return (
    <div className="flex flex-col relative overflow-hidden text-gray-900 dark:text-white transition-colors duration-300 bg-transparent">
      {/* Ambient background grid */}
      <div className="bg-tech-grid" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* ─── HERO SECTION ONLY ─── */}
      <section 
        className="relative z-10 mx-auto w-full max-w-4xl flex flex-col items-center justify-center text-center px-6"
        style={{ padding: '6rem 0 4rem' }}
      >
        {/* Animated Background Blending Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] max-w-[800px] pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#0FDE72] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] opacity-40 dark:opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#00D1FF] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] opacity-40 dark:opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-[#B026FF] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] opacity-40 dark:opacity-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
        </div>
        <h1
          className="text-gray-900 dark:text-white"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '0 0 1rem',
            maxWidth: '700px',
          }}
        >
          EMPOWER YOUR{' '}
          <span className="text-neon-glow" style={{ color: '#0FDE72' }}>
            ECO-EVOLUTION
          </span>
        </h1>

        <p
          className="text-gray-600 dark:text-gray-300"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            maxWidth: '560px',
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The ultimate client-side engine for carbon awareness.{' '}
          <b className="text-gray-900 dark:text-white font-bold">
            Dynamic. Direct. 100% Database-Free.
          </b>
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#calculator"
            className="btn-neon btn-pulse neon-btn"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
              onStart && onStart()
            }}
            aria-label="Start your carbon journey"
            style={{ textDecoration: 'none', padding: '12px 24px', fontSize: '0.95rem' }}
          >
            ✨ {t.startJourney || t.cta || 'Start Your Journey'}
          </a>

          <button
            className="btn-secondary"
            style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '600' }}
            onClick={onStartTracker}
            aria-label="Open the daily habits checklist"
          >
            📅 {t.dailyTracker || t.ctaTracker || 'Daily Tracker'}
          </button>
        </div>
      </section>
    </div>
  )
}
