import type { AffordabilityInputs, AffordabilityResults } from '@/types';
import { principalFromPayment } from './loan';

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityResults {
  const {
    annualGrossIncome,
    monthlyTakeHome,
    monthlyRent,
    monthlyDebt,
    insuranceEstimate,
    downPayment,
    loanTermMonths,
    apr,
    monthlyBudgetCap,
  } = inputs;

  const monthlyGross = annualGrossIncome / 12;

  // Conservative: 10% of take-home for total transportation; subtract insurance
  const rawConservative = monthlyTakeHome * 0.10;
  // Stretch: 15% of take-home
  const rawStretch = monthlyTakeHome * 0.15;

  // Subtract insurance from max payment
  const conservativePayment = Math.max(0, rawConservative - insuranceEstimate);
  const stretchPayment = Math.max(0, rawStretch - insuranceEstimate);

  // Apply optional budget cap
  const cappedConservative = monthlyBudgetCap
    ? Math.min(conservativePayment, monthlyBudgetCap - insuranceEstimate)
    : conservativePayment;
  const cappedStretch = monthlyBudgetCap
    ? Math.min(stretchPayment, monthlyBudgetCap - insuranceEstimate)
    : stretchPayment;

  // Reverse-amortize to find max vehicle price
  const financedConservative = principalFromPayment(cappedConservative, apr, loanTermMonths);
  const financedStretch = principalFromPayment(cappedStretch, apr, loanTermMonths);

  const conservativeVehiclePrice = financedConservative + downPayment;
  const stretchVehiclePrice = financedStretch + downPayment;

  // Total monthly obligations at each scenario
  const totalMonthlyDebtWithConservative =
    monthlyRent + monthlyDebt + cappedConservative + insuranceEstimate;
  const totalMonthlyDebtWithStretch =
    monthlyRent + monthlyDebt + cappedStretch + insuranceEstimate;

  // Debt-to-income ratios
  const debtToIncomeConservative = monthlyGross > 0
    ? (totalMonthlyDebtWithConservative / monthlyGross) * 100 : 0;
  const debtToIncomeStretch = monthlyGross > 0
    ? (totalMonthlyDebtWithStretch / monthlyGross) * 100 : 0;

  // Remaining monthly budget after all obligations (conservative scenario)
  const monthlyBudgetRemaining =
    monthlyTakeHome - totalMonthlyDebtWithConservative;

  // Overall interpretation based on DTI at stretch scenario
  const existingDTI = monthlyGross > 0
    ? ((monthlyRent + monthlyDebt) / monthlyGross) * 100 : 0;

  let interpretation: AffordabilityResults['interpretation'];
  let interpretationNote: string;

  if (debtToIncomeStretch < 36 && monthlyBudgetRemaining > 500) {
    interpretation = 'comfortable';
    interpretationNote =
      'Based on your income and existing obligations, a car in this range fits comfortably within standard affordability guidelines. You have reasonable financial cushion after monthly expenses.';
  } else if (debtToIncomeStretch < 43) {
    interpretation = 'stretch';
    interpretationNote =
      'A car at the upper range of this budget is a stretch given your current obligations. It is financially achievable, but leaves limited cushion for unexpected expenses or savings.';
  } else {
    interpretation = 'aggressive';
    interpretationNote =
      'Your existing debt and housing costs are already high relative to income. Adding a car payment at this level would push your debt-to-income ratio into territory that many lenders and financial planners consider risky.';
  }

  return {
    conservativePayment: cappedConservative,
    stretchPayment: cappedStretch,
    conservativeVehiclePrice,
    stretchVehiclePrice,
    totalMonthlyDebtWithConservative,
    totalMonthlyDebtWithStretch,
    debtToIncomeConservative,
    debtToIncomeStretch,
    interpretation,
    interpretationNote,
    monthlyBudgetRemaining,
  };
}
