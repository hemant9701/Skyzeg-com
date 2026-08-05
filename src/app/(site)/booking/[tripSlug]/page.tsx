import BookingForm from '@/components/public/BookingForm';
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
  return <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><BookingForm tripId={String(trip._id)} tripTitle={t?.title || trip.slug} languageCode={languageCode} /></div></section>;
}
