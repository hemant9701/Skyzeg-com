'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, PenTool, MapPin, Map, Landmark, Compass, Plane, Tag, Calendar, Image, Film, MessageSquare, HelpCircle, Menu, Settings, Users, PanelLeftClose, PanelLeftOpen, X, ExternalLink, ChevronRight } from 'lucide-react';
import LogoutButton from './LogoutButton';

const icons = { dashboard: LayoutDashboard, pages: FileText, blogs: PenTool, destinations: MapPin, regions: Map, places: Landmark, types: Compass, trips: Plane, categories: Tag, bookings: Calendar, media: Image, sliders: Film, testimonials: MessageSquare, faqs: HelpCircle, menus: Menu, settings: Settings, users: Users };
export type AdminNavigationItem = { label: string; href: string; icon: keyof typeof icons; group: string };

export default function AdminPanel({ children, items, fullName, email }: { children: React.ReactNode; items: AdminNavigationItem[]; fullName: string; email: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const current = items.find(item => item.href === pathname || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`)));
  const groups = [...new Set(items.map(item => item.group))];
  return (
    <div className={`min-h-screen bg-admin-canvas text-slate-100 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'} transition-[padding] duration-200`}>
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-admin-accent focus:p-3 focus:text-admin-canvas">Skip to content</a>
      {mobileOpen && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside id="admin-navigation" aria-label="Admin sidebar" className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-admin-line bg-admin-panel transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${collapsed ? 'lg:w-20' : ''}`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-admin-line px-5">
          <Link href="/admin" aria-label="Skyzeg admin dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 font-bold tracking-tight"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-admin-accent text-sm text-admin-canvas">SZ</span><span className={collapsed ? 'lg:hidden' : ''}>Skyzeg <span className="font-normal text-admin-muted">CMS</span></span></Link>
          <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-admin-muted lg:hidden"><X size={20} /></button>
        </div>
        <nav aria-label="Admin navigation" className="flex-1 space-y-5 overflow-y-auto p-3">
          {groups.map(group => <div key={group}>
            {group && <h2 className={`mb-2 px-3 text-xs font-semibold text-admin-muted ${collapsed ? 'lg:sr-only' : ''}`}>{group}</h2>}
            <div className="space-y-1">{items.filter(item => item.group === group).map(({ label, href, icon }) => {
              const Icon = icons[icon];
              const active = href === '/admin' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
              return <Link key={href} href={href} title={collapsed ? label : undefined} aria-current={active ? 'page' : undefined} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin-accent ${active ? 'bg-admin-accent/10 text-admin-accent' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon size={20} className="shrink-0" /><span className={collapsed ? 'lg:sr-only' : ''}>{label}</span></Link>;
            })}</div>
          </div>)}
        </nav>
        <div className={`border-t border-admin-line p-4 ${collapsed ? 'lg:hidden' : ''}`}><p className="truncate text-sm font-medium">{fullName}</p><p className="mt-1 truncate text-xs text-admin-muted">{email}</p><div className="mt-3"><LogoutButton /></div></div>
      </aside>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-admin-line bg-admin-panel px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <button type="button" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="admin-navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-admin-muted hover:bg-white/5 lg:hidden"><Menu size={21} /></button>
          <button type="button" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed} aria-controls="admin-navigation" onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-2 text-admin-muted hover:bg-white/5 lg:block">{collapsed ? <PanelLeftOpen size={21} /> : <PanelLeftClose size={21} />}</button>
          <div className="flex min-w-0 items-center gap-2 text-sm text-admin-muted"><span className="hidden sm:inline">Admin</span><ChevronRight size={14} className="hidden sm:block" /><span className="truncate text-slate-200">{current?.label || 'Dashboard'}</span></div>
        </div>
        <div className="flex items-center gap-4"><Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-admin-muted hover:text-admin-accent"><span className="hidden sm:inline">View website</span><ExternalLink size={17} /></Link><span title={fullName} aria-label={fullName} className="grid h-9 w-9 place-items-center rounded-full bg-admin-accent/15 text-sm font-semibold text-admin-accent">{fullName.slice(0, 1).toUpperCase()}</span></div>
      </header>
      <main id="admin-content" className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
