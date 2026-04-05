interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export function Input({ label, helper, error, prefix, suffix, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-zinc-400 leading-none">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-zinc-500 text-sm select-none pointer-events-none font-medium">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'input-base',
            prefix ? 'pl-8' : '',
            suffix ? 'pr-12' : '',
            error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : '',
            className,
          ].filter(Boolean).join(' ')}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-3.5 text-zinc-500 text-sm select-none pointer-events-none font-medium">
            {suffix}
          </span>
        )}
      </div>
      {helper && !error && (
        <p className="text-xs text-zinc-600 leading-snug">{helper}</p>
      )}
      {error && (
        <p className="text-xs text-red-400 leading-snug">{error}</p>
      )}
    </div>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
}

export function Checkbox({ label, helper, id, ...rest }: CheckboxProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={inputId}
        className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-brand-600 focus:ring-brand-500 cursor-pointer"
        {...rest}
      />
      <div>
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-300 cursor-pointer leading-snug">
          {label}
        </label>
        {helper && (
          <p className="text-xs text-zinc-600 mt-0.5 leading-snug">{helper}</p>
        )}
      </div>
    </div>
  );
}
