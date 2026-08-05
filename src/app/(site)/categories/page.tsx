import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryCard from '@/components/public/CategoryCard';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getStrings } from '@/lib/ui-strings';
import { getLanguageCode } from '@/lib/language';

export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const categories = await new UnitOfWork().categories.list({ isVisible: true }, { sort: { sortOrder: 1, createdAt: -1 } });

  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-[2.75rem] font-bold text-[#1C398E]">{ui.categoriesTitle}</h1>
          <p className="mt-3 text-lg text-[#334155]">{ui.categoriesSubtitle}</p>
          <Link
            href="/tailor-made"
            className="mt-5 inline-flex items-center rounded-full bg-[#1C398E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152d73]"
          >
            Create Tailor-Made Trip
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(categories as any[]).map((category) => (
            <CategoryCard category={category} languageCode={languageCode} key={String(category._id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
