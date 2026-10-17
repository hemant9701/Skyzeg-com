import { LanguageService } from '@/application/services/language.service';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';
import { getStrings } from '@/lib/ui-strings';
import { pickTranslation } from '@/shared/utils/localize';
import { getCurrentUserFromCookies } from '@/lib/auth';
import { AdminRoles } from '@/domain/constants/roles';
import AccountControls from './AccountControls';
import MegaMenuHeader from './MegaMenuHeader';

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default async function Header() {
  const languageCode = await getLanguageCode();
  const user = await getCurrentUserFromCookies();
  const unitOfWork = new UnitOfWork();
  const [languages, settings, menu, destinations, regions, travelTypes, categories] = await Promise.all([
    new LanguageService().getLanguages(),
    unitOfWork.siteSettings.findOne({ key: 'main' }),
    unitOfWork.menus.findOne({ location: 'header', isVisible: true }),
    unitOfWork.destinations.list({ isVisible: true }, { sort: { sortOrder: 1 } }).catch(() => []),
    unitOfWork.regions.list({ isVisible: true }, { sort: { sortOrder: 1 } }).catch(() => []),
    unitOfWork.travelTypes.list({ isVisible: true }, { sort: { sortOrder: 1 }, limit: 6 }).catch(() => []),
    unitOfWork.categories.list({ isVisible: true }, { sort: { sortOrder: 1 }, limit: 6 }).catch(() => [])
  ]);

  const settingTranslation = pickTranslation(settings as any, languageCode) as any;
  const logoUrl = settings?.logoUrl || '/images/logo.svg';
  const logo2Url = settings?.logo2Url || '/images/logo.svg';
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
    title: pickTranslation(d as any, languageCode)?.title || d.title || d.slug,
    name: pickTranslation(d as any, languageCode)?.title || d.name || d.slug,
    region: d.region || '',
    heroImage: d.heroImage || '/images/placeholder.svg'
  }));

  const destinationRegions = regions.map((region: any) => ({
    id: String(region._id),
    label: String(pickTranslation(region, languageCode)?.title || region.regionName || region.slug),
    matches: [String(region._id), region.slug, region.regionName],
    destinations: processedDestinations.filter((destination) =>
      [String(region._id), region.slug, region.regionName].includes(destination.region)
    )
  }));
  for (const destination of processedDestinations) {
    if (destination.region && !destinationRegions.some((region) => region.matches.includes(destination.region))) {
      destinationRegions.push({
        id: destination.region,
        label: destination.region,
        matches: [destination.region],
        destinations: processedDestinations.filter((item) => item.region === destination.region)
      });
    }
  }
  if (processedDestinations.length) {
    destinationRegions.unshift({
      id: 'all-destinations',
      label: getStrings(languageCode).megaAllDestinations,
      matches: [],
      destinations: processedDestinations
    });
  }

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
      accountControls={<AccountControls user={user ? { fullName: user.fullName, email: user.email, roles: user.roles } : null} staff={!!user?.roles.some(role => AdminRoles.some(allowed => allowed === role))} language={languageCode} />}
      logoUrl={logoUrl}
      logo2Url={logo2Url}
      siteName={settingTranslation?.siteName || 'Skyzeg Travel'}
      menuItems={toPlain(menuItems)}
      languages={toPlain(languages)}
      activeLanguage={languageCode}
      destinations={toPlain(processedDestinations)}
      destinationRegions={toPlain(destinationRegions.map(({ id, label, destinations }) => ({ id, label, destinations })))}
      travelTypes={toPlain(processedTravelTypes)}
      categories={toPlain(processedCategories)}
    />
  );
}
