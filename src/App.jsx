import { useState, useEffect } from 'react'
import { useStore } from './store/useStore'
import { translations } from './locales/translations'
import InsightsWizard from './components/wizard/InsightsWizard'
import LandingPage from './components/LandingPage'
import DailyTracker from './components/gamification/DailyTracker'
import SystemTour from './components/SystemTour'
import CarbonAnalytics from './components/CarbonAnalytics'
import CommandModules from './components/CommandModules'
import logoUrl from './assets/logo.svg'
import './App.css'

function App() {
  const { 
    language, 
    toggleLanguage, 
    theme, 
    toggleTheme 
  } = useStore()
  
  const [view, setView] = useState('landing')
  
  const t = translations[language]

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
            <img src={logoUrl} alt="CarbonPulse Logo" className="w-8 h-8 mr-2" aria-hidden="true" />
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
          
          <div className="score-badge" style={{ borderColor: 'rgba(250, 204, 21, 0.3)', color: '#eab308', background: 'rgba(250, 204, 21, 0.05)' }} aria-live="polite" title="Consecutive active days">
            <span aria-hidden="true" className="animate-pulse">🔥</span>
            <span className="font-bold">5 Day Streak</span>
          </div>

          <div className="score-badge" style={{ borderColor: 'rgba(15, 222, 114, 0.3)', color: '#0bc060', background: 'rgba(15, 222, 114, 0.05)' }} aria-live="polite" title="Your current Eco Level">
            <span aria-hidden="true">⭐</span>
            <span className="font-bold">Lvl 3: Eco Warrior</span>
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
          <>
            <CommandModules />
            <CarbonAnalytics />
          </>
        )}
      </main>
    </>
  )
}

export default App
