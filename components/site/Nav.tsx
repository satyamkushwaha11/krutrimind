'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { NavItem, SiteMeta } from '@/lib/types';
import Brand from './Brand';

export default function Nav({ site, nav }: { site: SiteMeta; nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = nav
      .filter((n) => n.href.startsWith('#'))
      .map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [nav]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? 'bg-bg/75 border-b border-border-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]'
          : 'bg-bg/40 border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/#top" aria-label={`${site.company} home`}>
          <Brand />
        </Link>
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {nav.map((item) => {
            const isActive = item.href === active;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors ${
                  isActive ? 'text-text' : 'text-text-dim hover:text-text'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-grad transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
          <a href="/#contact" className="btn btn-primary btn-sm">
            Start a project
          </a>
        </nav>
        <button
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-text rounded transition-transform ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text rounded transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text rounded transition-transform ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 px-6 pb-6 pt-4 flex flex-col gap-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-dim"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
