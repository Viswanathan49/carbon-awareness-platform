import { useState, useEffect } from 'react'
import { useStore } from './store/useStore'
import { translations } from './locales/translations'
import InsightsWizard from './components/wizard/InsightsWizard'
import LandingPage from './components/LandingPage'
import DailyTracker from './components/gamification/DailyTracker'
import SystemTour from './components/SystemTour'
import CarbonAnalytics from './components/CarbonAnalytics'
import CommandModules from './components/CommandModules'
import logoSvg from './assets/logo.svg?raw'
import './App.css'

function App() {
  const { 
    language, 
    carbonScore, 
    pointsEarned, 
    toggleLanguage, 
    addCarbonScore, 
    setCarbonScore, 
    theme, 
    toggleTheme 
  } = useStore()
  
  const [view, setView] = useState('landing')
  const [isPulsing, setIsPulsing] = useState(false)
  
  const t = translations[language]

  // Dopamine pulse animation whenever scores change
  useEffect(() => {
    setIsPulsing(true)
    const timer = setTimeout(() => setIsPulsing(false), 450)
    return () => clearTimeout(timer)
  }, [carbonScore, pointsEarned])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <SystemTour />
      <div className="ambient-bg">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <button 
          onClick={() => setView('landing')} 
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          aria-label="Navigate to Home Page"
        >
          <div className="nav-brand">
            <div className="nav-logo-icon-wrapper" dangerouslySetInnerHTML={{ __html: logoSvg }} aria-hidden="true" />
            <span className="nav-title">{t.appTitle}</span>
          </div>
        </button>

        <div className="nav-controls">
          <button 
            id="lang-toggle-btn"
            className="lang-toggle" 
            onClick={toggleLanguage}
            aria-label="Toggle language between English and Hindi"
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
          
          <div className={`score-badge ${isPulsing ? 'pulse-animation' : ''}`} aria-live="polite">
            <svg className="score-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 22h20L12 2zm0 5l7.5 13H4.5L12 7z"/>
            </svg>
            <span>{t.scoreLabel}: {carbonScore.toFixed(1)} kg CO₂e</span>
          </div>

          <div className={`score-badge ${isPulsing ? 'pulse-animation' : ''}`} style={{ borderColor: 'rgba(var(--accent-secondary-rgb), 0.2)', color: 'var(--accent-secondary)', background: 'rgba(var(--accent-secondary-rgb), 0.08)' }} aria-live="polite">
            <span aria-hidden="true">🏆</span>
            <span>{t.pointsLabel}: {pointsEarned} pts</span>
          </div>
        </div>
      </nav>

      <main className="app-container">
        {view === 'landing' ? (
          <LandingPage 
            onStart={() => setView('wizard')} 
            onStartTracker={() => setView('tracker')} 
          />
        ) : view === 'wizard' ? (
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
            <DailyTracker />
          </div>
        )}
        
        {view === 'landing' && (
          <div className="welcome-card bg-white dark:bg-[#121212] text-gray-900 dark:text-white" style={{ marginTop: '3rem' }}>
            <span className="badge">{t.tag}</span>
            <h1 className="welcome-title text-gray-900 dark:text-white">{t.welcome}</h1>
            <p className="welcome-subtitle text-gray-600 dark:text-gray-300">{t.subtitle}</p>
            
            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 border-dashed">
              <h3 className="font-display text-sky-500 dark:text-sky-400 mt-0">
                {t.cardTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
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

        {view === 'landing' && (
          <>
            <CommandModules />
            <div className="h-[200px] w-full shrink-0 clear-both"></div>
            <CarbonAnalytics userTotal={carbonScore > 0 ? carbonScore / 1000 : 4.5} />
          </>
        )}
      </main>
    </>
  )
}

export default App
