'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DealGauge } from '@/components/ui/DealGauge';
import { calculateLoan } from '@/lib/calc/loan';
import { calculateLease } from '@/lib/calc/lease';
import { formatCurrency, formatPercent } from '@/lib/format';

const LOAN_TERMS = [
  { value: 36, label: '36 months' },
  { value: 48, label: '48 months' },
  { value: 60, label: '60 months' },
  { value: 72, label: '72 months' },
  { value: 84, label: '84 months' },
];

const LEASE_TERMS = [
  { value: 24, label: '24 months' },
  { value: 36, label: '36 months' },
  { value: 39, label: '39 months' },
  { value: 48, label: '48 months' },
];

interface Shared {
  msrp: number;
  sellingPrice: number;
  downPayment: number;
  tradeIn: number;
  salesTax: number;
  fees: number;
}

interface LoanForm {
  apr: number;
  termMonths: number;
}

interface LeaseForm {
  moneyFactor: number;
  residualPercent: number;
  termMonths: number;
  acquisitionFee: number;
}

function healthTone(apr: number): 'green' | 'yellow' | 'red' {
  return apr < 5 ? 'green' : apr < 10 ? 'yellow' : 'red';
}

function leaseTone(rating: 'great' | 'fair' | 'weak'): 'green' | 'yellow' | 'red' {
  return rating === 'great' ? 'green' : rating === 'fair' ? 'yellow' : 'red';
}

function Row({ label, loan, lease, highlight }: { label: string; loan: string; lease: string; highlight?: boolean }) {
  return (
    <div className={`grid grid-cols-3 py-3 ${highlight ? 'border-t border-white/[0.07] mt-1' : ''}`}>
      <span className={`text-sm col-span-1 ${highlight ? 'font-semibold text-white' : 'text-zinc-400'}`}>{label}</span>
      <span className={`text-sm font-mono text-right ${highlight ? 'font-bold text-white' : 'text-zinc-300'}`}>{loan}</span>
      <span className={`text-sm font-mono text-right ${highlight ? 'font-bold text-white' : 'text-zinc-300'}`}>{lease}</span>
    </div>
  );
}

export function CompareCalculator() {
  const [shared, setShared] = useState<Shared>({
    msrp: 38000,
    sellingPrice: 36000,
    downPayment: 3000,
    tradeIn: 0,
    salesTax: 8,
    fees: 1200,
  });

  const [loanForm, setLoanForm] = useState<LoanForm>({ apr: 6.9, termMonths: 60 });
  const [leaseForm, setLeaseForm] = useState<LeaseForm>({
    moneyFactor: 0.00125,
    residualPercent: 55,
    termMonths: 36,
    acquisitionFee: 895,
  });

  const [results, setResults] = useState<{ loan: ReturnType<typeof calculateLoan>; lease: ReturnType<typeof calculateLease> } | null>(null);

  function snum(field: keyof Shared, val: string) {
    setShared((s) => ({ ...s, [field]: parseFloat(val) || 0 }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const loan = calculateLoan({
      vehiclePrice: shared.sellingPrice,
      salesTaxPercent: shared.salesTax,
      downPayment: shared.downPayment,
      tradeInValue: shared.tradeIn,
      interestRate: loanForm.apr,
      loanTermMonths: loanForm.termMonths,
      fees: shared.fees,
      feesFinanced: false,
    });

    const lease = calculateLease({
      msrp: shared.msrp,
      sellingPrice: shared.sellingPrice,
      downPayment: shared.downPayment,
      tradeInCredit: shared.tradeIn,
      residualPercent: leaseForm.residualPercent,
      moneyFactor: leaseForm.moneyFactor,
      leaseTermMonths: leaseForm.termMonths,
      salesTaxPercent: shared.salesTax,
      fees: shared.fees,
      acquisitionFee: leaseForm.acquisitionFee,
      rebate: 0,
    });

    setResults({ loan, lease });
    setTimeout(() => {
      document.getElementById('compare-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  const leaseTotalCost = results
    ? results.lease.dueAtSigning + results.lease.monthlyPaymentWithTax * (leaseForm.termMonths - 1)
    : 0;

  const loanTotalCost = results
    ? results.loan.totalPayments + (shared.downPayment + shared.tradeIn)
    : 0;

  const winner = results
    ? leaseTotalCost < loanTotalCost ? 'lease' : 'loan'
    : null;

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSubmit} noValidate>

          {/* Shared vehicle info */}
          <fieldset className="mb-8">
            <legend className="text-base font-semibold text-white mb-5 pb-3 border-b border-white/[0.07] w-full">
              Vehicle Details
            </legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="MSRP" type="number" min={0} step={100} prefix="$"
                value={shared.msrp || ''} onChange={(e) => snum('msrp', e.target.value)}
                helper="Sticker price — used for lease residual calculation" />
              <Input label="Selling Price" type="number" min={0} step={100} prefix="$"
                value={shared.sellingPrice || ''} onChange={(e) => snum('sellingPrice', e.target.value)}
                helper="Negotiated price before tax and fees" />
              <Input label="Down Payment" type="number" min={0} step={100} prefix="$"
                value={shared.downPayment || ''} onChange={(e) => snum('downPayment', e.target.value)} />
              <Input label="Trade-In Value" type="number" min={0} step={100} prefix="$"
                value={shared.tradeIn || ''} onChange={(e) => snum('tradeIn', e.target.value)} />
              <Input label="Sales Tax" type="number" min={0} max={20} step={0.1} suffix="%"
                value={shared.salesTax || ''} onChange={(e) => snum('salesTax', e.target.value)} />
              <Input label="Fees" type="number" min={0} step={50} prefix="$"
                value={shared.fees || ''} onChange={(e) => snum('fees', e.target.value)}
                helper="Doc, title, registration (not acquisition fee)" />
            </div>
          </fieldset>

          {/* Side-by-side loan/lease terms */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Loan terms */}
            <fieldset>
              <legend className="text-base font-semibold text-emerald-400 mb-5 pb-3 border-b border-white/[0.07] w-full">
                Loan Terms
              </legend>
              <div className="space-y-5">
                <Input label="Interest Rate (APR)" type="number" min={0} max={30} step={0.01} suffix="%"
                  value={loanForm.apr || ''} onChange={(e) => setLoanForm((f) => ({ ...f, apr: parseFloat(e.target.value) || 0 }))} />
                <Select label="Loan Term" options={LOAN_TERMS} value={loanForm.termMonths}
                  onChange={(e) => setLoanForm((f) => ({ ...f, termMonths: parseInt(e.target.value) }))} />
              </div>
            </fieldset>

            {/* Lease terms */}
            <fieldset>
              <legend className="text-base font-semibold text-amber-400 mb-5 pb-3 border-b border-white/[0.07] w-full">
                Lease Terms
              </legend>
              <div className="space-y-5">
                <Input label="Money Factor" type="number" min={0} step={0.00001}
                  value={leaseForm.moneyFactor || ''} onChange={(e) => setLeaseForm((f) => ({ ...f, moneyFactor: parseFloat(e.target.value) || 0 }))}
                  helper={`≈ ${(leaseForm.moneyFactor * 2400).toFixed(1)}% APR equivalent`} />
                <Input label="Residual Value %" type="number" min={0} max={100} step={0.5} suffix="%"
                  value={leaseForm.residualPercent || ''} onChange={(e) => setLeaseForm((f) => ({ ...f, residualPercent: parseFloat(e.target.value) || 0 }))}
                  helper="% of MSRP the car is worth at lease-end" />
                <Input label="Acquisition Fee" type="number" min={0} step={50} prefix="$"
                  value={leaseForm.acquisitionFee || ''} onChange={(e) => setLeaseForm((f) => ({ ...f, acquisitionFee: parseFloat(e.target.value) || 0 }))} />
                <Select label="Lease Term" options={LEASE_TERMS} value={leaseForm.termMonths}
                  onChange={(e) => setLeaseForm((f) => ({ ...f, termMonths: parseInt(e.target.value) }))} />
              </div>
            </fieldset>
          </div>

          <div className="mt-8">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Compare Both Options
            </Button>
          </div>
        </form>
      </Card>

      {results && (
        <div id="compare-results" className="space-y-4 animate-slide-up">

          {/* Winner banner */}
          {winner && (
            <div className={`rounded-xl p-5 border ${
              winner === 'loan'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}>
              <p className="font-semibold text-white text-lg">
                {winner === 'loan'
                  ? '🏆 Financing costs less overall in this scenario'
                  : '🏆 Leasing costs less overall in this scenario'}
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                Based on total out-of-pocket cost over the {winner === 'loan' ? loanForm.termMonths : leaseForm.termMonths}-month term.
                {winner === 'lease' ? ' Remember: at lease-end you own nothing.' : ' At loan payoff, the car is yours free and clear.'}
              </p>
            </div>
          )}

          {/* Monthly payment comparison */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-xl border border-emerald-500/20 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Loan Monthly Payment</p>
              <p className="text-4xl font-bold text-white">{formatCurrency(results.loan.monthlyPayment, 2)}</p>
              <p className="text-sm text-zinc-400 mt-1">{loanForm.termMonths} months · {formatPercent(loanForm.apr)} APR</p>
            </div>
            <div className="bg-zinc-900 rounded-xl border border-amber-500/20 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Lease Monthly Payment</p>
              <p className="text-4xl font-bold text-white">{formatCurrency(results.lease.monthlyPaymentWithTax, 2)}</p>
              <p className="text-sm text-zinc-400 mt-1">{leaseForm.termMonths} months · {(leaseForm.moneyFactor * 2400).toFixed(1)}% APR equiv.</p>
            </div>
          </div>

          {/* Deal gauges */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-xl border border-white/[0.07]">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 px-6 pt-5 mb-0">Loan Deal Rating</p>
              <DealGauge tone={healthTone(loanForm.apr)} label={results.loan.dealHealthLabel} sublabel={`${formatPercent(loanForm.apr)} APR`} />
            </div>
            <div className="bg-zinc-900 rounded-xl border border-white/[0.07]">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 px-6 pt-5 mb-0">Lease Deal Rating</p>
              <DealGauge tone={leaseTone(results.lease.dealRating)} label={results.lease.dealRatingLabel} sublabel={`${results.lease.paymentAsMSRPPercent.toFixed(2)}% of MSRP/mo`} />
            </div>
          </div>

          {/* Full comparison table */}
          <Card>
            <div className="grid grid-cols-3 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 text-right">Loan</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 text-right">Lease</span>
            </div>
            <Row label="Monthly payment" loan={formatCurrency(results.loan.monthlyPayment, 2)} lease={formatCurrency(results.lease.monthlyPaymentWithTax, 2)} />
            <Row label="Due at signing" loan={formatCurrency(shared.downPayment + shared.fees)} lease={formatCurrency(results.lease.dueAtSigning, 2)} />
            <Row label="Term" loan={`${loanForm.termMonths} mo`} lease={`${leaseForm.termMonths} mo`} />
            <Row label="Total payments" loan={formatCurrency(results.loan.totalPayments)} lease={formatCurrency(results.lease.monthlyPaymentWithTax * leaseForm.termMonths)} />
            <Row label="Total out-of-pocket" loan={formatCurrency(loanTotalCost)} lease={formatCurrency(leaseTotalCost)} highlight />
            <Row label="What you own at end" loan="The car (free & clear)" lease="Nothing" highlight />
            <Row label="Total interest / finance cost" loan={formatCurrency(results.loan.totalInterest)} lease={formatCurrency(results.lease.financeFee * leaseForm.termMonths)} />
          </Card>

          {/* Next steps */}
          <div className="rounded-xl bg-zinc-900 border border-white/[0.07] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white mb-1">Want the full breakdown?</p>
              <p className="text-sm text-zinc-400">Run each option through the dedicated calculator for a complete payment schedule and deal health rating.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/loan" className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">Loan details →</Link>
              <Link href="/lease" className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors">Lease details →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
