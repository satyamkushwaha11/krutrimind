'use client';

import { useEffect, useRef, useState } from 'react';

interface LogLine {
  time: string;
  tag: string;
  text: string;
}

interface Props {
  title: string;
  logs: LogLine[];
}

/**
 * Streams the agent log into view line-by-line, looping forever.
 * Pauses while the section is offscreen to save battery.
 */
export default function AnimatedLogs({ title, logs }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 1;
    setCount(1);
    const id = setInterval(() => {
      i += 1;
      if (i > logs.length + 2) {
        i = 1;
      }
      setCount(Math.min(i, logs.length));
    }, 850);
    return () => clearInterval(id);
  }, [visible, logs.length]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-border-strong bg-[#0a0a14] shadow-glow-lg overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-text-faint">{title}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulseDot" />
          live
        </span>
      </div>
      <pre className="m-0 p-5 font-mono text-[12.5px] leading-[1.85] text-text-dim whitespace-pre-wrap min-h-[280px]">
        {logs.slice(0, count).map((l, i) => (
          <span
            key={`${count}-${i}`}
            style={{
              display: 'block',
              opacity: 0,
              animation: `logIn 380ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
              animationDelay: i === count - 1 ? '0ms' : '0ms',
            }}
          >
            <span className="text-text-faint">{l.time}</span>{' '}
            <span
              className={`mx-1.5 inline-block min-w-[56px] rounded px-1.5 text-center text-[11px] ${
                l.tag === 'done'
                  ? 'bg-emerald-400/15 text-emerald-300'
                  : l.tag === 'human'
                    ? 'bg-amber-400/15 text-amber-300'
                    : 'bg-violet-500/15 text-violet-300'
              }`}
            >
              {l.tag}
            </span>
            {l.text}
            {i === count - 1 && count < logs.length && (
              <span className="ml-1 inline-block h-3.5 w-1.5 -mb-0.5 bg-violet-300 animate-pulse" />
            )}
          </span>
        ))}
      </pre>
      <style>{`
        @keyframes logIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
