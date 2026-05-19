import type { HeroContent } from '@/lib/types';
import Counter from './Counter';
import MagneticButton from './MagneticButton';
import NeuralOrb from './NeuralOrb';
import Reveal from './Reveal';
import WordCycler from './WordCycler';

export default function Hero({ data }: { data: HeroContent }) {
  const words = data.rotatingWords?.length ? data.rotatingWords : [data.titleLine2];

  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3.5 py-1.5 text-[12.5px] font-medium text-violet-300 mb-7">
              <span className="relative inline-block h-2 w-2 rounded-full bg-violet-300 animate-pulseDot" />
              {data.badge}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-[clamp(40px,6.4vw,76px)] leading-[1.04] font-extrabold tracking-[-0.03em] mb-5">
              {data.titleLine1}
              <br />
              <WordCycler words={words} />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-[640px] text-[clamp(16px,1.4vw,19px)] text-text-dim mb-9">
              {data.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap gap-3.5 mb-16">
              <MagneticButton href={data.ctaPrimary.href} className="btn btn-primary btn-lg cta-glow">
                {data.ctaPrimary.label}
              </MagneticButton>
              <a href={data.ctaSecondary.href} className="btn btn-ghost btn-lg">
                {data.ctaSecondary.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pt-10 border-t border-border max-w-[820px]">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <Counter
                    value={stat.value}
                    className="text-4xl font-extrabold tracking-tight grad-text"
                  />
                  <span className="text-[13.5px] leading-snug text-text-faint">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <NeuralOrb className="absolute inset-0" />
            {/* Floating status chips */}
            <div className="absolute left-[6%] top-[14%] rounded-full border border-border-strong bg-bg-soft/80 backdrop-blur px-3 py-1.5 text-[11.5px] font-mono text-text-dim shadow-glow animate-[float_8s_ease-in-out_infinite]">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              agent.online
            </div>
            <div className="absolute right-[4%] top-[44%] rounded-full border border-border-strong bg-bg-soft/80 backdrop-blur px-3 py-1.5 text-[11.5px] font-mono text-text-dim shadow-glow animate-[float_10s_ease-in-out_infinite_-2s]">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulseDot" />
              tools · 12
            </div>
            <div className="absolute left-[10%] bottom-[10%] rounded-full border border-border-strong bg-bg-soft/80 backdrop-blur px-3 py-1.5 text-[11.5px] font-mono text-text-dim shadow-glow animate-[float_12s_ease-in-out_infinite_-4s]">
              tokens / s · <span className="text-violet-300">1.2k</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
