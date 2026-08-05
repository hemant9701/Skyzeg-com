import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';
import { Calendar, DollarSign, BookOpen } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

export default function TripCard({ trip, languageCode }: { trip: any; languageCode: string }) {
  const t = pickTranslation(trip, languageCode) as any;
  const ui = getStrings(languageCode);
  return (
    <div className="flex relative h-full flex-col overflow-hidden rounded-xl shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Image src={trip.heroImage || '/images/placeholder.svg'} alt={t?.title || trip.slug} width={400} height={600} className="h-120 w-full object-cover" />
      <div className="flex-1 bg-white/80 m-2 p-2 absolute bottom-0 left-0 right-0 rounded-xl">
        <h4 className="text-lg font-semibold text-[#0F172A]"><Link href={`/trips/${trip.slug}`} className="transition hover:text-[#C5A880]">{t?.title || trip.slug}</Link></h4>
        <div className="my-3 flex items-center justify-between text-sm font-semibold text-[#0F172A]">
          <span className="flex items-center gap-1"><Calendar size={16} /> {trip.durationDays} {ui.tripCardDays}</span>
          <span className="flex items-center gap-1"><DollarSign size={16} /> {trip.discountPrice || trip.price}</span>
        </div>
        <Link href={`/booking/${trip.slug}`} className="mt-2 block text-center rounded-full bg-blue-900 py-1 text-sm text-white transition hover:bg-[#152d73] flex items-center justify-center gap-2"><BookOpen size={16} /> {ui.tripCardBook}</Link>
      </div>
    </div>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
