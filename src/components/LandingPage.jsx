import { useStore } from '../store/useStore'
import { translations } from '../locales/translations'

export default function LandingPage({ onStart, onStartTracker }) {
  const { language } = useStore()
  const t = translations[language]

  return (
    <div className="flex flex-col relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Ambient background grid */}
      <div className="bg-tech-grid" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
        }}
      >
        {/* High-impact slogan */}
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
            marginTop: '0.25rem',
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

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#features"
            className="btn-neon btn-pulse neon-btn"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              onStart && onStart()
            }}
            aria-label="Start your carbon journey and scroll to features"
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

      {/* ─── FEATURES SECTION ─── */}
      <section
        id="features"
        aria-label="Advanced Command Modules"
        className="relative z-10 flex flex-col items-center py-12 px-6 bg-white/40 dark:bg-black/40 backdrop-blur-md"
      >
        <h2
          className="text-neon-glow"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            color: '#0FDE72',
            marginBottom: '0.5rem',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Advanced Command Modules
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center text-base">
          Every feature engineered for zero-latency, zero-database performance.
        </p>

        {/* Feature grid */}
        <div
          className="feature-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '1100px',
          }}
        >
          {/* Wizard card */}
          <div className="feature-column glass-card bg-white/80 dark:bg-transparent" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧠</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.4rem' }}>
              {t.feat1Title || 'Insights Wizard'}
            </h3>
            <p className="feature-desc text-gray-600 dark:text-gray-400" style={{ lineHeight: 1.6 }}>
              {t.feat1Desc || 'A multi-step engine that calculates your footprint based on transit, diet, and energy choices — then delivers hyper-targeted advice.'}
            </p>
          </div>

          {/* Tracker card */}
          <div className="feature-column glass-card bg-white/80 dark:bg-transparent" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏆</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.4rem' }}>
              {t.feat2Title || 'Gamified Tracker'}
            </h3>
            <p className="feature-desc text-gray-600 dark:text-gray-400" style={{ lineHeight: 1.6 }}>
              {t.feat2Desc || 'Log daily eco-habits and watch your carbon score drop in real time. Instant rewards. Zero friction.'}
            </p>
          </div>

          {/* Rewards / Auth card */}
          <div className="feature-column glass-card bg-white/80 dark:bg-transparent" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.4rem' }}>
              {t.feat3Title || 'Zero-Trust Auth'}
            </h3>
            <p className="feature-desc text-gray-600 dark:text-gray-400" style={{ lineHeight: 1.6 }}>
              {t.feat3Desc || 'Your data never leaves the browser. Pure localStorage persistence — no databases, no API keys, no exposed attack surface.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
