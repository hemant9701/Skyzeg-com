import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields } from './schemas';

const MenuItemTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    label: { type: String, required: true }
  },
  { _id: false }
);

const MenuItemSchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId },
    url: { type: String, required: true },
    target: { type: String, enum: ['_self', '_blank'], default: '_self' },
    icon: { type: String },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    translations: { type: [MenuItemTranslationSchema], default: [] }
  },
  { _id: true }
);

const MenuSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    location: { type: String, enum: ['header', 'footer', 'admin', 'mobile'], default: 'header' },
    isVisible: { type: Boolean, default: true },
    items: { type: [MenuItemSchema], default: [] }
  },
  { timestamps: true }
);

MenuSchema.index({ key: 1 }, { unique: true });
MenuSchema.index({ location: 1, isVisible: 1 });

export type MenuDocument = InferSchemaType<typeof MenuSchema> & { _id: string };
export const MenuModel = mongoose.models.Menu || mongoose.model('Menu', MenuSchema);
