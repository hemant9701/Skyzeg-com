import TravelTypesCard from '@/components/public/TravelTypesCard';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';

export default async function TravelTypesPage() {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const travelTypes = await new UnitOfWork().travelTypes.list({ isVisible: true }, { sort: { sortOrder: 1 } });
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-[2.75rem] font-bold text-[#1C398E]">Travel Types</h1>
          <p className="mt-3 text-lg text-[#334155]">Explore countries, cities, highlights, maps and destination guides.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(travelTypes as any[]).map((travelType) => <TravelTypesCard travelTypes={travelType} languageCode={languageCode} key={String(travelType._id)} />)}
        </div>
      </div>
    </section>
  );
}
