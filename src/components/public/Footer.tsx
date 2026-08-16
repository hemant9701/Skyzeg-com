import Link from 'next/link';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { pickTranslation } from '@/shared/utils/localize';

export default async function Footer() {
  const languageCode = await getLanguageCode();
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  const t = pickTranslation(settings as any, languageCode) as any;

  return (
    <footer className="bg-slate-900 pt-10 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(t?.footerColumns || []).sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((column: any) => (
            <div key={column.title}>
              <h6 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">{column.title}</h6>
              <ul className="grid gap-2 text-sm">
                {(column.links || []).map((link: any) => (
                  <li key={link.label}><Link href={link.url} className="transition hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="my-6 border-slate-700" />
        <div className="flex flex-col justify-between gap-2 pb-4 text-sm text-slate-400 sm:flex-row">
          <span>Copyright {new Date().getFullYear()} {t?.siteName || 'TravelNextMongo'}.</span>
          <span>{settings?.primaryEmail} &nbsp; {settings?.primaryPhone}</span>
        </div>
      </div>
    </footer>
  );
}
