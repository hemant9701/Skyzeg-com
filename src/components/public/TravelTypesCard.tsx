import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function TravelTypesCard({ travelTypes, languageCode }: { travelTypes: any; languageCode: string }) {
  const t = pickTranslation(travelTypes, languageCode) as any;
  const title = t?.title || t?.slug;
  const description = strip(t?.overview).slice(0, 140);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <Image
          src={travelTypes.heroImage || '/images/placeholder.svg'}
          alt={title}
          width={600}
          height={400}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
        />
      </div>
      <div className="flex-1 p-4 sm:p-5">
        <h5 className="text-lg font-semibold text-[#0F172A] sm:text-xl">
          <Link href={`/travel-types/${travelTypes.slug}`} className="transition hover:text-[#C5A880]">
            {title}
          </Link>
        </h5>
        {description && <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>}
      </div>
    </article>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
