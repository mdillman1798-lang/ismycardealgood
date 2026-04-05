import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

type Props = ButtonProps | LinkButtonProps;

const base =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600 shadow-[0_1px_2px_0_rgb(0_0_0/0.3)]',
  secondary:
    'border border-white/[0.1] text-zinc-200 bg-zinc-800 hover:bg-zinc-700 hover:border-white/[0.15] active:bg-zinc-600',
  ghost:
    'text-zinc-400 hover:text-white hover:bg-zinc-800 active:bg-zinc-700',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-sm px-5 py-3 gap-2',
};

function cls(variant: Variant, size: Size, extra?: string) {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ');
}

export function Button({ variant = 'primary', size = 'md', className, href, ...rest }: Props) {
  if (href !== undefined) {
    const { children } = rest as LinkButtonProps;
    return (
      <Link href={href} className={cls(variant, size, className)}>
        {children}
      </Link>
    );
  }
  const { children, ...btnRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls(variant, size, className)} {...btnRest}>
      {children}
    </button>
  );
}
