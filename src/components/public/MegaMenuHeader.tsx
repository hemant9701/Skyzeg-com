'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, MapPin, Plane, BookOpen, Compass, Mail, Home, Tag } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { getStrings } from '@/lib/ui-strings';

interface MenuItem {
  _id?: string;
  parentId?: string;
  url: string;
  target?: string;
  isVisible?: boolean;
  sortOrder?: number;
  label?: string;
}

interface MegaColumn {
  title: string;
  items: { _id?: string; url: string; label: string }[];
}

interface MegaMenuHeaderProps {
  logoUrl: string;
  logo2Url: string;
  siteName: string;
  menuItems: MenuItem[];
  languages: { code: string; name: string }[];
  activeLanguage: string;
  destinations?: any[];
  travelTypes?: any[];
  categories?: any[];
}

const NAV_CONFIG: Record<string, { icon: any }> = {
  '/destinations': { icon: MapPin },
  '/trips':        { icon: Plane },
  '/travel-types': { icon: Compass },
  '/categories':   { icon: Tag },
  '/blogs':        { icon: BookOpen },
  '/contact':      { icon: Mail },
};

const DEFAULT_ITEMS: MenuItem[] = [
  { url: '/destinations', label: 'Destinations' },
  { url: '/trips',        label: 'Trips & Tours' },
  { url: '/travel-types', label: 'Travel Style' },
  { url: '/blogs',        label: 'Blog' },
  { url: '/contact',      label: 'Contact' },
];

export default function MegaMenuHeader({
  logoUrl,
  siteName,
  logo2Url,
  menuItems,
  languages,
  activeLanguage,
  destinations = [],
  travelTypes = [],
  categories = [],
}: MegaMenuHeaderProps) {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [mobileActive, setMobileActive]   = useState<string | null>(null);
  const [hovered, setHovered]             = useState<string | null>(null);
  const [isScrolled, setIsScrolled]       = useState(false);
  const pathname = usePathname();
  const ui = getStrings(activeLanguage);
  const normalizedItems = (menuItems || [])
    .filter((item) => item.isVisible !== false)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLabelByUrl: Record<string, string> = {
    '/destinations': ui.navDestinations,
    '/trips': ui.navTripsTours,
    '/travel-types': ui.navTravelStyle,
    '/categories': ui.navCategories,
    '/blogs': ui.navBlog,
    '/contact': ui.navContact,
  };

  const resolvedDefaults: MenuItem[] = DEFAULT_ITEMS.map((item) => ({
    ...item,
    label: navLabelByUrl[item.url] ?? item.label,
  }));

  const topLevelMenuItems = normalizedItems.filter((item) => !item.parentId);
  const items = topLevelMenuItems.length > 0 ? topLevelMenuItems : resolvedDefaults;
  const solidHeaderRoutes = new Set([
    '/trips',
    '/destinations',
    '/travel-types',
    '/categories',
    '/blogs',
    '/contact',
    '/tailor-made'
  ]);
  const shouldUseTransparentHeader =
    pathname === '/' ||
    (!solidHeaderRoutes.has(pathname) && !pathname.startsWith('/booking'));
  const solidHeader = isScrolled || mobileOpen || !shouldUseTransparentHeader;

  /** Build mega-panel columns purely from live prop data */
  function getColumns(url: string): MegaColumn[] | null {
    const activeItem = normalizedItems.find((item) => item.url === url && !item.parentId);
    if (activeItem?._id) {
      const children = normalizedItems.filter((item) => String(item.parentId || '') === String(activeItem._id));
      if (children.length > 0) {
        const childIds = new Set(children.map((item) => String(item._id || '')));
        const grandchildren = normalizedItems.filter((item) => childIds.has(String(item.parentId || '')));

        if (grandchildren.length > 0) {
          const columns: MegaColumn[] = children
            .map((child) => {
              const links = grandchildren
                .filter((item) => String(item.parentId || '') === String(child._id || ''))
                .map((item) => ({
                  _id: item._id,
                  url: item.url,
                  label: item.label || item.url
                }));
              if (links.length === 0) return null;
              return {
                title: child.label || child.url,
                items: links
              };
            })
            .filter(Boolean) as MegaColumn[];

          const flatChildren = children
            .filter((child) => !grandchildren.some((item) => String(item.parentId || '') === String(child._id || '')))
            .map((child) => ({ _id: child._id, url: child.url, label: child.label || child.url }));

          if (flatChildren.length > 0) {
            columns.push({ title: ui.megaQuickLinks, items: flatChildren });
          }

          if (columns.length > 0) {
            return columns;
          }
        }

        return [
          {
            title: activeItem.label || activeItem.url,
            items: children.map((item) => ({
              _id: item._id,
              url: item.url,
              label: item.label || item.url
            }))
          }
        ];
      }
    }

    switch (url) {
      case '/destinations': {
        if (!destinations.length) return null;
        const cols: MegaColumn[] = [];
        // Up to 2 columns of 5 destinations each
        const chunk1 = destinations.slice(0, 5).map((d: any) => ({
          _id: String(d._id),
          url: `/destinations/${d.slug}`,
          label: d.title || d.name || d.slug,
        }));
        const chunk2 = destinations.slice(5, 10).map((d: any) => ({
          _id: String(d._id),
          url: `/destinations/${d.slug}`,
          label: d.title || d.name || d.slug,
        }));
        cols.push({ title: ui.megaPopularDestinations, items: chunk1 });
        if (chunk2.length) cols.push({ title: ui.megaMoreDestinations, items: chunk2 });
        cols.push({
          title: ui.megaQuickLinks,
          items: [
            { url: '/destinations', label: ui.megaAllDestinations },
            { url: '/trips',        label: ui.megaBrowseToursLink },
          ],
        });
        return cols;
      }
      case '/trips': {
        const destinationItems = destinations.slice(0, 6).map((d: any) => ({
          _id: String(d._id),
          url: `/trips?destination=${d.slug || d._id}`,
          label: d.title || d.name || d.slug,
        }));
        const catItems = categories.slice(0, 6).map((c: any) => ({
          _id: String(c._id),
          url: `/trips?category=${c.slug || c._id}`,
          label: c.title || c.name || c.slug,
        }));
        const typeItems = travelTypes.slice(0, 5).map((t: any) => ({
          _id: String(t._id),
          url: `/trips?travel-type=${t.slug || t._id}`,
          label: t.title || t.name || t.slug,
        }));
        const cols: MegaColumn[] = [];
        if (destinationItems.length) cols.push({ title: ui.megaDestinations, items: destinationItems });
        if (catItems.length) cols.push({ title: ui.megaTripCategories, items: catItems });
        if (typeItems.length) cols.push({ title: ui.megaTravelStyles, items: typeItems });
        cols.push({
          title: ui.megaBrowseTours,
          items: [
            { url: '/trips',                label: ui.megaAllTours },
            { url: '/trips?duration=7',     label: ui.megaSevenDayTours },
            { url: '/trips?duration=14',    label: ui.megaFourteenDayTours },
            { url: '/trips?featured=true',  label: ui.megaFeaturedTours },
            { url: '/tailor-made',          label: ui.megaBookATrip },
          ],
        });
        return cols;
      }
      case '/travel-types': {
        const typeItems = travelTypes.slice(0, 6).map((t: any) => ({
          _id: String(t._id),
          url: `/travel-types/${t.slug}`,
          label: t.title || t.name || t.slug,
        }));
        const categoryItems = categories.slice(0, 6).map((c: any) => ({
          _id: String(c._id),
          url: `/categories/${c.slug}`,
          label: c.title || c.name || c.slug,
        }));
        const cols: MegaColumn[] = [];
        if (typeItems.length) cols.push({ title: ui.megaTravelTypes, items: typeItems });
        if (categoryItems.length) cols.push({ title: ui.megaTravelCategories, items: categoryItems });
        cols.push({
          title: ui.megaExplore,
          items: [
            { url: '/travel-types', label: ui.megaAllTravelTypes },
            { url: '/categories', label: ui.megaAllTravelCategories },
            { url: '/trips', label: ui.megaAllTripsTours },
          ],
        });
        return cols;
      }
      case '/blogs':
        return [
          {
            title: ui.megaArticles,
            items: [
              { url: '/blogs',                    label: ui.megaAllBlogPosts },
              { url: '/blogs?category=guides',    label: ui.megaTravelGuides },
              { url: '/blogs?category=tips',      label: ui.megaTravelTips },
              { url: '/blogs?category=reviews',   label: ui.megaDestinationReviews },
            ],
          },
          {
            title: ui.megaTopics,
            items: [
              { url: '/blogs?tag=adventure',    label: ui.megaAdventure },
              { url: '/blogs?tag=culture',      label: ui.megaCulture },
              { url: '/blogs?tag=photography',  label: ui.megaPhotography },
              { url: '/blogs?tag=food',         label: ui.megaFoodDining },
            ],
          },
        ];
      default:
        return null;
    }
  }

  const hoveredColumns = hovered ? getColumns(hovered) : null;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        solidHeader
          ? 'border-b border-slate-200 bg-white/95 shadow-sm'
          : 'border-b border-white/10 bg-white/5 shadow-none'
      }`}
      onMouseLeave={() => setHovered(null)}
    >
      {/* ── Nav bar ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">

          {/* Logo */}
          <Link className="flex flex-shrink-0 items-center" href="/">
            <Image
              src={solidHeader ? logoUrl || logo2Url : logo2Url || logoUrl}
              alt={siteName || 'Skyzeg Travel'}
              width={100}
              height={30}
              className="transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav items */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {items.map((item) => {
              const cfg  = NAV_CONFIG[item.url] ?? { icon: Home };
              const Icon = cfg.icon;
              const label = navLabelByUrl[item.url] ?? item.label ?? item.url;
              const hasDrop = !!getColumns(item.url);
              const active  = hovered === item.url;

              return (
                <div
                  key={String(item._id || item.url)}
                  onMouseEnter={() => setHovered(hasDrop ? item.url : null)}
                >
                  <Link
                    href={item.url}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-md font-bold transition
                      ${active
                        ? solidHeader
                          ? 'bg-slate-100 text-[#0F172A]'
                          : 'bg-white/15 text-white'
                        : solidHeader
                          ? 'text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    {label}
                    {hasDrop && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${active ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              className="rounded-full bg-[#1C398E] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#152d73]"
              href="/tailor-made"
            >
              {ui.navBookNow}
            </Link>
            <LanguageSwitcher languages={languages} active={activeLanguage} />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`rounded-full border p-2 md:hidden transition ${
              solidHeader
                ? 'border-slate-300 text-[#334155] hover:bg-slate-100'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={ui.navToggleNavigation}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Desktop mega-panel (full-width, never overflows) ── */}
      {hoveredColumns && (
        <div
          className="absolute inset-x-0 top-full z-40 border-t border-slate-100 bg-white shadow-2xl"
          onMouseEnter={() => setHovered(hovered)}
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div
              className={`grid gap-8 ${
                hoveredColumns.length === 2
                  ? 'md:grid-cols-2'
                  : hoveredColumns.length === 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-4'
              }`}
            >
              {hoveredColumns.map((col, idx) => (
                <div key={idx}>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1C398E]">
                    {col.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {col.items.map((link) => (
                      <li key={String(link._id || link.url)}>
                        <Link
                          href={link.url}
                          onClick={() => setHovered(null)}
                          className="inline-block text-sm font-medium text-[#64748B] transition-all hover:translate-x-1 hover:text-[#1C398E]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom CTA bar */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xs font-medium text-[#64748B]">
                {ui.megaFindPerfectJourney}
              </p>
              <Link
                href={hovered ?? '/trips'}
                onClick={() => setHovered(null)}
                className="inline-flex items-center gap-2 rounded-full bg-[#1C398E] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#152d73]"
              >
                {ui.megaExploreAll} <ChevronDown size={14} className="rotate-[-90deg]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="space-y-1">
              {items.map((item) => {
                const cfg      = NAV_CONFIG[item.url] ?? { icon: Home };
                const Icon     = cfg.icon;
                const label    = navLabelByUrl[item.url] ?? item.label ?? item.url;
                const isOpen   = mobileActive === item.url;
                const columns  = getColumns(item.url);

                return (
                  <li key={String(item._id || item.url)}>
                    {columns ? (
                      <button
                        onClick={() => setMobileActive(isOpen ? null : item.url)}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[#334155] transition hover:bg-slate-100"
                      >
                        <span className="flex items-center gap-2"><Icon size={16} />{label}</span>
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#334155] transition hover:bg-slate-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon size={16} />{label}
                      </Link>
                    )}

                    {isOpen && columns && (
                      <div className="ml-4 mt-1 space-y-4 rounded-xl border-l-2 border-[#C5A880]/40 bg-[#F1F5F9] px-4 py-3">
                        {columns.map((col, idx) => (
                          <div key={idx}>
                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1C398E]">
                              {col.title}
                            </p>
                            <ul className="space-y-1">
                              {col.items.slice(0, 6).map((link) => (
                                <li key={String(link._id || link.url)}>
                                  <Link
                                    href={link.url}
                                    className="block rounded px-2 py-1 text-sm font-medium text-[#64748B] transition hover:bg-white hover:text-[#1C398E]"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
              <LanguageSwitcher languages={languages} active={activeLanguage} />
              <Link
                href="/tailor-made"
                className="block w-full rounded-full bg-[#1C398E] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#152d73]"
                onClick={() => setMobileOpen(false)}
              >
                {ui.navBookNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
