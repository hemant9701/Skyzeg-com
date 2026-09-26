import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { pickTranslation } from '@/shared/utils/localize';
import { getStrings } from '@/lib/ui-strings';

export default function DestinationCard({ destination, languageCode }: { destination: any; languageCode: string }) {
  const t = pickTranslation(destination, languageCode) as any;
  const ui = getStrings(languageCode);
  const title = t?.title || destination.slug;
  const locationText = [destination.city, destination.country]
    .filter((value, index, values) => value && values.indexOf(value) === index)
    .join(', ');
  const location = locationText === title ? '' : locationText;

  return (
    <article className="group relative aspect-[5/7] min-h-[360px] overflow-hidden rounded-xl bg-dark shadow-sm ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[400px]">
      <Image
        src={destination.heroImage || '/images/placeholder.svg'}
        alt={title}
        fill
        sizes="(max-width: 640px) 85vw, (max-width: 1280px) 45vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" aria-hidden="true" />
      {destination.isFeatured && (
        <span className="absolute left-4 top-4 z-10 rounded-md bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-dark shadow-sm sm:left-5 sm:top-5">
          {ui.destinationCardFeatured}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-6">
        {location && (
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-white/85">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {location}
          </p>
        )}
        <h3 className="text-3xl leading-tight text-white sm:text-4xl">
          <Link href={`/destinations/${destination.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        <Link
          href={`/destinations/${destination.slug}`}
          className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-dark transition-colors hover:bg-surface"
        >
          {ui.destinationCardExplore} {title}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
