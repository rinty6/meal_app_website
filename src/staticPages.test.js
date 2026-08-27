/* global process */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const readPublicPage = (path) => readFileSync(resolve(process.cwd(), 'public', path, 'index.html'), 'utf8')

describe('permanent public pages', () => {
  it('keeps the contact form security integration while applying the public identity', () => {
    const contactPage = readPublicPage('contact-us')
    expect(contactPage).toContain('support@goodhealthmate.com')
    expect(contactPage).toContain('data-sitekey="0x4AAAAAAEVBQDxSpGVb84GL"')
    expect(contactPage).toContain("fetch('/api/contact'")
    expect(contactPage).toContain('Made in Adelaide')
  })

  it('keeps the twelve-section privacy policy and new site typography', () => {
    const privacyPage = readPublicPage('privacy')
    expect(privacyPage).toContain('12. Contact Us')
    expect(privacyPage).toContain('support@goodhealthmate.com')
    expect(privacyPage).toContain('/site-pages.css')
    expect(privacyPage).toContain('ABN 29 677 871 686')
  })
})
