import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, SeoSchema } from './schemas';

const ContentBlockSchema = new Schema(
  {
    type: { type: String, enum: ['hero', 'richText', 'image', 'video', 'cta', 'gallery', 'faq'], required: true },
    sortOrder: { type: Number, default: 0 },
    settings: { type: Schema.Types.Mixed, default: {} },
    translations: [
      new Schema(
        {
          ...BaseTranslationSchemaFields,
          title: { type: String, trim: true },
          body: { type: String }
        },
        { _id: false }
      )
    ]
  },
  { _id: true }
);

const PageTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    summary: { type: String },
    body: { type: String },
    ...SeoSchema.obj
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    heroImage: { type: String },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    showInNavigation: { type: Boolean, default: false },
    blocks: [ContentBlockSchema],
    translations: { type: [PageTranslationSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

PageSchema.index({ slug: 1 }, { unique: true });
PageSchema.index({ isVisible: 1, sortOrder: 1 });
PageSchema.index({ 'translations.languageCode': 1 });

export type PageDocument = InferSchemaType<typeof PageSchema> & { _id: string };
export const PageModel = mongoose.models.Page || mongoose.model('Page', PageSchema);
