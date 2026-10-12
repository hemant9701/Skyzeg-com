import { LanguageService } from './language.service';
import { translateTexts } from '@/infrastructure/ai/openai-translator';
import type { TranslateContentSchema, TranslationContent } from '@/application/validators/translation.validators';
import type { z } from 'zod';
import { ValidationError } from '@/shared/errors/app-error';

const structuralKeys = new Set(['languageCode', '_id', 'id', 'url', 'href', 'src', 'image', 'imageUrl', 'icon', 'target', 'type', 'slug', 'key']);
export function collectTranslationTexts(content: TranslationContent) {
  const texts: { id: number; text: string; path: (string | number)[] }[] = [];
  function walk(value: TranslationContent, path: (string | number)[], depth: number) {
    if (depth > 12) throw new ValidationError('Content nesting is too deep');
    if (typeof value === 'string') {
      if (value.trim() && !/^(https?:\/\/|\/|mailto:|tel:)/i.test(value)) texts.push({ id: texts.length, text: value, path });
    } else if (Array.isArray(value)) value.forEach((item, index) => walk(item, [...path, index], depth + 1));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => { if (!structuralKeys.has(key)) walk(item, [...path, key], depth + 1); });
  }
  walk(content, [], 0);
  if (texts.length > 300) throw new ValidationError('Too many text fields; translate smaller sections');
  return texts;
}
export async function translateContent(input: z.infer<typeof TranslateContentSchema>) {
  const languages = await new LanguageService().getLanguages();
  const source = languages.find(item => item.code === input.sourceLanguage);
  const target = languages.find(item => item.code === input.targetLanguage);
  if (!source || !target) throw new ValidationError('Unsupported translation language');
  const texts = collectTranslationTexts(input.content);
  if (!texts.length) throw new ValidationError('Add content in the source language before translating');
  const translated = await translateTexts(texts.map(({ id, text }) => ({ id, text })), `${source.name} (${source.code})`, `${target.name} (${target.code})`);
  const content = structuredClone(input.content);
  for (const item of texts) {
    let parent: any = content;
    for (const key of item.path.slice(0, -1)) parent = parent[key];
    parent[item.path[item.path.length - 1]] = translated.get(item.id);
  }
  return content;
}
