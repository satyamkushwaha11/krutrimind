import type { TestimonialsContent, TestimonialItem } from '@/lib/types';

function Card({ t }: { t: TestimonialItem }) {
  return (
    <figure className="group relative w-[360px] sm:w-[420px] shrink-0 rounded-3xl border border-border bg-surface p-7 transition-colors hover:border-border-strong">
      <svg
        className="absolute right-6 top-5 h-9 w-9 text-violet-400/30"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
      </svg>
      <blockquote className="text-[15px] leading-relaxed text-text-dim mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad text-sm font-bold text-white">
          {t.initials}
        </span>
        <span className="flex flex-col">
          <span className="font-semibold text-text leading-tight">{t.name}</span>
          <span className="text-[12.5px] text-text-faint">
            {t.role} · {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ data }: { data: TestimonialsContent }) {
  const mid = Math.ceil(data.items.length / 2);
  const rowA = data.items.slice(0, mid);
  const rowB = data.items.slice(mid).concat(data.items.slice(0, Math.max(0, mid - (data.items.length - mid))));
  // ensure rowB has enough cards
  const safeRowB = rowB.length >= 3 ? rowB : data.items.slice().reverse();

  return (
    <section
      id="reviews"
      className="relative py-24 md:py-28 border-y border-border overflow-hidden
                 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.10),transparent_60%)]"
    >
      <div className="container-x mb-12">
        <div className="max-w-[740px]">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.025em] leading-[1.1] mb-4">
            {data.titleLead} <span className="grad-text">{data.titleAccent}</span>
          </h2>
          <p className="text-text-dim text-[17px]">{data.description}</p>
        </div>
      </div>

      <div className="marquee" aria-label="Client testimonials">
        <div className="marquee-track marquee-left">
          {[...rowA, ...rowA].map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="marquee mt-6">
        <div className="marquee-track marquee-right">
          {[...safeRowB, ...safeRowB].map((t, i) => (
            <Card key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
