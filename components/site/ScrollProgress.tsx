'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-grad shadow-[0_0_18px_rgba(124,58,237,0.6)] transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
