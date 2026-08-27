export default function PhoneFrame({ src, alt, className = '' }) {
  return <div className={`phone-frame ${className}`.trim()}><img src={src} alt={alt} loading="lazy" /></div>
}
