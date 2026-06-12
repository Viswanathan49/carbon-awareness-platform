<div align="center">

# 🟢 CARBON**PULSE**
**[Challenge 3] Carbon Footprint Awareness Platform**

<p align="center">
  <img src="https://img.shields.io/badge/React_SWC-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
  <img src="https://img.shields.io/badge/WCAG_100%25-121212?style=for-the-badge&logo=w3c&logoColor=0FDE72" />
</p>

> *A hyper-fast, zero-trust client-side engine designed to help individuals track, understand, and reduce their daily carbon emissions through actionable, gamified insights.*

</div>

<br />

## 🚀 The Dashboard Experience
Instead of a static calculator, CarbonPulse acts as a dynamic environmental command center.

| Feature | Technical Implementation | Impact |
| :--- | :--- | :--- |
| **🧠 Insights Wizard** | Multi-step React state engine | Personalizes advice based on Transit, Diet & Energy choices. |
| **🏆 Gamified Tracker** | Real-time `carbonScore` manipulation | Hooks users with instant point rewards for eco-habits. |
| **🔒 Zero-Trust Auth** | Browser `localStorage` persistence | Complete privacy. Zero backend vulnerabilities or latency. |
| **🌐 Native i18n** | Synchronous EN/HI state dictionary | Instant UI translation without heavy library bloat. |

<br />

## 🏗️ System Architecture

<details>
<summary><b>👁️ Click to view the Application Architecture</b></summary>
<br />

```mermaid
graph TD;
    Client[User Browser] -->|HTTPS| CDN[Google Cloud Run Container];
    CDN -->|Nginx Routing| UI[React / Vite SPA];
    
    subgraph Client-Side State Engine
    UI --> State[Local State Manager];
    UI --> I18n[EN/HI Dictionary];
    State --> Storage[(Browser LocalStorage)];
    Storage -.->|Persists Session & Auth| State;
    end
```

</details>
