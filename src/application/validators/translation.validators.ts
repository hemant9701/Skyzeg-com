import { z } from 'zod';

export type TranslationContent = string | number | boolean | null | TranslationContent[] | { [key: string]: TranslationContent };
const contentSchema: z.ZodType<TranslationContent> = z.lazy(() => z.union([
  z.string(), z.number(), z.boolean(), z.null(), z.array(contentSchema), z.record(z.string(), contentSchema)
]));
export const TranslateContentSchema = z.object({
  collection: z.string().min(1).max(50),
  sourceLanguage: z.string().min(2).max(20),
  targetLanguage: z.string().min(2).max(20),
  content: z.record(z.string(), contentSchema)
}).strict().refine(value => value.sourceLanguage !== value.targetLanguage, 'Select a different target language')
  .refine(value => JSON.stringify(value.content).length <= 60000, 'Content is too long; translate smaller sections');
