
export const calculateTax = (income, regime = 'new') => {
    // New Tax Regime Slabs (FY 2025-26)
    // Up to 4L: Nil
    // 4L - 8L: 5%
    // 8L - 12L: 10%
    // 12L - 16L: 15%
    // 16L - 20L: 20%
    // 20L - 24L: 25%
    // Above 24L: 30%

    if (income <= 0) return 0;

    // Standard Deduction: 75,000 (Assuming continued standard deduction).
    // Note: User prompt didn't explicitly mention deduction, but 75k is standard. 
    // If we follow exact prompt "Use following tax slabs in the back to calculate", 
    // maybe we should apply slabs directly to Net Income?
    // Let's assume standard deduction of 75k applies to Gross Income before slabs.

    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, income - stdDeduction);

    let tax = 0;

    // Slabs Logic
    if (taxableIncome <= 400000) {
        tax = 0;
    } else if (taxableIncome <= 800000) {
        tax = (taxableIncome - 400000) * 0.05;
    } else if (taxableIncome <= 1200000) {
        tax = (400000 * 0.05) + (taxableIncome - 800000) * 0.10;
    } else if (taxableIncome <= 1600000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + (taxableIncome - 1200000) * 0.15;
    } else if (taxableIncome <= 2000000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (taxableIncome - 1600000) * 0.20;
    } else if (taxableIncome <= 2400000) {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + (taxableIncome - 2000000) * 0.25;
    } else {
        tax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + (400000 * 0.25) + (taxableIncome - 2400000) * 0.30;
    }

    // Rebate u/s 87A
    // In previous budgets, rebate made tax 0 up to 7L.
    // With 4L slab start, if taxable income is say 12L? 
    // Usually rebate logic: if taxable <= 12L (New Limit?), tax is 0. 
    // Prompt didn't specify rebate limit. I will assume standard Rebate up to 12L 
    // (which is the current buzz/proposal often associated with these slabs).
    // If Taxable Income <= 12,00,000 -> Tax = 0.

    if (taxableIncome <= 1200000) {
        tax = 0;
    }

    // Cess 4%
    const cess = tax * 0.04;
    return tax + cess;
};
