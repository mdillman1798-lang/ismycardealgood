import type { Metadata } from 'next';
import { LeaseCalculator } from '@/components/calculators/LeaseCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Lease Calculator — Deal Rating & Full Payment Breakdown',
  description:
    'Find out if your lease is Great, Fair, or Weak. Full breakdown of monthly payment, due at signing, effective APR, and adjusted cap cost.',
};

export default function LeasePage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-5">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400 font-medium">Lease Calculator</span>
          </div>
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Lease Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Is this lease a good deal?
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Enter your offer details and get a full breakdown &mdash; monthly payment, due at signing, effective APR, and a plain-English deal rating.
          </p>
        </div>

        <LeaseCalculator />

        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-4">Also check</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/loan" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Loan Calculator
            </Link>
            <Link href="/affordability" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Affordability Calculator
            </Link>
            <Link href="/blog/how-to-tell-if-a-lease-deal-is-good" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              How to tell if a lease is good
            </Link>
            <Link href="/blog/lease-vs-finance-which-makes-sense" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Lease vs. finance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
