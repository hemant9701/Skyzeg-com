import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { populateTripReferences } from './trip-query.service';

export class HomeService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async getHomeData() {
    await this.unitOfWork.connect();
    const [settings, sliders, destinations, travelTypes, trips, testimonials, blogs] = await Promise.all([
      this.unitOfWork.siteSettings.findOne({ key: 'main' }),
      this.unitOfWork.heroSliders.list({ isVisible: true }, { sort: { sortOrder: 1 } }),
      this.unitOfWork.destinations.list({ isVisible: true, isFeatured: true }, { sort: { sortOrder: 1 }, limit: 6 }),
      this.unitOfWork.travelTypes.list({ isVisible: true }, { sort: { sortOrder: 1 }, limit: 12 }),
      this.unitOfWork.trips.list({ isVisible: true, isFeatured: true }, { sort: { createdAt: -1 }, limit: 6 }),
      this.unitOfWork.testimonials.list({ isVisible: true }, { sort: { sortOrder: 1 }, limit: 6 }),
      this.unitOfWork.blogs.list({ status: 'published' }, { sort: { publishDate: -1 }, limit: 3 })
    ]);

    return {
      settings,
      sliders,
      destinations,
      travelTypes,
      trips: await populateTripReferences(this.unitOfWork, trips as any[]),
      testimonials,
      blogs
    };
  }
}
