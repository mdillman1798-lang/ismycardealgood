# DealCheck

**Stop Overpaying on Your Next Car.**

DealCheck is a free, client-side web app that helps car buyers instantly check whether a loan payment, lease deal, or vehicle budget makes sense — before they sign anything.

---

## Features

- **Loan Calculator** — Monthly payment, total interest, out-the-door cost, and APR deal health rating
- **Lease Calculator** — Full lease breakdown with Great / Fair / Weak deal rating based on payment-to-MSRP ratio and effective APR
- **Affordability Calculator** — Conservative and stretch budget ranges with debt-to-income analysis
- **Blog** — 5 seeded articles on car finance, leasing, fees, and budgeting
- **Contact form** — Lead capture for deal review (wire to any email/CRM provider)
- No backend required — all calculations run client-side
- SEO metadata on every page via Next.js Metadata API
- Fully mobile responsive

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Zero heavy dependencies beyond the above

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
cd dealcheck
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages + layouts
│   ├── loan/
│   ├── lease/
│   ├── affordability/
│   ├── blog/[slug]/
│   ├── contact/
│   ├── about/
│   ├── privacy/
│   └── terms/
├── components/
│   ├── ui/           # Button, Card, Input, Select, Badge
│   ├── layout/       # Nav, Footer
│   ├── home/         # Hero, FeatureCards, HowItWorks, WhyDealCheck, FAQPreview
│   ├── calculators/  # LoanCalculator, LeaseCalculator, AffordabilityCalculator
│   └── blog/         # BlogCard
├── lib/
│   ├── calc/         # loan.ts, lease.ts, affordability.ts — pure typed functions
│   ├── format.ts     # Currency/number formatters
│   └── blog-data.ts  # Seeded blog content
└── types/
    └── index.ts      # Shared TypeScript types
```

---

## Wiring the Contact Form

The contact form currently uses a local success state. To connect to an email provider:

1. Create an API route at `src/app/api/contact/route.ts`
2. Call [Resend](https://resend.com), [SendGrid](https://sendgrid.com), or similar
3. Replace the `handleSubmit` mock in `src/app/contact/page.tsx` with a `fetch('/api/contact', ...)` call

---

## Disclaimer

DealCheck provides estimates for educational purposes only and does not constitute financial advice or a lending offer. Actual terms, taxes, fees, and lender programs may vary.
