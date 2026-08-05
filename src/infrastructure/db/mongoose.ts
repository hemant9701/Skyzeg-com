import mongoose from 'mongoose';
import { logger } from '@/infrastructure/logging/logger';

function resolveMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (uri) return uri;
  throw new Error('MONGODB_URI is required and must point to your MongoDB Atlas cluster');
}

const MONGODB_URI = resolveMongoUri();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cache;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    logger.info({ uri: MONGODB_URI }, 'Connecting to MongoDB');
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      autoIndex: process.env.NODE_ENV !== 'production'
    }).catch((error) => {
      logger.warn({ err: error }, 'MongoDB connection failed');
      cache.promise = null;
      return null;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
