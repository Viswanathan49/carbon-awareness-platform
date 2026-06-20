import React, { useState, useEffect } from 'react';

const TOUR_STEPS = [
  { title: "Welcome to CarbonPulse", text: "Your personal environmental command center. Let's initialize your profile." },
  { title: "The Insights Wizard", text: "Input your daily habits—transit, diet, and energy—to generate a baseline carbon score." },
  { title: "Gamified Tracking", text: "Log daily eco-actions like using public transit to earn points and lower your footprint dynamically." },
  { title: "Zero-Trust Privacy", text: "All your data is encrypted and stored locally in your browser. No databases. Absolute privacy." }
];

export default function SystemTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="system-tour-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        borderRadius: '24px',
        border: '1px solid rgba(15, 222, 114, 0.2)',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '1rem'
        }}>
          {TOUR_STEPS.map((_, idx) => (
            <div key={idx} className={idx <= currentStep ? '' : 'bg-gray-200 dark:bg-white/10'} style={{
              height: '4px',
              flex: 1,
              borderRadius: '2px',
              backgroundColor: idx <= currentStep ? '#0FDE72' : undefined,
              transition: 'background-color 0.3s ease',
              boxShadow: idx <= currentStep ? '0 0 10px rgba(15, 222, 114, 0.5)' : 'none'
            }} />
          ))}
        </div>

        <div>
          <h2 className="text-neon-glow" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#0FDE72',
            margin: '0 0 1rem 0'
          }}>
            {TOUR_STEPS[currentStep].title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300" style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            margin: 0
          }}>
            {TOUR_STEPS[currentStep].text}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <button 
            onClick={handleClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: '0.5rem',
              fontWeight: 500
            }}
          >
            Skip Sequence
          </button>
          
          <button 
            onClick={handleNext}
            className="neon-btn btn-neon btn-pulse"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px'
            }}
          >
            {currentStep === TOUR_STEPS.length - 1 ? 'Initialize System' : 'Next Phase'}
          </button>
        </div>
      </div>
    </div>
  );
}
