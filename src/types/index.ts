// ─── Loan ────────────────────────────────────────────────────────────────────

export interface LoanInputs {
  vehiclePrice: number;
  salesTaxPercent: number;
  downPayment: number;
  tradeInValue: number;
  interestRate: number;   // APR %
  loanTermMonths: number;
  fees: number;
  feesFinanced: boolean;
}

export interface LoanResults {
  amountFinanced: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  outTheDoorPrice: number;
  dealHealth: 'strong' | 'fair' | 'expensive';
  dealHealthLabel: string;
  dealHealthNote: string;
}

// ─── Lease ───────────────────────────────────────────────────────────────────

export interface LeaseInputs {
  msrp: number;
  sellingPrice: number;
  downPayment: number;
  tradeInCredit: number;
  residualPercent: number;
  moneyFactor: number;
  leaseTermMonths: number;
  salesTaxPercent: number;
  fees: number;
  acquisitionFee: number;
  rebate: number;
}

export interface LeaseResults {
  residualValue: number;
  adjustedCapCost: number;
  depreciationFee: number;
  financeFee: number;
  baseMonthlyPayment: number;
  monthlyPaymentWithTax: number;
  dueAtSigning: number;
  effectiveAPR: number;
  paymentAsMSRPPercent: number;
  dealRating: 'great' | 'fair' | 'weak';
  dealRatingLabel: string;
  dealRatingNote: string;
}

// ─── Affordability ────────────────────────────────────────────────────────────

export interface AffordabilityInputs {
  annualGrossIncome: number;
  monthlyTakeHome: number;
  monthlyRent: number;
  monthlyDebt: number;
  insuranceEstimate: number;
  downPayment: number;
  loanTermMonths: number;
  apr: number;
  monthlyBudgetCap?: number;
}

export interface AffordabilityResults {
  conservativePayment: number;
  stretchPayment: number;
  conservativeVehiclePrice: number;
  stretchVehiclePrice: number;
  totalMonthlyDebtWithConservative: number;
  totalMonthlyDebtWithStretch: number;
  debtToIncomeConservative: number;
  debtToIncomeStretch: number;
  interpretation: 'comfortable' | 'stretch' | 'aggressive';
  interpretationNote: string;
  monthlyBudgetRemaining: number;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  content: string; // HTML string
}
