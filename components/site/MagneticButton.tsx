'use client';

import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  /** Max pixel offset toward the cursor. */
  strength?: number;
}

export default function MagneticButton({
  children,
  href,
  className = 'btn btn-primary btn-lg',
  strength = 10,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength * 2;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${className} will-change-transform transition-transform duration-200 ease-out`}
    >
      {children}
    </a>
  );
}
