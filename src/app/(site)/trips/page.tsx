import TripFilters from '@/components/public/TripFilters';
import HeroBanner from '@/components/public/HeroBanner';
import { buildTripQuery } from '@/application/services/trip-query.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';
import { populateTripReferences } from '@/application/services/trip-query.service';

interface TripsPageProps {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
}

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default async function TripsPage({ searchParams }: TripsPageProps = {}) {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const uow = new UnitOfWork();
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const { initialFilters } = await buildTripQuery(uow, {
    search: getQueryValue(resolvedSearchParams.search),
    category: resolvedSearchParams.category,
    destination: resolvedSearchParams.destination,
    'travel-type': resolvedSearchParams['travel-type'],
    featured: resolvedSearchParams.featured,
    duration: resolvedSearchParams.duration
  });
  
  const [trips, destinations, travelTypes, categories] = await Promise.all([
    uow.trips.list({ isVisible: true }, { sort: { createdAt: -1 } }),
    uow.destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } }),
    uow.travelTypes.list({ isVisible: true }, { sort: { sortOrder: 1 } }),
    uow.categories.list({ isVisible: true }, { sort: { sortOrder: 1 } })
  ]);

  const populatedTrips = await populateTripReferences(uow, trips as any[]);

  const plainTrips = toPlain(populatedTrips);
  const plainDestinations = toPlain(destinations);
  const plainTravelTypes = toPlain(travelTypes);
  const plainCategories = toPlain(categories);
  const plainInitialFilters = toPlain(initialFilters || {});

  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{ui.tripsExplore}</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">{ui.tripsDiscover}</p>
      </HeroBanner>
      <TripFilters
        trips={plainTrips}
        languageCode={languageCode}
        destinations={plainDestinations}
        travelTypes={plainTravelTypes}
        categories={plainCategories}
        initialFilters={plainInitialFilters}
      />
    </>
  );
}
