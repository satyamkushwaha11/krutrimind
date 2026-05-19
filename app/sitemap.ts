import type { MetadataRoute } from 'next';
import { readContent } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site } = await readContent();
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
