import Link from 'next/link';

const features = [
  {
    href: '/loan',
    title: 'Loan Calculator',
    body: 'Enter the vehicle price, APR, term, and fees. See your real monthly payment, total interest paid, and an honest read on your rate.',
    outputs: ['Monthly payment', 'Total interest', 'Out-the-door cost', 'Rate health rating'],
    cta: 'Check a loan',
  },
  {
    href: '/lease',
    title: 'Lease Calculator',
    body: 'Input your money factor, residual, and cap cost. Get a full payment breakdown and a transparent deal rating — Great, Fair, or Weak.',
    outputs: ['Monthly payment', 'Due at signing', 'Effective APR', 'Deal rating'],
    cta: 'Check a lease',
  },
  {
    href: '/affordability',
    title: 'Affordability Calculator',
    body: 'Set your ceiling before you shop. Enter income and existing obligations to find a conservative budget and a stretch limit you can actually defend.',
    outputs: ['Safe payment range', 'Vehicle price range', 'Debt-to-income ratio', 'Budget assessment'],
    cta: 'Find my budget',
  },
];

export function FeatureCards() {
  return (
    <section className="section bg-zinc-900 border-b border-white/[0.06]">
      <div className="container">
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Three tools. One clear picture.</h2>
          <p className="text-zinc-400 leading-relaxed">
            Most buyers walk in knowing the monthly payment they want. That&rsquo;s the one number dealers are trained to work around. Is my car deal good? shows you the rest.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.href} className="bg-zinc-950 rounded-xl border border-white/[0.07] flex flex-col overflow-hidden">
              <div className="p-6 flex-1">
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{f.body}</p>
                <ul className="space-y-1.5">
                  {f.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/[0.06] px-6 py-4">
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group"
                >
                  {f.cta}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
