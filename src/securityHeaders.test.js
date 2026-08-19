import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { describe, expect, it } from 'vitest';

const vercelConfig = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'));
const headerMap = new Map(vercelConfig.headers[0].headers.map(({ key, value }) => [key, value]));

describe('Vercel security headers', () => {
  it('protects every route while allowing the site resources it uses', () => {
    expect(vercelConfig.headers[0].source).toBe('/(.*)');
    expect(headerMap.get('Content-Security-Policy')).toContain("default-src 'self'");
    expect(headerMap.get('Content-Security-Policy')).toContain("form-action 'self'");
    expect(headerMap.get('Content-Security-Policy')).toContain('frame-ancestors \'none\'');
    expect(headerMap.get('Content-Security-Policy')).toContain('https://challenges.cloudflare.com');
    expect(headerMap.get('Content-Security-Policy')).toContain('https://images.unsplash.com');
    expect(headerMap.get('Permissions-Policy')).toContain('camera=()');
    expect(headerMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headerMap.get('Strict-Transport-Security')).toBe('max-age=31536000');
    expect(headerMap.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headerMap.get('X-Frame-Options')).toBe('DENY');
  });
});
