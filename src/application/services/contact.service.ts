import { ContactCreateSchema, NewsletterCreateSchema } from '@/application/validators/content.validators';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { logger } from '@/infrastructure/logging/logger';
import { escapeHtml, sendMail, sendMailToBoth, type EmailDeliveryStatus } from '@/lib/email';

export class ContactService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async createEnquiry(input: unknown, meta?: { ipAddress?: string; userAgent?: string }) {
    const data = ContactCreateSchema.parse(input);
    const enquiry = await this.unitOfWork.contactEnquiries.create({ ...data, ...meta });
    const emailNotification = await this.sendContactEmail(data);

    return {
      ...enquiry,
      emailNotification
    };
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
    let emailSent = true;

    try {
      await this.sendNewsletterEmail(data);
    } catch (error) {
      emailSent = false;
      logger.warn({ err: error, email: data.email }, 'Newsletter email notification failed');
    }

    return {
      ...(subscriber as any),
      emailNotification: {
        sent: emailSent
      }
    };
  }

  private async sendContactEmail(data: { fullName: string; email: string; subject: string; message: string; phone?: string }): Promise<EmailDeliveryStatus> {
    const to = process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'hello@example.com';
    const details = [
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || 'N/A'}`,
        `Subject: ${data.subject}`,
        '',
        data.message,
      ].join('\n');
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">New contact enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone || 'N/A')}</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 8px;">
            ${escapeHtml(data.message).replace(/\n/g, '<br />')}
          </div>
        </div>
      `;
    const result = await sendMailToBoth(
      {
        to,
        replyTo: data.email,
        subject: `New enquiry: ${data.subject}`,
        text: details,
        html
      },
      {
        to: data.email,
        subject: `We received your message: ${data.subject}`,
        text: `Hello ${data.fullName},\n\nThank you for contacting us. We received your message and will reply as soon as possible.\n\nSubject: ${data.subject}`,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;"><h2>We received your message</h2><p>Hello ${escapeHtml(data.fullName)},</p><p>Thank you for contacting us. Our team will reply as soon as possible.</p><p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p></div>`
      }
    );
    if (!result.sent) {
      logger.warn({ email: data.email, ...result }, 'Contact email notification was not delivered to both recipients');
    }
    return result;
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
