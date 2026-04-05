import type { Metadata } from 'next';
import { CompareCalculator } from '@/components/calculators/CompareCalculator';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Lease vs. Loan Calculator — Compare True Cost Side by Side',
  description:
    'Should you lease or finance your next car? Enter your deal details once and instantly compare monthly payments, total cost, and what you own at the end.',
  keywords: ['lease vs loan calculator', 'should i lease or buy a car', 'lease vs finance comparison', 'lease vs buy calculator'],
  alternates: { canonical: 'https://ismycardealgood.com/compare' },
  openGraph: {
    title: 'Lease vs. Loan Calculator — Which Costs Less?',
    description: 'Enter your vehicle once, compare lease vs. financing side by side. See the real total cost difference.',
    url: 'https://ismycardealgood.com/compare',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lease vs. Loan Comparison Calculator',
  url: 'https://ismycardealgood.com/compare',
  applicationCategory: 'FinanceApplication',
  description: 'Compare the true cost of leasing vs. financing a car side by side.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ismycardealgood.com' },
      { '@type': 'ListItem', position: 2, name: 'Lease vs. Loan', item: 'https://ismycardealgood.com/compare' },
    ],
  },
};

export default function ComparePage() {
  return (
    <div className="section">
      <JsonLd data={schema} />
      <div className="container max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">Side-by-Side</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Lease vs. Loan</h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Enter your vehicle and deal details once. We&rsquo;ll calculate both options and show you the real cost difference.
          </p>
        </div>
        <CompareCalculator />
      </div>
    </div>
  );
}
