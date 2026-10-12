import Link from 'next/link';
import { FileText, BookOpen, MapPin, Plane, CalendarCheck, Images, ArrowUpRight, CircleUserRound } from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';
import { Roles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getCurrentUserFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const user = await getCurrentUserFromCookies();
  const isContentManager = Boolean(user?.roles.includes(Roles.ContentManager)
    && !user.roles.includes(Roles.Admin)
    && !user.roles.includes(Roles.Editor));
  const uow = new UnitOfWork();
  await uow.connect();
  const [pages, blogs, destinations, trips, bookings, media] = await Promise.all([
    uow.pages.rawModel.countDocuments(),
    uow.blogs.rawModel.countDocuments(),
    uow.destinations.rawModel.countDocuments(),
    uow.trips.rawModel.countDocuments(),
    uow.bookings.rawModel.countDocuments(),
    uow.mediaFiles.rawModel.countDocuments()
  ]);

  const allStats = [
    ['Pages', pages, FileText, '/admin/pages'],
    ['Blogs', blogs, BookOpen, '/admin/blogs'],
    ['Destinations', destinations, MapPin, '/admin/destinations'],
    ['Trips', trips, Plane, '/admin/trips'],
    ['Bookings', bookings, CalendarCheck, '/admin/bookings'],
    ['Media Files', media, Images, '/admin/media']
  ] as const;
  const stats = isContentManager ? allStats.slice(0, 4) : allStats;

  return (
    <>
      <div className="mb-6"><h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1><p className="mt-2 text-sm text-admin-muted">An overview of your travel website.</p></div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-admin-line bg-admin-panel p-6 shadow-sm">
        <div className="flex items-center gap-4"><CircleUserRound size={40} className="text-admin-muted" /><div><p className="text-sm text-admin-muted">Welcome back</p><h2 className="mt-1 text-lg font-semibold">{user?.fullName || 'Admin'}</h2></div></div>
        <div className="min-w-28"><LogoutButton /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, Icon, href]) => (
          <Link href={href} className="group rounded-xl border border-admin-line bg-admin-panel p-6 shadow-sm transition hover:border-admin-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin-accent" key={label}>
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-admin-muted">{label}</span><Icon size={20} className="text-admin-muted" /></div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-admin-accent">Manage {label.toLowerCase()}<ArrowUpRight size={15} /></div>
          </Link>
        ))}
      </div>
      <section className="mt-6 rounded-xl border border-admin-line bg-admin-panel p-6"><h2 className="text-lg font-semibold text-white">Quick actions</h2><p className="mt-1 text-sm text-admin-muted">Keep your website content up to date.</p><div className="mt-4 flex flex-wrap gap-3"><Link href="/admin/trips" className="rounded-lg bg-admin-accent px-4 py-2 text-sm font-semibold text-admin-canvas hover:bg-admin-accent/90">Manage trips</Link><Link href="/admin/pages" className="rounded-lg border border-admin-line px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5">Edit pages</Link><Link href="/admin/blogs" className="rounded-lg border border-admin-line px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5">Manage blogs</Link></div></section>
    </>
  );
}
