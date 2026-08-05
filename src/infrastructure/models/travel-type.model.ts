import mongoose, {
  Schema,
  type InferSchemaType,
  type HydratedDocument,
} from 'mongoose';

import {
  BaseTranslationSchemaFields,
  MediaRefSchema,
  SeoSchema,
} from './schemas';

const TravelTypeTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,

    title: {
      type: String,
      required: true,
      trim: true,
    },

    overview: {
      type: String,
      default: '',
    },

    highlights: {
      type: String,
      default: '',
    },

    thingsToDo: {
      type: String,
      default: '',
    },

    travelTips: {
      type: String,
      default: '',
    },

    ...SeoSchema.obj,
  },
  {
    _id: false,
  }
);

const TravelTypeSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    travelType: {
      type: String,
      required: true,
      trim: true,
    },

    heroImage: {
      type: String,
      default: '',
    },

    gallery: {
      type: [MediaRefSchema],
      default: [],
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    translations: {
      type: [TravelTypeTranslationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

TravelTypeSchema.index({
  isVisible: 1,
  isFeatured: 1,
  sortOrder: 1,
});

TravelTypeSchema.index({
  travelType: 1,
});

TravelTypeSchema.index({
  'translations.languageCode': 1,
});

export type TravelType = InferSchemaType<typeof TravelTypeSchema>;

export type TravelTypeDocument = HydratedDocument<TravelType>;

export const TravelTypeModel =
  mongoose.models.TravelType ||
  mongoose.model<TravelType>('TravelType', TravelTypeSchema);