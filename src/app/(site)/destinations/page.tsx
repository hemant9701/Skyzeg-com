import DestinationCard from '@/components/public/DestinationCard';
import HeroBanner from '@/components/public/HeroBanner';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';

export default async function DestinationsPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const destinations = await new UnitOfWork().destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } });
  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{ui.destinationsTitle}</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">{ui.destinationsSubtitle}</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{(destinations as any[]).map((destination) => <DestinationCard destination={destination} languageCode={languageCode} key={String(destination._id)} />)}</div>
        </div>
      </section>
    </>
  );
}
