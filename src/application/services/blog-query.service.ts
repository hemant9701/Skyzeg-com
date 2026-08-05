import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';

export interface BlogListQuery {
  search?: string;
  category?: string;
  tag?: string;
  admin?: boolean;
}

export interface BlogFilterResult {
  filter: Record<string, unknown>;
}

function normalizeQueryValue(value?: string) {
  return value?.trim() || '';
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function buildBlogListFilter(uow: UnitOfWork, query: BlogListQuery = {}): Promise<BlogFilterResult> {
  const filter: Record<string, unknown> = query.admin ? {} : { status: 'published' };
  const search = normalizeQueryValue(query.search);
  const category = normalizeQueryValue(query.category);
  const tag = normalizeQueryValue(query.tag);

  if (search) {
    filter.$or = [
      { slug: { $regex: search, $options: 'i' } },
      { 'translations.title': { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    const categoryFilter = query.admin ? { slug: category } : { slug: category, isVisible: true };
    const categoryDoc = await uow.categories.findOne(categoryFilter);
    if (!categoryDoc) {
      return { filter: { _id: { $in: [] } } };
    }

    filter.categories = categoryDoc._id;
  }

  if (tag) {
    filter.tags = { $regex: `^${escapeRegExp(tag)}$`, $options: 'i' };
  }

  return { filter };
}