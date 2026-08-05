import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { pickTranslation } from '@/shared/utils/localize';
import NewsletterForm from './NewsletterForm';

export default async function NewsletterSection() {
  const languageCode = await getLanguageCode();
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  const t = pickTranslation(settings as any, languageCode) as any;

  return (
    <section className="bg-slate-50">
        <div
          className="relative"
          style={{
            backgroundImage: "url('/uploads/slider/myanmarbanner-1783691611896.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        <div className="mx-auto max-w-7xl">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative py-24 px-4 sm:px-6 lg:px-8 lg:py-32 flex justify-center items-center">
            <div className="max-w-xl">
              <h2
                className="mb-2 text-4xl font-semibold leading-tight text-white sm:text-5xl"
                dangerouslySetInnerHTML={{
                  __html: t?.newsletterTitle || 'Subscribe to Newsletter',
                }}
              />
              <div
                className="mb-6 text-base text-white"
                dangerouslySetInnerHTML={{
                  __html: t?.newsletterText || 'Discover destination ideas, travel promotions and planning tips directly in your inbox.',
                }}
              />
              <NewsletterForm languageCode={languageCode} variant="image-banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}