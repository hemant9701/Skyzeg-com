import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fullName: { type: String, trim: true },
    languageCode: { type: String, default: 'en-US' },
    isActive: { type: Boolean, default: true },
    source: { type: String, default: 'website' },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date }
  },
  { timestamps: true }
);

NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });
NewsletterSubscriberSchema.index({ isActive: 1 });

export type NewsletterSubscriberDocument = InferSchemaType<typeof NewsletterSubscriberSchema> & { _id: string };
export const NewsletterSubscriberModel = mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
