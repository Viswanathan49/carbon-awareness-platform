import { useState } from 'react'
import { useStore } from './store/useStore'
import InsightsWizard from './components/wizard/InsightsWizard'
import LandingPage from './components/LandingPage'
import logoSvg from './assets/logo.svg?raw'
import './App.css'

const translations = {
  EN: {
    title: "CarbonPulse",
    welcome: "Carbon Footprint Awareness Platform",
    subtitle: "A dynamic, frontend-driven assistant designed to help you track, understand, and reduce your daily carbon emissions through actionable, gamified insights.",
    scoreLabel: "Score",
    toggleLang: "HI",
    langName: "EN",
    tag: "Challenge Vertical 3",
    actionIncrement: "Simulate Carbon Activity (+10)",
    actionDecrement: "Simulate Eco action (-10)",
    actionReset: "Reset Score",
    comingSoon: "Onboarding Wizard & Gamified Challenges coming soon in subsequent steps!",
    cardTitle: "Track. Reduce. Neutralize.",
    backHome: "Back to Home",
  },
  HI: {
    title: "कार्बनपल्स (CarbonPulse)",
    welcome: "कार्बन फुटप्रिंट जागरूकता मंच",
    subtitle: "एक गतिशील, फ्रंटेंड-आधारित सहायक जो आपको व्यावहारिक, गेमयुक्त अंतर्दृष्टि के माध्यम से अपने दैनिक कार्बन उत्सर्जन को ट्रैक करने, समझने और कम करने में मदद करने के लिए डिज़ाइन किया गया है।",
    scoreLabel: "स्कोर",
    toggleLang: "EN",
    langName: "HI",
    tag: "चुनौती वर्टिकल ३",
    actionIncrement: "कार्बन गतिविधि का अनुकरण करें (+10)",
    actionDecrement: "पर्यावरण अनुकूल गतिविधि (-10)",
    actionReset: "स्कोर रीसेट करें",
    comingSoon: "ऑनबोर्डिंग विज़ार्ड और गेमीफाइड चुनौतियाँ आगामी चरणों में जल्द ही आ रही हैं!",
    cardTitle: "ट्रैक करें। कम करें। निष्प्रभावी करें।",
    backHome: "होम पर वापस जाएं",
  }
}

function App() {
  const { language, carbonScore, toggleLanguage, addCarbonScore, setCarbonScore, theme, toggleTheme } = useStore()
  const [view, setView] = useState('landing')
  
  const t = translations[language]

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <button 
          onClick={() => setView('landing')} 
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          aria-label="Navigate to Home Page"
        >
          <div className="nav-brand">
            <div className="nav-logo-icon-wrapper" dangerouslySetInnerHTML={{ __html: logoSvg }} aria-hidden="true" />
            <span className="nav-title">{t.title}</span>
          </div>
        </button>

        <div className="nav-controls">
          <button 
            id="lang-toggle-btn"
            className="lang-toggle" 
            onClick={toggleLanguage}
            aria-label={`Switch language to ${t.toggleLang}`}
          >
            🌐 {t.langName}
          </button>

          <button 
            id="theme-toggle-btn"
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <div className="score-badge" aria-live="polite">
            <svg className="score-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 22h20L12 2zm0 5l7.5 13H4.5L12 7z"/>
            </svg>
            <span>{t.scoreLabel}: {carbonScore} kg CO₂e</span>
          </div>
        </div>
      </nav>

      <main className="app-container">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('wizard')} />
        ) : (
          <div>
            <button 
              id="back-home-btn"
              className="btn-secondary" 
              style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
              onClick={() => setView('landing')}
              aria-label={t.backHome}
            >
              ← {t.backHome}
            </button>
            <InsightsWizard />
          </div>
        )}
        
        {view === 'landing' && (
          <div className="welcome-card" style={{ marginTop: '3rem' }}>
            <span className="badge">{t.tag}</span>
            <h1 className="welcome-title">{t.welcome}</h1>
            <p className="welcome-subtitle">{t.subtitle}</p>
            
            <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-secondary)', marginTop: 0 }}>
                {t.cardTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t.comingSoon}
              </p>
            </div>

            <div className="score-controls">
              <button 
                id="increment-score-btn"
                className="btn-neon" 
                onClick={() => addCarbonScore(10)}
              >
                ⚡ {t.actionIncrement}
              </button>
              <button 
                id="decrement-score-btn"
                className="btn-neon" 
                style={{ 
                  color: 'var(--accent-secondary)', 
                  borderColor: 'rgba(var(--accent-secondary-rgb), 0.2)',
                  background: 'rgba(var(--accent-secondary-rgb), 0.04)'
                }}
                onClick={() => addCarbonScore(-10)}
              >
                🌿 {t.actionDecrement}
              </button>
              <button 
                id="reset-score-btn"
                className="btn-secondary" 
                onClick={() => setCarbonScore(0)}
              >
                🔄 {t.actionReset}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App
