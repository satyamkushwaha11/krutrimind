'use client';

import { useState } from 'react';
import type { ContactContent, SiteMeta } from '@/lib/types';

export default function Contact({ data, site }: { data: ContactContent; site: SiteMeta }) {
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get('email') as string).trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return setMsg({ text: 'Please enter a valid email.', error: true });
    setMsg({ text: "Thanks! We'll reply within one business day." });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 md:py-28">
      <div className="container-x grid items-start gap-14 md:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.025em] leading-[1.12] mb-5">
            {data.titleLead} <span className="grad-text">{data.titleAccent}</span>
          </h2>
          <p className="text-[16.5px] text-text-dim mb-8">{data.description}</p>

          <div className="grid gap-4">
            <div className="flex flex-col gap-1 border-b border-border pb-3.5">
              <strong className="text-[11.5px] font-semibold tracking-[2px] uppercase text-text-faint">
                Email
              </strong>
              <a href={`mailto:${site.email}`} className="text-[15.5px] hover:text-violet-300">
                {site.email}
              </a>
            </div>
            <div className="flex flex-col gap-1 border-b border-border pb-3.5">
              <strong className="text-[11.5px] font-semibold tracking-[2px] uppercase text-text-faint">
                Based in
              </strong>
              <span className="text-[15.5px]">{site.location}</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-border pb-3.5">
              <strong className="text-[11.5px] font-semibold tracking-[2px] uppercase text-text-faint">
                Response
              </strong>
              <span className="text-[15.5px]">{site.responseTime}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-4 rounded-3xl border border-border-strong bg-surface p-7"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="grid gap-1.5">
              <span className="label-base">Name</span>
              <input type="text" name="name" required placeholder="Your name" className="input-base" />
            </label>
            <label className="grid gap-1.5">
              <span className="label-base">Email</span>
              <input type="email" name="email" required placeholder="you@email.com" className="input-base" />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="label-base">Company (optional)</span>
            <input type="text" name="company" placeholder="Acme Inc." className="input-base" />
          </label>
          <label className="grid gap-1.5">
            <span className="label-base">What can we help with?</span>
            <select name="topic" className="input-base">
              {data.topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="label-base">Tell us about your project</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Goals, constraints, timeline…"
              className="input-base resize-y min-h-[110px]"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-lg mt-1">
            Send message →
          </button>
          {msg && (
            <p
              role="status"
              className={`text-[13px] mt-1 ${msg.error ? 'text-red-400' : 'text-cyan-300'}`}
            >
              {msg.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
