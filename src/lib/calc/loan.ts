import type { LoanInputs, LoanResults } from '@/types';

/** Standard amortized monthly payment formula. */
function monthlyPayment(principal: number, annualRatePercent: number, termMonths: number): number {
  if (principal <= 0) return 0;
  if (annualRatePercent === 0) return principal / termMonths;
  const r = annualRatePercent / 100 / 12;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

/** Reverse-engineer principal from a desired monthly payment. */
export function principalFromPayment(payment: number, annualRatePercent: number, termMonths: number): number {
  if (annualRatePercent === 0) return payment * termMonths;
  const r = annualRatePercent / 100 / 12;
  return (payment * (Math.pow(1 + r, termMonths) - 1)) / (r * Math.pow(1 + r, termMonths));
}

function dealHealth(apr: number): LoanResults['dealHealth'] {
  if (apr < 5)  return 'strong';
  if (apr < 10) return 'fair';
  return 'expensive';
}

function dealHealthLabel(health: LoanResults['dealHealth']): string {
  return { strong: 'Strong Rate', fair: 'Fair Rate', expensive: 'High Rate' }[health];
}

function dealHealthNote(apr: number, health: LoanResults['dealHealth']): string {
  const formatted = apr.toFixed(2);
  if (health === 'strong')    return `Your APR of ${formatted}% is below the national average — that's a competitive rate worth locking in.`;
  if (health === 'fair')      return `Your APR of ${formatted}% is in line with average rates. If your credit allows, it may be worth shopping for a lower offer.`;
  return `An APR of ${formatted}% is above average and will meaningfully increase your total cost. Consider improving your credit score or making a larger down payment.`;
}

export function calculateLoan(inputs: LoanInputs): LoanResults {
  const {
    vehiclePrice,
    salesTaxPercent,
    downPayment,
    tradeInValue,
    interestRate,
    loanTermMonths,
    fees,
    feesFinanced,
  } = inputs;

  const taxAmount = vehiclePrice * (salesTaxPercent / 100);
  const feesInLoan = feesFinanced ? fees : 0;
  const feesUpfront = feesFinanced ? 0 : fees;

  const amountFinanced = Math.max(
    0,
    vehiclePrice + taxAmount + feesInLoan - downPayment - tradeInValue
  );

  const payment = monthlyPayment(amountFinanced, interestRate, loanTermMonths);
  const totalPaid = payment * loanTermMonths;
  const totalInterest = totalPaid - amountFinanced;

  // Out-the-door = vehicle + tax + all fees, net of trade and down
  const outTheDoor = vehiclePrice + taxAmount + fees - tradeInValue;

  const health = dealHealth(interestRate);

  return {
    amountFinanced,
    monthlyPayment: payment,
    totalPayments: totalPaid,
    totalInterest: Math.max(0, totalInterest),
    outTheDoorPrice: outTheDoor,
    dealHealth: health,
    dealHealthLabel: dealHealthLabel(health),
    dealHealthNote: dealHealthNote(interestRate, health),
  };
}
