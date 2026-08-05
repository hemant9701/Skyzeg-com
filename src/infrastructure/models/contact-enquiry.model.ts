import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const ContactEnquirySchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: true }
);

ContactEnquirySchema.index({ email: 1, createdAt: -1 });
ContactEnquirySchema.index({ status: 1, createdAt: -1 });

export type ContactEnquiryDocument = InferSchemaType<typeof ContactEnquirySchema> & { _id: string };
export const ContactEnquiryModel = mongoose.models.ContactEnquiry || mongoose.model('ContactEnquiry', ContactEnquirySchema);
