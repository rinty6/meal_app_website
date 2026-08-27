import AppStoreButton from './AppStoreButton'
import AppStoreQrCode from './AppStoreQrCode'

export default function DownloadCallout() {
  return (
    <section className="download-section" aria-labelledby="download-title">
      <div className="container download-inner">
        <div><h2 id="download-title">Start tomorrow&apos;s breakfast on the right foot</h2><p>Download GoodHealthMate, set one goal, and log one meal. Pip will take it from there.</p><AppStoreButton light /></div>
        <AppStoreQrCode />
      </div>
    </section>
  )
}
