import TripFilters from '@/components/public/TripFilters';
import HeroBanner from '@/components/public/HeroBanner';
import { buildTripQuery } from '@/application/services/trip-query.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';

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

  // Populate references for better filtering
  const populatedTrips = (trips as any[]).map(trip => ({
    ...trip.toObject?.() || trip,
    destination: trip.destination?._id ? trip.destination : destinations.find(d => String(d._id) === String(trip.destination)),
    travelTypes: Array.isArray(trip.travelTypes) 
      ? trip.travelTypes.map((tt: any) => {
          if (typeof tt === 'string' || (tt._id && typeof tt !== 'object')) {
            return travelTypes.find(t => String(t._id) === String(tt._id || tt));
          }
          return tt;
        })
      : [],
    categories: Array.isArray(trip.categories)
      ? trip.categories.map((c: any) => {
          if (typeof c === 'string' || (c._id && typeof c !== 'object')) {
            return categories.find(cat => String(cat._id) === String(c._id || c));
          }
          return c;
        })
      : []
  }));

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
