'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const [errors, setErrors] = useState<Partial<FormState>>({});

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: wire to email provider (Resend, SendGrid, etc.) or CRM
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="section">
        <div className="container max-w-lg text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-3">Message received.</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            Thanks for reaching out. We'll review your deal details and get back to you shortly.
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
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Contact</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
          Want help reviewing your deal?
        </h1>
        <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
          Share your deal details and we'll take a look. No obligation.
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

          <div className="space-y-1">
            <label htmlFor="calculator" className="block text-sm font-medium text-zinc-700">
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

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
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
            {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>

          <p className="text-xs text-zinc-400 text-center leading-relaxed">
            We do not sell your information. This form is for educational deal review only and does not constitute financial advice.
          </p>
        </form>
      </div>
    </div>
  );
}
