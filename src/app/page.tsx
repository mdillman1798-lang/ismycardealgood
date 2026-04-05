import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { FeatureCards } from '@/components/home/FeatureCards';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyDealCheck } from '@/components/home/WhyDealCheck';
import { LeadCapture } from '@/components/home/LeadCapture';
import { FAQPreview } from '@/components/home/FAQPreview';

export const metadata: Metadata = {
  title: 'Is my car deal good? — Stop Overpaying on Your Next Car',
  description:
    'Instantly check your car loan payment, lease deal, or realistic budget. Free calculators with no signup required.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <WhyDealCheck />
      <LeadCapture />
      <FAQPreview />
    </>
  );
}
