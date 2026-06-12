import { useStore } from '../store/useStore'
import { translations } from '../locales/translations'

export default function LandingPage({ onStart, onStartTracker }) {
  const { language } = useStore()
  const t = translations[language]

  return (
    <div className="landing-outer-wrap" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#121212', borderRadius: '32px', padding: '1rem', border: '1px solid rgba(15, 222, 114, 0.1)' }}>
      {/* Background animated grid */}
      <div className="bg-tech-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <div className="landing-container" style={{ position: 'relative', zIndex: 1, gap: '3rem' }}>
        <header className="landing-hero" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: '3rem 1rem' }}>
          <h1 className="landing-hero-title text-neon-glow" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            {t.heroTitle}
          </h1>
          <p className="landing-hero-subtitle">{t.heroSubtitle}</p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn-neon btn-pulse neon-btn" 
              onClick={onStart}
              aria-label={`${t.cta} and open the carbon assessment wizard`}
            >
              ✨ {t.cta}
            </button>
            
            <button 
              className="btn-secondary" 
              style={{ padding: '14px 28px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '600' }}
              onClick={onStartTracker}
              aria-label={`${t.ctaTracker} and open the daily habits checklist`}
            >
              📅 {t.ctaTracker}
            </button>
          </div>
        </header>

        <section className="landing-features" aria-label="Key Features" style={{ paddingBottom: '2rem' }}>
          <div className="feature-grid">
            <div className="feature-column glass-card">
              <h2 className="feature-title">{t.feat1Title}</h2>
              <p className="feature-desc">{t.feat1Desc}</p>
            </div>
            
            <div className="feature-column glass-card">
              <h2 className="feature-title">{t.feat2Title}</h2>
              <p className="feature-desc">{t.feat2Desc}</p>
            </div>
            
            <div className="feature-column glass-card">
              <h2 className="feature-title">{t.feat3Title}</h2>
              <p className="feature-desc">{t.feat3Desc}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
