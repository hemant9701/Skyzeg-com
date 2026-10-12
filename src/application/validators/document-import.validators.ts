import { z } from 'zod';

export const documentImportCollections = ['pages', 'blogs', 'trips', 'destinations', 'regions', 'places', 'travelTypes', 'categories', 'hero-sliders', 'testimonials', 'faqs'] as const;
export const DocumentImportSchema = z.object({
  collection: z.enum(documentImportCollections),
  languageCode: z.string().min(2).max(20)
});
export const MAX_DOCUMENT_BYTES = 4 * 1024 * 1024;
