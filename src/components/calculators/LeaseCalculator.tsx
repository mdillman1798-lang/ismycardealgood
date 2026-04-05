'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, HeroStat, Metric, DealAlert, BreakdownRow } from '@/components/ui/Card';
import { DealGauge } from '@/components/ui/DealGauge';
import { InfoTip } from '@/components/ui/InfoTip';
import { calculateLease } from '@/lib/calc/lease';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { LeaseInputs, LeaseResults } from '@/types';

const TERM_OPTIONS = [
  { value: 24, label: '24 months' },
  { value: 36, label: '36 months' },
  { value: 39, label: '39 months' },
  { value: 42, label: '42 months' },
  { value: 48, label: '48 months' },
];

const DEFAULT: LeaseInputs = {
  msrp: 42000,
  sellingPrice: 40000,
  downPayment: 2000,
  tradeInCredit: 0,
  residualPercent: 55,
  moneyFactor: 0.00128,
  leaseTermMonths: 36,
  salesTaxPercent: 8,
  fees: 800,
  acquisitionFee: 895,
  rebate: 0,
};

function ratingTone(r: LeaseResults['dealRating']): 'green' | 'yellow' | 'red' {
  return r === 'great' ? 'green' : r === 'fair' ? 'yellow' : 'red';
}

export function LeaseCalculator() {
  const [form, setForm] = useState(DEFAULT);
  const [results, setResults] = useState<LeaseResults | null>(null);

  function num(field: keyof LeaseInputs, value: string) {
    setForm((f) => ({ ...f, [field]: parseFloat(value) || 0 }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResults(calculateLease(form));
    setTimeout(() => {
      document.getElementById('lease-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSubmit} noValidate>
          {/* Vehicle */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Vehicle Pricing
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="MSRP (Sticker Price)"
                type="number" min={0} step={100} prefix="$"
                value={form.msrp || ''}
                onChange={(e) => num('msrp', e.target.value)}
                helper="The manufacturer's suggested retail price — used for residual calculation"
              />
              <Input
                label="Selling Price (Negotiated)"
                type="number" min={0} step={100} prefix="$"
                value={form.sellingPrice || ''}
                onChange={(e) => num('sellingPrice', e.target.value)}
                helper="The actual price you negotiate — lower is better"
              />
              <Input
                label="Down Payment / Cap Cost Reduction"
                type="number" min={0} step={100} prefix="$"
                value={form.downPayment || ''}
                onChange={(e) => num('downPayment', e.target.value)}
                helper="Money you put down at signing to reduce monthly payment"
              />
              <Input
                label="Trade-In Credit"
                type="number" min={0} step={100} prefix="$"
                value={form.tradeInCredit || ''}
                onChange={(e) => num('tradeInCredit', e.target.value)}
              />
              <Input
                label="Rebate / Incentive"
                type="number" min={0} step={100} prefix="$"
                value={form.rebate || ''}
                onChange={(e) => num('rebate', e.target.value)}
                helper="Manufacturer cash applied to the deal, if any"
              />
              <Input
                label="Sales Tax"
                type="number" min={0} max={20} step={0.1} suffix="%"
                value={form.salesTaxPercent || ''}
                onChange={(e) => num('salesTaxPercent', e.target.value)}
              />
            </div>
          </fieldset>

          {/* Lease terms */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Lease Program Terms
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Residual Value"
                type="number" min={1} max={100} step={0.5} suffix="%"
                value={form.residualPercent || ''}
                onChange={(e) => num('residualPercent', e.target.value)}
                helper="The % of MSRP the car is worth at lease end — set by the manufacturer"
              />
              <Input
                label="Money Factor"
                type="number" min={0} step={0.00001}
                value={form.moneyFactor || ''}
                onChange={(e) => num('moneyFactor', e.target.value)}
                helper={`Equivalent APR: ~${(form.moneyFactor * 2400).toFixed(2)}% — multiply by 2,400 to check`}
              />
              <Select
                label="Lease Term"
                options={TERM_OPTIONS}
                value={form.leaseTermMonths}
                onChange={(e) => num('leaseTermMonths', e.target.value)}
              />
              <Input
                label="Acquisition Fee"
                type="number" min={0} step={50} prefix="$"
                value={form.acquisitionFee || ''}
                onChange={(e) => num('acquisitionFee', e.target.value)}
                helper="Bank fee charged to initiate the lease — typically $695–$995"
              />
              <div className="sm:col-span-2">
                <Input
                  label="Other Fees"
                  type="number" min={0} step={50} prefix="$"
                  value={form.fees || ''}
                  onChange={(e) => num('fees', e.target.value)}
                  helper="Doc fee, registration, title — anything except acquisition fee"
                />
              </div>
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Calculate My Lease
          </Button>
        </form>
      </Card>

      {results && (
        <div id="lease-results" className="animate-slide-up space-y-4">
          {/* Primary stat */}
          <HeroStat
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPaymentWithTax, 2)}
            context={`${form.leaseTermMonths}-month lease · ${formatPercent(results.effectiveAPR, 1)} effective APR`}
          />

          {/* Supporting metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Metric
              label="Due at Signing"
              value={formatCurrency(results.dueAtSigning)}
              note="est. drive-off cost"
            />
            <Metric
              label="Base Monthly"
              value={formatCurrency(results.baseMonthlyPayment, 2)}
              note="pre-tax payment"
            />
            <Metric
              label="Total Lease Cost"
              value={formatCurrency(results.monthlyPaymentWithTax * form.leaseTermMonths + results.dueAtSigning)}
              note="payments + drive-off"
            />
          </div>

          {/* Deal gauge + rating alert */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] flex flex-col sm:flex-row items-center gap-0 overflow-hidden">
            <div className="sm:w-56 shrink-0 py-2 sm:border-r border-white/[0.07]">
              <DealGauge
                tone={ratingTone(results.dealRating)}
                label={results.dealRatingLabel}
                sublabel={`${results.paymentAsMSRPPercent.toFixed(2)}% of MSRP/mo`}
              />
            </div>
            <div className="flex-1 w-full p-4 sm:p-6">
              <DealAlert
                tone={ratingTone(results.dealRating)}
                label={`Lease Rating \u00b7 ${results.dealRatingLabel} \u00b7 ${results.paymentAsMSRPPercent.toFixed(2)}% of MSRP/mo`}
                note={results.dealRatingNote}
              />
            </div>
          </div>

          {/* Breakdown */}
          <Card>
            <h3 className="text-sm font-semibold text-white mb-1">Lease Calculation Breakdown</h3>
            <dl>
              <BreakdownRow label="MSRP" value={formatCurrency(form.msrp)} />
              <BreakdownRow
                label={<>{`Residual (${form.residualPercent}% of MSRP)`} <InfoTip text="The residual value is what the car is estimated to be worth at lease-end. It's set by the manufacturer's finance arm — not negotiable. A higher residual = lower monthly payment." /></>}
                value={formatCurrency(results.residualValue)}
              />
              <BreakdownRow
                label={<>Adjusted cap cost <InfoTip text="Cap cost (capitalized cost) is effectively the 'purchase price' used for the lease. It equals the selling price minus your down payment, trade-in, and any rebates. Lower cap cost = lower payment." /></>}
                value={formatCurrency(results.adjustedCapCost)} strong separator
              />
              <BreakdownRow label="Depreciation fee / mo" value={formatCurrency(results.depreciationFee, 2)} />
              <BreakdownRow
                label={<>Finance charge / mo <InfoTip text="The monthly interest cost on a lease, calculated as (adjusted cap cost + residual) × money factor. This is equivalent to interest on a loan — lower money factor = lower finance charge." /></>}
                value={formatCurrency(results.financeFee, 2)}
              />
              <BreakdownRow label="Base monthly payment" value={formatCurrency(results.baseMonthlyPayment, 2)} strong separator />
              <BreakdownRow label="Monthly with tax" value={formatCurrency(results.monthlyPaymentWithTax, 2)} strong />
              <BreakdownRow label="Due at signing (est.)" value={formatCurrency(results.dueAtSigning)} separator />
            </dl>
          </Card>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-xs font-semibold text-amber-800 mb-1">Tax treatment varies by state</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Some states tax the full vehicle value at lease inception rather than the monthly payment. Due-at-signing includes first month, down payment, acquisition fee, and other fees. Actual terms vary by lender and region.
            </p>
          </div>

          {/* Negotiate CTA */}
          <div className="rounded-xl bg-brand-600/10 border border-brand-500/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white mb-0.5">Don&rsquo;t want to negotiate yourself?</p>
              <p className="text-sm text-zinc-400">Skiplot will handle the entire negotiation for you.</p>
            </div>
            <a
              href="https://skiplot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors shrink-0 group"
            >
              Visit Skiplot.com
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          {/* Lead gen CTA */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-semibold text-white mb-1">Not sure if this deal is competitive?</p>
                <p className="text-sm text-zinc-400">Share the offer and we&rsquo;ll give you a straight answer &mdash; what&rsquo;s fair, what to push back on, and whether to walk.</p>
              </div>
              <Button href="/contact" variant="primary" size="md" className="shrink-0">
                Get a free deal review
              </Button>
            </div>
            <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap gap-x-5 gap-y-2">
              {['No signup required', 'Honest feedback, not a sales pitch', 'Free forever'].map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
