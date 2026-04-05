import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Is my car deal good? handles your data.',
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Privacy Policy</span>
        </div>

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: April 2025</p>

        <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-zinc-600 prose-p:leading-relaxed">
          <h2>Overview</h2>
          <p>Is my car deal good? ("we," "us," or "our") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding it. Our calculators run entirely in your browser — no personal financial data you enter is ever transmitted to our servers.</p>

          <h2>Information We Collect</h2>
          <p><strong>Calculator data:</strong> All calculations are performed client-side in your browser. Vehicle prices, income figures, and financing details you enter are not stored or transmitted.</p>
          <p><strong>Contact form submissions:</strong> When you submit the contact form, we collect your name, email address, optional phone number, and message. This information is used solely to respond to your inquiry.</p>
          <p><strong>Analytics:</strong> We may collect anonymized usage data (pages visited, browser type, referral source) through privacy-respecting analytics tools. This data does not identify individual users.</p>

          <h2>How We Use Your Information</h2>
          <p>Contact form submissions are used only to respond to your inquiry. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

          <h2>Cookies</h2>
          <p>Is my car deal good? may use minimal functional cookies to maintain site performance. We do not use tracking or advertising cookies.</p>

          <h2>Data Retention</h2>
          <p>Contact form submissions are retained for up to 12 months for correspondence purposes, then deleted. Calculator inputs are never retained.</p>

          <h2>Your Rights</h2>
          <p>You may request access to, correction of, or deletion of any personal information we hold about you by contacting us at the address below.</p>

          <h2>Contact</h2>
          <p>For privacy-related questions, use the <Link href="/contact" className="text-brand-600 hover:text-brand-700">contact form</Link> or email us directly.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this policy periodically. Material changes will be noted with a revised "last updated" date at the top of this page.</p>
        </div>
      </div>
    </div>
  );
}
