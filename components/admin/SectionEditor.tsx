'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type SectionKey =
  | 'site'
  | 'nav'
  | 'hero'
  | 'trustedBy'
  | 'services'
  | 'agents'
  | 'approach'
  | 'portfolio'
  | 'testimonials'
  | 'academy'
  | 'contact'
  | 'footer';

interface Props {
  section: SectionKey;
  initial: unknown;
  title: string;
  description?: string;
}

export default function SectionEditor({ section, initial, title, description }: Props) {
  const router = useRouter();
  const [text, setText] = useState(() => JSON.stringify(initial, null, 2));
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'ok' | 'err'; msg?: string }>({
    kind: 'idle',
  });

  const parsed = useMemo(() => {
    try {
      return { value: JSON.parse(text), error: null as string | null };
    } catch (e) {
      return { value: null, error: (e as Error).message };
    }
  }, [text]);

  // Esc-to-format: Ctrl/Cmd+S triggers save
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!parsed.error) void save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed.error, text]);

  const save = async () => {
    if (parsed.error) {
      setStatus({ kind: 'err', msg: 'Fix JSON errors before saving.' });
      return;
    }
    setStatus({ kind: 'saving' });
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ [section]: parsed.value }),
    });
    if (!res.ok) {
      setStatus({ kind: 'err', msg: `Save failed (${res.status})` });
      return;
    }
    setStatus({ kind: 'ok', msg: 'Saved.' });
    router.refresh();
    setTimeout(() => setStatus({ kind: 'idle' }), 2500);
  };

  const reset = () => setText(JSON.stringify(initial, null, 2));
  const format = () => {
    if (parsed.error) return;
    setText(JSON.stringify(parsed.value, null, 2));
  };

  return (
    <div className="max-w-[960px]">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
          {description && <p className="text-sm text-text-dim">{description}</p>}
          <p className="text-xs text-text-faint mt-1">
            Section key: <code className="font-mono">{section}</code> · saves to{' '}
            <code className="font-mono">data/content.json</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={reset} className="btn btn-ghost btn-sm">
            Reset
          </button>
          <button type="button" onClick={format} className="btn btn-ghost btn-sm">
            Format
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!!parsed.error || status.kind === 'saving'}
            className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.kind === 'saving' ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </header>

      <div
        className={`rounded-2xl border bg-[#0a0a14] overflow-hidden transition-colors ${
          parsed.error ? 'border-red-500/50' : 'border-border-strong'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-xs text-text-faint">
              data/content.json → {section}
            </span>
          </div>
          <span className="text-xs text-text-faint">⌘/Ctrl + S to save</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="block w-full bg-transparent p-4 font-mono text-[13px] leading-[1.6] text-text outline-none resize-none min-h-[520px]"
        />
      </div>

      <div className="mt-3 min-h-[24px] text-sm">
        {parsed.error && <span className="text-red-400">JSON error: {parsed.error}</span>}
        {!parsed.error && status.kind === 'ok' && <span className="text-cyan-300">{status.msg}</span>}
        {!parsed.error && status.kind === 'err' && <span className="text-red-400">{status.msg}</span>}
        {!parsed.error && status.kind === 'idle' && <span className="text-text-faint">JSON valid.</span>}
      </div>
    </div>
  );
}
