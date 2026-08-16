import Link from 'next/link';
import { getCurrentUserFromCookies } from '@/lib/auth';
import LogoutButton from './LogoutButton';
import { LayoutDashboard, FileText, PenTool, MapPin, Compass, Plane, Tag, Calendar, Image as ImageIcon, Film, MessageSquare, HelpCircle, Menu, Settings, Users } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Blogs', href: '/admin/blogs', icon: PenTool },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Travel Types', href: '/admin/travel-types', icon: Compass },
  { label: 'Trips', href: '/admin/trips', icon: Plane },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Hero Slider', href: '/admin/hero-sliders', icon: Film },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQ', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Menus', href: '/admin/menus', icon: Menu },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Users', href: '/admin/users', icon: Users }
];

export default async function AdminShell({children}:{children:React.ReactNode}){
  const user=await getCurrentUserFromCookies();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="border-b border-white/10 bg-slate-900/95 p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <Link href="/admin" className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1C398E]">SZ</span>
          Skyzeg Travel Admin
        </Link>
        <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link 
              href={href} 
              key={href} 
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:translate-x-0.5 hover:bg-[#1C398E]/10 hover:text-white transition"
            >
              <Icon size={18} className="text-[#C5A880] flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
          <div className="font-medium text-slate-200">{user?.fullName}</div>
          <div className="mt-1 truncate text-xs">{user?.email}</div>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
