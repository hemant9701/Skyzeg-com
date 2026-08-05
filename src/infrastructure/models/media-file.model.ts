import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const MediaFileSchema = new Schema(
  {
    folder: { type: String, required: true, index: true },
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    extension: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    storagePath: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    durationSeconds: { type: Number },
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    type: { type: String, enum: ['image', 'video', 'document'], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

MediaFileSchema.index({ folder: 1, type: 1, createdAt: -1 });

export type MediaFileDocument = InferSchemaType<typeof MediaFileSchema> & { _id: string };
export const MediaFileModel = mongoose.models.MediaFile || mongoose.model('MediaFile', MediaFileSchema);
