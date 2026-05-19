'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Counts up numeric portions of `value` (e.g. "10×", "24/7", "62%", "3.4×")
 * the first time the element enters the viewport. Non-numeric chars are
 * preserved in place.
 */
export default function Counter({ value, className = '', duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numMatches = [...value.matchAll(/[\d.]+/g)];
    if (numMatches.length === 0) {
      setDisplay(value);
      return;
    }
    const targets = numMatches.map((m) => parseFloat(m[0]));

    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        let out = value;
        let cursor = 0;
        numMatches.forEach((m, i) => {
          const original = m[0];
          const isFloat = original.includes('.');
          const target = targets[i];
          const current = target * eased;
          const formatted = isFloat ? current.toFixed(1) : String(Math.round(current));
          const idx = out.indexOf(original, cursor);
          out = out.slice(0, idx) + formatted + out.slice(idx + original.length);
          cursor = idx + formatted.length;
        });
        setDisplay(out);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      animate();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && animate()),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
