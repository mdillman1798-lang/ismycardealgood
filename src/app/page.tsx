import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { FeatureCards } from '@/components/home/FeatureCards';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyDealCheck } from '@/components/home/WhyDealCheck';
import { LeaseVsLoan } from '@/components/home/LeaseVsLoan';
import { LeadCapture } from '@/components/home/LeadCapture';
import { FAQPreview } from '@/components/home/FAQPreview';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Is My Car Deal Good? — Free Car Deal Calculator',
  description:
    'Find out instantly if your car deal is good. Free auto loan, lease, and affordability calculators with honest deal ratings. No signup, no upsell.',
  alternates: { canonical: 'https://ismycardealgood.com' },
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Is My Car Deal Good?',
  url: 'https://ismycardealgood.com',
  description: 'Free calculators to check your car loan, lease, or budget before you sign.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ismycardealgood.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Is My Car Deal Good?',
  url: 'https://ismycardealgood.com',
  description: 'Free auto finance calculators for car buyers.',
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: 'https://ismycardealgood.com/contact' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know if my car deal is good?',
      acceptedAnswer: { '@type': 'Answer', text: 'Enter your vehicle price, interest rate, and loan term into our free loan calculator. It will rate your deal as Strong, Fair, or High Rate based on your APR and show you the total cost of the loan.' },
    },
    {
      '@type': 'Question',
      name: 'Is leasing or buying a car better?',
      acceptedAnswer: { '@type': 'Answer', text: 'It depends on your driving habits and financial goals. Leasing has lower monthly payments but you own nothing at the end. Buying costs more per month but builds equity. Use our Lease vs. Loan comparison tool to see the real numbers for your specific deal.' },
    },
    {
      '@type': 'Question',
      name: 'What is a good money factor for a car lease?',
      acceptedAnswer: { '@type': 'Answer', text: 'Multiply the money factor by 2,400 to get the APR equivalent. A money factor below 0.00208 (5% APR) is generally competitive. Above 0.003 (7.2% APR) is worth pushing back on.' },
    },
    {
      '@type': 'Question',
      name: 'Are these calculators free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account required, no trial, no upsell. All calculations run in your browser — nothing is stored or transmitted.' },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteSchema} />
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema} />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <WhyDealCheck />
      <LeaseVsLoan />
      <LeadCapture />
      <FAQPreview />
    </>
  );
}
