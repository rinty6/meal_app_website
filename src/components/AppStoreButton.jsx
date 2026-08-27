import { APP_STORE_URL } from '../content/siteContent'

export default function AppStoreButton({ compact = false, light = false }) {
  // The light CTA needs a navy mark; all blue and navy buttons use the white mark.
  const appleLogo = light ? '/assets/redesign/apple-logo-dark.svg' : '/assets/redesign/apple-logo-light.svg'

  return (
    <a className={`app-store-button${compact ? ' compact' : ''}${light ? ' light' : ''}`} href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label="Download GoodHealthMate on the App Store">
      <img className="apple-logo" src={appleLogo} alt="" aria-hidden="true" />
      {compact ? <span>Download the app</span> : (
        <span className="app-store-label"><small>Download on the</small><strong>App Store</strong></span>
      )}
    </a>
  )
}
