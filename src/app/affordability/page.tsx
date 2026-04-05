import type { Metadata } from 'next';
import { AffordabilityCalculator } from '@/components/calculators/AffordabilityCalculator';
import { JsonLd } from '@/components/ui/JsonLd';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Car Affordability Calculator — How Much Car Can You Afford?',
  description:
    'Find out exactly how much car you can afford before you shop. Enter your income and monthly bills to get a conservative and stretch budget range with debt-to-income analysis.',
  keywords: ['car affordability calculator', 'how much car can i afford', 'car budget calculator', 'auto loan affordability', 'debt to income ratio car'],
  alternates: { canonical: 'https://ismycardealgood.com/affordability' },
  openGraph: {
    title: 'Car Affordability Calculator — How Much Can You Spend?',
    description: 'Enter your income and bills. Get a realistic car budget range before you set foot in a dealership.',
    url: 'https://ismycardealgood.com/affordability',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Car Affordability Calculator',
  url: 'https://ismycardealgood.com/affordability',
  applicationCategory: 'FinanceApplication',
  description: 'Calculate how much car you can realistically afford based on income and existing debt obligations.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ismycardealgood.com' },
      { '@type': 'ListItem', position: 2, name: 'Affordability Calculator', item: 'https://ismycardealgood.com/affordability' },
    ],
  },
};

export default function AffordabilityPage() {
  return (
    <>
      <JsonLd data={schema} />
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
    </>

  );
}
