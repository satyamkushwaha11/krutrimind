import type { ApproachContent } from '@/lib/types';
import Reveal from './Reveal';
import Spotlight from './Spotlight';

export default function Approach({ data }: { data: ApproachContent }) {
  return (
    <section id="approach" className="py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="max-w-[740px] mb-14">
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.025em] leading-[1.1]">
              {data.title}
            </h2>
          </div>
        </Reveal>
        <ol className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] list-none p-0">
          {data.steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <Spotlight className="rounded-3xl h-full">
                <li className="relative h-full rounded-3xl border border-border bg-surface p-7 transition-all hover:border-border-strong hover:-translate-y-0.5">
                  <div className="mb-3.5 font-mono text-[13px] font-semibold grad-text">{s.num}</div>
                  <h4 className="mb-2 text-lg font-bold tracking-tight">{s.title}</h4>
                  <p className="text-[14.5px] text-text-dim">{s.description}</p>
                </li>
              </Spotlight>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
