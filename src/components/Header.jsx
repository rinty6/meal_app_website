import AppStoreButton from './AppStoreButton'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="GoodHealthMate home">
          <img src="/assets/redesign/ghm-icon.png" alt="" />
          <span>GoodHealthMate</span>
        </a>
        <AppStoreButton compact />
      </div>
    </header>
  )
}
