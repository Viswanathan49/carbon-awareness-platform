import { useStore } from '../store/useStore'

const landingTranslations = {
  EN: {
    heroTitle: "Master Your Carbon Footprint",
    heroSubtitle: "Understand, track, and reduce your emissions through simple daily actions and personalized insights.",
    cta: "Start Your Journey",
    feat1Title: "📊 Dynamic Tracking",
    feat1Desc: "Log your daily commutes, diet choices, and utility usage to see your environmental footprint in real-time.",
    feat2Title: "💡 Personalized Insights",
    feat2Desc: "Receive custom recommendations to reduce your footprint where it matters most, tailored to your habits.",
    feat3Title: "🏆 Gamified Rewards",
    feat3Desc: "Complete challenges, build eco-friendly habits, and earn points as you transition to a low-carbon lifestyle."
  },
  HI: {
    heroTitle: "अपने कार्बन फुटप्रिंट को नियंत्रित करें",
    heroSubtitle: "सरल दैनिक कार्यों और व्यक्तिगत अंतर्दृष्टि के माध्यम से अपने उत्सर्जन को समझें, ट्रैक करें और कम करें।",
    cta: "अपनी यात्रा शुरू करें",
    feat1Title: "📊 गतिशील ट्रैकिंग",
    feat1Desc: "वास्तविक समय में अपने पर्यावरणीय फुटप्रिंट को देखने के लिए अपनी दैनिक यात्रा, आहार विकल्पों और उपयोगिता उपयोग को लॉग करें।",
    feat2Title: "💡 व्यक्तिगत अंतर्दृष्टि",
    feat2Desc: "अपनी आदतों के अनुकूल, सबसे महत्वपूर्ण क्षेत्रों में अपने फुटप्रिंट को कम करने के लिए कस्टम सुझाव प्राप्त करें।",
    feat3Title: "🏆 गेमीफाइड पुरस्कार",
    feat3Desc: "चुनौतियों को पूरा करें, पर्यावरण अनुकूल आदतें बनाएं, और कम-कार्बन जीवन शैली में परिवर्तन के साथ अंक अर्जित करें।"
  }
}

export default function LandingPage({ onStart }) {
  const { language } = useStore()
  const t = landingTranslations[language]

  return (
    <div className="landing-container">
      <header className="landing-hero">
        <h1 className="landing-hero-title">{t.heroTitle}</h1>
        <p className="landing-hero-subtitle">{t.heroSubtitle}</p>
        
        <button 
          className="btn-neon btn-pulse" 
          onClick={onStart}
          aria-label={`${t.cta} and open the carbon assessment wizard`}
        >
          ✨ {t.cta}
        </button>
      </header>

      <section className="landing-features" aria-label="Key Features">
        <div className="feature-grid">
          <div className="feature-column">
            <h2 className="feature-title">{t.feat1Title}</h2>
            <p className="feature-desc">{t.feat1Desc}</p>
          </div>
          
          <div className="feature-column">
            <h2 className="feature-title">{t.feat2Title}</h2>
            <p className="feature-desc">{t.feat2Desc}</p>
          </div>
          
          <div className="feature-column">
            <h2 className="feature-title">{t.feat3Title}</h2>
            <p className="feature-desc">{t.feat3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
