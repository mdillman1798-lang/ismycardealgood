'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// ─── Replace this with your Formspree form ID ─────────────────────────────────
// 1. Sign up free at https://formspree.io
// 2. Create a new form → copy the ID (e.g. "xpwzabcd")
// 3. Paste it below
const FORMSPREE_ID = 'mykbbvyb';
// ──────────────────────────────────────────────────────────────────────────────

const CALCULATOR_OPTIONS = [
  { value: '', label: 'Select one (optional)' },
  { value: 'loan', label: 'Loan Calculator' },
  { value: 'lease', label: 'Lease Calculator' },
  { value: 'affordability', label: 'Affordability Calculator' },
  { value: 'general', label: 'General question' },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  calculator: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', phone: '', vehicle: '', calculator: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sendError, setSendError] = useState('');

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please include a message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError('');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSendError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setSendError('Could not send message. Check your connection and try again.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="section">
        <div className="container max-w-lg text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Message received.</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Thanks for reaching out. We&rsquo;ll review your deal details and get back to you shortly.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button href="/" variant="secondary">Back to home</Button>
            <Button href="/loan">Run a calculation</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container max-w-xl">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Contact</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Want help reviewing your deal?
        </h1>
        <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
          Share your deal details and we&rsquo;ll take a look. No obligation.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Your Name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Phone (optional)"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
            <Input
              label="Vehicle (optional)"
              type="text"
              placeholder="e.g. 2024 Honda CR-V EX"
              value={form.vehicle}
              onChange={(e) => set('vehicle', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="calculator" className="block text-sm font-medium text-zinc-400">
              Calculator used (optional)
            </label>
            <select
              id="calculator"
              className="input-base cursor-pointer"
              value={form.calculator}
              onChange={(e) => set('calculator', e.target.value)}
            >
              {CALCULATOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Share your deal details or ask a question..."
              className="input-base resize-none"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
            />
            {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
          </div>

          {sendError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {sendError}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={sending}>
            {sending ? 'Sending…' : 'Send Message'}
          </Button>

          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            We do not sell your information. This form is for educational deal review only and does not constitute financial advice.
          </p>
        </form>
      </div>
    </div>
  );
}
