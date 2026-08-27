import { ArrowRight, Check } from 'lucide-react'
import AppStoreButton from './AppStoreButton'
import AppStoreQrCode from './AppStoreQrCode'
import PipCookingScene from './PipCookingScene'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow warm"><span />Your daily food mate</span>
          <h1>Reach your goals with GoodHealthMate</h1>
          <p>Log what you eat in seconds, see exactly where your day is heading, and let Pip nudge you back on track when life gets busy. One small step at a time.</p>
          <div className="hero-actions">
            <AppStoreButton />
            <AppStoreQrCode />
            <a className="text-link" href="#how-it-works">See how it works <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="hero-meta">
            <span><Check aria-hidden="true" />Built in Australia</span><i /><span>iPhone · iOS 16 and up</span>
          </div>
        </div>
        <PipCookingScene />
      </div>
    </section>
  )
}
