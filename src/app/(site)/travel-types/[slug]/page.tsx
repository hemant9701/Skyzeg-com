import type { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from '@/components/public/HeroBanner';
import ContentTabs from '@/components/public/ContentTabs';
import RichContent from '@/components/public/RichContent';
import TripCard from '@/components/public/TripCard';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { buildMetadata } from '@/shared/seo/metadata';
import { pickTranslation } from '@/shared/utils/localize';
import { notFound } from 'next/navigation';
import { getStrings } from '@/lib/ui-strings';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const travelTypes = await new UnitOfWork().travelTypes.findOne({ slug, isVisible: true });
  if (!travelTypes) return {};
  const t = pickTranslation(travelTypes as any, 'en-US') as any;
  return buildMetadata({ title: t?.metaTitle || t?.title, description: t?.metaDescription || strip(t?.overview), image: travelTypes.heroImage });
}

export default async function TravelTypeDetailsPage({ params }: Props) {
  const { slug } = await params;
  const languageCode = await getLanguageCode();
  const uow = new UnitOfWork();
  const travelTypes = await uow.travelTypes.findOne({ slug, isVisible: true });
  if (!travelTypes) notFound();
  const trips = await uow.trips.list({ travelTypes: travelTypes._id, isVisible: true }, { sort: { createdAt: -1 } });
  const t = pickTranslation(travelTypes as any, languageCode) as any;
  const ui = getStrings(languageCode);

  return (
    <>
      <HeroBanner imageSrc={travelTypes.heroImage || '/images/heroBannerImg.webp'}>
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{t?.title}</h1>
      </HeroBanner>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div>
            <ContentTabs
              overview={t?.overview}
              highlights={t?.highlights}
              thingsToDo={t?.thingsToDo}
              travelTips={t?.travelTips}
              labels={{
                overview: ui.travelTypesOverview,
                highlights: ui.travelTypesHighlights,
                thingsToDo: ui.travelTypesThingsToDo,
                travelTips: ui.travelTypesTravelTips,
                emptyMessage: ui.contentNoContent
              }}
            />
          </div>
        </div>
      </section>

      {travelTypes.gallery?.length > 0 && (
        <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-primary">{ui.travelTypesGallery}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {travelTypes.gallery.map((image: any) => (
                <div key={image.url} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                  <Image src={image.url} alt={image.altText || t?.title} width={600} height={420} className="h-56 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-primary">{ui.travelTypesTripsIn} {t?.title}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {(trips as any[]).map((trip) => (
              <TripCard trip={trip} languageCode={languageCode} key={String(trip._id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function strip(value?: string) { return (value || '').replace(/<[^>]*>/g, ' '); }
