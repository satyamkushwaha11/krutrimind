import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent } from './types';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

export async function readContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, 'utf8');
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  const formatted = JSON.stringify(content, null, 2) + '\n';
  await fs.writeFile(CONTENT_PATH, formatted, 'utf8');
}

/**
 * Merge a partial update into a single top-level section and persist.
 * Used by the admin editors so each form only ships the slice it owns.
 */
export async function updateSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K],
): Promise<SiteContent> {
  const current = await readContent();
  const next = { ...current, [section]: value } as SiteContent;
  await writeContent(next);
  return next;
}
