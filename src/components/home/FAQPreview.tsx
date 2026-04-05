'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: 'Is this site really free — no catches?',
    a: 'Yes, completely. No account required, no paywall, no trial period. All three calculators run entirely in your browser and always will be free.',
  },
  {
    q: 'How accurate are the results?',
    a: 'The calculators use standard auto finance formulas and produce results very close to what lenders calculate. Real quotes can differ due to state-specific tax treatment, lender adjustments, and fees not included in your inputs. Treat results as a highly informed estimate \u2014 not a guaranteed quote.',
  },
  {
    q: 'What is a money factor and how do I know if mine is good?',
    a: 'The money factor is the interest rate equivalent in a lease, expressed as a decimal. Multiply it by 2,400 to get the approximate APR. For example, 0.00125 \xd7 2,400 = 3% APR. Anything above 0.003 (7.2% APR equivalent) should raise a flag on most mainstream vehicles.',
  },
  {
    q: 'Can I use this to compare a lease versus financing?',
    a: 'Yes \u2014 run both calculators with the same vehicle and compare monthly payment, total out-of-pocket cost, and what you own (or don\u2019t) at the end. The loan calculator shows total interest paid; the lease shows total lease cost. Together they give a like-for-like comparison.',
  },
  {
    q: 'Does this site store or share any of my data?',
    a: 'No. Every calculation happens locally in your browser. We don\u2019t log your inputs, don\u2019t store results, and have no access to any financial information you enter. Nothing leaves your device.',
  },
  {
    q: 'Can I get a human to review my specific deal?',
    a: 'Yes. Use the Contact form to share your offer details and we\u2019ll give you an honest read. We review offers and respond with plain-English feedback \u2014 no sales pitch, no obligation.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 animate-fade-in">
          <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQPreview() {
  return (
    <section className="section border-b border-white/[0.06]">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl font-bold text-white mb-2">Common questions</h2>
          <p className="text-zinc-400">Straight answers before you calculate.</p>
        </div>

        <div className="border-t border-white/[0.06]">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2">
          <p className="text-sm text-zinc-500">More on car financing in our guides.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group shrink-0"
          >
            Read the blog
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
