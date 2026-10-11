import type { TranslationBase, SeoFields } from './common';

export interface PageTranslation extends TranslationBase, SeoFields {
  title: string;
  summary?: string;
  body?: string;
}

export interface DestinationTranslation extends TranslationBase, SeoFields {
  title: string;
  overview?: string;
  highlights?: string;
  thingsToDo?: string;
  travelTips?: string;
  weather?: string;
}

export interface RegionTranslation extends TranslationBase, SeoFields {
  title: string;
  overview?: string;
  description?: string;
}

export interface PlaceTranslation extends TranslationBase, SeoFields {
  title: string;
  overview?: string;
  highlights?: string;
  thingsToDo?: string;
  travelTips?: string;
}

export interface TripTranslation extends TranslationBase, SeoFields {
  title: string;
  summary?: string;
  overview?: string;
  includes?: string;
  excludes?: string;
  policies?: string;
}

export interface BlogTranslation extends TranslationBase, SeoFields {
  title: string;
  summary?: string;
  body?: string;
}

export interface SimpleTranslation extends TranslationBase, SeoFields {
  title: string;
  description?: string;
}
