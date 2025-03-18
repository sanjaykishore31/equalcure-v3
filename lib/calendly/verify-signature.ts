import { createHmac } from 'crypto';

export function verifyCalendlySignature(
  signature: string,
  body: string,
  webhookSecret: string
): boolean {
  const hmac = createHmac('sha256', webhookSecret);
  const digest = hmac.update(body).digest('base64');
  return signature === `v1=${digest}`;
}