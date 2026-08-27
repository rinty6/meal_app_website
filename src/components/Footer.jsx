import { Mail } from 'lucide-react'
import { ABN, CONTACT_EMAIL, SOCIAL_LINKS } from '../content/siteContent'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand inverse" href="/"><img src="/assets/redesign/ghm-icon.png" alt="" /><span>GoodHealthMate</span></a>
          <p>Your daily companion for healthier food choices and a better you. Built in Australia.</p>
        </div>
        <div className="footer-column"><h2>Support</h2><a href="/contact-us/">Contact us</a><a href={`mailto:${CONTACT_EMAIL}`}><Mail aria-hidden="true" />{CONTACT_EMAIL}</a></div>
        <div className="footer-column"><h2>About</h2><a href="/privacy/">Privacy policy</a></div>
        <div className="footer-column"><h2>Follow Pip</h2><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">Instagram · @goodhealthmate</a><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer">TikTok · @goodhealthmate</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 GoodHealthMate. All rights reserved.</span><span>ABN {ABN} · Made in Adelaide</span></div>
    </footer>
  )
}
