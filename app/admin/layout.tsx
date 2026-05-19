import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/components/admin/LogoutButton';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';

export const metadata = {
  title: 'Admin · krutrimind',
  robots: { index: false, follow: false },
};

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/site', label: 'Site & SEO' },
  { href: '/admin/hero', label: 'Hero' },
  { href: '/admin/trusted-by', label: 'Trusted-by strip' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/agents', label: 'AI Agents' },
  { href: '/admin/approach', label: 'Approach' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/testimonials', label: 'Client Reviews' },
  { href: '/admin/academy', label: 'Academy' },
  { href: '/admin/contact', label: 'Contact' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = verifySession(token);

  // Login page renders without the chrome
  if (!session) {
    return <div className="min-h-screen bg-bg text-text font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bg text-text font-sans grid md:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-bg-soft/60 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center gap-2.5">
          <Image src="/logo-mark.svg" alt="" width={28} height={28} />
          <div>
            <div className="font-bold tracking-tight">
              <span className="grad-text">krutri</span>mind
            </div>
            <div className="text-[11px] tracking-[1.5px] text-text-faint uppercase">Admin</div>
          </div>
        </div>
        <nav className="p-3 grid gap-1" aria-label="Admin sections">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-text-dim hover:bg-surface hover:text-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border mt-3">
          <Link
            href="/"
            target="_blank"
            className="block rounded-lg px-3 py-2 text-sm text-text-dim hover:bg-surface hover:text-text"
          >
            View site ↗
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="px-6 md:px-10 py-8 md:py-10">{children}</main>
    </div>
  );
}
