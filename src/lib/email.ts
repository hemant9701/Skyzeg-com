import nodemailer from 'nodemailer'; 

interface SendMailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendMail({ to, subject, text, html }: SendMailPayload) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host) {
    throw new Error('SMTP_HOST is not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@example.com';

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
