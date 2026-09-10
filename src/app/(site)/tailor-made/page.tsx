import type { Metadata } from 'next';
import TailorMadeBookingForm from '@/components/public/TailorMadeBookingForm';
import HeroBanner from '@/components/public/HeroBanner';
import { getLanguageCode } from '@/lib/language';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { pickTranslation } from '@/shared/utils/localize';

export const metadata: Metadata = {
  title: 'Tailor-Made Trip Booking'
};

export default async function TailorMadeBookingPage() {
  const languageCode = await getLanguageCode();
  const unitOfWork = new UnitOfWork();
  const [trips, destinations] = await Promise.all([
    unitOfWork.trips.list({ isVisible: true }, { sort: { featured: -1, createdAt: -1 }, limit: 100 }),
    unitOfWork.destinations.list({ isVisible: true }, { sort: { sortOrder: 1, createdAt: -1 } })
  ]);

  const tripOptions = (trips as any[]).map((trip) => {
    const translated = pickTranslation(trip, languageCode) as { title?: string } | undefined;
    return {
      id: String(trip._id),
      title: translated?.title || trip.title || trip.name || trip.slug
    };
  });

  const destinationOptions = (destinations as any[]).map((destination) => {
    const translated = pickTranslation(destination, languageCode) as { title?: string; name?: string } | undefined;
    return {
      id: String(destination._id),
      title: translated?.title || translated?.name || destination.title || destination.name || destination.slug
    };
  });

  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Create Your Custom Trip</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">Tell us your travel goals, budget, and preferred style.</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Tailor-Made</span>
          <p className="mt-3 text-lg text-body">
            Tell us your travel goals, budget, and preferred style. We will craft a personalized itinerary and send you a curated proposal.
          </p>
          <div className="mt-6 rounded-3xl border border-line bg-white p-5 text-sm text-subtle shadow-sm">
            <p className="font-semibold text-dark">How this works</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Submit your requirements and preferred timeline.</li>
              <li>Our specialists design a custom route around your goals.</li>
              <li>Receive a personalized quote and itinerary for confirmation.</li>
            </ul>
          </div>
        </div>

        <TailorMadeBookingForm trips={tripOptions} destinations={destinationOptions} languageCode={languageCode} />
      </div>
      </section>
    </>
  );
}