import type { Metadata } from 'next';
import { AffordabilityCalculator } from '@/components/calculators/AffordabilityCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Affordability Calculator — How Much Car Can You Afford?',
  description:
    'Set your budget before you shop. Enter income and monthly obligations to get a conservative and stretch vehicle price range with debt-to-income analysis.',
};

export default function AffordabilityPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-5">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400 font-medium">Affordability Calculator</span>
          </div>
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Affordability Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Know your number before you shop.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Enter your income and monthly obligations to get a conservative payment target, a stretch limit, and the vehicle price range you can actually defend.
          </p>
        </div>

        <AffordabilityCalculator />

        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-4">Also check</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/loan" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Loan Calculator
            </Link>
            <Link href="/lease" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Lease Calculator
            </Link>
            <Link href="/blog/how-much-car-can-you-really-afford" className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
              How much car can you really afford?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
