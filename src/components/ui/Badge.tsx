type Tone = 'green' | 'yellow' | 'red' | 'blue' | 'slate';

const tones: Record<Tone, string> = {
  green:  'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  yellow: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
  red:    'bg-red-500/10 text-red-400 ring-1 ring-red-500/20',
  blue:   'bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20',
  slate:  'bg-zinc-700/60 text-zinc-300 ring-1 ring-zinc-700',
};

export function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}
