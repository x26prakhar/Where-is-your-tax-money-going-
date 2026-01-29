
// Budget 2025 Data (Figures in Estimate Percentages for "Rupee Goes To")
// Updated based on User Request V5

export const BUDGET_ALLOCATION = {
  interest: 0.27,      // 27% (Interest & Debt)
  defence: 0.13,       // 13%
  subsidies: 0.11,     // 11% (Subsidies & Welfare)
  infra: 0.12,         // 12% (Infrastructure non-rail)
  railways: 0.05,      // 5%
  education: 0.03,     // 3%
  healthcare: 0.02,    // 2%
  others: 0.27         // Remainder (1.0 - 0.73 = 0.27) -> Wait: 27+13+11+12+5+3+2 = 73. So 27% others is correct.
};

export const SECTOR_CONFIG = {
  interest: { label: 'Interest & Debt', icon: '🧾' },
  defence: { label: 'Defence', icon: '🛡️' },
  subsidies: { label: 'Subsidies & Welfare', icon: '🌾' },
  infra: { label: 'Infrastructure', icon: '🛣️' },
  railways: { label: 'Railways', icon: '🚄' },
  education: { label: 'Education', icon: '🎓' },
  healthcare: { label: 'Healthcare', icon: '🏥' },
  others: { label: 'Other Expenditure', icon: '📦' }
};

// Year-over-Year change data
export const BUDGET_IMPACT = {
  railways: {
    label: "Railways",
    changeRate: 0.01,
    trend: "up",
    explanation: "Capacity expansion priority"
  },
  infra: {
    label: "Infrastructure",
    changeRate: 0.02,
    trend: "up",
    explanation: "Focus on roads & connectivity"
  },
  healthcare: {
    label: "Healthcare",
    changeRate: -0.01,
    trend: "down",
    explanation: "Lower relative allocation"
  }
};
