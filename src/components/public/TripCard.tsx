import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';
import { Calendar, DollarSign, BookOpen } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

export default function TripCard({ trip, languageCode }: { trip: any; languageCode: string }) {
  const t = pickTranslation(trip, languageCode) as any;
  const ui = getStrings(languageCode);
  const title = t?.title || trip.slug;
  const price = trip.discountPrice || trip.price;

  return (
    <article className="group relative flex min-h-[420px] overflow-hidden rounded-xl bg-dark shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:min-h-[460px]">
      <Image
        src={trip.heroImage || '/images/placeholder.svg'}
        alt={title}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" aria-hidden="true" />
      <div className="relative mt-auto w-full p-3">
        <div className="rounded-xl bg-white/90 p-3 shadow-lg backdrop-blur">
          <h4 className="text-base font-semibold leading-snug sm:text-lg">
            <Link href={`/trips/${trip.slug}`} className="transition">
              {title}
            </Link>
          </h4>
          <div className="my-3 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
            <span className="flex items-center gap-1"><Calendar size={16} /> {trip.durationDays} {ui.tripCardDays}</span>
            {price && <span className="flex items-center gap-1"><DollarSign size={16} /> {price}</span>}
          </div>
          <Link
            href={`/booking/${trip.slug}`}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            <BookOpen size={16} /> {ui.tripCardBook}
          </Link>
        </div>
      </div>
    </article>
  );
}
