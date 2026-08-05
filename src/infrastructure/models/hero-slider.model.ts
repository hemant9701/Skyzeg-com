import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields } from './schemas';

const HeroSliderTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String }
  },
  { _id: false }
);

const HeroSliderSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    mobileImageUrl: { type: String },
    altText: { type: String, default: '' },
    buttonUrl: { type: String, default: '/trips' },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    translations: { type: [HeroSliderTranslationSchema], default: [] }
  },
  { timestamps: true }
);

HeroSliderSchema.index({ isVisible: 1, sortOrder: 1 });

export type HeroSliderDocument = InferSchemaType<typeof HeroSliderSchema> & { _id: string };
export const HeroSliderModel = mongoose.models.HeroSlider || mongoose.model('HeroSlider', HeroSliderSchema);
