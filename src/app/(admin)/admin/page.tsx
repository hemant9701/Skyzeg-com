import Link from 'next/link';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';

export default async function AdminDashboardPage() {
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

  const stats = [
    ['Pages', pages, 'bi-file-earmark-text', '/admin/pages'],
    ['Blogs', blogs, 'bi-journal-richtext', '/admin/blogs'],
    ['Destinations', destinations, 'bi-geo-alt', '/admin/destinations'],
    ['Trips', trips, 'bi-suitcase2', '/admin/trips'],
    ['Bookings', bookings, 'bi-calendar-check', '/admin/bookings'],
    ['Media Files', media, 'bi-images', '/admin/media']
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-semibold text-white">Dashboard</h1><p className="mt-1 text-sm text-slate-400">Travel & Tour CMS overview</p></div><Link href="/" className="inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800" target="_blank">View Website</Link></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, icon, href]) => (
          <Link href={String(href)} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800" key={String(label)}><i className={`bi ${icon} text-3xl text-[#C5A880]`} /><div className="mt-4 text-3xl font-semibold">{String(value)}</div><div className="mt-1 text-sm text-slate-400">{label}</div></Link>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5"><h2 className="text-lg font-semibold text-white">Next.js + MongoDB Architecture</h2><p className="mt-2 text-sm text-slate-400">The admin panel uses protected API route handlers, Mongoose repositories, TinyMCE, media upload processing and audit logging.</p></div>
    </>
  );
}
