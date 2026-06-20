<div align="center">

# 🟢 CARBON**PULSE**
**[Challenge 3] Carbon Footprint Awareness Platform**

<p align="center">
  <img src="https://img.shields.io/badge/React_SWC-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
  <img src="https://img.shields.io/badge/Security-CSP_Enabled-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/WCAG_100%25-121212?style=for-the-badge&logo=w3c&logoColor=0FDE72" />
</p>

> *A hyper-fast, zero-trust client-side engine designed to help individuals track, understand, and reduce their daily carbon emissions through actionable, gamified insights.*

</div>

---

## 🎯 Chosen Vertical
**Carbon Footprint Tracker**
We chose this vertical to pivot the narrative from *guilt-inducing measurement* to *gamified action*. Current carbon calculators are static and ultimately abandoned by users after a single session. CarbonPulse provides real-time dopamine hits for sustainable choices, removing friction and encouraging daily environmental mindfulness.

---

## 🧠 Approach and Logic
Our logic is based on creating a **Zero-Trust Client-Side Engine**.
- **Performance over Bloat**: Instead of heavy backends, we process all emission factors dynamically in the browser using React state.
- **Gamification Loop**: By tracking a `carbonScore` alongside `pointsEarned` (Eco Points) and a consecutive "5 Day Streak" metric, we incentivize users to return daily to log their eco-friendly habits.
- **Data Visualizations**: We utilize Recharts to render an interactive `DonutChart` and an `Effort vs Impact Matrix` to reduce cognitive load on the user, instantly highlighting "Quick Wins".

---

## ⚙️ How the Solution Works
1. **The Insights Wizard**: Upon initialization, the user inputs their daily habits across Transit, Home Energy, Diet, and Shopping.
2. **Real-time Processing**: Using hardcoded, science-backed Emission Factors (e.g., Petrol: 0.21 kg CO₂e/km, Meat: 5.5 kg CO₂e/meal), the engine instantly calculates the total footprint.
3. **Actionable Recommendations**: The system generates a prioritized list of actions based on the user's highest emission category, mapping them to an Effort/Impact grid.
4. **Secure Storage**: All session states, streaks, and preferences are cryptographically hashed and saved via `localStorage`. The server never touches PII.

---

## 📝 Assumptions Made
- **Emission Averages**: We assume global average emission factors for transit, energy, and diet to maintain a streamlined UX without requiring users to input their exact geographic locale.
- **Target Threshold**: We assume a "Paris Agreement" personal target of 2.1 tonnes per year (roughly 40kg per week) as the benchmark for the Radar Chart comparisons.
- **Single-User Device**: Since the data is persisted via `localStorage`, we assume the application is running on a personal device rather than a public terminal.

---

## 💻 Installation & Evaluation
To run the CarbonPulse platform locally or run evaluation tests:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Viswanathan49/carbon-awareness-platform.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the testing suite**:
   ```bash
   npm run test
   ```
4. **Spin up the Vite dev server**:
   ```bash
   npm run dev
   ```
