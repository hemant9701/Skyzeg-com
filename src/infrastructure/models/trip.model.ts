import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, MediaRefSchema, SeoSchema } from './schemas';

const TripItinerarySchema = new Schema(
  {
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String },
    meals: { type: String },
    accommodation: { type: String }
  },
  { _id: true }
);

const TripTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    summary: { type: String },
    overview: { type: String },
    includes: { type: String },
    excludes: { type: String },
    policies: { type: String },
    highlights: [{ type: String }],
    itinerary: { type: [TripItinerarySchema], default: [] },
    ...SeoSchema.obj
  },
  { _id: false }
);

const TripAvailabilitySchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    seats: { type: Number, default: 0 },
    bookedSeats: { type: Number, default: 0 },
    status: { type: String, enum: ['open', 'limited', 'sold-out', 'closed'], default: 'open' }
  },
  { _id: true }
);

const TripSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    travelTypes: [{ type: Schema.Types.ObjectId, ref: 'TravelType' }],
    durationDays: { type: Number, required: true, min: 1 },
    durationNights: { type: Number, default: 0, min: 0 },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    currency: { type: String, default: 'USD' },
    heroImage: { type: String },
    gallery: { type: [MediaRefSchema], default: [] },
    availability: { type: [TripAvailabilitySchema], default: [] },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    translations: { type: [TripTranslationSchema], default: [] }
  },
  { timestamps: true }
);

TripSchema.index({ slug: 1 }, { unique: true });
TripSchema.index({ destination: 1, isVisible: 1 });
TripSchema.index({ categories: 1 });
TripSchema.index({ travelTypes: 1 });
TripSchema.index({ isVisible: 1, isFeatured: 1 });

export type TripDocument = InferSchemaType<typeof TripSchema> & { _id: string };
export const TripModel = mongoose.models.Trip || mongoose.model('Trip', TripSchema);
