import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, SocialLinkSchema } from './schemas';

const SiteSettingTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    siteName: { type: String, required: true },
    tagline: { type: String },
    footerText: { type: String },
    newsletterTitle: { type: String },
    newsletterText: { type: String },
    whyChooseUsTitle: { type: String },
    whyChooseUsBody: { type: String },
    footerColumns: {
      type: [
        new Schema(
          {
            title: { type: String, required: true },
            links: [
              new Schema(
                {
                  label: { type: String, required: true },
                  url: { type: String, required: true }
                },
                { _id: false }
              )
            ],
            sortOrder: { type: Number, default: 0 }
          },
          { _id: false }
        )
      ],
      default: []
    }
  },
  { _id: false }
);

const SiteSettingSchema = new Schema(
  {
    key: { type: String, default: 'main', unique: true },
    logoUrl: { type: String, default: '/images/logo.svg' },
    logo2Url: { type: String, default: '/images/logo.svg' },
    faviconUrl: { type: String, default: '/icon.svg' },
    primaryEmail: { type: String, default: 'hello@skyzeg.com' },
    primaryPhone: { type: String, default: '+1 000 000 0000' },
    address: { type: String, default: '' },
    defaultCurrency: { type: String, default: 'USD' },
    defaultLanguageCode: { type: String, default: 'en-US' },
    bookingEnabled: { type: Boolean, default: true },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    translations: { type: [SiteSettingTranslationSchema], default: [] }
  },
  { timestamps: true }
);

SiteSettingSchema.index({ key: 1 }, { unique: true });

export type SiteSettingDocument = InferSchemaType<typeof SiteSettingSchema> & { _id: string };
export const SiteSettingModel = mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema);
