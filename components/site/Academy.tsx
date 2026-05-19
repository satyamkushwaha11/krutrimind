'use client';

import { useState } from 'react';
import type { AcademyContent } from '@/lib/types';
import Reveal from './Reveal';

export default function Academy({ data }: { data: AcademyContent }) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) return setMsg({ text: 'Please enter a valid email.', error: true });
    setMsg({ text: "You're on the list — we'll be in touch." });
    setEmail('');
  };

  return (
    <section
      id="future"
      className="relative py-24 md:py-28 border-y border-border
                 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.10),transparent_60%)]"
    >
      <div className="container-x">
        <Reveal>
          <div className="max-w-[740px] mb-14">
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              {data.titleLead} <span className="grad-text">{data.titleAccent}</span>
            </h2>
            <p className="text-text-dim text-[17px]">{data.description}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] mb-10">
          {data.items.map((item, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="card-base ring-grad rounded-3xl h-full">
                <span className="mb-3.5 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold tracking-[1.5px] text-cyan-300">
                  {item.tag}
                </span>
                <h4 className="mb-2 text-lg font-bold tracking-tight">{item.title}</h4>
                <p className="text-[14.5px] text-text-dim">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="flex flex-wrap items-center gap-3 max-w-[540px] rounded-full border border-border-strong bg-surface p-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={data.waitlistPlaceholder}
            aria-label="Email for academy waitlist"
            required
            className="flex-1 min-w-[200px] bg-transparent border-0 outline-none px-4 py-2.5 text-[14.5px] text-text placeholder:text-text-faint"
          />
          <button type="submit" className="btn btn-primary">
            {data.waitlistCta}
          </button>
          {msg && (
            <p
              role="status"
              className={`w-full px-4 mt-1 text-[13px] ${msg.error ? 'text-red-400' : 'text-cyan-300'}`}
            >
              {msg.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
