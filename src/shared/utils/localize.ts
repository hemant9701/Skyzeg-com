export interface WithTranslations<T> {
  translations?: T[];
}

export interface TranslationLike {
  languageCode: string;
  [key: string]: unknown;
}

export function pickTranslation<T extends TranslationLike>(
  item: WithTranslations<T> | null | undefined,
  languageCode = 'en-US'
): T | undefined {
  if (!item?.translations?.length) return undefined;
  return (
    item.translations.find((translation) => translation.languageCode === languageCode) ||
    item.translations.find((translation) => translation.languageCode === 'en-US') ||
    item.translations[0]
  );
}
