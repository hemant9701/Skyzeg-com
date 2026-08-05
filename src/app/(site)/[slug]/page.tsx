import type { Metadata } from 'next';
import HeroBanner from '@/components/public/HeroBanner';
import RichContent from '@/components/public/RichContent';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { buildMetadata } from '@/shared/seo/metadata';
import { pickTranslation } from '@/shared/utils/localize';
import { notFound } from 'next/navigation';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await new UnitOfWork().pages.findOne({ slug, isVisible: true });
  if (!page) return {};
  const t = pickTranslation(page as any, 'en-US') as any;
  return buildMetadata({ title: t?.metaTitle || t?.title, description: t?.metaDescription || strip(t?.summary), image: page.heroImage });
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const languageCode = await getLanguageCode();
  const page = await new UnitOfWork().pages.findOne({ slug, isVisible: true });
  if (!page) notFound();
  const t = pickTranslation(page as any, languageCode) as any;

  return (
    <>
      <HeroBanner imageSrc={page.heroImage || '/images/placeholder.svg'}>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t?.title}</h1>
        <p className="mt-4 text-lg text-white/90">{t?.summary}</p>
      </HeroBanner>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RichContent html={t?.body} />
        </div>
      </section>
    </>
  );
}
function strip(value?: string) { return (value || '').replace(/<[^>]*>/g, ' '); }