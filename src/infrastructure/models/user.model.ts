import mongoose, { Schema, type InferSchemaType, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: String, required: true }],
    avatarUrl: { type: String },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ roles: 1 });

export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: string };
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
