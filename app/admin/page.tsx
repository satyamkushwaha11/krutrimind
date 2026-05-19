import Link from 'next/link';
import { readContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const CARDS = [
  { href: '/admin/site', label: 'Site & SEO', desc: 'Company name, domain, meta, keywords, social.' },
  { href: '/admin/hero', label: 'Hero', desc: 'Headline, subtitle, badge, CTAs, stats.' },
  { href: '/admin/services', label: 'Services', desc: 'The four offering cards.' },
  { href: '/admin/agents', label: 'AI Agents', desc: 'Agent section copy and the demo log.' },
  { href: '/admin/approach', label: 'Approach', desc: 'Process steps.' },
  { href: '/admin/academy', label: 'Academy', desc: 'Upcoming courses and waitlist.' },
  { href: '/admin/contact', label: 'Contact', desc: 'Contact copy and topics.' },
];

export default async function AdminDashboard() {
  const content = await readContent();
  return (
    <div className="max-w-[960px]">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back.</h1>
        <p className="text-text-dim">
          Editing <span className="font-mono text-violet-300">{content.site.domain}</span> · changes
          go live on save (Next.js revalidates on every request in dev).
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card-base block hover:border-violet-400/40"
          >
            <h2 className="mb-2 text-lg font-semibold">{c.label}</h2>
            <p className="text-[14px] text-text-dim">{c.desc}</p>
            <span className="mt-4 inline-block text-[13px] text-violet-300">Edit →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
