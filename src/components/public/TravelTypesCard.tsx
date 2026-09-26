import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { pickTranslation } from '@/shared/utils/localize';
import { getStrings } from '@/lib/ui-strings';

export default function TravelTypesCard({ travelTypes, languageCode }: { travelTypes: any; languageCode: string }) {
  const t = pickTranslation(travelTypes, languageCode) as any;
  const ui = getStrings(languageCode);
  const title = t?.title || t?.slug;
  const description = strip(t?.overview).slice(0, 140);

  return (
    <article className="group relative aspect-[5/7] min-h-[360px] overflow-hidden rounded-xl bg-dark shadow-sm ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[400px]">
      <Image
        src={travelTypes.heroImage || '/images/placeholder.svg'}
        alt={title}
        fill
        sizes="(max-width: 640px) 85vw, (max-width: 1280px) 45vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" aria-hidden="true" />
      {travelTypes.isFeatured && (
        <span className="absolute left-4 top-4 z-10 rounded-md bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-dark shadow-sm sm:left-5 sm:top-5">
          {ui.destinationCardFeatured}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-6">
        <h3 className="text-2xl leading-tight text-white sm:text-4xl">
          <Link href={`/travel-types/${travelTypes.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        <Link
          href={`/travel-types/${travelTypes.slug}`}
          className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-dark transition-colors hover:bg-surface"
        >
          {ui.tripsViewDetails}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
