import Link from 'next/link';

const LOAN_PROS = [
  'You own the car outright when paid off',
  'No mileage limits or wear-and-tear fees',
  'Build equity you can use toward your next vehicle',
  'Freedom to modify, sell, or keep as long as you want',
];

const LOAN_CONS = [
  'Higher monthly payments than a comparable lease',
  'You absorb the full depreciation of the vehicle',
  'Maintenance costs rise as the car ages',
];

const LEASE_PROS = [
  'Lower monthly payments for the same vehicle',
  'Always driving a new car every 2–3 years',
  'Often covered under factory warranty the whole term',
  'No hassle selling or trading in at the end',
];

const LEASE_CONS = [
  'You own nothing at the end — no equity built',
  'Mileage caps (usually 10k–15k/year) with fees for overages',
  'Wear-and-tear charges at lease return',
  'Early termination is expensive',
];

function Column({
  title, accent, pros, cons,
}: { title: string; accent: string; pros: string[]; cons: string[] }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-white/[0.07] p-6 sm:p-7 flex flex-col gap-6">
      <h3 className={`text-lg font-bold ${accent}`}>{title}</h3>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Pros</p>
        <ul className="space-y-2.5">
          {pros.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-zinc-300">
              <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Cons</p>
        <ul className="space-y-2.5">
          {cons.map((c) => (
            <li key={c} className="flex gap-2.5 text-sm text-zinc-400">
              <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LeaseVsLoan() {
  return (
    <section className="section border-t border-white/[0.06]">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">Lease vs. Loan</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Which is right for you?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Leasing and financing are two completely different financial products. The &ldquo;cheaper&rdquo; monthly payment on a lease comes with real trade-offs. Here&rsquo;s the honest breakdown.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Column title="Financing (Loan)" accent="text-emerald-400" pros={LOAN_PROS} cons={LOAN_CONS} />
          <Column title="Leasing" accent="text-amber-400" pros={LEASE_PROS} cons={LEASE_CONS} />
        </div>

        {/* Quick questions */}
        <div className="bg-zinc-900 rounded-xl border border-white/[0.07] p-6 sm:p-8 mb-8">
          <h3 className="text-base font-semibold text-white mb-5">Ask yourself these questions</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Do you drive more than 15,000 miles/year?', 'Lean toward buying — mileage overages on leases add up fast.'],
              ['Do you want to own the car long-term?', 'Buy. Leasing means starting payments again every 2–3 years forever.'],
              ['Is cash flow tight right now?', 'Leasing offers lower monthly payments for the same vehicle.'],
              ['Do you always want a new car under warranty?', 'Leasing makes that automatic — and cheap.'],
            ].map(([q, a]) => (
              <div key={String(q)} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-brand-400 text-[10px] font-bold">?</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{q}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm mb-4">Run both numbers on your actual deal to see which comes out ahead.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Compare Lease vs. Loan Side-by-Side
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
