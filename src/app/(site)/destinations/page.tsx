import DestinationCard from '@/components/public/DestinationCard';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';

export default async function DestinationsPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const destinations = await new UnitOfWork().destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } });
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-[2.75rem] font-bold text-[#1C398E]">Destinations</h1>
          <p className="mt-3 text-lg text-[#334155]">Explore countries, cities, highlights, maps and destination guides.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{(destinations as any[]).map((destination) => <DestinationCard destination={destination} languageCode={languageCode} key={String(destination._id)} />)}</div>
      </div>
    </section>
  );
}
