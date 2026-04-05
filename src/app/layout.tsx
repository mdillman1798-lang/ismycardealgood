import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = 'https://ismycardealgood.com';
const SITE_NAME = 'Is My Car Deal Good?';
const DEFAULT_DESCRIPTION =
  'Free car deal calculator — check your auto loan, lease, or budget instantly. See your monthly payment, total interest, and get an honest deal rating before you sign.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Car Deal Calculator`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'is my car deal good',
    'car deal calculator',
    'auto loan calculator',
    'car lease calculator',
    'car affordability calculator',
    'lease vs loan calculator',
    'is my car lease a good deal',
    'how to tell if a car deal is good',
    'car loan payment calculator',
    'money factor calculator',
    'auto finance calculator',
    'car buying tool',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Car Deal Calculator`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Free Car Deal Calculator`,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID',  // add after verifying in Google Search Console
  },
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
