import DestinationCard from '@/components/public/DestinationCard';
import DestinationTabs from '@/components/public/DestinationTabs';
import HeroBanner from '@/components/public/HeroBanner';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';
import { pickTranslation } from '@/shared/utils/localize';

export default async function DestinationsPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const unitOfWork = new UnitOfWork();
  const [destinations, regions] = await Promise.all([
    unitOfWork.destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } }),
    unitOfWork.regions.list({ isVisible: true }, { sort: { sortOrder: 1 } })
  ]);
  const groups = regions.map((region) => ({
    id: String(region._id),
    label: String(pickTranslation(region, languageCode)?.title || region.regionName || region.slug),
    matches: [String(region._id), region.slug, region.regionName]
  }));
  for (const destination of destinations) {
    if (destination.region && !groups.some((group) => group.matches.includes(destination.region))) {
      groups.push({ id: destination.region, label: destination.region, matches: [destination.region] });
    }
  }
  const tabs = [{ id: 'all-destinations', label: ui.megaAllDestinations }, ...groups.map(({ id, label }) => ({ id, label }))];
  const collections = [destinations, ...groups.map((group) => destinations.filter((destination) => group.matches.includes(destination.region)))];
  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 id="destinations-title" className="font-heading font-normal text-3xl sm:text-4xl lg:text-5xl">{ui.destinationsTitle}</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">{ui.destinationsSubtitle}</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DestinationTabs tabs={tabs} labelledBy="destinations-title" previousLabel={ui.carouselPreviousSlide} nextLabel={ui.carouselNextSlide}>
            {collections.map((collection, index) => (
              <div key={tabs[index].id}>
                {collection.length ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {collection.map((destination) => <DestinationCard destination={destination} languageCode={languageCode} key={String(destination._id)} />)}
                  </div>
                ) : <p className="py-12 text-center text-muted">{ui.contentNoContent}</p>}
              </div>
            ))}
          </DestinationTabs>
        </div>
      </section>
    </>
  );
}
