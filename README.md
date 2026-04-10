<div align="center">

# Where Is Your Tax Money Going?

**Enter your income. See your tax. See exactly where it goes.**
An interactive breakdown of India's Union Budget 2025 — personalised to your salary.

[![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-0078d4?style=flat-square)]()
[![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)]()

[What is it](#what-is-it) · [How it Works](#how-it-works) · [Run Locally](#run-locally) · [Tech Stack](#tech-stack)

</div>

---

## What is it?

A React web app that makes India's Union Budget personal. Enter your annual income, see how much tax you pay, and then see exactly how that tax rupee is allocated — sector by sector — based on the real Budget 2025 allocation percentages.

Generates a shareable card so you can post your allocation breakdown on social media.

---

## How it Works

1. **Enter your income** — annual CTC or take-home
2. **See your tax** — calculated under the New Tax Regime (FY 2025-26)
3. **Reveal your allocation** — your tax broken down across Education, Health, Defence, Infrastructure, Agriculture, and more
4. **Download & share** — save your personalised allocation card as an image

---

## Run Locally

**Requirements:** Node.js 18+

```bash
git clone https://github.com/x26prakhar/Where-is-your-tax-money-going-.git
cd Where-is-your-tax-money-going-

npm install
npm run dev
```

Open `http://localhost:5173`

---

## Build for Production

```bash
npm run build
# Output goes to dist/
```

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | [React](https://react.dev) |
| Build tool | [Vite](https://vitejs.dev) |
| Tax logic | Custom — `src/utils/taxLogic.js` |
| Budget data | `src/utils/budgetData.js` (Budget 2025 allocations) |
| Share card | html2canvas |
| Icons | lucide-react |

---

## File Structure

```
Where-is-your-tax-money-going-/
├── src/
│   ├── App.jsx              # Main app — steps, state, download logic
│   ├── index.css            # Global styles
│   ├── main.jsx             # React entry point
│   └── utils/
│       ├── taxLogic.js      # New regime tax calculation
│       └── budgetData.js    # Budget 2025 sector allocations
├── index.html
├── vite.config.js
└── package.json
```

---

## Data Sources

- Tax slabs: Income Tax India FY 2025-26 (New Regime)
- Budget allocations: Union Budget 2025-26 — Ministry-wise expenditure

---

## Data & Privacy

No backend. No analytics. All calculations run in your browser — nothing is stored or transmitted.

---

<div align="center">
  Built by <a href="https://www.linkedin.com/in/prakharsingh96/">Prakhar Singh</a>
  &nbsp;·&nbsp;
  <a href="https://www.instagram.com/prakhar.vc/">@prakhar.vc</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/x26prakhar/Where-is-your-tax-money-going-">GitHub</a>
</div>
