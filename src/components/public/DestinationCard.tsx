import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function DestinationCard({ destination, languageCode }: { destination: any; languageCode: string }) {
  const t = pickTranslation(destination, languageCode) as any;
  const title = t?.title || destination.slug;

  return (
    <article className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-dark shadow-sm ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[300px]">
      <Image
        src={destination.heroImage || '/images/placeholder.svg'}
        alt={title}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <h4 className="rounded-xl border border-white/20 bg-white/80 px-3 py-2 text-lg font-semibold text-primary backdrop-blur-sm sm:text-xl">
          <Link href={`/destinations/${destination.slug}`} className="block transition hover:text-accent">
            {title}
          </Link>
        </h4>
      </div>
    </article>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
