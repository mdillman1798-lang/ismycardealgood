import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Let Us Negotiate Your Car Deal',
  description:
    'Skip the back-and-forth. Our partner service negotiates your car deal directly with dealers so you get the best price without setting foot in a showroom.',
};

const howItWorks = [
  {
    n: '1',
    title: 'Tell us what you want',
    body: 'Share the vehicle, trim, color, and any preferences. We handle the rest from there.',
  },
  {
    n: '2',
    title: 'We go to work',
    body: 'Our team contacts dealers on your behalf, leverages market data, and negotiates price, trade-in, and financing terms.',
  },
  {
    n: '3',
    title: 'You review and decide',
    body: 'We present you with the best offer we can secure. No pressure — you decide whether to move forward.',
  },
];

const included = [
  'Dealer outreach and price negotiation',
  'Trade-in valuation and negotiation',
  'Financing rate comparison',
  'Out-the-door price review',
  'Deal summary with plain-English breakdown',
  'Support until you drive off the lot',
];

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'Visit Skiplot.com for current pricing. Most customers save significantly more than the service fee on their deal.',
  },
  {
    q: 'Does this work for new and used vehicles?',
    a: 'Yes. Skiplot negotiates both new and pre-owned vehicle purchases across most makes and models.',
  },
  {
    q: 'Do I have to go to the dealership?',
    a: 'You&rsquo;ll need to pick up the vehicle, but the negotiation — the part most people dread — is handled for you before you walk in.',
  },
  {
    q: 'What if I already have a deal in front of me?',
    a: 'Even better. Use the Is my car deal good? calculators to understand the offer first, then let Skiplot see if they can beat it.',
  },
];

export default function NegotiatePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-white/[0.06]">
        <div className="container py-16 sm:py-24 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-zinc-600 mb-6">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400 font-medium">Negotiate My Deal</span>
          </div>

          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-4">
            Done-for-you negotiation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
            Hate negotiating?<br />We&rsquo;ll do it for you.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
            Is my car deal good? tells you what a good deal looks like. Our partner <strong className="text-white font-semibold">Skiplot</strong> goes and gets it for you &mdash; negotiating directly with dealers on your behalf so you don&rsquo;t have to.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://skiplot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white px-6 py-3.5 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Get started at Skiplot.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <Link
              href="/loan"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg border border-white/[0.1] text-zinc-200 bg-zinc-800 px-6 py-3.5 hover:bg-zinc-700 transition-colors"
            >
              Check a deal first
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-zinc-900 border-b border-white/[0.06]">
        <div className="container max-w-4xl">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl font-bold text-white mb-12">Three steps. Zero showroom stress.</h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {howItWorks.map((s) => (
              <div key={s.n}>
                <div className="text-[3rem] font-bold text-zinc-800 leading-none mb-4 font-mono select-none">
                  {s.n}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section border-b border-white/[0.06]">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">What&rsquo;s included</p>
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                Everything from first contact to signed deal.
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Skiplot handles the entire negotiation process &mdash; not just the sticker price, but trade-in value, financing terms, and fees. You get a complete picture before you commit to anything.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-white/[0.07] p-7">
              <ul className="space-y-3.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-zinc-900 border-b border-white/[0.06]">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-8">Questions</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-white/[0.06] pb-6 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-white mb-2">{f.q}</p>
                <p className="text-sm text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to stop dreading the dealership?</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed max-w-xl mx-auto">
            Use Is my car deal good? to understand the numbers, then hand the negotiation to Skiplot. You show up to sign &mdash; they do the hard part.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://skiplot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white px-6 py-3.5 hover:bg-emerald-400 transition-colors"
            >
              Go to Skiplot.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <Link
              href="/affordability"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg border border-white/[0.1] text-zinc-200 bg-zinc-800 px-6 py-3.5 hover:bg-zinc-700 transition-colors"
            >
              Check my budget first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
