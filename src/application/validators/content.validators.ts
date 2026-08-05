import { z } from 'zod';
import { SlugSchema, TranslationBaseSchema } from './common.validators';

export function sanitizePlainText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sanitizeEmailValue(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.trim().toLowerCase();
}

export const PageUpsertSchema = z.object({
  slug: SlugSchema,
  heroImage: z.string().optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  showInNavigation: z.boolean().default(false),
  blocks: z.array(z.any()).optional(),
  translations: z.array(TranslationBaseSchema).min(1)
});

export const CategoryUpsertSchema = z.object({
  slug: SlugSchema,
  type: z.enum(['blog', 'trip', 'destination', 'general']).default('general'),
  image: z.string().optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationBaseSchema.extend({
    overview: z.string().optional().or(z.literal('')),
    highlights: z.string().optional().or(z.literal('')),
    thingsToDo: z.string().optional().or(z.literal('')),
    travelTips: z.string().optional().or(z.literal(''))
  })).min(1)
});

export const DestinationUpsertSchema = z.object({
  slug: SlugSchema,
  country: z.string().min(1),
  city: z.string().optional().or(z.literal('')),
  heroImage: z.string().optional().or(z.literal('')),
  gallery: z.array(z.any()).optional(),
  coordinates: z.object({ latitude: z.number().optional(), longitude: z.number().optional() }).optional(),
  mapEmbedUrl: z.string().optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationBaseSchema.extend({
    overview: z.string().optional().or(z.literal('')),
    highlights: z.string().optional().or(z.literal('')),
    thingsToDo: z.string().optional().or(z.literal('')),
    travelTips: z.string().optional().or(z.literal('')),
    weather: z.string().optional().or(z.literal(''))
  })).min(1)
});

export const TravelTypeUpsertSchema = z.object({
  slug: SlugSchema,
  travelType: z.string().min(1),
  heroImage: z.string().optional().or(z.literal('')),
  gallery: z.array(z.any()).optional(),
  sortOrder: z.coerce.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationBaseSchema.extend({
    overview: z.string().optional().or(z.literal('')),
    highlights: z.string().optional().or(z.literal('')),
    thingsToDo: z.string().optional().or(z.literal('')),
    travelTips: z.string().optional().or(z.literal(''))
  })).min(1)
});

const TripItineraryItemSchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().optional().or(z.literal('')),
  meals: z.string().optional().or(z.literal('')),
  accommodation: z.string().optional().or(z.literal(''))
});

export const TripUpsertSchema = z.object({
  slug: SlugSchema,
  destination: z.string().optional().or(z.literal('')),
  travelTypes: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  durationDays: z.coerce.number().int().positive(),
  durationNights: z.coerce.number().int().nonnegative().default(0),
  price: z.coerce.number().nonnegative(),
  discountPrice: z.coerce.number().nonnegative().optional(),
  currency: z.string().default('USD'),
  heroImage: z.string().optional().or(z.literal('')),
  gallery: z.array(z.any()).optional(),
  availability: z.array(z.any()).default([]),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  translations: z.array(TranslationBaseSchema.extend({
    overview: z.string().optional().or(z.literal('')),
    includes: z.string().optional().or(z.literal('')),
    excludes: z.string().optional().or(z.literal('')),
    policies: z.string().optional().or(z.literal('')),
    highlights: z.array(z.string()).optional().default([]),
    itinerary: z.array(TripItineraryItemSchema).optional().default([])
  })).min(1)
});

export const BlogUpsertSchema = z.object({
  slug: SlugSchema,
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional().or(z.literal('')),
  author: z.string().min(1),
  publishDate: z.coerce.date().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  relatedBlogs: z.array(z.string()).default([]),
  commentsEnabled: z.boolean().default(true),
  translations: z.array(TranslationBaseSchema).min(1)
});

export const BookingCreateSchema = z.object({
  trip: z.string().min(1),
  leadName: z.string().min(2).transform((value) => sanitizePlainText(value)),
  leadEmail: z.string().email().transform((value) => sanitizeEmailValue(value)),
  leadPhone: z.string().optional().or(z.literal('')).transform((value) => sanitizePlainText(value)),
  travelDate: z.coerce.date().optional(),
  travellersCount: z.coerce.number().int().positive().max(50).default(1),
  travellers: z.array(z.any()).default([]),
  specialRequests: z.string().optional().or(z.literal('')).transform((value) => sanitizePlainText(value))
});

export const ContactCreateSchema = z.object({
  fullName: z.string().min(2).transform((value) => sanitizePlainText(value)),
  email: z.string().email().transform((value) => sanitizeEmailValue(value)),
  phone: z.string().optional().or(z.literal('')).transform((value) => sanitizePlainText(value)),
  subject: z.string().min(2).transform((value) => sanitizePlainText(value)),
  message: z.string().min(5).transform((value) => sanitizePlainText(value))
});

export const NewsletterCreateSchema = z.object({
  email: z.string().email().transform((value) => sanitizeEmailValue(value)),
  fullName: z.string().optional().or(z.literal('')).transform((value) => sanitizePlainText(value)),
  languageCode: z.string().default('en-US')
});
