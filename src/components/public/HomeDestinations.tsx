import Image from 'next/image';
import Link from 'next/link';
import { getStrings } from '@/lib/ui-strings';
import { pickTranslation, type TranslationLike } from '@/shared/utils/localize';
import DestinationTabs from './DestinationTabs';

interface Destination {
  slug: string;
  region: string;
  heroImage?: string;
  isFeatured?: boolean;
  translations?: TranslationLike[];
}

interface Region {
  _id?: unknown;
  slug: string;
  regionName: string;
  translations?: TranslationLike[];
}

export default function HomeDestinations({ destinations, regions, languageCode }: {
  destinations: Destination[];
  regions: Region[];
  languageCode: string;
}) {
  const ui = getStrings(languageCode);
  const groups = regions.map((region) => ({
    id: region.slug,
    label: String(pickTranslation(region, languageCode)?.title || region.regionName),
    matches: [String(region._id), region.slug, region.regionName]
  }));
  // Retain destinations whose region is stored as a name rather than a region record.
  for (const destination of destinations) {
    if (destination.region && !groups.some((group) => group.matches.includes(destination.region))) {
      groups.push({ id: destination.region, label: destination.region, matches: [destination.region] });
    }
  }
  const topTen = [...destinations].sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured))).slice(0, 10);
  const tabs = [{ id: 'top-ten', label: ui.homeDestinationsTopTen }, ...groups.map(({ id, label }) => ({ id, label }))];
  const collections = [topTen, ...groups.map((group) => destinations.filter((destination) => group.matches.includes(destination.region)))];

  return (
    <section className="bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="home-destinations-title">
      <div className="mx-auto max-w-[1320px]">
        <h2 id="home-destinations-title" className="font-heading font-normal mb-10 text-center text-4xl leading-tight text-destination-ink sm:mb-12 sm:text-5xl lg:text-[68px]">
          {ui.homeDestinationsTitle}
        </h2>
        <DestinationTabs tabs={tabs} previousLabel={ui.carouselPreviousSlide} nextLabel={ui.carouselNextSlide}>
          {collections.map((collection, index) => (
            <div key={tabs[index].id}>
              {collection.length ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-9">
                  {collection.map((destination) => {
                    const title = String(pickTranslation(destination, languageCode)?.title || destination.slug);
                    return (
                      <Link key={destination.slug} href={`/destinations/${destination.slug}`} className="group overflow-hidden rounded-[18px] border border-destination-line bg-surface transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                        <div className="relative aspect-[235/173] overflow-hidden">
                          <Image src={destination.heroImage || '/images/placeholder.svg'} alt={title} fill sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 235px" className="object-cover transition duration-500 group-hover:scale-105" />
                        </div>
                        <h3 className="px-3 py-3 text-base font-medium leading-snug text-destination-ink sm:text-xl lg:text-2xl">{title}</h3>
                      </Link>
                    );
                  })}
                </div>
              ) : <p className="py-12 text-center text-subtle">{ui.contentNoContent}</p>}
            </div>
          ))}
        </DestinationTabs>
      </div>
    </section>
  );
}
