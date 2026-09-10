import ContactForm from '@/components/public/ContactForm';
import HeroBanner from '@/components/public/HeroBanner';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage() {
  const languageCode = await getLanguageCode();
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Plan your next journey</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">Send an enquiry and the travel team will contact you.</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Contact</span>
            <div className="mt-6 space-y-3 text-body">
              <div className="flex items-center gap-2"><Mail size={20} className="text-accent" /> {settings?.primaryEmail}</div>
              <div className="flex items-center gap-2"><Phone size={20} className="text-accent" /> {settings?.primaryPhone}</div>
              <div className="flex items-center gap-2"><MapPin size={20} className="text-accent" /> {settings?.address}</div>
            </div>
          </div>
          <ContactForm languageCode={languageCode} />
        </div>
      </section>
    </>
  );
}
