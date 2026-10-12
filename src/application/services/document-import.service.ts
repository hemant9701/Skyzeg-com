import slugify from 'slugify';
import type { z } from 'zod';
import { DocumentImportSchema } from '@/application/validators/document-import.validators';
import { extractWordDocument } from '@/infrastructure/documents/word-extractor';
import { LanguageService } from './language.service';
import { ValidationError } from '@/shared/errors/app-error';

export function mapDocumentToDraft(collection: z.infer<typeof DocumentImportSchema>['collection'], languageCode: string, document: { html: string; text: string; warnings: string[] }) {
  const lines = document.text.split('\n').map(line => line.trim()).filter(Boolean);
  const title = lines[0].slice(0, 200);
  const summary = lines.slice(1).join(' ').slice(0, 500);
  const fields: Record<string, unknown> = { slug: slugify(title, { lower: true, strict: true }) || 'imported-content', isVisible: false };
  const translation: Record<string, unknown> = { languageCode, title };
  if (collection === 'pages' || collection === 'blogs') Object.assign(translation, { summary, body: document.html });
  else if (['trips','destinations','regions','places','categories','travelTypes'].includes(collection)) Object.assign(translation, { summary, overview: document.html });
  else if (collection === 'faqs') Object.assign(translation, { question: title, answer: document.html });
  else if (collection === 'testimonials') Object.assign(translation, { customerName: title, quote: document.html });
  else if (collection === 'hero-sliders') translation.subtitle = document.html;
  if (collection === 'blogs') fields.status = 'draft';
  if (collection === 'trips') fields.tripName = title;
  if (collection === 'regions') fields.regionName = title;
  if (collection === 'places') fields.placeName = title;
  if (collection === 'travelTypes') fields.travelType = title;
  return { fields, translation, warnings: document.warnings };
}
export async function importWordDocument(input: z.infer<typeof DocumentImportSchema>, buffer: Buffer, filename: string) {
  if (!await new LanguageService().isSupported(input.languageCode)) throw new ValidationError('Unsupported content language');
  return mapDocumentToDraft(input.collection, input.languageCode, await extractWordDocument(buffer, filename));
}
