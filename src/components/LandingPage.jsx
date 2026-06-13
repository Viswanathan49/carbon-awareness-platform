import { useStore } from '../store/useStore'
import { translations } from '../locales/translations'

export default function LandingPage({ onStart, onStartTracker }) {
  const { language } = useStore()
  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Ambient background grid */}
      <div className="bg-tech-grid" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* High-impact slogan */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#ffffff',
            margin: '0 0 1.5rem',
            maxWidth: '900px',
          }}
        >
          EMPOWER YOUR{' '}
          <span className="text-neon-glow" style={{ color: '#0FDE72' }}>
            ECO-EVOLUTION
          </span>
        </h1>

        <p
          style={{
            marginTop: '0.5rem',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '640px',
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          The ultimate client-side engine for carbon awareness.{' '}
          <b style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
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
            style={{ textDecoration: 'none' }}
          >
            ✨ {t.startJourney || t.cta || 'Start Your Journey'}
          </a>

          <button
            className="btn-secondary"
            style={{ padding: '14px 28px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '600' }}
            onClick={onStartTracker}
            aria-label="Open the daily habits checklist"
          >
            📅 {t.dailyTracker || t.ctaTracker || 'Daily Tracker'}
          </button>
        </div>

        {/* Scroll nudge arrow */}
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Scroll to features"
          style={{
            position: 'absolute',
            bottom: '2rem',
            color: 'rgba(15,222,114,0.6)',
            fontSize: '1.75rem',
            textDecoration: 'none',
            animation: 'floatOrb 2s infinite ease-in-out alternate',
          }}
        >
          ↓
        </a>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section
        id="features"
        aria-label="Advanced Command Modules"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          padding: '6rem 1.5rem',
          background: 'rgba(26, 26, 26, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          className="text-neon-glow"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            color: '#0FDE72',
            marginBottom: '0.75rem',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Advanced Command Modules
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '3.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
          Every feature engineered for zero-latency, zero-database performance.
        </p>

        {/* Feature grid */}
        <div
          className="feature-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '1100px',
          }}
        >
          {/* Wizard card */}
          <div className="feature-column glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t.feat1Title || 'Insights Wizard'}
            </h3>
            <p className="feature-desc" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              {t.feat1Desc || 'A multi-step engine that calculates your footprint based on transit, diet, and energy choices — then delivers hyper-targeted advice.'}
            </p>
          </div>

          {/* Tracker card */}
          <div className="feature-column glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t.feat2Title || 'Gamified Tracker'}
            </h3>
            <p className="feature-desc" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              {t.feat2Desc || 'Log daily eco-habits and watch your carbon score drop in real time. Instant rewards. Zero friction.'}
            </p>
          </div>

          {/* Rewards / Auth card */}
          <div className="feature-column glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3 className="feature-title" style={{ color: '#0FDE72', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t.feat3Title || 'Zero-Trust Auth'}
            </h3>
            <p className="feature-desc" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              {t.feat3Desc || 'Your data never leaves the browser. Pure localStorage persistence — no databases, no API keys, no exposed attack surface.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
