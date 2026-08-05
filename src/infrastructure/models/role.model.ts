import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

RoleSchema.index({ name: 1 }, { unique: true });

export type RoleDocument = InferSchemaType<typeof RoleSchema> & { _id: string };
export const RoleModel = mongoose.models.Role || mongoose.model('Role', RoleSchema);
