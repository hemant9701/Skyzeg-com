import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, CoordinatesSchema, MediaRefSchema, SeoSchema } from './schemas';

const RegionTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    overview: { type: String, default: '' },
    description: { type: String, default: '' },
    ...SeoSchema.obj
  },
  { _id: false }
);

const RegionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    regionName: { type: String, required: true, trim: true },
    heroImage: { type: String, default: '' },
    gallery: { type: [MediaRefSchema], default: [] },
    coordinates: CoordinatesSchema,
    sortOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    translations: { type: [RegionTranslationSchema], default: [] }
  },
  { timestamps: true }
);

RegionSchema.index({ slug: 1 }, { unique: true });
RegionSchema.index({ isVisible: 1, isFeatured: 1, sortOrder: 1 });

export type RegionDocument = InferSchemaType<typeof RegionSchema> & { _id: string };
if (process.env.NODE_ENV !== 'production' && mongoose.models.Region) {
  delete mongoose.models.Region;
}
export const RegionModel = mongoose.models.Region || mongoose.model('Region', RegionSchema);
