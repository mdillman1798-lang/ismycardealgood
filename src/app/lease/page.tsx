import type { Metadata } from 'next';
import { LeaseCalculator } from '@/components/calculators/LeaseCalculator';
import { JsonLd } from '@/components/ui/JsonLd';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Lease Calculator — Is My Lease Deal Good?',
  description:
    'Find out if your car lease is a great deal, fair, or a rip-off. Enter your money factor, residual, and cap cost for a full breakdown and honest deal rating.',
  keywords: ['car lease calculator', 'is my lease a good deal', 'money factor calculator', 'lease deal rating', 'cap cost calculator', 'lease vs buy calculator'],
  alternates: { canonical: 'https://ismycardealgood.com/lease' },
  openGraph: {
    title: 'Car Lease Calculator — Is My Lease Deal Good?',
    description: 'Enter your lease offer and get a full breakdown plus an honest Great / Fair / Weak deal rating.',
    url: 'https://ismycardealgood.com/lease',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Car Lease Calculator',
  url: 'https://ismycardealgood.com/lease',
  applicationCategory: 'FinanceApplication',
  description: 'Calculate car lease payments and get a deal rating based on money factor and payment-to-MSRP ratio.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ismycardealgood.com' },
      { '@type': 'ListItem', position: 2, name: 'Lease Calculator', item: 'https://ismycardealgood.com/lease' },
    ],
  },
};

export default function LeasePage() {
  return (
    <div className="section">
      <JsonLd data={schema} />
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
