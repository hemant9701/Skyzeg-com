import type { Metadata } from 'next';
import HeroBanner from '@/components/public/HeroBanner';
import ContentTabs from '@/components/public/ContentTabs';
import BlogCard from '@/components/public/BlogCard';
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
  const category = await new UnitOfWork().categories.findOne({ slug, isVisible: true });
  if (!category) return {};
  const t = pickTranslation(category as any, 'en-US') as any;
  return buildMetadata({ title: t?.metaTitle || t?.title, description: t?.metaDescription || strip(t?.overview || t?.description), image: category.image });
}

export default async function CategoryDetailsPage({ params }: Props) {
  const { slug } = await params;
  const languageCode = await getLanguageCode();
  const uow = new UnitOfWork();
  const category = await uow.categories.findOne({ slug, isVisible: true });
  if (!category) notFound();
  const trips = await uow.trips.list({ categories: (category as any)._id, isVisible: true }, { sort: { createdAt: -1 } });
  const blogs = await uow.blogs.list({ categories: (category as any)._id, status: 'published' }, { sort: { publishDate: -1 } });
  const t = pickTranslation(category as any, languageCode) as any;
  const ui = getStrings(languageCode);
  const fallbackContent =
    t?.overview ||
    t?.description ||
    (category as any)?.overview ||
    (category as any)?.description ||
    '';

  const highlightsContent = t?.highlights || (category as any)?.highlights || fallbackContent;
  const thingsToDoContent = t?.thingsToDo || t?.things_todo || (category as any)?.thingsToDo || fallbackContent;
  const travelTipsContent = t?.travelTips || t?.travel_tips || (category as any)?.travelTips || fallbackContent;

  return (
    <>
      <HeroBanner imageSrc={(category as any).image || '/images/placeholder.svg'}>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t?.title}</h1>
      </HeroBanner>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <ContentTabs
            overview={t?.overview || fallbackContent}
            highlights={highlightsContent}
            thingsToDo={thingsToDoContent}
            travelTips={travelTipsContent}
            labels={{
              overview: ui.categoriesOverview,
              highlights: ui.categoriesHighlights,
              thingsToDo: ui.categoriesThingsToDo,
              travelTips: ui.categoriesTravelTips,
              emptyMessage: ui.contentNoContent
            }}
          />
        </div>
      </section>

      {/* Trips in this category */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-[#1C398E]">{ui.categoriesTripsIn} {t?.title}</h2>
          {(trips as any[]).length === 0 ? (
            <p className="mt-6 text-slate-500">{ui.categoriesNoTrips}</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
              {(trips as any[]).map((trip) => (
                <TripCard trip={trip} languageCode={languageCode} key={String(trip._id)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-[#1C398E]">{ui.categoriesBlogsIn} {t?.title}</h2>
          {(blogs as any[]).length === 0 ? (
            <p className="mt-6 text-slate-500">{ui.categoriesNoBlogs}</p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3 xl:grid-cols-4">
              {(blogs as any[]).map((blog) => (
                <BlogCard blog={blog} languageCode={languageCode} key={String(blog._id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
