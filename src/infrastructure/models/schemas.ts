import { Schema } from 'mongoose';

export const SeoSchema = new Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    openGraphTitle: { type: String, trim: true },
    openGraphDescription: { type: String, trim: true },
    openGraphImage: { type: String, trim: true },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
    twitterImage: { type: String, trim: true }
  },
  { _id: false }
);

export const BaseTranslationSchemaFields = {
  languageCode: { type: String, required: true, trim: true, index: true }
};

export const MediaRefSchema = new Schema(
  {
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 }
  },
  { _id: false }
);

export const CoordinatesSchema = new Schema(
  {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  { _id: false }
);

export const SocialLinkSchema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: 'bi-link-45deg' }
  },
  { _id: false }
);
