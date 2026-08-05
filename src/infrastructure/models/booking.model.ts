import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const BookingTravellerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    passportNumber: { type: String },
    nationality: { type: String },
    notes: { type: String }
  },
  { _id: true }
);

const BookingSchema = new Schema(
  {
    bookingNumber: { type: String, required: true, unique: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    leadName: { type: String, required: true },
    leadEmail: { type: String, required: true, lowercase: true, trim: true },
    leadPhone: { type: String },
    travelDate: { type: Date },
    travellersCount: { type: Number, default: 1 },
    travellers: { type: [BookingTravellerSchema], default: [] },
    totalAmount: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
    specialRequests: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: true }
);

BookingSchema.index({ bookingNumber: 1 }, { unique: true });
BookingSchema.index({ leadEmail: 1, createdAt: -1 });
BookingSchema.index({ status: 1, createdAt: -1 });
BookingSchema.index({ trip: 1 });

export type BookingDocument = InferSchemaType<typeof BookingSchema> & { _id: string };
export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
