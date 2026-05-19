import type { FooterContent, SiteMeta } from '@/lib/types';
import Brand from './Brand';

export default function Footer({ site, footer }: { site: SiteMeta; footer: FooterContent }) {
  return (
    <footer className="border-t border-border bg-bg/60 py-12">
      <div className="container-x flex flex-col items-center gap-3.5 text-center">
        <Brand size="sm" />
        <p className="text-[14.5px] text-text-dim m-0">{footer.tagline}</p>
        <div className="flex flex-wrap justify-center gap-6">
          {footer.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-text-dim hover:text-text">
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-text-faint mt-2">
          © {new Date().getFullYear()} {site.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
