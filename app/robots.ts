import type { MetadataRoute } from 'next';
import { readContent } from '@/lib/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { site } = await readContent();
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
