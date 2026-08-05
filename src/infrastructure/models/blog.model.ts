import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { BaseTranslationSchemaFields, SeoSchema } from './schemas';

const BlogTranslationSchema = new Schema(
  {
    ...BaseTranslationSchemaFields,
    title: { type: String, required: true, trim: true },
    summary: { type: String },
    body: { type: String },
    ...SeoSchema.obj
  },
  { _id: false }
);

const BlogCommentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    featuredImage: { type: String },
    author: { type: String, required: true, trim: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    publishDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    relatedBlogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    commentsEnabled: { type: Boolean, default: true },
    comments: { type: [BlogCommentSchema], default: [] },
    translations: { type: [BlogTranslationSchema], default: [] }
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ status: 1, publishDate: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ categories: 1 });

export type BlogDocument = InferSchemaType<typeof BlogSchema> & { _id: string };
export const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
