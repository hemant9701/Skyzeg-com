import mongoose from 'mongoose';
import { logger } from '@/infrastructure/logging/logger';

function resolveMongoUri(): string {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  if (process.env.MONGODB_HOST) return `mongodb://${process.env.MONGODB_HOST}:27017/travel_system_db`;
  if (process.env.DOCKER_CONTAINER) return 'mongodb://mongodb:27017/travel_system_db';
  return 'mongodb://127.0.0.1:27017/travel_system_db';
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
