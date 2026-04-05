import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Is my car deal good?',
  description: 'Free, transparent tools to help car buyers understand their loan, lease, or budget before signing.',
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">About</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-zinc-500 mb-12 leading-relaxed">
          We built Is my car deal good? because most car buyers don't have access to the same information dealers do.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">The problem we're solving</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Buying or leasing a car involves more moving parts than almost any other consumer transaction. The price, the financing rate, the term, the trade-in value, the fees — each one is negotiated separately, often with incomplete information on the buyer's side.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Most people walk into a dealership knowing the monthly payment they want and leave not knowing their APR, their total interest, or whether their lease residual was inflated. Is my car deal good? was built to close that gap.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What we believe</h2>
            <div className="space-y-4">
              {[
                ["Transparency is the baseline", "The math behind car loans and leases isn\u2019t complicated \u2014 it\u2019s just not explained. Every number in our calculators is shown and labeled."],
                ["Monthly payment is not the deal", "A low payment stretched over 84 months at a high rate is a bad deal. We show you the full picture: total cost, total interest, out-the-door price."],
                ["No account. No upsell. No nonsense.", "Is my car deal good? is free to use, requires no login, and doesn\u2019t try to sell you anything. If you want a second opinion on your deal, our contact form connects you with a human."],
              ].map(([title, body]) => (
                <div key={String(title)} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-brand-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{title}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">The tools</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: '/loan', label: 'Loan Calculator', desc: 'Payment, interest, deal health.' },
                { href: '/lease', label: 'Lease Calculator', desc: 'Full breakdown + deal rating.' },
                { href: '/affordability', label: 'Affordability', desc: 'Realistic budget range.' },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="block p-4 rounded-xl border border-white/[0.07] hover:border-brand-500/40 hover:shadow-sm transition-all group"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-1">{t.label}</p>
                  <p className="text-xs text-zinc-500">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="pt-4 border-t border-white/[0.07]">
            <p className="text-sm text-zinc-500 leading-relaxed">
              Is my car deal good? provides estimates for educational purposes only and does not constitute financial advice, a credit offer, or a lending commitment. Actual loan terms, taxes, fees, and lender programs vary. Always verify figures with your lender and consult a licensed financial advisor for personalized guidance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
