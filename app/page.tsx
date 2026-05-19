import { readContent } from '@/lib/content';
import BgOrbs from '@/components/site/BgOrbs';
import ScrollProgress from '@/components/site/ScrollProgress';
import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import TrustStrip from '@/components/site/TrustStrip';
import Services from '@/components/site/Services';
import Agents from '@/components/site/Agents';
import Approach from '@/components/site/Approach';
import PortfolioStrip from '@/components/site/Portfolio';
import Testimonials from '@/components/site/Testimonials';
import Academy from '@/components/site/Academy';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

export const revalidate = 0;

export default async function HomePage() {
  const content = await readContent();
  return (
    <>
      <ScrollProgress />
      <BgOrbs />
      <Nav site={content.site} nav={content.nav} />
      <main id="top">
        <Hero data={content.hero} />
        <TrustStrip data={content.trustedBy} />
        <Services data={content.services} />
        <Agents data={content.agents} />
        <Approach data={content.approach} />
        <PortfolioStrip data={content.portfolio} />
        <Testimonials data={content.testimonials} />
        <Academy data={content.academy} />
        <Contact data={content.contact} site={content.site} />
      </main>
      <Footer site={content.site} footer={content.footer} />
    </>
  );
}
