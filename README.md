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
**Carbon Footprint Awareness Platform**
We chose this vertical to pivot the narrative from *guilt-inducing measurement* to *gamified action*. 

### How we address the Brief's Core Pillars:
| Pillar | In the product |
| --- | --- |
| **Understand** | Real-time calculations break down the user's footprint by category and compare it against the global average and Paris-aligned sustainable targets via interactive Radar and Donut charts. |
| **Track** | Gamification engine tracks a consecutive "Day Streak" and "Eco Points" stored securely in `localStorage`, giving instant feedback on daily eco-habits. |
| **Reduce** | The Insights Wizard dynamically ranks the user's highest emission sources and categorizes tailored recommendations into an Effort vs Impact matrix (e.g., Quick Wins vs Strategic Planning). |

---

## 🧠 Approach and Logic

### The Decision Flow (Smart, Context-Driven Assistant)
```text
User Inputs (Transit, Energy, Diet, Goods)
        │
        ▼
Zero-Trust Engine  ──►  Per-Category kg CO₂e  ──►  Ranked by Size
        │                                          │
        ▼                                          ▼
Comparison to Targets                  Insights Generator
(Paris Agreement Benchmarks)             ├─ Filters highest impact areas
                                         └─ Maps to Effort vs Impact matrix
        │
        ▼
Save Snapshot (localStorage, Zero-Backend) → Gamification & Streaks
```

Our logic is based on creating a **Zero-Trust Client-Side Engine**.
- **Logical Decision Making**: The system ranks the user's own emission categories and gives advice for the biggest contributors—a heavy driver is told about transport; a heavy-meat eater is told about diet.
- **Emission Model Legitimacy**: Footprint calculations utilize standard emission factors derived from published datasets (DEFRA, EPA) normalized to annual kg CO₂e.

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
