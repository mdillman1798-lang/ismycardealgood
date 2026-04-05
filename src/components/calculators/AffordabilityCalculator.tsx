'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, HeroStat, Metric, DealAlert, BreakdownRow } from '@/components/ui/Card';
import { DealGauge } from '@/components/ui/DealGauge';
import { InfoTip } from '@/components/ui/InfoTip';
import { calculateAffordability } from '@/lib/calc/affordability';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { AffordabilityInputs, AffordabilityResults } from '@/types';

const TERM_OPTIONS = [
  { value: 36, label: '36 months (3 years)' },
  { value: 48, label: '48 months (4 years)' },
  { value: 60, label: '60 months (5 years)' },
  { value: 72, label: '72 months (6 years)' },
];

const DEFAULT: AffordabilityInputs = {
  annualGrossIncome: 85000,
  monthlyTakeHome: 5200,
  monthlyRent: 1800,
  monthlyDebt: 400,
  insuranceEstimate: 150,
  downPayment: 4000,
  loanTermMonths: 60,
  apr: 6.9,
  monthlyBudgetCap: undefined,
};

function interpretationTone(i: AffordabilityResults['interpretation']): 'green' | 'yellow' | 'red' {
  return i === 'comfortable' ? 'green' : i === 'stretch' ? 'yellow' : 'red';
}

function interpretationLabel(i: AffordabilityResults['interpretation']): string {
  return { comfortable: 'Comfortable', stretch: 'Stretch', aggressive: 'Too Aggressive' }[i];
}

function RangeBar({ label, value, max, tone }: { label: string; value: number; max: number; tone: 'green' | 'yellow' | 'red' }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = { green: 'bg-emerald-500', yellow: 'bg-amber-400', red: 'bg-red-500' }[tone];
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-sm font-mono font-semibold text-white">{formatCurrency(value)}</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function AffordabilityCalculator() {
  const [form, setForm] = useState(DEFAULT);
  const [results, setResults] = useState<AffordabilityResults | null>(null);

  function num(field: keyof AffordabilityInputs, value: string) {
    const parsed = parseFloat(value) || 0;
    setForm((f) => ({ ...f, [field]: parsed === 0 && field === 'monthlyBudgetCap' ? undefined : parsed }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResults(calculateAffordability(form));
    setTimeout(() => {
      document.getElementById('afford-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSubmit} noValidate>
          {/* Income */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Income
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Annual Gross Income"
                type="number" min={0} step={1000} prefix="$"
                value={form.annualGrossIncome || ''}
                onChange={(e) => num('annualGrossIncome', e.target.value)}
                helper="Your total pre-tax income per year"
              />
              <Input
                label="Monthly Take-Home Pay"
                type="number" min={0} step={100} prefix="$"
                value={form.monthlyTakeHome || ''}
                onChange={(e) => num('monthlyTakeHome', e.target.value)}
                helper="What you actually receive after taxes and deductions"
              />
            </div>
          </fieldset>

          {/* Existing obligations */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Monthly Obligations
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Rent or Mortgage"
                type="number" min={0} step={50} prefix="$"
                value={form.monthlyRent || ''}
                onChange={(e) => num('monthlyRent', e.target.value)}
              />
              <Input
                label="Other Monthly Debt Payments"
                type="number" min={0} step={50} prefix="$"
                value={form.monthlyDebt || ''}
                onChange={(e) => num('monthlyDebt', e.target.value)}
                helper="Student loans, credit cards, personal loans, etc."
              />
              <Input
                label="Estimated Car Insurance"
                type="number" min={0} step={10} prefix="$"
                value={form.insuranceEstimate || ''}
                onChange={(e) => num('insuranceEstimate', e.target.value)}
                helper="Monthly cost — deducted from max car payment"
              />
              <Input
                label="Monthly Transportation Budget Cap"
                type="number" min={0} step={50} prefix="$"
                value={form.monthlyBudgetCap ?? ''}
                onChange={(e) => num('monthlyBudgetCap', e.target.value)}
                helper="Optional hard ceiling on total transportation spend"
              />
            </div>
          </fieldset>

          {/* Financing assumptions */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Financing Assumptions
            </legend>
            <div className="grid sm:grid-cols-3 gap-5">
              <Input
                label="Down Payment"
                type="number" min={0} step={500} prefix="$"
                value={form.downPayment || ''}
                onChange={(e) => num('downPayment', e.target.value)}
              />
              <Input
                label="Expected APR"
                type="number" min={0} max={30} step={0.1} suffix="%"
                value={form.apr || ''}
                onChange={(e) => num('apr', e.target.value)}
                helper="Use your pre-approval rate or an estimate"
              />
              <Select
                label="Loan Term"
                options={TERM_OPTIONS}
                value={form.loanTermMonths}
                onChange={(e) => num('loanTermMonths', e.target.value)}
              />
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Calculate My Budget
          </Button>
        </form>
      </Card>

      {results && (
        <div id="afford-results" className="animate-slide-up space-y-4">
          {/* Primary stat — conservative monthly payment */}
          <HeroStat
            label="Conservative Monthly Payment"
            value={formatCurrency(results.conservativePayment)}
            context={`10% of take-home · up to ${formatCurrency(results.conservativeVehiclePrice)} vehicle`}
          />

          {/* Supporting metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Metric
              label="Stretch Payment"
              value={formatCurrency(results.stretchPayment)}
              note="15% of take-home"
            />
            <Metric
              label="Stretch Vehicle Price"
              value={formatCurrency(results.stretchVehiclePrice)}
              note="upper limit"
            />
            <Metric
              label="Budget Remaining"
              value={formatCurrency(results.monthlyBudgetRemaining)}
              note="after obligations"
            />
          </div>

          {/* Budget gauge + assessment alert */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] flex flex-col sm:flex-row items-center gap-0 overflow-hidden">
            <div className="sm:w-56 shrink-0 py-2 sm:border-r border-white/[0.07]">
              <DealGauge
                tone={interpretationTone(results.interpretation)}
                label={interpretationLabel(results.interpretation)}
                sublabel="Budget assessment"
              />
            </div>
            <div className="flex-1 w-full p-4 sm:p-6">
              <DealAlert
                tone={interpretationTone(results.interpretation)}
                label={`Budget Assessment \u00b7 ${interpretationLabel(results.interpretation)}`}
                note={results.interpretationNote}
              />
            </div>
          </div>

          {/* Visual range bars */}
          <Card>
            <h3 className="text-sm font-semibold text-white mb-5">Vehicle Price Range</h3>
            <div className="space-y-4">
              <RangeBar
                label="Conservative budget"
                value={results.conservativeVehiclePrice}
                max={results.stretchVehiclePrice * 1.2}
                tone="green"
              />
              <RangeBar
                label="Stretch budget"
                value={results.stretchVehiclePrice}
                max={results.stretchVehiclePrice * 1.2}
                tone={interpretationTone(results.interpretation)}
              />
            </div>
            <p className="text-xs text-zinc-400 mt-5">
              Based on {formatPercent(form.apr, 1)} APR over {form.loanTermMonths} months with {formatCurrency(form.downPayment)} down.
            </p>
          </Card>

          {/* DTI breakdown */}
          <Card>
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center">
              Debt-to-Income Analysis
              <InfoTip text="DTI (Debt-to-Income ratio) compares your total monthly debt payments to your gross monthly income. Lenders use this to gauge how much debt you can safely carry. Most prefer a DTI below 36–40%." />
            </h3>
            <dl>
              <BreakdownRow label="Monthly take-home" value={formatCurrency(form.monthlyTakeHome)} />
              <BreakdownRow label="Rent / mortgage" value={formatCurrency(form.monthlyRent)} muted />
              <BreakdownRow label="Existing debt payments" value={formatCurrency(form.monthlyDebt)} muted />
              <BreakdownRow label="Insurance estimate" value={formatCurrency(form.insuranceEstimate)} muted />
              <BreakdownRow label="Conservative car payment" value={formatCurrency(results.conservativePayment)} />
              <BreakdownRow label="Total obligations (conservative)" value={formatCurrency(results.totalMonthlyDebtWithConservative)} strong separator />
              <BreakdownRow
                label={<>DTI at conservative budget <InfoTip text="Your total monthly debts (including the conservative car payment) divided by gross monthly income. Below 36% is ideal; above 43% and most lenders will decline." /></>}
                value={formatPercent(results.debtToIncomeConservative, 1)}
              />
              <BreakdownRow
                label={<>DTI at stretch budget <InfoTip text="Same calculation using the higher 'stretch' car payment. This shows your worst-case debt load if you buy at the top of your range." /></>}
                value={formatPercent(results.debtToIncomeStretch, 1)}
              />
            </dl>
            <p className="text-xs text-zinc-400 leading-relaxed mt-4 pt-4 border-t border-white/[0.06]">
              Guideline: most lenders prefer total DTI below 36&ndash;40% of gross income. Conservative = 10% of take-home for car payment; stretch = 15%. Planning estimates only, not lending offers.
            </p>
          </Card>

          {/* Next step CTA */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-semibold text-white mb-1">Got an offer in hand?</p>
                <p className="text-sm text-zinc-400">Now check whether the loan terms are actually competitive. Plug in the exact figures and get a rate health rating.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button href="/loan" variant="primary" size="md">Check a Loan</Button>
                <Button href="/lease" variant="secondary" size="md">Check a Lease</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
