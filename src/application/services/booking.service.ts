import { BookingCreateSchema } from '@/application/validators/content.validators';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { NotFoundError } from '@/shared/errors/app-error';
import { logger } from '@/infrastructure/logging/logger';
import { escapeHtml, sendMailToBoth, type EmailDeliveryStatus } from '@/lib/email';

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
    const emailNotification = await this.sendBookingEmail({
      ...data,
      tripTitle: trip.title || trip.name || 'Trip',
      bookingNumber,
      totalAmount,
      currency: trip.currency || 'USD',
    });

    return {
      ...booking,
      emailNotification
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
  }): Promise<EmailDeliveryStatus> {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const details = [
      `Booking Number: ${data.bookingNumber}`,
      `Trip: ${data.tripTitle}`,
      `Lead Name: ${data.leadName}`,
      `Lead Email: ${data.leadEmail}`,
      `Lead Phone: ${data.leadPhone || 'N/A'}`,
      `Travel Date: ${data.travelDate ? new Date(data.travelDate).toISOString().slice(0, 10) : 'Not provided'}`,
      `Travellers: ${data.travellersCount || 1}`,
      `Total Amount: ${data.currency} ${data.totalAmount}`,
      '',
      'Special Requests:',
      data.specialRequests || 'N/A'
    ].join('\n');
    const travelDate = data.travelDate ? new Date(data.travelDate).toISOString().slice(0, 10) : 'Not provided';
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">New booking received</h2>
          <p><strong>Booking Number:</strong> ${escapeHtml(data.bookingNumber)}</p>
          <p><strong>Trip:</strong> ${escapeHtml(data.tripTitle)}</p>
          <p><strong>Lead Name:</strong> ${escapeHtml(data.leadName)}</p>
          <p><strong>Lead Email:</strong> ${escapeHtml(data.leadEmail)}</p>
          <p><strong>Lead Phone:</strong> ${escapeHtml(data.leadPhone || 'N/A')}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Travellers:</strong> ${data.travellersCount || 1}</p>
          <p><strong>Total Amount:</strong> ${data.currency} ${data.totalAmount}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 8px;">
            <strong>Special Requests</strong><br />
            ${escapeHtml(data.specialRequests || 'N/A').replace(/\n/g, '<br />')}
          </div>
        </div>
      `;
    const result = await sendMailToBoth(
      {
        to,
        replyTo: data.leadEmail,
        subject: `New booking: ${data.bookingNumber} (${data.tripTitle})`,
        text: details,
        html
      },
      {
        to: data.leadEmail,
        subject: `Booking request received: ${data.bookingNumber}`,
        text: `Hello ${data.leadName},\n\nWe received your booking request for ${data.tripTitle}.\nReference: ${data.bookingNumber}\n\n${details}\n\nOur team will be in touch.`,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;"><h2>We received your booking request</h2><p>Hello ${escapeHtml(data.leadName)},</p><p>Our team will be in touch about your request for <strong>${escapeHtml(data.tripTitle)}</strong>.</p><p><strong>Reference:</strong> ${escapeHtml(data.bookingNumber)}</p></div>`
      }
    );
    if (!result.sent) {
      logger.warn({ email: data.leadEmail, ...result }, 'Booking email notification was not delivered to both recipients');
    }
    return result;
  }
}
