import type { Metadata } from 'next';
import HeroBanner from '@/components/public/HeroBanner';
import RichContent from '@/components/public/RichContent';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { buildMetadata } from '@/shared/seo/metadata';
import { readingTime } from '@/shared/utils/html';
import { pickTranslation } from '@/shared/utils/localize';
import { notFound } from 'next/navigation';
import { getStrings } from '@/lib/ui-strings';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await new UnitOfWork().blogs.findOne({ slug, status: 'published' });
  if (!blog) return {};
  const t = pickTranslation(blog as any, 'en-US') as any;
  return buildMetadata({ title: t?.metaTitle || t?.title, description: t?.metaDescription || strip(t?.summary), image: blog.featuredImage });
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const languageCode = await getLanguageCode();
  const blog = await new UnitOfWork().blogs.findOne({ slug, status: 'published' });
  if (!blog) notFound();
  const t = pickTranslation(blog as any, languageCode) as any;
  const ui = getStrings(languageCode);

  return (
    <article>
      <HeroBanner imageSrc={blog.featuredImage || '/images/heroBannerImg.webp'}>
        <span className="mb-3 inline-flex rounded-full bg-warning px-4 py-1 text-sm font-semibold text-dark">
          {blog.author} · {readingTime(t?.body || '')} {ui.blogsMinRead}
        </span>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t?.title}</h1>
        <p className="mt-4 text-lg text-white/90">{t?.summary}</p>
      </HeroBanner>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RichContent html={t?.body} />
        </div>
      </section>
    </article>
  );
}
function strip(value?: string) { return (value || '').replace(/<[^>]*>/g, ' '); }
