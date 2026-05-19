export interface CtaLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteMeta {
  company: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  keywords: string[];
  email: string;
  location: string;
  responseTime: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  rotatingWords?: string[];
  subtitle: string;
  ctaPrimary: CtaLink;
  ctaSecondary: CtaLink;
  stats: { value: string; label: string }[];
}

export interface TrustedByContent {
  label: string;
  logos: string[];
}

export type ServiceIcon = 'web' | 'mobile' | 'code' | 'agent';
export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
  bullets: string[];
  featured: boolean;
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface AgentsContent {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  bullets: string[];
  cta: CtaLink;
  demo: {
    title: string;
    logs: { time: string; tag: string; text: string }[];
  };
}

export interface ApproachContent {
  eyebrow: string;
  title: string;
  steps: { num: string; title: string; description: string }[];
}

export interface AcademyContent {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  items: { tag: string; title: string; description: string }[];
  waitlistPlaceholder: string;
  waitlistCta: string;
}

export interface ContactContent {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  topics: string[];
}

export interface FooterContent {
  tagline: string;
  links: NavItem[];
}

export interface PortfolioItem {
  slug: string;
  client: string;
  title: string;
  summary: string;
  tags: string[];
  metric: string;
  year: string;
  /** Tailwind gradient classes, e.g. "from-violet-500/30 via-indigo-500/20 to-cyan-500/20" */
  gradient: string;
}

export interface PortfolioContent {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  items: PortfolioItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  items: TestimonialItem[];
}

export interface SiteContent {
  site: SiteMeta;
  nav: NavItem[];
  hero: HeroContent;
  trustedBy: TrustedByContent;
  services: ServicesContent;
  agents: AgentsContent;
  approach: ApproachContent;
  portfolio: PortfolioContent;
  testimonials: TestimonialsContent;
  academy: AcademyContent;
  contact: ContactContent;
  footer: FooterContent;
}
