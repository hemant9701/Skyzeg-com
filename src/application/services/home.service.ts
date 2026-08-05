import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';

export class HomeService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async getHomeData() {
    await this.unitOfWork.connect();
    const [settings, sliders, destinations, trips, testimonials, blogs] = await Promise.all([
      this.unitOfWork.siteSettings.findOne({ key: 'main' }),
      this.unitOfWork.heroSliders.list({ isVisible: true }, { sort: { sortOrder: 1 } }),
      this.unitOfWork.destinations.list({ isVisible: true, isFeatured: true }, { sort: { sortOrder: 1 }, limit: 6 }),
      this.unitOfWork.trips.list({ isVisible: true, isFeatured: true }, { sort: { createdAt: -1 }, limit: 6 }),
      this.unitOfWork.testimonials.list({ isVisible: true }, { sort: { sortOrder: 1 }, limit: 6 }),
      this.unitOfWork.blogs.list({ status: 'published' }, { sort: { publishDate: -1 }, limit: 3 })
    ]);

    return { settings, sliders, destinations, trips, testimonials, blogs };
  }
}
