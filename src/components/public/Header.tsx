import { LanguageService } from '@/application/services/language.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { pickTranslation } from '@/shared/utils/localize';
import MegaMenuHeader from './MegaMenuHeader';

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default async function Header() {
  const languageCode = await getLanguageCode();
  const unitOfWork = new UnitOfWork();
  const [languages, settings, menu, destinations, travelTypes, categories] = await Promise.all([
    new LanguageService().getLanguages(),
    unitOfWork.siteSettings.findOne({ key: 'main' }),
    unitOfWork.menus.findOne({ location: 'header', isVisible: true }),
    unitOfWork.destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } }).catch(() => []),
    unitOfWork.travelTypes.list({ isVisible: true }, { sort: { sortOrder: 1 } }).catch(() => []),
    unitOfWork.categories.list({ isVisible: true }, { sort: { sortOrder: 1 } }).catch(() => [])
  ]);

  const settingTranslation = pickTranslation(settings as any, languageCode) as any;
  const logoUrl = settings?.logoUrl || '/images/logo.svg';
  const menuItems = (menu?.items || [])
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
    .map((item: any) => ({
      _id: String(item._id),
      parentId: item.parentId ? String(item.parentId) : '',
      url: item.url,
      target: item.target || '_self',
      isVisible: item.isVisible !== false,
      sortOrder: Number(item.sortOrder || 0),
      label: pickTranslation(item as any, languageCode)?.label || item.url
    }));

  const processedDestinations = (destinations || []).map((d: any) => ({
    _id: String(d._id),
    slug: d.slug,
    title: pickTranslation(d as any, languageCode)?.title || d.title,
    name: pickTranslation(d as any, languageCode)?.title || d.name
  }));

  const processedTravelTypes = (travelTypes || []).map((t: any) => ({
    _id: String(t._id),
    slug: t.slug,
    title: pickTranslation(t as any, languageCode)?.title || t.title,
    name: pickTranslation(t as any, languageCode)?.title || t.name
  }));

  const processedCategories = (categories || []).map((c: any) => ({
    _id: String(c._id),
    slug: c.slug,
    title: pickTranslation(c as any, languageCode)?.title || c.title,
    name:  pickTranslation(c as any, languageCode)?.title || c.name
  }));

  return (
    <MegaMenuHeader
      logoUrl={logoUrl}
      siteName={settingTranslation?.siteName || 'TravelNext'}
      menuItems={toPlain(menuItems)}
      languages={toPlain(languages)}
      activeLanguage={languageCode}
      destinations={toPlain(processedDestinations)}
      travelTypes={toPlain(processedTravelTypes)}
      categories={toPlain(processedCategories)}
    />
  );
}
