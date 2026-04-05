'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/loan',          label: 'Loan' },
  { href: '/lease',         label: 'Lease' },
  { href: '/compare',       label: 'Lease vs. Loan' },
  { href: '/affordability', label: 'Affordability' },
  { href: '/negotiate',     label: 'Negotiate' },
  { href: '/blog',          label: 'Blog' },
  { href: '/about',         label: 'About' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-white/[0.06]">
      <nav className="container flex items-center h-[60px]" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-6 group shrink-0" aria-label="Is my car deal good? home">
          <div className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center shadow-sm shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-[13px] text-white leading-tight max-w-[140px]">Is my car deal good?</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-100 ${
                isActive(l.href)
                  ? 'text-brand-400 bg-brand-600/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              isActive('/contact') ? 'text-brand-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Contact
          </Link>
          <Link
            href="/loan"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors shadow-sm"
          >
            Check a Deal
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 -mr-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-zinc-950 animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(l.href)
                    ? 'text-brand-400 bg-brand-600/10'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive('/contact') ? 'text-brand-400 bg-brand-600/10' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              Contact
            </Link>
            <div className="pt-3 mt-1 border-t border-white/[0.06]">
              <Link
                href="/loan"
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-semibold px-4 py-2.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
              >
                Check a Deal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
