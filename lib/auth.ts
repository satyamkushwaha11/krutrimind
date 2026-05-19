import { createHmac, timingSafeEqual } from 'crypto';

export const SESSION_COOKIE = 'km_admin';
const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'dev-only-secret-change-me';
}

/** Build a signed session token: `<payload-b64>.<hmac-b64>` */
export function signSession(username: string): string {
  const payload = JSON.stringify({ u: username, exp: Date.now() + SESSION_MAX_AGE * 1000 });
  const b64 = Buffer.from(payload).toString('base64url');
  const sig = createHmac('sha256', secret()).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

export function verifySession(token: string | undefined | null): { username: string } | null {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return null;
  const expected = createHmac('sha256', secret()).update(b64).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8')) as {
      u: string;
      exp: number;
    };
    if (!data?.u || typeof data.exp !== 'number') return null;
    if (Date.now() > data.exp) return null;
    return { username: data.u };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export function adminCreds(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'krutri@2026',
  };
}

export function credsMatch(u: string, p: string): boolean {
  const { username, password } = adminCreds();
  const eq = (a: string, b: string) => {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    return ab.length === bb.length && timingSafeEqual(ab, bb);
  };
  return eq(u, username) && eq(p, password);
}
