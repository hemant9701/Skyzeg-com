import { ContactCreateSchema, NewsletterCreateSchema } from '@/application/validators/content.validators';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { logger } from '@/infrastructure/logging/logger';
import { sendMail } from '@/lib/email';

export class ContactService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async createEnquiry(input: unknown, meta?: { ipAddress?: string; userAgent?: string }) {
    const data = ContactCreateSchema.parse(input);
    const enquiry = await this.unitOfWork.contactEnquiries.create({ ...data, ...meta });

    try {
      await this.sendContactEmail(data);
    } catch (error) {
      logger.warn({ err: error, email: data.email }, 'Contact email notification failed');
    }

    return enquiry;
  }

  async subscribe(input: unknown) {
    const data = NewsletterCreateSchema.parse(input);
    const existing = await this.unitOfWork.newsletterSubscribers.findOne({ email: data.email });
    const subscriber = existing
      ? await this.unitOfWork.newsletterSubscribers.updateOne(
        { email: data.email },
        { ...data, isActive: true, subscribedAt: new Date(), unsubscribedAt: undefined }
      )
      : await this.unitOfWork.newsletterSubscribers.create(data);

    try {
      await this.sendNewsletterEmail(data);
    } catch (error) {
      logger.warn({ err: error, email: data.email }, 'Newsletter email notification failed');
    }

    return subscriber;
  }

  private async sendContactEmail(data: { fullName: string; email: string; subject: string; message: string; phone?: string }) {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const from = process.env.FROM_EMAIL || 'noreply@example.com';
    if (!process.env.SMTP_HOST) {
      logger.info('Skipping contact email notification: SMTP_HOST is not configured');
      return;
    }

    logger.info({ to, from, subject: data.subject }, 'Contact form email notification requested');

    await sendMail({
      to,
      subject: `New enquiry: ${data.subject}`,
      text: [
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || 'N/A'}`,
        '',
        data.message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">New contact enquiry</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 8px;">
            ${data.message.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    });
  }

  private async sendNewsletterEmail(data: { email: string; fullName?: string; languageCode?: string }) {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const from = process.env.FROM_EMAIL || 'noreply@example.com';

    if (!process.env.SMTP_HOST) {
      logger.info('Skipping newsletter email notification: SMTP_HOST is not configured');
      return;
    }

    logger.info({ to, from, email: data.email }, 'Newsletter subscription email notification requested');

    await sendMail({
      to,
      subject: 'New newsletter subscription',
      text: [
        `Name: ${data.fullName || 'N/A'}`,
        `Email: ${data.email}`,
        `Language: ${data.languageCode || 'en-US'}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">New newsletter subscription</h2>
          <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Language:</strong> ${data.languageCode || 'en-US'}</p>
        </div>
      `,
    });
  }
}
