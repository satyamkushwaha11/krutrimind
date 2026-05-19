import { NextResponse } from 'next/server';
import { SESSION_COOKIE, credsMatch, sessionCookieOptions, signSession } from '@/lib/auth';

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const username = (body.username || '').toString();
  const password = (body.password || '').toString();
  if (!credsMatch(username, password)) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }
  const token = signSession(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
