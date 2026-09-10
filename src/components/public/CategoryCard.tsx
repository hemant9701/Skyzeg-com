import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function CategoryCard({ category, languageCode }: { category: any; languageCode: string }) {
  const t = pickTranslation(category, languageCode) as any;
  const title = t?.title || category.slug;
  const description = strip(t?.overview || t?.description).slice(0, 140);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <Image
          src={category.image || '/images/placeholder.svg'}
          alt={title}
          width={600}
          height={400}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
        />
      </div>
      <div className="flex-1 p-4 sm:p-5">
        <h5 className="text-lg font-semibold text-dark sm:text-xl">
          <Link href={`/categories/${category.slug}`} className="transition hover:text-accent">
            {title}
          </Link>
        </h5>
        {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
      </div>
    </article>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
