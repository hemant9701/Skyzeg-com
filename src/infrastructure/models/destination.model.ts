import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, CoordinatesSchema, MediaRefSchema, SeoSchema } from './schemas';

const DestinationTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    overview: { type: String },
    highlights: { type: String },
    thingsToDo: { type: String },
    travelTips: { type: String },
    weather: { type: String },
    ...SeoSchema.obj
  },
  { _id: false }
);

const DestinationSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    heroImage: { type: String },
    gallery: { type: [MediaRefSchema], default: [] },
    coordinates: CoordinatesSchema,
    mapEmbedUrl: { type: String },
    sortOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    translations: { type: [DestinationTranslationSchema], default: [] }
  },
  { timestamps: true }
);

DestinationSchema.index({ slug: 1 }, { unique: true });
DestinationSchema.index({ country: 1, city: 1 });
DestinationSchema.index({ isVisible: 1, isFeatured: 1 });

export type DestinationDocument = InferSchemaType<typeof DestinationSchema> & { _id: string };
export const DestinationModel = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
