import nodemailer from 'nodemailer';

interface SendMailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export interface EmailDeliveryStatus {
  sent: boolean;
  websiteEmailSent: boolean;
  userEmailSent: boolean;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character] || character);
}

export async function sendMailToBoth(websiteEmail: SendMailPayload, userEmail: SendMailPayload): Promise<EmailDeliveryStatus> {
  if (!process.env.SMTP_HOST) {
    return { sent: false, websiteEmailSent: false, userEmailSent: false };
  }

  const [websiteResult, userResult] = await Promise.allSettled([
    sendMail(websiteEmail),
    sendMail(userEmail)
  ]);
  const websiteEmailSent = websiteResult.status === 'fulfilled';
  const userEmailSent = userResult.status === 'fulfilled';

  return {
    sent: websiteEmailSent && userEmailSent,
    websiteEmailSent,
    userEmailSent
  };
}

export async function sendMail({ to, subject, text, html, replyTo }: SendMailPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const tlsServername = process.env.SMTP_TLS_SERVERNAME;

  if (!host) {
    throw new Error('SMTP_HOST is not configured');
  }

  if ((user && !pass) || (!user && pass)) {
    throw new Error('SMTP_USER and SMTP_PASS/SMTP_PASSWORD must both be set when using authenticated SMTP');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: user && pass
      ? {
          user,
          pass,
        }
      : undefined,
    tls: tlsServername
      ? {
          servername: tlsServername,
        }
      : undefined,
  });

  const fromAddress = process.env.FROM_EMAIL || user || 'noreply@example.com';
  const from = `"Skyzeg Travels" <${fromAddress}>`;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    replyTo,
  });
}
