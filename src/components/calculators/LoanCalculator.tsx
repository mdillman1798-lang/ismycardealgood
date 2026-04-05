'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input, Checkbox } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, HeroStat, Metric, DealAlert, BreakdownRow } from '@/components/ui/Card';
import { DealGauge } from '@/components/ui/DealGauge';
import { InfoTip } from '@/components/ui/InfoTip';
import { calculateLoan } from '@/lib/calc/loan';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { LoanInputs, LoanResults } from '@/types';

const TERM_OPTIONS = [
  { value: 24, label: '24 months (2 years)' },
  { value: 36, label: '36 months (3 years)' },
  { value: 48, label: '48 months (4 years)' },
  { value: 60, label: '60 months (5 years)' },
  { value: 72, label: '72 months (6 years)' },
  { value: 84, label: '84 months (7 years)' },
];

const DEFAULT: LoanInputs = {
  vehiclePrice: 32000,
  salesTaxPercent: 8,
  downPayment: 3000,
  tradeInValue: 0,
  interestRate: 6.9,
  loanTermMonths: 60,
  fees: 1200,
  feesFinanced: false,
};

function healthTone(h: LoanResults['dealHealth']): 'green' | 'yellow' | 'red' {
  return h === 'strong' ? 'green' : h === 'fair' ? 'yellow' : 'red';
}

function suggestAPR(score: number): number {
  if (score >= 800) return 5.5;
  if (score >= 740) return 6.8;
  if (score >= 670) return 8.9;
  if (score >= 620) return 12.5;
  if (score >= 580) return 15.9;
  return 19.9;
}

function creditTier(score: number): string {
  if (score >= 800) return 'Exceptional';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 620) return 'Fair';
  if (score >= 580) return 'Poor';
  return 'Very Poor';
}

export function LoanCalculator() {
  const [form, setForm] = useState(DEFAULT);
  const [results, setResults] = useState<LoanResults | null>(null);
  const [creditScore, setCreditScore] = useState<number | ''>('');

  function set(field: keyof LoanInputs, value: number | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function num(field: keyof LoanInputs, value: string) {
    set(field, parseFloat(value) || 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResults(calculateLoan(form));
    setTimeout(() => {
      document.getElementById('loan-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSubmit} noValidate>
          {/* Vehicle Details */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Vehicle Details
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Vehicle Price"
                type="number"
                min={0}
                step={100}
                prefix="$"
                value={form.vehiclePrice || ''}
                onChange={(e) => num('vehiclePrice', e.target.value)}
                helper="The negotiated selling price before tax and fees"
              />
              <Input
                label="Sales Tax"
                type="number"
                min={0}
                max={20}
                step={0.1}
                suffix="%"
                value={form.salesTaxPercent || ''}
                onChange={(e) => num('salesTaxPercent', e.target.value)}
                helper="Your state/county rate — check your state DMV site"
              />
              <Input
                label="Down Payment"
                type="number"
                min={0}
                step={100}
                prefix="$"
                value={form.downPayment || ''}
                onChange={(e) => num('downPayment', e.target.value)}
              />
              <Input
                label="Trade-In Value"
                type="number"
                min={0}
                step={100}
                prefix="$"
                value={form.tradeInValue || ''}
                onChange={(e) => num('tradeInValue', e.target.value)}
                helper="Net value after any trade-in payoff"
              />
              <div className="sm:col-span-2">
                <Input
                  label="Fees"
                  type="number"
                  min={0}
                  step={50}
                  prefix="$"
                  value={form.fees || ''}
                  onChange={(e) => num('fees', e.target.value)}
                  helper="Doc fee, title, registration, dealer fees — everything except tax"
                />
                <div className="mt-2">
                  <Checkbox
                    label="Roll fees into the loan"
                    helper="If unchecked, fees are paid upfront at signing"
                    checked={form.feesFinanced}
                    onChange={(e) => set('feesFinanced', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Financing */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Financing Terms
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Input
                  label="Credit Score (optional)"
                  type="number"
                  min={300}
                  max={850}
                  step={1}
                  value={creditScore}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseInt(e.target.value);
                    setCreditScore(val as number | '');
                    if (typeof val === 'number' && val >= 300 && val <= 850) {
                      set('interestRate', suggestAPR(val));
                    }
                  }}
                  helper={
                    typeof creditScore === 'number' && creditScore >= 300
                      ? `${creditTier(creditScore)} — estimated rate auto-filled below`
                      : 'Enter your score to auto-estimate your APR'
                  }
                />
              </div>
              <Input
                label="Interest Rate (APR)"
                type="number"
                min={0}
                max={30}
                step={0.01}
                suffix="%"
                value={form.interestRate || ''}
                onChange={(e) => num('interestRate', e.target.value)}
                helper="The annual percentage rate from your lender — edit to override"
              />
              <Select
                label="Loan Term"
                options={TERM_OPTIONS}
                value={form.loanTermMonths}
                onChange={(e) => set('loanTermMonths', parseInt(e.target.value))}
                helper="Shorter terms mean less interest paid overall"
              />
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Calculate My Loan
          </Button>
        </form>
      </Card>

      {results && (
        <div id="loan-results" className="animate-slide-up space-y-4">
          {/* Primary stat */}
          <HeroStat
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPayment, 2)}
            context={`${form.loanTermMonths}-month loan · ${formatPercent(form.interestRate)} APR`}
          />

          {/* Supporting metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Metric
              label="Amount Financed"
              value={formatCurrency(results.amountFinanced)}
            />
            <Metric
              label="Total Interest"
              value={formatCurrency(results.totalInterest)}
              note="cost of borrowing"
            />
            <Metric
              label="Out-the-Door"
              value={formatCurrency(results.outTheDoorPrice)}
              note="price + tax + fees − trade"
            />
          </div>

          {/* Deal gauge + alert */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] flex flex-col sm:flex-row items-center gap-0 overflow-hidden">
            <div className="sm:w-56 shrink-0 py-2 sm:border-r border-white/[0.07]">
              <DealGauge
                tone={healthTone(results.dealHealth)}
                label={results.dealHealthLabel}
                sublabel="Rate health score"
              />
            </div>
            <div className="flex-1 w-full p-4 sm:p-6">
              <DealAlert
                tone={healthTone(results.dealHealth)}
                label={`Rate Health · ${results.dealHealthLabel}`}
                note={results.dealHealthNote}
              />
            </div>
          </div>

          {/* Full breakdown */}
          <Card>
            <h3 className="text-sm font-semibold text-white mb-1">Full Breakdown</h3>
            <dl>
              <BreakdownRow label="Vehicle price" value={formatCurrency(form.vehiclePrice)} />
              <BreakdownRow label="Sales tax" value={formatCurrency(form.vehiclePrice * form.salesTaxPercent / 100)} />
              <BreakdownRow label="Fees" value={formatCurrency(form.fees)} />
              <BreakdownRow label="Down payment" value={`− ${formatCurrency(form.downPayment)}`} />
              <BreakdownRow label="Trade-in value" value={`− ${formatCurrency(form.tradeInValue)}`} />
              <BreakdownRow label="Amount financed" value={formatCurrency(results.amountFinanced)} strong separator />
              <BreakdownRow label="APR" value={formatPercent(form.interestRate)} />
              <BreakdownRow label="Term" value={`${form.loanTermMonths} months`} />
              <BreakdownRow label="Monthly payment" value={formatCurrency(results.monthlyPayment, 2)} strong separator />
              <BreakdownRow label="Total interest paid" value={formatCurrency(results.totalInterest)} />
              <BreakdownRow label="Total of payments" value={formatCurrency(results.totalPayments)} strong separator />
            </dl>
          </Card>

          {/* CTA */}
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
                <p className="font-semibold text-white mb-1">Is this the best rate you can get?</p>
                <p className="text-sm text-zinc-400">Send us the offer and we&rsquo;ll review it &mdash; free, no obligation. Most responses within one business day.</p>
              </div>
              <Button href="/contact" variant="primary" size="md" className="shrink-0">
                Get a free rate review
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
