/* global process */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../api/contact.js';

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function createRequest(body) {
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '203.0.113.10',
    },
    body,
  };
}

const validMessage = {
  name: 'Test Person',
  email: 'test@example.com',
  message: 'This is a legitimate support message.',
  turnstileToken: 'valid-token',
  attachments: [],
};

beforeEach(() => {
  process.env.TURNSTILE_SECRET_KEY = 'turnstile-secret';
  process.env.RESEND_API_KEY = 'resend-secret';
  process.env.CONTACT_FROM_EMAIL = 'GoodHealthMate <contact@goodhealthmate.com>';
  process.env.CONTACT_TO_EMAIL = 'support@dreamingstudio.net';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('contact API', () => {
  it('rejects an oversized message before it reaches either external service', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = createResponse();

    await handler(createRequest({ ...validMessage, message: 'a'.repeat(4001) }), response);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/too long/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a forged Turnstile token without sending email', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) });
    vi.stubGlobal('fetch', fetchMock);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const response = createResponse();

    await handler(createRequest(validMessage), response);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/security verification failed/i);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('turnstile');
    expect(warning).toHaveBeenCalledWith('Contact form Turnstile verification rejected', expect.objectContaining({
      success: false,
      errorCodes: [],
    }));
  });

  it('accepts a verified, valid message and sends it through Resend', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, action: 'contact_form', hostname: 'www.goodhealthmate.com' }) })
      .mockResolvedValueOnce({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const response = createResponse();

    await handler(createRequest(validMessage), response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toBe('https://api.resend.com/emails');
    const emailPayload = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(emailPayload.reply_to).toBe('test@example.com');
    expect(emailPayload.to).toEqual(['support@dreamingstudio.net']);
  });
});
