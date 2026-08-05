import { connectToDatabase } from '@/infrastructure/db/mongoose';
import {
  AuditLogModel,
  BlogModel,
  BookingModel,
  CategoryModel,
  ContactEnquiryModel,
  DestinationModel,
  FAQModel,
  HeroSliderModel,
  MediaFileModel,
  MenuModel,
  NewsletterSubscriberModel,
  PageModel,
  RoleModel,
  SiteSettingModel,
  TestimonialModel,
  TripModel,
  UserModel,
  TravelTypeModel
} from '@/infrastructure/models';
import { BaseRepository } from './base.repository';

export class UnitOfWork {
  readonly pages = new BaseRepository<any>(PageModel);
  readonly destinations = new BaseRepository<any>(DestinationModel);
  readonly trips = new BaseRepository<any>(TripModel);
  readonly categories = new BaseRepository<any>(CategoryModel);
  readonly blogs = new BaseRepository<any>(BlogModel);
  readonly mediaFiles = new BaseRepository<any>(MediaFileModel);
  readonly heroSliders = new BaseRepository<any>(HeroSliderModel);
  readonly testimonials = new BaseRepository<any>(TestimonialModel);
  readonly faqs = new BaseRepository<any>(FAQModel);
  readonly siteSettings = new BaseRepository<any>(SiteSettingModel);
  readonly menus = new BaseRepository<any>(MenuModel);
  readonly contactEnquiries = new BaseRepository<any>(ContactEnquiryModel);
  readonly newsletterSubscribers = new BaseRepository<any>(NewsletterSubscriberModel);
  readonly bookings = new BaseRepository<any>(BookingModel);
  readonly users = new BaseRepository<any>(UserModel);
  readonly roles = new BaseRepository<any>(RoleModel);
  readonly auditLogs = new BaseRepository<any>(AuditLogModel);
  readonly travelTypes = new BaseRepository<any>(TravelTypeModel);

  async connect(): Promise<void> {
    await connectToDatabase();
  }

  async audit(input: {
    userId?: string;
    userEmail?: string;
    action: string;
    entityName: string;
    entityId?: string;
    before?: unknown;
    after?: unknown;
    ipAddress?: string;
    userAgent?: string;
  }) {
    await this.auditLogs.create(input);
  }
}
