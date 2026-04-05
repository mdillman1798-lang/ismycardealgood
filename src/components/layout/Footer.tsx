import Link from 'next/link';

const tools = [
  { href: '/loan',          label: 'Loan Calculator' },
  { href: '/lease',         label: 'Lease Calculator' },
  { href: '/affordability', label: 'Affordability' },
  { href: '/negotiate',     label: 'Negotiate My Deal' },
];

const resources = [
  { href: '/blog',    label: 'Guides & Articles' },
  { href: '/about',   label: 'About Us' },
  { href: '/contact', label: 'Get Help' },
];

const legal = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-900 mt-auto">
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xs text-white leading-tight max-w-[120px]">Is my car deal good?</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Free tools to check your car deal before you sign. No account. No bias.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Calculators</p>
            <ul className="space-y-2.5">
              {tools.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Resources</p>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Legal</p>
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} Is my car deal good?</p>
          <p className="text-xs text-zinc-600 max-w-md leading-relaxed">
            Results are estimates for educational purposes only and do not constitute financial advice or a lending offer. Always verify with your lender.
          </p>
        </div>
      </div>
    </footer>
  );
}
