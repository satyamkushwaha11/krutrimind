import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { readContent } from '@/lib/content';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await readContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${site.company} — ${site.tagline}`,
      template: `%s · ${site.company}`,
    },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.company,
    authors: [{ name: site.company, url: siteUrl }],
    creator: site.company,
    publisher: site.company,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      url: siteUrl,
      siteName: site.company,
      title: `${site.company} — ${site.tagline}`,
      description: site.description,
      locale: 'en_US',
      images: [{ url: '/logo.svg', width: 1200, height: 630, alt: site.company }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.company} — ${site.tagline}`,
      description: site.description,
      images: ['/logo.svg'],
      creator: site.social?.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      icon: [{ url: '/logo-mark.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/logo-mark.svg' }],
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: '#07070d',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { site } = await readContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.company,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: site.description,
    email: site.email,
    sameAs: [site.social?.linkedin, site.social?.github].filter(Boolean),
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
