import mongoose from 'mongoose';
import { logger } from '@/infrastructure/logging/logger';

function resolveMongoUri(): string | null {
  const candidates = [process.env.MONGODB_URI, process.env.MONGO_URL, process.env.DATABASE_URL];

  for (const value of candidates) {
    const uri = value?.trim();
    if (uri) {
      return uri;
    }
  }

  return null;
}

function redactMongoUri(uri: string): string {
  try {
    const parsed = new URL(uri);
    const dbName = parsed.pathname.replace(/^\//, '') || 'database';
    return `${parsed.protocol}//${parsed.hostname}/${dbName}`;
  } catch {
    return 'redacted';
  }
}

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

  const mongoUri = resolveMongoUri();
  if (!mongoUri) {
    return null;
  }

  if (!cache.promise) {
    logger.info({ uri: redactMongoUri(mongoUri) }, 'Connecting to MongoDB');
    cache.promise = mongoose.connect(mongoUri, {
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
