'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { getStrings } from '@/lib/ui-strings';

interface MenuItem {
  _id?: string;
  url: string;
  target?: string;
  isVisible?: boolean;
  sortOrder?: number;
  label?: string;
  [key: string]: any;
}

interface HeaderClientProps {
  logoUrl: string;
  siteName: string;
  menuItems: MenuItem[];
  languages: { code: string; name: string }[];
  activeLanguage: string;
}

const defaultMenuItems: MenuItem[] = [
  { url: '/destinations', label: 'Destinations' },
  { url: '/trips', label: 'Trips' },
  { url: '/blogs', label: 'Blogs' },
  { url: '/contact', label: 'Contact' }
];

export default function HeaderClient({ logoUrl, siteName, menuItems, languages, activeLanguage }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ui = getStrings(activeLanguage);

  const navLabelByUrl: Record<string, string> = {
    '/destinations': ui.navDestinations,
    '/trips': ui.navTripsTours,
    '/travel-types': ui.navTravelStyle,
    '/categories': ui.navCategories,
    '/blogs': ui.navBlog,
    '/contact': ui.navContact,
  };

  const resolvedDefaults: MenuItem[] = defaultMenuItems.map((item) => ({
    ...item,
    label: navLabelByUrl[item.url] ?? item.label,
  }));

  const items = menuItems.length > 0 ? menuItems : resolvedDefaults;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center" href="/">
          <Image src={logoUrl} alt={siteName || 'Skyzeg Travel'} width={100} height={46} priority />
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label={ui.navToggleNavigation}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={String(item._id || item.url)}>
                <Link
                  className="rounded-full px-3 py-2 text-sm font-medium text-[#334155] transition hover:bg-slate-100 hover:text-[#0F172A]"
                  href={item.url}
                  target={item.target || '_self'}
                >
                  {item.label || item.url}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-1 flex items-center gap-2">
            <LanguageSwitcher languages={languages} active={activeLanguage} />
            <Link className="rounded-full bg-[#1C398E] px-4 py-2 text-md font-medium text-white transition hover:bg-[#152d73]" href="/tailor-made">
              {ui.navBookNow}
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={String(item._id || item.url)}>
                <Link
                  className="block rounded-2xl px-3 py-2 text-sm font-medium text-[#334155] transition hover:bg-slate-100 hover:text-[#0F172A]"
                  href={item.url}
                  target={item.target || '_self'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label || item.url}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <LanguageSwitcher languages={languages} active={activeLanguage} />
            <Link className="rounded-full bg-[#1C398E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#152d73]" href="/tailor-made" onClick={() => setMobileMenuOpen(false)}>
              {ui.navBookNow}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
