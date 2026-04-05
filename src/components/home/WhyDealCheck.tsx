import Link from 'next/link';

const benefits = [
  {
    title: 'The monthly payment is not the deal.',
    body: 'Dealers work from payment, not price. Stretching the term, burying fees, or marking up your rate can all hit a number that sounds fine \u2014 while quietly adding thousands to the total.',
  },
  {
    title: 'Most buyers overpay without knowing it.',
    body: 'On interest, unnecessary add-ons, or a lease structured in the dealer\u2019s favor. A five-minute check with real numbers changes that.',
  },
  {
    title: 'Lease math is designed to be opaque.',
    body: 'Money factors, residuals, adjusted cap costs \u2014 none of it is accidental. Is my car deal good? translates the inputs into a plain-English verdict: Great, Fair, or Weak.',
  },
  {
    title: 'Walking in without a number is expensive.',
    body: 'Set a real budget ceiling before you shop. The affordability calculator anchors your max payment to income and obligations \u2014 not to what the dealer can make work.',
  },
];

export function WhyDealCheck() {
  return (
    <section className="section bg-zinc-900 border-b border-white/[0.06]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Why it matters</p>
            <h2 className="text-3xl font-bold text-white mb-5 leading-snug">
              Car deals have more levers than most buyers realize.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Price, rate, term, fees, trade-in &mdash; each one adjusted independently by someone who does this every day. Is my car deal good? gives you the same math they&rsquo;re running.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group"
            >
              About Is my car deal good?
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 bg-zinc-950 rounded-xl border border-white/[0.07] p-5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{b.title}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
