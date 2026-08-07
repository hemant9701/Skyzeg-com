import { BookingCreateSchema } from '@/application/validators/content.validators';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { NotFoundError } from '@/shared/errors/app-error';
import { logger } from '@/infrastructure/logging/logger';
import { sendMail } from '@/lib/email';

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
    let emailSent = true;

    try {
      await this.sendBookingEmail({
        ...data,
        tripTitle: trip.title || trip.name || 'Trip',
        bookingNumber,
        totalAmount,
        currency: trip.currency || 'USD',
      });
    } catch (error) {
      emailSent = false;
      logger.warn({ err: error, email: data.leadEmail }, 'Booking email notification failed');
    }

    return {
      ...booking,
      emailNotification: {
        sent: emailSent
      }
    };
  }

  private async sendBookingEmail(data: {
    leadName: string;
    leadEmail: string;
    leadPhone?: string;
    tripTitle: string;
    bookingNumber: string;
    travelDate?: Date;
    travellersCount?: number;
    specialRequests?: string;
    totalAmount: number;
    currency: string;
  }) {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const from = process.env.FROM_EMAIL || 'noreply@example.com';

    if (!process.env.SMTP_HOST) {
      logger.info('Skipping booking email notification: SMTP_HOST is not configured');
      return;
    }

    logger.info({ to, from, bookingNumber: data.bookingNumber, email: data.leadEmail }, 'Booking email notification requested');

    const travelDate = data.travelDate ? new Date(data.travelDate).toISOString().slice(0, 10) : 'Not provided';

    await sendMail({
      to,
      subject: `New booking: ${data.bookingNumber} (${data.tripTitle})`,
      text: [
        `Booking Number: ${data.bookingNumber}`,
        `Trip: ${data.tripTitle}`,
        `Lead Name: ${data.leadName}`,
        `Lead Email: ${data.leadEmail}`,
        `Lead Phone: ${data.leadPhone || 'N/A'}`,
        `Travel Date: ${travelDate}`,
        `Travellers: ${data.travellersCount || 1}`,
        `Total Amount: ${data.currency} ${data.totalAmount}`,
        '',
        'Special Requests:',
        data.specialRequests || 'N/A',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">New booking received</h2>
          <p><strong>Booking Number:</strong> ${data.bookingNumber}</p>
          <p><strong>Trip:</strong> ${data.tripTitle}</p>
          <p><strong>Lead Name:</strong> ${data.leadName}</p>
          <p><strong>Lead Email:</strong> ${data.leadEmail}</p>
          <p><strong>Lead Phone:</strong> ${data.leadPhone || 'N/A'}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Travellers:</strong> ${data.travellersCount || 1}</p>
          <p><strong>Total Amount:</strong> ${data.currency} ${data.totalAmount}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 8px;">
            <strong>Special Requests</strong><br />
            ${(data.specialRequests || 'N/A').replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    });
  }
}
