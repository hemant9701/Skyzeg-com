import ContactForm from '@/components/public/ContactForm';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage() {
  const languageCode = await getLanguageCode();
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">Contact</span>
          <h1 className="text-[2.75rem] font-bold text-[#1C398E]">Plan your next journey</h1>
          <p className="mt-3 text-lg text-[#334155]">Send an enquiry and the travel team will contact you.</p>
          <div className="mt-6 space-y-3 text-[#334155]">
            <div className="flex items-center gap-2"><Mail size={20} className="text-[#C5A880]" /> {settings?.primaryEmail}</div>
            <div className="flex items-center gap-2"><Phone size={20} className="text-[#C5A880]" /> {settings?.primaryPhone}</div>
            <div className="flex items-center gap-2"><MapPin size={20} className="text-[#C5A880]" /> {settings?.address}</div>
          </div>
        </div>
        <ContactForm languageCode={languageCode} />
      </div>
    </section>
  );
}
