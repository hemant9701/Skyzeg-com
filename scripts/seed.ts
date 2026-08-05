import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import { connectToDatabase } from '../src/infrastructure/db/mongoose';
import {
  BlogModel,
  CategoryModel,
  DestinationModel,
  FAQModel,
  HeroSliderModel,
  MenuModel,
  PageModel,
  RoleModel,
  SiteSettingModel,
  TestimonialModel,
  TripModel,
  UserModel,
  TravelTypeModel
} from '../src/infrastructure/models';
import { Roles } from '../src/domain/constants/roles';

function resolveDataFile(): string {
  const candidates = [
    process.env.TRAVEL_DATA_JSON_PATH,
    path.join(process.cwd(), 'data', 'travel-data.json'),
    path.join(path.resolve(process.cwd(), '..'), 'TravelDotnetMvc_WYSIWYG_Collaborative', 'TravelDotnetMvc', 'Data', 'travel-data.json')
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error('Unable to locate travel-data.json. Set TRAVEL_DATA_JSON_PATH to the source JSON file.');
}

function listLanguages(sourceData: any) {
  return (sourceData.languages || [])
    .filter((language: any) => language.isVisible !== false)
    .map((language: any) => ({ code: language.code, name: language.name || language.nativeName || language.code }));
}

function buildTranslationRecords(languages: Array<{ code: string }>, sourceTranslations: Record<string, any> | undefined, fields: Record<string, string>) {
  return languages.map((language) => {
    const translation = sourceTranslations?.[language.code] || {};
    const record: Record<string, unknown> = { languageCode: language.code };

    for (const [targetField, sourceField] of Object.entries(fields)) {
      record[targetField] = (translation as Record<string, unknown>)[sourceField] ?? (translation as Record<string, unknown>)[targetField] ?? '';
    }

    return record;
  });
}

function toHtmlList(values: Array<string | undefined> | undefined) {
  const items = (values || []).filter(Boolean) as string[];
  if (!items.length) return '';
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function safeJsonParse(value: unknown) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function main() {
  const dataFile = resolveDataFile();
  const sourceData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const languages = listLanguages(sourceData);
  const languageCodes = languages.map((language: { code: string }) => language.code);

  await connectToDatabase();

  for (const role of Object.values(Roles)) {
    await RoleModel.updateOne({ name: role }, { $setOnInsert: { name: role, description: `${role} role` } }, { upsert: true });
  }

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@travel.local';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';
  const passwordHash = await bcrypt.hash(password, 12);
  await UserModel.updateOne(
    { email },
    { $setOnInsert: { fullName: 'System Administrator', email, passwordHash, roles: [Roles.Admin], isActive: true } },
    { upsert: true }
  );

  const settings = sourceData.settings || {};
  await SiteSettingModel.updateOne(
    { key: 'main' },
    {
      $set: {
        key: 'main',
        logoUrl: settings.logoUrl || '/images/logo.svg',
        faviconUrl: settings.faviconUrl || '/icon.svg',
        primaryEmail: settings.contactEmail || '',
        primaryPhone: settings.whatsAppNumber || '',
        address: '',
        defaultCurrency: settings.currencyCode || 'USD',
        defaultLanguageCode: settings.defaultLanguageCode || languageCodes[0] || 'en-US',
        bookingEnabled: settings.acceptBookings !== false,
        socialLinks: [
          { platform: 'Facebook', url: settings.facebookUrl || 'https://facebook.com', icon: 'bi-facebook' },
          { platform: 'Instagram', url: settings.instagramUrl || 'https://instagram.com', icon: 'bi-instagram' },
          { platform: 'LinkedIn', url: settings.linkedInUrl || 'https://linkedin.com', icon: 'bi-linkedin' },
          { platform: 'X', url: settings.twitterUrl || 'https://x.com', icon: 'bi-twitter' }
        ].filter((link) => Boolean(link.url)),
        footerColumns: (settings.footerColumns || [])
          .filter((column: any) => column.isVisible !== false)
          .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .map((column: any) => ({
            title: column.title,
            sortOrder: column.sortOrder || 0,
            links: (column.links || [])
              .filter((link: any) => link.url)
              .map((link: any) => ({ label: link.text || link.label || link.url, url: link.url }))
          })),
        translations: buildTranslationRecords(languages, settings.translations, {
          siteName: 'brandName',
          tagline: 'heroSubtitle',
          footerText: 'footerText',
          newsletterTitle: 'newsletterTitle',
          newsletterText: 'newsletterText',
          whyChooseUsTitle: 'heroTitle',
          whyChooseUsBody: 'heroSubtitle'
        }).map((translation) => ({
          ...translation,
          siteName: (translation as any).siteName || settings.brandName || 'SkyZeg',
          tagline: (translation as any).tagline || settings.heroSubtitle || '',
          footerText: (translation as any).footerText || settings.footerText || '',
          newsletterTitle: (translation as any).newsletterTitle || settings.newsletterTitle || '',
          newsletterText: (translation as any).newsletterText || settings.newsletterText || '',
          whyChooseUsTitle: (translation as any).whyChooseUsTitle || settings.heroTitle || '',
          whyChooseUsBody: (translation as any).whyChooseUsBody || settings.heroSubtitle || ''
        }))
      }
    },
    { upsert: true }
  );

  const navItems = [
    { url: '/', label: 'Home', sortOrder: 0 },
    { url: '/destinations', label: 'Destinations', sortOrder: 1 },
    { url: '/trips', label: 'Trips', sortOrder: 2 },
    { url: '/blogs', label: 'Blogs', sortOrder: 3 },
    ...((sourceData.pages || []) as any[])
      .filter((page) => page.showInNavigation && page.isVisible !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map((page) => ({ url: `/pages/${page.slug}`, label: page.title, sortOrder: 100 + (page.sortOrder || 0) }))
  ];

  await MenuModel.updateOne(
    { key: 'main-header' },
    {
      $set: {
        key: 'main-header',
        location: 'header',
        isVisible: true,
        items: navItems.map((item, index) => ({
          url: item.url,
          target: '_self',
          sortOrder: index + 1,
          isVisible: true,
          translations: languageCodes.map((languageCode: string) => ({ languageCode, label: item.label }))
        }))
      }
    },
    { upsert: true }
  );

  const categoryLookup = new Map<number, string>();
  for (const category of sourceData.categories || []) {
    const slug = category.slug || slugify(category.name || category.title || 'category', { lower: true, strict: true });
    const record = {
      slug,
      type: 'trip',
      image: category.imageUrl || '',
      sortOrder: category.sortOrder || 0,
      isVisible: category.isVisible !== false,
      translations: buildTranslationRecords(languages, category.translations, {
        title: 'name',
        description: 'description'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || category.name || category.title || slug,
        description: (translation as any).description || category.description || ''
      }))
    };

    await CategoryModel.updateOne({ slug }, { $set: record }, { upsert: true });
    const created = await CategoryModel.findOne({ slug });
    if (created) categoryLookup.set(category.id, created._id.toString());
  }

  for (const travelType of sourceData.travelTypes || []) {
    const slug = travelType.slug || slugify(travelType.name || travelType.title || 'travel-type', { lower: true, strict: true });
    const record = {
      slug,
      type: 'trip',
      image: travelType.imageUrl || '',
      sortOrder: travelType.sortOrder || 0,
      isVisible: travelType.isVisible !== false,
      translations: buildTranslationRecords(languages, travelType.translations, {
        title: 'name',
        description: 'description'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || travelType.name || travelType.title || slug,
        description: (translation as any).description || ''
      }))
    };

    await TravelTypeModel.updateOne({ slug }, { $set: record }, { upsert: true });
    const created = await TravelTypeModel.findOne({ slug });
    if (created) categoryLookup.set(travelType.id, created._id.toString());
  }

  const destinationLookup = new Map<number, string>();
  for (const destination of sourceData.destinations || []) {
    const slug = destination.slug || slugify(destination.name || destination.title || 'destination', { lower: true, strict: true });
    const record = {
      slug,
      country: destination.country || destination.region || '',
      city: destination.name || destination.city || '',
      heroImage: destination.imageUrl || '/images/placeholder.svg',
      sortOrder: destination.sortOrder || 0,
      isFeatured: destination.isFeatured || false,
      isVisible: destination.isVisible !== false,
      coordinates: destination.coordinates || undefined,
      translations: buildTranslationRecords(languages, destination.translations, {
        title: 'name',
        overview: 'description',
        highlights: 'highlights',
        thingsToDo: 'description',
        travelTips: 'description',
        weather: 'bestSeason',
        metaTitle: 'name',
        metaDescription: 'description'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || destination.name || destination.title || slug,
        overview: (translation as any).overview || destination.description || '',
        highlights: (translation as any).highlights || toHtmlList(destination.highlights || []),
        thingsToDo: (translation as any).thingsToDo || destination.description || '',
        travelTips: (translation as any).travelTips || '',
        weather: (translation as any).weather || destination.bestSeason || '',
        metaTitle: (translation as any).metaTitle || destination.name || destination.title || slug,
        metaDescription: (translation as any).metaDescription || destination.description || ''
      }))
    };

    await DestinationModel.updateOne({ slug }, { $set: record }, { upsert: true });
    const created = await DestinationModel.findOne({ slug });
    if (created) destinationLookup.set(destination.id, created._id.toString());
  }

  for (const page of sourceData.pages || []) {
    const slug = page.slug || slugify(page.title || 'page', { lower: true, strict: true });
    const record = {
      slug,
      heroImage: page.heroImageUrl || '/images/placeholder.svg',
      sortOrder: page.sortOrder || 0,
      isVisible: page.isVisible !== false,
      showInNavigation: page.showInNavigation || false,
      translations: buildTranslationRecords(languages, page.translations, {
        title: 'title',
        summary: 'summary',
        body: 'body',
        metaTitle: 'metaTitle',
        metaDescription: 'summary'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || page.title || slug,
        summary: (translation as any).summary || page.summary || '',
        body: (translation as any).body || page.body || '',
        metaTitle: (translation as any).metaTitle || page.metaTitle || page.title || slug,
        metaDescription: (translation as any).metaDescription || page.summary || ''
      }))
    };

    await PageModel.updateOne({ slug }, { $set: record }, { upsert: true });
  }

  for (const slide of sourceData.heroSlides || []) {
    const record = {
      imageUrl: slide.imageUrl || '/images/placeholder.svg',
      buttonUrl: slide.buttonUrl || '/trips',
      sortOrder: slide.sortOrder || 0,
      isVisible: slide.isVisible !== false,
      translations: buildTranslationRecords(languages, slide.translations, {
        title: 'title',
        subtitle: 'subtitle',
        buttonText: 'buttonText'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || slide.title || '',
        subtitle: (translation as any).subtitle || slide.subtitle || '',
        buttonText: (translation as any).buttonText || slide.buttonText || 'Explore' 
      }))
    };

    await HeroSliderModel.updateOne({ buttonUrl: record.buttonUrl }, { $set: record }, { upsert: true });
  }

  for (const trip of sourceData.trips || []) {
    const slug = trip.slug || slugify(trip.title || 'trip', { lower: true, strict: true });
    const destinationId = trip.destinationId ? destinationLookup.get(trip.destinationId) : undefined;
    const categoryIds = (trip.categoryIds || [])
      .map((categoryId: number) => categoryLookup.get(categoryId))
      .filter(Boolean) as string[];

    if (trip.travelTypeId) {
      const travelTypeCategoryId = categoryLookup.get(trip.travelTypeId);
      if (travelTypeCategoryId) categoryIds.unshift(travelTypeCategoryId);
    }

    const itineraryItems = safeJsonParse(trip.itinerary).map((item: any, index: number) => ({
      dayNumber: index + 1,
      title: item.title || `Day ${index + 1}`,
      body: item.content || item.body || '',
      meals: '',
      accommodation: ''
    }));

    const record = {
      slug,
      destination: destinationId ? destinationId : undefined,
      categories: categoryIds,
      durationDays: trip.durationDays || 1,
      durationNights: Math.max((trip.durationDays || 1) - 1, 0),
      price: trip.priceFrom || 0,
      discountPrice: trip.priceFrom ? Math.max(Math.round((trip.priceFrom as number) * 0.9), 0) : undefined,
      currency: settings.currencyCode || 'USD',
      heroImage: trip.imageUrl || '/images/placeholder.svg',
      highlights: trip.highlights || [],
      itinerary: itineraryItems,
      isFeatured: trip.isFeatured || false,
      isVisible: trip.isVisible !== false,
      translations: buildTranslationRecords(languages, trip.translations, {
        title: 'title',
        summary: 'shortDescription',
        overview: 'description',
        includes: 'inclusions',
        excludes: 'exclusions',
        policies: 'policies',
        metaTitle: 'title',
        metaDescription: 'shortDescription'
      }).map((translation) => ({
        ...translation,
        title: (translation as any).title || trip.title || slug,
        summary: (translation as any).summary || trip.shortDescription || '',
        overview: (translation as any).overview || trip.description || '',
        includes: (translation as any).includes ? toHtmlList((translation as any).includes) : toHtmlList(trip.inclusions || []),
        excludes: (translation as any).excludes || '',
        policies: (translation as any).policies || `Best months: ${(trip.departureMonths || []).join(', ') || 'Flexible'}`,
        metaTitle: (translation as any).metaTitle || trip.title || slug,
        metaDescription: (translation as any).metaDescription || trip.shortDescription || ''
      }))
    };

    await TripModel.updateOne({ slug }, { $set: record }, { upsert: true });
  }

  await BlogModel.updateOne(
    { slug: 'travel-insights' },
    {
      $set: {
        slug: 'travel-insights',
        categories: [],
        tags: ['travel'],
        featuredImage: '/images/placeholder.svg',
        author: 'Travel Team',
        publishDate: new Date(),
        status: 'published',
        commentsEnabled: true,
        translations: languages.map((language: { code: string }) => ({
          languageCode: language.code,
          title: 'Travel Insights',
          summary: 'Curated travel content from the data source.',
          body: '<p>Use the imported travel data records as the source of truth for content and navigation.</p>',
          metaTitle: 'Travel Insights',
          metaDescription: 'Travel insights sourced from the imported travel data.'
        }))
      }
    },
    { upsert: true }
  );

  await TestimonialModel.updateOne(
    { sortOrder: 1 },
    { $set: { imageUrl: '/images/placeholder.svg', rating: 5, sortOrder: 1, isVisible: true, translations: languages.map((language: { code: string }) => ({ languageCode: language.code, customerName: 'Ava Martin', customerLocation: 'London', quote: 'The trip was beautifully planned and the local team was excellent.' })) } },
    { upsert: true }
  );

  await FAQModel.updateOne(
    { category: 'booking', sortOrder: 1 },
    { $set: { category: 'booking', sortOrder: 1, isVisible: true, translations: languages.map((language: { code: string }) => ({ languageCode: language.code, question: 'How do I book a trip?', answer: '<p>Open a trip page and submit the booking request form. Our team will confirm details and availability.</p>' })) } },
    { upsert: true }
  );

  console.log('Seed completed from travel data');
  console.log(`Admin: ${email}`);
  console.log(`Password: ${password}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
