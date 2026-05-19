import { NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/content';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

// Auth enforced by middleware.ts — this only runs for valid admin sessions.
export async function PUT(req: Request) {
  let body: Partial<SiteContent>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const current = await readContent();
  // Shallow-merge each known top-level section the client sends.
  const merged: SiteContent = {
    ...current,
    ...(body as SiteContent),
  };

  await writeContent(merged);
  return NextResponse.json({ ok: true, content: merged });
}
