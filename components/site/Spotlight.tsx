'use client';

import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Size of the radial glow */
  size?: number;
}

/**
 * Wrap children to add a cursor-following radial glow inside an overlay.
 * The overlay covers the container and lives above any element with `position: relative`.
 */
export default function Spotlight({ children, className = '', size = 400 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative ${className}`}
      style={{ ['--mx' as never]: '50%', ['--my' as never]: '50%' }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx) var(--my), rgba(124,58,237,0.18), transparent 40%)`,
        }}
      />
    </div>
  );
}
