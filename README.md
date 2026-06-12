# Carbon Footprint Awareness Platform

## 🎯 Chosen Vertical
[Challenge 3] Carbon Footprint Awareness Platform. A dynamic, frontend-driven assistant designed to help individuals track, understand, and reduce their daily carbon emissions through actionable, gamified insights.

## 🧠 Approach and Logic
- **Smart Dynamic Assistant:** An interactive onboarding Wizard that personalizes insights based on user inputs (diet, transit, energy use).
- **Gamification & Engagement:** Daily tracking mechanics and interactive components to foster sustained eco-friendly habits.
- **Accessibility & Localization:** Built-in multi-lingual support (EN/HI) and full WCAG-compliant ARIA labeling.

## ⚙️ How the Solution Works
1. **Frontend Architecture:** Built strictly with React, Vite, and SWC for hyper-fast client-side execution.
2. **Global State:** Manages the user's carbon footprint score and language preferences dynamically.
3. **DevOps & Testing:** CI/CD pipeline integrated via GitHub Actions, with automated unit testing handled by Vitest and React Testing Library.

## 📌 Assumptions Made
- The application operates entirely client-side to ensure zero backend latency and maximum data privacy.
- User data is transiently managed in the browser session/local storage, requiring no external database connections.
