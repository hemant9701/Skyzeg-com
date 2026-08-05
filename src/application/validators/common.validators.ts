import { z } from 'zod';

export const SeoSchema = z.object({
  metaTitle: z.string().max(160).optional().or(z.literal('')),
  metaDescription: z.string().max(320).optional().or(z.literal('')),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  openGraphTitle: z.string().optional().or(z.literal('')),
  openGraphDescription: z.string().optional().or(z.literal('')),
  openGraphImage: z.string().optional().or(z.literal('')),
  twitterTitle: z.string().optional().or(z.literal('')),
  twitterDescription: z.string().optional().or(z.literal('')),
  twitterImage: z.string().optional().or(z.literal(''))
});

export const TranslationBaseSchema = z.object({
  languageCode: z.string().min(2).max(10),
  title: z.string().min(1).max(220),
  summary: z.string().optional().or(z.literal('')),
  body: z.string().optional().or(z.literal(''))
}).merge(SeoSchema);

export const SlugSchema = z.string().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().optional()
});
