import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryCard from '@/components/public/CategoryCard';
import HeroBanner from '@/components/public/HeroBanner';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getStrings } from '@/lib/ui-strings';
import { getLanguageCode } from '@/lib/language';

//export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const categories = await new UnitOfWork().categories.list({ isVisible: true }, { sort: { sortOrder: 1, createdAt: -1 } });

  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{ui.categoriesTitle}</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">{ui.categoriesSubtitle}</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <Link
              href="/tailor-made"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              {ui.tailorMadeRequestButton}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(categories as any[]).map((category) => (
              <CategoryCard category={category} languageCode={languageCode} key={String(category._id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
