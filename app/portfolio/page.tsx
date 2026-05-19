import type { Metadata } from 'next';
import Link from 'next/link';
import BgOrbs from '@/components/site/BgOrbs';
import ScrollProgress from '@/components/site/ScrollProgress';
import Reveal from '@/components/site/Reveal';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import { PortfolioCard } from '@/components/site/Portfolio';
import { readContent } from '@/lib/content';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { site, portfolio } = await readContent();
  const title = 'Work · Selected projects & case studies';
  const description = portfolio.description || site.description;
  return {
    title,
    description,
    alternates: { canonical: '/portfolio' },
    openGraph: {
      title: `${title} — ${site.company}`,
      description,
      url: '/portfolio',
      images: ['/logo.svg'],
    },
  };
}

export default async function PortfolioPage() {
  const content = await readContent();
  const { portfolio, site } = content;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'krutrimind — Selected work',
    url: `${siteUrl}/portfolio`,
    description: portfolio.description,
    hasPart: portfolio.items.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      about: p.client,
      keywords: p.tags.join(', '),
      datePublished: p.year,
      description: p.summary,
      url: `${siteUrl}/portfolio#${p.slug}`,
    })),
  };

  return (
    <>
      <ScrollProgress />
      <BgOrbs />
      <Nav site={content.site} nav={content.nav} />
      <main className="pt-20 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="container-x py-16 md:py-20">
          <Link href="/" className="text-sm text-text-faint hover:text-text-dim">
            ← Back home
          </Link>
          <div className="mt-6 max-w-[820px]">
            <span className="eyebrow">{portfolio.eyebrow}</span>
            <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold tracking-[-0.03em] leading-[1.05] mb-5">
              {portfolio.title}
            </h1>
            <p className="text-text-dim text-[17px]">{portfolio.description}</p>
          </div>
        </section>

        <section className="container-x">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <div id={p.slug} className="scroll-mt-24 h-full">
                  <PortfolioCard p={p} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-x mt-20 rounded-3xl border border-border-strong bg-surface p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Have a project like one of these?
          </h2>
          <p className="text-text-dim mb-6 max-w-[560px] mx-auto">
            Tell us about it — we'll come back with a plan, scope and rough timeline within a business day.
          </p>
          <Link href="/#contact" className="btn btn-primary btn-lg">
            Start a project →
          </Link>
        </section>
      </main>
      <Footer site={content.site} footer={content.footer} />
    </>
  );
}
