import Link from 'next/link';

const tools = [
  {
    href: '/loan',
    label: 'Check a Loan',
    desc: 'Payment · total interest · rate health',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
  },
  {
    href: '/lease',
    label: 'Check a Lease',
    desc: 'Monthly cost · deal rating · due at signing',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    href: '/affordability',
    label: 'What Can I Afford?',
    desc: 'Safe budget · stretch limit · DTI check',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section className="border-b border-white/[0.06]">
      <div className="container py-16 sm:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-6">
            Free auto finance tools
          </p>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5">
            Know your deal<br />before you sign.
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
            Check a loan, evaluate a lease, or set a real budget — in under a minute. No account. No pressure. Just the math.
          </p>

          {/* Tool cards */}
          <div className="grid sm:grid-cols-3 gap-3 mb-10">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col gap-3 p-4 rounded-xl border border-white/[0.07] bg-zinc-900 hover:bg-zinc-800 hover:border-brand-500/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-brand-600/10 group-hover:text-brand-400 transition-colors">
                    {t.icon}
                  </div>
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{t.label}</p>
                  <p className="text-xs text-zinc-500 leading-snug">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {['100% free', 'No account needed', 'Runs in your browser', 'No data stored'].map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
