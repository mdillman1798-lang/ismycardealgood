import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Is my car deal good?.',
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Terms of Use</span>
        </div>

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: April 2025</p>

        <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-zinc-600 prose-p:leading-relaxed">
          <h2>Acceptance of Terms</h2>
          <p>By using Is my car deal good? ("the Site"), you agree to these terms. If you do not agree, please do not use the Site.</p>

          <h2>Educational Use Only</h2>
          <p>Is my car deal good? provides free calculators for educational and informational purposes only. All results are estimates based on the inputs you provide. Results do not constitute financial advice, a credit offer, a lending commitment, or a guarantee of any specific terms.</p>
          <p>Actual loan and lease terms depend on factors including but not limited to: lender requirements, your credit profile, state and local taxes, dealer-specific fees, and manufacturer incentive programs that vary by region and time period. Always verify results with a licensed lender or financial professional before making financial decisions.</p>

          <h2>No Warranty</h2>
          <p>The Site and its calculators are provided "as is" without warranty of any kind, express or implied. We do not warrant that the calculations are error-free, complete, or suitable for any particular purpose.</p>

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Is my car deal good? and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or reliance on this Site or its outputs.</p>

          <h2>Intellectual Property</h2>
          <p>All content on this Site, including text, code, and design, is the property of Is my car deal good? and may not be reproduced or distributed without permission.</p>

          <h2>Third-Party Links</h2>
          <p>The Site may contain links to external resources. We are not responsible for the content or practices of any linked sites.</p>

          <h2>Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the Site after changes constitutes acceptance of the revised terms.</p>

          <h2>Contact</h2>
          <p>Questions about these terms? Use the <Link href="/contact" className="text-brand-600 hover:text-brand-700">contact form</Link>.</p>
        </div>
      </div>
    </div>
  );
}
