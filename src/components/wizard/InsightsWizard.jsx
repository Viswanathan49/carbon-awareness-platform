import { useState } from 'react'
import { useStore } from '../../store/useStore'

const wizardTranslations = {
  EN: {
    title: "Personalized Insights Wizard",
    progress: "Step {current} of {total}",
    next: "Next Step",
    back: "Previous Step",
    finish: "Apply Score & Finish",
    restart: "Retake Assessment",
    step1Title: "1. Primary Transportation Mode",
    step1Desc: "How do you get to work, school, or run errands? Transport is a major driver of individual carbon footprint.",
    car: "Petrol / Diesel Car",
    ev: "Electric Vehicle (EV)",
    transit: "Public Transit (Bus/Train)",
    bike: "Bicycle / Walking",
    step2Title: "2. Diet Profile",
    step2Desc: "What is your typical food consumption? Food production accounts for up to a quarter of global emissions.",
    meat: "Meat-Heavy Diet",
    balanced: "Balanced / Flexitarian",
    veg: "Vegetarian",
    vegan: "Vegan (Plant-Based)",
    step3Title: "3. Household Utility Energy Source",
    step3Desc: "How is your home powered? Heating, cooling, and electricity carbon impact depends on the grid source.",
    grid: "Standard Coal/Gas Grid",
    mixed: "Mixed Grid (with Solar/Wind)",
    renewable: "100% Green / Solar Panels",
    resultsTitle: "Your Personal Assessment",
    resultsDesc: "Based on your selections, your estimated monthly footprint is:",
    comparisonHigh: "High. Your emissions are above the national target.",
    comparisonMedium: "Moderate. You're doing well, but there is room for reduction.",
    comparisonLow: "Low. Excellent job! You are keeping your impact minimal.",
    recommendationTitle: "💡 Highest Impact Reduction Action",
    recTransport: "Commute Shift: Swapping 2 car trips per week for a bicycle or transit reduces transport emissions by ~25%.",
    recDiet: "Diet Shift: Swapping red meat for plant-based proteins just 3 days a week cuts food-related emissions by ~40%.",
    recEnergy: "Energy Shift: Installing solar panels or switching to a certified green utility tariff cuts power emissions by up to 90%.",
    successMsg: "Score applied to your global dashboard!",
  },
  HI: {
    title: "व्यक्तिगत अंतर्दृष्टि विज़ार्ड",
    progress: "चरण {current} का {total}",
    next: "अगला चरण",
    back: "पिछला चरण",
    finish: "स्कोर लागू करें और समाप्त करें",
    restart: "पुनः मूल्यांकन लें",
    step1Title: "1. प्राथमिक परिवहन साधन",
    step1Desc: "आप काम, स्कूल या काम से कैसे जाते हैं? व्यक्तिगत कार्बन फुटप्रिंट में परिवहन एक मुख्य कारक है।",
    car: "पेट्रोल / डीजल कार",
    ev: "इलेक्ट्रिक वाहन (EV)",
    transit: "सार्वजनिक वाहन (बस/ट्रेन)",
    bike: "साइकिल / पैदल",
    step2Title: "2. आहार प्रोफ़ाइल",
    step2Desc: "आपका सामान्य भोजन क्या है? खाद्य उत्पादन वैश्विक उत्सर्जन के लगभग एक-चौथाई हिस्से के लिए जिम्मेदार है।",
    meat: "मांसाहारी आहार (अधिक मांस)",
    balanced: "संतुलित / मिश्रित",
    veg: "शाकाहारी",
    vegan: "पूर्ण शाकाहारी (पौधों पर आधारित)",
    step3Title: "3. घरेलू उपयोगिता ऊर्जा स्रोत",
    step3Desc: "आपके घर को ऊर्जा कैसे मिलती है? हीटिंग, कूलिंग और बिजली का कार्बन प्रभाव ग्रिड स्रोत पर निर्भर करता है।",
    grid: "मानक कोयला/गैस ग्रिड",
    mixed: "मिश्रित ग्रिड (सौर/पवन के साथ)",
    renewable: "१००% हरित / सौर पैनल",
    resultsTitle: "आपका व्यक्तिगत मूल्यांकन",
    resultsDesc: "आपके चयनों के आधार पर, आपका अनुमानित मासिक फुटप्रिंट है:",
    comparisonHigh: "उच्च। आपका उत्सर्जन राष्ट्रीय लक्ष्य से अधिक है।",
    comparisonMedium: "मध्यम। आप अच्छा कर रहे हैं, लेकिन कमी की गुंजाइश है।",
    comparisonLow: "कम। उत्कृष्ट काम! आप अपना प्रभाव न्यूनतम रख रहे हैं।",
    recommendationTitle: "💡 उच्चतम प्रभाव कम करने की कार्य योजना",
    recTransport: "परिवहन बदलाव: प्रति सप्ताह २ कार यात्राओं को साइकिल या सार्वजनिक परिवहन से बदलने से उत्सर्जन में ~२५% की कमी आती है।",
    recDiet: "आहार बदलाव: सप्ताह में केवल ३ दिन लाल मांस की जगह पौधों पर आधारित प्रोटीन लेने से खाद्य-संबंधित उत्सर्जन में ~४०% की कमी आती है।",
    recEnergy: "ऊर्जा बदलाव: सौर पैनल स्थापित करने या प्रमाणित हरित बिजली प्रदाता पर स्विच करने से उत्सर्जन में ९०% तक की कमी आती है।",
    successMsg: "स्कोर आपके वैश्विक डैशबोर्ड पर लागू हो गया है!",
  }
}

// Emissions points configuration in kg CO2e / month
const EMISSIONS = {
  transport: { car: 240, ev: 90, transit: 40, bike: 0 },
  diet: { meat: 180, balanced: 100, veg: 50, vegan: 25 },
  energy: { grid: 280, mixed: 140, renewable: 15 }
}

export default function InsightsWizard() {
  const { language, setCarbonScore } = useStore()
  const [step, setStep] = useState(1)
  
  // Local selections
  const [transport, setTransport] = useState('car')
  const [diet, setDiet] = useState('meat')
  const [energy, setEnergy] = useState('grid')
  
  const [scoreApplied, setScoreApplied] = useState(false)
  const t = wizardTranslations[language]

  // Calculate score based on selections
  const transportEmissions = EMISSIONS.transport[transport]
  const dietEmissions = EMISSIONS.diet[diet]
  const energyEmissions = EMISSIONS.energy[energy]
  const totalEmissions = transportEmissions + dietEmissions + energyEmissions

  // Determine highest impact category
  const emissionsMap = [
    { category: 'transport', score: transportEmissions, recommendation: t.recTransport },
    { category: 'diet', score: dietEmissions, recommendation: t.recDiet },
    { category: 'energy', score: energyEmissions, recommendation: t.recEnergy }
  ]
  emissionsMap.sort((a, b) => b.score - a.score)
  const highestImpact = emissionsMap[0]

  // Comparison rating
  let comparisonText = t.comparisonMedium
  let comparisonClass = "moderate"
  if (totalEmissions > 450) {
    comparisonText = t.comparisonHigh
    comparisonClass = "high"
  } else if (totalEmissions < 150) {
    comparisonText = t.comparisonLow
    comparisonClass = "low"
  }

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4))
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleFinish = () => {
    setCarbonScore(totalEmissions)
    setScoreApplied(true)
  }

  const handleRestart = () => {
    setStep(1)
    setTransport('car')
    setDiet('meat')
    setEnergy('grid')
    setScoreApplied(false)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <fieldset className="wizard-step-fieldset" style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="wizard-step-title" style={{ color: 'var(--text-primary)', width: '100%', float: 'left', border: 'none', padding: 0 }}>
              {t.step1Title}
            </legend>
            <p className="wizard-step-desc" style={{ clear: 'both' }}>{t.step1Desc}</p>
            
            <div className="wizard-options" role="radiogroup" aria-label={t.step1Title}>
              {[
                { id: 'car', label: t.car, score: EMISSIONS.transport.car, icon: '🚗' },
                { id: 'ev', label: t.ev, score: EMISSIONS.transport.ev, icon: '⚡' },
                { id: 'transit', label: t.transit, score: EMISSIONS.transport.transit, icon: '🚌' },
                { id: 'bike', label: t.bike, score: EMISSIONS.transport.bike, icon: '🚲' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`wizard-card-option ${transport === opt.id ? 'active' : ''}`}
                  onClick={() => setTransport(opt.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setTransport(opt.id); e.preventDefault(); } }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={transport === opt.id}
                  aria-label={`${opt.label}, impact: ${opt.score} kilograms carbon dioxide equivalent per month`}
                >
                  <span className="option-icon" aria-hidden="true">{opt.icon}</span>
                  <div className="option-details">
                    <span className="option-label">{opt.label}</span>
                    <span className="option-impact">+{opt.score} kg CO₂e / mo</span>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        )
      case 2:
        return (
          <fieldset className="wizard-step-fieldset" style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="wizard-step-title" style={{ color: 'var(--text-primary)', width: '100%', float: 'left', border: 'none', padding: 0 }}>
              {t.step2Title}
            </legend>
            <p className="wizard-step-desc" style={{ clear: 'both' }}>{t.step2Desc}</p>
            
            <div className="wizard-options" role="radiogroup" aria-label={t.step2Title}>
              {[
                { id: 'meat', label: t.meat, score: EMISSIONS.diet.meat, icon: '🥩' },
                { id: 'balanced', label: t.balanced, score: EMISSIONS.diet.balanced, icon: '🥗' },
                { id: 'veg', label: t.veg, score: EMISSIONS.diet.veg, icon: '🥚' },
                { id: 'vegan', label: t.vegan, score: EMISSIONS.diet.vegan, icon: '🌱' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`wizard-card-option ${diet === opt.id ? 'active' : ''}`}
                  onClick={() => setDiet(opt.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setDiet(opt.id); e.preventDefault(); } }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={diet === opt.id}
                  aria-label={`${opt.label}, impact: ${opt.score} kilograms carbon dioxide equivalent per month`}
                >
                  <span className="option-icon" aria-hidden="true">{opt.icon}</span>
                  <div className="option-details">
                    <span className="option-label">{opt.label}</span>
                    <span className="option-impact">+{opt.score} kg CO₂e / mo</span>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        )
      case 3:
        return (
          <fieldset className="wizard-step-fieldset" style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="wizard-step-title" style={{ color: 'var(--text-primary)', width: '100%', float: 'left', border: 'none', padding: 0 }}>
              {t.step3Title}
            </legend>
            <p className="wizard-step-desc" style={{ clear: 'both' }}>{t.step3Desc}</p>
            
            <div className="wizard-options" role="radiogroup" aria-label={t.step3Title}>
              {[
                { id: 'grid', label: t.grid, score: EMISSIONS.energy.grid, icon: '🏭' },
                { id: 'mixed', label: t.mixed, score: EMISSIONS.energy.mixed, icon: '🔌' },
                { id: 'renewable', label: t.renewable, score: EMISSIONS.energy.renewable, icon: '☀️' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`wizard-card-option ${energy === opt.id ? 'active' : ''}`}
                  onClick={() => setEnergy(opt.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setEnergy(opt.id); e.preventDefault(); } }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={energy === opt.id}
                  aria-label={`${opt.label}, impact: ${opt.score} kilograms carbon dioxide equivalent per month`}
                >
                  <span className="option-icon" aria-hidden="true">{opt.icon}</span>
                  <div className="option-details">
                    <span className="option-label">{opt.label}</span>
                    <span className="option-impact">+{opt.score} kg CO₂e / mo</span>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        )
      case 4:
        return (
          <div className="wizard-step-content">
            <h2 className="wizard-step-title">{t.resultsTitle}</h2>
            <p className="wizard-step-desc">{t.resultsDesc}</p>
            
            <div className="wizard-score-box">
              <span className="wizard-score-number">{totalEmissions}</span>
              <span className="wizard-score-unit">kg CO₂e / month</span>
            </div>
            
            <div className={`wizard-comparison ${comparisonClass}`}>
              <span className="comparison-dot"></span>
              <span>{comparisonText}</span>
            </div>

            <div className="wizard-recommendation-card">
              <h3 className="rec-title">{t.recommendationTitle}</h3>
              <p className="rec-text">{highestImpact.recommendation}</p>
            </div>

            {scoreApplied && (
              <div className="wizard-success-toast" role="status" aria-live="polite">
                ✔ {t.successMsg}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="wizard-section" aria-label="Carbon Assessment Wizard">
      <div className="wizard-wrapper">
        <div className="wizard-header">
          <h1 className="wizard-header-title">{t.title}</h1>
          <div className="wizard-progress-bar-container">
            <div 
              className="wizard-progress-bar" 
              style={{ width: `${(step / 4) * 100}%` }}
              aria-hidden="true"
            ></div>
          </div>
          <span className="wizard-step-indicator">
            {t.progress.replace('{current}', step).replace('{total}', 4)}
          </span>
        </div>

        <div className="wizard-body">
          {renderStep()}
        </div>

        <div className="wizard-footer">
          {step > 1 && (
            <button 
              className="btn-secondary" 
              onClick={handleBack}
              aria-label={t.back}
            >
              ← {t.back}
            </button>
          )}
          
          {step < 4 ? (
            <button 
              className="btn-neon" 
              onClick={handleNext}
              style={{ marginLeft: 'auto' }}
              aria-label={t.next}
            >
              {t.next} →
            </button>
          ) : (
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <button 
                className="btn-secondary" 
                onClick={handleRestart}
                aria-label={t.restart}
              >
                🔄 {t.restart}
              </button>
              <button 
                className="btn-neon" 
                onClick={handleFinish}
                disabled={scoreApplied}
                aria-label={t.finish}
              >
                ✨ {t.finish}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
