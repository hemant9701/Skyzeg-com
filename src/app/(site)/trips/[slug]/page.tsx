import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBanner from '@/components/public/HeroBanner';
import RichContent from '@/components/public/RichContent';
import TripTabs from '@/components/public/TripTabs';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { buildMetadata } from '@/shared/seo/metadata';
import { pickTranslation } from '@/shared/utils/localize';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, MapPin, Clock, DollarSign } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await new UnitOfWork().trips.findOne({ slug, isVisible: true });
  if (!trip) return {};
  const t = pickTranslation(trip as any, 'en-US') as any;
  return buildMetadata({ title: t?.metaTitle || t?.title, description: t?.metaDescription || strip(t?.summary), image: trip.heroImage });
}

export default async function TripDetailsPage({ params }: Props) {
  const { slug } = await params;
  const languageCode = await getLanguageCode();
  const trip = await new UnitOfWork().trips.findOne({ slug, isVisible: true });
  if (!trip) notFound();
  const t = pickTranslation(trip as any, languageCode) as any;
  const schema = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: t?.title, description: strip(t?.summary), image: trip.heroImage };

  const itinerary: any[] = trip.itinerary || [];
  const hasItinerary = itinerary.length > 0;
  const hasPolicies  = !!(t?.policies);
  const ui = getStrings(languageCode);

  /* ── Tab content nodes (server-rendered, passed to client TripTabs) ── */

  const overviewNode = (
    <div className="prose prose-slate max-w-none">
      <RichContent html={t?.overview || t?.summary} />
    </div>
  );

  const itineraryNode = (
    <div className="space-y-4">
      {itinerary.map((day: any) => (
        <div
          key={day.dayNumber}
          className="rounded-2xl border border-line bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {day.dayNumber}
            </span>
            <h5 className="text-lg font-semibold text-dark">{day.title}</h5>
          </div>
          <div className="mt-4 pl-12">
            <RichContent html={day.body} />
            {(day.meals || day.accommodation) && (
              <p className="mt-3 text-sm font-medium text-muted">
                {day.meals && <span>🍽 {day.meals}</span>}
                {day.meals && day.accommodation && <span className="mx-2">·</span>}
                {day.accommodation && <span>🏨 {day.accommodation}</span>}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const includesExcludesNode = (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-success-light bg-success-light/60 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-success-dark">
          <CheckCircle size={20} className="text-success" /> {ui.tripWhatsIncluded}
        </h3>
        <div className="prose prose-sm prose-emerald max-w-none">
          <RichContent html={t?.includes} />
        </div>
      </div>
      <div className="rounded-2xl border border-danger-light bg-danger-light/60 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-danger-dark">
          <XCircle size={20} className="text-danger" /> {ui.tripWhatsExcluded}
        </h3>
        <div className="prose prose-sm prose-rose max-w-none">
          <RichContent html={t?.excludes} />
        </div>
      </div>
    </div>
  );

  const policiesNode = (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <div className="prose prose-slate max-w-none">
        <RichContent html={t?.policies} />
      </div>
    </div>
  );

  return (
    <>
      <HeroBanner imageSrc={trip.heroImage || '/images/heroBannerImg.webp'} minHeightClassName="min-h-[520px]">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
          {trip.durationDays && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {trip.durationDays} {ui.tripsDays}
            </span>
          )}
          {(trip.discountPrice || trip.price) && (
            <span className="flex items-center gap-1.5">
              <DollarSign size={14} /> {ui.tripsFrom} {trip.currency} {trip.discountPrice || trip.price}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{t?.title}</h1>
        {t?.summary && (
          <p className="mt-4 max-w-xl text-lg text-white/90">{strip(t.summary).slice(0, 160)}</p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/booking/${trip.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-dark transition hover:bg-accent-hover"
          >
            {ui.tripsBookThis}
          </Link>
          <Link
            href="#trip-content"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-medium text-white transition hover:bg-white/10"
          >
            {ui.tripsViewDetails}
          </Link>
        </div>
      </HeroBanner>

      {/* ── Content + Sidebar ────────────────────────────────── */}
      <section id="trip-content" className="scroll-mt-header px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,300px)] lg:gap-10">

          {/* Tabbed content */}
          <div>
            <TripTabs
              overview={overviewNode}
              itinerary={itineraryNode}
              includesExcludes={includesExcludesNode}
              policies={policiesNode}
              hasItinerary={hasItinerary}
              hasPolicies={hasPolicies}
              labels={{ overview: ui.tripTabOverview, itinerary: ui.tripTabItinerary, includes: ui.tripTabIncludes, policies: ui.tripTabPolicies }}
            />
          </div>

          {/* Booking sidebar */}
          <aside className="self-start lg:sticky site-sticky-under-header">
            {/* Price card */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-muted">{ui.tripsStartingFrom}</p>
              <p className="mt-1 text-3xl font-bold text-primary">
                {trip.currency} {trip.discountPrice || trip.price}
              </p>
              {trip.discountPrice && trip.price > trip.discountPrice && (
                <p className="mt-0.5 text-sm text-muted line-through">
                  {trip.currency} {trip.price}
                </p>
              )}
              <p className="text-xs text-muted">{ui.tripsPerPerson}</p>

              <Link
                href="/tailor-made"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
              >
                {ui.tripsBookNow}
              </Link>
              <Link
                href="/contact"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary px-5 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
              >
                {ui.tripsEnquire}
              </Link>
            </div>

            {/* Highlights */}
            {(trip.highlights || []).length > 0 && (
              <div className="mt-5 rounded-2xl border border-line bg-light p-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                  {ui.tripsHighlights}
                </h4>
                <ul className="space-y-2.5">
                  {(trip.highlights || []).map((h: string) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-body">
                      <span className="mt-0.5 flex-shrink-0 text-success">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick info */}
            <div className="mt-5 rounded-2xl border border-line bg-white p-5">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                {ui.tripsTripInfo}
              </h4>
              <dl className="space-y-2 text-sm">
                {trip.durationDays && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1.5 text-muted"><Clock size={14} /> {ui.tripsDuration}</dt>
                    <dd className="font-medium text-dark">{trip.durationDays} {ui.tripsDays}</dd>
                  </div>
                )}
                {trip.groupSize && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">{ui.tripsGroupSize}</dt>
                    <dd className="font-medium text-dark">{trip.groupSize}</dd>
                  </div>
                )}
                {trip.difficulty && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted">{ui.tripsDifficulty}</dt>
                    <dd className="font-medium text-dark capitalize">{trip.difficulty}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
function strip(value?: string) { return (value || '').replace(/<[^>]*>/g, ' '); }
