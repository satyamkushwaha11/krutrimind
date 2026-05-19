import type { AgentsContent } from '@/lib/types';
import AnimatedLogs from './AnimatedLogs';
import Reveal from './Reveal';

export default function Agents({ data }: { data: AgentsContent }) {
  return (
    <section
      id="agents"
      className="relative py-24 md:py-28 border-y border-border overflow-hidden
                 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.10),transparent_60%)]"
    >
      <div className="container-x grid items-center gap-14 md:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 className="text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.025em] leading-[1.12] mb-5">
              {data.titleLead} <span className="grad-text">{data.titleAccent}</span>
            </h2>
            <p className="text-[16.5px] text-text-dim mb-6">{data.description}</p>
          </Reveal>
          <div className="grid gap-3 mb-8">
            {data.bullets.map((b, i) => (
              <Reveal key={i} delay={120 + i * 60}>
                <div className="flex items-center gap-3 text-[15px] text-text-dim">
                  <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-[12px] font-bold text-violet-300">
                    ✓
                  </span>
                  {b}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <a href={data.cta.href} className="btn btn-primary">
              {data.cta.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <AnimatedLogs title={data.demo.title} logs={data.demo.logs} />
        </Reveal>
      </div>
    </section>
  );
}
