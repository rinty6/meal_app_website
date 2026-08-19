/* global Buffer, process */

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_ATTACHMENTS = 2;
const MAX_ATTACHMENT_BYTES = 1024 * 1024;
const TURNSTILE_ACTION = 'contact_form';
const ALLOWED_HOSTNAMES = new Set(['www.goodhealthmate.com', 'goodhealthmate.com']);
const ALLOWED_IMAGES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;

function sendJson(response, status, body) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(status).json(body);
}

function cleanText(value, maxLength, fieldName) {
  if (typeof value !== 'string') return { error: `${fieldName} is required.` };
  const text = value.trim();
  if (!text) return { error: `${fieldName} is required.` };
  if (text.length > maxLength) return { error: `${fieldName} is too long.` };
  return { value: text };
}

function imageMatchesType(buffer, type) {
  if (type === 'image/jpeg') return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (type === 'image/png') {
    return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  return buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
}

function validateAttachments(value) {
  if (value === undefined) return { value: [] };
  if (!Array.isArray(value) || value.length > MAX_ATTACHMENTS) return { error: 'Too many attachments.' };

  const attachments = [];
  for (const [index, attachment] of value.entries()) {
    if (!attachment || typeof attachment !== 'object' || typeof attachment.type !== 'string' || typeof attachment.content !== 'string') {
      return { error: 'An attachment is invalid.' };
    }
    if (!ALLOWED_IMAGES.has(attachment.type) || attachment.content.length === 0 || attachment.content.length % 4 !== 0 || !BASE64_PATTERN.test(attachment.content)) {
      return { error: 'Only JPEG, PNG, or WebP images are allowed.' };
    }

    const content = Buffer.from(attachment.content, 'base64');
    if (content.length === 0 || content.length > MAX_ATTACHMENT_BYTES || !imageMatchesType(content, attachment.type)) {
      return { error: 'An attachment is invalid or too large.' };
    }

    attachments.push({
      filename: `feedback-image-${index + 1}.${ALLOWED_IMAGES.get(attachment.type)}`,
      content: attachment.content,
    });
  }

  return { value: attachments };
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/gu, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);
}

function parsePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { error: 'Invalid form submission.' };
  if (typeof payload.website === 'string' && payload.website.trim()) return { ignored: true };

  const name = cleanText(payload.name, MAX_NAME_LENGTH, 'Name');
  const email = cleanText(payload.email, MAX_EMAIL_LENGTH, 'Email');
  const message = cleanText(payload.message, MAX_MESSAGE_LENGTH, 'Feedback');
  if (name.error || email.error || message.error) return { error: name.error || email.error || message.error };
  if (!EMAIL_PATTERN.test(email.value)) return { error: 'Enter a valid email address.' };
  if (typeof payload.turnstileToken !== 'string' || payload.turnstileToken.length === 0 || payload.turnstileToken.length > 2048) {
    return { error: 'Please complete the security check.' };
  }

  const attachments = validateAttachments(payload.attachments);
  if (attachments.error) return attachments;

  return {
    value: {
      name: name.value,
      email: email.value,
      message: message.value,
      turnstileToken: payload.turnstileToken,
      attachments: attachments.value,
    },
  };
}

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return typeof value === 'string' ? value.split(',')[0].trim() : undefined;
}

async function verifyTurnstile(token, request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { configurationError: true };

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: getClientIp(request) }),
  });
  const result = await response.json();
  const valid = response.ok && result.success === true && result.action === TURNSTILE_ACTION && ALLOWED_HOSTNAMES.has(result.hostname);
  return {
    valid,
    status: response.status,
    success: result.success === true,
    hostname: typeof result.hostname === 'string' ? result.hostname : undefined,
    action: typeof result.action === 'string' ? result.action : undefined,
    errorCodes: Array.isArray(result['error-codes']) ? result['error-codes'] : [],
  };
}

async function sendContactEmail(contact) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return { configurationError: true };

  const text = `New GoodHealthMate website feedback\n\nName: ${contact.name}\nEmail: ${contact.email}\n\nFeedback:\n${contact.message}`;
  const html = `<h2>New GoodHealthMate website feedback</h2><p><strong>Name:</strong> ${escapeHtml(contact.name)}<br><strong>Email:</strong> ${escapeHtml(contact.email)}</p><p><strong>Feedback:</strong></p><p>${escapeHtml(contact.message).replace(/\n/gu, '<br>')}</p>`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: contact.email,
      subject: 'New GoodHealthMate website feedback',
      text,
      html,
      attachments: contact.attachments,
    }),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    result = undefined;
  }

  return {
    sent: response.ok,
    status: response.status,
    error: typeof result?.message === 'string' ? result.message : undefined,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }
  if (!request.headers['content-type']?.startsWith('application/json')) {
    return sendJson(response, 415, { error: 'Unsupported request type.' });
  }

  let payload;
  try {
    payload = request.body;
  } catch {
    return sendJson(response, 400, { error: 'Invalid form submission.' });
  }

  const parsed = parsePayload(payload);
  if (parsed.ignored) return sendJson(response, 200, { ok: true });
  if (parsed.error) return sendJson(response, 400, { error: parsed.error });

  try {
    const turnstile = await verifyTurnstile(parsed.value.turnstileToken, request);
    if (turnstile.configurationError) return sendJson(response, 503, { error: 'Contact form is temporarily unavailable.' });
    if (!turnstile.valid) {
      console.warn('Contact form Turnstile verification rejected', {
        status: turnstile.status,
        success: turnstile.success,
        hostname: turnstile.hostname,
        action: turnstile.action,
        errorCodes: turnstile.errorCodes,
      });
      return sendJson(response, 400, { error: 'Security verification failed. Please try again.' });
    }

    const delivery = await sendContactEmail(parsed.value);
    if (delivery.configurationError) return sendJson(response, 503, { error: 'Contact form is temporarily unavailable.' });
    if (!delivery.sent) {
      console.error('Contact form Resend delivery rejected', { status: delivery.status, error: delivery.error });
      return sendJson(response, 502, { error: 'We could not send your message. Please try again later.' });
    }
  } catch {
    return sendJson(response, 502, { error: 'We could not send your message. Please try again later.' });
  }

  return sendJson(response, 200, { ok: true });
}
