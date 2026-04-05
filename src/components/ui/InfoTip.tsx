'use client';

import { useState } from 'react';

export function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-zinc-700 text-zinc-400 hover:bg-zinc-600 hover:text-white text-[10px] font-bold leading-none shrink-0 align-middle"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        aria-label="More information"
      >
        ?
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-zinc-800 border border-white/[0.1] rounded-lg px-3 py-2.5 text-xs text-zinc-300 leading-relaxed shadow-xl z-50 pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
        </span>
      )}
    </span>
  );
}
