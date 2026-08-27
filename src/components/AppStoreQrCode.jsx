import { QRCodeSVG } from 'qrcode.react'
import { APP_STORE_URL } from '../content/siteContent'

export default function AppStoreQrCode() {
  return (
    <a className="qr-card" href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label="Open GoodHealthMate in the App Store">
      <QRCodeSVG value={APP_STORE_URL} size={118} bgColor="#ffffff" fgColor="#0B2149" level="M" />
      <span>Scan with your iPhone camera</span>
    </a>
  )
}
