import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function DestinationCard({ destination, languageCode }: { destination: any; languageCode: string }) {
  const t = pickTranslation(destination, languageCode) as any;
  return (
    <div className="flex relative h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Image src={destination.heroImage || '/images/placeholder.svg'} alt={t?.title || destination.slug} width={400} height={600} className="w-full h-100 object-cover" />
      <div className="flex-1 p-2 text-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray/90 to-transparent">
        {/* <small className="absolute top-2 left-2 z-10 text-sm font-medium text-[#64748B]">{destination.country}{destination.city ? `, ${destination.city}` : ''}</small> */}
        <h4 className="text-2xl text-[#1C398E] bg-white/80 border-b-2 rounded-xl"><Link href={`/destinations/${destination.slug}`} className="transition hover:text-[#C5A880]">{t?.title || destination.slug}</Link></h4>
        {/* <p className="mt-3 text-sm leading-6 text-slate-500">{strip(t?.overview).slice(0, 140)}</p> */}
      </div>
    </div>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
