import type { ServiceIcon, ServicesContent } from '@/lib/types';
import Reveal from './Reveal';
import Spotlight from './Spotlight';

function Icon({ name }: { name: ServiceIcon }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: 24,
    height: 24,
  };
  switch (name) {
    case 'web':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 9h18M8 14h2M14 14h2" />
        </svg>
      );
    case 'mobile':
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case 'code':
      return (
        <svg {...common}>
          <path d="M8 3 4 7l4 4M16 3l4 4-4 4M14 17l-4 4" />
        </svg>
      );
    case 'agent':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
        </svg>
      );
  }
}

export default function Services({ data }: { data: ServicesContent }) {
  return (
    <section id="services" className="py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="max-w-[740px] mb-14">
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.025em] leading-[1.1] mb-4">
              {data.title}
            </h2>
            <p className="text-text-dim text-[17px]">{data.description}</p>
          </div>
        </Reveal>
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {data.items.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <Spotlight className="rounded-3xl h-full">
                <article
                  className={`relative h-full rounded-3xl border bg-surface p-7 transition-all duration-200 hover:border-border-strong hover:-translate-y-0.5 ${
                    s.featured
                      ? 'border-violet-400/30 bg-gradient-to-b from-violet-500/10 to-cyan-500/[0.04]'
                      : 'border-border'
                  }`}
                >
                  {s.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-grad px-2.5 py-1 text-[11px] font-semibold tracking-[1.2px] text-white shadow-glow">
                      Flagship
                    </span>
                  )}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-300">
                    <Icon name={s.icon} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mb-4 text-[14.5px] text-text-dim">{s.description}</p>
                  <ul className="space-y-1">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="relative pl-5 text-[13.5px] text-text-dim before:absolute before:left-0 before:top-[11px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-grad-soft"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
