import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const TailorMadeRequestSchema = new Schema(
  {
    requestNumber: { type: String, required: true, unique: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    tripTitle: { type: String, required: true, trim: true },
    leadName: { type: String, required: true, trim: true },
    leadEmail: { type: String, required: true, lowercase: true, trim: true },
    leadPhone: { type: String, trim: true },
    travelDate: { type: Date },
    travellersCount: { type: Number, default: 1 },
    preferredDestination: { type: String, required: true, trim: true },
    durationDays: { type: Number },
    budgetRange: { type: String, trim: true },
    accommodationStyle: { type: String, enum: ['Budget', 'Comfort', 'Luxury', 'Mixed', ''] },
    activities: { type: String, trim: true },
    specialRequests: { type: String, trim: true },
    status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: true }
);

TailorMadeRequestSchema.index({ requestNumber: 1 }, { unique: true });
TailorMadeRequestSchema.index({ leadEmail: 1, createdAt: -1 });
TailorMadeRequestSchema.index({ status: 1, createdAt: -1 });

export type TailorMadeRequestDocument = InferSchemaType<typeof TailorMadeRequestSchema> & { _id: string };
export const TailorMadeRequestModel = mongoose.models.TailorMadeRequest || mongoose.model('TailorMadeRequest', TailorMadeRequestSchema);