import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, SeoSchema } from './schemas';

const CategoryTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    description: { type: String },
    overview: { type: String, default: '' },
    highlights: { type: String, default: '' },
    thingsToDo: { type: String, default: '' },
    travelTips: { type: String, default: '' },
    ...SeoSchema.obj
  },
  { _id: false }
);

const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, enum: ['blog', 'trip', 'destination', 'general'], default: 'general' },
    image: { type: String },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    translations: { type: [CategoryTranslationSchema], default: [] }
  },
  { timestamps: true }
);

CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ type: 1, isVisible: 1 });

export type CategoryDocument = InferSchemaType<typeof CategorySchema> & { _id: string };
export const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
