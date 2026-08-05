import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields } from './schemas';

const FAQTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const FAQSchema = new Schema(
  {
    category: { type: String, default: 'general' },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    translations: { type: [FAQTranslationSchema], default: [] }
  },
  { timestamps: true }
);

FAQSchema.index({ category: 1, isVisible: 1, sortOrder: 1 });

export type FAQDocument = InferSchemaType<typeof FAQSchema> & { _id: string };
export const FAQModel = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
