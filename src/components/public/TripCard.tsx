import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';
import { ArrowUpRight, Calendar, DollarSign, BookOpen, MapPin, Compass, Tag } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

interface TripCardProps {
  trip: any;
  languageCode: string;
  view?: 'grid' | 'list';
}

export default function TripCard({ trip, languageCode, view = 'grid' }: TripCardProps) {
  const t = pickTranslation(trip, languageCode) as any;
  const ui = getStrings(languageCode);
  const title = t?.title || trip.slug;
  const price = trip.discountPrice || trip.price;
  const destination = trip.destination && typeof trip.destination === 'object'
    ? (pickTranslation(trip.destination, languageCode) as any)?.title || trip.destination.title || trip.destination.name
    : null;
  const location = destination === title ? '' : destination;
  const getNames = (items: any[]) => items
    .map((item) => {
      if (!item || typeof item !== 'object') return '';
      const translation = pickTranslation(item, languageCode) as any;
      return translation?.title || item.title || item.name || '';
    })
    .filter(Boolean);
  const travelTypeNames = getNames(Array.isArray(trip.travelTypes) ? trip.travelTypes : []);
  const categoryNames = getNames(Array.isArray(trip.categories) ? trip.categories : []);
  const formatNames = (names: string[]) => `${names.slice(0, 2).join(' · ')}${names.length > 2 ? ` +${names.length - 2}` : ''}`;

  if (view === 'list') {
    return (
      <article className="group grid overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:shadow-lg sm:grid-cols-[minmax(220px,0.8fr)_minmax(0,1fr)]">
        <div className="self-start overflow-hidden">
          <Image
            src={trip.heroImage || '/images/placeholder.svg'}
            alt={title}
            width={800}
            height={533}
            sizes="(max-width: 640px) 100vw, 40vw"
            className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-5 p-4 sm:p-6">
          <div>
            {destination && (
              <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-muted">
                <MapPin size={16} aria-hidden="true" /> {destination}
              </p>
            )}
            <h4 className="text-xl font-semibold leading-snug text-dark sm:text-xl">
              <Link href={`/trips/${trip.slug}`} className="transition hover:text-primary">
                {title}
              </Link>
            </h4>
            {(travelTypeNames.length > 0 || categoryNames.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                {travelTypeNames.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-body"><Compass size={14} aria-hidden="true" />{formatNames(travelTypeNames)}</span>
                )}
                {categoryNames.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-body"><Tag size={14} aria-hidden="true" />{formatNames(categoryNames)}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4 text-sm font-semibold text-body">
            <span className="flex items-center gap-1.5"><Calendar size={16} aria-hidden="true" /> {trip.durationDays} {ui.tripCardDays}</span>
            {price && <span className="flex items-center gap-1.5"><DollarSign size={16} aria-hidden="true" /> {price}</span>}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
            <Link
              href={`/trips/${trip.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-4 py-2.5 text-sm font-medium text-body transition hover:bg-surface"
            >
              {ui.tripsViewDetails}
            </Link>
            <Link
              href={`/booking/${trip.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              <BookOpen size={16} aria-hidden="true" /> {ui.tripCardBook}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Image
        src={trip.heroImage || '/images/placeholder.svg'}
        alt={title}
        width={800}
        height={533}
        sizes="(max-width: 640px) 85vw, (max-width: 1280px) 45vw, 25vw"
        className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {location && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-dark shadow-sm">
          <MapPin size={14} aria-hidden="true" /> {location}
        </span>
      )}
      {trip.isFeatured && (
        <span className="absolute left-4 top-4 inline-flex rounded-md bg-white px-3 py-1.5 text-xs font-semibold uppercase text-dark shadow-sm">
          {ui.tripCardFeatured}
        </span>
      )}
      <div className="space-y-3 p-4 text-body sm:p-5">
        <h3 className="text-xl font-semibold leading-tight text-dark">
          <Link href={`/trips/${trip.slug}`}>
            {title}
          </Link>
        </h3>
        {(travelTypeNames.length > 0 || categoryNames.length > 0) && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            {travelTypeNames.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-body"><Compass size={14} aria-hidden="true" />{formatNames(travelTypeNames)}</span>
            )}
            {categoryNames.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-body"><Tag size={14} aria-hidden="true" />{formatNames(categoryNames)}</span>
            )}
          </div>
        )}
        <div className="flex flex-wrap justify-between items-center gap-x-5 gap-y-2 border-t border-line pt-3 text-sm font-medium text-body">
          <span className="flex items-center gap-1.5"><Calendar size={16} aria-hidden="true" /> {trip.durationDays} {ui.tripCardDays}</span>
          {price && <span className="flex items-center gap-1.5">{trip.currency || '$'} {price}</span>}
        </div>
        <Link
          href={`/booking/${trip.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          {ui.tripCardBook}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
