export interface TranslationDto {
  languageCode: string;
  title?: string;
  summary?: string;
  body?: string;
  overview?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  [key: string]: unknown;
}

export interface PaginationDto {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface PublicListDto<T> {
  items: T[];
  total?: number;
}
