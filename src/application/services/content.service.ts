import type { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { NotFoundError } from '@/shared/errors/app-error';

type FilterQuery<T = Record<string, unknown>> = Record<string, unknown>;

export class ContentService {
  constructor(private readonly repository: BaseRepository<any>, private readonly entityName: string) {}

  async listPublic(filter: FilterQuery<any> = {}) {
    return this.repository.list({ isVisible: true, ...filter }, { sort: { sortOrder: 1, createdAt: -1 } });
  }

  async listAdmin(query: { page?: number; pageSize?: number; search?: string }) {
    const filter: FilterQuery<any> = {};
    if (query.search) {
      filter.$or = [
        { slug: { $regex: query.search, $options: 'i' } },
        { 'translations.title': { $regex: query.search, $options: 'i' } }
      ];
    }
    return this.repository.paginate(filter, { page: query.page, pageSize: query.pageSize, sort: { createdAt: -1 } });
  }

  async getBySlug(slug: string, publicOnly = true) {
    const filter: FilterQuery<any> = publicOnly ? { slug, isVisible: true } : { slug };
    const item = await this.repository.findOne(filter);
    if (!item) throw new NotFoundError(`${this.entityName} not found`);
    return item;
  }

  async getById(id: string) {
    const item = await this.repository.findById(id);
    if (!item) throw new NotFoundError(`${this.entityName} not found`);
    return item;
  }

  async create(data: Record<string, unknown>) {
    return this.repository.create(data);
  }

  async updateBySlug(slug: string, data: Record<string, unknown>) {
    const updated = await this.repository.updateOne({ slug }, data);
    if (!updated) throw new NotFoundError(`${this.entityName} not found`);
    return updated;
  }

  async updateById(id: string, data: Record<string, unknown>) {
    const updated = await this.repository.updateById(id, data);
    if (!updated) throw new NotFoundError(`${this.entityName} not found`);
    return updated;
  }

  async deleteBySlug(slug: string) {
    const deleted = await this.repository.deleteOne({ slug });
    if (!deleted) throw new NotFoundError(`${this.entityName} not found`);
    return true;
  }
}
