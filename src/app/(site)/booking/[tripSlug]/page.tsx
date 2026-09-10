import BookingForm from '@/components/public/BookingForm';
import HeroBanner from '@/components/public/HeroBanner';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { pickTranslation } from '@/shared/utils/localize';
import { getLanguageCode } from '@/lib/language';
import { notFound } from 'next/navigation';

interface Props { params: Promise<{ tripSlug: string }> }

export default async function BookingPage({ params }: Props) {
  const { tripSlug } = await params;
  const languageCode = await getLanguageCode();
  const trip = await new UnitOfWork().trips.findOne({ slug: tripSlug, isVisible: true });
  if (!trip) notFound();
  const t = pickTranslation(trip as any, languageCode) as any;
  return (
    <>
      <HeroBanner imageSrc={trip.heroImage || '/images/heroBannerImg.webp'}>
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{t?.title || trip.slug}</h1>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><BookingForm tripId={String(trip._id)} tripTitle={t?.title || trip.slug} languageCode={languageCode} /></div></section>
    </>
  );
}
