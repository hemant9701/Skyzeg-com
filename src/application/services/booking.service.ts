import { BookingCreateSchema } from '@/application/validators/content.validators';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { NotFoundError } from '@/shared/errors/app-error';
import { logger } from '@/infrastructure/logging/logger';

export class BookingService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async createBooking(input: unknown, meta?: { ipAddress?: string; userAgent?: string }) {
    const data = BookingCreateSchema.parse(input);
    const trip = await this.unitOfWork.trips.findById(data.trip);
    if (!trip) throw new NotFoundError('Trip not found');

    const bookingNumber = `TRV-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9999)}`;
    const totalAmount = Number(trip.discountPrice || trip.price || 0) * data.travellersCount;
    const booking = await this.unitOfWork.bookings.create({
      ...data,
      bookingNumber,
      totalAmount,
      currency: trip.currency || 'USD',
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent
    });

    try {
      await this.sendBookingEmail({ ...data, tripTitle: trip.title || trip.name || 'Trip', bookingNumber });
    } catch (error) {
      logger.warn({ err: error, email: data.leadEmail }, 'Booking email notification failed');
    }

    return booking;
  }

  private async sendBookingEmail(data: { leadName: string; leadEmail: string; tripTitle: string; bookingNumber: string }) {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const from = process.env.FROM_EMAIL || 'noreply@example.com';
    const provider = process.env.EMAIL_PROVIDER;

    if (!provider) {
      return;
    }

    logger.info({ to, from, bookingNumber: data.bookingNumber, email: data.leadEmail }, 'Booking email notification requested');
  }
}
