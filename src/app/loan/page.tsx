import type { Metadata } from 'next';
import { LoanCalculator } from '@/components/calculators/LoanCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Loan Calculator — Monthly Payment & Total Cost',
  description:
    'Calculate your exact monthly payment, total interest paid, and out-the-door cost. Get an honest rate health rating on any auto loan offer.',
};

export default function LoanPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-5">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400 font-medium">Loan Calculator</span>
          </div>
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Loan Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            See what your loan actually costs.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Enter the price, rate, and term. Get your real monthly payment, total interest, and an honest read on whether the rate is competitive.
          </p>
        </div>

        <LoanCalculator />

        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-4">Also check</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/lease" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Lease Calculator
            </Link>
            <Link href="/affordability" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Affordability Calculator
            </Link>
            <Link href="/blog/what-is-a-good-car-loan-apr" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              What is a good APR?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
