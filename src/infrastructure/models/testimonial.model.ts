import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields } from './schemas';

const TestimonialTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    customerName: { type: String, required: true },
    customerLocation: { type: String },
    quote: { type: String, required: true }
  },
  { _id: false }
);

const TestimonialSchema = new Schema(
  {
    imageUrl: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    translations: { type: [TestimonialTranslationSchema], default: [] }
  },
  { timestamps: true }
);

TestimonialSchema.index({ isVisible: 1, sortOrder: 1 });

export type TestimonialDocument = InferSchemaType<typeof TestimonialSchema> & { _id: string };
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
