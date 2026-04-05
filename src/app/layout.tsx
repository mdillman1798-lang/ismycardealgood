import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://dealcheck.io'),
  title: {
    default: 'Is my car deal good? — Stop Overpaying on Your Next Car',
    template: '%s | Is my car deal good?',
  },
  description:
    'Free calculators to check your car loan payment, lease deal, or realistic budget in seconds. Know your numbers before you sign.',
  keywords: ['car loan calculator', 'lease calculator', 'car affordability', 'auto loan', 'car deal check'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dealcheck.io',
    siteName: 'Is my car deal good?',
    title: 'Is my car deal good? — Stop Overpaying on Your Next Car',
    description:
      'Free calculators to check your car loan payment, lease deal, or realistic budget in seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is my car deal good? — Stop Overpaying on Your Next Car',
    description: 'Free car loan, lease, and affordability calculators.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
