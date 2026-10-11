import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, CoordinatesSchema, MediaRefSchema, SeoSchema } from './schemas';

const PlaceTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    overview: { type: String, default: '' },
    highlights: { type: String, default: '' },
    thingsToDo: { type: String, default: '' },
    travelTips: { type: String, default: '' },
    ...SeoSchema.obj
  },
  { _id: false }
);

const PlaceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    placeName: { type: String, required: true, trim: true },
    country: { type: [String], default: [] },
    city: { type: String, trim: true },
    placeType: { type: String, trim: true },
    heroImage: { type: String, default: '' },
    gallery: { type: [MediaRefSchema], default: [] },
    coordinates: CoordinatesSchema,
    mapEmbedUrl: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    translations: { type: [PlaceTranslationSchema], default: [] }
  },
  { timestamps: true }
);

PlaceSchema.index({ slug: 1 }, { unique: true });
PlaceSchema.index({ placeName: 1 });
PlaceSchema.index({ country: 1, city: 1 });
PlaceSchema.index({ isVisible: 1, isFeatured: 1, sortOrder: 1 });

export type PlaceDocument = InferSchemaType<typeof PlaceSchema> & { _id: string };
if (process.env.NODE_ENV !== 'production' && mongoose.models.Place) {
  delete mongoose.models.Place;
}
export const PlaceModel = mongoose.models.Place || mongoose.model('Place', PlaceSchema);
