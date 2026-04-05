// ─── Base card ───────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-zinc-900 rounded-xl border border-white/[0.07] ${padding ? 'p-6 sm:p-7' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ─── Primary result — inverted for maximum contrast on dark bg ────────────────

interface HeroStatProps {
  label: string;
  value: string;
  context: string;
}

export function HeroStat({ label, value, context }: HeroStatProps) {
  return (
    <div className="bg-white text-zinc-950 rounded-xl p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">{label}</p>
      <p className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-3 text-zinc-950">{value}</p>
      <p className="text-sm text-zinc-500">{context}</p>
    </div>
  );
}

// ─── Supporting metric grid items ─────────────────────────────────────────────

interface MetricProps {
  label: string;
  value: string;
  note?: string;
}

export function Metric({ label, value, note }: MetricProps) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-white/[0.07] p-4 sm:p-5">
      <p className="text-2xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">{label}</p>
      <p className="text-xl sm:text-2xl font-bold font-mono text-white leading-none">{value}</p>
      {note && <p className="text-xs text-zinc-500 mt-1.5 leading-snug">{note}</p>}
    </div>
  );
}

// ─── Deal health / alert strip ────────────────────────────────────────────────

type AlertTone = 'green' | 'yellow' | 'red';

const alertStyles: Record<AlertTone, { border: string; bg: string; dot: string; label: string; text: string }> = {
  green:  { border: 'border-emerald-500', bg: 'bg-emerald-500/[0.08]', dot: 'bg-emerald-500', label: 'text-emerald-400', text: 'text-emerald-300' },
  yellow: { border: 'border-amber-500',   bg: 'bg-amber-500/[0.08]',   dot: 'bg-amber-500',   label: 'text-amber-400',   text: 'text-amber-300'   },
  red:    { border: 'border-red-500',     bg: 'bg-red-500/[0.08]',     dot: 'bg-red-500',     label: 'text-red-400',     text: 'text-red-300'     },
};

interface DealAlertProps {
  tone: AlertTone;
  label: string;
  note: string;
}

export function DealAlert({ tone, label, note }: DealAlertProps) {
  const s = alertStyles[tone];
  return (
    <div className={`flex gap-4 border-l-4 ${s.border} ${s.bg} rounded-r-xl pl-5 pr-5 py-4`}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${s.label}`}>{label}</span>
        </div>
        <p className={`text-sm leading-relaxed ${s.text}`}>{note}</p>
      </div>
    </div>
  );
}

// ─── Breakdown table row ──────────────────────────────────────────────────────

interface BreakdownRowProps {
  label: React.ReactNode;
  value: string;
  muted?: boolean;
  strong?: boolean;
  separator?: boolean;
}

export function BreakdownRow({ label, value, muted, strong, separator }: BreakdownRowProps) {
  return (
    <div
      className={[
        'flex items-baseline justify-between py-2.5',
        separator ? 'border-t border-white/[0.07] mt-1 pt-3' : '',
      ].join(' ')}
    >
      <dt className={`text-sm ${strong ? 'font-semibold text-white' : muted ? 'text-zinc-600' : 'text-zinc-400'}`}>
        {label}
      </dt>
      <dd className={`text-sm font-mono ${strong ? 'font-bold text-white' : muted ? 'text-zinc-600' : 'text-zinc-300'} ml-4 text-right`}>
        {value}
      </dd>
    </div>
  );
}

// ─── Legacy StatCard ──────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-5 ${highlight ? 'bg-white border-white/20 text-zinc-950' : 'bg-zinc-900 border-white/[0.07]'}`}>
      <p className={`text-2xs font-semibold uppercase tracking-widest mb-1.5 ${highlight ? 'text-zinc-500' : 'text-zinc-500'}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold font-mono leading-none ${highlight ? 'text-zinc-950' : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-xs mt-1.5 text-zinc-500">{sub}</p>}
    </div>
  );
}
