import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import HeroBanner from '@/components/public/HeroBanner';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';

interface ThankYouPageProps {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
}

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps = {}) {
  const [languageCode, params] = await Promise.all([
    getLanguageCode(),
    Promise.resolve(searchParams ?? {})
  ]);
  const ui = getStrings(languageCode);
  const requestedType = getQueryValue(params.type);
  const submissionType = requestedType === 'booking' || requestedType === 'tailor-made' || requestedType === 'contact'
    ? requestedType
    : 'contact';
  const successMessage = submissionType === 'contact' ? ui.contactSuccess : ui.bookingSuccess;
  const reference = getQueryValue(params.reference);
  const emailSent = getQueryValue(params.emailSent) !== 'false';

  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp" minHeightClassName="min-h-[500px]" contentClassName="w-full text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white">
          <CheckCircle2 size={34} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-9xl font-semibold text-white sm:text-8xl">{ui.thankYouTitle}</h1>
        <p className="mt-3 text-lg text-white/90">{successMessage}</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-full text-center">
        {reference && (
          <p className="mt-6 text-sm text-subtle">
            {ui.thankYouReference}: <span className="font-mono font-semibold text-dark">{reference}</span>
          </p>
        )}
        {!emailSent && <p className="mt-4 text-sm text-danger">{ui.emailDeliveryWarning}</p>}
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover">
          {ui.thankYouBackHome}<ArrowRight size={18} aria-hidden="true" />
        </Link>
        </div>
      </section>
    </>
  );
}