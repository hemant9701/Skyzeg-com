import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function TravelTypesCard({ travelTypes, languageCode }: { travelTypes: any; languageCode: string }) {
  const t = pickTranslation(travelTypes, languageCode) as any;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Image src={travelTypes.heroImage || '/images/placeholder.svg'} alt={t?.title || t?.slug} width={600} height={400} className="h-48 w-full object-cover" />
      <div className="flex-1 p-5">
        <h5 className="mt-1 text-lg font-semibold text-[#0F172A]"><Link href={`/travel-types/${travelTypes.slug}`} className="transition hover:text-[#C5A880]">{t?.title || t?.slug}</Link></h5>
        <p className="mt-3 text-sm leading-6 text-slate-500">{strip(t?.overview).slice(0, 140)}</p>
      </div>
    </div>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
