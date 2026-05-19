'use client';

import { useEffect, useState } from 'react';

interface Props {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export default function WordCycler({ words, intervalMs = 2400, className = '' }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <span
      className={`relative inline-block align-bottom overflow-hidden ${className}`}
      style={{ minWidth: `${longest.length}ch` }}
      aria-live="polite"
    >
      {/* Invisible sizer keeps layout from jumping */}
      <span aria-hidden className="invisible block whitespace-nowrap">
        {longest}
      </span>
      {words.map((w, idx) => (
        <span
          key={w + idx}
          className="grad-text absolute inset-0 whitespace-nowrap will-change-transform"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? 'translateY(0)' : idx === (i - 1 + words.length) % words.length ? 'translateY(-100%)' : 'translateY(100%)',
            transition:
              'opacity 600ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
