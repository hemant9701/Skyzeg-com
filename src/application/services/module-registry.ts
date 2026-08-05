import { z } from 'zod';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { ValidationError } from '@/shared/errors/app-error';
import {
  BlogUpsertSchema,
  CategoryUpsertSchema,
  DestinationUpsertSchema,
  PageUpsertSchema,
  TripUpsertSchema,
  TravelTypeUpsertSchema
} from '@/application/validators/content.validators';

const TranslationLight = z.object({
  languageCode: z.string().min(2),
  title: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  body: z.string().optional().or(z.literal('')),
  subtitle: z.string().optional().or(z.literal('')),
  buttonText: z.string().optional().or(z.literal('')),
  question: z.string().optional().or(z.literal('')),
  answer: z.string().optional().or(z.literal('')),
  customerName: z.string().optional().or(z.literal('')),
  customerLocation: z.string().optional().or(z.literal('')),
  quote: z.string().optional().or(z.literal(''))
}).passthrough();

export const HeroSliderUpsertSchema = z.object({
  imageUrl: z.string().min(1),
  mobileImageUrl: z.string().optional().or(z.literal('')),
  altText: z.string().optional().or(z.literal('')),
  buttonUrl: z.string().optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationLight).default([])
});

export const TestimonialUpsertSchema = z.object({
  imageUrl: z.string().optional().or(z.literal('')),
  rating: z.coerce.number().min(1).max(5).default(5),
  sortOrder: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationLight).default([])
});

export const FAQUpsertSchema = z.object({
  category: z.string().default('general'),
  sortOrder: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationLight).default([])
});

export const MenuUpsertSchema = z.object({
  key: z.string().min(2),
  location: z.enum(['header', 'footer', 'admin', 'mobile']).default('header'),
  isVisible: z.boolean().default(true),
  items: z.array(z.any()).default([])
});

export const SiteSettingUpsertSchema = z.object({
  key: z.string().default('main'),
  logoUrl: z.string().optional().or(z.literal('')),
  faviconUrl: z.string().optional().or(z.literal('')),
  primaryEmail: z.string().email().optional().or(z.literal('')),
  primaryPhone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  defaultCurrency: z.string().default('USD'),
  defaultLanguageCode: z.string().default('en-US'),
  bookingEnabled: z.boolean().default(true),
  socialLinks: z.array(z.any()).default([]),
  translations: z.array(TranslationLight).default([])
});

export const registry = {
  pages: { entityName: 'Page', repo: (uow: UnitOfWork) => uow.pages, validator: PageUpsertSchema, defaultSort: { sortOrder: 1, createdAt: -1 } },
  blogs: { entityName: 'Blog', repo: (uow: UnitOfWork) => uow.blogs, validator: BlogUpsertSchema, defaultSort: { publishDate: -1 } },
  destinations: { entityName: 'Destination', repo: (uow: UnitOfWork) => uow.destinations, validator: DestinationUpsertSchema, defaultSort: { sortOrder: 1, createdAt: -1 } },
  travelTypes: { entityName: 'TravelType', repo: (uow: UnitOfWork) => uow.travelTypes, validator: TravelTypeUpsertSchema, defaultSort: { sortOrder: 1, createdAt: -1 } },
  trips: { entityName: 'Trip', repo: (uow: UnitOfWork) => uow.trips, validator: TripUpsertSchema, defaultSort: { createdAt: -1 } },
  categories: { entityName: 'Category', repo: (uow: UnitOfWork) => uow.categories, validator: CategoryUpsertSchema, defaultSort: { sortOrder: 1, createdAt: -1 } },
  'hero-sliders': { entityName: 'HeroSlider', repo: (uow: UnitOfWork) => uow.heroSliders, validator: HeroSliderUpsertSchema, defaultSort: { sortOrder: 1 } },
  testimonials: { entityName: 'Testimonial', repo: (uow: UnitOfWork) => uow.testimonials, validator: TestimonialUpsertSchema, defaultSort: { sortOrder: 1 } },
  faqs: { entityName: 'FAQ', repo: (uow: UnitOfWork) => uow.faqs, validator: FAQUpsertSchema, defaultSort: { sortOrder: 1 } },
  menus: { entityName: 'Menu', repo: (uow: UnitOfWork) => uow.menus, validator: MenuUpsertSchema, defaultSort: { location: 1 } },
  settings: { entityName: 'SiteSetting', repo: (uow: UnitOfWork) => uow.siteSettings, validator: SiteSettingUpsertSchema, defaultSort: { createdAt: -1 } },
  bookings: { entityName: 'Booking', repo: (uow: UnitOfWork) => uow.bookings, validator: z.any(), defaultSort: { createdAt: -1 } },
  media: { entityName: 'MediaFile', repo: (uow: UnitOfWork) => uow.mediaFiles, validator: z.any(), defaultSort: { createdAt: -1 } },
  users: { entityName: 'User', repo: (uow: UnitOfWork) => uow.users, validator: z.any(), defaultSort: { createdAt: -1 } }
} as const;

export type CollectionKey = keyof typeof registry;

export function getRegistryItem(collection: string) {
  const item = registry[collection as CollectionKey];
  if (!item) throw new ValidationError(`Unsupported collection: ${collection}`);
  return item;
}
