import type { Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { connectToDatabase } from '@/infrastructure/db/mongoose';
import { AppError } from '@/shared/errors/app-error';

type FilterQuery<T = Record<string, unknown>> = Record<string, unknown>;

export interface PaginationInput {
  page?: number;
  pageSize?: number;
  sort?: Record<string, 1 | -1>;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async list(filter: FilterQuery<T> = {}, options: QueryOptions<T> = {}): Promise<T[]> {
    const connection = await connectToDatabase();
    if (!connection) return [];
    return this.model.find(filter, null, options).lean<T[]>().exec();
  }

  async paginate(filter: FilterQuery<T> = {}, input: PaginationInput = {}): Promise<PaginatedResult<T>> {
    const connection = await connectToDatabase();
    if (!connection) return { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
    const page = Math.max(1, input.page || 1);
    const pageSize = Math.min(100, Math.max(1, input.pageSize || 20));
    const sort = input.sort || { createdAt: -1 };
    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean<T[]>()
        .exec(),
      this.model.countDocuments(filter).exec()
    ]);

    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async findById(id: string, projection?: ProjectionType<T>): Promise<T | null> {
    const connection = await connectToDatabase();
    if (!connection) return null;
    return this.model.findById(id, projection).lean<T>().exec();
  }

  async findOne(filter: FilterQuery<T>, projection?: ProjectionType<T>): Promise<T | null> {
    const connection = await connectToDatabase();
    if (!connection) return null;
    return this.model.findOne(filter, projection).lean<T>().exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const connection = await connectToDatabase();
    if (!connection) throw new AppError('Database is unavailable. Please ensure MongoDB is running.', 503);
    const created = await this.model.create(data);
    return created.toObject() as T;
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    const connection = await connectToDatabase();
    if (!connection) throw new AppError('Database is unavailable. Please ensure MongoDB is running.', 503);
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean<T>().exec();
  }

  async updateOne(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null> {
    const connection = await connectToDatabase();
    if (!connection) throw new AppError('Database is unavailable. Please ensure MongoDB is running.', 503);
    return this.model.findOneAndUpdate(filter, data, { new: true, runValidators: true }).lean<T>().exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const connection = await connectToDatabase();
    if (!connection) throw new AppError('Database is unavailable. Please ensure MongoDB is running.', 503);
    const result = await this.model.findByIdAndDelete(id).exec();
    return Boolean(result);
  }

  async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
    const connection = await connectToDatabase();
    if (!connection) throw new AppError('Database is unavailable. Please ensure MongoDB is running.', 503);
    const result = await this.model.findOneAndDelete(filter).exec();
    return Boolean(result);
  }

  get rawModel(): Model<T> {
    return this.model;
  }
}
