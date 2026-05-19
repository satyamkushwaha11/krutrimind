import Link from 'next/link';
import type { PortfolioContent, PortfolioItem } from '@/lib/types';
import Reveal from './Reveal';
import Spotlight from './Spotlight';

export function PortfolioCard({ p, featured = false }: { p: PortfolioItem; featured?: boolean }) {
  return (
    <Spotlight className="rounded-3xl h-full" size={520}>
      <Link
        href={`/portfolio#${p.slug}`}
        className={`group relative block h-full overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5 ${
          featured ? 'sm:col-span-2 lg:col-span-2' : ''
        }`}
      >
        <div
          className={`relative aspect-[16/9] bg-gradient-to-br ${p.gradient} flex items-end p-6 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-grid opacity-40 transition-transform duration-700 group-hover:scale-105" />
          {/* Scanline shimmer */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
              transform: 'translateX(-100%)',
              animation: 'sheen 1.6s ease-in-out',
            }}
          />
          <div className="absolute right-5 top-5 flex flex-wrap justify-end gap-2">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[2px] text-white/70">{p.client}</div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow">
              {p.title}
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-4 text-[14.5px] text-text-dim">{p.summary}</p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[13px] text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-pulseDot" />
              {p.metric}
            </span>
            <span className="text-[12px] text-text-faint">{p.year}</span>
          </div>
        </div>
      </Link>
    </Spotlight>
  );
}

export default function PortfolioStrip({ data }: { data: PortfolioContent }) {
  const featured = data.items.slice(0, 4);
  return (
    <section id="work" className="py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <span className="eyebrow">{data.eyebrow}</span>
              <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.025em] leading-[1.1] mb-3">
                {data.title}
              </h2>
              <p className="text-text-dim text-[17px]">{data.description}</p>
            </div>
            <Link href="/portfolio" className="btn btn-ghost">
              {data.viewAllLabel}
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <PortfolioCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
