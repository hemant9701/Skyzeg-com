import { TailorMadeRequestCreateSchema } from '@/application/validators/content.validators';
import { logger } from '@/infrastructure/logging/logger';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { NotFoundError } from '@/shared/errors/app-error';
import { escapeHtml, sendMailToBoth } from '@/lib/email';

export class TailorMadeRequestService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async createRequest(input: unknown, meta?: { ipAddress?: string; userAgent?: string }) {
    const data = TailorMadeRequestCreateSchema.parse(input);
    const trip = await this.unitOfWork.trips.findById(data.trip);
    if (!trip) throw new NotFoundError('Trip not found');

    const tripTitle = trip.title || trip.name || 'Trip';
    const requestNumber = `TMR-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9999)}`;
    const request = await this.unitOfWork.tailorMadeRequests.create({
      ...data,
      requestNumber,
      tripTitle,
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent
    });
    const travelDate = data.travelDate ? new Date(data.travelDate).toISOString().slice(0, 10) : 'Not provided';
    const details = [
      `Request Number: ${requestNumber}`,
      `Starting trip: ${tripTitle}`,
      `Name: ${data.leadName}`,
      `Email: ${data.leadEmail}`,
      `Phone: ${data.leadPhone || 'N/A'}`,
      `Preferred destination: ${data.preferredDestination}`,
      `Travel date: ${travelDate}`,
      `Duration (days): ${data.durationDays || 'Not provided'}`,
      `Travellers: ${data.travellersCount}`,
      `Budget: ${data.budgetRange || 'Not provided'}`,
      `Accommodation: ${data.accommodationStyle || 'Not provided'}`,
      `Activities: ${data.activities || 'Not provided'}`,
      `Additional notes: ${data.specialRequests || 'Not provided'}`
    ].join('\n');
    const html = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;"><h2>New tailor-made travel request</h2>${[
      ['Request Number', requestNumber],
      ['Starting trip', tripTitle],
      ['Name', data.leadName],
      ['Email', data.leadEmail],
      ['Phone', data.leadPhone || 'N/A'],
      ['Preferred destination', data.preferredDestination],
      ['Travel date', travelDate],
      ['Duration (days)', String(data.durationDays || 'Not provided')],
      ['Travellers', String(data.travellersCount)],
      ['Budget', data.budgetRange || 'Not provided'],
      ['Accommodation', data.accommodationStyle || 'Not provided'],
      ['Activities', data.activities || 'Not provided'],
      ['Additional notes', data.specialRequests || 'Not provided']
    ].map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join('')}</div>`;
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const emailNotification = await sendMailToBoth(
      {
        to,
        replyTo: data.leadEmail,
        subject: `New tailor-made request: ${requestNumber}`,
        text: details,
        html
      },
      {
        to: data.leadEmail,
        subject: `Tailor-made request received: ${requestNumber}`,
        text: `Hello ${data.leadName},\n\nWe received your tailor-made travel request. Our team will contact you to discuss the details.\n\n${details}`,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;"><h2>Your tailor-made request is with us</h2><p>Hello ${escapeHtml(data.leadName)},</p><p>We received your request and our team will contact you to discuss your trip.</p><p><strong>Reference:</strong> ${escapeHtml(requestNumber)}</p></div>`
      }
    );
    if (!emailNotification.sent) {
      logger.warn({ email: data.leadEmail, ...emailNotification }, 'Tailor-made request email was not delivered to both recipients');
    }

    return { ...request, emailNotification };
  }
}