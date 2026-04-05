interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helper?: string;
  options: { value: string | number; label: string }[];
}

export function Select({ label, helper, options, id, ...rest }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-sm font-medium text-zinc-400 leading-none">
        {label}
      </label>
      <select
        id={selectId}
        className="input-base cursor-pointer pr-9"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.6rem center',
          backgroundSize: '1.1rem',
          appearance: 'none',
          colorScheme: 'dark',
        }}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {helper && <p className="text-xs text-zinc-600 leading-snug">{helper}</p>}
    </div>
  );
}
