import type { LeaseInputs, LeaseResults } from '@/types';

/** Money factor to APR equivalent (approximate). */
function moneyFactorToAPR(mf: number): number {
  return mf * 2400;
}

function dealRating(paymentPct: number): LeaseResults['dealRating'] {
  if (paymentPct < 0.8)  return 'great';
  if (paymentPct < 1.05) return 'fair';
  return 'weak';
}

function dealRatingLabel(rating: LeaseResults['dealRating']): string {
  return { great: 'Great Deal', fair: 'Fair Deal', weak: 'Weak Deal' }[rating];
}

function dealRatingNote(rating: LeaseResults['dealRating'], pct: number, mf: number): string {
  const pctFormatted = pct.toFixed(2);
  const aprEquiv = moneyFactorToAPR(mf).toFixed(1);
  if (rating === 'great') {
    return `Your payment is ${pctFormatted}% of MSRP per month — below the 0.8% threshold that typically signals a competitive deal. The money factor equates to roughly ${aprEquiv}% APR.`;
  }
  if (rating === 'fair') {
    return `Your payment is ${pctFormatted}% of MSRP per month, which is in line with average lease deals. The money factor equates to roughly ${aprEquiv}% APR. Compare competing programs before signing.`;
  }
  return `Your payment is ${pctFormatted}% of MSRP per month — above the 1% threshold that often indicates a below-average lease deal. The money factor equates to roughly ${aprEquiv}% APR. Consider negotiating the selling price down or waiting for a better incentive month.`;
}

export function calculateLease(inputs: LeaseInputs): LeaseResults {
  const {
    msrp,
    sellingPrice,
    downPayment,
    tradeInCredit,
    residualPercent,
    moneyFactor,
    leaseTermMonths,
    salesTaxPercent,
    fees,
    acquisitionFee,
    rebate,
  } = inputs;

  const residualValue = msrp * (residualPercent / 100);

  const adjustedCapCost =
    sellingPrice + fees + acquisitionFee - rebate - downPayment - tradeInCredit;

  const depreciationFee = (adjustedCapCost - residualValue) / leaseTermMonths;
  const financeFee = (adjustedCapCost + residualValue) * moneyFactor;

  const baseMonthlyPayment = depreciationFee + financeFee;
  const monthlyPaymentWithTax = baseMonthlyPayment * (1 + salesTaxPercent / 100);

  // Simplified due-at-signing: first month + down + acq fee + fees (taxes vary by state)
  const dueAtSigning = downPayment + acquisitionFee + fees + monthlyPaymentWithTax;

  const effectiveAPR = moneyFactorToAPR(moneyFactor);

  // Payment as % of MSRP — the key lease efficiency metric
  const paymentAsMSRPPercent = msrp > 0 ? (monthlyPaymentWithTax / msrp) * 100 : 0;

  const rating = dealRating(paymentAsMSRPPercent);

  return {
    residualValue,
    adjustedCapCost,
    depreciationFee,
    financeFee,
    baseMonthlyPayment,
    monthlyPaymentWithTax,
    dueAtSigning,
    effectiveAPR,
    paymentAsMSRPPercent,
    dealRating: rating,
    dealRatingLabel: dealRatingLabel(rating),
    dealRatingNote: dealRatingNote(rating, paymentAsMSRPPercent, moneyFactor),
  };
}
