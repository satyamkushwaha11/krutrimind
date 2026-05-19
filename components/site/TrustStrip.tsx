import type { TrustedByContent } from '@/lib/types';

export default function TrustStrip({ data }: { data: TrustedByContent }) {
  // Duplicate for seamless marquee loop
  const items = [...data.logos, ...data.logos];
  return (
    <section aria-label="Trusted by" className="py-10 border-y border-border bg-bg-soft/40">
      <div className="container-x mb-4">
        <p className="text-center text-[11.5px] uppercase tracking-[2.5px] text-text-faint">
          {data.label}
        </p>
      </div>
      <div className="marquee" style={{ ['--duration' as never]: '40s' }}>
        <div className="marquee-track marquee-left">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="px-8 text-[22px] font-bold tracking-tight text-text-dim/70 hover:text-text transition-colors select-none whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
