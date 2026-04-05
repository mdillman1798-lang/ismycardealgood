'use client';

import { useState } from 'react';

const bullets = [
  'The one number dealers never volunteer',
  'Which fees are negotiable (and which aren\u2019t)',
  'How to read a lease deal in under 2 minutes',
  'What a good APR looks like right now',
];

export function LeadCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <section className="section bg-zinc-900 border-b border-white/[0.06]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-4">Free resource</p>
            <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
              The Car Buyer&rsquo;s Cheat Sheet
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              A one-page reference covering what to check, what to negotiate, and what to walk away from. Used by buyers before every dealership visit.
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div>
            <div className="bg-zinc-950 rounded-2xl border border-white/[0.07] p-8">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">On its way.</h3>
                  <p className="text-sm text-zinc-400">
                    Check your inbox &mdash; the cheat sheet should arrive within a few minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="text-base font-semibold text-white mb-1">Get it free</h3>
                  <p className="text-sm text-zinc-500 mb-6">Enter your email and we&rsquo;ll send it right over.</p>

                  <div className="space-y-3">
                    <div>
                      <label htmlFor="lc-email" className="block text-sm font-medium text-zinc-400 mb-1.5">
                        Email address
                      </label>
                      <input
                        id="lc-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        className={[
                          'input-base',
                          error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : '',
                        ].filter(Boolean).join(' ')}
                      />
                      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white px-5 py-3 hover:bg-emerald-400 transition-colors"
                    >
                      Send me the cheat sheet
                    </button>
                  </div>

                  <p className="text-xs text-zinc-600 mt-4 text-center">
                    No spam. One email. Unsubscribe any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
