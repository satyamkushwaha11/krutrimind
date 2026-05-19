import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from './lib/auth';

export const config = {
  matcher: ['/admin/:path*', '/api/content/:path*'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public exceptions
  if (pathname === '/admin/login') return NextResponse.next();
  if (pathname === '/api/content' && req.method === 'GET') return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = verifySession(token);

  if (!session) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
